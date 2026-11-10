'use client';

import React, { useState, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'motion/react';
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

  // Framer-inspired 3D Tilt Physics
  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 20, stiffness: 150 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [10, -10]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-10, 10]), springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const angles = [
    {
      id: 'angle-front',
      label: 'Acoustic Architecture',
      tag: '01 &bull; STUDIO HORIZON',
      image: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=1200&q=85',
      title: 'Horizon Pro ANC Hybrid Headphones',
      description: 'Milled acoustic chambers with custom laser-etched champagne rings and beryllium acoustic suspension.',
      hotspots: [
        { id: 1, x: '35%', y: '48%', label: '40mm Beryllium Driver', detail: 'Frequency response: 10Hz – 40,000Hz' },
        { id: 2, x: '68%', y: '62%', label: '42dB Hybrid ANC', detail: 'Dual feedforward & feedback mics' },
        { id: 3, x: '50%', y: '18%', label: 'Memory Foam Leather', detail: 'Zero-pressure architectural headband' },
      ],
      specs: [
        { label: 'THD DISTORTION', value: '< 0.05%' },
        { label: 'BATTERY RESERVE', value: '55 Hours' },
        { label: 'WEIGHT', value: '265g' },
      ],
    },
    {
      id: 'angle-lifestyle',
      label: 'Ergonomic Form',
      tag: '02 &bull; PRESSURE DISSIPATION',
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=1200&q=85',
      title: 'Balanced Mass & Zero Fatigue',
      description: 'Engineered for all-day listening sessions, transatlantic flights, and precision audio editing.',
      hotspots: [
        { id: 1, x: '52%', y: '40%', label: 'Protein Leather', detail: 'Breathable, thermal-regulating cushions' },
        { id: 2, x: '75%', y: '70%', label: 'Tactile Controls', detail: 'Solid aluminum volume dial' },
      ],
      specs: [
        { label: 'CLAMPING FORCE', value: '4.2 Newtons' },
        { label: 'LATENCY', value: '28ms (AptX LL)' },
        { label: 'BLUETOOTH', value: 'v5.3 Multi-Point' },
      ],
    },
    {
      id: 'angle-detail',
      label: 'Core Diaphragm',
      tag: '03 &bull; ACOUSTIC CORE',
      image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=1200&q=85',
      title: 'Vapor-Deposited Beryllium Core',
      description: 'Extremely stiff yet ultralight diaphragm eliminates breakup distortion for studio master reproduction.',
      hotspots: [
        { id: 1, x: '45%', y: '50%', label: 'Neodymium N52', detail: 'High-flux dual magnetic circuit' },
        { id: 2, x: '30%', y: '65%', label: 'Copper Voice Coil', detail: 'OFC ultra-fine Japanese winding' },
      ],
      specs: [
        { label: 'MAGNET FLUX', value: '1.4 Tesla' },
        { label: 'IMPEDANCE', value: '32 Ohms' },
        { label: 'DAC RESOLUTION', value: '24-bit / 96kHz' },
      ],
    },
    {
      id: 'angle-travel',
      label: 'Travel Case',
      tag: '04 &bull; TRAVEL ARSENAL',
      image: 'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=1200&q=85',
      title: 'Precision Hard-Shell Carrier',
      description: 'Includes braided 3.5mm OFC cable, gold 6.35mm jack, flight adapter, and rapid braided USB-C cable.',
      hotspots: [
        { id: 1, x: '50%', y: '55%', label: 'Ballistic Nylon', detail: 'Weatherproof sealed zipper casing' },
      ],
      specs: [
        { label: 'CASE MATERIAL', value: 'Thermoformed EVA' },
        { label: 'CHARGING', value: '10m charge = 6h play' },
        { label: 'WARRANTY', value: '2-Year Official' },
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
    }, 500);
  };

  return (
    <section className="py-20 sm:py-28 bg-[#FAF8F5] hairline-b">
      <div className="max-w-[1540px] mx-auto px-6 sm:px-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between pb-8 sm:pb-12 hairline-b gap-6">
          <div className="space-y-3">
            <span className="text-[11px] uppercase tracking-[0.28em] font-light text-[#8C867D] block">
              Framer 3D Inspection &bull; Section 04
            </span>
            <h2 className="text-3xl sm:text-5xl font-editorial font-light text-[#1A1918] leading-[1.08]">
              Form Follows Materiality: <br />
              <span className="italic font-normal text-[#806B43]">Acoustic sculpture in 360°</span>
            </h2>
            <p className="text-xs sm:text-sm text-[#5C5852] font-light max-w-xl leading-relaxed">
              Experience dynamic perspective tilt inspired by Framer and Danish architectural proportion. Inspect precision components, beryllium diaphragms, and acoustic isolation in real time.
            </p>
          </div>

          {/* Angle Switcher Tabs */}
          <div className="flex flex-wrap items-center gap-2">
            {angles.map((a, idx) => (
              <button
                key={a.id}
                type="button"
                onClick={() => {
                  setActiveAngleIndex(idx);
                  setActiveHotspot(null);
                }}
                className={`px-4 py-2 text-xs uppercase tracking-[0.2em] font-light transition-all border ${
                  activeAngleIndex === idx
                    ? 'border-[#1A1918] bg-[#1A1918] text-[#FAF8F5]'
                    : 'border-[#D8D2C6] bg-transparent text-[#5C5852] hover:border-[#1A1918]'
                }`}
              >
                {a.label}
              </button>
            ))}
          </div>
        </div>

        {/* 3D Kinetic Tilt Pedestal Canvas */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-10 sm:pt-14 items-center">
          
          {/* Left Column: Interactive 3D Card (Framer Tilt Physics) */}
          <div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ perspective: 1200 }}
            className="lg:col-span-8 relative aspect-[4/3] sm:aspect-[16/10] bg-[#EDE8DF] border border-[#D8D2C6] overflow-hidden cursor-crosshair select-none"
          >
            <motion.div
              style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
              className="relative w-full h-full flex items-center justify-center"
            >
              {/* Product Photo with Smooth Transition */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={current.id}
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.04 }}
                  transition={{ duration: 0.5 }}
                  className="absolute inset-0"
                >
                  <Image
                    src={current.image}
                    alt={current.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 900px"
                    className="object-cover object-center"
                    unoptimized
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1A1918]/60 via-transparent to-transparent pointer-events-none" />
                </motion.div>
              </AnimatePresence>

              {/* Dynamic Specular Light Glare (Follows Cursor) */}
              <div className="absolute inset-0 bg-radial-gradient from-white/20 via-transparent to-transparent opacity-60 pointer-events-none" />

              {/* Hotspot Pins */}
              {current.hotspots.map((spot) => {
                const isActive = activeHotspot === spot.id;
                return (
                  <div
                    key={spot.id}
                    style={{ left: spot.x, top: spot.y }}
                    className="absolute -translate-x-1/2 -translate-y-1/2 z-20"
                  >
                    <button
                      type="button"
                      onClick={() => setActiveHotspot(isActive ? null : spot.id)}
                      className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full border flex items-center justify-center transition-all ${
                        isActive
                          ? 'bg-[#1A1918] text-[#FAF8F5] border-[#FAF8F5] scale-110 shadow-xl'
                          : 'bg-[#FAF8F5]/90 backdrop-blur-sm text-[#1A1918] border-[#D8D2C6] hover:bg-[#1A1918] hover:text-[#FAF8F5]'
                      }`}
                    >
                      <span className="text-[10px] font-mono font-medium">{spot.id}</span>
                    </button>

                    {/* Popover */}
                    <AnimatePresence>
                      {isActive && (
                        <motion.div
                          initial={{ opacity: 0, y: 8, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 8, scale: 0.95 }}
                          className="absolute left-1/2 -translate-x-1/2 top-9 w-60 bg-[#FAF8F5] border border-[#D8D2C6] p-3 shadow-2xl z-30"
                        >
                          <span className="text-[9px] uppercase tracking-[0.2em] text-[#806B43] font-medium block">
                            Precision Component
                          </span>
                          <h5 className="text-xs font-editorial text-[#1A1918] font-normal">
                            {spot.label}
                          </h5>
                          <p className="text-[10px] text-[#5C5852] font-light mt-0.5">
                            {spot.detail}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}

              {/* Corner Tag */}
              <div className="absolute top-4 left-4 bg-black/40 backdrop-blur-md px-3 py-1 border border-white/10 text-[9px] font-mono text-[#FAF8F5] uppercase tracking-wider">
                {current.tag}
              </div>

              {/* Tilt Hint */}
              <div className="absolute bottom-4 right-4 bg-black/40 backdrop-blur-md px-3 py-1 border border-white/10 text-[9px] font-mono text-[#FAF8F5]/80 uppercase tracking-wider flex items-center gap-1.5 pointer-events-none">
                <RotateCw className="w-3 h-3 text-[#9E814D] animate-spin" />
                <span>Hover to tilt 3D</span>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Technical Specifications & Direct Acquisition */}
          <div className="lg:col-span-4 space-y-6">
            <div className="space-y-2">
              <span className="text-[10px] uppercase tracking-[0.24em] text-[#806B43] font-medium block">
                Flagship Acoustic Sculpture
              </span>
              <h3 className="text-2xl sm:text-3xl font-editorial font-light text-[#1A1918] leading-tight">
                {current.title}
              </h3>
              <p className="text-xs text-[#5C5852] font-light leading-relaxed">
                {current.description}
              </p>
            </div>

            {/* Framer-Style Monospace Specs Readout */}
            <div className="space-y-2.5 hairline-t pt-4">
              <span className="text-[10px] uppercase tracking-[0.2em] font-mono text-[#8C867D] block">
                Acoustic Benchmarks
              </span>
              <div className="grid grid-cols-1 gap-2">
                {current.specs.map((spec, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between p-2.5 bg-[#F5F2EB] border border-[#D8D2C6]/60 text-xs font-mono"
                  >
                    <span className="text-[#5C5852]">{spec.label}</span>
                    <span className="text-[#1A1918] font-semibold">{spec.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Price & Purchase Bar */}
            <div className="hairline-t pt-4 space-y-4">
              <div className="flex items-baseline justify-between">
                <div>
                  <span className="text-xl font-light text-[#1A1918]">
                    {formatPrice(22499)}
                  </span>
                  <span className="text-xs text-[#8C867D] line-through ml-2">
                    {formatPrice(26999)}
                  </span>
                </div>
                <span className="text-[10px] uppercase tracking-wider font-mono text-[#806B43]">
                  Save Rs. 4,500
                </span>
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={handleAddToCart}
                  disabled={isAdded}
                  className="flex-1 py-3.5 bg-[#1A1918] hover:bg-[#806B43] text-[#FAF8F5] text-xs uppercase tracking-[0.2em] font-light flex items-center justify-center gap-2 transition-colors disabled:opacity-50"
                >
                  {isAdded ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-400" />
                      <span>Added to Bag</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4" />
                      <span>Acquire Horizon Pro</span>
                    </>
                  )}
                </button>

                <Link
                  href="/products/horizon-pro-anc-hybrid-wireless-headphones"
                  className="p-3.5 border border-[#D8D2C6] hover:border-[#1A1918] text-[#1A1918] transition-colors"
                  title="View Specs"
                >
                  <Eye className="w-4 h-4" />
                </Link>
              </div>

              <div className="text-[10px] font-mono text-[#8C867D] flex items-center justify-between uppercase">
                <span>Free Express Shipping</span>
                <span>&bull;</span>
                <span>Cash on Delivery</span>
                <span>&bull;</span>
                <span>7-Day Return</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
