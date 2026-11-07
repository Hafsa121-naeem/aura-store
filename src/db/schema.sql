-- ==============================================================================
-- AURA E-COMMERCE DATABASE SCHEMA (PostgreSQL / Supabase)
-- ==============================================================================

-- Enable UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ------------------------------------------------------------------------------
-- 1. PROFILES TABLE
-- Extends Supabase auth.users with public profile information and user role
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT NOT NULL,
    full_name TEXT,
    avatar_url TEXT,
    phone TEXT,
    role TEXT NOT NULL DEFAULT 'customer' CHECK (role IN ('customer', 'admin')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc', now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc', now())
);

CREATE INDEX IF NOT EXISTS idx_profiles_role ON public.profiles(role);
CREATE INDEX IF NOT EXISTS idx_profiles_email ON public.profiles(email);

-- ------------------------------------------------------------------------------
-- 2. CATEGORIES TABLE
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.categories (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    name TEXT NOT NULL UNIQUE,
    slug TEXT NOT NULL UNIQUE,
    description TEXT,
    image_url TEXT,
    display_order INT DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc', now())
);

CREATE INDEX IF NOT EXISTS idx_categories_slug ON public.categories(slug);

-- ------------------------------------------------------------------------------
-- 3. PRODUCTS TABLE
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.products (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    category_id TEXT REFERENCES public.categories(id) ON DELETE SET NULL,
    subcategory TEXT,
    subcategory_slug TEXT,
    name TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    description TEXT NOT NULL,
    price NUMERIC(10,2) NOT NULL CHECK (price >= 0),
    sale_price NUMERIC(10,2) CHECK (sale_price IS NULL OR (sale_price >= 0 AND sale_price < price)),
    stock INT NOT NULL DEFAULT 0 CHECK (stock >= 0),
    sku TEXT UNIQUE,
    featured BOOLEAN NOT NULL DEFAULT false,
    is_new BOOLEAN NOT NULL DEFAULT false,
    rating NUMERIC(2,1) DEFAULT 5.0 CHECK (rating >= 0 AND rating <= 5.0),
    review_count INT NOT NULL DEFAULT 0,
    status TEXT NOT NULL DEFAULT 'published' CHECK (status IN ('draft', 'published', 'archived')),
    warranty TEXT,
    packaging TEXT,
    shipping_info TEXT,
    specs JSONB DEFAULT '{}'::jsonb,
    color_variants JSONB DEFAULT '[]'::jsonb,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc', now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc', now())
);

CREATE INDEX IF NOT EXISTS idx_products_category ON public.products(category_id);
CREATE INDEX IF NOT EXISTS idx_products_slug ON public.products(slug);
CREATE INDEX IF NOT EXISTS idx_products_featured ON public.products(featured);
CREATE INDEX IF NOT EXISTS idx_products_status ON public.products(status);
CREATE INDEX IF NOT EXISTS idx_products_price ON public.products(price);

-- ------------------------------------------------------------------------------
-- 4. PRODUCT IMAGES TABLE
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.product_images (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    product_id TEXT NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
    image_url TEXT NOT NULL,
    alt_text TEXT,
    is_primary BOOLEAN NOT NULL DEFAULT false,
    display_order INT DEFAULT 0,
    color_name TEXT,
    color_hex TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc', now())
);

CREATE INDEX IF NOT EXISTS idx_product_images_product ON public.product_images(product_id);

-- ------------------------------------------------------------------------------
-- 5. CARTS TABLE
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.carts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    session_id TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc', now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc', now()),
    CONSTRAINT uq_user_or_session UNIQUE (user_id, session_id)
);

CREATE INDEX IF NOT EXISTS idx_carts_user ON public.carts(user_id);
CREATE INDEX IF NOT EXISTS idx_carts_session ON public.carts(session_id);

