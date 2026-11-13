import React from 'react';
import { getProducts } from '@/lib/services/api';
import CategoryBrowseView from '@/components/products/CategoryBrowseView';
import { ELECTRONICS_SUBCATEGORIES } from '@/lib/data/electronics-products';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export const metadata = {
  title: 'Electronics | AURA STORE',
  description: 'Shop headphones, speakers, mechanical keyboards, gaming gadgets, and cameras with nationwide Cash on Delivery in Pakistan.',
};

export default async function ElectronicsPage() {
  const products = await getProducts({ categorySlug: 'electronics-gadgets' });

  return (
    <CategoryBrowseView
      categoryName="Electronics"
      categorySlug="electronics-gadgets"
      bannerBadge="Audio, Keyboards &amp; Cameras"
      bannerHeadline="Electronics"
      bannerDescription="High-fidelity sound, active noise cancellation, mechanical keyboards, gaming mice, portable SSDs, and 4K cameras with warranty across Pakistan."
      bannerImage="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=1200&q=85"
      bannerImageAlt="Electronics Collection"
      bannerFeatureText="Authentic Products &bull; COD Available"
      subcategories={ELECTRONICS_SUBCATEGORIES}
      products={products}
    />
  );
}
