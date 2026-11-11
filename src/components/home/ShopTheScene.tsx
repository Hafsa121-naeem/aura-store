'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingBag, Check, Plus, ArrowRight, Eye } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { formatPrice } from '@/lib/utils';

export default function ShopTheScene() {
  const { addItem, setIsCartOpen } = useCart();
  const [activeSceneIndex, setActiveSceneIndex] = useState(0);
  const [activeHotspotId, setActiveHotspotId] = useState<string | null>('hs-1');
  const [addedId, setAddedId] = useState<string | null>(null);

  const scenes = [
    {
      id: 'study',
      title: 'The Modern Study',
      subtitle: 'A room shaped by quiet discipline, acoustic isolation, and tactile materials.',
      image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=1600&q=85',
      hotspots: [
        {
          id: 'hs-1',
          x: '38%',
          y: '48%',
          number: '01',
          name: 'Horizon Pro ANC Hybrid Headphones',
          category: 'Acoustic Chamber',
          price: 22499,
          originalPrice: 26999,
          image: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=600&q=80',
          slug: 'horizon-pro-anc-hybrid-wireless-headphones',
          description: 'Custom 40mm beryllium drivers with memory foam protein leather.',
        },
        {
          id: 'hs-2',
          x: '64%',
          y: '62%',
          number: '02',
          name: 'Apex Ultra Titanium Smartwatch',
          category: 'Precision Timepieces',
          price: 16999,
          originalPrice: 21999,
          image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&q=80',
          slug: 'apex-titanium-sapphire-amoled-smartwatch',
          description: 'Aerospace grade titanium case with sapphire AMOLED display.',
        },
        {
          id: 'hs-3',
          x: '24%',
          y: '72%',
          number: '03',
          name: 'Verona Handcrafted Calfskin Handbag',
          category: 'Luxury Fashion',
          price: 19999,
          originalPrice: 24999,
          image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=600&q=80',
          slug: 'verona-italian-calfskin-handbag',
          description: 'Full-grain calfskin leather with solid gold-plated hardware.',
        },
      ],
    },
    {
      id: 'living',
      title: 'The Living Sanctuary',
      subtitle: 'Warm limestone, ceramic vessels, and botanical serums for peaceful evenings.',
      image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1600&q=85',
      hotspots: [
        {
          id: 'hs-4',
          x: '46%',
          y: '54%',
          number: '01',
          name: 'Cordless Ceramic Table Lamp',
          category: 'Living Space',
          price: 9499,
          originalPrice: 12499,
          image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&q=80',
          slug: 'cordless-rechargeable-mushroom-table-lamp',
          description: 'Hand-thrown matte ceramic base with woven natural flax shade.',
        },
        {
          id: 'hs-5',
          x: '72%',
          y: '42%',
          number: '02',
          name: 'Luminance Vitamin C Radiance Elixir',
          category: 'Botanical & Scent',
          price: 7899,
          originalPrice: 9999,
          image: 'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=600&q=80',
          slug: 'luminance-vitamin-c-radiance-elixir',
          description: 'Concentrated peptide complex formulated with cold-pressed rosehip.',
        },
      ],
    },
  ];

  const currentScene = scenes[activeSceneIndex];

  const handleHotspotAdd = (spot: typeof currentScene.hotspots[0]) => {
    addItem(
      {
        id: spot.id,
        name: spot.name,
        slug: spot.slug,
        price: spot.originalPrice,
        sale_price: spot.price,
        category_id: spot.category.toLowerCase().replace(/\s+/g, '-'),
        stock: 20,
        rating: 4.9,
        review_count: 50,
        status: 'published',
        featured: true,
        images: [{ id: '1', product_id: spot.id, image_url: spot.image, is_primary: true }],
      } as any,
      1,
      undefined,
      undefined,
      spot.image
    );
    setAddedId(spot.id);
    setTimeout(() => {
      setAddedId(null);
      setIsCartOpen(true);
    }, 500);
  };

  return (
    <section id="scene" className="py-20 sm:py-28 bg-[#F5F2EB] hairline-b">
      <div className="max-w-[1540px] mx-auto px-6 sm:px-10">
        
        {/* Section Header: ferm LIVING Poetic Headline */}
        <div className="flex flex-col md:flex-row md:items-end justify-between pb-8 sm:pb-12 hairline-b gap-6">
          <div className="space-y-3 max-w-2xl">
            <span className="text-[11px] uppercase tracking-[0.28em] font-light text-[#8C867D] block">
              Inspiration &bull; Rooms &amp; Spaces
            </span>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-editorial font-light text-[#1A1918] leading-[1.08]">
              Shop The Scene: <br />
              <span className="italic font-normal text-[#806B43]">Architectural spaces, mindfully lived</span>
            </h2>
            <p className="text-xs sm:text-sm text-[#5C5852] font-light leading-relaxed">
              Explore how our curated audio gear, titanium timepieces, and handcrafted leather live together in quiet domestic harmony. Hover or tap the pins to discover and acquire each object.
            </p>
          </div>

          {/* Scene Switcher Tabs */}
          <div className="flex items-center gap-3">
            {scenes.map((scene, idx) => (
              <button
                key={scene.id}
                type="button"
                onClick={() => {
                  setActiveSceneIndex(idx);
                  setActiveHotspotId(scene.hotspots[0]?.id || null);
                }}
                className={`px-5 py-2.5 text-xs uppercase tracking-[0.2em] font-light transition-all border ${
                  activeSceneIndex === idx
                    ? 'border-[#1A1918] bg-[#1A1918] text-[#FAF8F5]'
                    : 'border-[#D8D2C6] bg-transparent text-[#5C5852] hover:border-[#1A1918]'
                }`}
              >
                {scene.title}
              </button>
            ))}
          </div>
        </div>

        {/* Interactive Scene Canvas */}
        <div className="relative mt-10 w-full aspect-[4/3] sm:aspect-[16/9] lg:aspect-[21/10] bg-[#EDE8DF] overflow-hidden border border-[#D8D2C6] shadow-sm">
          
          {/* Room Scene Image */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentScene.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
              className="absolute inset-0"
            >
              <Image
                src={currentScene.image}
                alt={currentScene.title}
                fill
                sizes="(max-width: 1540px) 100vw, 1540px"
                className="object-cover object-center"
                unoptimized
              />
              <div className="absolute inset-0 bg-black/15 pointer-events-none" />
            </motion.div>
          </AnimatePresence>

          {/* Interactive Hotspot Pins */}
          {currentScene.hotspots.map((spot) => {
            const isActive = activeHotspotId === spot.id;
            return (
              <div
                key={spot.id}
                style={{ left: spot.x, top: spot.y }}
                className="absolute -translate-x-1/2 -translate-y-1/2 z-20"
              >
                {/* Hotspot Pulse Circle Button */}
                <button
                  type="button"
                  onClick={() => setActiveHotspotId(isActive ? null : spot.id)}
                  onMouseEnter={() => setActiveHotspotId(spot.id)}
                  className={`group relative flex items-center justify-center w-9 h-9 sm:w-11 sm:h-11 rounded-full border transition-all duration-300 shadow-xl ${
                    isActive
                      ? 'bg-[#1A1918] text-[#FAF8F5] border-[#FAF8F5] scale-110'
                      : 'bg-[#FAF8F5]/90 backdrop-blur-md text-[#1A1918] border-[#D8D2C6] hover:bg-[#1A1918] hover:text-[#FAF8F5]'
                  }`}
                  aria-label={`View ${spot.name}`}
                >
                  <span className="text-[11px] font-mono font-medium">{spot.number}</span>
                  {/* Subtle Radar Ring */}
                  <span className="absolute inset-[-4px] rounded-full border border-white/60 animate-ping opacity-60 pointer-events-none" />
                </button>

                {/* Floating Product Popover Card */}
                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="absolute left-1/2 -translate-x-1/2 sm:left-full sm:translate-x-4 top-12 sm:top-1/2 sm:-translate-y-1/2 w-72 sm:w-80 bg-[#FAF8F5] border border-[#D8D2C6] p-4 sm:p-5 shadow-2xl z-30"
                    >
                      <div className="flex gap-4">
                        <div className="relative w-20 h-20 bg-[#EDE8DF] border border-[#D8D2C6]/60 shrink-0 overflow-hidden">
                          <Image
                            src={spot.image}
                            alt={spot.name}
                            fill
                            sizes="80px"
                            className="object-cover"
                            unoptimized
                          />
                        </div>

                        <div className="flex-1 space-y-1">
                          <span className="text-[9px] uppercase tracking-[0.24em] text-[#806B43] font-medium block">
                            {spot.category}
                          </span>
                          <h4 className="text-xs sm:text-sm font-editorial text-[#1A1918] line-clamp-1">
                            {spot.name}
                          </h4>
                          <p className="text-[10px] text-[#5C5852] font-light line-clamp-2">
                            {spot.description}
                          </p>
                        </div>
                      </div>

                      <div className="mt-3 pt-3 hairline-t flex items-center justify-between">
                        <div className="flex items-baseline gap-2">
                          <span className="text-sm font-light text-[#1A1918]">
                            {formatPrice(spot.price)}
                          </span>
                          <span className="text-[10px] text-[#8C867D] line-through">
                            {formatPrice(spot.originalPrice)}
                          </span>
                        </div>

                        <div className="flex items-center gap-2">
                          <Link
                            href={`/products/${spot.slug}`}
                            className="p-2 border border-[#D8D2C6] hover:border-[#1A1918] text-[#1A1918] transition-colors"
                            title="Inspect Object"
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </Link>

                          <button
                            type="button"
                            onClick={() => handleHotspotAdd(spot)}
                            disabled={addedId === spot.id}
                            className="px-3 py-1.5 bg-[#1A1918] hover:bg-[#806B43] text-[#FAF8F5] text-[10px] uppercase tracking-[0.18em] font-light flex items-center gap-1 transition-colors"
                          >
                            {addedId === spot.id ? (
                              <>
                                <Check className="w-3 h-3 text-emerald-400" />
                                <span>Added</span>
                              </>
                            ) : (
                              <>
                                <ShoppingBag className="w-3 h-3" />
                                <span>Bag</span>
                              </>
                            )}
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}

        </div>

        {/* Reassurance Footer of Scene */}
        <div className="mt-6 flex flex-wrap items-center justify-between text-xs text-[#5C5852] font-light tracking-wider gap-4">
          <div className="flex items-center gap-6">
            <span>&bull; Hand-inspected before dispatch</span>
            <span>&bull; Official Pakistani Brand Warranty</span>
            <span>&bull; Doorstep Cash on Delivery</span>
          </div>

          <Link
            href="/products"
            className="text-xs uppercase tracking-[0.24em] text-[#1A1918] hover:text-[#806B43] transition-colors underline underline-offset-8"
          >
            Explore all 76 catalog objects &rarr;
          </Link>
        </div>

      </div>
    </section>
  );
}
