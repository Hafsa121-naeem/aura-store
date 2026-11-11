'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'motion/react';
import { ShoppingBag, Check, ArrowRight, Star, Sparkles } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { formatPrice } from '@/lib/utils';

export default function HeroShowcase() {
  const { addItem, setIsCartOpen } = useCart();
  const [activeItemIndex, setActiveItemIndex] = useState(0);
  const [isAdded, setIsAdded] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [activeTag, setActiveTag] = useState('ALL');
  const [activeHeroHotspot, setActiveHeroHotspot] = useState<string | null>(null);

  // Animation 1: Framer-inspired 3D Cursor Tilt Physics
  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 20, stiffness: 160 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [12, -12]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-12, 12]), springConfig);

  const handleCardMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleCardMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

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
      category: 'Electronics & Audio',
      productImage: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=800&q=80',
      bgImage: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1800&q=85',
      badge: 'Object 01 • Acoustic Sculpture',
      material: 'Beryllium Drivers & Protein Leather',
      hotspotLabel: '42dB Hybrid ANC Mics',
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
      category: 'Precision Horology',
      productImage: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80',
      bgImage: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1800&q=85',
      badge: 'Object 02 • Horological Instrument',
      material: 'Aerospace Titanium & Sapphire Crystal',
      hotspotLabel: 'Curved AMOLED Display',
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
      category: 'Sartorial Wardrobe',
      productImage: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800&q=80',
      bgImage: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1800&q=85',
      badge: 'Object 03 • Handcrafted Leather',
      material: 'Full-Grain Tuscan Calfskin',
      hotspotLabel: 'Solid Gold Clasp Hardware',
    },
  ];

  // Animation 2: Auto-cycling Editorial Showcase Carousel
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setActiveItemIndex((prev) => (prev + 1) % heroItems.length);
    }, 5500);
    return () => clearInterval(timer);
  }, [isPaused, heroItems.length]);

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
        images: [{ id: '1', product_id: currentItem.id, image_url: currentItem.productImage, is_primary: true }],
      } as any,
      1,
      undefined,
      undefined,
      currentItem.productImage
    );
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
      setIsCartOpen(true);
    }, 500);
  };

  return (
    <section
      className="relative w-full bg-[#FAF8F5] overflow-hidden select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      
      {/* 1. ferm LIVING Signature Atmospheric Cinematic Hero Stage */}
      <div className="relative w-full h-[78vh] sm:h-[84vh] min-h-[580px] max-h-[820px] bg-[#1A1918] overflow-hidden">
        
        {/* Background Atmospheric Luxury Shopaholic Lifestyle Photograph with Smooth Zoom Crossfade */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentItem.id}
            initial={{ opacity: 0, scale: 1.06 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0"
          >
            <Image
              src={currentItem.bgImage}
              alt="AURA Luxury Shopping Atmosphere"
              fill
              priority
              sizes="100vw"
              className="object-cover object-center brightness-[0.70] contrast-105"
              unoptimized
            />
            {/* Cinematic Film Vignette & Moody Lighting Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#1A1918]/95 via-[#1A1918]/40 to-black/50" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#1A1918]/85 via-[#1A1918]/30 to-black/40" />
          </motion.div>
        </AnimatePresence>

        {/* Animation 3: Interactive Hotspot Popping Pins directly on Hero Scene */}
        <div className="absolute left-[32%] top-[38%] z-20 hidden md:block">
          <button
            type="button"
            onClick={() => setActiveHeroHotspot(activeHeroHotspot === 'pin1' ? null : 'pin1')}
            onMouseEnter={() => setActiveHeroHotspot('pin1')}
            className="group relative flex items-center justify-center w-8 h-8 rounded-full bg-white/20 backdrop-blur-md border border-white/60 text-white shadow-2xl hover:scale-115 transition-transform"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#E8D4B0]" />
            <span className="absolute inset-[-4px] rounded-full border border-white/80 animate-ping opacity-60 pointer-events-none" />
          </button>

          <AnimatePresence>
            {activeHeroHotspot === 'pin1' && (
              <motion.div
                initial={{ opacity: 0, y: 8, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.95 }}
                className="absolute left-full top-1/2 -translate-y-1/2 ml-3 bg-[#FAF8F5] text-[#1A1918] p-3 border border-[#D8D2C6] shadow-2xl w-52 z-30 space-y-1"
              >
                <span className="text-[9px] uppercase tracking-wider font-mono text-[#806B43] block">
                  Curated Craftsmanship
                </span>
                <p className="text-xs font-editorial font-normal">
                  {currentItem.hotspotLabel}
                </p>
                <span className="text-[10px] text-[#8C867D] block font-mono">
                  100% Verified Quality
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Hero Content Container */}
        <div className="relative z-10 h-full max-w-[1540px] mx-auto px-6 sm:px-10 flex flex-col justify-between py-10 sm:py-16">
          
          {/* Top Row: Collection Sub-indicator & Item Switchers with Animated Progress Bar */}
          <div className="flex items-center justify-between">
            <span className="text-[11px] uppercase tracking-[0.28em] font-light text-[#E8D4B0]">
              Autumn / Winter Edit &bull; Collection 04
            </span>

            {/* Subtle Object Switchers with Animated Story Timeline */}
            <div className="flex items-center gap-2 bg-black/40 backdrop-blur-md p-1.5 border border-white/10">
              {heroItems.map((item, idx) => {
                const isActive = activeItemIndex === idx;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setActiveItemIndex(idx)}
                    className={`relative text-[10px] font-mono tracking-wider px-3 py-1 transition-all overflow-hidden ${
                      isActive
                        ? 'bg-white/20 text-[#FAF8F5] font-semibold'
                        : 'text-[#EDE8DF]/60 hover:text-white'
                    }`}
                  >
                    <span>0{idx + 1}</span>
                    {/* Animated Progress Line */}
                    {isActive && !isPaused && (
                      <motion.div
                        initial={{ width: '0%' }}
                        animate={{ width: '100%' }}
                        transition={{ duration: 5.5, ease: 'linear' }}
                        className="absolute bottom-0 left-0 h-[2px] bg-[#E8D4B0]"
                      />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Center-Right: Editorial Poetic Headline & Underline CTA */}
          <div className="max-w-2xl my-auto space-y-6">
            <div className="space-y-3">
              <span className="text-xs uppercase tracking-[0.3em] font-light text-[#E0D8CB] block">
                Ny kollektion &bull; The Mindful Living Space
              </span>
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-editorial font-light text-[#FAF8F5] leading-[1.08] tracking-tight">
                A life of contrasts: <br />
                <span className="italic font-normal text-[#E8D4B0]">Curated for the modern space</span>
              </h1>
            </div>

            <div className="flex items-center gap-8 pt-2">
              <Link
                href="/products"
                className="text-xs uppercase tracking-[0.24em] font-light text-[#FAF8F5] hover:text-[#E8D4B0] underline underline-offset-8 transition-colors"
              >
                Udforsk nu &bull; Explore collection &rarr;
              </Link>

              <a
                href="#scene"
                className="text-xs uppercase tracking-[0.22em] font-light text-[#EDE8DF]/80 hover:text-white transition-colors"
              >
                Shop The Scene
              </a>
            </div>
          </div>

          {/* Bottom Floating Architectural Product Card (Animation 1: 3D Kinetic Tilt Physics) */}
          <div
            ref={cardRef}
            onMouseMove={handleCardMouseMove}
            onMouseLeave={handleCardMouseLeave}
            style={{ perspective: 1100 }}
            className="self-start sm:self-end max-w-sm w-full cursor-pointer"
          >
            <motion.div
              style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
              className="bg-[#FAF8F5]/95 backdrop-blur-md p-5 sm:p-6 border border-[#D8D2C6] shadow-2xl space-y-3 transition-shadow duration-300 hover:shadow-[0_25px_60px_-15px_rgba(0,0,0,0.3)]"
            >
              {/* Floating Header */}
              <div className="flex items-center justify-between" style={{ transform: 'translateZ(20px)' }}>
                <span className="text-[10px] uppercase tracking-[0.24em] text-[#806B43] font-medium">
                  {currentItem.badge}
                </span>
                <span className="text-[10px] text-[#5C5852] font-mono">
                  {currentItem.material}
                </span>
              </div>

              {/* Product Thumbnail & Details */}
              <div className="flex items-center gap-3.5" style={{ transform: 'translateZ(30px)' }}>
                <div className="relative w-16 h-16 bg-[#EDE8DF] border border-[#D8D2C6] overflow-hidden shrink-0">
                  <Image
                    src={currentItem.productImage}
                    alt={currentItem.name}
                    fill
                    sizes="70px"
                    className="object-cover"
                    unoptimized
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm sm:text-base font-editorial font-normal text-[#1A1918] truncate">
                    {currentItem.name}
                  </h3>
                  <p className="text-[10px] text-[#5C5852] font-light line-clamp-1">
                    {currentItem.tagline}
                  </p>
                </div>
              </div>

              {/* Price & Action */}
              <div className="pt-3 flex items-baseline justify-between hairline-t" style={{ transform: 'translateZ(25px)' }}>
                <div className="flex items-baseline gap-2">
                  <span className="text-base font-light text-[#1A1918]">
                    {formatPrice(currentItem.salePrice)}
                  </span>
                  <span className="text-xs text-[#8C867D] line-through">
                    {formatPrice(currentItem.price)}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={handleQuickAdd}
                  disabled={isAdded}
                  className="text-xs uppercase tracking-[0.2em] font-medium text-[#1A1918] hover:text-[#806B43] flex items-center gap-1.5 transition-colors disabled:opacity-50"
                >
                  {isAdded ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Added</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>Add to Bag &rarr;</span>
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          </div>

        </div>
      </div>

      {/* 2. ferm LIVING "Featured Products" Header & Filter Bar */}
      <div className="hairline-b bg-[#F5F2EB] py-4 sm:py-5 px-6 sm:px-10">
        <div className="max-w-[1540px] mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          
          <div className="flex items-baseline gap-3">
            <h2 className="text-sm uppercase tracking-[0.24em] font-light text-[#1A1918]">
              Featured products
            </h2>
            <span className="text-[11px] text-[#8C867D] font-mono">
              (76 Mindfully Curated Objects)
            </span>
          </div>

          {/* Minimalist Architectural Tags */}
          <div className="flex flex-wrap items-center gap-2 text-[10px] font-mono uppercase tracking-wider text-[#5C5852]">
            {[
              { id: 'ALL', label: 'ALL OBJECTS' },
              { id: 'NEW', label: 'NYHED / NEW IN' },
              { id: 'RESPONSIBLE', label: 'RESPONSIBLE' },
              { id: 'BESTSELLER', label: 'BESTSELLER' },
              { id: 'COD', label: 'DOORSTEP COD' },
            ].map((tag) => (
              <button
                key={tag.id}
                type="button"
                onClick={() => setActiveTag(tag.id)}
                className={`px-3 py-1 border transition-colors ${
                  activeTag === tag.id
                    ? 'border-[#1A1918] bg-[#1A1918] text-[#FAF8F5]'
                    : 'border-[#D8D2C6] bg-transparent hover:border-[#1A1918] text-[#5C5852]'
                }`}
              >
                {tag.label}
              </button>
            ))}
          </div>

        </div>
      </div>

    </section>
  );
}
