import { useState } from 'react'
import './Reference.css'

// Extract key legal concepts from actual questions
const extractedMaxims = [
  { latin: 'Audi alteram partem', meaning: 'Hear the other side', usage: 'A fundamental principle of natural justice requiring that no person should be judged without a fair hearing.' },
  { latin: 'Nemo judex in causa sua', meaning: 'No one should be a judge in their own cause', usage: 'Rule against bias — ensures impartiality in judicial proceedings.' },
  { latin: 'Res ipsa loquitur', meaning: 'The thing speaks for itself', usage: 'In tort law, establishes a presumption of negligence from the very nature of the accident.' },
  { latin: 'Actus non facit reum nisi mens sit rea', meaning: 'An act does not make a person guilty unless the mind is also guilty', usage: 'Foundation of criminal liability — requires both actus reus and mens rea.' },
  { latin: 'Ignorantia juris non excusat', meaning: 'Ignorance of law is no excuse', usage: 'Every person is presumed to know the law.' },
  { latin: 'Volenti non fit injuria', meaning: 'To a willing person, no injury is done', usage: 'Defense in tort law — voluntary assumption of risk.' },
  { latin: 'Ubi jus ibi remedium', meaning: 'Where there is a right, there is a remedy', usage: 'For every legal wrong, there must be a legal remedy available.' },
  { latin: 'Salus populi suprema lex', meaning: 'The welfare of the people is the supreme law', usage: 'Used in constitutional interpretation for public welfare.' },
  { latin: 'Res judicata', meaning: 'A matter already judged', usage: 'Prevents re-litigation of issues already decided. Section 11 CPC.' },
  { latin: 'Res sub judice', meaning: 'A matter under judgment', usage: 'Stay of suit where another suit is pending. Section 10 CPC.' },
  { latin: 'Damnum sine injuria', meaning: 'Damage without legal injury', usage: 'Legal damage without violation of a legal right — no remedy available.' },
  { latin: 'Injuria sine damno', meaning: 'Legal injury without damage', usage: 'Violation of a legal right even without actual damage — remedy available.' },
  { latin: 'Qui facit per alium facit per se', meaning: 'He who acts through another acts himself', usage: 'Basis of vicarious liability — principal liable for agent acts.' },
  { latin: 'Obiter dictum', meaning: 'Said in passing', usage: 'Remarks made by judge that are not essential to the decision. Not binding but persuasive.' },
  { latin: 'Ratio decidendi', meaning: 'Reason for the decision', usage: 'The legal principle on which the court decision is based. Binding on lower courts.' },
  { latin: 'Ultra vires', meaning: 'Beyond the powers', usage: 'An act beyond the legal authority of the entity performing it.' },
]

// Key historical cases frequently referenced in AIBE
const keyCases = [
  { name: 'Kesavananda Bharati v. State of Kerala (1973)', subject: 'Constitutional Law', significance: 'Established the Basic Structure Doctrine — Parliament cannot alter the basic structure of the Constitution.' },
  { name: 'Maneka Gandhi v. Union of India (1978)', subject: 'Constitutional Law', significance: 'Expanded Article 21 — right to life includes right to live with dignity. Procedure must be just, fair and reasonable.' },
  { name: 'Vishakha v. State of Rajasthan (1997)', subject: 'Constitutional Law', significance: 'Guidelines for prevention of sexual harassment at workplace. Led to POSH Act, 2013.' },
  { name: 'Golaknath v. State of Punjab (1967)', subject: 'Constitutional Law', significance: 'Fundamental rights cannot be amended by Parliament.' },
  { name: 'Minerva Mills v. Union of India (1980)', subject: 'Constitutional Law', significance: 'Harmony between Fundamental Rights and DPSPs. Judicial review is part of basic structure.' },
  { name: 'MC Mehta v. Union of India (1987)', subject: 'Environmental Law', significance: 'Absolute liability principle for hazardous industries. Oleum Gas Leak Case.' },
  { name: 'Navtej Singh Johar v. Union of India (2018)', subject: 'Constitutional Law', significance: 'Decriminalized homosexuality by reading down Section 377 IPC.' },
  { name: 'K.S. Puttaswamy v. Union of India (2017)', subject: 'Constitutional Law', significance: 'Right to privacy is a fundamental right under Article 21.' },
  { name: 'Ajay Hasia v. Khalid Mujib (1981)', subject: 'Constitutional Law', significance: 'Test for "other authorities" under Article 12 — government company can be State.' },
  { name: 'Basheshar Nath v. IT Commissioner (1959)', subject: 'Constitutional Law', significance: 'Fundamental rights cannot be waived.' },
  { name: 'R.D. Shetty v. International Airport Authority (1979)', subject: 'Constitutional Law', significance: 'Extended Article 12 to instrumentalities of the State.' },
]

