'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { ProductImage } from '@/lib/types/database';

interface ProductGalleryProps {
  images?: ProductImage[];
  productName: string;
}

export default function ProductGallery({ images = [], productName }: ProductGalleryProps) {
  const defaultImage =
    images[0]?.image_url ||
    'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80';

  const [activeImage, setActiveImage] = useState<string>(defaultImage);

  return (
    <div className="flex flex-col-reverse sm:flex-row gap-4 items-start w-full">
      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex sm:flex-col gap-3 overflow-x-auto pb-2 sm:pb-0 scrollbar-none flex-shrink-0 w-full sm:w-auto">
          {images.map((img, index) => {
            const isSelected = activeImage === img.image_url;
            return (
              <button
                key={img.id || index}
                type="button"
                onClick={() => setActiveImage(img.image_url)}
                className={`relative w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden bg-slate-50 border-2 transition-all flex-shrink-0 ${
                  isSelected
                    ? 'border-indigo-600 ring-2 ring-indigo-600/20'
                    : 'border-slate-200 hover:border-slate-300 opacity-80 hover:opacity-100'
                }`}
              >
                <Image
                  src={img.image_url}
                  alt={img.alt_text || `${productName} preview ${index + 1}`}
                  fill
                  loading="lazy"
                  sizes="80px"
                  className="object-cover"
                />
              </button>
            );
          })}
        </div>
      )}

      {/* Main Image Display */}
      <div className="relative w-full aspect-square max-h-[500px] rounded-2xl overflow-hidden bg-slate-50 border border-slate-200 shadow-sm flex items-center justify-center p-4">
        <div className="relative w-full h-full">
          <Image
            src={activeImage}
            alt={productName}
            fill
            priority
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover rounded-xl transition-opacity duration-300"
          />
        </div>
      </div>
    </div>
  );
}
