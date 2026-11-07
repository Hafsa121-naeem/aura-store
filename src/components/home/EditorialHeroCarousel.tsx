'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, ShoppingBag, Sparkles, Check, ChevronLeft, ChevronRight, Truck } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { fallbackProducts } from '@/lib/data/fallback-data';
import { Product } from '@/lib/types/database';

export default function EditorialHeroCarousel() {
  const { addItem } = useCart();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAdded, setIsAdded] = useState(false);

  const slides = [
    {
      id: 'slide-1',
      kicker: 'DESIGN FOR MODERN LIVING',
      title: 'Art of Style',
      subtitle: 'Engineered for audio connoisseurs and minimalist creators. 45mm beryllium drivers with hybrid noise cancellation.',
      productSlug: 'horizon-pro-anc-wireless-headphones',
      productName: 'Horizon Pro ANC Wireless Headphones',
      price: 24999,
      originalPrice: 28500,
      badgeText: 'FEATURED PICK',
      delivery: 'Free TCS Delivery in Pakistan',
      buttonText: 'View Collection',
      tag: '01 / AUDIO',
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=1600&q=85',
      floatingCardImage: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=800&q=80',
      floatingCardTitle: 'Horizon Pro ANC Headphones',
      accentColor: 'from-amber-900/80 via-slate-900/60 to-slate-950/90',
    },
    {
      id: 'slide-2',
      kicker: 'PRECISION TITANIUM ENGINEERING',
      title: 'Apex of Performance',
      subtitle: 'Aerospace-grade grade 5 titanium case, sapphire crystal AMOLED display with 1000 nits, and 7-day battery life.',
      productSlug: 'apex-ultra-titanium-sapphire-amoled-smartwatch',
      productName: 'Apex Ultra Titanium Smartwatch',
      price: 14999,
      originalPrice: 18999,
      badgeText: 'TOP WEARABLE',
      delivery: 'TCS Dispatch in 24 Hours',
      buttonText: 'Explore Watches',
      tag: '02 / SMARTWATCH',
      image: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=1600&q=85',
      floatingCardImage: 'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=800&q=80',
      floatingCardTitle: 'Apex Ultra Smartwatch',
      accentColor: 'from-blue-950/80 via-slate-900/60 to-slate-950/90',
    },
    {
      id: 'slide-3',
      kicker: 'FRENCH HAUTE PARFUMERIE',
      title: 'Scent of Royalty',
      subtitle: 'Wild Cambodian agarwood, Damascus rose, and dark smoked amber. Handcrafted in Grasse, France with 18+ hour sillage.',
      productSlug: 'royal-oud-imperial-extrait-de-parfum',
      productName: 'Royal Oud Imperial Extrait de Parfum (100ml)',
      price: 12500,
      originalPrice: 16000,
      badgeText: 'FRENCH CRAFT',
      delivery: '100% Authentic Guaranteed',
      buttonText: 'Discover Scents',
      tag: '03 / FRAGRANCE',
      image: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=1600&q=85',
      floatingCardImage: 'https://images.unsplash.com/photo-1523293182086-7651a899d37f?w=800&q=80',
      floatingCardTitle: 'Royal Oud Noir Extrait',
      accentColor: 'from-emerald-950/80 via-slate-900/60 to-slate-950/90',
    },
  ];

  const slide = slides[currentSlide];

  // Auto-advance slides every 6 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
      setIsAdded(false);
    }, 6500);
    return () => clearInterval(timer);
  }, [slides.length]);

  const handleQuickAdd = () => {
    const product = fallbackProducts.find((p: Product) => p.slug === slide.productSlug);
    if (product) {
      addItem(product, 1);
      setIsAdded(true);
      setTimeout(() => setIsAdded(false), 2000);
    }
  };

  return (
    <div className="relative w-full overflow-hidden rounded-3xl bg-slate-950 shadow-2xl">
      {/* Background Hero Image with Zoom and Crossfade */}
      <div className="relative h-[480px] sm:h-[540px] md:h-[600px] lg:h-[640px] w-full">
        <Image
          key={slide.image}
          src={slide.image}
          alt={slide.title}
          fill
          priority
          className="object-cover transition-transform duration-1000 scale-105"
          unoptimized
        />

        {/* Cinematic Gradient Vignette */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30" />

        {/* Content Overlay */}
        <div className="absolute inset-0 max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-14 flex flex-col justify-center">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left: Punchy Editorial Typography */}
            <div className="lg:col-span-7 space-y-4 sm:space-y-6 text-white max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/15 backdrop-blur-md border border-white/25 text-xs font-bold tracking-widest uppercase text-white shadow-sm">
                <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
                <span className="whitespace-nowrap">{slide.kicker}</span>
              </div>

              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight leading-[1.05] text-white">
                {slide.title}
              </h1>

              <p className="text-sm sm:text-base md:text-lg text-slate-200 leading-relaxed font-normal max-w-xl">
                {slide.subtitle}
              </p>

              {/* Action Buttons & Underline Links (Just like NOOK reference!) */}
              <div className="pt-2 flex flex-wrap items-center gap-4 sm:gap-6">
                <Link
                  href={`/products/${slide.productSlug}`}
                  className="bg-white hover:bg-slate-100 text-slate-950 px-7 py-4 rounded-full font-black text-sm flex items-center gap-2 transition-all shadow-xl hover:scale-105 active:scale-95 whitespace-nowrap"
                >
                  <span>{slide.buttonText}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <button
                  type="button"
                  onClick={handleQuickAdd}
                  className={`px-6 py-4 rounded-full text-sm font-bold flex items-center gap-2 transition-all backdrop-blur-md border ${
                    isAdded
                      ? 'bg-emerald-600 border-emerald-500 text-white'
                      : 'bg-white/10 hover:bg-white/20 border-white/30 text-white'
                  }`}
                >
                  {isAdded ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Added to Cart!</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4" />
                      <span>Instant Buy • Rs. {slide.price.toLocaleString('en-PK')}</span>
                    </>
                  )}
                </button>
              </div>

              {/* Delivery Promise */}
              <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 pt-1">
                <Truck className="w-4 h-4" />
                <span>{slide.delivery}</span>
                <span className="text-slate-400">•</span>
                <span className="text-slate-300">Cash on Delivery Available</span>
              </div>
            </div>

            {/* Right: Floating Layered Showcase Card with Starburst Badge (Modeled on Casa Media Reference 1!) */}
            <div className="hidden lg:flex lg:col-span-5 justify-end">
              <div className="relative group">
                {/* Starburst / Stamp Badge */}
                <div className="absolute -top-4 -right-4 z-20 bg-rose-600 text-white font-black text-[11px] px-3.5 py-1.5 rounded-full shadow-xl uppercase tracking-wider transform rotate-6 border-2 border-white animate-pulse">
                  {slide.badgeText}
                </div>

                {/* Floating Card Frame */}
                <div className="w-72 xl:w-80 bg-white/95 backdrop-blur-xl p-4 rounded-3xl border border-white/50 shadow-2xl transition-all duration-500 group-hover:-translate-y-2 group-hover:shadow-3xl">
                  <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-slate-100">
                    <Image
                      src={slide.floatingCardImage}
                      alt={slide.floatingCardTitle}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      unoptimized
                    />
                  </div>

                  <div className="mt-3.5 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-black uppercase tracking-wider text-indigo-600">
                        {slide.tag}
                      </span>
                      <span className="bg-emerald-100 text-emerald-800 text-[10px] font-extrabold px-2 py-0.5 rounded-full">
                        In Stock (COD)
                      </span>
                    </div>

                    <h4 className="text-sm font-black text-slate-900 truncate">
                      {slide.floatingCardTitle}
                    </h4>

                    <div className="flex items-baseline justify-between pt-1">
                      <span className="text-base font-black text-slate-950">
                        Rs. {slide.price.toLocaleString('en-PK')}
                      </span>
                      <span className="text-xs text-slate-600 line-through">
                        Rs. {slide.originalPrice.toLocaleString('en-PK')}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Carousel Slider Navigation Controls (Bottom Bar) */}
        <div className="absolute bottom-6 left-0 right-0 max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-14 flex items-center justify-between">
          {/* Navigation Dots (• ○ ○) */}
          <div className="flex items-center space-x-2 bg-black/40 backdrop-blur-md px-4 py-2 rounded-full border border-white/10">
            {slides.map((s, idx) => (
              <button
                key={s.id}
                type="button"
                onClick={() => {
                  setCurrentSlide(idx);
                  setIsAdded(false);
                }}
                className={`transition-all rounded-full ${
                  currentSlide === idx
                    ? 'w-7 h-2 bg-white'
                    : 'w-2 h-2 bg-white/40 hover:bg-white/70'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>

          {/* Prev / Next Chevrons */}
          <div className="flex items-center space-x-2">
            <button
              type="button"
              onClick={() => {
                setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
                setIsAdded(false);
              }}
              className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/40 backdrop-blur-md text-white flex items-center justify-center transition-all border border-white/20 active:scale-95"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={() => {
                setCurrentSlide((prev) => (prev + 1) % slides.length);
                setIsAdded(false);
              }}
              className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/40 backdrop-blur-md text-white flex items-center justify-center transition-all border border-white/20 active:scale-95"
              aria-label="Next slide"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}