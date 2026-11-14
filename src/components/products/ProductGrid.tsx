import React from 'react';
import { Product } from '@/lib/types/database';
import ProductCard from './ProductCard';
import { PackageOpen } from 'lucide-react';

interface ProductGridProps {
  products: Product[];
  emptyMessage?: string;
}

export default function ProductGrid({
  products,
  emptyMessage = 'No products found matching your criteria.',
}: ProductGridProps) {
  // Public Storefront Filter: strictly only show published products
  const visibleProducts = products.filter(
    (p) => (p.status || 'published') === 'published'
  );

  if (visibleProducts.length === 0) {
    return (
      <div className="py-20 text-center bg-[#FAF8F5] border border-[#D8D2C6] p-10">
        <div className="w-16 h-16 bg-[#EDE8DF] border border-[#D8D2C6] flex items-center justify-center text-[#806B43] mx-auto mb-4">
          <PackageOpen className="w-8 h-8 stroke-[1.25]" />
        </div>
        <h3 className="font-editorial text-2xl font-light text-[#1A1918]">No Products Available</h3>
        <p className="text-xs text-[#5C5852] font-light mt-1.5 max-w-sm mx-auto leading-relaxed">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6 xl:gap-8 items-stretch">
      {visibleProducts.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
