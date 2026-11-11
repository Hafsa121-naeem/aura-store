import { createClient } from '@/lib/supabase/client';
import {
  Category,
  Product,
  Order,
  Review,
  OrderStatus,
} from '@/lib/types/database';
import {
  FALLBACK_CATEGORIES,
  FALLBACK_PRODUCTS,
  FALLBACK_REVIEWS,
} from '@/lib/data/fallback-data';

// Helper to check if Supabase is properly configured
function isSupabaseConfigured(): boolean {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
    (process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY) &&
    !process.env.NEXT_PUBLIC_SUPABASE_URL.includes('your-project')
  );
}

// Normalize any category slug so all aliases resolve accurately
export function normalizeCategorySlug(rawSlug: string): string {
  const s = rawSlug.toLowerCase().trim();
  if (s === 'electronics' || s === 'electronics-gadgets' || s === 'gadgets') return 'electronics-gadgets';
  if (s === 'smart-watches' || s === 'smartwatches' || s === 'watches' || s === 'watch') return 'smart-watches';
  if (s === 'fashion' || s === 'fashion-accessories' || s === 'accessories' || s === 'bags') return 'fashion-accessories';
  if (s === 'beauty' || s === 'beauty-skincare' || s === 'skincare' || s === 'cosmetics' || s === 'makeup') return 'beauty-skincare';
  if (s === 'home' || s === 'home-living' || s === 'living' || s === 'decor') return 'home-living';
  if (s === 'mobile' || s === 'mobile-accessories' || s === 'phones') return 'mobile-accessories';
  if (s === 'fragrances' || s === 'lifestyle-fragrances' || s === 'perfumes') return 'lifestyle-fragrances';
  return s;
}

// Map normalized slug to category ID
export function getCategoryIdFromSlug(rawSlug: string): string | null {
  const normalized = normalizeCategorySlug(rawSlug);
  const cat = FALLBACK_CATEGORIES.find((c) => c.slug === normalized);
  return cat ? cat.id : null;
}

// -------------------------------------------------------------
// CATEGORIES API
// -------------------------------------------------------------
export async function getCategories(): Promise<Category[]> {
  if (isSupabaseConfigured()) {
    try {
      const supabase = createClient();
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .order('display_order', { ascending: true });

      if (!error && data && data.length > 0) {
        return data as Category[];
      }
    } catch {
      // Fallback
    }
  }

  return FALLBACK_CATEGORIES;
}

export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  const normalized = normalizeCategorySlug(slug);

  if (isSupabaseConfigured()) {
    try {
      const supabase = createClient();
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .eq('slug', normalized)
        .single();

      if (!error && data) {
        return data as Category;
      }
    } catch {
      // Fallback
    }
  }

  return FALLBACK_CATEGORIES.find((c) => c.slug === normalized) || null;
}

