'use client';

import React from 'react';
import { Truck, ShieldCheck, RotateCcw, Star, Zap, CheckCircle2 } from 'lucide-react';

export default function AnimatedMarquee() {
  const items = [
    { icon: Truck, text: 'Free Delivery Across Pakistan on Orders Over Rs. 5,000' },
    { icon: Zap, text: 'Nationwide Cash on Delivery (COD) Available' },
    { icon: ShieldCheck, text: '100% Genuine Guaranteed Brand Products' },
    { icon: RotateCcw, text: '7-Day Easy Return & Replacement Guarantee' },
    { icon: Star, text: '4.9/5 Average Rating by 2,800+ Verified Buyers' },
    { icon: CheckCircle2, text: 'Delivering to Karachi, Lahore, Islamabad & 150+ Cities' },
  ];

  return (
    <div className="relative overflow-hidden bg-slate-900 text-white py-3 border-y border-slate-800 select-none">
      <div className="flex w-max animate-marquee space-x-8">
        {[...items, ...items].map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={idx}
              className="flex items-center space-x-2.5 text-xs sm:text-sm font-semibold tracking-wide whitespace-nowrap text-slate-200"
            >
              <Icon className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>{item.text}</span>
              <span className="text-slate-600 pl-6">•</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}