// Landmark cases from 2024 and 2025
const recentCases = [
  {
    name: "Association for Democratic Reforms v. Union of India (2024)",
    subject: "Constitutional Law",
    significance: "Struck down the Electoral Bonds Scheme as unconstitutional, holding that anonymous political funding violates the voters' Right to Information under Article 19(1)(a)."
  },
  {
    name: "State of Punjab v. Davinder Singh (2024)",
    subject: "Constitutional Law",
    significance: "A 7-judge Constitution Bench held that states have the legislative power to sub-classify Scheduled Castes (SCs) and Scheduled Tribes (STs) for reservation to target more backward subgroups, overruling the 2004 E.V. Chinnaiah precedent."
  },
  {
    name: "M.K. Ranjitsinh v. Union of India (2024)",
    subject: "Environmental Law",
    significance: "Established that citizens have a fundamental right against the adverse effects of climate change, derived from Article 21 (Right to Life) and Article 14 (Equality)."
  },
  {
    name: "Gayatri Balasamy v. ISG Novasoft Technologies Ltd. (2025)",
    subject: "ADR & Arbitration",
    significance: "A 5-judge bench held that courts under Section 34 of the Arbitration Act cannot modify, rewrite, or vary an arbitral award; they can only set it aside or remit it back to the tribunal."
  },
  {
    name: "Mineral Area Development Authority v. Steel Authority of India (2024)",
    subject: "Tax Law",
    significance: "A 9-judge bench ruled that royalty paid on mineral rights is a contractual payment and not a tax. Held that states possess the power to tax mineral-bearing lands, overruling the 1989 India Cement case."
  },
  {
    name: "Aligarh Muslim University v. Naresh Mansukhani (2024)",
    subject: "Constitutional Law",
    significance: "A 7-judge bench overruled S. Azeez Basha (1967), laying down a modern institutional history test to determine minority status under Article 30."
  },
  {
    name: "Kuldeep Kumar v. U.T. Chandigarh (2024)",
    subject: "Constitutional Law",
    significance: "Invoked Article 142 plenary powers to set aside election fraud in mayoral elections, reinforcing the basic feature of free and fair elections."
  },
  {
    name: "All India Judges Association v. Union of India (2025)",
    subject: "Legal Ethics / Service Law",
    significance: "Mandated a minimum of three years of active court practice for candidates to be eligible for appointment as civil judges in the lower judiciary."
  }
]

