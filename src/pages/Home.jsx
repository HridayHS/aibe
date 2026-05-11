import { Link } from 'react-router-dom'
import questions from '../data/questions.json'
import trends from '../data/trends.json'
import './Home.css'

const stats = {
  total: questions.length,
  exams: [...new Set(questions.map(q => q.exam))].length,
  subjects: [...new Set(questions.map(q => q.subject))].length,
  withAnswers: questions.filter(q => q.correctAnswer).length,
}

const uniqueByExam = {}
questions.forEach(q => {
  if (q.set === 'A' || (q.exam === 'AIBE 18' && q.set === 'C')) {
    if (!uniqueByExam[q.exam]) uniqueByExam[q.exam] = 0
    uniqueByExam[q.exam]++
  }
})

const features = [
  { icon: '📄', title: 'Question Papers', desc: 'Access AIBE 18-20 papers with full questions & answers', link: '/papers', color: '#818cf8' },
  { icon: '❓', title: 'Question Bank', desc: 'Search & filter 590+ questions by subject, year, difficulty', link: '/questions', color: '#34d399' },
  { icon: '📊', title: 'Subject Trends', desc: 'See which subjects are growing in weightage over years', link: '/trends', color: '#fbbf24' },
  { icon: '🎯', title: 'Difficulty Analysis', desc: 'Understand difficulty patterns across exams & subjects', link: '/difficulty', color: '#f87171' },
  { icon: '🃏', title: 'Flashcards', desc: 'Quick revision with interactive flashcards from real questions', link: '/flashcards', color: '#e879f9' },
  { icon: '📚', title: 'Legal Reference', desc: 'Latin maxims, landmark cases & key legal concepts', link: '/reference', color: '#22d3ee' },
  { icon: '🔮', title: 'Predictions', desc: 'AI-predicted high-probability topics for the next AIBE', link: '/predictions', color: '#fb923c' },
]

export default function Home() {
  return (
    <div className="home">
      {/* Hero */}
      <section className="hero animate-in">
        <div className="hero-badge">
          <span className="tag tag-gold">✨ AIBE 18-20 Analyzed</span>
        </div>
        <h1 className="hero-title">
          Master the <span className="gold-text">Bar Exam</span>
        </h1>
        <p className="hero-desc">
          590+ real AIBE questions extracted, analyzed, and organized.
          Subject trends, difficulty analysis, flashcards, and AI predictions — all in one place.
        </p>
        <div className="hero-actions">
          <Link to="/questions" className="btn btn-primary">Explore Questions →</Link>
          <Link to="/trends" className="btn btn-secondary">View Analysis</Link>
        </div>
      </section>

      {/* Stats */}
      <section className="stats-row animate-in animate-in-delay-1">
        <div className="stat-card">
          <div className="stat-value">{stats.total}</div>
          <div className="stat-label">Total Questions</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{stats.exams}</div>
          <div className="stat-label">Exams Covered</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{stats.subjects}</div>
          <div className="stat-label">Subjects</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{stats.withAnswers}</div>
          <div className="stat-label">With Answers</div>
        </div>
      </section>

      {/* Features */}
      <section className="features-section animate-in animate-in-delay-2">
        <h2>Everything You Need</h2>
        <div className="features-grid">
          {features.map((f, i) => (
            <Link to={f.link} key={i} className="feature-card glass-card">
              <span className="feature-icon" style={{ background: `${f.color}18`, color: f.color }}>{f.icon}</span>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
              <span className="feature-arrow">→</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Exam coverage */}
      <section className="coverage-section animate-in animate-in-delay-3">
        <h2>Exam Coverage</h2>
        <div className="coverage-grid">
          {Object.entries(uniqueByExam).sort().reverse().map(([exam, count]) => (
            <div key={exam} className="coverage-card glass-card">
              <div className="coverage-exam">{exam}</div>
              <div className="coverage-year">{exam.includes('20') ? '2025' : exam.includes('19') ? '2024' : '2023'}</div>
              <div className="coverage-count">{count} questions</div>
              <div className="coverage-bar">
                <div className="coverage-fill" style={{ width: `${count}%` }} />
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
