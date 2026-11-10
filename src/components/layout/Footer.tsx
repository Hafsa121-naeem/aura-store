'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ShieldCheck, Truck, RotateCcw, ArrowRight, Check } from 'lucide-react';

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
    { name: 'Acoustic Chamber (Electronics)', href: '/electronics' },
    { name: 'Precision Horology (Smartwatches)', href: '/smart-watches' },
    { name: 'Sartorial Wardrobe (Italian Leather)', href: '/fashion' },
    { name: 'Botanical & Scent (Clean Skincare)', href: '/beauty' },
    { name: 'Living Space (Home & Ceramics)', href: '/home-living' },
    { name: 'Mobile Architecture (MagSafe Docks)', href: '/mobile-accessories' },
  ];

  const clientCare = [
    { name: 'Track Nationwide Order', href: '/account/orders' },
    { name: 'Cash on Delivery Protocol', href: '/checkout' },
    { name: 'Doorstep Inspection Policy', href: '/products' },
    { name: '7-Day Replacement Guarantee', href: '/products' },
    { name: 'Official 12-Month Warranty', href: '/products' },
    { name: 'Admin Management Portal', href: '/admin/products' },
  ];

  return (
    <footer className="bg-[#1A1918] text-[#EDE8DF] border-t border-[#3D3A35] mt-24">
      
      {/* 1. ferm LIVING Value Assurance Strip */}
      <div className="border-b border-[#2E2C28] py-8 sm:py-10 px-6 sm:px-10">
        <div className="max-w-[1540px] mx-auto grid grid-cols-1 sm:grid-cols-3 gap-8">
          <div className="flex items-center gap-4">
            <Truck className="w-5 h-5 text-[#9E814D] stroke-[1.5]" />
            <div>
              <h4 className="text-xs uppercase tracking-[0.2em] font-light text-[#FAF8F5]">
                Complimentary Express Delivery
              </h4>
              <p className="text-[11px] text-[#8C867D] font-light mt-0.5">
                On all nationwide orders exceeding Rs. 5,000
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <ShieldCheck className="w-5 h-5 text-[#9E814D] stroke-[1.5]" />
            <div>
              <h4 className="text-xs uppercase tracking-[0.2em] font-light text-[#FAF8F5]">
                100% Certified Authentic Stock
              </h4>
              <p className="text-[11px] text-[#8C867D] font-light mt-0.5">
                Sourced with official manufacturer warranty cards
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <RotateCcw className="w-5 h-5 text-[#9E814D] stroke-[1.5]" />
            <div>
              <h4 className="text-xs uppercase tracking-[0.2em] font-light text-[#FAF8F5]">
                Doorstep Inspection &amp; COD
              </h4>
              <p className="text-[11px] text-[#8C867D] font-light mt-0.5">
                Inspect parcel contents before paying at your door
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Main Architectural Four-Column Footer */}
      <div className="max-w-[1540px] mx-auto px-6 sm:px-10 py-16 sm:py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-14 pb-16 border-b border-[#2E2C28]">
          
          {/* Brand Manifesto */}
          <div className="lg:col-span-4 space-y-4">
            <Link href="/" className="inline-block">
              <span className="text-2xl font-editorial font-light tracking-[0.28em] uppercase text-[#FAF8F5]">
                AURA STORE
              </span>
            </Link>
            <p className="text-xs text-[#8C867D] font-light leading-relaxed max-w-sm">
              A bespoke convergence of Danish architectural restraint and sensory materiality. We curate hi-fi acoustics, precision horology, and artisan leather for the mindful living space.
            </p>
            <div className="pt-2 text-[11px] font-mono text-[#9E814D] uppercase tracking-wider">
              Copenhagen Inspired &bull; Curated for Pakistan
            </div>
          </div>

          {/* Departments */}
          <div className="lg:col-span-3 space-y-3">
            <h5 className="text-xs uppercase tracking-[0.24em] font-light text-[#FAF8F5]">
              Spaces &amp; Departments
            </h5>
            <ul className="space-y-2 text-xs font-light text-[#8C867D]">
              {departments.map((dept) => (
                <li key={dept.name}>
                  <Link
                    href={dept.href}
                    className="hover:text-[#FAF8F5] transition-colors"
                  >
                    {dept.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Client Care */}
          <div className="lg:col-span-2 space-y-3">
            <h5 className="text-xs uppercase tracking-[0.24em] font-light text-[#FAF8F5]">
              Client Care
            </h5>
            <ul className="space-y-2 text-xs font-light text-[#8C867D]">
              {clientCare.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="hover:text-[#FAF8F5] transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Private Newsletter */}
          <div className="lg:col-span-3 space-y-4">
            <h5 className="text-xs uppercase tracking-[0.24em] font-light text-[#FAF8F5]">
              Private Dispatch
            </h5>
            <p className="text-xs text-[#8C867D] font-light leading-relaxed">
              Receive private seasonal previews, quiet notes on materiality, and exclusive collector drops.
            </p>

            <form onSubmit={handleSubscribe} className="space-y-3">
              <div className="flex items-center border-b border-[#3D3A35] pb-2 focus-within:border-[#FAF8F5] transition-colors">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address..."
                  required
                  className="bg-transparent text-xs text-[#FAF8F5] placeholder-[#8C867D] focus:outline-none flex-1 font-light tracking-wide"
                />
                <button
                  type="submit"
                  className="text-xs uppercase tracking-[0.2em] text-[#EDE8DF] hover:text-[#9E814D] transition-colors pl-2"
                >
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {subscribed && (
                <p className="text-[11px] text-[#9E814D] font-mono flex items-center gap-1.5">
                  <Check className="w-3 h-3 text-emerald-400" />
                  <span>Welcome to the private circle. Check your inbox.</span>
                </p>
              )}
            </form>
          </div>

        </div>

        {/* Bottom Colophon & Nationwide Cities */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] text-[#8C867D] font-light tracking-wider">
          <p>
            &copy; 2026 AURA STORE. All prices in PKR (Rs.). Cash on Delivery across Pakistan.
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <span>Karachi</span> &bull;
            <span>Lahore</span> &bull;
            <span>Islamabad</span> &bull;
            <span>Rawalpindi</span> &bull;
            <span>Faisalabad</span> &bull;
            <span>Peshawar</span> &bull;
            <span>Quetta</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
