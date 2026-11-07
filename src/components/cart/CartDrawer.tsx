'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';
import { formatPrice } from '@/lib/utils';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, Truck } from 'lucide-react';

export default function CartDrawer() {
  const {
    items,
    removeItem,
    updateQuantity,
    isCartOpen,
    setIsCartOpen,
    subtotal,
    shippingFee,
    tax,
    total,
    itemCount,
  } = useCart();

  if (!isCartOpen) return null;

  const freeShippingThreshold = 5000;
  const amountToFreeShipping = Math.max(0, freeShippingThreshold - subtotal);
  const freeShippingProgress = Math.min(100, (subtotal / freeShippingThreshold) * 100);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-slate-950/50 backdrop-blur-xs transition-opacity animate-in fade-in"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col">
          {/* Header */}
          <div className="p-5 border-b border-slate-200 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-indigo-600" />
              <h2 className="text-base font-extrabold text-slate-900">
                Shopping Bag ({itemCount} {itemCount === 1 ? 'item' : 'items'})
              </h2>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-xl transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Shipping progress indicator */}
          <div className="bg-slate-50 px-5 py-3 border-b border-slate-200">
            {amountToFreeShipping > 0 ? (
              <p className="text-xs text-slate-700 font-medium mb-1.5">
                Add <span className="font-extrabold text-indigo-700">{formatPrice(amountToFreeShipping)}</span> more for <span className="font-bold">FREE Express Delivery</span>
              </p>
            ) : (
              <p className="text-xs text-emerald-800 font-bold mb-1.5 flex items-center gap-1">
                <Truck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Unlocked: Free Nationwide Express Delivery!</span>
              </p>
            )}
            <div className="w-full bg-slate-200 rounded-full h-1.5 overflow-hidden">
              <div
                className="bg-indigo-600 h-full rounded-full transition-all duration-300"
                style={{ width: `${freeShippingProgress}%` }}
              />
            </div>
          </div>

          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <div className="w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-400 mb-4">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h3 className="text-base font-bold text-slate-900">Your bag is empty</h3>
                <p className="text-xs text-slate-700 max-w-xs mt-1 mb-6">
                  Explore our curated electronics, watches, fashion, and lifestyle essentials.
                </p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="bg-slate-900 hover:bg-indigo-600 text-white px-5 py-2.5 rounded-xl text-xs font-bold transition-colors shadow-xs"
                >
                  Explore Catalog
                </button>
              </div>
            ) : (
              items.map((item) => {
                const product = item.product;
                const unitPrice = (item.variantSalePrice ?? item.variantPrice) ?? (product.sale_price ?? product.price);
                const imageSrc =
                  item.selectedImage ||
                  product.images?.[0]?.image_url ||
                  'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80';

                return (
                  <div
                    key={item.id}
                    className="flex gap-4 p-3 bg-slate-50/70 rounded-2xl border border-slate-200/80 hover:border-slate-300 transition-colors"
                  >
                    {/* Thumbnail */}
                    <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-white border border-slate-200 shrink-0">
                      <Image
                        src={imageSrc}
                        alt={product.name}
                        fill
                        className="object-cover"
                        unoptimized
                      />
                    </div>

                    {/* Details */}
                    <div className="flex-1 flex flex-col justify-between min-w-0">
                      <div>
                        <div className="flex items-start justify-between gap-2">
                          <Link
                            href={`/products/${product.slug}`}
                            onClick={() => setIsCartOpen(false)}
                            className="text-xs font-bold text-slate-900 hover:text-indigo-600 line-clamp-1 transition-colors"
                          >
                            {product.name}
                          </Link>
                          <button
                            type="button"
                            onClick={() => removeItem(item.id)}
                            className="text-slate-400 hover:text-rose-600 transition-colors p-0.5"
                            aria-label="Remove item"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        {/* Selected Color / Variant Badge */}
                        <div className="flex flex-wrap items-center gap-2 mt-1">
                          {item.selectedColor && (
                            <span className="inline-flex items-center gap-1 text-[11px] font-bold text-slate-700 bg-white px-2 py-0.5 rounded-md border border-slate-200">
                              <span className="w-2 h-2 rounded-full bg-slate-900" />
                              {item.selectedColor}
                            </span>
                          )}
                          {item.selectedSize && (
                            <span className="text-[11px] font-bold text-slate-700 bg-white px-2 py-0.5 rounded-md border border-slate-200">
                              Size: {item.selectedSize}
                            </span>
                          )}
                        </div>

                        <div className="text-xs font-bold text-slate-900 mt-1">
                          {formatPrice(unitPrice)}
                        </div>
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-200/60">
                        <div className="flex items-center border border-slate-300 rounded-lg bg-white">
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="p-1 text-slate-600 hover:text-slate-950 transition-colors"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="w-7 text-center text-xs font-bold text-slate-900">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-1 text-slate-600 hover:text-slate-950 transition-colors"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <div className="text-xs font-extrabold text-slate-900">
                          {formatPrice(unitPrice * item.quantity)}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Footer Checkout Summary */}
          {items.length > 0 && (
            <div className="p-5 border-t border-slate-200 bg-white space-y-3">
              <div className="space-y-1.5 text-xs text-slate-600">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-bold text-slate-900">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Estimated Shipping</span>
                  <span className="font-bold text-slate-900">
                    {shippingFee === 0 ? (
                      <span className="text-emerald-700 font-bold">FREE</span>
                    ) : (
                      formatPrice(shippingFee)
                    )}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Sales Tax (GST 5%)</span>
                  <span className="font-bold text-slate-900">{formatPrice(tax)}</span>
                </div>
                <div className="flex justify-between text-sm font-black text-slate-900 pt-2 border-t border-slate-200">
                  <span>Estimated Total</span>
                  <span className="text-indigo-600">{formatPrice(total)}</span>
                </div>
              </div>

              <div className="pt-2 space-y-2">
                <Link
                  href="/checkout"
                  onClick={() => setIsCartOpen(false)}
                  className="w-full py-3.5 px-4 rounded-xl font-bold text-xs sm:text-sm bg-slate-900 hover:bg-indigo-600 text-white flex items-center justify-center gap-2 transition-colors shadow-sm"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <Link
                  href="/cart"
                  onClick={() => setIsCartOpen(false)}
                  className="w-full py-2.5 px-4 rounded-xl font-semibold text-xs text-center text-slate-700 hover:bg-slate-100 transition-colors block"
                >
                  View Full Cart Page
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
