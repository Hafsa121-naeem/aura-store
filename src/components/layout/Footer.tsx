'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { CheckCircle2, ShieldCheck, Truck, RotateCcw, Headphones } from 'lucide-react';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer className="bg-slate-950 text-slate-300 border-t border-slate-900 mt-16">
      {/* Top Value Strip */}
      <div className="border-b border-slate-900">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center text-[#e2c799] shrink-0">
                <Truck className="w-6 h-6 stroke-[1.5]" />
              </div>
              <div>
                <h4 className="text-white text-xs font-bold uppercase tracking-wider">Free Delivery Across Pakistan</h4>
                <p className="text-[11px] text-slate-400 mt-0.5">Complimentary for orders over Rs. 5,000</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center text-[#e2c799] shrink-0">
                <ShieldCheck className="w-6 h-6 stroke-[1.5]" />
              </div>
              <div>
                <h4 className="text-white text-xs font-bold uppercase tracking-wider">100% Genuine Products</h4>
                <p className="text-[11px] text-slate-400 mt-0.5">Official brand warranty &amp; sealed packaging</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center text-[#e2c799] shrink-0">
                <RotateCcw className="w-6 h-6 stroke-[1.5]" />
              </div>
              <div>
                <h4 className="text-white text-xs font-bold uppercase tracking-wider">7-Day Easy Returns</h4>
                <p className="text-[11px] text-slate-400 mt-0.5">Hassle-free replacement guarantee</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center text-[#e2c799] shrink-0">
                <Headphones className="w-6 h-6 stroke-[1.5]" />
              </div>
              <div>
                <h4 className="text-white text-xs font-bold uppercase tracking-wider">Cash on Delivery (COD)</h4>
                <p className="text-[11px] text-slate-400 mt-0.5">Inspect &amp; pay at doorstep nationwide</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links & Newsletter */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
          {/* Brand info */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex flex-col items-start group">
              <span className="text-2xl font-light tracking-[0.24em] text-white uppercase font-serif">
                AURA STORE
              </span>
              <span className="text-[9px] uppercase tracking-[0.3em] text-[#b48a4c] font-semibold mt-1">
                Luxury &bull; Pakistan
              </span>
            </Link>
            <p className="text-xs text-slate-400 max-w-sm leading-relaxed font-normal">
              Pakistan&apos;s premier modern shopping brand. Curating luxury Italian leathercraft, advanced smartwatches, high-fidelity acoustic gear, and contemporary living with nationwide Cash on Delivery.
            </p>

            <div className="pt-2">
              <p className="text-[11px] uppercase tracking-wider text-[#e2c799] font-bold mb-3">
                Join our VIP club for exclusive PKR vouchers
              </p>
              {subscribed ? (
                <div className="flex items-center gap-2 text-emerald-400 text-xs bg-emerald-950/60 border border-emerald-800 p-3 rounded-xl">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>Mubarak! You will receive a Rs. 500 voucher on your first order.</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex gap-2 max-w-sm">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#b48a4c]"
                  />
                  <button
                    type="submit"
                    className="bg-white hover:bg-[#e2c799] text-slate-950 px-4 py-2.5 rounded-xl text-xs font-bold transition-colors shrink-0"
                  >
                    Subscribe
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Links: Departments */}
          <div>
            <h5 className="text-xs uppercase tracking-wider text-white font-bold mb-4">Departments</h5>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link href="/products" className="hover:text-white transition-colors text-slate-400">
                  All Collections
                </Link>
              </li>
              <li>
                <Link href="/electronics" className="hover:text-white transition-colors text-slate-400">
                  Electronics &amp; Gadgets
                </Link>
              </li>
              <li>
                <Link href="/smart-watches" className="hover:text-white transition-colors text-slate-400">
                  Smart Watches
                </Link>
              </li>
              <li>
                <Link href="/fashion" className="hover:text-white transition-colors text-slate-400">
                  Fashion &amp; Handbags
                </Link>
              </li>
              <li>
                <Link href="/beauty" className="hover:text-white transition-colors text-slate-400">
                  Beauty &amp; Skincare
                </Link>
              </li>
              <li>
                <Link href="/home-living" className="hover:text-white transition-colors text-slate-400">
                  Home &amp; Living
                </Link>
              </li>
              <li>
                <Link href="/mobile-accessories" className="hover:text-white transition-colors text-slate-400">
                  Mobile Accessories
                </Link>
              </li>
            </ul>
          </div>

          {/* Links: Curated Collections */}
          <div>
            <h5 className="text-xs uppercase tracking-wider text-white font-bold mb-4">Highlights</h5>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <Link href="/new-arrivals" className="hover:text-white transition-colors">
                  New Releases 2026
                </Link>
              </li>
              <li>
                <Link href="/best-sellers" className="hover:text-white transition-colors">
                  Best Sellers in Pakistan
                </Link>
              </li>
              <li>
                <Link href="/special-offers" className="hover:text-white transition-colors text-[#e2c799] font-bold">
                  Special Offers &bull; 15% Off
                </Link>
              </li>
              <li>
                <Link href="/wishlist" className="hover:text-white transition-colors">
                  My Saved Wishlist
                </Link>
              </li>
              <li>
                <Link href="/cart" className="hover:text-white transition-colors">
                  Shopping Bag
                </Link>
              </li>
            </ul>
          </div>

          {/* Links: Customer Care */}
          <div>
            <h5 className="text-xs uppercase tracking-wider text-white font-bold mb-4">Customer Care</h5>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <Link href="/account/orders" className="hover:text-white transition-colors">
                  TCS &amp; Leopards Tracking
                </Link>
              </li>
              <li>
                <Link href="/account" className="hover:text-white transition-colors">
                  My Account &amp; Profile
                </Link>
              </li>
              <li>
                <span className="text-slate-400">Cash on Delivery across Pakistan</span>
              </li>
              <li>
                <span className="text-slate-400">Support: WhatsApp &amp; Email</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Copyright & Payment Methods */}
        <div className="pt-10 mt-10 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <p>&copy; 2026 AURA STORE (PVT) LTD. All rights reserved. Lahore, Karachi, Islamabad.</p>
          <div className="flex items-center gap-3 text-slate-400">
            <span>Cash on Delivery (COD)</span>
            <span>&bull;</span>
            <span>TCS Courier Express</span>
            <span>&bull;</span>
            <span>Leopards Logistics</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
