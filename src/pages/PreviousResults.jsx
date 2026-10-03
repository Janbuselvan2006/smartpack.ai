import { useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import { buildRecommendation } from '../api/recommend'
import Button from '../components/Button'

export default function PreviousResults() {
  const { recommendations, setCurrentResult, setDraft } = useApp()
  const navigate = useNavigate()
  const saved = recommendations.filter((item) => item.saved)

  const open = (item) => {
    const result = buildRecommendation(item.input)
    result.id = item.id
    result.createdAt = item.createdAt
    result.saved = item.saved
    setDraft(item.input)
    setCurrentResult(result)
    navigate('/app/result')
  }

  return (
    <div className="mx-auto max-w-4xl">
      <h1 className="text-2xl font-semibold text-slate-900">Previous Results</h1>
      <p className="mt-2 text-sm text-slate-500">
        {saved.length} saved · {recommendations.length} total
      </p>
      <div className="mt-6 space-y-3">
        {recommendations.map((item) => (
          <article
            key={item.id}
            className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-5 sm:flex-row sm:items-center sm:justify-between"
          >
            <div>
              <p className="font-medium text-slate-900">{item.input.foodName}</p>
              <p className="text-sm text-slate-500">
                {item.input.storageType} · {item.input.shelfLifeDays} days ·{' '}
                {item.recommended.name}
              </p>
              {item.saved ? (
                <span className="mt-2 inline-block rounded-full bg-green-50 px-2 py-0.5 text-xs font-medium text-green-700">
                  Saved
                </span>
              ) : null}
            </div>
            <Button variant="secondary" onClick={() => open(item)}>
              View
            </Button>
          </article>
        ))}
      </div>
    </div>
  )
}
