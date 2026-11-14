'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image, { ImageProps } from 'next/image';

export interface LazyImageProps extends Omit<ImageProps, 'onLoad'> {
  rootMargin?: string;
  placeholderColor?: string;
  onImageLoad?: () => void;
  showSpinner?: boolean;
}

export default function LazyImage({
  src,
  alt,
  rootMargin = '500px 0px',
  placeholderColor = '#EDE8DF',
  className = '',
  priority = false,
  showSpinner = false,
  onImageLoad,
  ...props
}: LazyImageProps) {
  const [isInView, setIsInView] = useState(priority);
  const [isLoaded, setIsLoaded] = useState(priority);
  const containerRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  // 1. Viewport Intersection Observer
  useEffect(() => {
    if (priority || isInView) return;

    const el = containerRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') {
      setIsInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { rootMargin }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [priority, isInView, rootMargin]);

  // 2. Check if cached image already completed immediately upon render
  useEffect(() => {
    if (isInView && imgRef.current?.complete) {
      setIsLoaded(true);
    }
  }, [isInView]);

  // 3. Failsafe: Never allow an image to remain stuck in placeholder opacity-0
  useEffect(() => {
    if (isInView && !isLoaded) {
      const failsafeTimer = setTimeout(() => {
        setIsLoaded(true);
      }, 350);
      return () => clearTimeout(failsafeTimer);
    }
  }, [isInView, isLoaded]);

  // When src changes (e.g. active color variant change), reset isLoaded if needed
  const [currentSrc, setCurrentSrc] = useState(src);
  if (src !== currentSrc) {
    setCurrentSrc(src);
    setIsLoaded(false);
  }

  const handleLoaded = () => {
    setIsLoaded(true);
    onImageLoad?.();
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full overflow-hidden"
      style={{ backgroundColor: placeholderColor }}
    >
      {/* Luxury Champagne Placeholder Skeleton */}
      <div
        className={`absolute inset-0 z-0 flex items-center justify-center transition-opacity duration-500 pointer-events-none ${
          isLoaded ? 'opacity-0' : 'opacity-100'
        }`}
        style={{ backgroundColor: placeholderColor }}
      >
        {showSpinner && !isLoaded && (
          <div className="w-5 h-5 rounded-full border border-[#D8D2C6]/60 border-t-[#806B43] animate-spin opacity-40" />
        )}
      </div>

      {isInView && (
        <Image
          ref={imgRef}
          src={src}
          alt={alt}
          priority={priority}
          loading={priority ? 'eager' : 'eager'}
          decoding="async"
          className={`transition-opacity duration-500 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          } ${className}`}
          onLoad={handleLoaded}
          onError={handleLoaded}
          {...props}
        />
      )}
    </div>
  );
}
