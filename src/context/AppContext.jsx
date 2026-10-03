import { createContext, useCallback, useContext, useMemo, useState } from 'react'
import { seedRecommendations } from '../data/seed'

const USER_KEY = 'packsmart_user'
const REC_KEY = 'packsmart_recommendations'

const AppContext = createContext(null)

function readJson(key, fallback) {
  try {
    const raw = localStorage.getItem(key)
    return raw ? JSON.parse(raw) : fallback
  } catch {
    return fallback
  }
}

export function AppProvider({ children }) {
  const [user, setUser] = useState(() => readJson(USER_KEY, null))
  const [recommendations, setRecommendations] = useState(() => {
    const stored = readJson(REC_KEY, null)
    return stored ?? seedRecommendations
  })
  const [draft, setDraft] = useState(emptyDraft())
  const [currentResult, setCurrentResult] = useState(null)

  const persistRecs = useCallback((updater) => {
    setRecommendations((prev) => {
      const next = typeof updater === 'function' ? updater(prev) : updater
      localStorage.setItem(REC_KEY, JSON.stringify(next))
      return next
    })
  }, [])

  const login = useCallback((email) => {
    const next = { email, name: email.split('@')[0] }
    setUser(next)
    localStorage.setItem(USER_KEY, JSON.stringify(next))
  }, [])

  const logout = useCallback(() => {
    setUser(null)
    localStorage.removeItem(USER_KEY)
  }, [])

  const resetDraft = useCallback(() => setDraft(emptyDraft()), [])

  const saveRecommendation = useCallback(
    (result) => {
      const entry = toHistory(result, true)
      persistRecs((prev) => [entry, ...prev.filter((item) => item.id !== entry.id)])
      setCurrentResult({ ...result, saved: true })
    },
    [persistRecs],
  )

  const addToHistory = useCallback(
    (result) => {
      const entry = toHistory(result, false)
      persistRecs((prev) =>
        prev.some((item) => item.id === entry.id) ? prev : [entry, ...prev],
      )
    },
    [persistRecs],
  )

  const value = useMemo(
    () => ({
      user,
      draft,
      setDraft,
      resetDraft,
      currentResult,
      setCurrentResult,
      recommendations,
      login,
      logout,
      saveRecommendation,
      addToHistory,
    }),
    [
      user,
      draft,
      resetDraft,
      currentResult,
      recommendations,
      login,
      logout,
      saveRecommendation,
      addToHistory,
    ],
  )

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export function useApp() {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be used within AppProvider')
  return ctx
}

export function emptyDraft() {
  return {
    foodName: '',
    foodCategory: 'Fresh Produce',
    moistureContent: '',
    pH: '',
    oilFatContent: '',
    respirationRate: 'High',
    shelfLifeDays: '',
    storageTemp: '',
    relativeHumidity: '',
    storageType: 'Chilled',
    transportationCondition: '',
  }
}

function toHistory(result, saved) {
  return {
    id: result.id,
    createdAt: result.createdAt,
    saved,
    input: result.input,
    recommended: {
      id: result.recommended.id,
      name: result.recommended.name,
      why: result.recommended.why,
    },
  }
}
