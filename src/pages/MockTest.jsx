import { useState, useMemo, useEffect, useCallback } from 'react'
import questions from '../data/questions.json'
import './MockTest.css'

const SUBJECTS = [...new Set(questions.map(q => q.subject))].sort()

// Get unique questions with answers
const pool = []
const seen = new Set()
questions.forEach(q => {
  if (!q.correctAnswer) return
  const key = q.question.substring(0, 60)
  if (seen.has(key)) return
  seen.add(key)
  pool.push(q)
})

function shuffle(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

export default function MockTest() {
  const [mode, setMode] = useState('setup') // setup | test | review
  const [config, setConfig] = useState({ count: 50, subject: 'all', timed: true })
  const [testQs, setTestQs] = useState([])
  const [answers, setAnswers] = useState({})
  const [currentQ, setCurrentQ] = useState(0)
  const [timeLeft, setTimeLeft] = useState(0)
  const [startTime, setStartTime] = useState(null)

  // Timer
  useEffect(() => {
    if (mode !== 'test' || !config.timed || timeLeft <= 0) return
    const t = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) { clearInterval(t); return 0 }
        return prev - 1
      })
    }, 1000)
    return () => clearInterval(t)
  }, [mode, config.timed, timeLeft])

  // Auto-submit when time runs out
  useEffect(() => {
    if (mode === 'test' && config.timed && timeLeft === 0 && startTime) {
      setMode('review')
    }
  }, [timeLeft, mode, config.timed, startTime])

  const startTest = () => {
    let filtered = config.subject === 'all' ? pool : pool.filter(q => q.subject === config.subject)
    const selected = shuffle(filtered).slice(0, config.count)
    setTestQs(selected)
    setAnswers({})
    setCurrentQ(0)
    setTimeLeft(config.count * 108) // 1.8 min per question (3 hrs for 100)
    setStartTime(Date.now())
    setMode('test')
  }

  const selectAnswer = (qIdx, letter) => {
    setAnswers(prev => ({ ...prev, [qIdx]: letter }))
  }

  const score = useMemo(() => {
    if (mode !== 'review') return null
    let correct = 0, wrong = 0, unanswered = 0
    testQs.forEach((q, i) => {
      if (!answers[i]) unanswered++
      else if (answers[i] === q.correctAnswer) correct++
      else wrong++
    })
    return { correct, wrong, unanswered, total: testQs.length, pct: Math.round((correct / testQs.length) * 100) }
  }, [mode, answers, testQs])

  const formatTime = (s) => {
    const h = Math.floor(s / 3600)
    const m = Math.floor((s % 3600) / 60)
    const sec = s % 60
    return h > 0 ? `${h}:${String(m).padStart(2,'0')}:${String(sec).padStart(2,'0')}` : `${m}:${String(sec).padStart(2,'0')}`
  }

  // ===== SETUP =====
  if (mode === 'setup') {
    return (
      <div className="mock-page">
        <div className="page-header">
          <h1>Mock Test</h1>
          <p>Simulate the real AIBE exam experience</p>
        </div>
        <div className="setup-card glass-card">
          <h2>Configure Your Test</h2>
          <div className="setup-grid">
            <div className="setup-field">
              <label>Number of Questions</label>
              <div className="count-options">
                {[25, 50, 100].map(n => (
                  <button key={n} className={`count-btn ${config.count === n ? 'active' : ''}`} onClick={() => setConfig(c => ({ ...c, count: n }))}>
                    {n}
                  </button>
                ))}
              </div>
            </div>
            <div className="setup-field">
              <label>Subject</label>
              <select value={config.subject} onChange={e => setConfig(c => ({ ...c, subject: e.target.value }))}>
                <option value="all">All Subjects ({pool.length} questions)</option>
                {SUBJECTS.map(s => {
                  const count = pool.filter(q => q.subject === s).length
                  return <option key={s} value={s}>{s} ({count})</option>
                })}
              </select>
            </div>
            <div className="setup-field">
              <label>Timer</label>
              <div className="count-options">
                <button className={`count-btn ${config.timed ? 'active' : ''}`} onClick={() => setConfig(c => ({ ...c, timed: true }))}>⏱️ Timed</button>
                <button className={`count-btn ${!config.timed ? 'active' : ''}`} onClick={() => setConfig(c => ({ ...c, timed: false }))}>♾️ Untimed</button>
              </div>
            </div>
          </div>
          <button className="btn btn-primary start-btn" onClick={startTest}>Start Test →</button>
        </div>
      </div>
    )
  }

  // ===== REVIEW =====
  if (mode === 'review') {
    return (
      <div className="mock-page">
        <div className="page-header">
          <h1>Test Results</h1>
        </div>
        <div className="results-card glass-card">
          <div className="score-circle">
            <div className="score-pct" style={{ color: score.pct >= 45 ? '#34d399' : '#f87171' }}>{score.pct}%</div>
            <div className="score-label">{score.pct >= 45 ? '✅ PASS' : '❌ FAIL'}</div>
          </div>
          <div className="score-breakdown">
            <div className="sb-item correct"><span>{score.correct}</span> Correct</div>
            <div className="sb-item wrong"><span>{score.wrong}</span> Wrong</div>
            <div className="sb-item skip"><span>{score.unanswered}</span> Skipped</div>
          </div>
          <div className="score-bar-track">
            <div className="score-bar-fill correct" style={{ width: `${(score.correct / score.total) * 100}%` }} />
            <div className="score-bar-fill wrong" style={{ width: `${(score.wrong / score.total) * 100}%` }} />
          </div>
        </div>

        <div className="review-actions">
          <button className="btn btn-primary" onClick={() => setMode('setup')}>← New Test</button>
        </div>

        <div className="review-list">
          {testQs.map((q, i) => {
            const userAns = answers[i]
            const isCorrect = userAns === q.correctAnswer
            return (
              <div key={i} className={`review-q glass-card ${!userAns ? 'skipped' : isCorrect ? 'was-correct' : 'was-wrong'}`}>
                <div className="rq-header">
                  <span className="q-number">Q{i + 1}</span>
                  <span className="tag tag-subject">{q.subject}</span>
                  {!userAns && <span className="rq-status skip">Skipped</span>}
                  {userAns && isCorrect && <span className="rq-status correct">✓ Correct</span>}
                  {userAns && !isCorrect && <span className="rq-status wrong">✗ Wrong</span>}
                </div>
                <p className="q-text">{q.question}</p>
                <div className="q-options">
                  {q.options.map((opt, oi) => {
                    const letter = String.fromCharCode(65 + oi)
                    const isRight = q.correctAnswer === letter
                    const isUser = userAns === letter
                    let cls = ''
                    if (isRight) cls = 'correct'
                    else if (isUser && !isRight) cls = 'wrong-pick'
                    return (
                      <div key={oi} className={`q-option ${cls}`}>
                        <span className="opt-letter">{letter}</span> {opt}
                        {isRight && <span className="opt-badge">✓</span>}
                        {isUser && !isRight && <span className="opt-badge">✗</span>}
                      </div>
                    )
                  })}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    )
  }

  // ===== TEST =====
  const q = testQs[currentQ]
  const answered = Object.keys(answers).length

  return (
    <div className="mock-page">
      {/* Top bar */}
      <div className="test-topbar">
        <div className="test-progress">
          <span>Q {currentQ + 1}/{testQs.length}</span>
          <span className="test-answered">{answered} answered</span>
        </div>
        {config.timed && (
          <div className={`test-timer ${timeLeft < 300 ? 'urgent' : ''}`}>
            ⏱️ {formatTime(timeLeft)}
          </div>
        )}
        <button className="btn btn-secondary" onClick={() => setMode('review')}>Submit Test</button>
      </div>

      {/* Question navigator */}
      <div className="q-navigator">
        {testQs.map((_, i) => (
          <button key={i} className={`qnav-btn ${currentQ === i ? 'current' : ''} ${answers[i] ? 'answered' : ''}`} onClick={() => setCurrentQ(i)}>
            {i + 1}
          </button>
        ))}
      </div>

      {/* Question */}
      <div className="test-question glass-card">
        <div className="tq-header">
          <span className="q-number">Question {currentQ + 1}</span>
          <span className="tag tag-subject">{q.subject}</span>
        </div>
        <p className="tq-text">{q.question}</p>
        <div className="tq-options">
          {q.options.map((opt, i) => {
            const letter = String.fromCharCode(65 + i)
            const isSelected = answers[currentQ] === letter
            return (
              <button key={i} className={`tq-option ${isSelected ? 'selected' : ''}`} onClick={() => selectAnswer(currentQ, letter)}>
                <span className="tq-letter">{letter}</span>
                <span>{opt}</span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Navigation */}
      <div className="test-nav">
        <button className="btn btn-secondary" disabled={currentQ === 0} onClick={() => setCurrentQ(i => i - 1)}>← Previous</button>
        {answers[currentQ] && (
          <button className="btn btn-ghost" onClick={() => setAnswers(prev => { const n = { ...prev }; delete n[currentQ]; return n })}>Clear</button>
        )}
        <button className="btn btn-primary" disabled={currentQ >= testQs.length - 1} onClick={() => setCurrentQ(i => i + 1)}>Next →</button>
      </div>
    </div>
  )
}
