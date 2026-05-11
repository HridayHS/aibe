const fs = require('fs');
const questions = JSON.parse(fs.readFileSync('src/data/questions.json', 'utf8'));

console.log('=== DATA IMPROVEMENT ===\n');

// 1. Fix the 1 missing AIBE 20 answer
const aibe20noAns = questions.filter(q => q.exam === 'AIBE 20' && !q.correctAnswer);
console.log('AIBE 20 missing answer:', aibe20noAns.map(q => q.id + ' Q' + q.questionNumber + ' set=' + q.set));

// 2. Improve classifier — reduce Miscellaneous
const EXTRA_KEYWORDS = {
  'Constitutional Law': ['constitution', 'fundamental right', 'directive principle', 'dpsp', 'amendment', 'writ', 'habeas corpus', 'mandamus', 'certiorari', 'quo warranto', 'preamble', 'schedule', 'union', 'state legislature', 'parliament', 'president', 'governor', 'supreme court', 'high court', 'citizenship', 'election', 'emergency', 'martial law', 'federal', 'centre-state', 'lok sabha', 'rajya sabha'],
  'Criminal Law': ['ipc', 'indian penal code', 'penal code', 'crpc', 'criminal procedure', 'offence', 'punishment', 'imprisonment', 'bail', 'cognizable', 'non-cognizable', 'bailable', 'fir', 'charge sheet', 'murder', 'culpable homicide', 'theft', 'robbery', 'dacoity', 'cheating', 'forgery', 'defamation', 'assault', 'kidnapping', 'abetment', 'conspiracy', 'attempt', 'juvenile', 'bharatiya nyaya', 'bns', 'bnss', 'bharatiya nagarik', 'pocso', 'narcotic', 'ndps', 'accused', 'complainant', 'prosecution', 'investigation', 'arrest', 'summons', 'warrant', 'magistrate', 'sessions'],
  'Civil Procedure': ['cpc', 'civil procedure', 'suit', 'decree', 'order', 'appeal', 'revision', 'review', 'res judicata', 'plaint', 'written statement', 'injunction', 'attachment', 'execution', 'interpleader', 'set off', 'counter claim'],
  'Evidence Law': ['evidence act', 'indian evidence', 'witness', 'testimony', 'hearsay', 'confession', 'admission', 'relevancy', 'burden of proof', 'estoppel', 'presumption', 'documentary evidence', 'oral evidence', 'expert opinion', 'bharatiya sakshya', 'bsa'],
  'Family Law': ['hindu marriage', 'divorce', 'maintenance', 'custody', 'adoption', 'guardianship', 'succession', 'inheritance', 'hindu succession', 'muslim law', 'nikah', 'talaq', 'mehr', 'dower', 'christian marriage', 'special marriage', 'domestic violence', 'dowry', 'conjugal', 'matrimonial', 'bigamy', 'void marriage', 'voidable marriage', 'restitution'],
  'Contract Law': ['contract act', 'indian contract', 'offer', 'acceptance', 'consideration', 'free consent', 'coercion', 'undue influence', 'fraud', 'misrepresentation', 'void agreement', 'voidable contract', 'contingent', 'quasi contract', 'indemnity', 'guarantee', 'bailment', 'pledge', 'agency', 'sale of goods', 'partnership', 'specific relief', 'specific performance'],
  'Property Law': ['transfer of property', 'tpa', 'mortgage', 'lease', 'gift', 'sale deed', 'exchange', 'easement', 'license', 'actionable claim', 'immovable property', 'movable property', 'registration act', 'stamp act', 'benami'],
  'Tax Law': ['income tax', 'gst', 'goods and services', 'tax', 'assessment', 'deduction', 'exemption', 'capital gains', 'tds', 'advance tax', 'return of income', 'agricultural income', 'annual value', 'assessee', 'previous year', 'assessment year'],
  'Labour Law': ['labour', 'labor', 'industrial dispute', 'factory', 'minimum wages', 'payment of wages', 'workmen', 'employer', 'employee', 'trade union', 'strike', 'lockout', 'retrenchment', 'lay off', 'gratuity', 'provident fund', 'esi', 'compensation', 'bonus', 'maternity'],
  'Corporate Law': ['companies act', 'company', 'director', 'shareholder', 'memorandum', 'articles of association', 'winding up', 'insolvency', 'bankruptcy', 'ibc', 'nclt', 'nclat', 'sebi', 'securities', 'llp', 'partnership firm'],
  'ADR & Arbitration': ['arbitration', 'conciliation', 'mediation', 'lok adalat', 'tribunal', 'arbitral', 'arbitrator', 'award', 'alternative dispute'],
  'Legal Ethics': ['advocate', 'bar council', 'legal profession', 'professional conduct', 'misconduct', 'vakalatnama', 'advocate act', 'disciplinary', 'enrollment'],
  'Motor Vehicle Law': ['motor vehicle', 'driving license', 'accident', 'third party', 'hit and run', 'insurance claim', 'mact', 'road accident', 'traffic'],
  'Cyber Law': ['information technology', 'cyber', 'electronic', 'digital signature', 'data protection', 'hacking', 'computer', 'internet', 'online', 'e-commerce', 'it act'],
  'Intellectual Property': ['patent', 'copyright', 'trademark', 'design', 'geographical indication', 'trade secret', 'intellectual property', 'infringement'],
  'Law of Torts': ['tort', 'negligence', 'nuisance', 'defamation', 'trespass', 'strict liability', 'absolute liability', 'vicarious liability', 'damnum sine injuria', 'injuria sine damno', 'volenti non fit'],
  'Environmental Law': ['environment', 'pollution', 'forest', 'wildlife', 'biodiversity', 'ngt', 'green tribunal', 'sustainable development', 'polluter pays', 'precautionary principle'],
  'Administrative Law': ['administrative', 'delegated legislation', 'natural justice', 'judicial review', 'ultra vires', 'audi alteram', 'quasi judicial', 'ombudsman', 'lokpal', 'lokayukta', 'rti', 'right to information'],
  'International Law': ['international law', 'united nations', 'treaty', 'convention', 'icj', 'geneva', 'extradition', 'asylum', 'diplomatic', 'sovereignty', 'international court'],
  'Consumer Law': ['consumer', 'consumer protection', 'deficiency in service', 'unfair trade', 'consumer forum', 'consumer commission', 'product liability'],
  'Limitation Law': ['limitation act', 'limitation period', 'prescribed period', 'time barred', 'condonation of delay'],
}

