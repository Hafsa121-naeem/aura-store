import React from 'react';
import { getProducts } from '@/lib/services/api';
import CategoryBrowseView from '@/components/products/CategoryBrowseView';
import { FASHION_SUBCATEGORIES } from '@/lib/data/fashion-products';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export const metadata = {
  title: 'Fashion & Accessories | AURA STORE',
  description: 'Explore handbags, jewellery, polarized sunglasses, footwear, and accessories with Cash on Delivery in Pakistan.',
};

export default async function FashionPage() {
  const products = await getProducts({ categorySlug: 'fashion-accessories' });

  return (
    <CategoryBrowseView
      categoryName="Fashion & Accessories"
      categorySlug="fashion-accessories"
      bannerBadge="Bags, Jewellery &amp; Footwear"
      bannerHeadline="Fashion &amp; Accessories"
      bannerDescription="Handbags, 18K gold-plated jewellery, polarized acetate sunglasses, pure mulberry silk scarves, and leather footwear curated for modern style."
      bannerImage="https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=1200&q=85"
      bannerImageAlt="Fashion &amp; Accessories Showcase"
      bannerFeatureText="Genuine Leather &bull; 18K Gold Plated"
      subcategories={FASHION_SUBCATEGORIES}
      products={products}
    />
  );
}
