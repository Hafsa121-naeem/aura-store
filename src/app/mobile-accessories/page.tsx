import React from 'react';
import { getProducts } from '@/lib/services/api';
import CategoryBrowseView from '@/components/products/CategoryBrowseView';
import { MOBILE_SUBCATEGORIES } from '@/lib/data/mobile-products';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export const metadata = {
  title: 'Mobile & Tech Accessories | AURA STORE',
  description: 'Shop phone cases, GaN fast chargers, 3-in-1 wireless charging docks, earbuds, and aluminum stands with Cash on Delivery in Pakistan.',
};

export default async function MobileAccessoriesPage() {
  const products = await getProducts({ categorySlug: 'mobile-accessories' });

  return (
    <CategoryBrowseView
      categoryName="Mobile & Tech Accessories"
      categorySlug="mobile-accessories"
      bannerBadge="Cases, Chargers &amp; Stands"
      bannerHeadline="Mobile &amp; Tech Accessories"
      bannerDescription="Magnetic protective cases, high-power GaN fast chargers, 3-in-1 foldable charging docks, and CNC aluminum stands engineered for modern devices."
      bannerImage="https://images.unsplash.com/photo-1616440347437-b1c73416efc2?w=1200&q=85"
      bannerImageAlt="Mobile &amp; Tech Accessories Showcase"
      bannerFeatureText="MagSafe Compatible &bull; GaN Fast Charge"
      subcategories={MOBILE_SUBCATEGORIES}
      products={products}
    />
  );
}
