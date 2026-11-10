'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'motion/react';
import { Product, ProductColorVariant } from '@/lib/types/database';
import { useCart } from '@/context/CartContext';
import { formatPrice } from '@/lib/utils';
import { Star, ShoppingBag, Check, Heart, Eye, Sparkles } from 'lucide-react';
import QuickViewModal from './QuickViewModal';

interface ProductCardProps {
  product: Product;
  onQuickView?: (product: Product) => void;
}

export default function ProductCard({ product, onQuickView }: ProductCardProps) {
  const { addItem, setIsCartOpen } = useCart();
  const [currentProduct, setCurrentProduct] = useState<Product>(product);
  const [isAdded, setIsAdded] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);

  // Read overrides from localStorage for instantaneous update across product cards
  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const stored = localStorage.getItem('aura_products_override');
        if (stored) {
          const overrides = JSON.parse(stored);
          const override = overrides[product.id] || overrides[product.slug];
          if (override) {
            setCurrentProduct(override);
          }
        }
      } catch {}
    }
  }, [product.id, product.slug]);

  const colorVariants: ProductColorVariant[] = currentProduct.color_variants || [];
  const [activeColor, setActiveColor] = useState<ProductColorVariant | null>(
    colorVariants.length > 0 ? colorVariants[0] : null
  );

  const primaryImage =
    currentProduct.images?.[0]?.image_url ||
    'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80';

  const secondaryImage =
    currentProduct.images?.[1]?.image_url ||
    (colorVariants.length > 1 ? colorVariants[1].image_url : null) ||
    primaryImage;

  const [activePreviewImage, setActivePreviewImage] = useState<string>(
    activeColor?.image_url || primaryImage
  );

  // Keep preview image in sync with product changes
  React.useEffect(() => {
    const primaryImg = currentProduct.images?.[0]?.image_url || primaryImage;
    setActivePreviewImage(activeColor?.image_url || primaryImg);
  }, [currentProduct, activeColor, primaryImage]);

  const effectivePrice = (activeColor?.price ?? currentProduct.sale_price) ?? currentProduct.price;
  const originalPrice = (activeColor?.sale_price ? activeColor.price : currentProduct.price) ?? currentProduct.price;
  const hasDiscount = Boolean(currentProduct.sale_price && currentProduct.sale_price < currentProduct.price);
  const discountPercent = hasDiscount
    ? Math.round(((currentProduct.price - (currentProduct.sale_price as number)) / currentProduct.price) * 100)
    : 0;

  const handleColorSelect = (variant: ProductColorVariant, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setActiveColor(variant);
    if (variant.image_url) {
      setActivePreviewImage(variant.image_url);
    }
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(
      currentProduct,
      1,
      activeColor?.name,
      undefined,
      activeColor?.image_url || activePreviewImage
    );
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
      setIsCartOpen(true);
    }, 600);
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsWishlisted(!isWishlisted);
  };

  const handleOpenQuickView = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (onQuickView) {
      onQuickView(currentProduct);
    } else {
      setIsQuickViewOpen(true);
    }
  };

  return (
    <>
      <motion.div
        whileHover={{ y: -6 }}
        transition={{ type: 'spring', stiffness: 350, damping: 25 }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="group relative flex flex-col bg-white rounded-3xl border border-slate-200/80 hover:border-[#b48a4c]/50 overflow-hidden hover:shadow-[0_20px_40px_-15px_rgba(180,138,76,0.15)] transition-all duration-300"
      >
        {/* Product Image Frame with Dual Hover Crossfade */}
        <Link
          href={`/products/${currentProduct.slug}`}
          className="relative aspect-square w-full overflow-hidden bg-[#FAF7F2] block group"
        >
          {/* Primary Product Image */}
          <Image
            src={activePreviewImage}
            alt={currentProduct.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className={`object-cover object-center transition-all duration-700 ${
              isHovered && secondaryImage !== activePreviewImage
                ? 'opacity-0 scale-105'
                : 'opacity-100 group-hover:scale-105'
            }`}
            onError={() => {
              setActivePreviewImage('https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80');
            }}
            unoptimized
          />

          {/* Secondary Lifestyle Hover Image */}
          {secondaryImage && secondaryImage !== activePreviewImage && (
            <Image
              src={secondaryImage}
              alt={`${currentProduct.name} Alternate View`}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              className={`object-cover object-center transition-all duration-700 absolute inset-0 ${
                isHovered ? 'opacity-100 scale-105' : 'opacity-0 scale-100'
              }`}
              unoptimized
            />
          )}

          {/* Top Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10 pointer-events-none">
            {hasDiscount && (
              <span className="bg-[#b48a4c] text-white text-[10px] font-black px-2.5 py-0.5 rounded-full shadow-sm tracking-wider uppercase">
                {discountPercent}% OFF
              </span>
            )}
            {currentProduct.is_new && (
              <span className="bg-slate-950 text-white text-[10px] font-bold px-2 py-0.5 rounded-full tracking-wider uppercase shadow-sm">
                NEW
              </span>
            )}
            {currentProduct.featured && (
              <span className="bg-amber-100 text-[#8c6b2d] border border-amber-300/60 text-[9px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 shadow-2xs">
                <Sparkles className="w-2.5 h-2.5" />
                <span>Featured</span>
              </span>
            )}
          </div>

          {/* Floating Action Buttons: Wishlist & Quick View */}
          <div className="absolute top-3 right-3 flex flex-col gap-2 z-10">
            {/* Wishlist Button */}
            <button
              type="button"
              onClick={handleToggleWishlist}
              className={`w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 shadow-md ${
                isWishlisted
                  ? 'bg-rose-50 text-rose-600 border border-rose-200'
                  : 'bg-white/90 backdrop-blur-md text-slate-600 hover:text-rose-600 hover:bg-white border border-slate-200/80'
              }`}
              aria-label="Save to Wishlist"
            >
              <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-rose-600' : ''}`} />
            </button>

            {/* Quick View Button (Reveals on Hover) */}
            <button
              type="button"
              onClick={handleOpenQuickView}
              className={`w-9 h-9 rounded-full bg-white/90 backdrop-blur-md text-slate-700 hover:text-slate-950 hover:bg-white border border-slate-200/80 flex items-center justify-center transition-all duration-300 shadow-md ${
                isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2 pointer-events-none'
              }`}
              aria-label="Quick View Product"
              title="Quick Preview"
            >
              <Eye className="w-4 h-4" />
            </button>
          </div>

          {/* Bottom Quick-Add Bar (Smooth slide-up on card hover) */}
          <div
            className={`absolute bottom-3 inset-x-3 transition-all duration-300 z-10 ${
              isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3 pointer-events-none'
            }`}
          >
            <button
              type="button"
              onClick={handleAddToCart}
              disabled={isAdded}
              className={`w-full py-2.5 px-4 rounded-xl text-xs font-bold uppercase tracking-[0.16em] flex items-center justify-center gap-2 shadow-lg transition-all duration-200 ${
                isAdded
                  ? 'bg-emerald-600 text-white'
                  : 'bg-slate-950 text-white hover:bg-[#b48a4c] hover:text-slate-950 active:scale-98'
              }`}
            >
              {isAdded ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>Added</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>Quick Add &bull; {formatPrice(effectivePrice)}</span>
                </>
              )}
            </button>
          </div>
        </Link>

        {/* Product Information Body */}
        <div className="p-5 flex flex-col justify-between flex-1 space-y-3">
          <div className="space-y-1.5">
            {/* Category / Subcategory & Star Rating */}
            <div className="flex items-center justify-between text-[11px]">
              <span className="text-[#8c6b2d] font-bold uppercase tracking-[0.18em] text-[10px]">
                {currentProduct.subcategory || 'Luxury Collection'}
              </span>

              <div className="flex items-center gap-1 text-slate-700 font-semibold">
                <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                <span className="text-slate-900 font-bold">{currentProduct.rating.toFixed(1)}</span>
                <span className="text-slate-400 text-[10px]">({currentProduct.review_count || 32})</span>
              </div>
            </div>

            {/* Product Title */}
            <h3 className="text-sm font-semibold text-slate-900 line-clamp-1 group-hover:text-[#8c6b2d] transition-colors">
              <Link href={`/products/${currentProduct.slug}`}>{currentProduct.name}</Link>
            </h3>

            {/* Short Description */}
            <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed font-normal">
              {currentProduct.description}
            </p>
          </div>

          {/* Color Swatches if available */}
          {colorVariants.length > 0 && (
            <div className="flex items-center gap-1.5 pt-1">
              {colorVariants.slice(0, 4).map((variant, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={(e) => handleColorSelect(variant, e)}
                  className={`w-4 h-4 rounded-full border transition-all ${
                    activeColor?.name === variant.name
                      ? 'ring-2 ring-[#b48a4c] ring-offset-1 scale-110'
                      : 'border-slate-300 hover:scale-105'
                  }`}
                  style={{ backgroundColor: variant.hex }}
                  title={variant.name}
                />
              ))}
              {colorVariants.length > 4 && (
                <span className="text-[10px] text-slate-400 font-medium">
                  +{colorVariants.length - 4}
                </span>
              )}
            </div>
          )}

          {/* Price & Cart Action */}
          <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
            <div>
              <div className="text-base font-black text-slate-950 tracking-tight">
                {formatPrice(effectivePrice)}
              </div>
              {hasDiscount && (
                <div className="text-[11px] text-slate-400 line-through">
                  {formatPrice(originalPrice)}
                </div>
              )}
            </div>

            <button
              type="button"
              onClick={handleAddToCart}
              className={`p-2.5 rounded-full transition-all duration-300 shadow-2xs ${
                isAdded
                  ? 'bg-emerald-600 text-white'
                  : 'bg-slate-100 text-slate-800 hover:bg-slate-950 hover:text-white active:scale-95'
              }`}
              title="Add to Shopping Bag"
            >
              {isAdded ? <Check className="w-4 h-4" /> : <ShoppingBag className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </motion.div>

      {/* Embedded Quick View Modal */}
      <QuickViewModal
        product={currentProduct}
        isOpen={isQuickViewOpen}
        onClose={() => setIsQuickViewOpen(false)}
      />
    </>
  );
}
