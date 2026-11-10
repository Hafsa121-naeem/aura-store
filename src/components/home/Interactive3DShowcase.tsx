'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'motion/react';
import {
  Sparkles,
  Maximize2,
  Volume2,
  ShieldCheck,
  BatteryCharging,
  Layers,
  ArrowRight,
  ShoppingBag,
  Check,
  Eye,
  RotateCw,
} from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { formatPrice } from '@/lib/utils';

export default function Interactive3DShowcase() {
  const { addItem, setIsCartOpen } = useCart();
  const [activeAngleIndex, setActiveAngleIndex] = useState(0);
  const [isAdded, setIsAdded] = useState(false);
  const [activeHotspot, setActiveHotspot] = useState<number | null>(null);

  const angles = [
    {
      id: 'angle-front',
      label: 'Acoustic Profile',
      tag: 'Angle 01 &bull; Studio Horizon',
      image: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=1200&q=85',
      title: 'Horizon Pro ANC Hybrid Headphones',
      description: 'Aerodynamic obsidian earcups with custom acoustic chambers and laser-etched champagne gold rings.',
      hotspots: [
        { id: 1, x: '35%', y: '48%', label: '40mm Beryllium Driver', detail: 'Audiophile response: 10Hz – 40,000Hz' },
        { id: 2, x: '68%', y: '62%', label: '42dB Hybrid ANC', detail: 'Dual feedforward & feedback noise mics' },
        { id: 3, x: '50%', y: '18%', label: 'Memory Foam Leather', detail: 'Handcrafted pressure-relief headband' },
      ],
    },
    {
      id: 'angle-lifestyle',
      label: 'Lifestyle In-Use',
      tag: 'Angle 02 &bull; Ergo Fit',
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=1200&q=85',
      title: 'Precision Ergonomics & Zero Fatigue',
      description: 'Balanced 265g weight distribution engineered for 12+ hours of continuous studio mixing or intercity flights.',
      hotspots: [
        { id: 1, x: '52%', y: '40%', label: 'Protein Leather', detail: 'Zero-heat breathable ear cushions' },
        { id: 2, x: '75%', y: '70%', label: 'Tactile Controls', detail: 'Milled aluminum dial for volume & ANC' },
      ],
    },
    {
      id: 'angle-detail',
      label: 'Driver Diaphragm',
      tag: 'Angle 03 &bull; Core Macro',
      image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=1200&q=85',
      title: 'Aerospace-Grade Beryllium Diaphragm',
      description: 'Ultra-rigid yet lightweight driver minimizes harmonic distortion to under 0.05% THD across all frequencies.',
      hotspots: [
        { id: 1, x: '45%', y: '50%', label: 'Neodymium N52', detail: 'High-flux dual magnetic circuit' },
        { id: 2, x: '30%', y: '65%', label: 'Copper Voice Coil', detail: 'OFC ultra-fine Japanese winding' },
      ],
    },
    {
      id: 'angle-travel',
      label: 'Travel Case',
      tag: 'Angle 04 &bull; Sealed Kit',
      image: 'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=1200&q=85',
      title: 'Sealed Hard-Shell Travel Companion',
      description: 'Includes braided 3.5mm OFC cable, gold-plated 6.35mm adapter, airline connector and USB-C rapid charge cable.',
      hotspots: [
        { id: 1, x: '50%', y: '55%', label: 'EVA Hard-Shell', detail: 'Water-repellent ballistic nylon armor' },
      ],
    },
  ];

  const current = angles[activeAngleIndex];

  const handleAddToCart = () => {
    addItem(
      {
        id: 'el-ha-01',
        name: 'Horizon Pro ANC Hybrid Wireless Over-Ear Headphones',
        slug: 'horizon-pro-anc-hybrid-wireless-headphones',
        price: 26999,
        sale_price: 22499,
        category_id: 'c1-electronics',
        stock: 28,
        rating: 4.9,
        review_count: 74,
        status: 'published',
        featured: true,
        images: [{ id: '1', product_id: 'el-ha-01', image_url: current.image, is_primary: true }],
      } as any,
      1,
      'Space Grey',
      undefined,
      current.image
    );
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
      setIsCartOpen(true);
    }, 600);
  };

  return (
    <section className="py-20 sm:py-28 bg-[#FAF7F2] border-y border-amber-900/10 relative overflow-hidden">
      {/* Ambient Champagne Luminous Glows */}
      <div className="absolute -top-32 right-1/4 w-[600px] h-[600px] rounded-full bg-gradient-to-b from-[#faebd7] to-[#f4e2cb] blur-3xl opacity-50 pointer-events-none" />
      <div className="absolute -bottom-32 left-10 w-[500px] h-[500px] rounded-full bg-[#fbf5ed] blur-3xl opacity-60 pointer-events-none" />

      <div className="max-w-[1480px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#b48a4c]/30 text-[#8c6b2d] text-[10px] uppercase tracking-[0.24em] font-bold shadow-2xs">
              <RotateCw className="w-3.5 h-3.5 text-[#b48a4c] animate-spin-slow" />
              <span>Interactive 3D Visual Inspection</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light font-serif text-slate-950 tracking-tight">
              Explore Every Dimension
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 max-w-xl font-normal">
              Click any angle below to inspect the acoustic anatomy, materials, and artisan finish of our flagship audio masterpiece.
            </p>
          </div>

          {/* Interactive Angle Switchers */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0">
            {angles.map((ang, idx) => (
              <button
                key={ang.id}
                type="button"
                onClick={() => {
                  setActiveAngleIndex(idx);
                  setActiveHotspot(null);
                }}
                className={`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all whitespace-nowrap flex items-center gap-1.5 ${
                  activeAngleIndex === idx
                    ? 'bg-slate-950 text-white shadow-md'
                    : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200'
                }`}
              >
                <span>{ang.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* 3D Showcase Stage */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white rounded-3xl border border-slate-200/90 shadow-xl p-6 sm:p-10 lg:p-12 relative overflow-hidden">
          
          {/* Main Visual Display with Animated Transitions and Hotspots */}
          <div className="lg:col-span-7 relative">
            <div className="relative aspect-[4/3] sm:aspect-[16/11] w-full rounded-2xl overflow-hidden bg-[#FAF7F2] border border-amber-900/10 shadow-inner">
              <AnimatePresence mode="wait">
                <motion.div
                  key={current.id}
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.45 }}
                  className="relative w-full h-full"
                >
                  <Image
                    src={current.image}
                    alt={current.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 700px"
                    className="object-cover object-center"
                    unoptimized
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent pointer-events-none" />

                  {/* Interactive Hotspots */}
                  {current.hotspots.map((h) => (
                    <div
                      key={h.id}
                      style={{ top: h.y, left: h.x }}
                      className="absolute -translate-x-1/2 -translate-y-1/2 z-20 group"
                    >
                      <button
                        type="button"
                        onClick={() => setActiveHotspot(activeHotspot === h.id ? null : h.id)}
                        className="relative w-7 h-7 rounded-full bg-white/95 text-slate-950 flex items-center justify-center shadow-lg border border-[#b48a4c] hover:scale-110 transition-transform"
                        aria-label={h.label}
                      >
                        <span className="w-2.5 h-2.5 rounded-full bg-[#b48a4c] animate-ping absolute inset-0 m-auto opacity-75" />
                        <span className="w-2.5 h-2.5 rounded-full bg-[#b48a4c] relative z-10" />
                      </button>

                      {/* Tooltip Card */}
                      <div
                        className={`absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 p-3 rounded-xl bg-slate-950 text-white text-[11px] shadow-2xl transition-all pointer-events-none ${
                          activeHotspot === h.id ? 'opacity-100 scale-100' : 'opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100'
                        }`}
                      >
                        <span className="text-[#e2c799] font-bold block">{h.label}</span>
                        <span className="text-slate-300 font-normal mt-0.5 block">{h.detail}</span>
                      </div>
                    </div>
                  ))}
                </motion.div>
              </AnimatePresence>

              {/* Tag in Top Left */}
              <div className="absolute top-4 left-4 z-10 px-3 py-1 rounded-full bg-white/90 backdrop-blur-md border border-slate-200 text-slate-900 text-[10px] font-bold uppercase tracking-wider shadow-2xs">
                <span dangerouslySetInnerHTML={{ __html: current.tag }} />
              </div>
            </div>
          </div>

          {/* Right Column: Narrative & Technical Breakdown */}
          <div className="lg:col-span-5 space-y-6 flex flex-col justify-between">
            <div className="space-y-3">
              <span className="text-[10px] uppercase font-bold tracking-[0.24em] text-[#8c6b2d]">
                Audiophile Benchmark &bull; Model AUR-EL-001
              </span>
              <h3 className="text-2xl sm:text-3xl font-light font-serif text-slate-950 leading-snug">
                {current.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                {current.description}
              </p>
            </div>

            {/* Technical Metric Cards */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-amber-900/10 space-y-1">
                <div className="flex items-center gap-1.5 text-xs font-bold text-slate-900">
                  <Volume2 className="w-3.5 h-3.5 text-[#b48a4c]" />
                  <span>LDAC Hi-Res</span>
                </div>
                <p className="text-[11px] text-slate-500 font-normal">
                  990kbps 24-bit/96kHz wireless fidelity.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-amber-900/10 space-y-1">
                <div className="flex items-center gap-1.5 text-xs font-bold text-slate-900">
                  <BatteryCharging className="w-3.5 h-3.5 text-[#b48a4c]" />
                  <span>50H Battery</span>
                </div>
                <p className="text-[11px] text-slate-500 font-normal">
                  Full week of playback with ANC enabled.
                </p>
              </div>
            </div>

            {/* Price & Action */}
            <div className="space-y-4 pt-4 border-t border-slate-100">
              <div className="flex items-baseline justify-between">
                <div>
                  <div className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
                    {formatPrice(22499)}
                  </div>
                  <div className="text-xs text-slate-400 line-through">
                    Regular: {formatPrice(26999)} &bull; Save Rs. 4,500
                  </div>
                </div>
                <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">
                  COD Verified
                </span>
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={handleAddToCart}
                  disabled={isAdded}
                  className={`flex-1 py-3.5 px-6 rounded-2xl text-xs font-bold uppercase tracking-[0.2em] flex items-center justify-center gap-2 transition-all shadow-md active:scale-98 ${
                    isAdded
                      ? 'bg-emerald-600 text-white'
                      : 'bg-slate-950 text-white hover:bg-[#b48a4c] hover:text-slate-950'
                  }`}
                >
                  {isAdded ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Added to Bag</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4" />
                      <span>Add to Bag</span>
                    </>
                  )}
                </button>

                <Link
                  href="/products/horizon-pro-anc-hybrid-wireless-headphones"
                  className="px-5 py-3.5 rounded-2xl border border-slate-300 text-slate-800 hover:text-slate-950 hover:border-slate-500 text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-1.5"
                >
                  <span>Specs</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
