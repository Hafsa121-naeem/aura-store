'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, Star, Truck, CheckCircle2, ShoppingBag, Check, Sparkles } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { formatPrice } from '@/lib/utils';

export default function HeroShowcase() {
  const { addItem, setIsCartOpen } = useCart();
  const [activeItemIndex, setActiveItemIndex] = useState(0);
  const [isAdded, setIsAdded] = useState(false);

  const heroItems = [
    {
      id: 'el-ha-01',
      name: 'Horizon Pro ANC Hybrid Headphones',
      slug: 'horizon-pro-anc-hybrid-wireless-headphones',
      tagline: 'Custom 40mm Beryllium Drivers & 42dB Hybrid Noise Cancellation',
      price: 26999,
      salePrice: 22499,
      rating: 4.9,
      reviews: 74,
      category: 'Electronics & Hi-Fi Audio',
      image: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=1200&q=85',
      badge: 'Editor Audio Flagship',
    },
    {
      id: 'sw-ap-01',
      name: 'Apex Ultra Titanium Smartwatch',
      slug: 'apex-ultra-titanium-sapphire-amoled-smartwatch',
      tagline: 'Aerospace Grade Titanium Case with 1.96" Sapphire AMOLED Display',
      price: 21999,
      salePrice: 16999,
      rating: 4.8,
      reviews: 62,
      category: 'Luxury Wearables',
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=1200&q=85',
      badge: 'Trending Wearable',
    },
    {
      id: 'f-hb-01',
      name: 'Verona Italian Kelly Handbag',
      slug: 'verona-italian-kelly-handbag',
      tagline: 'Handcrafted Full-Grain Italian Leather with Gold-Plated Clasp Hardware',
      price: 24999,
      salePrice: 19999,
      rating: 5.0,
      reviews: 48,
      category: 'Artisan Fashion',
      image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=1200&q=85',
      badge: 'Artisan Handcrafted',
    },
  ];

  const currentItem = heroItems[activeItemIndex];

  const handleQuickAdd = () => {
    addItem(
      {
        id: currentItem.id,
        name: currentItem.name,
        slug: currentItem.slug,
        price: currentItem.price,
        sale_price: currentItem.salePrice,
        category_id: 'featured',
        stock: 25,
        rating: currentItem.rating,
        review_count: currentItem.reviews,
        status: 'published',
        featured: true,
        images: [{ id: '1', product_id: currentItem.id, image_url: currentItem.image, is_primary: true }],
      } as any,
      1,
      undefined,
      undefined,
      currentItem.image
    );
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
      setIsCartOpen(true);
    }, 600);
  };

  return (
    <section className="relative w-full bg-[#FAF7F2] overflow-hidden pt-6 sm:pt-12 pb-16 sm:pb-24">
      {/* Decorative Champagne Atmosphere Orbs */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] rounded-full bg-gradient-to-br from-[#f5e6d0] to-[#fbf7f0] blur-3xl opacity-70 pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-[400px] h-[400px] rounded-full bg-[#f3e4cf] blur-3xl opacity-50 pointer-events-none" />

      <div className="max-w-[1480px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 items-center gap-10 lg:gap-16 min-h-[70vh]">
          
          {/* Left Column: Brand Identity, Master Headline & Switchers */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8 text-center lg:text-left">
            
            {/* Master Identity Pill */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/95 backdrop-blur-md border border-[#b48a4c]/30 text-[#8c6b2d] text-[11px] uppercase tracking-[0.26em] font-bold shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-[#b48a4c] animate-pulse" />
              <span>Pakistan&apos;s Premier Multi-Category Marketplace</span>
            </div>

            {/* Editorial Brand Headline */}
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-6xl lg:text-7xl xl:text-8xl font-light tracking-[0.14em] text-slate-950 uppercase font-serif leading-[1.05]">
                AURA STORE
              </h1>
              
              <p className="text-xl sm:text-2xl lg:text-3xl font-light text-slate-800 tracking-wide font-sans">
                Everything You Love, All in One Place.
              </p>

              <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto lg:mx-0 font-normal leading-relaxed">
                Discover authentic hi-fi acoustic headphones, titanium smartwatches, full-grain Italian leather, and clean botanical skincare — delivered nationwide with doorstep Cash on Delivery inspection.
              </p>
            </div>

            {/* Master Action CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <Link
                href="/products"
                className="w-full sm:w-auto px-10 py-4 rounded-full bg-slate-950 text-white font-bold text-xs uppercase tracking-[0.22em] hover:bg-[#b48a4c] hover:text-slate-950 transition-all duration-300 shadow-xl flex items-center justify-center gap-2.5 group active:scale-98"
              >
                <span>Explore Catalog</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
              </Link>

              <Link
                href="/special-offers"
                className="w-full sm:w-auto px-8 py-4 rounded-full bg-white/90 backdrop-blur-md text-slate-900 border border-slate-300 font-semibold text-xs uppercase tracking-[0.18em] hover:bg-white hover:border-[#b48a4c] transition-all duration-300 flex items-center justify-center active:scale-98 shadow-2xs"
              >
                <span>Special Offers &bull; Up to 25% Off</span>
              </Link>
            </div>

            {/* Interactive Hero Product Switcher Tabs */}
            <div className="pt-4 border-t border-slate-200/60">
              <p className="text-[10px] uppercase tracking-widest text-[#8c6b2d] font-bold mb-3">
                Featured Flagship Spotlight:
              </p>
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2.5">
                {heroItems.map((item, idx) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setActiveItemIndex(idx)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                      activeItemIndex === idx
                        ? 'bg-slate-950 text-white shadow-md'
                        : 'bg-white/80 hover:bg-white text-slate-700 border border-slate-200/80 hover:border-slate-300'
                    }`}
                  >
                    <span>{item.name.split(' ')[0]} {item.name.split(' ')[1]}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Trust Assurance Strip */}
            <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-5 text-xs text-slate-600">
              <span className="flex items-center gap-1.5 font-medium">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                Cash on Delivery (COD) Nationwide
              </span>
              <span className="flex items-center gap-1.5 font-medium">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                100% Verified Authentic Stock
              </span>
              <span className="flex items-center gap-1.5 font-medium">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                7-Day Easy Return Policy
              </span>
            </div>
          </div>

          {/* Right Column: Dynamic Interactive Spotlight Stage */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            
            {/* Stylized Champagne Circular Stage */}
            <div className="relative w-[320px] h-[320px] sm:w-[440px] sm:h-[440px] lg:w-[480px] lg:h-[480px] rounded-full bg-gradient-to-tr from-[#ecd8be] via-[#f5e6d0] to-[#fcf6ee] shadow-2xl border border-amber-900/10 flex items-center justify-center">
              
              {/* Outer Decorative Luminous Ring */}
              <div className="absolute inset-[-18px] rounded-full border border-[#d4af37]/30 border-dashed animate-spin-slow opacity-60 pointer-events-none" />

              {/* Dynamic Animated Photograph */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentItem.id}
                  initial={{ opacity: 0, scale: 0.94 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.94 }}
                  transition={{ duration: 0.4 }}
                  className="relative w-[280px] h-[360px] sm:w-[380px] sm:h-[480px] lg:w-[420px] lg:h-[520px] -mt-10 overflow-hidden rounded-3xl shadow-2xl bg-white border border-amber-900/10"
                >
                  <Image
                    src={currentItem.image}
                    alt={currentItem.name}
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 550px"
                    className="object-cover object-center"
                    unoptimized
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent pointer-events-none" />

                  {/* Spotlight Bottom Card */}
                  <div className="absolute bottom-4 inset-x-4 bg-white/95 backdrop-blur-md p-4 rounded-2xl border border-slate-200/80 shadow-lg flex items-center justify-between">
                    <div>
                      <span className="text-[9px] uppercase tracking-wider text-[#8c6b2d] font-bold">
                        {currentItem.badge}
                      </span>
                      <h4 className="text-xs font-bold text-slate-900 line-clamp-1">
                        {currentItem.name}
                      </h4>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-sm font-black text-slate-950">
                          {formatPrice(currentItem.salePrice)}
                        </span>
                        <span className="text-[10px] text-slate-400 line-through">
                          {formatPrice(currentItem.price)}
                        </span>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={handleQuickAdd}
                      disabled={isAdded}
                      className={`p-3 rounded-xl transition-all shadow-md active:scale-95 ${
                        isAdded
                          ? 'bg-emerald-600 text-white'
                          : 'bg-slate-950 text-white hover:bg-[#b48a4c] hover:text-slate-950'
                      }`}
                      title="Quick Add to Bag"
                    >
                      {isAdded ? <Check className="w-4 h-4" /> : <ShoppingBag className="w-4 h-4" />}
                    </button>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Floating Glassmorphic Pill: Verified Rating */}
              <div className="absolute top-8 -right-2 sm:right-2 bg-white/95 backdrop-blur-md px-4 py-2 rounded-2xl border border-slate-200/80 shadow-xl flex items-center gap-2.5 z-20">
                <div className="w-8 h-8 rounded-full bg-amber-50 text-[#b48a4c] flex items-center justify-center">
                  <Star className="w-4 h-4 fill-[#b48a4c]" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900 flex items-center gap-1">
                    <span>4.9 / 5.0</span>
                    <span className="text-[10px] text-emerald-600 font-semibold">(50k+ Orders)</span>
                  </div>
                  <div className="text-[10px] text-slate-500 font-medium">Customer Satisfaction</div>
                </div>
              </div>

              {/* Floating Glassmorphic Pill: Nationwide COD */}
              <div className="absolute bottom-6 -left-2 sm:left-2 bg-white/95 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-slate-200/80 shadow-xl flex items-center gap-2.5 z-20">
                <div className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-700 flex items-center justify-center">
                  <Truck className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900">Cash on Delivery</div>
                  <div className="text-[10px] text-slate-500">All Cities Across Pakistan</div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
