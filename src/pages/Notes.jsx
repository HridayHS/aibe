import { useState } from 'react'
import questions from '../data/questions.json'
import './Notes.css'

// Generate revision notes from question data analysis
const unique = []
const seen = new Set()
questions.forEach(q => {
  if (q.set === 'A') {
    const key = `${q.exam}-${q.questionNumber}`
    if (!seen.has(key)) { seen.add(key); unique.push(q) }
  }
})

// Extract key provisions mentioned in questions
function extractProvisions(qs) {
  const provisions = {}
  qs.forEach(q => {
    const text = (q.question + ' ' + q.options.join(' ')).toLowerCase()
    // Section numbers
    const sections = text.match(/section\s+\d+[a-z]?(?:\s*\(\d+\))?/gi) || []
    sections.forEach(s => {
      const key = s.trim()
      if (!provisions[key]) provisions[key] = { count: 0, exams: new Set() }
      provisions[key].count++
      provisions[key].exams.add(q.exam)
    })
    // Articles
    const articles = text.match(/article\s+\d+[a-z]?/gi) || []
    articles.forEach(a => {
      const key = a.trim()
      if (!provisions[key]) provisions[key] = { count: 0, exams: new Set() }
      provisions[key].count++
      provisions[key].exams.add(q.exam)
    })
  })
  return Object.entries(provisions)
    .map(([name, data]) => ({ name, count: data.count, exams: [...data.exams] }))
    .filter(p => p.count >= 1)
    .sort((a, b) => b.count - a.count)
    .slice(0, 15)
}

// Build subject notes
const subjectNotes = {}
const SUBJECTS = [...new Set(unique.map(q => q.subject))].sort()

SUBJECTS.forEach(subject => {
  const qs = unique.filter(q => q.subject === subject)
  const byExam = {}
  qs.forEach(q => { byExam[q.exam] = (byExam[q.exam] || 0) + 1 })

  const diffDist = { easy: 0, medium: 0, hard: 0 }
  qs.forEach(q => diffDist[q.difficulty]++)

  const provisions = extractProvisions(qs)

  // Key Acts mentioned
  const actCounts = {}
  const actPatterns = [
    /indian penal code|ipc/gi, /code of criminal procedure|crpc/gi, /code of civil procedure|cpc/gi,
    /evidence act/gi, /contract act/gi, /hindu marriage act/gi, /transfer of property/gi,
    /companies act/gi, /arbitration.*?act/gi, /advocates act/gi, /income.?tax act/gi,
    /information technology/gi, /bharatiya nyaya|bns/gi, /bharatiya nagarik|bnss/gi,
    /bharatiya sakshya|bsa/gi, /motor vehicle/gi, /consumer protection/gi,
    /payment of gratuity/gi, /industrial disputes?\s*act/gi, /limitation act/gi,
    /specific relief/gi, /negotiable instruments?\s*act/gi, /hindu succession/gi,
    /domestic violence/gi, /environment/gi, /wildlife/gi, /patent/gi, /copyright/gi,
    /trademark/gi, /constitution/gi,
  ]
  qs.forEach(q => {
    const text = (q.question + ' ' + q.options.join(' ')).toLowerCase()
    actPatterns.forEach(p => {
      const matches = text.match(p)
      if (matches) {
        const name = matches[0].trim()
        actCounts[name] = (actCounts[name] || 0) + 1
      }
    })
  })
  const keyActs = Object.entries(actCounts)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5)

  subjectNotes[subject] = {
    totalQuestions: qs.length,
    examBreakdown: byExam,
    difficultyDist: diffDist,
    weightage: Math.round((qs.length / unique.length) * 100),
    provisions,
    keyActs,
    trend: getTrend(byExam),
  }
})

function getTrend(byExam) {
  const years = Object.keys(byExam).sort()
  if (years.length < 2) return 'stable'
  const last = byExam[years[years.length - 1]] || 0
  const prev = byExam[years[years.length - 2]] || 0
  if (last > prev + 1) return 'increasing'
  if (last < prev - 1) return 'decreasing'
  return 'stable'
}

