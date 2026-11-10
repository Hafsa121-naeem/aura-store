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
      date: 'Verified Buyer &bull; 3 days ago',
      comment:
        'Ordered via Cash on Delivery in Lahore. Package arrived in sealed retail packaging with authenticity certificate in 48 hours. Excellent leather build quality, exactly as shown in photographs. Will definitely be ordering from AURA STORE again!',
    },
    {
      id: 2,
      name: 'Hamza Farooq',
      location: 'DHA Phase 6, Karachi',
      product: 'Horizon Pro ANC Hybrid Headphones',
      rating: 5,
      date: 'Verified Buyer &bull; 1 week ago',
      comment:
        'Solid premium feel and flawless acoustics. The 42dB active cancellation is indistinguishable from flagship $350 international headphones. Packaging was immaculate with protective bubble wrap. 100% recommended for authentic gear in Pakistan.',
    },
    {
      id: 3,
      name: 'Dr. Bilal Sheikh',
      location: 'F-7/2, Islamabad',
      product: 'Apex Ultra Titanium Smartwatch',
      rating: 5,
      date: 'Verified Buyer &bull; 2 weeks ago',
      comment:
        'Super fast express dispatch to Islamabad. The sapphire AMOLED display is razor sharp even under direct sunlight, and the titanium casing has zero blemishes. Courier allowed doorstep inspection prior to COD payment.',
    },
    {
      id: 4,
      name: 'Ayesha Tariq',
      location: 'Bahria Town, Rawalpindi',
      product: 'Radiance Peptide Firming Serum',
      rating: 5,
      date: 'Verified Buyer &bull; 3 weeks ago',
      comment:
        'Authentic skincare with genuine batch codes. Noticed visible texture improvement in 10 days. The glass dropper bottle arrived intact with safety seal. Outstanding customer care!',
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
    <section className="py-20 sm:py-24 bg-white border-t border-slate-100">
      <div className="max-w-[1480px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200/80 text-emerald-800 text-[10px] uppercase tracking-[0.24em] font-bold">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>100% Verified Buyer Experiences</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light font-serif text-slate-950 tracking-tight">
              Words From Our Patrons
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 max-w-lg font-normal">
              Read real verified experiences from discerning buyers across Lahore, Karachi, Islamabad and nationwide.
            </p>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={prev}
              className="w-11 h-11 rounded-full border border-slate-200 bg-white hover:bg-slate-100 text-slate-900 flex items-center justify-center transition-all shadow-2xs active:scale-95"
              aria-label="Previous Testimonial"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={next}
              className="w-11 h-11 rounded-full border border-slate-200 bg-white hover:bg-slate-100 text-slate-900 flex items-center justify-center transition-all shadow-2xs active:scale-95"
              aria-label="Next Testimonial"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Testimonials Grid (Desktop 2-Cards, Mobile 1-Card) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[reviews[currentIndex], reviews[(currentIndex + 1) % reviews.length]].map((rev) => (
            <motion.div
              key={rev.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="p-8 rounded-3xl bg-[#FAF7F2] border border-amber-900/10 shadow-sm flex flex-col justify-between space-y-6 relative overflow-hidden"
            >
              <Quote className="absolute top-6 right-6 w-12 h-12 text-[#b48a4c]/15 pointer-events-none" />

              <div className="space-y-4">
                {/* Rating & Badge */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-amber-500">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>

                  <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-100 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                    Verified COD Order
                  </span>
                </div>

                {/* Comment */}
                <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-normal italic">
                  &ldquo;{rev.comment}&rdquo;
                </p>
              </div>

              {/* Author Details */}
              <div className="pt-4 border-t border-amber-900/10 flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-slate-950">{rev.name}</h4>
                  <p className="text-[11px] text-[#8c6b2d] font-semibold">{rev.location}</p>
                </div>
                <div className="text-right">
                  <span className="text-[11px] font-bold text-slate-800 block">{rev.product}</span>
                  <span className="text-[10px] text-slate-400" dangerouslySetInnerHTML={{ __html: rev.date }} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
