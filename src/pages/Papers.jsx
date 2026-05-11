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
    totalQ: 100, hasAnswers: false },
]

export default function Papers() {
  const getCount = (exam, set) => questions.filter(q => q.exam === exam && q.set === set).length

  return (
    <div className="papers-page">
      <div className="page-header">
        <h1>Question Papers</h1>
        <p>Access AIBE exam papers — extracted questions and original PDFs</p>
      </div>

      <div className="papers-list">
        {exams.map(exam => (
          <div key={exam.id} className="paper-card glass-card">
            <div className="paper-header">
              <div>
                <h2 className="paper-name">{exam.name}</h2>
                <span className="paper-date">{exam.date}</span>
              </div>
              <div className="paper-meta">
                <span className="tag tag-gold">{exam.totalQ} Questions</span>
                {exam.hasAnswers && <span className="tag tag-green">Answer Key ✓</span>}
              </div>
            </div>

            <div className="sets-grid">
              {exam.sets.map(set => {
                const count = getCount(exam.name, set.code)
                return (
                  <div key={set.code} className="set-card">
                    <div className="set-top">
                      <div className="set-label">Set {set.code}</div>
                      <div className="set-actions">
                        <a href={PDF_BASE + set.pdf} target="_blank" rel="noopener noreferrer" className="pdf-btn view" title="View PDF">
                          👁️ View
                        </a>
                        <a href={PDF_BASE + set.pdf} download className="pdf-btn download" title="Download PDF">
                          ⬇️
                        </a>
                      </div>
                    </div>
                    <div className="set-count">{count} questions extracted</div>
                    <div className="set-bar">
                      <div className="set-fill" style={{ width: `${count}%` }} />
                    </div>
                  </div>
                )
              })}
            </div>

            {exam.answerKeyPdf && (
              <div className="ak-link">
                <a href={PDF_BASE + exam.answerKeyPdf} target="_blank" rel="noopener noreferrer" className="pdf-btn view">
                  📋 View Answer Key PDF
                </a>
              </div>
            )}

            <div className="paper-subjects">
              <h4>Subject Breakdown (Set {exam.sets[0].code})</h4>
              <div className="subject-chips">
                {getSubjectBreakdown(exam.name, exam.sets[0].code).map(({ subject, count }) => (
                  <span key={subject} className="subject-chip">
                    {subject}: <strong>{count}</strong>
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="papers-note glass-card">
        <h3>📋 Note on Data Coverage</h3>
        <p>
          <strong>AIBE 20:</strong> Sets A & D are text-based PDFs (fully extracted). Sets B & C are scanned images.
        </p>
        <p>
          <strong>AIBE 19:</strong> All 4 sets fully extracted with official answer key.
        </p>
        <p>
          <strong>AIBE 18:</strong> Set A fully extracted. No official answer key available.
        </p>
        <p style={{ color: 'var(--text-tertiary)', fontSize: '0.85rem', marginTop: '0.5rem' }}>
          All original PDFs are available for viewing/download above as a failsafe.
        </p>
      </div>
    </div>
  )
}

function getSubjectBreakdown(exam, set) {
  const qs = questions.filter(q => q.exam === exam && q.set === set)
  const counts = {}
  qs.forEach(q => { counts[q.subject] = (counts[q.subject] || 0) + 1 })
  return Object.entries(counts).map(([subject, count]) => ({ subject, count })).sort((a, b) => b.count - a.count)
}
