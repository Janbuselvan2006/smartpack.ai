import { useNavigate } from 'react-router-dom'
import Button from '../components/Button'
import { useApp } from '../context/AppContext'

export default function Profile() {
  const { user, logout, recommendations } = useApp()
  const navigate = useNavigate()
  const saved = recommendations.filter((item) => item.saved).length

  return (
    <div className="mx-auto max-w-lg">
      <h1 className="text-2xl font-semibold text-slate-900">Profile</h1>
      <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-6">
        <p className="text-sm text-slate-500">Signed in as</p>
        <p className="mt-1 text-lg font-medium text-slate-900">{user?.email}</p>
        <p className="mt-4 text-sm text-slate-600">
          {saved} saved recommendations in this browser.
        </p>
        <Button
          variant="secondary"
          className="mt-6"
          onClick={() => {
            logout()
            navigate('/login')
          }}
        >
          Sign out
        </Button>
      </section>
    </div>
  )
}
