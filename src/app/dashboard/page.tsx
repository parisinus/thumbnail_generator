import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import DashboardNav from '@/components/dashboard/DashboardNav'
import { PromptArea } from '@/components/dashboard/PromptArea'

export default async function DashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/auth')
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <DashboardNav />

      <main className="flex-1 flex flex-col items-center justify-center px-6 py-24">
        <div className="w-full max-w-2xl flex flex-col gap-8">
          <h1 className="text-center text-4xl font-semibold text-slate-900 leading-tight">
            Create your Thumbnail
          </h1>
          <PromptArea />
        </div>
      </main>
    </div>
  )
}
