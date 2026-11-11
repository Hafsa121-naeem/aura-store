'use client';

import React, { useState, useRef, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight, Sparkles } from 'lucide-react';
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
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  // Very subtle, smooth mouse perspective response (controlled & minimal)
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({
      x: Number((x * 4).toFixed(2)),
      y: Number((-y * 3).toFixed(2)),
    });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setTilt({ x: 0, y: 0 });
  }, []);

  // Exactly 5 carefully chosen luxury objects: 1 Main Focal Anchor + 4 Supporting Objects
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
    <section className="py-24 sm:py-32 bg-[#F5F2EB] hairline-b relative overflow-hidden select-none">
      
      {/* Editorial Header */}
      <div className="max-w-[1540px] mx-auto px-6 sm:px-10 pb-12 sm:pb-16 flex flex-col sm:flex-row sm:items-end justify-between gap-6 hairline-b">
        <div className="space-y-3">
          <div className="flex items-center gap-2.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#806B43]" />
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
        </div>

        <div className="text-xs font-light text-[#5C5852] max-w-sm leading-relaxed sm:text-right">
          <p>An art-directed composition of five flagship objects, calibrated for serene domestic harmony.</p>
          <span className="text-[10px] font-mono text-[#8C867D] uppercase tracking-wider block mt-1">
            Cash on Delivery Nationwide &bull; Doorstep Inspection Included
          </span>
        </div>
      </div>

      {/* THE ONE REFINED 3D KINETIC COMPOSITION (Apple-style balanced editorial tableau) */}
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="max-w-[1540px] mx-auto px-6 sm:px-10 pt-12 sm:pt-16"
        style={{ perspective: '1600px' }}
      >
        <div
          className="relative transition-transform duration-700 ease-out preserve-3d"
          style={{
            transform: `rotateX(${tilt.y}deg) rotateY(${tilt.x}deg)`,
          }}
        >

          {/* Desktop & Tablet Art-Directed Floating Tableau */}
          <div className="hidden lg:grid grid-cols-12 gap-8 items-center min-h-[580px]">
            
            {/* Left Wing (Supporting 01: Watch + Supporting 03: Lamp) */}
            <div className="col-span-3 space-y-8 flex flex-col justify-center">
              
              {/* Supporting 01: Titanium Smartwatch */}
              <div
                onMouseEnter={() => setActiveId(supportingObjects[0].id)}
                onMouseLeave={() => setActiveId(null)}
                className="animate-luxury-float group relative bg-[#FAF8F5] border border-[#D8D2C6] p-4 shadow-sm hover:shadow-xl hover:border-[#1A1918] transition-all duration-500"
                style={{ transform: 'translateZ(15px)' }}
              >
                <Link href={`/products/${supportingObjects[0].slug}`} className="block">
                  <div className="relative aspect-[4/5] w-full overflow-hidden bg-[#EDE8DF]">
                    <Image
                      src={supportingObjects[0].image}
                      alt={supportingObjects[0].title}
                      fill
                      sizes="280px"
                      className="object-cover group-hover:scale-104 transition-transform duration-700"
                      unoptimized
                    />
                    <div className="absolute top-2 left-2 bg-[#FAF8F5]/90 px-2 py-0.5 text-[8px] font-mono uppercase tracking-wider text-[#1A1918] border border-[#D8D2C6]">
                      {supportingObjects[0].tag}
                    </div>
                  </div>
                  <div className="pt-3 space-y-1">
                    <span className="text-[9px] font-mono uppercase tracking-widest text-[#8C867D] block">
                      {supportingObjects[0].category}
                    </span>
                    <h3 className="font-editorial text-base text-[#1A1918] line-clamp-1">
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

              {/* Supporting 03: Ceramic Lamp */}
              <div
                onMouseEnter={() => setActiveId(supportingObjects[2].id)}
                onMouseLeave={() => setActiveId(null)}
                className="animate-luxury-counter group relative bg-[#FAF8F5] border border-[#D8D2C6] p-4 shadow-sm hover:shadow-xl hover:border-[#1A1918] transition-all duration-500"
                style={{ transform: 'translateZ(-10px)' }}
              >
                <Link href={`/products/${supportingObjects[2].slug}`} className="block">
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#EDE8DF]">
                    <Image
                      src={supportingObjects[2].image}
                      alt={supportingObjects[2].title}
                      fill
                      sizes="280px"
                      className="object-cover group-hover:scale-104 transition-transform duration-700"
                      unoptimized
                    />
                  </div>
                  <div className="pt-3 space-y-1">
                    <span className="text-[9px] font-mono uppercase tracking-widest text-[#8C867D] block">
                      {supportingObjects[2].category}
                    </span>
                    <h3 className="font-editorial text-base text-[#1A1918] line-clamp-1">
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

            {/* Center Anchor (The Main Focal Feature: Horizon Pro ANC Headphones) */}
            <div className="col-span-6 flex justify-center">
              <div
                onMouseEnter={() => setActiveId(focalAnchor.id)}
                onMouseLeave={() => setActiveId(null)}
                className="animate-luxury-float-slow group relative bg-[#FAF8F5] border border-[#1A1918]/20 hover:border-[#1A1918] p-6 sm:p-8 shadow-2xl transition-all duration-700 w-full max-w-[440px]"
                style={{ transform: 'translateZ(40px)' }}
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
                      className="object-cover group-hover:scale-104 transition-transform duration-1000 ease-out"
                      priority
                      unoptimized
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>

                  {/* Focal Editorial Specifications */}
                  <div className="pt-5 space-y-2">
                    <span className="text-[10px] font-mono uppercase tracking-[0.24em] text-[#806B43] block">
                      {focalAnchor.category}
                    </span>
                    <h3 className="font-editorial text-2xl sm:text-3xl text-[#1A1918] leading-tight">
                      {focalAnchor.title}
                    </h3>
                    <p className="text-xs text-[#5C5852] font-light leading-relaxed">
                      {focalAnchor.specs}
                    </p>

                    <div className="pt-4 hairline-t flex items-baseline justify-between mt-3">
                      <div>
                        <span className="text-[8px] font-mono uppercase text-[#8C867D] block">
                          SPECIMEN VALUE (PKR)
                        </span>
                        <span className="text-xl font-light text-[#1A1918]">
                          {formatPrice(focalAnchor.price)}
                        </span>
                      </div>

                      <span className="px-4 py-2 bg-[#1A1918] group-hover:bg-[#806B43] text-[#FAF8F5] text-xs uppercase tracking-widest font-light flex items-center gap-1.5 transition-colors shadow-sm">
                        <span>Acquire Specimen</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>

                </Link>
              </div>
            </div>

            {/* Right Wing (Supporting 02: Kelly Bag + Supporting 04: Serum) */}
            <div className="col-span-3 space-y-8 flex flex-col justify-center">
              
              {/* Supporting 02: Kelly Handbag */}
              <div
                onMouseEnter={() => setActiveId(supportingObjects[1].id)}
                onMouseLeave={() => setActiveId(null)}
                className="animate-luxury-float group relative bg-[#FAF8F5] border border-[#D8D2C6] p-4 shadow-sm hover:shadow-xl hover:border-[#1A1918] transition-all duration-500"
                style={{ transform: 'translateZ(20px)' }}
              >
                <Link href={`/products/${supportingObjects[1].slug}`} className="block">
                  <div className="relative aspect-[4/5] w-full overflow-hidden bg-[#EDE8DF]">
                    <Image
                      src={supportingObjects[1].image}
                      alt={supportingObjects[1].title}
                      fill
                      sizes="280px"
                      className="object-cover group-hover:scale-104 transition-transform duration-700"
                      unoptimized
                    />
                    <div className="absolute top-2 left-2 bg-[#FAF8F5]/90 px-2 py-0.5 text-[8px] font-mono uppercase tracking-wider text-[#1A1918] border border-[#D8D2C6]">
                      {supportingObjects[1].tag}
                    </div>
                  </div>
                  <div className="pt-3 space-y-1">
                    <span className="text-[9px] font-mono uppercase tracking-widest text-[#8C867D] block">
                      {supportingObjects[1].category}
                    </span>
                    <h3 className="font-editorial text-base text-[#1A1918] line-clamp-1">
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

              {/* Supporting 04: Multi-Peptide Serum */}
              <div
                onMouseEnter={() => setActiveId(supportingObjects[3].id)}
                onMouseLeave={() => setActiveId(null)}
                className="animate-luxury-counter group relative bg-[#FAF8F5] border border-[#D8D2C6] p-4 shadow-sm hover:shadow-xl hover:border-[#1A1918] transition-all duration-500"
                style={{ transform: 'translateZ(-5px)' }}
              >
                <Link href={`/products/${supportingObjects[3].slug}`} className="block">
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#EDE8DF]">
                    <Image
                      src={supportingObjects[3].image}
                      alt={supportingObjects[3].title}
                      fill
                      sizes="280px"
                      className="object-cover group-hover:scale-104 transition-transform duration-700"
                      unoptimized
                    />
                  </div>
                  <div className="pt-3 space-y-1">
                    <span className="text-[9px] font-mono uppercase tracking-widest text-[#8C867D] block">
                      {supportingObjects[3].category}
                    </span>
                    <h3 className="font-editorial text-base text-[#1A1918] line-clamp-1">
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

          {/* Mobile & Tablet Refined Editorial Layout (Calm & Serene) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:hidden gap-6">
            
            {/* Focal Feature Card */}
            <div className="sm:col-span-2 bg-[#FAF8F5] border border-[#D8D2C6] p-6 shadow-md">
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
            {supportingObjects.map((item) => (
              <div key={item.id} className="bg-[#FAF8F5] border border-[#D8D2C6] p-4 shadow-sm">
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

        </div>
      </div>

    </section>
  );
}