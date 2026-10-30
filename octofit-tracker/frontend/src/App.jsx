import { Navigate, NavLink, Route, Routes } from 'react-router-dom'
import logo from '../../../docs/octofitapp-small.png'
import './App.css'
import Activities from './components/Activities.jsx'
import Leaderboard from './components/Leaderboard.jsx'
import Teams from './components/Teams.jsx'
import Users from './components/Users.jsx'
import Workouts from './components/Workouts.jsx'

const navigation = [
  { label: 'Activities', path: '/activities' },
  { label: 'Leaderboard', path: '/leaderboard' },
  { label: 'Teams', path: '/teams' },
  { label: 'Users', path: '/users' },
  { label: 'Workouts', path: '/workouts' },
]

function App() {
  return (
    <div className="app-shell">
      <header className="app-header border-bottom bg-white">
        <div className="container py-3">
          <div className="d-flex flex-column flex-lg-row align-items-lg-center justify-content-between gap-3">
            <NavLink className="app-brand text-decoration-none" to="/activities">
              <img src={logo} alt="" width="44" height="44" />
              <span>
                <strong>OctoFit Tracker</strong>
                <small className="d-block text-secondary">Move together. Go further.</small>
              </span>
            </NavLink>
            <nav aria-label="Main navigation" className="nav nav-pills flex-wrap gap-2">
              {navigation.map(({ label, path }) => (
                <NavLink
                  className={({ isActive }) =>
                    `nav-link${isActive ? ' active' : ''}`
                  }
                  key={path}
                  to={path}
                >
                  {label}
                </NavLink>
              ))}
            </nav>
          </div>
        </div>
      </header>

      <main className="container app-main py-4 py-lg-5">
        <Routes>
          <Route path="/" element={<Navigate replace to="/activities" />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/users" element={<Users />} />
          <Route path="/workouts" element={<Workouts />} />
          <Route path="*" element={<Navigate replace to="/activities" />} />
        </Routes>
      </main>
      <footer className="border-top bg-white py-3">
        <div className="container small text-secondary">
          OctoFit Tracker &middot; Build healthy habits together.
        </div>
      </footer>
    </div>
  )
}

export default App
