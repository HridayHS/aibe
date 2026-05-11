import questions from '../data/questions.json'
import './Papers.css'

const exams = [
  { id: 'aibe20', name: 'AIBE 20', year: 2025, date: 'November 30, 2025', sets: ['A', 'D'], totalQ: 100, hasAnswers: true },
  { id: 'aibe19', name: 'AIBE 19', year: 2024, date: '2024', sets: ['A', 'B', 'C', 'D'], totalQ: 100, hasAnswers: true },
  { id: 'aibe18', name: 'AIBE 18', year: 2023, date: '2023', sets: ['C'], totalQ: 100, hasAnswers: false },
]

export default function Papers() {
  const getCount = (exam, set) => questions.filter(q => q.exam === exam && q.set === set).length

  return (
    <div className="papers-page">
      <div className="page-header">
        <h1>Question Papers</h1>
        <p>Access AIBE exam papers with extracted questions and answers</p>
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
                const count = getCount(exam.name, set)
                return (
                  <div key={set} className="set-card">
                    <div className="set-label">Set {set}</div>
                    <div className="set-count">{count} questions extracted</div>
                    <div className="set-bar">
                      <div className="set-fill" style={{ width: `${count}%` }} />
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Subject breakdown for this exam */}
            <div className="paper-subjects">
              <h4>Subject Breakdown (Set {exam.sets[0]})</h4>
              <div className="subject-chips">
                {getSubjectBreakdown(exam.name, exam.sets[0]).map(({ subject, count }) => (
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
          <strong>AIBE 18:</strong> Only Set C (bilingual English-Hindi) was text-extractable. Other sets are scanned.
        </p>
        <p style={{ color: 'var(--text-tertiary)', fontSize: '0.85rem', marginTop: '0.5rem' }}>
          Since all sets within an exam contain the same questions (just reordered), one set per exam provides complete coverage.
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
