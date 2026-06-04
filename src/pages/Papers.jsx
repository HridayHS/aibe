import { Link } from 'react-router-dom'
import questions from '../data/questions.json'
import './Papers.css'

const PDF_BASE = '/pdfs/'

const exams = [
  { id: 'aibe20', name: 'AIBE 20', year: 2025, date: 'November 30, 2025',
    pdf: 'aibe-20-set-a-with-solutions.pdf',
    totalQ: 100, hasAnswers: true, hasSolutions: true },
  { id: 'aibe19', name: 'AIBE 19', year: 2024, date: '2024',
    pdf: 'aibe-19-set-a-with-solutions.pdf',
    totalQ: 100, hasAnswers: true, hasSolutions: true },
  { id: 'aibe18', name: 'AIBE 18', year: 2024, date: '2024',
    pdf: 'aibe-18-set-a-with-solutions.pdf',
    totalQ: 100, hasAnswers: true, hasSolutions: true },
  { id: 'aibe17', name: 'AIBE 17', year: 2023, date: '2023',
    pdf: 'aibe-17-set-a-with-solutions.pdf',
    totalQ: 100, hasAnswers: true, hasSolutions: true },
  { id: 'aibe16', name: 'AIBE 16', year: 2022, date: '2022',
    pdf: 'aibe-16-set-a-with-solutions.pdf',
    totalQ: 100, hasAnswers: true, hasSolutions: true },
  { id: 'aibe15', name: 'AIBE 15', year: 2021, date: '2021',
    pdf: 'aibe-15-set-a-with-solutions.pdf',
    totalQ: 100, hasAnswers: true, hasSolutions: true },
  { id: 'aibe14', name: 'AIBE 14', year: 2019, date: 'September 15, 2019',
    pdf: 'aibe-14-set-a-with-solutions.pdf',
    totalQ: 100, hasAnswers: true, hasSolutions: true },
]

export default function Papers() {
  const getCount = (exam) => questions.filter(q => q.exam === exam).length

  return (
    <div className="papers-page">
      <div className="page-header">
        <h1>Question Papers</h1>
        <p>Access AIBE exam papers with solutions — practice online or download PDFs</p>
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
                  <span className="tag tag-gold">{count} Questions</span>
                  {exam.hasAnswers && <span className="tag tag-green">Answers Verified ✓</span>}
                  {exam.hasSolutions && <span className="tag tag-blue">Solutions Included ✓</span>}
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

              {/* PDF Download */}
              <div className="paper-pdfs-section">
                <h4>Question Paper with Solutions</h4>
                <div className="pdf-links-list">
                  <div className="pdf-link-item">
                    <span className="pdf-set-label">Set A — Questions, Answers & Solutions</span>
                    <div className="pdf-action-buttons">
                      <a href={PDF_BASE + exam.pdf} target="_blank" rel="noopener noreferrer" className="pdf-btn-link view">
                        👁️ View
                      </a>
                      <a href={PDF_BASE + exam.pdf} download className="pdf-btn-link download">
                        ⬇️ Download
                      </a>
                    </div>
                  </div>
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
        <h3>📋 About These Papers</h3>
        <p>
          All 7 AIBE exam papers (AIBE 14–20) are available with verified answer keys, step-by-step solutions, and quick tips for every question.
        </p>
        <p style={{ color: 'var(--text-tertiary)', fontSize: '0.85rem', marginTop: '0.5rem' }}>
          Questions referencing old laws (IPC, CrPC, Evidence Act) include updated references to the new BNS, BNSS, and BSA.
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
