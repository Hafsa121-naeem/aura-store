'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, ShieldCheck, Sparkles, CheckCircle2, Award } from 'lucide-react';

export default function BrandStorytelling() {
  return (
    <section className="py-20 sm:py-28 bg-[#FAF7F2]/60 border-t border-amber-900/10 overflow-hidden">
      <div className="max-w-[1480px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Magazine Editorial Story */}
          <div className="lg:col-span-6 space-y-8">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[#b48a4c]/30 text-[#8c6b2d] text-[10px] uppercase tracking-[0.24em] font-bold shadow-2xs">
                <Award className="w-3.5 h-3.5 text-[#b48a4c]" />
                <span>Our Heritage &bull; Pakistan</span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light font-serif text-slate-950 tracking-tight leading-[1.15]">
                Curating Elegance. <br />
                <span className="italic font-normal text-[#8c6b2d]">Delivering Trust Across Pakistan.</span>
              </h2>
            </div>

            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-normal">
              AURA STORE was founded on a singular principle: Pakistani consumers deserve access to authentic, internationally acclaimed electronics, smart wearables, and artisan fashion without compromise or uncertainty.
            </p>

            {/* 3 Pillars of Distinction */}
            <div className="space-y-5 pt-2">
              <div className="flex items-start gap-4 p-4 rounded-2xl bg-white border border-slate-200/80 shadow-2xs">
                <div className="w-10 h-10 rounded-xl bg-amber-50 text-[#8c6b2d] flex items-center justify-center shrink-0 font-serif font-bold text-sm">
                  01
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-950 uppercase tracking-wider">
                    Official Authenticity Guarantee
                  </h4>
                  <p className="text-[11px] text-slate-600 mt-1 font-normal leading-relaxed">
                    Direct brand procurement with verified serial numbers and official 12-month replacement warranties.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-2xl bg-white border border-slate-200/80 shadow-2xs">
                <div className="w-10 h-10 rounded-xl bg-amber-50 text-[#8c6b2d] flex items-center justify-center shrink-0 font-serif font-bold text-sm">
                  02
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-950 uppercase tracking-wider">
                    Tamper-Evident Sealed Packaging
                  </h4>
                  <p className="text-[11px] text-slate-600 mt-1 font-normal leading-relaxed">
                    Every shipment is individually bubble-sealed and inspected before express dispatch via TCS &amp; Leopards Courier.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-2xl bg-white border border-slate-200/80 shadow-2xs">
                <div className="w-10 h-10 rounded-xl bg-amber-50 text-[#8c6b2d] flex items-center justify-center shrink-0 font-serif font-bold text-sm">
                  03
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-950 uppercase tracking-wider">
                    Nationwide Doorstep Inspection &amp; COD
                  </h4>
                  <p className="text-[11px] text-slate-600 mt-1 font-normal leading-relaxed">
                    Verify your parcel upon arrival at your residence in Lahore, Karachi, Islamabad or any city before completing cash payment.
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <Link
                href="/products"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-slate-950 text-white hover:bg-[#b48a4c] hover:text-slate-950 text-xs font-bold uppercase tracking-[0.2em] transition-all shadow-md group"
              >
                <span>Discover The Full Collection</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

          {/* Right Column: Editorial Visual Composition */}
          <div className="lg:col-span-6 relative">
            <div className="grid grid-cols-2 gap-4">
              <div className="relative aspect-[3/4] rounded-3xl overflow-hidden shadow-xl bg-white border border-amber-900/10">
                <Image
                  src="https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800&q=85"
                  alt="Italian Leather Craftsmanship"
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-700"
                  unoptimized
                />
              </div>

              <div className="space-y-4 pt-8">
                <div className="relative aspect-square rounded-3xl overflow-hidden shadow-xl bg-white border border-amber-900/10">
                  <Image
                    src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=85"
                    alt="Precision Watchmaking"
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-700"
                    unoptimized
                  />
                </div>

                <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-md space-y-2">
                  <div className="text-3xl font-black text-slate-950 font-serif">50,000+</div>
                  <div className="text-xs font-bold text-slate-900">Satisfied Pakistani Customers</div>
                  <p className="text-[11px] text-slate-500 font-normal">
                    Delivered across 120+ cities nationwide with verified 4.9-star average rating.
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
