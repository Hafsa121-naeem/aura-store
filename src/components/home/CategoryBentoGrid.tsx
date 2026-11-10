'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'motion/react';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function CategoryBentoGrid() {
  const categories = [
    {
      id: 'electronics',
      slug: 'electronics',
      title: 'Electronics & Audio',
      subtitle: 'ANC Headphones & Studio Acoustics',
      count: '12 Items',
      image: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=1000&q=85',
      span: 'lg:col-span-8 lg:row-span-2 min-h-[360px] sm:min-h-[440px]',
      tag: 'Flagship Audio',
    },
    {
      id: 'smart-watches',
      slug: 'smart-watches',
      title: 'Smart Watches',
      subtitle: 'Titanium AMOLED Wearables',
      count: '12 Items',
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=85',
      span: 'lg:col-span-4 min-h-[260px]',
      tag: 'Trending',
    },
    {
      id: 'fashion',
      slug: 'fashion',
      title: 'Fashion & Handbags',
      subtitle: 'Artisan Italian Leather Totes',
      count: '12 Items',
      image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800&q=85',
      span: 'lg:col-span-4 min-h-[260px]',
      tag: 'Handcrafted',
    },
    {
      id: 'beauty',
      slug: 'beauty',
      title: 'Beauty & Skincare',
      subtitle: 'Botanical Peptide Elixirs',
      count: '12 Items',
      image: 'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=800&q=85',
      span: 'lg:col-span-4 min-h-[280px]',
      tag: 'Clean Beauty',
    },
    {
      id: 'home-living',
      slug: 'home-living',
      title: 'Home & Living',
      subtitle: 'Nordic Linens & Ceramic Accents',
      count: '14 Items',
      image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=85',
      span: 'lg:col-span-4 min-h-[280px]',
      tag: 'Artisan Living',
    },
    {
      id: 'mobile-accessories',
      slug: 'mobile-accessories',
      title: 'Mobile Accessories',
      subtitle: 'MagSafe Docks & GaN Chargers',
      count: '14 Items',
      image: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=800&q=85',
      span: 'lg:col-span-4 min-h-[280px]',
      tag: 'Aerospace Gear',
    },
  ];

  return (
    <section className="py-16 sm:py-24 bg-[#FAF7F2]/40">
      <div className="max-w-[1480px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[#b48a4c]/30 text-[#8c6b2d] text-[10px] uppercase tracking-[0.24em] font-bold shadow-2xs">
              <Sparkles className="w-3 h-3 text-[#b48a4c]" />
              <span>Curated Departments</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-slate-950 font-serif tracking-tight">
              Explore By Category
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 max-w-xl font-normal">
              From hi-fi audio and aerospace titanium to handcrafted Italian leather and botanical elixirs, explore authenticated stock across Pakistan.
            </p>
          </div>

          <Link
            href="/products"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-[#8c6b2d] hover:text-slate-950 transition-colors group"
          >
            <span>View All 76 Products</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
          </Link>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-5 sm:gap-6">
          {categories.map((cat, idx) => (
            <motion.div
              key={cat.id}
              whileHover={{ y: -5 }}
              transition={{ type: 'spring', stiffness: 350, damping: 25 }}
              className={`group relative overflow-hidden rounded-3xl bg-white border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-[#b48a4c]/50 transition-all ${cat.span}`}
            >
              <Link href={`/${cat.slug}`} className="block w-full h-full relative">
                {/* Image */}
                <Image
                  src={cat.image}
                  alt={cat.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 800px"
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
                  unoptimized
                />

                {/* Light Luxury Gradient Overlay: Airy, not heavy black */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent group-hover:from-slate-950/85 transition-colors duration-300" />

                {/* Top Badge */}
                <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-[10px] font-bold uppercase tracking-wider text-slate-900 shadow-2xs">
                    {cat.tag}
                  </span>
                  <span className="px-2.5 py-1 rounded-full bg-black/40 backdrop-blur-md text-[10px] font-semibold text-white/90">
                    {cat.count}
                  </span>
                </div>

                {/* Bottom Content */}
                <div className="absolute bottom-6 inset-x-6 z-10 text-white flex items-end justify-between">
                  <div className="space-y-1">
                    <h3 className="text-xl sm:text-2xl font-light font-serif tracking-wide text-white group-hover:text-amber-200 transition-colors">
                      {cat.title}
                    </h3>
                    <p className="text-xs text-white/80 font-normal">
                      {cat.subtitle}
                    </p>
                  </div>

                  <div className="w-10 h-10 rounded-full bg-white/90 text-slate-950 flex items-center justify-center shrink-0 group-hover:bg-[#b48a4c] group-hover:text-white transition-all shadow-md group-hover:scale-110">
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
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
