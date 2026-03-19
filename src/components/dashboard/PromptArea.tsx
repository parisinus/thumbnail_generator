'use client'

import * as React from "react"
import * as TooltipPrimitive from "@radix-ui/react-tooltip"
import * as PopoverPrimitive from "@radix-ui/react-popover"
import * as DialogPrimitive from "@radix-ui/react-dialog"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"
import { LoadingLines } from "./LoadingLines"
import { createClient } from "@/lib/supabase/client"

// ── Radix: Tooltip ──────────────────────────────────────────────────────────
const TooltipProvider = TooltipPrimitive.Provider
const Tooltip = TooltipPrimitive.Root
const TooltipTrigger = TooltipPrimitive.Trigger
const TooltipContent = React.forwardRef<
  React.ComponentRef<typeof TooltipPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>
>(({ className, sideOffset = 4, ...props }, ref) => (
  <TooltipPrimitive.Portal>
    <TooltipPrimitive.Content
      ref={ref}
      sideOffset={sideOffset}
      className={cn(
        "z-50 max-w-[280px] rounded-md bg-slate-900 text-white px-2 py-1 text-xs shadow-md",
        className
      )}
      {...props}
    />
  </TooltipPrimitive.Portal>
))
TooltipContent.displayName = TooltipPrimitive.Content.displayName

// ── Radix: Popover ───────────────────────────────────────────────────────────
const Popover = PopoverPrimitive.Root
const PopoverTrigger = PopoverPrimitive.Trigger
const PopoverContent = React.forwardRef<
  React.ComponentRef<typeof PopoverPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content>
>(({ className, align = "center", sideOffset = 4, ...props }, ref) => (
  <PopoverPrimitive.Portal>
    <PopoverPrimitive.Content
      ref={ref}
      align={align}
      sideOffset={sideOffset}
      className={cn(
        "z-50 w-56 rounded-2xl bg-white border border-slate-200 shadow-xl p-2 text-slate-900 outline-none",
        className
      )}
      {...props}
    />
  </PopoverPrimitive.Portal>
))
PopoverContent.displayName = PopoverPrimitive.Content.displayName

// ── Radix: Dialog (이미지 전체보기용) ────────────────────────────────────────
const Dialog = DialogPrimitive.Root
const DialogPortal = DialogPrimitive.Portal
const DialogOverlay = React.forwardRef<
  React.ComponentRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn("fixed inset-0 z-50 bg-black/60 backdrop-blur-sm", className)}
    {...props}
  />
))
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName

const DialogContent = React.forwardRef<
  React.ComponentRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <DialogPortal>
    <DialogOverlay />
    <DialogPrimitive.Content
      ref={ref}
      className={cn(
        "fixed left-1/2 top-1/2 z-50 w-full max-w-[90vw] md:max-w-[800px] -translate-x-1/2 -translate-y-1/2",
        className
      )}
      {...props}
    >
      <div className="relative bg-white rounded-[28px] overflow-hidden shadow-2xl p-1">
        {children}
        <DialogPrimitive.Close className="absolute right-3 top-3 z-10 rounded-full bg-black/10 p-1 hover:bg-black/20 transition-all">
          <XIcon className="h-5 w-5 text-slate-600" />
          <span className="sr-only">Close</span>
        </DialogPrimitive.Close>
      </div>
    </DialogPrimitive.Content>
  </DialogPortal>
))
DialogContent.displayName = DialogPrimitive.Content.displayName

