'use client';

import React, { useState, useMemo, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'motion/react';
import { Product } from '@/lib/types/database';
import ProductCard from '@/components/products/ProductCard';
import { useCart } from '@/context/CartContext';
import { formatPrice } from '@/lib/utils';
import {
  Search,
  SlidersHorizontal,
  Truck,
  ShieldCheck,
  Check,
  Sparkles,
  Star,
  Eye,
  ShoppingBag,
  ArrowRight,
  RotateCcw,
  Zap,
} from 'lucide-react';

export interface SubcategoryOption {
  id: string; // 'all' or subcategory slug e.g. 'handbags'
  name: string;
}

interface CategoryBrowseViewProps {
  categoryName: string;
  categorySlug: string;
  bannerBadge: string;
  bannerHeadline: string;
  bannerDescription: string;
  bannerImage: string;
  bannerImageAlt: string;
  bannerFeatureText: string;
  subcategories: SubcategoryOption[];
  products: Product[];
}

export default function CategoryBrowseView({
  categoryName,
  categorySlug,
  bannerBadge,
  bannerHeadline,
  bannerDescription,
  bannerImage,
  bannerImageAlt,
  bannerFeatureText,
  subcategories,
  products = [],
}: CategoryBrowseViewProps) {
  const { addItem, setIsCartOpen } = useCart();
  const [selectedSubcategory, setSelectedSubcategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating' | 'newest'>('featured');
  const [activeBannerIndex, setActiveBannerIndex] = useState(0);
  const [bannerAdded, setBannerAdded] = useState(false);

  // Framer-inspired 3D Cursor Tilt Physics for the Hero Card
  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 18, stiffness: 140 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [12, -12]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-12, 12]), springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  // Curated spotlight slides for the animated pop-up stage
  const bannerSlides = useMemo(() => {
    if (products.length > 0) {
      return products.slice(0, 3).map((p, idx) => ({
        id: p.id,
        name: p.name,
        price: p.sale_price || p.price,
        originalPrice: p.price,
        image: p.images?.[0]?.image_url || bannerImage,
        badge: idx === 0 ? 'FLAGSHIP FOCUS' : idx === 1 ? 'EDITOR CHOICE' : 'TOP RATED',
        perk: idx === 0 ? '42dB Hybrid ANC' : idx === 1 ? 'Titanium Build' : 'Verified COD',
        rating: p.rating || 4.9,
        slug: p.slug,
        product: p,
      }));
    }
    return [
      {
        id: 'default-1',
        name: bannerHeadline,
        price: 22499,
        originalPrice: 26999,
        image: bannerImage,
        badge: 'FLAGSHIP FOCUS',
        perk: 'Precision Engineering',
        rating: 4.9,
        slug: 'products',
        product: null,
      },
    ];
  }, [products, bannerImage, bannerHeadline]);

  const currentSlide = bannerSlides[activeBannerIndex] || bannerSlides[0];

  const handleBannerAdd = () => {
    if (currentSlide.product) {
      addItem(currentSlide.product, 1);
    } else if (products[0]) {
      addItem(products[0], 1);
    }
    setBannerAdded(true);
    setTimeout(() => {
      setBannerAdded(false);
      setIsCartOpen(true);
    }, 500);
  };

  // Compute counts for each subcategory
  const subcategoryCounts = useMemo(() => {
    const counts: Record<string, number> = { all: products.length };
    products.forEach((p) => {
      const slug = p.subcategory_slug || 'other';
      counts[slug] = (counts[slug] || 0) + 1;
    });
    return counts;
  }, [products]);

  // Filter & Sort
  const filteredProducts = useMemo(() => {
    let list = [...products];

    // Subcategory Filter
    if (selectedSubcategory !== 'all') {
      list = list.filter((p) => p.subcategory_slug === selectedSubcategory);
    }

    // Search Query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          (p.subcategory && p.subcategory.toLowerCase().includes(q))
      );
    }

    // Sort
    if (sortBy === 'price-asc') {
      list.sort((a, b) => (a.sale_price ?? a.price) - (b.sale_price ?? b.price));
    } else if (sortBy === 'price-desc') {
      list.sort((a, b) => (b.sale_price ?? b.price) - (a.sale_price ?? a.price));
    } else if (sortBy === 'rating') {
      list.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === 'newest') {
      list.sort((a, b) => (b.is_new ? 1 : 0) - (a.is_new ? 1 : 0));
    }

    return list;
  }, [products, selectedSubcategory, searchQuery, sortBy]);

  const activeSubcategoryObj = subcategories.find((s) => s.id === selectedSubcategory);

  return (
    <div className="max-w-[1540px] mx-auto px-6 sm:px-10 py-8 sm:py-12 space-y-12 selection:bg-[#E0D8CB] selection:text-[#1A1918]">
      
      {/* 1. ferm LIVING Danish Architectural Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs font-light tracking-[0.2em] uppercase text-[#8C867D] pb-3 hairline-b">
        <Link href="/" className="hover:text-[#1A1918] transition-colors">
          Home
        </Link>
        <span>/</span>
        <Link href="/products" className="hover:text-[#1A1918] transition-colors">
          Spaces
        </Link>
        <span>/</span>
        <span className="text-[#1A1918] font-medium">{categoryName}</span>
        {selectedSubcategory !== 'all' && activeSubcategoryObj && (
          <>
            <span>/</span>
            <span className="text-[#806B43] font-medium">{activeSubcategoryObj.name}</span>
          </>
        )}
      </nav>

      {/* 2. Premium 3D Animated Interactive Category Hero Banner */}
      <div className="relative overflow-hidden bg-gradient-to-br from-[#1A1918] via-[#24211D] to-[#141312] text-[#FAF8F5] border border-[#3D3A35] shadow-2xl p-6 sm:p-10 lg:p-14">
        
        {/* Subtle Ambient Glow Background Orbs */}
        <div className="absolute top-0 right-1/4 w-[450px] h-[450px] rounded-full bg-[#9E814D]/10 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-10 left-10 w-[350px] h-[350px] rounded-full bg-[#806B43]/15 blur-3xl pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Column: Editorial Headline & Brand Assurance */}
          <div className="lg:col-span-7 space-y-6 text-left">
            
            {/* Subtle Gold Category Pill */}
            <div className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.26em] font-mono text-[#E8D4B0] bg-white/5 border border-[#9E814D]/30 px-3.5 py-1.5 backdrop-blur-sm">
              <Sparkles className="w-3 h-3 text-[#9E814D]" />
              <span>{bannerBadge}</span>
            </div>

            <div className="space-y-3">
              <h1 className="text-4xl sm:text-6xl font-editorial font-light tracking-tight leading-[1.06] text-[#FAF8F5]">
                {bannerHeadline}
              </h1>
              <p className="text-xs sm:text-sm text-[#EDE8DF]/80 font-light leading-relaxed max-w-xl">
                {bannerDescription}
              </p>
            </div>

            {/* Quick Interactive Slide Tabs */}
            <div className="flex items-center gap-2 pt-2">
              <span className="text-[10px] uppercase font-mono tracking-wider text-[#8C867D] mr-2">
                Curated Focus:
              </span>
              {bannerSlides.map((slide, idx) => (
                <button
                  key={slide.id}
                  type="button"
                  onClick={() => setActiveBannerIndex(idx)}
                  className={`text-[10px] font-mono tracking-wider px-2.5 py-1 transition-all border ${
                    activeBannerIndex === idx
                      ? 'border-[#FAF8F5] bg-white/20 text-[#FAF8F5] font-semibold'
                      : 'border-white/10 text-[#EDE8DF]/60 hover:text-white hover:border-white/30'
                  }`}
                >
                  0{idx + 1} &bull; {slide.badge}
                </button>
              ))}
            </div>

            {/* Nationwide Trust Strip */}
            <div className="flex flex-wrap items-center gap-5 pt-4 text-[11px] font-light text-[#EDE8DF]/80 border-t border-white/10 uppercase tracking-wider">
              <span className="flex items-center gap-1.5 text-emerald-400">
                <Truck className="w-3.5 h-3.5" />
                Free Nationwide Delivery over Rs. 5,000
              </span>
              <span>&bull;</span>
              <span className="flex items-center gap-1.5 text-[#E8D4B0]">
                <ShieldCheck className="w-3.5 h-3.5" />
                100% Certified Authentic Quality
              </span>
              <span>&bull;</span>
              <span>Cash on Delivery</span>
            </div>
          </div>

          {/* Right Column: 3D Kinetic Floating Pop-Up Showcase Card */}
          <div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ perspective: 1100 }}
            className="lg:col-span-5 relative w-full select-none"
          >
            <motion.div
              style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
              className="relative w-full aspect-[4/3] sm:aspect-[16/11] rounded-none bg-[#EDE8DF] border border-[#D8D2C6]/80 overflow-visible shadow-2xl group cursor-pointer"
            >
              
              {/* Product Visual Container with Smooth Transition */}
              <div className="relative w-full h-full overflow-hidden bg-[#EDE8DF]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentSlide.id}
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.5 }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={currentSlide.image}
                      alt={currentSlide.name}
                      fill
                      priority
                      sizes="(max-width: 1024px) 100vw, 550px"
                      className="object-cover object-center group-hover:scale-104 transition-transform duration-1000 ease-out"
                      unoptimized
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent pointer-events-none" />
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* POP-UP BADGE 1: Top-Right 3D Kinetic Floating Badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: -10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                style={{ transform: 'translateZ(45px)' }}
                className="absolute -top-3 -right-3 z-30 bg-[#1A1918]/95 backdrop-blur-md px-3.5 py-1.5 border border-[#D8D2C6]/60 shadow-xl flex items-center gap-2 text-[10px] font-mono text-[#FAF8F5] uppercase tracking-wider"
              >
                <span className="w-2 h-2 rounded-full bg-[#9E814D] animate-ping" />
                <span className="font-semibold">{currentSlide.perk}</span>
              </motion.div>

              {/* POP-UP BADGE 2: Top-Left Verified Star Rating */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8, x: -10 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
                style={{ transform: 'translateZ(40px)' }}
                className="absolute -top-3 left-4 z-30 bg-[#FAF8F5]/95 backdrop-blur-md px-3 py-1 border border-[#D8D2C6] shadow-xl flex items-center gap-1.5 text-[10px] font-mono text-[#1A1918]"
              >
                <Star className="w-3 h-3 fill-[#9E814D] text-[#9E814D]" />
                <span className="font-bold">{currentSlide.rating.toFixed(1)}</span>
                <span className="text-[#8C867D] uppercase tracking-wider text-[9px]">&bull; 100% COD</span>
              </motion.div>

              {/* POP-UP BADGE 3: Bottom Floating Architectural Control Bar */}
              <div
                style={{ transform: 'translateZ(35px)' }}
                className="absolute bottom-4 inset-x-4 z-20 bg-[#FAF8F5]/95 backdrop-blur-md p-4 border border-[#D8D2C6] shadow-xl space-y-2 text-[#1A1918]"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[9px] uppercase tracking-[0.24em] font-mono text-[#806B43] font-medium">
                    {currentSlide.badge}
                  </span>
                  <span className="text-[10px] font-mono text-[#8C867D]">
                    Authentic Pakistani Stock
                  </span>
                </div>

                <h4 className="text-sm sm:text-base font-editorial text-[#1A1918] line-clamp-1 font-normal">
                  {currentSlide.name}
                </h4>

                <div className="pt-2 flex items-baseline justify-between hairline-t">
                  <div className="flex items-baseline gap-2">
                    <span className="text-base font-light text-[#1A1918]">
                      {formatPrice(currentSlide.price)}
                    </span>
                    <span className="text-xs text-[#8C867D] line-through">
                      {formatPrice(currentSlide.originalPrice)}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleBannerAdd();
                    }}
                    disabled={bannerAdded}
                    className="px-3.5 py-1.5 bg-[#1A1918] hover:bg-[#806B43] text-[#FAF8F5] text-[10px] uppercase tracking-[0.18em] font-light flex items-center gap-1.5 transition-colors disabled:opacity-50"
                  >
                    {bannerAdded ? (
                      <>
                        <Check className="w-3 h-3 text-emerald-400" />
                        <span>Added</span>
                      </>
                    ) : (
                      <>
                        <ShoppingBag className="w-3 h-3" />
                        <span>Add to Bag</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

            </motion.div>
          </div>

        </div>
      </div>

      {/* 3. Subcategories Horizontal Architectural Filter Bar */}
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 hairline-b">
          <div>
            <h2 className="text-2xl sm:text-3xl font-editorial font-light text-[#1A1918] tracking-tight flex items-center gap-3">
              <span>{selectedSubcategory === 'all' ? `All ${categoryName}` : activeSubcategoryObj?.name}</span>
              <span className="text-xs font-mono text-[#8C867D] px-2.5 py-0.5 border border-[#D8D2C6] bg-[#FAF8F5]">
                {filteredProducts.length} Objects
              </span>
            </h2>
            <p className="text-xs text-[#5C5852] font-light mt-1">
              Select any subcategory to filter curated collections with immediate reactive updates.
            </p>
          </div>

          {/* Quick Search & Sort Filter */}
          <div className="flex items-center gap-3">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Filter within category..."
                className="w-48 sm:w-64 bg-[#FAF8F5] border border-[#D8D2C6] px-3 py-2 pl-8 text-xs text-[#1A1918] placeholder-[#8C867D] focus:outline-none focus:border-[#1A1918]"
              />
              <Search className="w-3.5 h-3.5 text-[#8C867D] absolute left-2.5 top-1/2 -translate-y-1/2" />
            </div>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-[#FAF8F5] border border-[#D8D2C6] px-3 py-2 text-xs text-[#1A1918] focus:outline-none focus:border-[#1A1918] font-light"
            >
              <option value="featured">Featured Focus</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
              <option value="newest">Newest First</option>
            </select>
          </div>
        </div>

        {/* Subcategory Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2">
          {subcategories.map((sub) => {
            const count = subcategoryCounts[sub.id] || 0;
            const isSelected = selectedSubcategory === sub.id;
            return (
              <button
                key={sub.id}
                type="button"
                onClick={() => setSelectedSubcategory(sub.id)}
                className={`px-4 py-2 text-xs uppercase tracking-[0.18em] font-light transition-all border whitespace-nowrap flex items-center gap-2 ${
                  isSelected
                    ? 'border-[#1A1918] bg-[#1A1918] text-[#FAF8F5]'
                    : 'border-[#D8D2C6] bg-[#FAF8F5] text-[#5C5852] hover:border-[#1A1918]'
                }`}
              >
                <span>{sub.name}</span>
                <span className={`text-[10px] font-mono ${isSelected ? 'text-[#FAF8F5]/80' : 'text-[#8C867D]'}`}>
                  ({count})
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 4. Products Grid */}
      {filteredProducts.length === 0 ? (
        <div className="text-center py-20 bg-[#FAF8F5] border border-[#D8D2C6] p-8 space-y-3">
          <p className="font-editorial text-2xl text-[#1A1918]">No objects match your current filter.</p>
          <p className="text-xs text-[#8C867D]">Try clearing your search query or selecting &quot;All Collections&quot;.</p>
          <button
            type="button"
            onClick={() => {
              setSelectedSubcategory('all');
              setSearchQuery('');
            }}
            className="mt-3 px-6 py-2.5 bg-[#1A1918] text-[#FAF8F5] text-xs uppercase tracking-[0.2em] font-light"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}

    </div>
  );
}
