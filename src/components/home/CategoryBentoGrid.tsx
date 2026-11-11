'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';

export default function CategoryBentoGrid() {
  const categories = [
    {
      id: 'electronics',
      slug: 'electronics',
      title: 'Acoustic Chamber',
      subtitle: 'Beryllium Drivers & Hi-Fi Wireless',
      count: '12 Objects',
      image: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=1200&q=85',
      tag: 'Acoustic Sculpture',
    },
    {
      id: 'smart-watches',
      slug: 'smart-watches',
      title: 'Precision Horology',
      subtitle: 'Aerospace Titanium & Sapphire',
      count: '12 Objects',
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=85',
      tag: 'Instruments',
    },
    {
      id: 'fashion',
      slug: 'fashion',
      title: 'Sartorial Wardrobe',
      subtitle: 'Full-Grain Italian Leather Totes',
      count: '12 Objects',
      image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800&q=85',
      tag: 'Artisan Leather',
    },
    {
      id: 'beauty',
      slug: 'beauty',
      title: 'Botanical & Scent',
      subtitle: 'Multi-Peptide Elixirs & Oils',
      count: '12 Objects',
      image: 'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=800&q=85',
      tag: 'Clean Botanicals',
    },
    {
      id: 'home-living',
      slug: 'home-living',
      title: 'Living Space',
      subtitle: 'Organic Linens & Matte Ceramics',
      count: '14 Objects',
      image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=85',
      tag: 'Interior Elements',
    },
    {
      id: 'mobile-accessories',
      slug: 'mobile-accessories',
      title: 'Mobile Architecture',
      subtitle: 'MagSafe Docks & GaN Rapid Power',
      count: '14 Objects',
      image: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=800&q=85',
      tag: 'Machined Aluminum',
    },
  ];

  return (
    <section id="categories" className="py-24 sm:py-32 bg-[#F5F2EB] hairline-b">
      <div className="max-w-[1540px] mx-auto px-6 sm:px-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between pb-8 sm:pb-12 hairline-b gap-6">
          <div className="space-y-3">
            <span className="text-[11px] uppercase tracking-[0.28em] font-light text-[#8C867D] block">
              Department Directory &bull; Section 02
            </span>
            <h2 className="text-3xl sm:text-5xl font-editorial font-light text-[#1A1918] leading-[1.08]">
              Shop by Category: <br />
              <span className="italic font-normal text-[#806B43]">Spaces &amp; Tactile Environments</span>
            </h2>
            <p className="text-xs sm:text-sm text-[#5C5852] font-light max-w-xl leading-relaxed">
              Six focused spaces contextualized for mindful living. Sourced with official brand warranties and certified nationwide Cash on Delivery.
            </p>
          </div>

          <Link
            href="/products"
            className="text-xs uppercase tracking-[0.24em] font-light text-[#1A1918] hover:text-[#806B43] flex items-center gap-2 transition-colors self-start md:self-auto underline underline-offset-8"
          >
            <span>Explore All 76 Objects</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Compact, Clean 6-Category Grid (3 cols x 2 rows) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-10 sm:pt-12">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={`/${cat.slug}`}
              className="group relative h-[280px] sm:h-[300px] overflow-hidden bg-[#EDE8DF] border border-[#D8D2C6] hover:border-[#1A1918] flex flex-col justify-between p-6 sm:p-7 transition-all duration-500 shadow-sm hover:shadow-xl"
            >
              {/* Background Image with Slow Hover Scale */}
              <div className="absolute inset-0">
                <Image
                  src={cat.image}
                  alt={cat.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 800px"
                  className="object-cover group-hover:scale-103 transition-transform duration-1000 ease-out brightness-90 contrast-105"
                  unoptimized
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1A1918]/85 via-[#1A1918]/25 to-black/20 group-hover:from-[#1A1918]/90 transition-all duration-500" />
              </div>

              {/* Top Tag & Count */}
              <div className="relative z-10 flex items-center justify-between">
                <span className="text-[10px] uppercase tracking-[0.24em] font-mono text-[#FAF8F5]/90 px-2.5 py-1 bg-black/30 backdrop-blur-sm border border-white/10">
                  {cat.tag}
                </span>
                <span className="text-[10px] font-mono text-[#FAF8F5]/80">
                  {cat.count}
                </span>
              </div>

              {/* Bottom Details */}
              <div className="relative z-10 space-y-2 mt-auto pt-12">
                <h3 className="font-editorial text-2xl sm:text-3xl font-light text-[#FAF8F5] group-hover:text-[#E8D4B0] transition-colors leading-snug">
                  {cat.title}
                </h3>
                <p className="text-xs text-[#EDE8DF]/80 font-light line-clamp-1">
                  {cat.subtitle}
                </p>

                <div className="pt-3 flex items-center gap-2 text-xs uppercase tracking-[0.22em] font-light text-[#FAF8F5] group-hover:text-[#E8D4B0] transition-colors">
                  <span>Enter Space</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1.5 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}
