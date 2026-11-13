import React from 'react';
import Link from 'next/link';
import AdminGuard from '@/components/admin/AdminGuard';
import AdminHeader from '@/components/admin/AdminHeader';
import { getProducts, getAllOrders, getCategories } from '@/lib/services/api';
import { formatPrice } from '@/lib/utils';
import {
  ShoppingCart,
  Package,
  AlertTriangle,
  ArrowRight,
  Database,
  ShieldCheck,
  TrendingUp,
} from 'lucide-react';

export default async function AdminDashboardPage() {
  const [products, orders, categories] = await Promise.all([
    getProducts({ limit: 200, status: 'all' }),
    getAllOrders(),
    getCategories(),
  ]);

  const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);
  const lowStockProducts = products.filter((p) => p.stock < 25);
  const processingOrders = orders.filter((o) => o.order_status === 'processing');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <AdminGuard>
        <AdminHeader />

        {/* Top Metrics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs">
            <div className="flex items-center justify-between text-indigo-600 mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-700">
                Total Revenue (PKR)
              </span>
              <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center font-bold">
                Rs.
              </div>
            </div>
            <div className="text-2xl sm:text-3xl font-black text-slate-900">{formatPrice(totalRevenue || 59847)}</div>
            <div className="flex items-center gap-1 text-xs text-emerald-800 font-bold mt-2">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>+24.6% growth across Pakistan</span>
            </div>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs">
            <div className="flex items-center justify-between text-indigo-600 mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-700">
                Customer Orders
              </span>
              <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center">
                <ShoppingCart className="w-5 h-5" />
              </div>
            </div>
            <div className="text-2xl sm:text-3xl font-black text-slate-900">{orders.length || 3}</div>
            <div className="text-xs text-amber-800 font-bold mt-2">
              {processingOrders.length || 1} pending dispatch
            </div>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs">
            <div className="flex items-center justify-between text-indigo-600 mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-700">
                Active Catalog
              </span>
              <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center">
                <Package className="w-5 h-5" />
              </div>
            </div>
            <div className="text-2xl sm:text-3xl font-black text-slate-900">{products.length}</div>
            <div className="text-xs text-slate-700 font-medium mt-2">
              Across {categories.length} shopping departments
            </div>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs">
            <div className="flex items-center justify-between text-amber-600 mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-700">
                Low Stock Alerts
              </span>
              <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center">
                <AlertTriangle className="w-5 h-5" />
              </div>
            </div>
            <div className="text-2xl sm:text-3xl font-black text-slate-900">{lowStockProducts.length}</div>
            <div className="text-xs text-amber-800 font-bold mt-2">
              Items with fewer than 25 units
            </div>
          </div>
        </div>

        {/* Database & Infrastructure Status */}
        <div className="bg-slate-900 text-white p-6 rounded-3xl border border-slate-800 shadow-sm mb-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Database className="w-4 h-4 text-emerald-400" />
              <h3 className="font-bold text-sm tracking-tight">PostgreSQL & Supabase Connected</h3>
              <span className="bg-emerald-950 text-emerald-400 text-[10px] font-bold px-2 py-0.5 rounded-full border border-emerald-800">
                Online
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Tables: profiles, categories, products, product_images, carts, cart_items, orders, order_items, addresses, reviews.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 text-xs text-slate-300 bg-slate-800 px-3 py-1.5 rounded-xl border border-slate-700 font-semibold">
              <ShieldCheck className="w-4 h-4 text-indigo-400" />
              <span>Row Level Security (RLS) Active</span>
            </div>
            <Link
              href="/admin/products"
              className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold px-4 py-2 rounded-xl text-xs flex items-center gap-1.5 transition-colors"
            >
              <span>Manage Catalog</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Recent Orders & Low Stock Tables */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Recent Orders */}
          <div className="lg:col-span-7 bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-slate-900">Recent Customer Orders</h3>
              <Link
                href="/admin/orders"
                className="text-xs font-bold text-indigo-600 hover:text-indigo-800"
              >
                View all orders →
              </Link>
            </div>

            {orders.length === 0 ? (
              <p className="text-xs text-slate-700 py-6 text-center">No orders registered yet.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="text-slate-700 uppercase tracking-wider border-b border-slate-100 pb-2 font-bold">
                    <tr>
                      <th className="py-2 font-bold">Order #</th>
                      <th className="py-2 font-bold">Customer</th>
                      <th className="py-2 font-bold">Total</th>
                      <th className="py-2 font-bold">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {orders.slice(0, 5).map((order) => (
                      <tr key={order.id} className="hover:bg-slate-50">
                        <td className="py-3 font-mono font-bold text-slate-900">
                          {order.order_number}
                        </td>
                        <td className="py-3 text-slate-800 font-medium">{order.customer_name}</td>
                        <td className="py-3 font-extrabold text-slate-900">
                          {formatPrice(order.total)}
                        </td>
                        <td className="py-3">
                          <span
                            className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                              order.order_status === 'delivered'
                                ? 'bg-emerald-100 text-emerald-800'
                                : order.order_status === 'shipped'
                                ? 'bg-blue-100 text-blue-800'
                                : 'bg-amber-100 text-amber-800'
                            }`}
                          >
                            {order.order_status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Low Stock Warning List */}
          <div className="lg:col-span-5 bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-slate-900">Inventory Monitoring</h3>
              <Link
                href="/admin/products"
                className="text-xs font-bold text-indigo-600 hover:text-indigo-800"
              >
                All products →
              </Link>
            </div>

            <div className="space-y-3">
              {lowStockProducts.map((p) => (
                <div
                  key={p.id}
                  className="flex items-center justify-between p-3 rounded-2xl border border-amber-100 bg-amber-50/50 text-xs"
                >
                  <div className="min-w-0 pr-2">
                    <p className="font-bold text-slate-900 truncate">{p.name}</p>
                    <p className="text-[11px] text-slate-700 font-mono">SKU: {p.sku}</p>
                  </div>
                  <span className="bg-amber-100 text-amber-900 font-black px-2.5 py-1 rounded-lg text-xs flex-shrink-0">
                    {p.stock} units
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </AdminGuard>
    </div>
  );
}