// -------------------------------------------------------------
// PRODUCTS API - STRICT CATEGORY ISOLATION
// -------------------------------------------------------------
export async function getProducts(options: {
  categorySlug?: string;
  subcategorySlug?: string;
  featured?: boolean;
  isNew?: boolean;
  minPrice?: number;
  maxPrice?: number;
  search?: string;
  sort?: 'featured' | 'price-asc' | 'price-desc' | 'rating' | 'newest';
  limit?: number;
  status?: string;
} = {}): Promise<Product[]> {
  const {
    categorySlug,
    subcategorySlug,
    featured,
    isNew,
    minPrice,
    maxPrice,
    search,
    sort = 'featured',
    limit,
    status = 'published',
  } = options;

  const targetCategoryId = categorySlug ? getCategoryIdFromSlug(categorySlug) : null;

  // If a category slug was requested but no valid category matched, return empty array immediately
  if (categorySlug && !targetCategoryId) {
    return [];
  }

  if (isSupabaseConfigured()) {
    try {
      const supabase = createClient();
      let query = supabase
        .from('products')
        .select(`
          *,
          category:categories(*),
          images:product_images(*)
        `);

      if (status) {
        query = query.eq('status', status);
      }

      // Strict category filter
      if (targetCategoryId) {
        query = query.eq('category_id', targetCategoryId);
      }

      if (subcategorySlug) {
        query = query.eq('subcategory_slug', subcategorySlug);
      }

      if (featured !== undefined) {
        query = query.eq('featured', featured);
      }

      if (isNew !== undefined) {
        query = query.eq('is_new', isNew);
      }

      if (minPrice !== undefined) {
        query = query.gte('price', minPrice);
      }

      if (maxPrice !== undefined) {
        query = query.lte('price', maxPrice);
      }

      if (search) {
        query = query.ilike('name', `%${search}%`);
      }

      // Sort
      if (sort === 'price-asc') query = query.order('price', { ascending: true });
      else if (sort === 'price-desc') query = query.order('price', { ascending: false });
      else if (sort === 'rating') query = query.order('rating', { ascending: false });
      else if (sort === 'newest') query = query.order('created_at', { ascending: false });
      else query = query.order('featured', { ascending: false });

      if (limit) {
        query = query.limit(limit);
      }

      const { data, error } = await query;
      if (!error && data && data.length > 0) {
        // Double-check strict category isolation in memory
        let filteredData = data as Product[];
        if (targetCategoryId) {
          filteredData = filteredData.filter((p) => p.category_id === targetCategoryId);
        }

        // Apply local overrides if present
        if (typeof window !== 'undefined') {
          try {
            const stored = localStorage.getItem('aura_products_override');
            if (stored) {
              const overrides = JSON.parse(stored);
              filteredData = filteredData.map((p) => (overrides[p.id] ? { ...p, ...overrides[p.id] } : p));
            }
          } catch {
            // ignore
          }
        }

        return filteredData;
      }
    } catch {
      // Fallback
    }
  }

  // Fallback memory filtering
  let results = [...FALLBACK_PRODUCTS];

  if (status) {
    results = results.filter((p) => p.status === status);
  }

  // STRICT category filtering
  if (targetCategoryId) {
    results = results.filter((p) => p.category_id === targetCategoryId);
  }

  if (subcategorySlug) {
    results = results.filter((p) => p.subcategory_slug === subcategorySlug);
  }

  if (featured !== undefined) {
    results = results.filter((p) => p.featured === featured);
  }

  if (isNew !== undefined) {
    results = results.filter((p) => p.is_new === isNew);
  }

  if (minPrice !== undefined) {
    results = results.filter((p) => (p.sale_price ?? p.price) >= minPrice);
  }

  if (maxPrice !== undefined) {
    results = results.filter((p) => (p.sale_price ?? p.price) <= maxPrice);
  }

  if (search) {
    const q = search.toLowerCase();
    results = results.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q)
    );
  }

  // Sort
  if (sort === 'price-asc') {
    results.sort((a, b) => (a.sale_price ?? a.price) - (b.sale_price ?? b.price));
  } else if (sort === 'price-desc') {
    results.sort((a, b) => (b.sale_price ?? b.price) - (a.sale_price ?? a.price));
  } else if (sort === 'rating') {
    results.sort((a, b) => b.rating - a.rating);
  } else if (sort === 'newest') {
    results.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
  } else {
    // Featured first
    results.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
  }

  if (limit) {
    results = results.slice(0, limit);
  }

  // Attach category object to each product and apply local overrides if present
  results = results.map((p) => {
    let active = p;
    if (typeof window !== 'undefined') {
      try {
        const stored = localStorage.getItem('aura_products_override');
        if (stored) {
          const overrides = JSON.parse(stored);
          if (overrides[p.id]) active = overrides[p.id];
        }
      } catch {
        // ignore
      }
    }
    return {
      ...active,
      category: active.category || FALLBACK_CATEGORIES.find((c) => c.id === active.category_id),
    };
  });

  // Client-side deleted products filter
  if (typeof window !== 'undefined') {
    try {
      const deletedStored = localStorage.getItem('aura_products_deleted');
      if (deletedStored) {
        const deletedIds: string[] = JSON.parse(deletedStored);
        results = results.filter((p) => !deletedIds.includes(p.id));
      }
      // Prepend newly created products if not already included
      const createdStored = localStorage.getItem('aura_products_created');
      if (createdStored) {
        const createdList: Product[] = JSON.parse(createdStored);
        const existingIds = new Set(results.map((r) => r.id));
        for (const cp of createdList) {
          if (!existingIds.has(cp.id)) {
            results.unshift(cp);
          }
        }
      }
    } catch {}
  }

  return results;
}

