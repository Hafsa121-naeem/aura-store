'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'motion/react';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { formatPrice } from '@/lib/utils';
import { FALLBACK_PRODUCTS, FALLBACK_CATEGORIES } from '@/lib/data/fallback-data';
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
  Sparkles,
  ArrowRight,
  TrendingUp,
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
  const [searchResults, setSearchResults] = useState(FALLBACK_PRODUCTS.slice(0, 4));

  const searchInputRef = useRef<HTMLInputElement>(null);

  // Keyboard shortcut (Cmd+K / Ctrl+K) to open Search
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

  // Focus input when search opens
  useEffect(() => {
    if (searchOpen && searchInputRef.current) {
      setTimeout(() => searchInputRef.current?.focus(), 100);
    }
  }, [searchOpen]);

  // Live filter results as user types
  useEffect(() => {
    if (!searchQuery.trim()) {
      setSearchResults(FALLBACK_PRODUCTS.slice(0, 4));
    } else {
      const q = searchQuery.toLowerCase();
      const matched = FALLBACK_PRODUCTS.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.subcategory?.toLowerCase().includes(q)
      ).slice(0, 6);
      setSearchResults(matched);
    }
  }, [searchQuery]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
    }
  };

  const departmentCategories = [
    {
      id: 'electronics',
      name: 'Electronics & Audio',
      slug: 'electronics',
      description: 'ANC Headphones, Hi-Fi sound systems & studio keyboards',
      image: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=600&q=80',
      icon: Headphones,
      subcategories: ['Over-Ear Headphones', 'Wireless Earbuds', 'Mechanical Keyboards', 'Hi-Fi Speakers'],
    },
    {
      id: 'smart-watches',
      name: 'Smart Watches',
      slug: 'smart-watches',
      description: 'Titanium AMOLED displays, health metrics & luxury straps',
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&q=80',
      icon: Watch,
      subcategories: ['Titanium Series', 'Sapphire AMOLED', 'Milanese Mesh Bands', 'Sports GPS'],
    },
    {
      id: 'fashion',
      name: 'Fashion & Handbags',
      slug: 'fashion',
      description: 'Handcrafted Italian leather totes, satchels & wallets',
      image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=600&q=80',
      icon: BagIcon,
      subcategories: ['Kelly Handbags', 'Tote Bags', 'Crossbody Satchels', 'Silk Scarves'],
    },
    {
      id: 'beauty',
      name: 'Beauty & Skincare',
      slug: 'beauty',
      description: 'Peptide serums, botanical moisturizers & jade sculpting',
      image: 'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=600&q=80',
      icon: Sparkle,
      subcategories: ['Hydrating Serums', 'Restorative Creams', 'Organic Oils', 'Sculpting Rollers'],
    },
    {
      id: 'home-living',
      name: 'Home & Living',
      slug: 'home-living',
      description: 'Nordic linen duvets, ceramic decor & ambient lighting',
      image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&q=80',
      icon: Home,
      subcategories: ['Organic Bedding', 'Minimalist Vases', 'Sculptural Lighting', 'Artisan Rugs'],
    },
    {
      id: 'mobile-accessories',
      name: 'Mobile Accessories',
      slug: 'mobile-accessories',
      description: 'MagSafe charging docks, carbon fiber cases & GaN fast chargers',
      image: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=600&q=80',
      icon: Smartphone,
      subcategories: ['MagSafe Docks', 'GaN Chargers', 'Braided Cables', 'Armor Cases'],
    },
  ];

  return (
    <>
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-xl border-b border-[#FAF7F2] shadow-[0_4px_25px_-5px_rgba(0,0,0,0.03)] transition-all">
        {/* 1. Subtle Luxury Announcement Strip */}
        <div className="bg-[#FAF7F2] text-slate-800 text-[11px] py-2 px-4 border-b border-amber-900/5 font-medium tracking-wide">
          <div className="max-w-[1480px] mx-auto flex items-center justify-between">
            <div className="hidden md:flex items-center gap-2 text-slate-600 text-[10px] tracking-wider uppercase font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-[#b48a4c]" />
              <span>Complimentary Nationwide Express Shipping on Orders Above Rs. 5,000</span>
            </div>

            <div className="flex-1 text-center font-bold tracking-[0.2em] uppercase text-[10px] text-[#8c6b2d]">
              AURA STORE &bull; Official Brand Warranty &bull; Cash on Delivery (COD)
            </div>

            <div className="hidden lg:flex items-center gap-3 text-slate-600 text-[11px]">
              <Link
                href="/admin/products"
                className="text-[#8c6b2d] font-bold hover:text-slate-950 transition-colors flex items-center gap-1.5 bg-amber-100/60 px-2.5 py-0.5 rounded-full border border-amber-200"
              >
                <Shield className="w-3 h-3 text-[#b48a4c]" />
                <span className="text-[10px] uppercase tracking-wider">Admin Portal</span>
              </Link>
              <span>&bull;</span>
              <Link href="/account/orders" className="hover:text-slate-950 transition-colors text-xs">
                Track Order
              </Link>
            </div>
          </div>
        </div>

        {/* 2. Main Luxury Header */}
        <div className="max-w-[1480px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20 gap-4">
            {/* Mobile Menu Button */}
            <div className="flex items-center lg:hidden">
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-slate-800 hover:text-slate-950 rounded-xl hover:bg-slate-100 transition-colors"
                aria-label="Toggle Menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>

            {/* Luxury Brand Wordmark */}
            <div className="flex items-center shrink-0">
              <Link href="/" className="flex flex-col items-start group">
                <span className="text-2xl sm:text-3xl font-light tracking-[0.24em] text-slate-950 uppercase leading-none group-hover:text-[#b48a4c] transition-colors font-serif">
                  AURA STORE
                </span>
                <span className="text-[9px] uppercase tracking-[0.32em] text-[#8c6b2d] font-bold mt-1">
                  Luxury &bull; Pakistan
                </span>
              </Link>
            </div>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center space-x-6 text-xs tracking-wider uppercase font-semibold">
              <Link
                href="/"
                className={`py-2 transition-colors border-b-2 ${
                  pathname === '/'
                    ? 'border-slate-950 text-slate-950'
                    : 'border-transparent text-slate-600 hover:text-slate-950'
                }`}
              >
                Home
              </Link>

              {/* Interactive Mega Menu Trigger */}
              <div
                className="relative"
                onMouseEnter={() => setMegaMenuOpen(true)}
                onMouseLeave={() => setMegaMenuOpen(false)}
              >
                <button
                  type="button"
                  onClick={() => setMegaMenuOpen(!megaMenuOpen)}
                  className={`flex items-center gap-1.5 py-2 transition-colors border-b-2 ${
                    megaMenuOpen || pathname.startsWith('/products')
                      ? 'border-[#b48a4c] text-slate-950'
                      : 'border-transparent text-slate-600 hover:text-slate-950'
                  }`}
                >
                  <span>Departments</span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform duration-200 ${
                      megaMenuOpen ? 'rotate-180 text-[#b48a4c]' : 'text-slate-400'
                    }`}
                  />
                </button>

                {/* Animated Mega Menu Dropdown */}
                <AnimatePresence>
                  {megaMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute left-1/2 -translate-x-1/2 mt-1 w-[920px] bg-white rounded-3xl shadow-[0_25px_60px_-15px_rgba(0,0,0,0.15)] border border-slate-200/90 p-6 z-50 overflow-hidden"
                    >
                      <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100">
                        <div>
                          <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-slate-900">
                            Curated Shopping Departments
                          </h4>
                          <p className="text-[11px] text-slate-500 font-normal">
                            Explore authentic electronics, smartwatches, luxury fashion &amp; lifestyle essentials
                          </p>
                        </div>
                        <Link
                          href="/products"
                          onClick={() => setMegaMenuOpen(false)}
                          className="text-xs text-[#8c6b2d] font-bold flex items-center gap-1 hover:text-slate-950 transition-colors uppercase tracking-wider"
                        >
                          <span>View All Catalog</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>

                      <div className="grid grid-cols-3 gap-4">
                        {departmentCategories.map((dept) => {
                          const IconComp = dept.icon;
                          return (
                            <Link
                              key={dept.id}
                              href={`/${dept.slug}`}
                              onClick={() => setMegaMenuOpen(false)}
                              className="group p-3 rounded-2xl bg-[#FAF7F2]/60 hover:bg-[#FAF7F2] border border-slate-200/60 hover:border-[#b48a4c]/40 transition-all flex gap-3"
                            >
                              <div className="relative w-16 h-16 rounded-xl overflow-hidden shrink-0 bg-white shadow-2xs border border-slate-200/60">
                                <Image
                                  src={dept.image}
                                  alt={dept.name}
                                  fill
                                  sizes="80px"
                                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                                  unoptimized
                                />
                              </div>
                              <div className="flex flex-col justify-between">
                                <div>
                                  <div className="flex items-center gap-1.5 text-xs font-bold text-slate-900 group-hover:text-[#8c6b2d] transition-colors">
                                    <IconComp className="w-3.5 h-3.5 text-[#b48a4c]" />
                                    <span>{dept.name}</span>
                                  </div>
                                  <p className="text-[10px] text-slate-500 line-clamp-1 mt-0.5 font-normal">
                                    {dept.description}
                                  </p>
                                </div>
                                <span className="text-[10px] text-[#8c6b2d] font-semibold flex items-center gap-0.5">
                                  <span>Shop</span>
                                  <ArrowRight className="w-2.5 h-2.5 group-hover:translate-x-1 transition-transform" />
                                </span>
                              </div>
                            </Link>
                          );
                        })}
                      </div>

                      {/* Mega Menu Bottom Strip */}
                      <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-600 bg-amber-50/40 -mx-6 -mb-6 px-6 py-3">
                        <div className="flex items-center gap-4">
                          <span className="flex items-center gap-1 font-semibold text-slate-800">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                            Cash on Delivery Across Pakistan
                          </span>
                          <span className="flex items-center gap-1 font-semibold text-slate-800">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                            7-Day Official Replacement Warranty
                          </span>
                        </div>
                        <span className="font-bold text-[#8c6b2d]">All Prices in PKR (Rs.)</span>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <Link
                href="/electronics"
                className={`py-2 transition-colors border-b-2 ${
                  pathname === '/electronics'
                    ? 'border-slate-950 text-slate-950 font-bold'
                    : 'border-transparent text-slate-600 hover:text-slate-950'
                }`}
              >
                Electronics
              </Link>

              <Link
                href="/smart-watches"
                className={`py-2 transition-colors border-b-2 ${
                  pathname === '/smart-watches'
                    ? 'border-slate-950 text-slate-950 font-bold'
                    : 'border-transparent text-slate-600 hover:text-slate-950'
                }`}
              >
                Watches
              </Link>

              <Link
                href="/fashion"
                className={`py-2 transition-colors border-b-2 ${
                  pathname === '/fashion'
                    ? 'border-slate-950 text-slate-950 font-bold'
                    : 'border-transparent text-slate-600 hover:text-slate-950'
                }`}
              >
                Fashion
              </Link>

              <Link
                href="/beauty"
                className={`py-2 transition-colors border-b-2 ${
                  pathname === '/beauty'
                    ? 'border-slate-950 text-slate-950 font-bold'
                    : 'border-transparent text-slate-600 hover:text-slate-950'
                }`}
              >
                Beauty
              </Link>

              <Link
                href="/home-living"
                className={`py-2 transition-colors border-b-2 ${
                  pathname === '/home-living'
                    ? 'border-slate-950 text-slate-950 font-bold'
                    : 'border-transparent text-slate-600 hover:text-slate-950'
                }`}
              >
                Home
              </Link>

              <Link
                href="/special-offers"
                className="py-1 px-3 rounded-full bg-amber-50 text-[#8c6b2d] border border-amber-200/80 font-bold text-[11px] hover:bg-amber-100 transition-colors flex items-center gap-1"
              >
                <Sparkles className="w-3 h-3 text-[#b48a4c]" />
                <span>Special Offers</span>
              </Link>
            </nav>

            {/* Right Utilities */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Search Trigger with Keycap */}
              <button
                type="button"
                onClick={() => setSearchOpen(true)}
                className="flex items-center gap-2 p-2 sm:px-3 sm:py-2 text-slate-700 hover:text-slate-950 rounded-2xl hover:bg-slate-100 transition-colors border border-transparent hover:border-slate-200"
                aria-label="Search Catalog"
                title="Search products (Cmd+K)"
              >
                <Search className="w-4 h-4 stroke-[1.75]" />
                <span className="hidden xl:inline text-xs font-normal text-slate-500">Search...</span>
                <kbd className="hidden xl:inline-block px-1.5 py-0.5 text-[9px] font-mono bg-slate-100 text-slate-500 rounded border border-slate-200">
                  ⌘K
                </kbd>
              </button>

              {/* Wishlist Link */}
              <Link
                href="/wishlist"
                className="p-2 text-slate-700 hover:text-slate-950 rounded-full hover:bg-slate-100 transition-colors relative"
                aria-label="Saved Wishlist"
              >
                <Heart className="w-5 h-5 stroke-[1.5]" />
              </Link>

              {/* User Account / Profile */}
              <div className="relative">
                {user ? (
                  <div>
                    <button
                      type="button"
                      onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                      className="flex items-center gap-1.5 p-2 text-slate-800 hover:text-slate-950 rounded-full hover:bg-slate-100 transition-colors"
                      aria-label="Account Menu"
                    >
                      <UserIcon className="w-5 h-5 stroke-[1.5]" />
                    </button>

                    {userDropdownOpen && (
                      <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-slate-100 py-2 z-50 animate-in fade-in slide-in-from-top-2">
                        <div className="px-4 py-2 border-b border-slate-100 text-xs">
                          <div className="flex items-center justify-between">
                            <p className="font-bold text-slate-900 truncate">
                              {profile?.full_name || 'My Account'}
                            </p>
                            <span
                              className={`text-[9px] font-black uppercase px-2 py-0.5 rounded-full ${
                                isAdmin
                                  ? 'bg-amber-100 text-amber-900 border border-amber-300'
                                  : 'bg-slate-100 text-slate-600'
                              }`}
                            >
                              {isAdmin ? 'ADMIN' : 'CUSTOMER'}
                            </span>
                          </div>
                          <p className="text-[11px] text-slate-500 truncate">{user.email}</p>
                        </div>

                        <Link
                          href="/account"
                          onClick={() => setUserDropdownOpen(false)}
                          className="block px-4 py-2 text-xs text-slate-700 hover:bg-slate-50 font-medium"
                        >
                          Profile &amp; Settings
                        </Link>

                        <Link
                          href="/account/orders"
                          onClick={() => setUserDropdownOpen(false)}
                          className="block px-4 py-2 text-xs text-slate-700 hover:bg-slate-50 font-medium"
                        >
                          Order History
                        </Link>

                        <div className="border-t border-slate-100 my-1" />

                        <div className="px-4 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center justify-between">
                          <span>Admin Section</span>
                          {isAdmin && <span className="text-[9px] text-emerald-600 font-bold">ACTIVE</span>}
                        </div>

                        <Link
                          href="/admin/products"
                          onClick={() => setUserDropdownOpen(false)}
                          className="flex items-center gap-2 px-4 py-2 text-xs text-indigo-600 font-bold hover:bg-indigo-50"
                        >
                          <Package className="w-3.5 h-3.5" />
                          <span>Manage Products</span>
                        </Link>

                        <Link
                          href="/admin"
                          onClick={() => setUserDropdownOpen(false)}
                          className="flex items-center gap-2 px-4 py-2 text-xs text-[#b48a4c] font-bold hover:bg-amber-50"
                        >
                          <Shield className="w-3.5 h-3.5" />
                          <span>Admin Dashboard</span>
                        </Link>

                        <button
                          type="button"
                          onClick={() => {
                            setMockRole(isAdmin ? 'customer' : 'admin');
                            setUserDropdownOpen(false);
                          }}
                          className="w-full text-left px-4 py-1.5 text-[11px] text-slate-600 hover:bg-slate-50 flex items-center justify-between font-medium"
                        >
                          <span>Role: {isAdmin ? 'Store Owner (Admin)' : 'Customer'}</span>
                          <span className="text-[10px] font-bold text-indigo-600 underline">
                            Switch
                          </span>
                        </button>

                        <div className="border-t border-slate-100 my-1" />

                        <button
                          type="button"
                          onClick={() => {
                            signOut();
                            setUserDropdownOpen(false);
                          }}
                          className="w-full text-left flex items-center gap-2 px-4 py-2 text-xs text-rose-600 hover:bg-rose-50"
                        >
                          <LogOut className="w-3.5 h-3.5" />
                          <span>Sign Out</span>
                        </button>
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    href="/auth/login"
                    className="p-2 text-slate-700 hover:text-slate-950 rounded-full hover:bg-slate-100 transition-colors"
                    aria-label="Sign In"
                  >
                    <UserIcon className="w-5 h-5 stroke-[1.5]" />
                  </Link>
                )}
              </div>

              {/* Shopping Bag Trigger with Spring Bounce */}
              <button
                type="button"
                onClick={() => setIsCartOpen(true)}
                className="relative p-2.5 bg-slate-950 text-white rounded-2xl hover:bg-[#b48a4c] hover:text-slate-950 transition-all shadow-md active:scale-95 flex items-center gap-2"
                aria-label="View Shopping Bag"
              >
                <ShoppingBag className="w-4 h-4 stroke-[2]" />
                <span className="hidden sm:inline text-xs font-bold uppercase tracking-wider">Bag</span>
                {itemCount > 0 && (
                  <motion.span
                    key={itemCount}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-5 h-5 bg-[#b48a4c] text-white text-[10px] font-black rounded-full flex items-center justify-center border-2 border-slate-950 shadow-xs"
                  >
                    {itemCount}
                  </motion.span>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="lg:hidden border-t border-slate-200 bg-white py-4 px-6 space-y-4 overflow-hidden"
            >
              <div className="flex items-center justify-between">
                <p className="text-[10px] uppercase font-bold tracking-widest text-[#8c6b2d]">
                  Shopping Departments
                </p>
                <span className="text-[10px] text-slate-500 font-semibold">PKR (Rs.) Verified</span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs">
                {departmentCategories.map((cat) => (
                  <Link
                    key={cat.id}
                    href={`/${cat.slug}`}
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-3 rounded-2xl bg-[#FAF7F2] hover:bg-white border border-slate-200/80 font-semibold text-slate-900 flex flex-col justify-between transition-all"
                  >
                    <span className="text-xs font-bold">{cat.name}</span>
                    <span className="text-[10px] text-[#8c6b2d] font-normal mt-1">Browse stock &rarr;</span>
                  </Link>
                ))}
              </div>

              <div className="border-t border-slate-100 pt-3 flex justify-between text-xs text-slate-600">
                <Link href="/wishlist" onClick={() => setMobileMenuOpen(false)}>
                  My Wishlist
                </Link>
                <Link href="/account/orders" onClick={() => setMobileMenuOpen(false)}>
                  Track My Order
                </Link>
                <Link href="/special-offers" onClick={() => setMobileMenuOpen(false)} className="text-[#8c6b2d] font-bold">
                  Special Offers
                </Link>
              </div>

              <div className="border-t border-slate-100 pt-3 space-y-1">
                <Link
                  href="/admin/products"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2 py-2 px-3 rounded-xl bg-indigo-50 text-indigo-700 font-bold text-xs"
                >
                  <Package className="w-4 h-4" />
                  <span>Admin: Manage Products</span>
                </Link>
                <Link
                  href="/admin"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2 py-2 px-3 rounded-xl bg-amber-50 text-amber-900 font-bold text-xs"
                >
                  <Shield className="w-4 h-4" />
                  <span>Admin Dashboard</span>
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* 3. Global Spotlight Instant Search Modal */}
      <AnimatePresence>
        {searchOpen && (
          <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 overflow-y-auto">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSearchOpen(false)}
              className="fixed inset-0 bg-slate-950/60 backdrop-blur-md"
            />

            {/* Search Dialog */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 350 }}
              className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden z-10"
            >
              {/* Search Header Input */}
              <form onSubmit={handleSearchSubmit} className="relative flex items-center p-4 border-b border-slate-100">
                <Search className="w-5 h-5 text-slate-400 ml-2 shrink-0" />
                <input
                  ref={searchInputRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search 76 luxury items: ANC headphones, watches, bags..."
                  className="w-full bg-transparent px-4 py-2 text-sm sm:text-base text-slate-900 placeholder:text-slate-400 focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => setSearchOpen(false)}
                  className="p-2 text-slate-400 hover:text-slate-900 rounded-xl hover:bg-slate-100 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </form>

              {/* Instant Results List */}
              <div className="p-4 max-h-[60vh] overflow-y-auto divide-y divide-slate-100">
                <div className="pb-2 text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center justify-between">
                  <span>{searchQuery ? 'Matching Products' : 'Popular Essentials'}</span>
                  <span>Press Esc to close</span>
                </div>

                {searchResults.length === 0 ? (
                  <div className="py-8 text-center text-xs text-slate-500">
                    No products matched &ldquo;{searchQuery}&rdquo;. Try searching for &ldquo;headphones&rdquo;, &ldquo;bag&rdquo;, or &ldquo;watch&rdquo;.
                  </div>
                ) : (
                  searchResults.map((prod) => (
                    <Link
                      key={prod.id}
                      href={`/products/${prod.slug}`}
                      onClick={() => setSearchOpen(false)}
                      className="group flex items-center justify-between py-3 px-2 rounded-2xl hover:bg-[#FAF7F2] transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-white border border-slate-200 shrink-0">
                          <Image
                            src={prod.images?.[0]?.image_url || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80'}
                            alt={prod.name}
                            fill
                            className="object-cover"
                            unoptimized
                          />
                        </div>
                        <div>
                          <p className="text-xs font-bold text-slate-900 group-hover:text-[#8c6b2d] transition-colors line-clamp-1">
                            {prod.name}
                          </p>
                          <p className="text-[11px] text-slate-500 line-clamp-1">
                            {prod.subcategory || 'Luxury Collection'}
                          </p>
                        </div>
                      </div>
                      <div className="text-right shrink-0 pl-2">
                        <span className="text-xs font-black text-slate-950">
                          {formatPrice(prod.sale_price ?? prod.price)}
                        </span>
                        <div className="text-[10px] text-emerald-700 font-semibold">In Stock</div>
                      </div>
                    </Link>
                  ))
                )}
              </div>

              {/* Footer */}
              <div className="p-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                <span>Direct delivery via TCS &amp; Leopards Express</span>
                <Link
                  href="/products"
                  onClick={() => setSearchOpen(false)}
                  className="font-bold text-[#8c6b2d] hover:text-slate-950"
                >
                  Browse all 76 products &rarr;
                </Link>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
