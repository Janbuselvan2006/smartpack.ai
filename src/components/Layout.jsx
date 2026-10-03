import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import {
  LayoutDashboard,
  PlusCircle,
  History,
  Layers,
  UserRound,
  LogOut,
} from 'lucide-react'
import Logo from './Logo'
import { useApp } from '../context/AppContext'

const links = [
  { to: '/app', label: 'Dashboard', icon: LayoutDashboard, end: true },
  { to: '/app/new', label: 'New Recommendation', icon: PlusCircle },
  { to: '/app/history', label: 'Previous Results', icon: History },
  { to: '/app/materials', label: 'Packaging Materials', icon: Layers },
  { to: '/app/profile', label: 'Profile', icon: UserRound },
]

export default function Layout() {
  const { user, logout } = useApp()
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-slate-50 lg:flex">
      <aside className="border-b border-slate-200 bg-white lg:flex lg:w-64 lg:flex-col lg:border-b-0 lg:border-r">
        <div className="flex items-center justify-between px-5 py-4 lg:block">
          <Logo />
          <p className="mt-1 hidden text-xs text-slate-500 lg:block">
            Packaging recommendation prototype
          </p>
        </div>
        <nav className="flex flex-wrap gap-1 px-3 pb-3 lg:flex-1 lg:flex-col lg:px-3 lg:pb-0">
          {links.map(({ to, label, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                `flex shrink-0 items-center gap-2.5 rounded-xl px-3 py-2 text-sm font-medium transition ${
                  isActive
                    ? 'bg-green-50 text-green-700'
                    : 'text-slate-600 hover:bg-slate-50'
                }`
              }
            >
              <Icon className="h-4 w-4" />
              {label}
            </NavLink>
          ))}
        </nav>
        <div className="hidden border-t border-slate-100 p-4 lg:block">
          <p className="truncate text-sm font-medium text-slate-800">{user?.email}</p>
          <button
            type="button"
            onClick={() => {
              logout()
              navigate('/login')
            }}
            className="mt-2 inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-800"
          >
            <LogOut className="h-4 w-4" />
            Sign out
          </button>
        </div>
      </aside>
      <main className="min-w-0 flex-1 p-4 sm:p-8">
        <Outlet />
      </main>
    </div>
  )
}
