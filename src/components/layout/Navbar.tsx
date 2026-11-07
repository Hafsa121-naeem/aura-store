'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
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
} from 'lucide-react';

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const { itemCount, setIsCartOpen } = useCart();
  const { user, profile, isAdmin, signOut, setMockRole } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'Electronics', href: '/electronics' },
    { label: 'Smart Watches', href: '/smart-watches' },
    { label: 'Fashion', href: '/fashion' },
    { label: 'Beauty & Skincare', href: '/beauty' },
    { label: 'Home & Living', href: '/home-living' },
    { label: 'Mobile Accessories', href: '/mobile-accessories' },
    { label: 'New Arrivals', href: '/new-arrivals' },
    { label: 'Offers', href: '/special-offers', isAccent: true },
  ];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-100 transition-all">
      {/* 1. Subtle Luxury Announcement Strip */}
      <div className="bg-[#0f172a] text-slate-200 text-[11px] py-2 px-4 font-medium tracking-wider">
        <div className="max-w-[1440px] mx-auto flex items-center justify-between">
          <div className="hidden md:flex items-center gap-2 text-slate-400">
            <span>Free Express Nationwide Delivery on Orders Over Rs. 5,000</span>
          </div>

          <div className="flex-1 text-center font-bold tracking-widest uppercase text-[10px] text-[#e2c799]">
            AURA STORE &bull; Cash on Delivery (COD) Nationwide
          </div>

          <div className="hidden lg:flex items-center gap-3 text-slate-400 text-[11px]">
            <Link
              href="/admin/products"
              className="text-amber-400 font-bold hover:text-amber-300 transition-colors flex items-center gap-1.5 bg-amber-400/10 px-2 py-0.5 rounded-md border border-amber-400/30"
            >
              <Shield className="w-3 h-3 text-amber-400" />
              <span>Admin Portal</span>
            </Link>
            <span>&bull;</span>
            <Link href="/account/orders" className="hover:text-white transition-colors">
              Track Order
            </Link>
            <span>&bull;</span>
            <span className="text-slate-200">Official Brand Warranty</span>
          </div>
        </div>
      </div>

      {/* 2. Main Luxury Header */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          {/* Mobile Menu Button */}
          <div className="flex items-center lg:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-800 hover:text-black rounded-lg transition-colors"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

          {/* Luxury Brand Wordmark */}
          <div className="flex items-center shrink-0">
            <Link href="/" className="flex flex-col items-start group">
              <span className="text-2xl sm:text-3xl font-light tracking-[0.22em] text-slate-950 uppercase leading-none group-hover:text-[#b48a4c] transition-colors font-serif">
                AURA STORE
              </span>
              <span className="text-[9px] uppercase tracking-[0.3em] text-[#b48a4c] font-semibold mt-1">
                Luxury &bull; Pakistan
              </span>
            </Link>
          </div>

          {/* Desktop Category Navigation (Organized neatly on single line) */}
          <nav className="hidden lg:flex items-center space-x-7 text-xs tracking-wider uppercase font-medium">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`whitespace-nowrap transition-colors py-1.5 border-b-2 ${
                    isActive
                      ? 'border-slate-950 text-slate-950 font-bold'
                      : 'border-transparent text-slate-600 hover:text-slate-950 hover:border-[#b48a4c]'
                  } ${link.isAccent ? 'text-[#b48a4c] font-bold' : ''}`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Right Utilities: Search, Wishlist, Account, Cart */}
          <div className="flex items-center gap-1.5 sm:gap-3">
            {/* Search Trigger */}
            <button
              type="button"
              onClick={() => setSearchOpen(!searchOpen)}
              className="p-2 text-slate-700 hover:text-slate-950 rounded-full hover:bg-slate-100 transition-colors"
              aria-label="Search Catalog"
            >
              <Search className="w-5 h-5 stroke-[1.5]" />
            </button>

            {/* Wishlist Icon */}
            <Link
              href="/wishlist"
              className="p-2 text-slate-700 hover:text-slate-950 rounded-full hover:bg-slate-100 transition-colors"
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

                      {/* Admin Links - Always Available */}
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

                      {/* Mode Toggle Button */}
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

            {/* Shopping Bag Trigger */}
            <button
              type="button"
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 text-slate-900 hover:text-black rounded-full hover:bg-slate-100 transition-colors"
              aria-label="View Shopping Bag"
            >
              <ShoppingBag className="w-5 h-5 stroke-[1.5]" />
              {itemCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-slate-950 text-white text-[10px] font-bold rounded-full flex items-center justify-center shadow-xs">
                  {itemCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Expandable Search Input Bar */}
      {searchOpen && (
        <div className="border-t border-slate-100 bg-slate-50/90 py-3 px-4 animate-in fade-in">
          <div className="max-w-3xl mx-auto">
            <form onSubmit={handleSearchSubmit} className="relative flex items-center">
              <Search className="absolute left-4 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search luxury handbags, watches, acoustic headphones, fragrances..."
                className="w-full bg-white border border-slate-200 rounded-2xl pl-11 pr-24 py-3 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#b48a4c] shadow-2xs"
                autoFocus
              />
              <button
                type="submit"
                className="absolute right-2 px-4 py-1.5 bg-slate-950 text-white rounded-xl text-xs font-bold hover:bg-[#b48a4c] transition-colors"
              >
                Search
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white py-4 px-6 space-y-3">
          <p className="text-[10px] uppercase font-bold tracking-widest text-[#b48a4c]">
            Departments
          </p>
          <div className="grid grid-cols-2 gap-2 text-xs">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 px-3 rounded-xl bg-slate-50 hover:bg-slate-100 font-semibold text-slate-800"
              >
                {link.label}
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
            <Link href="/contact" onClick={() => setMobileMenuOpen(false)}>
              Contact Us
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
        </div>
      )}
    </header>
  );
}
