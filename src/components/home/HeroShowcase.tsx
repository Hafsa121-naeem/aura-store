'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'motion/react';
import { ArrowRight, Sparkles, ShieldCheck } from 'lucide-react';

export default function HeroShowcase() {
  return (
    <section className="relative w-full bg-[#1A1918] overflow-hidden select-none hairline-b">
      
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
            src="https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1800&q=85"
            alt="AURA Luxury Living & Architectural Design"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center brightness-[0.72] contrast-[1.06]"
            unoptimized
          />
          {/* Subtle Luxury Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#1A1918] via-black/45 to-black/25" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/65 via-black/20 to-transparent" />
          
          {/* Subtle Ambient Radial Light Pulse */}
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-[#806B43]/15 rounded-full blur-3xl pointer-events-none" />
        </motion.div>

        {/* Hero Editorial Content */}
        <div className="relative z-10 w-full max-w-[1540px] mx-auto px-6 sm:px-10 py-14 sm:py-20 flex flex-col justify-between h-full">
          
          {/* Top Kicker Strip with Staggered Entrance */}
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center justify-between"
          >
            <div className="inline-flex items-center gap-2.5 px-3 py-1 bg-black/40 backdrop-blur-md border border-white/15 text-[10px] font-mono uppercase tracking-[0.28em] text-[#E8D4B0]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#E8D4B0] animate-pulse" />
              <span>AURA Store &bull; Autumn / Winter 2026</span>
            </div>

            <div className="hidden sm:flex items-center gap-3 text-[10px] font-mono uppercase tracking-widest text-[#FAF8F5]/70">
              <span>Acoustic Audio</span>
              <span>&bull;</span>
              <span>Titanium Timepieces</span>
              <span>&bull;</span>
              <span>Artisan Leather</span>
            </div>
          </motion.div>

          {/* Central Editorial Brand Introduction */}
          <div className="max-w-3xl my-auto space-y-6 pt-6 pb-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-4"
            >
              <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.32em] font-light text-[#E0D8CB]">
                <Sparkles className="w-3 h-3 text-[#E8D4B0]" />
                <span>New Collection &bull; The Mindful Domestic Space</span>
              </div>
              
              <motion.h1
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
                className="text-4xl sm:text-6xl lg:text-7xl font-editorial font-light text-[#FAF8F5] leading-[1.06] tracking-tight"
              >
                A life of contrasts: <br />
                <span className="italic font-normal text-[#E8D4B0]">
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
                  className="px-8 py-3.5 bg-[#FAF8F5] hover:bg-[#E8D4B0] text-[#1A1918] text-xs uppercase tracking-[0.24em] font-light transition-colors shadow-xl flex items-center gap-2.5 group"
                >
                  <span>Explore Collection</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>

              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <a
                  href="#composition"
                  className="px-6 py-3.5 border border-white/25 hover:border-[#E8D4B0] text-white hover:text-[#E8D4B0] text-xs uppercase tracking-[0.22em] font-light transition-colors backdrop-blur-sm"
                >
                  View Exhibition
                </a>
              </motion.div>
            </motion.div>
          </div>

          {/* Bottom Understated Reassurance Bar */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.9 }}
            className="flex flex-wrap items-center justify-between text-[11px] font-mono text-[#E0D8CB]/70 uppercase tracking-widest pt-4 border-t border-white/10"
          >
            <div className="flex flex-wrap items-center gap-5 sm:gap-8">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-[#E8D4B0]" />
                Nationwide Cash on Delivery
              </span>
              <span>&bull; Doorstep Inspection Included</span>
              <span>&bull; Official 12-Month Warranty</span>
            </div>
            <div className="hidden md:block text-[#E8D4B0] font-medium">
              All Prices in PKR (Rs.)
            </div>
          </motion.div>

        </div>
      </div>

    </section>
  );
}
