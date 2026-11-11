import React from 'react';
import { getProducts } from '@/lib/services/api';
import HeroShowcase from '@/components/home/HeroShowcase';
import BrandMarquee from '@/components/home/BrandMarquee';
import AnimatedPhotoStream from '@/components/home/AnimatedPhotoStream';
import ShopTheScene from '@/components/home/ShopTheScene';
import AsymmetricObjectGrid from '@/components/home/AsymmetricObjectGrid';
import CategoryBentoGrid from '@/components/home/CategoryBentoGrid';
import Interactive3DShowcase from '@/components/home/Interactive3DShowcase';
import TrendingSection from '@/components/home/TrendingSection';
import BrandStorytelling from '@/components/home/BrandStorytelling';
import TestimonialsCarousel from '@/components/home/TestimonialsCarousel';

export default async function HomePage() {
  // Fetch real product catalog from Supabase / API service
  const products = await getProducts({ limit: 40 });

  return (
    <div className="bg-[#F5F2EB] text-[#1A1918] min-h-screen flex flex-col justify-between overflow-x-hidden selection:bg-[#E0D8CB] selection:text-[#1A1918]">
      
      {/* 1. ferm LIVING Full-Bleed Atmospheric Cinematic Hero & Filter Bar */}
      <HeroShowcase />

      {/* 2. Featured Objects & New Additions Architectural Carousel */}
      <BrandMarquee />

      {/* 3. Bigger Animated Classic Display Photos That Horizontally Move */}
      <AnimatedPhotoStream />

      {/* 4. ferm LIVING Signature Feature: Shop The Scene (Interactive Hotspot Rooms) */}
      <ShopTheScene />

      {/* 5. ferm LIVING Asymmetric Catalog: Tall Portrait Feature + Complementary Objects */}
      <AsymmetricObjectGrid products={products} />

      {/* 6. Spaces & Curated Environments Bento Grid */}
      <CategoryBentoGrid />

      {/* 7. Framer-Inspired Interactive 3D Kinetic Tilt & Materiality Pedestal */}
      <Interactive3DShowcase />

      {/* 8. Trending Objects with Minimalist Category Tag Filters */}
      <TrendingSection initialProducts={products} />

      {/* 9. Magazine Editorial Storytelling: Materiality & Craftsmanship Diptych */}
      <BrandStorytelling />

      {/* 10. Verified Customer Dialogue Carousel */}
      <TestimonialsCarousel />

    </div>
  );
}
