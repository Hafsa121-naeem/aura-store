'use client';

import React, { useState, useRef, useEffect, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Product, ProductColorVariant, Review } from '@/lib/types/database';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { formatPrice } from '@/lib/utils';
import ProductGrid from '@/components/products/ProductGrid';
import ProductEditModal from '@/components/admin/ProductEditModal';
import {
  Star,
  ShoppingBag,
  Zap,
  Plus,
  Minus,
  Check,
  Truck,
  ShieldCheck,
  RotateCcw,
  CheckCircle2,
  ZoomIn,
  Heart,
  Edit3,
} from 'lucide-react';

interface ProductDetailViewProps {
  product: Product;
  reviews: Review[];
  relatedProducts: Product[];
}

export default function ProductDetailView({
  product,
  reviews = [],
  relatedProducts = [],
}: ProductDetailViewProps) {
  const router = useRouter();
  const { addItem, setIsCartOpen } = useCart();
  const { user, profile, isAdmin: authIsAdmin, setMockRole } = useAuth();

  // Stateful product to immediately reflect edits without full reload
  const [currentProduct, setCurrentProduct] = useState<Product>(product);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAdminUser, setIsAdminUser] = useState(false);

  // Verified Admin access check (strictly via Supabase Auth profile role)
  useEffect(() => {
    setIsAdminUser(Boolean(authIsAdmin || profile?.role === 'admin'));
  }, [authIsAdmin, profile?.role]);

  // Load client-side overrides if available so changes persist after refresh
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const stored = localStorage.getItem('aura_products_override');
        if (stored) {
          const overrides = JSON.parse(stored);
          const override = overrides[product.id] || overrides[product.slug];
          if (override) {
            setCurrentProduct(override);
            if (override.images && override.images.length > 0) {
              setActiveImage(override.images[0].image_url);
            }
          }
        }
      } catch (err) {
        console.warn('Error reading product override cache:', err);
      }
    }
  }, [product.id, product.slug]);

  // ONLY use genuine color variants if the product actually has them!
  const colorVariants: ProductColorVariant[] = currentProduct.color_variants || [];
  const hasColorVariants = colorVariants.length > 0;

  // Selected State
  const [selectedColor, setSelectedColor] = useState<ProductColorVariant | null>(
    hasColorVariants ? colorVariants[0] : null
  );

  const defaultMainImage =
    currentProduct.images?.[0]?.image_url ||
    'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=1000&q=80';

  const [activeImage, setActiveImage] = useState<string>(
    hasColorVariants && colorVariants[0]?.image_url
      ? colorVariants[0].image_url
      : defaultMainImage
  );

  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [activeTab, setActiveTab] = useState<'details' | 'specs' | 'reviews'>('details');

  // Zoom on Hover State
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomCoords, setZoomCoords] = useState({ x: 50, y: 50 });
  const imageContainerRef = useRef<HTMLDivElement>(null);

  // Dynamic size options - only for products that genuinely have sizing (e.g. Footwear, Belts)
  const sizeOptions = React.useMemo(() => {
    const sub = currentProduct.subcategory_slug || '';
    const nameLower = currentProduct.name.toLowerCase();

    if (
      sub === 'trendy-footwear' ||
      nameLower.includes('loafer') ||
      nameLower.includes('sneaker') ||
      nameLower.includes('boot') ||
      nameLower.includes('mule') ||
      nameLower.includes('heel') ||
      nameLower.includes('shoe')
    ) {
      return ['36', '37', '38', '39', '40', '41'];
    }
    if (sub === 'wallets-belts' && nameLower.includes('belt')) {
      return ['32-inch', '34-inch', '36-inch', '38-inch'];
    }
    return [];
  }, [currentProduct.subcategory_slug, currentProduct.name]);

  const [selectedSize, setSelectedSize] = useState<string>(
    sizeOptions.length > 0 ? sizeOptions[0] : ''
  );

  React.useEffect(() => {
    if (sizeOptions.length > 0 && !sizeOptions.includes(selectedSize)) {
      setSelectedSize(sizeOptions[0]);
    } else if (sizeOptions.length === 0 && selectedSize !== '') {
      setSelectedSize('');
    }
  }, [sizeOptions, selectedSize]);

  const currentVariantPrice = selectedColor?.price ?? currentProduct.price;
  const currentVariantSalePrice =
    selectedColor?.sale_price !== undefined ? selectedColor.sale_price : currentProduct.sale_price;
  const effectivePrice = currentVariantSalePrice ?? currentVariantPrice;
  const hasDiscount = Boolean(
    currentVariantSalePrice && currentVariantSalePrice < currentVariantPrice
  );
  const discountPercent = hasDiscount
    ? Math.round(
        ((currentVariantPrice - (currentVariantSalePrice as number)) / currentVariantPrice) * 100
      )
    : 0;
  const discountAmount = hasDiscount
    ? currentVariantPrice - (currentVariantSalePrice as number)
    : 0;

  // Change active color and update main image
  const handleSelectColor = (variant: ProductColorVariant) => {
    setSelectedColor(variant);
    setActiveImage(variant.image_url);
  };

  // Zoom Mouse Movement
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imageContainerRef.current) return;
    const { left, top, width, height } = imageContainerRef.current.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomCoords({ x: Math.max(0, Math.min(100, x)), y: Math.max(0, Math.min(100, y)) });
  };

  // Add To Cart with selected color, image, and variant pricing
  const handleAddToCart = () => {
    addItem(
      currentProduct,
      quantity,
      selectedColor?.name,
      selectedSize || undefined,
      selectedColor?.image_url || activeImage,
      selectedColor?.price,
      selectedColor?.sale_price
    );
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2200);
  };

  // Direct Buy Now
  const handleBuyNow = () => {
    addItem(
      currentProduct,
      quantity,
      selectedColor?.name,
      selectedSize || undefined,
      selectedColor?.image_url || activeImage,
      selectedColor?.price,
      selectedColor?.sale_price
    );
    setIsCartOpen(false);
    router.push('/checkout');
  };

  // Combine regular images + color variant images for the thumbnail strip
  const allThumbnails = Array.from(
    new Set([
      ...(currentProduct.images?.map((img) => img.image_url) || []),
      ...colorVariants.map((c) => c.image_url),
    ])
  );

  return (
    <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* 1. Breadcrumb Bar */}
      <nav className="flex items-center gap-2 text-xs text-slate-500 mb-8 pb-4 border-b border-slate-200">
        <Link href="/" className="hover:text-slate-900 transition-colors font-medium">
          Home
        </Link>
        <span>/</span>
        <Link href="/products" className="hover:text-slate-900 transition-colors font-medium">
          Shop
        </Link>
        {product.category && (
          <>
            <span>/</span>
            <Link
              href={`/products?category=${product.category.slug}`}
              className="hover:text-slate-900 transition-colors font-medium"
            >
              {product.category.name}
            </Link>
          </>
        )}
        <span>/</span>
        <span className="text-slate-900 font-bold truncate max-w-sm">{product.name}</span>
      </nav>

      {/* 2. Main Product Showcase Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
        {/* Left Column: Interactive Product Gallery */}
        <div className="lg:col-span-7 space-y-4">
          {/* Main Visual Display Frame with Zoom */}
          <div
            ref={imageContainerRef}
            onMouseEnter={() => setIsZoomed(true)}
            onMouseLeave={() => setIsZoomed(false)}
            onMouseMove={handleMouseMove}
            className="relative aspect-square w-full rounded-3xl overflow-hidden bg-[#fafafa] border border-slate-200 shadow-sm cursor-crosshair flex items-center justify-center p-6 sm:p-10"
          >
            {/* Standard Image */}
            <div
              className={`relative w-full h-full transition-opacity duration-300 ${
                isZoomed ? 'opacity-0' : 'opacity-100'
              }`}
            >
              <Image
                src={activeImage}
                alt={product.name}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 60vw"
                className="object-contain"
              />
            </div>

            {/* Hover Zoom Magnifier Layer */}
            {isZoomed && (
              <div
                className="absolute inset-0 pointer-events-none transition-opacity duration-150"
                style={{
                  backgroundImage: `url(${activeImage})`,
                  backgroundPosition: `${zoomCoords.x}% ${zoomCoords.y}%`,
                  backgroundSize: '220%',
                  backgroundRepeat: 'no-repeat',
                }}
              />
            )}

            {/* Badges Overlay */}
            <div className="absolute top-4 left-4 flex flex-col gap-2 z-10 pointer-events-none">
              {hasDiscount && (
                <span className="bg-rose-50 text-rose-700 border border-rose-200 font-extrabold text-xs px-3 py-1 rounded-xl shadow-xs">
                  {discountPercent}% OFF
                </span>
              )}
              {product.is_new && (
                <span className="bg-indigo-50 text-indigo-700 border border-indigo-200 font-extrabold text-xs px-3 py-1 rounded-xl shadow-xs">
                  NEW ARRIVAL
                </span>
              )}
              {effectivePrice >= 5000 && (
                <span className="bg-emerald-50 text-emerald-800 border border-emerald-200 font-bold text-xs px-2.5 py-1 rounded-xl flex items-center gap-1.5 shadow-xs">
                  <Truck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Free Express Delivery</span>
                </span>
              )}
            </div>

            {/* Zoom Hint Icon */}
            <div className="absolute bottom-4 right-4 z-10 bg-white/80 backdrop-blur-md text-slate-700 text-[11px] font-semibold px-2.5 py-1.5 rounded-xl border border-slate-200 flex items-center gap-1.5 pointer-events-none shadow-2xs">
              <ZoomIn className="w-3.5 h-3.5 text-indigo-600" />
              <span>Hover image to zoom</span>
            </div>

            {/* Wishlist Button */}
            <button
              onClick={() => setIsWishlisted(!isWishlisted)}
              className={`absolute top-4 right-4 z-10 p-3 rounded-2xl backdrop-blur-md transition-all shadow-sm ${
                isWishlisted
                  ? 'bg-rose-50 text-rose-600 border border-rose-200 scale-105'
                  : 'bg-white/90 hover:bg-white text-slate-600 hover:text-rose-600 border border-slate-200'
              }`}
              aria-label="Save to wishlist"
            >
              <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-rose-600' : ''}`} />
            </button>
          </div>

          {/* Interactive Thumbnails Row */}
          {allThumbnails.length > 1 && (
            <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-none">
              {allThumbnails.map((imgUrl, idx) => {
                const isSelected = activeImage === imgUrl;
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActiveImage(imgUrl)}
                    className={`relative w-20 h-20 rounded-2xl overflow-hidden bg-[#fafafa] border-2 transition-all shrink-0 p-1.5 ${
                      isSelected
                        ? 'border-indigo-600 ring-4 ring-indigo-600/10 scale-105 shadow-sm'
                        : 'border-slate-200 hover:border-slate-300 opacity-80 hover:opacity-100'
                    }`}
                  >
                    <div className="relative w-full h-full bg-[#FAF8F5]">
                      <Image
                        src={imgUrl}
                        alt={`${product.name} view ${idx + 1}`}
                        fill
                        loading="lazy"
                        sizes="80px"
                        className="object-contain"
                      />
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Right Column: Pricing, Colour Selection & Controls */}
        <div className="lg:col-span-5 space-y-6 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs">
          {/* Header Info */}
          <div>
            <div className="flex flex-wrap items-center justify-between gap-3 mb-2">
              <span className="inline-block text-xs font-extrabold uppercase tracking-widest text-indigo-600 bg-indigo-50 border border-indigo-100 px-3 py-1 rounded-full">
                {currentProduct.category?.name || 'AURA Studio'}
              </span>
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-500 font-mono">
                  SKU: {currentProduct.sku || 'AUR-STD-001'}
                </span>
                {isAdminUser && (
                  <div className="flex items-center gap-2">
                    <Link
                      href={`/admin/products/${currentProduct.id}/edit`}
                      className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-black tracking-wide text-amber-950 bg-amber-400 hover:bg-amber-500 rounded-full shadow-xs hover:shadow-sm transition-all hover:scale-105 active:scale-95 border border-amber-500/40 cursor-pointer whitespace-nowrap"
                      title="Open Dedicated Separate Product Editing Page"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                      <span>Edit</span>
                    </Link>

                    <button
                      type="button"
                      onClick={() => setIsEditModalOpen(true)}
                      id="edit-product-btn"
                      className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-bold text-slate-700 bg-white hover:bg-slate-100 rounded-full border border-slate-300 shadow-2xs transition-colors"
                      title="Quick Edit in Popup Modal"
                    >
                      <span>Quick Modal</span>
                    </button>
                  </div>
                )}
              </div>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight leading-tight">
              {currentProduct.name}
            </h1>

            {/* Ratings & Verified Count */}
            <div className="flex items-center gap-3 mt-3 text-xs">
              <div className="flex items-center gap-1 text-amber-500 font-extrabold">
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                <span className="text-slate-900 font-black">{currentProduct.rating.toFixed(1)}</span>
                <span className="text-slate-500 font-normal">
                  ({currentProduct.review_count} verified reviews)
                </span>
              </div>
              <span className="text-slate-300">•</span>
              <span className="text-emerald-700 font-bold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Verified Official Stock</span>
              </span>
            </div>
          </div>

          {/* Pricing Highlight Box */}
          <div className="p-4 sm:p-5 rounded-2xl bg-[#f8fafc] border border-slate-200 flex items-center justify-between">
            <div>
              <span className="text-[11px] text-slate-500 block font-bold uppercase tracking-wider">
                Price (PKR)
              </span>
              <div className="flex items-baseline gap-3 mt-0.5">
                <span className="text-2xl sm:text-3xl font-black text-slate-950">
                  {formatPrice(effectivePrice)}
                </span>
                {hasDiscount && (
                  <span className="text-sm text-slate-500 line-through">
                    {formatPrice(currentVariantPrice)}
                  </span>
                )}
              </div>
            </div>

            {hasDiscount && (
              <span className="bg-rose-50 text-rose-700 border border-rose-200/80 font-bold text-xs px-3.5 py-1.5 rounded-xl shadow-2xs">
                Save {formatPrice(discountAmount)}
              </span>
            )}
          </div>

          {/* COLOR SELECTION SECTION - ONLY rendered when product ACTUALLY has color variants! */}
          {hasColorVariants && (
            <div className="space-y-3 pt-1">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                  <span>Select Colour:</span>
                  <span className="text-indigo-600 font-black normal-case text-sm">
                    {selectedColor?.name || 'Default'}
                  </span>
                </label>
                <span className="text-[11px] text-slate-500">
                  {colorVariants.length} {colorVariants.length === 1 ? 'colour available' : 'colours available'}
                </span>
              </div>

              {/* Thumbnail-Based Colour Options */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {colorVariants.map((variant) => {
                  const isSelected = selectedColor?.name === variant.name;
                  return (
                    <button
                      key={variant.name}
                      type="button"
                      onClick={() => handleSelectColor(variant)}
                      className={`group relative flex flex-col items-center p-2 rounded-2xl border-2 transition-all text-center ${
                        isSelected
                          ? 'border-indigo-600 bg-indigo-50/50 ring-4 ring-indigo-600/10 shadow-sm'
                          : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50/60'
                      }`}
                    >
                      {/* Small Image Thumbnail */}
                      <div className="relative w-14 h-14 rounded-xl overflow-hidden bg-[#fafafa] border border-slate-200 mb-1.5">
                        <Image
                          src={variant.image_url}
                          alt={variant.name}
                          fill
                          loading="lazy"
                          sizes="56px"
                          className="object-contain p-1"
                        />
                        {/* Checkmark icon on selected */}
                        {isSelected && (
                          <div className="absolute top-1 right-1 w-4 h-4 rounded-full bg-indigo-600 text-white flex items-center justify-center shadow-xs">
                            <Check className="w-2.5 h-2.5 stroke-[3]" />
                          </div>
                        )}
                      </div>

                      {/* Colour swatch circle + name */}
                      <div className="flex items-center gap-1.5 max-w-full">
                        <span
                          className="w-3 h-3 rounded-full border border-slate-300 shrink-0 shadow-2xs"
                          style={{ backgroundColor: variant.hex }}
                        />
                        <span
                          className={`text-[11px] truncate leading-tight ${
                            isSelected ? 'font-black text-slate-950' : 'font-medium text-slate-700'
                          }`}
                        >
                          {variant.name}
                        </span>
                      </div>

                      {/* Variant-specific price pill */}
                      {(variant.sale_price || variant.price) && (
                        <span
                          className={`text-[10px] mt-1 px-1.5 py-0.5 rounded-md font-extrabold ${
                            isSelected
                              ? 'bg-indigo-600 text-white'
                              : 'bg-slate-100 text-slate-600'
                          }`}
                        >
                          {formatPrice(variant.sale_price ?? variant.price ?? 0)}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Size Selector - ONLY displayed when product actually has size options (e.g. Footwear, Belts) */}
          {sizeOptions.length > 0 && (
            <div className="space-y-2 pt-1">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-slate-900 uppercase tracking-wider block">
                  Select Size: <span className="text-indigo-600 font-bold">{selectedSize}</span>
                </label>
                <span className="text-[11px] text-slate-500 font-medium">Standard Fit</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {sizeOptions.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setSelectedSize(s)}
                    className={`px-3.5 py-2 rounded-xl text-xs font-bold border transition-all ${
                      selectedSize === s
                        ? 'border-indigo-600 bg-indigo-50 text-indigo-700 ring-2 ring-indigo-600/20 shadow-2xs'
                        : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity Selector & Stock Indicator */}
          <div className="space-y-2 pt-2">
            <div className="flex items-center justify-between text-xs">
              <label className="font-bold text-slate-900 uppercase tracking-wider">Quantity</label>
              <span className="font-bold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-md border border-emerald-200">
                {currentProduct.stock > 0 ? `✓ ${currentProduct.stock} units in stock` : 'Out of stock'}
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
                <span className="w-12 text-center font-black text-sm text-slate-950">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.min(currentProduct.stock, q + 1))}
                  disabled={quantity >= currentProduct.stock}
                  className="p-2 text-slate-600 hover:bg-slate-100 rounded-lg disabled:opacity-30 transition-colors"
                  aria-label="Increase quantity"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              <div className="text-xs text-slate-600 font-medium">
                Subtotal:{' '}
                <span className="font-black text-slate-950 text-base">
                  {formatPrice(effectivePrice * quantity)}
                </span>
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <button
              type="button"
              onClick={handleAddToCart}
              disabled={currentProduct.stock <= 0}
              className={`flex-1 py-4 px-6 rounded-2xl font-black text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-md ${
                isAdded
                  ? 'bg-emerald-600 text-white ring-4 ring-emerald-600/20'
                  : 'bg-slate-950 hover:bg-indigo-600 text-white active:scale-98'
              } disabled:opacity-40 disabled:bg-slate-200 disabled:text-slate-400`}
            >
              {isAdded ? (
                <>
                  <Check className="w-4 h-4 stroke-[3]" />
                  <span>Added {selectedColor ? selectedColor.name : 'to Cart'}!</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add to Cart ({formatPrice(effectivePrice * quantity)})</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={handleBuyNow}
              disabled={currentProduct.stock <= 0}
              className="flex-1 py-4 px-6 rounded-2xl font-black text-xs sm:text-sm bg-indigo-600 hover:bg-indigo-500 text-white flex items-center justify-center gap-2 transition-all shadow-md shadow-indigo-600/25 active:scale-98 disabled:opacity-40 disabled:bg-slate-200 disabled:text-slate-400"
            >
              <Zap className="w-4 h-4 text-amber-300" />
              <span>Buy Now (Express COD)</span>
            </button>
          </div>

          {/* Reassurances Strip */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-4 border-t border-slate-200 text-[11px] text-slate-700">
            <div className="flex items-center gap-2 bg-[#f8fafc] p-2.5 rounded-xl border border-slate-200/80">
              <Truck className="w-4 h-4 text-indigo-600 shrink-0" />
              <span className="font-bold">COD Across Pakistan</span>
            </div>
            <div className="flex items-center gap-2 bg-[#f8fafc] p-2.5 rounded-xl border border-slate-200/80">
              <RotateCcw className="w-4 h-4 text-indigo-600 shrink-0" />
              <span className="font-bold">7-Day Free Returns</span>
            </div>
            <div className="flex items-center gap-2 bg-[#f8fafc] p-2.5 rounded-xl border border-slate-200/80">
              <ShieldCheck className="w-4 h-4 text-indigo-600 shrink-0" />
              <span className="font-bold">1-Year Warranty</span>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Specifications, Details & Customer Reviews Tabbed Section */}
      <div className="mt-16 bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs">
        {/* Tab Headers */}
        <div className="flex border-b border-slate-200 bg-slate-50/60 overflow-x-auto">
          <button
            type="button"
            onClick={() => setActiveTab('details')}
            className={`px-6 py-4 text-xs font-extrabold uppercase tracking-wider transition-colors border-b-2 whitespace-nowrap ${
              activeTab === 'details'
                ? 'border-indigo-600 text-indigo-600 bg-white'
                : 'border-transparent text-slate-600 hover:text-slate-950'
            }`}
          >
            Product Overview
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('specs')}
            className={`px-6 py-4 text-xs font-extrabold uppercase tracking-wider transition-colors border-b-2 whitespace-nowrap ${
              activeTab === 'specs'
                ? 'border-indigo-600 text-indigo-600 bg-white'
                : 'border-transparent text-slate-600 hover:text-slate-950'
            }`}
          >
            Technical Specifications
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('reviews')}
            className={`px-6 py-4 text-xs font-extrabold uppercase tracking-wider transition-colors border-b-2 whitespace-nowrap ${
              activeTab === 'reviews'
                ? 'border-indigo-600 text-indigo-600 bg-white'
                : 'border-transparent text-slate-600 hover:text-slate-950'
            }`}
          >
            Verified Reviews ({currentProduct.review_count || reviews.length})
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-6 sm:p-10">
          {activeTab === 'details' && (
            <div className="space-y-6 max-w-3xl">
              <div>
                <h3 className="text-lg font-bold text-slate-950 mb-2">Designed for the Modern Lifestyle</h3>
                <p className="text-sm text-slate-700 leading-relaxed font-normal">
                  {currentProduct.description}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-100">
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1">
                  <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Premium Build</h4>
                  <p className="text-xs text-slate-600">
                    Engineered with aerospace-grade materials, durable finish, and precision tolerances.
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1">
                  <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Direct Verification</h4>
                  <p className="text-xs text-slate-600">
                    Includes serialized holographic verification seal and factory quality inspection stamp.
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'specs' && (
            <div className="max-w-2xl">
              <table className="w-full text-xs text-left border-collapse">
                <tbody className="divide-y divide-slate-100">
                  <tr className="py-2.5">
                    <td className="py-3 font-bold text-slate-500 w-1/3">Product Name</td>
                    <td className="py-3 font-semibold text-slate-900">{currentProduct.name}</td>
                  </tr>
                  <tr className="py-2.5">
                    <td className="py-3 font-bold text-slate-500">Category</td>
                    <td className="py-3 font-semibold text-slate-900">{currentProduct.category?.name || 'General'}</td>
                  </tr>
                  <tr className="py-2.5">
                    <td className="py-3 font-bold text-slate-500">SKU Code</td>
                    <td className="py-3 font-mono font-bold text-indigo-600">{currentProduct.sku || 'AUR-STD-001'}</td>
                  </tr>
                  {hasColorVariants && (
                    <tr className="py-2.5">
                      <td className="py-3 font-bold text-slate-500">Available Colours</td>
                      <td className="py-3 font-semibold text-slate-900">
                        {colorVariants.map((c) => c.name).join(', ')}
                      </td>
                    </tr>
                  )}
                  <tr className="py-2.5">
                    <td className="py-3 font-bold text-slate-500">Packaging</td>
                    <td className="py-3 font-semibold text-slate-900">
                      {currentProduct.packaging || 'Sealed Retail Packaging with Authenticity Certificate'}
                    </td>
                  </tr>
                  <tr className="py-2.5">
                    <td className="py-3 font-bold text-slate-500">Warranty</td>
                    <td className="py-3 font-semibold text-slate-900">
                      {currentProduct.warranty || '12 Months Official Brand Replacement Warranty'}
                    </td>
                  </tr>
                  <tr className="py-2.5">
                    <td className="py-3 font-bold text-slate-500">Shipping Partner</td>
                    <td className="py-3 font-semibold text-slate-900">
                      {currentProduct.shipping_info || 'TCS / Leopards Courier Express across Pakistan'}
                    </td>
                  </tr>
                  {currentProduct.specs &&
                    Object.entries(currentProduct.specs).map(([key, val]) => (
                      <tr key={key} className="py-2.5">
                        <td className="py-3 font-bold text-slate-500">{key}</td>
                        <td className="py-3 font-semibold text-slate-900">{val}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === 'reviews' && (
            <div className="space-y-6">
              {/* Review Overview Metric Bar */}
              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="text-4xl font-black text-slate-950">
                    {currentProduct.rating.toFixed(1)}
                  </div>
                  <div>
                    <div className="flex text-amber-400 gap-1">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Star key={s} className="w-4 h-4 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <p className="text-xs text-slate-600 mt-1 font-medium">
                      Based on <strong>{currentProduct.review_count || reviews.length}</strong> verified customer reviews across Pakistan
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-xs text-emerald-800 font-bold bg-emerald-50 px-3.5 py-2 rounded-xl border border-emerald-100">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>100% Verified Buyer Authentic Reviews</span>
                </div>
              </div>

              {reviews.length === 0 ? (
                <div className="text-center py-8 text-slate-500 text-xs">
                  No verified reviews yet for this product. Be the first to leave a review!
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {reviews.map((rev) => (
                    <div
                      key={rev.id}
                      className="p-5 rounded-2xl bg-white border border-slate-200/90 space-y-2.5 shadow-2xs"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex text-amber-400 gap-0.5">
                          {[1, 2, 3, 4, 5].map((s) => (
                            <Star
                              key={s}
                              className={`w-3.5 h-3.5 ${
                                s <= rev.rating ? 'fill-current text-amber-400' : 'text-slate-300'
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100 flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                          Verified Order
                        </span>
                      </div>

                      {rev.title && (
                        <h4 className="text-xs font-bold text-slate-900">{rev.title}</h4>
                      )}

                      <p className="text-xs text-slate-700 leading-relaxed font-normal">
                        &ldquo;{rev.comment}&rdquo;
                      </p>

                      <div className="pt-2 border-t border-slate-100 text-[11px] text-slate-500 font-medium flex items-center justify-between">
                        <span>{rev.user_name}</span>
                        <span className="text-[10px] text-slate-400">Cash on Delivery Verified</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* 4. Related Products Grid */}
      {relatedProducts.length > 0 && (
        <div className="mt-20 pt-12 border-t border-slate-200">
          <div className="flex items-center justify-between mb-8">
            <div>
              <span className="text-xs font-extrabold uppercase tracking-widest text-indigo-600">
                Recommendations
              </span>
              <h2 className="text-2xl font-black text-slate-950 tracking-tight mt-1">
                You May Also Like
              </h2>
            </div>
            <Link
              href="/products"
              className="text-xs font-bold text-indigo-600 hover:text-indigo-800 transition-colors"
            >
              Browse Complete Catalog →
            </Link>
          </div>

          <ProductGrid products={relatedProducts} />
        </div>
      )}

      {/* Admin Product Edit Modal */}
      {isAdminUser && (
        <ProductEditModal
          product={currentProduct}
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          onSaved={(updated) => {
            setCurrentProduct(updated);
            if (updated.images && updated.images.length > 0) {
              setActiveImage(updated.images[0].image_url);
            }
            router.refresh();
          }}
        />
      )}
    </div>
  );
}
