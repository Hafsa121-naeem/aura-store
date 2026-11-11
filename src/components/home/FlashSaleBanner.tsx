'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'motion/react';
import { useCart } from '@/context/CartContext';
import { formatPrice } from '@/lib/utils';
import { Zap, Clock, ShoppingBag, Check, ArrowRight, FireExtinguisher as Flame, Truck } from 'lucide-react';

export default function FlashSaleBanner() {
  const { addItem, setIsCartOpen } = useCart();
  const [addedItem, setAddedItem] = useState<string | null>(null);

  // Live Countdown Timer (14h 26m 45s from current day end)
  const [timeLeft, setTimeLeft] = useState({ hours: 14, minutes: 28, seconds: 42 });

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
        return { hours: 23, minutes: 59, seconds: 59 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const promoProducts = [
    {
      id: 'sw-ap-01',
      name: 'Apex Ultra Titanium Sapphire AMOLED Smartwatch',
      slug: 'apex-ultra-titanium-sapphire-amoled-smartwatch',
      price: 21999,
      salePrice: 16999,
      discount: 23,
      claimed: 78,
      stockRemaining: 7,
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80',
    },
    {
      id: 'f-hb-01',
      name: 'Verona Handcrafted Handbag in Full-Grain Leather',
      slug: 'verona-italian-kelly-handbag',
      price: 24999,
      salePrice: 19999,
      discount: 20,
      claimed: 86,
      stockRemaining: 4,
      image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800&q=80',
    },
    {
      id: 'b-sr-01',
      name: 'Radiance Multi-Peptide Firming Youth Serum',
      slug: 'radiance-multi-peptide-firming-youth-serum',
      price: 8999,
      salePrice: 6999,
      discount: 22,
      claimed: 92,
      stockRemaining: 3,
      image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=800&q=80',
    },
  ];

  const handleQuickAdd = (p: typeof promoProducts[0]) => {
    addItem(
      {
        id: p.id,
        name: p.name,
        slug: p.slug,
        price: p.price,
        sale_price: p.salePrice,
        category_id: 'promo',
        stock: p.stockRemaining,
        rating: 4.9,
        review_count: 50,
        status: 'published',
        featured: true,
        images: [{ id: '1', product_id: p.id, image_url: p.image, is_primary: true }],
      } as any,
      1,
      undefined,
      undefined,
      p.image
    );
    setAddedItem(p.id);
    setTimeout(() => {
      setAddedItem(null);
      setIsCartOpen(true);
    }, 600);
  };

  return (
    <section className="py-16 sm:py-20 bg-white">
      <div className="max-w-[1480px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-br from-[#FAF7F2] via-[#F5EFE6] to-[#FAF7F2] border border-[#b48a4c]/20 p-6 sm:p-10 lg:p-12 shadow-sm relative overflow-hidden">
          
          {/* Header & Live Timer Bar */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between pb-8 mb-8 border-b border-amber-900/10 gap-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 text-rose-700 border border-rose-200 text-[10px] font-black uppercase tracking-wider">
                <Zap className="w-3.5 h-3.5 text-rose-600 fill-rose-600" />
                <span>Limited Time Promotion &bull; Up to 25% Off</span>
              </div>
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-light font-serif text-slate-950">
                Nationwide Flash Event
              </h3>
              <p className="text-xs text-slate-600 font-normal">
                Authentic stock with doorstep Cash on Delivery inspection across Pakistan.
              </p>
            </div>

            {/* Countdown Display Boxes */}
            <div className="flex items-center gap-3">
              <div className="flex flex-col items-center justify-center w-16 h-16 rounded-2xl bg-white border border-slate-200 shadow-sm">
                <span className="text-xl font-black text-slate-950">{String(timeLeft.hours).padStart(2, '0')}</span>
                <span className="text-[9px] uppercase tracking-wider text-slate-400 font-bold">Hours</span>
              </div>
              <span className="text-xl font-bold text-slate-400">:</span>
              <div className="flex flex-col items-center justify-center w-16 h-16 rounded-2xl bg-white border border-slate-200 shadow-sm">
                <span className="text-xl font-black text-slate-950">{String(timeLeft.minutes).padStart(2, '0')}</span>
                <span className="text-[9px] uppercase tracking-wider text-slate-400 font-bold">Mins</span>
              </div>
              <span className="text-xl font-bold text-slate-400">:</span>
              <div className="flex flex-col items-center justify-center w-16 h-16 rounded-2xl bg-white border border-slate-200 shadow-sm">
                <span className="text-xl font-black text-[#b48a4c]">{String(timeLeft.seconds).padStart(2, '0')}</span>
                <span className="text-[9px] uppercase tracking-wider text-slate-400 font-bold">Secs</span>
              </div>
            </div>
          </div>

          {/* Promotional Product Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {promoProducts.map((p) => (
              <div
                key={p.id}
                className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="relative aspect-video rounded-xl overflow-hidden bg-slate-50 border border-slate-100">
                    <Image
                      src={p.image}
                      alt={p.name}
                      fill
                      className="object-cover hover:scale-105 transition-transform duration-500"
                      unoptimized
                    />
                    <div className="absolute top-2 left-2 bg-[#b48a4c] text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                      {p.discount}% OFF
                    </div>
                  </div>

                  <Link href={`/products/${p.slug}`}>
                    <h4 className="text-xs font-bold text-slate-900 hover:text-[#8c6b2d] transition-colors line-clamp-1">
                      {p.name}
                    </h4>
                  </Link>

                  <div className="flex items-baseline gap-2">
                    <span className="text-base font-black text-slate-950">{formatPrice(p.salePrice)}</span>
                    <span className="text-xs text-slate-400 line-through">{formatPrice(p.price)}</span>
                  </div>

                  {/* Stock Scarcity Bar */}
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-[10px] font-semibold">
                      <span className="text-rose-600">Only {p.stockRemaining} units left!</span>
                      <span className="text-slate-400">{p.claimed}% claimed</span>
                    </div>
                    <div className="w-full h-1.5 rounded-full bg-slate-100 overflow-hidden">
                      <div className="h-full bg-rose-500 rounded-full" style={{ width: `${p.claimed}%` }} />
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => handleQuickAdd(p)}
                  disabled={addedItem === p.id}
                  className={`w-full py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all ${
                    addedItem === p.id
                      ? 'bg-emerald-600 text-white'
                      : 'bg-slate-950 text-white hover:bg-[#b48a4c] hover:text-slate-950 active:scale-98'
                  }`}
                >
                  {addedItem === p.id ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>Added to Bag</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>Claim Deal</span>
                    </>
                  )}
                </button>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
