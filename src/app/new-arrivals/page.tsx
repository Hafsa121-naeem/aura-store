import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getProducts } from '@/lib/services/api';
import ProductGrid from '@/components/products/ProductGrid';
import { Sparkles, Truck, ShieldCheck, ArrowRight } from 'lucide-react';

export default async function NewArrivalsPage() {
  const products = await getProducts({ isNew: true });

  return (
    <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-12">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-slate-500 pb-4 border-b border-slate-200">
        <Link href="/" className="hover:text-slate-900 transition-colors font-medium">
          Home
        </Link>
        <span>/</span>
        <Link href="/products" className="hover:text-slate-900 transition-colors font-medium">
          Shop
        </Link>
        <span>/</span>
        <span className="text-slate-900 font-bold">New Arrivals</span>
      </nav>

      {/* Editorial Category Hero Banner */}
      <div className="relative rounded-3xl overflow-hidden bg-slate-950 text-white min-h-[340px] sm:min-h-[400px] flex items-center p-8 sm:p-14 border border-slate-800 shadow-xl">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=1600&q=80"
            alt="New Arrivals Showcase"
            fill
            priority
            className="object-cover opacity-35 filter brightness-75"
            unoptimized
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/80 to-transparent" />
        </div>

        <div className="relative z-10 max-w-xl space-y-4">
          <span className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest font-extrabold text-amber-300 bg-amber-950/80 border border-amber-800 px-3 py-1 rounded-full">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Just Dropped in Pakistan</span>
          </span>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
            Latest Releases &amp; Fresh Drops
          </h1>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
            Discover our newest studio releases: handcrafted calfskin handbags, titanium smartwatches, MagSafe accessories, and botanical skincare.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2 text-xs text-slate-300">
            <span className="flex items-center gap-1.5 font-semibold">
              <Truck className="w-4 h-4 text-emerald-400" />
              Express Delivery Across Pakistan
            </span>
            <span className="text-slate-600">•</span>
            <span className="flex items-center gap-1.5 font-semibold">
              <ShieldCheck className="w-4 h-4 text-indigo-400" />
              100% Genuine Sealed Stock
            </span>
          </div>
        </div>
      </div>

      {/* Products Section */}
      <div>
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4 pb-4 border-b border-slate-200">
          <div>
            <h2 className="text-2xl font-black text-slate-950 tracking-tight">
              Fresh Releases ({products.length} Products)
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Limited initial inventory stocked in Lahore and Karachi fulfillment centers.
            </p>
          </div>
          <Link
            href="/products?sort=newest"
            className="text-xs sm:text-sm font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1 whitespace-nowrap"
          >
            <span>Browse Full Catalog</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <ProductGrid products={products} />
      </div>
    </div>
  );
}
