import React from 'react';
import HeroShowcase from '@/components/home/HeroShowcase';
import AnimatedPhotoStream from '@/components/home/AnimatedPhotoStream';
import CategoryBentoGrid from '@/components/home/CategoryBentoGrid';
import BrandMarquee from '@/components/home/BrandMarquee';
import EditorialBannerSection from '@/components/home/EditorialBannerSection';
import BrandStorytelling from '@/components/home/BrandStorytelling';

export default function HomePage() {
  return (
    <div className="bg-[#F5F2EB] text-[#1A1918] min-h-screen flex flex-col justify-between overflow-x-hidden selection:bg-[#E0D8CB] selection:text-[#1A1918]">
      
      {/* 1. Hero: Premium Brand Introduction, Architectural Headline & Clear CTAs */}
      <HeroShowcase />

      {/* 2. The ONE Refined Animated Visual Composition: 1 Focal Anchor + 4 Supporting Objects in Slow Subtle Float */}
      <AnimatedPhotoStream />

      {/* 3. Shop by Category: Compact, Sculptural 6-Category Architectural Directory */}
      <CategoryBentoGrid />

      {/* 4. Featured Products: Exactly 4 Carefully Selected Luxury Objects in a Calm, Static Grid (No Excessive Motion) */}
      <BrandMarquee />

      {/* 5. Objects / Editorial Collection: Single Atmospheric Architectural Lifestyle Banner with Narrative */}
      <EditorialBannerSection />

      {/* 6. Brand Experience: Philosophy, Materiality, Nationwide Protocol & Craftsmanship Manifesto */}
      <BrandStorytelling />

    </div>
  );
}
