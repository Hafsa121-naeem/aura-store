import React from 'react';
import HeroShowcase from '@/components/home/HeroShowcase';
import AnimatedPhotoStream from '@/components/home/AnimatedPhotoStream';
import EditorialBannerSection from '@/components/home/EditorialBannerSection';
import BrandStorytelling from '@/components/home/BrandStorytelling';

export default function HomePage() {
  return (
    <div className="bg-[#F5F2EB] text-[#1A1918] min-h-screen flex flex-col justify-between overflow-x-hidden selection:bg-[#E0D8CB] selection:text-[#1A1918]">
      
      {/* 1. Hero: Cinematic Luxury Entrance with Animated Typography & Subtle Parallax */}
      <HeroShowcase />

      {/* 2. The ONE Curated 3D Floating Exhibition: 5 Flagship Objects in Continuous 3D Float (Zero Repetition) */}
      <AnimatedPhotoStream />

      {/* 3. Objects / Editorial Collection: Single Atmospheric Lifestyle Photograph & Narrative */}
      <EditorialBannerSection />

      {/* 4. Brand Experience: Mindful Materiality, Nationwide COD Protocol & Craftsmanship Manifesto */}
      <BrandStorytelling />

    </div>
  );
}
