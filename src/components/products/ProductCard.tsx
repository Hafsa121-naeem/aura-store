'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'motion/react';
import { Product, ProductColorVariant } from '@/lib/types/database';
import { useCart } from '@/context/CartContext';
import { formatPrice } from '@/lib/utils';
import { Star, ShoppingBag, Check, Heart, Eye } from 'lucide-react';
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

  const currentVariantPrice = activeColor?.price ?? currentProduct.price;
  const currentVariantSalePrice =
    activeColor?.sale_price !== undefined ? activeColor.sale_price : currentProduct.sale_price;
  const effectivePrice = currentVariantSalePrice ?? currentVariantPrice;
  const originalPrice = currentVariantPrice;
  const hasDiscount = Boolean(
    currentVariantSalePrice && currentVariantSalePrice < currentVariantPrice
  );
  const discountPercent = hasDiscount
    ? Math.round(((originalPrice - effectivePrice) / originalPrice) * 100)
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
      activeColor?.image_url || activePreviewImage,
      activeColor?.price,
      activeColor?.sale_price
    );
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
      setIsCartOpen(true);
    }, 500);
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsWishlisted((prev) => !prev);
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
      <div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="group relative flex flex-col bg-[#FAF8F5] border border-[#D8D2C6]/70 hover:border-[#1A1918] transition-all duration-300"
      >
        {/* Product Image Frame with Dual Hover Crossfade */}
        <Link
          href={`/products/${currentProduct.slug}`}
          className="relative aspect-square w-full overflow-hidden bg-[#EDE8DF] block group"
        >
          {/* Primary Product Image */}
          <Image
            src={activePreviewImage}
            alt={currentProduct.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className={`object-cover object-center transition-all duration-700 ${
              isHovered && secondaryImage !== activePreviewImage
                ? 'opacity-0 scale-102'
                : 'opacity-100 group-hover:scale-102'
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
                isHovered ? 'opacity-100 scale-102' : 'opacity-0 scale-100'
              }`}
              unoptimized
            />
          )}

          {/* ferm LIVING Minimalist Badges */}
          <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 z-10 pointer-events-none">
            {hasDiscount && (
              <span className="bg-[#1A1918] text-[#FAF8F5] text-[9px] font-mono px-2 py-0.5 uppercase tracking-wider">
                -{discountPercent}%
              </span>
            )}
            {currentProduct.is_new && (
              <span className="bg-[#EDE8DF] text-[#1A1918] border border-[#D8D2C6] text-[9px] font-mono px-2 py-0.5 uppercase tracking-wider">
                NEW ARRIVAL
              </span>
            )}
            {currentProduct.featured && (
              <span className="bg-[#FAF8F5]/90 text-[#806B43] border border-[#806B43]/30 text-[9px] font-mono px-2 py-0.5 uppercase tracking-wider">
                RESPONSIBLE
              </span>
            )}
          </div>

          {/* Floating Action Buttons: Wishlist & Quick View */}
          <div className="absolute top-2.5 right-2.5 flex flex-col gap-1.5 z-10">
            {/* Wishlist Button */}
            <button
              type="button"
              onClick={handleToggleWishlist}
              className={`w-8 h-8 flex items-center justify-center transition-all border ${
                isWishlisted
                  ? 'bg-[#1A1918] text-[#FAF8F5] border-[#1A1918]'
                  : 'bg-[#FAF8F5]/90 backdrop-blur-sm text-[#1A1918] border-[#D8D2C6] hover:bg-[#1A1918] hover:text-[#FAF8F5]'
              }`}
              aria-label="Save to Wishlist"
            >
              <Heart className={`w-3.5 h-3.5 ${isWishlisted ? 'fill-white' : ''}`} />
            </button>

            {/* Quick View Button (Reveals on Hover) */}
            <button
              type="button"
              onClick={handleOpenQuickView}
              className={`w-8 h-8 bg-[#FAF8F5]/90 backdrop-blur-sm text-[#1A1918] border border-[#D8D2C6] hover:bg-[#1A1918] hover:text-[#FAF8F5] flex items-center justify-center transition-all ${
                isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2 pointer-events-none'
              }`}
              aria-label="Quick View Product"
              title="Quick Preview"
            >
              <Eye className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Bottom Quick-Add Bar (Slide up on hover) */}
          <div
            className={`absolute bottom-2.5 inset-x-2.5 transition-all duration-200 z-10 ${
              isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 pointer-events-none'
            }`}
          >
            <button
              type="button"
              onClick={handleAddToCart}
              disabled={isAdded}
              className={`w-full py-2 px-3 text-[10px] uppercase tracking-[0.2em] font-light flex items-center justify-center gap-1.5 transition-all ${
                isAdded
                  ? 'bg-emerald-700 text-white'
                  : 'bg-[#1A1918] text-[#FAF8F5] hover:bg-[#806B43]'
              }`}
            >
              {isAdded ? (
                <>
                  <Check className="w-3 h-3 text-emerald-300" />
                  <span>Added to Bag</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-3 h-3" />
                  <span>Add to Bag</span>
                </>
              )}
            </button>
          </div>
        </Link>

        {/* Product Details Section */}
        <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between hairline-t">
          <div className="space-y-1.5">
            {/* Category / Subtitle */}
            <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.2em] text-[#8C867D] font-light">
              <span className="truncate">{currentProduct.subcategory || 'Curated Object'}</span>
              {currentProduct.rating && (
                <span className="flex items-center gap-1 font-mono text-[#5C5852]">
                  <Star className="w-2.5 h-2.5 fill-[#9E814D] text-[#9E814D]" />
                  <span>{currentProduct.rating.toFixed(1)}</span>
                </span>
              )}
            </div>

            {/* Product Name in Editorial Serif */}
            <Link href={`/products/${currentProduct.slug}`} className="block group/link">
              <h3 className="font-editorial text-base sm:text-lg text-[#1A1918] group-hover/link:text-[#806B43] transition-colors line-clamp-1 font-normal">
                {currentProduct.name}
              </h3>
            </Link>

            {/* Color Swatch Selectors */}
            {colorVariants.length > 0 && (
              <div className="flex items-center gap-1.5 pt-1">
                {colorVariants.slice(0, 4).map((variant) => (
                  <button
                    key={variant.name}
                    type="button"
                    onClick={(e) => handleColorSelect(variant, e)}
                    className={`w-3.5 h-3.5 rounded-full border transition-all ${
                      activeColor?.name === variant.name
                        ? 'ring-1 ring-offset-1 ring-[#1A1918] scale-110'
                        : 'border-[#D8D2C6] hover:scale-105'
                    }`}
                    style={{ backgroundColor: variant.hex }}
                    title={variant.name}
                  />
                ))}
                {colorVariants.length > 4 && (
                  <span className="text-[9px] text-[#8C867D] font-mono">
                    +{colorVariants.length - 4}
                  </span>
                )}
              </div>
            )}
          </div>

          {/* Pricing & Stock Status */}
          <div className="pt-3 mt-3 hairline-t flex items-baseline justify-between">
            <div className="flex items-baseline gap-2">
              <span className="text-sm font-light text-[#1A1918]">
                {formatPrice(effectivePrice)}
              </span>
              {hasDiscount && (
                <span className="text-xs text-[#8C867D] line-through">
                  {formatPrice(originalPrice)}
                </span>
              )}
            </div>

            <span className="text-[10px] uppercase tracking-wider text-[#8C867D] font-mono">
              COD Ready
            </span>
          </div>
        </div>
      </div>

      {/* Standalone Quick View Modal */}
      {isQuickViewOpen && (
        <QuickViewModal
          product={currentProduct}
          isOpen={isQuickViewOpen}
          onClose={() => setIsQuickViewOpen(false)}
        />
      )}
    </>
  );
}
