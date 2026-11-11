import React from 'react';
import HeroShowcase from '@/components/home/HeroShowcase';
import BrandMarquee from '@/components/home/BrandMarquee';
import AnimatedPhotoStream from '@/components/home/AnimatedPhotoStream';
import ShopTheScene from '@/components/home/ShopTheScene';
import CategoryBentoGrid from '@/components/home/CategoryBentoGrid';
import Interactive3DShowcase from '@/components/home/Interactive3DShowcase';
import BrandStorytelling from '@/components/home/BrandStorytelling';
import TestimonialsCarousel from '@/components/home/TestimonialsCarousel';

export default function HomePage() {
  return (
    <div className="bg-[#F5F2EB] text-[#1A1918] min-h-screen flex flex-col justify-between overflow-x-hidden selection:bg-[#E0D8CB] selection:text-[#1A1918]">
      
      {/* 1. ferm LIVING Full-Bleed Atmospheric Cinematic Hero with 3D Tilt & Interactive Hotspot Pin */}
      <HeroShowcase />

      {/* 2. Main Featured Objects: Exactly 6 Carefully Selected Luxury Pieces in an Editorial Carousel */}
      <BrandMarquee />

      {/* 3. Mirko Romanelli / Shakuro: Sophisticated Multi-Layered 3D Kinetic Animated Gallery */}
      <AnimatedPhotoStream />

      {/* 4. ferm LIVING Signature Feature: Shop The Scene (Copenhagen Study Interactive Hotspot Diptych) */}
      <ShopTheScene />

      {/* 5. Spaces & Curated Environments: Compact 6-Category Architectural Gallery */}
      <CategoryBentoGrid />

      {/* 6. Framer-Inspired Interactive 3D Kinetic Tilt & Materiality Pedestal */}
      <Interactive3DShowcase />

      {/* 7. Magazine Editorial Storytelling: Materiality & Craftsmanship Diptych */}
      <BrandStorytelling />

      {/* 8. Verified Discerning Client Dialogue Carousel */}
      <TestimonialsCarousel />

    </div>
  );
}
