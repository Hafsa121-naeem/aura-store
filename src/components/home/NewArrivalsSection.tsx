'use client';

import React from 'react';
import Link from 'next/link';
import { Product } from '@/lib/types/database';
import ProductCard from '@/components/products/ProductCard';
import { ArrowRight, Sparkles } from 'lucide-react';

interface NewArrivalsSectionProps {
  products: Product[];
}

export default function NewArrivalsSection({ products }: NewArrivalsSectionProps) {
  const newArrivals = products.filter((p) => p.is_new).slice(0, 4);
  const displayItems = newArrivals.length > 0 ? newArrivals : products.slice(0, 4);

  return (
    <section className="py-16 sm:py-24 bg-[#FAF7F2]/50 border-t border-slate-200/60">
      <div className="max-w-[1480px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[#b48a4c]/30 text-[#8c6b2d] text-[10px] uppercase tracking-[0.24em] font-bold shadow-2xs">
              <Sparkles className="w-3 h-3 text-[#b48a4c]" />
              <span>Just Added To Store</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light font-serif text-slate-950 tracking-tight">
              New Seasonal Arrivals
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 max-w-lg font-normal">
              The latest certified acoustic sound gear, titanium timepieces, and Italian leather satchels.
            </p>
          </div>

          <Link
            href="/new-arrivals"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-[#8c6b2d] hover:text-slate-950 transition-colors group"
          >
            <span>Explore All New</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {displayItems.map((prod) => (
            <ProductCard key={prod.id} product={prod} />
          ))}
        </div>
      </div>
    </section>
  );
}
