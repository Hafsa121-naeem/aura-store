'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';
import { formatPrice } from '@/lib/utils';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight, ShieldCheck, Truck, RotateCcw } from 'lucide-react';

export default function CartPage() {
  const {
    items,
    removeItem,
    updateQuantity,
    clearCart,
    subtotal,
    shippingFee,
    tax,
    total,
    itemCount,
  } = useCart();

  const freeShippingThreshold = 5000;
  const amountToFreeShipping = Math.max(0, freeShippingThreshold - subtotal);
  const freeShippingProgress = Math.min(100, (subtotal / freeShippingThreshold) * 100);

  if (items.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <div className="w-20 h-20 bg-white border border-slate-200 rounded-3xl flex items-center justify-center text-slate-400 mx-auto mb-6 shadow-xs">
          <ShoppingBag className="w-10 h-10" />
        </div>
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">Your Cart is Empty</h1>
        <p className="text-sm text-slate-700 max-w-md mx-auto mt-2 mb-8 font-normal">
          You have no items in your shopping bag. Explore our premium electronics, smart watches, and lifestyle essentials to get started.
        </p>
        <Link
          href="/products"
          className="inline-flex items-center gap-2 bg-slate-900 hover:bg-indigo-600 text-white font-bold px-8 py-3.5 rounded-xl transition-all shadow-sm"
        >
          <span>Explore Catalog</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <div className="mb-8 pb-4 border-b border-slate-200">
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">
          Shopping Bag ({itemCount} {itemCount === 1 ? 'item' : 'items'})
        </h1>
        <p className="text-xs sm:text-sm text-slate-700 mt-1">
          Review your selections and chosen colors before proceeding to nationwide Cash on Delivery checkout.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Items List */}
        <div className="lg:col-span-8 space-y-4">
          {/* Free Shipping Alert Box */}
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
            {amountToFreeShipping > 0 ? (
              <p className="text-xs text-slate-800 font-semibold mb-2">
                Add <span className="font-extrabold text-indigo-700">{formatPrice(amountToFreeShipping)}</span> more for <span className="font-extrabold text-slate-950">FREE Nationwide Delivery</span>!
              </p>
            ) : (
              <p className="text-xs text-emerald-800 font-bold mb-2 flex items-center gap-1.5">
                <Truck className="w-4 h-4 text-emerald-600" />
                <span>You have unlocked Free Express Delivery across Pakistan!</span>
              </p>
            )}
            <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
              <div
                className="bg-indigo-600 h-full rounded-full transition-all duration-300"
                style={{ width: `${freeShippingProgress}%` }}
              />
            </div>
          </div>

          {/* Items Card */}
          <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden divide-y divide-slate-100 shadow-xs">
            {items.map((item) => {
              const product = item.product;
              const unitPrice = product.sale_price ?? product.price;
              const imageSrc =
                item.selectedImage ||
                product.images?.[0]?.image_url ||
                'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80';

              return (
                <div key={item.id} className="p-5 sm:p-6 flex flex-col sm:flex-row gap-5 items-center">
                  <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden bg-slate-50 flex-shrink-0 border border-slate-200">
                    <Image
                      src={imageSrc}
                      alt={product.name}
                      fill
                      loading="lazy"
                      sizes="80px"
                      className="object-cover"
                    />
                  </div>

                  <div className="flex-1 w-full flex flex-col justify-between">
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                      <div>
                        <span className="text-[11px] font-bold text-indigo-700 uppercase tracking-wider">
                          {product.category?.name || 'AURA Signature'}
                        </span>
                        <h3 className="text-base font-bold text-slate-900 mt-0.5">
                          <Link href={`/products/${product.slug}`} className="hover:text-indigo-600 transition-colors">
                            {product.name}
                          </Link>
                        </h3>

                        {/* Selected Color & Size */}
                        <div className="flex flex-wrap items-center gap-2 mt-2">
                          {item.selectedColor && (
                            <span className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-800 bg-slate-100 px-2.5 py-1 rounded-lg border border-slate-200">
                              <span className="w-2.5 h-2.5 rounded-full bg-slate-900" />
                              Color: <span className="text-indigo-600">{item.selectedColor}</span>
                            </span>
                          )}
                          {item.selectedSize && (
                            <span className="text-xs font-bold text-slate-800 bg-slate-100 px-2.5 py-1 rounded-lg border border-slate-200">
                              Size: {item.selectedSize}
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="text-right sm:text-right mt-1 sm:mt-0">
                        <span className="text-base font-black text-slate-900">
                          {formatPrice(unitPrice * item.quantity)}
                        </span>
                        {item.quantity > 1 && (
                          <span className="block text-[11px] text-slate-600 font-medium">
                            {formatPrice(unitPrice)} each
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-4 pt-3 border-t border-slate-100">
                      <div className="flex items-center border border-slate-300 rounded-xl bg-white p-0.5 shadow-2xs">
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-1.5 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="w-10 text-center font-bold text-xs text-slate-900">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          disabled={item.quantity >= product.stock}
                          className="p-1.5 text-slate-600 hover:bg-slate-100 rounded-lg disabled:opacity-30 transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <button
                        type="button"
                        onClick={() => removeItem(item.id)}
                        className="text-xs font-semibold text-rose-600 hover:text-rose-800 flex items-center gap-1 transition-colors p-1"
                      >
                        <Trash2 className="w-4 h-4" />
                        <span>Remove</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex justify-between items-center pt-2">
            <button
              type="button"
              onClick={clearCart}
              className="text-xs font-semibold text-slate-500 hover:text-rose-600 transition-colors"
            >
              Clear entire shopping bag
            </button>
            <Link
              href="/products"
              className="text-xs font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1 transition-colors"
            >
              <span>Continue Shopping</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Right Summary Column */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white p-6 sm:p-7 rounded-3xl border border-slate-200 shadow-xs space-y-6">
            <h2 className="text-lg font-black text-slate-900 pb-3 border-b border-slate-100">
              Order Summary
            </h2>

            <div className="space-y-3 text-xs text-slate-600 font-medium">
              <div className="flex justify-between">
                <span>Subtotal ({itemCount} items)</span>
                <span className="font-bold text-slate-900">{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span>Nationwide Shipping</span>
                <span className="font-bold text-slate-900">
                  {shippingFee === 0 ? (
                    <span className="text-emerald-700 font-bold">FREE Delivery</span>
                  ) : (
                    formatPrice(shippingFee)
                  )}
                </span>
              </div>
              <div className="flex justify-between">
                <span>GST (5%)</span>
                <span className="font-bold text-slate-900">{formatPrice(tax)}</span>
              </div>

              <div className="pt-3 border-t border-slate-200 flex justify-between items-baseline">
                <span className="text-sm font-black text-slate-900">Grand Total</span>
                <span className="text-2xl font-black text-indigo-600">{formatPrice(total)}</span>
              </div>
            </div>

            <Link
              href="/checkout"
              className="w-full py-4 px-6 rounded-xl font-bold text-xs sm:text-sm bg-slate-900 hover:bg-indigo-600 text-white flex items-center justify-center gap-2 transition-all shadow-md shadow-slate-950/10 active:scale-98"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            {/* Assurance Icons */}
            <div className="space-y-3 pt-4 border-t border-slate-100 text-xs text-slate-600">
              <div className="flex items-center gap-2.5">
                <Truck className="w-4 h-4 text-indigo-600 flex-shrink-0" />
                <span>Cash on Delivery available nationwide</span>
              </div>
              <div className="flex items-center gap-2.5">
                <ShieldCheck className="w-4 h-4 text-indigo-600 flex-shrink-0" />
                <span>Official Warranty &amp; Authenticity guaranteed</span>
              </div>
              <div className="flex items-center gap-2.5">
                <RotateCcw className="w-4 h-4 text-indigo-600 flex-shrink-0" />
                <span>7-Day Return &amp; Replacement policy</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
