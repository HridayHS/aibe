import { useState, useMemo } from 'react'
import questions from '../data/questions.json'
import './Questions.css'

const EXAMS = [...new Set(questions.map(q => q.exam))].sort()
const SUBJECTS = [...new Set(questions.map(q => q.subject))].sort()
const DIFFICULTIES = ['easy', 'medium', 'hard']

export default function Questions() {
  const [search, setSearch] = useState('')
  const [examFilter, setExamFilter] = useState('all')
  const [subjectFilter, setSubjectFilter] = useState('all')
  const [diffFilter, setDiffFilter] = useState('all')
  const [setFilter, setSetFilter] = useState('A')
  const [showAnswer, setShowAnswer] = useState({})
  const [page, setPage] = useState(1)
  const perPage = 20

  const filtered = useMemo(() => {
    return questions.filter(q => {
      if (examFilter !== 'all' && q.exam !== examFilter) return false
      if (subjectFilter !== 'all' && q.subject !== subjectFilter) return false
      if (diffFilter !== 'all' && q.difficulty !== diffFilter) return false
      if (q.set !== setFilter && !(q.exam === 'AIBE 18' && q.set === 'C')) return false
      if (search) {
        const s = search.toLowerCase()
        if (!q.question.toLowerCase().includes(s) && !q.options.some(o => o.toLowerCase().includes(s))) return false
      }
      return true
    })
  }, [search, examFilter, subjectFilter, diffFilter, setFilter])

  const totalPages = Math.ceil(filtered.length / perPage)
  const paged = filtered.slice((page - 1) * perPage, page * perPage)

  const toggleAnswer = (id) => setShowAnswer(prev => ({ ...prev, [id]: !prev[id] }))

  return (
    <div className="questions-page">
      <div className="page-header">
        <h1>Question Bank</h1>
        <p>Search and filter {questions.length} questions from AIBE 18–20</p>
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
          <div className="filter-group">
            <label>Difficulty</label>
            <select value={diffFilter} onChange={e => { setDiffFilter(e.target.value); setPage(1) }}>
              <option value="all">All</option>
              {DIFFICULTIES.map(d => <option key={d} value={d}>{d.charAt(0).toUpperCase() + d.slice(1)}</option>)}
            </select>
          </div>
          <div className="filter-group">
            <label>Set</label>
            <div className="set-chips">
              {['A', 'B', 'C', 'D'].map(s => (
                <button key={s} className={`filter-chip ${setFilter === s ? 'active' : ''}`} onClick={() => { setSetFilter(s); setPage(1) }}>{s}</button>
              ))}
            </div>
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
            <div className="q-header">
              <span className="q-number">Q{q.questionNumber}</span>
              <div className="q-tags">
                <span className="tag tag-gold">{q.exam}</span>
                <span className="tag" style={{ color: getDiffColor(q.difficulty), borderColor: getDiffColor(q.difficulty) + '40', background: getDiffColor(q.difficulty) + '12' }}>
                  {q.difficulty}
                </span>
                <span className="tag tag-subject">{q.subject}</span>
              </div>
            </div>
            <p className="q-text">{q.question}</p>
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
            {q.correctAnswer && (
              <button className="btn btn-ghost show-answer-btn" onClick={() => toggleAnswer(q.id)}>
                {showAnswer[q.id] ? 'Hide Answer' : 'Show Answer'}
              </button>
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

function getDiffColor(d) {
  if (d === 'easy') return '#34d399'
  if (d === 'medium') return '#fbbf24'
  return '#f87171'
}
