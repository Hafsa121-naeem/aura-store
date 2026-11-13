import React from 'react';
import { notFound } from 'next/navigation';
import { getProductBySlug, getProductReviews, getRelatedProducts } from '@/lib/services/api';
import ProductDetailView from '@/components/products/ProductDetailView';

interface ProductDetailPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product || product.status !== 'published') {
    notFound();
  }

  const [reviews, relatedProducts] = await Promise.all([
    getProductReviews(product.id),
    getRelatedProducts(product.category_id, product.id, 4),
  ]);

  return (
    <ProductDetailView
      product={product}
      reviews={reviews}
      relatedProducts={relatedProducts}
    />
  );
}
