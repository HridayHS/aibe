import repeats from '../data/repeats.json'
import './Repeats.css'

export default function Repeats() {
  const { clusters, hotTopics, totalClusters, totalQuestions } = repeats

  return (
    <div className="repeats-page">
      <div className="page-header">
        <h1>Repeated Questions</h1>
        <p>Same legal provisions tested across multiple AIBE exams — high-priority study topics</p>
      </div>

      <div className="repeats-summary">
        <div className="stat-card">
          <div className="stat-value">{totalClusters}</div>
          <div className="stat-label">Verified Patterns</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{totalQuestions}</div>
          <div className="stat-label">Questions Involved</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{hotTopics.length}</div>
          <div className="stat-label">Subjects with Repeats</div>
        </div>
      </div>

      <section className="section">
        <h2>🔥 Subjects Most Likely to Repeat</h2>
        <div className="hot-topics">
          {hotTopics.map((h, i) => (
            <div key={h.subject} className="hot-card glass-card">
              <span className="hot-rank">#{i + 1}</span>
              <span className="hot-subject">{h.subject}</span>
              <span className="hot-count">{h.repeats} pattern{h.repeats > 1 ? 's' : ''}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="section">
        <h2>📋 Verified Repeat Clusters</h2>
        <p className="section-desc">
          Each cluster groups questions from different exams that test the same legal provision.
          These are manually verified — not just text-matching.
        </p>
        <div className="clusters-list">
          {clusters.map(cluster => (
            <div key={cluster.id} className="cluster-card glass-card">
              <div className="cluster-header">
                <div className="cluster-meta">
                  <span className="tag tag-gold">{cluster.subject}</span>
                  <span className={`importance-badge ${cluster.importance}`}>
                    {cluster.importance === 'critical' ? '🔴 Critical' : '🟡 High'} Priority
                  </span>
                </div>
                <div className="cluster-exams">
                  {cluster.exams.map(e => (
                    <span key={e} className="exam-pill">{e}</span>
                  ))}
                </div>
              </div>

              {cluster.sharedConcepts && cluster.sharedConcepts.length > 0 && (
                <div className="shared-refs">
                  <span className="shared-label">Shared provisions:</span>
                  {cluster.sharedConcepts.map(r => (
                    <span key={r} className="ref-chip">{r}</span>
                  ))}
                </div>
              )}

              <div className="cluster-questions">
                {cluster.questions.map((q) => (
                  <div key={q.id} className="cluster-q">
                    <div className="cq-header">
                      <span className="cq-exam">{q.exam}</span>
                      <span className="cq-num">Q{q.questionNumber}</span>
                    </div>
                    <p className="cq-text">{q.question}</p>
                    <div className="cq-options">
                      {q.options.map((opt, oi) => {
                        const letter = String.fromCharCode(65 + oi)
                        const isCorrect = q.correctAnswer === letter
                        return (
                          <div key={oi} className={`cq-option ${isCorrect ? 'correct' : ''}`}>
                            <span className="opt-letter">{letter}</span> {opt}
                          </div>
                        )
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="method-note glass-card">
        <h4>📌 Methodology</h4>
        <p>
          Clusters are identified by matching shared legal provisions (specific Section numbers,
          Article numbers, and Act names) across exams, then manually verified to ensure
          the questions genuinely test the same concept — not just coincidental section references.
        </p>
      </div>
    </div>
  )
}
