'use client';

import React from 'react';
import Link from 'next/link';
import { Product } from '@/lib/types/database';
import ProductCard from '@/components/products/ProductCard';
import { ArrowRight, Award } from 'lucide-react';

interface BestSellersSectionProps {
  products: Product[];
}

export default function BestSellersSection({ products }: BestSellersSectionProps) {
  // Sort by rating and review count
  const sorted = [...products].sort((a, b) => b.rating * b.review_count - a.rating * a.review_count);
  const bestSellers = sorted.slice(0, 4);

  return (
    <section className="py-16 sm:py-24 bg-white border-t border-slate-100">
      <div className="max-w-[1480px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 border border-amber-200/80 text-[#8c6b2d] text-[10px] uppercase tracking-[0.24em] font-bold">
              <Award className="w-3.5 h-3.5 text-[#b48a4c]" />
              <span>Customer Top Rated</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light font-serif text-slate-950 tracking-tight">
              Best Sellers Leaderboard
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 max-w-lg font-normal">
              The highest rated items across Pakistan with documented 4.8+ star customer satisfaction ratings.
            </p>
          </div>

          <Link
            href="/best-sellers"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-[#8c6b2d] hover:text-slate-950 transition-colors group"
          >
            <span>View All Best Sellers</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {bestSellers.map((prod) => (
            <ProductCard key={prod.id} product={prod} />
          ))}
        </div>
      </div>
    </section>
  );
}