// ── Icons ────────────────────────────────────────────────────────────────────
const PlusIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M12 5V19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M5 12H19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)
const Settings2Icon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M20 7h-9" /><path d="M14 17H5" />
    <circle cx="17" cy="17" r="3" /><circle cx="7" cy="7" r="3" />
  </svg>
)
const SendIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M12 5.25L12 18.75" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M18.75 12L12 5.25L5.25 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)
const XIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
  </svg>
)
const MicIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/>
    <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
    <line x1="12" y1="19" x2="12" y2="23"/>
  </svg>
)
const PaintBrushIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M18.37 2.63 14 7l-1.59-1.59a2 2 0 0 0-2.82 0L8 7l9 9 1.59-1.59a2 2 0 0 0 0-2.82L17 10l4.37-4.37a2.12 2.12 0 1 0-3-3Z"/>
    <path d="M9 8c-2 3-4 3.5-7 4l8 10c2-1 6-5 6-7"/>
  </svg>
)
const PencilIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/><path d="m15 5 4 4"/>
  </svg>
)
const LightbulbIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" {...props}>
    <path d="M12 7C9.23858 7 7 9.23858 7 12C7 13.3613 7.54402 14.5955 8.42651 15.4972C8.77025 15.8484 9.05281 16.2663 9.14923 16.7482L9.67833 19.3924C9.86537 20.3272 10.6862 21 11.6395 21H12.3605C13.3138 21 14.1346 20.3272 14.3217 19.3924L14.8508 16.7482C14.9472 16.2663 15.2297 15.8484 15.5735 15.4972C16.456 14.5955 17 13.3613 17 12C17 9.23858 14.7614 7 12 7Z" stroke="currentColor" strokeWidth="2"/>
    <path d="M12 4V3M18 6L19 5M20 12H21M4 12H3M5 5L6 6M10 17H14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)
const SparkleIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M12 3l1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5L12 3z"/>
    <path d="M19 15l.75 2.25L22 18l-2.25.75L19 21l-.75-2.25L16 18l2.25-.75L19 15z"/>
    <path d="M5 17l.5 1.5L7 19l-1.5.5L5 21l-.5-1.5L3 19l1.5-.5L5 17z"/>
  </svg>
)
const DownloadIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
    <polyline points="7 10 12 15 17 10"/>
    <line x1="12" y1="15" x2="12" y2="3"/>
  </svg>
)
const RefreshIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <polyline points="1 4 1 10 7 10"/>
    <path d="M3.51 15a9 9 0 1 0 .49-3.53"/>
  </svg>
)
const ImageIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
    <circle cx="8.5" cy="8.5" r="1.5"/>
    <polyline points="21 15 16 10 5 21"/>
  </svg>
)
const XCircleIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <circle cx="12" cy="12" r="10"/>
    <line x1="15" y1="9" x2="9" y2="15"/>
    <line x1="9" y1="9" x2="15" y2="15"/>
  </svg>
)

// ── Tools ────────────────────────────────────────────────────────────────────
const toolsList = [
  { id: 'cinematic', name: 'Cinematic style', shortName: 'Cinematic', icon: PaintBrushIcon },
  { id: 'bold',      name: 'Bold & eye-catching', shortName: 'Bold',     icon: SparkleIcon  },
  { id: 'minimal',   name: 'Minimal & clean',     shortName: 'Minimal',  icon: LightbulbIcon },
  { id: 'text',      name: 'Add title text',       shortName: 'Text',     icon: PencilIcon   },
  { id: 'custom',    name: 'Custom style',         shortName: 'Custom',   icon: Settings2Icon },
]

// ── ReferencePickerPopover ───────────────────────────────────────────────────
interface GalleryItem {
  id: string
  imageUrl: string
  prompt: string | null
}

