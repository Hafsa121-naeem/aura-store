import React from 'react';
import { getProducts } from '@/lib/services/api';
import CategoryBrowseView from '@/components/products/CategoryBrowseView';
import { HOME_SUBCATEGORIES } from '@/lib/data/home-products';

export const metadata = {
  title: 'Home & Living | AURA STORE',
  description: 'Shop contemporary vases, ambient table lamps, linen bedding sets, dinnerware, and organizers with Cash on Delivery in Pakistan.',
};

export default async function HomeLivingPage() {
  const products = await getProducts({ categorySlug: 'home-living' });

  return (
    <CategoryBrowseView
      categoryName="Home & Living"
      categorySlug="home-living"
      bannerBadge="Decor, Lighting & Bedding"
      bannerHeadline="Home & Living"
      bannerDescription="Hand-crafted stoneware vases, ambient cordless touch lamps, French linen duvet sets, ceramic dinnerware, and organizers for modern living spaces."
      bannerImage="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=1200&q=85"
      bannerImageAlt="Home & Living Collection"
      bannerFeatureText="Ceramic Stoneware &bull; Cordless LED"
      subcategories={HOME_SUBCATEGORIES}
      products={products}
    />
  );
}
