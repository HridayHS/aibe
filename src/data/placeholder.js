// Placeholder data - will be replaced with real extracted data from PDFs
export const EXAMS = [
  { id: 'aibe20', name: 'AIBE 20', year: 2025, date: 'Nov 30, 2025', sets: ['A', 'B', 'C', 'D'], totalQuestions: 100 },
  { id: 'aibe19', name: 'AIBE 19', year: 2024, date: '2024', sets: ['A', 'B', 'C', 'D'], totalQuestions: 100 },
  { id: 'aibe18', name: 'AIBE 18', year: 2023, date: '2023', sets: ['A', 'B', 'C', 'D'], totalQuestions: 100 },
  { id: 'aibe17', name: 'AIBE 17', year: 2022, date: '2022', sets: ['A', 'B', 'C', 'D'], totalQuestions: 100 },
];

export const SUBJECTS = [
  { id: 'constitutional', name: 'Constitutional Law', color: '#818cf8', icon: '⚖️' },
  { id: 'criminal', name: 'Criminal Law', color: '#f87171', icon: '🔒' },
  { id: 'civil', name: 'Civil Procedure', color: '#34d399', icon: '📋' },
  { id: 'corporate', name: 'Corporate Law', color: '#fbbf24', icon: '🏢' },
  { id: 'family', name: 'Family Law', color: '#f472b6', icon: '👨‍👩‍👧' },
  { id: 'property', name: 'Property Law', color: '#a78bfa', icon: '🏠' },
  { id: 'labor', name: 'Labour Law', color: '#fb923c', icon: '👷' },
  { id: 'tax', name: 'Tax Law', color: '#38bdf8', icon: '💰' },
  { id: 'environmental', name: 'Environmental Law', color: '#4ade80', icon: '🌿' },
  { id: 'ipr', name: 'Intellectual Property', color: '#e879f9', icon: '💡' },
  { id: 'cyber', name: 'Cyber Law', color: '#22d3ee', icon: '💻' },
  { id: 'adr', name: 'ADR & Arbitration', color: '#94a3b8', icon: '🤝' },
  { id: 'contract', name: 'Contract Law', color: '#f59e0b', icon: '📝' },
  { id: 'tort', name: 'Law of Torts', color: '#ef4444', icon: '⚠️' },
];

// Placeholder questions - will be replaced with PDF-extracted data
export const PLACEHOLDER_QUESTIONS = [
  {
    id: 'aibe20-a-q1',
    exam: 'AIBE 20',
    year: 2025,
    set: 'A',
    questionNumber: 1,
    question: 'Under Article 21 of the Constitution of India, the right to life includes:',
    options: ['Right to livelihood', 'Right to education', 'Right to shelter', 'All of the above'],
    correctAnswer: 'D',
    subject: 'Constitutional Law',
    difficulty: 'easy',
  },
  {
    id: 'aibe20-a-q2',
    exam: 'AIBE 20',
    year: 2025,
    set: 'A',
    questionNumber: 2,
    question: 'Section 300 of the Indian Penal Code deals with:',
    options: ['Murder', 'Culpable homicide', 'Theft', 'Robbery'],
    correctAnswer: 'A',
    subject: 'Criminal Law',
    difficulty: 'easy',
  },
  {
    id: 'aibe20-a-q3',
    exam: 'AIBE 20',
    year: 2025,
    set: 'A',
    questionNumber: 3,
    question: 'Which section of CPC deals with Res Judicata?',
    options: ['Section 10', 'Section 11', 'Section 12', 'Section 13'],
    correctAnswer: 'B',
    subject: 'Civil Procedure',
    difficulty: 'medium',
  },
];

// Placeholder trends
export const PLACEHOLDER_TRENDS = {
  subjects: [
    { name: 'Constitutional Law', 2022: 15, 2023: 14, 2024: 16, 2025: 15 },
    { name: 'Criminal Law', 2022: 12, 2023: 13, 2024: 12, 2025: 14 },
    { name: 'Civil Procedure', 2022: 10, 2023: 11, 2024: 10, 2025: 11 },
    { name: 'Corporate Law', 2022: 8, 2023: 9, 2024: 8, 2025: 9 },
    { name: 'Family Law', 2022: 8, 2023: 7, 2024: 8, 2025: 7 },
    { name: 'Property Law', 2022: 7, 2023: 7, 2024: 6, 2025: 7 },
    { name: 'Labour Law', 2022: 6, 2023: 6, 2024: 7, 2025: 6 },
    { name: 'Tax Law', 2022: 5, 2023: 5, 2024: 5, 2025: 5 },
    { name: 'Contract Law', 2022: 8, 2023: 7, 2024: 8, 2025: 7 },
    { name: 'Law of Torts', 2022: 5, 2023: 5, 2024: 5, 2025: 4 },
    { name: 'Environmental Law', 2022: 4, 2023: 4, 2024: 4, 2025: 5 },
    { name: 'Cyber Law', 2022: 4, 2023: 4, 2024: 3, 2025: 4 },
    { name: 'ADR & Arbitration', 2022: 4, 2023: 4, 2024: 4, 2025: 3 },
    { name: 'Intellectual Property', 2022: 4, 2023: 4, 2024: 4, 2025: 3 },
  ],
};

