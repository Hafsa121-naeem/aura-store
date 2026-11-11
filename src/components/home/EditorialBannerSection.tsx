'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Compass, ShieldCheck } from 'lucide-react';

export default function EditorialBannerSection() {
  return (
    <section className="py-24 sm:py-32 bg-[#FAF8F5] hairline-b overflow-hidden select-none">
      <div className="max-w-[1540px] mx-auto px-6 sm:px-10">
        
        {/* Editorial Visual Lifestyle Banner */}
        <div className="relative aspect-[16/10] sm:aspect-[21/9] w-full overflow-hidden bg-[#EDE8DF] border border-[#D8D2C6] shadow-xl group">
          
          {/* High-Resolution Atmospheric Lifestyle Photograph */}
          <Image
            src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=1800&q=85"
            alt="The Architecture of Daily Rituals"
            fill
            sizes="100vw"
            className="object-cover object-center brightness-[0.82] contrast-[1.04] group-hover:scale-102 transition-transform duration-1000 ease-out"
            unoptimized
          />

          {/* Soft Danish Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#1A1918]/90 via-[#1A1918]/30 to-black/20" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/20 to-transparent" />

          {/* Editorial Content Overlay */}
          <div className="absolute inset-0 p-8 sm:p-14 lg:p-18 flex flex-col justify-between text-[#FAF8F5] z-10">
            
            {/* Top Kicker */}
            <div className="flex items-center justify-between">
              <span className="bg-black/50 backdrop-blur-md px-3.5 py-1 text-[10px] font-mono uppercase tracking-[0.28em] text-[#E8D4B0] border border-white/15">
                Editorial Anthology &bull; Volume IV
              </span>
              <span className="hidden sm:inline-block text-[10px] font-mono uppercase tracking-widest text-[#EDE8DF]/70">
                Copenhagen Living Sanctuary
              </span>
            </div>

            {/* Central Narrative Block */}
            <div className="max-w-2xl space-y-4 my-auto">
              <h2 className="text-3xl sm:text-5xl lg:text-6xl font-editorial font-light text-[#FAF8F5] leading-[1.08] tracking-tight">
                The Architecture of <br />
                <span className="italic font-normal text-[#E8D4B0]">
                  Daily Rituals &amp; Tactile Spaces
                </span>
              </h2>

              <p className="text-xs sm:text-sm text-[#EDE8DF]/90 font-light leading-relaxed max-w-xl">
                In an era of fleeting obsolescence, AURA selects objects designed to mature gracefully over time. Hand-finished Italian leather develops a unique patina; aerospace titanium maintains its structural purity; acoustic chambers deliver unadulterated fidelity.
              </p>

              {/* Three Pillars */}
              <div className="pt-2 flex flex-wrap items-center gap-6 text-[10px] font-mono uppercase tracking-wider text-[#E8D4B0]">
                <span>&bull; Structural Precision</span>
                <span>&bull; Aniline Leather &amp; Titanium</span>
                <span>&bull; Nationwide Inspection</span>
              </div>
            </div>

            {/* Bottom Action Strip */}
            <div className="pt-6 border-t border-white/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="text-[11px] font-mono text-[#EDE8DF]/70">
                Doorstep Cash on Delivery Across Pakistan &bull; 7-Day Replacement Policy
              </div>

              <Link
                href="/products"
                className="inline-flex items-center gap-3 px-6 py-3 bg-[#FAF8F5] hover:bg-[#E8D4B0] text-[#1A1918] text-xs uppercase tracking-[0.22em] font-light transition-all shadow-md self-start sm:self-auto"
              >
                <span>Explore Complete Collection (76 Objects)</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}