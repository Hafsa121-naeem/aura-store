# AURA Store Pakistan — Premium E-Commerce Platform

A complete, production-ready, database-driven E-Commerce application engineered from scratch for the Pakistani market with **Next.js 16 (App Router)**, **TypeScript**, **Tailwind CSS**, and **Supabase (PostgreSQL, Auth & Storage)**.

---

## 🌟 Architecture & Features

### Pakistani E-Commerce Experience
- **Currency & Pricing**: Full Pakistani Rupee (`PKR` / `Rs.`) pricing across all components, cart calculations, seed data, and admin dashboard.
- **Nationwide Logistics & Delivery**: Free delivery on orders over **Rs. 5,000** (otherwise flat Rs. 250 fee), 2-4 business days express delivery via TCS, Leopards, and Trax Courier.
- **Payment Methods**: Cash on Delivery (COD) as primary payment method, with extensible hooks for JazzCash, EasyPaisa, and Stripe.
- **Contemporary Shopping Categories**:
  1. *Electronics & Gadgets*
  2. *Smart Watches*
  3. *Fashion & Accessories*
  4. *Beauty & Skincare*
  5. *Home & Living*
  6. *Mobile Accessories*
  7. *Luxury Fragrances*

### Frontend Pages
- **Homepage (`/`)**: High-impact editorial hero section, interactive spotlight card, promotional savings banners, 7 curated departments, featured flagships, new arrivals, best sellers, verified Pakistani customer testimonials (Lahore, Karachi, Islamabad), and newsletter voucher subscription.
- **Product Catalog (`/products`)**: Dynamic filtering by category, PKR price ranges (Under Rs. 5k, Rs. 5k-15k, Rs. 15k-30k, Rs. 30k+), keyword search, and responsive sort options.
- **Product Details (`/products/[slug]`)**: Multi-image studio gallery with zoom, finish/variant selectors, quantity steppers, live stock count, Wishlist toggle, instant Add-to-Cart, Buy-Now direct checkout, and verified customer reviews.
- **Cart & Slide-Over Drawer (`/cart`)**: Persistent cart with localStorage synchronization (`aura_pakistan_cart_v2`), free delivery threshold meter, 5% standard GST calculation, and one-click checkout.
- **Checkout (`/checkout`)**: Multi-step checkout with customer contact info, Pakistani cities dropdown (Karachi, Lahore, Islamabad, Faisalabad, Rawalpindi, Multan, etc.), Cash on Delivery selection, and encrypted order placement.
- **Order Confirmation (`/checkout/confirmation`)**: Reference order number, TCS / Leopards courier tracking timeline, and COD instructions.
- **User Authentication (`/auth/login`, `/auth/register`)**: Powered by Supabase Authentication with session management and user roles (`customer` and `admin`).
- **User Portal (`/account`, `/account/orders`)**: Pakistani profile settings, shipping address book, and complete order history with tracking numbers.
- **Admin Dashboard (`/admin`, `/admin/products`, `/admin/orders`, `/admin/categories`)**:
  - **Role-Based Authorization**: Protected by `AdminGuard` verifying user roles before allowing access.
  - **Catalog CRUD**: Add, edit, or archive products with PKR prices, SKUs (`AUR-PK-...`), stock, and categories.
  - **Order Fulfillment**: Track customer orders across Pakistani cities, update courier status (`processing`, `confirmed`, `shipped`, `delivered`, `cancelled`).
  - **Category Management**: Configure catalog departments and banner photography.

---

## 🗄️ Database & Supabase Integration (PostgreSQL)

The database schema is defined in [`src/db/schema.sql`](file:///C:/Users/Mr%20Laptop/.gemini/antigravity/scratch/aura-store/src/db/schema.sql):
1. `profiles`: Extends `auth.users` with `full_name`, `avatar_url`, `phone`, and `role` (`customer` | `admin`). Includes an automatic trigger creating the profile on user sign up.
2. `categories`: Unique slugs, display order, descriptions, and banner images.
3. `products`: Relational category references, prices, sale prices, stock counts, ratings, and statuses.
4. `product_images`: Multi-image support per product with primary flag and display order.
5. `carts` & `cart_items`: User and guest session cart persistence.
6. `orders` & `order_items`: Order tracking with serialized order numbers, tax, shipping, and JSONB shipping addresses.
7. `addresses`: User-saved address books with default flag.
8. `reviews`: Customer reviews and 1-5 star ratings.
9. **Row Level Security (RLS)**: Enforced on all tables. Admins have management permissions; customers can only read published items and access their own orders and profile.
10. **Storage Bucket**: `product-images` bucket configured with public read access and admin-only upload policies.

---

## 🚀 Getting Started

### 1. Set Active Workspace
Open `C:\Users\Mr Laptop\.gemini\antigravity\scratch\aura-store` in your IDE or terminal.

### 2. Configure Environment Variables
Copy `.env.local.example` to `.env.local`:
```bash
cp .env.local.example .env.local
```
Fill in your existing Supabase project credentials:
```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-supabase-service-role-key
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### 3. Run Database Migrations in Supabase
1. Open your Supabase Dashboard -> **SQL Editor**.
2. Run the script in [`src/db/schema.sql`](file:///C:/Users/Mr%20Laptop/.gemini/antigravity/scratch/aura-store/src/db/schema.sql) to create tables, indexes, triggers, and RLS policies.
3. Run the script in [`src/db/seed.sql`](file:///C:/Users/Mr%20Laptop/.gemini/antigravity/scratch/aura-store/src/db/seed.sql) to seed the initial catalog of premium audio gear, mechanical keyboards, and workspace furniture.

### 4. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 5. Build for Production
```bash
npm run build
npm run start
```