function ReferencePickerPopover({ onSelect, disabled }: { onSelect: (dataUrl: string) => void; disabled: boolean }) {
  const [open, setOpen] = React.useState(false)
  const [items, setItems] = React.useState<GalleryItem[]>([])
  const [loading, setLoading] = React.useState(false)
  const [selecting, setSelecting] = React.useState<string | null>(null)
  const supabase = React.useMemo(() => createClient(), [])

  const loadGallery = async () => {
    setLoading(true)
    const { data } = await supabase
      .from("thumbnails")
      .select("id, prompt, image_path")
      .eq("status", "completed")
      .order("created_at", { ascending: false })
      .limit(20)

    if (!data) { setLoading(false); return }

    const withUrls = await Promise.all(
      data.map(async (item) => {
        if (!item.image_path) return null
        const { data: urlData } = await supabase.storage
          .from("thumbnails")
          .createSignedUrl(item.image_path, 3600)
        return urlData?.signedUrl ? { id: item.id, prompt: item.prompt, imageUrl: urlData.signedUrl } : null
      })
    )
    setItems(withUrls.filter(Boolean) as GalleryItem[])
    setLoading(false)
  }

  const handleSelect = async (item: GalleryItem) => {
    setSelecting(item.id)
    try {
      const res = await fetch(item.imageUrl)
      const blob = await res.blob()
      const reader = new FileReader()
      reader.onloadend = () => {
        onSelect(reader.result as string)
        setOpen(false)
        setSelecting(null)
      }
      reader.readAsDataURL(blob)
    } catch {
      setSelecting(null)
    }
  }

  return (
    <Popover open={open} onOpenChange={(o) => { setOpen(o); if (o) loadGallery() }}>
      <Tooltip>
        <TooltipTrigger asChild>
          <PopoverTrigger asChild>
            <button
              type="button"
              disabled={disabled}
              className="flex h-8 items-center gap-1.5 rounded-full px-2.5 text-sm text-slate-600 hover:bg-slate-100 transition-colors disabled:opacity-40"
            >
              <ImageIcon className="h-4 w-4" />
              <span>Reference</span>
            </button>
          </PopoverTrigger>
        </TooltipTrigger>
        <TooltipContent side="top"><p>Pick from gallery</p></TooltipContent>
      </Tooltip>
      <PopoverContent side="top" align="start" className="w-72 p-2">
        {loading ? (
          <div className="grid grid-cols-3 gap-1.5">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} className="aspect-video rounded-lg bg-slate-100 animate-pulse" />
            ))}
          </div>
        ) : items.length === 0 ? (
          <p className="text-xs text-slate-400 text-center py-4">No generated thumbnails yet</p>
        ) : (
          <div className="grid grid-cols-3 gap-1.5 max-h-52 overflow-y-auto">
            {items.map(item => (
              <button
                key={item.id}
                type="button"
                disabled={selecting !== null}
                onClick={() => handleSelect(item)}
                className="relative aspect-video rounded-lg overflow-hidden hover:ring-2 hover:ring-blue-500 transition-all disabled:opacity-60"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={item.imageUrl} alt={item.prompt ?? ""} className="w-full h-full object-cover" />
                {selecting === item.id && (
                  <div className="absolute inset-0 flex items-center justify-center bg-white/50">
                    <svg className="h-4 w-4 animate-spin text-slate-700" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                    </svg>
                  </div>
                )}
              </button>
            ))}
          </div>
        )}
      </PopoverContent>
    </Popover>
  )
}

// ── Types ────────────────────────────────────────────────────────────────────
interface ThumbnailResult {
  id: string
  imageUrl: string
  prompt: string
  tool: string | null
}

interface PromptBoxProps {
  value: string
  onChange: (value: string) => void
  imagePreviews: string[]
  onImageAdd: (dataUrl: string) => void
  onImageRemove: (index: number) => void
  selectedTool: string | null
  onToolChange: (toolId: string | null) => void
  isGenerating: boolean
  onSubmit: () => void
}

