import React from 'react';
import { getProducts } from '@/lib/services/api';
import HeroShowcase from '@/components/home/HeroShowcase';
import BrandMarquee from '@/components/home/BrandMarquee';
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

      {/* 2. Quiet Architectural Assurance Marquee */}
      <BrandMarquee />

      {/* 3. ferm LIVING Signature Feature: Shop The Scene (Interactive Hotspot Rooms) */}
      <ShopTheScene />

      {/* 4. ferm LIVING Asymmetric Catalog: Tall Portrait Feature + Complementary Objects */}
      <AsymmetricObjectGrid products={products} />

      {/* 5. Spaces & Curated Environments Bento Grid */}
      <CategoryBentoGrid />

      {/* 6. Framer-Inspired Interactive 3D Kinetic Tilt & Materiality Pedestal */}
      <Interactive3DShowcase />

      {/* 7. Trending Objects with Minimalist Category Tag Filters */}
      <TrendingSection initialProducts={products} />

      {/* 8. Magazine Editorial Storytelling: Materiality & Craftsmanship Diptych */}
      <BrandStorytelling />

      {/* 9. Verified Customer Dialogue Carousel */}
      <TestimonialsCarousel />

    </div>
  );
}
