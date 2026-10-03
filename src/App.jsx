import { Navigate, Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import ProtectedRoute from './components/ProtectedRoute'
import { useApp } from './context/AppContext'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Dashboard from './pages/Dashboard'
import NewRecommendation from './pages/NewRecommendation'
import Analyzing from './pages/Analyzing'
import RecommendationResult from './pages/RecommendationResult'
import RecommendationSummary from './pages/RecommendationSummary'
import PreviousResults from './pages/PreviousResults'
import Materials from './pages/Materials'
import Profile from './pages/Profile'

export default function App() {
  const { user } = useApp()

  return (
    <Routes>
      <Route path="/login" element={user ? <Navigate to="/app" replace /> : <Login />} />
      <Route path="/signup" element={user ? <Navigate to="/app" replace /> : <Signup />} />
      <Route
        path="/app"
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="new" element={<NewRecommendation />} />
        <Route path="analyzing" element={<Analyzing />} />
        <Route path="result" element={<RecommendationResult />} />
        <Route path="summary" element={<RecommendationSummary />} />
        <Route path="history" element={<PreviousResults />} />
        <Route path="materials" element={<Materials />} />
        <Route path="profile" element={<Profile />} />
      </Route>
      <Route path="*" element={<Navigate to={user ? '/app' : '/login'} replace />} />
    </Routes>
  )
}
