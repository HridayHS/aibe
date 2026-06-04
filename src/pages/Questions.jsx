import { useState, useMemo } from 'react'
import questions from '../data/questions.json'
import { parseSolution } from '../utils/parseSolution'
import './Questions.css'

const EXAMS = [...new Set(questions.map(q => q.exam))].sort()
const SUBJECTS = [...new Set(questions.map(q => q.subject))].sort()



export default function Questions() {
  const [search, setSearch] = useState('')
  const [examFilter, setExamFilter] = useState('all')
  const [subjectFilter, setSubjectFilter] = useState('all')
  const [showAnswer, setShowAnswer] = useState({})
  const [page, setPage] = useState(1)
  const perPage = 20

  const filtered = useMemo(() => {
    return questions.filter(q => {
      if (examFilter !== 'all' && q.exam !== examFilter) return false
      if (subjectFilter !== 'all' && q.subject !== subjectFilter) return false
      if (search) {
        const s = search.toLowerCase()
        if (!q.question.toLowerCase().includes(s) && !q.options.some(o => o.toLowerCase().includes(s))) return false
      }
      return true
    })
  }, [search, examFilter, subjectFilter])

  const totalPages = Math.ceil(filtered.length / perPage)
  const paged = filtered.slice((page - 1) * perPage, page * perPage)

  const toggleAnswer = (id) => setShowAnswer(prev => ({ ...prev, [id]: !prev[id] }))

  return (
    <div className="questions-page">
      <div className="page-header">
        <h1>Question Bank</h1>
        <p>Search and filter {questions.length} questions from AIBE 16–20</p>
      </div>

      {/* Filters */}
      <div className="filters-bar">
        <div className="search-wrapper">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            className="search-input"
            placeholder="Search questions..."
            value={search}
            onChange={e => { setSearch(e.target.value); setPage(1) }}
          />
        </div>
        <div className="filter-row">
          <div className="filter-group">
            <label>Exam</label>
            <select value={examFilter} onChange={e => { setExamFilter(e.target.value); setPage(1) }}>
              <option value="all">All Exams</option>
              {EXAMS.map(e => <option key={e} value={e}>{e}</option>)}
            </select>
          </div>
          <div className="filter-group">
            <label>Subject</label>
            <select value={subjectFilter} onChange={e => { setSubjectFilter(e.target.value); setPage(1) }}>
              <option value="all">All Subjects</option>
              {SUBJECTS.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
        </div>
      </div>

      <div className="results-info">
        Showing {paged.length} of {filtered.length} questions
      </div>

      {/* Question list */}
      <div className="questions-list">
        {paged.map(q => (
          <div key={q.id} className="question-card glass-card">
            {/* Header with number + tags */}
            <div className="q-header">
              <span className="q-number">Q{q.questionNumber}</span>
              <div className="q-tags">
                <span className="tag tag-gold">{q.exam}</span>
                {q.isModernized && (
                  <span className="tag tag-modernized">✨ BNS/BSA Updated</span>
                )}
                {!q.correctAnswer && (
                  <span className="tag tag-withdrawn">Withdrawn</span>
                )}
                <span className="tag tag-subject">{q.subject}</span>
              </div>
            </div>

            {/* Question text */}
            <p className="q-text">{q.question}</p>

            {/* Options */}
            <div className="q-options">
              {q.options.map((opt, i) => {
                const letter = String.fromCharCode(65 + i)
                const isCorrect = showAnswer[q.id] && q.correctAnswer === letter
                const isWrong = showAnswer[q.id] && q.correctAnswer && q.correctAnswer !== letter
                return (
                  <div key={i} className={`q-option ${isCorrect ? 'correct' : ''} ${isWrong ? 'dimmed' : ''}`}>
                    <span className="opt-letter">{letter}</span>
                    <span>{opt}</span>
                  </div>
                )
              })}
            </div>


            {q.correctAnswer ? (
              <>
                <button className="btn btn-ghost show-answer-btn" onClick={() => toggleAnswer(q.id)}>
                  {showAnswer[q.id] ? 'Hide Answer' : 'Show Answer'}
                </button>

                {/* Structured Solution */}
                {showAnswer[q.id] && q.solution && (
                  <details className="q-solution-box animate-in">
                    <summary className="q-solution-header">
                      <span className="q-solution-icon">📖</span>
                      <span className="q-solution-title">Solution</span>
                      <span className="q-solution-chevron">▸</span>
                    </summary>
                    <div className="q-solution-steps">
                      {parseSolution(q.solution).map((step, idx) => (
                        <div key={idx} className="q-step">
                          {step.stepNum && (
                            <div className="q-step-header">
                              <span className="q-step-badge">Step {step.stepNum}</span>
                              {step.title && <span className="q-step-title">{step.title}</span>}
                            </div>
                          )}
                          <p className="q-step-body">{step.body}</p>
                        </div>
                      ))}
                    </div>
                  </details>
                )}

                {/* Quick Tip */}
                {showAnswer[q.id] && q.quickTip && (
                  <details className="q-quicktip-box animate-in">
                    <summary className="q-quicktip-header">
                      <span className="q-quicktip-label">Quick Tip</span>
                      <span className="q-quicktip-chevron">▸</span>
                    </summary>
                    <p className="q-quicktip-text">{q.quickTip}</p>
                  </details>
                )}
              </>
            ) : (
              <div className="withdrawn-note">
                <span>⚠️</span>
                <span>This question was officially withdrawn by the BCI. No official answer is available.</span>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="pagination">
          <button className="btn btn-secondary" disabled={page <= 1} onClick={() => setPage(p => p - 1)}>← Prev</button>
          <span className="page-info">Page {page} of {totalPages}</span>
          <button className="btn btn-secondary" disabled={page >= totalPages} onClick={() => setPage(p => p + 1)}>Next →</button>
        </div>
      )}
    </div>
  )
}

