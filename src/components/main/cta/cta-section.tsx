"use client";

import Link from "next/link";
import dynamic from "next/dynamic";

const ColorBends = dynamic(() => import("./color-bends"), { ssr: false });

export default function CTASection() {
  return (
    <section className="relative w-full py-24 px-6">
      <div className="relative mx-auto max-w-4xl">
        {/* CTA Box */}
        <div className="relative rounded-3xl overflow-hidden">
          {/* Animated WebGL background */}
          <div className="absolute inset-0">
            <ColorBends
              colors={["#3b82f6", "#8b5cf6", "#a78bfa", "#60a5fa", "#c4b5fd"]}
              speed={0.15}
              rotation={30}
              autoRotate={2}
              scale={1.2}
              frequency={0.9}
              warpStrength={1.2}
              mouseInfluence={0.6}
              parallax={0.3}
              noise={0.04}
              transparent={false}
            />
          </div>

          {/* Overlay for text readability */}
          <div className="absolute inset-0 bg-black/20" />

          {/* Content */}
          <div className="relative z-10 flex flex-col items-center text-center px-8 py-20 gap-6">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 text-white text-sm font-medium">
              <svg width="14" height="14" viewBox="0 0 16 16" fill="white">
                <path d="M8 1L10 6H15L11 9.5L12.5 15L8 12L3.5 15L5 9.5L1 6H6L8 1Z" />
              </svg>
              Start Free Today
            </div>

            {/* Headline */}
            <h2 className="text-5xl md:text-6xl font-[var(--font-bebas-neue)] tracking-wide text-white leading-tight">
              Your Next Viral Thumbnail
              <br />
              <span className="text-white/80">Is One Click Away.</span>
            </h2>

            <p className="text-lg text-white/70 max-w-xl leading-relaxed">
              Join thousands of creators who are already using AI to make thumbnails
              that stop the scroll and drive clicks.
            </p>

            {/* CTA Buttons */}
            <div className="flex items-center gap-4 mt-2">
              <Link
                href="/auth"
                className="px-8 py-3.5 rounded-full bg-white text-slate-900 font-semibold text-base hover:bg-white/90 transition-colors shadow-lg"
              >
                Get Started for Free
              </Link>
              <Link
                href="#pricing"
                className="px-8 py-3.5 rounded-full border border-white/40 bg-white/10 backdrop-blur-sm text-white font-semibold text-base hover:bg-white/20 transition-colors"
              >
                View Pricing
              </Link>
            </div>

            {/* Social proof */}
            <p className="text-sm text-white/50 mt-2">
              No credit card required · 10 free credits on signup
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
