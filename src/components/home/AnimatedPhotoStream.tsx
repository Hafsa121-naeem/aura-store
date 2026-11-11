'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import { formatPrice } from '@/lib/utils';

export default function AnimatedPhotoStream() {
  const displayPhotos = [
    {
      id: 'p-01',
      title: 'Horizon Pro ANC Hybrid Headphones',
      category: 'Acoustic Sculpture',
      tag: 'BERYLLIUM 40MM',
      price: 22499,
      image: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=1000&q=85',
      slug: 'horizon-pro-anc-hybrid-wireless-headphones',
      widthClass: 'w-[320px] sm:w-[360px]',
    },
    {
      id: 'p-02',
      title: 'Apex Ultra Titanium Smartwatch',
      category: 'Precision Horology',
      tag: 'TITANIUM & SAPPHIRE',
      price: 16999,
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=1000&q=85',
      slug: 'apex-ultra-titanium-sapphire-amoled-smartwatch',
      widthClass: 'w-[300px] sm:w-[340px]',
    },
    {
      id: 'p-03',
      title: 'Verona Italian Kelly Handbag',
      category: 'Sartorial Wardrobe',
      tag: 'TUSCAN CALFSKIN',
      price: 19999,
      image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=1000&q=85',
      slug: 'verona-italian-kelly-handbag',
      widthClass: 'w-[340px] sm:w-[380px]',
    },
    {
      id: 'p-04',
      title: 'High-Fashion Sartorial Shopper',
      category: 'Curated Living',
      tag: 'PARISIAN EDIT',
      price: 24999,
      image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1000&q=85',
      slug: 'verona-italian-kelly-handbag',
      widthClass: 'w-[360px] sm:w-[420px]',
    },
    {
      id: 'p-05',
      title: 'Nordic Minimalist Ceramic Lamp',
      category: 'Living Space',
      tag: 'HAND-THROWN MATTE',
      price: 9499,
      image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1000&q=85',
      slug: 'minimalist-ceramic-table-lamp',
      widthClass: 'w-[320px] sm:w-[350px]',
    },
    {
      id: 'p-06',
      title: 'Botanical Multi-Peptide Elixir',
      category: 'Botanical & Scent',
      tag: 'COLD PRESSED',
      price: 7899,
      image: 'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=1000&q=85',
      slug: 'botanical-multi-peptide-youth-serum',
      widthClass: 'w-[300px] sm:w-[340px]',
    },
    {
      id: 'p-07',
      title: 'Tactile Mechanical Keyboard',
      category: 'Workspace Architecture',
      tag: 'HOT-SWAP SWITCHES',
      price: 14499,
      image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=1000&q=85',
      slug: 'horizon-pro-anc-hybrid-wireless-headphones',
      widthClass: 'w-[360px] sm:w-[400px]',
    },
    {
      id: 'p-08',
      title: 'Ultrasonic Cold-Air Diffuser',
      category: 'Living Space',
      tag: 'AMBER AMBIANCE',
      price: 6499,
      image: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=1000&q=85',
      slug: 'cold-air-ultrasonic-essential-oil-diffuser',
      widthClass: 'w-[310px] sm:w-[340px]',
    },
  ];

  return (
    <section className="py-20 sm:py-24 bg-[#F5F2EB] hairline-b overflow-hidden select-none">
      
      {/* Editorial Section Header */}
      <div className="max-w-[1540px] mx-auto px-6 sm:px-10 pb-10 sm:pb-12 flex flex-col sm:flex-row sm:items-end justify-between gap-6 hairline-b">
        <div className="space-y-2">
          <span className="text-[11px] uppercase tracking-[0.28em] font-light text-[#8C867D] block">
            The Visual Anthology &bull; Edition 02
          </span>
          <h2 className="text-3xl sm:text-5xl font-editorial font-light text-[#1A1918] leading-[1.08]">
            Curated in Motion: <br />
            <span className="italic font-normal text-[#806B43]">Bigger classic display photographs</span>
          </h2>
        </div>

        <div className="text-xs font-light text-[#5C5852] max-w-sm leading-relaxed text-left sm:text-right">
          <p>Hover any image to pause the continuous reel and inspect product details.</p>
          <span className="text-[10px] font-mono text-[#8C867D] uppercase tracking-wider block mt-1">
            Cash on Delivery Across Pakistan &bull; Doorstep Inspection
          </span>
        </div>
      </div>

      {/* Infinite Horizontally Moving Stream of BIG Classic Display Photos */}
      <div className="pt-10 group overflow-hidden">
        <div className="flex w-max animate-marquee space-x-6 sm:space-x-8 px-4 group-hover:[animation-play-state:paused]">
          
          {/* Loop 1: Big Classic Photographs */}
          {displayPhotos.map((item, idx) => (
            <Link
              key={`stream1-${item.id}-${idx}`}
              href={`/products/${item.slug}`}
              className={`group/card relative h-[420px] sm:h-[480px] ${item.widthClass} shrink-0 bg-[#EDE8DF] border border-[#D8D2C6] overflow-hidden transition-all duration-500 hover:border-[#1A1918] shadow-md hover:shadow-2xl block`}
            >
              {/* Full-Bleed Photograph with Slow Zoom */}
              <Image
                src={item.image}
                alt={item.title}
                fill
                sizes="420px"
                className="object-cover group-hover/card:scale-106 transition-transform duration-1000 ease-out"
                unoptimized
              />

              {/* Dark Vignette Overlay for Crisp Readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#1A1918]/90 via-[#1A1918]/20 to-black/10 group-hover/card:from-[#1A1918]/95 transition-all duration-300" />

              {/* Top Tag */}
              <div className="absolute top-4 left-4 z-10">
                <span className="bg-black/50 backdrop-blur-md px-3 py-1 text-[9px] font-mono uppercase tracking-[0.2em] text-[#FAF8F5] border border-white/15">
                  {item.tag}
                </span>
              </div>

              {/* Bottom Editorial Content Block */}
              <div className="absolute bottom-0 inset-x-0 p-5 sm:p-6 z-10 space-y-2 transform translate-y-2 group-hover/card:translate-y-0 transition-transform duration-300">
                <span className="text-[9px] uppercase tracking-[0.24em] font-mono text-[#E8D4B0] block">
                  {item.category}
                </span>

                <h3 className="font-editorial text-lg sm:text-xl font-light text-[#FAF8F5] line-clamp-1 leading-snug">
                  {item.title}
                </h3>

                <div className="pt-2 flex items-baseline justify-between border-t border-white/15">
                  <span className="text-sm sm:text-base font-light text-[#FAF8F5]">
                    {formatPrice(item.price)}
                  </span>

                  <span className="text-[10px] uppercase font-mono tracking-widest text-[#E8D4B0] flex items-center gap-1 group-hover/card:underline">
                    <span>Inspect</span>
                    <ArrowUpRight className="w-3.5 h-3.5 group-hover/card:translate-x-0.5 group-hover/card:-translate-y-0.5 transition-transform" />
                  </span>
                </div>
              </div>
            </Link>
          ))}

          {/* Loop 2: Duplicate for seamless continuous infinite motion */}
          {displayPhotos.map((item, idx) => (
            <Link
              key={`stream2-${item.id}-${idx}`}
              href={`/products/${item.slug}`}
              className={`group/card relative h-[420px] sm:h-[480px] ${item.widthClass} shrink-0 bg-[#EDE8DF] border border-[#D8D2C6] overflow-hidden transition-all duration-500 hover:border-[#1A1918] shadow-md hover:shadow-2xl block`}
            >
              <Image
                src={item.image}
                alt={item.title}
                fill
                sizes="420px"
                className="object-cover group-hover/card:scale-106 transition-transform duration-1000 ease-out"
                unoptimized
              />

              <div className="absolute inset-0 bg-gradient-to-t from-[#1A1918]/90 via-[#1A1918]/20 to-black/10 group-hover/card:from-[#1A1918]/95 transition-all duration-300" />

              <div className="absolute top-4 left-4 z-10">
                <span className="bg-black/50 backdrop-blur-md px-3 py-1 text-[9px] font-mono uppercase tracking-[0.2em] text-[#FAF8F5] border border-white/15">
                  {item.tag}
                </span>
              </div>

              <div className="absolute bottom-0 inset-x-0 p-5 sm:p-6 z-10 space-y-2 transform translate-y-2 group-hover/card:translate-y-0 transition-transform duration-300">
                <span className="text-[9px] uppercase tracking-[0.24em] font-mono text-[#E8D4B0] block">
                  {item.category}
                </span>

                <h3 className="font-editorial text-lg sm:text-xl font-light text-[#FAF8F5] line-clamp-1 leading-snug">
                  {item.title}
                </h3>

                <div className="pt-2 flex items-baseline justify-between border-t border-white/15">
                  <span className="text-sm sm:text-base font-light text-[#FAF8F5]">
                    {formatPrice(item.price)}
                  </span>

                  <span className="text-[10px] uppercase font-mono tracking-widest text-[#E8D4B0] flex items-center gap-1 group-hover/card:underline">
                    <span>Inspect</span>
                    <ArrowUpRight className="w-3.5 h-3.5 group-hover/card:translate-x-0.5 group-hover/card:-translate-y-0.5 transition-transform" />
                  </span>
                </div>
              </div>
            </Link>
          ))}

        </div>
      </div>

    </section>
  );
}
