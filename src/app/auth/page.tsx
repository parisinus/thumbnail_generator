'use client'

import { createClient } from "@/lib/supabase/client";
import Image from "next/image";

// 왼쪽 패널에 표시할 유튜브 영상 ID (필요시 교체)
const YOUTUBE_VIDEO_ID = "dQw4w9WgXcQ"

export default function AuthPage() {
  async function handleGoogleLogin() {
    const supabase = createClient()
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    })
  }

  return (
    <div className="flex h-screen w-screen overflow-hidden">

      {/* ── 왼쪽 패널 (3/5) ── */}
      <div className="relative w-3/5 overflow-hidden bg-black">

        {/* 유튜브 영상 */}
        <iframe
          className="absolute inset-0 w-full h-full object-cover"
          src={`https://www.youtube.com/embed/${YOUTUBE_VIDEO_ID}?autoplay=1&mute=1&loop=1&playlist=${YOUTUBE_VIDEO_ID}&controls=0&modestbranding=1&rel=0`}
          allow="autoplay; encrypted-media"
          allowFullScreen
          style={{ border: 'none', pointerEvents: 'none', transform: 'scale(1.1)' }}
        />

        {/* 어두운 오버레이 */}
        <div className="absolute inset-0 bg-black/55" />

        {/* Thumbgen 타이틀 */}
        <div className="absolute bottom-0 left-0 right-0 z-10 px-10 pb-8">
          <h1
            className="text-white leading-none select-none"
            style={{
              fontFamily: 'var(--font-bebas-neue)',
              fontSize: 'clamp(6rem, 12vw, 11rem)',
              letterSpacing: '-0.01em',
            }}
          >
            Thumbgen
          </h1>
          <p className="text-white/60 text-sm mt-1">AI-Powered YouTube Thumbnail Generator</p>
        </div>
      </div>

      {/* ── 오른쪽 패널 (2/5) ── */}
      <div className="relative w-2/5 flex items-center justify-center overflow-hidden bg-zinc-50">

        {/* Aurora 배경 효과 */}
        <div className="absolute inset-0 overflow-hidden">
          <div
            className="absolute -inset-[10px] opacity-50 will-change-transform pointer-events-none aurora-animate"
            style={{
              backgroundImage:
                'repeating-linear-gradient(100deg,#fff 0%,#fff 7%,transparent 10%,transparent 12%,#fff 16%), repeating-linear-gradient(100deg,#3b82f6 10%,#a5b4fc 15%,#93c5fd 20%,#ddd6fe 25%,#60a5fa 30%)',
              backgroundSize: '300% 200%',
              filter: 'blur(10px) invert(1)',
              maskImage: 'radial-gradient(ellipse at 100% 0%, black 10%, transparent 70%)',
              WebkitMaskImage: 'radial-gradient(ellipse at 100% 0%, black 10%, transparent 70%)',
            }}
          />
        </div>

        {/* 로그인 카드 */}
        <div className="relative z-10 w-full max-w-sm px-8">
          <div className="rounded-2xl border border-slate-200 bg-white/70 backdrop-blur-sm shadow-xl shadow-blue-100 p-8 flex flex-col items-center gap-6">

            {/* Logo */}
            <Image
              src="/thumbgen-logo.svg"
              alt="Thumbnail Generator Logo"
              width={200}
              height={41}
              className="mx-auto"
            />

            {/* Title */}
            <div className="flex flex-col items-center gap-2 text-center">
              <h1 className="text-2xl font-bold text-slate-900">Welcome back</h1>
              <p className="text-sm text-slate-500">Sign in to start generating thumbnails</p>
            </div>

            {/* Google Login Button */}
            <button
              onClick={handleGoogleLogin}
              className="w-full flex items-center justify-center gap-3 px-6 py-3 rounded-full border border-slate-200 bg-white hover:bg-slate-50 transition-colors shadow-sm text-slate-700 font-semibold text-sm"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M19.6 10.23c0-.68-.06-1.36-.18-2H10v3.79h5.4a4.63 4.63 0 0 1-2 3.04v2.52h3.24c1.9-1.75 3-4.33 3-7.35z" fill="#4285F4"/>
                <path d="M10 20c2.7 0 4.97-.9 6.62-2.42l-3.24-2.52a6.01 6.01 0 0 1-8.95-3.15H1.1v2.6A10 10 0 0 0 10 20z" fill="#34A853"/>
                <path d="M4.43 11.91A6.02 6.02 0 0 1 4.1 10c0-.66.11-1.3.31-1.91V5.49H1.1A10 10 0 0 0 0 10c0 1.61.39 3.14 1.1 4.51l3.33-2.6z" fill="#FBBC05"/>
                <path d="M10 3.98a5.44 5.44 0 0 1 3.84 1.5l2.87-2.87A9.66 9.66 0 0 0 10 0 10 10 0 0 0 1.1 5.49l3.33 2.6A5.96 5.96 0 0 1 10 3.98z" fill="#EA4335"/>
              </svg>
              Continue with Google
            </button>

            {/* Terms */}
            <p className="text-xs text-slate-400 text-center leading-relaxed">
              By continuing, you agree to our{" "}
              <span className="text-slate-600 underline underline-offset-2 cursor-pointer">Terms of Service</span>
              {" "}and{" "}
              <span className="text-slate-600 underline underline-offset-2 cursor-pointer">Privacy Policy</span>
            </p>

          </div>
        </div>
      </div>

    </div>
  )
}
