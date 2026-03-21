"use client";

import * as React from "react";
import Link from "next/link";

const CheckIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const proFeatures = [
  "100 credits / month",
  "2K resolution thumbnails",
  "All styles & tools",
  "Reference image upload",
];

const ultraFeatures = [
  "300 credits / month",
  "2K resolution thumbnails",
  "All styles & tools",
  "Reference image upload",
  "Priority generation",
];

export default function PricingSection() {
  return (
    <section className="relative w-full py-24 px-6 overflow-hidden">
      {/* 배경 블러 장식 */}
      <div className="pointer-events-none absolute -top-32 left-1/2 -translate-x-1/2 w-[700px] h-[400px] rounded-full bg-gradient-to-br from-blue-100/60 to-violet-100/60 blur-3xl" />

      <div className="relative mx-auto max-w-4xl">
        {/* 섹션 헤더 */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-violet-200 bg-white/60 backdrop-blur-sm text-violet-600 text-sm font-medium mb-6">
            <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
              <path d="M8 1L10 6H15L11 9.5L12.5 15L8 12L3.5 15L5 9.5L1 6H6L8 1Z" />
            </svg>
            Simple Pricing
          </div>
          <h2 className="text-5xl font-[var(--font-bebas-neue)] tracking-wide text-slate-900 leading-tight">
            Pick Your Plan.{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-violet-500">
              Start Creating.
            </span>
          </h2>
          <p className="mt-4 text-lg text-slate-500 max-w-xl mx-auto">
            No hidden fees. Cancel anytime. Every plan includes full access to
            our AI thumbnail generator.
          </p>
        </div>

        {/* 카드 그리드 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
          {/* Pro 카드 */}
          <div className="flex flex-col rounded-2xl border border-slate-200 bg-white/70 backdrop-blur-sm shadow-lg shadow-slate-100 p-8">
            <div className="mb-6">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-widest">
                Pro
              </span>
              <div className="mt-3 flex items-end gap-1">
                <span className="text-5xl font-bold text-slate-900">$20</span>
                <span className="mb-1.5 text-sm text-slate-400">/month</span>
              </div>
              <p className="mt-2 text-sm text-slate-500">
                Perfect for individual creators.
              </p>
            </div>

            <ul className="flex flex-col gap-3 mb-8 flex-1">
              {proFeatures.map((feat) => (
                <li
                  key={feat}
                  className="flex items-center gap-2.5 text-sm text-slate-600"
                >
                  <CheckIcon className="h-4 w-4 text-blue-400 shrink-0" />
                  {feat}
                </li>
              ))}
            </ul>

            <Link
              href="/auth"
              className="block w-full text-center rounded-xl border border-slate-200 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
            >
              Get Started
            </Link>
          </div>

          {/* Ultra 카드 — 애니메이션 테두리 */}
          <div className="relative rounded-[20px] p-[2px] overflow-hidden shadow-xl shadow-violet-100">
            {/* 회전 그라디언트 테두리 */}
            <div
              style={{
                position: "absolute",
                width: "700px",
                height: "700px",
                top: "50%",
                left: "50%",
                marginTop: "-350px",
                marginLeft: "-350px",
                background:
                  "conic-gradient(from 0deg, transparent 0%, transparent 40%, #A07CFE 55%, #FE8FB5 65%, #FFBE7B 75%, transparent 90%)",
                animation: "spin-border 4s linear infinite",
              }}
            />

            {/* 카드 본체 */}
            <div className="relative flex flex-col bg-white rounded-[18px] p-8">
              {/* Most Popular 뱃지 */}
              <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-violet-500 to-pink-500 px-4 py-1 text-xs font-semibold text-white shadow-md whitespace-nowrap">
                Most Popular
              </span>

              <div className="mb-6">
                <span className="text-xs font-semibold text-violet-500 uppercase tracking-widest">
                  Ultra
                </span>
                <div className="mt-3 flex items-end gap-1">
                  <span className="text-5xl font-bold text-slate-900">$45</span>
                  <span className="mb-1.5 text-sm text-slate-400">/month</span>
                </div>
                <p className="mt-2 text-sm text-slate-500">
                  For power creators who need more.
                </p>
              </div>

              <ul className="flex flex-col gap-3 mb-8 flex-1">
                {ultraFeatures.map((feat) => (
                  <li
                    key={feat}
                    className="flex items-center gap-2.5 text-sm text-slate-600"
                  >
                    <CheckIcon className="h-4 w-4 text-violet-400 shrink-0" />
                    {feat}
                  </li>
                ))}
              </ul>

              <Link
                href="/auth"
                className="block w-full text-center rounded-xl bg-gradient-to-r from-violet-500 to-pink-500 py-3 text-sm font-semibold text-white hover:opacity-90 transition-opacity shadow-sm"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>

        {/* 하단 안내 */}
        <p className="mt-8 text-center text-xs text-slate-400">
          Payments are securely processed via Polar · Cancel anytime
        </p>
      </div>
    </section>
  );
}
