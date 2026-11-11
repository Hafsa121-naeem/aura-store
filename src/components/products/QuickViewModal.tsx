'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'motion/react';
import { Product, ProductColorVariant } from '@/lib/types/database';
import { useCart } from '@/context/CartContext';
import { formatPrice } from '@/lib/utils';
import {
  X,
  Star,
  ShoppingBag,
  Check,
  Truck,
  ShieldCheck,
  RotateCcw,
  ExternalLink,
  Plus,
  Minus,
} from 'lucide-react';

interface QuickViewModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function QuickViewModal({ product, isOpen, onClose }: QuickViewModalProps) {
  const { addItem, setIsCartOpen } = useCart();
  const [selectedColor, setSelectedColor] = useState<ProductColorVariant | null>(null);
  const [activeImage, setActiveImage] = useState<string>('');
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);

  useEffect(() => {
    if (product) {
      const variants = product.color_variants || [];
      const initialVariant = variants.length > 0 ? variants[0] : null;
      setSelectedColor(initialVariant);
      setActiveImage(
        initialVariant?.image_url ||
        product.images?.[0]?.image_url ||
        'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80'
      );
      setQuantity(1);
      setIsAdded(false);
    }
  }, [product]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !product) return null;

  const currentVariantPrice = selectedColor?.price ?? product.price;
  const currentVariantSalePrice =
    selectedColor?.sale_price !== undefined ? selectedColor.sale_price : product.sale_price;
  const effectivePrice = currentVariantSalePrice ?? currentVariantPrice;
  const originalPrice = currentVariantPrice;
  const hasDiscount = Boolean(
    currentVariantSalePrice && currentVariantSalePrice < currentVariantPrice
  );
  const discountPercent = hasDiscount
    ? Math.round(((originalPrice - effectivePrice) / originalPrice) * 100)
    : 0;

  const handleColorChange = (variant: ProductColorVariant) => {
    setSelectedColor(variant);
    if (variant.image_url) {
      setActiveImage(variant.image_url);
    }
  };

  const handleAddToCart = () => {
    addItem(
      product,
      quantity,
      selectedColor?.name,
      undefined,
      activeImage,
      selectedColor?.price,
      selectedColor?.sale_price
    );
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
      setIsCartOpen(true);
      onClose();
    }, 600);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-slate-950/60 backdrop-blur-md"
        />

        {/* Modal Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-amber-900/10 overflow-hidden z-10 max-h-[90vh] flex flex-col md:flex-row"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-white/90 backdrop-blur-md border border-slate-200 text-slate-700 hover:text-slate-950 hover:bg-white flex items-center justify-center transition-all shadow-sm"
            aria-label="Close Preview"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Left Column: Image Showcase */}
          <div className="w-full md:w-1/2 bg-[#FAF7F2] p-6 sm:p-8 flex flex-col justify-between border-b md:border-b-0 md:border-r border-slate-100">
            <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-white shadow-inner border border-slate-200/60">
              <Image
                src={activeImage}
                alt={product.name}
                fill
                sizes="(max-width: 768px) 100vw, 500px"
                className="object-cover object-center transition-transform duration-500 hover:scale-105"
                unoptimized
              />
              {hasDiscount && (
                <div className="absolute top-3 left-3 bg-[#b48a4c] text-white text-[11px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider shadow-sm">
                  {discountPercent}% OFF
                </div>
              )}
            </div>

            {/* Gallery Thumbnails */}
            {product.images && product.images.length > 1 && (
              <div className="flex items-center gap-2 mt-4 overflow-x-auto pb-1">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActiveImage(img.image_url)}
                    className={`relative w-14 h-14 rounded-xl overflow-hidden border-2 shrink-0 transition-all ${
                      activeImage === img.image_url
                        ? 'border-[#b48a4c] shadow-sm'
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <Image
                      src={img.image_url}
                      alt={`View ${idx + 1}`}
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Product Details & Controls */}
          <div className="w-full md:w-1/2 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto">
            <div className="space-y-4">
              {/* Category & Rating */}
              <div className="flex items-center justify-between text-xs">
                <span className="text-[#8c6b2d] font-bold uppercase tracking-[0.2em] text-[10px]">
                  {product.subcategory || 'Luxury Catalog'}
                </span>
                <div className="flex items-center gap-1.5 text-amber-500 font-bold">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span className="text-slate-900">{product.rating.toFixed(1)}</span>
                  <span className="text-slate-600 font-normal">({product.review_count || 48})</span>
                </div>
              </div>

              {/* Title */}
              <h3 className="text-xl sm:text-2xl font-light text-slate-950 font-serif leading-snug">
                {product.name}
              </h3>

              {/* Price */}
              <div className="flex items-baseline gap-3">
                <span className="text-2xl font-black text-slate-950 tracking-tight">
                  {formatPrice(effectivePrice)}
                </span>
                {hasDiscount && (
                  <span className="text-sm text-slate-600 line-through">
                    {formatPrice(originalPrice)}
                  </span>
                )}
                <span className="text-xs text-emerald-800 font-bold bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100">
                  COD Verified
                </span>
              </div>

              {/* Description */}
              <p className="text-xs text-slate-700 leading-relaxed font-normal line-clamp-3">
                {product.description}
              </p>

              {/* Color Variants */}
              {product.color_variants && product.color_variants.length > 0 && (
                <div className="space-y-2 pt-2 border-t border-slate-100">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-800">Color Selection:</span>
                    <span className="text-[#8c6b2d] font-semibold">{selectedColor?.name || 'Default'}</span>
                  </div>
                  <div className="flex items-center gap-2 flex-wrap">
                    {product.color_variants.map((v, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => handleColorChange(v)}
                        className={`group relative flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs transition-all ${
                          selectedColor?.name === v.name
                            ? 'border-[#b48a4c] bg-amber-50/60 font-bold text-slate-950 shadow-2xs'
                            : 'border-slate-200 hover:border-slate-300 text-slate-700'
                        }`}
                      >
                        <span
                          className="w-3.5 h-3.5 rounded-full border border-black/10 shrink-0"
                          style={{ backgroundColor: v.hex }}
                        />
                        <span>{v.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity Stepper */}
              <div className="flex items-center gap-4 pt-2">
                <span className="text-xs font-bold text-slate-800">Quantity:</span>
                <div className="flex items-center border border-slate-200 rounded-xl bg-slate-50">
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="p-2 text-slate-600 hover:text-slate-950 transition-colors"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="w-8 text-center text-xs font-bold text-slate-900">{quantity}</span>
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => q + 1)}
                    className="p-2 text-slate-600 hover:text-slate-950 transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
                <span className="text-[11px] text-emerald-800 font-semibold">
                  &bull; In Stock (Dispatches within 24h)
                </span>
              </div>
            </div>

            {/* Actions & Assurance */}
            <div className="space-y-3 pt-6 border-t border-slate-100 mt-6">
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={handleAddToCart}
                  disabled={isAdded}
                  className={`flex-1 py-3.5 px-6 rounded-2xl font-bold text-xs uppercase tracking-[0.2em] flex items-center justify-center gap-2 transition-all duration-300 shadow-md ${
                    isAdded
                      ? 'bg-emerald-600 text-white'
                      : 'bg-slate-950 text-white hover:bg-[#b48a4c] hover:text-slate-950 active:scale-98'
                  }`}
                >
                  {isAdded ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Added to Bag</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4" />
                      <span>Add to Bag</span>
                    </>
                  )}
                </button>

                <Link
                  href={`/products/${product.slug}`}
                  onClick={onClose}
                  className="px-4 py-3.5 rounded-2xl border border-slate-200 text-slate-800 hover:text-slate-950 hover:border-slate-400 text-xs font-bold transition-all flex items-center justify-center gap-1.5"
                  title="View Complete Specifications"
                >
                  <span>Details</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </Link>
              </div>

              {/* Trust Badges */}
              <div className="grid grid-cols-3 gap-2 pt-2 text-[10px] text-slate-600 text-center">
                <div className="flex items-center justify-center gap-1">
                  <Truck className="w-3 h-3 text-[#b48a4c]" />
                  <span>Free COD over 5k</span>
                </div>
                <div className="flex items-center justify-center gap-1">
                  <ShieldCheck className="w-3 h-3 text-[#b48a4c]" />
                  <span>100% Authentic</span>
                </div>
                <div className="flex items-center justify-center gap-1">
                  <RotateCcw className="w-3 h-3 text-[#b48a4c]" />
                  <span>7-Day Return</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
