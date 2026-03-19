'use client'

import Image from 'next/image'
import { useAuth } from '@/context/AuthContext'

export default function UserHeader() {
  const { user, signOut } = useAuth()

  const avatarUrl = user?.user_metadata?.avatar_url as string | undefined
  const displayName = user?.user_metadata?.full_name as string | undefined
  const email = user?.email

  return (
    <header className="w-full border-b border-slate-200 bg-white/80 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* 로고 */}
        <Image
          src="/thumbgen-logo.svg"
          alt="Thumbgen"
          width={140}
          height={29}
        />

        {/* 유저 정보 + 로그아웃 */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3">
            {avatarUrl ? (
              <Image
                src={avatarUrl}
                alt={displayName ?? 'avatar'}
                width={36}
                height={36}
                className="rounded-full ring-2 ring-slate-200"
              />
            ) : (
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-violet-500 flex items-center justify-center text-white text-sm font-bold">
                {displayName?.[0]?.toUpperCase() ?? email?.[0]?.toUpperCase() ?? '?'}
              </div>
            )}
            <div className="flex flex-col leading-tight">
              {displayName && (
                <span className="text-sm font-semibold text-slate-800">{displayName}</span>
              )}
              <span className="text-xs text-slate-500">{email}</span>
            </div>
          </div>

          <button
            onClick={signOut}
            className="px-4 py-1.5 rounded-full text-sm font-medium text-slate-600 border border-slate-200 hover:bg-slate-50 transition-colors"
          >
            Sign out
          </button>
        </div>

      </div>
    </header>
  )
}
