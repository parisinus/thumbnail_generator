"use client";

import Image from "next/image";

export default function FeaturesSection() {
  return (
    <section className="relative w-full py-24 px-6 overflow-hidden">
      {/* Background decoration */}
      <div className="pointer-events-none absolute top-0 left-1/4 w-[600px] h-[500px] rounded-full bg-gradient-to-br from-blue-100/50 to-violet-100/40 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full bg-gradient-to-br from-violet-100/40 to-pink-100/30 blur-3xl" />

      <div className="relative mx-auto max-w-5xl">
        {/* Section header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-blue-200 bg-white/60 backdrop-blur-sm text-blue-600 text-sm font-medium mb-6">
            <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
              <path d="M8 1L10 6H15L11 9.5L12.5 15L8 12L3.5 15L5 9.5L1 6H6L8 1Z" />
            </svg>
            Powerful Features
          </div>
          <h2 className="text-5xl font-[var(--font-bebas-neue)] tracking-wide text-slate-900 leading-tight">
            Everything You Need to{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-violet-500">
              Go Viral.
            </span>
          </h2>
          <p className="mt-4 text-lg text-slate-500 max-w-xl mx-auto">
            Powerful AI tools built for creators who demand results — not just
            pretty pictures.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-3 gap-4">

          {/* Card 1: Multi-Niche — col-span-2, gaming image on right */}
          <div className="col-span-2 relative rounded-2xl border border-slate-200 bg-white/70 backdrop-blur-sm shadow-lg shadow-slate-100 overflow-hidden h-72 flex">
            {/* Text */}
            <div className="flex flex-col justify-center p-8 z-10 w-[46%] flex-shrink-0">
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-500 uppercase tracking-widest mb-3">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                Multi-Niche
              </span>
              <h3 className="text-2xl font-[var(--font-bebas-neue)] tracking-wide text-slate-900 leading-tight mb-2">
                Any Niche,
                <br />
                Any Style.
              </h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                Gaming, fitness, travel, fashion — our AI adapts to your content
                and creates thumbnails that feel native to your audience.
              </p>
            </div>
            {/* Image */}
            <div className="relative flex-1 overflow-hidden">
              <div className="absolute inset-y-0 left-0 w-14 bg-gradient-to-r from-white/80 to-transparent z-10" />
              <Image
                src="/main/1.jpg"
                alt="Gaming thumbnail example"
                fill
                style={{ objectFit: "cover" }}
              />
            </div>
          </div>

          {/* Card 2: Pro Quality — col-span-1, fitness image on top */}
          <div className="col-span-1 relative rounded-2xl border border-slate-200 bg-white/70 backdrop-blur-sm shadow-lg shadow-slate-100 overflow-hidden h-72 flex flex-col">
            {/* Image top */}
            <div className="relative flex-1 overflow-hidden">
              <Image
                src="/main/2.jpg"
                alt="Fitness thumbnail example"
                fill
                style={{ objectFit: "cover" }}
              />
              <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-white/95 to-transparent" />
            </div>
            {/* Text bottom */}
            <div className="px-5 pb-5 pt-2">
              <span className="text-xs font-semibold text-emerald-500 uppercase tracking-widest">
                Pro Quality
              </span>
              <h3 className="text-xl font-[var(--font-bebas-neue)] tracking-wide text-slate-900 mt-1 leading-tight">
                Studio-Grade Results.
              </h3>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                2K resolution thumbnails ready to upload — no design skills needed.
              </p>
            </div>
          </div>

          {/* Card 3: Smart Layout — col-span-3, travel image on right, full-width showcase */}
          <div className="col-span-3 relative rounded-2xl border border-slate-200 bg-white/70 backdrop-blur-sm shadow-lg shadow-slate-100 overflow-hidden h-52 flex">
            {/* Text */}
            <div className="flex flex-col justify-center px-10 py-8 z-10 w-[42%] flex-shrink-0">
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-orange-500 uppercase tracking-widest mb-3">
                <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
                Smart Composition
              </span>
              <h3 className="text-3xl font-[var(--font-bebas-neue)] tracking-wide text-slate-900 leading-tight mb-2">
                AI-Powered Layout Intelligence.
              </h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                The AI analyzes your content and places elements for maximum
                visual impact — text, images, graphics, all in the right place.
              </p>
            </div>
            {/* Image */}
            <div className="relative flex-1 overflow-hidden">
              <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-white/80 to-transparent z-10" />
              <Image
                src="/main/3.jpg"
                alt="Travel thumbnail example"
                fill
                style={{ objectFit: "cover", objectPosition: "center" }}
              />
            </div>
          </div>

          {/* Card 4: Bold Typography — col-span-1, fashion image as full background */}
          <div className="col-span-1 relative rounded-2xl overflow-hidden h-72 shadow-lg shadow-slate-100">
            <Image
              src="/main/4.jpg"
              alt="Fashion thumbnail example"
              fill
              style={{ objectFit: "cover" }}
            />
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/85 via-slate-900/25 to-transparent" />
            {/* Text */}
            <div className="absolute bottom-0 left-0 right-0 p-5">
              <span className="text-xs font-semibold text-yellow-400 uppercase tracking-widest">
                Typography
              </span>
              <h3 className="text-xl font-[var(--font-bebas-neue)] tracking-wide text-white mt-1 leading-tight">
                Headlines That
                <br />
                Stop the Scroll.
              </h3>
              <p className="text-xs text-white/70 mt-1.5 leading-relaxed">
                Dynamic text styles and eye-catching layouts built to convert.
              </p>
            </div>
          </div>

          {/* Card 5: Color Mastery — col-span-2, lifestyle image on left */}
          <div className="col-span-2 relative rounded-2xl border border-slate-200 bg-white/70 backdrop-blur-sm shadow-lg shadow-slate-100 overflow-hidden h-72 flex">
            {/* Image */}
            <div className="relative w-[48%] flex-shrink-0 overflow-hidden">
              <Image
                src="/main/5.jpg"
                alt="Lifestyle thumbnail example"
                fill
                style={{ objectFit: "cover" }}
              />
              <div className="absolute inset-y-0 right-0 w-14 bg-gradient-to-l from-white/80 to-transparent z-10" />
            </div>
            {/* Text */}
            <div className="flex flex-col justify-center p-8 z-10">
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-pink-500 uppercase tracking-widest mb-3">
                <span className="w-1.5 h-1.5 rounded-full bg-pink-500" />
                Color Mastery
              </span>
              <h3 className="text-2xl font-[var(--font-bebas-neue)] tracking-wide text-slate-900 leading-tight mb-2">
                Colors That
                <br />
                Demand Clicks.
              </h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                Vibrant, data-backed color palettes chosen by AI to maximize
                your click-through rate and stand out in any feed.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
