'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Package, ShoppingCart, Tags, ArrowLeft } from 'lucide-react';

export default function AdminHeader() {
  const pathname = usePathname();

  const adminTabs = [
    { label: 'Overview', href: '/admin', icon: LayoutDashboard },
    { label: 'Manage Products', href: '/admin/products', icon: Package },
    { label: 'Orders', href: '/admin/orders', icon: ShoppingCart },
    { label: 'Categories', href: '/admin/categories', icon: Tags },
  ];

  return (
    <div className="bg-slate-900 text-white rounded-3xl p-6 mb-8 border border-slate-800 shadow-xl">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <span className="w-10 h-10 rounded-2xl bg-indigo-600 text-white font-black text-xl flex items-center justify-center shadow-md">
            A
          </span>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold tracking-tight">AURA Control Hub</h1>
              <span className="bg-indigo-500/30 text-indigo-300 text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full border border-indigo-400/30">
                Admin Portal
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              PostgreSQL Relational Catalog, Live Inventory & Order Management
            </p>
          </div>
        </div>

        <Link
          href="/"
          className="inline-flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold px-4 py-2 rounded-xl transition-colors border border-slate-700 self-start md:self-auto"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Exit to Public Store</span>
        </Link>
      </div>

      {/* Tabs */}
      <nav className="flex flex-wrap gap-2 pt-4">
        {adminTabs.map((tab) => {
          const isActive = pathname === tab.href;
          const Icon = tab.icon;
          return (
            <Link
              key={tab.label}
              href={tab.href}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                isActive
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'bg-slate-800/80 text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
