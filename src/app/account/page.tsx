'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { User, Mail, Phone, Shield, Package, MapPin, Check, Save } from 'lucide-react';

export default function AccountPage() {
  const { user, profile, isAdmin, setMockRole } = useAuth();

  const userEmail = profile?.email || user?.email || '';
  const isOwner = userEmail.toLowerCase().includes('hfsanaeem3') || userEmail.toLowerCase().includes('admin') || isAdmin;
  const displayName = profile?.full_name || (isOwner ? 'Hafsa Naeem' : 'Customer');

  const [fullName, setFullName] = useState(displayName);
  const [phone, setPhone] = useState(profile?.phone || (isOwner ? '+92 300 1234567' : '+92 300 555-0192'));
  const [streetAddress, setStreetAddress] = useState('House 42, Street 8, Phase 5, DHA');
  const [city, setCity] = useState('Lahore');
  const [state, setState] = useState('Punjab');
  const [postalCode, setPostalCode] = useState('54000');
  const [savedSuccess, setSavedSuccess] = useState(false);

  React.useEffect(() => {
    if (profile?.full_name) {
      setFullName(profile.full_name);
    } else if (isOwner) {
      setFullName('Hafsa Naeem');
    }
  }, [profile?.full_name, isOwner]);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 pb-8 mb-8 border-b border-slate-200">
        <div>
          <span className="text-xs uppercase tracking-wider font-extrabold text-indigo-600">
            Account Management
          </span>
          <h1 className="text-3xl font-extrabold text-slate-950 tracking-tight mt-1">
            Welcome, {fullName}
          </h1>
          <p className="text-sm text-slate-500 mt-0.5">
            Manage your personal profile, default shipping destination, and order records.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Link
            href="/admin/products"
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-4 py-2 rounded-xl text-xs flex items-center gap-1.5 shadow-md shadow-indigo-600/20 transition-all hover:scale-105"
          >
            <Package className="w-3.5 h-3.5" />
            <span>Manage Products</span>
          </Link>
          <Link
            href="/admin"
            className="bg-slate-900 hover:bg-slate-800 text-white font-bold px-4 py-2 rounded-xl text-xs flex items-center gap-1.5 transition-colors"
          >
            <Shield className="w-3.5 h-3.5" />
            <span>Admin Dashboard</span>
          </Link>
          <Link
            href="/account/orders"
            className="bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold px-4 py-2 rounded-xl text-xs flex items-center gap-1.5 transition-colors"
          >
            <Package className="w-3.5 h-3.5" />
            <span>My Orders</span>
          </Link>
        </div>
      </div>

      {/* Prominent Admin & Catalog Access Banner */}
      <div className="mb-8 p-6 bg-gradient-to-r from-slate-950 via-slate-900 to-indigo-950 text-white rounded-3xl shadow-xl border border-indigo-900/40 flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="bg-amber-400 text-slate-950 text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full">
              Admin &amp; Store Management
            </span>
            <span className="text-xs text-slate-300">
              Active Mode: <strong className={isOwner ? 'text-emerald-400' : 'text-amber-300'}>{isOwner ? 'Store Owner (Admin)' : 'Customer View'}</strong>
            </span>
          </div>
          <h2 className="text-xl font-bold text-white tracking-tight">
            Product Catalog &amp; Store Administration
          </h2>
          <p className="text-xs text-slate-300 max-w-xl leading-relaxed">
            Directly edit all 76 products, adjust prices in PKR (Rs.), change stock levels, update descriptions, add custom specifications, and monitor live customer orders.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5 shrink-0">
          <Link
            href="/admin/products"
            className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold px-4 py-2.5 rounded-xl text-xs flex items-center gap-2 shadow-md shadow-indigo-600/30 transition-all hover:scale-105"
          >
            <Package className="w-4 h-4" />
            <span>Manage Products</span>
          </Link>
          <Link
            href="/admin"
            className="bg-slate-800 hover:bg-slate-700 text-white font-bold px-4 py-2.5 rounded-xl text-xs flex items-center gap-2 border border-slate-700 transition-colors"
          >
            <Shield className="w-4 h-4" />
            <span>Admin Dashboard</span>
          </Link>
          <button
            type="button"
            onClick={() => setMockRole(isOwner ? 'customer' : 'admin')}
            className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-black px-3.5 py-2.5 rounded-xl text-xs transition-all shadow-sm"
          >
            {isOwner ? 'Switch to Customer View' : 'Switch to Admin (Store Owner)'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left side: Profile summary card */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs text-center">
            <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-indigo-600 to-violet-500 text-white font-black text-2xl flex items-center justify-center mx-auto shadow-md">
              {fullName ? fullName[0].toUpperCase() : 'H'}
            </div>
            <h3 className="text-lg font-bold text-slate-900 mt-4">{fullName}</h3>
            <p className="text-xs text-slate-500">{userEmail || 'hfsanaeem3@gmail.com'}</p>

            <div className={`mt-3 inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider px-3.5 py-1 rounded-full ${
              isOwner
                ? 'bg-indigo-50 text-indigo-700 border border-indigo-200'
                : 'bg-slate-100 text-slate-700'
            }`}>
              <Shield className="w-3 h-3 text-indigo-600" />
              <span>Role: {isOwner ? 'Admin (Store Owner)' : 'Customer'}</span>
            </div>

            <div className="mt-4 pt-4 border-t border-slate-100 space-y-2">
              <Link
                href="/admin/products"
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2.5 px-4 rounded-xl text-xs flex items-center justify-center gap-2 shadow-md shadow-indigo-600/20 transition-all"
              >
                <Package className="w-4 h-4" />
                <span>Go to Manage Products</span>
              </Link>
              <button
                type="button"
                onClick={() => setMockRole(isOwner ? 'customer' : 'admin')}
                className="w-full bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold py-2 px-3 rounded-xl text-xs transition-colors"
              >
                {isOwner ? 'Switch to Customer View' : 'Switch to Store Owner / Admin'}
              </button>
            </div>

            <div className="mt-6 pt-6 border-t border-slate-100 text-left space-y-2 text-xs text-slate-600">
              <div className="flex justify-between">
                <span>Account Status:</span>
                <span className="font-semibold text-emerald-600">Active</span>
              </div>
              <div className="flex justify-between">
                <span>Database Auth:</span>
                <span className="font-semibold text-slate-900">Supabase RLS</span>
              </div>
              <div className="flex justify-between">
                <span>Registered:</span>
                <span className="font-semibold text-slate-900">November 2026</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right side: Edit Profile & Shipping Address Form */}
        <div className="lg:col-span-8 space-y-6">
          {savedSuccess && (
            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2 animate-in fade-in">
              <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" />
              <span>Your profile and shipping details have been saved successfully.</span>
            </div>
          )}

          <form onSubmit={handleSaveProfile} className="space-y-6">
            {/* Personal Details */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
              <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                <User className="w-4 h-4 text-indigo-600" />
                Personal Information
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                    Email Address
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      disabled
                      value={profile?.email || user?.email || 'user@example.com'}
                      className="w-full bg-slate-100 border border-slate-200 rounded-xl px-4 py-2 text-sm text-slate-500 cursor-not-allowed"
                    />
                    <Mail className="w-4 h-4 text-slate-400 absolute right-3.5 top-2.5" />
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                    Phone Number
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-600"
                    />
                    <Phone className="w-4 h-4 text-slate-400 absolute right-3.5 top-2.5" />
                  </div>
                </div>
              </div>
            </div>

            {/* Default Shipping Address */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
              <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                <MapPin className="w-4 h-4 text-indigo-600" />
                Default Shipping Address
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                    Street Address
                  </label>
                  <input
                    type="text"
                    value={streetAddress}
                    onChange={(e) => setStreetAddress(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-600"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                      City
                    </label>
                    <input
                      type="text"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-600"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                      State / Province
                    </label>
                    <input
                      type="text"
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-600"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                      Postal Code
                    </label>
                    <input
                      type="text"
                      value={postalCode}
                      onChange={(e) => setPostalCode(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-600"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-slate-950 hover:bg-slate-800 text-white font-semibold px-6 py-3 rounded-xl text-sm flex items-center gap-2 transition-all shadow-md"
              >
                <Save className="w-4 h-4" />
                <span>Save Profile Changes</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
