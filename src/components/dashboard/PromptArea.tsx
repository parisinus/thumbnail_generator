'use client'

import * as React from "react"
import * as TooltipPrimitive from "@radix-ui/react-tooltip"
import * as PopoverPrimitive from "@radix-ui/react-popover"
import * as DialogPrimitive from "@radix-ui/react-dialog"
import { cn } from "@/lib/utils"

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

// ── Radix: Dialog ────────────────────────────────────────────────────────────
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

// ── Tools ────────────────────────────────────────────────────────────────────
const toolsList = [
  { id: 'cinematic', name: 'Cinematic style', shortName: 'Cinematic', icon: PaintBrushIcon },
  { id: 'bold',      name: 'Bold & eye-catching', shortName: 'Bold',     icon: SparkleIcon  },
  { id: 'minimal',   name: 'Minimal & clean',     shortName: 'Minimal',  icon: LightbulbIcon },
  { id: 'text',      name: 'Add title text',       shortName: 'Text',     icon: PencilIcon   },
  { id: 'custom',    name: 'Custom style',         shortName: 'Custom',   icon: Settings2Icon },
]

// ── PromptBox ────────────────────────────────────────────────────────────────
const PromptBox = React.forwardRef<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement>
>(({ className, ...props }, ref) => {
  const internalRef = React.useRef<HTMLTextAreaElement>(null)
  const fileInputRef = React.useRef<HTMLInputElement>(null)
  const [value, setValue] = React.useState("")
  const [imagePreview, setImagePreview] = React.useState<string | null>(null)
  const [selectedTool, setSelectedTool] = React.useState<string | null>(null)
  const [isPopoverOpen, setIsPopoverOpen] = React.useState(false)
  const [isImageDialogOpen, setIsImageDialogOpen] = React.useState(false)

  React.useImperativeHandle(ref, () => internalRef.current!, [])

  React.useLayoutEffect(() => {
    const el = internalRef.current
    if (el) {
      el.style.height = "auto"
      el.style.height = `${Math.min(el.scrollHeight, 200)}px`
    }
  }, [value])

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value)
    props.onChange?.(e)
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file?.type.startsWith("image/")) {
      const reader = new FileReader()
      reader.onloadend = () => setImagePreview(reader.result as string)
      reader.readAsDataURL(file)
    }
    e.target.value = ""
  }

  const handleRemoveImage = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    setImagePreview(null)
  }

  const hasValue = value.trim().length > 0 || !!imagePreview
  const activeTool = selectedTool ? toolsList.find(t => t.id === selectedTool) : null
  const ActiveToolIcon = activeTool?.icon

  return (
    <div
      className={cn(
        "relative flex flex-col rounded-[28px] p-2 bg-white shadow-sm transition-colors cursor-text overflow-hidden",
        className
      )}
    >
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
        accept="image/*"
      />

      {/* 이미지 프리뷰 */}
      {imagePreview && (
        <Dialog open={isImageDialogOpen} onOpenChange={setIsImageDialogOpen}>
          <div className="relative mb-1 w-fit rounded-[1rem] px-1 pt-1">
            <button type="button" onClick={() => setIsImageDialogOpen(true)}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={imagePreview} alt="preview" className="h-14 w-14 rounded-[1rem] object-cover" />
            </button>
            <button
              onClick={handleRemoveImage}
              className="absolute right-2 top-2 z-10 flex h-4 w-4 items-center justify-center rounded-full bg-black/20 hover:bg-black/40 transition-colors"
            >
              <XIcon className="h-3 w-3 text-white" />
            </button>
          </div>
          <DialogContent>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={imagePreview} alt="full preview" className="w-full max-h-[95vh] object-contain rounded-[24px]" />
          </DialogContent>
        </Dialog>
      )}

      {/* Textarea */}
      <textarea
        ref={internalRef}
        rows={1}
        value={value}
        onChange={handleChange}
        placeholder="Describe the thumbnail you want to create..."
        className="w-full resize-none border-0 bg-transparent p-3 text-slate-900 placeholder:text-slate-400 focus:ring-0 focus-visible:outline-none min-h-12 text-base leading-relaxed"
        {...props}
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
                  onClick={() => fileInputRef.current?.click()}
                  className="flex h-8 w-8 items-center justify-center rounded-full text-slate-600 hover:bg-slate-100 transition-colors"
                >
                  <PlusIcon className="h-5 w-5" />
                  <span className="sr-only">Attach image</span>
                </button>
              </TooltipTrigger>
              <TooltipContent side="top"><p>Attach image</p></TooltipContent>
            </Tooltip>

            {/* Tools popover */}
            <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <PopoverTrigger asChild>
                    <button
                      type="button"
                      className="flex h-8 items-center gap-1.5 rounded-full px-2.5 text-sm text-slate-600 hover:bg-slate-100 transition-colors"
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
                      onClick={() => { setSelectedTool(tool.id); setIsPopoverOpen(false) }}
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
                  onClick={() => setSelectedTool(null)}
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
                    className="flex h-8 w-8 items-center justify-center rounded-full text-slate-600 hover:bg-slate-100 transition-colors"
                  >
                    <MicIcon className="h-4.5 w-4.5" />
                    <span className="sr-only">Record voice</span>
                  </button>
                </TooltipTrigger>
                <TooltipContent side="top"><p>Record voice</p></TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    type="submit"
                    disabled={!hasValue}
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-900 text-white hover:bg-slate-700 disabled:bg-slate-200 disabled:text-slate-400 transition-colors"
                  >
                    <SendIcon className="h-4 w-4" />
                    <span className="sr-only">Send</span>
                  </button>
                </TooltipTrigger>
                <TooltipContent side="top"><p>Generate</p></TooltipContent>
              </Tooltip>
            </div>

          </div>
        </TooltipProvider>
      </div>
    </div>
  )
})
PromptBox.displayName = "PromptBox"

// ── PromptArea (exported) ────────────────────────────────────────────────────
export function PromptArea() {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // TODO: 썸네일 생성 로직 연결
  }

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="relative rounded-[30px] p-[2px] overflow-hidden shadow-sm">
        {/* 회전하는 그라디언트 — overflow-hidden으로 테두리에 클리핑됨 */}
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
        <PromptBox className="relative z-10 rounded-[28px] shadow-none" />
      </div>
    </form>
  )
}
