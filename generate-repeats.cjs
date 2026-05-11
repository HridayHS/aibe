const fs = require('fs');
const questions = JSON.parse(fs.readFileSync('src/data/questions.json', 'utf8'));

// Unique questions (Set A only)
const unique = [];
const seen = new Set();
questions.forEach(q => {
  if (q.set === 'A') {
    const key = `${q.exam}-${q.questionNumber}`;
    if (!seen.has(key)) { seen.add(key); unique.push(q); }
  }
});

// Extract legal references from question text
function extractRefs(q) {
  const text = (q.question + ' ' + q.options.join(' ')).toLowerCase();
  const refs = new Set();
  
  // Section numbers with Act context
  const sectionMatches = text.match(/section\s+\d+[a-z]?(?:\s*\(\d+\))?/gi) || [];
  sectionMatches.forEach(m => refs.add(m.toLowerCase().trim()));
  
  // Article numbers
  const articleMatches = text.match(/article\s+\d+[a-z]?/gi) || [];
  articleMatches.forEach(m => refs.add(m.toLowerCase().trim()));
  
  // Specific Acts
  const acts = text.match(/(?:indian penal code|ipc|crpc|cpc|evidence act|contract act|hindu marriage act|transfer of property|companies act|arbitration.*?act|advocates act|motor vehicle|income.?tax act|it act|information technology|bharatiya nyaya|bnss|payment of gratuity|industrial disputes?|limitation act|specific relief|negotiable instruments?|hindu succession|domestic violence|consumer protection)/gi) || [];
  acts.forEach(a => refs.add(a.toLowerCase().trim()));
  
  // Case names
  const cases = text.match(/\w+\s+(?:vs?\.?|versus)\s+\w+/gi) || [];
  cases.forEach(c => refs.add(c.toLowerCase().trim()));
  
  // Order + Rule (CPC)
  const orders = text.match(/order\s+[ivxlcdm]+(?:\s+rule\s+\d+)?/gi) || [];
  orders.forEach(o => refs.add(o.toLowerCase().trim()));
  
  return refs;
}

// Build clusters based on shared legal references + same subject
const clusters = [];
const clustered = new Set();

// Group by subject
const bySubject = {};
unique.forEach(q => {
  if (!bySubject[q.subject]) bySubject[q.subject] = [];
  bySubject[q.subject].push({ ...q, refs: extractRefs(q) });
});

for (const [subject, qs] of Object.entries(bySubject)) {
  for (let i = 0; i < qs.length; i++) {
    if (clustered.has(qs[i].id)) continue;
    if (qs[i].refs.size === 0) continue;
    
    const group = [qs[i]];
    
    for (let j = i + 1; j < qs.length; j++) {
      if (clustered.has(qs[j].id)) continue;
      if (qs[i].exam === qs[j].exam) continue;
      if (qs[j].refs.size === 0) continue;
      
      // Count shared references
      const shared = [...qs[i].refs].filter(r => qs[j].refs.has(r));
      
      // Need at least 2 shared references, OR 1 very specific one (section + act)
      const hasSpecificMatch = shared.some(r => r.match(/section \d+/));
      if (shared.length >= 2 || (shared.length >= 1 && hasSpecificMatch && qs[i].refs.size <= 5)) {
        group.push({ ...qs[j], sharedRefs: shared });
      }
    }
    
    if (group.length >= 2) {
      group.forEach(g => clustered.add(g.id));
      const exams = [...new Set(group.map(g => g.exam))];
      
      // Get the shared references for the cluster
      const allShared = new Set();
      group.forEach(g => { if (g.sharedRefs) g.sharedRefs.forEach(r => allShared.add(r)); });
      
      clusters.push({
        id: `repeat-${clusters.length + 1}`,
        subject,
        exams,
        sharedConcepts: [...allShared].slice(0, 5),
        importance: exams.length >= 3 ? 'critical' : 'high',
        questions: group.map(g => ({
          id: g.id, exam: g.exam, year: g.year,
          questionNumber: g.questionNumber, question: g.question,
          options: g.options, correctAnswer: g.correctAnswer,
        })),
      });
    }
  }
}

clusters.sort((a, b) => b.exams.length - a.exams.length || b.questions.length - a.questions.length);

// Hot topics
const ht = {};
clusters.forEach(c => { ht[c.subject] = (ht[c.subject] || 0) + 1; });
const hotTopics = Object.entries(ht).map(([s,c]) => ({subject:s,repeats:c})).sort((a,b) => b.repeats - a.repeats);

console.log(`Found ${clusters.length} clusters covering ${clustered.size} questions\n`);
clusters.forEach((c, i) => {
  console.log(`${i+1}. [${c.subject}] ${c.exams.join(' + ')} | refs: ${c.sharedConcepts.join(', ')}`);
  c.questions.forEach(q => console.log(`   ${q.exam} Q${q.questionNumber}: ${q.question.substring(0, 80)}...`));
  console.log();
});
console.log('Hot topics:', hotTopics);

fs.writeFileSync('src/data/repeats.json', JSON.stringify({
  clusters, hotTopics,
  totalClusters: clusters.length,
  totalQuestions: clustered.size,
}, null, 2));
console.log('\nSaved repeats.json');
