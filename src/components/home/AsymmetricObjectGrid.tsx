'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Product } from '@/lib/types/database';
import ProductCard from '@/components/products/ProductCard';
import { formatPrice } from '@/lib/utils';
import { ArrowRight, ShoppingBag } from 'lucide-react';
import { useCart } from '@/context/CartContext';

interface AsymmetricObjectGridProps {
  products: Product[];
}

export default function AsymmetricObjectGrid({ products }: AsymmetricObjectGridProps) {
  const { addItem, setIsCartOpen } = useCart();
  
  // Choose flagship item for tall portrait card
  const flagship = products[1] || products[0];
  const gridItems = products.slice(2, 6);

  const handleFlagshipAdd = () => {
    if (!flagship) return;
    addItem(flagship, 1);
    setIsCartOpen(true);
  };

  return (
    <section className="py-20 sm:py-28 bg-[#FAF8F5] hairline-b">
      <div className="max-w-[1540px] mx-auto px-6 sm:px-10">
        
        {/* Editorial Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between pb-8 sm:pb-12 hairline-b gap-4">
          <div className="space-y-2">
            <span className="text-[11px] uppercase tracking-[0.28em] font-light text-[#8C867D] block">
              Curated Catalog &bull; Section 02
            </span>
            <h2 className="text-3xl sm:text-5xl font-editorial font-light text-[#1A1918] leading-[1.08]">
              A life of contrasts: <br />
              <span className="italic font-normal text-[#806B43]">Quiet luxury &bull; Tactile objects</span>
            </h2>
          </div>

          <Link
            href="/products"
            className="text-xs uppercase tracking-[0.24em] font-light text-[#1A1918] hover:text-[#806B43] flex items-center gap-2 transition-colors self-start sm:self-auto underline underline-offset-8"
          >
            <span>Explore all objects</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Asymmetric Editorial Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-10 sm:pt-14 items-stretch">
          
          {/* Left Column: Tall Architectural Portrait Feature */}
          {flagship && (
            <div className="lg:col-span-5 relative flex flex-col justify-between bg-[#EDE8DF] border border-[#D8D2C6] p-8 sm:p-12 overflow-hidden group">
              
              {/* Background Ambient Imagery */}
              <div className="relative aspect-[3/4] sm:aspect-[4/5] w-full overflow-hidden bg-white/40 mb-8 border border-[#D8D2C6]/60">
                <Image
                  src={flagship.images?.[0]?.image_url || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=1000&q=85'}
                  alt={flagship.name}
                  fill
                  sizes="(max-width: 1024px) 100vw, 500px"
                  className="object-cover group-hover:scale-103 transition-transform duration-1000 ease-out"
                  unoptimized
                />
              </div>

              {/* Editorial Copy */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] uppercase tracking-[0.26em] text-[#806B43] font-medium">
                    Editorial Feature &bull; 01
                  </span>
                  <span className="text-[10px] font-mono text-[#8C867D]">
                    {flagship.category_id || 'Timepieces'}
                  </span>
                </div>

                <Link href={`/products/${flagship.slug}`}>
                  <h3 className="text-2xl sm:text-3xl font-editorial font-light text-[#1A1918] hover:text-[#806B43] transition-colors leading-snug">
                    {flagship.name}
                  </h3>
                </Link>

                <p className="text-xs text-[#5C5852] font-light leading-relaxed line-clamp-3">
                  {flagship.description || 'Shaped by timeless Nordic principles of proportion and material honesty. Delivered with official warranty.'}
                </p>

                <div className="pt-4 flex items-baseline justify-between hairline-t">
                  <span className="text-lg font-light text-[#1A1918]">
                    {formatPrice(flagship.sale_price || flagship.price)}
                  </span>

                  <button
                    type="button"
                    onClick={handleFlagshipAdd}
                    className="text-xs uppercase tracking-[0.22em] font-medium text-[#1A1918] hover:text-[#806B43] flex items-center gap-1.5 transition-colors"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>Acquire Object &rarr;</span>
                  </button>
                </div>
              </div>

            </div>
          )}

          {/* Right Column: 2x2 Grid of Curated Complementary Objects */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {gridItems.map((prod) => (
              <ProductCard key={prod.id} product={prod} />
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
