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
    <div className="max-w-[1760px] mx-auto px-4 sm:px-6 lg:px-10 2xl:px-12 py-8 sm:py-12 bg-[#F5F2EB]">
      {/* Header & Breadcrumb */}
      <div className="mb-8 pb-6 border-b border-[#D8D2C6]/80">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <nav className="flex items-center gap-2 text-[11px] font-mono uppercase tracking-wider text-[#8C867D] mb-2.5">
              <Link href="/" className="hover:text-[#1A1918] transition-colors">
                Home
              </Link>
              <span>/</span>
              <span className="text-[#1A1918]">Catalog</span>
              {activeCategory && (
                <>
                  <span>/</span>
                  <span className="text-[#806B43]">{activeCategory.name}</span>
                </>
              )}
            </nav>
            <h1 className="font-editorial text-3xl sm:text-5xl font-light text-[#1A1918] tracking-tight">
              {activeCategory ? activeCategory.name : 'All Curated Objects'}
            </h1>
            <p className="text-xs sm:text-sm text-[#2B2927] font-normal mt-1.5 max-w-2xl leading-relaxed">
              {activeCategory
                ? activeCategory.description
                : 'Browse our complete catalog of high-fidelity audio, precision smartwatches, luxury leather goods, clean skincare, and architectural living essentials with nationwide Cash on Delivery across Pakistan.'}
            </p>
          </div>

          <div className="text-xs font-mono uppercase tracking-widest text-[#1A1918] font-medium">
            Displaying <span className="text-[#1A1918] font-bold">{products.length}</span> Objects
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 xl:gap-10 items-start">
        {/* Left Column: Filter Sidebar (Sticky) */}
        <aside className="lg:col-span-3 2xl:col-span-2 lg:sticky lg:top-24 lg:self-start space-y-6 lg:max-h-[calc(100vh-7rem)] lg:overflow-y-auto pr-1">
          {/* Departments Filter Box */}
          <div className="bg-[#FAF8F5] p-5 border border-[#D8D2C6] shadow-xs space-y-3">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-[0.2em] text-[#1A1918] font-bold pb-2.5 border-b border-[#D8D2C6]">
              <Filter className="w-3.5 h-3.5 text-[#806B43] stroke-[2.2]" />
              <span className="text-[#1A1918] tracking-widest">Departments</span>
            </div>

            <ul className="space-y-1 text-[13px]">
              <li>
                <Link
                  href={`/products${currentSort ? `?sort=${currentSort}` : ''}`}
                  className={`block px-3.5 py-2.5 transition-colors font-semibold rounded-xs ${
                    !currentCategorySlug
                      ? 'bg-[#1A1918] text-[#FAF8F5] shadow-xs'
                      : 'text-[#1A1918] hover:bg-[#EDE8DF] hover:text-[#806B43]'
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
                      className={`block px-3.5 py-2.5 transition-colors font-semibold rounded-xs ${
                        isSelected
                          ? 'bg-[#1A1918] text-[#FAF8F5] shadow-xs'
                          : 'text-[#1A1918] hover:bg-[#EDE8DF] hover:text-[#806B43]'
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
          <div className="bg-[#FAF8F5] p-5 border border-[#D8D2C6] shadow-xs space-y-3">
            <h3 className="text-xs font-mono uppercase tracking-[0.2em] text-[#1A1918] font-bold pb-2.5 border-b border-[#D8D2C6]">
              Price Range (PKR)
            </h3>
            <div className="flex flex-col gap-1 text-[13px]">
              {[
                { label: 'All Prices', min: undefined, max: undefined },
                { label: 'Under Rs. 5,000', min: undefined, max: 5000 },
                { label: 'Rs. 5,000 to Rs. 15,000', min: 5000, max: 15000 },
                { label: 'Rs. 15,000 to Rs. 30,000', min: 15000, max: 30000 },
                { label: 'Rs. 30,000 and Above', min: 30000, max: undefined },
              ].map((tier) => {
                const isActive =
                  tier.min === undefined && tier.max === undefined
                    ? minPrice === undefined && maxPrice === undefined
                    : minPrice === tier.min && maxPrice === tier.max;

                const query = new URLSearchParams({
                  ...(currentCategorySlug ? { category: currentCategorySlug } : {}),
                  ...(tier.min !== undefined ? { minPrice: String(tier.min) } : {}),
                  ...(tier.max !== undefined ? { maxPrice: String(tier.max) } : {}),
                  ...(currentSort ? { sort: currentSort } : {}),
                }).toString();

                return (
                  <Link
                    key={tier.label}
                    href={`/products?${query}`}
                    className={`px-3.5 py-2 transition-colors flex items-center justify-between font-semibold rounded-xs ${
                      isActive
                        ? 'bg-[#1A1918] text-[#FAF8F5] shadow-xs'
                        : 'text-[#1A1918] hover:bg-[#EDE8DF] hover:text-[#806B43]'
                    }`}
                  >
                    <span>{tier.label}</span>
                    {isActive && (
                      <span className="w-1.5 h-1.5 rounded-full bg-[#C5A880] inline-block ml-2" />
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        </aside>

        {/* Right Column: Search Toolbar & Products Grid */}
        <main className="lg:col-span-9 2xl:col-span-10 space-y-6">
          {/* Search Toolbar & Sort Controls */}
          <div className="bg-[#FAF8F5] p-4 sm:p-5 border border-[#D8D2C6] flex flex-wrap items-center justify-between gap-4">
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
                placeholder="Search objects, audio, watches, leather, ceramics..."
                className="w-full pl-9 pr-4 py-2.5 text-xs border border-[#D8D2C6] bg-[#EDE8DF]/60 focus:bg-[#FAF8F5] focus:outline-none focus:border-[#1A1918] font-medium text-[#1A1918] placeholder-[#5C5852] transition-colors"
              />
              <Search className="w-4 h-4 text-[#1A1918] absolute left-3 top-3 pointer-events-none stroke-[2]" />
            </form>

            {/* Sorting Pills */}
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-[10px] font-mono text-[#1A1918] font-bold uppercase tracking-wider flex items-center gap-1 mr-1">
                <SlidersHorizontal className="w-3.5 h-3.5 text-[#806B43]" />
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
                    className={`px-3 py-1.5 text-[11px] font-mono uppercase tracking-wider transition-colors font-medium ${
                      isCurrent
                        ? 'bg-[#1A1918] text-[#FAF8F5] shadow-xs'
                        : 'bg-[#EDE8DF] text-[#1A1918] border border-[#D8D2C6]/80 hover:bg-[#1A1918] hover:text-[#FAF8F5]'
                    }`}
                  >
                    {s.label}
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Product Grid (Spacious Cards, Complete Titles, Aligned Prices) */}
          <ProductGrid
            products={products}
            emptyMessage="No products match your current filters. Try selecting a different department or clearing the search query."
          />
        </main>
      </div>
    </div>
  );
}

export default async function ProductsPage(props: ProductsPageProps) {
  return <ProductsContent {...props} />;
}