export default function Notes() {
  const [expanded, setExpanded] = useState(null)

  const toggle = (subject) => {
    setExpanded(expanded === subject ? null : subject)
  }

  const sorted = SUBJECTS.map(s => ({ subject: s, ...subjectNotes[s] }))
    .sort((a, b) => b.totalQuestions - a.totalQuestions)

  return (
    <div className="notes-page">
      <div className="page-header">
        <h1>Revision Notes</h1>
        <p>Subject-wise study guide compiled from {unique.length} questions across AIBE 18–20</p>
      </div>

      <div className="notes-overview glass-card">
        <h3>📊 Quick Overview</h3>
        <div className="overview-grid">
          {sorted.slice(0, 6).map(s => (
            <div key={s.subject} className="overview-item">
              <div className="ov-name">{s.subject}</div>
              <div className="ov-bar-track">
                <div className="ov-bar-fill" style={{ width: `${s.weightage * 3}%` }} />
              </div>
              <div className="ov-pct">{s.weightage}%</div>
            </div>
          ))}
        </div>
      </div>

      <div className="notes-list">
        {sorted.map(note => (
          <div key={note.subject} className={`note-card glass-card ${expanded === note.subject ? 'expanded' : ''}`}>
            <button className="note-header" onClick={() => toggle(note.subject)}>
              <div className="note-title">
                <h3>{note.subject}</h3>
                <div className="note-tags">
                  <span className="tag tag-gold">{note.totalQuestions} questions</span>
                  <span className="tag tag-outline">{note.weightage}% weightage</span>
                  <span className={`trend-badge ${note.trend}`}>
                    {note.trend === 'increasing' ? '📈 Increasing' : note.trend === 'decreasing' ? '📉 Decreasing' : '➡️ Stable'}
                  </span>
                </div>
              </div>
              <span className="note-chevron">{expanded === note.subject ? '▼' : '▶'}</span>
            </button>

            {expanded === note.subject && (
              <div className="note-body">
                {/* Exam breakdown */}
                <div className="note-section">
                  <h4>Questions per Exam</h4>
                  <div className="exam-bars">
                    {Object.entries(note.examBreakdown).sort().map(([exam, count]) => (
                      <div key={exam} className="exam-bar-row">
                        <span className="eb-name">{exam}</span>
                        <div className="eb-track">
                          <div className="eb-fill" style={{ width: `${count * 3}%` }} />
                        </div>
                        <span className="eb-count">{count}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Difficulty */}
                <div className="note-section">
                  <h4>Difficulty Distribution</h4>
                  <div className="diff-chips">
                    <span className="diff-chip easy">Easy: {note.difficultyDist.easy}</span>
                    <span className="diff-chip medium">Medium: {note.difficultyDist.medium}</span>
                    <span className="diff-chip hard">Hard: {note.difficultyDist.hard}</span>
                  </div>
                </div>

                {/* Key Acts */}
                {note.keyActs.length > 0 && (
                  <div className="note-section">
                    <h4>Key Acts / Statutes</h4>
                    <div className="acts-list">
                      {note.keyActs.map(a => (
                        <div key={a.name} className="act-item">
                          <span className="act-name">{a.name}</span>
                          <span className="act-count">{a.count}×</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Key Provisions */}
                {note.provisions.length > 0 && (
                  <div className="note-section">
                    <h4>Frequently Tested Provisions</h4>
                    <div className="prov-grid">
                      {note.provisions.map(p => (
                        <div key={p.name} className="prov-chip">
                          <span className="prov-name">{p.name}</span>
                          <span className="prov-meta">{p.count}× | {p.exams.join(', ')}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Study tip */}
                <div className="note-section study-tip">
                  <h4>💡 Study Tip</h4>
                  <p>
                    {note.trend === 'increasing'
                      ? `${note.subject} is getting more questions each year. Prioritize this subject — expect ${Math.ceil(note.totalQuestions / Object.keys(note.examBreakdown).length) + 2}+ questions in AIBE 21.`
                      : note.trend === 'decreasing'
                      ? `${note.subject} appears to be losing weightage, but still contributes ${note.weightage}% of questions. Don't skip it entirely.`
                      : `${note.subject} has been consistent across exams at ~${note.weightage}% weightage. Expect similar coverage in AIBE 21.`
                    }
                    {note.provisions.length > 0 && ` Focus especially on ${note.provisions.slice(0, 3).map(p => p.name).join(', ')}.`}
                  </p>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