// Placeholder flashcards
export const PLACEHOLDER_FLASHCARDS = [
  { id: 1, subject: 'Constitutional Law', front: 'What is Article 14?', back: 'Equality before law — The State shall not deny to any person equality before the law or the equal protection of the laws within the territory of India.' },
  { id: 2, subject: 'Constitutional Law', front: 'What is Article 19?', back: 'Protection of certain rights regarding freedom of speech — 6 freedoms guaranteed to citizens.' },
  { id: 3, subject: 'Criminal Law', front: 'Section 302 IPC?', back: 'Punishment for murder — Whoever commits murder shall be punished with death, or imprisonment for life, and shall also be liable to fine.' },
  { id: 4, subject: 'Civil Procedure', front: 'What is Order VII Rule 11 CPC?', back: 'Rejection of plaint — when it does not disclose a cause of action, is undervalued, insufficiently stamped, barred by law, or not filed in duplicate.' },
  { id: 5, subject: 'Contract Law', front: 'Section 2(h) - Indian Contract Act?', back: 'Definition of Contract — An agreement enforceable by law is a contract.' },
  { id: 6, subject: 'Family Law', front: 'Hindu Marriage Act - Section 13?', back: 'Grounds for divorce — including adultery, cruelty, desertion for 2+ years, conversion, unsoundness of mind, communicable disease, renunciation, and presumption of death.' },
];

// Placeholder maxims
export const PLACEHOLDER_MAXIMS = [
  { latin: 'Audi alteram partem', meaning: 'Hear the other side', usage: 'A fundamental principle of natural justice requiring that no person should be judged without a fair hearing.' },
  { latin: 'Nemo judex in causa sua', meaning: 'No one should be a judge in their own cause', usage: 'Rule against bias — ensures impartiality in judicial proceedings.' },
  { latin: 'Res ipsa loquitur', meaning: 'The thing speaks for itself', usage: 'In tort law, establishes a presumption of negligence from the very nature of the accident.' },
  { latin: 'Actus non facit reum nisi mens sit rea', meaning: 'An act does not make a person guilty unless the mind is also guilty', usage: 'The foundation of criminal liability — requires both actus reus and mens rea.' },
  { latin: 'Ignorantia juris non excusat', meaning: 'Ignorance of law is no excuse', usage: 'Every person is presumed to know the law; ignorance cannot be used as a defense.' },
  { latin: 'Volenti non fit injuria', meaning: 'To a willing person, no injury is done', usage: 'Defense in tort law — voluntary assumption of risk.' },
  { latin: 'Ubi jus ibi remedium', meaning: 'Where there is a right, there is a remedy', usage: 'For every legal wrong, there must be a legal remedy available.' },
  { latin: 'Salus populi suprema lex', meaning: 'The welfare of the people is the supreme law', usage: 'Used in constitutional interpretation to justify state action for public welfare.' },
];

// Placeholder predictions
export const PLACEHOLDER_PREDICTIONS = [
  { topic: 'Constitutional Law - Fundamental Rights', confidence: 95, reason: 'Consistently 15%+ weightage across all years' },
  { topic: 'Criminal Law - IPC Sections 299-304', confidence: 88, reason: 'Appeared in every AIBE since 2022' },
  { topic: 'CPC - Res Judicata & Res Sub Judice', confidence: 85, reason: 'High-frequency topic with increasing trend' },
  { topic: 'Contract Law - Void Agreements', confidence: 82, reason: 'Steady presence, conceptual questions repeated' },
  { topic: 'Family Law - Hindu Marriage Act', confidence: 80, reason: 'At least 3 questions per year from this act' },
  { topic: 'Environmental Law - NGT', confidence: 75, reason: 'Growing weightage trend, 3→5 questions' },
  { topic: 'Cyber Law - IT Act Sections', confidence: 72, reason: 'Modern relevance driving more questions' },
  { topic: 'ADR - Arbitration Act 1996', confidence: 70, reason: 'Consistent but lower priority' },
];
