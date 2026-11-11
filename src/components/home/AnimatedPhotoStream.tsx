'use client';

import React, { useState, useRef, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowUpRight,
  Play,
  Pause,
  Move3d,
} from 'lucide-react';
import { formatPrice } from '@/lib/utils';

interface GalleryItem {
  id: string;
  fig: string;
  title: string;
  category: string;
  spec: string;
  price: number;
  image: string;
  slug: string;
  aspectClass: string;
  depthZ: number;
  initialScale: number;
  animClass: string;
  animDelay: string;
}

export default function AnimatedPhotoStream() {
  const [tempo, setTempo] = useState<'normal' | 'adagio' | 'pause'>('normal');
  const [mouseCoords, setMouseCoords] = useState({ x: 0, y: 0 });

  const stageRef = useRef<HTMLDivElement>(null);

  // Smooth mouse tilt parallax for the 3D stage
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!stageRef.current) return;
    const rect = stageRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMouseCoords({ x: Number(x.toFixed(3)), y: Number(y.toFixed(3)) });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setMouseCoords({ x: 0, y: 0 });
  }, []);

  // Stratum 1: Foreground Hero Objects (Z: +100px to +180px, larger scale, rapid parallax)
  const foregroundItems: GalleryItem[] = [
    {
      id: 'fg-01',
      fig: 'FIG. 01',
      title: 'Horizon Pro ANC Hybrid Headphones',
      category: 'Acoustic Sculpture',
      spec: '40mm Milled Beryllium • 42dB Hybrid ANC',
      price: 22499,
      image: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=1200&q=85',
      slug: 'horizon-pro-anc-hybrid-wireless-headphones',
      aspectClass: 'w-[320px] sm:w-[380px] h-[440px] sm:h-[500px]',
      depthZ: 140,
      initialScale: 1.08,
      animClass: 'animate-[float-3d-foreground-1_14s_ease-in-out_infinite]',
      animDelay: '0s',
    },
    {
      id: 'fg-02',
      fig: 'FIG. 02',
      title: 'Apex Titanium Sapphire Smartwatch',
      category: 'Precision Horology',
      spec: 'Grade-5 Aerospace Titanium • Sapphire Crystal',
      price: 32999,
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=1200&q=85',
      slug: 'apex-titanium-sapphire-amoled-smartwatch',
      aspectClass: 'w-[300px] sm:w-[350px] h-[420px] sm:h-[480px]',
      depthZ: 120,
      initialScale: 1.05,
      animClass: 'animate-[float-3d-foreground-2_16s_ease-in-out_infinite]',
      animDelay: '-4.2s',
    },
    {
      id: 'fg-03',
      fig: 'FIG. 03',
      title: 'Verona Italian Kelly Handbag',
      category: 'Sartorial Wardrobe',
      spec: 'Hand-Stitched Tuscan Calfskin • Palladium Brass',
      price: 19999,
      image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=1200&q=85',
      slug: 'verona-italian-kelly-handbag',
      aspectClass: 'w-[340px] sm:w-[400px] h-[460px] sm:h-[520px]',
      depthZ: 160,
      initialScale: 1.12,
      animClass: 'animate-[float-3d-foreground-1_15s_ease-in-out_infinite]',
      animDelay: '-8.5s',
    },
    {
      id: 'fg-04',
      fig: 'FIG. 04',
      title: 'High-Fashion Sartorial Shopper',
      category: 'Curated Living',
      spec: 'Parisian Edit • Full-Grain Aniline Dye',
      price: 24999,
      image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1200&q=85',
      slug: 'verona-italian-kelly-handbag',
      aspectClass: 'w-[360px] sm:w-[420px] h-[440px] sm:h-[490px]',
      depthZ: 130,
      initialScale: 1.06,
      animClass: 'animate-[float-3d-foreground-2_17.5s_ease-in-out_infinite]',
      animDelay: '-2.8s',
    },
    {
      id: 'fg-05',
      fig: 'FIG. 05',
      title: 'Nordic Minimalist Ceramic Lamp',
      category: 'Living Space',
      spec: 'Hand-Thrown Matte Stoneware • Warm Dimmable LED',
      price: 9499,
      image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1200&q=85',
      slug: 'minimalist-ceramic-table-lamp',
      aspectClass: 'w-[310px] sm:w-[360px] h-[430px] sm:h-[490px]',
      depthZ: 150,
      initialScale: 1.09,
      animClass: 'animate-[float-3d-foreground-1_13.2s_ease-in-out_infinite]',
      animDelay: '-6.1s',
    },
    {
      id: 'fg-06',
      fig: 'FIG. 06',
      title: 'Botanical Multi-Peptide Serum',
      category: 'Botanical & Scent',
      spec: 'Cold-Pressed Phytochemicals • 10% Peptides',
      price: 7899,
      image: 'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=1200&q=85',
      slug: 'botanical-multi-peptide-youth-serum',
      aspectClass: 'w-[290px] sm:w-[340px] h-[410px] sm:h-[470px]',
      depthZ: 110,
      initialScale: 1.04,
      animClass: 'animate-[float-3d-foreground-2_18s_ease-in-out_infinite]',
      animDelay: '-11.4s',
    },
  ];

  // Stratum 2: Midground Structural Stream (Z: -40px to +60px, counter-drift, varied aspect)
  const midgroundItems: GalleryItem[] = [
    {
      id: 'mg-01',
      fig: 'FIG. 07',
      title: 'Tactile Mechanical Keyboard',
      category: 'Workspace Architecture',
      spec: 'Anodized CNC Aluminum • Hot-Swap Linear Switches',
      price: 14499,
      image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=1000&q=85',
      slug: 'horizon-pro-anc-hybrid-wireless-headphones',
      aspectClass: 'w-[360px] sm:w-[410px] h-[280px] sm:h-[320px]',
      depthZ: 20,
      initialScale: 0.98,
      animClass: 'animate-[float-3d-midground-1_15.5s_ease-in-out_infinite]',
      animDelay: '0s',
    },
    {
      id: 'mg-02',
      fig: 'FIG. 08',
      title: 'Ultrasonic Cold-Air Aroma Diffuser',
      category: 'Living Space',
      spec: 'Porcelain Ambient Shell • 2.4MHz Whisper Mist',
      price: 6499,
      image: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=1000&q=85',
      slug: 'cold-air-ultrasonic-essential-oil-diffuser',
      aspectClass: 'w-[280px] sm:w-[320px] h-[340px] sm:h-[390px]',
      depthZ: -20,
      initialScale: 0.93,
      animClass: 'animate-[float-3d-midground-2_14s_ease-in-out_infinite]',
      animDelay: '-3.7s',
    },
    {
      id: 'mg-03',
      fig: 'FIG. 09',
      title: 'Polarized Acetate Eyewear',
      category: 'Sartorial Wardrobe',
      spec: 'Custom Mazzucchelli Cellulose • UV400 Mineral Glass',
      price: 8999,
      image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=1000&q=85',
      slug: 'verona-italian-kelly-handbag',
      aspectClass: 'w-[340px] sm:w-[380px] h-[260px] sm:h-[300px]',
      depthZ: 40,
      initialScale: 1.0,
      animClass: 'animate-[float-3d-midground-1_17s_ease-in-out_infinite]',
      animDelay: '-7.2s',
    },
    {
      id: 'mg-04',
      fig: 'FIG. 10',
      title: 'Monolithic Wireless Fast Charger',
      category: 'Workspace Architecture',
      spec: 'Sandblasted Alloy Chassis • 15W MagSafe Inductive',
      price: 5999,
      image: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=1000&q=85',
      slug: 'apex-titanium-sapphire-amoled-smartwatch',
      aspectClass: 'w-[300px] sm:w-[330px] h-[300px] sm:h-[330px]',
      depthZ: -10,
      initialScale: 0.95,
      animClass: 'animate-[float-3d-midground-2_16.2s_ease-in-out_infinite]',
      animDelay: '-9.8s',
    },
    {
      id: 'mg-05',
      fig: 'FIG. 11',
      title: 'Xiuyan Jade Sculpting Roller',
      category: 'Botanical & Scent',
      spec: 'Hand-Cut Natural Jade • Brass Non-Squeak Hardware',
      price: 3499,
      image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=1000&q=85',
      slug: 'botanical-multi-peptide-youth-serum',
      aspectClass: 'w-[270px] sm:w-[310px] h-[330px] sm:h-[380px]',
      depthZ: 30,
      initialScale: 0.97,
      animClass: 'animate-[float-3d-midground-1_13.8s_ease-in-out_infinite]',
      animDelay: '-5.4s',
    },
    {
      id: 'mg-06',
      fig: 'FIG. 12',
      title: 'Aramid Carbon Fiber Kinetic Case',
      category: 'Precision Horology',
      spec: '1500D Ballistic Weave • 0.85mm Ultra-Thin Profile',
      price: 4999,
      image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=1000&q=85',
      slug: 'horizon-pro-anc-hybrid-wireless-headphones',
      aspectClass: 'w-[320px] sm:w-[360px] h-[280px] sm:h-[310px]',
      depthZ: 10,
      initialScale: 0.96,
      animClass: 'animate-[float-3d-midground-2_18.4s_ease-in-out_infinite]',
      animDelay: '-12.1s',
    },
  ];

  // Stratum 3: Atmospheric Deep Stratum (Z: -140px to -60px, ambient slow drift)
  const deepItems: GalleryItem[] = [
    {
      id: 'dp-01',
      fig: 'FIG. 13',
      title: 'Studio Spatial Acoustic Earbuds',
      category: 'Acoustic Sculpture',
      spec: 'Dynamic Micro-Transducers • IPX5 Splashproof',
      price: 12999,
      image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800&q=85',
      slug: 'horizon-pro-anc-hybrid-wireless-headphones',
      aspectClass: 'w-[250px] sm:w-[280px] h-[320px] sm:h-[360px]',
      depthZ: -120,
      initialScale: 0.84,
      animClass: 'animate-[float-3d-deep-1_19s_ease-in-out_infinite]',
      animDelay: '0s',
    },
    {
      id: 'dp-02',
      fig: 'FIG. 14',
      title: 'Minimalist Vegan Suede Desk Mat',
      category: 'Workspace Architecture',
      spec: 'Double-Sided Hydrophobic • 900mm x 400mm Studio',
      price: 3999,
      image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=800&q=85',
      slug: 'minimalist-ceramic-table-lamp',
      aspectClass: 'w-[320px] sm:w-[360px] h-[230px] sm:h-[260px]',
      depthZ: -100,
      initialScale: 0.86,
      animClass: 'animate-[float-3d-deep-2_21s_ease-in-out_infinite]',
      animDelay: '-4.8s',
    },
    {
      id: 'dp-03',
      fig: 'FIG. 15',
      title: 'French Haute Royal Oud Extract',
      category: 'Botanical & Scent',
      spec: 'Aged Cambodian Agarwood • Damascus Rose Heart',
      price: 11499,
      image: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=800&q=85',
      slug: 'botanical-multi-peptide-youth-serum',
      aspectClass: 'w-[240px] sm:w-[270px] h-[330px] sm:h-[370px]',
      depthZ: -140,
      initialScale: 0.82,
      animClass: 'animate-[float-3d-deep-1_22.5s_ease-in-out_infinite]',
      animDelay: '-8.3s',
    },
    {
      id: 'dp-04',
      fig: 'FIG. 16',
      title: 'Raw Brutalist Stoneware Vessel',
      category: 'Living Space',
      spec: 'Reduction Kiln Fired • Unglazed Tactile Texture',
      price: 6899,
      image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=800&q=85',
      slug: 'minimalist-ceramic-table-lamp',
      aspectClass: 'w-[270px] sm:w-[310px] h-[310px] sm:h-[350px]',
      depthZ: -90,
      initialScale: 0.88,
      animClass: 'animate-[float-3d-deep-2_18s_ease-in-out_infinite]',
      animDelay: '-12.7s',
    },
    {
      id: 'dp-05',
      fig: 'FIG. 17',
      title: 'Milanese Mesh Titanium Strap',
      category: 'Precision Horology',
      spec: 'Continuous Magnetic Buckle • Hand-Polished Links',
      price: 4499,
      image: 'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=800&q=85',
      slug: 'apex-titanium-sapphire-amoled-smartwatch',
      aspectClass: 'w-[250px] sm:w-[280px] h-[300px] sm:h-[340px]',
      depthZ: -110,
      initialScale: 0.85,
      animClass: 'animate-[float-3d-deep-1_20s_ease-in-out_infinite]',
      animDelay: '-6.5s',
    },
    {
      id: 'dp-06',
      fig: 'FIG. 18',
      title: 'Smoked Cedar Soy Wax Candle',
      category: 'Living Space',
      spec: '100% Organic Soy • Crackling Wooden Wick',
      price: 3299,
      image: 'https://images.unsplash.com/photo-1603006905003-be475563bc59?w=800&q=85',
      slug: 'cold-air-ultrasonic-essential-oil-diffuser',
      aspectClass: 'w-[260px] sm:w-[290px] h-[310px] sm:h-[350px]',
      depthZ: -130,
      initialScale: 0.83,
      animClass: 'animate-[float-3d-deep-2_23s_ease-in-out_infinite]',
      animDelay: '-15.1s',
    },
  ];

  // Single card renderer with Shakuro / Mirko Romanelli technical placard
  const renderCard = (
    item: GalleryItem,
    loopKey: string,
    stratumType: 'foreground' | 'midground' | 'deep'
  ) => {
    const isPaused = tempo === 'pause';

    return (
      <div
        key={`${loopKey}-${item.id}`}
        style={{
          animationDelay: item.animDelay,
        }}
        className={`relative shrink-0 transition-all duration-700 ${
          isPaused ? 'kinetic-paused' : item.animClass
        } group/card`}
      >
        <Link
          href={`/products/${item.slug}`}
          className={`block relative ${item.aspectClass} bg-[#EDE8DF] border border-[#D8D2C6] overflow-hidden transition-all duration-500 hover:border-[#1A1918] hover:shadow-[0_32px_70px_rgba(26,25,24,0.32)] hover:!scale-110 hover:!z-50 preserve-3d`}
          style={{
            transform: `translateZ(${item.depthZ}px)`,
          }}
        >
          {/* Engineering CAD Blueprint Corner Hairlines */}
          <div className="absolute top-2 left-2 z-20 pointer-events-none text-[8px] font-mono text-white/50 tracking-tighter">
            +
          </div>
          <div className="absolute top-2 right-2 z-20 pointer-events-none text-[8px] font-mono text-white/50 tracking-tighter">
            +
          </div>
          <div className="absolute bottom-2 left-2 z-20 pointer-events-none text-[8px] font-mono text-white/50 tracking-tighter">
            +
          </div>
          <div className="absolute bottom-2 right-2 z-20 pointer-events-none text-[8px] font-mono text-white/50 tracking-tighter">
            +
          </div>

          {/* Full-Bleed Photograph with Slow Architectural Scale */}
          <Image
            src={item.image}
            alt={item.title}
            fill
            sizes="460px"
            className="object-cover group-hover/card:scale-108 transition-transform duration-1000 ease-out"
            unoptimized
          />

          {/* Atmospheric Layer Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#1A1918]/92 via-[#1A1918]/25 to-black/10 group-hover/card:from-[#1A1918]/96 transition-all duration-300" />

          {/* Mirko Romanelli Technical Placard - Top Header Strip */}
          <div className="absolute top-3 inset-x-3 z-10 flex items-center justify-between">
            <span className="bg-black/60 backdrop-blur-md px-2.5 py-0.5 text-[8.5px] font-mono uppercase tracking-[0.24em] text-[#F5F2EB] border border-white/15">
              {item.fig} &bull; Z:{item.depthZ > 0 ? `+${item.depthZ}` : item.depthZ}PX
            </span>
            <span className="bg-[#806B43]/80 backdrop-blur-md px-2 py-0.5 text-[8px] font-mono uppercase tracking-widest text-white border border-white/20">
              {item.category}
            </span>
          </div>

          {/* Mirko Romanelli Industrial Specs Callout Block */}
          <div className="absolute bottom-0 inset-x-0 p-4 sm:p-5 z-10 space-y-1.5 transform translate-y-2 group-hover/card:translate-y-0 transition-transform duration-300">
            {/* Fine Hairline Divider */}
            <div className="hairline-b border-white/20 pb-1.5 flex items-center justify-between">
              <span className="text-[8.5px] font-mono uppercase tracking-[0.2em] text-[#E8D4B0] line-clamp-1">
                {item.spec}
              </span>
            </div>

            {/* Product Title */}
            <h3 className="font-editorial text-base sm:text-lg font-light text-[#FAF8F5] line-clamp-1 leading-snug">
              {item.title}
            </h3>

            {/* Price & Tactile Action */}
            <div className="pt-1.5 flex items-baseline justify-between border-t border-white/15">
              <div>
                <span className="text-[8px] font-mono uppercase tracking-wider text-white/50 block">
                  PRICE (PKR)
                </span>
                <span className="text-sm sm:text-base font-light text-[#FAF8F5]">
                  {formatPrice(item.price)}
                </span>
              </div>

              <span className="text-[9.5px] uppercase font-mono tracking-widest text-[#E8D4B0] flex items-center gap-1 group-hover/card:underline bg-white/10 px-2 py-1 border border-white/15 backdrop-blur-sm">
                <span>Inspect</span>
                <ArrowUpRight className="w-3 h-3 group-hover/card:translate-x-0.5 group-hover/card:-translate-y-0.5 transition-transform" />
              </span>
            </div>
          </div>
        </Link>
      </div>
    );
  };

  return (
    <section className="relative py-20 sm:py-28 bg-[#F5F2EB] hairline-b overflow-hidden select-none">
      
      {/* Background Architectural Blueprint Markings */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.035] bg-[radial-gradient(#1A1918_1px,transparent_1px)] [background-size:24px_24px]" />

      {/* Editorial Section Header & Shakuro / Mirko Romanelli CAD Controls */}
      <div className="max-w-[1540px] mx-auto px-6 sm:px-10 pb-10 sm:pb-12 flex flex-col lg:flex-row lg:items-end justify-between gap-6 hairline-b relative z-10">
        
        {/* Left: Editorial Kicker & Headline */}
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-[#806B43] animate-ping" />
            <span className="text-[11px] uppercase tracking-[0.28em] font-mono text-[#8C867D]">
              Exhibition 03 &bull; Volumetric Kinetic Composition
            </span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-editorial font-light text-[#1A1918] leading-[1.08]">
            Objects in Space: <br />
            <span className="italic font-normal text-[#806B43]">
              Multi-Layered 3D Floating Field
            </span>
          </h2>
          <p className="text-xs font-light text-[#5C5852] max-w-xl leading-relaxed pt-1">
            Independent multi-directional movement across three depth strata (Z[-140px to +180px]).
            Images continuously breathe forward and recede with optical parallax.
          </p>
        </div>

        {/* Right: Mirko Romanelli CAD Control Deck & Live Telemetry */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 lg:gap-6">
          
          {/* Live CAD Perspective Telemetry */}
          <div className="bg-[#EDE8DF] border border-[#D8D2C6] px-4 py-2.5 font-mono text-[10px] text-[#5C5852] space-y-0.5 min-w-[210px]">
            <div className="flex justify-between text-[#806B43] font-semibold">
              <span>CAD_PERSPECTIVE</span>
              <span>1600PX</span>
            </div>
            <div className="flex justify-between text-[9px]">
              <span>CAM_TILT_X:</span>
              <span>{(mouseCoords.y * -8).toFixed(1)}°</span>
            </div>
            <div className="flex justify-between text-[9px]">
              <span>CAM_TILT_Y:</span>
              <span>{(mouseCoords.x * 10).toFixed(1)}°</span>
            </div>
            <div className="flex justify-between text-[9px] text-[#1A1918]">
              <span>DEPTH_AXIS:</span>
              <span>Z [-140PX ... +180PX]</span>
            </div>
          </div>

          {/* Motion Tempo & Pause Controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setTempo('normal')}
              className={`px-3 py-2 text-[10px] font-mono uppercase tracking-wider border transition-colors ${
                tempo === 'normal'
                  ? 'bg-[#1A1918] text-[#FAF8F5] border-[#1A1918]'
                  : 'bg-[#EDE8DF] text-[#5C5852] border-[#D8D2C6] hover:border-[#1A1918]'
              }`}
            >
              1.0× Cinematic
            </button>
            <button
              onClick={() => setTempo('adagio')}
              className={`px-3 py-2 text-[10px] font-mono uppercase tracking-wider border transition-colors ${
                tempo === 'adagio'
                  ? 'bg-[#1A1918] text-[#FAF8F5] border-[#1A1918]'
                  : 'bg-[#EDE8DF] text-[#5C5852] border-[#D8D2C6] hover:border-[#1A1918]'
              }`}
            >
              0.5× Adagio
            </button>
            <button
              onClick={() => setTempo(tempo === 'pause' ? 'normal' : 'pause')}
              className={`px-3 py-2 text-[10px] font-mono uppercase tracking-wider border flex items-center gap-1.5 transition-colors ${
                tempo === 'pause'
                  ? 'bg-[#806B43] text-white border-[#806B43]'
                  : 'bg-[#EDE8DF] text-[#5C5852] border-[#D8D2C6] hover:border-[#1A1918]'
              }`}
              title="Pause motion to inspect objects"
            >
              {tempo === 'pause' ? (
                <>
                  <Play className="w-3 h-3" />
                  <span>Resume</span>
                </>
              ) : (
                <>
                  <Pause className="w-3 h-3" />
                  <span>Pause</span>
                </>
              )}
            </button>
          </div>

        </div>
      </div>

      {/* 3D KINETIC MULTI-LAYERED STAGE */}
      <div
        ref={stageRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative min-h-[640px] sm:min-h-[720px] lg:min-h-[780px] w-full pt-8 pb-12 overflow-hidden perspective-stage"
      >
        {/* Subtle Interactive 3D Camera Tilt Wrapper */}
        <div
          className="relative w-full h-full preserve-3d transition-transform duration-300 ease-out"
          style={{
            transform: `rotateX(${mouseCoords.y * -6}deg) rotateY(${mouseCoords.x * 8}deg)`,
          }}
        >
          
          {/* Subtle Stage Depth Axis Indicators */}
          <div className="absolute top-2 left-6 z-0 pointer-events-none font-mono text-[9px] uppercase tracking-[0.2em] text-[#8C867D]/60 flex items-center gap-2">
            <Move3d className="w-3.5 h-3.5 text-[#806B43]" />
            <span>3D Field Active &bull; Multi-Directional Parallax</span>
          </div>

          {/* STRATUM 3: ATMOSPHERIC DEEP LAYER (Z: -140px to -60px, Slow Drift Left, Receding) */}
          <div
            className="absolute top-4 inset-x-0 overflow-hidden pointer-events-auto"
            style={{
              transform: 'translateZ(-100px)',
              opacity: 0.85,
            }}
          >
            <div
              className={`flex w-max space-x-8 sm:space-x-12 px-6 ${
                tempo === 'normal'
                  ? 'animate-stratum-deep'
                  : tempo === 'adagio'
                  ? 'animate-stratum-deep [animation-duration:110s]'
                  : 'animate-stratum-deep kinetic-paused'
              }`}
            >
              {/* Loop 1 */}
              {deepItems.map((item) => renderCard(item, 'deep1', 'deep'))}
              {/* Loop 2 */}
              {deepItems.map((item) => renderCard(item, 'deep2', 'deep'))}
            </div>
          </div>

          {/* STRATUM 2: MIDGROUND STRUCTURAL COUNTER-STREAM (Z: -40px to +60px, Drift Right) */}
          <div
            className="absolute top-24 sm:top-28 inset-x-0 overflow-hidden pointer-events-auto z-20"
            style={{
              transform: 'translateZ(10px)',
            }}
          >
            <div
              className={`flex w-max space-x-8 sm:space-x-10 px-8 ${
                tempo === 'normal'
                  ? 'animate-stratum-right'
                  : tempo === 'adagio'
                  ? 'animate-stratum-right [animation-duration:90s]'
                  : 'animate-stratum-right kinetic-paused'
              }`}
            >
              {/* Loop 1 */}
              {midgroundItems.map((item) => renderCard(item, 'mid1', 'midground'))}
              {/* Loop 2 */}
              {midgroundItems.map((item) => renderCard(item, 'mid2', 'midground'))}
            </div>
          </div>

          {/* STRATUM 1: HERO FOREGROUND STRATUM (Z: +100px to +180px, Drift Left, High Parallax) */}
          <div
            className="absolute top-48 sm:top-52 inset-x-0 overflow-hidden pointer-events-auto z-30"
            style={{
              transform: 'translateZ(120px)',
            }}
          >
            <div
              className={`flex w-max space-x-8 sm:space-x-12 px-10 ${
                tempo === 'normal'
                  ? 'animate-stratum-left'
                  : tempo === 'adagio'
                  ? 'animate-stratum-left [animation-duration:70s]'
                  : 'animate-stratum-left kinetic-paused'
              }`}
            >
              {/* Loop 1 */}
              {foregroundItems.map((item) => renderCard(item, 'fg1', 'foreground'))}
              {/* Loop 2 */}
              {foregroundItems.map((item) => renderCard(item, 'fg2', 'foreground'))}
            </div>
          </div>

          {/* FREE-FLOATING ORBITAL NODE 1 (Diagonally Oscillating across X/Y/Z) */}
          <div
            className="hidden xl:block absolute top-12 left-[18%] z-40 pointer-events-auto animate-[orbital-node-1_18s_ease-in-out_infinite]"
          >
            <Link
              href="/products/apex-titanium-sapphire-amoled-smartwatch"
              className="group/orb block relative w-[240px] h-[320px] bg-[#EDE8DF] border-2 border-[#806B43]/50 shadow-2xl overflow-hidden hover:scale-115 transition-transform duration-500"
            >
              <div className="absolute top-2 left-2 z-20 bg-black/70 backdrop-blur-md px-2 py-0.5 text-[8px] font-mono text-white border border-white/20">
                ORBITAL NODE 01
              </div>
              <Image
                src="https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=800&q=80"
                alt="Orbital Specimen"
                fill
                className="object-cover group-hover/orb:scale-110 transition-transform duration-700"
                unoptimized
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
              <div className="absolute bottom-3 inset-x-3 text-white">
                <span className="text-[7.5px] font-mono uppercase tracking-widest text-[#E8D4B0] block">
                  NATURAL TITANIUM
                </span>
                <p className="font-editorial text-sm line-clamp-1">Apex DLC Titanium</p>
                <p className="text-xs font-light text-[#FAF8F5] pt-0.5">Rs. 32,999</p>
              </div>
            </Link>
          </div>

          {/* FREE-FLOATING ORBITAL NODE 2 (Diagonally Oscillating in Counter-Phase) */}
          <div
            className="hidden xl:block absolute top-36 right-[14%] z-40 pointer-events-auto animate-[orbital-node-2_22s_ease-in-out_infinite]"
          >
            <Link
              href="/products/horizon-pro-anc-hybrid-wireless-headphones"
              className="group/orb block relative w-[250px] h-[340px] bg-[#EDE8DF] border-2 border-[#1A1918]/40 shadow-2xl overflow-hidden hover:scale-115 transition-transform duration-500"
            >
              <div className="absolute top-2 left-2 z-20 bg-black/70 backdrop-blur-md px-2 py-0.5 text-[8px] font-mono text-white border border-white/20">
                ORBITAL NODE 02
              </div>
              <Image
                src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80"
                alt="Orbital Specimen"
                fill
                className="object-cover group-hover/orb:scale-110 transition-transform duration-700"
                unoptimized
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
              <div className="absolute bottom-3 inset-x-3 text-white">
                <span className="text-[7.5px] font-mono uppercase tracking-widest text-[#E8D4B0] block">
                  CHAMPAGNE SILVER
                </span>
                <p className="font-editorial text-sm line-clamp-1">Horizon Acoustic 40mm</p>
                <p className="text-xs font-light text-[#FAF8F5] pt-0.5">Rs. 24,999</p>
              </div>
            </Link>
          </div>

        </div>

        {/* Soft Edge Blending Gradients to Fade Nicely into Canvas */}
        <div className="absolute inset-y-0 left-0 w-24 sm:w-36 bg-gradient-to-r from-[#F5F2EB] to-transparent pointer-events-none z-30" />
        <div className="absolute inset-y-0 right-0 w-24 sm:w-36 bg-gradient-to-l from-[#F5F2EB] to-transparent pointer-events-none z-30" />

      </div>

      {/* Shakuro Blueprint Footer Strip */}
      <div className="max-w-[1540px] mx-auto px-6 sm:px-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] font-mono text-[#8C867D] uppercase tracking-wider hairline-t">
        <div className="flex items-center gap-4">
          <span>COORDINATE GRID: 3D VOLUMETRIC</span>
          <span>&bull;</span>
          <span>FPS: 60/120 HARDWARE-ACCELERATED</span>
          <span>&bull;</span>
          <span>18 DISTINCT OBJECTS IN ORBIT</span>
        </div>
        <div className="flex items-center gap-2 text-[#806B43]">
          <span>Cash on Delivery Across Pakistan &bull; Doorstep Inspection Included</span>
        </div>
      </div>

    </section>
  );
}