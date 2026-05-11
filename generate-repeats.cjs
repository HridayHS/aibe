const fs = require('fs');
const path = require('path');
const questions = JSON.parse(fs.readFileSync('src/data/questions.json', 'utf8'));

// Get unique questions (Set A only for dedup)
const unique = [];
const seen = new Set();
questions.forEach(q => {
  if (q.set === 'A') {
    const key = `${q.exam}-${q.questionNumber}`;
    if (!seen.has(key)) { seen.add(key); unique.push(q); }
  }
});

// Tokenize and normalize question text for comparison
function tokenize(text) {
  return text.toLowerCase()
    .replace(/[^a-z0-9\s]/g, '')
    .split(/\s+/)
    .filter(w => w.length > 2)
    .filter(w => !['the','and','for','that','which','with','from','this','are','was','has','have','not','but','all','can','had','her','one','our','out','its','been','then','them','these','than','other','into','some','very','when','come','could','would','about','their','will','each','make','like','been','may','said','does'].includes(w));
}

// Jaccard similarity between two token sets
function similarity(a, b) {
  const setA = new Set(a);
  const setB = new Set(b);
  const intersection = new Set([...setA].filter(x => setB.has(x)));
  const union = new Set([...setA, ...setB]);
  return union.size === 0 ? 0 : intersection.size / union.size;
}

// Also check if questions share same subject + similar options
function optionOverlap(q1, q2) {
  const opts1 = q1.options.map(o => tokenize(o).join(' '));
  const opts2 = q2.options.map(o => tokenize(o).join(' '));
  let matches = 0;
  for (const o1 of opts1) {
    for (const o2 of opts2) {
      if (o1.length > 5 && o2.length > 5) {
        const sim = similarity(o1.split(' '), o2.split(' '));
        if (sim > 0.5) matches++;
      }
    }
  }
  return matches;
}

console.log(`Comparing ${unique.length} unique questions across exams...\n`);

// Group by subject first to reduce comparison space
const bySubject = {};
unique.forEach(q => {
  if (!bySubject[q.subject]) bySubject[q.subject] = [];
  bySubject[q.subject].push(q);
});

const clusters = [];
const clustered = new Set();

for (const [subject, qs] of Object.entries(bySubject)) {
  const tokens = qs.map(q => ({ q, tokens: tokenize(q.question + ' ' + q.options.join(' ')) }));
  
  for (let i = 0; i < tokens.length; i++) {
    if (clustered.has(tokens[i].q.id)) continue;
    
    const group = [tokens[i].q];
    
    for (let j = i + 1; j < tokens.length; j++) {
      if (clustered.has(tokens[j].q.id)) continue;
      if (tokens[i].q.exam === tokens[j].q.exam) continue; // Skip same exam
      
      const sim = similarity(tokens[i].tokens, tokens[j].tokens);
      const optOvlp = optionOverlap(tokens[i].q, tokens[j].q);
      
      // Strong match: high text similarity OR same topic with matching options
      if (sim > 0.35 || (sim > 0.2 && optOvlp >= 2)) {
        group.push({ ...tokens[j].q, similarity: Math.round(sim * 100) });
      }
    }
    
    if (group.length >= 2) {
      // Mark all as clustered
      group.forEach(g => clustered.add(g.id));
      
      const exams = [...new Set(group.map(g => g.exam))];
      clusters.push({
        id: `repeat-${clusters.length + 1}`,
        subject,
        exams,
        questions: group.map(g => ({
          id: g.id,
          exam: g.exam,
          year: g.year,
          questionNumber: g.questionNumber,
          question: g.question,
          options: g.options,
          correctAnswer: g.correctAnswer,
          similarity: g.similarity || 100,
        })),
        importance: exams.length >= 3 ? 'critical' : 'high',
      });
    }
  }
}

// Sort by number of exams covered (most repeated first)
clusters.sort((a, b) => b.questions.length - a.questions.length || b.exams.length - a.exams.length);

console.log(`Found ${clusters.length} repeated question clusters`);
console.log(`Covering ${clustered.size} questions across exams`);
console.log(`\nTop 5 clusters:`);
clusters.slice(0, 5).forEach((c, i) => {
  console.log(`  ${i+1}. [${c.subject}] across ${c.exams.join(', ')}`);
  console.log(`     "${c.questions[0].question.substring(0, 80)}..."`);
});

// Also generate "hot topics" - subjects with most repeats
const hotTopics = {};
clusters.forEach(c => {
  hotTopics[c.subject] = (hotTopics[c.subject] || 0) + 1;
});
const hotList = Object.entries(hotTopics).map(([s, c]) => ({ subject: s, repeats: c })).sort((a, b) => b.repeats - a.repeats);

console.log(`\nHot topics (most repeated):`);
hotList.forEach(h => console.log(`  ${h.subject}: ${h.repeats} repeated clusters`));

fs.writeFileSync('src/data/repeats.json', JSON.stringify({ clusters, hotTopics: hotList, totalClusters: clusters.length, totalQuestions: clustered.size }, null, 2));
console.log('\nSaved repeats.json');
