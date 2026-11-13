import React from 'react';
import Link from 'next/link';
import { getCategories, getProducts } from '@/lib/services/api';
import ProductGrid from '@/components/products/ProductGrid';
import { SlidersHorizontal, Search, Filter } from 'lucide-react';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

interface ProductsPageProps {
  searchParams: Promise<{
    category?: string;
    search?: string;
    sort?: 'featured' | 'price-asc' | 'price-desc' | 'rating' | 'newest';
    minPrice?: string;
    maxPrice?: string;
    featured?: string;
  }>;
}

async function ProductsContent({ searchParams }: ProductsPageProps) {
  const resolvedParams = await searchParams;
  const currentCategorySlug = resolvedParams.category;
  const currentSearch = resolvedParams.search || '';
  const currentSort = resolvedParams.sort || 'featured';
  const minPrice = resolvedParams.minPrice ? Number(resolvedParams.minPrice) : undefined;
  const maxPrice = resolvedParams.maxPrice ? Number(resolvedParams.maxPrice) : undefined;
  const isFeatured = resolvedParams.featured === 'true' ? true : undefined;

  const [categories, products] = await Promise.all([
    getCategories(),
    getProducts({
      categorySlug: currentCategorySlug,
      search: currentSearch,
      sort: currentSort,
      minPrice,
      maxPrice,
      featured: isFeatured,
    }),
  ]);

  const activeCategory = categories.find((c) => c.slug === currentCategorySlug);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Header & Breadcrumb */}
      <div className="mb-8 pb-6 border-b border-slate-200">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <nav className="flex items-center gap-2 text-xs text-slate-700 mb-2">
              <Link href="/" className="hover:text-slate-900 transition-colors font-medium">
                Home
              </Link>
              <span>/</span>
              <span className="text-slate-900 font-bold">Catalog</span>
              {activeCategory && (
                <>
                  <span>/</span>
                  <span className="text-indigo-600 font-bold">{activeCategory.name}</span>
                </>
              )}
            </nav>
            <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              {activeCategory ? activeCategory.name : 'All Products in Pakistan'}
            </h1>
            <p className="text-xs sm:text-sm text-slate-700 mt-1 max-w-xl">
              {activeCategory
                ? activeCategory.description
                : 'Browse our complete catalog of electronics, smart wearables, fashion, skincare, and luxury fragrances with nationwide Cash on Delivery.'}
            </p>
          </div>

          <div className="text-xs sm:text-sm text-slate-700 font-medium">
            Showing <span className="font-extrabold text-slate-900">{products.length}</span> curated items
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
        {/* Left Column: Filter Sidebar */}
        <aside className="lg:col-span-1 lg:sticky lg:top-24 lg:self-start space-y-6 lg:max-h-[calc(100vh-7rem)] lg:overflow-y-auto pr-1">
          {/* Categories Filter Box */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-900 uppercase tracking-wider pb-2 border-b border-slate-100">
              <Filter className="w-3.5 h-3.5 text-indigo-600" />
              <span>Departments</span>
            </div>

            <ul className="space-y-1 text-xs">
              <li>
                <Link
                  href={`/products${currentSort ? `?sort=${currentSort}` : ''}`}
                  className={`block px-3 py-2 rounded-xl transition-colors font-semibold ${
                    !currentCategorySlug
                      ? 'bg-slate-900 text-white shadow-2xs'
                      : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900'
                  }`}
                >
                  All Products
                </Link>
              </li>
              {categories.map((cat) => {
                const isSelected = currentCategorySlug === cat.slug;
                return (
                  <li key={cat.id}>
                    <Link
                      href={`/products?category=${cat.slug}${currentSort ? `&sort=${currentSort}` : ''}`}
                      className={`block px-3 py-2 rounded-xl transition-colors font-semibold ${
                        isSelected
                          ? 'bg-slate-900 text-white shadow-2xs'
                          : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900'
                      }`}
                    >
                      {cat.name}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Price Range Filter Box */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider pb-2 border-b border-slate-100">
              Price Range (PKR)
            </h3>
            <div className="flex flex-col gap-1.5 text-xs font-semibold">
              <Link
                href={`/products?${new URLSearchParams({
                  ...(currentCategorySlug ? { category: currentCategorySlug } : {}),
                  ...(currentSort ? { sort: currentSort } : {}),
                }).toString()}`}
                className="text-slate-700 hover:text-indigo-600 py-1"
              >
                All Prices
              </Link>
              <Link
                href={`/products?${new URLSearchParams({
                  ...(currentCategorySlug ? { category: currentCategorySlug } : {}),
                  maxPrice: '5000',
                  ...(currentSort ? { sort: currentSort } : {}),
                }).toString()}`}
                className="text-slate-700 hover:text-indigo-600 py-1"
              >
                Under Rs. 5,000
              </Link>
              <Link
                href={`/products?${new URLSearchParams({
                  ...(currentCategorySlug ? { category: currentCategorySlug } : {}),
                  minPrice: '5000',
                  maxPrice: '15000',
                  ...(currentSort ? { sort: currentSort } : {}),
                }).toString()}`}
                className="text-slate-700 hover:text-indigo-600 py-1"
              >
                Rs. 5,000 to Rs. 15,000
              </Link>
              <Link
                href={`/products?${new URLSearchParams({
                  ...(currentCategorySlug ? { category: currentCategorySlug } : {}),
                  minPrice: '15000',
                  maxPrice: '30000',
                  ...(currentSort ? { sort: currentSort } : {}),
                }).toString()}`}
                className="text-slate-700 hover:text-indigo-600 py-1"
              >
                Rs. 15,000 to Rs. 30,000
              </Link>
              <Link
                href={`/products?${new URLSearchParams({
                  ...(currentCategorySlug ? { category: currentCategorySlug } : {}),
                  minPrice: '30000',
                  ...(currentSort ? { sort: currentSort } : {}),
                }).toString()}`}
                className="text-slate-700 hover:text-indigo-600 py-1"
              >
                Rs. 30,000 and Above
              </Link>
            </div>
          </div>
        </aside>

        {/* Right Column: Search Toolbar & Products Grid */}
        <main className="lg:col-span-3 space-y-6">
          {/* Search Toolbar & Sort Controls */}
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-4">
            {/* Search Input */}
            <form method="GET" action="/products" className="relative flex-1 min-w-[220px]">
              {currentCategorySlug && (
                <input type="hidden" name="category" value={currentCategorySlug} />
              )}
              {currentSort && <input type="hidden" name="sort" value={currentSort} />}
              <input
                type="text"
                name="search"
                defaultValue={currentSearch}
                placeholder="Search products, gadgets, fashion, perfumes..."
                className="w-full pl-9 pr-4 py-2 text-xs rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-600 font-medium"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5 pointer-events-none" />
            </form>

            {/* Sorting Pills */}
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-[11px] font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1 mr-1">
                <SlidersHorizontal className="w-3.5 h-3.5 text-slate-400" />
                Sort:
              </span>
              {[
                { label: 'Featured', value: 'featured' },
                { label: 'Price: Low', value: 'price-asc' },
                { label: 'Price: High', value: 'price-desc' },
                { label: 'Rating', value: 'rating' },
                { label: 'Newest', value: 'newest' },
              ].map((s) => {
                const isCurrent = currentSort === s.value;
                const query = new URLSearchParams({
                  ...(currentCategorySlug ? { category: currentCategorySlug } : {}),
                  ...(currentSearch ? { search: currentSearch } : {}),
                  ...(minPrice !== undefined ? { minPrice: String(minPrice) } : {}),
                  ...(maxPrice !== undefined ? { maxPrice: String(maxPrice) } : {}),
                  sort: s.value,
                }).toString();

                return (
                  <Link
                    key={s.value}
                    href={`/products?${query}`}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                      isCurrent
                        ? 'bg-slate-900 text-white'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200 hover:text-slate-900'
                    }`}
                  >
                    {s.label}
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Product Grid */}
          <ProductGrid
            products={products}
            emptyMessage="No products match your current filters. Try selecting a different category or clearing the search query."
          />
        </main>
      </div>
    </div>
  );
}

export default async function ProductsPage(props: ProductsPageProps) {
  return <ProductsContent {...props} />;
}
