'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'motion/react';
import { ArrowRight, CheckCircle2, ShieldCheck, Sparkles, Star } from 'lucide-react';
import { formatPrice } from '@/lib/utils';

export default function FeaturedSpotlight() {
  return (
    <section className="py-16 sm:py-24 bg-[#FAF7F2] relative overflow-hidden border-y border-amber-900/10">
      {/* Decorative Champagne Luminous Orbs */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 rounded-full bg-[#f3e3ce] blur-3xl opacity-60 pointer-events-none" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 rounded-full bg-[#faebd7] blur-3xl opacity-60 pointer-events-none" />

      <div className="max-w-[1480px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Visual Showcase Frame */}
          <div className="lg:col-span-6 relative">
            <div className="relative aspect-[4/3] sm:aspect-[16/11] rounded-3xl overflow-hidden shadow-2xl border border-amber-900/10 bg-white">
              <Image
                src="https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=1200&q=85"
                alt="Horizon Pro ANC Wireless Headphones - Flagship Edition"
                fill
                sizes="(max-width: 1024px) 100vw, 650px"
                className="object-cover hover:scale-105 transition-transform duration-700"
                unoptimized
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

              {/* Verified Product Badge */}
              <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md p-4 rounded-2xl border border-slate-200/80 shadow-lg flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-[#8c6b2d] font-bold uppercase tracking-wider">
                    Editor&apos;s Flagship Choice
                  </span>
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900">
                    Horizon Pro ANC Hybrid Headphones
                  </h4>
                </div>
                <div className="text-right">
                  <span className="text-sm font-black text-slate-950">
                    {formatPrice(22499)}
                  </span>
                  <div className="text-[10px] text-slate-500 line-through">
                    {formatPrice(26999)}
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Spec Pill */}
            <div className="hidden sm:flex absolute -top-4 -right-4 bg-white/95 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-slate-200 shadow-xl items-center gap-2.5 z-10">
              <div className="w-8 h-8 rounded-full bg-amber-50 text-[#8c6b2d] flex items-center justify-center font-bold text-xs">
                45mm
              </div>
              <div>
                <div className="text-xs font-bold text-slate-900">Custom Beryllium</div>
                <div className="text-[10px] text-slate-500">Audiophile Drivers</div>
              </div>
            </div>
          </div>

          {/* Right Column: Editorial Craftsmanship Narrative */}
          <div className="lg:col-span-6 space-y-6 text-slate-900">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#b48a4c]/30 text-[#8c6b2d] text-[10px] uppercase tracking-[0.24em] font-bold shadow-2xs">
              <Sparkles className="w-3.5 h-3.5 text-[#b48a4c]" />
              <span>Spotlight Masterpiece</span>
            </div>

            <div className="space-y-3">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light font-serif tracking-tight text-slate-950 leading-tight">
                Crafted for Perfection. <br />
                <span className="italic font-normal text-[#8c6b2d]">Engineered for Purity.</span>
              </h2>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-normal">
                Every product in the AURA STORE collection undergoes rigorous authenticity and performance verification before dispatch. Featuring acoustic titanium housings, memory foam protein leather, and 42dB active cancellation.
              </p>
            </div>

            {/* Feature List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-white border border-slate-200/80 space-y-1">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-950">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>42dB Hybrid ANC</span>
                </div>
                <p className="text-[11px] text-slate-500 font-normal">
                  Real-time ambient noise filtering for total immersion.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-slate-200/80 space-y-1">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-950">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>50-Hour Playback</span>
                </div>
                <p className="text-[11px] text-slate-500 font-normal">
                  Rapid USB-C charging delivers 5 hours in 10 minutes.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-slate-200/80 space-y-1">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-950">
                  <ShieldCheck className="w-4 h-4 text-[#8c6b2d]" />
                  <span>Official 12M Warranty</span>
                </div>
                <p className="text-[11px] text-slate-500 font-normal">
                  Direct brand replacement guaranteed across Pakistan.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-slate-200/80 space-y-1">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-950">
                  <Star className="w-4 h-4 text-amber-500 fill-amber-400" />
                  <span>4.9 / 5.0 (74 Reviews)</span>
                </div>
                <p className="text-[11px] text-slate-500 font-normal">
                  Consistently rated highest for comfort and fidelity.
                </p>
              </div>
            </div>

            {/* Action Button */}
            <div className="pt-4 flex flex-col sm:flex-row items-center gap-4">
              <Link
                href="/products/horizon-pro-anc-hybrid-wireless-headphones"
                className="w-full sm:w-auto px-8 py-4 rounded-full bg-slate-950 text-white font-bold text-xs uppercase tracking-[0.2em] hover:bg-[#b48a4c] hover:text-slate-950 transition-all duration-300 shadow-xl flex items-center justify-center gap-2 group active:scale-98"
              >
                <span>View Flagship Details</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                href="/electronics"
                className="w-full sm:w-auto px-6 py-4 rounded-full bg-white text-slate-900 border border-slate-300 font-semibold text-xs uppercase tracking-[0.18em] hover:border-[#b48a4c] transition-all flex items-center justify-center shadow-xs"
              >
                <span>Browse All Audio</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