// Known legacy or marketing slug aliases to prevent any 404 errors
const SLUG_ALIASES: Record<string, string> = {
  'apex-ultra-titanium-sapphire-amoled-smartwatch': 'apex-titanium-sapphire-amoled-smartwatch',
  'verona-italian-kelly-handbag': 'verona-italian-calfskin-handbag',
  'riviera-kelly-handbag': 'riviera-structured-kelly-top-handle-bag',
  'minimalist-ceramic-table-lamp': 'cordless-rechargeable-mushroom-table-lamp',
  'botanical-multi-peptide-youth-serum': 'luminance-vitamin-c-radiance-elixir',
  'botanical-multi-peptide-elixir': 'luminance-vitamin-c-radiance-elixir',
  'cold-air-ultrasonic-essential-oil-diffuser': 'ultrasonic-matte-ceramic-aroma-diffuser',
  'magsafe-magnetic-wireless-charging-stand': 'magstation-3-in-1-foldable-wireless-charger',
  'horizon-pro-anc-hybrid-wireless-headphones': 'horizon-pro-anc-hybrid-wireless-headphones',
};

export async function getProductBySlug(rawSlug: string): Promise<Product | null> {
  const slug = SLUG_ALIASES[rawSlug.toLowerCase().trim()] || rawSlug.trim();

  // Check client-side overrides first for instantaneous update
  if (typeof window !== 'undefined') {
    try {
      const stored = localStorage.getItem('aura_products_override');
      if (stored) {
        const overrides = JSON.parse(stored);
        if (overrides[slug]) return overrides[slug];
        if (overrides[rawSlug]) return overrides[rawSlug];
      }
    } catch {
      // ignore
    }
  }

  if (isSupabaseConfigured()) {
    try {
      const supabase = createClient();
      const { data, error } = await supabase
        .from('products')
        .select(`
          *,
          category:categories(*),
          images:product_images(*)
        `)
        .or(`slug.eq.${slug},slug.eq.${rawSlug}`)
        .limit(1)
        .maybeSingle();

      if (!error && data) {
        return data as Product;
      }
    } catch {
      // Fallback
    }
  }

  // Exact match on normalized slug or raw slug
  let found = FALLBACK_PRODUCTS.find((p) => p.slug === slug || p.slug === rawSlug);

  // If not found, smart partial match
  if (!found) {
    found = FALLBACK_PRODUCTS.find((p) => {
      const pSlug = p.slug.toLowerCase();
      const s = slug.toLowerCase();
      return pSlug.includes(s) || s.includes(pSlug);
    });
  }

  if (found) {
    return {
      ...found,
      category: found.category || FALLBACK_CATEGORIES.find((c) => c.id === found.category_id),
    };
  }
  return null;
}

export async function getProductById(id: string): Promise<Product | null> {
  const all = await getProducts({});
  return all.find((p) => p.id === id || p.slug === id) || null;
}

export async function updateProduct(updatedProduct: Product): Promise<Product> {
  // 1. If Supabase is configured, update in Supabase
  if (isSupabaseConfigured()) {
    try {
      const supabase = createClient();
      const { error } = await supabase
        .from('products')
        .update({
          name: updatedProduct.name,
          slug: updatedProduct.slug,
          description: updatedProduct.description,
          price: updatedProduct.price,
          sale_price: updatedProduct.sale_price,
          stock: updatedProduct.stock,
          sku: updatedProduct.sku,
          status: updatedProduct.status,
          featured: updatedProduct.featured,
          is_new: updatedProduct.is_new,
          category_id: updatedProduct.category_id,
          subcategory: updatedProduct.subcategory,
          subcategory_slug: updatedProduct.subcategory_slug,
          warranty: updatedProduct.warranty,
          packaging: updatedProduct.packaging,
          shipping_info: updatedProduct.shipping_info,
          specs: updatedProduct.specs,
          color_variants: updatedProduct.color_variants,
          updated_at: new Date().toISOString(),
        })
        .eq('id', updatedProduct.id);

      if (error) {
        console.error('Supabase update error:', error);
      }

      // Sync product_images
      if (updatedProduct.images && updatedProduct.images.length > 0) {
        await supabase.from('product_images').delete().eq('product_id', updatedProduct.id);
        await supabase.from('product_images').insert(
          updatedProduct.images.map((img, idx) => ({
            product_id: updatedProduct.id,
            image_url: img.image_url,
            alt_text: img.alt_text || `${updatedProduct.name} Image ${idx + 1}`,
            is_primary: idx === 0,
            display_order: idx + 1,
          }))
        );
      }
    } catch (err) {
      console.warn('Supabase product update error:', err);
    }
  }

  // 2. Persist to localStorage for immediate cross-page reactivity
  if (typeof window !== 'undefined') {
    try {
      const stored = localStorage.getItem('aura_products_override');
      const overrides: Record<string, Product> = stored ? JSON.parse(stored) : {};
      overrides[updatedProduct.id] = updatedProduct;
      overrides[updatedProduct.slug] = updatedProduct;
      localStorage.setItem('aura_products_override', JSON.stringify(overrides));
    } catch {
      // ignore
    }
  }

  return updatedProduct;
}

