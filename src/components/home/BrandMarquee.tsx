'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import { formatPrice } from '@/lib/utils';

export default function BrandMarquee() {
  const visualReel = [
    {
      id: 'el-ha-01',
      name: 'Horizon Pro ANC Headphones',
      category: 'Acoustic Chamber',
      price: 22499,
      image: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=600&q=80',
      slug: 'horizon-pro-anc-hybrid-wireless-headphones',
      tag: 'BERYLLIUM 40MM',
    },
    {
      id: 'sw-ap-01',
      name: 'Apex Ultra Titanium Watch',
      category: 'Precision Horology',
      price: 16999,
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&q=80',
      slug: 'apex-ultra-titanium-sapphire-amoled-smartwatch',
      tag: 'AEROSPACE TITANIUM',
    },
    {
      id: 'f-hb-01',
      name: 'Verona Italian Kelly Handbag',
      category: 'Sartorial Wardrobe',
      price: 19999,
      image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=600&q=80',
      slug: 'verona-italian-kelly-handbag',
      tag: 'TUSCAN LEATHER',
    },
    {
      id: 'b-se-01',
      name: 'Botanical Multi-Peptide Elixir',
      category: 'Botanical & Scent',
      price: 7899,
      image: 'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=600&q=80',
      slug: 'botanical-multi-peptide-youth-serum',
      tag: 'COLD PRESSED',
    },
    {
      id: 'h-la-01',
      name: 'Nordic Ceramic Table Lamp',
      category: 'Living Space',
      price: 9499,
      image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&q=80',
      slug: 'minimalist-ceramic-table-lamp',
      tag: 'HAND THROWN',
    },
    {
      id: 'm-ch-01',
      name: 'MagSafe Wireless Charging Dock',
      category: 'Mobile Architecture',
      price: 8999,
      image: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=600&q=80',
      slug: 'magsafe-magnetic-wireless-charging-stand',
      tag: 'ALUMINUM DOCK',
    },
    {
      id: 'el-eb-01',
      name: 'Spatial Pro Wireless Earbuds',
      category: 'Acoustic Chamber',
      price: 14999,
      image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=600&q=80',
      slug: 'spatial-pro-active-noise-cancelling-earbuds',
      tag: 'SPATIAL AUDIO',
    },
    {
      id: 'sw-ch-01',
      name: 'Chrono Minimalist Watch',
      category: 'Precision Horology',
      price: 18499,
      image: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=600&q=80',
      slug: 'chrono-minimalist-sapphire-dress-watch',
      tag: 'SAPPHIRE CRYSTAL',
    },
    {
      id: 'h-df-01',
      name: 'Cold-Air Ultrasonic Diffuser',
      category: 'Living Space',
      price: 6499,
      image: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=600&q=80',
      slug: 'cold-air-ultrasonic-essential-oil-diffuser',
      tag: 'AROMATHERAPY',
    },
    {
      id: 'f-wl-01',
      name: 'Tuscan Leather Bifold Wallet',
      category: 'Sartorial Wardrobe',
      price: 5499,
      image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?w=600&q=80',
      slug: 'tuscan-leather-bifold-card-wallet',
      tag: 'FULL GRAIN',
    },
  ];

  const trustStatements = [
    'Complimentary express shipping over Rs. 5,000',
    'Doorstep Cash on Delivery (COD) Nationwide',
    '100% Verified Authentic Stock with Brand Warranty',
    '7-Day Hassle-Free Doorstep Replacement',
    '24/7 Dedicated Concierge Support in Pakistan',
    'Carefully Curated Global Luxury & Lifestyle',
  ];

  return (
    <div className="w-full bg-[#FAF8F5] hairline-b overflow-hidden select-none">
      
      {/* 1. Animated Visual Product Stream (Animated Pictures Marquee) */}
      <div className="py-6 sm:py-8 overflow-hidden group">
        <div className="flex w-max animate-marquee space-x-6 sm:space-x-8 px-4 group-hover:[animation-play-state:paused]">
          
          {/* First Reel */}
          {visualReel.map((item, idx) => (
            <Link
              key={`reel1-${item.id}-${idx}`}
              href={`/products/${item.slug}`}
              className="group/card flex items-center gap-4 p-3 bg-[#F5F2EB] hover:bg-[#EDE8DF] border border-[#D8D2C6]/80 hover:border-[#1A1918] transition-all duration-300 w-[280px] sm:w-[320px] shrink-0"
            >
              <div className="relative w-16 h-16 sm:w-20 sm:h-20 bg-[#EDE8DF] border border-[#D8D2C6]/60 shrink-0 overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  sizes="80px"
                  className="object-cover group-hover/card:scale-108 transition-transform duration-700"
                  unoptimized
                />
              </div>

              <div className="flex-1 min-w-0 space-y-1">
                <span className="text-[9px] uppercase tracking-[0.2em] font-mono text-[#806B43] block truncate">
                  {item.tag}
                </span>
                <h4 className="text-xs font-editorial text-[#1A1918] group-hover/card:text-[#806B43] transition-colors truncate font-normal">
                  {item.name}
                </h4>
                <div className="flex items-center justify-between pt-1">
                  <span className="text-xs font-light text-[#1A1918]">
                    {formatPrice(item.price)}
                  </span>
                  <span className="text-[10px] text-[#8C867D] group-hover/card:text-[#1A1918] flex items-center gap-0.5 uppercase tracking-wider font-mono">
                    <span>Inspect</span>
                    <ArrowUpRight className="w-3 h-3 group-hover/card:translate-x-0.5 group-hover/card:-translate-y-0.5 transition-transform" />
                  </span>
                </div>
              </div>
            </Link>
          ))}

          {/* Second Duplicate Reel for seamless infinite continuous scroll */}
          {visualReel.map((item, idx) => (
            <Link
              key={`reel2-${item.id}-${idx}`}
              href={`/products/${item.slug}`}
              className="group/card flex items-center gap-4 p-3 bg-[#F5F2EB] hover:bg-[#EDE8DF] border border-[#D8D2C6]/80 hover:border-[#1A1918] transition-all duration-300 w-[280px] sm:w-[320px] shrink-0"
            >
              <div className="relative w-16 h-16 sm:w-20 sm:h-20 bg-[#EDE8DF] border border-[#D8D2C6]/60 shrink-0 overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  sizes="80px"
                  className="object-cover group-hover/card:scale-108 transition-transform duration-700"
                  unoptimized
                />
              </div>

              <div className="flex-1 min-w-0 space-y-1">
                <span className="text-[9px] uppercase tracking-[0.2em] font-mono text-[#806B43] block truncate">
                  {item.tag}
                </span>
                <h4 className="text-xs font-editorial text-[#1A1918] group-hover/card:text-[#806B43] transition-colors truncate font-normal">
                  {item.name}
                </h4>
                <div className="flex items-center justify-between pt-1">
                  <span className="text-xs font-light text-[#1A1918]">
                    {formatPrice(item.price)}
                  </span>
                  <span className="text-[10px] text-[#8C867D] group-hover/card:text-[#1A1918] flex items-center gap-0.5 uppercase tracking-wider font-mono">
                    <span>Inspect</span>
                    <ArrowUpRight className="w-3 h-3 group-hover/card:translate-x-0.5 group-hover/card:-translate-y-0.5 transition-transform" />
                  </span>
                </div>
              </div>
            </Link>
          ))}

        </div>
      </div>

      {/* 2. Delicate Architectural Assurance Micro-Ticker */}
      <div className="hairline-t bg-[#FAF8F5] py-2.5 overflow-hidden">
        <div className="flex w-max animate-marquee space-x-12">
          {trustStatements.map((text, idx) => (
            <div
              key={`trust1-${idx}`}
              className="flex items-center gap-6 text-[#5C5852] text-[11px] font-light uppercase tracking-[0.22em]"
            >
              <span>{text}</span>
              <span className="text-[#9E814D]">&bull;</span>
            </div>
          ))}

          {trustStatements.map((text, idx) => (
            <div
              key={`trust2-${idx}`}
              className="flex items-center gap-6 text-[#5C5852] text-[11px] font-light uppercase tracking-[0.22em]"
            >
              <span>{text}</span>
              <span className="text-[#9E814D]">&bull;</span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