// Mock interactive questions for recent cases
const mockQuestions = [
  {
    id: 'case-q1',
    caseName: 'Association for Democratic Reforms v. Union of India (2024)',
    question: "In the landmark Electoral Bonds Case, on which grounds did the Supreme Court declare the Electoral Bonds Scheme unconstitutional?",
    options: [
      "It violated the Right to Information of voters under Article 19(1)(a)",
      "It violated the Right to Trade under Article 19(1)(g)",
      "It violated Article 370 of the Constitution",
      "It violated the Right to Property under Article 300A"
    ],
    correctAnswer: "A",
    explanation: "The 5-judge Constitution Bench held that the non-disclosure of political funding information violates the voters' Right to Information enshrined in Article 19(1)(a)."
  },
  {
    id: 'case-q2',
    caseName: 'State of Punjab v. Davinder Singh (2024)',
    question: "What did the 7-judge Constitution Bench rule regarding the sub-classification of Scheduled Castes (SCs) and Scheduled Tribes (STs)?",
    options: [
      "States are prohibited from making any sub-classification",
      "States have the power to sub-classify SCs and STs for reservation to target more backward groups",
      "Only the President can sub-classify SCs and STs",
      "Sub-classification is allowed only in the private sector"
    ],
    correctAnswer: "B",
    explanation: "The Supreme Court overruled the E.V. Chinnaiah judgment, holding that sub-classification is permissible under Article 341 to ensure reservation benefits reach the most disadvantaged subgroups."
  },
  {
    id: 'case-q3',
    caseName: 'M.K. Ranjitsinh v. Union of India (2024)',
    question: "In M.K. Ranjitsinh v. Union of India, the Supreme Court recognized the right to be free from the adverse effects of climate change under which constitutional provisions?",
    options: [
      "Article 21 and Article 14",
      "Article 19 and Article 25",
      "Article 32 and Article 226",
      "Article 48A and Article 51A(g) only"
    ],
    correctAnswer: "A",
    explanation: "The Court held that the right to clean environment and the right against the adverse effects of climate change are fundamental rights stemming from Article 21 (Right to Life) and Article 14 (Equality)."
  },
  {
    id: 'case-q4',
    caseName: 'Gayatri Balasamy v. ISG Novasoft Technologies Ltd. (2025)',
    question: "Regarding Section 34 of the Arbitration and Conciliation Act, 1996, what did the 5-judge bench rule in Gayatri Balasamy (2025)?",
    options: [
      "Courts have unlimited power to modify arbitral awards on merits",
      "Courts can rewrite the commercial terms of an arbitral award",
      "Courts cannot modify or rewrite an arbitral award; they can only set it aside or remit it",
      "Arbitral awards are immune to any court challenges under Section 34"
    ],
    correctAnswer: "C",
    explanation: "The Court held that the power to set aside an award under Section 34 does not include the power to modify, amend, or rewrite the award, preserving the principle of minimal judicial intervention."
  },
  {
    id: 'case-q5',
    caseName: 'Mineral Area Development Authority v. Steel Authority of India (2024)',
    question: "In the 9-judge bench decision in Mineral Area Development Authority (2024), what was ruled regarding royalty paid on minerals?",
    options: [
      "Royalty is a tax, and states cannot levy additional mineral taxes",
      "Royalty is not a tax, and states possess the power to tax mineral rights and mineral-bearing lands",
      "Only the Central Government can collect royalty",
      "Royalty payments are unconstitutional"
    ],
    correctAnswer: "B",
    explanation: "The Court overruled the 1989 India Cement decision, holding that royalty is a contractual payment to the owner of mineral rights, not a tax, and does not limit the states' legislative power to tax mineral rights."
  },
  {
    id: 'case-q6',
    caseName: 'Aligarh Muslim University v. Naresh Mansukhani (2024)',
    question: "In the 2024 Aligarh Muslim University (AMU) case, which landmark 1967 precedent was overruled by the 7-judge Constitution Bench?",
    options: [
      "S. Azeez Basha v. Union of India",
      "T.M.A. Pai Foundation v. State of Karnataka",
      "In re Kerala Education Bill",
      "St. Stephen's College v. University of Delhi"
    ],
    correctAnswer: "A",
    explanation: "The Court overruled S. Azeez Basha, which had held that an institution incorporated by central legislation (like AMU) can never claim a minority status under Article 30."
  },
  {
    id: 'case-q7',
    caseName: 'Kuldeep Kumar v. U.T. Chandigarh (2024)',
    question: "In the Chandigarh Mayoral Election case (2024), which constitutional power did the Supreme Court invoke to declare the candidate winner after finding election fraud?",
    options: [
      "Article 136 (Special Leave Petition)",
      "Article 142 (Plenary power to do complete justice)",
      "Article 226 (Writ jurisdiction)",
      "Article 324 (Election Commission powers)"
    ],
    correctAnswer: "B",
    explanation: "The Supreme Court invoked Article 142 to declare the candidate winner directly, bypassing a re-election to prevent further democracy dilution due to mayoral poll manipulation."
  },
  {
    id: 'case-q8',
    caseName: 'All India Judges Association v. Union of India (2025)',
    question: "What qualification did the Supreme Court mandate for candidates appearing for lower judiciary appointments in All India Judges Association (2025)?",
    options: [
      "A Master of Laws (LL.M.) degree",
      "At least 5 years of experience in corporate law firms",
      "A minimum of three years of active court practice as an advocate",
      "No practice experience is required, only a basic LL.B. degree"
    ],
    correctAnswer: "C",
    explanation: "The Supreme Court mandated that a minimum of three years of court practice is necessary for lower judiciary recruitment to ensure candidates possess practical litigation experience."
  }
]

