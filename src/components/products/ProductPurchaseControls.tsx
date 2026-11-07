'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Product } from '@/lib/types/database';
import { useCart } from '@/context/CartContext';
import { formatPrice } from '@/lib/utils';
import { ShoppingBag, Zap, Plus, Minus, Check, ShieldCheck, Truck, RotateCcw } from 'lucide-react';

interface ProductPurchaseControlsProps {
  product: Product;
}

export default function ProductPurchaseControls({ product }: ProductPurchaseControlsProps) {
  const router = useRouter();
  const { addItem, setIsCartOpen } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState('Matte Obsidian');
  const [isAdded, setIsAdded] = useState(false);

  const variants = ['Matte Obsidian', 'Silver Frost', 'Natural Walnut'];
  const unitPrice = product.sale_price ?? product.price;

  const handleAddToCart = () => {
    addItem(product, quantity);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  const handleBuyNow = () => {
    addItem(product, quantity);
    setIsCartOpen(false);
    router.push('/checkout');
  };

  return (
    <div className="space-y-6 pt-2">
      {/* Finish / Variant Selection */}
      <div>
        <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">
          Color & Finish: <span className="text-indigo-600 font-bold">{selectedVariant}</span>
        </label>
        <div className="flex flex-wrap gap-2">
          {variants.map((v) => (
            <button
              key={v}
              type="button"
              onClick={() => setSelectedVariant(v)}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold border transition-all ${
                selectedVariant === v
                  ? 'border-indigo-600 bg-indigo-50/80 text-indigo-700 font-bold ring-2 ring-indigo-600/20'
                  : 'border-slate-300 bg-white text-slate-700 hover:border-slate-400'
              }`}
            >
              {v}
            </button>
          ))}
        </div>
      </div>

      {/* Quantity Selector & Live Total */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider">
            Quantity
          </label>
          <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
            {product.stock > 0 ? `✓ ${product.stock} units in stock` : 'Out of stock'}
          </span>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center border border-slate-300 rounded-xl bg-white p-1 shadow-2xs">
            <button
              type="button"
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              disabled={quantity <= 1}
              className="p-2 text-slate-600 hover:bg-slate-100 rounded-lg disabled:opacity-30 transition-colors"
              aria-label="Decrease quantity"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="w-12 text-center font-extrabold text-sm text-slate-900">
              {quantity}
            </span>
            <button
              type="button"
              onClick={() => setQuantity((q) => Math.min(product.stock, q + 1))}
              disabled={quantity >= product.stock}
              className="p-2 text-slate-600 hover:bg-slate-100 rounded-lg disabled:opacity-30 transition-colors"
              aria-label="Increase quantity"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>

          <div className="text-xs text-slate-700 font-medium">
            Subtotal: <span className="font-black text-slate-900 text-base">{formatPrice(unitPrice * quantity)}</span>
          </div>
        </div>
      </div>

      {/* Primary Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 pt-2">
        <button
          type="button"
          onClick={handleAddToCart}
          disabled={product.stock <= 0}
          className={`flex-1 py-3.5 px-6 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-sm ${
            isAdded
              ? 'bg-emerald-600 text-white'
              : 'bg-slate-900 hover:bg-indigo-600 text-white active:scale-98'
          } disabled:opacity-40 disabled:bg-slate-200 disabled:text-slate-400`}
        >
          {isAdded ? (
            <>
              <Check className="w-4 h-4" />
              <span>Added to Cart!</span>
            </>
          ) : (
            <>
              <ShoppingBag className="w-4 h-4" />
              <span>Add to Cart</span>
            </>
          )}
        </button>

        <button
          type="button"
          onClick={handleBuyNow}
          disabled={product.stock <= 0}
          className="flex-1 py-3.5 px-6 rounded-xl font-bold text-xs sm:text-sm bg-indigo-600 hover:bg-indigo-500 text-white flex items-center justify-center gap-2 transition-all shadow-sm shadow-indigo-600/20 active:scale-98 disabled:opacity-40 disabled:bg-slate-200 disabled:text-slate-400"
        >
          <Zap className="w-4 h-4 text-amber-300" />
          <span>Buy Now Direct</span>
        </button>
      </div>

      {/* Assurance Icons Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4 border-t border-slate-200 text-xs text-slate-700">
        <div className="flex items-center gap-2 bg-slate-50 p-2.5 rounded-xl border border-slate-200/80">
          <Truck className="w-4 h-4 text-indigo-600 flex-shrink-0" />
          <span className="font-semibold">COD Across Pakistan</span>
        </div>
        <div className="flex items-center gap-2 bg-slate-50 p-2.5 rounded-xl border border-slate-200/80">
          <RotateCcw className="w-4 h-4 text-indigo-600 flex-shrink-0" />
          <span className="font-semibold">7-Day Easy Return</span>
        </div>
        <div className="flex items-center gap-2 bg-slate-50 p-2.5 rounded-xl border border-slate-200/80">
          <ShieldCheck className="w-4 h-4 text-indigo-600 flex-shrink-0" />
          <span className="font-semibold">Official Warranty</span>
        </div>
      </div>
    </div>
  );
}
