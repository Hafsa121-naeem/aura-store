'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useReducedMotion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import { formatPrice } from '@/lib/utils';

interface FocalObject {
  id: string;
  tag: string;
  title: string;
  category: string;
  price: number;
  originalPrice?: number;
  image: string;
  slug: string;
  specs: string;
}

export default function AnimatedPhotoStream() {
  const shouldReduceMotion = useReducedMotion();

  // Exactly 5 carefully chosen luxury objects: 1 Main Focal Anchor + 4 Supporting Objects
  const focalAnchor: FocalObject = {
    id: 'focal-01',
    tag: 'FLAGSHIP ACOUSTICS',
    title: 'PulseStudio High-Fidelity Bluetooth Speaker',
    category: 'Acoustic Chamber',
    price: 12999,
    originalPrice: 15500,
    image: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?w=1200&q=85',
    slug: 'pulsestudio-high-fidelity-bluetooth-speaker',
    specs: 'Omnidirectional 360° Projection • IPX7 Waterproof • 24h Battery',
  };

  const supportingObjects: FocalObject[] = [
    {
      id: 'sup-01',
      tag: 'TITANIUM TIMEPIECE',
      title: 'Apex Titanium Sapphire Smartwatch',
      category: 'Precision Instruments',
      price: 32999,
      originalPrice: 38999,
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=85',
      slug: 'apex-titanium-sapphire-amoled-smartwatch',
      specs: 'Aerospace Grade-5 Titanium • Curved Sapphire Crystal',
    },
    {
      id: 'sup-02',
      tag: 'HANDCRAFTED LEATHER',
      title: 'Verona Handcrafted Calfskin Handbag',
      category: 'Luxury Fashion',
      price: 19999,
      originalPrice: 24999,
      image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800&q=85',
      slug: 'verona-italian-calfskin-handbag',
      specs: 'Full-Grain Calfskin • Hand-Polished Palladium Brass',
    },
    {
      id: 'sup-03',
      tag: 'HAND-THROWN STONEWARE',
      title: 'Cordless Ceramic Table Lamp',
      category: 'Living Space',
      price: 6999,
      originalPrice: 8500,
      image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=1000&q=80',
      slug: 'cordless-rechargeable-mushroom-table-lamp',
      specs: 'Matte Reduction Fired • Dimmable Flax Warm Ambiance',
    },
    {
      id: 'sup-04',
      tag: 'COLD-PRESSED PEPTIDES',
      title: 'Luminance Vitamin C Radiance Serum',
      category: 'Botanical & Scent',
      price: 4499,
      originalPrice: 5499,
      image: 'https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?w=1000&q=80',
      slug: 'luminance-vitamin-c-radiance-elixir',
      specs: 'Organic Rosehip • Active Biomimetic Radiance Complex',
    },
  ];

  // 1. Continuous, automatic floating animation definitions (Enhanced noticeable movement with smooth, elegant cadence)
  const floatFocal = shouldReduceMotion
    ? { y: 0, rotateZ: 0, rotateX: 0, rotateY: 0 }
    : {
        y: [0, -36, -10, 30, 0],
        rotateZ: [0, 1.8, -0.8, -1.6, 0],
        rotateX: [0, 3.5, 0, -2.8, 0],
        rotateY: [0, -2.8, 2.0, 0, 0],
        transition: {
          duration: 4.8,
          repeat: Infinity,
          ease: 'easeInOut' as const,
        },
      };

  const floatLeftTop = shouldReduceMotion
    ? { y: 0, rotateZ: 0, rotateX: 0, rotateY: 0 }
    : {
        y: [0, 32, -6, -34, 0],
        rotateZ: [0, -3.2, 0.8, 2.6, 0],
        rotateX: [1.5, -3.0, 1.5, 3.6, 1.5],
        rotateY: [5, 2.0, 4.2, 6.2, 5],
        transition: {
          duration: 4.2,
          repeat: Infinity,
          ease: 'easeInOut' as const,
          delay: 0.2,
        },
      };

  const floatRightTop = shouldReduceMotion
    ? { y: 0, rotateZ: 0, rotateX: 0, rotateY: 0 }
    : {
        y: [0, -32, 5, 34, 0],
        rotateZ: [0, 3.0, -0.8, -2.4, 0],
        rotateX: [-1.5, 3.0, -1.5, -3.6, -1.5],
        rotateY: [-5, -2.0, -4.2, -6.2, -5],
        transition: {
          duration: 4.5,
          repeat: Infinity,
          ease: 'easeInOut' as const,
          delay: 0.4,
        },
      };

  const floatLeftBottom = shouldReduceMotion
    ? { y: 0, rotateZ: 0, rotateX: 0, rotateY: 0 }
    : {
        y: [0, -28, 6, 30, 0],
        rotateZ: [0, -2.5, 1.6, -2.0, 0],
        rotateX: [0, -2.2, 2.8, 0, 0],
        rotateY: [3, 5.2, 1.5, 4.2, 3],
        transition: {
          duration: 3.9,
          repeat: Infinity,
          ease: 'easeInOut' as const,
          delay: 0.6,
        },
      };

  const floatRightBottom = shouldReduceMotion
    ? { y: 0, rotateZ: 0, rotateX: 0, rotateY: 0 }
    : {
        y: [0, 30, -6, -28, 0],
        rotateZ: [0, 2.5, -1.6, 2.0, 0],
        rotateX: [0, 2.2, -2.8, 0, 0],
        rotateY: [-3, -5.2, -1.5, -4.2, -3],
        transition: {
          duration: 4.3,
          repeat: Infinity,
          ease: 'easeInOut' as const,
          delay: 0.8,
        },
      };

  return (
    <section id="composition" className="py-24 sm:py-32 bg-[#F5F2EB] hairline-b relative overflow-hidden select-none">
      
      {/* Editorial Header */}
      <div className="max-w-[1540px] mx-auto px-6 sm:px-10 pb-12 sm:pb-16 flex flex-col sm:flex-row sm:items-end justify-between gap-6 hairline-b">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
          className="space-y-3"
        >
          <div className="flex items-center gap-2.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#806B43] animate-ping" />
            <span className="text-[11px] uppercase tracking-[0.28em] font-mono text-[#8C867D]">
              Exhibition &bull; The Curated Five
            </span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-editorial font-light text-[#1A1918] leading-[1.08]">
            Sculptural Form: <br />
            <span className="italic font-normal text-[#806B43]">
              In Stillness &amp; Continuous Motion
            </span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-xs font-light text-[#5C5852] max-w-sm leading-relaxed sm:text-right"
        >
          <p>An art-directed composition of five flagship objects, floating in serene domestic harmony.</p>
          <span className="text-[10px] font-mono text-[#8C867D] uppercase tracking-wider block mt-1">
            Nationwide Cash on Delivery &bull; Doorstep Inspection Included
          </span>
        </motion.div>
      </div>

      {/* 3D KINETIC COMPOSITION — Continuous Automatic Floating (No click needed, works immediately on load) */}
      <div
        className="max-w-[1540px] mx-auto px-6 sm:px-10 pt-12 sm:pt-16"
        style={{ perspective: 1600 }}
      >
        <div
          style={{ transformStyle: 'preserve-3d' }}
          className="relative"
        >

          {/* Desktop & Tablet Art-Directed Floating Tableau */}
          <div className="hidden lg:grid grid-cols-12 gap-8 items-center min-h-[620px]">
            
            {/* Left Wing (Supporting 01: Watch + Supporting 03: Lamp) */}
            <div className="col-span-3 space-y-10 flex flex-col justify-center">
              
              {/* Supporting 01: Titanium Smartwatch (Automatic Continuous Float 6.2s) */}
              <motion.div
                animate={floatLeftTop}
                whileHover={{
                  scale: 1.04,
                  y: -24,
                  rotateX: 4,
                  rotateY: 2,
                  zIndex: 30,
                  transition: { duration: 0.35, ease: 'easeOut' },
                }}
                className="group relative bg-[#FAF8F5] border border-[#D8D2C6] p-4.5 transition-colors duration-500 hover:border-[#1A1918] shadow-md hover:shadow-2xl cursor-pointer"
                style={{ transformStyle: 'preserve-3d' }}
              >
                <Link href={`/products/${supportingObjects[0].slug}`} className="block">
                  <div className="relative aspect-[4/5] w-full overflow-hidden bg-[#EDE8DF]">
                    <Image
                      src={supportingObjects[0].image}
                      alt={supportingObjects[0].title}
                      fill
                      sizes="280px"
                      className="object-cover group-hover:scale-106 transition-transform duration-700"
                      unoptimized
                    />
                    <div className="absolute top-2.5 left-2.5 bg-[#FAF8F5]/90 px-2 py-0.5 text-[8px] font-mono uppercase tracking-wider text-[#1A1918] border border-[#D8D2C6]">
                      {supportingObjects[0].tag}
                    </div>
                  </div>
                  <div className="pt-3.5 space-y-1">
                    <span className="text-[9px] font-mono uppercase tracking-widest text-[#8C867D] block">
                      {supportingObjects[0].category}
                    </span>
                    <h3 className="font-editorial text-base text-[#1A1918] line-clamp-1 group-hover:text-[#806B43] transition-colors">
                      {supportingObjects[0].title}
                    </h3>
                    <div className="pt-1.5 hairline-t flex items-baseline justify-between">
                      <div className="flex items-baseline gap-1.5">
                        <span className="text-sm font-light text-[#1A1918]">
                          {formatPrice(supportingObjects[0].price)}
                        </span>
                        {supportingObjects[0].originalPrice && (
                          <span className="text-[10px] text-[#8C867D] line-through">
                            {formatPrice(supportingObjects[0].originalPrice)}
                          </span>
                        )}
                      </div>
                      <span className="text-[9px] font-mono uppercase text-[#806B43] flex items-center gap-0.5">
                        Inspect <ArrowUpRight className="w-2.5 h-2.5" />
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>

              {/* Supporting 03: Ceramic Lamp (Automatic Continuous Float 5.8s) */}
              <motion.div
                animate={floatLeftBottom}
                whileHover={{
                  scale: 1.04,
                  y: -24,
                  rotateX: 4,
                  rotateY: 2,
                  zIndex: 30,
                  transition: { duration: 0.35, ease: 'easeOut' },
                }}
                className="group relative bg-[#FAF8F5] border border-[#D8D2C6] p-4.5 transition-colors duration-500 hover:border-[#1A1918] shadow-md hover:shadow-2xl cursor-pointer"
                style={{ transformStyle: 'preserve-3d' }}
              >
                <Link href={`/products/${supportingObjects[2].slug}`} className="block">
                  <div className="relative aspect-[4/5] w-full overflow-hidden bg-[#EDE8DF]">
                    <Image
                      src={supportingObjects[2].image}
                      alt={supportingObjects[2].title}
                      fill
                      sizes="280px"
                      className="object-cover group-hover:scale-106 transition-transform duration-700"
                      unoptimized
                    />
                    <div className="absolute top-2.5 left-2.5 bg-[#FAF8F5]/90 px-2 py-0.5 text-[8px] font-mono uppercase tracking-wider text-[#1A1918] border border-[#D8D2C6]">
                      {supportingObjects[2].tag}
                    </div>
                  </div>
                  <div className="pt-3.5 space-y-1">
                    <span className="text-[9px] font-mono uppercase tracking-widest text-[#8C867D] block">
                      {supportingObjects[2].category}
                    </span>
                    <h3 className="font-editorial text-base text-[#1A1918] line-clamp-1 group-hover:text-[#806B43] transition-colors">
                      {supportingObjects[2].title}
                    </h3>
                    <div className="pt-1.5 hairline-t flex items-baseline justify-between">
                      <div className="flex items-baseline gap-1.5">
                        <span className="text-sm font-light text-[#1A1918]">
                          {formatPrice(supportingObjects[2].price)}
                        </span>
                        {supportingObjects[2].originalPrice && (
                          <span className="text-[10px] text-[#8C867D] line-through">
                            {formatPrice(supportingObjects[2].originalPrice)}
                          </span>
                        )}
                      </div>
                      <span className="text-[9px] font-mono uppercase text-[#806B43] flex items-center gap-0.5">
                        Inspect <ArrowUpRight className="w-2.5 h-2.5" />
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>

            </div>

            {/* Center Anchor: Horizon Pro ANC Headphones (Automatic Continuous Float 7.2s) */}
            <div className="col-span-6 flex justify-center">
              <motion.div
                animate={floatFocal}
                whileHover={{
                  scale: 1.045,
                  y: -28,
                  rotateX: 5,
                  rotateY: -3,
                  zIndex: 40,
                  transition: { duration: 0.35, ease: 'easeOut' },
                }}
                className="group relative bg-[#FAF8F5] border border-[#1A1918]/25 hover:border-[#1A1918] p-6 sm:p-8 transition-colors duration-700 w-full max-w-[440px] shadow-xl hover:shadow-[0_45px_90px_-15px_rgba(26,25,24,0.3)] cursor-pointer"
                style={{ transformStyle: 'preserve-3d' }}
              >
                <Link href={`/products/${focalAnchor.slug}`} className="block">
                  
                  {/* Top Placard */}
                  <div className="flex items-center justify-between pb-3 hairline-b text-[9px] font-mono uppercase tracking-wider text-[#8C867D]">
                    <span className="text-[#806B43] font-semibold">{focalAnchor.tag}</span>
                    <span>EDITION 01 &bull; 40MM BERYLLIUM</span>
                  </div>

                  {/* High-Resolution Focal Image */}
                  <div className="relative aspect-[4/5] w-full overflow-hidden bg-[#EDE8DF] mt-3">
                    <Image
                      src={focalAnchor.image}
                      alt={focalAnchor.title}
                      fill
                      sizes="480px"
                      className="object-cover group-hover:scale-106 transition-transform duration-1000 ease-out"
                      priority
                      unoptimized
                    />
                    
                    {/* Corner Focal Badge */}
                    <div className="absolute bottom-3 left-3 bg-[#1A1918]/90 text-[#FAF8F5] px-3 py-1 text-[9px] font-mono uppercase tracking-widest backdrop-blur-sm">
                      3D FOCAL PIECE
                    </div>
                  </div>

                  {/* Bottom Placard */}
                  <div className="pt-5 space-y-2">
                    <span className="text-[9px] font-mono uppercase tracking-widest text-[#806B43] block">
                      {focalAnchor.category}
                    </span>
                    <h3 className="font-editorial text-2xl sm:text-3xl text-[#1A1918] group-hover:text-[#806B43] transition-colors leading-tight">
                      {focalAnchor.title}
                    </h3>
                    <p className="text-xs text-[#5C5852] font-light line-clamp-1">
                      {focalAnchor.specs}
                    </p>

                    <div className="pt-3 hairline-t flex items-baseline justify-between">
                      <div>
                        <span className="text-xl font-light text-[#1A1918]">
                          {formatPrice(focalAnchor.price)}
                        </span>
                        {focalAnchor.originalPrice && (
                          <span className="text-xs text-[#8C867D] line-through ml-2">
                            {formatPrice(focalAnchor.originalPrice)}
                          </span>
                        )}
                      </div>
                      <span className="text-xs font-mono uppercase text-[#806B43] flex items-center gap-1 group-hover:translate-x-1.5 transition-transform">
                        Explore Object &rarr;
                      </span>
                    </div>
                  </div>

                </Link>
              </motion.div>
            </div>

            {/* Right Wing (Supporting 02: Leather Bag + Supporting 04: Serum) */}
            <div className="col-span-3 space-y-10 flex flex-col justify-center">
              
              {/* Supporting 02: Italian Leather Bag (Automatic Continuous Float 6.8s) */}
              <motion.div
                animate={floatRightTop}
                whileHover={{
                  scale: 1.04,
                  y: -24,
                  rotateX: 4,
                  rotateY: -2,
                  zIndex: 30,
                  transition: { duration: 0.35, ease: 'easeOut' },
                }}
                className="group relative bg-[#FAF8F5] border border-[#D8D2C6] p-4.5 transition-colors duration-500 hover:border-[#1A1918] shadow-md hover:shadow-2xl cursor-pointer"
                style={{ transformStyle: 'preserve-3d' }}
              >
                <Link href={`/products/${supportingObjects[1].slug}`} className="block">
                  <div className="relative aspect-[4/5] w-full overflow-hidden bg-[#EDE8DF]">
                    <Image
                      src={supportingObjects[1].image}
                      alt={supportingObjects[1].title}
                      fill
                      sizes="280px"
                      className="object-cover group-hover:scale-106 transition-transform duration-700"
                      unoptimized
                    />
                    <div className="absolute top-2.5 left-2.5 bg-[#FAF8F5]/90 px-2 py-0.5 text-[8px] font-mono uppercase tracking-wider text-[#1A1918] border border-[#D8D2C6]">
                      {supportingObjects[1].tag}
                    </div>
                  </div>
                  <div className="pt-3.5 space-y-1">
                    <span className="text-[9px] font-mono uppercase tracking-widest text-[#8C867D] block">
                      {supportingObjects[1].category}
                    </span>
                    <h3 className="font-editorial text-base text-[#1A1918] line-clamp-1 group-hover:text-[#806B43] transition-colors">
                      {supportingObjects[1].title}
                    </h3>
                    <div className="pt-1.5 hairline-t flex items-baseline justify-between">
                      <div className="flex items-baseline gap-1.5">
                        <span className="text-sm font-light text-[#1A1918]">
                          {formatPrice(supportingObjects[1].price)}
                        </span>
                        {supportingObjects[1].originalPrice && (
                          <span className="text-[10px] text-[#8C867D] line-through">
                            {formatPrice(supportingObjects[1].originalPrice)}
                          </span>
                        )}
                      </div>
                      <span className="text-[9px] font-mono uppercase text-[#806B43] flex items-center gap-0.5">
                        Inspect <ArrowUpRight className="w-2.5 h-2.5" />
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>

              {/* Supporting 04: Multi-Peptide Serum (Automatic Continuous Float 6.4s) */}
              <motion.div
                animate={floatRightBottom}
                whileHover={{
                  scale: 1.04,
                  y: -24,
                  rotateX: 4,
                  rotateY: -2,
                  zIndex: 30,
                  transition: { duration: 0.35, ease: 'easeOut' },
                }}
                className="group relative bg-[#FAF8F5] border border-[#D8D2C6] p-4.5 transition-colors duration-500 hover:border-[#1A1918] shadow-md hover:shadow-2xl cursor-pointer"
                style={{ transformStyle: 'preserve-3d' }}
              >
                <Link href={`/products/${supportingObjects[3].slug}`} className="block">
                  <div className="relative aspect-[4/5] w-full overflow-hidden bg-[#EDE8DF]">
                    <Image
                      src={supportingObjects[3].image}
                      alt={supportingObjects[3].title}
                      fill
                      sizes="280px"
                      className="object-cover group-hover:scale-106 transition-transform duration-700"
                      unoptimized
                    />
                    <div className="absolute top-2.5 left-2.5 bg-[#FAF8F5]/90 px-2 py-0.5 text-[8px] font-mono uppercase tracking-wider text-[#1A1918] border border-[#D8D2C6]">
                      {supportingObjects[3].tag}
                    </div>
                  </div>
                  <div className="pt-3.5 space-y-1">
                    <span className="text-[9px] font-mono uppercase tracking-widest text-[#8C867D] block">
                      {supportingObjects[3].category}
                    </span>
                    <h3 className="font-editorial text-base text-[#1A1918] line-clamp-1 group-hover:text-[#806B43] transition-colors">
                      {supportingObjects[3].title}
                    </h3>
                    <div className="pt-1.5 hairline-t flex items-baseline justify-between">
                      <div className="flex items-baseline gap-1.5">
                        <span className="text-sm font-light text-[#1A1918]">
                          {formatPrice(supportingObjects[3].price)}
                        </span>
                        {supportingObjects[3].originalPrice && (
                          <span className="text-[10px] text-[#8C867D] line-through">
                            {formatPrice(supportingObjects[3].originalPrice)}
                          </span>
                        )}
                      </div>
                      <span className="text-[9px] font-mono uppercase text-[#806B43] flex items-center gap-0.5">
                        Inspect <ArrowUpRight className="w-2.5 h-2.5" />
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>

            </div>

          </div>

          {/* Mobile & Tablet Refined Editorial Layout with Same Automatic Continuous 3D Floating */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:hidden gap-6">
            
            {/* Focal Feature Card */}
            <motion.div
              animate={floatFocal}
              className="sm:col-span-2 bg-[#FAF8F5] border border-[#D8D2C6] p-6 shadow-md"
            >
              <Link href={`/products/${focalAnchor.slug}`} className="block">
                <div className="relative aspect-[4/5] w-full overflow-hidden bg-[#EDE8DF]">
                  <Image
                    src={focalAnchor.image}
                    alt={focalAnchor.title}
                    fill
                    sizes="600px"
                    className="object-cover"
                    unoptimized
                  />
                  <div className="absolute top-3 left-3 bg-[#FAF8F5]/90 px-2.5 py-1 text-[9px] font-mono text-[#806B43] uppercase tracking-wider">
                    {focalAnchor.tag}
                  </div>
                </div>
                <div className="pt-4 space-y-1.5">
                  <span className="text-[9px] font-mono uppercase text-[#8C867D] tracking-widest block">
                    {focalAnchor.category}
                  </span>
                  <h3 className="font-editorial text-2xl text-[#1A1918]">{focalAnchor.title}</h3>
                  <div className="pt-2 hairline-t flex justify-between items-baseline">
                    <div className="flex items-baseline gap-2">
                      <span className="text-lg font-light text-[#1A1918]">{formatPrice(focalAnchor.price)}</span>
                      {focalAnchor.originalPrice && (
                        <span className="text-xs text-[#8C867D] line-through">{formatPrice(focalAnchor.originalPrice)}</span>
                      )}
                    </div>
                    <span className="text-xs uppercase font-mono text-[#806B43]">Inspect &rarr;</span>
                  </div>
                </div>
              </Link>
            </motion.div>

            {/* 4 Supporting Items with Individual Automatic Floats */}
            {supportingObjects.map((item, idx) => {
              const floatPreset = [floatLeftTop, floatRightTop, floatLeftBottom, floatRightBottom][idx];
              return (
                <motion.div
                  key={item.id}
                  animate={floatPreset}
                  className="bg-[#FAF8F5] border border-[#D8D2C6] p-4 shadow-sm"
                >
                  <Link href={`/products/${item.slug}`} className="block">
                    <div className="relative aspect-[4/5] w-full overflow-hidden bg-[#EDE8DF]">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        sizes="300px"
                        className="object-cover"
                        unoptimized
                      />
                    </div>
                    <div className="pt-3 space-y-1">
                      <span className="text-[9px] font-mono uppercase text-[#8C867D] block">{item.category}</span>
                      <h4 className="font-editorial text-base text-[#1A1918] line-clamp-1">{item.title}</h4>
                      <div className="pt-1.5 hairline-t flex justify-between items-baseline">
                        <div className="flex items-baseline gap-1.5">
                          <span className="text-sm font-light text-[#1A1918]">{formatPrice(item.price)}</span>
                          {item.originalPrice && (
                            <span className="text-[10px] text-[#8C867D] line-through">{formatPrice(item.originalPrice)}</span>
                          )}
                        </div>
                        <span className="text-[9px] font-mono uppercase text-[#806B43]">Inspect &rarr;</span>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}

          </div>

        </div>
      </div>

    </section>
  );
}
