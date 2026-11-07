'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Product, ProductColorVariant } from '@/lib/types/database';
import { useCart } from '@/context/CartContext';
import { formatPrice } from '@/lib/utils';
import { Star, ShoppingBag, Check, Heart, Truck } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();
  const [currentProduct, setCurrentProduct] = useState<Product>(product);
  const [isAdded, setIsAdded] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);

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

  const defaultImage =
    currentProduct.images?.[0]?.image_url ||
    'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80';

  const [activePreviewImage, setActivePreviewImage] = useState<string>(
    activeColor?.image_url || defaultImage
  );

  // Keep preview image in sync with product changes
  React.useEffect(() => {
    const primaryImg = currentProduct.images?.[0]?.image_url || defaultImage;
    setActivePreviewImage(activeColor?.image_url || primaryImg);
  }, [currentProduct, activeColor, defaultImage]);

  const effectivePrice = currentProduct.sale_price ?? currentProduct.price;
  const hasDiscount = Boolean(currentProduct.sale_price && currentProduct.sale_price < currentProduct.price);
  const discountPercent = hasDiscount
    ? Math.round(((currentProduct.price - (currentProduct.sale_price as number)) / currentProduct.price) * 100)
    : 0;
  const isFreeDelivery = effectivePrice >= 5000;

  const handleColorSelect = (variant: ProductColorVariant, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setActiveColor(variant);
    setActivePreviewImage(variant.image_url);
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
    setTimeout(() => setIsAdded(false), 1800);
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsWishlisted(!isWishlisted);
  };

  return (
    <div className="group relative flex flex-col bg-white rounded-3xl border border-slate-200/90 overflow-hidden hover:shadow-xl hover:border-slate-300 transition-all duration-300">
      {/* Product Image Frame (Edge-to-Edge, Zero Awkward Padding) */}
      <Link
        href={`/products/${currentProduct.slug}`}
        className="relative aspect-square w-full overflow-hidden bg-[#f5f5f5] border-b border-slate-100 block group"
      >
        <Image
          src={activePreviewImage}
          alt={currentProduct.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
          onError={() => {
            setActivePreviewImage('https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80');
          }}
          unoptimized
        />

        {/* Badges */}
        <div className="absolute top-3.5 left-3.5 flex flex-col gap-1.5 z-10 pointer-events-none">
          {hasDiscount && (
            <span className="bg-rose-50 text-rose-700 border border-rose-200/80 text-[10px] font-extrabold px-2 py-0.5 rounded-md shadow-2xs tracking-wide">
              {discountPercent}% OFF
            </span>
          )}
          {currentProduct.is_new && (
            <span className="bg-indigo-50 text-indigo-700 border border-indigo-200/80 text-[10px] font-extrabold px-2 py-0.5 rounded-md shadow-2xs tracking-wide">
              NEW
            </span>
          )}
          {isFreeDelivery && (
            <span className="bg-emerald-50 text-emerald-800 border border-emerald-200/80 text-[9px] font-bold px-1.5 py-0.5 rounded-md flex items-center gap-1 shadow-2xs">
              <Truck className="w-2.5 h-2.5 text-emerald-600" />
              <span>Free Delivery</span>
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={handleToggleWishlist}
          className={`absolute top-3.5 right-3.5 z-10 p-2 rounded-xl backdrop-blur-md transition-all shadow-2xs ${
            isWishlisted
              ? 'bg-rose-50 text-rose-600 border border-rose-200 scale-105'
              : 'bg-white/80 hover:bg-white text-slate-500 hover:text-rose-600 border border-slate-200/60'
          }`}
          aria-label={isWishlisted ? 'Remove from wishlist' : 'Save to wishlist'}
        >
          <Heart className={`w-3.5 h-3.5 ${isWishlisted ? 'fill-rose-600' : ''}`} />
        </button>

        {currentProduct.stock <= 0 && (
          <div className="absolute inset-0 bg-white/85 backdrop-blur-xs flex items-center justify-center z-20">
            <span className="bg-slate-900 text-white text-[11px] font-black px-3.5 py-1.5 rounded-xl uppercase tracking-wider">
              Out of Stock
            </span>
          </div>
        )}
      </Link>

      {/* Product Content */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Category & Star Rating */}
          <div className="flex items-center justify-between text-xs mb-1.5 gap-2">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider truncate">
              {currentProduct.subcategory || currentProduct.category?.name || 'AURA STORE'}
            </span>
            <div className="flex items-center gap-1 text-slate-800 font-bold text-xs shrink-0">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span>{currentProduct.rating.toFixed(1)}</span>
              <span className="text-slate-400 font-normal">({currentProduct.review_count})</span>
            </div>
          </div>

          {/* Product Title (Strictly on 1 line) */}
          <Link href={`/products/${currentProduct.slug}`} className="block group-hover:text-indigo-600 transition-colors">
            <h3 className="font-bold text-slate-950 text-sm sm:text-base truncate whitespace-nowrap leading-snug">
              {currentProduct.name}
            </h3>
          </Link>

          {/* Color Swatches Strip (Clickable on Card!) */}
          {colorVariants.length > 0 ? (
            <div className="flex items-center gap-1.5 mt-2.5">
              {colorVariants.map((variant) => {
                const isSelected = activeColor?.name === variant.name;
                return (
                  <button
                    key={variant.name}
                    type="button"
                    onClick={(e) => handleColorSelect(variant, e)}
                    title={variant.name}
                    className={`w-4 h-4 rounded-full border transition-all ${
                      isSelected
                        ? 'ring-2 ring-indigo-600 ring-offset-2 scale-110 border-white'
                        : 'border-slate-300 hover:scale-110'
                    }`}
                    style={{ backgroundColor: variant.hex }}
                    aria-label={`Select ${variant.name}`}
                  />
                );
              })}
              <span className="text-[10px] text-slate-600 font-medium ml-1 truncate">
                {activeColor?.name || `${colorVariants.length} colours`}
              </span>
            </div>
          ) : (
            <p className="text-xs text-slate-600 mt-1 line-clamp-1">
              Official Pakistani warranty &amp; sealed box
            </p>
          )}
        </div>

        {/* Pricing & Add to Cart action */}
        <div className="mt-4 pt-3.5 border-t border-slate-100 flex items-center justify-between gap-2">
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-base sm:text-lg font-black text-slate-950">
                {formatPrice(effectivePrice)}
              </span>
              {hasDiscount && (
                <span className="text-xs text-slate-400 line-through">
                  {formatPrice(currentProduct.price)}
                </span>
              )}
            </div>
            <span className="text-[10px] text-emerald-800 font-bold block">
              {currentProduct.stock > 0 ? '✓ Ready to ship' : 'Backorder'}
            </span>
          </div>

          <button
            onClick={handleAddToCart}
            disabled={product.stock <= 0}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all shadow-xs ${
              isAdded
                ? 'bg-emerald-600 text-white'
                : 'bg-slate-950 hover:bg-indigo-600 text-white active:scale-95'
            } disabled:opacity-30 disabled:bg-slate-200 disabled:text-slate-400`}
            aria-label={`Add ${product.name} to cart`}
          >
            {isAdded ? (
              <>
                <Check className="w-3.5 h-3.5 stroke-[3]" />
                <span className="hidden sm:inline">Added</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>Add</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
