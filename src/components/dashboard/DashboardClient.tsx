'use client'

import * as React from "react"
import { createPortal } from "react-dom"
import { PromptArea } from "./PromptArea"
import { ThumbnailSidebar } from "./ThumbnailSidebar"
import { PricingModal } from "./PricingModal"

export function DashboardClient() {
  const [refreshTrigger, setRefreshTrigger] = React.useState(0)
  const [isPricingOpen, setIsPricingOpen] = React.useState(false)

  return (
    <div className="flex-1 flex flex-row overflow-hidden">
      <ThumbnailSidebar refreshTrigger={refreshTrigger} />

      <main className="flex-1 flex flex-col items-center justify-center px-6 py-24 overflow-y-auto">
        <div className="w-full max-w-2xl flex flex-col gap-8">
          <h1 className="text-center text-4xl font-semibold text-slate-900 leading-tight">
            Create your Thumbnail
          </h1>
          <PromptArea
            onNewThumbnail={() => setRefreshTrigger((n) => n + 1)}
            onOutOfCredits={() => setIsPricingOpen(true)}
          />
        </div>
      </main>

      {isPricingOpen && typeof document !== "undefined" &&
        createPortal(
          <PricingModal onClose={() => setIsPricingOpen(false)} />,
          document.body
        )
      }
    </div>
  )
}
