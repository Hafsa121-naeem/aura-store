'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Sparkles, Check, ShoppingBag, Star, Zap, Truck } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { fallbackProducts } from '@/lib/data/fallback-data';
import { Product } from '@/lib/types/database';

export default function HeroShowcase() {
  const { addItem } = useCart();
  const [activeTab, setActiveTab] = useState(0);
  const [isAdded, setIsAdded] = useState(false);

  const showcaseItems = [
    {
      id: 'aur-001',
      slug: 'horizon-pro-anc-wireless-headphones',
      category: 'Electronics & Audio',
      name: 'Horizon Pro ANC Headphones',
      description: '45mm custom beryllium drivers, 40dB hybrid active noise cancelling & 40-hour ultra battery.',
      price: 24999,
      originalPrice: 29999,
      rating: 4.9,
      reviews: 142,
      badge: 'Editor Audio Pick',
      delivery: 'Free TCS Delivery in Pakistan',
      tag: 'Audio',
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80',
    },
    {
      id: 'aur-002',
      slug: 'apex-ultra-titanium-sapphire-amoled-smartwatch',
      category: 'Smart Watches',
      name: 'Apex Ultra Titanium Smartwatch',
      description: '1.96" Ultra AMOLED 1000 nits display, titanium alloy casing, heart & SpO2 health tracking.',
      price: 14999,
      originalPrice: 18999,
      rating: 4.8,
      reviews: 98,
      badge: 'Trending Wearable',
      delivery: 'TCS Dispatch in 24 Hours',
      tag: 'Watch',
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80',
    },
    {
      id: 'aur-007',
      slug: 'royal-oud-noir-extrait',
      category: 'Luxury Fragrances',
      name: 'Royal Oud Noir Extrait',
      description: 'Aged Cambodian agarwood, Damascus rose, and rare smoked amber. 18+ hour sillage.',
      price: 12500,
      originalPrice: 16000,
      rating: 4.9,
      reviews: 164,
      badge: 'Signature Scent',
      delivery: 'Direct Authentic Stock',
      tag: 'Fragrance',
      image: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=800&q=80',
    },
  ];

  const current = showcaseItems[activeTab];

  const handleQuickAdd = () => {
    const product = fallbackProducts.find((p: Product) => p.slug === current.slug);
    if (product) {
      addItem(product, 1);
      setIsAdded(true);
      setTimeout(() => setIsAdded(false), 2000);
    }
  };

  return (
    <div className="relative">
      {/* Interactive Tabs Header */}
      <div className="flex items-center gap-1.5 p-1.5 bg-white/80 backdrop-blur-md rounded-2xl border border-slate-200/90 shadow-xs mb-3 w-fit mx-auto lg:mx-0">
        {showcaseItems.map((item, idx) => (
          <button
            key={item.id}
            type="button"
            onClick={() => {
              setActiveTab(idx);
              setIsAdded(false);
            }}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === idx
                ? 'bg-slate-900 text-white shadow-xs scale-102'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
            }`}
          >
            {idx === 0 && <span>🎧</span>}
            {idx === 1 && <span>⌚</span>}
            {idx === 2 && <span>✨</span>}
            <span>{item.tag}</span>
          </button>
        ))}
      </div>

      {/* Main Glassmorphic Showcase Card */}
      <div className="bg-white/95 backdrop-blur-xl rounded-3xl p-5 sm:p-6 border border-slate-200/90 shadow-xl transition-all duration-300 hover:shadow-2xl space-y-4">
        {/* Product Image Frame */}
        <div className="relative aspect-4/3 w-full rounded-2xl overflow-hidden bg-slate-100 group">
          <Image
            key={current.image}
            src={current.image}
            alt={current.name}
            fill
            priority
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            unoptimized
          />

          {/* Top Left Badge */}
          <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm text-slate-900 text-[11px] font-black px-2.5 py-1 rounded-md shadow-xs border border-slate-200/80 flex items-center gap-1.5">
            <Sparkles className="w-3 h-3 text-indigo-600" />
            <span>{current.badge}</span>
          </div>

          {/* Bottom Right Delivery Badge */}
          <div className="absolute bottom-3 right-3 bg-emerald-600 text-white text-[11px] font-bold px-2.5 py-1 rounded-md shadow-xs flex items-center gap-1">
            <Truck className="w-3 h-3" />
            <span>{current.delivery}</span>
          </div>
        </div>

        {/* Product Details Header */}
        <div className="flex items-start justify-between gap-4 pt-1">
          <div className="min-w-0">
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-indigo-600 block">
              {current.category}
            </span>
            <h3 className="text-base sm:text-lg font-black text-slate-900 mt-0.5 truncate">
              {current.name}
            </h3>
            <div className="flex items-center gap-2 mt-1">
              <div className="flex items-center text-amber-500 font-extrabold text-xs">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400 mr-1" />
                <span>{current.rating}</span>
              </div>
              <span className="text-slate-400 text-xs">•</span>
              <span className="text-slate-600 text-xs font-semibold">{current.reviews} verified reviews</span>
            </div>
          </div>

          <div className="text-right shrink-0">
            <span className="text-xl sm:text-2xl font-black text-slate-900 block leading-tight">
              Rs. {current.price.toLocaleString('en-PK')}
            </span>
            <span className="text-xs text-slate-500 line-through block font-medium">
              Rs. {current.originalPrice.toLocaleString('en-PK')}
            </span>
          </div>
        </div>

        <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
          {current.description}
        </p>

        {/* Action Buttons */}
        <div className="pt-2 flex items-center gap-2.5">
          <button
            type="button"
            onClick={handleQuickAdd}
            className={`flex-1 py-3 px-4 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all shadow-xs ${
              isAdded
                ? 'bg-emerald-600 text-white'
                : 'bg-slate-900 hover:bg-indigo-600 text-white active:scale-98'
            }`}
          >
            {isAdded ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Added to Cart!</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>Quick Add (COD)</span>
              </>
            )}
          </button>

          <Link
            href={`/products/${current.slug}`}
            className="py-3 px-4 rounded-xl text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-900 flex items-center justify-center gap-1.5 transition-colors border border-slate-200"
          >
            <span>Details</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Live Flash Deal Counter */}
        <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] font-semibold text-slate-600">
          <div className="flex items-center gap-1.5 text-rose-600 font-bold">
            <Zap className="w-3.5 h-3.5 fill-rose-600" />
            <span>Limited Stock Available</span>
          </div>
          <span className="text-emerald-700 font-bold">✓ Cash on Delivery Ready</span>
        </div>
      </div>
    </div>
  );
}