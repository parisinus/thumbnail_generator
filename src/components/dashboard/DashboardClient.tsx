'use client'

import * as React from "react"
import { PromptArea } from "./PromptArea"
import { ThumbnailSidebar } from "./ThumbnailSidebar"

export function DashboardClient() {
  const [refreshTrigger, setRefreshTrigger] = React.useState(0)

  return (
    <div className="flex-1 flex flex-row overflow-hidden">
      <ThumbnailSidebar refreshTrigger={refreshTrigger} />

      <main className="flex-1 flex flex-col items-center justify-center px-6 py-24 overflow-y-auto">
        <div className="w-full max-w-2xl flex flex-col gap-8">
          <h1 className="text-center text-4xl font-semibold text-slate-900 leading-tight">
            Create your Thumbnail
          </h1>
          <PromptArea onNewThumbnail={() => setRefreshTrigger((n) => n + 1)} />
        </div>
      </main>
    </div>
  )
}
