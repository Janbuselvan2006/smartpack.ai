import { Link, useNavigate } from 'react-router-dom'
import { Apple, Layers, Sparkles, ArrowRight } from 'lucide-react'
import Button from '../components/Button'
import { useApp } from '../context/AppContext'
import { packagingMaterials } from '../data/packagingMaterials'

export default function Dashboard() {
  const { user, recommendations } = useApp()
  const navigate = useNavigate()
  const previous = recommendations
  const saved = recommendations.filter((item) => item.saved)
  const name = user?.name || 'there'

  return (
    <div className="mx-auto max-w-5xl">
      <div className="rounded-2xl border border-green-100 bg-white p-6 sm:p-8">
        <p className="text-sm font-medium text-green-700">Welcome</p>
        <h1 className="mt-1 text-2xl font-semibold text-slate-900 sm:text-3xl">
          Hello, {name}
        </h1>
        <p className="mt-2 max-w-xl text-slate-600">
          Start with food and storage details to get a prototype packaging recommendation.
        </p>
        <Button className="mt-6" onClick={() => navigate('/app/new')}>
          Start New Recommendation
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        <StatCard icon={Apple} label="Food Products" value={previous.length} hint="Logged in history" />
        <StatCard icon={Layers} label="Packaging Materials" value={packagingMaterials.length} hint="Sample dataset" />
        <StatCard icon={Sparkles} label="Recommendations" value={previous.length} hint="Prototype results" />
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <ListCard
          title="Previous Recommendations"
          empty="No previous recommendations yet."
          items={previous}
          actionLabel="View all"
          actionTo="/app/history"
        />
        <ListCard
          title="Saved Recommendations"
          empty="Nothing saved yet."
          items={saved}
          actionLabel="Open saved"
          actionTo="/app/history"
        />
      </div>
    </div>
  )
}

function StatCard({ icon: Icon, label, value, hint }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5">
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-50 text-green-700">
        <Icon className="h-5 w-5" />
      </div>
      <p className="mt-4 text-2xl font-semibold text-slate-900">{value}</p>
      <p className="text-sm font-medium text-slate-700">{label}</p>
      <p className="text-xs text-slate-500">{hint}</p>
    </div>
  )
}

function ListCard({ title, items, empty, actionLabel, actionTo }) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="font-semibold text-slate-900">{title}</h2>
        <Link to={actionTo} className="text-sm font-medium text-green-700 hover:underline">
          {actionLabel}
        </Link>
      </div>
      {items.length === 0 ? (
        <p className="text-sm text-slate-500">{empty}</p>
      ) : (
        <ul className="space-y-3">
          {items.slice(0, 4).map((item) => (
            <li
              key={item.id}
              className="rounded-xl border border-slate-100 bg-slate-50 px-3 py-3 text-sm"
            >
              <p className="font-medium text-slate-800">{item.input.foodName}</p>
              <p className="text-slate-500">
                {item.input.storageType} · {item.recommended.name}
              </p>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}
