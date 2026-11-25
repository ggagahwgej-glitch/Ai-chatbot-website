'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase/client'
import Link from 'next/link'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const { error: authError } = await supabase.auth.signInWithPassword({
      email,
      password
    })

    if (authError) setError(authError.message)
    setLoading(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-md bg-secondary p-8 rounded-2xl border border-secondaryAccent/30 shadow-xl">
        <h1 className="text-3xl font-bold text-primaryAccent mb-6 text-center">
          Welcome Back
        </h1>
        {error && <p className="text-red-400 text-sm mb-4 text-center">{error}</p>}
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-text/80 text-sm mb-2">Email</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-background border border-secondaryAccent/30 rounded-xl px-4 py-3 text-text focus:outline-none focus:border-primaryAccent transition-colors"
              required
            />
          </div>
          <div>
            <label className="block text-text/80 text-sm mb-2">Password</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-background border border-secondaryAccent/30 rounded-xl px-4 py-3 text-text focus:outline-none focus:border-primaryAccent transition-colors"
              required
            />
          </div>
          <button 
            type="submit"
            disabled={loading}
            className="w-full bg-primaryAccent text-background py-3 rounded-xl font-semibold hover:bg-secondaryAccent transition-colors disabled:opacity-50"
          >
            {loading ? 'Signing in...' : 'Login'}
          </button>
        </form>
        <div className="mt-6 text-center text-text/60 text-sm">
          Don't have an account? <Link href="/signup" className="text-primaryAccent hover:text-secondaryAccent transition-colors">Sign up</Link>
        </div>
      </div>
    </div>
  )
}
