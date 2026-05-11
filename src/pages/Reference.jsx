import { useState } from 'react'
import { PLACEHOLDER_MAXIMS } from '../data/placeholder'
import './Reference.css'

// Extract key legal concepts from actual questions
import questions from '../data/questions.json'

// Auto-extract Latin maxims mentioned in questions
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

// Key cases frequently referenced in AIBE
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

export default function Reference() {
  const [tab, setTab] = useState('maxims')
  const [search, setSearch] = useState('')

  const filteredMaxims = extractedMaxims.filter(m =>
    m.latin.toLowerCase().includes(search.toLowerCase()) ||
    m.meaning.toLowerCase().includes(search.toLowerCase())
  )

  const filteredCases = keyCases.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.significance.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="reference-page">
      <div className="page-header">
        <h1>Legal Reference</h1>
        <p>Essential Latin maxims and landmark cases for AIBE preparation</p>
      </div>

      <div className="ref-tabs">
        <button className={`tab-btn ${tab === 'maxims' ? 'active' : ''}`} onClick={() => setTab('maxims')}>
          📜 Latin Maxims ({extractedMaxims.length})
        </button>
        <button className={`tab-btn ${tab === 'cases' ? 'active' : ''}`} onClick={() => setTab('cases')}>
          ⚖️ Landmark Cases ({keyCases.length})
        </button>
      </div>

      <div className="search-wrapper" style={{ marginBottom: '1.5rem' }}>
        <span className="search-icon">🔍</span>
        <input
          type="text"
          className="search-input"
          placeholder={tab === 'maxims' ? 'Search maxims...' : 'Search cases...'}
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>

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

      {tab === 'cases' && (
        <div className="cases-list">
          {filteredCases.map((c, i) => (
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
    </div>
  )
}
