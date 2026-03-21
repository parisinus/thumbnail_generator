'use client'

import * as React from "react"
import { createPortal } from "react-dom"
import Image from 'next/image'
import Link from 'next/link'
import { useAuth } from '@/context/AuthContext'
import { PricingModal } from './PricingModal'

const SparkleIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M12 3l1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5L12 3z"/>
    <path d="M19 15l.75 2.25L22 18l-2.25.75L19 21l-.75-2.25L16 18l2.25-.75L19 15z"/>
  </svg>
)

export default function DashboardNav() {
  const { user, signOut, credits, subscriptionTier } = useAuth()
  const [isPricingOpen, setIsPricingOpen] = React.useState(false)

  const avatarUrl = user?.user_metadata?.avatar_url as string | undefined
  const displayName = user?.user_metadata?.full_name as string | undefined
  const email = user?.email

  async function handlePortal() {
    const res = await fetch("/api/polar/portal", { method: "POST" })
    const data = await res.json()
    if (data.url) window.location.href = data.url
  }

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 pointer-events-none">

        {/* 로고 - 독립 플로팅 버튼 */}
        <Link
          href="/dashboard"
          className="pointer-events-auto bg-white/80 backdrop-blur-md border border-slate-200/70 rounded-2xl px-4 py-2.5 shadow-sm hover:shadow-md transition-all"
        >
          <Image src="/thumbgen-logo.svg" alt="Thumbgen" width={120} height={25} />
        </Link>

        {/* 프로필 - 독립 플로팅 버튼 + 호버 팝오버 */}
        <div className="pointer-events-auto relative group">

          {/* 아바타 버튼 (크레딧 배지 포함) */}
          <div className="bg-white/80 backdrop-blur-md border border-slate-200/70 rounded-2xl px-3 py-2.5 shadow-sm cursor-pointer hover:shadow-md transition-all flex items-center gap-2">
            {credits !== null && (
              <span className="text-xs font-semibold text-violet-600 bg-violet-50 px-2 py-0.5 rounded-full">
                {credits} cr
              </span>
            )}
            {avatarUrl ? (
              <Image
                src={avatarUrl}
                alt={displayName ?? 'avatar'}
                width={28}
                height={28}
                className="rounded-full block"
              />
            ) : (
              <div className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-500 to-violet-500 flex items-center justify-center text-white text-xs font-bold">
                {displayName?.[0]?.toUpperCase() ?? email?.[0]?.toUpperCase() ?? '?'}
              </div>
            )}
          </div>

          {/* 호버 드롭다운 */}
          <div className="absolute top-full right-0 mt-2 invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all duration-150 translate-y-1 group-hover:translate-y-0">
            <div className="bg-white border border-slate-200 rounded-2xl shadow-xl p-2 min-w-[200px]">
              <div className="flex items-center gap-2.5 px-3 py-2">
                {avatarUrl ? (
                  <Image src={avatarUrl} alt="" width={32} height={32} className="rounded-full flex-shrink-0" />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-violet-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                    {displayName?.[0]?.toUpperCase() ?? '?'}
                  </div>
                )}
                <div className="flex flex-col leading-tight min-w-0">
                  {displayName && (
                    <span className="text-sm font-semibold text-slate-800 truncate">{displayName}</span>
                  )}
                  <span className="text-xs text-slate-500 truncate">{email}</span>
                </div>
              </div>

              {/* 크레딧 표시 */}
              {credits !== null && (
                <>
                  <div className="h-px bg-slate-100 my-1" />
                  <div className="px-3 py-1.5 flex items-center justify-between">
                    <span className="text-xs text-slate-500">Credits</span>
                    <span className="text-xs font-bold text-violet-600">{credits}</span>
                  </div>
                </>
              )}

              <div className="h-px bg-slate-100 my-1" />

              {/* 구독 관리 버튼 (구독 중일 때만 표시) */}
              {subscriptionTier && (
                <button
                  onClick={handlePortal}
                  className="w-full text-left px-3 py-2 text-sm text-slate-600 hover:bg-slate-50 rounded-xl transition-colors flex items-center gap-2"
                >
                  <SparkleIcon className="h-4 w-4 text-violet-500" />
                  Manage Subscription
                </button>
              )}

              {/* 업그레이드 버튼 (구독 없을 때만 표시) */}
              {!subscriptionTier && (
                <button
                  onClick={() => setIsPricingOpen(true)}
                  className="w-full text-left px-3 py-2 text-sm text-slate-600 hover:bg-slate-50 rounded-xl transition-colors flex items-center gap-2"
                >
                  <SparkleIcon className="h-4 w-4 text-violet-500" />
                  Upgrade Plan
                </button>
              )}

              <div className="h-px bg-slate-100 my-1" />
              <button
                onClick={signOut}
                className="w-full text-left px-3 py-2 text-sm text-slate-600 hover:bg-slate-50 rounded-xl transition-colors"
              >
                Sign out
              </button>
            </div>
          </div>

        </div>
      </nav>

      {/* Pricing Modal — React Portal */}
      {isPricingOpen && typeof document !== "undefined" &&
        createPortal(
          <PricingModal onClose={() => setIsPricingOpen(false)} />,
          document.body
        )
      }
    </>
  )
}
