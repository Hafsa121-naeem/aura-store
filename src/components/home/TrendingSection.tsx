'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'motion/react';
import { Product } from '@/lib/types/database';
import ProductCard from '@/components/products/ProductCard';
import { ArrowRight, Sparkles, TrendingUp } from 'lucide-react';

interface TrendingSectionProps {
  initialProducts: Product[];
}

export default function TrendingSection({ initialProducts }: TrendingSectionProps) {
  const [activeTab, setActiveTab] = useState<string>('all');

  const tabs = [
    { id: 'all', label: 'All Collections' },
    { id: 'c1-electronics', label: 'Hi-Fi Audio' },
    { id: 'c2-watches', label: 'Smartwatches' },
    { id: 'c3-fashion', label: 'Luxury Bags' },
    { id: 'c4-beauty', label: 'Clean Beauty' },
  ];

  const filteredProducts = activeTab === 'all'
    ? initialProducts.slice(0, 8)
    : initialProducts.filter((p) => p.category_id === activeTab).slice(0, 8);

  return (
    <section className="py-16 sm:py-24 bg-white">
      <div className="max-w-[1480px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header with Title and Interactive Filter Tabs */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-10 gap-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 border border-amber-200/80 text-[#8c6b2d] text-[10px] uppercase tracking-[0.24em] font-bold">
              <TrendingUp className="w-3.5 h-3.5 text-[#b48a4c]" />
              <span>Trending Across Pakistan</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-slate-950 font-serif tracking-tight">
              Most Wanted This Week
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 max-w-lg font-normal">
              Customer favorites verified by over 50,000 satisfied buyers across Lahore, Karachi and Islamabad.
            </p>
          </div>

          {/* Interactive Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`relative px-4 py-2 rounded-full text-xs uppercase tracking-wider font-semibold transition-all whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'bg-slate-950 text-white shadow-md'
                    : 'bg-[#FAF7F2] text-slate-700 hover:text-slate-950 hover:bg-slate-200/80'
                }`}
              >
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Bottom CTA Strip */}
        <div className="mt-12 text-center pt-8 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-600 font-medium">
            Showing {filteredProducts.length} top trending items with guaranteed authentic brand packaging.
          </p>
          <Link
            href="/products"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#FAF7F2] hover:bg-slate-950 hover:text-white text-slate-900 border border-slate-200 text-xs font-bold uppercase tracking-[0.2em] transition-all shadow-2xs group"
          >
            <span>Explore Entire Catalog</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}