-- ------------------------------------------------------------------------------
-- 6. CART ITEMS TABLE
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.cart_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    cart_id UUID NOT NULL REFERENCES public.carts(id) ON DELETE CASCADE,
    product_id TEXT NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
    quantity INT NOT NULL CHECK (quantity > 0),
    selected_color TEXT,
    selected_image TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc', now()),
    CONSTRAINT uq_cart_product_color UNIQUE (cart_id, product_id, selected_color)
);

CREATE INDEX IF NOT EXISTS idx_cart_items_cart ON public.cart_items(cart_id);

-- ------------------------------------------------------------------------------
-- 7. ADDRESSES TABLE
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.addresses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    full_name TEXT NOT NULL,
    phone TEXT NOT NULL,
    street_address TEXT NOT NULL,
    apartment TEXT,
    city TEXT NOT NULL,
    state_province TEXT NOT NULL,
    postal_code TEXT NOT NULL,
    country TEXT NOT NULL DEFAULT 'Pakistan',
    is_default BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc', now())
);

CREATE INDEX IF NOT EXISTS idx_addresses_user ON public.addresses(user_id);

-- ------------------------------------------------------------------------------
-- 8. ORDERS TABLE
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.orders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_number TEXT NOT NULL UNIQUE,
    user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    guest_email TEXT,
    status TEXT NOT NULL DEFAULT 'processing' CHECK (status IN ('processing', 'confirmed', 'shipped', 'delivered', 'cancelled')),
    subtotal NUMERIC(10,2) NOT NULL CHECK (subtotal >= 0),
    tax NUMERIC(10,2) NOT NULL DEFAULT 0 CHECK (tax >= 0),
    shipping_cost NUMERIC(10,2) NOT NULL DEFAULT 0 CHECK (shipping_cost >= 0),
    total NUMERIC(10,2) NOT NULL CHECK (total >= 0),
    payment_method TEXT NOT NULL CHECK (payment_method IN ('cash_on_delivery', 'card', 'stripe')),
    payment_status TEXT NOT NULL DEFAULT 'pending' CHECK (payment_status IN ('pending', 'paid', 'failed', 'refunded')),
    shipping_address JSONB NOT NULL,
    tracking_number TEXT,
    notes TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc', now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc', now())
);

CREATE INDEX IF NOT EXISTS idx_orders_user ON public.orders(user_id);
CREATE INDEX IF NOT EXISTS idx_orders_status ON public.orders(status);
CREATE INDEX IF NOT EXISTS idx_orders_created ON public.orders(created_at);

-- ------------------------------------------------------------------------------
-- 9. ORDER ITEMS TABLE
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.order_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_id UUID NOT NULL REFERENCES public.orders(id) ON DELETE CASCADE,
    product_id TEXT REFERENCES public.products(id) ON DELETE SET NULL,
    product_name TEXT NOT NULL,
    price NUMERIC(10,2) NOT NULL CHECK (price >= 0),
    quantity INT NOT NULL CHECK (quantity > 0),
    selected_color TEXT,
    image_url TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc', now())
);

CREATE INDEX IF NOT EXISTS idx_order_items_order ON public.order_items(order_id);

-- ------------------------------------------------------------------------------
-- 10. REVIEWS TABLE
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.reviews (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    product_id TEXT NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
    user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    reviewer_name TEXT NOT NULL,
    rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
    comment TEXT,
    is_verified_buyer BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc', now())
);

CREATE INDEX IF NOT EXISTS idx_reviews_product ON public.reviews(product_id);

-- ------------------------------------------------------------------------------
-- AUTOMATIC TIMESTAMP TRIGGERS
-- ------------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = timezone('utc', now());
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS set_profiles_updated_at ON public.profiles;
CREATE TRIGGER set_profiles_updated_at BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

DROP TRIGGER IF EXISTS set_products_updated_at ON public.products;
CREATE TRIGGER set_products_updated_at BEFORE UPDATE ON public.products FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

