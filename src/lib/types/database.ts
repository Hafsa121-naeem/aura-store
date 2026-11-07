export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type UserRole = 'customer' | 'admin';
export type OrderStatus = 'processing' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
export type PaymentStatus = 'pending' | 'paid' | 'failed' | 'refunded';
export type PaymentMethod = 'cash_on_delivery' | 'card' | 'stripe';
export type ProductStatus = 'draft' | 'published' | 'archived';

export interface Profile {
  id: string;
  email: string;
  full_name: string | null;
  avatar_url: string | null;
  phone: string | null;
  role: UserRole;
  created_at: string;
  updated_at: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  image_url: string | null;
  display_order: number;
  created_at: string;
}

export interface ProductImage {
  id: string;
  product_id: string;
  image_url: string;
  alt_text: string | null;
  is_primary: boolean;
  display_order: number;
  color_name?: string | null;
  color_hex?: string | null;
  created_at: string;
}

export interface ProductColorVariant {
  name: string;
  hex: string;
  image_url: string;
  price?: number;
  sale_price?: number | null;
}

export interface Product {
  id: string;
  category_id: string | null;
  subcategory?: string | null;
  subcategory_slug?: string | null;
  name: string;
  slug: string;
  description: string;
  price: number;
  sale_price: number | null;
  stock: number;
  sku: string | null;
  featured: boolean;
  is_new: boolean;
  rating: number;
  review_count: number;
  status: ProductStatus;
  created_at: string;
  updated_at: string;
  // Joined and extended display fields
  category?: Category;
  images?: ProductImage[];
  color_variants?: ProductColorVariant[];
  warranty?: string | null;
  packaging?: string | null;
  shipping_info?: string | null;
  specs?: Record<string, string> | null;
}

export interface CartItem {
  id: string;
  cart_id: string;
  product_id: string;
  quantity: number;
  selected_color?: string | null;
  selected_image?: string | null;
  created_at: string;
  product?: Product;
}

export interface Cart {
  id: string;
  user_id: string | null;
  session_id: string | null;
  created_at: string;
  updated_at: string;
  items?: CartItem[];
}

export interface Address {
  id: string;
  user_id: string;
  full_name: string;
  phone: string;
  street_address: string;
  city: string;
  state: string;
  postal_code: string;
  country: string;
  is_default: boolean;
  created_at: string;
}

export interface ShippingAddressInput {
  full_name: string;
  phone: string;
  street_address: string;
  city: string;
  state: string;
  postal_code: string;
  country: string;
}

export interface OrderItem {
  id: string;
  order_id: string;
  product_id: string | null;
  product_name: string;
  product_price: number;
  product_image: string | null;
  quantity: number;
  total_price: number;
  selected_color?: string | null;
  created_at: string;
}

export interface Order {
  id: string;
  order_number: string;
  user_id: string | null;
  customer_email: string;
  customer_name: string;
  customer_phone: string | null;
  shipping_address: ShippingAddressInput;
  subtotal: number;
  shipping_fee: number;
  tax: number;
  total: number;
  payment_method: PaymentMethod;
  payment_status: PaymentStatus;
  order_status: OrderStatus;
  notes: string | null;
  created_at: string;
  updated_at: string;
  items?: OrderItem[];
}

export interface Review {
  id: string;
  product_id: string;
  user_id: string | null;
  user_name: string;
  rating: number;
  title: string | null;
  comment: string;
  created_at: string;
}
