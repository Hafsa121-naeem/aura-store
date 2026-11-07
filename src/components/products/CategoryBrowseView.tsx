'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Product } from '@/lib/types/database';
import ProductCard from '@/components/products/ProductCard';
import {
  Search,
  SlidersHorizontal,
  Truck,
  ShieldCheck,
  Check,
  Sparkles,
} from 'lucide-react';

export interface SubcategoryOption {
  id: string; // 'all' or subcategory slug e.g. 'handbags'
  name: string;
}

interface CategoryBrowseViewProps {
  categoryName: string;
  categorySlug: string;
  bannerBadge: string;
  bannerHeadline: string;
  bannerDescription: string;
  bannerImage: string;
  bannerImageAlt: string;
  bannerFeatureText: string;
  subcategories: SubcategoryOption[];
  products: Product[];
}

export default function CategoryBrowseView({
  categoryName,
  categorySlug,
  bannerBadge,
  bannerHeadline,
  bannerDescription,
  bannerImage,
  bannerImageAlt,
  bannerFeatureText,
  subcategories,
  products = [],
}: CategoryBrowseViewProps) {
  const [selectedSubcategory, setSelectedSubcategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating' | 'newest'>('featured');

  // Compute counts for each subcategory
  const subcategoryCounts = useMemo(() => {
    const counts: Record<string, number> = { all: products.length };
    products.forEach((p) => {
      const slug = p.subcategory_slug || 'other';
      counts[slug] = (counts[slug] || 0) + 1;
    });
    return counts;
  }, [products]);

  // Filter & Sort
  const filteredProducts = useMemo(() => {
    let list = [...products];

    // Subcategory Filter
    if (selectedSubcategory !== 'all') {
      list = list.filter((p) => p.subcategory_slug === selectedSubcategory);
    }

    // Search Query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          (p.subcategory && p.subcategory.toLowerCase().includes(q))
      );
    }

    // Sort
    if (sortBy === 'price-asc') {
      list.sort((a, b) => (a.sale_price ?? a.price) - (b.sale_price ?? b.price));
    } else if (sortBy === 'price-desc') {
      list.sort((a, b) => (b.sale_price ?? b.price) - (a.sale_price ?? a.price));
    } else if (sortBy === 'rating') {
      list.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === 'newest') {
      list.sort((a, b) => (b.is_new ? 1 : 0) - (a.is_new ? 1 : 0));
    }

    return list;
  }, [products, selectedSubcategory, searchQuery, sortBy]);

  const activeSubcategoryObj = subcategories.find((s) => s.id === selectedSubcategory);

  return (
    <div className="max-w-[1480px] mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-10 selection:bg-[#e2c799] selection:text-slate-900">
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center gap-2 text-xs text-slate-500 pb-2 border-b border-slate-200">
        <Link href="/" className="hover:text-slate-950 transition-colors font-medium">
          Home
        </Link>
        <span>/</span>
        <Link href="/products" className="hover:text-slate-950 transition-colors font-medium">
          Shop
        </Link>
        <span>/</span>
        <span className="text-slate-950 font-bold">{categoryName}</span>
        {selectedSubcategory !== 'all' && activeSubcategoryObj && (
          <>
            <span>/</span>
            <span className="text-[#9e7638] font-bold">{activeSubcategoryObj.name}</span>
          </>
        )}
      </nav>

      {/* Editorial Category Hero Banner with 2-Column Split Picture */}
      <div className="relative rounded-3xl overflow-hidden bg-slate-950 text-white min-h-[360px] p-6 sm:p-10 lg:p-12 border border-slate-800 shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-8">
        <div className="absolute inset-0 z-0 bg-radial from-slate-900 via-slate-950 to-black opacity-95" />

        {/* Left Column: Headline and Perks */}
        <div className="relative z-10 max-w-xl space-y-4 text-left">
          <span className="inline-flex items-center gap-1.5 text-[11px] uppercase tracking-[0.2em] font-extrabold text-amber-300 bg-amber-950/70 border border-amber-800/80 px-3.5 py-1.5 rounded-full shadow-inner">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>{bannerBadge}</span>
          </span>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-[1.1] font-serif">
            {bannerHeadline}
          </h1>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
            {bannerDescription}
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-3 text-xs text-slate-300 border-t border-slate-800/80">
            <span className="flex items-center gap-1.5 font-semibold text-emerald-400">
              <Truck className="w-4 h-4" />
              Free Nationwide Delivery over Rs. 5,000
            </span>
            <span className="text-slate-600">•</span>
            <span className="flex items-center gap-1.5 font-semibold text-amber-200">
              <ShieldCheck className="w-4 h-4" />
              100% Verified Authentic Quality
            </span>
          </div>
        </div>

        {/* Right Column: Prominent Luxury Product/Department Photography */}
        <div className="relative z-10 w-full lg:w-[480px] h-[260px] sm:h-[300px] rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-white/5 backdrop-blur-sm group shrink-0">
          <Image
            src={bannerImage}
            alt={bannerImageAlt}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 480px"
            className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
            unoptimized
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent pointer-events-none" />
          <div className="absolute bottom-3.5 left-4 right-4 flex items-center justify-between text-[11px] font-semibold text-white/95">
            <span>{bannerFeatureText}</span>
            <span className="text-amber-300 uppercase tracking-widest text-[9px] font-bold">100% Authentic</span>
          </div>
        </div>
      </div>

      {/* Subcategories Horizontal Interactive Filter Bar */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-950 tracking-tight flex items-center gap-2">
              <span>{selectedSubcategory === 'all' ? `All ${categoryName}` : activeSubcategoryObj?.name}</span>
              <span className="text-sm font-semibold text-slate-500 bg-slate-100 px-2.5 py-0.5 rounded-full">
                {filteredProducts.length} Products
              </span>
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Select any subcategory below to explore curated collections with instant live filtering.
            </p>
          </div>

          {/* Quick Search & Sort Controls */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="relative">
              <input
                type="text"
                placeholder={`Search ${categoryName}...`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8 pr-3 py-1.5 text-xs rounded-full border border-slate-300 bg-white focus:outline-none focus:border-[#9e7638] focus:ring-1 focus:ring-[#9e7638] w-48 sm:w-56 shadow-2xs"
              />
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
            </div>

            <div className="flex items-center gap-1.5 bg-white border border-slate-300 rounded-full px-3 py-1.5 shadow-2xs">
              <SlidersHorizontal className="w-3 h-3 text-slate-500" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="text-xs font-semibold text-slate-700 bg-transparent focus:outline-none cursor-pointer"
              >
                <option value="featured">Featured</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Top Rated</option>
                <option value="newest">Newest Arrivals</option>
              </select>
            </div>
          </div>
        </div>

        {/* Subcategory Pills Row (Horizontal Scrollable) */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none pt-1">
          <button
            onClick={() => setSelectedSubcategory('all')}
            className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all shadow-2xs flex items-center gap-2 ${
              selectedSubcategory === 'all'
                ? 'bg-slate-950 text-white shadow-md'
                : 'bg-white border border-slate-200/90 text-slate-700 hover:border-slate-400 hover:bg-slate-50'
            }`}
          >
            <span>All Departments</span>
            <span
              className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                selectedSubcategory === 'all' ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600'
              }`}
            >
              {subcategoryCounts.all || 0}
            </span>
          </button>

          {subcategories.map((sub) => {
            const count = subcategoryCounts[sub.id] || 0;
            const isSelected = selectedSubcategory === sub.id;
            return (
              <button
                key={sub.id}
                onClick={() => setSelectedSubcategory(sub.id)}
                className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all shadow-2xs flex items-center gap-2 ${
                  isSelected
                    ? 'bg-[#9e7638] text-white shadow-md'
                    : 'bg-white border border-slate-200/90 text-slate-700 hover:border-[#9e7638] hover:text-[#7a5925] hover:bg-slate-50'
                }`}
              >
                <span>{sub.name}</span>
                {count > 0 && (
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                      isSelected ? 'bg-white/25 text-white' : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    {count}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Product Grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="py-20 text-center bg-white rounded-3xl border border-slate-200/80 p-8 space-y-3">
          <p className="text-base font-bold text-slate-800">No products match your criteria</p>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Try resetting your search query or selecting a different subcategory filter above.
          </p>
          <button
            onClick={() => {
              setSelectedSubcategory('all');
              setSearchQuery('');
            }}
            className="mt-2 px-6 py-2 rounded-full bg-slate-900 text-white text-xs font-bold uppercase tracking-wider hover:bg-[#9e7638] transition-colors"
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
}