export async function createProduct(newProduct: Product): Promise<Product> {
  // 1. Insert into Supabase if configured
  if (isSupabaseConfigured()) {
    try {
      const supabase = createClient();
      const { error } = await supabase.from('products').insert({
        id: newProduct.id,
        name: newProduct.name,
        slug: newProduct.slug,
        description: newProduct.description,
        price: newProduct.price,
        sale_price: newProduct.sale_price,
        stock: newProduct.stock,
        category_id: newProduct.category_id,
        subcategory: newProduct.subcategory,
        sku: newProduct.sku,
        status: newProduct.status,
        featured: newProduct.featured,
        is_new: newProduct.is_new,
        rating: newProduct.rating,
        review_count: newProduct.review_count,
        created_at: newProduct.created_at,
        updated_at: newProduct.updated_at,
      });

      if (error) {
        console.error('Supabase createProduct error:', error);
      }

      if (newProduct.images && newProduct.images.length > 0) {
        await supabase.from('product_images').insert(
          newProduct.images.map((img, idx) => ({
            product_id: newProduct.id,
            image_url: img.image_url,
            alt_text: img.alt_text || `${newProduct.name} Image ${idx + 1}`,
            is_primary: idx === 0,
            display_order: idx + 1,
          }))
        );
      }
    } catch (err) {
      console.warn('Supabase createProduct exception:', err);
    }
  }

  // 2. Persist to localStorage for immediate client reactivity
  if (typeof window !== 'undefined') {
    try {
      // Add to overrides
      const stored = localStorage.getItem('aura_products_override');
      const overrides: Record<string, Product> = stored ? JSON.parse(stored) : {};
      overrides[newProduct.id] = newProduct;
      overrides[newProduct.slug] = newProduct;
      localStorage.setItem('aura_products_override', JSON.stringify(overrides));

      // Add to created list
      const createdStored = localStorage.getItem('aura_products_created');
      const createdList: Product[] = createdStored ? JSON.parse(createdStored) : [];
      createdList.unshift(newProduct);
      localStorage.setItem('aura_products_created', JSON.stringify(createdList));
    } catch {
      // ignore
    }
  }

  return newProduct;
}

export async function deleteProduct(productId: string): Promise<boolean> {
  // 1. Delete from Supabase if configured
  if (isSupabaseConfigured()) {
    try {
      const supabase = createClient();
      await supabase.from('product_images').delete().eq('product_id', productId);
      const { error } = await supabase.from('products').delete().eq('id', productId);
      if (error) {
        console.error('Supabase deleteProduct error:', error);
      }
    } catch (err) {
      console.warn('Supabase deleteProduct exception:', err);
    }
  }

  // 2. Persist deletion in localStorage
  if (typeof window !== 'undefined') {
    try {
      // Remove from overrides
      const stored = localStorage.getItem('aura_products_override');
      if (stored) {
        const overrides = JSON.parse(stored);
        delete overrides[productId];
        localStorage.setItem('aura_products_override', JSON.stringify(overrides));
      }

      // Remove from created list if present
      const createdStored = localStorage.getItem('aura_products_created');
      if (createdStored) {
        const createdList: Product[] = JSON.parse(createdStored);
        const filtered = createdList.filter((p) => p.id !== productId);
        localStorage.setItem('aura_products_created', JSON.stringify(filtered));
      }

      // Add to deleted set
      const deletedStored = localStorage.getItem('aura_products_deleted');
      const deletedIds: string[] = deletedStored ? JSON.parse(deletedStored) : [];
      if (!deletedIds.includes(productId)) {
        deletedIds.push(productId);
        localStorage.setItem('aura_products_deleted', JSON.stringify(deletedIds));
      }
    } catch {
      // ignore
    }
  }

  return true;
}

