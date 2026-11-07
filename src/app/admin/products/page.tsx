'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import AdminGuard from '@/components/admin/AdminGuard';
import AdminHeader from '@/components/admin/AdminHeader';
import ProductEditModal from '@/components/admin/ProductEditModal';
import { FALLBACK_CATEGORIES } from '@/lib/data/fallback-data';
import { Product } from '@/lib/types/database';
import { formatPrice } from '@/lib/utils';
import { getProducts, deleteProduct } from '@/lib/services/api';
import {
  Plus,
  Trash2,
  Edit3,
  Search,
  ExternalLink,
  Package,
  Layers,
  AlertTriangle,
  CheckCircle2,
  RefreshCw,
  X,
  Eye,
  Check,
  Sliders,
} from 'lucide-react';

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [stockFilter, setStockFilter] = useState<'all' | 'in_stock' | 'low_stock' | 'out_of_stock'>('all');
  const [sortBy, setSortBy] = useState<'newest' | 'price-asc' | 'price-desc' | 'stock-asc' | 'name-asc'>('newest');

  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isNewProduct, setIsNewProduct] = useState(false);
  const [activeProduct, setActiveProduct] = useState<Product | null>(null);

  // Notification toast
  const [toastMessage, setToastMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Load products from API / Supabase / localStorage
  const loadCatalog = async () => {
    setIsLoading(true);
    try {
      const data = await getProducts({});
      setProducts(data);
    } catch (err) {
      console.error('Failed to load products:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadCatalog();
  }, []);

  const showToast = (type: 'success' | 'error', text: string) => {
    setToastMessage({ type, text });
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  // Open Edit Modal for existing product
  const handleEditProduct = (p: Product) => {
    setActiveProduct(p);
    setIsNewProduct(false);
    setIsModalOpen(true);
  };

  // Open Create Modal for new product
  const handleAddNewProduct = () => {
    const blankProduct: Product = {
      id: `prod-${Date.now()}`,
      category_id: selectedCategory !== 'all' ? selectedCategory : 'c1-electronics',
      name: '',
      slug: '',
      description: '',
      price: 4999,
      sale_price: null,
      stock: 25,
      sku: `AUR-PK-${Math.floor(100 + Math.random() * 900)}`,
      status: 'published',
      featured: false,
      is_new: true,
      rating: 5.0,
      review_count: 0,
      images: [],
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    setActiveProduct(blankProduct);
    setIsNewProduct(true);
    setIsModalOpen(true);
  };

  // Handle Saved Product (Create or Edit)
  const handleProductSaved = (savedProduct: Product) => {
    if (isNewProduct) {
      setProducts((prev) => [savedProduct, ...prev]);
      showToast('success', `Product "${savedProduct.name}" created and synced to Supabase!`);
    } else {
      setProducts((prev) =>
        prev.map((item) => (item.id === savedProduct.id ? savedProduct : item))
      );
      showToast('success', `Product "${savedProduct.name}" updated successfully in Supabase!`);
    }
  };

  // Delete product with confirmation
  const handleDeleteProduct = async (p: Product) => {
    const confirmed = window.confirm(
      `Are you sure you want to permanently delete "${p.name}" (SKU: ${p.sku || 'N/A'})?\n\nThis will remove it from the database and public store.`
    );
    if (!confirmed) return;

    try {
      await deleteProduct(p.id);
      setProducts((prev) => prev.filter((item) => item.id !== p.id));
      showToast('success', `Product "${p.name}" deleted from database.`);
    } catch (err) {
      console.error(err);
      showToast('error', 'Failed to delete product. Please try again.');
    }
  };

  // Filtered & Sorted products
  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Category filter
    if (selectedCategory !== 'all') {
      result = result.filter((p) => p.category_id === selectedCategory);
    }

    // Search query filter (name, SKU, subcategory)
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          (p.sku && p.sku.toLowerCase().includes(q)) ||
          (p.subcategory && p.subcategory.toLowerCase().includes(q))
      );
    }

    // Stock filter
    if (stockFilter === 'in_stock') {
      result = result.filter((p) => p.stock >= 15);
    } else if (stockFilter === 'low_stock') {
      result = result.filter((p) => p.stock > 0 && p.stock < 15);
    } else if (stockFilter === 'out_of_stock') {
      result = result.filter((p) => p.stock === 0);
    }

    // Sorting
    if (sortBy === 'price-asc') {
      result.sort((a, b) => (a.sale_price ?? a.price) - (b.sale_price ?? b.price));
    } else if (sortBy === 'price-desc') {
      result.sort((a, b) => (b.sale_price ?? b.price) - (a.sale_price ?? a.price));
    } else if (sortBy === 'stock-asc') {
      result.sort((a, b) => a.stock - b.stock);
    } else if (sortBy === 'name-asc') {
      result.sort((a, b) => a.name.localeCompare(b.name));
    } else {
      // Newest
      result.sort(
        (a, b) => new Date(b.created_at || '').getTime() - new Date(a.created_at || '').getTime()
      );
    }

    return result;
  }, [products, selectedCategory, searchQuery, stockFilter, sortBy]);

  // Catalog Stats
  const totalProductsCount = products.length;
  const lowStockCount = products.filter((p) => p.stock > 0 && p.stock < 15).length;
  const outOfStockCount = products.filter((p) => p.stock === 0).length;
  const healthyStockCount = products.filter((p) => p.stock >= 15).length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <AdminGuard>
        {/* Navigation & Header */}
        <AdminHeader />

        {/* Toast Notification */}
        {toastMessage && (
          <div
            className={`fixed bottom-6 right-6 z-50 p-4 rounded-2xl shadow-xl flex items-center gap-3 border text-xs font-bold animate-in slide-in-from-bottom-4 duration-300 ${
              toastMessage.type === 'success'
                ? 'bg-slate-900 text-white border-emerald-500/50'
                : 'bg-rose-950 text-rose-100 border-rose-500/50'
            }`}
          >
            {toastMessage.type === 'success' ? (
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
            ) : (
              <AlertTriangle className="w-5 h-5 text-rose-400 shrink-0" />
            )}
            <span>{toastMessage.text}</span>
            <button
              onClick={() => setToastMessage(null)}
              className="ml-2 p-1 hover:bg-white/10 rounded-lg text-slate-400 hover:text-white"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* Dashboard Statistics Overview */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 shrink-0">
              <Package className="w-6 h-6" />
            </div>
            <div>
              <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                Total Products
              </p>
              <h3 className="text-2xl font-black text-slate-900 tracking-tight">
                {totalProductsCount}
              </h3>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 shrink-0">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div>
              <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                In Stock Units
              </p>
              <h3 className="text-2xl font-black text-slate-900 tracking-tight">
                {healthyStockCount}
              </h3>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-600 shrink-0">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div>
              <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                Low Stock (&lt; 15)
              </p>
              <h3 className="text-2xl font-black text-amber-600 tracking-tight">
                {lowStockCount}
              </h3>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-rose-50 border border-rose-100 flex items-center justify-center text-rose-600 shrink-0">
              <Layers className="w-6 h-6" />
            </div>
            <div>
              <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                Out of Stock
              </p>
              <h3 className="text-2xl font-black text-rose-600 tracking-tight">
                {outOfStockCount}
              </h3>
            </div>
          </div>
        </div>

        {/* Main Product Management Container */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden">
          {/* Top Control Bar */}
          <div className="p-6 border-b border-slate-100 space-y-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h2 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight flex items-center gap-2">
                  <span>Product Inventory Catalog</span>
                  <span className="text-xs font-extrabold px-2 py-0.5 bg-indigo-50 text-indigo-700 rounded-full border border-indigo-200/60">
                    {filteredProducts.length} Showing
                  </span>
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Real-time database sync with Supabase and verified product images.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2.5">
                <button
                  type="button"
                  onClick={loadCatalog}
                  disabled={isLoading}
                  className="px-3.5 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors flex items-center gap-1.5 disabled:opacity-50"
                  title="Refresh from Database"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
                  <span className="hidden sm:inline">Refresh</span>
                </button>

                <Link
                  href="/admin/products/new/edit"
                  className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-4 py-2 rounded-xl text-xs flex items-center gap-1.5 transition-colors shadow-md shadow-indigo-600/20"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Product</span>
                </Link>
              </div>
            </div>

            {/* Category Filter Tabs */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none pt-2 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setSelectedCategory('all')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                  selectedCategory === 'all'
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'bg-slate-100/80 text-slate-600 hover:bg-slate-200/70 hover:text-slate-900'
                }`}
              >
                <span>All Categories</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                  selectedCategory === 'all' ? 'bg-slate-800 text-slate-300' : 'bg-slate-200 text-slate-700'
                }`}>
                  {totalProductsCount}
                </span>
              </button>

              {FALLBACK_CATEGORIES.map((cat) => {
                const count = products.filter((p) => p.category_id === cat.id).length;
                const isSelected = selectedCategory === cat.id;

                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                      isSelected
                        ? 'bg-slate-900 text-white shadow-xs'
                        : 'bg-slate-100/80 text-slate-600 hover:bg-slate-200/70 hover:text-slate-900'
                    }`}
                  >
                    <span>{cat.name}</span>
                    <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                      isSelected ? 'bg-slate-800 text-slate-300' : 'bg-slate-200 text-slate-700'
                    }`}>
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Search and Secondary Filter Row */}
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 pt-1">
              {/* Search Bar */}
              <div className="sm:col-span-6 relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3 pointer-events-none" />
                <input
                  type="text"
                  placeholder="Search by product name, SKU or subcategory..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-9 py-2 rounded-xl border border-slate-200 bg-slate-50 text-xs text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-600"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-2.5 p-0.5 text-slate-400 hover:text-slate-600 rounded-md"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {/* Stock Filter Dropdown */}
              <div className="sm:col-span-3">
                <select
                  value={stockFilter}
                  onChange={(e) => setStockFilter(e.target.value as any)}
                  aria-label="Filter by Stock Status"
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 text-xs font-semibold text-slate-700 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-600"
                >
                  <option value="all">Stock: All Inventory</option>
                  <option value="in_stock">In Stock (&gt;= 15 units)</option>
                  <option value="low_stock">Low Stock (1 - 14 units)</option>
                  <option value="out_of_stock">Out of Stock (0 units)</option>
                </select>
              </div>

              {/* Sort By Dropdown */}
              <div className="sm:col-span-3">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  aria-label="Sort products by"
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 text-xs font-semibold text-slate-700 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-600"
                >
                  <option value="newest">Sort: Newest Added</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="stock-asc">Stock: Lowest First</option>
                  <option value="name-asc">Name: A to Z</option>
                </select>
              </div>
            </div>
          </div>

          {/* Table / Grid Content */}
          {isLoading ? (
            <div className="py-20 flex flex-col items-center justify-center text-center">
              <RefreshCw className="w-8 h-8 text-indigo-600 animate-spin mb-3" />
              <p className="text-xs font-bold text-slate-600">Loading catalog from Supabase database...</p>
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="py-20 flex flex-col items-center justify-center text-center px-4">
              <div className="w-14 h-14 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-400 mb-3">
                <Package className="w-7 h-7" />
              </div>
              <h3 className="text-sm font-bold text-slate-900 mb-1">No products match your criteria</h3>
              <p className="text-xs text-slate-500 max-w-sm mb-4">
                Try searching with a different term, clearing the filters, or adding a new product.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                  setStockFilter('all');
                }}
                className="px-4 py-2 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 transition-colors"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <>
              {/* Desktop Table View */}
              <div className="hidden md:block overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50/80 text-slate-600 uppercase tracking-wider border-b border-slate-100 font-extrabold text-[10px]">
                    <tr>
                      <th className="py-3.5 px-6 font-extrabold">Product Details</th>
                      <th className="py-3.5 px-4 font-extrabold">Category</th>
                      <th className="py-3.5 px-4 font-extrabold">Price (PKR)</th>
                      <th className="py-3.5 px-4 font-extrabold">Stock Availability</th>
                      <th className="py-3.5 px-4 font-extrabold">Status</th>
                      <th className="py-3.5 px-6 font-extrabold text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-medium">
                    {filteredProducts.map((p) => {
                      const category =
                        FALLBACK_CATEGORIES.find((c) => c.id === p.category_id) || p.category;
                      const primaryImg =
                        p.images?.[0]?.image_url ||
                        'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80';
                      const hasSale = p.sale_price !== null && p.sale_price !== undefined && p.sale_price < p.price;

                      return (
                        <tr
                          key={p.id}
                          className="hover:bg-slate-50/70 transition-colors group"
                        >
                          {/* Image & Title & SKU */}
                          <td className="py-3.5 px-6">
                            <div className="flex items-center gap-3.5">
                              <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-slate-100 flex-shrink-0 border border-slate-200">
                                <Image
                                  src={primaryImg}
                                  alt={p.name}
                                  fill
                                  sizes="48px"
                                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                                  unoptimized
                                />
                              </div>
                              <div className="min-w-0 max-w-sm">
                                <Link
                                  href={`/products/${p.slug}`}
                                  target="_blank"
                                  className="font-bold text-slate-900 hover:text-indigo-600 transition-colors line-clamp-1 block text-xs"
                                  title={p.name}
                                >
                                  {p.name}
                                </Link>
                                <div className="flex items-center gap-2 mt-0.5">
                                  <span className="font-mono text-[10px] text-slate-500 bg-slate-100 px-1.5 py-0.2 rounded font-semibold">
                                    {p.sku || 'NO-SKU'}
                                  </span>
                                  {p.subcategory && (
                                    <span className="text-[10px] text-slate-500 truncate">
                                      {p.subcategory}
                                    </span>
                                  )}
                                  {p.images && p.images.length > 1 && (
                                    <span className="text-[10px] text-indigo-600 font-bold bg-indigo-50 px-1.5 py-0.2 rounded">
                                      {p.images.length} imgs
                                    </span>
                                  )}
                                </div>
                              </div>
                            </div>
                          </td>

                          {/* Category */}
                          <td className="py-3.5 px-4">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-slate-100 text-slate-800">
                              {category?.name || 'General'}
                            </span>
                          </td>

                          {/* Price */}
                          <td className="py-3.5 px-4 font-black text-slate-900">
                            {hasSale ? (
                              <div className="flex flex-col">
                                <span className="text-emerald-600 font-black">
                                  {formatPrice(p.sale_price!)}
                                </span>
                                <span className="text-[10px] text-slate-400 line-through font-normal">
                                  {formatPrice(p.price)}
                                </span>
                              </div>
                            ) : (
                              <span>{formatPrice(p.price)}</span>
                            )}
                          </td>

                          {/* Stock Status Badge */}
                          <td className="py-3.5 px-4">
                            {p.stock === 0 ? (
                              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-bold bg-rose-50 text-rose-700 border border-rose-200">
                                <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                                0 (Out of Stock)
                              </span>
                            ) : p.stock < 15 ? (
                              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-bold bg-amber-50 text-amber-700 border border-amber-200">
                                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                                {p.stock} units (Low)
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                                {p.stock} units
                              </span>
                            )}
                          </td>

                          {/* Status */}
                          <td className="py-3.5 px-4">
                            <span className="bg-slate-100 text-slate-700 text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-md border border-slate-200">
                              {p.status || 'published'}
                            </span>
                          </td>

                          {/* Actions */}
                          <td className="py-3.5 px-6 text-right">
                            <div className="flex items-center justify-end gap-1.5">
                              <Link
                                href={`/products/${p.slug}`}
                                target="_blank"
                                className="p-2 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-colors"
                                title="View public product page"
                              >
                                <ExternalLink className="w-3.5 h-3.5" />
                              </Link>

                              <Link
                                href={`/admin/products/${p.id}/edit`}
                                className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl transition-colors flex items-center gap-1.5 text-[11px] shadow-xs whitespace-nowrap"
                                title="Open Dedicated Separate Product Editing Page"
                              >
                                <Edit3 className="w-3.5 h-3.5" />
                                <span>Edit</span>
                              </Link>

                              <button
                                type="button"
                                onClick={() => handleEditProduct(p)}
                                className="p-1.5 text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                                title="Quick Edit in Popup Modal"
                              >
                                <Sliders className="w-3.5 h-3.5" />
                              </button>

                              <button
                                type="button"
                                onClick={() => handleDeleteProduct(p)}
                                className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-colors"
                                title="Delete Product from Catalog"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* Mobile Card Grid View */}
              <div className="block md:hidden divide-y divide-slate-100">
                {filteredProducts.map((p) => {
                  const category =
                    FALLBACK_CATEGORIES.find((c) => c.id === p.category_id) || p.category;
                  const primaryImg =
                    p.images?.[0]?.image_url ||
                    'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80';
                  const hasSale = p.sale_price !== null && p.sale_price !== undefined && p.sale_price < p.price;

                  return (
                    <div key={p.id} className="p-4 space-y-3">
                      <div className="flex items-start gap-3">
                        <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-slate-100 flex-shrink-0 border border-slate-200">
                          <Image
                            src={primaryImg}
                            alt={p.name}
                            fill
                            sizes="64px"
                            className="object-cover"
                            unoptimized
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-bold text-slate-900 text-xs line-clamp-2">
                            {p.name}
                          </h4>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="font-mono text-[10px] text-slate-500 bg-slate-100 px-1.5 py-0.2 rounded font-semibold">
                              {p.sku || 'NO-SKU'}
                            </span>
                            <span className="text-[10px] text-slate-600 font-semibold">
                              {category?.name}
                            </span>
                          </div>
                          <div className="mt-1 font-black text-slate-900 text-xs">
                            {hasSale ? (
                              <span className="text-emerald-600 mr-2">
                                {formatPrice(p.sale_price!)}
                              </span>
                            ) : (
                              formatPrice(p.price)
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-2 border-t border-slate-50">
                        <div>
                          {p.stock === 0 ? (
                            <span className="text-[10px] font-bold text-rose-600 bg-rose-50 px-2 py-0.5 rounded-md">
                              Out of Stock
                            </span>
                          ) : p.stock < 15 ? (
                            <span className="text-[10px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md">
                              {p.stock} units left
                            </span>
                          ) : (
                            <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                              {p.stock} in stock
                            </span>
                          )}
                        </div>

                        <div className="flex items-center gap-2">
                          <Link
                            href={`/products/${p.slug}`}
                            target="_blank"
                            className="p-1.5 text-slate-500 hover:text-slate-900 rounded-lg border border-slate-200"
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </Link>

                          <Link
                            href={`/admin/products/${p.id}/edit`}
                            className="px-3 py-1.5 bg-indigo-600 text-white font-bold rounded-lg text-xs flex items-center gap-1 shadow-xs whitespace-nowrap"
                          >
                            <Edit3 className="w-3 h-3" />
                            <span>Edit</span>
                          </Link>

                          <button
                            type="button"
                            onClick={() => handleDeleteProduct(p)}
                            className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-lg border border-rose-100"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </div>

        {/* Reusable ProductEditModal for both Edit & Add */}
        {activeProduct && isModalOpen && (
          <ProductEditModal
            product={activeProduct}
            isOpen={isModalOpen}
            isNew={isNewProduct}
            onClose={() => {
              setIsModalOpen(false);
              setActiveProduct(null);
            }}
            onSaved={handleProductSaved}
          />
        )}
      </AdminGuard>
    </div>
  );
}
