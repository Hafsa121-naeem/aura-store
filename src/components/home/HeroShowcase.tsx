'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Compass } from 'lucide-react';

export default function HeroShowcase() {
  return (
    <section className="relative w-full bg-[#1A1918] overflow-hidden select-none hairline-b">
      
      {/* 1. Full-Bleed Atmospheric Cinematic Hero Stage */}
      <div className="relative w-full h-[76vh] sm:h-[82vh] min-h-[540px] max-h-[800px] flex items-center">
        
        {/* Background Atmospheric Photograph with Subtle Vignette */}
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1800&q=85"
            alt="AURA Copenhagen Luxury Living"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center brightness-[0.72] contrast-[1.06]"
            unoptimized
          />
          {/* Subtle Danish Cinematic Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#1A1918] via-black/40 to-black/25" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-transparent" />
        </div>

        {/* Hero Editorial Content */}
        <div className="relative z-10 w-full max-w-[1540px] mx-auto px-6 sm:px-10 py-16 sm:py-24 flex flex-col justify-between h-full">
          
          {/* Top Kicker Strip */}
          <div className="flex items-center justify-between">
            <div className="inline-flex items-center gap-2.5 px-3 py-1 bg-black/40 backdrop-blur-md border border-white/15 text-[10px] font-mono uppercase tracking-[0.28em] text-[#E8D4B0]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#E8D4B0]" />
              <span>AURA Copenhagen &bull; Autumn / Winter 2026</span>
            </div>

            <div className="hidden sm:flex items-center gap-3 text-[10px] font-mono uppercase tracking-widest text-[#FAF8F5]/70">
              <span>Acoustic Audio</span>
              <span>&bull;</span>
              <span>Titanium Horology</span>
              <span>&bull;</span>
              <span>Artisan Leather</span>
            </div>
          </div>

          {/* Central Editorial Brand Introduction */}
          <div className="max-w-3xl my-auto space-y-6 pt-8 pb-12">
            <div className="space-y-4">
              <span className="text-xs uppercase tracking-[0.32em] font-light text-[#E0D8CB] block">
                Ny Kollektion &bull; The Mindful Domestic Space
              </span>
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-editorial font-light text-[#FAF8F5] leading-[1.06] tracking-tight">
                A life of contrasts: <br />
                <span className="italic font-normal text-[#E8D4B0]">
                  Quiet luxury for modern living.
                </span>
              </h1>
              <p className="text-sm sm:text-base text-[#EDE8DF]/80 font-light max-w-xl leading-relaxed">
                Sculptural electronics, grade-5 titanium horology, and handcrafted Italian leather designed to harmonize with domestic architecture.
              </p>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-5 pt-2">
              <Link
                href="/products"
                className="px-8 py-3.5 bg-[#FAF8F5] hover:bg-[#E8D4B0] text-[#1A1918] text-xs uppercase tracking-[0.24em] font-light transition-all shadow-lg flex items-center gap-2"
              >
                <span>Explore Collection</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>

              <a
                href="#categories"
                className="px-6 py-3.5 border border-white/25 hover:border-white text-white text-xs uppercase tracking-[0.22em] font-light transition-colors backdrop-blur-sm"
              >
                Shop By Department
              </a>
            </div>
          </div>

          {/* Bottom Understated Reassurance Bar */}
          <div className="flex flex-wrap items-center justify-between text-[11px] font-mono text-[#E0D8CB]/70 uppercase tracking-widest pt-4 border-t border-white/10">
            <div className="flex items-center gap-6">
              <span>&bull; Nationwide Cash on Delivery</span>
              <span>&bull; Doorstep Inspection Included</span>
              <span>&bull; Official 12-Month Warranty</span>
            </div>
            <div className="hidden md:block text-[#E8D4B0]">
              All Prices in PKR (Rs.)
            </div>
          </div>

        </div>
      </div>

    </section>
  );
}