export default function Reference() {
  const [tab, setTab] = useState('maxims')
  const [search, setSearch] = useState('')
  const [selectedAnswers, setSelectedAnswers] = useState({})

  const filteredMaxims = extractedMaxims.filter(m =>
    m.latin.toLowerCase().includes(search.toLowerCase()) ||
    m.meaning.toLowerCase().includes(search.toLowerCase())
  )

  const filteredHistorical = keyCases.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.significance.toLowerCase().includes(search.toLowerCase())
  )

  const filteredRecent = recentCases.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.significance.toLowerCase().includes(search.toLowerCase())
  )

  const handleSelectOption = (qId, optionIdx) => {
    if (selectedAnswers[qId] !== undefined) return // Answer already locked
    setSelectedAnswers(prev => ({ ...prev, [qId]: optionIdx }))
  }

  return (
    <div className="reference-page">
      <div className="page-header">
        <h1>Legal Reference</h1>
        <p>Essential Latin maxims, landmark cases, and recent Supreme Court judgments</p>
      </div>

      <div className="ref-tabs">
        <button className={`tab-btn ${tab === 'maxims' ? 'active' : ''}`} onClick={() => { setTab('maxims'); setSearch('') }}>
          📜 Latin Maxims ({extractedMaxims.length})
        </button>
        <button className={`tab-btn ${tab === 'historical' ? 'active' : ''}`} onClick={() => { setTab('historical'); setSearch('') }}>
          🏛️ Landmark Cases ({keyCases.length})
        </button>
        <button className={`tab-btn ${tab === 'recent' ? 'active' : ''}`} onClick={() => { setTab('recent'); setSearch('') }}>
          🔥 Recent Judgments (2024–2025)
        </button>
      </div>

      {tab !== 'recent' && (
        <div className="search-wrapper" style={{ marginBottom: '1.5rem' }}>
          <span className="search-icon">🔍</span>
          <input
            type="text"
            className="search-input"
            placeholder={tab === 'maxims' ? 'Search maxims...' : 'Search historical cases...'}
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
      )}

      {tab === 'maxims' && (
        <div className="maxims-grid">
          {filteredMaxims.map((m, i) => (
            <div key={i} className="maxim-card glass-card">
              <div className="maxim-latin">{m.latin}</div>
              <div className="maxim-meaning">{m.meaning}</div>
              <div className="maxim-usage">{m.usage}</div>
            </div>
          ))}
        </div>
      )}

      {tab === 'historical' && (
        <div className="cases-list">
          {filteredHistorical.map((c, i) => (
            <div key={i} className="case-card glass-card">
              <div className="case-header">
                <h3 className="case-name">{c.name}</h3>
                <span className="tag tag-gold">{c.subject}</span>
              </div>
              <p className="case-significance">{c.significance}</p>
            </div>
          ))}
        </div>
      )}

      {tab === 'recent' && (
        <div className="recent-container">
          {/* Quick Case Reference */}
          <section className="recent-section" style={{ marginBottom: '2.5rem' }}>
            <h2>⚖️ Recent Landmark Rulings</h2>
            <p className="section-desc" style={{ marginBottom: '1.25rem', color: 'var(--text-secondary)' }}>
              These high-profile Supreme Court decisions from 2024 and 2025 are highly likely to appear on the upcoming AIBE exam.
            </p>
            <div className="cases-list">
              {filteredRecent.map((c, i) => (
                <div key={i} className="case-card glass-card">
                  <div className="case-header">
                    <h3 className="case-name" style={{ color: 'var(--gold-300)', fontWeight: 600 }}>{c.name}</h3>
                    <span className="tag tag-gold">{c.subject}</span>
                  </div>
                  <p className="case-significance">{c.significance}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Interactive Case Quiz */}
          <section className="recent-section">
            <h2>🧠 Recent Cases Practice Quiz</h2>
            <p className="section-desc" style={{ marginBottom: '1.5rem', color: 'var(--text-secondary)' }}>
              Test your knowledge on these recent decisions. Answers are locked once clicked.
            </p>
            <div className="cases-quiz">
              {mockQuestions.map((q, idx) => {
                const selectedIdx = selectedAnswers[q.id]
                const correctLetterIdx = q.correctAnswer.charCodeAt(0) - 65
                const isAnswered = selectedIdx !== undefined

                return (
                  <div key={q.id} className="quiz-card glass-card" style={{ marginBottom: '1.5rem', padding: '1.5rem' }}>
                    <div className="quiz-q-header" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                      <span className="q-badge" style={{ color: 'var(--gold-400)', fontWeight: 600 }}>Question {idx + 1}</span>
                      <span className="case-source-tag" style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', fontStyle: 'italic' }}>{q.caseName}</span>
                    </div>
                    <p className="quiz-q-text" style={{ fontSize: '1rem', fontWeight: 500, marginBottom: '1rem' }}>{q.question}</p>
                    
                    <div className="quiz-options" style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                      {q.options.map((opt, optIdx) => {
                        const optLetter = String.fromCharCode(65 + optIdx)
                        let optClass = ""
                        
                        if (isAnswered) {
                          if (optIdx === correctLetterIdx) {
                            optClass = "correct"
                          } else if (optIdx === selectedIdx) {
                            optClass = "wrong"
                          } else {
                            optClass = "dimmed"
                          }
                        }

                        return (
                          <div 
                            key={optIdx} 
                            className={`q-option ${optClass}`}
                            onClick={() => handleSelectOption(q.id, optIdx)}
                            style={{ cursor: isAnswered ? 'default' : 'pointer' }}
                          >
                            <span className="opt-letter">{optLetter}</span>
                            <span>{opt}</span>
                          </div>
                        )
                      })}
                    </div>

                    {isAnswered && (
                      <div className="quiz-explanation-box" style={{ 
                        marginTop: '1.25rem', 
                        padding: '1rem', 
                        borderRadius: 'var(--radius-md)', 
                        background: 'rgba(201,168,76,0.06)', 
                        border: '1px solid rgba(201,168,76,0.15)',
                        fontSize: '0.9rem',
                        lineHeight: 1.5
                      }}>
                        <strong style={{ color: 'var(--gold-300)', display: 'block', marginBottom: '0.25rem' }}>
                          {selectedIdx === correctLetterIdx ? '✅ Correct!' : '❌ Incorrect'} (Answer: Option {q.correctAnswer})
                        </strong>
                        {q.explanation}
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </section>
        </div>
      )}
    </div>
  )
}
