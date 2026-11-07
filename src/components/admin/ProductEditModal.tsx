'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { X, Upload, Plus, Trash2, Check, AlertCircle, Save, Loader2, Image as ImageIcon, ExternalLink } from 'lucide-react';
import { Product, ProductColorVariant, ProductImage } from '@/lib/types/database';
import { updateProduct, createProduct } from '@/lib/services/api';
import { formatPrice } from '@/lib/utils';

interface ProductEditModalProps {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
  onSaved: (updatedProduct: Product) => void;
  isNew?: boolean;
}

const CATEGORY_OPTIONS = [
  { id: 'c1-electronics', name: 'Electronics', slug: 'electronics-gadgets' },
  { id: 'c2-watches', name: 'Smart Watches', slug: 'smart-watches' },
  { id: 'c3-fashion', name: 'Fashion & Accessories', slug: 'fashion-accessories' },
  { id: 'c4-beauty', name: 'Beauty & Skincare', slug: 'beauty-skincare' },
  { id: 'c5-home', name: 'Home & Living', slug: 'home-living' },
  { id: 'c6-mobile', name: 'Mobile & Tech Accessories', slug: 'mobile-accessories' },
];

export default function ProductEditModal({
  product,
  isOpen,
  onClose,
  onSaved,
  isNew = false,
}: ProductEditModalProps) {
  // Form state
  const [name, setName] = useState(product?.name || '');
  const [description, setDescription] = useState(product?.description || '');
  const [price, setPrice] = useState<number>(product?.price || 0);
  const [salePrice, setSalePrice] = useState<number | ''>(product?.sale_price ?? '');
  const [stock, setStock] = useState<number>(product?.stock ?? 0);
  const [categoryId, setCategoryId] = useState<string>(product?.category_id || 'c1-electronics');
  const [subcategory, setSubcategory] = useState<string>(product?.subcategory || '');
  
  // Images state
  const [images, setImages] = useState<string[]>(() => {
    if (product?.images && product.images.length > 0) {
      return product.images.map((img) => img.image_url);
    }
    return [];
  });
  const [newImageUrl, setNewImageUrl] = useState('');

  // Variants state
  const [variants, setVariants] = useState<ProductColorVariant[]>(
    product?.color_variants ? [...product.color_variants] : []
  );

  // Status
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Keep form in sync when product or isOpen changes
  useEffect(() => {
    if (isOpen && product) {
      setName(product.name || '');
      setDescription(product.description || '');
      setPrice(product.price || 0);
      setSalePrice(product.sale_price ?? '');
      setStock(product.stock ?? 0);
      setCategoryId(product.category_id || 'c1-electronics');
      setSubcategory(product.subcategory || '');
      setImages(
        product.images && product.images.length > 0
          ? product.images.map((img) => img.image_url)
          : []
      );
      setVariants(product.color_variants ? [...product.color_variants] : []);
      setStatusMessage(null);
      setNewImageUrl('');
    }
  }, [isOpen, product]);

  if (!isOpen) return null;

  // Add Image via URL
  const handleAddImageUrl = () => {
    const trimmed = newImageUrl.trim();
    if (!trimmed) return;
    setImages((prev) => [...prev, trimmed]);
    setNewImageUrl('');
  };

  // Add Image via File Upload (reads to base64 Data URL)
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setImages((prev) => [...prev, reader.result as string]);
      }
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  };

  // Remove an Image
  const handleRemoveImage = (index: number) => {
    setImages((prev) => prev.filter((_, idx) => idx !== index));
  };

  // Update a variant price
  const handleVariantPriceChange = (index: number, newPrice: number) => {
    setVariants((prev) =>
      prev.map((v, idx) => (idx === index ? { ...v, price: newPrice, sale_price: newPrice } : v))
    );
  };

  // Handle Save
  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatusMessage(null);

    try {
      const selectedCat = CATEGORY_OPTIONS.find((c) => c.id === categoryId);
      const parsedSalePrice = salePrice === '' ? null : Number(salePrice);

      const resolvedId = isNew
        ? (product.id && !product.id.startsWith('new-') ? product.id : `prod-${Date.now()}`)
        : product.id;

      const resolvedSlug = isNew
        ? (name.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') || `prod-${Date.now()}`)
        : (product.slug || name.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''));

      const formattedImages: ProductImage[] = images.map((url, idx) => ({
        id: `img-${resolvedId}-${idx + 1}`,
        product_id: resolvedId,
        image_url: url,
        alt_text: `${name} Image ${idx + 1}`,
        is_primary: idx === 0,
        display_order: idx + 1,
        created_at: new Date().toISOString(),
      }));

      const updatedData: Product = {
        ...product,
        id: resolvedId,
        slug: resolvedSlug,
        name,
        description,
        price: Number(price),
        sale_price: parsedSalePrice,
        stock: Number(stock),
        category_id: categoryId,
        category: selectedCat ? { ...product.category, id: selectedCat.id, name: selectedCat.name, slug: selectedCat.slug } as any : product.category,
        subcategory,
        images: formattedImages,
        color_variants: variants,
        status: product.status || 'published',
        featured: product.featured ?? false,
        is_new: isNew ? true : (product.is_new ?? false),
        rating: product.rating ?? 5.0,
        review_count: product.review_count ?? 0,
        created_at: product.created_at || new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };

      if (isNew) {
        await createProduct(updatedData);
        setStatusMessage({ type: 'success', text: 'Product created successfully in database!' });
      } else {
        await updateProduct(updatedData);
        setStatusMessage({ type: 'success', text: 'Product updated successfully in database!' });
      }

      onSaved(updatedData);

      setTimeout(() => {
        onClose();
      }, 900);
    } catch (err) {
      console.error(err);
      setStatusMessage({
        type: 'error',
        text: err instanceof Error ? err.message : 'Failed to save product. Please try again.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl max-h-[90vh] bg-white rounded-3xl shadow-2xl flex flex-col overflow-hidden border border-slate-200">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 text-[10px] font-black uppercase tracking-wider bg-amber-500 text-slate-950 rounded-md">
                Admin Mode
              </span>
              <span className="text-xs text-slate-500 font-mono">
                {isNew ? 'New Product' : `ID: ${product.id}`}
              </span>
            </div>
            <h2 className="text-base sm:text-lg font-black text-slate-900 mt-0.5">
              {isNew ? 'Add New Product to Catalog' : `Edit Product: ${product.name}`}
            </h2>
          </div>
          <div className="flex items-center gap-2">
            {!isNew && (
              <a
                href={`/admin/products/${product.id}/edit`}
                className="px-3 py-1.5 text-xs font-bold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 rounded-xl transition-colors flex items-center gap-1.5"
                title="Open Dedicated Separate Product Editing Page"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Separate Edit Page</span>
              </a>
            )}
            <button
              type="button"
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 rounded-full transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body: Scrollable Form */}
        <form id="edit-product-form" onSubmit={handleSave} className="flex-1 overflow-y-auto p-6 space-y-6">
          {statusMessage && (
            <div
              className={`p-3.5 rounded-xl text-xs font-bold flex items-center gap-2 ${
                statusMessage.type === 'success'
                  ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                  : 'bg-rose-50 text-rose-800 border border-rose-200'
              }`}
            >
              {statusMessage.type === 'success' ? (
                <Check className="w-4 h-4 text-emerald-600 shrink-0" />
              ) : (
                <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
              )}
              <span>{statusMessage.text}</span>
            </div>
          )}

          {/* 1. Basic Details */}
          <div className="space-y-4">
            <h3 className="text-xs font-black uppercase tracking-wider text-slate-900 flex items-center gap-2">
              <span>1. Basic Product Information</span>
            </h3>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Product Title / Name *
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent transition-all"
                placeholder="e.g. Horizon Pro Wireless Headphones"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Description *
              </label>
              <textarea
                required
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent transition-all"
                placeholder="Detailed specifications and overview..."
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Category *
                </label>
                <select
                  value={categoryId}
                  onChange={(e) => setCategoryId(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-medium text-slate-900 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-600 transition-all"
                >
                  {CATEGORY_OPTIONS.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Subcategory
                </label>
                <input
                  type="text"
                  value={subcategory}
                  onChange={(e) => setSubcategory(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-600 transition-all"
                  placeholder="e.g. Headphones & Audio"
                />
              </div>
            </div>
          </div>

          {/* 2. Pricing & Stock */}
          <div className="space-y-4 pt-4 border-t border-slate-100">
            <h3 className="text-xs font-black uppercase tracking-wider text-slate-900">
              2. Pricing (PKR / Rs.) &amp; Stock
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Regular Price (PKR) *
                </label>
                <input
                  type="number"
                  required
                  min={1}
                  value={price}
                  onChange={(e) => setPrice(Number(e.target.value))}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-600 transition-all"
                  placeholder="e.g. 26999"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Sale Price (PKR, optional)
                </label>
                <input
                  type="number"
                  min={0}
                  value={salePrice}
                  onChange={(e) => setSalePrice(e.target.value === '' ? '' : Number(e.target.value))}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-bold text-rose-600 focus:outline-none focus:ring-2 focus:ring-indigo-600 transition-all"
                  placeholder="e.g. 22499"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Available Stock (Units) *
                </label>
                <input
                  type="number"
                  required
                  min={0}
                  value={stock}
                  onChange={(e) => setStock(Number(e.target.value))}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-600 transition-all"
                  placeholder="e.g. 25"
                />
              </div>
            </div>
          </div>

          {/* 3. Product Images */}
          <div className="space-y-4 pt-4 border-t border-slate-100">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-black uppercase tracking-wider text-slate-900 flex items-center gap-1.5">
                <ImageIcon className="w-4 h-4 text-indigo-600" />
                <span>3. Product Images ({images.length})</span>
              </h3>
              <span className="text-[11px] text-slate-500">First image is used as primary thumbnail</span>
            </div>

            {/* Existing images list */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {images.map((imgUrl, idx) => (
                <div
                  key={idx}
                  className="relative group rounded-2xl border border-slate-200 overflow-hidden bg-slate-50 aspect-square flex items-center justify-center p-2"
                >
                  <Image
                    src={imgUrl}
                    alt={`Image ${idx + 1}`}
                    fill
                    className="object-contain p-2"
                    unoptimized
                  />
                  {idx === 0 ? (
                    <span className="absolute top-1.5 left-1.5 px-2 py-0.5 rounded-md bg-indigo-600 text-white text-[9px] font-black uppercase shadow-xs">
                      Primary
                    </span>
                  ) : (
                    <button
                      type="button"
                      onClick={() => {
                        setImages((prev) => {
                          const copy = [...prev];
                          const [selected] = copy.splice(idx, 1);
                          copy.unshift(selected);
                          return copy;
                        });
                      }}
                      className="absolute bottom-1.5 left-1.5 px-2 py-0.5 rounded-md bg-slate-900/90 hover:bg-indigo-600 text-white text-[9px] font-black uppercase shadow-xs opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      Set Primary
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(idx)}
                    className="absolute top-1.5 right-1.5 p-1.5 bg-rose-600 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity shadow-sm hover:bg-rose-700"
                    title="Remove image"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>

            {/* Add new image controls */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3">
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="url"
                  value={newImageUrl}
                  onChange={(e) => setNewImageUrl(e.target.value)}
                  placeholder="Paste direct Image URL (e.g. Unsplash or Supabase storage link)..."
                  className="flex-1 px-3.5 py-2 rounded-xl border border-slate-300 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-600 bg-white"
                />
                <button
                  type="button"
                  onClick={handleAddImageUrl}
                  className="px-4 py-2 bg-slate-900 text-white text-xs font-bold rounded-xl hover:bg-indigo-600 transition-colors flex items-center justify-center gap-1.5"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add URL</span>
                </button>
              </div>

              <div className="flex items-center gap-2">
                <label className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 bg-white border border-slate-300 rounded-xl text-xs font-bold text-slate-700 hover:border-indigo-600 hover:text-indigo-600 transition-colors shadow-2xs">
                  <Upload className="w-3.5 h-3.5" />
                  <span>Upload Image from Computer</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </label>
                <span className="text-[11px] text-slate-500">Supports PNG, JPG, WebP</span>
              </div>
            </div>
          </div>

          {/* 4. Product Variants (if applicable) */}
          {variants.length > 0 && (
            <div className="space-y-4 pt-4 border-t border-slate-100">
              <h3 className="text-xs font-black uppercase tracking-wider text-slate-900">
                4. Colour &amp; Style Variants ({variants.length})
              </h3>
              <div className="space-y-2.5">
                {variants.map((v, idx) => (
                  <div
                    key={v.name}
                    className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-3 rounded-2xl border border-slate-200 bg-slate-50/70"
                  >
                    <div className="flex items-center gap-3">
                      <div className="relative w-10 h-10 rounded-xl overflow-hidden bg-white border border-slate-200 shrink-0">
                        <Image src={v.image_url} alt={v.name} fill className="object-contain p-1" unoptimized />
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span
                            className="w-2.5 h-2.5 rounded-full border border-slate-300"
                            style={{ backgroundColor: v.hex }}
                          />
                          <span className="text-xs font-bold text-slate-900">{v.name}</span>
                        </div>
                        <span className="text-[10px] text-slate-500 font-mono">Hex: {v.hex}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 w-full sm:w-auto">
                      <label className="text-[11px] text-slate-600 font-bold whitespace-nowrap">
                        Price (PKR):
                      </label>
                      <input
                        type="number"
                        min={1}
                        value={v.sale_price ?? v.price ?? price}
                        onChange={(e) => handleVariantPriceChange(idx, Number(e.target.value))}
                        className="w-28 px-2.5 py-1.5 rounded-lg border border-slate-300 text-xs font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-600 bg-white"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </form>

        {/* Modal Footer */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-slate-100 bg-slate-50">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl border border-slate-300 text-xs font-bold text-slate-700 hover:bg-slate-100 transition-colors"
          >
            Cancel
          </button>

          <button
            type="submit"
            form="edit-product-form"
            disabled={isSubmitting}
            className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-black flex items-center gap-2 transition-all shadow-md shadow-indigo-600/20 disabled:opacity-50"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>{isNew ? 'Creating in Database...' : 'Saving to Database...'}</span>
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
    </div>
  );
}
