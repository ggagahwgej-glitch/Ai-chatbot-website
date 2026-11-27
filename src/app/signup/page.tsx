'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase/client'
import Link from 'next/link'

export default function SignupPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const { data, error: authError } = await supabase.auth.signUp({
      email,
      password
    })

    if (authError) {
      setError(authError.message)
    } else if (data) {
      // Implementation for profile creation and international/crypto region selection
      alert('Signup successful! Please verify your email.')
      window.location.href = '/login'
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#101014] p-4">
      <div className="max-w-md w-full bg-[#191923] border border-[#8B5CF6]/30 rounded-2xl p-8 shadow-[0_0_20px_rgba(139,92,246,0.2)] glow-border">
        <h1 className="text-3xl font-bold text-[#F8FAFC] text-center mb-8 drop-shadow-[0_0_10px_rgba(248,250,252,0.5)]">
          Join the Universe
        </h1>

        {error && (
          <div className="bg-[#EC4899]/10 border border-[#EC4899]/30 text-[#EC4899] p-3 rounded-lg mb-6 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSignup} className="space-y-6">
          <div>
            <label className="block text-[#F8FAFC]/80 text-sm mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-[#101014] border border-[#8B5CF6]/30 rounded-lg px-4 py-3 text-[#F8FAFC] focus:outline-none focus:border-[#06B6D4] glow-border"
              required
            />
          </div>

          <div>
            <label className="block text-[#F8FAFC]/80 text-sm mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-[#101014] border border-[#8B5CF6]/30 rounded-lg px-4 py-3 text-[#F8FAFC] focus:outline-none focus:border-[#06B6D4] glow-border"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#8B5CF6] text-[#101014] px-6 py-3 rounded-xl font-bold hover:bg-[#8B5CF6]/80 transition-colors disabled:opacity-50 shadow-[0_0_15px_rgba(139,92,246,0.4)] glow-border"
          >
            {loading ? 'Signing Up...' : 'Sign Up'}
          </button>
        </form>

        <div className="mt-6 text-center text-[#F8FAFC]/60">
          <p>
            Already have an account?{' '}
            <Link href="/login" className="text-[#06B6D4] hover:underline transition-colors">
              Sign In
            </Link>
          </p>
          <p className="mt-2 text-xs">
            International &amp; Crypto-Friendly Platform
          </p>
        </div>
      </div>
    </div>
  )
}
