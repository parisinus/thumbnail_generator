"use client";

export default function HeroSection() {
  return (
    <div className="flex flex-col items-center justify-center text-center px-6 z-10 gap-8 max-w-4xl mx-auto mt-20">

      {/* Badge */}
      <div className="flex items-center gap-2 px-4 py-1.5 rounded-full border border-blue-200 bg-white/60 backdrop-blur-sm text-blue-600 text-sm font-medium">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M8 1L10 6H15L11 9.5L12.5 15L8 12L3.5 15L5 9.5L1 6H6L8 1Z" fill="#3b82f6"/>
        </svg>
        AI-Powered YouTube Thumbnail Generator
      </div>

      {/* Headline */}
      <div className="flex flex-col gap-3">
        <h1 className="text-7xl tracking-wide text-slate-900 leading-tight font-[var(--font-bebas-neue)]">
          Stop the Scroll.
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-violet-500">
            Start the Clicks.
          </span>
        </h1>
        <p className="text-xl text-slate-500 max-w-2xl leading-relaxed">
          Thumbnail Generator analyzes your content and creates click-worthy YouTube thumbnails in just seconds.
        </p>
      </div>

      {/* CTA Buttons */}
      <div className="flex items-center gap-4">
        <button className="px-8 py-3.5 rounded-full bg-gradient-to-r from-blue-500 to-violet-500 text-white font-semibold text-base hover:opacity-90 transition-opacity shadow-lg shadow-blue-200">
          Get Started for Free
        </button>
        <button className="px-8 py-3.5 rounded-full border border-slate-200 bg-white/70 backdrop-blur-sm text-slate-700 font-semibold text-base hover:bg-white transition-colors">
          Learn More
        </button>
      </div>

      {/* Thumbnail Preview Card */}
      <div className="relative mt-4 w-full max-w-2xl">
        <div className="rounded-2xl border border-slate-200 bg-white/70 backdrop-blur-sm shadow-xl shadow-blue-100 overflow-hidden p-6">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-3 h-3 rounded-full bg-red-400"/>
            <div className="w-3 h-3 rounded-full bg-yellow-400"/>
            <div className="w-3 h-3 rounded-full bg-green-400"/>
            <span className="ml-2 text-xs text-slate-400 font-mono">thumbnail-generator.com</span>
          </div>

          {/* Thumbnail Grid */}
          <div className="grid grid-cols-3 gap-3">

            {/* Click-Through Rate */}
            <div className="relative aspect-video rounded-lg overflow-hidden bg-gradient-to-br from-blue-400 to-violet-500">
              <div className="absolute top-2 left-2 right-2 text-center">
                <span className="text-white text-xs font-bold drop-shadow">Click-Through Rate</span>
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <svg width="64" height="48" viewBox="0 0 64 48" fill="none">
                  <line x1="6" y1="44" x2="58" y2="44" stroke="white" strokeOpacity="0.3" strokeWidth="1"/>
                  <polyline points="6,40 20,32 34,22 46,12 58,4" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <polygon points="6,40 20,32 34,22 46,12 58,4 58,44 6,44" fill="white" fillOpacity="0.15"/>
                  <circle cx="58" cy="4" r="3" fill="white"/>
                  <path d="M54 1 L58 4 L62 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
                </svg>
              </div>
              <div className="absolute bottom-2 left-0 right-0 text-center">
                <span className="text-white font-bold text-sm drop-shadow">CTR +240%</span>
              </div>
            </div>

            {/* Views */}
            <div className="relative aspect-video rounded-lg overflow-hidden bg-gradient-to-br from-orange-400 to-red-500">
              <div className="absolute top-2 left-2 right-2 text-center">
                <span className="text-white text-xs font-bold drop-shadow">Views</span>
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <svg width="64" height="48" viewBox="0 0 64 48" fill="none">
                  <rect x="8" y="30" width="10" height="14" rx="2" fill="white" fillOpacity="0.5"/>
                  <rect x="22" y="20" width="10" height="24" rx="2" fill="white" fillOpacity="0.7"/>
                  <rect x="36" y="10" width="10" height="34" rx="2" fill="white" fillOpacity="0.9"/>
                  <rect x="50" y="4" width="10" height="40" rx="2" fill="white"/>
                  <path d="M46 1 L55 4 L58 -3" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
                </svg>
              </div>
              <div className="absolute bottom-2 left-0 right-0 text-center">
                <span className="text-white font-bold text-sm drop-shadow">Views 2.4x↑</span>
              </div>
            </div>

            {/* Easy */}
            <div className="relative aspect-video rounded-lg overflow-hidden bg-gradient-to-br from-emerald-400 to-teal-500">
              <div className="absolute top-2 left-2 right-2 text-center">
                <span className="text-white text-xs font-bold drop-shadow">Convenience</span>
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-white font-bold text-4xl tracking-widest drop-shadow">EASY</span>
              </div>
              <div className="absolute bottom-2 left-0 right-0 text-center">
                <span className="text-white font-bold text-sm drop-shadow">Done in 3 Seconds</span>
              </div>
            </div>

          </div>

          {/* Progress bar */}
          <div className="mt-4 flex items-center gap-3">
            <span className="text-xs text-slate-400">Generating...</span>
            <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
              <div className="h-full w-2/3 bg-gradient-to-r from-blue-400 to-violet-500 rounded-full"/>
            </div>
            <span className="text-xs text-blue-500 font-medium">67%</span>
          </div>
        </div>

        {/* Floating badge */}
        <div className="absolute -top-3 -right-3 px-3 py-1.5 rounded-full bg-gradient-to-r from-blue-500 to-violet-500 text-white text-xs font-bold shadow-lg">
          ✦ AI Generated
        </div>
      </div>

      {/* Stats */}
      <div className="flex items-center gap-8 text-center">
        {[
          { value: "100K+", label: "Thumbnails Generated" },
          { value: "3sec", label: "Avg. Generation Time" },
          { value: "2.4×", label: "Avg. CTR Increase" },
        ].map((stat, i) => (
          <div key={i} className="flex flex-col gap-1">
            <span className="text-2xl font-bold text-slate-800">{stat.value}</span>
            <span className="text-sm text-slate-400">{stat.label}</span>
          </div>
        ))}
      </div>

    </div>
  );
}
