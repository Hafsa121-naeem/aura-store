'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'motion/react';
import { ChevronLeft, ChevronRight, ShoppingBag, Eye, Check, Heart, Sparkles } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { formatPrice } from '@/lib/utils';
import QuickViewModal from '@/components/products/QuickViewModal';

export default function BrandMarquee() {
  const { addItem, setIsCartOpen } = useCart();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [activeFilter, setActiveFilter] = useState<'ALL' | 'NEW' | 'RESPONSIBLE' | 'BESTSELLER'>('ALL');
  const [addedId, setAddedId] = useState<string | null>(null);
  const [quickViewProduct, setQuickViewProduct] = useState<any | null>(null);

  const featuredObjects = [
    {
      id: 'el-ha-01',
      name: 'Horizon Pro ANC Hybrid Headphones',
      category: 'Acoustic Chamber',
      subcategory: 'Over-Ear Acoustics',
      price: 26999,
      salePrice: 22499,
      image: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=800&q=85',
      hoverImage: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=85',
      slug: 'horizon-pro-anc-hybrid-wireless-headphones',
      tag: 'RESPONSIBLE',
      rating: 4.9,
      colors: ['#1F2022', '#D8D2C6', '#806B43'],
      isNew: true,
      description: 'Custom 40mm beryllium drivers, memory foam protein leather, and 42dB hybrid noise cancellation.',
    },
    {
      id: 'sw-ap-01',
      name: 'Apex Ultra Titanium Smartwatch',
      category: 'Precision Horology',
      subcategory: 'Titanium AMOLED',
      price: 21999,
      salePrice: 16999,
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=85',
      hoverImage: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=800&q=85',
      slug: 'apex-ultra-titanium-sapphire-amoled-smartwatch',
      tag: 'NYHED',
      rating: 4.8,
      colors: ['#3A3B3C', '#E5E4E2', '#C5A059'],
      isNew: true,
      description: 'Aerospace grade titanium case with curved 1.96-inch sapphire AMOLED display and medical ECG sensor matrix.',
    },
    {
      id: 'f-hb-01',
      name: 'Verona Italian Kelly Handbag',
      category: 'Sartorial Wardrobe',
      subcategory: 'Artisan Leather',
      price: 24999,
      salePrice: 19999,
      image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800&q=85',
      hoverImage: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&q=85',
      slug: 'verona-italian-kelly-handbag',
      tag: 'BESTSELLER',
      rating: 5.0,
      colors: ['#B8392A', '#1A1918', '#8A6D3B'],
      isNew: false,
      description: 'Handcrafted full-grain Italian calfskin with solid gold-plated hardware and protective travel dustbag.',
    },
    {
      id: 'h-la-01',
      name: 'Nordic Minimalist Ceramic Lamp',
      category: 'Living Space',
      subcategory: 'Interior Elements',
      price: 12499,
      salePrice: 9499,
      image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=85',
      hoverImage: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=800&q=85',
      slug: 'minimalist-ceramic-table-lamp',
      tag: 'RESPONSIBLE',
      rating: 4.9,
      colors: ['#EFECE6', '#9E814D', '#2B2927'],
      isNew: true,
      description: 'Hand-thrown matte ceramic base with woven natural flax shade and warm dimmable LED ambiance.',
    },
    {
      id: 'b-se-01',
      name: 'Botanical Multi-Peptide Elixir',
      category: 'Botanical & Scent',
      subcategory: 'Clean Skincare',
      price: 9999,
      salePrice: 7899,
      image: 'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=800&q=85',
      hoverImage: 'https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?w=800&q=85',
      slug: 'botanical-multi-peptide-youth-serum',
      tag: 'NYHED',
      rating: 4.9,
      colors: ['#E2B777', '#806B43'],
      isNew: true,
      description: 'Concentrated peptide complex formulated with cold-pressed rosehip and hyaluronic acid for cellular renewal.',
    },
    {
      id: 'm-ch-01',
      name: 'MagSafe Dual Aluminum Power Dock',
      category: 'Mobile Architecture',
      subcategory: 'Machined Power',
      price: 11499,
      salePrice: 8999,
      image: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=800&q=85',
      hoverImage: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=800&q=85',
      slug: 'magsafe-magnetic-wireless-charging-stand',
      tag: 'BESTSELLER',
      rating: 4.8,
      colors: ['#E5E4E2', '#1A1918'],
      isNew: false,
      description: 'Solid CNC milled aerospace aluminum charging dock with 15W MagSafe alignment and weighted anti-slip base.',
    },
  ];

  const filtered = featuredObjects.filter((item) => {
    if (activeFilter === 'ALL') return true;
    if (activeFilter === 'NEW') return item.isNew;
    if (activeFilter === 'RESPONSIBLE') return item.tag === 'RESPONSIBLE';
    if (activeFilter === 'BESTSELLER') return item.tag === 'BESTSELLER';
    return true;
  });

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const offset = direction === 'left' ? -380 : 380;
      scrollContainerRef.current.scrollBy({ left: offset, behavior: 'smooth' });
    }
  };

  const handleQuickAdd = (item: typeof featuredObjects[0], e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(
      {
        id: item.id,
        name: item.name,
        slug: item.slug,
        price: item.price,
        sale_price: item.salePrice,
        category_id: item.category.toLowerCase().replace(/\s+/g, '-'),
        stock: 25,
        rating: item.rating,
        review_count: 50,
        status: 'published',
        featured: true,
        images: [{ id: '1', product_id: item.id, image_url: item.image, is_primary: true }],
      } as any,
      1,
      undefined,
      undefined,
      item.image
    );
    setAddedId(item.id);
    setTimeout(() => {
      setAddedId(null);
      setIsCartOpen(true);
    }, 500);
  };

  return (
    <section className="py-24 sm:py-32 bg-[#FAF8F5] hairline-b">
      <div className="max-w-[1540px] mx-auto px-6 sm:px-10">
        
        {/* 1. ferm LIVING Signature "Featured Products" Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between pb-10 sm:pb-12 hairline-b gap-6">
          <div className="space-y-3">
            <span className="text-[11px] uppercase tracking-[0.28em] font-light text-[#8C867D] block">
              Curated Highlights &bull; Edition 01
            </span>
            <h2 className="text-3xl sm:text-5xl font-editorial font-light text-[#1A1918] leading-[1.08]">
              Featured Objects: <br />
              <span className="italic font-normal text-[#806B43]">Mindfully crafted for modern living</span>
            </h2>
            <p className="text-xs sm:text-sm font-light text-[#5C5852] max-w-md leading-relaxed pt-1">
              A curated selection of six flagship objects. Quality over quantity, verified with official warranty and nationwide Cash on Delivery.
            </p>
          </div>

          {/* Filter Tags & Architectural Navigation Arrows */}
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-wider text-[#5C5852]">
              {[
                { id: 'ALL', label: 'ALL 6 OBJECTS' },
                { id: 'NEW', label: 'NYHED / NEW' },
                { id: 'RESPONSIBLE', label: 'RESPONSIBLE' },
                { id: 'BESTSELLER', label: 'BESTSELLERS' },
              ].map((f) => (
                <button
                  key={f.id}
                  type="button"
                  onClick={() => setActiveFilter(f.id as any)}
                  className={`px-3.5 py-2 border transition-all ${
                    activeFilter === f.id
                      ? 'border-[#1A1918] bg-[#1A1918] text-[#FAF8F5]'
                      : 'border-[#D8D2C6] bg-transparent text-[#5C5852] hover:border-[#1A1918]'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>

            {/* Carousel Arrows */}
            <div className="flex items-center gap-2 pl-2">
              <button
                type="button"
                onClick={() => scroll('left')}
                className="w-10 h-10 border border-[#D8D2C6] bg-white hover:border-[#1A1918] text-[#1A1918] flex items-center justify-center transition-colors shadow-sm"
                aria-label="Previous Slide"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => scroll('right')}
                className="w-10 h-10 border border-[#D8D2C6] bg-white hover:border-[#1A1918] text-[#1A1918] flex items-center justify-center transition-colors shadow-sm"
                aria-label="Next Slide"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* 2. Large, Tall Architectural Portrait Product Carousel */}
        <div
          ref={scrollContainerRef}
          className="flex gap-8 overflow-x-auto pt-10 pb-6 scrollbar-none scroll-smooth select-none"
          style={{ scrollbarWidth: 'none' }}
        >
          {filtered.map((item) => (
            <div
              key={item.id}
              className="group relative flex flex-col justify-between bg-[#F5F2EB] border border-[#D8D2C6] hover:border-[#1A1918] transition-all duration-300 w-[320px] sm:w-[380px] shrink-0 shadow-sm hover:shadow-xl"
            >
              {/* Product Image Frame with Dual Hover Crossfade */}
              <Link
                href={`/products/${item.slug}`}
                className="relative aspect-[4/5] w-full overflow-hidden bg-[#EDE8DF] block"
              >
                {/* Primary Image */}
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  sizes="340px"
                  className="object-cover group-hover:scale-104 transition-transform duration-700 ease-out"
                  unoptimized
                />

                {/* Secondary Lifestyle Hover Image */}
                <Image
                  src={item.hoverImage}
                  alt={`${item.name} lifestyle`}
                  fill
                  sizes="340px"
                  className="object-cover absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-out"
                  unoptimized
                />

                {/* Status Badge */}
                <div className="absolute top-3 left-3 z-10">
                  <span className="bg-[#FAF8F5]/90 backdrop-blur-sm px-2.5 py-1 text-[9px] font-mono uppercase tracking-wider text-[#1A1918] border border-[#D8D2C6]">
                    {item.tag}
                  </span>
                </div>

                {/* Floating Quick Action Buttons */}
                <div className="absolute top-3 right-3 flex flex-col gap-1.5 z-10">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      setQuickViewProduct({
                        ...item,
                        sale_price: item.salePrice,
                        images: [{ id: '1', product_id: item.id, image_url: item.image, is_primary: true }],
                      });
                    }}
                    className="w-8 h-8 bg-[#FAF8F5]/90 backdrop-blur-sm border border-[#D8D2C6] hover:bg-[#1A1918] hover:text-white flex items-center justify-center transition-all opacity-0 group-hover:opacity-100"
                    title="Quick Preview"
                  >
                    <Eye className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Quick Add To Bag Bar on Hover */}
                <div className="absolute bottom-3 inset-x-3 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <button
                    type="button"
                    onClick={(e) => handleQuickAdd(item, e)}
                    disabled={addedId === item.id}
                    className="w-full py-2.5 bg-[#1A1918] hover:bg-[#806B43] text-[#FAF8F5] text-[10px] uppercase tracking-[0.2em] font-light flex items-center justify-center gap-1.5 transition-colors"
                  >
                    {addedId === item.id ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Added to Bag</span>
                      </>
                    ) : (
                      <>
                        <ShoppingBag className="w-3.5 h-3.5" />
                        <span>Add to Bag</span>
                      </>
                    )}
                  </button>
                </div>
              </Link>

              {/* Product Details Block */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-3 hairline-t">
                <div>
                  <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.2em] text-[#8C867D] font-light">
                    <span>{item.category}</span>
                    <span className="font-mono text-[#5C5852]">{item.subcategory}</span>
                  </div>

                  <Link href={`/products/${item.slug}`} className="block mt-1">
                    <h3 className="font-editorial text-lg text-[#1A1918] group-hover:text-[#806B43] transition-colors line-clamp-1 font-normal">
                      {item.name}
                    </h3>
                  </Link>
                </div>

                {/* Color Swatches */}
                <div className="flex items-center gap-1.5 pt-1">
                  {item.colors.map((color, i) => (
                    <span
                      key={i}
                      className="w-3.5 h-3.5 rounded-full border border-[#D8D2C6]"
                      style={{ backgroundColor: color }}
                    />
                  ))}
                  <span className="text-[10px] text-[#8C867D] font-mono ml-1">
                    {item.colors.length} Finishes
                  </span>
                </div>

                {/* Price Strip */}
                <div className="pt-3 hairline-t flex items-baseline justify-between">
                  <div className="flex items-baseline gap-2">
                    <span className="text-base font-light text-[#1A1918]">
                      {formatPrice(item.salePrice)}
                    </span>
                    <span className="text-xs text-[#8C867D] line-through">
                      {formatPrice(item.price)}
                    </span>
                  </div>
                  <span className="text-[10px] font-mono uppercase text-[#806B43]">
                    In Stock &bull; COD
                  </span>
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* 3. Understated Architectural Assurance & Subtle "Explore Collection" Link */}
        <div className="mt-14 pt-8 hairline-t flex flex-col md:flex-row items-center justify-between text-xs text-[#5C5852] font-light tracking-wider gap-6">
          <div className="flex flex-wrap items-center gap-6 text-[11px] font-mono text-[#8C867D]">
            <span>&bull; COMPLIMENTARY EXPRESS SHIPPING OVER RS. 5,000</span>
            <span>&bull; DOORSTEP CASH ON DELIVERY NATIONWIDE</span>
            <span>&bull; 100% CERTIFIED OFFICIAL WARRANTY</span>
          </div>

          <Link
            href="/products"
            className="group inline-flex items-center gap-3 px-6 py-3 bg-[#1A1918] hover:bg-[#806B43] text-[#FAF8F5] text-xs uppercase tracking-[0.22em] font-light transition-all shadow-sm"
          >
            <span>Explore Complete Collection (76 Objects)</span>
            <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
          </Link>
        </div>

      </div>

      {/* Quick View Modal */}
      {quickViewProduct && (
        <QuickViewModal
          product={quickViewProduct}
          isOpen={!!quickViewProduct}
          onClose={() => setQuickViewProduct(null)}
        />
      )}
    </section>
  );
}
