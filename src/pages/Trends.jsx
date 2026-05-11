import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, PieChart, Pie, Legend } from 'recharts'
import trends from '../data/trends.json'
import questions from '../data/questions.json'
import './Trends.css'

const COLORS = ['#818cf8', '#f87171', '#34d399', '#fbbf24', '#f472b6', '#a78bfa', '#fb923c', '#38bdf8', '#4ade80', '#e879f9', '#22d3ee', '#94a3b8', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899', '#14b8a6', '#6366f1', '#d946ef']

// Get unique questions (Set A only) for AIBE 20 and 19
const uniqueQs = []
const seen = new Set()
questions.forEach(q => {
  if (q.set === 'A' || (q.exam === 'AIBE 18' && q.set === 'C')) {
    const key = `${q.exam}-${q.questionNumber}`
    if (!seen.has(key)) { seen.add(key); uniqueQs.push(q) }
  }
})

// Subject distribution across all exams
const subjectCounts = {}
uniqueQs.forEach(q => { subjectCounts[q.subject] = (subjectCounts[q.subject] || 0) + 1 })
const pieData = Object.entries(subjectCounts)
  .map(([name, value]) => ({ name, value }))
  .sort((a, b) => b.value - a.value)

// Per-exam subject breakdown
const examSubjects = {}
uniqueQs.forEach(q => {
  if (!examSubjects[q.exam]) examSubjects[q.exam] = {}
  examSubjects[q.exam][q.subject] = (examSubjects[q.exam][q.subject] || 0) + 1
})

const barData = Object.entries(subjectCounts)
  .map(([subject, count]) => ({ subject: subject.length > 15 ? subject.substring(0, 14) + '…' : subject, count, fullName: subject }))
  .sort((a, b) => b.count - a.count)

const CustomTooltip = ({ active, payload }) => {
  if (!active || !payload?.length) return null
  const d = payload[0]
  return (
    <div className="chart-tooltip">
      <div className="tooltip-label">{d.payload.fullName || d.payload.subject || d.name}</div>
      <div className="tooltip-value">{d.value} questions</div>
    </div>
  )
}

export default function Trends() {
  return (
    <div className="trends-page">
      <div className="page-header">
        <h1>Subject Trends</h1>
        <p>Analyze subject weightage patterns across AIBE exams</p>
      </div>

      {/* Overall distribution */}
      <section className="section">
        <h2>📊 Overall Subject Distribution</h2>
        <div className="chart-grid">
          <div className="chart-card glass-card">
            <h3>Questions per Subject</h3>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={barData} layout="vertical" margin={{ left: 10, right: 20 }}>
                <XAxis type="number" stroke="#64748b" fontSize={12} />
                <YAxis type="category" dataKey="subject" width={120} stroke="#64748b" fontSize={11} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="count" radius={[0, 4, 4, 0]}>
                  {barData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="chart-card glass-card">
            <h3>Weightage Distribution</h3>
            <ResponsiveContainer width="100%" height={400}>
              <PieChart>
                <Pie data={pieData} cx="50%" cy="50%" innerRadius={60} outerRadius={130} paddingAngle={2} dataKey="value" label={({ name, percent }) => `${name.substring(0, 10)} ${(percent * 100).toFixed(0)}%`} labelLine={false} fontSize={10}>
                  {pieData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </section>

      {/* Per-exam breakdown */}
      <section className="section">
        <h2>📋 Breakdown by Exam</h2>
        <div className="exam-breakdown">
          {Object.entries(examSubjects).sort().reverse().map(([exam, subjects]) => {
            const data = Object.entries(subjects).map(([name, value]) => ({ name, value })).sort((a, b) => b.value - a.value)
            const total = data.reduce((s, d) => s + d.value, 0)
            return (
              <div key={exam} className="exam-card glass-card">
                <h3>{exam} <span className="exam-total">({total} questions)</span></h3>
                <div className="subject-bars">
                  {data.map((d, i) => (
                    <div key={d.name} className="subject-row">
                      <span className="subject-name">{d.name}</span>
                      <div className="subject-bar-track">
                        <div className="subject-bar-fill" style={{ width: `${(d.value / total) * 100}%`, background: COLORS[i % COLORS.length] }} />
                      </div>
                      <span className="subject-count">{d.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* Top subjects table */}
      <section className="section">
        <h2>🏆 Top Subjects Ranking</h2>
        <div className="table-wrapper glass-card">
          <table className="data-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Subject</th>
                <th>Total Questions</th>
                <th>Weightage</th>
                <th>Visual</th>
              </tr>
            </thead>
            <tbody>
              {pieData.map((d, i) => {
                const pct = ((d.value / uniqueQs.length) * 100).toFixed(1)
                return (
                  <tr key={d.name}>
                    <td className="rank">{i + 1}</td>
                    <td>
                      <span className="subject-dot" style={{ background: COLORS[i % COLORS.length] }} />
                      {d.name}
                    </td>
                    <td className="count-cell">{d.value}</td>
                    <td className="pct-cell">{pct}%</td>
                    <td>
                      <div className="mini-bar"><div style={{ width: `${pct * 2}%`, background: COLORS[i % COLORS.length] }} /></div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}
