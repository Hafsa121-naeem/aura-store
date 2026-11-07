import { Category, Product, Review } from '@/lib/types/database';
import { ELECTRONICS_PRODUCTS } from './electronics-products';
import { SMARTWATCH_PRODUCTS } from './smartwatch-products';
import { FASHION_PRODUCTS } from './fashion-products';
import { BEAUTY_PRODUCTS } from './beauty-products';
import { HOME_PRODUCTS } from './home-products';
import { MOBILE_PRODUCTS } from './mobile-products';

export const FALLBACK_CATEGORIES: Category[] = [
  {
    id: 'c1-electronics',
    name: 'Electronics & Gadgets',
    slug: 'electronics-gadgets',
    description: 'High-performance ANC headphones, audiophile spatial earbuds, mechanical keyboards, ergonomic mouse, and desk gadgets.',
    image_url: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80',
    display_order: 1,
    created_at: '2026-11-01T00:00:00.000Z',
  },
  {
    id: 'c2-watches',
    name: 'Smart Watches',
    slug: 'smart-watches',
    description: 'Grade-5 titanium smartwatches, curved AMOLED sapphire displays, ECG tracking, and luxury metal straps.',
    image_url: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80',
    display_order: 2,
    created_at: '2026-11-01T00:00:00.000Z',
  },
  {
    id: 'c3-fashion',
    name: 'Fashion & Accessories',
    slug: 'fashion-accessories',
    description: 'Handcrafted Italian leather bags, polarized acetate eyewear, sculptural statement jewelry, and automatic watches.',
    image_url: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&q=80',
    display_order: 3,
    created_at: '2026-11-01T00:00:00.000Z',
  },
  {
    id: 'c4-beauty',
    name: 'Beauty & Skincare',
    slug: 'beauty-skincare',
    description: 'Luminance Vitamin C brightening elixirs, multi-peptide creams, Xiuyan jade sculpting rollers, and French haute perfumery.',
    image_url: 'https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?w=800&q=80',
    display_order: 4,
    created_at: '2026-11-01T00:00:00.000Z',
  },
  {
    id: 'c5-home',
    name: 'Home & Living',
    slug: 'home-living',
    description: 'Nordic sculptural ceramic vases, ambient wireless mushroom lamps, Egyptian cotton bedding, and cold-air aroma diffusers.',
    image_url: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=800&q=80',
    display_order: 5,
    created_at: '2026-11-01T00:00:00.000Z',
  },
  {
    id: 'c6-mobile',
    name: 'Mobile Accessories',
    slug: 'mobile-accessories',
    description: 'Aerospace aramid carbon fiber cases, 100W GaN fast chargers, 3-in-1 foldable MagSafe docks, and titanium stands.',
    image_url: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=800&q=80',
    display_order: 6,
    created_at: '2026-11-01T00:00:00.000Z',
  },
  {
    id: 'c7-fragrances',
    name: 'Luxury Fragrances',
    slug: 'lifestyle-fragrances',
    description: 'French-crafted Royal Oud extracts, velvet sandalwood, and Mediterranean citrus perfumes.',
    image_url: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=800&q=80',
    display_order: 7,
    created_at: '2026-11-01T00:00:00.000Z',
  },
];

export const FALLBACK_PRODUCTS: Product[] = [
  ...ELECTRONICS_PRODUCTS,
  ...SMARTWATCH_PRODUCTS,
  ...FASHION_PRODUCTS,
  ...BEAUTY_PRODUCTS,
  ...HOME_PRODUCTS,
  ...MOBILE_PRODUCTS,
];

export const FALLBACK_REVIEWS: Review[] = [
  {
    id: 'rev-01',
    product_id: 'el-au-01',
    user_id: 'u101',
    rating: 5,
    title: 'Outstanding sound quality and rapid TCS delivery in Lahore',
    comment: 'Ordered via Cash on Delivery to DHA Lahore. Arrived within 48 hours. The noise cancelling blocks fan and traffic noise completely. Highs and bass are crisp.',
    user_name: 'Zainab Malik (Gulberg III, Lahore)',
    created_at: '2026-11-03T11:20:00.000Z',
  },
  {
    id: 'rev-02',
    product_id: 'sw-am-01',
    user_id: 'u102',
    rating: 5,
    title: 'Best AMOLED display under bright sunlight',
    comment: 'The titanium finish looks and feels like a 100k watch. AMOLED screen is super bright in Karachi sunlight. Battery lasts easily 7 days with sleep and heart tracking.',
    user_name: 'Hamza Farooq (DHA Phase 6, Karachi)',
    created_at: '2026-11-02T15:40:00.000Z',
  },
  {
    id: 'rev-03',
    product_id: 'bt-mk-03',
    user_id: 'u103',
    rating: 5,
    title: 'Authentic pure Oud with extraordinary projection',
    comment: 'Got the Royal Oud Noir Extrait delivered to Islamabad. 100% genuine sealed box. The sillage lasts on clothes till the next day. Received compliments at office all day.',
    user_name: 'Daniyal Ahmed (Sector F-7, Islamabad)',
    created_at: '2026-11-03T18:10:00.000Z',
  },
  {
    id: 'rev-04',
    product_id: 'fs-hb-01',
    user_id: 'u104',
    rating: 5,
    title: 'Genuine top-grain leather and solid brass hardware',
    comment: 'The leather smells rich and authentic. Fits my 15-inch laptop, charger, notebook, and iPad easily. Worth every rupee.',
    user_name: 'Bilal Chaudhry (Canal Road, Faisalabad)',
    created_at: '2026-11-04T09:15:00.000Z',
  },
  {
    id: 'rev-05',
    product_id: 'bt-sr-01',
    user_id: 'u105',
    rating: 5,
    title: 'Luminance Vitamin C serum made my skin look dewy and glowing',
    comment: 'Very light silky texture, absorbs instantly without any stickiness. Noticed a visible reduction in pigmentation within a week.',
    user_name: 'Aiman Shah (Cantt, Rawalpindi)',
    created_at: '2026-11-04T14:30:00.000Z',
  },
  {
    id: 'rev-06',
    product_id: 'hm-dc-01',
    user_id: 'u106',
    rating: 5,
    title: 'Elevated my dining table and living room setup completely',
    comment: 'The sculptural fluted ceramic vase is breathtaking in real life. Arrived securely packed in double bubble wrap and hard box.',
    user_name: 'Khurram Javed (University Town, Peshawar)',
    created_at: '2026-11-03T20:00:00.000Z',
  },
  {
    id: 'rev-07',
    product_id: 'mb-wc-01',
    user_id: 'u107',
    rating: 5,
    title: 'All three devices charging together neatly without cable clutter',
    comment: 'Charges iPhone, Apple Watch, and AirPods at the same time on my bedside table. Folds flat so I can take it when travelling.',
    user_name: 'Omer Tariq (Model Town, Multan)',
    created_at: '2026-11-02T19:45:00.000Z',
  },
];

export const fallbackCategories = FALLBACK_CATEGORIES;
export const fallbackProducts = FALLBACK_PRODUCTS;
export const fallbackReviews = FALLBACK_REVIEWS;
