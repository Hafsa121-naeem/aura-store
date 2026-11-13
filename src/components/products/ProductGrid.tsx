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
      <div className="py-16 text-center bg-white rounded-2xl border border-slate-200 p-8">
        <div className="w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-400 mx-auto mb-4">
          <PackageOpen className="w-8 h-8" />
        </div>
        <h3 className="text-base font-bold text-slate-800">No Products Available</h3>
        <p className="text-sm text-slate-500 mt-1 max-w-sm mx-auto">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {visibleProducts.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
