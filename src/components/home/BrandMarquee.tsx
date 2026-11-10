'use client';

import React from 'react';
import { Truck, ShieldCheck, RotateCcw, Headphones, Sparkles, CheckCircle2 } from 'lucide-react';

export default function BrandMarquee() {
  const items = [
    { icon: Truck, text: 'Complimentary Express Shipping Over Rs. 5,000' },
    { icon: CheckCircle2, text: 'Doorstep Cash on Delivery (COD) Nationwide' },
    { icon: ShieldCheck, text: '100% Verified Authentic Stock with Brand Warranty' },
    { icon: RotateCcw, text: '7-Day Hassle-Free Doorstep Replacement' },
    { icon: Headphones, text: '24/7 Dedicated Concierge Support in Pakistan' },
    { icon: Sparkles, text: 'Carefully Curated Global Luxury & Lifestyle' },
  ];

  return (
    <div className="w-full bg-[#FAF7F2] border-y border-amber-900/10 py-3.5 overflow-hidden select-none">
      <div className="flex w-max animate-marquee space-x-12">
        {/* First Loop */}
        {items.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div key={`m1-${idx}`} className="flex items-center gap-2.5 text-slate-800 text-xs font-semibold uppercase tracking-[0.18em]">
              <Icon className="w-4 h-4 text-[#b48a4c] shrink-0" />
              <span>{item.text}</span>
              <span className="text-[#b48a4c] text-xs font-serif">&bull;</span>
            </div>
          );
        })}

        {/* Second Loop for seamless infinite marquee */}
        {items.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div key={`m2-${idx}`} className="flex items-center gap-2.5 text-slate-800 text-xs font-semibold uppercase tracking-[0.18em]">
              <Icon className="w-4 h-4 text-[#b48a4c] shrink-0" />
              <span>{item.text}</span>
              <span className="text-[#b48a4c] text-xs font-serif">&bull;</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
