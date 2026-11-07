'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import AdminGuard from '@/components/admin/AdminGuard';
import AdminHeader from '@/components/admin/AdminHeader';
import { FALLBACK_CATEGORIES } from '@/lib/data/fallback-data';
import { Product, ProductImage, ProductColorVariant, ProductStatus } from '@/lib/types/database';
import { getProductById, updateProduct, createProduct } from '@/lib/services/api';
import { formatPrice } from '@/lib/utils';
import {
  ArrowLeft,
  Save,
  Check,
  AlertCircle,
  ExternalLink,
  Upload,
  Plus,
  Trash2,
  Image as ImageIcon,
  CheckCircle2,
  Eye,
  RefreshCw,
  Layers,
  Sparkles,
  ShieldCheck,
  Package,
  Truck,
  ArrowUp,
  ArrowDown,
  Star,
  Tag,
  DollarSign,
  Boxes,
  Palette,
  FileText,
  Sliders,
} from 'lucide-react';

const CATEGORY_OPTIONS = [
  { id: 'c1-electronics', name: 'Electronics & Gadgets', slug: 'electronics-gadgets' },
  { id: 'c2-watches', name: 'Smart Watches', slug: 'smart-watches' },
  { id: 'c3-fashion', name: 'Fashion & Accessories', slug: 'fashion-accessories' },
  { id: 'c4-beauty', name: 'Beauty & Skincare', slug: 'beauty-skincare' },
  { id: 'c5-home', name: 'Home & Living', slug: 'home-living' },
  { id: 'c6-mobile', name: 'Mobile & Tech Accessories', slug: 'mobile-accessories' },
];

