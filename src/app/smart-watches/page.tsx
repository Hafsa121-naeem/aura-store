import React from 'react';
import { getProducts } from '@/lib/services/api';
import CategoryBrowseView from '@/components/products/CategoryBrowseView';
import { SMARTWATCH_SUBCATEGORIES } from '@/lib/data/smartwatch-products';

export const metadata = {
  title: 'Smart Watches | AURA STORE',
  description: 'Shop AMOLED smartwatches, curved sapphire displays, ECG tracking, Milanese metal bands, and fitness watches with nationwide Cash on Delivery in Pakistan.',
};

export default async function SmartWatchesPage() {
  const products = await getProducts({ categorySlug: 'smart-watches' });

  return (
    <CategoryBrowseView
      categoryName="Smart Watches"
      categorySlug="smart-watches"
      bannerBadge="AMOLED &amp; Round-Dial"
      bannerHeadline="Smart Watches"
      bannerDescription="Biometric health metrics, curved AMOLED sapphire displays, ECG tracking, and water-resistant cases with quick-release metal and leather straps."
      bannerImage="https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=1200&q=85"
      bannerImageAlt="Smart Watches Showcase"
      bannerFeatureText="Titanium Case &bull; Sapphire Crystal"
      subcategories={SMARTWATCH_SUBCATEGORIES}
      products={products}
    />
  );
}
