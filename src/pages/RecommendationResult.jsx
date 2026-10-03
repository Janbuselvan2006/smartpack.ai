import { Navigate, useNavigate } from 'react-router-dom'
import Button from '../components/Button'
import { useApp } from '../context/AppContext'

export default function RecommendationResult() {
  const { currentResult } = useApp()
  const navigate = useNavigate()

  if (!currentResult) return <Navigate to="/app/new" replace />

  const { recommended, alternatives, prototypeNote } = currentResult

  return (
    <div className="mx-auto max-w-4xl">
      <p className="text-sm font-medium text-green-700">Result</p>
      <h1 className="mt-1 text-2xl font-semibold text-slate-900">
        Recommended Packaging
      </h1>
      <p className="mt-2 rounded-xl bg-amber-50 px-3 py-2 text-sm text-amber-800">
        {prototypeNote}
      </p>

      <section className="mt-6 rounded-2xl border border-green-100 bg-white p-6">
        <p className="text-sm text-slate-500">Material name</p>
        <h2 className="text-xl font-semibold text-slate-900">{recommended.name}</h2>
        <p className="mt-3 text-slate-700">
          <span className="font-medium">Why it is recommended: </span>
          {recommended.why}
        </p>
        <dl className="mt-6 grid gap-3 sm:grid-cols-2">
          <Spec label="OTR" value={recommended.otr} />
          <Spec label="WVTR" value={recommended.wvtr} />
          <Spec label="Recommended Thickness" value={recommended.thickness} />
          <Spec label="Sealability" value={recommended.sealability} />
          <Spec label="Mechanical Strength" value={recommended.mechanicalStrength} />
          <Spec label="MAP Suitability" value={recommended.mapSuitability} />
        </dl>
      </section>

      <h2 className="mt-8 text-lg font-semibold text-slate-900">Alternative Options</h2>
      <div className="mt-4 grid gap-4 md:grid-cols-3">
        {alternatives.map((item, index) => (
          <article
            key={item.material.id}
            className="rounded-2xl border border-slate-200 bg-white p-5"
          >
            <p className="text-xs font-medium uppercase tracking-wide text-green-700">
              {index + 1}. {item.label}
            </p>
            <h3 className="mt-2 font-semibold text-slate-900">{item.material.name}</h3>
            <p className="mt-2 text-sm text-slate-600">{item.note}</p>
          </article>
        ))}
      </div>

      <div className="mt-8">
        <Button onClick={() => navigate('/app/summary')}>View summary</Button>
      </div>
    </div>
  )
}

function Spec({ label, value }) {
  return (
    <div className="rounded-xl bg-slate-50 px-4 py-3">
      <dt className="text-xs font-medium uppercase tracking-wide text-slate-500">
        {label}
      </dt>
      <dd className="mt-1 text-sm text-slate-800">{value}</dd>
    </div>
  )
}