export default function ProductFullEditPage() {
  const params = useParams();
  const router = useRouter();
  const productId = params?.id as string;
  const isNew = productId === 'new';

  const [isLoading, setIsLoading] = useState(!isNew);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toastMessage, setToastMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Form State
  const [id, setId] = useState(isNew ? `prod-${Date.now()}` : productId);
  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [sku, setSku] = useState('');
  const [categoryId, setCategoryId] = useState('c1-electronics');
  const [subcategory, setSubcategory] = useState('');
  const [subcategorySlug, setSubcategorySlug] = useState('');
  const [price, setPrice] = useState<number>(4999);
  const [salePrice, setSalePrice] = useState<number | ''>('');
  const [stock, setStock] = useState<number>(25);
  const [status, setStatus] = useState<ProductStatus>('published');
  const [featured, setFeatured] = useState(false);
  const [isNewArrival, setIsNewArrival] = useState(false);
  const [rating, setRating] = useState<number>(5.0);
  const [reviewCount, setReviewCount] = useState<number>(0);
  const [description, setDescription] = useState('');

  // Technical Specs & Metadata
  const [packaging, setPackaging] = useState('Sealed Retail Packaging with Authenticity Certificate');
  const [warranty, setWarranty] = useState('12 Months Official Brand Replacement Warranty');
  const [shippingInfo, setShippingInfo] = useState('TCS / Leopards Courier Express across Pakistan');
  const [customSpecs, setCustomSpecs] = useState<Array<{ key: string; value: string }>>([
    { key: 'Build Quality', value: 'Aerospace-Grade Precision Tolerances' },
    { key: 'Authentication', value: 'Serialized Hologram Verified' },
  ]);

  // Gallery Images State
  const [images, setImages] = useState<Array<{ url: string; alt: string }>>([]);
  const [newImageUrl, setNewImageUrl] = useState('');

  // Colour Variants State
  const [variants, setVariants] = useState<ProductColorVariant[]>([]);

  // Sizing Options
  const [sizes, setSizes] = useState<string>('');

  // Load product data
  useEffect(() => {
    if (isNew) return;

    let isMounted = true;
    async function loadData() {
      setIsLoading(true);
      try {
        const prod = await getProductById(productId);
        if (prod && isMounted) {
          setId(prod.id);
          setName(prod.name || '');
          setSlug(prod.slug || '');
          setSku(prod.sku || `AUR-PK-${Math.floor(100 + Math.random() * 900)}`);
          setCategoryId(prod.category_id || 'c1-electronics');
          setSubcategory(prod.subcategory || '');
          setSubcategorySlug(prod.subcategory_slug || '');
          setPrice(prod.price || 0);
          setSalePrice(prod.sale_price ?? '');
          setStock(prod.stock ?? 0);
          setStatus(prod.status || 'published');
          setFeatured(Boolean(prod.featured));
          setIsNewArrival(Boolean(prod.is_new));
          setRating(prod.rating ?? 5.0);
          setReviewCount(prod.review_count ?? 0);
          setDescription(prod.description || '');

          if (prod.packaging) setPackaging(prod.packaging);
          if (prod.warranty) setWarranty(prod.warranty);
          if (prod.shipping_info) setShippingInfo(prod.shipping_info);

          if (prod.specs) {
            setCustomSpecs(
              Object.entries(prod.specs).map(([key, value]) => ({ key, value }))
            );
          }

          if (prod.images && prod.images.length > 0) {
            setImages(
              prod.images.map((img) => ({
                url: img.image_url,
                alt: img.alt_text || prod.name,
              }))
            );
          }

          if (prod.color_variants) {
            setVariants(prod.color_variants);
          }
        }
      } catch (err) {
        console.error('Error loading product for editing:', err);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }

    loadData();
    return () => {
      isMounted = false;
    };
  }, [productId, isNew]);

  // Toast Helper
  const showToast = (type: 'success' | 'error', text: string) => {
    setToastMessage({ type, text });
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  // Helper: Auto-generate clean slug from name
  const handleGenerateSlug = () => {
    const generated = name
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
    setSlug(generated);
  };

  // Helper: Auto-generate SKU
  const handleGenerateSku = () => {
    const code = `AUR-${categoryId.replace(/^c\d-/, '').substring(0, 3).toUpperCase()}-${Math.floor(100 + Math.random() * 900)}`;
    setSku(code);
  };

  // Add Image via URL
  const handleAddImageUrl = () => {
    const trimmed = newImageUrl.trim();
    if (!trimmed) return;
    setImages((prev) => [...prev, { url: trimmed, alt: `${name} Photo ${prev.length + 1}` }]);
    setNewImageUrl('');
  };

  // Add Image via File Upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setImages((prev) => [
          ...prev,
          { url: reader.result as string, alt: `${name} Uploaded Image ${prev.length + 1}` },
        ]);
      }
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  };

  // Reorder Images
  const handleMoveImage = (index: number, direction: 'up' | 'down') => {
    setImages((prev) => {
      const copy = [...prev];
      const target = direction === 'up' ? index - 1 : index + 1;
      if (target < 0 || target >= copy.length) return prev;
      const temp = copy[index];
      copy[index] = copy[target];
      copy[target] = temp;
      return copy;
    });
  };

  // Set as Cover Image
  const handleSetPrimaryImage = (index: number) => {
    setImages((prev) => {
      const copy = [...prev];
      const [item] = copy.splice(index, 1);
      return [item, ...copy];
    });
  };

  // Remove Image
  const handleRemoveImage = (index: number) => {
    setImages((prev) => prev.filter((_, idx) => idx !== index));
  };

  // Add Colour Variant
  const handleAddVariant = () => {
    const newVariant: ProductColorVariant = {
      name: `Option ${variants.length + 1}`,
      hex: '#1e293b',
      image_url: images[0]?.url || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80',
      price: price,
      sale_price: salePrice === '' ? null : Number(salePrice),
    };
    setVariants((prev) => [...prev, newVariant]);
  };

  // Update Colour Variant
  const handleUpdateVariant = (index: number, field: keyof ProductColorVariant, value: any) => {
    setVariants((prev) =>
      prev.map((v, idx) => (idx === index ? { ...v, [field]: value } : v))
    );
  };

  // Remove Colour Variant
  const handleRemoveVariant = (index: number) => {
    setVariants((prev) => prev.filter((_, idx) => idx !== index));
  };

  // Add Custom Spec
  const handleAddSpec = () => {
    setCustomSpecs((prev) => [...prev, { key: 'Specification', value: 'Value' }]);
  };

  const handleUpdateSpec = (index: number, field: 'key' | 'value', val: string) => {
    setCustomSpecs((prev) =>
      prev.map((s, idx) => (idx === index ? { ...s, [field]: val } : s))
    );
  };

  const handleRemoveSpec = (index: number) => {
    setCustomSpecs((prev) => prev.filter((_, idx) => idx !== index));
  };

  // Submit Handler
  const handleSaveProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      showToast('error', 'Product title is required.');
      return;
    }

    setIsSubmitting(true);

    try {
      const selectedCat = CATEGORY_OPTIONS.find((c) => c.id === categoryId);
      const parsedSalePrice = salePrice === '' ? null : Number(salePrice);
      const resolvedSlug =
        slug.trim() ||
        name
          .toLowerCase()
          .trim()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/(^-|-$)/g, '');

      // Format images
      const formattedImages: ProductImage[] = images.map((img, idx) => ({
        id: `img-${id}-${idx + 1}`,
        product_id: id,
        image_url: img.url,
        alt_text: img.alt || `${name} Image ${idx + 1}`,
        is_primary: idx === 0,
        display_order: idx + 1,
        created_at: new Date().toISOString(),
      }));

      // Specs dictionary
      const specsDict: Record<string, string> = {};
      customSpecs.forEach((s) => {
        if (s.key.trim()) {
          specsDict[s.key.trim()] = s.value.trim();
        }
      });

      const productPayload: Product = {
        id,
        category_id: categoryId,
        category: selectedCat
          ? ({ id: selectedCat.id, name: selectedCat.name, slug: selectedCat.slug } as any)
          : undefined,
        subcategory: subcategory.trim() || undefined,
        subcategory_slug: subcategorySlug.trim() || subcategory.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        name: name.trim(),
        slug: resolvedSlug,
        description: description.trim(),
        price: Number(price),
        sale_price: parsedSalePrice,
        stock: Number(stock),
        sku: sku.trim() || `AUR-PK-${Math.floor(100 + Math.random() * 900)}`,
        status,
        featured,
        is_new: isNewArrival,
        rating: Number(rating),
        review_count: Number(reviewCount),
        images: formattedImages,
        color_variants: variants,
        warranty,
        packaging,
        shipping_info: shippingInfo,
        specs: specsDict,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };

      if (isNew) {
        await createProduct(productPayload);
        showToast('success', `Product "${name}" successfully created in database!`);
      } else {
        await updateProduct(productPayload);
        showToast('success', `Product "${name}" successfully updated in Supabase database!`);
      }

      // Smooth delay before redirecting to catalog
      setTimeout(() => {
        router.push('/admin/products');
      }, 1200);
    } catch (err) {
      console.error(err);
      showToast('error', err instanceof Error ? err.message : 'Failed to save product to database.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Computed discount
  const parsedSale = salePrice === '' ? null : Number(salePrice);
  const hasDiscount = parsedSale !== null && parsedSale < price;
  const discountPercent = hasDiscount ? Math.round(((price - parsedSale!) / price) * 100) : 0;
  const discountAmount = hasDiscount ? price - parsedSale! : 0;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <AdminGuard>
        {/* Navigation & Header */}
        <AdminHeader />

        {/* Toast Notification */}
        {toastMessage && (
          <div
            className={`fixed bottom-6 right-6 z-50 p-4 rounded-2xl shadow-2xl flex items-center gap-3 border text-xs font-bold animate-in slide-in-from-bottom-4 duration-300 ${
              toastMessage.type === 'success'
                ? 'bg-slate-950 text-white border-emerald-500/60'
                : 'bg-rose-950 text-rose-100 border-rose-500/60'
            }`}
          >
            {toastMessage.type === 'success' ? (
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
            ) : (
              <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />
            )}
            <span>{toastMessage.text}</span>
          </div>
        )}

        {/* Top Control Action Bar */}
        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link
              href="/admin/products"
              className="p-2.5 rounded-2xl border border-slate-200 hover:bg-slate-100 text-slate-700 transition-colors flex items-center justify-center"
              title="Return to Product Catalog"
            >
              <ArrowLeft className="w-4 h-4" />
            </Link>
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 text-[10px] font-black uppercase tracking-wider bg-amber-400 text-slate-950 rounded-md">
                  Admin Editor
                </span>
                <span className="text-xs text-slate-500 font-mono">
                  {isNew ? 'New Product' : `ID: ${id}`}
                </span>
                <span className="text-xs text-slate-500 font-mono">
                  SKU: {sku || 'Pending'}
                </span>
              </div>
              <h1 className="text-xl font-black text-slate-900 tracking-tight mt-0.5">
                {isNew ? 'Create New Product Record' : `Edit: ${name || 'Product Details'}`}
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-3 self-end md:self-auto">
            {!isNew && slug && (
              <Link
                href={`/products/${slug}`}
                target="_blank"
                className="px-4 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-xs font-bold text-slate-700 flex items-center gap-1.5 transition-colors shadow-2xs"
              >
                <Eye className="w-4 h-4 text-indigo-600" />
                <span>View on Website</span>
              </Link>
            )}

            <button
              type="submit"
              form="full-product-edit-form"
              disabled={isSubmitting || isLoading}
              className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-black flex items-center gap-2 transition-all shadow-md shadow-indigo-600/20 disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Saving to Database...</span>
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  <span>{isNew ? 'Create Product' : 'Save Changes'}</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Loading Spinner */}
        {isLoading ? (
          <div className="bg-white rounded-3xl border border-slate-200 p-20 flex flex-col items-center justify-center text-center">
            <RefreshCw className="w-8 h-8 text-indigo-600 animate-spin mb-3" />
            <p className="text-xs font-bold text-slate-600">Loading product record from database...</p>
          </div>
        ) : (
          <form id="full-product-edit-form" onSubmit={handleSaveProduct} className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left Column (8 cols): All Form Fields */}
            <div className="lg:col-span-8 space-y-6">
              {/* 1. Basic Identification */}
              <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-5">
                <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
                  <Tag className="w-4 h-4 text-indigo-600" />
                  <h2 className="text-sm font-black uppercase tracking-wider text-slate-900">
                    1. Basic Product Information
                  </h2>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      Product Title / Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => {
                        setName(e.target.value);
                        if (isNew || !slug) {
                          setSlug(e.target.value.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''));
                        }
                      }}
                      placeholder="e.g. Horizon Pro ANC Hybrid Wireless Over-Ear Headphones"
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-bold text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-600"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <label className="text-xs font-bold text-slate-700">URL Slug / Handle *</label>
                        <button
                          type="button"
                          onClick={handleGenerateSlug}
                          className="text-[11px] font-bold text-indigo-600 hover:text-indigo-800"
                        >
                          Auto-Generate
                        </button>
                      </div>
                      <input
                        type="text"
                        required
                        value={slug}
                        onChange={(e) => setSlug(e.target.value)}
                        placeholder="horizon-pro-anc-headphones"
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-mono font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-600"
                      />
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <label className="text-xs font-bold text-slate-700">SKU Code *</label>
                        <button
                          type="button"
                          onClick={handleGenerateSku}
                          className="text-[11px] font-bold text-indigo-600 hover:text-indigo-800"
                        >
                          Generate SKU
                        </button>
                      </div>
                      <input
                        type="text"
                        required
                        value={sku}
                        onChange={(e) => setSku(e.target.value)}
                        placeholder="AUR-ELE-101"
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-mono font-bold text-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-600"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">
                        Store Department / Category *
                      </label>
                      <select
                        value={categoryId}
                        onChange={(e) => setCategoryId(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-900 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-600"
                      >
                        {CATEGORY_OPTIONS.map((cat) => (
                          <option key={cat.id} value={cat.id}>
                            {cat.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">
                        Subcategory Tag
                      </label>
                      <input
                        type="text"
                        value={subcategory}
                        onChange={(e) => setSubcategory(e.target.value)}
                        placeholder="e.g. Headphones & Audio, Silk Accessories, Dress Belts"
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-600"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">
                        Catalog Status
                      </label>
                      <select
                        value={status}
                        onChange={(e) => setStatus(e.target.value as ProductStatus)}
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-900 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-600"
                      >
                        <option value="published">Published (Live in Store)</option>
                        <option value="draft">Draft (Admin Only)</option>
                        <option value="archived">Archived</option>
                      </select>
                    </div>

                    <div className="flex items-center gap-2 pt-6">
                      <input
                        type="checkbox"
                        id="featured-checkbox"
                        checked={featured}
                        onChange={(e) => setFeatured(e.target.checked)}
                        className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500 border-slate-300"
                      />
                      <label htmlFor="featured-checkbox" className="text-xs font-bold text-slate-800 cursor-pointer">
                        Featured on Homepage
                      </label>
                    </div>

                    <div className="flex items-center gap-2 pt-6">
                      <input
                        type="checkbox"
                        id="new-checkbox"
                        checked={isNewArrival}
                        onChange={(e) => setIsNewArrival(e.target.checked)}
                        className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500 border-slate-300"
                      />
                      <label htmlFor="new-checkbox" className="text-xs font-bold text-slate-800 cursor-pointer">
                        Mark as New Arrival
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              {/* 2. Pricing & Stock */}
              <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-5">
                <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
                  <DollarSign className="w-4 h-4 text-emerald-600" />
                  <h2 className="text-sm font-black uppercase tracking-wider text-slate-900">
                    2. Pricing (PKR / Rs.) & Stock Inventory
                  </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      Regular Price (PKR) *
                    </label>
                    <input
                      type="number"
                      required
                      min={1}
                      value={price}
                      onChange={(e) => setPrice(Number(e.target.value))}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-black text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-600"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      Sale Price (PKR, optional)
                    </label>
                    <input
                      type="number"
                      min={0}
                      value={salePrice}
                      onChange={(e) => setSalePrice(e.target.value === '' ? '' : Number(e.target.value))}
                      placeholder="Leave blank if no discount"
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-black text-emerald-700 focus:outline-none focus:ring-2 focus:ring-indigo-600"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      Available Stock (Units) *
                    </label>
                    <input
                      type="number"
                      required
                      min={0}
                      value={stock}
                      onChange={(e) => setStock(Number(e.target.value))}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-600"
                    />
                  </div>
                </div>

                {/* Savings Summary Banner */}
                {hasDiscount && (
                  <div className="p-3 bg-emerald-50 rounded-2xl border border-emerald-200 flex items-center justify-between text-xs">
                    <span className="font-bold text-emerald-900">
                      Promotional Discount Applied:
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="font-extrabold text-emerald-700 bg-white px-2 py-0.5 rounded-md border border-emerald-300">
                        Save {formatPrice(discountAmount)}
                      </span>
                      <span className="font-black text-emerald-800 bg-emerald-200 px-2 py-0.5 rounded-md">
                        -{discountPercent}% OFF
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {/* 3. Description & Marketing Details */}
              <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
                <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
                  <FileText className="w-4 h-4 text-indigo-600" />
                  <h2 className="text-sm font-black uppercase tracking-wider text-slate-900">
                    3. Detailed Description & Storefront Story
                  </h2>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Product Description (Shown under Product Overview tab) *
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Describe design features, material choices, tolerances, comfort, and benefits..."
                    className="w-full p-4 rounded-xl border border-slate-200 text-xs text-slate-800 leading-relaxed focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-600"
                  />
                  <p className="text-[11px] text-slate-400 mt-1">
                    Keep descriptions authentic, detailed, and completely free of spammy buzzwords.
                  </p>
                </div>
              </div>

              {/* 4. Product Image Gallery */}
              <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-5">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <ImageIcon className="w-4 h-4 text-indigo-600" />
                    <h2 className="text-sm font-black uppercase tracking-wider text-slate-900">
                      4. Product Image Gallery ({images.length} Photos)
                    </h2>
                  </div>
                  <span className="text-xs text-slate-500 font-semibold">
                    First image is always the Primary Cover photo
                  </span>
                </div>

                {/* Add Image Inputs */}
                <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
                  <div className="sm:col-span-8 flex gap-2">
                    <input
                      type="url"
                      placeholder="Paste image URL (https://...)"
                      value={newImageUrl}
                      onChange={(e) => setNewImageUrl(e.target.value)}
                      className="flex-1 px-3.5 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-600"
                    />
                    <button
                      type="button"
                      onClick={handleAddImageUrl}
                      className="px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-indigo-600 transition-colors shrink-0"
                    >
                      Add URL
                    </button>
                  </div>

                  <div className="sm:col-span-4">
                    <label className="flex items-center justify-center gap-2 px-3.5 py-2 rounded-xl border-2 border-dashed border-indigo-200 bg-indigo-50/50 hover:bg-indigo-50 text-indigo-700 text-xs font-bold cursor-pointer transition-colors">
                      <Upload className="w-3.5 h-3.5" />
                      <span>Upload Local File</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileUpload}
                        className="hidden"
                      />
                    </label>
                  </div>
                </div>

                {/* Gallery Items Grid */}
                {images.length === 0 ? (
                  <div className="p-8 text-center border-2 border-dashed border-slate-200 rounded-2xl">
                    <p className="text-xs text-slate-500">No images added yet. Add at least one verified product image.</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
                    {images.map((img, idx) => (
                      <div
                        key={idx}
                        className={`relative rounded-2xl overflow-hidden border-2 bg-slate-50 p-2 flex flex-col justify-between ${
                          idx === 0 ? 'border-indigo-600 ring-2 ring-indigo-600/20' : 'border-slate-200'
                        }`}
                      >
                        <div className="relative aspect-square w-full rounded-xl overflow-hidden bg-white border border-slate-100">
                          <Image
                            src={img.url}
                            alt={img.alt || name}
                            fill
                            className="object-contain p-2"
                            unoptimized
                          />
                          {idx === 0 && (
                            <span className="absolute top-1.5 left-1.5 bg-indigo-600 text-white text-[9px] font-black uppercase px-2 py-0.5 rounded-md shadow-xs">
                              Cover Photo
                            </span>
                          )}
                        </div>

                        {/* Controls */}
                        <div className="pt-2 flex items-center justify-between gap-1">
                          <div className="flex items-center gap-1">
                            <button
                              type="button"
                              onClick={() => handleMoveImage(idx, 'up')}
                              disabled={idx === 0}
                              className="p-1 rounded bg-white hover:bg-slate-100 border text-slate-600 disabled:opacity-30"
                              title="Move Earlier"
                            >
                              <ArrowUp className="w-3 h-3" />
                            </button>
                            <button
                              type="button"
                              onClick={() => handleMoveImage(idx, 'down')}
                              disabled={idx === images.length - 1}
                              className="p-1 rounded bg-white hover:bg-slate-100 border text-slate-600 disabled:opacity-30"
                              title="Move Later"
                            >
                              <ArrowDown className="w-3 h-3" />
                            </button>
                            {idx !== 0 && (
                              <button
                                type="button"
                                onClick={() => handleSetPrimaryImage(idx)}
                                className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-indigo-50 text-indigo-700 hover:bg-indigo-100"
                                title="Make Primary Cover Image"
                              >
                                Set Cover
                              </button>
                            )}
                          </div>

                          <button
                            type="button"
                            onClick={() => handleRemoveImage(idx)}
                            className="p-1 rounded text-rose-500 hover:bg-rose-50"
                            title="Remove Photo"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* 5. Colour Variants & Pricing */}
              <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <Palette className="w-4 h-4 text-indigo-600" />
                    <h2 className="text-sm font-black uppercase tracking-wider text-slate-900">
                      5. Colour Variants & Custom Finishes ({variants.length})
                    </h2>
                  </div>
                  <button
                    type="button"
                    onClick={handleAddVariant}
                    className="px-3 py-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 rounded-xl text-xs font-bold flex items-center gap-1 transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Colour Variant</span>
                  </button>
                </div>

                {variants.length === 0 ? (
                  <p className="text-xs text-slate-500 py-3">
                    No colour variants defined. This product will be sold in its single primary finish.
                  </p>
                ) : (
                  <div className="space-y-3">
                    {variants.map((v, idx) => (
                      <div
                        key={idx}
                        className="p-4 rounded-2xl border border-slate-200 bg-slate-50/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                      >
                        <div className="flex items-center gap-3 w-full sm:w-auto">
                          {/* Colour swatch picker */}
                          <div className="relative">
                            <input
                              type="color"
                              value={v.hex}
                              onChange={(e) => handleUpdateVariant(idx, 'hex', e.target.value)}
                              className="w-10 h-10 rounded-xl cursor-pointer border border-slate-300 p-0.5 bg-white"
                              title="Pick Hex Swatch Colour"
                            />
                          </div>

                          <div className="flex-1 sm:w-48">
                            <label className="text-[10px] text-slate-500 font-bold uppercase block">Colour Name</label>
                            <input
                              type="text"
                              value={v.name}
                              onChange={(e) => handleUpdateVariant(idx, 'name', e.target.value)}
                              placeholder="e.g. Space Black"
                              className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 text-xs font-bold text-slate-900 bg-white"
                            />
                          </div>
                        </div>

                        {/* Variant Image URL */}
                        <div className="flex-1 w-full sm:w-auto">
                          <label className="text-[10px] text-slate-500 font-bold uppercase block">Variant Image URL</label>
                          <input
                            type="url"
                            value={v.image_url}
                            onChange={(e) => handleUpdateVariant(idx, 'image_url', e.target.value)}
                            placeholder="https://images.unsplash.com/..."
                            className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 text-xs text-slate-800 bg-white"
                          />
                        </div>

                        {/* Variant Price */}
                        <div className="w-full sm:w-28">
                          <label className="text-[10px] text-slate-500 font-bold uppercase block">Price (PKR)</label>
                          <input
                            type="number"
                            min={1}
                            value={v.sale_price ?? v.price ?? price}
                            onChange={(e) => {
                              const val = Number(e.target.value);
                              handleUpdateVariant(idx, 'price', val);
                              handleUpdateVariant(idx, 'sale_price', val);
                            }}
                            className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 text-xs font-bold text-slate-900 bg-white"
                          />
                        </div>

                        <button
                          type="button"
                          onClick={() => handleRemoveVariant(idx)}
                          className="p-2 text-rose-500 hover:bg-rose-50 rounded-lg self-end sm:self-center"
                          title="Delete Variant"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* 6. Technical Specifications & Warranty */}
              <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <Sliders className="w-4 h-4 text-indigo-600" />
                    <h2 className="text-sm font-black uppercase tracking-wider text-slate-900">
                      6. Technical Specifications & Storefront Attributes
                    </h2>
                  </div>
                  <button
                    type="button"
                    onClick={handleAddSpec}
                    className="px-3 py-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 rounded-xl text-xs font-bold flex items-center gap-1 transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Custom Spec Row</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Packaging Standard
                    </label>
                    <input
                      type="text"
                      value={packaging}
                      onChange={(e) => setPackaging(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs text-slate-800"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Warranty Period
                    </label>
                    <input
                      type="text"
                      value={warranty}
                      onChange={(e) => setWarranty(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs text-slate-800"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Shipping Partner Info
                    </label>
                    <input
                      type="text"
                      value={shippingInfo}
                      onChange={(e) => setShippingInfo(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs text-slate-800"
                    />
                  </div>
                </div>

                {/* Custom Specs Table */}
                {customSpecs.length > 0 && (
                  <div className="space-y-2 pt-2">
                    <label className="block text-xs font-bold text-slate-700">
                      Custom Specification Rows (Shown under Technical Specifications table)
                    </label>
                    <div className="space-y-2">
                      {customSpecs.map((spec, idx) => (
                        <div key={idx} className="flex items-center gap-3">
                          <input
                            type="text"
                            value={spec.key}
                            onChange={(e) => handleUpdateSpec(idx, 'key', e.target.value)}
                            placeholder="Specification Label (e.g. Battery Life)"
                            className="w-1/3 px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-bold text-slate-800"
                          />
                          <input
                            type="text"
                            value={spec.value}
                            onChange={(e) => handleUpdateSpec(idx, 'value', e.target.value)}
                            placeholder="Value (e.g. Up to 50 Hours Playback)"
                            className="flex-1 px-3 py-1.5 rounded-lg border border-slate-200 text-xs text-slate-800"
                          />
                          <button
                            type="button"
                            onClick={() => handleRemoveSpec(idx)}
                            className="p-1.5 text-rose-500 hover:bg-rose-50 rounded"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Right Column (4 cols): Sticky Live Storefront Preview */}
            <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-8">
              <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-amber-500" />
                    <h3 className="text-xs font-black uppercase tracking-wider text-slate-900">
                      Live Storefront Card Preview
                    </h3>
                  </div>
                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                    Real-time
                  </span>
                </div>

                {/* Simulated Product Card */}
                <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs p-3 space-y-3">
                  <div className="relative aspect-square w-full rounded-xl overflow-hidden bg-slate-50 border border-slate-100">
                    <Image
                      src={
                        images[0]?.url ||
                        'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80'
                      }
                      alt={name || 'Preview'}
                      fill
                      className="object-contain p-4"
                      unoptimized
                    />

                    {/* Badges */}
                    <div className="absolute top-2 left-2 flex flex-col gap-1">
                      {isNewArrival && (
                        <span className="bg-indigo-600 text-white text-[9px] font-black uppercase px-2 py-0.5 rounded-md shadow-2xs">
                          New
                        </span>
                      )}
                      {featured && (
                        <span className="bg-amber-500 text-slate-950 text-[9px] font-black uppercase px-2 py-0.5 rounded-md shadow-2xs">
                          Featured
                        </span>
                      )}
                    </div>

                    {hasDiscount && (
                      <span className="absolute top-2 right-2 bg-rose-600 text-white text-[10px] font-black px-2 py-0.5 rounded-md shadow-2xs">
                        -{discountPercent}%
                      </span>
                    )}
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-[11px] text-slate-500">
                      <span>{CATEGORY_OPTIONS.find((c) => c.id === categoryId)?.name}</span>
                      <span className="font-mono text-[10px]">{sku || 'AUR-SKU'}</span>
                    </div>

                    <h4 className="font-bold text-slate-900 text-xs line-clamp-2">
                      {name || 'Product Title'}
                    </h4>

                    {/* Variants preview swatches */}
                    {variants.length > 0 && (
                      <div className="flex items-center gap-1 pt-1">
                        {variants.slice(0, 4).map((v, i) => (
                          <span
                            key={i}
                            className="w-3 h-3 rounded-full border border-slate-300"
                            style={{ backgroundColor: v.hex }}
                            title={v.name}
                          />
                        ))}
                        {variants.length > 4 && (
                          <span className="text-[10px] text-slate-500 font-bold">
                            +{variants.length - 4}
                          </span>
                        )}
                      </div>
                    )}

                    {/* Price and Stock */}
                    <div className="pt-2 flex items-center justify-between">
                      <div className="flex items-baseline gap-1.5">
                        <span className="text-sm font-black text-slate-950">
                          {formatPrice(hasDiscount ? parsedSale! : price)}
                        </span>
                        {hasDiscount && (
                          <span className="text-[11px] text-slate-400 line-through">
                            {formatPrice(price)}
                          </span>
                        )}
                      </div>

                      {stock === 0 ? (
                        <span className="text-[10px] font-bold text-rose-600 bg-rose-50 px-1.5 py-0.5 rounded">
                          Out of Stock
                        </span>
                      ) : stock < 15 ? (
                        <span className="text-[10px] font-bold text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded">
                          {stock} left
                        </span>
                      ) : (
                        <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded">
                          In Stock
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Primary Action Buttons */}
                <div className="space-y-2 pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting || isLoading}
                    className="w-full py-3 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-black flex items-center justify-center gap-2 transition-all shadow-md shadow-indigo-600/20 disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin" />
                        <span>Saving to Database...</span>
                      </>
                    ) : (
                      <>
                        <Save className="w-4 h-4" />
                        <span>Save to Database</span>
                      </>
                    )}
                  </button>

                  <Link
                    href="/admin/products"
                    className="w-full py-2.5 px-4 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-100 text-xs font-bold text-center block transition-colors"
                  >
                    Cancel & Return to Catalog
                  </Link>
                </div>
              </div>
            </div>
          </form>
        )}
      </AdminGuard>
    </div>
  );
}
