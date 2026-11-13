import React from 'react';
import Link from 'next/link';
import { getProducts } from '@/lib/services/api';
import ProductGrid from '@/components/products/ProductGrid';
import { ArrowRight } from 'lucide-react';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function WishlistPage() {
  // Show a selection of recommended / saved items for demo
  const products = await getProducts({ limit: 4 });

  return (
    <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-10">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-slate-500 pb-4 border-b border-slate-200">
        <Link href="/" className="hover:text-slate-900 transition-colors font-medium">
          Home
        </Link>
        <span>/</span>
        <span className="text-slate-900 font-bold">My Saved Wishlist</span>
      </nav>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <span className="text-[10px] uppercase font-bold tracking-[0.25em] text-[#b48a4c]">
            Saved For Later
          </span>
          <h1 className="text-3xl sm:text-4xl font-light tracking-tight text-slate-950 uppercase font-serif mt-1">
            My Wishlist
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Items you have marked to keep an eye on. Add them to your bag anytime for nationwide Cash on Delivery.
          </p>
        </div>

        <Link
          href="/products"
          className="text-xs font-bold uppercase tracking-wider text-slate-950 hover:text-[#b48a4c] flex items-center gap-1.5 transition-colors whitespace-nowrap"
        >
          <span>Continue Browsing</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* Wishlist Items Grid */}
      <div>
        <h2 className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-6">
          Saved Luxury Pieces
        </h2>
        <ProductGrid products={products} />
      </div>
    </div>
  );
}
