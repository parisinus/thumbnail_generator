'use client'

import * as React from "react"
import { createClient } from "@/lib/supabase/client"

interface HistoryItem {
  id: string
  prompt: string | null
  tool: string | null
  image_path: string | null
  created_at: string
  imageUrl?: string
}

const DownloadIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
    <polyline points="7 10 12 15 17 10"/>
    <line x1="12" y1="15" x2="12" y2="3"/>
  </svg>
)

const TrashIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <polyline points="3 6 5 6 21 6"/>
    <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/>
    <path d="M10 11v6"/>
    <path d="M14 11v6"/>
    <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/>
  </svg>
)

const XIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <line x1="18" y1="6" x2="6" y2="18"/>
    <line x1="6" y1="6" x2="18" y2="18"/>
  </svg>
)

async function fetchWithSignedUrls(items: HistoryItem[], supabase: ReturnType<typeof createClient>) {
  return Promise.all(
    items.map(async (item) => {
      if (!item.image_path) return item
      const { data } = await supabase.storage
        .from("thumbnails")
        .createSignedUrl(item.image_path, 3600)
      return { ...item, imageUrl: data?.signedUrl }
    })
  )
}

export function ThumbnailSidebar({ refreshTrigger }: { refreshTrigger?: number }) {
  const [items, setItems] = React.useState<HistoryItem[]>([])
  const [loading, setLoading] = React.useState(true)
  const [selectedItem, setSelectedItem] = React.useState<HistoryItem | null>(null)
  const supabase = React.useMemo(() => createClient(), [])

  const loadHistory = React.useCallback(async () => {
    const { data, error } = await supabase
      .from("thumbnails")
      .select("id, prompt, tool, image_path, created_at")
      .eq("status", "completed")
      .order("created_at", { ascending: false })
      .limit(30)

    if (error || !data) return

    const withUrls = await fetchWithSignedUrls(data, supabase)
    setItems(withUrls)
    setLoading(false)
  }, [supabase])

  React.useEffect(() => {
    loadHistory()
  }, [loadHistory, refreshTrigger])

  React.useEffect(() => {
    const channel = supabase
      .channel("thumbnails-sidebar")
      .on(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table: "thumbnails" },
        (payload) => {
          if (payload.new.status === "completed") {
            loadHistory()
          }
        }
      )
      .subscribe()

    return () => { supabase.removeChannel(channel) }
  }, [supabase, loadHistory])

  const handleDelete = async (item: HistoryItem) => {
    setItems(prev => prev.filter(i => i.id !== item.id))
    setSelectedItem(null)
    await fetch(`/api/thumbnails/${item.id}`, { method: "DELETE" })
  }

  const handleDownload = async (item: HistoryItem) => {
    if (!item.imageUrl) return
    const res = await fetch(item.imageUrl)
    const blob = await res.blob()
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `thumbnail-${item.id.slice(0, 8)}.png`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <>
      <aside className="w-64 shrink-0 sticky top-0 h-screen flex flex-col bg-[#202020] border-r border-white/10 overflow-hidden relative">

        {/* Liquid glass 효과 */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-white/5 to-transparent pointer-events-none" />

        {/* 헤더 */}
        <div className="px-4 pt-20 pb-3 shrink-0">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-white/40">Gallery</h2>
        </div>

        {/* 스크롤 영역 */}
        <div className="flex-1 overflow-y-auto px-3 pb-6 flex flex-col gap-3 sidebar-scroll">

          {loading && (
            [1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="w-full aspect-video rounded-xl bg-white/10 animate-pulse" />
            ))
          )}

          {!loading && items.length === 0 && (
            <div className="flex-1 flex items-center justify-center px-4 mt-8">
              <p className="text-xs text-white/25 text-center leading-relaxed">
                Generated thumbnails<br />will appear here
              </p>
            </div>
          )}

          {!loading && items.map((item) => (
            <div
              key={item.id}
              className="group relative rounded-xl overflow-hidden bg-white/5 border border-white/10 hover:border-white/20 transition-all cursor-pointer"
              onClick={() => setSelectedItem(item)}
            >
              {item.imageUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={item.imageUrl}
                  alt={item.prompt ?? "Generated thumbnail"}
                  className="w-full aspect-video object-cover"
                />
              ) : (
                <div className="w-full aspect-video flex items-center justify-center text-white/20 text-xs">
                  No image
                </div>
              )}

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-all flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); handleDownload(item) }}
                  className="flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs text-white bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-white/30 transition-colors"
                >
                  <DownloadIcon className="h-3.5 w-3.5" />
                  <span>Download</span>
                </button>
                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); handleDelete(item) }}
                  className="flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs text-white bg-red-500/70 hover:bg-red-500/90 backdrop-blur-sm border border-red-400/30 transition-colors"
                >
                  <TrashIcon className="h-3.5 w-3.5" />
                  <span>Delete</span>
                </button>
              </div>

              {/* 프롬프트 텍스트 */}
              <div className="px-2.5 py-2">
                <p className="text-xs text-white/50 line-clamp-1 leading-relaxed">
                  {item.prompt ?? "No prompt"}
                </p>
              </div>
            </div>
          ))}

        </div>
      </aside>

      {/* 확대 모달 */}
      {selectedItem && (
        <div
          className="fixed inset-0 z-[60] bg-black/80 backdrop-blur-sm flex items-center justify-center p-6"
          onClick={() => setSelectedItem(null)}
        >
          <div
            className="relative max-w-4xl w-full rounded-2xl overflow-hidden bg-[#1a1a1a] border border-white/10 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* X 버튼 */}
            <button
              type="button"
              onClick={() => setSelectedItem(null)}
              className="absolute top-3 right-3 z-10 flex items-center justify-center w-8 h-8 rounded-full bg-black/50 hover:bg-black/70 text-white/70 hover:text-white border border-white/10 transition-colors"
            >
              <XIcon className="h-4 w-4" />
            </button>

            {/* 이미지 */}
            {selectedItem.imageUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={selectedItem.imageUrl}
                alt={selectedItem.prompt ?? "Generated thumbnail"}
                className="w-full aspect-video object-cover"
              />
            ) : (
              <div className="w-full aspect-video flex items-center justify-center text-white/20 text-sm">
                No image
              </div>
            )}

            {/* 하단 바 */}
            <div className="px-5 py-4 flex items-center justify-between gap-4">
              <p className="text-sm text-white/60 line-clamp-2 flex-1">
                {selectedItem.prompt ?? "No prompt"}
              </p>
              <div className="flex gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() => handleDownload(selectedItem)}
                  className="flex items-center gap-1.5 rounded-full px-4 py-2 text-sm text-white bg-white/10 hover:bg-white/20 border border-white/20 transition-colors"
                >
                  <DownloadIcon className="h-4 w-4" />
                  <span>Download</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(selectedItem)}
                  className="flex items-center gap-1.5 rounded-full px-4 py-2 text-sm text-white bg-red-500/70 hover:bg-red-500/90 border border-red-400/30 transition-colors"
                >
                  <TrashIcon className="h-4 w-4" />
                  <span>Delete</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
