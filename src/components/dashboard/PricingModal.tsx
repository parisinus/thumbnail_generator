'use client'

import * as React from "react"

const XIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
  </svg>
)

const CheckIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <polyline points="20 6 9 17 4 12" />
  </svg>
)

interface PricingModalProps {
  onClose: () => void
}

export function PricingModal({ onClose }: PricingModalProps) {
  const [loading, setLoading] = React.useState<"pro" | "ultra" | null>(null)

  const handleCheckout = async (plan: "pro" | "ultra") => {
    setLoading(plan)
    try {
      const res = await fetch("/api/polar/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ planId: plan }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error)
      window.location.href = data.url
    } catch (err) {
      console.error("Checkout error:", err)
      setLoading(null)
    }
  }

  // ESC 키로 닫기
  React.useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    window.addEventListener("keydown", handleKey)
    return () => window.removeEventListener("keydown", handleKey)
  }, [onClose])

  // body 스크롤 잠금
  React.useEffect(() => {
    document.body.style.overflow = "hidden"
    return () => { document.body.style.overflow = "" }
  }, [])

  return (
    <div
      className="fixed inset-0 z-[70] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      {/* 스피닝 그라디언트 테두리 래퍼 */}
      <div
        className="relative rounded-[28px] p-[2px] overflow-hidden w-full max-w-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 회전 그라디언트 */}
        <div
          style={{
            position: "absolute",
            width: "900px",
            height: "900px",
            top: "50%",
            left: "50%",
            marginTop: "-450px",
            marginLeft: "-450px",
            background:
              "conic-gradient(from 0deg, transparent 0%, transparent 40%, #A07CFE 55%, #FE8FB5 65%, #FFBE7B 75%, transparent 90%)",
            animation: "spin-border 4s linear infinite",
          }}
        />

        {/* 모달 본체 */}
        <div className="relative bg-white rounded-[26px] px-8 py-8">

          {/* 닫기 버튼 */}
          <button
            type="button"
            onClick={onClose}
            className="absolute right-5 top-5 flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 hover:bg-slate-200 transition-colors text-slate-500"
          >
            <XIcon className="h-4 w-4" />
          </button>

          {/* 헤더 */}
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-slate-900">Choose Your Plan</h2>
            <p className="mt-1.5 text-sm text-slate-500">Generate stunning YouTube thumbnails with AI</p>
          </div>

          {/* 카드 2개 */}
          <div className="grid grid-cols-2 gap-4">

            {/* Pro 카드 */}
            <div className="flex flex-col rounded-2xl border border-slate-200 p-6">
              <div className="mb-4">
                <span className="text-sm font-semibold text-slate-500 uppercase tracking-wide">Pro</span>
                <div className="mt-2 flex items-end gap-1">
                  <span className="text-4xl font-bold text-slate-900">$20</span>
                  <span className="mb-1 text-sm text-slate-400">/month</span>
                </div>
              </div>

              <ul className="flex flex-col gap-2.5 mb-6 flex-1">
                {[
                  "100 credits / month",
                  "2K resolution thumbnails",
                  "All styles & tools",
                  "Reference image upload",
                ].map((feat) => (
                  <li key={feat} className="flex items-center gap-2 text-sm text-slate-600">
                    <CheckIcon className="h-4 w-4 text-slate-400 shrink-0" />
                    {feat}
                  </li>
                ))}
              </ul>

              <button
                type="button"
                onClick={() => handleCheckout("pro")}
                disabled={loading !== null}
                className="w-full rounded-xl border border-slate-200 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading === "pro" ? "Redirecting..." : "Get Started"}
              </button>
            </div>

            {/* Ultra 카드 */}
            <div className="relative flex flex-col rounded-2xl border border-violet-300 bg-violet-50/50 p-6">
              {/* Most Popular 뱃지 */}
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-violet-500 to-pink-500 px-3 py-0.5 text-xs font-semibold text-white shadow-sm">
                Most Popular
              </span>

              <div className="mb-4">
                <span className="text-sm font-semibold text-violet-600 uppercase tracking-wide">Ultra</span>
                <div className="mt-2 flex items-end gap-1">
                  <span className="text-4xl font-bold text-slate-900">$45</span>
                  <span className="mb-1 text-sm text-slate-400">/month</span>
                </div>
              </div>

              <ul className="flex flex-col gap-2.5 mb-6 flex-1">
                {[
                  "300 credits / month",
                  "2K resolution thumbnails",
                  "All styles & tools",
                  "Reference image upload",
                  "Priority generation",
                ].map((feat) => (
                  <li key={feat} className="flex items-center gap-2 text-sm text-slate-600">
                    <CheckIcon className="h-4 w-4 text-violet-400 shrink-0" />
                    {feat}
                  </li>
                ))}
              </ul>

              <button
                type="button"
                onClick={() => handleCheckout("ultra")}
                disabled={loading !== null}
                className="w-full rounded-xl bg-gradient-to-r from-violet-500 to-pink-500 py-2.5 text-sm font-semibold text-white hover:opacity-90 transition-opacity shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading === "ultra" ? "Redirecting..." : "Get Started"}
              </button>
            </div>

          </div>

          {/* 하단 안내 */}
          <p className="mt-6 text-center text-xs text-slate-400">
            Payments are securely processed via Polar · Cancel anytime
          </p>

        </div>
      </div>
    </div>
  )
}
