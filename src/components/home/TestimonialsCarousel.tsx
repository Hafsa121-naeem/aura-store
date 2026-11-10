'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Star, CheckCircle2, ChevronLeft, ChevronRight, Quote } from 'lucide-react';

export default function TestimonialsCarousel() {
  const reviews = [
    {
      id: 1,
      name: 'Zainab Malik',
      location: 'Gulberg III, Lahore',
      product: 'Verona Italian Kelly Handbag',
      rating: 5,
      date: 'Verified Client &bull; 3 days ago',
      comment:
        'Ordered via Cash on Delivery in Lahore. Package arrived in sealed packaging with authenticity certificate in 48 hours. Exceptional leather grain and solid gold-plated hardware, exactly as photographed. Will continue to curate my space through AURA STORE.',
    },
    {
      id: 2,
      name: 'Hamza Farooq',
      location: 'DHA Phase 6, Karachi',
      product: 'Horizon Pro ANC Hybrid Headphones',
      rating: 5,
      date: 'Verified Client &bull; 1 week ago',
      comment:
        'Acoustic purity and craftsmanship are extraordinary. The 42dB hybrid active cancellation is on par with $400 international flagship audio. Packaging was immaculate with protective seal. Outstanding benchmark for authentic luxury in Pakistan.',
    },
    {
      id: 3,
      name: 'Dr. Bilal Sheikh',
      location: 'F-7/2, Islamabad',
      product: 'Apex Ultra Titanium Smartwatch',
      rating: 5,
      date: 'Verified Client &bull; 2 weeks ago',
      comment:
        'Express dispatch to Islamabad. The sapphire AMOLED display remains legible under direct noon sunlight, and the titanium milling has zero imperfections. Courier enabled doorstep inspection prior to COD payment.',
    },
    {
      id: 4,
      name: 'Ayesha Tariq',
      location: 'Bahria Town, Rawalpindi',
      product: 'Botanical Multi-Peptide Elixir',
      rating: 5,
      date: 'Verified Client &bull; 3 weeks ago',
      comment:
        'Authentic skincare with genuine batch codes. Noticed visible texture refinement in 10 days. The frosted amber dropper bottle arrived intact with safety seal. Truly quiet luxury customer care.',
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const prev = () => {
    setCurrentIndex((curr) => (curr === 0 ? reviews.length - 1 : curr - 1));
  };

  const next = () => {
    setCurrentIndex((curr) => (curr === reviews.length - 1 ? 0 : curr + 1));
  };

  return (
    <section className="py-20 sm:py-28 bg-[#F5F2EB] hairline-b">
      <div className="max-w-[1540px] mx-auto px-6 sm:px-10">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between pb-8 sm:pb-12 hairline-b gap-6">
          <div className="space-y-3">
            <span className="text-[11px] uppercase tracking-[0.28em] font-light text-[#8C867D] block">
              Client Dialogue &bull; Section 06
            </span>
            <h2 className="text-3xl sm:text-5xl font-editorial font-light text-[#1A1918] leading-[1.08]">
              Words From Our Patrons
            </h2>
            <p className="text-xs sm:text-sm text-[#5C5852] font-light max-w-lg leading-relaxed">
              Read verified experiences from discerning buyers across Lahore, Karachi, Islamabad, and nationwide.
            </p>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={prev}
              className="w-10 h-10 border border-[#D8D2C6] bg-[#FAF8F5] hover:border-[#1A1918] text-[#1A1918] flex items-center justify-center transition-all"
              aria-label="Previous Testimonial"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={next}
              className="w-10 h-10 border border-[#D8D2C6] bg-[#FAF8F5] hover:border-[#1A1918] text-[#1A1918] flex items-center justify-center transition-all"
              aria-label="Next Testimonial"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Testimonials Grid (Desktop 2-Cards, Mobile 1-Card) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-10 sm:pt-14">
          {[reviews[currentIndex], reviews[(currentIndex + 1) % reviews.length]].map((rev) => (
            <motion.div
              key={rev.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="p-8 sm:p-10 bg-[#FAF8F5] border border-[#D8D2C6] flex flex-col justify-between space-y-6 relative"
            >
              <div className="space-y-4">
                {/* Rating & Badge */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-[#9E814D]">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-[#9E814D]" />
                    ))}
                  </div>

                  <span className="text-[10px] uppercase font-mono tracking-wider text-[#806B43] px-2 py-0.5 bg-[#EDE8DF] border border-[#D8D2C6]">
                    Verified Doorstep COD
                  </span>
                </div>

                {/* Comment in Editorial Serif */}
                <p className="font-editorial text-base sm:text-lg text-[#1A1918] leading-relaxed font-light italic">
                  &ldquo;{rev.comment}&rdquo;
                </p>
              </div>

              {/* Author Details */}
              <div className="pt-4 hairline-t flex items-center justify-between">
                <div>
                  <h4 className="text-xs uppercase tracking-[0.18em] font-medium text-[#1A1918]">{rev.name}</h4>
                  <p className="text-[11px] text-[#8C867D] font-light mt-0.5">{rev.location}</p>
                </div>
                <div className="text-right">
                  <span className="text-xs font-editorial text-[#1A1918] block">{rev.product}</span>
                  <span className="text-[10px] text-[#8C867D] font-mono" dangerouslySetInnerHTML={{ __html: rev.date }} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
