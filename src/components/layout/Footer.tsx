'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  CheckCircle2,
  ShieldCheck,
  Truck,
  RotateCcw,
  Headphones,
  Mail,
  ArrowRight,
  Phone,
  MapPin,
  Clock,
  ExternalLink,
} from 'lucide-react';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim() && email.includes('@')) {
      setSubscribed(true);
      setEmail('');
    }
  };

  const departments = [
    { name: 'Electronics & Audio', href: '/electronics' },
    { name: 'Smart Watches', href: '/smart-watches' },
    { name: 'Fashion & Handbags', href: '/fashion' },
    { name: 'Beauty & Skincare', href: '/beauty' },
    { name: 'Home & Living', href: '/home-living' },
    { name: 'Mobile Accessories', href: '/mobile-accessories' },
  ];

  const quickLinks = [
    { name: 'Explore All Catalog', href: '/products' },
    { name: 'Special Offers (Up to 25% Off)', href: '/special-offers' },
    { name: 'New Seasonal Arrivals', href: '/new-arrivals' },
    { name: 'Best Sellers Leaderboard', href: '/best-sellers' },
    { name: 'Saved Wishlist', href: '/wishlist' },
    { name: 'Shopping Bag', href: '/cart' },
  ];

  const customerCare = [
    { name: 'Track Nationwide Order', href: '/account/orders' },
    { name: 'Doorstep Cash on Delivery (COD)', href: '/checkout' },
    { name: '7-Day Replacement Policy', href: '/products' },
    { name: 'Official 12M Warranty Support', href: '/products' },
    { name: 'Customer Account Login', href: '/auth/login' },
    { name: 'Admin Management Portal', href: '/admin' },
  ];

  const cities = [
    'Lahore',
    'Karachi',
    'Islamabad',
    'Rawalpindi',
    'Faisalabad',
    'Multan',
    'Peshawar',
    'Sialkot',
    'Gujranwala',
    'Quetta',
    'Hyderabad',
    'Bahawalpur',
  ];

  return (
    <footer className="bg-[#FAF7F2] text-slate-700 border-t border-amber-900/10 mt-20">
      
      {/* 1. Value Pillars Header Strip */}
      <div className="border-b border-amber-900/10 bg-white">
        <div className="max-w-[1480px] mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-200 text-[#8c6b2d] flex items-center justify-center shrink-0 shadow-2xs">
                <Truck className="w-5 h-5 stroke-[1.75]" />
              </div>
              <div>
                <h4 className="text-slate-950 text-xs font-bold uppercase tracking-wider">
                  Express Nationwide Dispatch
                </h4>
                <p className="text-[11px] text-slate-500 mt-0.5 font-normal">
                  Free courier delivery on orders over Rs. 5,000
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-200 text-[#8c6b2d] flex items-center justify-center shrink-0 shadow-2xs">
                <ShieldCheck className="w-5 h-5 stroke-[1.75]" />
              </div>
              <div>
                <h4 className="text-slate-950 text-xs font-bold uppercase tracking-wider">
                  100% Verified Authentic
                </h4>
                <p className="text-[11px] text-slate-500 mt-0.5 font-normal">
                  Official manufacturer warranty &amp; sealed stock
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-200 text-[#8c6b2d] flex items-center justify-center shrink-0 shadow-2xs">
                <RotateCcw className="w-5 h-5 stroke-[1.75]" />
              </div>
              <div>
                <h4 className="text-slate-950 text-xs font-bold uppercase tracking-wider">
                  7-Day Easy Returns
                </h4>
                <p className="text-[11px] text-slate-500 mt-0.5 font-normal">
                  Doorstep collection &amp; hassle-free replacement
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-200 text-[#8c6b2d] flex items-center justify-center shrink-0 shadow-2xs">
                <Headphones className="w-5 h-5 stroke-[1.75]" />
              </div>
              <div>
                <h4 className="text-slate-950 text-xs font-bold uppercase tracking-wider">
                  Doorstep COD Nationwide
                </h4>
                <p className="text-[11px] text-slate-500 mt-0.5 font-normal">
                  Inspect parcel upon arrival before paying
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Main Footer Navigation Links */}
      <div className="max-w-[1480px] mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Brand Info & Mission */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex flex-col items-start group">
              <span className="text-2xl font-light tracking-[0.24em] text-slate-950 uppercase font-serif">
                AURA STORE
              </span>
              <span className="text-[9px] uppercase tracking-[0.3em] text-[#8c6b2d] font-bold mt-1">
                Luxury &bull; Pakistan
              </span>
            </Link>

            <p className="text-xs text-slate-600 leading-relaxed font-normal max-w-sm">
              Pakistan&apos;s premier multi-category marketplace. Curating authenticated electronics, aerospace titanium timepieces, handcrafted Italian leather, and clean botanical skincare with nationwide Cash on Delivery.
            </p>

            <div className="space-y-1.5 text-xs text-slate-600 pt-2">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#b48a4c]" />
                <span>Headquarters: Gulberg III, Lahore, Pakistan</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#b48a4c]" />
                <span>Concierge: +92 (42) 3578-9000 &bull; 0300-AURA-PK</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-[#b48a4c]" />
                <span>Mon – Sat: 9:00 AM – 9:00 PM PKT</span>
              </div>
            </div>
          </div>

          {/* Departments */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-slate-950">
              Departments
            </h4>
            <ul className="space-y-2 text-xs">
              {departments.map((d) => (
                <li key={d.name}>
                  <Link
                    href={d.href}
                    className="text-slate-600 hover:text-slate-950 hover:underline transition-colors font-medium"
                  >
                    {d.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-slate-950">
              Catalog &amp; Offers
            </h4>
            <ul className="space-y-2 text-xs">
              {quickLinks.map((q) => (
                <li key={q.name}>
                  <Link
                    href={q.href}
                    className="text-slate-600 hover:text-slate-950 hover:underline transition-colors font-medium"
                  >
                    {q.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Care & Admin */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-slate-950">
              Customer Assurance
            </h4>
            <ul className="space-y-2 text-xs">
              {customerCare.map((c) => (
                <li key={c.name}>
                  <Link
                    href={c.href}
                    className="text-slate-600 hover:text-slate-950 hover:underline transition-colors font-medium"
                  >
                    {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* 3. Nationwide Delivery Coverage Strip */}
        <div className="mt-12 pt-8 border-t border-amber-900/10">
          <p className="text-[10px] font-bold uppercase tracking-wider text-[#8c6b2d] mb-2">
            Nationwide Cash on Delivery (COD) Cities:
          </p>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-slate-500 font-medium">
            {cities.map((city, idx) => (
              <span key={city} className="flex items-center gap-3">
                <span className="hover:text-slate-950 transition-colors">{city}</span>
                {idx < cities.length - 1 && <span className="text-slate-300">&bull;</span>}
              </span>
            ))}
            <span className="text-slate-400">&amp; 110+ other cities across Pakistan</span>
          </div>
        </div>

        {/* 4. Bottom Legal & Currency Notice */}
        <div className="mt-8 pt-8 border-t border-amber-900/10 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>
            &copy; {new Date().getFullYear()} <strong>AURA STORE (Private) Limited</strong>. All rights reserved.
          </p>

          <div className="flex items-center gap-4 text-xs font-semibold">
            <span className="text-[#8c6b2d]">All Prices Displayed in PKR (Rs.)</span>
            <span>&bull;</span>
            <span className="text-emerald-700 flex items-center gap-1 font-bold">
              <CheckCircle2 className="w-3.5 h-3.5" />
              Verified Secure Checkout
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
}
