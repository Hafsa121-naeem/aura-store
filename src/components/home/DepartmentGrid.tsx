'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Category } from '@/lib/types/database';

interface DepartmentGridProps {
  categories: Category[];
}

export default function DepartmentGrid({ categories }: DepartmentGridProps) {
  // Curated clean studio product cutouts / isolated photography for each department
  const categoryThumbs: Record<string, string> = {
    'electronics-gadgets': 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=500&q=80',
    'smart-watches': 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=500&q=80',
    'fashion-accessories': 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=500&q=80',
    'beauty-skincare': 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=500&q=80',
    'home-living': 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=500&q=80',
    'mobile-accessories': 'https://images.unsplash.com/photo-1622445262464-84b14e3235b3?w=500&q=80',
    'lifestyle-fragrances': 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=500&q=80',
  };

  const shortNames: Record<string, string> = {
    'electronics-gadgets': 'Electronics',
    'smart-watches': 'Smart Watches',
    'fashion-accessories': 'Fashion',
    'beauty-skincare': 'Beauty & Skin',
    'home-living': 'Home & Living',
    'mobile-accessories': 'Accessories',
    'lifestyle-fragrances': 'Fragrances',
  };

  return (
    <section className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Centered Heading - Exactly like NOOK reference */}
      <div className="text-center max-w-xl mx-auto mb-10">
        <h2 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
          Shop by Department
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 mt-1 font-medium">
          Select a category to explore our authentic curated collection.
        </p>
      </div>

      {/* Horizontal Category Items - Clean minimal aesthetic matching NOOK */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-4 sm:gap-6">
        {categories.map((cat) => {
          const thumbUrl = categoryThumbs[cat.slug] || cat.image_url || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80';
          const displayName = shortNames[cat.slug] || cat.name;

          return (
            <Link
              key={cat.id}
              href={`/products?category=${cat.slug}`}
              className="group flex flex-col items-center text-center p-3 rounded-2xl transition-all duration-300 hover:-translate-y-1"
            >
              {/* Product cutout frame on soft clean background */}
              <div className="relative aspect-square w-full max-w-[140px] sm:max-w-[160px] rounded-2xl overflow-hidden bg-slate-50 border border-slate-200/80 p-2 shadow-2xs group-hover:shadow-md group-hover:border-slate-300 transition-all">
                <Image
                  src={thumbUrl}
                  alt={cat.name}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 14vw"
                  className="object-cover rounded-xl transition-transform duration-500 group-hover:scale-108"
                  unoptimized
                />
              </div>

              {/* Category Name - Guaranteed strictly single line */}
              <span className="mt-3 text-xs sm:text-sm font-black text-slate-900 group-hover:text-indigo-600 transition-colors whitespace-nowrap">
                {displayName}
              </span>

              {/* Sub-label */}
              <span className="text-[11px] text-slate-500 font-semibold mt-0.5 whitespace-nowrap">
                6 Products
              </span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}