'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Session, User } from '@supabase/supabase-js'
import { createClient } from '@/lib/supabase/client'

interface AuthContextValue {
  user: User | null
  session: Session | null
  loading: boolean
  credits: number | null
  subscriptionTier: string | null
  signOut: () => Promise<void>
  refreshCredits: () => Promise<void>
}

const AuthContext = createContext<AuthContextValue | null>(null)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)
  const [credits, setCredits] = useState<number | null>(null)
  const [subscriptionTier, setSubscriptionTier] = useState<string | null>(null)

  async function fetchCredits(userId: string) {
    const supabase = createClient()
    const { data } = await supabase
      .from('users')
      .select('credits, subscription_tier')
      .eq('id', userId)
      .single()
    if (data) {
      setCredits(data.credits)
      setSubscriptionTier(data.subscription_tier ?? null)
    }
  }

  useEffect(() => {
    const supabase = createClient()

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      setUser(session?.user ?? null)
      if (session?.user) fetchCredits(session.user.id)
      setLoading(false)
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
      setUser(session?.user ?? null)
      if (session?.user) {
        fetchCredits(session.user.id)
      } else {
        setCredits(null)
        setSubscriptionTier(null)
      }
    })

    return () => subscription.unsubscribe()
  }, [])

  async function refreshCredits() {
    if (user) await fetchCredits(user.id)
  }

  async function signOut() {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/auth')
  }

  return (
    <AuthContext.Provider value={{ user, session, loading, credits, subscriptionTier, signOut, refreshCredits }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
