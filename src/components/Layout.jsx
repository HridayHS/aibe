import { Outlet, NavLink, useLocation } from 'react-router-dom'
import { useState } from 'react'
import './Layout.css'

const NAV_ITEMS = [
  { path: '/', label: 'Home', icon: '🏠' },
  { path: '/papers', label: 'Papers', icon: '📄' },
  { path: '/questions', label: 'Question Bank', icon: '❓' },
  { path: '/mock-test', label: 'Mock Test', icon: '📝' },
  { path: '/trends', label: 'Trends', icon: '📊' },
  { path: '/difficulty', label: 'Difficulty', icon: '🎯' },
  { path: '/repeats', label: 'Repeats', icon: '🔁' },
  { path: '/flashcards', label: 'Flashcards', icon: '🃏' },
  { path: '/notes', label: 'Revision Notes', icon: '📖' },
  { path: '/reference', label: 'Reference', icon: '📚' },
  { path: '/predictions', label: 'Predictions', icon: '🔮' },
]

export default function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const location = useLocation()

  return (
    <div className="layout">
      {/* Mobile overlay */}
      {sidebarOpen && <div className="sidebar-overlay" onClick={() => setSidebarOpen(false)} />}

      {/* Sidebar */}
      <aside className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <div className="logo">
            <span className="logo-icon">⚖️</span>
            <div>
              <span className="logo-text">AIBE Prep</span>
              <span className="logo-sub">Bar Exam Analysis</span>
            </div>
          </div>
        </div>
        <nav className="sidebar-nav">
          {NAV_ITEMS.map(item => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === '/'}
              className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
              onClick={() => setSidebarOpen(false)}
            >
              <span className="nav-icon">{item.icon}</span>
              <span className="nav-label">{item.label}</span>
            </NavLink>
          ))}
        </nav>
        <div className="sidebar-footer">
          <div className="sidebar-footer-text">
            <span>AIBE 18–20 Analysis</span>
            <span className="version">v1.0</span>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="main-wrapper">
        <header className="topbar">
          <button className="menu-btn" onClick={() => setSidebarOpen(!sidebarOpen)} aria-label="Toggle menu">
            <span></span><span></span><span></span>
          </button>
          <div className="topbar-title">
            {NAV_ITEMS.find(n => n.path === location.pathname)?.label || 'AIBE Prep'}
          </div>
          <div className="topbar-badge">
            <span className="tag tag-gold">667 Questions</span>
          </div>
        </header>
        <main className="main-content">
          <div className="container">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  )
}
