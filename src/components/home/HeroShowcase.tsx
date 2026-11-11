'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'motion/react';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function HeroShowcase() {
  return (
    <section className="relative w-full bg-[#F4EFE6] overflow-hidden select-none hairline-b">
      
      {/* 1. Full-Bleed Atmospheric Cinematic Hero Stage */}
      <div className="relative w-full h-[78vh] sm:h-[84vh] min-h-[560px] max-h-[820px] flex items-center">
        
        {/* Background Atmospheric Photograph with Authentic Richness, Natural Contrast & Realistic Depth */}
        <motion.div
          initial={{ scale: 1.08, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0"
        >
          <Image
            src="https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1800&q=85&auto=format&fit=crop"
            alt="AURA Luxury Living & Architectural Design"
            fill
            priority
            sizes="100vw"
            className="object-cover object-[70%_top] sm:object-center brightness-[0.98] contrast-[1.05] saturate-[1.05]"
            unoptimized
          />
          {/* Desktop Left-to-Right Champagne Vignette (Leaves subject on right 100% vivid with zero haze) */}
          <div className="hidden sm:block absolute inset-y-0 left-0 sm:w-[60%] lg:w-[48%] bg-gradient-to-r from-[#F4EFE6]/95 via-[#F4EFE6]/65 to-transparent pointer-events-none" />
          
          {/* Mobile Bottom Champagne Vignette (Protects lower text while keeping face and eyes completely clear in top half) */}
          <div className="sm:hidden absolute inset-x-0 bottom-0 h-[62%] bg-gradient-to-t from-[#F4EFE6]/95 via-[#F4EFE6]/55 to-transparent pointer-events-none" />

          {/* Subtle Warm Champagne Glow */}
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-[#C5A880]/15 rounded-full blur-3xl pointer-events-none" />
        </motion.div>

        {/* Hero Editorial Content */}
        <div className="relative z-10 w-full max-w-[1540px] mx-auto px-6 sm:px-10 pt-16 pb-8 sm:py-20 flex flex-col justify-end sm:justify-center h-full">

          {/* Central Editorial Brand Introduction */}
          <div className="max-w-2xl space-y-5 sm:space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-3 sm:space-y-4"
            >
              <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.32em] font-medium text-[#7D633E]">
                <Sparkles className="w-3 h-3 text-[#7D633E]" />
                <span>New Collection &bull; The Mindful Domestic Space</span>
              </div>
              
              <motion.h1
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
                className="text-3xl sm:text-6xl lg:text-7xl font-editorial font-light text-[#1A1918] leading-[1.08] tracking-tight"
              >
                A life of contrasts: <br />
                <span className="italic font-normal text-[#8A6D3B]">
                  Quiet luxury for modern living.
                </span>
              </motion.h1>
            </motion.div>

            {/* Premium CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.75, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-wrap items-center gap-4 sm:gap-5 pt-2 sm:pt-3"
            >
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Link
                  href="/products"
                  className="px-7 sm:px-8 py-3 sm:py-3.5 bg-[#1A1918] hover:bg-[#8A6D3B] text-[#FAF8F5] text-xs uppercase tracking-[0.24em] font-medium transition-colors shadow-lg flex items-center gap-2.5 group"
                >
                  <span>Explore Collection</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>

              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <a
                  href="#composition"
                  className="px-5 sm:px-6 py-3 sm:py-3.5 border border-[#1A1918]/30 hover:border-[#8A6D3B] text-[#1A1918] hover:text-[#8A6D3B] bg-[#F4EFE6]/75 hover:bg-[#FAF7F2] text-xs uppercase tracking-[0.22em] font-medium transition-colors backdrop-blur-sm shadow-xs"
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