DROP TRIGGER IF EXISTS set_carts_updated_at ON public.carts;
CREATE TRIGGER set_carts_updated_at BEFORE UPDATE ON public.carts FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

DROP TRIGGER IF EXISTS set_orders_updated_at ON public.orders;
CREATE TRIGGER set_orders_updated_at BEFORE UPDATE ON public.orders FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- ==============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ==============================================================================

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.product_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.carts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cart_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.addresses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;

-- Helper function to check if current user is admin
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
BEGIN
    RETURN EXISTS (
        SELECT 1 FROM public.profiles
        WHERE id = auth.uid() AND role = 'admin'
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 1. Profiles Policies
CREATE POLICY "Users can view own profile or admins can view all"
    ON public.profiles FOR SELECT
    USING (auth.uid() = id OR public.is_admin());

CREATE POLICY "Users can update own profile"
    ON public.profiles FOR UPDATE
    USING (auth.uid() = id)
    WITH CHECK (auth.uid() = id);

-- 2. Categories Policies (Public read, admin write)
CREATE POLICY "Allow public read on categories"
    ON public.categories FOR SELECT
    USING (true);

CREATE POLICY "Allow admin insert on categories"
    ON public.categories FOR INSERT
    WITH CHECK (public.is_admin());

CREATE POLICY "Allow admin update on categories"
    ON public.categories FOR UPDATE
    USING (public.is_admin());

CREATE POLICY "Allow admin delete on categories"
    ON public.categories FOR DELETE
    USING (public.is_admin());

-- 3. Products Policies (Public read published only, admin full access)
CREATE POLICY "Allow public read on published products"
    ON public.products FOR SELECT
    USING (status = 'published' OR public.is_admin());

CREATE POLICY "Allow admin manage products"
    ON public.products FOR ALL
    USING (public.is_admin());

-- 4. Product Images Policies (Public read, admin write)
CREATE POLICY "Allow public read on product images"
    ON public.product_images FOR SELECT
    USING (true);

CREATE POLICY "Allow admin manage product images"
    ON public.product_images FOR ALL
    USING (public.is_admin());

-- 5. Carts Policies
CREATE POLICY "Users can access their own cart"
    ON public.carts FOR ALL
    USING (auth.uid() = user_id OR auth.uid() IS NULL);

-- 6. Cart Items Policies
CREATE POLICY "Users can access their own cart items"
    ON public.cart_items FOR ALL
    USING (
        EXISTS (
            SELECT 1 FROM public.carts
            WHERE carts.id = cart_items.cart_id
            AND (carts.user_id = auth.uid() OR carts.user_id IS NULL)
        )
    );

-- 7. Addresses Policies
CREATE POLICY "Users can access their own addresses"
    ON public.addresses FOR ALL
    USING (auth.uid() = user_id);

-- 8. Orders Policies
CREATE POLICY "Users can view their own orders or admins view all"
    ON public.orders FOR SELECT
    USING (auth.uid() = user_id OR public.is_admin());

CREATE POLICY "Users can create orders"
    ON public.orders FOR INSERT
    WITH CHECK (auth.uid() = user_id OR auth.uid() IS NULL);

CREATE POLICY "Admins can update orders"
    ON public.orders FOR UPDATE
    USING (public.is_admin());

-- 9. Order Items Policies
CREATE POLICY "Users can view their own order items or admins view all"
    ON public.order_items FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM public.orders
            WHERE orders.id = order_items.order_id
            AND (orders.user_id = auth.uid() OR public.is_admin())
        )
    );

CREATE POLICY "Users can insert order items"
    ON public.order_items FOR INSERT
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM public.orders
            WHERE orders.id = order_items.order_id
        )
    );

-- 10. Reviews Policies
CREATE POLICY "Allow public read on reviews"
    ON public.reviews FOR SELECT
    USING (true);

CREATE POLICY "Authenticated users can submit reviews"
    ON public.reviews FOR INSERT
    WITH CHECK (auth.uid() = user_id);
