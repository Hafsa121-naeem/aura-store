'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, ShoppingBag, Sparkles, Truck, ShieldCheck } from 'lucide-react';

export default function SwitchbladeHero() {

  // Cascading stepped products matching the Switchblade reference composition
  const steppedCards = [
    {
      id: 'p301',
      label: 'Leather Bag',
      slug: 'aura-artisan-leather-briefcase',
      image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&q=80',
      price: 22499,
      offsetClass: 'translate-y-8 lg:translate-y-12', // Lower left
    },
    {
      id: 'p604',
      label: 'Carbon Case',
      slug: 'aura-aramid-carbon-fiber-phone-case',
      image: 'https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=600&q=80',
      price: 3499,
      offsetClass: '-translate-y-2 lg:-translate-y-4', // Mid left higher
    },
    {
      id: 'p502',
      label: 'Desk Lamp',
      slug: 'aura-nordic-touch-ambient-lamp',
      image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=600&q=80',
      price: 7499,
      offsetClass: '-translate-y-8 lg:-translate-y-12', // Inner left highest
    },
    {
      id: 'p101',
      label: 'Limited Edition',
      slug: 'aura-horizon-anc-wireless-headphones',
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&q=80',
      price: 24999,
      offsetClass: '-translate-y-6 lg:-translate-y-8', // Inner right
      isSpecial: true,
    },
    {
      id: 'p201',
      label: 'Smartwatch',
      slug: 'aura-apex-ultra-smartwatch',
      image: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=600&q=80',
      price: 14999,
      offsetClass: 'translate-y-0 lg:translate-y-2', // Mid right
    },
    {
      id: 'p701',
      label: 'Royal Oud',
      slug: 'royal-oud-noir-extrait',
      image: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=600&q=80',
      price: 12500,
      offsetClass: 'translate-y-8 lg:translate-y-12', // Far right lower
    },
  ];

  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-slate-100/90 via-slate-50 to-white border border-slate-200/90 shadow-xl py-12 sm:py-16 px-4 sm:px-6 lg:px-12">
      {/* Background ambient texture */}
      <div className="absolute inset-0 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:24px_24px] opacity-40 pointer-events-none" />
      <div className="w-[500px] h-[500px] rounded-full bg-indigo-200/30 blur-3xl absolute -top-40 -left-20 pointer-events-none" />
      <div className="w-[450px] h-[450px] rounded-full bg-amber-200/20 blur-3xl absolute -bottom-30 -right-20 pointer-events-none" />

      {/* TOP HEADLINE - EXACT REPLICA OF "ONE STANDARD. EVERY PART OF LIFE." */}
      <div className="relative z-10 text-center max-w-4xl mx-auto space-y-3 mb-8 sm:mb-14">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-slate-300 text-xs font-black uppercase tracking-widest text-slate-800 shadow-2xs">
          <Sparkles className="w-3.5 h-3.5 text-indigo-600 animate-pulse" />
          <span>Pakistan&apos;s Curated E-Commerce Destination</span>
        </div>

        <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black uppercase tracking-tight text-slate-950 font-sans leading-[1.05]">
          ONE STANDARD. <br />
          <span className="shimmer-text">EVERY PART OF LIFE.</span>
        </h1>

        <p className="text-xs sm:text-sm md:text-base text-slate-600 max-w-xl mx-auto font-medium leading-relaxed">
          Curated electronics, titanium smartwatches, handcrafted leather, and luxury French fragrances. Nationwide Cash on Delivery (COD) across Pakistan.
        </p>
      </div>

      {/* CASCADING PRODUCT STEPPED CARDS WITH CENTER MODEL COMPOSITION */}
      <div className="relative z-10 max-w-[1300px] mx-auto min-h-[380px] sm:min-h-[460px] md:min-h-[520px] lg:min-h-[560px] flex items-center justify-center">
        {/* DESKTOP CASCADING STEPPED CARDS (Strictly matching the Switchblade reference) */}
        <div className="hidden md:flex items-center justify-between w-full relative z-0 px-2 lg:px-6">
          {/* Left 3 Stepped Cards */}
          <div className="flex items-center gap-3 lg:gap-5">
            {steppedCards.slice(0, 3).map((item) => (
              <Link
                key={item.id}
                href={`/products/${item.slug}`}
                className={`group relative flex flex-col items-center bg-white/85 backdrop-blur-md border border-slate-200/90 rounded-2xl p-2.5 sm:p-3 shadow-md hover:shadow-2xl hover:border-slate-300 transition-all duration-300 hover:scale-105 ${item.offsetClass}`}
              >
                <div className="relative w-24 h-24 sm:w-28 sm:h-28 lg:w-32 lg:h-32 rounded-xl overflow-hidden bg-slate-50 flex items-center justify-center">
                  <Image
                    src={item.image}
                    alt={item.label}
                    fill
                    className="object-cover rounded-lg transition-transform duration-500 group-hover:scale-110"
                    unoptimized
                  />
                </div>
                <span className="mt-2 text-[11px] font-bold text-slate-800 group-hover:text-indigo-600 transition-colors uppercase tracking-wider whitespace-nowrap">
                  {item.label}
                </span>
                <span className="text-[10px] font-extrabold text-slate-500 whitespace-nowrap">
                  Rs. {item.price.toLocaleString('en-PK')}
                </span>
              </Link>
            ))}
          </div>

          {/* Right 3 Stepped Cards */}
          <div className="flex items-center gap-3 lg:gap-5">
            {steppedCards.slice(3, 6).map((item) => (
              <Link
                key={item.id}
                href={`/products/${item.slug}`}
                className={`group relative flex flex-col items-center bg-white/85 backdrop-blur-md border border-slate-200/90 rounded-2xl p-2.5 sm:p-3 shadow-md hover:shadow-2xl hover:border-slate-300 transition-all duration-300 hover:scale-105 ${item.offsetClass}`}
              >
                {item.isSpecial && (
                  <span className="absolute -top-2.5 -right-2 bg-rose-600 text-white text-[9px] font-black px-2 py-0.5 rounded-full shadow-sm uppercase tracking-wider">
                    Hot Pick
                  </span>
                )}
                <div className="relative w-24 h-24 sm:w-28 sm:h-28 lg:w-32 lg:h-32 rounded-xl overflow-hidden bg-slate-50 flex items-center justify-center">
                  <Image
                    src={item.image}
                    alt={item.label}
                    fill
                    className="object-cover rounded-lg transition-transform duration-500 group-hover:scale-110"
                    unoptimized
                  />
                </div>
                <span className="mt-2 text-[11px] font-bold text-slate-800 group-hover:text-indigo-600 transition-colors uppercase tracking-wider whitespace-nowrap">
                  {item.label}
                </span>
                <span className="text-[10px] font-extrabold text-slate-500 whitespace-nowrap">
                  Rs. {item.price.toLocaleString('en-PK')}
                </span>
              </Link>
            ))}
          </div>
        </div>

        {/* CENTER FOCAL EDITORIAL MODEL (Directly inspired by the Switchblade image) */}
        <div className="relative md:absolute z-20 w-64 sm:w-80 md:w-96 lg:w-[420px] h-[340px] sm:h-[420px] md:h-[480px] lg:h-[520px] flex items-end justify-center pointer-events-none">
          <div className="relative w-full h-full">
            <Image
              src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=1000&q=85"
              alt="AURA Modern Lifestyle Model"
              fill
              priority
              className="object-contain object-bottom drop-shadow-2xl transition-transform duration-700 hover:scale-102 pointer-events-auto"
              unoptimized
            />
          </div>

          {/* Floating interactive badge on the model */}
          <div className="absolute bottom-6 bg-white/95 backdrop-blur-md px-4 py-2 rounded-2xl border border-slate-200/90 shadow-xl flex items-center gap-3 pointer-events-auto">
            <div className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center text-xs font-black">
              A
            </div>
            <div>
              <p className="text-[10px] uppercase font-black text-indigo-600 tracking-wider">
                Lifestyle Edit
              </p>
              <p className="text-xs font-black text-slate-900 whitespace-nowrap">
                Autumn/Winter 2026 Collection
              </p>
            </div>
            <Link
              href="/products"
              className="ml-2 w-7 h-7 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-700 transition-colors"
            >
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* MOBILE RESPONSIVE SCROLL ROW FOR STEPPED CARDS */}
        <div className="md:hidden w-full flex items-center gap-3 overflow-x-auto pb-4 pt-6 px-2 no-scrollbar">
          {steppedCards.map((item) => (
            <Link
              key={item.id}
              href={`/products/${item.slug}`}
              className="shrink-0 flex flex-col items-center bg-white border border-slate-200 rounded-2xl p-2.5 shadow-sm"
            >
              <div className="relative w-24 h-24 rounded-xl overflow-hidden bg-slate-50">
                <Image
                  src={item.image}
                  alt={item.label}
                  fill
                  className="object-cover"
                  unoptimized
                />
              </div>
              <span className="mt-2 text-[11px] font-bold text-slate-900 whitespace-nowrap">
                {item.label}
              </span>
              <span className="text-[10px] font-bold text-indigo-600 whitespace-nowrap">
                Rs. {item.price.toLocaleString('en-PK')}
              </span>
            </Link>
          ))}
        </div>
      </div>

      {/* BOTTOM ACTION BAR & VALUE PILL */}
      <div className="relative z-10 pt-10 sm:pt-14 border-t border-slate-200/80 flex flex-col sm:flex-row items-center justify-between gap-6 max-w-[1300px] mx-auto">
        {/* Action CTAs */}
        <div className="flex flex-wrap items-center justify-center gap-3.5">
          <Link
            href="/products"
            className="bg-slate-950 hover:bg-indigo-600 text-white px-7 py-3.5 rounded-full font-black text-xs sm:text-sm flex items-center gap-2 shadow-lg transition-all hover:scale-105 active:scale-95 whitespace-nowrap"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Shop Entire Catalog</span>
            <ArrowRight className="w-4 h-4" />
          </Link>

          <Link
            href="/products?featured=true"
            className="bg-white hover:bg-slate-100 text-slate-800 border border-slate-300 px-6 py-3.5 rounded-full font-bold text-xs sm:text-sm transition-all shadow-2xs whitespace-nowrap"
          >
            Explore Featured Picks
          </Link>
        </div>

        {/* Live Perks Pill */}
        <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-bold text-slate-700">
          <div className="flex items-center gap-1.5 text-emerald-800">
            <Truck className="w-4 h-4 text-emerald-600" />
            <span className="whitespace-nowrap">Free TCS Delivery Over Rs. 5,000</span>
          </div>
          <span className="text-slate-300">•</span>
          <div className="flex items-center gap-1.5 text-slate-800">
            <ShieldCheck className="w-4 h-4 text-indigo-600" />
            <span className="whitespace-nowrap">Cash on Delivery Across Pakistan</span>
          </div>
        </div>
      </div>
    </div>
  );
}