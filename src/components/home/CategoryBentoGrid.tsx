'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'motion/react';
import { ArrowRight, Compass } from 'lucide-react';

export default function CategoryBentoGrid() {
  const categories = [
    {
      id: 'electronics',
      slug: 'electronics',
      title: 'Electronics',
      subtitle: 'Beryllium Drivers & Hi-Fi Wireless Audio',
      count: '12 Objects',
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=1200&q=85',
      tag: 'Acoustic Sound',
    },
    {
      id: 'smart-watches',
      slug: 'smart-watches',
      title: 'Smart Watches',
      subtitle: 'Aerospace Grade-5 Titanium & Sapphire Horology',
      count: '12 Objects',
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=85',
      tag: 'Precision Instruments',
    },
    {
      id: 'fashion',
      slug: 'fashion',
      title: 'Fashion & Accessories',
      subtitle: 'Full-Grain Tuscan Calfskin & Gold Hardware',
      count: '12 Objects',
      image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800&q=85',
      tag: 'Artisan Leather',
    },
    {
      id: 'beauty',
      slug: 'beauty',
      title: 'Beauty & Skincare',
      subtitle: 'Active Multi-Peptide Elixirs & Organic Botanicals',
      count: '12 Objects',
      image: 'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=800&q=85',
      tag: 'Pure Botanicals',
    },
    {
      id: 'home-living',
      slug: 'home-living',
      title: 'Home & Living',
      subtitle: 'Hand-Thrown Ceramics & Dimmable Ambient Lighting',
      count: '14 Objects',
      image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=85',
      tag: 'Domestic Space',
    },
    {
      id: 'mobile-accessories',
      slug: 'mobile-accessories',
      title: 'Mobile Accessories',
      subtitle: 'Solid Aluminum MagSafe Stands & 65W GaN Power',
      count: '14 Objects',
      image: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=800&q=85',
      tag: 'Machined Gear',
    },
  ];

  return (
    <section id="categories" className="py-24 sm:py-32 bg-[#F5F2EB] hairline-b">
      <div className="max-w-[1540px] mx-auto px-6 sm:px-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between pb-8 sm:pb-12 hairline-b gap-6">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8 }}
            className="space-y-3"
          >
            <div className="flex items-center gap-2">
              <Compass className="w-3.5 h-3.5 text-[#806B43]" />
              <span className="text-[11px] uppercase tracking-[0.28em] font-light text-[#8C867D]">
                Department Directory &bull; Curated Disciplines
              </span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-editorial font-light text-[#1A1918] leading-[1.08]">
              Shop by Category: <br />
              <span className="italic font-normal text-[#806B43]">Tactile Spaces &amp; Domestic Objects</span>
            </h2>
            <p className="text-xs sm:text-sm text-[#5C5852] font-light max-w-xl leading-relaxed">
              Explore six meticulously curated departments. Every piece is sourced with official manufacturer warranties and delivered with nationwide Cash on Delivery.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8 }}
          >
            <Link
              href="/products"
              className="text-xs uppercase tracking-[0.24em] font-light text-[#1A1918] hover:text-[#806B43] flex items-center gap-2 transition-colors self-start md:self-auto underline underline-offset-8"
            >
              <span>Explore All 76 Objects</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </motion.div>
        </div>

        {/* Compact, Clean 6-Category Grid (3 cols x 2 rows) with Staggered Entrance */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-10 sm:pt-12">
          {categories.map((cat, idx) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7, delay: idx * 0.1 }}
            >
              <Link
                href={`/${cat.slug}`}
                className="group relative h-[300px] sm:h-[320px] overflow-hidden bg-[#EDE8DF] border border-[#D8D2C6] hover:border-[#1A1918] flex flex-col justify-between p-6 sm:p-7 transition-all duration-500 shadow-sm hover:shadow-2xl block"
              >
                {/* Background Image with Slow Hover Scale */}
                <div className="absolute inset-0">
                  <Image
                    src={cat.image}
                    alt={cat.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 800px"
                    className="object-cover group-hover:scale-106 transition-transform duration-1000 ease-out brightness-90 contrast-105"
                    unoptimized
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1A1918]/85 via-[#1A1918]/30 to-black/25 group-hover:from-[#1A1918]/90 transition-all duration-500" />
                </div>

                {/* Top Tag & Count */}
                <div className="relative z-10 flex items-center justify-between">
                  <span className="text-[10px] uppercase tracking-[0.24em] font-mono text-[#FAF8F5]/90 px-2.5 py-1 bg-black/35 backdrop-blur-md border border-white/15">
                    {cat.tag}
                  </span>
                  <span className="text-[10px] font-mono text-[#FAF8F5]/85">
                    {cat.count}
                  </span>
                </div>

                {/* Bottom Details */}
                <div className="relative z-10 space-y-2 mt-auto pt-12">
                  <h3 className="font-editorial text-2xl sm:text-3xl font-light text-[#FAF8F5] group-hover:text-[#E8D4B0] transition-colors leading-snug">
                    {cat.title}
                  </h3>
                  <p className="text-xs text-[#EDE8DF]/85 font-light line-clamp-1">
                    {cat.subtitle}
                  </p>

                  <div className="pt-3 flex items-center gap-2 text-xs uppercase tracking-[0.22em] font-light text-[#FAF8F5] group-hover:text-[#E8D4B0] transition-colors">
                    <span>Enter Department</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1.5 transition-transform" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
