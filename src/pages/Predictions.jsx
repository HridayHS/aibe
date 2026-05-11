import questions from '../data/questions.json'
import './Predictions.css'

// Generate predictions from actual data analysis
const uniqueQs = []
const seen = new Set()
questions.forEach(q => {
  if (q.set === 'A' || (q.exam === 'AIBE 18' && q.set === 'C')) {
    const key = `${q.exam}-${q.questionNumber}`
    if (!seen.has(key)) { seen.add(key); uniqueQs.push(q) }
  }
})

// Calculate per-exam subject counts
const examSubjects = {}
uniqueQs.forEach(q => {
  if (!examSubjects[q.exam]) examSubjects[q.exam] = {}
  examSubjects[q.exam][q.subject] = (examSubjects[q.exam][q.subject] || 0) + 1
})

const exams = Object.keys(examSubjects).sort()
const allSubjects = [...new Set(uniqueQs.map(q => q.subject))]

// Predict: subjects with consistent presence + growing trend
const predictions = allSubjects.map(subject => {
  const counts = exams.map(e => examSubjects[e]?.[subject] || 0)
  const total = counts.reduce((s, c) => s + c, 0)
  const avg = total / counts.length
  const present = counts.filter(c => c > 0).length
  const consistency = (present / counts.length) * 100
  const recent = counts[counts.length - 1] || 0
  const trend = counts.length >= 2 ? (counts[counts.length - 1] || 0) - (counts[counts.length - 2] || 0) : 0

  // Confidence based on consistency + recency + volume
  let confidence = Math.min(98, Math.round(
    (consistency * 0.3) + (recent * 2) + (avg * 3) + (trend > 0 ? 10 : 0)
  ))

  let reason = ''
  if (consistency === 100) reason += `Appeared in all ${exams.length} exams. `
  else if (consistency >= 66) reason += `Appeared in ${present}/${exams.length} exams. `
  if (trend > 0) reason += `Growing trend (+${trend} questions). `
  else if (trend === 0 && recent > 0) reason += `Stable presence. `
  reason += `Average ${avg.toFixed(1)} questions per exam.`

  return { subject, confidence, counts, total, avg, trend, consistency, reason, recent }
}).filter(p => p.total > 0).sort((a, b) => b.confidence - a.confidence)

export default function Predictions() {
  return (
    <div className="predictions-page">
      <div className="page-header">
        <h1>🔮 Predictions for Next AIBE</h1>
        <p>Data-driven topic predictions based on analysis of AIBE 18-20 patterns</p>
      </div>

      <div className="predictions-note glass-card">
        <p>
          <strong>⚠️ Disclaimer:</strong> These predictions are based on historical pattern analysis from {uniqueQs.length} questions
          across {exams.length} exams. Actual exam content may vary. Use as a study guide, not a guarantee.
        </p>
      </div>

      <div className="predictions-list">
        {predictions.map((p, i) => (
          <div key={p.subject} className="prediction-card glass-card">
            <div className="pred-rank">#{i + 1}</div>
            <div className="pred-content">
              <div className="pred-header">
                <h3>{p.subject}</h3>
                <div className="pred-confidence">
                  <div className="conf-bar">
                    <div className="conf-fill" style={{ width: `${p.confidence}%`, background: getConfColor(p.confidence) }} />
                  </div>
                  <span className="conf-value" style={{ color: getConfColor(p.confidence) }}>{p.confidence}%</span>
                </div>
              </div>
              <p className="pred-reason">{p.reason}</p>
              <div className="pred-history">
                {exams.map((e, ei) => (
                  <div key={e} className="pred-exam">
                    <span className="pred-exam-name">{e.replace('AIBE ', '')}</span>
                    <span className="pred-exam-count" style={{ opacity: p.counts[ei] > 0 ? 1 : 0.3 }}>
                      {p.counts[ei]}q
                    </span>
                  </div>
                ))}
                <div className="pred-exam pred-exam-next">
                  <span className="pred-exam-name">21?</span>
                  <span className="pred-exam-count" style={{ color: getConfColor(p.confidence) }}>
                    ~{Math.round(p.avg)}q
                  </span>
                </div>
              </div>
              {p.trend > 0 && <span className="trend-badge up">↑ Rising</span>}
              {p.trend < 0 && <span className="trend-badge down">↓ Declining</span>}
              {p.trend === 0 && p.recent > 0 && <span className="trend-badge stable">→ Stable</span>}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function getConfColor(c) {
  if (c >= 80) return '#34d399'
  if (c >= 50) return '#fbbf24'
  return '#f87171'
}
