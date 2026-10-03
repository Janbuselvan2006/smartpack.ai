import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Button from '../components/Button'
import Field, { Input } from '../components/Field'
import { useApp } from '../context/AppContext'
import { AuthShell } from './Login'

export default function Signup() {
  const { login } = useApp()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const onSubmit = (event) => {
    event.preventDefault()
    if (!email || !password) {
      setError('Enter email and password to create an account.')
      return
    }
    login(email)
    navigate('/app')
  }

  return (
    <AuthShell>
      <h1 className="text-2xl font-semibold text-slate-900">Create account</h1>
      <p className="mt-1 text-sm text-slate-500">
        Prototype accounts are stored locally in this browser.
      </p>
      <form className="mt-8 space-y-4" onSubmit={onSubmit}>
        <Field label="Email">
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
          />
        </Field>
        <Field label="Password">
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Create a password"
          />
        </Field>
        {error ? <p className="text-sm text-red-600">{error}</p> : null}
        <Button type="submit" className="w-full">
          Create account
        </Button>
      </form>
      <p className="mt-6 text-center text-sm text-slate-600">
        Already have an account?{' '}
        <Link to="/login" className="font-medium text-green-700 hover:underline">
          Login
        </Link>
      </p>
    </AuthShell>
  )
}
