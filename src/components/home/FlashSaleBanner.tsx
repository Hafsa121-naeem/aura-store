'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ChevronRight, Clock, ShieldCheck, Flame } from 'lucide-react';

export default function FlashSaleBanner() {
  const [timeLeft, setTimeLeft] = useState({
    hours: 8,
    minutes: 42,
    seconds: 19,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: 59, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return { hours: 12, minutes: 0, seconds: 0 };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-slate-950 via-indigo-950 to-slate-900 p-8 sm:p-12 text-white shadow-2xl border border-indigo-900/50">
        {/* Ambient background decoration */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-600/20 blur-3xl rounded-full pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 w-64 h-64 bg-violet-600/10 blur-2xl rounded-full pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
          {/* Left Text */}
          <div className="space-y-4 max-w-xl text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/20 text-rose-300 text-xs font-bold border border-rose-500/30">
              <Flame className="w-3.5 h-3.5 fill-rose-400 text-rose-400 animate-pulse" />
              <span>Limited Stock Flash Event • Pakistan</span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-white leading-tight">
              Upgrade Your Everyday. <br />
              <span className="text-indigo-400">Save Up to Rs. 5,000 Today.</span>
            </h2>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
              Special promotional discounts on premium smartwatches, ANC audio monitors, and French perfumes. Cash on Delivery is active in Karachi, Lahore, Islamabad, and 150+ cities across Pakistan.
            </p>

            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs font-semibold text-slate-300 pt-1">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>100% Genuine Guaranteed</span>
              </div>
              <span>•</span>
              <div>Free Delivery Over Rs. 5,000</div>
              <span>•</span>
              <div>7-Day Easy Replacement</div>
            </div>
          </div>

          {/* Right Timer & CTA */}
          <div className="flex flex-col items-center gap-5 shrink-0 bg-white/10 backdrop-blur-md p-6 rounded-3xl border border-white/10">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-indigo-300">
              <Clock className="w-3.5 h-3.5 animate-spin" />
              <span>Offer Closes In</span>
            </div>

            {/* Countdown Boxes */}
            <div className="flex items-center gap-2.5 sm:gap-3 text-center">
              <div className="bg-slate-900/90 border border-slate-700/80 rounded-2xl w-16 sm:w-18 py-2.5 shadow-inner">
                <span className="text-xl sm:text-2xl font-black text-white font-mono block">
                  {String(timeLeft.hours).padStart(2, '0')}
                </span>
                <span className="text-[10px] uppercase font-bold text-slate-400">Hours</span>
              </div>
              <span className="text-xl font-bold text-slate-400">:</span>
              <div className="bg-slate-900/90 border border-slate-700/80 rounded-2xl w-16 sm:w-18 py-2.5 shadow-inner">
                <span className="text-xl sm:text-2xl font-black text-white font-mono block">
                  {String(timeLeft.minutes).padStart(2, '0')}
                </span>
                <span className="text-[10px] uppercase font-bold text-slate-400">Mins</span>
              </div>
              <span className="text-xl font-bold text-slate-400">:</span>
              <div className="bg-slate-900/90 border border-slate-700/80 rounded-2xl w-16 sm:w-18 py-2.5 shadow-inner">
                <span className="text-xl sm:text-2xl font-black text-rose-400 font-mono block">
                  {String(timeLeft.seconds).padStart(2, '0')}
                </span>
                <span className="text-[10px] uppercase font-bold text-slate-400">Secs</span>
              </div>
            </div>

            <Link
              href="/products?sort=price-desc"
              className="w-full bg-white hover:bg-slate-100 text-slate-950 font-black px-6 py-3.5 rounded-xl text-xs sm:text-sm transition-all shadow-md flex items-center justify-center gap-2 hover:translate-y-[-1px] active:translate-y-0"
            >
              <span>Explore Deals</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}