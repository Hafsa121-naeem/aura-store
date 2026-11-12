'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useScroll, useTransform, useReducedMotion } from 'motion/react';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function HeroShowcase() {
  const sectionRef = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();

  // Scroll-based parallax: smooth vertical movement as user scrolls through the hero section
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  // Balanced vertical parallax drift bounded safely within the scaled image bleed
  const backgroundY = useTransform(scrollYProgress, [0, 1], [-10, 20]);

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-[92vh] sm:min-h-screen bg-[#F4EFE6] overflow-hidden select-none hairline-b flex items-center"
    >
      {/* 1. Full-Bleed Atmospheric Background Stage */}
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
        {/* Scroll parallax layer */}
        <motion.div
          style={{ y: shouldReduceMotion ? 0 : backgroundY }}
          className="absolute inset-0 w-full h-full"
        >
          {/* Cinematic Horizontal Camera Pan Layer (Gentle Left-to-Right Pan & Return) */}
          <motion.div
            animate={
              shouldReduceMotion
                ? { x: '0%' }
                : {
                    x: ['-2.5%', '2.5%'],
                  }
            }
            transition={
              shouldReduceMotion
                ? { duration: 0.3 }
                : {
                    duration: 12,
                    repeat: Infinity,
                    repeatType: 'reverse',
                    ease: 'easeInOut',
                  }
            }
            className="absolute -inset-x-8 sm:-inset-x-12 inset-y-0 w-[calc(100%+4rem)] sm:w-[calc(100%+6rem)] h-full"
          >
            {/* Noticeable, luxurious continuous slow zoom (scale: 1.05 -> 1.18, 10s cycle) centered at [70%_50%] */}
            <motion.div
              initial={shouldReduceMotion ? { scale: 1, opacity: 1 } : { scale: 1.05, opacity: 0 }}
              animate={
                shouldReduceMotion
                  ? { scale: 1, opacity: 1 }
                  : {
                      scale: [1.05, 1.18],
                      opacity: 1,
                    }
              }
              transition={
                shouldReduceMotion
                  ? { duration: 0.3 }
                  : {
                      opacity: { duration: 1.2, ease: 'easeOut' },
                      scale: {
                        duration: 10,
                        repeat: Infinity,
                        repeatType: 'reverse',
                        ease: 'easeInOut',
                      },
                    }
              }
              className="absolute inset-0 w-full h-full origin-[70%_50%]"
            >
              <Image
                src="https://images.unsplash.com/photo-1483985988355-763728e1935b?w=2000&q=85&auto=format&fit=crop"
                alt="AURA Luxury Living & Architectural Design"
                fill
                priority
                sizes="100vw"
                className="object-cover object-[70%_50%] sm:object-[68%_55%] lg:object-[68%_55%] brightness-[0.98] contrast-[1.05] saturate-[1.05]"
                unoptimized
              />
              {/* Desktop Left-to-Right Champagne Vignette (Leaves subject on right 100% vivid with zero haze) */}
              <div className="hidden sm:block absolute inset-y-0 left-0 sm:w-[68%] lg:w-[56%] bg-gradient-to-r from-[#F4EFE6]/98 via-[#F4EFE6]/85 sm:via-[#F4EFE6]/60 to-transparent pointer-events-none" />
              
              {/* Mobile Bottom Champagne Vignette (Protects lower text while keeping face and eyes completely clear in top half) */}
              <div className="sm:hidden absolute inset-x-0 bottom-0 h-[64%] bg-gradient-to-t from-[#F4EFE6]/98 via-[#F4EFE6]/75 to-transparent pointer-events-none" />

              {/* Subtle Warm Champagne Glow */}
              <div className="absolute -top-24 -left-24 w-96 h-96 bg-[#C5A880]/15 rounded-full blur-3xl pointer-events-none" />
            </motion.div>
          </motion.div>
        </motion.div>

        {/* 2. Moving Pointed Champagne Spotlight Beam - Sweeps Horizontally across the photograph */}
        <motion.div
          animate={
            shouldReduceMotion
              ? { opacity: 0 }
              : {
                  opacity: [0.65, 0.95, 0.65],
                  x: ['-20vw', '95vw'],
                }
          }
          transition={
            shouldReduceMotion
              ? { duration: 0.3 }
              : {
                  x: {
                    duration: 8,
                    repeat: Infinity,
                    repeatType: 'reverse',
                    ease: 'easeInOut',
                  },
                  opacity: {
                    duration: 4,
                    repeat: Infinity,
                    repeatType: 'reverse',
                    ease: 'easeInOut',
                  },
                }
          }
          className="absolute -top-[30%] -bottom-[30%] w-[260px] sm:w-[380px] lg:w-[460px] pointer-events-none -rotate-12 mix-blend-screen"
          style={{
            background:
              'radial-gradient(ellipse 46% 62% at 50% 50%, rgba(255, 252, 245, 0.62) 0%, rgba(250, 240, 220, 0.36) 30%, rgba(235, 215, 180, 0.14) 55%, transparent 78%)',
            filter: 'blur(14px)',
          }}
        />
      </div>

      {/* Hero Editorial Content */}
      <div className="relative z-10 w-full max-w-[1540px] mx-auto px-6 sm:px-10 py-16 sm:py-24 lg:py-32 flex flex-col justify-end sm:justify-center">

        {/* Central Editorial Brand Introduction */}
        <div className="max-w-2xl space-y-6 sm:space-y-7">
          <motion.div
            initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-4"
          >
            {/* Prominent Editorial Kicker Pill */}
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 bg-[#FAF7F2]/90 backdrop-blur-md border border-[#8A6D3B]/35 text-[11px] font-mono uppercase tracking-[0.28em] text-[#5A411B] font-semibold rounded-full shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-[#8A6D3B]" />
              <span>New Collection &bull; The Mindful Domestic Space</span>
            </div>
            
            {/* High-Impact Luxury Headline - Staggered Reveal */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-editorial font-normal text-[#1A1918] leading-[1.08] tracking-tight">
              <motion.span
                className="block"
                initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.9,
                  delay: 0.35,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                A life of contrasts:
              </motion.span>
              <motion.span
                className="block italic font-medium text-[#5C4018] drop-shadow-[0_1px_2px_rgba(255,255,255,0.7)]"
                initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.9,
                  delay: 0.55,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                Quiet luxury for modern living.
              </motion.span>
            </h1>
          </motion.div>

          {/* High-Contrast Luxury CTA Buttons */}
          <motion.div
            initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
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

    </section>
  );
}
