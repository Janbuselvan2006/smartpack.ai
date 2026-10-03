import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import { analyzeRecommendation } from '../api/recommend'
import Button from '../components/Button'

const loadingMessages = [
  'Your suggestion is loading…',
  'Comparing packaging material properties…',
  'Preparing a recommendation for your product…',
]

export default function Analyzing() {
  const { draft, setCurrentResult, addToHistory } = useApp()
  const navigate = useNavigate()
  const [messageIndex, setMessageIndex] = useState(0)
  const [error, setError] = useState(false)

  useEffect(() => {
    let active = true
    const startedAt = Date.now()
    const messageTimer = window.setInterval(() => {
      setMessageIndex((index) => (index + 1) % loadingMessages.length)
    }, 1100)

    async function analyze() {
      try {
        const result = await analyzeRecommendation(draft)
        const remainingTime = Math.max(0, 1600 - (Date.now() - startedAt))
        await new Promise((resolve) => window.setTimeout(resolve, remainingTime))
        if (!active) return
        setCurrentResult(result)
        addToHistory(result)
        navigate('/app/result', { replace: true })
      } catch {
        if (active) setError(true)
      }
    }

    analyze()
    return () => {
      active = false
      window.clearInterval(messageTimer)
    }
  }, [draft, setCurrentResult, addToHistory, navigate])

  if (error) {
    return (
      <div className="mx-auto flex min-h-[60vh] max-w-lg flex-col items-center justify-center text-center">
        <h1 className="text-xl font-semibold text-slate-900">
          We couldn’t prepare your recommendation.
        </h1>
        <p className="mt-2 text-sm text-slate-500">
          Please check your details and try again.
        </p>
        <Button className="mt-6" onClick={() => navigate('/app/new')}>
          Back to details
        </Button>
      </div>
    )
  }

  return (
    <div className="mx-auto flex min-h-[60vh] max-w-lg flex-col items-center justify-center text-center">
      <div className="h-12 w-12 animate-spin rounded-full border-4 border-green-100 border-t-green-600" />
      <h1 className="mt-6 text-xl font-semibold text-slate-900">
        Analyzing food properties and packaging requirements…
      </h1>
      <p className="mt-2 text-sm text-slate-500">
        {loadingMessages[messageIndex]}
      </p>
      <div className="mt-8 h-2 w-full overflow-hidden rounded-full bg-slate-200">
        <div className="progress-bar h-full rounded-full bg-green-600" />
      </div>
    </div>
  )
}