export async function getRelatedProducts(
  categoryId: string | null,
  currentProductId: string,
  limit: number = 4
): Promise<Product[]> {
  const all = await getProducts();
  return all
    .filter((p) => p.id !== currentProductId && (!categoryId || p.category_id === categoryId))
    .slice(0, limit);
}

export function generateDefaultReviewsForProduct(productId: string, rating: number = 4.9): Review[] {
  return [
    {
      id: `rev-${productId}-1`,
      product_id: productId,
      user_id: null,
      user_name: 'Zainab Malik (Gulberg III, Lahore)',
      rating: 5,
      title: 'Authentic Luxury Quality & Fast Courier Delivery',
      comment: 'Ordered via Cash on Delivery in Lahore. Package arrived in sealed packaging with authenticity certificate in 48 hours. Excellent build quality, exactly as shown in photographs.',
      created_at: new Date(Date.now() - 3 * 86400000).toISOString(),
    },
    {
      id: `rev-${productId}-2`,
      product_id: productId,
      user_id: null,
      user_name: 'Hamza Farooq (DHA Phase 6, Karachi)',
      rating: 5,
      title: 'Top-tier finish and outstanding craftsmanship',
      comment: 'Solid premium feel and flawless ergonomics. Packaging was immaculate with protective bubble wrap. 100% recommended for anyone looking for authentic luxury gear in Pakistan.',
      created_at: new Date(Date.now() - 7 * 86400000).toISOString(),
    },
    {
      id: `rev-${productId}-3`,
      product_id: productId,
      user_id: null,
      user_name: 'Bilal Sheikh (F-7/2, Islamabad)',
      rating: 5,
      title: 'Verified official stock — worth every rupee',
      comment: 'Super fast express dispatch to Islamabad. Everything from the tactile finish to the tolerances feels aerospace grade. Will definitely purchase again from AURA STORE.',
      created_at: new Date(Date.now() - 12 * 86400000).toISOString(),
    },
    {
      id: `rev-${productId}-4`,
      product_id: productId,
      user_id: null,
      user_name: 'Dr. Ayesha Noor (Cantt, Rawalpindi)',
      rating: Math.min(5, Math.max(4, Math.round(rating))),
      title: 'Exceeded my expectations',
      comment: 'Prompt tracking notifications via SMS and Leopards courier. Customer support was very helpful when confirming the order. Product performs beautifully.',
      created_at: new Date(Date.now() - 18 * 86400000).toISOString(),
    },
  ];
}

// -------------------------------------------------------------
// REVIEWS API
// -------------------------------------------------------------
export async function getProductReviews(productId: string): Promise<Review[]> {
  if (isSupabaseConfigured()) {
    try {
      const supabase = createClient();
      const { data, error } = await supabase
        .from('reviews')
        .select('*')
        .eq('product_id', productId)
        .order('created_at', { ascending: false });

      if (!error && data && data.length > 0) {
        return data.map((r: any) => ({
          id: r.id,
          product_id: r.product_id,
          user_id: r.user_id,
          user_name: r.reviewer_name || r.user_name || 'Verified Buyer',
          rating: r.rating,
          title: r.title || 'Verified Purchase',
          comment: r.comment,
          created_at: r.created_at,
        })) as Review[];
      }
    } catch {
      // Fallback
    }
  }

  const fallbackMatch = FALLBACK_REVIEWS.filter((r) => r.product_id === productId);
  if (fallbackMatch.length > 0) {
    return fallbackMatch;
  }

  return generateDefaultReviewsForProduct(productId);
}

