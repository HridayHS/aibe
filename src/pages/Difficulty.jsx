import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend, Cell, PieChart, Pie } from 'recharts'
import diffData from '../data/difficulty.json'
import './Difficulty.css'

const DIFF_COLORS = { easy: '#34d399', medium: '#fbbf24', hard: '#f87171' }

const examData = Object.entries(diffData.byExam).map(([name, d]) => ({
  name, ...d, total: d.easy + d.medium + d.hard
})).sort((a, b) => a.name.localeCompare(b.name))

const subjectData = Object.entries(diffData.bySubject).map(([name, d]) => ({
  name: name.length > 18 ? name.substring(0, 17) + '…' : name,
  fullName: name, ...d, total: d.easy + d.medium + d.hard
})).sort((a, b) => b.total - a.total)

const overallPie = [
  { name: 'Easy', value: subjectData.reduce((s, d) => s + d.easy, 0), color: DIFF_COLORS.easy },
  { name: 'Medium', value: subjectData.reduce((s, d) => s + d.medium, 0), color: DIFF_COLORS.medium },
  { name: 'Hard', value: subjectData.reduce((s, d) => s + d.hard, 0), color: DIFF_COLORS.hard },
]

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null
  return (
    <div className="chart-tooltip">
      <div className="tooltip-label">{payload[0]?.payload?.fullName || label}</div>
      {payload.map(p => (
        <div key={p.name} style={{ color: p.color }}>{p.name}: {p.value}</div>
      ))}
    </div>
  )
}

export default function Difficulty() {
  return (
    <div className="difficulty-page">
      <div className="page-header">
        <h1>Difficulty Analysis</h1>
        <p>Understand difficulty distribution across exams and subjects</p>
      </div>

      {/* Overall */}
      <section className="section">
        <h2>🎯 Overall Distribution</h2>
        <div className="overview-grid">
          {overallPie.map(d => (
            <div key={d.name} className="diff-stat glass-card">
              <div className="diff-dot" style={{ background: d.color }} />
              <div className="stat-value" style={{ WebkitTextFillColor: d.color }}>{d.value}</div>
              <div className="stat-label">{d.name}</div>
            </div>
          ))}
          <div className="diff-pie glass-card">
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie data={overallPie} cx="50%" cy="50%" innerRadius={40} outerRadius={80} dataKey="value" label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`} fontSize={11}>
                  {overallPie.map(d => <Cell key={d.name} fill={d.color} />)}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </section>

      {/* By exam */}
      <section className="section">
        <h2>📋 By Exam</h2>
        <div className="chart-card glass-card">
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={examData}>
              <XAxis dataKey="name" stroke="#64748b" fontSize={12} />
              <YAxis stroke="#64748b" fontSize={12} />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Bar dataKey="easy" stackId="a" fill={DIFF_COLORS.easy} name="Easy" radius={[0,0,0,0]} />
              <Bar dataKey="medium" stackId="a" fill={DIFF_COLORS.medium} name="Medium" />
              <Bar dataKey="hard" stackId="a" fill={DIFF_COLORS.hard} name="Hard" radius={[4,4,0,0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </section>

      {/* By subject */}
      <section className="section">
        <h2>📚 By Subject</h2>
        <div className="chart-card glass-card">
          <ResponsiveContainer width="100%" height={Math.max(400, subjectData.length * 32)}>
            <BarChart data={subjectData} layout="vertical" margin={{ left: 10 }}>
              <XAxis type="number" stroke="#64748b" fontSize={12} />
              <YAxis type="category" dataKey="name" width={130} stroke="#64748b" fontSize={11} />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Bar dataKey="easy" stackId="a" fill={DIFF_COLORS.easy} name="Easy" />
              <Bar dataKey="medium" stackId="a" fill={DIFF_COLORS.medium} name="Medium" />
              <Bar dataKey="hard" stackId="a" fill={DIFF_COLORS.hard} name="Hard" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </section>

      {/* Heatmap table */}
      <section className="section">
        <h2>🌡️ Difficulty Heatmap</h2>
        <div className="table-wrapper glass-card">
          <table className="data-table">
            <thead><tr><th>Subject</th><th>Easy</th><th>Medium</th><th>Hard</th><th>Total</th><th>Dominant</th></tr></thead>
            <tbody>
              {subjectData.map(d => {
                const dominant = d.easy >= d.medium && d.easy >= d.hard ? 'Easy' : d.medium >= d.hard ? 'Medium' : 'Hard'
                const domColor = dominant === 'Easy' ? DIFF_COLORS.easy : dominant === 'Medium' ? DIFF_COLORS.medium : DIFF_COLORS.hard
                return (
                  <tr key={d.fullName}>
                    <td>{d.fullName}</td>
                    <td style={{ color: DIFF_COLORS.easy }}>{d.easy}</td>
                    <td style={{ color: DIFF_COLORS.medium }}>{d.medium}</td>
                    <td style={{ color: DIFF_COLORS.hard }}>{d.hard}</td>
                    <td className="count-cell">{d.total}</td>
                    <td><span className="dom-badge" style={{ color: domColor, borderColor: domColor + '40', background: domColor + '12' }}>{dominant}</span></td>
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
