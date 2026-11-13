import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getProducts } from '@/lib/services/api';
import ProductGrid from '@/components/products/ProductGrid';
import { Star, Truck, ShieldCheck, ArrowRight } from 'lucide-react';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function BestSellersPage() {
  const products = await getProducts({ sort: 'rating' });

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
        <span className="text-slate-900 font-bold">Best Sellers</span>
      </nav>

      {/* Editorial Category Hero Banner */}
      <div className="relative rounded-3xl overflow-hidden bg-slate-950 text-white min-h-[340px] sm:min-h-[400px] flex items-center p-8 sm:p-14 border border-slate-800 shadow-xl">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=1600&q=80"
            alt="Best Sellers Showcase"
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-35 filter brightness-75"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/80 to-transparent" />
        </div>

        <div className="relative z-10 max-w-xl space-y-4">
          <span className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest font-extrabold text-amber-300 bg-amber-950/80 border border-amber-800 px-3 py-1 rounded-full">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span>Community Favorites &bull; 4.8+ Stars</span>
          </span>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
            Customer Best Sellers in Pakistan
          </h1>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
            The most sought-after products rated 5 stars by verified buyers in Lahore, Karachi, Islamabad, and Faisalabad.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2 text-xs text-slate-300">
            <span className="flex items-center gap-1.5 font-semibold">
              <Truck className="w-4 h-4 text-emerald-400" />
              Cash on Delivery (COD) Nationwide
            </span>
            <span className="text-slate-600">•</span>
            <span className="flex items-center gap-1.5 font-semibold">
              <ShieldCheck className="w-4 h-4 text-indigo-400" />
              Over 500+ Verified 5-Star Reviews
            </span>
          </div>
        </div>
      </div>

      {/* Products Section */}
      <div>
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4 pb-4 border-b border-slate-200">
          <div>
            <h2 className="text-2xl font-black text-slate-950 tracking-tight">
              Top-Rated Products ({products.length} Products)
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Highest scoring items based on durability, customer satisfaction, and repeat purchases.
            </p>
          </div>
          <Link
            href="/products"
            className="text-xs sm:text-sm font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1 whitespace-nowrap"
          >
            <span>All Catalog Items</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <ProductGrid products={products} />
      </div>
    </div>
  );
}
