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
    <div className="fixed inset-0 z-50 overflow-hidden font-sans">
      {/* Luxury Charcoal Backdrop */}
      <div
        className="absolute inset-0 bg-[#1A1918]/60 backdrop-blur-xs transition-opacity duration-300 animate-in fade-in"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-6 sm:pl-10">
        <div className="w-screen max-w-md bg-[#FAF8F5] text-[#1A1918] shadow-2xl flex flex-col border-l border-[#D8D2C6]/80">
          
          {/* 1. Header */}
          <div className="p-6 border-b border-[#D8D2C6]/80 flex items-center justify-between bg-[#FAF8F5]">
            <div className="flex items-center gap-3">
              <ShoppingBag className="w-5 h-5 text-[#806B43] stroke-[1.5]" />
              <div className="flex items-baseline gap-2">
                <h2 className="font-editorial text-2xl font-light text-[#1A1918] tracking-tight">
                  Shopping Bag
                </h2>
                <span className="font-mono text-[10px] uppercase tracking-widest text-[#806B43]">
                  ({itemCount} {itemCount === 1 ? 'object' : 'objects'})
                </span>
              </div>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-1.5 text-[#8C867D] hover:text-[#1A1918] hover:bg-[#EDE8DF] transition-colors rounded-none"
              aria-label="Close bag"
            >
              <X className="w-5 h-5 stroke-[1.5]" />
            </button>
          </div>

          {/* 2. Complimentary Nationwide Delivery Strip */}
          <div className="bg-[#EDE8DF]/60 px-6 py-3.5 border-b border-[#D8D2C6]/80">
            {amountToFreeShipping > 0 ? (
              <p className="font-mono text-[10px] uppercase tracking-wider text-[#5C5852] mb-2">
                Add <span className="font-bold text-[#806B43]">{formatPrice(amountToFreeShipping)}</span> more for <span className="text-[#1A1918] font-medium">Complimentary Express Delivery</span>
              </p>
            ) : (
              <p className="font-mono text-[10px] uppercase tracking-wider text-[#806B43] mb-2 flex items-center gap-1.5 font-medium">
                <Truck className="w-3.5 h-3.5 text-[#806B43] stroke-[1.5]" />
                <span>Unlocked: Complimentary Nationwide Express Delivery</span>
              </p>
            )}
            <div className="w-full bg-[#D8D2C6]/60 h-1 overflow-hidden">
              <div
                className="bg-[#806B43] h-full transition-all duration-500"
                style={{ width: `${freeShippingProgress}%` }}
              />
            </div>
          </div>

          {/* 3. Cart Items / Empty State */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-16 px-4">
                <div className="w-16 h-16 bg-[#EDE8DF] border border-[#D8D2C6] flex items-center justify-center text-[#806B43] mb-6">
                  <ShoppingBag className="w-7 h-7 stroke-[1.25]" />
                </div>
                <h3 className="font-editorial text-2xl font-light text-[#1A1918] tracking-tight mb-2">
                  Your bag is empty
                </h3>
                <p className="text-xs text-[#5C5852] font-light leading-relaxed max-w-xs mb-8">
                  Explore our curated high-fidelity audio, precision timepieces, and artisan lifestyle essentials.
                </p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="bg-[#1A1918] hover:bg-[#806B43] text-[#FAF8F5] px-8 py-3 text-xs uppercase tracking-[0.22em] font-light transition-all duration-300 shadow-sm"
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
                    className="flex gap-4 p-4 bg-[#FAF8F5] border border-[#D8D2C6]/80 hover:border-[#1A1918] transition-colors duration-300"
                  >
                    {/* Thumbnail */}
                    <div className="relative w-20 h-20 bg-[#EDE8DF] border border-[#D8D2C6]/60 shrink-0 overflow-hidden">
                      <Image
                        src={imageSrc}
                        alt={product.name}
                        fill
                        loading="lazy"
                        sizes="80px"
                        className="object-cover"
                      />
                    </div>

                    {/* Details */}
                    <div className="flex-1 flex flex-col justify-between min-w-0">
                      <div>
                        <div className="flex items-start justify-between gap-2">
                          <Link
                            href={`/products/${product.slug}`}
                            onClick={() => setIsCartOpen(false)}
                            className="font-editorial text-base text-[#1A1918] font-normal hover:text-[#806B43] line-clamp-1 transition-colors"
                          >
                            {product.name}
                          </Link>
                          <button
                            type="button"
                            onClick={() => removeItem(item.id)}
                            className="text-[#8C867D] hover:text-[#806B43] transition-colors p-0.5"
                            aria-label="Remove object"
                          >
                            <Trash2 className="w-3.5 h-3.5 stroke-[1.5]" />
                          </button>
                        </div>

                        {/* Selected Color / Variant Badge */}
                        <div className="flex flex-wrap items-center gap-2 mt-1.5">
                          {item.selectedColor && (
                            <span className="inline-flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-wider text-[#5C5852] bg-[#EDE8DF] px-2 py-0.5 border border-[#D8D2C6]">
                              <span className="w-1.5 h-1.5 rounded-full bg-[#1A1918]" />
                              {item.selectedColor}
                            </span>
                          )}
                          {item.selectedSize && (
                            <span className="text-[10px] font-mono uppercase tracking-wider text-[#5C5852] bg-[#EDE8DF] px-2 py-0.5 border border-[#D8D2C6]">
                              Size: {item.selectedSize}
                            </span>
                          )}
                        </div>

                        <div className="text-xs font-light text-[#8C867D] mt-1.5">
                          {formatPrice(unitPrice)}
                        </div>
                      </div>

                      {/* Quantity Controls & Line Total */}
                      <div className="flex items-center justify-between mt-3 pt-2.5 border-t border-[#D8D2C6]/60">
                        <div className="flex items-center border border-[#D8D2C6] bg-[#FAF8F5]">
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="p-1.5 text-[#5C5852] hover:text-[#1A1918] hover:bg-[#EDE8DF] transition-colors"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3 h-3 stroke-[1.5]" />
                          </button>
                          <span className="w-7 text-center font-mono text-xs text-[#1A1918]">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-1.5 text-[#5C5852] hover:text-[#1A1918] hover:bg-[#EDE8DF] transition-colors"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-3 h-3 stroke-[1.5]" />
                          </button>
                        </div>

                        <div className="font-light text-sm text-[#1A1918]">
                          {formatPrice(unitPrice * item.quantity)}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* 4. Footer Checkout Summary */}
          {items.length > 0 && (
            <div className="p-6 border-t border-[#D8D2C6] bg-[#FAF8F5] space-y-4">
              <div className="space-y-2 text-xs font-light text-[#5C5852]">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-normal text-[#1A1918]">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Nationwide Express Delivery</span>
                  <span className="font-normal text-[#1A1918]">
                    {shippingFee === 0 ? (
                      <span className="text-[#806B43] font-mono text-[10px] uppercase tracking-wider">COMPLIMENTARY</span>
                    ) : (
                      formatPrice(shippingFee)
                    )}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Sales Tax (GST 5%)</span>
                  <span className="font-normal text-[#1A1918]">{formatPrice(tax)}</span>
                </div>
                <div className="flex justify-between items-baseline pt-3 border-t border-[#D8D2C6]/80 text-[#1A1918]">
                  <span className="font-editorial text-lg">Estimated Total</span>
                  <span className="font-editorial text-2xl text-[#806B43] font-light">{formatPrice(total)}</span>
                </div>
              </div>

              <div className="pt-2 space-y-2.5">
                <Link
                  href="/checkout"
                  onClick={() => setIsCartOpen(false)}
                  className="w-full py-4 px-6 bg-[#1A1918] hover:bg-[#806B43] text-[#FAF8F5] text-xs uppercase tracking-[0.24em] font-light flex items-center justify-center gap-2 transition-all duration-300 shadow-sm"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="w-4 h-4 stroke-[1.5]" />
                </Link>

                <Link
                  href="/cart"
                  onClick={() => setIsCartOpen(false)}
                  className="w-full py-2.5 px-4 text-xs font-mono uppercase tracking-widest text-center text-[#8C867D] hover:text-[#1A1918] transition-colors block"
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
