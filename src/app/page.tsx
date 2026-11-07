import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowRight,
  Truck,
  ShieldCheck,
  RotateCcw,
  Star,
  CheckCircle2,
} from 'lucide-react';

export default function HomePage() {
  return (
    <div className="bg-[#FAF7F2] min-h-[calc(100vh-140px)] flex flex-col justify-between overflow-x-hidden selection:bg-[#e2c799] selection:text-slate-900">
      {/* =========================================================================
          EDITORIAL LUXURY SHOPPING HERO SECTION
          Inspired by user reference designs:
          - Soft champagne-gold canvas
          - Left: High-fashion typography, "AURA STORE", "Everything You Love, All in One Place."
          - Clean "Shop Now" primary CTA
          - Right: Stylized circular champagne backdrop with modern lifestyle shopping campaign visual
          - No individual product clutter or clothing-only focus
          - Universal multi-category shopping experience
          ========================================================================= */}
      <section className="relative w-full max-w-[1480px] mx-auto px-4 sm:px-6 lg:px-8 pt-4 sm:pt-8 pb-8 lg:pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 items-center gap-8 lg:gap-12 min-h-[72vh] sm:min-h-[78vh]">
          
          {/* -------------------------------------------------------------
              LEFT COLUMN: Master Brand Identity, Tagline & Action CTAs
              ------------------------------------------------------------- */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8 text-center lg:text-left z-10 animate-in fade-in duration-700">
            
            {/* Master Identity Pill */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-[#cda869]/40 text-[#8c6b2d] text-[11px] uppercase tracking-[0.28em] font-bold shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-[#b48a4c] animate-pulse" />
              <span>Pakistan&apos;s Premier Multi-Category Marketplace</span>
            </div>

            {/* Prominent Editorial Brand Headline & Tagline */}
            <div className="space-y-4">
              <h1 className="text-5xl sm:text-7xl lg:text-8xl font-light tracking-[0.16em] text-slate-950 uppercase font-serif leading-[1.05]">
                AURA STORE
              </h1>
              
              {/* The Exact User Requested Tagline */}
              <p className="text-xl sm:text-2xl lg:text-3xl font-light text-slate-800 tracking-wide font-sans">
                Everything You Love, All in One Place.
              </p>
            </div>

            {/* Master Action CTAs: Clean "Shop Now" Button */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <Link
                href="/products"
                className="w-full sm:w-auto px-10 py-4 rounded-full bg-slate-950 text-white font-bold text-xs uppercase tracking-[0.22em] hover:bg-[#b48a4c] hover:text-slate-950 transition-all duration-300 shadow-xl flex items-center justify-center gap-2.5 group active:scale-98"
              >
                <span>Shop Now</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
              </Link>

              <Link
                href="/special-offers"
                className="w-full sm:w-auto px-8 py-4 rounded-full bg-white/80 backdrop-blur-md text-slate-900 border border-slate-300 font-semibold text-xs uppercase tracking-[0.2em] hover:bg-white hover:border-[#b48a4c] transition-all duration-300 flex items-center justify-center active:scale-98 shadow-sm"
              >
                <span>Special Offers &bull; Up to 20% Off</span>
              </Link>
            </div>

            {/* Trust Assurance Strip */}
            <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-slate-600 border-t border-slate-200/60">
              <span className="flex items-center gap-1.5 font-medium">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                Cash on Delivery (COD) Nationwide
              </span>
              <span className="flex items-center gap-1.5 font-medium">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                100% Verified Authentic Stock
              </span>
              <span className="flex items-center gap-1.5 font-medium">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                7-Day Easy Return Policy
              </span>
            </div>
          </div>

          {/* -------------------------------------------------------------
              RIGHT COLUMN: Stylized Champagne Organic Circle & Campaign Visual
              Matching reference pictures (f13ff155.png & a079e4d4.png)
              ------------------------------------------------------------- */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            
            {/* The Signature Champagne Organic Circle Backdrop */}
            <div className="relative w-[320px] h-[320px] sm:w-[440px] sm:h-[440px] lg:w-[480px] lg:h-[480px] rounded-full bg-gradient-to-tr from-[#ecd8be] via-[#f5e6d0] to-[#fcf6ee] shadow-2xl border border-amber-900/10 flex items-center justify-center">
              
              {/* Outer Decorative Luminous Ring */}
              <div className="absolute inset-[-18px] rounded-full border border-[#d4af37]/30 border-dashed animate-spin-slow opacity-60 pointer-events-none" />

              {/* The Stylized Shopping Campaign Photograph */}
              <div className="relative w-[280px] h-[360px] sm:w-[380px] sm:h-[480px] lg:w-[420px] lg:h-[520px] -mt-10 overflow-hidden rounded-3xl shadow-xl">
                <Image
                  src="https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1600&q=85"
                  alt="AURA Store Elevated Lifestyle Shopping Campaign"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 500px"
                  className="object-cover object-top hover:scale-105 transition-transform duration-700"
                  unoptimized
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
              </div>

              {/* Floating Glassmorphic Pill: Verified Rating */}
              <div className="absolute top-8 -right-2 sm:right-2 bg-white/95 backdrop-blur-md px-4 py-2 rounded-2xl border border-slate-200/80 shadow-xl flex items-center gap-2.5 z-20">
                <div className="w-8 h-8 rounded-full bg-amber-50 text-[#b48a4c] flex items-center justify-center">
                  <Star className="w-4 h-4 fill-[#b48a4c]" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900 flex items-center gap-1">
                    <span>4.9 / 5.0</span>
                    <span className="text-[10px] text-emerald-600 font-semibold">(50k+ Orders)</span>
                  </div>
                  <div className="text-[10px] text-slate-500 font-medium">Customer Satisfaction</div>
                </div>
              </div>

              {/* Floating Glassmorphic Pill: Nationwide COD */}
              <div className="absolute bottom-6 -left-2 sm:left-2 bg-white/95 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-slate-200/80 shadow-xl flex items-center gap-2.5 z-20">
                <div className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-700 flex items-center justify-center">
                  <Truck className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900">Cash on Delivery</div>
                  <div className="text-[10px] text-slate-500">All Cities Across Pakistan</div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* =========================================================================
          MINIMALIST LUXURY VALUE PILLARS STRIP
          Clean white background with black text and champagne-gold accents
          ========================================================================= */}
      <section className="border-t border-slate-200/80 bg-white py-8 sm:py-10">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 text-center sm:text-left divide-y sm:divide-y-0 sm:divide-x divide-slate-100">
            <div className="flex items-center justify-center sm:justify-start gap-4 pt-4 sm:pt-0 sm:px-6 first:px-0">
              <div className="w-10 h-10 rounded-full bg-amber-50/80 border border-amber-200/60 flex items-center justify-center text-[#b48a4c] shrink-0">
                <Truck className="w-4 h-4 stroke-[1.75]" />
              </div>
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-950">
                  Complimentary Nationwide Shipping
                </h4>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  Free express delivery on orders over Rs. 5,000 across Pakistan
                </p>
              </div>
            </div>

            <div className="flex items-center justify-center sm:justify-start gap-4 pt-4 sm:pt-0 sm:px-6">
              <div className="w-10 h-10 rounded-full bg-amber-50/80 border border-amber-200/60 flex items-center justify-center text-[#b48a4c] shrink-0">
                <ShieldCheck className="w-4 h-4 stroke-[1.75]" />
              </div>
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-950">
                  100% Genuine Authenticity
                </h4>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  Verified authentic stock with official manufacturer warranty
                </p>
              </div>
            </div>

            <div className="flex items-center justify-center sm:justify-start gap-4 pt-4 sm:pt-0 sm:px-6">
              <div className="w-10 h-10 rounded-full bg-amber-50/80 border border-amber-200/60 flex items-center justify-center text-[#b48a4c] shrink-0">
                <RotateCcw className="w-4 h-4 stroke-[1.75]" />
              </div>
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-950">
                  Cash on Delivery &bull; 7-Day Returns
                </h4>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  Doorstep inspection nationwide &bull; 7-day hassle-free returns
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