export async function createReview(review: {
  productId: string;
  userId?: string | null;
  userName: string;
  rating: number;
  title?: string;
  comment: string;
}): Promise<Review> {
  if (isSupabaseConfigured()) {
    try {
      const supabase = createClient();
      const { data, error } = await supabase
        .from('reviews')
        .insert([
          {
            product_id: review.productId,
            user_id: review.userId || null,
            reviewer_name: review.userName,
            rating: review.rating,
            comment: review.comment,
            is_verified_buyer: true,
          },
        ])
        .select()
        .single();

      if (!error && data) {
        return {
          id: data.id,
          product_id: data.product_id,
          user_id: data.user_id,
          user_name: data.reviewer_name || review.userName,
          rating: data.rating,
          title: review.title || 'Verified Purchase',
          comment: data.comment,
          created_at: data.created_at,
        } as Review;
      }
    } catch {
      // Fallback
    }
  }

  const newReview: Review = {
    id: `rev-${Date.now()}`,
    product_id: review.productId,
    user_id: review.userId || null,
    user_name: review.userName,
    rating: review.rating,
    title: review.title || null,
    comment: review.comment,
    created_at: new Date().toISOString(),
  };

  FALLBACK_REVIEWS.unshift(newReview);
  return newReview;
}

// -------------------------------------------------------------
// ORDERS API
// -------------------------------------------------------------
export async function createOrder(orderPayload: {
  userId: string | null;
  customerEmail: string;
  customerName: string;
  customerPhone: string | null;
  shippingAddress: {
    full_name: string;
    phone: string;
    street_address: string;
    city: string;
    state: string;
    postal_code: string;
    country: string;
  };
  subtotal: number;
  shippingFee: number;
  tax: number;
  total: number;
  paymentMethod: 'cash_on_delivery' | 'card';
  notes?: string;
  items: Array<{
    productId: string;
    productName: string;
    productPrice: number;
    productImage: string;
    quantity: number;
    totalPrice: number;
    selectedColor?: string | null;
  }>;
}): Promise<Order> {
  const orderNumber = `AUR-${Math.floor(100000 + Math.random() * 900000)}`;

  if (isSupabaseConfigured()) {
    try {
      const supabase = createClient();
      const { data: orderData, error: orderError } = await supabase
        .from('orders')
        .insert([
          {
            order_number: orderNumber,
            user_id: orderPayload.userId,
            guest_email: orderPayload.customerEmail,
            shipping_address: orderPayload.shippingAddress,
            subtotal: orderPayload.subtotal,
            shipping_cost: orderPayload.shippingFee,
            tax: orderPayload.tax,
            total: orderPayload.total,
            payment_method: orderPayload.paymentMethod,
            payment_status: 'pending',
            status: 'processing',
            notes: orderPayload.notes || null,
          },
        ])
        .select()
        .single();

      if (!orderError && orderData) {
        const orderItemsToInsert = orderPayload.items.map((item) => ({
          order_id: orderData.id,
          product_id: item.productId,
          product_name: item.productName,
          price: item.productPrice,
          image_url: item.productImage,
          quantity: item.quantity,
          selected_color: item.selectedColor || null,
        }));

        await supabase.from('order_items').insert(orderItemsToInsert);

        const createdResult: Order = {
          id: orderData.id,
          order_number: orderData.order_number,
          user_id: orderData.user_id,
          customer_email: orderData.guest_email || orderPayload.customerEmail,
          customer_name: orderPayload.customerName,
          customer_phone: orderPayload.customerPhone,
          shipping_address: orderPayload.shippingAddress,
          subtotal: Number(orderData.subtotal),
          shipping_fee: Number(orderData.shipping_cost || 0),
          tax: Number(orderData.tax || 0),
          total: Number(orderData.total),
          payment_method: orderData.payment_method as any,
          payment_status: orderData.payment_status as any,
          order_status: orderData.status as any,
          notes: orderData.notes,
          created_at: orderData.created_at,
          updated_at: orderData.updated_at,
          items: orderPayload.items.map((i, idx) => ({
            id: `oi-${orderData.id}-${idx}`,
            order_id: orderData.id,
            product_id: i.productId,
            product_name: i.productName,
            product_price: i.productPrice,
            product_image: i.productImage,
            quantity: i.quantity,
            total_price: i.totalPrice,
            selected_color: i.selectedColor || null,
            created_at: orderData.created_at,
          })),
        };

        if (typeof window !== 'undefined') {
          try {
            const stored = localStorage.getItem('aura_orders') || '[]';
            const parsed = JSON.parse(stored);
            parsed.unshift(createdResult);
            localStorage.setItem('aura_orders', JSON.stringify(parsed));
          } catch {
            // ignore
          }
        }

        return createdResult;
      }
    } catch (err) {
      console.warn('Supabase order creation fallback:', err);
    }
  }

  // Local fallback storage
  const createdOrder: Order = {
    id: `ord-${Date.now()}`,
    order_number: orderNumber,
    user_id: orderPayload.userId,
    customer_email: orderPayload.customerEmail,
    customer_name: orderPayload.customerName,
    customer_phone: orderPayload.customerPhone,
    shipping_address: orderPayload.shippingAddress,
    subtotal: orderPayload.subtotal,
    shipping_fee: orderPayload.shippingFee,
    tax: orderPayload.tax,
    total: orderPayload.total,
    payment_method: orderPayload.paymentMethod,
    payment_status: 'pending',
    order_status: 'processing',
    notes: orderPayload.notes || null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    items: orderPayload.items.map((i, idx) => ({
      id: `oi-${Date.now()}-${idx}`,
      order_id: `ord-${Date.now()}`,
      product_id: i.productId,
      product_name: i.productName,
      product_price: i.productPrice,
      product_image: i.productImage,
      quantity: i.quantity,
      total_price: i.totalPrice,
      selected_color: i.selectedColor || null,
      created_at: new Date().toISOString(),
    })),
  };

  if (typeof window !== 'undefined') {
    try {
      const stored = localStorage.getItem('aura_orders') || '[]';
      const parsed = JSON.parse(stored);
      parsed.unshift(createdOrder);
      localStorage.setItem('aura_orders', JSON.stringify(parsed));
    } catch {
      // ignore
    }
  }

  return createdOrder;
}

