import { Navigate, useNavigate } from 'react-router-dom'
import Button from '../components/Button'
import { useApp } from '../context/AppContext'

export default function RecommendationSummary() {
  const { currentResult, saveRecommendation, resetDraft } = useApp()
  const navigate = useNavigate()

  if (!currentResult) return <Navigate to="/app/new" replace />

  const { input, recommended } = currentResult

  const downloadReport = () => {
    const text = [
      'PackSmart AI — Prototype Recommendation Report',
      '',
      `Food: ${input.foodName}`,
      `Category: ${input.foodCategory}`,
      `Storage: ${input.storageType}`,
      `Shelf Life: ${input.shelfLifeDays} days`,
      `Temperature: ${input.storageTemp} °C`,
      `Relative Humidity: ${input.relativeHumidity}%`,
      '',
      `Recommended Material: ${recommended.name}`,
      `Reason: ${recommended.why}`,
      '',
      'This is a prototype recommendation based on the available dataset/rules.',
      'It is not scientifically validated.',
    ].join('\n')

    const blob = new Blob([text], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `packsmart-${input.foodName.replace(/\s+/g, '-').toLowerCase()}.txt`
    link.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="mx-auto max-w-2xl">
      <p className="text-sm font-medium text-green-700">Summary</p>
      <h1 className="mt-1 text-2xl font-semibold text-slate-900">
        Recommendation Summary
      </h1>

      <section className="mt-6 space-y-4 rounded-2xl border border-slate-200 bg-white p-6">
        <p>
          <span className="font-semibold">Food:</span> {input.foodName}
        </p>
        <p>
          <span className="font-semibold">Storage:</span> {input.storageType}
        </p>
        <p>
          <span className="font-semibold">Shelf Life:</span> {input.shelfLifeDays} days
        </p>
        <hr className="border-slate-100" />
        <p>
          <span className="font-semibold">Recommended Material:</span> {recommended.name}
        </p>
        <p>
          <span className="font-semibold">Reason:</span> {recommended.why}
        </p>
        <p className="rounded-xl bg-amber-50 px-3 py-2 text-sm text-amber-800">
          Prototype recommendation based on the available dataset/rules. Not scientifically
          validated.
        </p>
      </section>

      <div className="mt-6 flex flex-wrap gap-3">
        <Button onClick={() => saveRecommendation(currentResult)}>
          {currentResult.saved ? 'Saved' : 'Save Recommendation'}
        </Button>
        <Button variant="secondary" onClick={downloadReport}>
          Download Report
        </Button>
        <Button
          variant="ghost"
          onClick={() => {
            resetDraft()
            navigate('/app/new')
          }}
        >
          Start New Recommendation
        </Button>
      </div>
    </div>
  )
}
