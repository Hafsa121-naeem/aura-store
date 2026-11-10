'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'motion/react';
import { Product } from '@/lib/types/database';
import ProductCard from '@/components/products/ProductCard';
import { ArrowRight } from 'lucide-react';

interface TrendingSectionProps {
  initialProducts: Product[];
}

export default function TrendingSection({ initialProducts }: TrendingSectionProps) {
  const [activeTab, setActiveTab] = useState<string>('all');

  const tabs = [
    { id: 'all', label: 'All Collections' },
    { id: 'c1-electronics', label: 'Acoustic Audio' },
    { id: 'c2-watches', label: 'Horology' },
    { id: 'c3-fashion', label: 'Artisan Leather' },
    { id: 'c4-beauty', label: 'Clean Botanicals' },
  ];

  const filteredProducts = activeTab === 'all'
    ? initialProducts.slice(0, 8)
    : initialProducts.filter((p) => p.category_id === activeTab).slice(0, 8);

  return (
    <section className="py-20 sm:py-28 bg-[#FAF8F5] hairline-b">
      <div className="max-w-[1540px] mx-auto px-6 sm:px-10">
        
        {/* Header with Title and Minimalist Architectural Tags */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between pb-8 sm:pb-12 hairline-b gap-6">
          <div className="space-y-3">
            <span className="text-[11px] uppercase tracking-[0.28em] font-light text-[#8C867D] block">
              Curated Selections &bull; Section 05
            </span>
            <h2 className="text-3xl sm:text-5xl font-editorial font-light text-[#1A1918] leading-[1.08]">
              Objects in Focus: <br />
              <span className="italic font-normal text-[#806B43]">Tactile harmony for every space</span>
            </h2>
            <p className="text-xs sm:text-sm text-[#5C5852] font-light max-w-lg leading-relaxed">
              Curated objects verified by thousands of discerning clients across Pakistan. Each item inspected before dispatch with full Cash on Delivery privileges.
            </p>
          </div>

          {/* Minimalist Filter Tags */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 text-xs uppercase tracking-[0.2em] font-light transition-all border whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'border-[#1A1918] bg-[#1A1918] text-[#FAF8F5]'
                    : 'border-[#D8D2C6] bg-transparent text-[#5C5852] hover:border-[#1A1918]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Product Cards Grid with Ferm Living Hairline Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 pt-10 sm:pt-14">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Bottom Editorial Strip */}
        <div className="mt-14 pt-8 hairline-t flex flex-col sm:flex-row items-center justify-between text-xs text-[#5C5852] font-light tracking-wider gap-4">
          <p>
            Displaying {filteredProducts.length} objects &bull; 100% Verified Authentic Stock &bull; Nationwide Doorstep COD
          </p>
          <Link
            href="/products"
            className="text-xs uppercase tracking-[0.24em] text-[#1A1918] hover:text-[#806B43] transition-colors underline underline-offset-8"
          >
            Explore Complete Catalog &rarr;
          </Link>
        </div>

      </div>
    </section>
  );
}
