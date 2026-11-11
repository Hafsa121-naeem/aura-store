'use client';

import React, { useState, useRef, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import { ArrowUpRight, Sparkles, Layers, Box } from 'lucide-react';
import { formatPrice } from '@/lib/utils';

interface FocalObject {
  id: string;
  tag: string;
  title: string;
  category: string;
  price: number;
  image: string;
  slug: string;
  specs: string;
}

export default function AnimatedPhotoStream() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Framer Motion spring-accelerated 3D tilt physics (responsive to mouse coordinates)
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 20, stiffness: 100, mass: 0.6 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [10, -10]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-12, 12]), springConfig);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  }, [mouseX, mouseY]);

  const handleMouseLeave = useCallback(() => {
    mouseX.set(0);
    mouseY.set(0);
  }, [mouseX, mouseY]);

  // Five carefully chosen luxury objects: 1 Main Focal Anchor + 4 Supporting Objects
  const focalAnchor: FocalObject = {
    id: 'focal-01',
    tag: 'FLAGSHIP SCULPTURE',
    title: 'Horizon Pro ANC Hybrid Headphones',
    category: 'Acoustic Chamber',
    price: 22499,
    image: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=1200&q=85',
    slug: 'horizon-pro-anc-hybrid-wireless-headphones',
    specs: '40mm Milled Beryllium • 42dB Hybrid Noise Cancellation',
  };

  const supportingObjects: FocalObject[] = [
    {
      id: 'sup-01',
      tag: 'TITANIUM HOROLOGY',
      title: 'Apex Titanium Sapphire Smartwatch',
      category: 'Precision Instruments',
      price: 16999,
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=85',
      slug: 'apex-titanium-sapphire-amoled-smartwatch',
      specs: 'Aerospace Grade-5 Titanium • Curved Sapphire Crystal',
    },
    {
      id: 'sup-02',
      tag: 'TUSCAN ATELIER',
      title: 'Verona Italian Calfskin Handbag',
      category: 'Sartorial Wardrobe',
      price: 19999,
      image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800&q=85',
      slug: 'verona-italian-calfskin-handbag',
      specs: 'Full-Grain Calfskin • Hand-Polished Palladium Brass',
    },
    {
      id: 'sup-03',
      tag: 'HAND-THROWN STONEWARE',
      title: 'Cordless Ceramic Table Lamp',
      category: 'Living Space',
      price: 9499,
      image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=85',
      slug: 'cordless-rechargeable-mushroom-table-lamp',
      specs: 'Matte Reduction Fired • Dimmable Flax Warm Ambiance',
    },
    {
      id: 'sup-04',
      tag: 'COLD-PRESSED PEPTIDES',
      title: 'Luminance Vitamin C Radiance Elixir',
      category: 'Botanical & Scent',
      price: 7899,
      image: 'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=800&q=85',
      slug: 'luminance-vitamin-c-radiance-elixir',
      specs: 'Organic Rosehip • Active Biomimetic Radiance Complex',
    },
  ];

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
              In Stillness &amp; Subtle Motion
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
          <p>An art-directed composition of five flagship objects, calibrated for serene domestic harmony.</p>
          <span className="text-[10px] font-mono text-[#8C867D] uppercase tracking-wider block mt-1">
            Nationwide Cash on Delivery &bull; Doorstep Inspection Included
          </span>
        </motion.div>
      </div>

      {/* 3D KINETIC COMPOSITION (Apple-style balanced editorial tableau with dynamic 3D floating physics) */}
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="max-w-[1540px] mx-auto px-6 sm:px-10 pt-12 sm:pt-16"
        style={{ perspective: 1600 }}
      >
        <motion.div
          style={{
            rotateX,
            rotateY,
            transformStyle: 'preserve-3d',
          }}
          className="relative transition-transform duration-200 ease-out"
        >

          {/* Desktop & Tablet Art-Directed Floating Tableau */}
          <div className="hidden lg:grid grid-cols-12 gap-8 items-center min-h-[620px]">
            
            {/* Left Wing (Supporting 01: Watch + Supporting 03: Lamp) */}
            <div className="col-span-3 space-y-10 flex flex-col justify-center">
              
              {/* Supporting 01: Titanium Smartwatch (3D Left Float) */}
              <div className="animate-3d-left">
                <div
                  onMouseEnter={() => setActiveId(supportingObjects[0].id)}
                  onMouseLeave={() => setActiveId(null)}
                  className="group relative bg-[#FAF8F5] border border-[#D8D2C6] p-4.5 transition-all duration-500 hover:border-[#1A1918] hover:scale-102"
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
                        <span className="text-sm font-light text-[#1A1918]">
                          {formatPrice(supportingObjects[0].price)}
                        </span>
                        <span className="text-[9px] font-mono uppercase text-[#806B43] flex items-center gap-0.5">
                          Inspect <ArrowUpRight className="w-2.5 h-2.5" />
                        </span>
                      </div>
                    </div>
                  </Link>
                </div>
              </div>

              {/* Supporting 03: Ceramic Lamp (3D Counter Float) */}
              <div className="animate-3d-counter">
                <div
                  onMouseEnter={() => setActiveId(supportingObjects[2].id)}
                  onMouseLeave={() => setActiveId(null)}
                  className="group relative bg-[#FAF8F5] border border-[#D8D2C6] p-4.5 transition-all duration-500 hover:border-[#1A1918] hover:scale-102"
                >
                  <Link href={`/products/${supportingObjects[2].slug}`} className="block">
                    <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#EDE8DF]">
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
                        <span className="text-sm font-light text-[#1A1918]">
                          {formatPrice(supportingObjects[2].price)}
                        </span>
                        <span className="text-[9px] font-mono uppercase text-[#806B43] flex items-center gap-0.5">
                          Inspect <ArrowUpRight className="w-2.5 h-2.5" />
                        </span>
                      </div>
                    </div>
                  </Link>
                </div>
              </div>

            </div>

            {/* Center Anchor (The Main Focal Feature: Horizon Pro ANC Headphones - 3D Focal Float) */}
            <div className="col-span-6 flex justify-center">
              <div className="animate-3d-focal w-full max-w-[440px]">
                <div
                  onMouseEnter={() => setActiveId(focalAnchor.id)}
                  onMouseLeave={() => setActiveId(null)}
                  className="group relative bg-[#FAF8F5] border border-[#1A1918]/25 hover:border-[#1A1918] p-6 sm:p-8 transition-all duration-700 hover:scale-103"
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
                          <span className="text-xs text-[#8C867D] line-through ml-2">
                            {formatPrice(26999)}
                          </span>
                        </div>
                        <span className="text-xs font-mono uppercase text-[#806B43] flex items-center gap-1 group-hover:translate-x-1.5 transition-transform">
                          Explore Object &rarr;
                        </span>
                      </div>
                    </div>

                  </Link>
                </div>
              </div>
            </div>

            {/* Right Wing (Supporting 02: Leather Bag + Supporting 04: Serum) */}
            <div className="col-span-3 space-y-10 flex flex-col justify-center">
              
              {/* Supporting 02: Italian Leather Bag (3D Right Float) */}
              <div className="animate-3d-right">
                <div
                  onMouseEnter={() => setActiveId(supportingObjects[1].id)}
                  onMouseLeave={() => setActiveId(null)}
                  className="group relative bg-[#FAF8F5] border border-[#D8D2C6] p-4.5 transition-all duration-500 hover:border-[#1A1918] hover:scale-102"
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
                        <span className="text-sm font-light text-[#1A1918]">
                          {formatPrice(supportingObjects[1].price)}
                        </span>
                        <span className="text-[9px] font-mono uppercase text-[#806B43] flex items-center gap-0.5">
                          Inspect <ArrowUpRight className="w-2.5 h-2.5" />
                        </span>
                      </div>
                    </div>
                  </Link>
                </div>
              </div>

              {/* Supporting 04: Multi-Peptide Serum (3D Counter Float) */}
              <div className="animate-3d-counter">
                <div
                  onMouseEnter={() => setActiveId(supportingObjects[3].id)}
                  onMouseLeave={() => setActiveId(null)}
                  className="group relative bg-[#FAF8F5] border border-[#D8D2C6] p-4.5 transition-all duration-500 hover:border-[#1A1918] hover:scale-102"
                >
                  <Link href={`/products/${supportingObjects[3].slug}`} className="block">
                    <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#EDE8DF]">
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
                        <span className="text-sm font-light text-[#1A1918]">
                          {formatPrice(supportingObjects[3].price)}
                        </span>
                        <span className="text-[9px] font-mono uppercase text-[#806B43] flex items-center gap-0.5">
                          Inspect <ArrowUpRight className="w-2.5 h-2.5" />
                        </span>
                      </div>
                    </div>
                  </Link>
                </div>
              </div>

            </div>

          </div>

          {/* Mobile & Tablet Refined Editorial Layout with Subtle 3D Depth */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:hidden gap-6">
            
            {/* Focal Feature Card */}
            <div className="sm:col-span-2 bg-[#FAF8F5] border border-[#D8D2C6] p-6 shadow-md animate-3d-focal">
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
                    <span className="text-lg font-light text-[#1A1918]">{formatPrice(focalAnchor.price)}</span>
                    <span className="text-xs uppercase font-mono text-[#806B43]">Inspect &rarr;</span>
                  </div>
                </div>
              </Link>
            </div>

            {/* 4 Supporting Items */}
            {supportingObjects.map((item, idx) => (
              <div
                key={item.id}
                className={`bg-[#FAF8F5] border border-[#D8D2C6] p-4 shadow-sm ${
                  idx % 2 === 0 ? 'animate-3d-left' : 'animate-3d-right'
                }`}
              >
                <Link href={`/products/${item.slug}`} className="block">
                  <div className="relative aspect-square w-full overflow-hidden bg-[#EDE8DF]">
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
                      <span className="text-sm font-light text-[#1A1918]">{formatPrice(item.price)}</span>
                      <span className="text-[9px] font-mono uppercase text-[#806B43]">Inspect &rarr;</span>
                    </div>
                  </div>
                </Link>
              </div>
            ))}

          </div>

        </motion.div>
      </div>

    </section>
  );
}