let reclassified = 0;
let miscBefore = questions.filter(q => q.subject === 'Miscellaneous').length;

questions.forEach(q => {
  if (q.subject !== 'Miscellaneous') return;
  
  const text = (q.question + ' ' + q.options.join(' ')).toLowerCase();
  let bestMatch = null, bestScore = 0;
  
  for (const [subject, keywords] of Object.entries(EXTRA_KEYWORDS)) {
    let score = 0;
    keywords.forEach(kw => {
      if (text.includes(kw)) score++;
    });
    if (score > bestScore) { bestScore = score; bestMatch = subject; }
  }
  
  if (bestMatch && bestScore >= 1) {
    q.subject = bestMatch;
    reclassified++;
  }
});

let miscAfter = questions.filter(q => q.subject === 'Miscellaneous').length;
console.log(`Reclassified: ${reclassified} questions (${miscBefore} → ${miscAfter} Misc)\n`);

// Show remaining Misc questions
questions.filter(q => q.subject === 'Miscellaneous' && q.set === 'A').forEach(q => {
  console.log(`  [${q.exam} Q${q.questionNumber}] ${q.question.substring(0, 100)}...`);
});

// 3. Rebalance difficulty
// Current: 211 easy, 64 medium, 9 hard — way too skewed
// New heuristic: based on question length, option complexity, and legal specificity
let diffChanges = { easy: 0, medium: 0, hard: 0 };

questions.forEach(q => {
  const text = q.question + ' ' + q.options.join(' ');
  const len = text.length;
  const hasNegative = /\b(not|except|incorrect|false|wrong|neither)\b/i.test(q.question);
  const hasAssert = /assertion|reason|statement.*statement/i.test(q.question);
  const hasMultiPart = /\b(i\.|ii\.|iii\.|iv\.|\(a\).*\(b\).*\(c\)|both.*and)\b/i.test(text);
  const hasProviso = /proviso|explanation|exception|provided that/i.test(text);
  const optionLen = q.options.reduce((s, o) => s + o.length, 0);
  
  let score = 0;
  if (len > 400) score += 2;
  else if (len > 250) score += 1;
  if (hasNegative) score += 1;
  if (hasAssert) score += 2;
  if (hasMultiPart) score += 2;
  if (hasProviso) score += 1;
  if (optionLen > 200) score += 1;
  if (q.options.some(o => o.length > 80)) score += 1;
  
  const oldDiff = q.difficulty;
  if (score >= 4) q.difficulty = 'hard';
  else if (score >= 2) q.difficulty = 'medium';
  else q.difficulty = 'easy';
  
  if (oldDiff !== q.difficulty) diffChanges[q.difficulty]++;
});

// Count new distribution
const newDiff = { easy: 0, medium: 0, hard: 0 };
questions.filter(q => q.set === 'A').forEach(q => newDiff[q.difficulty]++);
console.log('\nDifficulty rebalanced:');
console.log('  Before: 211 easy, 64 medium, 9 hard');
console.log('  After:', newDiff);
console.log('  Changes:', diffChanges);

// Save
fs.writeFileSync('src/data/questions.json', JSON.stringify(questions, null, 2));
console.log('\nSaved improved questions.json');

// Regenerate trends and difficulty
const unique = [];
const seen = new Set();
questions.forEach(q => {
  if (q.set === 'A') {
    const key = `${q.exam}-${q.questionNumber}`;
    if (!seen.has(key)) { seen.add(key); unique.push(q); }
  }
});

// Trends
const trends = {};
unique.forEach(q => {
  if (!trends[q.subject]) trends[q.subject] = {};
  if (!trends[q.subject][q.exam]) trends[q.subject][q.exam] = 0;
  trends[q.subject][q.exam]++;
});
fs.writeFileSync('src/data/trends.json', JSON.stringify(trends, null, 2));

// Difficulty
const byExam = {}, bySubject = {};
unique.forEach(q => {
  if (!byExam[q.exam]) byExam[q.exam] = { easy:0, medium:0, hard:0 };
  byExam[q.exam][q.difficulty]++;
  if (!bySubject[q.subject]) bySubject[q.subject] = { easy:0, medium:0, hard:0 };
  bySubject[q.subject][q.difficulty]++;
});
fs.writeFileSync('src/data/difficulty.json', JSON.stringify({ byExam, bySubject }, null, 2));

console.log('Regenerated trends.json and difficulty.json');
