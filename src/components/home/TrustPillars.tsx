'use client';

import React from 'react';
import { Truck, ShieldCheck, RotateCcw, Headphones } from 'lucide-react';

export default function TrustPillars() {
  const pillars = [
    {
      icon: Truck,
      title: 'Complimentary Express Delivery',
      description: 'Free courier delivery via TCS & Leopards on orders over Rs. 5,000 nationwide.',
    },
    {
      icon: ShieldCheck,
      title: '100% Verified Authenticity',
      description: 'Official brand stock with manufacturer warranty and tamper-evident sealed packaging.',
    },
    {
      icon: RotateCcw,
      title: '7-Day Easy Doorstep Returns',
      description: 'Hassle-free replacement policy if you are not 100% satisfied with your order.',
    },
    {
      icon: Headphones,
      title: 'Doorstep Cash on Delivery',
      description: 'Inspect your parcel upon arrival anywhere in Pakistan before completing payment.',
    },
  ];

  return (
    <section className="border-t border-slate-200/80 bg-white py-12 sm:py-16">
      <div className="max-w-[1480px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {pillars.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-[#FAF7F2]/60 border border-amber-900/10 flex items-start gap-4 hover:bg-[#FAF7F2] transition-colors"
              >
                <div className="w-12 h-12 rounded-xl bg-white border border-amber-200/80 text-[#8c6b2d] flex items-center justify-center shrink-0 shadow-2xs">
                  <Icon className="w-5 h-5 stroke-[1.75]" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-950">
                    {item.title}
                  </h4>
                  <p className="text-[11px] text-slate-600 leading-relaxed font-normal">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
