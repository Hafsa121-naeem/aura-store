import React from 'react';
import Link from 'next/link';
import { getProducts } from '@/lib/services/api';
import ProductGrid from '@/components/products/ProductGrid';
import FlashSaleBanner from '@/components/home/FlashSaleBanner';
import { Flame, ArrowRight } from 'lucide-react';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function SpecialOffersPage() {
  const allProducts = await getProducts();
  const discountedProducts = allProducts.filter(
    (p) => p.sale_price && p.sale_price < p.price
  );

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
        <span className="text-slate-900 font-bold">Special Offers &amp; Deals</span>
      </nav>

      {/* Interactive Flash Sale Countdown Hero */}
      <FlashSaleBanner />

      {/* Promotional Discount Code Strip */}
      <div className="bg-gradient-to-r from-rose-500 via-rose-600 to-indigo-700 text-white p-6 sm:p-8 rounded-3xl shadow-lg flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-1 text-center md:text-left">
          <span className="text-xs font-black uppercase tracking-widest text-rose-200">
            Exclusive Pakistan Voucher
          </span>
          <h3 className="text-2xl font-black">Get Extra 15% Off Your Entire Cart</h3>
          <p className="text-xs text-rose-100 max-w-md">
            Apply coupon code at checkout for orders delivered anywhere in Pakistan with Cash on Delivery.
          </p>
        </div>

        <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md border border-white/20 p-3 rounded-2xl">
          <div className="text-right">
            <span className="text-[10px] uppercase text-rose-200 font-bold block">Coupon Code</span>
            <span className="font-mono font-black text-lg tracking-wider">AURA15</span>
          </div>
          <button
            type="button"
            className="bg-white text-rose-600 font-black text-xs px-4 py-2.5 rounded-xl hover:bg-rose-50 transition-colors"
          >
            Copy Code
          </button>
        </div>
      </div>

      {/* Discounted Products Grid */}
      <div>
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4 pb-4 border-b border-slate-200">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-rose-600 uppercase tracking-widest mb-1">
              <Flame className="w-4 h-4 fill-rose-600" />
              <span>Limited Quantities</span>
            </div>
            <h2 className="text-2xl font-black text-slate-950 tracking-tight">
              On-Sale Products ({discountedProducts.length} Items Discounted)
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Discounts up to 35% off verified retail price. Valid while promotional stock lasts.
            </p>
          </div>
          <Link
            href="/products"
            className="text-xs sm:text-sm font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1 whitespace-nowrap"
          >
            <span>View All Regular Items</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <ProductGrid products={discountedProducts} />
      </div>
    </div>
  );
}
