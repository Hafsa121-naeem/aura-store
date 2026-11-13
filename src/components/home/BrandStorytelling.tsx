'use client';

import React from 'react';
import Image from 'next/image';
import LazyImage from '@/components/ui/LazyImage';
import Link from 'next/link';
import { ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';

export default function BrandStorytelling() {
  return (
    <section id="stories" className="py-24 sm:py-32 bg-[#F5F2EB] hairline-b">
      <div className="max-w-[1540px] mx-auto px-6 sm:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: ferm LIVING Magazine Editorial Story */}
          <div className="lg:col-span-6 space-y-8 pt-2">
            <div className="space-y-3">
              <span className="text-[11px] uppercase tracking-[0.28em] font-medium text-[#8C867D] block">
                Brand Heritage &bull; Sourced with Intention
              </span>
              <h2 className="text-3xl sm:text-5xl font-editorial font-light text-[#1A1918] leading-[1.18] pt-1">
                A life of contrasts: <br />
                <span className="italic font-normal text-[#806B43]">Raw materials, refined engineering</span>
              </h2>
            </div>

            <p className="text-sm sm:text-base text-[#1A1918]/85 font-normal leading-relaxed">
              AURA was created on a simple promise: the objects you touch every day should bring calm, beauty, and joy to your life. We curate timeless pieces—from crystal-clear acoustics and pure titanium to supple handcrafted leather—designed to feel wonderful in your hands and bring enduring harmony to your home.
            </p>

            {/* 3 Brand Pillars */}
            <div className="space-y-4 pt-2">
              {[
                {
                  number: '01',
                  title: 'Authentic Craft & Honest Materials',
                  desc: 'Grade-5 titanium, high-definition sound drivers, and pure natural textures—sourced directly from master makers with full 12-month official warranties.',
                },
                {
                  number: '02',
                  title: 'Doorstep Cash on Delivery Nationwide',
                  desc: 'Shop with effortless peace of mind. Every parcel arrives in tamper-evident sealed luxury packaging with complete doorstep inspection before you pay.',
                },
                {
                  number: '03',
                  title: '7-Day Worry-Free Home Trial',
                  desc: 'Experience our pieces in the comfort of your own living space. If anything feels less than perfect, enjoy a quick, courteous replacement.',
                },
              ].map((p) => (
                <div
                  key={p.number}
                  className="p-5 sm:p-6 bg-white/85 border border-[#D5CEC2] flex items-start gap-4 transition-all hover:border-[#1A1918] shadow-2xs"
                >
                  <span className="font-editorial text-xl text-[#806B43] font-medium leading-none mt-0.5">
                    {p.number}
                  </span>
                  <div className="space-y-1">
                    <h4 className="text-xs sm:text-sm font-semibold uppercase tracking-[0.14em] text-[#1A1918]">
                      {p.title}
                    </h4>
                    <p className="text-xs sm:text-sm text-[#3D3A35] font-normal leading-relaxed">
                      {p.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-2">
              <Link
                href="/products"
                className="text-xs uppercase tracking-[0.24em] font-medium text-[#1A1918] hover:text-[#806B43] transition-colors underline underline-offset-8"
              >
                Read our design manifesto &rarr;
              </Link>
            </div>
          </div>

          {/* Right Column: Visually Balanced Double Photographic Diptych */}
          <div className="lg:col-span-6 grid grid-cols-2 gap-5 sm:gap-6 items-start self-center">
            <div className="group relative aspect-[4/5] w-full bg-[#EDE8DF] border border-[#D8D2C6] hover:border-[#1A1918] overflow-hidden shadow-md transition-colors duration-500">
              <LazyImage
                src="https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800&q=85"
                alt="Full-Grain Leather Detail"
                fill
                rootMargin="150px 0px"
                placeholderColor="#EDE8DF"
                showSpinner={true}
                sizes="(max-width: 1024px) 50vw, 400px"
                className="object-cover object-center group-hover:scale-104 transition-transform duration-700 ease-out"
              />
              <div className="absolute bottom-3 left-3 bg-[#FAF8F5]/95 backdrop-blur-sm px-3 py-1 border border-[#D8D2C6] text-[10px] font-mono uppercase tracking-wider text-[#1A1918] font-medium shadow-2xs">
                Full-Grain Leather
              </div>
            </div>

            <div className="group relative aspect-[4/5] w-full bg-[#EDE8DF] border border-[#D8D2C6] hover:border-[#1A1918] overflow-hidden shadow-md transition-colors duration-500">
              <LazyImage
                src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&q=85"
                alt="Mindful Interior Space"
                fill
                rootMargin="150px 0px"
                placeholderColor="#EDE8DF"
                showSpinner={true}
                sizes="(max-width: 1024px) 50vw, 400px"
                className="object-cover object-center group-hover:scale-104 transition-transform duration-700 ease-out"
              />
              <div className="absolute bottom-3 left-3 bg-[#FAF8F5]/95 backdrop-blur-sm px-3 py-1 border border-[#D8D2C6] text-[10px] font-mono uppercase tracking-wider text-[#1A1918] font-medium shadow-2xs">
                Interior Harmony
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
