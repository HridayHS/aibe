const fs = require('fs');

const questions = JSON.parse(fs.readFileSync('src/data/questions.json', 'utf8'));

// Strict manually verified repeat clusters based on actual question content & IDs
const WHITELISTED_CLUSTERS = [
  {
    concept: "Res Judicata (Section 11 CPC)",
    subject: "Civil Procedure",
    qids: ["aibe16-q35", "aibe17-q77", "aibe18-q31", "aibe19-q36", "aibe20-q61"],
    sharedConcepts: ["Section 11", "CPC", "Res Judicata"]
  },
  {
    concept: "Dissolution of Muslim Marriages Act Section 2",
    subject: "Family Law",
    qids: ["aibe17-q98", "aibe20-q69"],
    sharedConcepts: ["Section 2", "Dissolution of Muslim Marriages Act", "Divorce grounds"]
  },
  {
    concept: "Hindu Marriage Act Section 13 (Divorce & Cruelty)",
    subject: "Family Law",
    qids: ["aibe18-q53", "aibe19-q53"],
    sharedConcepts: ["Section 13", "Hindu Marriage Act", "Divorce grounds", "Cruelty"]
  },
  {
    concept: "Arbitration & Conciliation Act Section 21 (Commencement)",
    subject: "ADR & Arbitration",
    qids: ["aibe16-q54", "aibe20-q57"],
    sharedConcepts: ["Section 21", "Arbitration Act", "Commencement"]
  },
  {
    concept: "CPC Summon Exemption (Section 132/133)",
    subject: "Civil Procedure",
    qids: ["aibe18-q32", "aibe19-q33"],
    sharedConcepts: ["Section 132", "Section 133", "CPC", "Personal appearance exemption"]
  },
  {
    concept: "Advocates Act Disciplinary Powers & Appeals",
    subject: "Legal Ethics",
    qids: ["aibe17-q23", "aibe18-q69", "aibe20-q73"],
    sharedConcepts: ["Section 35", "Section 36", "Section 37", "Section 38", "Advocates Act", "Disciplinary Committee", "Appeals"]
  },
  {
    concept: "Negotiable Instruments Act, 1881",
    subject: "Contract Law",
    qids: ["aibe18-q95", "aibe20-q36"],
    sharedConcepts: ["Negotiable Instruments Act", "Promissory note", "Cheque", "Consideration"]
  },
  {
    concept: "Income Tax Act Section 24 (Standard Deduction)",
    subject: "Tax Law",
    qids: ["aibe16-q65", "aibe20-q38"],
    sharedConcepts: ["Section 24", "Income Tax Act", "Standard deduction", "House property"]
  },
  {
    concept: "Income Tax Act Section 2(24) (Income Definition)",
    subject: "Tax Law",
    qids: ["aibe18-q88", "aibe19-q85"],
    sharedConcepts: ["Section 2(24)", "Income Tax Act", "Income definition"]
  },
  {
    concept: "CPC Section 9 (Civil Nature Jurisdiction)",
    subject: "Civil Procedure",
    qids: ["aibe16-q21", "aibe18-q30"],
    sharedConcepts: ["Section 9", "CPC", "Suit of civil nature"]
  }
];

// Helper mapping to lookup questions quickly
const qMap = new Map();
questions.forEach(q => qMap.set(q.id, q));

const clusters = [];
const clusteredIds = new Set();

WHITELISTED_CLUSTERS.forEach((cluster, idx) => {
  const matchingQuestions = [];
  cluster.qids.forEach(qid => {
    if (qMap.has(qid)) {
      matchingQuestions.push(qMap.get(qid));
      clusteredIds.add(qid);
    } else {
      console.warn(`Warning: Whitelisted question ID '${qid}' not found in database!`);
    }
  });

  if (matchingQuestions.length >= 2) {
    // Sort questions by exam order (AIBE 16 -> 17 -> 18 -> 19 -> 20)
    matchingQuestions.sort((a, b) => {
      const numA = parseInt(a.exam.match(/\d+/)[0]);
      const numB = parseInt(b.exam.match(/\d+/)[0]);
      return numA - numB || a.questionNumber - b.questionNumber;
    });

    const exams = [...new Set(matchingQuestions.map(q => q.exam))];
    
    // Sort exams chronologically
    exams.sort((a, b) => parseInt(a.match(/\d+/)[0]) - parseInt(b.match(/\d+/)[0]));

    const importance = exams.length >= 3 ? 'critical' : 'high';

    clusters.push({
      id: `repeat-${idx + 1}`,
      subject: cluster.subject,
      exams: exams,
      sharedConcepts: cluster.sharedConcepts,
      importance: importance,
      questions: matchingQuestions.map(q => ({
        id: q.id,
        exam: q.exam,
        year: q.year,
        questionNumber: q.questionNumber,
        question: q.question,
        options: q.options,
        correctAnswer: q.correctAnswer
      }))
    });
  }
});

// Sort clusters by number of exams first (descending), then by number of questions (descending)
clusters.sort((a, b) => b.exams.length - a.exams.length || b.questions.length - a.questions.length);

// Re-assign IDs in order
clusters.forEach((c, idx) => {
  c.id = `repeat-${idx + 1}`;
});

// Calculate Hot Topics
const ht = {};
clusters.forEach(c => {
  ht[c.subject] = (ht[c.subject] || 0) + 1;
});
const hotTopics = Object.entries(ht)
  .map(([subject, count]) => ({ subject, repeats: count }))
  .sort((a, b) => b.repeats - a.repeats || a.subject.localeCompare(b.subject));

console.log(`Verified ${clusters.length} clusters covering ${clusteredIds.size} questions\n`);
clusters.forEach((c, i) => {
  console.log(`${i+1}. [${c.subject}] ${c.exams.join(' + ')} | refs: ${c.sharedConcepts.join(', ')}`);
  c.questions.forEach(q => console.log(`   ${q.exam} Q${q.questionNumber}: ${q.question.substring(0, 80)}...`));
  console.log();
});
console.log('Hot topics:', hotTopics);

fs.writeFileSync('src/data/repeats.json', JSON.stringify({
  clusters,
  hotTopics,
  totalClusters: clusters.length,
  totalQuestions: clusteredIds.size,
}, null, 2));

console.log('\nSaved repeats.json');