// ── PromptBox ────────────────────────────────────────────────────────────────
function PromptBox({
  value,
  onChange,
  imagePreviews,
  onImageAdd,
  onImageRemove,
  selectedTool,
  onToolChange,
  isGenerating,
  onSubmit,
}: PromptBoxProps) {
  const textareaRef = React.useRef<HTMLTextAreaElement>(null)
  const fileInputRef = React.useRef<HTMLInputElement>(null)
  const [isPopoverOpen, setIsPopoverOpen] = React.useState(false)
  const [expandedIndex, setExpandedIndex] = React.useState<number | null>(null)

  React.useLayoutEffect(() => {
    const el = textareaRef.current
    if (el) {
      el.style.height = "auto"
      el.style.height = `${Math.min(el.scrollHeight, 200)}px`
    }
  }, [value])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? [])
    const remaining = 5 - imagePreviews.length
    const toProcess = files.slice(0, remaining)

    for (const file of toProcess) {
      if (!file.type.startsWith("image/")) continue
      if (file.size > 5 * 1024 * 1024) {
        alert(`"${file.name}" exceeds 5MB limit and was skipped.`)
        continue
      }

      if (file.type === "image/svg+xml") {
        const url = URL.createObjectURL(file)
        const img = new Image()
        img.onload = () => {
          const canvas = document.createElement("canvas")
          canvas.width = img.naturalWidth || 1280
          canvas.height = img.naturalHeight || 720
          canvas.getContext("2d")!.drawImage(img, 0, 0)
          onImageAdd(canvas.toDataURL("image/png"))
          URL.revokeObjectURL(url)
        }
        img.onerror = () => {
          URL.revokeObjectURL(url)
          alert(`"${file.name}" could not be converted. Try a different SVG file.`)
        }
        img.src = url
      } else {
        const reader = new FileReader()
        reader.onloadend = () => onImageAdd(reader.result as string)
        reader.readAsDataURL(file)
      }
    }
    e.target.value = ""
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey && !e.nativeEvent.isComposing) {
      e.preventDefault()
      onSubmit()
    }
  }

  const hasValue = value.trim().length > 0 || imagePreviews.length > 0
  const activeTool = selectedTool ? toolsList.find(t => t.id === selectedTool) : null
  const ActiveToolIcon = activeTool?.icon

  return (
    <div className="relative flex flex-col rounded-[28px] p-2 bg-white shadow-sm transition-colors cursor-text overflow-hidden">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
        accept="image/*"
        multiple
      />

      {/* 이미지 프리뷰 */}
      {imagePreviews.length > 0 && (
        <>
          <div className="flex flex-row flex-wrap gap-2 mb-1 px-1 pt-1">
            {imagePreviews.map((preview, index) => (
              <div key={index} className="relative">
                <button type="button" onClick={() => setExpandedIndex(index)}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={preview} alt={`preview ${index + 1}`} className="h-14 w-14 rounded-[1rem] object-cover" />
                </button>
                <button
                  type="button"
                  onClick={() => onImageRemove(index)}
                  className="absolute -right-1 -top-1 z-10 flex h-4 w-4 items-center justify-center rounded-full bg-black/40 hover:bg-black/60 transition-colors"
                >
                  <XIcon className="h-3 w-3 text-white" />
                </button>
              </div>
            ))}
          </div>
          <Dialog open={expandedIndex !== null} onOpenChange={(open) => { if (!open) setExpandedIndex(null) }}>
            <DialogContent>
              {expandedIndex !== null && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={imagePreviews[expandedIndex]} alt="full preview" className="w-full max-h-[95vh] object-contain rounded-[24px]" />
              )}
            </DialogContent>
          </Dialog>
        </>
      )}

      {/* Textarea */}
      <textarea
        ref={textareaRef}
        rows={1}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Describe the thumbnail you want to create..."
        disabled={isGenerating}
        className="w-full resize-none border-0 bg-transparent p-3 text-slate-900 placeholder:text-slate-400 focus:ring-0 focus-visible:outline-none min-h-12 text-base leading-relaxed disabled:opacity-60"
      />

      {/* Toolbar */}
      <div className="p-1 pt-0">
        <TooltipProvider delayDuration={100}>
          <div className="flex items-center gap-1.5">

            {/* Attach image */}
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  type="button"
                  disabled={isGenerating || imagePreviews.length >= 5}
                  onClick={() => fileInputRef.current?.click()}
                  className="flex h-8 w-8 items-center justify-center rounded-full text-slate-600 hover:bg-slate-100 transition-colors disabled:opacity-40"
                >
                  <PlusIcon className="h-5 w-5" />
                  <span className="sr-only">Attach image</span>
                </button>
              </TooltipTrigger>
              <TooltipContent side="top">
                <p>{imagePreviews.length >= 5 ? "Max 5 images" : "Attach image"}</p>
              </TooltipContent>
            </Tooltip>

            {/* Reference picker */}
            <ReferencePickerPopover
              onSelect={onImageAdd}
              disabled={isGenerating || imagePreviews.length >= 5}
            />

            {/* Tools popover */}
            <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <PopoverTrigger asChild>
                    <button
                      type="button"
                      disabled={isGenerating}
                      className="flex h-8 items-center gap-1.5 rounded-full px-2.5 text-sm text-slate-600 hover:bg-slate-100 transition-colors disabled:opacity-40"
                    >
                      <Settings2Icon className="h-4 w-4" />
                      {!selectedTool && <span>Tools</span>}
                    </button>
                  </PopoverTrigger>
                </TooltipTrigger>
                <TooltipContent side="top"><p>Explore Tools</p></TooltipContent>
              </Tooltip>
              <PopoverContent side="top" align="start">
                <div className="flex flex-col gap-0.5">
                  {toolsList.map(tool => (
                    <button
                      key={tool.id}
                      type="button"
                      onClick={() => { onToolChange(tool.id); setIsPopoverOpen(false) }}
                      className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-left text-sm hover:bg-slate-100 transition-colors"
                    >
                      <tool.icon className="h-4 w-4 text-slate-500" />
                      <span>{tool.name}</span>
                    </button>
                  ))}
                </div>
              </PopoverContent>
            </Popover>

            {/* Active tool badge */}
            {activeTool && (
              <>
                <div className="h-4 w-px bg-slate-200" />
                <button
                  type="button"
                  onClick={() => onToolChange(null)}
                  className="flex h-8 items-center gap-1.5 rounded-full px-2.5 text-sm text-blue-600 bg-blue-50 hover:bg-blue-100 transition-colors"
                >
                  {ActiveToolIcon && <ActiveToolIcon className="h-4 w-4" />}
                  <span>{activeTool.shortName}</span>
                  <XIcon className="h-3.5 w-3.5" />
                </button>
              </>
            )}

            {/* Right side */}
            <div className="ml-auto flex items-center gap-1.5">
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    type="button"
                    disabled
                    className="flex h-8 w-8 items-center justify-center rounded-full text-slate-600 hover:bg-slate-100 transition-colors disabled:opacity-40"
                  >
                    <MicIcon className="h-4 w-4" />
                    <span className="sr-only">Record voice</span>
                  </button>
                </TooltipTrigger>
                <TooltipContent side="top"><p>Record voice</p></TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    type="button"
                    disabled={!hasValue || isGenerating}
                    onClick={onSubmit}
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-900 text-white hover:bg-slate-700 disabled:bg-slate-200 disabled:text-slate-400 transition-colors"
                  >
                    {isGenerating ? (
                      <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                      </svg>
                    ) : (
                      <SendIcon className="h-4 w-4" />
                    )}
                    <span className="sr-only">Generate</span>
                  </button>
                </TooltipTrigger>
                <TooltipContent side="top">
                  <p>{isGenerating ? "Generating..." : "Generate (Enter)"}</p>
                </TooltipContent>
              </Tooltip>
            </div>

          </div>
        </TooltipProvider>
      </div>
    </div>
  )
}

