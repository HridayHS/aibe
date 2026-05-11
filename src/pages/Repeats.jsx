import repeats from '../data/repeats.json'
import './Repeats.css'

export default function Repeats() {
  const { clusters, hotTopics, totalClusters, totalQuestions } = repeats

  return (
    <div className="repeats-page">
      <div className="page-header">
        <h1>Repeated Questions</h1>
        <p>Questions that appear across multiple AIBE exams — focus on these for maximum ROI</p>
      </div>

      {/* Summary */}
      <div className="repeats-summary">
        <div className="stat-card">
          <div className="stat-value">{totalClusters}</div>
          <div className="stat-label">Repeated Patterns</div>
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

      {/* Hot Topics */}
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

      {/* Clusters */}
      <section className="section">
        <h2>📋 Repeated Question Clusters</h2>
        <p className="section-desc">
          Each cluster shows questions from different exams that test the same concept. 
          If a topic appears across multiple years, it's very likely to appear again.
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

              <div className="cluster-questions">
                {cluster.questions.map((q, i) => (
                  <div key={q.id} className="cluster-q">
                    <div className="cq-header">
                      <span className="cq-exam">{q.exam}</span>
                      <span className="cq-num">Q{q.questionNumber}</span>
                      {q.similarity < 100 && (
                        <span className="cq-sim">{q.similarity}% similar</span>
                      )}
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

      {clusters.length === 0 && (
        <div className="empty-state glass-card">
          <p>No repeated questions found across exams. This could mean the exam board is diversifying their question bank.</p>
        </div>
      )}
    </div>
  )
}
