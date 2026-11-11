import React from 'react';
import HeroShowcase from '@/components/home/HeroShowcase';
import AnimatedPhotoStream from '@/components/home/AnimatedPhotoStream';
import BrandMarquee from '@/components/home/BrandMarquee';
import ShopTheScene from '@/components/home/ShopTheScene';
import Interactive3DShowcase from '@/components/home/Interactive3DShowcase';
import EditorialBannerSection from '@/components/home/EditorialBannerSection';
import BrandStorytelling from '@/components/home/BrandStorytelling';

export default function HomePage() {
  return (
    <div className="bg-[#F5F2EB] text-[#1A1918] min-h-screen flex flex-col justify-between overflow-x-hidden selection:bg-[#E0D8CB] selection:text-[#1A1918]">
      
      {/* 1. Hero: Cinematic Luxury Entrance with Animated Typography & Subtle Parallax */}
      <HeroShowcase />

      {/* 2. 3D Floating Objects — Interactive Experience: Curated 5 Flagships in Spring Tilt Depth */}
      <AnimatedPhotoStream />

      {/* 3. Featured Collection: Merged Curated Grid of 4 Objects (Zero Redundant Galleries) */}
      <BrandMarquee />

      {/* 4. Shop The Scene: Editorial Lifestyle & Interior Rooms with Interactive Hotspot Popovers */}
      <ShopTheScene />

      {/* 5. Multi-Angle Product Inspection: Architectural Precision & Acoustic Benchmarks */}
      <Interactive3DShowcase />

      {/* 6. Editorial Lifestyle Banner: The Architecture of Daily Rituals */}
      <EditorialBannerSection />

      {/* 7. Brand Experience & Manifesto: Material Honesty, Nationwide COD & Certified Care */}
      <BrandStorytelling />

    </div>
  );
}
