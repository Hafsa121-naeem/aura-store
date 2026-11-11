-- ==============================================================================
-- AURA STORE - OFFICIAL POPULATION SEED DATA (All 6 Categories + 76 Products)
-- ==============================================================================

-- 1. Insert Categories
INSERT INTO public.categories (id, name, slug, description, image_url, display_order)
VALUES
  ('c1-electronics', 'Electronics & Gadgets', 'electronics-gadgets', 'High-performance ANC headphones, Bluetooth studio speakers, mechanical keyboards, and modern desk gadgets.', 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80', 1),
  ('c2-watches', 'Smart Watches', 'smart-watches', 'Grade-5 titanium smartwatches, curved AMOLED sapphire displays, ECG tracking, and luxury metal straps.', 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80', 2),
  ('c3-fashion', 'Fashion & Accessories', 'fashion-accessories', 'Handcrafted Italian leather bags, polarized acetate eyewear, sculptural statement jewelry, and automatic watches.', 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&q=80', 3),
  ('c4-beauty', 'Beauty & Skincare', 'beauty-skincare', 'Clinically formulated botanical serums, ultrasound facial sculpting devices, barrier repair creams, and mineral SPF.', 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=800&q=80', 4),
  ('c5-home', 'Home & Living', 'home-living', 'Solid American walnut workspace risers, ambient touch lamps, sculpted stoneware diffusers, and artisanal coffee gear.', 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=800&q=80', 5),
  ('c6-mobile', 'Mobile & Tech Accessories', 'mobile-accessories', 'Fast MagSafe charging docks, aerospace aramid fiber phone cases, 100W braided Kevlar cables, and battery banks.', 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=800&q=80', 6)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  slug = EXCLUDED.slug,
  description = EXCLUDED.description,
  image_url = EXCLUDED.image_url,
  display_order = EXCLUDED.display_order;

-- 2. Insert Products
INSERT INTO public.products (
  id, category_id, subcategory, subcategory_slug, name, slug, description,
  price, sale_price, stock, sku, featured, is_new, rating, review_count,
  status, warranty, packaging, shipping_info, specs, color_variants
) VALUES (
  'el-ha-01',
  'c1-electronics',
  'Headphones & Audio',
  'headphones-audio',
  'Horizon Pro ANC Hybrid Wireless Over-Ear Headphones',
  'horizon-pro-anc-hybrid-wireless-headphones',
  'Custom 40mm beryllium dynamic drivers, 42dB hybrid active noise cancellation, LDAC hi-res wireless codec, memory foam protein leather earcups, and 50-hour playback.',
  26999,
  22499,
  28,
  'AUR-EL-HA-001',
  true,
  true,
  4.9,
  74,
  'published',
  '12 Months Official Brand Replacement Warranty',
  'Sealed Retail Packaging with Authenticity Certificate',
  'TCS / Leopards Courier Express across Pakistan',
  '{}'::jsonb,
  '[{"name":"Space Grey","hex":"#374151","image_url":"https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=1000&q=80","price":26999,"sale_price":22499},{"name":"Champagne Silver","hex":"#e2e8f0","image_url":"https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=1000&q=80","price":28999,"sale_price":24999},{"name":"Midnight Black","hex":"#111827","image_url":"https://images.unsplash.com/photo-1583394838336-acd977736f90?w=1000&q=80","price":31999,"sale_price":26999}]'::jsonb
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  slug = EXCLUDED.slug,
  category_id = EXCLUDED.category_id,
  subcategory = EXCLUDED.subcategory,
  subcategory_slug = EXCLUDED.subcategory_slug,
  description = EXCLUDED.description,
  price = EXCLUDED.price,
  sale_price = EXCLUDED.sale_price,
  stock = EXCLUDED.stock,
  sku = EXCLUDED.sku,
  featured = EXCLUDED.featured,
  is_new = EXCLUDED.is_new,
  status = EXCLUDED.status,
  specs = EXCLUDED.specs,
  color_variants = EXCLUDED.color_variants;

INSERT INTO public.products (
  id, category_id, subcategory, subcategory_slug, name, slug, description,
  price, sale_price, stock, sku, featured, is_new, rating, review_count,
  status, warranty, packaging, shipping_info, specs, color_variants
) VALUES (
  'el-ha-02',
  'c1-electronics',
  'Headphones & Audio',
  'headphones-audio',
  'PulseStudio High-Fidelity Bluetooth Speaker',
  'pulsestudio-high-fidelity-bluetooth-speaker',
  'Omnidirectional 360-degree acoustic projection with dual passive bass radiators, 30W output, IPX7 waterproof rating, and 24-hour battery endurance.',
  15500,
  12999,
  35,
  'AUR-EL-HA-002',
  true,
  false,
  4.8,
  53,
  'published',
  '12 Months Official Brand Replacement Warranty',
  'Sealed Retail Packaging with Authenticity Certificate',
  'TCS / Leopards Courier Express across Pakistan',
  '{}'::jsonb,
  '[]'::jsonb
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  slug = EXCLUDED.slug,
  category_id = EXCLUDED.category_id,
  subcategory = EXCLUDED.subcategory,
  subcategory_slug = EXCLUDED.subcategory_slug,
  description = EXCLUDED.description,
  price = EXCLUDED.price,
  sale_price = EXCLUDED.sale_price,
  stock = EXCLUDED.stock,
  sku = EXCLUDED.sku,
  featured = EXCLUDED.featured,
  is_new = EXCLUDED.is_new,
  status = EXCLUDED.status,
  specs = EXCLUDED.specs,
  color_variants = EXCLUDED.color_variants;

INSERT INTO public.products (
  id, category_id, subcategory, subcategory_slug, name, slug, description,
  price, sale_price, stock, sku, featured, is_new, rating, review_count,
  status, warranty, packaging, shipping_info, specs, color_variants
) VALUES (
  'el-ca-01',
  'c1-electronics',
  'Computer Accessories',
  'computer-accessories',
  'Keychron K2 Wireless Mechanical Keyboard',
  'keychron-k2-wireless-mechanical-keyboard',
  'Compact 75% layout mechanical keyboard with hot-swappable Gateron G Pro mechanical switches, aircraft-grade aluminum frame, RGB backlighting, and Bluetooth 5.1 multi-device pairing.',
  18500,
  15999,
  22,
  'AUR-EL-CA-001',
  true,
  true,
  4.9,
  88,
  'published',
  '12 Months Official Brand Replacement Warranty',
  'Sealed Retail Packaging with Authenticity Certificate',
  'TCS / Leopards Courier Express across Pakistan',
  '{}'::jsonb,
  '[]'::jsonb
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  slug = EXCLUDED.slug,
  category_id = EXCLUDED.category_id,
  subcategory = EXCLUDED.subcategory,
  subcategory_slug = EXCLUDED.subcategory_slug,
  description = EXCLUDED.description,
  price = EXCLUDED.price,
  sale_price = EXCLUDED.sale_price,
  stock = EXCLUDED.stock,
  sku = EXCLUDED.sku,
  featured = EXCLUDED.featured,
  is_new = EXCLUDED.is_new,
  status = EXCLUDED.status,
  specs = EXCLUDED.specs,
  color_variants = EXCLUDED.color_variants;

INSERT INTO public.products (
  id, category_id, subcategory, subcategory_slug, name, slug, description,
  price, sale_price, stock, sku, featured, is_new, rating, review_count,
  status, warranty, packaging, shipping_info, specs, color_variants
) VALUES (
  'el-ca-02',
  'c1-electronics',
  'Computer Accessories',
  'computer-accessories',
  'Precision Ergonomic Wireless Vertical Mouse',
  'precision-ergonomic-wireless-vertical-mouse',
  'Natural 57-degree vertical handshake angle posture, whisper-quiet acoustic clicks, 4000 DPI high-precision optical tracking sensor, and dual Bluetooth/USB wireless connectivity.',
  8999,
  7499,
  40,
  'AUR-EL-CA-002',
  false,
  false,
  4.8,
  64,
  'published',
  '12 Months Official Brand Replacement Warranty',
  'Sealed Retail Packaging with Authenticity Certificate',
  'TCS / Leopards Courier Express across Pakistan',
  '{}'::jsonb,
  '[]'::jsonb
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  slug = EXCLUDED.slug,
  category_id = EXCLUDED.category_id,
  subcategory = EXCLUDED.subcategory,
  subcategory_slug = EXCLUDED.subcategory_slug,
  description = EXCLUDED.description,
  price = EXCLUDED.price,
  sale_price = EXCLUDED.sale_price,
  stock = EXCLUDED.stock,
  sku = EXCLUDED.sku,
  featured = EXCLUDED.featured,
  is_new = EXCLUDED.is_new,
  status = EXCLUDED.status,
  specs = EXCLUDED.specs,
  color_variants = EXCLUDED.color_variants;

INSERT INTO public.products (
  id, category_id, subcategory, subcategory_slug, name, slug, description,
  price, sale_price, stock, sku, featured, is_new, rating, review_count,
  status, warranty, packaging, shipping_info, specs, color_variants
) VALUES (
  'el-gg-01',
  'c1-electronics',
  'Gaming Gadgets',
  'gaming-gadgets',
  'HyperSpeed Ultra-Lightweight Wireless Gaming Mouse',
  'hyperspeed-ultra-lightweight-wireless-gaming-mouse',
  'Featherlight 58g chassis, 26,000 DPI optical sensor, optical micro-switches rated for 90 million clicks, pure virgin-grade PTFE glide skates, and 80-hour battery life.',
  13999,
  11499,
  25,
  'AUR-EL-GG-001',
  true,
  true,
  4.9,
  42,
  'published',
  '12 Months Official Brand Replacement Warranty',
  'Sealed Retail Packaging with Authenticity Certificate',
  'TCS / Leopards Courier Express across Pakistan',
  '{}'::jsonb,
  '[]'::jsonb
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  slug = EXCLUDED.slug,
  category_id = EXCLUDED.category_id,
  subcategory = EXCLUDED.subcategory,
  subcategory_slug = EXCLUDED.subcategory_slug,
  description = EXCLUDED.description,
  price = EXCLUDED.price,
  sale_price = EXCLUDED.sale_price,
  stock = EXCLUDED.stock,
  sku = EXCLUDED.sku,
  featured = EXCLUDED.featured,
  is_new = EXCLUDED.is_new,
  status = EXCLUDED.status,
  specs = EXCLUDED.specs,
  color_variants = EXCLUDED.color_variants;

INSERT INTO public.products (
  id, category_id, subcategory, subcategory_slug, name, slug, description,
  price, sale_price, stock, sku, featured, is_new, rating, review_count,
  status, warranty, packaging, shipping_info, specs, color_variants
) VALUES (
  'el-gg-02',
  'c1-electronics',
  'Gaming Gadgets',
  'gaming-gadgets',
  'StreamKey Pro 15-Key Customizable Visual Keypad',
  'streamkey-pro-15-key-customizable-visual-keypad',
  '15 tactile LCD keys for one-touch studio switching, audio routing, streaming scene launches, macro execution, and real-time media controls.',
  24999,
  20999,
  14,
  'AUR-EL-GG-002',
  false,
  false,
  4.9,
  38,
  'published',
  '12 Months Official Brand Replacement Warranty',
  'Sealed Retail Packaging with Authenticity Certificate',
  'TCS / Leopards Courier Express across Pakistan',
  '{}'::jsonb,
  '[]'::jsonb
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  slug = EXCLUDED.slug,
  category_id = EXCLUDED.category_id,
  subcategory = EXCLUDED.subcategory,
  subcategory_slug = EXCLUDED.subcategory_slug,
  description = EXCLUDED.description,
  price = EXCLUDED.price,
  sale_price = EXCLUDED.sale_price,
  stock = EXCLUDED.stock,
  sku = EXCLUDED.sku,
  featured = EXCLUDED.featured,
  is_new = EXCLUDED.is_new,
  status = EXCLUDED.status,
  specs = EXCLUDED.specs,
  color_variants = EXCLUDED.color_variants;

INSERT INTO public.products (
  id, category_id, subcategory, subcategory_slug, name, slug, description,
  price, sale_price, stock, sku, featured, is_new, rating, review_count,
  status, warranty, packaging, shipping_info, specs, color_variants
) VALUES (
  'el-se-01',
  'c1-electronics',
  'Smart Entertainment',
  'smart-entertainment',
  'Smart Cinema 4K HDR Portable Laser Projector',
  'smart-cinema-4k-hdr-portable-laser-projector',
  'True 4K UHD projection up to 150 inches with ALPD laser technology, 1200 ANSI lumens, built-in Android TV with Netflix certification, and Harman Kardon tuned dual speakers.',
  89999,
  79999,
  9,
  'AUR-EL-SE-001',
  true,
  true,
  4.9,
  31,
  'published',
  '12 Months Official Brand Replacement Warranty',
  'Sealed Retail Packaging with Authenticity Certificate',
  'TCS / Leopards Courier Express across Pakistan',
  '{}'::jsonb,
  '[]'::jsonb
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  slug = EXCLUDED.slug,
  category_id = EXCLUDED.category_id,
  subcategory = EXCLUDED.subcategory,
  subcategory_slug = EXCLUDED.subcategory_slug,
  description = EXCLUDED.description,
  price = EXCLUDED.price,
  sale_price = EXCLUDED.sale_price,
  stock = EXCLUDED.stock,
  sku = EXCLUDED.sku,
  featured = EXCLUDED.featured,
  is_new = EXCLUDED.is_new,
  status = EXCLUDED.status,
  specs = EXCLUDED.specs,
  color_variants = EXCLUDED.color_variants;

INSERT INTO public.products (
  id, category_id, subcategory, subcategory_slug, name, slug, description,
  price, sale_price, stock, sku, featured, is_new, rating, review_count,
  status, warranty, packaging, shipping_info, specs, color_variants
) VALUES (
  'el-se-02',
  'c1-electronics',
  'Smart Entertainment',
  'smart-entertainment',
  'AmbiGlow Dynamic TV Backlight Sync Kit',
  'ambiglow-dynamic-tv-backlight-sync-kit',
  'HDMI 2.0 pass-through sync box with camera-free real-time colour synchronization, individually addressable RGBIC strip for 55 to 75 inch televisions, and music reactive mode.',
  14500,
  11999,
  20,
  'AUR-EL-SE-002',
  false,
  false,
  4.7,
  28,
  'published',
  '12 Months Official Brand Replacement Warranty',
  'Sealed Retail Packaging with Authenticity Certificate',
  'TCS / Leopards Courier Express across Pakistan',
  '{}'::jsonb,
  '[]'::jsonb
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  slug = EXCLUDED.slug,
  category_id = EXCLUDED.category_id,
  subcategory = EXCLUDED.subcategory,
  subcategory_slug = EXCLUDED.subcategory_slug,
  description = EXCLUDED.description,
  price = EXCLUDED.price,
  sale_price = EXCLUDED.sale_price,
  stock = EXCLUDED.stock,
  sku = EXCLUDED.sku,
  featured = EXCLUDED.featured,
  is_new = EXCLUDED.is_new,
  status = EXCLUDED.status,
  specs = EXCLUDED.specs,
  color_variants = EXCLUDED.color_variants;

INSERT INTO public.products (
  id, category_id, subcategory, subcategory_slug, name, slug, description,
  price, sale_price, stock, sku, featured, is_new, rating, review_count,
  status, warranty, packaging, shipping_info, specs, color_variants
) VALUES (
  'el-sc-01',
  'c1-electronics',
  'Storage & Connectivity',
  'storage-connectivity',
  'Ultra-Speed 2TB NVMe Portable External SSD',
  'ultra-speed-2tb-nvme-portable-external-ssd',
  'Blazing read and write speeds up to 2000MB/s over USB 3.2 Gen 2x2. Drop-resistant silicone exterior with IP55 water and dust resistance, plus 256-bit AES hardware encryption.',
  38000,
  32999,
  18,
  'AUR-EL-SC-001',
  true,
  false,
  4.9,
  67,
  'published',
  '12 Months Official Brand Replacement Warranty',
  'Sealed Retail Packaging with Authenticity Certificate',
  'TCS / Leopards Courier Express across Pakistan',
  '{}'::jsonb,
  '[{"name":"1TB Edition","hex":"#3b82f6","image_url":"https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=1000&q=80","price":24999,"sale_price":21999},{"name":"2TB Edition","hex":"#1e293b","image_url":"https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=1000&q=80","price":38000,"sale_price":32999}]'::jsonb
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  slug = EXCLUDED.slug,
  category_id = EXCLUDED.category_id,
  subcategory = EXCLUDED.subcategory,
  subcategory_slug = EXCLUDED.subcategory_slug,
  description = EXCLUDED.description,
  price = EXCLUDED.price,
  sale_price = EXCLUDED.sale_price,
  stock = EXCLUDED.stock,
  sku = EXCLUDED.sku,
  featured = EXCLUDED.featured,
  is_new = EXCLUDED.is_new,
  status = EXCLUDED.status,
  specs = EXCLUDED.specs,
  color_variants = EXCLUDED.color_variants;

INSERT INTO public.products (
  id, category_id, subcategory, subcategory_slug, name, slug, description,
  price, sale_price, stock, sku, featured, is_new, rating, review_count,
  status, warranty, packaging, shipping_info, specs, color_variants
) VALUES (
  'el-sc-02',
  'c1-electronics',
  'Storage & Connectivity',
  'storage-connectivity',
  '8-in-1 Aluminum Dual HDMI Multi-Port Hub',
  '8-in-1-aluminum-dual-hdmi-multi-port-hub',
  'Precision milled aluminum chassis featuring dual 4K@60Hz HDMI outputs, 100W USB-C Power Delivery pass-through, Gigabit Ethernet RJ45, dual USB 3.2 ports, and UHS-I SD card readers.',
  11500,
  9499,
  30,
  'AUR-EL-SC-002',
  false,
  true,
  4.8,
  45,
  'published',
  '12 Months Official Brand Replacement Warranty',
  'Sealed Retail Packaging with Authenticity Certificate',
  'TCS / Leopards Courier Express across Pakistan',
  '{}'::jsonb,
  '[]'::jsonb
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  slug = EXCLUDED.slug,
  category_id = EXCLUDED.category_id,
  subcategory = EXCLUDED.subcategory,
  subcategory_slug = EXCLUDED.subcategory_slug,
  description = EXCLUDED.description,
  price = EXCLUDED.price,
  sale_price = EXCLUDED.sale_price,
  stock = EXCLUDED.stock,
  sku = EXCLUDED.sku,
  featured = EXCLUDED.featured,
  is_new = EXCLUDED.is_new,
  status = EXCLUDED.status,
  specs = EXCLUDED.specs,
  color_variants = EXCLUDED.color_variants;

INSERT INTO public.products (
  id, category_id, subcategory, subcategory_slug, name, slug, description,
  price, sale_price, stock, sku, featured, is_new, rating, review_count,
  status, warranty, packaging, shipping_info, specs, color_variants
) VALUES (
  'el-cp-01',
  'c1-electronics',
  'Cameras & Photography',
  'cameras-photography',
  '4K Ultra-HD Compact Vlogging & Travel Camera',
  '4k-ultra-hd-compact-vlogging-camera',
  '1.0-type stacked CMOS sensor, 24-70mm f/1.8-2.8 Zeiss zoom lens, flip-up 180-degree touchscreen, directional 3-capsule mic with windscreen, and active digital image stabilization.',
  145000,
  132000,
  7,
  'AUR-EL-CP-001',
  true,
  true,
  4.9,
  24,
  'published',
  '12 Months Official Brand Replacement Warranty',
  'Sealed Retail Packaging with Authenticity Certificate',
  'TCS / Leopards Courier Express across Pakistan',
  '{}'::jsonb,
  '[]'::jsonb
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  slug = EXCLUDED.slug,
  category_id = EXCLUDED.category_id,
  subcategory = EXCLUDED.subcategory,
  subcategory_slug = EXCLUDED.subcategory_slug,
  description = EXCLUDED.description,
  price = EXCLUDED.price,
  sale_price = EXCLUDED.sale_price,
  stock = EXCLUDED.stock,
  sku = EXCLUDED.sku,
  featured = EXCLUDED.featured,
  is_new = EXCLUDED.is_new,
  status = EXCLUDED.status,
  specs = EXCLUDED.specs,
  color_variants = EXCLUDED.color_variants;

INSERT INTO public.products (
  id, category_id, subcategory, subcategory_slug, name, slug, description,
  price, sale_price, stock, sku, featured, is_new, rating, review_count,
  status, warranty, packaging, shipping_info, specs, color_variants
) VALUES (
  'el-cp-02',
  'c1-electronics',
  'Cameras & Photography',
  'cameras-photography',
  '3-Axis Handheld Smartphone Gimbal Stabilizer',
  '3-axis-handheld-smartphone-gimbal-stabilizer',
  'Professional motor torque stabilization with built-in magnetic AI face and subject tracking, 215mm telescopic extension rod, 360-degree rotation inception mode, and 10-hour battery life.',
  24999,
  21499,
  19,
  'AUR-EL-CP-002',
  false,
  false,
  4.8,
  51,
  'published',
  '12 Months Official Brand Replacement Warranty',
  'Sealed Retail Packaging with Authenticity Certificate',
  'TCS / Leopards Courier Express across Pakistan',
  '{}'::jsonb,
  '[]'::jsonb
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  slug = EXCLUDED.slug,
  category_id = EXCLUDED.category_id,
  subcategory = EXCLUDED.subcategory,
  subcategory_slug = EXCLUDED.subcategory_slug,
  description = EXCLUDED.description,
  price = EXCLUDED.price,
  sale_price = EXCLUDED.sale_price,
  stock = EXCLUDED.stock,
  sku = EXCLUDED.sku,
  featured = EXCLUDED.featured,
  is_new = EXCLUDED.is_new,
  status = EXCLUDED.status,
  specs = EXCLUDED.specs,
  color_variants = EXCLUDED.color_variants;

INSERT INTO public.products (
  id, category_id, subcategory, subcategory_slug, name, slug, description,
  price, sale_price, stock, sku, featured, is_new, rating, review_count,
  status, warranty, packaging, shipping_info, specs, color_variants
) VALUES (
  'sw-am-01',
  'c2-watches',
  'AMOLED Smart Watches',
  'amoled-smart-watches',
  'Apex Titanium Sapphire AMOLED Smartwatch',
  'apex-titanium-sapphire-amoled-smartwatch',
  'Precision aerospace titanium unibody with 2.04-inch 1200-nit sapphire crystal AMOLED touchscreen, dual-frequency GNSS navigation, ECG sensors, and 10-day battery life.',
  38999,
  32999,
  20,
  'AUR-SW-AM-001',
  true,
  true,
  4.9,
  84,
  'published',
  '12 Months Official Brand Replacement Warranty',
  'Sealed Retail Packaging with Authenticity Certificate',
  'TCS / Leopards Courier Express across Pakistan',
  '{}'::jsonb,
  '[{"name":"Natural Titanium","hex":"#94a3b8","image_url":"https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=1000&q=80","price":38999,"sale_price":32999},{"name":"DLC Space Black","hex":"#0f172a","image_url":"https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=1000&q=80","price":41999,"sale_price":35999}]'::jsonb
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  slug = EXCLUDED.slug,
  category_id = EXCLUDED.category_id,
  subcategory = EXCLUDED.subcategory,
  subcategory_slug = EXCLUDED.subcategory_slug,
  description = EXCLUDED.description,
  price = EXCLUDED.price,
  sale_price = EXCLUDED.sale_price,
  stock = EXCLUDED.stock,
  sku = EXCLUDED.sku,
  featured = EXCLUDED.featured,
  is_new = EXCLUDED.is_new,
  status = EXCLUDED.status,
  specs = EXCLUDED.specs,
  color_variants = EXCLUDED.color_variants;

INSERT INTO public.products (
  id, category_id, subcategory, subcategory_slug, name, slug, description,
  price, sale_price, stock, sku, featured, is_new, rating, review_count,
  status, warranty, packaging, shipping_info, specs, color_variants
) VALUES (
  'sw-am-02',
  'c2-watches',
  'AMOLED Smart Watches',
  'amoled-smart-watches',
  'Vanguard Curved Borderless AMOLED Smartwatch',
  'vanguard-curved-borderless-amoled-smartwatch',
  '3D curved borderless AMOLED display with always-on timekeeping, comprehensive health tracking, Bluetooth calling, and wireless magnetic charging.',
  32000,
  27999,
  25,
  'AUR-SW-AM-002',
  true,
  false,
  4.8,
  61,
  'published',
  '12 Months Official Brand Replacement Warranty',
  'Sealed Retail Packaging with Authenticity Certificate',
  'TCS / Leopards Courier Express across Pakistan',
  '{}'::jsonb,
  '[{"name":"Obsidian Black","hex":"#18181b","image_url":"https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=1000&q=80","price":32000,"sale_price":27999},{"name":"Brushed Silver","hex":"#cbd5e1","image_url":"https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=1000&q=80","price":34000,"sale_price":29999}]'::jsonb
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  slug = EXCLUDED.slug,
  category_id = EXCLUDED.category_id,
  subcategory = EXCLUDED.subcategory,
  subcategory_slug = EXCLUDED.subcategory_slug,
  description = EXCLUDED.description,
  price = EXCLUDED.price,
  sale_price = EXCLUDED.sale_price,
  stock = EXCLUDED.stock,
  sku = EXCLUDED.sku,
  featured = EXCLUDED.featured,
  is_new = EXCLUDED.is_new,
  status = EXCLUDED.status,
  specs = EXCLUDED.specs,
  color_variants = EXCLUDED.color_variants;

INSERT INTO public.products (
  id, category_id, subcategory, subcategory_slug, name, slug, description,
  price, sale_price, stock, sku, featured, is_new, rating, review_count,
  status, warranty, packaging, shipping_info, specs, color_variants
) VALUES (
  'sw-rd-01',
  'c2-watches',
  'Round-Dial Watches',
  'round-dial-watches',
  'Horizon Classic Round-Dial Leather Smartwatch',
  'horizon-classic-round-dial-leather-smartwatch',
  'Timeless circular timepiece dial with 466x466 high-resolution AMOLED display, top-grain genuine leather strap, stainless steel casing, and SpO2 oxygen monitoring.',
  25500,
  21999,
  18,
  'AUR-SW-RD-001',
  true,
  false,
  4.8,
  49,
  'published',
  '12 Months Official Brand Replacement Warranty',
  'Sealed Retail Packaging with Authenticity Certificate',
  'TCS / Leopards Courier Express across Pakistan',
  '{}'::jsonb,
  '[]'::jsonb
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  slug = EXCLUDED.slug,
  category_id = EXCLUDED.category_id,
  subcategory = EXCLUDED.subcategory,
  subcategory_slug = EXCLUDED.subcategory_slug,
  description = EXCLUDED.description,
  price = EXCLUDED.price,
  sale_price = EXCLUDED.sale_price,
  stock = EXCLUDED.stock,
  sku = EXCLUDED.sku,
  featured = EXCLUDED.featured,
  is_new = EXCLUDED.is_new,
  status = EXCLUDED.status,
  specs = EXCLUDED.specs,
  color_variants = EXCLUDED.color_variants;

INSERT INTO public.products (
  id, category_id, subcategory, subcategory_slug, name, slug, description,
  price, sale_price, stock, sku, featured, is_new, rating, review_count,
  status, warranty, packaging, shipping_info, specs, color_variants
) VALUES (
  'sw-rd-02',
  'c2-watches',
  'Round-Dial Watches',
  'round-dial-watches',
  'Chronos Ceramic Bezel Round Smartwatch',
  'chronos-ceramic-bezel-round-smartwatch',
  'High-tech zirconia ceramic circular bezel with sapphire glass, 100+ sport modes, offline music playback, and water resistance up to 50 meters (5 ATM).',
  33500,
  28499,
  14,
  'AUR-SW-RD-002',
  false,
  true,
  4.9,
  36,
  'published',
  '12 Months Official Brand Replacement Warranty',
  'Sealed Retail Packaging with Authenticity Certificate',
  'TCS / Leopards Courier Express across Pakistan',
  '{}'::jsonb,
  '[]'::jsonb
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  slug = EXCLUDED.slug,
  category_id = EXCLUDED.category_id,
  subcategory = EXCLUDED.subcategory,
  subcategory_slug = EXCLUDED.subcategory_slug,
  description = EXCLUDED.description,
  price = EXCLUDED.price,
  sale_price = EXCLUDED.sale_price,
  stock = EXCLUDED.stock,
  sku = EXCLUDED.sku,
  featured = EXCLUDED.featured,
  is_new = EXCLUDED.is_new,
  status = EXCLUDED.status,
  specs = EXCLUDED.specs,
  color_variants = EXCLUDED.color_variants;

INSERT INTO public.products (
  id, category_id, subcategory, subcategory_slug, name, slug, description,
  price, sale_price, stock, sku, featured, is_new, rating, review_count,
  status, warranty, packaging, shipping_info, specs, color_variants
) VALUES (
  'sw-ms-01',
  'c2-watches',
  'Metal Strap Watches',
  'metal-strap-watches',
  'Monarch Stainless Steel Mesh Smartwatch',
  'monarch-stainless-steel-milanese-mesh-smartwatch',
  'Magnetic adjustable stainless steel weave strap, ultra-thin 9.2mm alloy casing, crisp 1.43-inch retina display, and sleep cycle analysis.',
  29000,
  24999,
  22,
  'AUR-SW-MS-001',
  true,
  false,
  4.8,
  57,
  'published',
  '12 Months Official Brand Replacement Warranty',
  'Sealed Retail Packaging with Authenticity Certificate',
  'TCS / Leopards Courier Express across Pakistan',
  '{}'::jsonb,
  '[]'::jsonb
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  slug = EXCLUDED.slug,
  category_id = EXCLUDED.category_id,
  subcategory = EXCLUDED.subcategory,
  subcategory_slug = EXCLUDED.subcategory_slug,
  description = EXCLUDED.description,
  price = EXCLUDED.price,
  sale_price = EXCLUDED.sale_price,
  stock = EXCLUDED.stock,
  sku = EXCLUDED.sku,
  featured = EXCLUDED.featured,
  is_new = EXCLUDED.is_new,
  status = EXCLUDED.status,
  specs = EXCLUDED.specs,
  color_variants = EXCLUDED.color_variants;

INSERT INTO public.products (
  id, category_id, subcategory, subcategory_slug, name, slug, description,
  price, sale_price, stock, sku, featured, is_new, rating, review_count,
  status, warranty, packaging, shipping_info, specs, color_variants
) VALUES (
  'sw-ms-02',
  'c2-watches',
  'Metal Strap Watches',
  'metal-strap-watches',
  'Executive Solid Link Steel Bracelet Smartwatch',
  'executive-solid-link-steel-bracelet-smartwatch',
  'Solid 316L stainless steel three-link bracelet with butterfly deployment clasp, high-definition AMOLED screen, optical heart rate monitor, and NFC pass-through.',
  35000,
  29999,
  16,
  'AUR-SW-MS-002',
  false,
  true,
  4.9,
  41,
  'published',
  '12 Months Official Brand Replacement Warranty',
  'Sealed Retail Packaging with Authenticity Certificate',
  'TCS / Leopards Courier Express across Pakistan',
  '{}'::jsonb,
  '[]'::jsonb
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  slug = EXCLUDED.slug,
  category_id = EXCLUDED.category_id,
  subcategory = EXCLUDED.subcategory,
  subcategory_slug = EXCLUDED.subcategory_slug,
  description = EXCLUDED.description,
  price = EXCLUDED.price,
  sale_price = EXCLUDED.sale_price,
  stock = EXCLUDED.stock,
  sku = EXCLUDED.sku,
  featured = EXCLUDED.featured,
  is_new = EXCLUDED.is_new,
  status = EXCLUDED.status,
  specs = EXCLUDED.specs,
  color_variants = EXCLUDED.color_variants;

INSERT INTO public.products (
  id, category_id, subcategory, subcategory_slug, name, slug, description,
  price, sale_price, stock, sku, featured, is_new, rating, review_count,
  status, warranty, packaging, shipping_info, specs, color_variants
) VALUES (
  'sw-ft-01',
  'c2-watches',
  'Fitness Smartwatches',
  'fitness-smartwatches',
  'Endurance Multi-Sport GPS Fitness Smartwatch',
  'endurance-multi-sport-gps-fitness-smartwatch',
  'Advanced biometric sensors measuring VO2 Max, training load recovery metrics, integrated dual-frequency GPS route mapping, and 14-day ultra marathon battery mode.',
  22000,
  18999,
  28,
  'AUR-SW-FT-001',
  true,
  false,
  4.8,
  73,
  'published',
  '12 Months Official Brand Replacement Warranty',
  'Sealed Retail Packaging with Authenticity Certificate',
  'TCS / Leopards Courier Express across Pakistan',
  '{}'::jsonb,
  '[]'::jsonb
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  slug = EXCLUDED.slug,
  category_id = EXCLUDED.category_id,
  subcategory = EXCLUDED.subcategory,
  subcategory_slug = EXCLUDED.subcategory_slug,
  description = EXCLUDED.description,
  price = EXCLUDED.price,
  sale_price = EXCLUDED.sale_price,
  stock = EXCLUDED.stock,
  sku = EXCLUDED.sku,
  featured = EXCLUDED.featured,
  is_new = EXCLUDED.is_new,
  status = EXCLUDED.status,
  specs = EXCLUDED.specs,
  color_variants = EXCLUDED.color_variants;

INSERT INTO public.products (
  id, category_id, subcategory, subcategory_slug, name, slug, description,
  price, sale_price, stock, sku, featured, is_new, rating, review_count,
  status, warranty, packaging, shipping_info, specs, color_variants
) VALUES (
  'sw-ft-02',
  'c2-watches',
  'Fitness Smartwatches',
  'fitness-smartwatches',
  'ActivePulse 50M Waterproof Swim & Run Smartwatch',
  'activepulse-waterproof-swim-run-smartwatch',
  'Lightweight fluoroelastomer sports band, 5 ATM open water swim stroke tracking, continuous 24/7 heart rate monitoring, and automated workout detection.',
  19500,
  16499,
  32,
  'AUR-SW-FT-002',
  false,
  true,
  4.7,
  55,
  'published',
  '12 Months Official Brand Replacement Warranty',
  'Sealed Retail Packaging with Authenticity Certificate',
  'TCS / Leopards Courier Express across Pakistan',
  '{}'::jsonb,
  '[]'::jsonb
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  slug = EXCLUDED.slug,
  category_id = EXCLUDED.category_id,
  subcategory = EXCLUDED.subcategory,
  subcategory_slug = EXCLUDED.subcategory_slug,
  description = EXCLUDED.description,
  price = EXCLUDED.price,
  sale_price = EXCLUDED.sale_price,
  stock = EXCLUDED.stock,
  sku = EXCLUDED.sku,
  featured = EXCLUDED.featured,
  is_new = EXCLUDED.is_new,
  status = EXCLUDED.status,
  specs = EXCLUDED.specs,
  color_variants = EXCLUDED.color_variants;

INSERT INTO public.products (
  id, category_id, subcategory, subcategory_slug, name, slug, description,
  price, sale_price, stock, sku, featured, is_new, rating, review_count,
  status, warranty, packaging, shipping_info, specs, color_variants
) VALUES (
  'sw-mn-01',
  'c2-watches',
  'Minimal Smart Watches',
  'minimal-smart-watches',
  'Simplicity Minimalist Discrete OLED Smartwatch',
  'simplicity-minimalist-discrete-oled-smartwatch',
  'Clean Scandinavian-inspired unibody with hidden stealth OLED notification display, physical mechanical hands, and vibration alert smart connectivity.',
  17500,
  14999,
  24,
  'AUR-SW-MN-001',
  false,
  false,
  4.7,
  38,
  'published',
  '12 Months Official Brand Replacement Warranty',
  'Sealed Retail Packaging with Authenticity Certificate',
  'TCS / Leopards Courier Express across Pakistan',
  '{}'::jsonb,
  '[]'::jsonb
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  slug = EXCLUDED.slug,
  category_id = EXCLUDED.category_id,
  subcategory = EXCLUDED.subcategory,
  subcategory_slug = EXCLUDED.subcategory_slug,
  description = EXCLUDED.description,
  price = EXCLUDED.price,
  sale_price = EXCLUDED.sale_price,
  stock = EXCLUDED.stock,
  sku = EXCLUDED.sku,
  featured = EXCLUDED.featured,
  is_new = EXCLUDED.is_new,
  status = EXCLUDED.status,
  specs = EXCLUDED.specs,
  color_variants = EXCLUDED.color_variants;

INSERT INTO public.products (
  id, category_id, subcategory, subcategory_slug, name, slug, description,
  price, sale_price, stock, sku, featured, is_new, rating, review_count,
  status, warranty, packaging, shipping_info, specs, color_variants
) VALUES (
  'sw-mn-02',
  'c2-watches',
  'Minimal Smart Watches',
  'minimal-smart-watches',
  'Nordic Slimline Modern Smartwatch',
  'nordic-slimline-modern-smartwatch',
  'Ultra-thin 8.5mm anodized aluminum profile, minimalist monochrome watch faces, gentle haptic wake-up alarm, and step tracker.',
  20500,
  17999,
  20,
  'AUR-SW-MN-002',
  false,
  true,
  4.8,
  29,
  'published',
  '12 Months Official Brand Replacement Warranty',
  'Sealed Retail Packaging with Authenticity Certificate',
  'TCS / Leopards Courier Express across Pakistan',
  '{}'::jsonb,
  '[]'::jsonb
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  slug = EXCLUDED.slug,
  category_id = EXCLUDED.category_id,
  subcategory = EXCLUDED.subcategory,
  subcategory_slug = EXCLUDED.subcategory_slug,
  description = EXCLUDED.description,
  price = EXCLUDED.price,
  sale_price = EXCLUDED.sale_price,
  stock = EXCLUDED.stock,
  sku = EXCLUDED.sku,
  featured = EXCLUDED.featured,
  is_new = EXCLUDED.is_new,
  status = EXCLUDED.status,
  specs = EXCLUDED.specs,
  color_variants = EXCLUDED.color_variants;

INSERT INTO public.products (
  id, category_id, subcategory, subcategory_slug, name, slug, description,
  price, sale_price, stock, sku, featured, is_new, rating, review_count,
  status, warranty, packaging, shipping_info, specs, color_variants
) VALUES (
  'sw-st-01',
  'c2-watches',
  'Watch Straps & Bands',
  'watch-straps-bands',
  'Quick-Release Italian Saddle Leather Strap 22mm',
  'quick-release-italian-saddle-leather-strap-22mm',
  'Handcrafted top-grain cowhide leather strap with precision quick-release spring bars and brushed 316L stainless steel buckle.',
  5500,
  4499,
  50,
  'AUR-SW-ST-001',
  false,
  false,
  4.9,
  82,
  'published',
  '12 Months Official Brand Replacement Warranty',
  'Sealed Retail Packaging with Authenticity Certificate',
  'TCS / Leopards Courier Express across Pakistan',
  '{}'::jsonb,
  '[]'::jsonb
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  slug = EXCLUDED.slug,
  category_id = EXCLUDED.category_id,
  subcategory = EXCLUDED.subcategory,
  subcategory_slug = EXCLUDED.subcategory_slug,
  description = EXCLUDED.description,
  price = EXCLUDED.price,
  sale_price = EXCLUDED.sale_price,
  stock = EXCLUDED.stock,
  sku = EXCLUDED.sku,
  featured = EXCLUDED.featured,
  is_new = EXCLUDED.is_new,
  status = EXCLUDED.status,
  specs = EXCLUDED.specs,
  color_variants = EXCLUDED.color_variants;

INSERT INTO public.products (
  id, category_id, subcategory, subcategory_slug, name, slug, description,
  price, sale_price, stock, sku, featured, is_new, rating, review_count,
  status, warranty, packaging, shipping_info, specs, color_variants
) VALUES (
  'sw-st-02',
  'c2-watches',
  'Watch Straps & Bands',
  'watch-straps-bands',
  'Titanium Link Bracelet Replacement Band 22mm',
  'titanium-link-bracelet-replacement-band-22mm',
  'Ultralight grade-2 titanium link bracelet with DLC scratch-resistant coating, tool-free link adjustment mechanism, and double-fold clasp.',
  11000,
  8999,
  25,
  'AUR-SW-ST-002',
  false,
  true,
  4.8,
  47,
  'published',
  '12 Months Official Brand Replacement Warranty',
  'Sealed Retail Packaging with Authenticity Certificate',
  'TCS / Leopards Courier Express across Pakistan',
  '{}'::jsonb,
  '[]'::jsonb
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  slug = EXCLUDED.slug,
  category_id = EXCLUDED.category_id,
  subcategory = EXCLUDED.subcategory,
  subcategory_slug = EXCLUDED.subcategory_slug,
  description = EXCLUDED.description,
  price = EXCLUDED.price,
  sale_price = EXCLUDED.sale_price,
  stock = EXCLUDED.stock,
  sku = EXCLUDED.sku,
  featured = EXCLUDED.featured,
  is_new = EXCLUDED.is_new,
  status = EXCLUDED.status,
  specs = EXCLUDED.specs,
  color_variants = EXCLUDED.color_variants;

INSERT INTO public.products (
  id, category_id, subcategory, subcategory_slug, name, slug, description,
  price, sale_price, stock, sku, featured, is_new, rating, review_count,
  status, warranty, packaging, shipping_info, specs, color_variants
) VALUES (
  'f-hb-01',
  'c3-fashion',
  'Trendy Handbags',
  'trendy-handbags',
  'Verona Handcrafted Calfskin Trapeze Handbag',
  'verona-italian-calfskin-handbag',
  'Sculpted architectural silhouette hand-stitched from full-grain Italian calfskin leather with polished gold-plated brass lock and detachable shoulder strap.',
  24999,
  19999,
  18,
  'AUR-FAS-HB-001',
  true,
  true,
  4.9,
  52,
  'published',
  '12 Months Official Brand Replacement Warranty',
  'Sealed Retail Packaging with Authenticity Certificate',
  'TCS / Leopards Courier Express across Pakistan',
  '{}'::jsonb,
  '[]'::jsonb
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  slug = EXCLUDED.slug,
  category_id = EXCLUDED.category_id,
  subcategory = EXCLUDED.subcategory,
  subcategory_slug = EXCLUDED.subcategory_slug,
  description = EXCLUDED.description,
  price = EXCLUDED.price,
  sale_price = EXCLUDED.sale_price,
  stock = EXCLUDED.stock,
  sku = EXCLUDED.sku,
  featured = EXCLUDED.featured,
  is_new = EXCLUDED.is_new,
  status = EXCLUDED.status,
  specs = EXCLUDED.specs,
  color_variants = EXCLUDED.color_variants;

INSERT INTO public.products (
  id, category_id, subcategory, subcategory_slug, name, slug, description,
  price, sale_price, stock, sku, featured, is_new, rating, review_count,
  status, warranty, packaging, shipping_info, specs, color_variants
) VALUES (
  'f-hb-02',
  'c3-fashion',
  'Trendy Handbags',
  'trendy-handbags',
  'Riviera Structured Kelly Top-Handle Bag',
  'riviera-structured-kelly-top-handle-bag',
  'Classic top-handle structured handbag crafted from warm cognac textured leather with front turn-lock flap, interior zip compartment, and protective brass feet.',
  18500,
  14999,
  22,
  'AUR-FAS-HB-002',
  true,
  false,
  4.8,
  39,
  'published',
  '12 Months Official Brand Replacement Warranty',
  'Sealed Retail Packaging with Authenticity Certificate',
  'TCS / Leopards Courier Express across Pakistan',
  '{}'::jsonb,
  '[]'::jsonb
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  slug = EXCLUDED.slug,
  category_id = EXCLUDED.category_id,
  subcategory = EXCLUDED.subcategory,
  subcategory_slug = EXCLUDED.subcategory_slug,
  description = EXCLUDED.description,
  price = EXCLUDED.price,
  sale_price = EXCLUDED.sale_price,
  stock = EXCLUDED.stock,
  sku = EXCLUDED.sku,
  featured = EXCLUDED.featured,
  is_new = EXCLUDED.is_new,
  status = EXCLUDED.status,
  specs = EXCLUDED.specs,
  color_variants = EXCLUDED.color_variants;

INSERT INTO public.products (
  id, category_id, subcategory, subcategory_slug, name, slug, description,
  price, sale_price, stock, sku, featured, is_new, rating, review_count,
  status, warranty, packaging, shipping_info, specs, color_variants
) VALUES (
  'f-jw-01',
  'c3-fashion',
  'Fashion Jewellery',
  'fashion-jewellery',
  '18K Gold Plated Sculptural Paperclip Chain Necklace',
  '18k-gold-plated-sculptural-paperclip-necklace',
  'Substantial interlocking paperclip links coated in heavy 18K gold vermeil over sterling silver. Hypoallergenic, tarnish-resistant, and adjustable length from 16 to 18 inches.',
  6500,
  4999,
  35,
  'AUR-FAS-JW-001',
  true,
  true,
  4.9,
  67,
  'published',
  '12 Months Official Brand Replacement Warranty',
  'Sealed Retail Packaging with Authenticity Certificate',
  'TCS / Leopards Courier Express across Pakistan',
  '{}'::jsonb,
  '[]'::jsonb
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  slug = EXCLUDED.slug,
  category_id = EXCLUDED.category_id,
  subcategory = EXCLUDED.subcategory,
  subcategory_slug = EXCLUDED.subcategory_slug,
  description = EXCLUDED.description,
  price = EXCLUDED.price,
  sale_price = EXCLUDED.sale_price,
  stock = EXCLUDED.stock,
  sku = EXCLUDED.sku,
  featured = EXCLUDED.featured,
  is_new = EXCLUDED.is_new,
  status = EXCLUDED.status,
  specs = EXCLUDED.specs,
  color_variants = EXCLUDED.color_variants;

INSERT INTO public.products (
  id, category_id, subcategory, subcategory_slug, name, slug, description,
  price, sale_price, stock, sku, featured, is_new, rating, review_count,
  status, warranty, packaging, shipping_info, specs, color_variants
) VALUES (
  'f-jw-02',
  'c3-fashion',
  'Fashion Jewellery',
  'fashion-jewellery',
  'Chunky Twisted Croissant Hoop Earrings',
  'chunky-twisted-croissant-hoop-earrings',
  'Hollow lightweight French croissant silhouette in polished gold finish. Secure click-top clasp designed for comfortable all-day wear.',
  4500,
  3499,
  40,
  'AUR-FAS-JW-002',
  false,
  false,
  4.8,
  48,
  'published',
  '12 Months Official Brand Replacement Warranty',
  'Sealed Retail Packaging with Authenticity Certificate',
  'TCS / Leopards Courier Express across Pakistan',
  '{}'::jsonb,
  '[]'::jsonb
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  slug = EXCLUDED.slug,
  category_id = EXCLUDED.category_id,
  subcategory = EXCLUDED.subcategory,
  subcategory_slug = EXCLUDED.subcategory_slug,
  description = EXCLUDED.description,
  price = EXCLUDED.price,
  sale_price = EXCLUDED.sale_price,
  stock = EXCLUDED.stock,
  sku = EXCLUDED.sku,
  featured = EXCLUDED.featured,
  is_new = EXCLUDED.is_new,
  status = EXCLUDED.status,
  specs = EXCLUDED.specs,
  color_variants = EXCLUDED.color_variants;

INSERT INTO public.products (
  id, category_id, subcategory, subcategory_slug, name, slug, description,
  price, sale_price, stock, sku, featured, is_new, rating, review_count,
  status, warranty, packaging, shipping_info, specs, color_variants
) VALUES (
  'f-sg-01',
  'c3-fashion',
  'Sunglasses & Eyewear',
  'sunglasses-eyewear',
  'Polarized Acetate Square Sunglasses',
  'polarized-acetate-square-sunglasses',
  'Handcrafted black Italian Mazzucchelli acetate frames with polarized category 3 UV400 lenses providing high optical clarity and glare elimination.',
  7800,
  5999,
  28,
  'AUR-FAS-SG-001',
  true,
  false,
  4.8,
  61,
  'published',
  '12 Months Official Brand Replacement Warranty',
  'Sealed Retail Packaging with Authenticity Certificate',
  'TCS / Leopards Courier Express across Pakistan',
  '{}'::jsonb,
  '[]'::jsonb
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  slug = EXCLUDED.slug,
  category_id = EXCLUDED.category_id,
  subcategory = EXCLUDED.subcategory,
  subcategory_slug = EXCLUDED.subcategory_slug,
  description = EXCLUDED.description,
  price = EXCLUDED.price,
  sale_price = EXCLUDED.sale_price,
  stock = EXCLUDED.stock,
  sku = EXCLUDED.sku,
  featured = EXCLUDED.featured,
  is_new = EXCLUDED.is_new,
  status = EXCLUDED.status,
  specs = EXCLUDED.specs,
  color_variants = EXCLUDED.color_variants;

INSERT INTO public.products (
  id, category_id, subcategory, subcategory_slug, name, slug, description,
  price, sale_price, stock, sku, featured, is_new, rating, review_count,
  status, warranty, packaging, shipping_info, specs, color_variants
) VALUES (
  'f-sg-02',
  'c3-fashion',
  'Sunglasses & Eyewear',
  'sunglasses-eyewear',
  'Minimalist Rimless Titanium Aviator Sunglasses',
  'minimalist-rimless-titanium-aviator-sunglasses',
  'Featherweight Japanese beta-titanium wire temples, teardrop gradient lenses, and silicone nose pads for zero temple pressure.',
  9500,
  7499,
  20,
  'AUR-FAS-SG-002',
  false,
  true,
  4.9,
  34,
  'published',
  '12 Months Official Brand Replacement Warranty',
  'Sealed Retail Packaging with Authenticity Certificate',
  'TCS / Leopards Courier Express across Pakistan',
  '{}'::jsonb,
  '[]'::jsonb
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  slug = EXCLUDED.slug,
  category_id = EXCLUDED.category_id,
  subcategory = EXCLUDED.subcategory,
  subcategory_slug = EXCLUDED.subcategory_slug,
  description = EXCLUDED.description,
  price = EXCLUDED.price,
  sale_price = EXCLUDED.sale_price,
  stock = EXCLUDED.stock,
  sku = EXCLUDED.sku,
  featured = EXCLUDED.featured,
  is_new = EXCLUDED.is_new,
  status = EXCLUDED.status,
  specs = EXCLUDED.specs,
  color_variants = EXCLUDED.color_variants;

INSERT INTO public.products (
  id, category_id, subcategory, subcategory_slug, name, slug, description,
  price, sale_price, stock, sku, featured, is_new, rating, review_count,
  status, warranty, packaging, shipping_info, specs, color_variants
) VALUES (
  'f-fw-01',
  'c3-fashion',
  'Trendy Footwear',
  'trendy-footwear',
  'Minimalist Italian Calfskin Low-Top Sneakers',
  'minimalist-italian-calfskin-low-top-sneakers',
  'Clean monochrome silhouette crafted in soft Nappa calfskin with Margom Italian rubber cupsole and waxed cotton laces.',
  16500,
  12999,
  25,
  'AUR-FAS-FW-001',
  true,
  true,
  4.9,
  58,
  'published',
  '12 Months Official Brand Replacement Warranty',
  'Sealed Retail Packaging with Authenticity Certificate',
  'TCS / Leopards Courier Express across Pakistan',
  '{}'::jsonb,
  '[]'::jsonb
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  slug = EXCLUDED.slug,
  category_id = EXCLUDED.category_id,
  subcategory = EXCLUDED.subcategory,
  subcategory_slug = EXCLUDED.subcategory_slug,
  description = EXCLUDED.description,
  price = EXCLUDED.price,
  sale_price = EXCLUDED.sale_price,
  stock = EXCLUDED.stock,
  sku = EXCLUDED.sku,
  featured = EXCLUDED.featured,
  is_new = EXCLUDED.is_new,
  status = EXCLUDED.status,
  specs = EXCLUDED.specs,
  color_variants = EXCLUDED.color_variants;

INSERT INTO public.products (
  id, category_id, subcategory, subcategory_slug, name, slug, description,
  price, sale_price, stock, sku, featured, is_new, rating, review_count,
  status, warranty, packaging, shipping_info, specs, color_variants
) VALUES (
  'f-fw-02',
  'c3-fashion',
  'Trendy Footwear',
  'trendy-footwear',
  'Sculptural Pointed Toe Leather Mules',
  'sculptural-pointed-toe-leather-mules',
  'Sleek slip-on mules featuring an elongated pointed toe, sculpted 45mm architectural kitten heel, and cushioned footbed.',
  12500,
  9999,
  18,
  'AUR-FAS-FW-002',
  false,
  false,
  4.7,
  41,
  'published',
  '12 Months Official Brand Replacement Warranty',
  'Sealed Retail Packaging with Authenticity Certificate',
  'TCS / Leopards Courier Express across Pakistan',
  '{}'::jsonb,
  '[]'::jsonb
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  slug = EXCLUDED.slug,
  category_id = EXCLUDED.category_id,
  subcategory = EXCLUDED.subcategory,
  subcategory_slug = EXCLUDED.subcategory_slug,
  description = EXCLUDED.description,
  price = EXCLUDED.price,
  sale_price = EXCLUDED.sale_price,
  stock = EXCLUDED.stock,
  sku = EXCLUDED.sku,
  featured = EXCLUDED.featured,
  is_new = EXCLUDED.is_new,
  status = EXCLUDED.status,
  specs = EXCLUDED.specs,
  color_variants = EXCLUDED.color_variants;

INSERT INTO public.products (
  id, category_id, subcategory, subcategory_slug, name, slug, description,
  price, sale_price, stock, sku, featured, is_new, rating, review_count,
  status, warranty, packaging, shipping_info, specs, color_variants
) VALUES (
  'f-ha-01',
  'c3-fashion',
  'Hair & Fashion Accessories',
  'hair-fashion-accessories',
  '100% Pure Mulberry Silk Scarf',
  '100-pure-mulberry-silk-scarf',
  'Luxurious 19-momme pure mulberry silk square scarf (90x90cm) with hand-rolled edges and hand-illustrated botanical motif. Breathable and gentle on hair and skin.',
  6800,
  5299,
  40,
  'AUR-FAS-HA-001',
  true,
  true,
  4.9,
  46,
  'published',
  '12 Months Official Brand Replacement Warranty',
  'Sealed Retail Packaging with Authenticity Certificate',
  'TCS / Leopards Courier Express across Pakistan',
  '{}'::jsonb,
  '[]'::jsonb
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  slug = EXCLUDED.slug,
  category_id = EXCLUDED.category_id,
  subcategory = EXCLUDED.subcategory,
  subcategory_slug = EXCLUDED.subcategory_slug,
  description = EXCLUDED.description,
  price = EXCLUDED.price,
  sale_price = EXCLUDED.sale_price,
  stock = EXCLUDED.stock,
  sku = EXCLUDED.sku,
  featured = EXCLUDED.featured,
  is_new = EXCLUDED.is_new,
  status = EXCLUDED.status,
  specs = EXCLUDED.specs,
  color_variants = EXCLUDED.color_variants;

INSERT INTO public.products (
  id, category_id, subcategory, subcategory_slug, name, slug, description,
  price, sale_price, stock, sku, featured, is_new, rating, review_count,
  status, warranty, packaging, shipping_info, specs, color_variants
) VALUES (
  'f-ha-02',
  'c3-fashion',
  'Hair & Fashion Accessories',
  'hair-fashion-accessories',
  'Satin French Bow Hair Barrette Clip',
  'satin-french-bow-hair-barrette-clip',
  'Classic oversized French bow handcrafted from heavyweight duchess satin on a sturdy stainless steel automatic barrette clip.',
  2500,
  1899,
  55,
  'AUR-FAS-HA-002',
  false,
  false,
  4.8,
  33,
  'published',
  '12 Months Official Brand Replacement Warranty',
  'Sealed Retail Packaging with Authenticity Certificate',
  'TCS / Leopards Courier Express across Pakistan',
  '{}'::jsonb,
  '[]'::jsonb
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  slug = EXCLUDED.slug,
  category_id = EXCLUDED.category_id,
  subcategory = EXCLUDED.subcategory,
  subcategory_slug = EXCLUDED.subcategory_slug,
  description = EXCLUDED.description,
  price = EXCLUDED.price,
  sale_price = EXCLUDED.sale_price,
  stock = EXCLUDED.stock,
  sku = EXCLUDED.sku,
  featured = EXCLUDED.featured,
  is_new = EXCLUDED.is_new,
  status = EXCLUDED.status,
  specs = EXCLUDED.specs,
  color_variants = EXCLUDED.color_variants;

INSERT INTO public.products (
  id, category_id, subcategory, subcategory_slug, name, slug, description,
  price, sale_price, stock, sku, featured, is_new, rating, review_count,
  status, warranty, packaging, shipping_info, specs, color_variants
) VALUES (
  'f-wb-01',
  'c3-fashion',
  'Wallets & Belts',
  'wallets-belts',
  'Full-Grain Leather Slim RFID Bi-Fold Wallet',
  'full-grain-leather-slim-rfid-bi-fold-wallet',
  'Ultra-thin profile holding 8 cards, full-size currency sleeve, and RFID blocking lining encased in rich vegetable-tanned leather.',
  5800,
  4499,
  35,
  'AUR-FAS-WB-001',
  true,
  false,
  4.9,
  76,
  'published',
  '12 Months Official Brand Replacement Warranty',
  'Sealed Retail Packaging with Authenticity Certificate',
  'TCS / Leopards Courier Express across Pakistan',
  '{}'::jsonb,
  '[]'::jsonb
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  slug = EXCLUDED.slug,
  category_id = EXCLUDED.category_id,
  subcategory = EXCLUDED.subcategory,
  subcategory_slug = EXCLUDED.subcategory_slug,
  description = EXCLUDED.description,
  price = EXCLUDED.price,
  sale_price = EXCLUDED.sale_price,
  stock = EXCLUDED.stock,
  sku = EXCLUDED.sku,
  featured = EXCLUDED.featured,
  is_new = EXCLUDED.is_new,
  status = EXCLUDED.status,
  specs = EXCLUDED.specs,
  color_variants = EXCLUDED.color_variants;

INSERT INTO public.products (
  id, category_id, subcategory, subcategory_slug, name, slug, description,
  price, sale_price, stock, sku, featured, is_new, rating, review_count,
  status, warranty, packaging, shipping_info, specs, color_variants
) VALUES (
  'f-wb-02',
  'c3-fashion',
  'Wallets & Belts',
  'wallets-belts',
  'Reversible Full-Grain Leather Dress Belt',
  'reversible-full-grain-leather-dress-belt',
  'Double-sided strap (Black / Cognac Brown) with 360-degree twist buckle in brushed gunmetal finish. Cut from 35mm wide vegetable-tanned leather.',
  4800,
  3899,
  30,
  'AUR-FAS-WB-002',
  false,
  true,
  4.8,
  42,
  'published',
  '12 Months Official Brand Replacement Warranty',
  'Sealed Retail Packaging with Authenticity Certificate',
  'TCS / Leopards Courier Express across Pakistan',
  '{}'::jsonb,
  '[]'::jsonb
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  slug = EXCLUDED.slug,
  category_id = EXCLUDED.category_id,
  subcategory = EXCLUDED.subcategory,
  subcategory_slug = EXCLUDED.subcategory_slug,
  description = EXCLUDED.description,
  price = EXCLUDED.price,
  sale_price = EXCLUDED.sale_price,
  stock = EXCLUDED.stock,
  sku = EXCLUDED.sku,
  featured = EXCLUDED.featured,
  is_new = EXCLUDED.is_new,
  status = EXCLUDED.status,
  specs = EXCLUDED.specs,
  color_variants = EXCLUDED.color_variants;

INSERT INTO public.products (
  id, category_id, subcategory, subcategory_slug, name, slug, description,
  price, sale_price, stock, sku, featured, is_new, rating, review_count,
  status, warranty, packaging, shipping_info, specs, color_variants
) VALUES (
  'bt-sk-01',
  'c4-beauty',
  'Skincare',
  'skincare',
  'Luminance Vitamin C & Radiance Brightening Elixir',
  'luminance-vitamin-c-radiance-elixir',
  'High-potency 15% THD Ascorbate Vitamin C stabilized with pure colloidal suspension, ferulic acid, and plant squalane to fade dark spots and restore radiant glow.',
  5499,
  4499,
  75,
  'AUR-BT-SK-001',
  true,
  true,
  4.9,
  142,
  'published',
  '12 Months Official Brand Replacement Warranty',
  'Sealed Retail Packaging with Authenticity Certificate',
  'TCS / Leopards Courier Express across Pakistan',
  '{}'::jsonb,
  '[{"name":"30ml Dropper Bottle","hex":"#f59e0b","image_url":"https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?w=1000&q=80","price":5499,"sale_price":4499},{"name":"50ml Deluxe Bottle","hex":"#d97706","image_url":"https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=1000&q=80","price":6999,"sale_price":5999}]'::jsonb
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  slug = EXCLUDED.slug,
  category_id = EXCLUDED.category_id,
  subcategory = EXCLUDED.subcategory,
  subcategory_slug = EXCLUDED.subcategory_slug,
  description = EXCLUDED.description,
  price = EXCLUDED.price,
  sale_price = EXCLUDED.sale_price,
  stock = EXCLUDED.stock,
  sku = EXCLUDED.sku,
  featured = EXCLUDED.featured,
  is_new = EXCLUDED.is_new,
  status = EXCLUDED.status,
  specs = EXCLUDED.specs,
  color_variants = EXCLUDED.color_variants;

INSERT INTO public.products (
  id, category_id, subcategory, subcategory_slug, name, slug, description,
  price, sale_price, stock, sku, featured, is_new, rating, review_count,
  status, warranty, packaging, shipping_info, specs, color_variants
) VALUES (
  'bt-sk-02',
  'c4-beauty',
  'Skincare',
  'skincare',
  'Hyaluronic Moisture Plump Multi-Depth Gel 50ml',
  'hyaluronic-moisture-plump-gel',
  'Triple-molecular-weight hyaluronic acid complex paired with soothing centella asiatica and ceramides to lock in 72-hour deep epidermal hydration.',
  4200,
  3499,
  60,
  'AUR-BT-SK-002',
  false,
  false,
  4.8,
  89,
  'published',
  '12 Months Official Brand Replacement Warranty',
  'Sealed Retail Packaging with Authenticity Certificate',
  'TCS / Leopards Courier Express across Pakistan',
  '{}'::jsonb,
  '[]'::jsonb
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  slug = EXCLUDED.slug,
  category_id = EXCLUDED.category_id,
  subcategory = EXCLUDED.subcategory,
  subcategory_slug = EXCLUDED.subcategory_slug,
  description = EXCLUDED.description,
  price = EXCLUDED.price,
  sale_price = EXCLUDED.sale_price,
  stock = EXCLUDED.stock,
  sku = EXCLUDED.sku,
  featured = EXCLUDED.featured,
  is_new = EXCLUDED.is_new,
  status = EXCLUDED.status,
  specs = EXCLUDED.specs,
  color_variants = EXCLUDED.color_variants;

INSERT INTO public.products (
  id, category_id, subcategory, subcategory_slug, name, slug, description,
  price, sale_price, stock, sku, featured, is_new, rating, review_count,
  status, warranty, packaging, shipping_info, specs, color_variants
) VALUES (
  'bt-mu-01',
  'c4-beauty',
  'Makeup',
  'makeup',
  'Velvet Matte Long-Wear Lip Tint',
  'velvet-matte-long-wear-lip-tint',
  'Featherlight blurred-matte liquid lip formulation infused with vitamin E and jojoba oil. Non-drying, smudge-resistant 12-hour wear.',
  3200,
  2499,
  50,
  'AUR-BT-MU-001',
  true,
  true,
  4.8,
  67,
  'published',
  '12 Months Official Brand Replacement Warranty',
  'Sealed Retail Packaging with Authenticity Certificate',
  'TCS / Leopards Courier Express across Pakistan',
  '{}'::jsonb,
  '[{"name":"Deep Berry","hex":"#831843","image_url":"https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=1000&q=80","price":3200,"sale_price":2499},{"name":"Rosewood Coral","hex":"#be123c","image_url":"https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=1000&q=80","price":3600,"sale_price":2899}]'::jsonb
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  slug = EXCLUDED.slug,
  category_id = EXCLUDED.category_id,
  subcategory = EXCLUDED.subcategory,
  subcategory_slug = EXCLUDED.subcategory_slug,
  description = EXCLUDED.description,
  price = EXCLUDED.price,
  sale_price = EXCLUDED.sale_price,
  stock = EXCLUDED.stock,
  sku = EXCLUDED.sku,
  featured = EXCLUDED.featured,
  is_new = EXCLUDED.is_new,
  status = EXCLUDED.status,
  specs = EXCLUDED.specs,
  color_variants = EXCLUDED.color_variants;

INSERT INTO public.products (
  id, category_id, subcategory, subcategory_slug, name, slug, description,
  price, sale_price, stock, sku, featured, is_new, rating, review_count,
  status, warranty, packaging, shipping_info, specs, color_variants
) VALUES (
  'bt-mu-02',
  'c4-beauty',
  'Makeup',
  'makeup',
  'Luminous Dew Liquid Highlighter 30ml',
  'luminous-dew-liquid-highlighter',
  'Micro-refined pearlescent particles suspended in a weightless botanical serum to give cheekbones and collarbones a lit-from-within glass-skin radiance.',
  3800,
  2999,
  45,
  'AUR-BT-MU-002',
  false,
  false,
  4.9,
  53,
  'published',
  '12 Months Official Brand Replacement Warranty',
  'Sealed Retail Packaging with Authenticity Certificate',
  'TCS / Leopards Courier Express across Pakistan',
  '{}'::jsonb,
  '[]'::jsonb
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  slug = EXCLUDED.slug,
  category_id = EXCLUDED.category_id,
  subcategory = EXCLUDED.subcategory,
  subcategory_slug = EXCLUDED.subcategory_slug,
  description = EXCLUDED.description,
  price = EXCLUDED.price,
  sale_price = EXCLUDED.sale_price,
  stock = EXCLUDED.stock,
  sku = EXCLUDED.sku,
  featured = EXCLUDED.featured,
  is_new = EXCLUDED.is_new,
  status = EXCLUDED.status,
  specs = EXCLUDED.specs,
  color_variants = EXCLUDED.color_variants;

INSERT INTO public.products (
  id, category_id, subcategory, subcategory_slug, name, slug, description,
  price, sale_price, stock, sku, featured, is_new, rating, review_count,
  status, warranty, packaging, shipping_info, specs, color_variants
) VALUES (
  'bt-fb-01',
  'c4-beauty',
  'Face & Body Care',
  'face-body-care',
  'Ultra-Hydrating Botanical Shea Body Butter 250g',
  'ultra-hydrating-botanical-body-butter',
  'Raw unrefined African shea butter whipped with cold-pressed sweet almond oil and Moroccan argan essence. Deeply melts into dry skin without greasy residue.',
  4200,
  3299,
  40,
  'AUR-BT-FB-001',
  true,
  false,
  4.8,
  76,
  'published',
  '12 Months Official Brand Replacement Warranty',
  'Sealed Retail Packaging with Authenticity Certificate',
  'TCS / Leopards Courier Express across Pakistan',
  '{}'::jsonb,
  '[]'::jsonb
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  slug = EXCLUDED.slug,
  category_id = EXCLUDED.category_id,
  subcategory = EXCLUDED.subcategory,
  subcategory_slug = EXCLUDED.subcategory_slug,
  description = EXCLUDED.description,
  price = EXCLUDED.price,
  sale_price = EXCLUDED.sale_price,
  stock = EXCLUDED.stock,
  sku = EXCLUDED.sku,
  featured = EXCLUDED.featured,
  is_new = EXCLUDED.is_new,
  status = EXCLUDED.status,
  specs = EXCLUDED.specs,
  color_variants = EXCLUDED.color_variants;

INSERT INTO public.products (
  id, category_id, subcategory, subcategory_slug, name, slug, description,
  price, sale_price, stock, sku, featured, is_new, rating, review_count,
  status, warranty, packaging, shipping_info, specs, color_variants
) VALUES (
  'bt-fb-02',
  'c4-beauty',
  'Face & Body Care',
  'face-body-care',
  'Exfoliating Arabica Coffee & Cane Sugar Body Scrub 200g',
  'exfoliating-arabica-coffee-body-scrub',
  'Artisan roasted Arabica grounds blended with organic Demerara raw sugar and nourishing coconut oil to polish away dead cells and stimulate circulation.',
  3500,
  2699,
  35,
  'AUR-BT-FB-002',
  false,
  true,
  4.7,
  44,
  'published',
  '12 Months Official Brand Replacement Warranty',
  'Sealed Retail Packaging with Authenticity Certificate',
  'TCS / Leopards Courier Express across Pakistan',
  '{}'::jsonb,
  '[]'::jsonb
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  slug = EXCLUDED.slug,
  category_id = EXCLUDED.category_id,
  subcategory = EXCLUDED.subcategory,
  subcategory_slug = EXCLUDED.subcategory_slug,
  description = EXCLUDED.description,
  price = EXCLUDED.price,
  sale_price = EXCLUDED.sale_price,
  stock = EXCLUDED.stock,
  sku = EXCLUDED.sku,
  featured = EXCLUDED.featured,
  is_new = EXCLUDED.is_new,
  status = EXCLUDED.status,
  specs = EXCLUDED.specs,
  color_variants = EXCLUDED.color_variants;

INSERT INTO public.products (
  id, category_id, subcategory, subcategory_slug, name, slug, description,
  price, sale_price, stock, sku, featured, is_new, rating, review_count,
  status, warranty, packaging, shipping_info, specs, color_variants
) VALUES (
  'bt-hc-01',
  'c4-beauty',
  'Hair Care',
  'hair-care',
  'Argan Oil Deep Repair Hair Conditioning Mask 200ml',
  'argan-oil-deep-repair-hair-mask',
  'Enriched with cold-pressed Moroccan argan oil and hydrolysed keratin to intensely hydrate brittle strands, tame frizz, and seal damaged cuticles.',
  4500,
  3499,
  45,
  'AUR-BT-HC-001',
  true,
  false,
  4.9,
  98,
  'published',
  '12 Months Official Brand Replacement Warranty',
  'Sealed Retail Packaging with Authenticity Certificate',
  'TCS / Leopards Courier Express across Pakistan',
  '{}'::jsonb,
  '[]'::jsonb
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  slug = EXCLUDED.slug,
  category_id = EXCLUDED.category_id,
  subcategory = EXCLUDED.subcategory,
  subcategory_slug = EXCLUDED.subcategory_slug,
  description = EXCLUDED.description,
  price = EXCLUDED.price,
  sale_price = EXCLUDED.sale_price,
  stock = EXCLUDED.stock,
  sku = EXCLUDED.sku,
  featured = EXCLUDED.featured,
  is_new = EXCLUDED.is_new,
  status = EXCLUDED.status,
  specs = EXCLUDED.specs,
  color_variants = EXCLUDED.color_variants;

INSERT INTO public.products (
  id, category_id, subcategory, subcategory_slug, name, slug, description,
  price, sale_price, stock, sku, featured, is_new, rating, review_count,
  status, warranty, packaging, shipping_info, specs, color_variants
) VALUES (
  'bt-hc-02',
  'c4-beauty',
  'Hair Care',
  'hair-care',
  'Silk Peptide Thermal Protection Weightless Hair Mist 150ml',
  'silk-peptide-thermal-protection-hair-mist',
  'Shields hair follicles against heat styling up to 230°C (450°F) while infusing weightless silk amino acids for a mirror-like high-gloss finish.',
  3500,
  2799,
  50,
  'AUR-BT-HC-002',
  false,
  true,
  4.8,
  51,
  'published',
  '12 Months Official Brand Replacement Warranty',
  'Sealed Retail Packaging with Authenticity Certificate',
  'TCS / Leopards Courier Express across Pakistan',
  '{}'::jsonb,
  '[]'::jsonb
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  slug = EXCLUDED.slug,
  category_id = EXCLUDED.category_id,
  subcategory = EXCLUDED.subcategory,
  subcategory_slug = EXCLUDED.subcategory_slug,
  description = EXCLUDED.description,
  price = EXCLUDED.price,
  sale_price = EXCLUDED.sale_price,
  stock = EXCLUDED.stock,
  sku = EXCLUDED.sku,
  featured = EXCLUDED.featured,
  is_new = EXCLUDED.is_new,
  status = EXCLUDED.status,
  specs = EXCLUDED.specs,
  color_variants = EXCLUDED.color_variants;

INSERT INTO public.products (
  id, category_id, subcategory, subcategory_slug, name, slug, description,
  price, sale_price, stock, sku, featured, is_new, rating, review_count,
  status, warranty, packaging, shipping_info, specs, color_variants
) VALUES (
  'bt-bt-01',
  'c4-beauty',
  'Beauty Tools',
  'beauty-tools',
  'Rose Quartz Facial Sculpting Roller & Gua Sha Set',
  'rose-quartz-facial-roller-gua-sha-set',
  '100% natural Grade-A crystalline rose quartz stone hand-carved to contour cheekbones, drain lymphatic fluids, and ease facial muscle tension.',
  4999,
  3899,
  35,
  'AUR-BT-BT-001',
  true,
  false,
  4.9,
  112,
  'published',
  '12 Months Official Brand Replacement Warranty',
  'Sealed Retail Packaging with Authenticity Certificate',
  'TCS / Leopards Courier Express across Pakistan',
  '{}'::jsonb,
  '[]'::jsonb
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  slug = EXCLUDED.slug,
  category_id = EXCLUDED.category_id,
  subcategory = EXCLUDED.subcategory,
  subcategory_slug = EXCLUDED.subcategory_slug,
  description = EXCLUDED.description,
  price = EXCLUDED.price,
  sale_price = EXCLUDED.sale_price,
  stock = EXCLUDED.stock,
  sku = EXCLUDED.sku,
  featured = EXCLUDED.featured,
  is_new = EXCLUDED.is_new,
  status = EXCLUDED.status,
  specs = EXCLUDED.specs,
  color_variants = EXCLUDED.color_variants;

INSERT INTO public.products (
  id, category_id, subcategory, subcategory_slug, name, slug, description,
  price, sale_price, stock, sku, featured, is_new, rating, review_count,
  status, warranty, packaging, shipping_info, specs, color_variants
) VALUES (
  'bt-bt-02',
  'c4-beauty',
  'Beauty Tools',
  'beauty-tools',
  'Sonic Deep-Pore Silicone Facial Cleansing Device',
  'sonic-deep-pore-silicone-facial-cleansing-device',
  'Ultra-hygienic surgical-grade silicone bristles with 8000 T-Sonic pulsations per minute. IPX7 100% waterproof design with 8 adjustable intensity levels.',
  6500,
  4999,
  28,
  'AUR-BT-BT-002',
  false,
  true,
  4.8,
  63,
  'published',
  '12 Months Official Brand Replacement Warranty',
  'Sealed Retail Packaging with Authenticity Certificate',
  'TCS / Leopards Courier Express across Pakistan',
  '{}'::jsonb,
  '[]'::jsonb
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  slug = EXCLUDED.slug,
  category_id = EXCLUDED.category_id,
  subcategory = EXCLUDED.subcategory,
  subcategory_slug = EXCLUDED.subcategory_slug,
  description = EXCLUDED.description,
  price = EXCLUDED.price,
  sale_price = EXCLUDED.sale_price,
  stock = EXCLUDED.stock,
  sku = EXCLUDED.sku,
  featured = EXCLUDED.featured,
  is_new = EXCLUDED.is_new,
  status = EXCLUDED.status,
  specs = EXCLUDED.specs,
  color_variants = EXCLUDED.color_variants;

INSERT INTO public.products (
  id, category_id, subcategory, subcategory_slug, name, slug, description,
  price, sale_price, stock, sku, featured, is_new, rating, review_count,
  status, warranty, packaging, shipping_info, specs, color_variants
) VALUES (
  'bt-fp-01',
  'c4-beauty',
  'Fragrance & Personal Care',
  'fragrance-personal-care',
  'Santal & Bergamot Artisan Perfume 100ml',
  'eau-de-parfum-santal-bergamot',
  'An elegant composition opening with crisp Calabrian bergamot and cardamon, settling into Australian sandalwood, cedarwood, and warm amber resin.',
  11500,
  8999,
  20,
  'AUR-BT-FP-001',
  true,
  true,
  4.9,
  81,
  'published',
  '12 Months Official Brand Replacement Warranty',
  'Sealed Retail Packaging with Authenticity Certificate',
  'TCS / Leopards Courier Express across Pakistan',
  '{}'::jsonb,
  '[]'::jsonb
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  slug = EXCLUDED.slug,
  category_id = EXCLUDED.category_id,
  subcategory = EXCLUDED.subcategory,
  subcategory_slug = EXCLUDED.subcategory_slug,
  description = EXCLUDED.description,
  price = EXCLUDED.price,
  sale_price = EXCLUDED.sale_price,
  stock = EXCLUDED.stock,
  sku = EXCLUDED.sku,
  featured = EXCLUDED.featured,
  is_new = EXCLUDED.is_new,
  status = EXCLUDED.status,
  specs = EXCLUDED.specs,
  color_variants = EXCLUDED.color_variants;

INSERT INTO public.products (
  id, category_id, subcategory, subcategory_slug, name, slug, description,
  price, sale_price, stock, sku, featured, is_new, rating, review_count,
  status, warranty, packaging, shipping_info, specs, color_variants
) VALUES (
  'bt-fp-02',
  'c4-beauty',
  'Fragrance & Personal Care',
  'fragrance-personal-care',
  'Midnight Amber Concentrated Artisan Perfume Oil 12ml',
  'amber-noir-concentrated-perfume-oil',
  'Alcohol-free 100% concentrated attar oil with golden rollerball applicator. Notes of dark Indonesian patchouli, smoked vanilla bean, and rich labdanum.',
  5800,
  4500,
  35,
  'AUR-BT-FP-002',
  false,
  false,
  4.8,
  49,
  'published',
  '12 Months Official Brand Replacement Warranty',
  'Sealed Retail Packaging with Authenticity Certificate',
  'TCS / Leopards Courier Express across Pakistan',
  '{}'::jsonb,
  '[]'::jsonb
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  slug = EXCLUDED.slug,
  category_id = EXCLUDED.category_id,
  subcategory = EXCLUDED.subcategory,
  subcategory_slug = EXCLUDED.subcategory_slug,
  description = EXCLUDED.description,
  price = EXCLUDED.price,
  sale_price = EXCLUDED.sale_price,
  stock = EXCLUDED.stock,
  sku = EXCLUDED.sku,
  featured = EXCLUDED.featured,
  is_new = EXCLUDED.is_new,
  status = EXCLUDED.status,
  specs = EXCLUDED.specs,
  color_variants = EXCLUDED.color_variants;

INSERT INTO public.products (
  id, category_id, subcategory, subcategory_slug, name, slug, description,
  price, sale_price, stock, sku, featured, is_new, rating, review_count,
  status, warranty, packaging, shipping_info, specs, color_variants
) VALUES (
  'hm-md-01',
  'c5-home',
  'Modern Home Decor',
  'modern-home-decor',
  'Ceramic Sculptural Donut Vase',
  'ceramic-sculptural-donut-vase',
  'Contemporary circular hollow silhouette hand-thrown from textured unglazed stoneware. An architectural statement centerpiece for dried florals or standalone display.',
  6800,
  5299,
  35,
  'AUR-HM-MD-001',
  true,
  true,
  4.9,
  58,
  'published',
  '12 Months Official Brand Replacement Warranty',
  'Sealed Retail Packaging with Authenticity Certificate',
  'TCS / Leopards Courier Express across Pakistan',
  '{}'::jsonb,
  '[]'::jsonb
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  slug = EXCLUDED.slug,
  category_id = EXCLUDED.category_id,
  subcategory = EXCLUDED.subcategory,
  subcategory_slug = EXCLUDED.subcategory_slug,
  description = EXCLUDED.description,
  price = EXCLUDED.price,
  sale_price = EXCLUDED.sale_price,
  stock = EXCLUDED.stock,
  sku = EXCLUDED.sku,
  featured = EXCLUDED.featured,
  is_new = EXCLUDED.is_new,
  status = EXCLUDED.status,
  specs = EXCLUDED.specs,
  color_variants = EXCLUDED.color_variants;

INSERT INTO public.products (
  id, category_id, subcategory, subcategory_slug, name, slug, description,
  price, sale_price, stock, sku, featured, is_new, rating, review_count,
  status, warranty, packaging, shipping_info, specs, color_variants
) VALUES (
  'hm-md-02',
  'c5-home',
  'Modern Home Decor',
  'modern-home-decor',
  'Arched Brass Minimalist Floor Mirror',
  'arched-brass-minimalist-floor-mirror',
  'Cathedral arch profile bordered by a slender hand-polished solid brass frame with anti-shatter explosion-proof HD silver glass.',
  24500,
  19999,
  14,
  'AUR-HM-MD-002',
  false,
  false,
  4.8,
  36,
  'published',
  '12 Months Official Brand Replacement Warranty',
  'Sealed Retail Packaging with Authenticity Certificate',
  'TCS / Leopards Courier Express across Pakistan',
  '{}'::jsonb,
  '[]'::jsonb
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  slug = EXCLUDED.slug,
  category_id = EXCLUDED.category_id,
  subcategory = EXCLUDED.subcategory,
  subcategory_slug = EXCLUDED.subcategory_slug,
  description = EXCLUDED.description,
  price = EXCLUDED.price,
  sale_price = EXCLUDED.sale_price,
  stock = EXCLUDED.stock,
  sku = EXCLUDED.sku,
  featured = EXCLUDED.featured,
  is_new = EXCLUDED.is_new,
  status = EXCLUDED.status,
  specs = EXCLUDED.specs,
  color_variants = EXCLUDED.color_variants;

INSERT INTO public.products (
  id, category_id, subcategory, subcategory_slug, name, slug, description,
  price, sale_price, stock, sku, featured, is_new, rating, review_count,
  status, warranty, packaging, shipping_info, specs, color_variants
) VALUES (
  'hm-al-01',
  'c5-home',
  'Ambient Lighting',
  'ambient-lighting',
  'Cordless Rechargeable Mushroom Table Lamp',
  'cordless-rechargeable-mushroom-table-lamp',
  'Spun aluminum dome silhouette with 3-stage touch-dimming warm LED lighting. Built-in 4000mAh battery providing up to 18 hours of cordless ambient glow.',
  8500,
  6999,
  40,
  'AUR-HM-AL-001',
  true,
  true,
  4.9,
  72,
  'published',
  '12 Months Official Brand Replacement Warranty',
  'Sealed Retail Packaging with Authenticity Certificate',
  'TCS / Leopards Courier Express across Pakistan',
  '{}'::jsonb,
  '[]'::jsonb
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  slug = EXCLUDED.slug,
  category_id = EXCLUDED.category_id,
  subcategory = EXCLUDED.subcategory,
  subcategory_slug = EXCLUDED.subcategory_slug,
  description = EXCLUDED.description,
  price = EXCLUDED.price,
  sale_price = EXCLUDED.sale_price,
  stock = EXCLUDED.stock,
  sku = EXCLUDED.sku,
  featured = EXCLUDED.featured,
  is_new = EXCLUDED.is_new,
  status = EXCLUDED.status,
  specs = EXCLUDED.specs,
  color_variants = EXCLUDED.color_variants;

INSERT INTO public.products (
  id, category_id, subcategory, subcategory_slug, name, slug, description,
  price, sale_price, stock, sku, featured, is_new, rating, review_count,
  status, warranty, packaging, shipping_info, specs, color_variants
) VALUES (
  'hm-al-02',
  'c5-home',
  'Ambient Lighting',
  'ambient-lighting',
  'Sunset Projection Halo Mood Lamp',
  'sunset-projection-halo-mood-lamp',
  'Precision optical crystal lens casting a rich chromatic sunset aesthetic across walls and ceilings with 360-degree rotating iron base.',
  4900,
  3899,
  50,
  'AUR-HM-AL-002',
  false,
  false,
  4.7,
  65,
  'published',
  '12 Months Official Brand Replacement Warranty',
  'Sealed Retail Packaging with Authenticity Certificate',
  'TCS / Leopards Courier Express across Pakistan',
  '{}'::jsonb,
  '[]'::jsonb
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  slug = EXCLUDED.slug,
  category_id = EXCLUDED.category_id,
  subcategory = EXCLUDED.subcategory,
  subcategory_slug = EXCLUDED.subcategory_slug,
  description = EXCLUDED.description,
  price = EXCLUDED.price,
  sale_price = EXCLUDED.sale_price,
  stock = EXCLUDED.stock,
  sku = EXCLUDED.sku,
  featured = EXCLUDED.featured,
  is_new = EXCLUDED.is_new,
  status = EXCLUDED.status,
  specs = EXCLUDED.specs,
  color_variants = EXCLUDED.color_variants;

INSERT INTO public.products (
  id, category_id, subcategory, subcategory_slug, name, slug, description,
  price, sale_price, stock, sku, featured, is_new, rating, review_count,
  status, warranty, packaging, shipping_info, specs, color_variants
) VALUES (
  'hm-be-01',
  'c5-home',
  'Bedroom Essentials',
  'bedroom-essentials',
  'Washed Natural Linen Duvet Cover Set',
  'washed-french-linen-duvet-cover-set',
  'Woven from 100% natural Normandy flax, pre-washed for effortless softness. Thermoregulating, breathable, and includes duvet cover plus 2 king pillow shams.',
  18500,
  14999,
  20,
  'AUR-HM-BE-001',
  true,
  false,
  4.9,
  83,
  'published',
  '12 Months Official Brand Replacement Warranty',
  'Sealed Retail Packaging with Authenticity Certificate',
  'TCS / Leopards Courier Express across Pakistan',
  '{}'::jsonb,
  '[]'::jsonb
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  slug = EXCLUDED.slug,
  category_id = EXCLUDED.category_id,
  subcategory = EXCLUDED.subcategory,
  subcategory_slug = EXCLUDED.subcategory_slug,
  description = EXCLUDED.description,
  price = EXCLUDED.price,
  sale_price = EXCLUDED.sale_price,
  stock = EXCLUDED.stock,
  sku = EXCLUDED.sku,
  featured = EXCLUDED.featured,
  is_new = EXCLUDED.is_new,
  status = EXCLUDED.status,
  specs = EXCLUDED.specs,
  color_variants = EXCLUDED.color_variants;

INSERT INTO public.products (
  id, category_id, subcategory, subcategory_slug, name, slug, description,
  price, sale_price, stock, sku, featured, is_new, rating, review_count,
  status, warranty, packaging, shipping_info, specs, color_variants
) VALUES (
  'hm-be-02',
  'c5-home',
  'Bedroom Essentials',
  'bedroom-essentials',
  'Weighted Bamboo Cooling Blanket 7kg',
  'weighted-bamboo-cooling-blanket-7kg',
  'Silky 300TC organic bamboo viscose fabric filled with micro-glass beads in quilted pockets to deliver soothing pressure and restful sleep without trapping heat.',
  14000,
  11499,
  25,
  'AUR-HM-BE-002',
  false,
  true,
  4.8,
  47,
  'published',
  '12 Months Official Brand Replacement Warranty',
  'Sealed Retail Packaging with Authenticity Certificate',
  'TCS / Leopards Courier Express across Pakistan',
  '{}'::jsonb,
  '[]'::jsonb
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  slug = EXCLUDED.slug,
  category_id = EXCLUDED.category_id,
  subcategory = EXCLUDED.subcategory,
  subcategory_slug = EXCLUDED.subcategory_slug,
  description = EXCLUDED.description,
  price = EXCLUDED.price,
  sale_price = EXCLUDED.sale_price,
  stock = EXCLUDED.stock,
  sku = EXCLUDED.sku,
  featured = EXCLUDED.featured,
  is_new = EXCLUDED.is_new,
  status = EXCLUDED.status,
  specs = EXCLUDED.specs,
  color_variants = EXCLUDED.color_variants;

INSERT INTO public.products (
  id, category_id, subcategory, subcategory_slug, name, slug, description,
  price, sale_price, stock, sku, featured, is_new, rating, review_count,
  status, warranty, packaging, shipping_info, specs, color_variants
) VALUES (
  'hm-kd-01',
  'c5-home',
  'Kitchen & Dining',
  'kitchen-dining',
  'Matte Ceramic 12-Piece Dinnerware Set',
  'matte-ceramic-12-piece-dinnerware-set',
  'Modern organic rimmed dinnerware set crafted from high-fired chip-resistant stoneware. Service for 4 including dinner plates, salad plates, and cereal bowls.',
  19500,
  16500,
  18,
  'AUR-HM-KD-001',
  true,
  false,
  4.9,
  56,
  'published',
  '12 Months Official Brand Replacement Warranty',
  'Sealed Retail Packaging with Authenticity Certificate',
  'TCS / Leopards Courier Express across Pakistan',
  '{}'::jsonb,
  '[]'::jsonb
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  slug = EXCLUDED.slug,
  category_id = EXCLUDED.category_id,
  subcategory = EXCLUDED.subcategory,
  subcategory_slug = EXCLUDED.subcategory_slug,
  description = EXCLUDED.description,
  price = EXCLUDED.price,
  sale_price = EXCLUDED.sale_price,
  stock = EXCLUDED.stock,
  sku = EXCLUDED.sku,
  featured = EXCLUDED.featured,
  is_new = EXCLUDED.is_new,
  status = EXCLUDED.status,
  specs = EXCLUDED.specs,
  color_variants = EXCLUDED.color_variants;

INSERT INTO public.products (
  id, category_id, subcategory, subcategory_slug, name, slug, description,
  price, sale_price, stock, sku, featured, is_new, rating, review_count,
  status, warranty, packaging, shipping_info, specs, color_variants
) VALUES (
  'hm-kd-02',
  'c5-home',
  'Kitchen & Dining',
  'kitchen-dining',
  'Double-Wall Borosilicate Coffee Glasses Set of 4',
  'double-wall-borosilicate-coffee-glasses-set-of-4',
  'Mouth-blown heat-resistant borosilicate glass with insulating thermal air pocket. Keeps coffee piping hot on the inside while remaining cool to the touch.',
  4500,
  3499,
  40,
  'AUR-HM-KD-002',
  false,
  true,
  4.8,
  69,
  'published',
  '12 Months Official Brand Replacement Warranty',
  'Sealed Retail Packaging with Authenticity Certificate',
  'TCS / Leopards Courier Express across Pakistan',
  '{}'::jsonb,
  '[]'::jsonb
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  slug = EXCLUDED.slug,
  category_id = EXCLUDED.category_id,
  subcategory = EXCLUDED.subcategory,
  subcategory_slug = EXCLUDED.subcategory_slug,
  description = EXCLUDED.description,
  price = EXCLUDED.price,
  sale_price = EXCLUDED.sale_price,
  stock = EXCLUDED.stock,
  sku = EXCLUDED.sku,
  featured = EXCLUDED.featured,
  is_new = EXCLUDED.is_new,
  status = EXCLUDED.status,
  specs = EXCLUDED.specs,
  color_variants = EXCLUDED.color_variants;

INSERT INTO public.products (
  id, category_id, subcategory, subcategory_slug, name, slug, description,
  price, sale_price, stock, sku, featured, is_new, rating, review_count,
  status, warranty, packaging, shipping_info, specs, color_variants
) VALUES (
  'hm-ba-01',
  'c5-home',
  'Bathroom Accessories',
  'bathroom-accessories',
  'Natural Bamboo Bathtub Caddy Tray',
  'natural-bamboo-bathtub-caddy-tray',
  'Expandable water-resistant Moso bamboo caddy extending up to 105cm. Features dedicated book/tablet prop, wine glass groove, and accessory holder.',
  5900,
  4899,
  30,
  'AUR-HM-BA-001',
  true,
  false,
  4.8,
  43,
  'published',
  '12 Months Official Brand Replacement Warranty',
  'Sealed Retail Packaging with Authenticity Certificate',
  'TCS / Leopards Courier Express across Pakistan',
  '{}'::jsonb,
  '[]'::jsonb
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  slug = EXCLUDED.slug,
  category_id = EXCLUDED.category_id,
  subcategory = EXCLUDED.subcategory,
  subcategory_slug = EXCLUDED.subcategory_slug,
  description = EXCLUDED.description,
  price = EXCLUDED.price,
  sale_price = EXCLUDED.sale_price,
  stock = EXCLUDED.stock,
  sku = EXCLUDED.sku,
  featured = EXCLUDED.featured,
  is_new = EXCLUDED.is_new,
  status = EXCLUDED.status,
  specs = EXCLUDED.specs,
  color_variants = EXCLUDED.color_variants;

INSERT INTO public.products (
  id, category_id, subcategory, subcategory_slug, name, slug, description,
  price, sale_price, stock, sku, featured, is_new, rating, review_count,
  status, warranty, packaging, shipping_info, specs, color_variants
) VALUES (
  'hm-ba-02',
  'c5-home',
  'Bathroom Accessories',
  'bathroom-accessories',
  'Stone Textured Soap Dispenser & Tumbler Set',
  'stone-textured-soap-dispenser-tumbler-set',
  'Heavyweight polyresin set mimicking natural grey riverstone with matte black rustproof stainless steel pump head.',
  4200,
  3299,
  35,
  'AUR-HM-BA-002',
  false,
  false,
  4.7,
  31,
  'published',
  '12 Months Official Brand Replacement Warranty',
  'Sealed Retail Packaging with Authenticity Certificate',
  'TCS / Leopards Courier Express across Pakistan',
  '{}'::jsonb,
  '[]'::jsonb
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  slug = EXCLUDED.slug,
  category_id = EXCLUDED.category_id,
  subcategory = EXCLUDED.subcategory,
  subcategory_slug = EXCLUDED.subcategory_slug,
  description = EXCLUDED.description,
  price = EXCLUDED.price,
  sale_price = EXCLUDED.sale_price,
  stock = EXCLUDED.stock,
  sku = EXCLUDED.sku,
  featured = EXCLUDED.featured,
  is_new = EXCLUDED.is_new,
  status = EXCLUDED.status,
  specs = EXCLUDED.specs,
  color_variants = EXCLUDED.color_variants;

INSERT INTO public.products (
  id, category_id, subcategory, subcategory_slug, name, slug, description,
  price, sale_price, stock, sku, featured, is_new, rating, review_count,
  status, warranty, packaging, shipping_info, specs, color_variants
) VALUES (
  'hm-hf-01',
  'c5-home',
  'Home Fragrance',
  'home-fragrance',
  'Hand-Poured Soy Wax Scented Candle Amber & Fig',
  'hand-poured-soy-wax-candle-amber-fig',
  '100% natural vegan soy wax poured in a heavy matte black ceramic jar with crackling wooden wick. 60-hour clean burn time.',
  3600,
  2899,
  45,
  'AUR-HM-HF-001',
  true,
  false,
  4.9,
  94,
  'published',
  '12 Months Official Brand Replacement Warranty',
  'Sealed Retail Packaging with Authenticity Certificate',
  'TCS / Leopards Courier Express across Pakistan',
  '{}'::jsonb,
  '[]'::jsonb
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  slug = EXCLUDED.slug,
  category_id = EXCLUDED.category_id,
  subcategory = EXCLUDED.subcategory,
  subcategory_slug = EXCLUDED.subcategory_slug,
  description = EXCLUDED.description,
  price = EXCLUDED.price,
  sale_price = EXCLUDED.sale_price,
  stock = EXCLUDED.stock,
  sku = EXCLUDED.sku,
  featured = EXCLUDED.featured,
  is_new = EXCLUDED.is_new,
  status = EXCLUDED.status,
  specs = EXCLUDED.specs,
  color_variants = EXCLUDED.color_variants;

INSERT INTO public.products (
  id, category_id, subcategory, subcategory_slug, name, slug, description,
  price, sale_price, stock, sku, featured, is_new, rating, review_count,
  status, warranty, packaging, shipping_info, specs, color_variants
) VALUES (
  'hm-hf-02',
  'c5-home',
  'Home Fragrance',
  'home-fragrance',
  'Ultrasonic Matte Ceramic Aroma Diffuser',
  'ultrasonic-matte-ceramic-aroma-diffuser',
  'Whisper-quiet 2.4MHz ultrasonic cool mist vaporizing pure essential oils. Hand-crafted porcelain cover with soft ambient LED base light.',
  7500,
  5999,
  25,
  'AUR-HM-HF-002',
  false,
  true,
  4.8,
  53,
  'published',
  '12 Months Official Brand Replacement Warranty',
  'Sealed Retail Packaging with Authenticity Certificate',
  'TCS / Leopards Courier Express across Pakistan',
  '{}'::jsonb,
  '[]'::jsonb
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  slug = EXCLUDED.slug,
  category_id = EXCLUDED.category_id,
  subcategory = EXCLUDED.subcategory,
  subcategory_slug = EXCLUDED.subcategory_slug,
  description = EXCLUDED.description,
  price = EXCLUDED.price,
  sale_price = EXCLUDED.sale_price,
  stock = EXCLUDED.stock,
  sku = EXCLUDED.sku,
  featured = EXCLUDED.featured,
  is_new = EXCLUDED.is_new,
  status = EXCLUDED.status,
  specs = EXCLUDED.specs,
  color_variants = EXCLUDED.color_variants;

INSERT INTO public.products (
  id, category_id, subcategory, subcategory_slug, name, slug, description,
  price, sale_price, stock, sku, featured, is_new, rating, review_count,
  status, warranty, packaging, shipping_info, specs, color_variants
) VALUES (
  'hm-so-01',
  'c5-home',
  'Storage & Organization',
  'storage-organization',
  'Woven Cotton Rope Storage Basket',
  'woven-cotton-rope-storage-basket',
  'Generously sized 55L woven natural cotton rope hamper with reinforced slit handles. Soft, scratch-free, collapsible, and holds blankets, throws, or laundry.',
  4500,
  3499,
  40,
  'AUR-HM-SO-001',
  false,
  false,
  4.8,
  67,
  'published',
  '12 Months Official Brand Replacement Warranty',
  'Sealed Retail Packaging with Authenticity Certificate',
  'TCS / Leopards Courier Express across Pakistan',
  '{}'::jsonb,
  '[]'::jsonb
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  slug = EXCLUDED.slug,
  category_id = EXCLUDED.category_id,
  subcategory = EXCLUDED.subcategory,
  subcategory_slug = EXCLUDED.subcategory_slug,
  description = EXCLUDED.description,
  price = EXCLUDED.price,
  sale_price = EXCLUDED.sale_price,
  stock = EXCLUDED.stock,
  sku = EXCLUDED.sku,
  featured = EXCLUDED.featured,
  is_new = EXCLUDED.is_new,
  status = EXCLUDED.status,
  specs = EXCLUDED.specs,
  color_variants = EXCLUDED.color_variants;

INSERT INTO public.products (
  id, category_id, subcategory, subcategory_slug, name, slug, description,
  price, sale_price, stock, sku, featured, is_new, rating, review_count,
  status, warranty, packaging, shipping_info, specs, color_variants
) VALUES (
  'hm-so-02',
  'c5-home',
  'Storage & Organization',
  'storage-organization',
  'Stackable Acrylic Closet Drawer Organizers 3-Pack',
  'stackable-acrylic-closet-drawer-organizers-3-pack',
  'Heavy-duty crystal-clear acrylic pull-out bins with smooth gliding drawers. Stackable interlocking modular design for vanity, pantry, or closet organization.',
  5500,
  4200,
  30,
  'AUR-HM-SO-002',
  false,
  true,
  4.7,
  38,
  'published',
  '12 Months Official Brand Replacement Warranty',
  'Sealed Retail Packaging with Authenticity Certificate',
  'TCS / Leopards Courier Express across Pakistan',
  '{}'::jsonb,
  '[]'::jsonb
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  slug = EXCLUDED.slug,
  category_id = EXCLUDED.category_id,
  subcategory = EXCLUDED.subcategory,
  subcategory_slug = EXCLUDED.subcategory_slug,
  description = EXCLUDED.description,
  price = EXCLUDED.price,
  sale_price = EXCLUDED.sale_price,
  stock = EXCLUDED.stock,
  sku = EXCLUDED.sku,
  featured = EXCLUDED.featured,
  is_new = EXCLUDED.is_new,
  status = EXCLUDED.status,
  specs = EXCLUDED.specs,
  color_variants = EXCLUDED.color_variants;

INSERT INTO public.products (
  id, category_id, subcategory, subcategory_slug, name, slug, description,
  price, sale_price, stock, sku, featured, is_new, rating, review_count,
  status, warranty, packaging, shipping_info, specs, color_variants
) VALUES (
  'mb-cs-01',
  'c6-mobile',
  'Phone Cases & Covers',
  'phone-cases-covers',
  'Magnetic Matte Slim Case for iPhone & Galaxy',
  'magnetic-matte-slim-phone-case',
  'Ultra-slim shock-absorbing TPU bumper with translucent frosted matte backplate, built-in strong N52 neodymium magnetic ring, and raised camera bezel protection.',
  3800,
  2999,
  45,
  'AUR-MB-CS-001',
  true,
  true,
  4.8,
  92,
  'published',
  '12 Months Official Brand Replacement Warranty',
  'Sealed Retail Packaging with Authenticity Certificate',
  'TCS / Leopards Courier Express across Pakistan',
  '{}'::jsonb,
  '[{"name":"Matte Black","hex":"#18181b","image_url":"https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=1000&q=80","price":3800,"sale_price":2999},{"name":"Sierra Blue","hex":"#64748b","image_url":"https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=1000&q=80","price":4200,"sale_price":3299}]'::jsonb
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  slug = EXCLUDED.slug,
  category_id = EXCLUDED.category_id,
  subcategory = EXCLUDED.subcategory,
  subcategory_slug = EXCLUDED.subcategory_slug,
  description = EXCLUDED.description,
  price = EXCLUDED.price,
  sale_price = EXCLUDED.sale_price,
  stock = EXCLUDED.stock,
  sku = EXCLUDED.sku,
  featured = EXCLUDED.featured,
  is_new = EXCLUDED.is_new,
  status = EXCLUDED.status,
  specs = EXCLUDED.specs,
  color_variants = EXCLUDED.color_variants;

INSERT INTO public.products (
  id, category_id, subcategory, subcategory_slug, name, slug, description,
  price, sale_price, stock, sku, featured, is_new, rating, review_count,
  status, warranty, packaging, shipping_info, specs, color_variants
) VALUES (
  'mb-cs-02',
  'c6-mobile',
  'Phone Cases & Covers',
  'phone-cases-covers',
  'Full-Grain Leather Magnetic Phone Case',
  'full-grain-leather-magnetic-phone-case',
  'Handcrafted European full-grain leather wrapped around a reinforced polycarbonate shell. Develops a unique rich patina over time, featuring machined metal buttons.',
  5500,
  4499,
  25,
  'AUR-MB-CS-002',
  false,
  false,
  4.9,
  64,
  'published',
  '12 Months Official Brand Replacement Warranty',
  'Sealed Retail Packaging with Authenticity Certificate',
  'TCS / Leopards Courier Express across Pakistan',
  '{}'::jsonb,
  '[]'::jsonb
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  slug = EXCLUDED.slug,
  category_id = EXCLUDED.category_id,
  subcategory = EXCLUDED.subcategory,
  subcategory_slug = EXCLUDED.subcategory_slug,
  description = EXCLUDED.description,
  price = EXCLUDED.price,
  sale_price = EXCLUDED.sale_price,
  stock = EXCLUDED.stock,
  sku = EXCLUDED.sku,
  featured = EXCLUDED.featured,
  is_new = EXCLUDED.is_new,
  status = EXCLUDED.status,
  specs = EXCLUDED.specs,
  color_variants = EXCLUDED.color_variants;

INSERT INTO public.products (
  id, category_id, subcategory, subcategory_slug, name, slug, description,
  price, sale_price, stock, sku, featured, is_new, rating, review_count,
  status, warranty, packaging, shipping_info, specs, color_variants
) VALUES (
  'mb-cg-01',
  'c6-mobile',
  'Chargers & Adapters',
  'chargers-adapters',
  '65W GaN Dual-Port Fast Wall Charger',
  '65w-gan-dual-port-fast-wall-charger',
  'Gallium Nitride (GaN III) high-efficiency technology delivering 65W total power. Dual USB-C ports with intelligent power distribution to charge laptops, tablets, and phones simultaneously.',
  7500,
  5999,
  35,
  'AUR-MB-CG-001',
  true,
  true,
  4.9,
  78,
  'published',
  '12 Months Official Brand Replacement Warranty',
  'Sealed Retail Packaging with Authenticity Certificate',
  'TCS / Leopards Courier Express across Pakistan',
  '{}'::jsonb,
  '[]'::jsonb
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  slug = EXCLUDED.slug,
  category_id = EXCLUDED.category_id,
  subcategory = EXCLUDED.subcategory,
  subcategory_slug = EXCLUDED.subcategory_slug,
  description = EXCLUDED.description,
  price = EXCLUDED.price,
  sale_price = EXCLUDED.sale_price,
  stock = EXCLUDED.stock,
  sku = EXCLUDED.sku,
  featured = EXCLUDED.featured,
  is_new = EXCLUDED.is_new,
  status = EXCLUDED.status,
  specs = EXCLUDED.specs,
  color_variants = EXCLUDED.color_variants;

INSERT INTO public.products (
  id, category_id, subcategory, subcategory_slug, name, slug, description,
  price, sale_price, stock, sku, featured, is_new, rating, review_count,
  status, warranty, packaging, shipping_info, specs, color_variants
) VALUES (
  'mb-cg-02',
  'c6-mobile',
  'Chargers & Adapters',
  'chargers-adapters',
  '30W Compact Travel Fast Charger',
  '30w-compact-travel-fast-charger',
  'Ultra-compact palm-sized 30W USB-C PD fast charger. Charges smartphones to 60% in just 30 minutes with built-in dynamic temperature safety sensors.',
  4200,
  3499,
  40,
  'AUR-MB-CG-002',
  false,
  false,
  4.8,
  51,
  'published',
  '12 Months Official Brand Replacement Warranty',
  'Sealed Retail Packaging with Authenticity Certificate',
  'TCS / Leopards Courier Express across Pakistan',
  '{}'::jsonb,
  '[]'::jsonb
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  slug = EXCLUDED.slug,
  category_id = EXCLUDED.category_id,
  subcategory = EXCLUDED.subcategory,
  subcategory_slug = EXCLUDED.subcategory_slug,
  description = EXCLUDED.description,
  price = EXCLUDED.price,
  sale_price = EXCLUDED.sale_price,
  stock = EXCLUDED.stock,
  sku = EXCLUDED.sku,
  featured = EXCLUDED.featured,
  is_new = EXCLUDED.is_new,
  status = EXCLUDED.status,
  specs = EXCLUDED.specs,
  color_variants = EXCLUDED.color_variants;

INSERT INTO public.products (
  id, category_id, subcategory, subcategory_slug, name, slug, description,
  price, sale_price, stock, sku, featured, is_new, rating, review_count,
  status, warranty, packaging, shipping_info, specs, color_variants
) VALUES (
  'mb-cb-01',
  'c6-mobile',
  'Charging Cables',
  'charging-cables',
  '100W Braided USB-C to USB-C Fast Charging Cable 2M',
  '100w-braided-usb-c-to-usb-c-fast-charging-cable',
  'Double-braided nylon jacket with aluminum alloy connectors. E-marker smart chip supports 100W Power Delivery (20V/5A) and 480Mbps data sync.',
  2800,
  2199,
  60,
  'AUR-MB-CB-001',
  false,
  false,
  4.8,
  110,
  'published',
  '12 Months Official Brand Replacement Warranty',
  'Sealed Retail Packaging with Authenticity Certificate',
  'TCS / Leopards Courier Express across Pakistan',
  '{}'::jsonb,
  '[]'::jsonb
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  slug = EXCLUDED.slug,
  category_id = EXCLUDED.category_id,
  subcategory = EXCLUDED.subcategory,
  subcategory_slug = EXCLUDED.subcategory_slug,
  description = EXCLUDED.description,
  price = EXCLUDED.price,
  sale_price = EXCLUDED.sale_price,
  stock = EXCLUDED.stock,
  sku = EXCLUDED.sku,
  featured = EXCLUDED.featured,
  is_new = EXCLUDED.is_new,
  status = EXCLUDED.status,
  specs = EXCLUDED.specs,
  color_variants = EXCLUDED.color_variants;

INSERT INTO public.products (
  id, category_id, subcategory, subcategory_slug, name, slug, description,
  price, sale_price, stock, sku, featured, is_new, rating, review_count,
  status, warranty, packaging, shipping_info, specs, color_variants
) VALUES (
  'mb-cb-02',
  'c6-mobile',
  'Charging Cables',
  'charging-cables',
  'Reinforced Kevlar Lightning to USB-C Cable 1.5M',
  'reinforced-kevlar-lightning-to-usb-c-cable',
  'MFi-certified Lightning cable reinforced with Kevlar aramid fiber core, withstands over 30,000 bends, supporting 20W fast charging.',
  2400,
  1899,
  50,
  'AUR-MB-CB-002',
  false,
  false,
  4.7,
  67,
  'published',
  '12 Months Official Brand Replacement Warranty',
  'Sealed Retail Packaging with Authenticity Certificate',
  'TCS / Leopards Courier Express across Pakistan',
  '{}'::jsonb,
  '[]'::jsonb
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  slug = EXCLUDED.slug,
  category_id = EXCLUDED.category_id,
  subcategory = EXCLUDED.subcategory,
  subcategory_slug = EXCLUDED.subcategory_slug,
  description = EXCLUDED.description,
  price = EXCLUDED.price,
  sale_price = EXCLUDED.sale_price,
  stock = EXCLUDED.stock,
  sku = EXCLUDED.sku,
  featured = EXCLUDED.featured,
  is_new = EXCLUDED.is_new,
  status = EXCLUDED.status,
  specs = EXCLUDED.specs,
  color_variants = EXCLUDED.color_variants;

INSERT INTO public.products (
  id, category_id, subcategory, subcategory_slug, name, slug, description,
  price, sale_price, stock, sku, featured, is_new, rating, review_count,
  status, warranty, packaging, shipping_info, specs, color_variants
) VALUES (
  'mb-eb-01',
  'c6-mobile',
  'Wireless Earbuds',
  'wireless-earbuds',
  'AeroBuds Pro Active Noise Cancelling Earbuds',
  'aerobuds-pro-anc-wireless-earbuds',
  'Dual-driver hybrid architecture, 38dB active noise cancellation with transparency mode, quad-mic beamforming voice clarity, and wireless charging case.',
  14500,
  11999,
  30,
  'AUR-MB-EB-001',
  true,
  true,
  4.9,
  85,
  'published',
  '12 Months Official Brand Replacement Warranty',
  'Sealed Retail Packaging with Authenticity Certificate',
  'TCS / Leopards Courier Express across Pakistan',
  '{}'::jsonb,
  '[{"name":"Matte White","hex":"#f8fafc","image_url":"https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=1000&q=80","price":14500,"sale_price":11999},{"name":"Midnight Black","hex":"#09090b","image_url":"https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?w=1000&q=80","price":15500,"sale_price":12999}]'::jsonb
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  slug = EXCLUDED.slug,
  category_id = EXCLUDED.category_id,
  subcategory = EXCLUDED.subcategory,
  subcategory_slug = EXCLUDED.subcategory_slug,
  description = EXCLUDED.description,
  price = EXCLUDED.price,
  sale_price = EXCLUDED.sale_price,
  stock = EXCLUDED.stock,
  sku = EXCLUDED.sku,
  featured = EXCLUDED.featured,
  is_new = EXCLUDED.is_new,
  status = EXCLUDED.status,
  specs = EXCLUDED.specs,
  color_variants = EXCLUDED.color_variants;

INSERT INTO public.products (
  id, category_id, subcategory, subcategory_slug, name, slug, description,
  price, sale_price, stock, sku, featured, is_new, rating, review_count,
  status, warranty, packaging, shipping_info, specs, color_variants
) VALUES (
  'mb-eb-02',
  'c6-mobile',
  'Wireless Earbuds',
  'wireless-earbuds',
  'AirWave Semi-In-Ear Spatial Audio Earphones',
  'airwave-semi-in-ear-spatial-audio-earphones',
  'Pressure-free semi-in-ear ergonomic fit with 13mm composite titanium diaphragms, low-latency 45ms gaming mode, and 30-hour combined battery playback.',
  8900,
  6999,
  35,
  'AUR-MB-EB-002',
  false,
  false,
  4.8,
  59,
  'published',
  '12 Months Official Brand Replacement Warranty',
  'Sealed Retail Packaging with Authenticity Certificate',
  'TCS / Leopards Courier Express across Pakistan',
  '{}'::jsonb,
  '[]'::jsonb
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  slug = EXCLUDED.slug,
  category_id = EXCLUDED.category_id,
  subcategory = EXCLUDED.subcategory,
  subcategory_slug = EXCLUDED.subcategory_slug,
  description = EXCLUDED.description,
  price = EXCLUDED.price,
  sale_price = EXCLUDED.sale_price,
  stock = EXCLUDED.stock,
  sku = EXCLUDED.sku,
  featured = EXCLUDED.featured,
  is_new = EXCLUDED.is_new,
  status = EXCLUDED.status,
  specs = EXCLUDED.specs,
  color_variants = EXCLUDED.color_variants;

INSERT INTO public.products (
  id, category_id, subcategory, subcategory_slug, name, slug, description,
  price, sale_price, stock, sku, featured, is_new, rating, review_count,
  status, warranty, packaging, shipping_info, specs, color_variants
) VALUES (
  'mb-pb-01',
  'c6-mobile',
  'Power Banks',
  'power-banks',
  'VoltTank 20,000mAh 65W GaN Laptop & Phone Power Bank',
  'volttank-20000mah-65w-gan-power-bank',
  'High-density airline-safe 20,000mAh power bank capable of 65W laptop charging over USB-C. Smart TFT real-time power display showing wattage, voltage, and remaining time.',
  14500,
  11999,
  22,
  'AUR-MB-PB-001',
  true,
  true,
  4.9,
  67,
  'published',
  '12 Months Official Brand Replacement Warranty',
  'Sealed Retail Packaging with Authenticity Certificate',
  'TCS / Leopards Courier Express across Pakistan',
  '{}'::jsonb,
  '[]'::jsonb
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  slug = EXCLUDED.slug,
  category_id = EXCLUDED.category_id,
  subcategory = EXCLUDED.subcategory,
  subcategory_slug = EXCLUDED.subcategory_slug,
  description = EXCLUDED.description,
  price = EXCLUDED.price,
  sale_price = EXCLUDED.sale_price,
  stock = EXCLUDED.stock,
  sku = EXCLUDED.sku,
  featured = EXCLUDED.featured,
  is_new = EXCLUDED.is_new,
  status = EXCLUDED.status,
  specs = EXCLUDED.specs,
  color_variants = EXCLUDED.color_variants;

INSERT INTO public.products (
  id, category_id, subcategory, subcategory_slug, name, slug, description,
  price, sale_price, stock, sku, featured, is_new, rating, review_count,
  status, warranty, packaging, shipping_info, specs, color_variants
) VALUES (
  'mb-pb-02',
  'c6-mobile',
  'Power Banks',
  'power-banks',
  'MagSlim 10,000mAh Ultra-Thin Magnetic Wireless Power Bank',
  'magslim-10000mah-magnetic-wireless-power-bank',
  'Ultra-thin 12mm aircraft aluminum casing snapping magnetically onto MagSafe phones. 15W wireless output, 20W USB-C wired charging, and foldable kickstand.',
  8500,
  6899,
  28,
  'AUR-MB-PB-002',
  false,
  false,
  4.8,
  53,
  'published',
  '12 Months Official Brand Replacement Warranty',
  'Sealed Retail Packaging with Authenticity Certificate',
  'TCS / Leopards Courier Express across Pakistan',
  '{}'::jsonb,
  '[]'::jsonb
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  slug = EXCLUDED.slug,
  category_id = EXCLUDED.category_id,
  subcategory = EXCLUDED.subcategory,
  subcategory_slug = EXCLUDED.subcategory_slug,
  description = EXCLUDED.description,
  price = EXCLUDED.price,
  sale_price = EXCLUDED.sale_price,
  stock = EXCLUDED.stock,
  sku = EXCLUDED.sku,
  featured = EXCLUDED.featured,
  is_new = EXCLUDED.is_new,
  status = EXCLUDED.status,
  specs = EXCLUDED.specs,
  color_variants = EXCLUDED.color_variants;

INSERT INTO public.products (
  id, category_id, subcategory, subcategory_slug, name, slug, description,
  price, sale_price, stock, sku, featured, is_new, rating, review_count,
  status, warranty, packaging, shipping_info, specs, color_variants
) VALUES (
  'mb-wc-01',
  'c6-mobile',
  'Wireless Chargers',
  'wireless-chargers',
  'MagStation 3-in-1 Foldable Aluminum Wireless Charging Station',
  'magstation-3-in-1-foldable-wireless-charger',
  'Precision milled aluminum folding stand charging phone (15W), smartwatch (5W), and wireless earbuds (5W) simultaneously from a single USB-C cable.',
  12500,
  9899,
  24,
  'AUR-MB-WC-001',
  true,
  true,
  4.9,
  85,
  'published',
  '12 Months Official Brand Replacement Warranty',
  'Sealed Retail Packaging with Authenticity Certificate',
  'TCS / Leopards Courier Express across Pakistan',
  '{}'::jsonb,
  '[]'::jsonb
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  slug = EXCLUDED.slug,
  category_id = EXCLUDED.category_id,
  subcategory = EXCLUDED.subcategory,
  subcategory_slug = EXCLUDED.subcategory_slug,
  description = EXCLUDED.description,
  price = EXCLUDED.price,
  sale_price = EXCLUDED.sale_price,
  stock = EXCLUDED.stock,
  sku = EXCLUDED.sku,
  featured = EXCLUDED.featured,
  is_new = EXCLUDED.is_new,
  status = EXCLUDED.status,
  specs = EXCLUDED.specs,
  color_variants = EXCLUDED.color_variants;

INSERT INTO public.products (
  id, category_id, subcategory, subcategory_slug, name, slug, description,
  price, sale_price, stock, sku, featured, is_new, rating, review_count,
  status, warranty, packaging, shipping_info, specs, color_variants
) VALUES (
  'mb-hs-01',
  'c6-mobile',
  'Phone Holders & Stands',
  'phone-holders-stands',
  'Elevate CNC Solid Aluminum 360 Rotating Desktop Phone Stand',
  'elevate-cnc-aluminum-360-desktop-phone-stand',
  'Solid machined aerospace-grade aluminum with 360-degree smooth mechanical rotation base, anti-scratch silicone cushions, and foldable dual-axis angle adjustment.',
  3800,
  2999,
  75,
  'AUR-MB-HS-001',
  true,
  false,
  4.9,
  63,
  'published',
  '12 Months Official Brand Replacement Warranty',
  'Sealed Retail Packaging with Authenticity Certificate',
  'TCS / Leopards Courier Express across Pakistan',
  '{}'::jsonb,
  '[]'::jsonb
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  slug = EXCLUDED.slug,
  category_id = EXCLUDED.category_id,
  subcategory = EXCLUDED.subcategory,
  subcategory_slug = EXCLUDED.subcategory_slug,
  description = EXCLUDED.description,
  price = EXCLUDED.price,
  sale_price = EXCLUDED.sale_price,
  stock = EXCLUDED.stock,
  sku = EXCLUDED.sku,
  featured = EXCLUDED.featured,
  is_new = EXCLUDED.is_new,
  status = EXCLUDED.status,
  specs = EXCLUDED.specs,
  color_variants = EXCLUDED.color_variants;

INSERT INTO public.products (
  id, category_id, subcategory, subcategory_slug, name, slug, description,
  price, sale_price, stock, sku, featured, is_new, rating, review_count,
  status, warranty, packaging, shipping_info, specs, color_variants
) VALUES (
  'mb-sp-01',
  'c6-mobile',
  'Screen Protectors',
  'screen-protectors',
  '9H Edge-to-Edge Tempered Glass Screen Protector 2-Pack',
  '9h-edge-to-edge-tempered-glass-screen-protector',
  'Electroplated oleophobic nano-coating resisting fingerprints and smudges. 9H hardness tempered glass with 2.5D curved edges and auto-alignment installation frame.',
  2000,
  1499,
  90,
  'AUR-MB-SP-001',
  false,
  false,
  4.7,
  104,
  'published',
  '12 Months Official Brand Replacement Warranty',
  'Sealed Retail Packaging with Authenticity Certificate',
  'TCS / Leopards Courier Express across Pakistan',
  '{}'::jsonb,
  '[]'::jsonb
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  slug = EXCLUDED.slug,
  category_id = EXCLUDED.category_id,
  subcategory = EXCLUDED.subcategory,
  subcategory_slug = EXCLUDED.subcategory_slug,
  description = EXCLUDED.description,
  price = EXCLUDED.price,
  sale_price = EXCLUDED.sale_price,
  stock = EXCLUDED.stock,
  sku = EXCLUDED.sku,
  featured = EXCLUDED.featured,
  is_new = EXCLUDED.is_new,
  status = EXCLUDED.status,
  specs = EXCLUDED.specs,
  color_variants = EXCLUDED.color_variants;

INSERT INTO public.products (
  id, category_id, subcategory, subcategory_slug, name, slug, description,
  price, sale_price, stock, sku, featured, is_new, rating, review_count,
  status, warranty, packaging, shipping_info, specs, color_variants
) VALUES (
  'mb-pa-01',
  'c6-mobile',
  'Mobile Photography Accessories',
  'mobile-photography-accessories',
  'SnapGrip Magnetic Bluetooth Smartphone Camera Shutter Grip',
  'snapgrip-magnetic-bluetooth-camera-grip',
  'Ergonomic DSLR-style camera grip with magnetic attachment, Bluetooth wireless shutter button, built-in wireless charging power bank, and standard 1/4-inch tripod thread.',
  6800,
  5499,
  20,
  'AUR-MB-PA-001',
  true,
  true,
  4.8,
  41,
  'published',
  '12 Months Official Brand Replacement Warranty',
  'Sealed Retail Packaging with Authenticity Certificate',
  'TCS / Leopards Courier Express across Pakistan',
  '{}'::jsonb,
  '[]'::jsonb
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  slug = EXCLUDED.slug,
  category_id = EXCLUDED.category_id,
  subcategory = EXCLUDED.subcategory,
  subcategory_slug = EXCLUDED.subcategory_slug,
  description = EXCLUDED.description,
  price = EXCLUDED.price,
  sale_price = EXCLUDED.sale_price,
  stock = EXCLUDED.stock,
  sku = EXCLUDED.sku,
  featured = EXCLUDED.featured,
  is_new = EXCLUDED.is_new,
  status = EXCLUDED.status,
  specs = EXCLUDED.specs,
  color_variants = EXCLUDED.color_variants;

-- 3. Insert Product Images
INSERT INTO public.product_images (id, product_id, image_url, alt_text, is_primary, display_order)
VALUES ('img-el-ha-01-1', 'el-ha-01', 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=1000&q=80', 'Horizon Pro ANC Wireless Headphones Space Grey', true, 1)
ON CONFLICT (id) DO UPDATE SET
  image_url = EXCLUDED.image_url,
  alt_text = EXCLUDED.alt_text,
  is_primary = EXCLUDED.is_primary,
  display_order = EXCLUDED.display_order;
INSERT INTO public.product_images (id, product_id, image_url, alt_text, is_primary, display_order)
VALUES ('img-el-ha-01-2', 'el-ha-01', 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=1000&q=80', 'Horizon Pro ANC Wireless Headphones Champagne Silver', false, 2)
ON CONFLICT (id) DO UPDATE SET
  image_url = EXCLUDED.image_url,
  alt_text = EXCLUDED.alt_text,
  is_primary = EXCLUDED.is_primary,
  display_order = EXCLUDED.display_order;
INSERT INTO public.product_images (id, product_id, image_url, alt_text, is_primary, display_order)
VALUES ('img-el-ha-01-3', 'el-ha-01', 'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=1000&q=80', 'Horizon Pro ANC Wireless Headphones Midnight Black', false, 3)
ON CONFLICT (id) DO UPDATE SET
  image_url = EXCLUDED.image_url,
  alt_text = EXCLUDED.alt_text,
  is_primary = EXCLUDED.is_primary,
  display_order = EXCLUDED.display_order;
INSERT INTO public.product_images (id, product_id, image_url, alt_text, is_primary, display_order)
VALUES ('img-el-ha-02-1', 'el-ha-02', 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=1000&q=80', 'PulseStudio High-Fidelity Bluetooth Speaker', true, 1)
ON CONFLICT (id) DO UPDATE SET
  image_url = EXCLUDED.image_url,
  alt_text = EXCLUDED.alt_text,
  is_primary = EXCLUDED.is_primary,
  display_order = EXCLUDED.display_order;
INSERT INTO public.product_images (id, product_id, image_url, alt_text, is_primary, display_order)
VALUES ('img-el-ca-01-1', 'el-ca-01', 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=1000&q=80', 'Keychron K2 Wireless Mechanical Keyboard Top View', true, 1)
ON CONFLICT (id) DO UPDATE SET
  image_url = EXCLUDED.image_url,
  alt_text = EXCLUDED.alt_text,
  is_primary = EXCLUDED.is_primary,
  display_order = EXCLUDED.display_order;
INSERT INTO public.product_images (id, product_id, image_url, alt_text, is_primary, display_order)
VALUES ('img-el-ca-02-1', 'el-ca-02', 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=1000&q=80', 'Precision Ergonomic Wireless Vertical Mouse Studio View', true, 1)
ON CONFLICT (id) DO UPDATE SET
  image_url = EXCLUDED.image_url,
  alt_text = EXCLUDED.alt_text,
  is_primary = EXCLUDED.is_primary,
  display_order = EXCLUDED.display_order;
INSERT INTO public.product_images (id, product_id, image_url, alt_text, is_primary, display_order)
VALUES ('img-el-gg-01-1', 'el-gg-01', 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=1000&q=80', 'HyperSpeed Ultra-Lightweight Wireless Gaming Mouse', true, 1)
ON CONFLICT (id) DO UPDATE SET
  image_url = EXCLUDED.image_url,
  alt_text = EXCLUDED.alt_text,
  is_primary = EXCLUDED.is_primary,
  display_order = EXCLUDED.display_order;
INSERT INTO public.product_images (id, product_id, image_url, alt_text, is_primary, display_order)
VALUES ('img-el-gg-02-1', 'el-gg-02', 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=1000&q=80', 'StreamKey Pro 15-Key Studio Visual Keypad Controller', true, 1)
ON CONFLICT (id) DO UPDATE SET
  image_url = EXCLUDED.image_url,
  alt_text = EXCLUDED.alt_text,
  is_primary = EXCLUDED.is_primary,
  display_order = EXCLUDED.display_order;
INSERT INTO public.product_images (id, product_id, image_url, alt_text, is_primary, display_order)
VALUES ('img-el-se-01-1', 'el-se-01', 'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?w=1000&q=80', 'Smart Cinema 4K HDR Portable Laser Projector', true, 1)
ON CONFLICT (id) DO UPDATE SET
  image_url = EXCLUDED.image_url,
  alt_text = EXCLUDED.alt_text,
  is_primary = EXCLUDED.is_primary,
  display_order = EXCLUDED.display_order;
INSERT INTO public.product_images (id, product_id, image_url, alt_text, is_primary, display_order)
VALUES ('img-el-se-02-1', 'el-se-02', 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=1000&q=80', 'AmbiGlow Dynamic TV Backlight Ambient Sync Kit', true, 1)
ON CONFLICT (id) DO UPDATE SET
  image_url = EXCLUDED.image_url,
  alt_text = EXCLUDED.alt_text,
  is_primary = EXCLUDED.is_primary,
  display_order = EXCLUDED.display_order;
INSERT INTO public.product_images (id, product_id, image_url, alt_text, is_primary, display_order)
VALUES ('img-el-sc-01-1', 'el-sc-01', 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=1000&q=80', 'Ultra-Speed NVMe Portable External SSD Rugged Case', true, 1)
ON CONFLICT (id) DO UPDATE SET
  image_url = EXCLUDED.image_url,
  alt_text = EXCLUDED.alt_text,
  is_primary = EXCLUDED.is_primary,
  display_order = EXCLUDED.display_order;
INSERT INTO public.product_images (id, product_id, image_url, alt_text, is_primary, display_order)
VALUES ('img-el-sc-02-1', 'el-sc-02', 'https://images.unsplash.com/photo-1544652478-6653e09f18a2?w=1000&q=80', '8-in-1 Aluminum Dual HDMI Multi-Port Hub', true, 1)
ON CONFLICT (id) DO UPDATE SET
  image_url = EXCLUDED.image_url,
  alt_text = EXCLUDED.alt_text,
  is_primary = EXCLUDED.is_primary,
  display_order = EXCLUDED.display_order;
INSERT INTO public.product_images (id, product_id, image_url, alt_text, is_primary, display_order)
VALUES ('img-el-cp-01-1', 'el-cp-01', 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=1000&q=80', '4K Ultra-HD Compact Vlogging Camera Front View', true, 1)
ON CONFLICT (id) DO UPDATE SET
  image_url = EXCLUDED.image_url,
  alt_text = EXCLUDED.alt_text,
  is_primary = EXCLUDED.is_primary,
  display_order = EXCLUDED.display_order;
INSERT INTO public.product_images (id, product_id, image_url, alt_text, is_primary, display_order)
VALUES ('img-el-cp-02-1', 'el-cp-02', 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=1000&q=80', '3-Axis Handheld Smartphone Gimbal Stabilizer', true, 1)
ON CONFLICT (id) DO UPDATE SET
  image_url = EXCLUDED.image_url,
  alt_text = EXCLUDED.alt_text,
  is_primary = EXCLUDED.is_primary,
  display_order = EXCLUDED.display_order;
INSERT INTO public.product_images (id, product_id, image_url, alt_text, is_primary, display_order)
VALUES ('img-sw-am-01-1', 'sw-am-01', 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=1000&q=80', 'Apex Titanium Sapphire AMOLED Smartwatch Natural Titanium', true, 1)
ON CONFLICT (id) DO UPDATE SET
  image_url = EXCLUDED.image_url,
  alt_text = EXCLUDED.alt_text,
  is_primary = EXCLUDED.is_primary,
  display_order = EXCLUDED.display_order;
INSERT INTO public.product_images (id, product_id, image_url, alt_text, is_primary, display_order)
VALUES ('img-sw-am-01-2', 'sw-am-01', 'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=1000&q=80', 'Apex Titanium Smartwatch Space Black Edition', false, 2)
ON CONFLICT (id) DO UPDATE SET
  image_url = EXCLUDED.image_url,
  alt_text = EXCLUDED.alt_text,
  is_primary = EXCLUDED.is_primary,
  display_order = EXCLUDED.display_order;
INSERT INTO public.product_images (id, product_id, image_url, alt_text, is_primary, display_order)
VALUES ('img-sw-am-02-1', 'sw-am-02', 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=1000&q=80', 'Vanguard Curved Borderless AMOLED Smartwatch', true, 1)
ON CONFLICT (id) DO UPDATE SET
  image_url = EXCLUDED.image_url,
  alt_text = EXCLUDED.alt_text,
  is_primary = EXCLUDED.is_primary,
  display_order = EXCLUDED.display_order;
INSERT INTO public.product_images (id, product_id, image_url, alt_text, is_primary, display_order)
VALUES ('img-sw-rd-01-1', 'sw-rd-01', 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=1000&q=80', 'Horizon Classic Round-Dial Leather Smartwatch', true, 1)
ON CONFLICT (id) DO UPDATE SET
  image_url = EXCLUDED.image_url,
  alt_text = EXCLUDED.alt_text,
  is_primary = EXCLUDED.is_primary,
  display_order = EXCLUDED.display_order;
INSERT INTO public.product_images (id, product_id, image_url, alt_text, is_primary, display_order)
VALUES ('img-sw-rd-02-1', 'sw-rd-02', 'https://images.unsplash.com/photo-1542496658-e33a6d0d50f6?w=1000&q=80', 'Chronos Ceramic Bezel Round Smartwatch', true, 1)
ON CONFLICT (id) DO UPDATE SET
  image_url = EXCLUDED.image_url,
  alt_text = EXCLUDED.alt_text,
  is_primary = EXCLUDED.is_primary,
  display_order = EXCLUDED.display_order;
INSERT INTO public.product_images (id, product_id, image_url, alt_text, is_primary, display_order)
VALUES ('img-sw-ms-01-1', 'sw-ms-01', 'https://images.unsplash.com/photo-1533139502658-0198f920d8e8?w=1000&q=80', 'Monarch Stainless Steel Mesh Smartwatch', true, 1)
ON CONFLICT (id) DO UPDATE SET
  image_url = EXCLUDED.image_url,
  alt_text = EXCLUDED.alt_text,
  is_primary = EXCLUDED.is_primary,
  display_order = EXCLUDED.display_order;
INSERT INTO public.product_images (id, product_id, image_url, alt_text, is_primary, display_order)
VALUES ('img-sw-ms-02-1', 'sw-ms-02', 'https://images.unsplash.com/photo-1660844817855-3ecc7ef21f12?w=1000&q=80', 'Executive Solid Link Steel Bracelet Smartwatch', true, 1)
ON CONFLICT (id) DO UPDATE SET
  image_url = EXCLUDED.image_url,
  alt_text = EXCLUDED.alt_text,
  is_primary = EXCLUDED.is_primary,
  display_order = EXCLUDED.display_order;
INSERT INTO public.product_images (id, product_id, image_url, alt_text, is_primary, display_order)
VALUES ('img-sw-ft-01-1', 'sw-ft-01', 'https://images.unsplash.com/photo-1510017803434-a899398421b3?w=1000&q=80', 'Endurance Multi-Sport GPS Fitness Smartwatch', true, 1)
ON CONFLICT (id) DO UPDATE SET
  image_url = EXCLUDED.image_url,
  alt_text = EXCLUDED.alt_text,
  is_primary = EXCLUDED.is_primary,
  display_order = EXCLUDED.display_order;
INSERT INTO public.product_images (id, product_id, image_url, alt_text, is_primary, display_order)
VALUES ('img-sw-ft-02-1', 'sw-ft-02', 'https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=1000&q=80', 'ActivePulse Waterproof Swim and Run Smartwatch', true, 1)
ON CONFLICT (id) DO UPDATE SET
  image_url = EXCLUDED.image_url,
  alt_text = EXCLUDED.alt_text,
  is_primary = EXCLUDED.is_primary,
  display_order = EXCLUDED.display_order;
INSERT INTO public.product_images (id, product_id, image_url, alt_text, is_primary, display_order)
VALUES ('img-sw-mn-01-1', 'sw-mn-01', 'https://images.unsplash.com/photo-1762768752302-8b7a2a04b68e?w=1000&q=80', 'Simplicity Minimalist Discrete OLED Smartwatch', true, 1)
ON CONFLICT (id) DO UPDATE SET
  image_url = EXCLUDED.image_url,
  alt_text = EXCLUDED.alt_text,
  is_primary = EXCLUDED.is_primary,
  display_order = EXCLUDED.display_order;
INSERT INTO public.product_images (id, product_id, image_url, alt_text, is_primary, display_order)
VALUES ('img-sw-mn-02-1', 'sw-mn-02', 'https://images.unsplash.com/photo-1518131672697-613becd4fab5?w=1000&q=80', 'Nordic Slimline Modern Smartwatch', true, 1)
ON CONFLICT (id) DO UPDATE SET
  image_url = EXCLUDED.image_url,
  alt_text = EXCLUDED.alt_text,
  is_primary = EXCLUDED.is_primary,
  display_order = EXCLUDED.display_order;
INSERT INTO public.product_images (id, product_id, image_url, alt_text, is_primary, display_order)
VALUES ('img-sw-st-01-1', 'sw-st-01', 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=1000&q=80', 'Quick-Release Italian Saddle Leather Strap', true, 1)
ON CONFLICT (id) DO UPDATE SET
  image_url = EXCLUDED.image_url,
  alt_text = EXCLUDED.alt_text,
  is_primary = EXCLUDED.is_primary,
  display_order = EXCLUDED.display_order;
INSERT INTO public.product_images (id, product_id, image_url, alt_text, is_primary, display_order)
VALUES ('img-sw-st-02-1', 'sw-st-02', 'https://images.unsplash.com/photo-1619134778706-7015533a6150?w=1000&q=80', 'Titanium Link Bracelet Replacement Band', true, 1)
ON CONFLICT (id) DO UPDATE SET
  image_url = EXCLUDED.image_url,
  alt_text = EXCLUDED.alt_text,
  is_primary = EXCLUDED.is_primary,
  display_order = EXCLUDED.display_order;
INSERT INTO public.product_images (id, product_id, image_url, alt_text, is_primary, display_order)
VALUES ('img-f-hb-01-1', 'f-hb-01', 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=1000&q=80', 'Verona Handcrafted Calfskin Trapeze Handbag', true, 1)
ON CONFLICT (id) DO UPDATE SET
  image_url = EXCLUDED.image_url,
  alt_text = EXCLUDED.alt_text,
  is_primary = EXCLUDED.is_primary,
  display_order = EXCLUDED.display_order;
INSERT INTO public.product_images (id, product_id, image_url, alt_text, is_primary, display_order)
VALUES ('img-f-hb-02-1', 'f-hb-02', 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=1000&q=80', 'Riviera Structured Kelly Top-Handle Bag', true, 1)
ON CONFLICT (id) DO UPDATE SET
  image_url = EXCLUDED.image_url,
  alt_text = EXCLUDED.alt_text,
  is_primary = EXCLUDED.is_primary,
  display_order = EXCLUDED.display_order;
INSERT INTO public.product_images (id, product_id, image_url, alt_text, is_primary, display_order)
VALUES ('img-f-jw-01-1', 'f-jw-01', 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=1000&q=80', '18K Gold Plated Paperclip Chain Necklace', true, 1)
ON CONFLICT (id) DO UPDATE SET
  image_url = EXCLUDED.image_url,
  alt_text = EXCLUDED.alt_text,
  is_primary = EXCLUDED.is_primary,
  display_order = EXCLUDED.display_order;
INSERT INTO public.product_images (id, product_id, image_url, alt_text, is_primary, display_order)
VALUES ('img-f-jw-02-1', 'f-jw-02', 'https://images.unsplash.com/photo-1630019852942-f89202989a59?w=1000&q=80', 'Chunky Twisted Croissant Hoop Earrings', true, 1)
ON CONFLICT (id) DO UPDATE SET
  image_url = EXCLUDED.image_url,
  alt_text = EXCLUDED.alt_text,
  is_primary = EXCLUDED.is_primary,
  display_order = EXCLUDED.display_order;
INSERT INTO public.product_images (id, product_id, image_url, alt_text, is_primary, display_order)
VALUES ('img-f-sg-01-1', 'f-sg-01', 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=1000&q=80', 'Polarized Acetate Square Sunglasses', true, 1)
ON CONFLICT (id) DO UPDATE SET
  image_url = EXCLUDED.image_url,
  alt_text = EXCLUDED.alt_text,
  is_primary = EXCLUDED.is_primary,
  display_order = EXCLUDED.display_order;
INSERT INTO public.product_images (id, product_id, image_url, alt_text, is_primary, display_order)
VALUES ('img-f-sg-02-1', 'f-sg-02', 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=1000&q=80', 'Minimalist Rimless Titanium Aviator Sunglasses', true, 1)
ON CONFLICT (id) DO UPDATE SET
  image_url = EXCLUDED.image_url,
  alt_text = EXCLUDED.alt_text,
  is_primary = EXCLUDED.is_primary,
  display_order = EXCLUDED.display_order;
INSERT INTO public.product_images (id, product_id, image_url, alt_text, is_primary, display_order)
VALUES ('img-f-fw-01-1', 'f-fw-01', 'https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=1000&q=80', 'Minimalist Italian Calfskin Low-Top Sneakers', true, 1)
ON CONFLICT (id) DO UPDATE SET
  image_url = EXCLUDED.image_url,
  alt_text = EXCLUDED.alt_text,
  is_primary = EXCLUDED.is_primary,
  display_order = EXCLUDED.display_order;
INSERT INTO public.product_images (id, product_id, image_url, alt_text, is_primary, display_order)
VALUES ('img-f-fw-02-1', 'f-fw-02', 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=1000&q=80', 'Sculptural Pointed Toe Leather Mules', true, 1)
ON CONFLICT (id) DO UPDATE SET
  image_url = EXCLUDED.image_url,
  alt_text = EXCLUDED.alt_text,
  is_primary = EXCLUDED.is_primary,
  display_order = EXCLUDED.display_order;
INSERT INTO public.product_images (id, product_id, image_url, alt_text, is_primary, display_order)
VALUES ('img-f-ha-01-1', 'f-ha-01', 'https://images.unsplash.com/photo-1545153252-0e2e698f0330?w=1000&q=80', '100% Pure Mulberry Silk Scarf Display', true, 1)
ON CONFLICT (id) DO UPDATE SET
  image_url = EXCLUDED.image_url,
  alt_text = EXCLUDED.alt_text,
  is_primary = EXCLUDED.is_primary,
  display_order = EXCLUDED.display_order;
INSERT INTO public.product_images (id, product_id, image_url, alt_text, is_primary, display_order)
VALUES ('img-f-ha-02-1', 'f-ha-02', 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=1000&q=80', 'Satin French Bow Hair Barrette Clip', true, 1)
ON CONFLICT (id) DO UPDATE SET
  image_url = EXCLUDED.image_url,
  alt_text = EXCLUDED.alt_text,
  is_primary = EXCLUDED.is_primary,
  display_order = EXCLUDED.display_order;
INSERT INTO public.product_images (id, product_id, image_url, alt_text, is_primary, display_order)
VALUES ('img-f-wb-01-1', 'f-wb-01', 'https://images.unsplash.com/photo-1752184791407-b59e505e5dca?w=1000&q=80', 'Full-Grain Leather Slim RFID Bi-Fold Wallet', true, 1)
ON CONFLICT (id) DO UPDATE SET
  image_url = EXCLUDED.image_url,
  alt_text = EXCLUDED.alt_text,
  is_primary = EXCLUDED.is_primary,
  display_order = EXCLUDED.display_order;
INSERT INTO public.product_images (id, product_id, image_url, alt_text, is_primary, display_order)
VALUES ('img-f-wb-02-1', 'f-wb-02', 'https://plus.unsplash.com/premium_photo-1726769202190-ad2a3f2f360b?w=1000&q=80', 'Reversible Full-Grain Leather Dress Belt', true, 1)
ON CONFLICT (id) DO UPDATE SET
  image_url = EXCLUDED.image_url,
  alt_text = EXCLUDED.alt_text,
  is_primary = EXCLUDED.is_primary,
  display_order = EXCLUDED.display_order;
INSERT INTO public.product_images (id, product_id, image_url, alt_text, is_primary, display_order)
VALUES ('img-bt-sk-01-1', 'bt-sk-01', 'https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?w=1000&q=80', 'Luminance Vitamin C Radiance Brightening Elixir Bottle', true, 1)
ON CONFLICT (id) DO UPDATE SET
  image_url = EXCLUDED.image_url,
  alt_text = EXCLUDED.alt_text,
  is_primary = EXCLUDED.is_primary,
  display_order = EXCLUDED.display_order;
INSERT INTO public.product_images (id, product_id, image_url, alt_text, is_primary, display_order)
VALUES ('img-bt-sk-02-1', 'bt-sk-02', 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=1000&q=80', 'Hyaluronic Moisture Plump Multi-Depth Gel Jar', true, 1)
ON CONFLICT (id) DO UPDATE SET
  image_url = EXCLUDED.image_url,
  alt_text = EXCLUDED.alt_text,
  is_primary = EXCLUDED.is_primary,
  display_order = EXCLUDED.display_order;
INSERT INTO public.product_images (id, product_id, image_url, alt_text, is_primary, display_order)
VALUES ('img-bt-mu-01-1', 'bt-mu-01', 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=1000&q=80', 'Velvet Matte Long-Wear Lip Tint Deep Berry', true, 1)
ON CONFLICT (id) DO UPDATE SET
  image_url = EXCLUDED.image_url,
  alt_text = EXCLUDED.alt_text,
  is_primary = EXCLUDED.is_primary,
  display_order = EXCLUDED.display_order;
INSERT INTO public.product_images (id, product_id, image_url, alt_text, is_primary, display_order)
VALUES ('img-bt-mu-01-2', 'bt-mu-01', 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=1000&q=80', 'Velvet Matte Long-Wear Lip Tint Rosewood Coral', false, 2)
ON CONFLICT (id) DO UPDATE SET
  image_url = EXCLUDED.image_url,
  alt_text = EXCLUDED.alt_text,
  is_primary = EXCLUDED.is_primary,
  display_order = EXCLUDED.display_order;
INSERT INTO public.product_images (id, product_id, image_url, alt_text, is_primary, display_order)
VALUES ('img-bt-mu-02-1', 'bt-mu-02', 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=1000&q=80', 'Luminous Dew Liquid Highlighter Bottle', true, 1)
ON CONFLICT (id) DO UPDATE SET
  image_url = EXCLUDED.image_url,
  alt_text = EXCLUDED.alt_text,
  is_primary = EXCLUDED.is_primary,
  display_order = EXCLUDED.display_order;
INSERT INTO public.product_images (id, product_id, image_url, alt_text, is_primary, display_order)
VALUES ('img-bt-fb-01-1', 'bt-fb-01', 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=1000&q=80', 'Ultra-Hydrating Botanical Shea Body Butter', true, 1)
ON CONFLICT (id) DO UPDATE SET
  image_url = EXCLUDED.image_url,
  alt_text = EXCLUDED.alt_text,
  is_primary = EXCLUDED.is_primary,
  display_order = EXCLUDED.display_order;
INSERT INTO public.product_images (id, product_id, image_url, alt_text, is_primary, display_order)
VALUES ('img-bt-fb-02-1', 'bt-fb-02', 'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=1000&q=80', 'Exfoliating Arabica Coffee & Cane Sugar Body Scrub', true, 1)
ON CONFLICT (id) DO UPDATE SET
  image_url = EXCLUDED.image_url,
  alt_text = EXCLUDED.alt_text,
  is_primary = EXCLUDED.is_primary,
  display_order = EXCLUDED.display_order;
INSERT INTO public.product_images (id, product_id, image_url, alt_text, is_primary, display_order)
VALUES ('img-bt-hc-01-1', 'bt-hc-01', 'https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?w=1000&q=80', 'Argan Oil Deep Repair Hair Conditioning Mask', true, 1)
ON CONFLICT (id) DO UPDATE SET
  image_url = EXCLUDED.image_url,
  alt_text = EXCLUDED.alt_text,
  is_primary = EXCLUDED.is_primary,
  display_order = EXCLUDED.display_order;
INSERT INTO public.product_images (id, product_id, image_url, alt_text, is_primary, display_order)
VALUES ('img-bt-hc-02-1', 'bt-hc-02', 'https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?w=1000&q=80', 'Silk Peptide Thermal Protection Weightless Hair Mist', true, 1)
ON CONFLICT (id) DO UPDATE SET
  image_url = EXCLUDED.image_url,
  alt_text = EXCLUDED.alt_text,
  is_primary = EXCLUDED.is_primary,
  display_order = EXCLUDED.display_order;
INSERT INTO public.product_images (id, product_id, image_url, alt_text, is_primary, display_order)
VALUES ('img-bt-bt-01-1', 'bt-bt-01', 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=1000&q=80', 'Rose Quartz Facial Sculpting Roller and Gua Sha Set', true, 1)
ON CONFLICT (id) DO UPDATE SET
  image_url = EXCLUDED.image_url,
  alt_text = EXCLUDED.alt_text,
  is_primary = EXCLUDED.is_primary,
  display_order = EXCLUDED.display_order;
INSERT INTO public.product_images (id, product_id, image_url, alt_text, is_primary, display_order)
VALUES ('img-bt-bt-02-1', 'bt-bt-02', 'https://plus.unsplash.com/premium_photo-1684407616442-8d5a1b7c978e?w=1000&q=80', 'Sonic Deep-Pore Silicone Facial Cleansing Device', true, 1)
ON CONFLICT (id) DO UPDATE SET
  image_url = EXCLUDED.image_url,
  alt_text = EXCLUDED.alt_text,
  is_primary = EXCLUDED.is_primary,
  display_order = EXCLUDED.display_order;
INSERT INTO public.product_images (id, product_id, image_url, alt_text, is_primary, display_order)
VALUES ('img-bt-fp-01-1', 'bt-fp-01', 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=1000&q=80', 'Santal & Bergamot Artisan Perfume Glass Bottle', true, 1)
ON CONFLICT (id) DO UPDATE SET
  image_url = EXCLUDED.image_url,
  alt_text = EXCLUDED.alt_text,
  is_primary = EXCLUDED.is_primary,
  display_order = EXCLUDED.display_order;
INSERT INTO public.product_images (id, product_id, image_url, alt_text, is_primary, display_order)
VALUES ('img-bt-fp-02-1', 'bt-fp-02', 'https://images.unsplash.com/photo-1547887537-6158d64c35b3?w=1000&q=80', 'Midnight Amber Concentrated Artisan Perfume Oil Bottle', true, 1)
ON CONFLICT (id) DO UPDATE SET
  image_url = EXCLUDED.image_url,
  alt_text = EXCLUDED.alt_text,
  is_primary = EXCLUDED.is_primary,
  display_order = EXCLUDED.display_order;
INSERT INTO public.product_images (id, product_id, image_url, alt_text, is_primary, display_order)
VALUES ('img-hm-md-01-1', 'hm-md-01', 'https://images.unsplash.com/photo-1581783342308-f792dbdd27c5?w=1000&q=80', 'Ceramic Sculptural Donut Vase', true, 1)
ON CONFLICT (id) DO UPDATE SET
  image_url = EXCLUDED.image_url,
  alt_text = EXCLUDED.alt_text,
  is_primary = EXCLUDED.is_primary,
  display_order = EXCLUDED.display_order;
INSERT INTO public.product_images (id, product_id, image_url, alt_text, is_primary, display_order)
VALUES ('img-hm-md-02-1', 'hm-md-02', 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1000&q=80', 'Arched Brass Minimalist Floor Mirror', true, 1)
ON CONFLICT (id) DO UPDATE SET
  image_url = EXCLUDED.image_url,
  alt_text = EXCLUDED.alt_text,
  is_primary = EXCLUDED.is_primary,
  display_order = EXCLUDED.display_order;
INSERT INTO public.product_images (id, product_id, image_url, alt_text, is_primary, display_order)
VALUES ('img-hm-al-01-1', 'hm-al-01', 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=1000&q=80', 'Cordless Rechargeable Mushroom Table Lamp', true, 1)
ON CONFLICT (id) DO UPDATE SET
  image_url = EXCLUDED.image_url,
  alt_text = EXCLUDED.alt_text,
  is_primary = EXCLUDED.is_primary,
  display_order = EXCLUDED.display_order;
INSERT INTO public.product_images (id, product_id, image_url, alt_text, is_primary, display_order)
VALUES ('img-hm-al-02-1', 'hm-al-02', 'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=1000&q=80', 'Sunset Projection Halo Mood Lamp', true, 1)
ON CONFLICT (id) DO UPDATE SET
  image_url = EXCLUDED.image_url,
  alt_text = EXCLUDED.alt_text,
  is_primary = EXCLUDED.is_primary,
  display_order = EXCLUDED.display_order;
INSERT INTO public.product_images (id, product_id, image_url, alt_text, is_primary, display_order)
VALUES ('img-hm-be-01-1', 'hm-be-01', 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=1000&q=80', 'Washed Natural Linen Duvet Cover Set', true, 1)
ON CONFLICT (id) DO UPDATE SET
  image_url = EXCLUDED.image_url,
  alt_text = EXCLUDED.alt_text,
  is_primary = EXCLUDED.is_primary,
  display_order = EXCLUDED.display_order;
INSERT INTO public.product_images (id, product_id, image_url, alt_text, is_primary, display_order)
VALUES ('img-hm-be-02-1', 'hm-be-02', 'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?w=1000&q=80', 'Weighted Bamboo Cooling Blanket', true, 1)
ON CONFLICT (id) DO UPDATE SET
  image_url = EXCLUDED.image_url,
  alt_text = EXCLUDED.alt_text,
  is_primary = EXCLUDED.is_primary,
  display_order = EXCLUDED.display_order;
INSERT INTO public.product_images (id, product_id, image_url, alt_text, is_primary, display_order)
VALUES ('img-hm-kd-01-1', 'hm-kd-01', 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=1000&q=80', 'Matte Ceramic 12-Piece Dinnerware Set', true, 1)
ON CONFLICT (id) DO UPDATE SET
  image_url = EXCLUDED.image_url,
  alt_text = EXCLUDED.alt_text,
  is_primary = EXCLUDED.is_primary,
  display_order = EXCLUDED.display_order;
INSERT INTO public.product_images (id, product_id, image_url, alt_text, is_primary, display_order)
VALUES ('img-hm-kd-02-1', 'hm-kd-02', 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=1000&q=80', 'Double-Wall Borosilicate Coffee Glasses Set', true, 1)
ON CONFLICT (id) DO UPDATE SET
  image_url = EXCLUDED.image_url,
  alt_text = EXCLUDED.alt_text,
  is_primary = EXCLUDED.is_primary,
  display_order = EXCLUDED.display_order;
INSERT INTO public.product_images (id, product_id, image_url, alt_text, is_primary, display_order)
VALUES ('img-hm-ba-01-1', 'hm-ba-01', 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1000&q=80', 'Natural Bamboo Bathtub Caddy Tray', true, 1)
ON CONFLICT (id) DO UPDATE SET
  image_url = EXCLUDED.image_url,
  alt_text = EXCLUDED.alt_text,
  is_primary = EXCLUDED.is_primary,
  display_order = EXCLUDED.display_order;
INSERT INTO public.product_images (id, product_id, image_url, alt_text, is_primary, display_order)
VALUES ('img-hm-ba-02-1', 'hm-ba-02', 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=1000&q=80', 'Stone Textured Soap Dispenser and Tumbler Set', true, 1)
ON CONFLICT (id) DO UPDATE SET
  image_url = EXCLUDED.image_url,
  alt_text = EXCLUDED.alt_text,
  is_primary = EXCLUDED.is_primary,
  display_order = EXCLUDED.display_order;
INSERT INTO public.product_images (id, product_id, image_url, alt_text, is_primary, display_order)
VALUES ('img-hm-hf-01-1', 'hm-hf-01', 'https://images.unsplash.com/photo-1603006905003-be475563bc59?w=1000&q=80', 'Hand-Poured Soy Wax Scented Candle', true, 1)
ON CONFLICT (id) DO UPDATE SET
  image_url = EXCLUDED.image_url,
  alt_text = EXCLUDED.alt_text,
  is_primary = EXCLUDED.is_primary,
  display_order = EXCLUDED.display_order;
INSERT INTO public.product_images (id, product_id, image_url, alt_text, is_primary, display_order)
VALUES ('img-hm-hf-02-1', 'hm-hf-02', 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=1000&q=80', 'Ultrasonic Matte Ceramic Aroma Diffuser', true, 1)
ON CONFLICT (id) DO UPDATE SET
  image_url = EXCLUDED.image_url,
  alt_text = EXCLUDED.alt_text,
  is_primary = EXCLUDED.is_primary,
  display_order = EXCLUDED.display_order;
INSERT INTO public.product_images (id, product_id, image_url, alt_text, is_primary, display_order)
VALUES ('img-hm-so-01-1', 'hm-so-01', 'https://images.unsplash.com/photo-1544816155-12df9643f363?w=1000&q=80', 'Woven Cotton Rope Storage Basket', true, 1)
ON CONFLICT (id) DO UPDATE SET
  image_url = EXCLUDED.image_url,
  alt_text = EXCLUDED.alt_text,
  is_primary = EXCLUDED.is_primary,
  display_order = EXCLUDED.display_order;
INSERT INTO public.product_images (id, product_id, image_url, alt_text, is_primary, display_order)
VALUES ('img-hm-so-02-1', 'hm-so-02', 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=1000&q=80', 'Stackable Acrylic Closet Drawer Organizers 3-Pack', true, 1)
ON CONFLICT (id) DO UPDATE SET
  image_url = EXCLUDED.image_url,
  alt_text = EXCLUDED.alt_text,
  is_primary = EXCLUDED.is_primary,
  display_order = EXCLUDED.display_order;
INSERT INTO public.product_images (id, product_id, image_url, alt_text, is_primary, display_order)
VALUES ('img-mb-cs-01-1', 'mb-cs-01', 'https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=1000&q=80', 'Magnetic Matte Slim Phone Case', true, 1)
ON CONFLICT (id) DO UPDATE SET
  image_url = EXCLUDED.image_url,
  alt_text = EXCLUDED.alt_text,
  is_primary = EXCLUDED.is_primary,
  display_order = EXCLUDED.display_order;
INSERT INTO public.product_images (id, product_id, image_url, alt_text, is_primary, display_order)
VALUES ('img-mb-cs-02-1', 'mb-cs-02', 'https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=1000&q=80', 'Full-Grain Leather Magnetic Phone Case', true, 1)
ON CONFLICT (id) DO UPDATE SET
  image_url = EXCLUDED.image_url,
  alt_text = EXCLUDED.alt_text,
  is_primary = EXCLUDED.is_primary,
  display_order = EXCLUDED.display_order;
INSERT INTO public.product_images (id, product_id, image_url, alt_text, is_primary, display_order)
VALUES ('img-mb-cg-01-1', 'mb-cg-01', 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=1000&q=80', '65W GaN Dual-Port Fast Wall Charger', true, 1)
ON CONFLICT (id) DO UPDATE SET
  image_url = EXCLUDED.image_url,
  alt_text = EXCLUDED.alt_text,
  is_primary = EXCLUDED.is_primary,
  display_order = EXCLUDED.display_order;
INSERT INTO public.product_images (id, product_id, image_url, alt_text, is_primary, display_order)
VALUES ('img-mb-cg-02-1', 'mb-cg-02', 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=1000&q=80', '30W Compact Travel Fast Charger', true, 1)
ON CONFLICT (id) DO UPDATE SET
  image_url = EXCLUDED.image_url,
  alt_text = EXCLUDED.alt_text,
  is_primary = EXCLUDED.is_primary,
  display_order = EXCLUDED.display_order;
INSERT INTO public.product_images (id, product_id, image_url, alt_text, is_primary, display_order)
VALUES ('img-mb-cb-01-1', 'mb-cb-01', 'https://images.unsplash.com/photo-1649959223405-f927e0fc1e05?w=1000&q=80', '100W Braided USB-C Fast Charging Cable', true, 1)
ON CONFLICT (id) DO UPDATE SET
  image_url = EXCLUDED.image_url,
  alt_text = EXCLUDED.alt_text,
  is_primary = EXCLUDED.is_primary,
  display_order = EXCLUDED.display_order;
INSERT INTO public.product_images (id, product_id, image_url, alt_text, is_primary, display_order)
VALUES ('img-mb-cb-02-1', 'mb-cb-02', 'https://plus.unsplash.com/premium_photo-1764113105041-47ff55b80731?w=1000&q=80', 'Reinforced Kevlar Lightning to USB-C Cable', true, 1)
ON CONFLICT (id) DO UPDATE SET
  image_url = EXCLUDED.image_url,
  alt_text = EXCLUDED.alt_text,
  is_primary = EXCLUDED.is_primary,
  display_order = EXCLUDED.display_order;
INSERT INTO public.product_images (id, product_id, image_url, alt_text, is_primary, display_order)
VALUES ('img-mb-eb-01-1', 'mb-eb-01', 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=1000&q=80', 'AeroBuds Pro Active Noise Cancelling Earbuds', true, 1)
ON CONFLICT (id) DO UPDATE SET
  image_url = EXCLUDED.image_url,
  alt_text = EXCLUDED.alt_text,
  is_primary = EXCLUDED.is_primary,
  display_order = EXCLUDED.display_order;
INSERT INTO public.product_images (id, product_id, image_url, alt_text, is_primary, display_order)
VALUES ('img-mb-eb-02-1', 'mb-eb-02', 'https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?w=1000&q=80', 'AirWave Semi-In-Ear Spatial Audio Earphones', true, 1)
ON CONFLICT (id) DO UPDATE SET
  image_url = EXCLUDED.image_url,
  alt_text = EXCLUDED.alt_text,
  is_primary = EXCLUDED.is_primary,
  display_order = EXCLUDED.display_order;
INSERT INTO public.product_images (id, product_id, image_url, alt_text, is_primary, display_order)
VALUES ('img-mb-pb-01-1', 'mb-pb-01', 'https://plus.unsplash.com/premium_photo-1686743401891-bdfc1afe923e?w=1000&q=80', 'VoltTank 20000mAh 65W GaN Laptop Power Bank', true, 1)
ON CONFLICT (id) DO UPDATE SET
  image_url = EXCLUDED.image_url,
  alt_text = EXCLUDED.alt_text,
  is_primary = EXCLUDED.is_primary,
  display_order = EXCLUDED.display_order;
INSERT INTO public.product_images (id, product_id, image_url, alt_text, is_primary, display_order)
VALUES ('img-mb-pb-02-1', 'mb-pb-02', 'https://images.unsplash.com/photo-1788959021344-1b88df1f3864?w=1000&q=80', 'MagSlim 10000mAh Ultra-Thin Magnetic Wireless Power Bank', true, 1)
ON CONFLICT (id) DO UPDATE SET
  image_url = EXCLUDED.image_url,
  alt_text = EXCLUDED.alt_text,
  is_primary = EXCLUDED.is_primary,
  display_order = EXCLUDED.display_order;
INSERT INTO public.product_images (id, product_id, image_url, alt_text, is_primary, display_order)
VALUES ('img-mb-wc-01-1', 'mb-wc-01', 'https://images.unsplash.com/photo-1546118747-af6c57da1491?w=1000&q=80', 'MagStation 3-in-1 Foldable Wireless Charging Station', true, 1)
ON CONFLICT (id) DO UPDATE SET
  image_url = EXCLUDED.image_url,
  alt_text = EXCLUDED.alt_text,
  is_primary = EXCLUDED.is_primary,
  display_order = EXCLUDED.display_order;
INSERT INTO public.product_images (id, product_id, image_url, alt_text, is_primary, display_order)
VALUES ('img-mb-hs-01-1', 'mb-hs-01', 'https://images.unsplash.com/photo-1586105251261-72a756497a11?w=1000&q=80', 'Elevate CNC Solid Aluminum 360 Rotating Desktop Phone Stand', true, 1)
ON CONFLICT (id) DO UPDATE SET
  image_url = EXCLUDED.image_url,
  alt_text = EXCLUDED.alt_text,
  is_primary = EXCLUDED.is_primary,
  display_order = EXCLUDED.display_order;
INSERT INTO public.product_images (id, product_id, image_url, alt_text, is_primary, display_order)
VALUES ('img-mb-sp-01-1', 'mb-sp-01', 'https://images.unsplash.com/photo-1636589343867-f1d643baf04c?w=1000&q=80', '9H Edge-to-Edge Tempered Glass Screen Protector', true, 1)
ON CONFLICT (id) DO UPDATE SET
  image_url = EXCLUDED.image_url,
  alt_text = EXCLUDED.alt_text,
  is_primary = EXCLUDED.is_primary,
  display_order = EXCLUDED.display_order;
INSERT INTO public.product_images (id, product_id, image_url, alt_text, is_primary, display_order)
VALUES ('img-mb-pa-01-1', 'mb-pa-01', 'https://images.unsplash.com/photo-1649708758020-8d648aec13d5?w=1000&q=80', 'SnapGrip Magnetic Bluetooth Smartphone Camera Shutter Grip', true, 1)
ON CONFLICT (id) DO UPDATE SET
  image_url = EXCLUDED.image_url,
  alt_text = EXCLUDED.alt_text,
  is_primary = EXCLUDED.is_primary,
  display_order = EXCLUDED.display_order;