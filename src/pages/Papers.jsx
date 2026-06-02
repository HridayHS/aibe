import { Link } from 'react-router-dom'
import questions from '../data/questions.json'
import './Papers.css'

const PDF_BASE = '/pdfs/'

const exams = [
  { id: 'aibe20', name: 'AIBE 20', year: 2025, date: 'November 30, 2025',
    sets: [
      { code: 'A', pdf: 'aibe-20-set-a.pdf' },
      { code: 'D', pdf: 'aibe-20-set-d.pdf' },
    ],
    totalQ: 100, hasAnswers: true },
  { id: 'aibe19', name: 'AIBE 19', year: 2024, date: '2024',
    sets: [
      { code: 'A', pdf: 'aibe-19-set-a.pdf' },
      { code: 'B', pdf: 'aibe-19-set-b.pdf' },
      { code: 'C', pdf: 'aibe-19-set-c.pdf' },
      { code: 'D', pdf: 'aibe-19-set-d.pdf' },
    ],
    answerKeyPdf: 'aibe-19-answer-key.pdf',
    totalQ: 100, hasAnswers: true },
  { id: 'aibe18', name: 'AIBE 18', year: 2023, date: '2023',
    sets: [
      { code: 'A', pdf: 'aibe-18-set-a.pdf' },
    ],
    totalQ: 100, hasAnswers: true },
]

export default function Papers() {
  const getCount = (exam) => questions.filter(q => q.exam === exam).length

  return (
    <div className="papers-page">
      <div className="page-header">
        <h1>Question Papers</h1>
        <p>Access AIBE exam papers — practice online or download original PDFs</p>
      </div>

      <div className="papers-list">
        {exams.map(exam => {
          const count = getCount(exam.name)
          return (
            <div key={exam.id} className="paper-card glass-card">
              <div className="paper-header">
                <div>
                  <h2 className="paper-name">{exam.name}</h2>
                  <span className="paper-date">{exam.date}</span>
                </div>
                <div className="paper-meta">
                  <span className="tag tag-gold">{count} Questions Extracted</span>
                  {exam.hasAnswers && <span className="tag tag-green">Answer Key Verified ✓</span>}
                </div>
              </div>

              {/* Extraction progress bar */}
              <div className="paper-progress-section">
                <div className="progress-labels">
                  <span>Data Coverage</span>
                  <span>{count}% complete</span>
                </div>
                <div className="set-bar">
                  <div className="set-fill" style={{ width: `${count}%` }} />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="paper-actions-row">
                <Link to="/mock-test" className="btn btn-primary">
                  📝 Start Mock Test
                </Link>
                <Link to="/questions" className="btn btn-secondary">
                  🔍 Browse Questions
                </Link>
              </div>

              {/* PDF Downloads */}
              <div className="paper-pdfs-section">
                <h4>Original Question Paper PDFs</h4>
                <div className="pdf-links-list">
                  {exam.sets.map(set => (
                    <div key={set.code} className="pdf-link-item">
                      <span className="pdf-set-label">Set {set.code} Original PDF</span>
                      <div className="pdf-action-buttons">
                        <a href={PDF_BASE + set.pdf} target="_blank" rel="noopener noreferrer" className="pdf-btn-link view">
                          👁️ View
                        </a>
                        <a href={PDF_BASE + set.pdf} download className="pdf-btn-link download">
                          ⬇️ Download
                        </a>
                      </div>
                    </div>
                  ))}
                  {exam.answerKeyPdf && (
                    <div className="pdf-link-item answer-key-item">
                      <span className="pdf-set-label">Official Answer Key PDF</span>
                      <div className="pdf-action-buttons">
                        <a href={PDF_BASE + exam.answerKeyPdf} target="_blank" rel="noopener noreferrer" className="pdf-btn-link view">
                          📋 View Key
                        </a>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Subject Breakdown */}
              <div className="paper-subjects">
                <h4>Subject Breakdown</h4>
                <div className="subject-chips">
                  {getSubjectBreakdown(exam.name).map(({ subject, count }) => (
                    <span key={subject} className="subject-chip">
                      {subject}: <strong>{count}</strong>
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )
        })}
      </div>

      <div className="papers-note glass-card">
        <h3>📋 Note on Data Coverage</h3>
        <p>
          We maintain a unified database of unique questions for each exam year. Duplicate questions across different sets have been consolidated for maximum study efficiency.
        </p>
        <p style={{ color: 'var(--text-tertiary)', fontSize: '0.85rem', marginTop: '0.5rem' }}>
          Original PDFs for all sets are provided above for reference.
        </p>
      </div>
    </div>
  )
}

function getSubjectBreakdown(exam) {
  const qs = questions.filter(q => q.exam === exam)
  const counts = {}
  qs.forEach(q => { counts[q.subject] = (counts[q.subject] || 0) + 1 })
  return Object.entries(counts).map(([subject, count]) => ({ subject, count })).sort((a, b) => b.count - a.count)
}
