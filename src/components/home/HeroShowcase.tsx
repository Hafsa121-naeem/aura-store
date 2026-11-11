'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'motion/react';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function HeroShowcase() {
  return (
    <section className="relative w-full min-h-[92vh] sm:min-h-screen bg-[#F4EFE6] overflow-hidden select-none hairline-b flex items-center">
      
      {/* 1. Full-Bleed Atmospheric Cinematic Hero Stage - True Full-Screen Height on Desktop & Mobile */}
      <div className="relative w-full min-h-[92vh] sm:min-h-screen flex items-center overflow-hidden">
        
        {/* Background Atmospheric Photograph with Authentic Richness, Natural Contrast & Realistic Depth */}
        <motion.div
          initial={{ scale: 1.15, opacity: 0 }}
          animate={{ scale: 1.08, opacity: 1 }}
          transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0 sm:scale-110 lg:scale-118 origin-[70%_35%]"
        >
          <Image
            src="https://images.unsplash.com/photo-1483985988355-763728e1935b?w=2000&q=85&auto=format&fit=crop"
            alt="AURA Luxury Living & Architectural Design"
            fill
            priority
            sizes="100vw"
            className="object-cover object-[70%_top] sm:object-[68%_32%] lg:object-[68%_32%] brightness-[0.98] contrast-[1.05] saturate-[1.05]"
            unoptimized
          />
          {/* Desktop Left-to-Right Champagne Vignette (Leaves subject on right 100% vivid with zero haze) */}
          <div className="hidden sm:block absolute inset-y-0 left-0 sm:w-[68%] lg:w-[56%] bg-gradient-to-r from-[#F4EFE6]/98 via-[#F4EFE6]/85 sm:via-[#F4EFE6]/60 to-transparent pointer-events-none" />
          
          {/* Mobile Bottom Champagne Vignette (Protects lower text while keeping face and eyes completely clear in top half) */}
          <div className="sm:hidden absolute inset-x-0 bottom-0 h-[64%] bg-gradient-to-t from-[#F4EFE6]/98 via-[#F4EFE6]/75 to-transparent pointer-events-none" />

          {/* Subtle Warm Champagne Glow */}
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-[#C5A880]/15 rounded-full blur-3xl pointer-events-none" />
        </motion.div>

        {/* Hero Editorial Content */}
        <div className="relative z-10 w-full max-w-[1540px] mx-auto px-6 sm:px-10 py-16 sm:py-24 lg:py-32 flex flex-col justify-end sm:justify-center h-full">

          {/* Central Editorial Brand Introduction */}
          <div className="max-w-2xl space-y-6 sm:space-y-7">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-4"
            >
              {/* Prominent Editorial Kicker Pill */}
              <div className="inline-flex items-center gap-2.5 px-4 py-1.5 bg-[#FAF7F2]/90 backdrop-blur-md border border-[#8A6D3B]/35 text-[11px] font-mono uppercase tracking-[0.28em] text-[#5A411B] font-semibold rounded-full shadow-xs">
                <Sparkles className="w-3.5 h-3.5 text-[#8A6D3B]" />
                <span>New Collection &bull; The Mindful Domestic Space</span>
              </div>
              
              {/* High-Impact Luxury Headline */}
              <motion.h1
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
                className="text-4xl sm:text-6xl lg:text-7xl font-editorial font-normal text-[#1A1918] leading-[1.08] tracking-tight"
              >
                A life of contrasts: <br />
                <span className="italic font-medium text-[#5C4018] drop-shadow-[0_1px_2px_rgba(255,255,255,0.7)]">
                  Quiet luxury for modern living.
                </span>
              </motion.h1>
            </motion.div>

            {/* High-Contrast Luxury CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.75, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-wrap items-center gap-4 sm:gap-5 pt-3"
            >
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Link
                  href="/products"
                  className="px-8 sm:px-9 py-3.5 sm:py-4 bg-[#1A1918] hover:bg-[#5C4018] text-[#FAF8F5] text-xs uppercase tracking-[0.26em] font-semibold transition-all shadow-xl hover:shadow-2xl flex items-center gap-3 group ring-1 ring-[#1A1918]"
                >
                  <span>Explore Collection</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
                </Link>
              </motion.div>

              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <a
                  href="#composition"
                  className="px-7 sm:px-8 py-3.5 sm:py-4 border-2 border-[#1A1918] hover:border-[#5C4018] text-[#1A1918] hover:text-[#5C4018] bg-[#FAF7F2]/90 hover:bg-white text-xs uppercase tracking-[0.24em] font-semibold transition-all backdrop-blur-md shadow-sm"
                >
                  View Exhibition
                </a>
              </motion.div>
            </motion.div>
          </div>

        </div>
      </div>

    </section>
  );
}