// ── PromptArea (exported) ────────────────────────────────────────────────────
export function PromptArea({ onNewThumbnail }: { onNewThumbnail?: () => void } = {}) {
  const [value, setValue] = React.useState("")
  const [imagePreviews, setImagePreviews] = React.useState<string[]>([])
  const [selectedTool, setSelectedTool] = React.useState<string | null>(null)
  const [isGenerating, setIsGenerating] = React.useState(false)
  const [result, setResult] = React.useState<ThumbnailResult | null>(null)
  const [error, setError] = React.useState<string | null>(null)

  const lastPromptRef = React.useRef({ value: "", tool: null as string | null, imagePreviews: [] as string[] })

  const handleSubmit = async () => {
    if (!value.trim() && imagePreviews.length === 0) return
    if (isGenerating) return

    lastPromptRef.current = { value, tool: selectedTool, imagePreviews }
    setIsGenerating(true)
    setError(null)
    setResult(null)

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: value, tool: selectedTool, referenceImages: imagePreviews }),
      })

      const data = await res.json()
      if (!res.ok) throw new Error(data.error ?? "Failed to generate thumbnail")

      setResult(data.thumbnail)
      setValue("")
      setImagePreviews([])
      setSelectedTool(null)
      onNewThumbnail?.()
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong")
    } finally {
      setIsGenerating(false)
    }
  }

  const handleRegenerate = () => {
    const last = lastPromptRef.current
    setValue(last.value)
    setSelectedTool(last.tool)
    setImagePreviews(last.imagePreviews)
    setResult(null)
    setError(null)
  }

  const handleDownload = async () => {
    if (!result?.imageUrl) return
    const res = await fetch(result.imageUrl)
    const blob = await res.blob()
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `thumbnail-${result.id.slice(0, 8)}.png`
    a.click()
    URL.revokeObjectURL(url)
  }

  const showTopArea = isGenerating || result || error

  return (
    <div className="w-full flex flex-col gap-4">

      {/* 상단 영역: Loading / Result / Error */}
      <AnimatePresence mode="wait">
        {isGenerating && (
          <motion.div
            key="loading"
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
          >
            <LoadingLines />
          </motion.div>
        )}

        {!isGenerating && result && (
          <motion.div
            key="result"
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="w-full rounded-[24px] overflow-hidden border border-slate-200 bg-white shadow-sm"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={result.imageUrl}
              alt="Generated thumbnail"
              className="w-full aspect-video object-cover"
            />
            <div className="p-4 flex items-center justify-between gap-3">
              <p className="text-sm text-slate-600 line-clamp-2 flex-1">{result.prompt}</p>
              <div className="flex gap-2 shrink-0">
                <button
                  type="button"
                  onClick={handleRegenerate}
                  className="flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm text-slate-600 border border-slate-200 hover:bg-slate-50 transition-colors"
                >
                  <RefreshIcon className="h-3.5 w-3.5" />
                  <span>Retry</span>
                </button>
                <button
                  type="button"
                  onClick={handleDownload}
                  className="flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm text-white bg-slate-900 hover:bg-slate-700 transition-colors"
                >
                  <DownloadIcon className="h-3.5 w-3.5" />
                  <span>Download</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {!isGenerating && error && (
          <motion.div
            key="error"
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="w-full rounded-[24px] border border-red-200 bg-red-50 p-8 flex flex-col items-center gap-4 text-center"
          >
            <XCircleIcon className="h-14 w-14 text-red-400" />
            <div>
              <p className="font-semibold text-red-700 mb-1">Generation Failed</p>
              <p className="text-sm text-red-500 max-w-sm">{error}</p>
            </div>
            <button
              type="button"
              onClick={() => setError(null)}
              className="rounded-full px-4 py-1.5 text-sm text-red-600 border border-red-300 hover:bg-red-100 transition-colors"
            >
              Dismiss
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 프롬프트 입력창 — layout으로 자연스럽게 밀려남 */}
      <motion.div
        layout
        transition={{ duration: 0.35, ease: "easeOut" }}
        className="relative rounded-[30px] p-[2px] overflow-hidden shadow-sm"
      >
        {/* 회전하는 그라디언트 테두리 */}
        <div
          style={{
            position: 'absolute',
            width: '800px',
            height: '800px',
            top: '50%',
            left: '50%',
            marginTop: '-400px',
            marginLeft: '-400px',
            background: 'conic-gradient(from 0deg, transparent 0%, transparent 40%, #A07CFE 55%, #FE8FB5 65%, #FFBE7B 75%, transparent 90%)',
            animation: 'spin-border 4s linear infinite',
          }}
        />
        <PromptBox
          value={value}
          onChange={setValue}
          imagePreviews={imagePreviews}
          onImageAdd={(dataUrl) => setImagePreviews(prev => [...prev, dataUrl])}
          onImageRemove={(index) => setImagePreviews(prev => prev.filter((_, i) => i !== index))}
          selectedTool={selectedTool}
          onToolChange={setSelectedTool}
          isGenerating={isGenerating}
          onSubmit={handleSubmit}
        />
      </motion.div>

      {/* 힌트 텍스트 */}
      {!showTopArea && (
        <p className="text-center text-xs text-slate-400">
          Enter to generate · Shift+Enter for new line
        </p>
      )}
    </div>
  )
}
