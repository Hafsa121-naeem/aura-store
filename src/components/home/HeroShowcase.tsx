'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'motion/react';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function HeroShowcase() {
  return (
    <section className="relative w-full bg-[#FAF8F5] overflow-hidden select-none hairline-b">
      
      {/* 1. Full-Bleed Atmospheric Cinematic Hero Stage */}
      <div className="relative w-full h-[78vh] sm:h-[84vh] min-h-[560px] max-h-[820px] flex items-center">
        
        {/* Background Atmospheric Photograph with Smooth Cinematic Reveal & Parallax Depth */}
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
            className="object-cover object-center brightness-[1.02] contrast-[1.02] saturate-[1.03]"
            unoptimized
          />
          {/* Soft Light Luxury Atmosphere & Editorial Vignette Overlays */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#FAF8F5]/92 via-[#FAF8F5]/70 sm:via-[#FAF8F5]/35 to-transparent/10" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#FAF8F5]/80 via-transparent to-transparent pointer-events-none" />
          
          {/* Subtle Warm Light Glow */}
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-[#806B43]/10 rounded-full blur-3xl pointer-events-none" />
        </motion.div>

        {/* Hero Editorial Content */}
        <div className="relative z-10 w-full max-w-[1540px] mx-auto px-6 sm:px-10 py-14 sm:py-20 flex flex-col justify-center h-full">

          {/* Central Editorial Brand Introduction */}
          <div className="max-w-3xl space-y-6 py-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-4"
            >
              <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.32em] font-medium text-[#806B43]">
                <Sparkles className="w-3 h-3 text-[#806B43]" />
                <span>New Collection &bull; The Mindful Domestic Space</span>
              </div>
              
              <motion.h1
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
                className="text-4xl sm:text-6xl lg:text-7xl font-editorial font-light text-[#1A1918] leading-[1.06] tracking-tight"
              >
                A life of contrasts: <br />
                <span className="italic font-normal text-[#806B43]">
                  Quiet luxury for modern living.
                </span>
              </motion.h1>
            </motion.div>

            {/* Premium CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.75, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-wrap items-center gap-5 pt-3"
            >
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Link
                  href="/products"
                  className="px-8 py-3.5 bg-[#1A1918] hover:bg-[#806B43] text-[#FAF8F5] text-xs uppercase tracking-[0.24em] font-medium transition-colors shadow-lg flex items-center gap-2.5 group"
                >
                  <span>Explore Collection</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>

              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <a
                  href="#composition"
                  className="px-6 py-3.5 border border-[#1A1918]/25 hover:border-[#806B43] text-[#1A1918] hover:text-[#806B43] bg-white/50 hover:bg-white text-xs uppercase tracking-[0.22em] font-medium transition-colors backdrop-blur-sm"
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
