'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'motion/react';
import { ShoppingBag, Eye, Check, ArrowRight, Sparkles } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { formatPrice } from '@/lib/utils';
import QuickViewModal from '@/components/products/QuickViewModal';

export default function BrandMarquee() {
  const { addItem, setIsCartOpen } = useCart();
  const [addedId, setAddedId] = useState<string | null>(null);
  const [quickViewProduct, setQuickViewProduct] = useState<any | null>(null);

  // Exactly 4 carefully selected products (Calm, static, premium)
  const featuredFour = [
    {
      id: 'el-ha-01',
      name: 'Horizon Pro ANC Hybrid Headphones',
      category: 'Acoustic Chamber',
      spec: '40mm Milled Beryllium',
      price: 26999,
      salePrice: 22499,
      image: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=800&q=85',
      hoverImage: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=85',
      slug: 'horizon-pro-anc-hybrid-wireless-headphones',
      tag: 'FLAGSHIP',
      colors: ['#1F2022', '#D8D2C6', '#806B43'],
      description: 'Custom 40mm beryllium drivers, memory foam protein leather, and 42dB hybrid noise cancellation.',
    },
    {
      id: 'sw-ap-01',
      name: 'Apex Titanium Sapphire Smartwatch',
      category: 'Precision Horology',
      spec: 'Grade-5 Aerospace Titanium',
      price: 21999,
      salePrice: 16999,
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=85',
      hoverImage: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=800&q=85',
      slug: 'apex-titanium-sapphire-amoled-smartwatch',
      tag: 'NEW ARRIVAL',
      colors: ['#3A3B3C', '#E5E4E2', '#C5A059'],
      description: 'Aerospace grade titanium case with curved 1.96-inch sapphire AMOLED display and ECG sensor matrix.',
    },
    {
      id: 'f-hb-01',
      name: 'Verona Italian Calfskin Handbag',
      category: 'Sartorial Wardrobe',
      spec: 'Full-Grain Tuscan Calfskin',
      price: 24999,
      salePrice: 19999,
      image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800&q=85',
      hoverImage: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&q=85',
      slug: 'verona-italian-calfskin-handbag',
      tag: 'BESTSELLER',
      colors: ['#B8392A', '#1A1918', '#8A6D3B'],
      description: 'Handcrafted full-grain Italian calfskin with solid gold-plated hardware and protective travel dustbag.',
    },
    {
      id: 'h-la-01',
      name: 'Cordless Ceramic Table Lamp',
      category: 'Living Space',
      spec: 'Hand-Thrown Matte Stoneware',
      price: 12499,
      salePrice: 9499,
      image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=85',
      hoverImage: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=800&q=85',
      slug: 'cordless-rechargeable-mushroom-table-lamp',
      tag: 'CURATED',
      colors: ['#EFECE6', '#9E814D', '#2B2927'],
      description: 'Hand-thrown matte ceramic base with woven natural flax shade and warm dimmable LED ambiance.',
    },
  ];

  const handleQuickAdd = (item: typeof featuredFour[0], e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(
      {
        id: item.id,
        name: item.name,
        slug: item.slug,
        price: item.price,
        sale_price: item.salePrice,
        category_id: 'featured',
        stock: 25,
        rating: 4.9,
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
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between pb-10 sm:pb-12 hairline-b gap-6">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8 }}
            className="space-y-3"
          >
            <div className="flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-[#806B43]" />
              <span className="text-[11px] uppercase tracking-[0.28em] font-light text-[#8C867D]">
                Curated Highlights &bull; Edition 01
              </span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-editorial font-light text-[#1A1918] leading-[1.08]">
              Featured Collection: <br />
              <span className="italic font-normal text-[#806B43]">
                Four pieces crafted for longevity
              </span>
            </h2>
            <p className="text-xs sm:text-sm font-light text-[#5C5852] max-w-md leading-relaxed pt-1">
              Quality over quantity. Each piece verified with official 12-month brand warranty and nationwide Cash on Delivery.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8 }}
          >
            <Link
              href="/products"
              className="text-xs uppercase tracking-[0.24em] font-light text-[#1A1918] hover:text-[#806B43] flex items-center gap-2 transition-colors self-start md:self-auto underline underline-offset-8"
            >
              <span>Explore All 76 Objects</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </motion.div>
        </div>

        {/* The 4 Featured Products (Clean, static, 4-column balanced grid with staggered entrance) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 pt-10 sm:pt-14">
          {featuredFour.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7, delay: idx * 0.12 }}
              whileHover={{ y: -6 }}
              className="group relative flex flex-col justify-between bg-[#F5F2EB] border border-[#D8D2C6] hover:border-[#1A1918] transition-all duration-300 shadow-sm hover:shadow-2xl"
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
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 380px"
                  className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  unoptimized
                />

                {/* Secondary Lifestyle Hover Image */}
                <Image
                  src={item.hoverImage}
                  alt={`${item.name} lifestyle`}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 380px"
                  className="object-cover absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-out"
                  unoptimized
                />

                {/* Status Badge */}
                <div className="absolute top-3 left-3 z-10">
                  <span className="bg-[#FAF8F5]/90 backdrop-blur-sm px-2.5 py-1 text-[9px] font-mono uppercase tracking-wider text-[#1A1918] border border-[#D8D2C6]">
                    {item.tag}
                  </span>
                </div>

                {/* Quick View Button */}
                <div className="absolute top-3 right-3 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
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
                    className="w-8 h-8 bg-[#FAF8F5]/95 border border-[#D8D2C6] hover:bg-[#1A1918] hover:text-white flex items-center justify-center transition-all shadow-sm"
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
                    className="w-full py-2.5 bg-[#1A1918] hover:bg-[#806B43] text-[#FAF8F5] text-[10px] uppercase tracking-[0.2em] font-light flex items-center justify-center gap-1.5 transition-colors shadow-md"
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
                    <span className="font-mono text-[#5C5852]">{item.spec}</span>
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

            </motion.div>
          ))}
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
