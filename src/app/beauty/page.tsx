import React from 'react';
import { getProducts } from '@/lib/services/api';
import CategoryBrowseView from '@/components/products/CategoryBrowseView';
import { BEAUTY_SUBCATEGORIES } from '@/lib/data/beauty-products';

export const metadata = {
  title: 'Beauty & Skincare | AURA STORE',
  description: 'Shop vitamin C serums, moisture gels, matte lip tints, body care, hair masks, and perfumes with Cash on Delivery in Pakistan.',
};

export default async function BeautyPage() {
  const products = await getProducts({ categorySlug: 'beauty-skincare' });

  return (
    <CategoryBrowseView
      categoryName="Beauty & Skincare"
      categorySlug="beauty-skincare"
      bannerBadge="Skincare, Makeup &amp; Fragrance"
      bannerHeadline="Beauty &amp; Skincare"
      bannerDescription="Botanical actives, Vitamin C serums, lip tints, hair care treatments, facial sculpting rollers, and perfumes for daily care."
      bannerImage="https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?w=1200&q=85"
      bannerImageAlt="Beauty &amp; Skincare Collection"
      bannerFeatureText="Authentic Formulations &bull; COD Available"
      subcategories={BEAUTY_SUBCATEGORIES}
      products={products}
    />
  );
}
