import { useState, useMemo } from 'react'
import questions from '../data/questions.json'
import './Flashcards.css'

// Build flashcards from real questions
const allCards = []
const seen = new Set()
questions.forEach(q => {
  if (!q.correctAnswer) return
  const key = q.question.substring(0, 60)
  if (seen.has(key)) return
  seen.add(key)
  const ansIdx = q.correctAnswer.charCodeAt(0) - 65
  allCards.push({
    id: q.id,
    subject: q.subject,
    front: q.question,
    back: q.options[ansIdx] || q.options[0],
    exam: q.exam,
    difficulty: q.difficulty,
  })
})

const SUBJECTS = [...new Set(allCards.map(c => c.subject))].sort()

export default function Flashcards() {
  const [subjectFilter, setSubjectFilter] = useState('all')
  const [currentIdx, setCurrentIdx] = useState(0)
  const [flipped, setFlipped] = useState(false)
  const [shuffled, setShuffled] = useState(false)

  const cards = useMemo(() => {
    let filtered = subjectFilter === 'all' ? [...allCards] : allCards.filter(c => c.subject === subjectFilter)
    if (shuffled) filtered = filtered.sort(() => Math.random() - 0.5)
    return filtered
  }, [subjectFilter, shuffled])

  const card = cards[currentIdx]

  const next = () => { setFlipped(false); setCurrentIdx(i => (i + 1) % cards.length) }
  const prev = () => { setFlipped(false); setCurrentIdx(i => (i - 1 + cards.length) % cards.length) }
  const shuffle = () => { setShuffled(s => !s); setCurrentIdx(0); setFlipped(false) }

  if (!card) return <div className="empty-state"><p>No flashcards available for this filter.</p></div>

  return (
    <div className="flashcards-page">
      <div className="page-header">
        <h1>Flashcards</h1>
        <p>Quick revision from {allCards.length} real AIBE questions — click to reveal the answer</p>
      </div>

      <div className="fc-controls">
        <select value={subjectFilter} onChange={e => { setSubjectFilter(e.target.value); setCurrentIdx(0); setFlipped(false) }}>
          <option value="all">All Subjects ({allCards.length})</option>
          {SUBJECTS.map(s => <option key={s} value={s}>{s} ({allCards.filter(c => c.subject === s).length})</option>)}
        </select>
        <button className="btn btn-secondary" onClick={shuffle}>🔀 {shuffled ? 'Unshuffle' : 'Shuffle'}</button>
      </div>

      <div className="fc-counter">{currentIdx + 1} / {cards.length}</div>

      <div className="fc-card-wrapper" onClick={() => setFlipped(f => !f)}>
        <div className={`fc-card ${flipped ? 'flipped' : ''}`}>
          <div className="fc-face fc-front">
            <div className="fc-tags">
              <span className="tag tag-gold">{card.exam}</span>
              <span className="tag tag-subject">{card.subject}</span>
            </div>
            <div className="fc-question">{card.front}</div>
            <div className="fc-hint">Click to reveal answer</div>
          </div>
          <div className="fc-face fc-back">
            <div className="fc-answer-label">✅ Answer</div>
            <div className="fc-answer">{card.back}</div>
            <div className="fc-hint">Click to see question</div>
          </div>
        </div>
      </div>

      <div className="fc-nav">
        <button className="btn btn-secondary" onClick={prev}>← Previous</button>
        <button className="btn btn-primary" onClick={next}>Next →</button>
      </div>
    </div>
  )
}
