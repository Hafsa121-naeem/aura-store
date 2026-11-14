'use client';

import React, { useState, useEffect, useRef, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'motion/react';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { FALLBACK_PRODUCTS } from '@/lib/data/fallback-data';
import { getProducts } from '@/lib/services/api';
import { Product } from '@/lib/types/database';
import {
  ShoppingBag,
  User as UserIcon,
  Search,
  Heart,
  Menu,
  X,
  Shield,
  LogOut,
  Package,
  ChevronDown,
  ArrowRight,
  Headphones,
  Watch,
  ShoppingBag as BagIcon,
  Sparkle,
  Home,
  Smartphone,
  CheckCircle2,
} from 'lucide-react';

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const { itemCount, setIsCartOpen } = useCart();
  const { user, profile, isAdmin, signOut, setMockRole } = useAuth();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [megaMenuOpen, setMegaMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [livePublishedProducts, setLivePublishedProducts] = useState<Product[]>([]);

  // Fetch live published products from database on mount & when search opens
  useEffect(() => {
    let isMounted = true;
    const fetchPublished = async () => {
      try {
        const prods = await getProducts({ status: 'published' });
        if (isMounted && Array.isArray(prods)) {
          setLivePublishedProducts(prods);
        }
      } catch {
        // Fallback handled
      }
    };
    fetchPublished();
    return () => {
      isMounted = false;
    };
  }, [searchOpen]);

  // Candidate pool strictly excluding ANY draft product
  const searchablePool = useMemo(() => {
    const baseList = livePublishedProducts.length > 0
      ? livePublishedProducts
      : FALLBACK_PRODUCTS.filter((p: Product) => (p.status || 'published') === 'published');

    let valid = baseList.filter((p: Product) => (p.status || 'published') === 'published');
    if (typeof window !== 'undefined') {
      try {
        const stored = localStorage.getItem('aura_products_override');
        if (stored) {
          const overrides = JSON.parse(stored);
          valid = valid.filter((p: Product) => {
            const ov = overrides[p.id] || overrides[p.slug];
            if (ov && ov.status !== 'published') return false;
            return true;
          });
        }
      } catch {}
    }
    return valid;
  }, [livePublishedProducts]);

  const [searchResults, setSearchResults] = useState<Product[]>([]);

  const searchInputRef = useRef<HTMLInputElement>(null);

  // Keyboard shortcut (Cmd+K / Ctrl+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setSearchOpen((prev) => !prev);
      }
      if (e.key === 'Escape') {
        setSearchOpen(false);
        setMegaMenuOpen(false);
        setUserDropdownOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    if (searchOpen && searchInputRef.current) {
      setTimeout(() => searchInputRef.current?.focus(), 100);
    }
  }, [searchOpen]);

  useEffect(() => {
    if (!searchQuery.trim()) {
      setSearchResults(searchablePool.slice(0, 4));
    } else {
      const q = searchQuery.toLowerCase();
      const matched = searchablePool.filter(
        (p: Product) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.subcategory?.toLowerCase().includes(q)
      ).slice(0, 6);
      setSearchResults(matched);
    }
  }, [searchQuery, searchablePool]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
    }
  };

  const departments = [
    {
      id: 'electronics',
      name: 'Acoustic Chamber',
      slug: 'electronics',
      description: 'ANC Beryllium Drivers & Studio Acoustics',
      image: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=600&q=80',
      icon: Headphones,
    },
    {
      id: 'smart-watches',
      name: 'Precision Timepieces',
      slug: 'smart-watches',
      description: 'Titanium AMOLED Wearables & Mechanical Timepieces',
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&q=80',
      icon: Watch,
    },
    {
      id: 'fashion',
      name: 'Luxury Fashion',
      slug: 'fashion',
      description: 'Full-Grain Leather Handcrafted Satchels',
      image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=600&q=80',
      icon: BagIcon,
    },
    {
      id: 'beauty',
      name: 'Botanical & Scent',
      slug: 'beauty',
      description: 'Multi-Peptide Firming Serums & Artisanal Fragrances',
      image: 'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=600&q=80',
      icon: Sparkle,
    },
    {
      id: 'home-living',
      name: 'Living Space',
      slug: 'home-living',
      description: 'Nordic Organic Linens & Hand-Thrown Ceramics',
      image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&q=80',
      icon: Home,
    },
    {
      id: 'mobile-accessories',
      name: 'Mobile Architecture',
      slug: 'mobile-accessories',
      description: 'MagSafe Wireless Docks & GaN Rapid Power',
      image: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=600&q=80',
      icon: Smartphone,
    },
  ];

  return (
    <>
      {/* 1. ferm LIVING Style Quiet Announcement Strip */}
      <div className="hairline-b bg-[#F5F0E8] py-2.5 px-4 sm:px-8 text-[11.5px] text-[#1A1918] font-medium tracking-[0.16em] uppercase flex items-center justify-between border-b border-[#D8D2C6]">
        <div className="hidden sm:flex items-center gap-2.5 text-[#1A1918]">
          <span className="w-2 h-2 rounded-full bg-[#806B43] animate-pulse" />
          <span className="font-semibold text-[#1A1918]">Complimentary express delivery on orders over Rs. 5,000</span>
        </div>

        <div className="text-center flex-1 font-semibold tracking-[0.2em] text-[#1A1918]">
          AURA STORE &bull; Cash on Delivery Nationwide &bull; 7-Day Returns
        </div>

        <div className="hidden md:flex items-center gap-4 text-[11.5px] tracking-wider text-[#1A1918]">
          <Link
            href="/admin/products"
            className="flex items-center gap-1.5 text-[#735A2F] hover:text-[#1A1918] transition-colors font-bold"
          >
            <Shield className="w-3.5 h-3.5 text-[#806B43]" />
            <span>Admin Portal</span>
          </Link>
          <span className="text-[#8C867D]">&bull;</span>
          <Link href="/account/orders" className="hover:text-[#806B43] font-semibold transition-colors">
            Track Order
          </Link>
        </div>
      </div>

      {/* 2. ferm LIVING Architectural Sticky Navigation Bar */}
      <header className="sticky top-0 z-40 bg-[#F5F2EB]/98 backdrop-blur-md hairline-b transition-all">
        <div className="max-w-[1540px] mx-auto px-6 sm:px-10 h-20 flex items-center justify-between">
          
          {/* Mobile Menu Button (Left on mobile) */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-[#1A1918] hover:text-[#806B43] transition-colors"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          {/* Left: Minimalist Category Navigation (ferm LIVING style) */}
          <nav className="hidden lg:flex items-center gap-7 xl:gap-8 text-[13px] font-semibold tracking-[0.2em] uppercase text-[#1A1918]">
            <Link
              href="/"
              className={`transition-colors py-2 ${
                pathname === '/'
                  ? 'text-[#1A1918] font-bold border-b-2 border-[#806B43]'
                  : 'hover:text-[#806B43] text-[#1A1918]'
              }`}
            >
              Home
            </Link>

            {/* Spaces Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setMegaMenuOpen(true)}
              onMouseLeave={() => setMegaMenuOpen(false)}
            >
              <button
                type="button"
                onClick={() => setMegaMenuOpen(!megaMenuOpen)}
                className={`flex items-center gap-1.5 py-2 transition-colors ${
                  megaMenuOpen || pathname.startsWith('/products')
                    ? 'text-[#1A1918] font-bold'
                    : 'hover:text-[#806B43] text-[#1A1918]'
                }`}
              >
                <span>Spaces</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-200 stroke-[2.5] ${
                    megaMenuOpen ? 'rotate-180 text-[#806B43]' : 'text-[#1A1918]'
                  }`}
                />
              </button>

              {/* Architectural Mega Menu */}
              <AnimatePresence>
                {megaMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.18 }}
                    className="absolute left-0 mt-2 w-[840px] bg-[#FAF8F5] border border-[#D8D2C6] p-7 shadow-xl z-50"
                  >
                    <div className="flex items-center justify-between pb-4 mb-5 hairline-b">
                      <div>
                        <h4 className="text-xs font-editorial font-light uppercase tracking-[0.26em] text-[#1A1918]">
                          Curated Architectural Spaces
                        </h4>
                        <p className="text-[11px] text-[#5C5852] font-light mt-0.5">
                          Sourced with official manufacturer warranties and verified nationwide COD.
                        </p>
                      </div>
                      <Link
                        href="/products"
                        onClick={() => setMegaMenuOpen(false)}
                        className="text-xs text-[#806B43] hover:text-[#1A1918] font-light uppercase tracking-[0.2em] flex items-center gap-1 transition-colors"
                      >
                        <span>Full Catalog &rarr;</span>
                      </Link>
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                      {departments.map((dept) => (
                        <Link
                          key={dept.id}
                          href={`/${dept.slug}`}
                          onClick={() => setMegaMenuOpen(false)}
                          className="group p-3 bg-[#F5F2EB]/60 hover:bg-[#EDE8DF] border border-[#D8D2C6]/50 hover:border-[#806B43]/50 transition-all flex gap-3"
                        >
                          <div className="relative w-14 h-14 overflow-hidden shrink-0 bg-[#EDE8DF] border border-[#D8D2C6]/60">
                            <Image
                              src={dept.image}
                              alt={dept.name}
                              fill
                              loading="lazy"
                              sizes="60px"
                              className="object-cover group-hover:scale-105 transition-transform duration-700"
                            />
                          </div>
                          <div className="flex flex-col justify-between">
                            <div>
                              <div className="text-xs font-editorial text-[#1A1918] group-hover:text-[#806B43] transition-colors line-clamp-1 font-normal">
                                {dept.name}
                              </div>
                              <p className="text-[10px] text-[#5C5852] line-clamp-1 mt-0.5 font-light">
                                {dept.description}
                              </p>
                            </div>
                            <span className="text-[9px] uppercase tracking-[0.2em] text-[#806B43] font-light flex items-center gap-1">
                              <span>Enter Space</span>
                              <ArrowRight className="w-2.5 h-2.5 group-hover:translate-x-1 transition-transform" />
                            </span>
                          </div>
                        </Link>
                      ))}
                    </div>

                    <div className="mt-5 pt-3 hairline-t flex items-center justify-between text-[11px] text-[#8C867D] uppercase tracking-[0.16em]">
                      <span>Cash on Delivery Nationwide</span>
                      <span>&bull;</span>
                      <span>Doorstep Inspection</span>
                      <span>&bull;</span>
                      <span className="text-[#1A1918] font-medium">PKR (Rs.) Certified Pricing</span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link href="/products" className="hover:text-[#806B43] text-[#1A1918] font-semibold transition-colors">
              Objects
            </Link>

            <a href="#composition" className="hover:text-[#1A1918] transition-colors text-[#806B43] font-bold flex items-center gap-1.5">
              <span>The Curated Five</span>
              <span className="w-2 h-2 rounded-full bg-[#806B43] animate-pulse" />
            </a>

            <a href="#stories" className="hover:text-[#806B43] text-[#1A1918] font-semibold transition-colors">
              Stories
            </a>
          </nav>

          {/* Center: Quiet Luxury Wordmark */}
          <Link href="/" className="group text-center">
            <span className="text-2xl sm:text-3xl font-editorial font-light tracking-[0.28em] uppercase text-[#1A1918] leading-none group-hover:text-[#806B43] transition-colors">
              AURA STORE
            </span>
          </Link>

          {/* Right: Search, Saved & Bag Utility */}
          <div className="flex items-center gap-4 sm:gap-6 text-[12.5px] font-semibold tracking-[0.18em] uppercase text-[#1A1918]">
            {/* Search Pill */}
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              className="hidden sm:flex items-center gap-2 hover:text-[#806B43] transition-colors"
              aria-label="Search Catalog"
            >
              <span className="font-semibold text-[#1A1918]">Search</span>
              <span className="text-[10px] text-[#5C5852] font-mono tracking-normal bg-[#EAE2D5]/70 px-1.5 py-0.5 rounded-xs border border-[#D8D2C6] font-normal">[⌘K]</span>
            </button>

            {/* Mobile Search Icon */}
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              className="sm:hidden p-1 text-[#1A1918]"
              aria-label="Search Catalog"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* Wishlist Link */}
            <Link
              href="/wishlist"
              className="hidden sm:flex items-center gap-1.5 hover:text-[#1A1918] transition-colors"
              aria-label="Saved Wishlist"
            >
              <Heart className="w-3.5 h-3.5 stroke-[1.5]" />
              <span className="hidden md:inline">Saved</span>
            </Link>

            {/* Account / Dropdown */}
            <div className="relative">
              {user ? (
                <div>
                  <button
                    type="button"
                    onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                    className="flex items-center gap-1 hover:text-[#1A1918] transition-colors"
                    aria-label="Account Menu"
                  >
                    <UserIcon className="w-3.5 h-3.5 stroke-[1.5]" />
                    <span className="hidden md:inline text-[11px] truncate max-w-[80px]">
                      {profile?.full_name?.split(' ')[0] || 'Account'}
                    </span>
                  </button>

                  {userDropdownOpen && (
                    <div className="absolute right-0 mt-3 w-64 bg-[#FAF8F5] border border-[#D8D2C6] p-4 shadow-xl z-50 text-left">
                      <div className="pb-3 mb-2 hairline-b text-xs">
                        <div className="flex items-center justify-between">
                          <p className="font-editorial text-sm text-[#1A1918] truncate">
                            {profile?.full_name || 'My Account'}
                          </p>
                          <span className="text-[9px] font-mono uppercase px-2 py-0.5 bg-[#EDE8DF] text-[#1A1918] border border-[#D8D2C6]">
                            {isAdmin ? 'ADMIN' : 'CLIENT'}
                          </span>
                        </div>
                        <p className="text-[11px] text-[#5C5852] truncate font-light mt-0.5">{user.email}</p>
                      </div>

                      <div className="space-y-1 text-xs">
                        <Link
                          href="/account"
                          onClick={() => setUserDropdownOpen(false)}
                          className="block py-1.5 text-[#5C5852] hover:text-[#1A1918] transition-colors font-light"
                        >
                          Profile &amp; Settings
                        </Link>
                        <Link
                          href="/account/orders"
                          onClick={() => setUserDropdownOpen(false)}
                          className="block py-1.5 text-[#5C5852] hover:text-[#1A1918] transition-colors font-light"
                        >
                          Order History
                        </Link>

                        <div className="hairline-t my-2" />

                        <Link
                          href="/admin/products"
                          onClick={() => setUserDropdownOpen(false)}
                          className="flex items-center gap-2 py-1.5 text-[#806B43] hover:text-[#1A1918] transition-colors font-medium"
                        >
                          <Package className="w-3.5 h-3.5" />
                          <span>Manage Products</span>
                        </Link>

                        <button
                          type="button"
                          onClick={() => {
                            setMockRole(isAdmin ? 'customer' : 'admin');
                            setUserDropdownOpen(false);
                          }}
                          className="w-full text-left py-1.5 text-[11px] text-[#5C5852] hover:text-[#1A1918] flex items-center justify-between font-light"
                        >
                          <span>Role: {isAdmin ? 'Store Owner' : 'Customer'}</span>
                          <span className="text-[10px] text-[#806B43] underline font-medium">Switch</span>
                        </button>

                        <div className="hairline-t my-2" />

                        <button
                          type="button"
                          onClick={() => {
                            signOut();
                            setUserDropdownOpen(false);
                          }}
                          className="w-full text-left flex items-center gap-2 py-1.5 text-rose-700 hover:text-rose-900 font-light"
                        >
                          <LogOut className="w-3.5 h-3.5" />
                          <span>Sign Out</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  href="/auth/login"
                  className="hover:text-[#1A1918] transition-colors flex items-center gap-1"
                >
                  <UserIcon className="w-3.5 h-3.5 stroke-[1.5]" />
                  <span className="hidden md:inline">Login</span>
                </Link>
              )}
            </div>

            {/* Shopping Bag Trigger */}
            <button
              type="button"
              onClick={() => setIsCartOpen(true)}
              className="hover:text-[#1A1918] transition-colors font-medium flex items-center gap-2"
              aria-label="Open Shopping Bag"
            >
              <span>Bag</span>
              <span className="w-4 h-4 rounded-full bg-[#1A1918] text-[#F5F2EB] text-[10px] flex items-center justify-center font-bold">
                {itemCount}
              </span>
            </button>
          </div>

        </div>
      </header>

      {/* 3. ferm LIVING Search Overlay Modal */}
      <AnimatePresence>
        {searchOpen && (
          <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSearchOpen(false)}
              className="fixed inset-0 bg-[#1A1918]/60 backdrop-blur-sm"
            />

            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.98 }}
              transition={{ duration: 0.2 }}
              className="relative w-full max-w-2xl bg-[#FAF8F5] border border-[#D8D2C6] shadow-2xl p-6 sm:p-8 z-10"
            >
              <div className="flex items-center justify-between pb-4 mb-4 hairline-b">
                <span className="text-xs uppercase tracking-[0.24em] font-light text-[#8C867D]">
                  Search curated objects &amp; spaces
                </span>
                <button
                  type="button"
                  onClick={() => setSearchOpen(false)}
                  className="text-xs uppercase tracking-[0.2em] text-[#5C5852] hover:text-[#1A1918]"
                >
                  [ESC] Close
                </button>
              </div>

              <form onSubmit={handleSearchSubmit} className="relative mb-6">
                <input
                  ref={searchInputRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Type to search: headphones, watches, leather, ceramics..."
                  className="w-full bg-[#F5F2EB] border border-[#D8D2C6] px-5 py-4 text-sm sm:text-base text-[#1A1918] placeholder-[#8C867D] focus:outline-none focus:border-[#806B43] font-editorial text-lg tracking-wide"
                />
                <button
                  type="submit"
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-xs uppercase tracking-[0.2em] font-medium text-[#806B43] hover:text-[#1A1918]"
                >
                  Search &rarr;
                </button>
              </form>

              {/* Instant Search Results */}
              <div className="space-y-3">
                <span className="text-[10px] uppercase tracking-[0.24em] text-[#8C867D] block">
                  {searchQuery ? `Matching Objects (${searchResults.length})` : 'Curated Highlights'}
                </span>

                <div className="divide-y divide-[#D8D2C6]/50 max-h-72 overflow-y-auto">
                  {searchResults.map((item: Product) => (
                    <Link
                      key={item.id}
                      href={`/products/${item.slug}`}
                      onClick={() => setSearchOpen(false)}
                      className="py-3 flex items-center justify-between group hover:bg-[#F5F2EB] px-2 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className="relative w-10 h-10 bg-[#EDE8DF] overflow-hidden shrink-0 border border-[#D8D2C6]/50">
                          <Image
                            src={item.images?.[0]?.image_url || 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=200&q=80'}
                            alt={item.name}
                            fill
                            loading="lazy"
                            sizes="40px"
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <div className="text-xs font-editorial text-[#1A1918] group-hover:text-[#806B43] transition-colors">
                            {item.name}
                          </div>
                          <span className="text-[10px] text-[#8C867D] uppercase tracking-wider">
                            {item.category?.name || item.subcategory || 'Curated Object'}
                          </span>
                        </div>
                      </div>
                      <span className="text-xs font-light text-[#1A1918]">
                        Rs. {item.price.toLocaleString()}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 4. ferm LIVING Mobile Menu Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-[#1A1918]/60 backdrop-blur-sm"
            />

            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="relative w-4/5 max-w-sm h-full bg-[#FAF8F5] p-6 flex flex-col justify-between overflow-y-auto z-10"
            >
              <div>
                <div className="flex items-center justify-between pb-4 mb-6 hairline-b">
                  <span className="font-editorial text-xl font-light tracking-[0.24em] uppercase text-[#1A1918]">
                    AURA STORE
                  </span>
                  <button
                    type="button"
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-1 text-[#1A1918]"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="space-y-3.5 text-xs uppercase tracking-[0.2em] font-semibold text-[#1A1918]">
                  <Link
                    href="/"
                    onClick={() => setMobileMenuOpen(false)}
                    className={`block py-2.5 border-b border-[#D8D2C6] transition-colors ${
                      pathname === '/' ? 'text-[#806B43] font-bold' : 'text-[#1A1918] hover:text-[#806B43]'
                    }`}
                  >
                    Home
                  </Link>
                  <Link
                    href="/products"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block py-2.5 border-b border-[#D8D2C6] text-[#1A1918] font-bold hover:text-[#806B43] transition-colors"
                  >
                    All Objects (Catalog)
                  </Link>
                  <a
                    href="#composition"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block py-2.5 border-b border-[#D8D2C6] text-[#806B43] font-bold hover:text-[#1A1918] transition-colors"
                  >
                    The Curated Five
                  </a>
                  <Link
                    href="/wishlist"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block py-2.5 border-b border-[#D8D2C6] text-[#1A1918] font-bold hover:text-[#806B43] transition-colors"
                  >
                    Saved Wishlist
                  </Link>

                  <div className="pt-4">
                    <span className="text-xs font-mono font-bold text-[#1A1918] uppercase tracking-[0.24em] block mb-3 pb-1.5 border-b border-[#D8D2C6]">
                      Spaces &amp; Departments
                    </span>
                    <div className="space-y-2">
                      {departments.map((d) => (
                        <Link
                          key={d.id}
                          href={`/${d.slug}`}
                          onClick={() => setMobileMenuOpen(false)}
                          className="block text-xs font-semibold text-[#1A1918] hover:text-[#806B43] py-1.5 tracking-wider transition-colors"
                        >
                          {d.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-5 border-t border-[#D8D2C6] text-xs text-[#2B2927] uppercase tracking-[0.16em] space-y-1.5 font-medium">
                <p>Cash on Delivery Nationwide</p>
                <p>Doorstep Inspection Verified</p>
                <p className="text-[#1A1918] font-bold pt-1">Helpline: +92 (0) 300 000 0000</p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