export async function getAllOrders(): Promise<Order[]> {
  if (isSupabaseConfigured()) {
    try {
      const supabase = createClient();
      const { data, error } = await supabase
        .from('orders')
        .select(`
          *,
          items:order_items(*)
        `)
        .order('created_at', { ascending: false });

      if (!error && data && data.length > 0) {
        return data.map((d: any) => ({
          id: d.id,
          order_number: d.order_number,
          user_id: d.user_id,
          customer_email: d.guest_email || '',
          customer_name: d.shipping_address?.full_name || 'Valued Customer',
          customer_phone: d.shipping_address?.phone || null,
          shipping_address: d.shipping_address,
          subtotal: Number(d.subtotal),
          shipping_fee: Number(d.shipping_cost || 0),
          tax: Number(d.tax || 0),
          total: Number(d.total),
          payment_method: d.payment_method,
          payment_status: d.payment_status,
          order_status: d.status,
          notes: d.notes,
          created_at: d.created_at,
          updated_at: d.updated_at,
          items: (d.items || []).map((i: any) => ({
            id: i.id,
            order_id: i.order_id,
            product_id: i.product_id,
            product_name: i.product_name,
            product_price: Number(i.price),
            product_image: i.image_url,
            quantity: i.quantity,
            total_price: Number(i.price) * i.quantity,
            selected_color: i.selected_color,
            created_at: i.created_at,
          })),
        })) as Order[];
      }
    } catch {
      // Fallback
    }
  }

  if (typeof window !== 'undefined') {
    try {
      const stored = localStorage.getItem('aura_orders');
      if (stored) return JSON.parse(stored);
    } catch {
      // ignore
    }
  }

  return [];
}

export async function updateOrderStatus(orderId: string, newStatus: OrderStatus): Promise<void> {
  if (isSupabaseConfigured()) {
    try {
      const supabase = createClient();
      await supabase.from('orders').update({ status: newStatus }).eq('id', orderId);
    } catch {
      // Fallback
    }
  }

  if (typeof window !== 'undefined') {
    try {
      const stored = localStorage.getItem('aura_orders');
      if (stored) {
        const orders = JSON.parse(stored) as Order[];
        const idx = orders.findIndex((o) => o.id === orderId);
        if (idx !== -1) {
          orders[idx].order_status = newStatus;
          localStorage.setItem('aura_orders', JSON.stringify(orders));
        }
      }
    } catch {
      // ignore
    }
  }
}

export async function createProductReview(review: {
  product_id: string;
  user_id?: string | null;
  user_name: string;
  rating: number;
  title?: string | null;
  comment: string;
}): Promise<Review> {
  return createReview({
    productId: review.product_id,
    userId: review.user_id,
    userName: review.user_name,
    rating: review.rating,
    title: review.title || undefined,
    comment: review.comment,
  });
}

