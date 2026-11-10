import React from 'react';
import { getProducts, getCategories } from '@/lib/services/api';
import HeroShowcase from '@/components/home/HeroShowcase';
import BrandMarquee from '@/components/home/BrandMarquee';
import CategoryBentoGrid from '@/components/home/CategoryBentoGrid';
import TrendingSection from '@/components/home/TrendingSection';
import Interactive3DShowcase from '@/components/home/Interactive3DShowcase';
import FeaturedSpotlight from '@/components/home/FeaturedSpotlight';
import FlashSaleBanner from '@/components/home/FlashSaleBanner';
import BrandStorytelling from '@/components/home/BrandStorytelling';
import NewArrivalsSection from '@/components/home/NewArrivalsSection';
import BestSellersSection from '@/components/home/BestSellersSection';
import TestimonialsCarousel from '@/components/home/TestimonialsCarousel';
import VipNewsletter from '@/components/home/VipNewsletter';
import TrustPillars from '@/components/home/TrustPillars';

export default async function HomePage() {
  // Fetch real product catalog from Supabase / API service
  const products = await getProducts({ limit: 40 });

  return (
    <div className="bg-white min-h-screen flex flex-col justify-between overflow-x-hidden selection:bg-[#e2c799] selection:text-slate-900">
      
      {/* 1. Cinematic Light Luxury Hero Showcase */}
      <HeroShowcase />

      {/* 2. Infinite Continuous Brand Assurance Marquee */}
      <BrandMarquee />

      {/* 3. Curated 6-Department Category Bento Grid */}
      <CategoryBentoGrid />

      {/* 4. Trending Products with Interactive Category Filter Tabs */}
      <TrendingSection initialProducts={products} />

      {/* 5. Interactive 3D / Precision Inspection Showcase */}
      <Interactive3DShowcase />

      {/* 6. Featured Spotlight: Craftsmanship & Engineering */}
      <FeaturedSpotlight />

      {/* 7. Flash Sale Countdown Banner with Live Scarcity Bar */}
      <FlashSaleBanner />

      {/* 8. Editorial Brand Storytelling: The Art of Curated Luxury */}
      <BrandStorytelling />

      {/* 9. New Seasonal Arrivals Grid */}
      <NewArrivalsSection products={products} />

      {/* 10. Best Sellers Leaderboard */}
      <BestSellersSection products={products} />

      {/* 11. Authentic Pakistani Verified Customer Testimonials Carousel */}
      <TestimonialsCarousel />

      {/* 12. VIP Concierge Club & Newsletter with Coupon Unlock */}
      <VipNewsletter />

      {/* 13. Minimalist Luxury Trust Pillars Strip */}
      <TrustPillars />

    </div>
  );
}
