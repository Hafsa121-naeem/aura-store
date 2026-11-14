'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import AdminGuard from '@/components/admin/AdminGuard';
import AdminHeader from '@/components/admin/AdminHeader';
import { Order, OrderStatus, PaymentStatus } from '@/lib/types/database';
import { getAllOrders, updateOrderStatus, updatePaymentStatus } from '@/lib/services/api';
import { formatPrice, formatDate } from '@/lib/utils';
import {
  CheckCircle2,
  Clock,
  Truck,
  XCircle,
  Search,
  RefreshCw,
  Eye,
  User,
  Mail,
  Phone,
  MapPin,
  CreditCard,
  Banknote,
  Package,
  Calendar,
  X,
  Printer,
  ChevronRight,
  AlertCircle,
  ShoppingBag,
  ArrowRight,
} from 'lucide-react';

export default function AdminOrdersPage() {
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isUpdating, setIsUpdating] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const fetchOrders = async () => {
    setIsLoading(true);
    try {
      const data = await getAllOrders();
      setOrders(data);
    } catch (err) {
      console.error('Failed to load orders:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleStatusChange = async (orderId: string, newStatus: OrderStatus) => {
    setIsUpdating(orderId);
    try {
      await updateOrderStatus(orderId, newStatus);
      setOrders((prev) =>
        prev.map((o) => (o.id === orderId ? { ...o, order_status: newStatus } : o))
      );
      showToast(`Order status updated to ${newStatus.toUpperCase()}`);
    } catch (err) {
      console.error(err);
      showToast('Failed to update status');
    } finally {
      setIsUpdating(null);
    }
  };

  const handlePaymentStatusChange = async (orderId: string, newStatus: PaymentStatus) => {
    setIsUpdating(orderId);
    try {
      await updatePaymentStatus(orderId, newStatus);
      setOrders((prev) =>
        prev.map((o) => (o.id === orderId ? { ...o, payment_status: newStatus } : o))
      );
      showToast(`Payment status updated to ${newStatus.toUpperCase()}`);
    } catch (err) {
      console.error(err);
      showToast('Failed to update payment status');
    } finally {
      setIsUpdating(null);
    }
  };

  const filteredOrders = orders.filter((o) => {
    const matchesStatus = statusFilter === 'all' || o.order_status === statusFilter;
    const cleanSearch = searchQuery.toLowerCase();
    const city = o.shipping_address?.city || '';
    const phone = o.customer_phone || o.shipping_address?.phone || '';

    const matchesSearch =
      o.order_number.toLowerCase().includes(cleanSearch) ||
      o.customer_name.toLowerCase().includes(cleanSearch) ||
      o.customer_email.toLowerCase().includes(cleanSearch) ||
      city.toLowerCase().includes(cleanSearch) ||
      phone.toLowerCase().includes(cleanSearch);

    return matchesStatus && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <AdminGuard>
        <AdminHeader />

        {/* Toast Notification */}
        {toastMessage && (
          <div className="fixed bottom-6 right-6 z-50 bg-[#1A1918] text-[#FAF8F5] px-5 py-3 rounded-xl border border-[#806B43] shadow-2xl flex items-center gap-3 animate-in fade-in slide-in-from-bottom-2 text-xs font-mono">
            <CheckCircle2 className="w-4 h-4 text-[#806B43]" />
            <span>{toastMessage}</span>
          </div>
        )}

        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
          
          {/* Header & Controls */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-6 border-b border-slate-100">
            <div>
              <div className="flex items-center gap-3">
                <h2 className="text-xl font-bold text-slate-900 tracking-tight">
                  Order Fulfillment &amp; Delivery
                </h2>
                <span className="font-mono text-xs bg-slate-100 text-slate-700 px-2.5 py-0.5 rounded-full font-bold">
                  {orders.length} Total Orders
                </span>
              </div>
              <p className="text-xs text-slate-600 mt-1">
                Live nationwide dispatch management across Karachi, Lahore, Islamabad, Faisalabad, and all cities.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
              <button
                type="button"
                onClick={fetchOrders}
                disabled={isLoading}
                className="p-2 border border-slate-200 rounded-xl hover:bg-slate-50 text-slate-600 transition-colors flex items-center gap-1.5 text-xs font-medium"
                title="Refresh from Supabase"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
                <span className="hidden sm:inline">Refresh</span>
              </button>

              <div className="relative flex-1 sm:w-64">
                <input
                  type="text"
                  placeholder="Search order #, customer, phone, city..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 text-xs rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-600"
                />
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5 pointer-events-none" />
              </div>

              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-600"
              >
                <option value="all">All Statuses ({orders.length})</option>
                <option value="processing">Processing</option>
                <option value="confirmed">Confirmed</option>
                <option value="shipped">Shipped</option>
                <option value="delivered">Delivered</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
          </div>

          {/* Orders Table */}
          {isLoading ? (
            <div className="py-20 text-center space-y-3">
              <div className="w-8 h-8 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto" />
              <p className="text-xs text-slate-500 font-mono">Querying PostgreSQL database...</p>
            </div>
          ) : filteredOrders.length === 0 ? (
            <div className="py-16 text-center space-y-3 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
              <ShoppingBag className="w-8 h-8 text-slate-400 mx-auto" />
              <p className="text-sm font-bold text-slate-800">No Orders Found</p>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                No orders match your search criteria. Placed orders will automatically appear here with customer names and delivery details.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-slate-700 uppercase tracking-wider border-y border-slate-100 font-bold text-[11px]">
                  <tr>
                    <th className="py-3.5 px-4 font-bold">Order Details</th>
                    <th className="py-3.5 px-4 font-bold">Customer Contact &amp; City</th>
                    <th className="py-3.5 px-4 font-bold">Items &amp; Thumbnails</th>
                    <th className="py-3.5 px-4 font-bold">Total (PKR)</th>
                    <th className="py-3.5 px-4 font-bold">Payment</th>
                    <th className="py-3.5 px-4 font-bold">Order Status</th>
                    <th className="py-3.5 px-4 font-bold text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredOrders.map((order) => {
                    const firstItem = order.items?.[0];
                    const itemCount = order.items?.reduce((acc, i) => acc + i.quantity, 0) || 1;

                    return (
                      <tr
                        key={order.id}
                        className="hover:bg-slate-50/80 transition-colors group cursor-pointer"
                        onClick={() => router.push(`/admin/orders/${order.id}`)}
                      >
                        {/* 1. Order Number & Date */}
                        <td className="py-4 px-4">
                          <Link
                            href={`/admin/orders/${order.id}`}
                            className="font-mono font-bold text-indigo-600 hover:underline text-sm flex items-center gap-1.5"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <span>{order.order_number}</span>
                            <ArrowRight className="w-3 h-3 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
                          </Link>
                          <div className="text-[11px] text-slate-500 flex items-center gap-1 mt-0.5">
                            <Clock className="w-3 h-3 text-slate-400" />
                            <span>{formatDate(order.created_at)}</span>
                          </div>
                        </td>

                        {/* 2. Customer Contact & City */}
                        <td className="py-4 px-4">
                          <div className="font-bold text-slate-900 text-sm">
                            {order.customer_name || 'Guest Customer'}
                          </div>
                          <div className="text-[11px] text-slate-600 flex items-center gap-1 mt-0.5">
                            <MapPin className="w-3 h-3 text-slate-400" />
                            <span className="font-medium text-slate-800">
                              {order.shipping_address?.city || 'Pakistan'}
                            </span>
                            {order.customer_phone && (
                              <>
                                &bull;
                                <span>{order.customer_phone}</span>
                              </>
                            )}
                          </div>
                          {order.customer_email && (
                            <div className="text-[10px] text-slate-500 font-mono truncate max-w-[180px]">
                              {order.customer_email}
                            </div>
                          )}
                        </td>

                        {/* 3. Items & Thumbnails */}
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-2">
                            {firstItem?.product_image ? (
                              <div className="relative w-10 h-10 rounded-lg overflow-hidden border border-slate-200 bg-slate-100 shrink-0">
                                <Image
                                  src={firstItem.product_image}
                                  alt={firstItem.product_name}
                                  fill
                                  sizes="40px"
                                  className="object-cover"
                                />
                              </div>
                            ) : (
                              <div className="w-10 h-10 rounded-lg border border-slate-200 bg-slate-100 flex items-center justify-center text-[10px] font-bold text-slate-500 shrink-0">
                                AURA
                              </div>
                            )}
                            <div className="min-w-0">
                              <p className="font-medium text-slate-900 truncate max-w-[170px]" title={firstItem?.product_name}>
                                {firstItem?.product_name || 'Store Order'}
                              </p>
                              <p className="text-[10px] text-slate-500 font-mono">
                                {itemCount} {itemCount === 1 ? 'item' : 'items'} ({order.items?.length || 1} SKU)
                              </p>
                            </div>
                          </div>
                        </td>

                        {/* 4. Total Amount */}
                        <td className="py-4 px-4">
                          <div className="font-extrabold text-slate-900 text-sm">
                            {formatPrice(order.total)}
                          </div>
                          <div className="text-[10px] text-slate-500">
                            Subtotal: {formatPrice(order.subtotal)}
                          </div>
                        </td>

                        {/* 5. Payment */}
                        <td className="py-4 px-4" onClick={(e) => e.stopPropagation()}>
                          <div className="space-y-1">
                            <span
                              className={`inline-block font-bold uppercase text-[9px] px-2 py-0.5 rounded-full ${
                                order.payment_status === 'paid'
                                  ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                                  : 'bg-amber-100 text-amber-800 border border-amber-200'
                              }`}
                            >
                              {order.payment_method === 'cash_on_delivery' ? 'COD' : 'CARD'} ({order.payment_status})
                            </span>
                            <button
                              type="button"
                              onClick={() =>
                                handlePaymentStatusChange(
                                  order.id,
                                  order.payment_status === 'paid' ? 'pending' : 'paid'
                                )
                              }
                              className="text-[10px] text-indigo-600 hover:text-indigo-800 underline block font-medium"
                            >
                              Mark as {order.payment_status === 'paid' ? 'Pending' : 'Paid'}
                            </button>
                          </div>
                        </td>

                        {/* 6. Order Status */}
                        <td className="py-4 px-4">
                          <span
                            className={`inline-flex items-center gap-1 font-bold uppercase text-[10px] px-2.5 py-1 rounded-full ${
                              order.order_status === 'delivered'
                                ? 'bg-emerald-100 text-emerald-800'
                                : order.order_status === 'shipped'
                                ? 'bg-blue-100 text-blue-800'
                                : order.order_status === 'cancelled'
                                ? 'bg-rose-100 text-rose-800'
                                : 'bg-amber-100 text-amber-800'
                            }`}
                          >
                            {order.order_status === 'delivered' ? (
                              <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                            ) : order.order_status === 'shipped' ? (
                              <Truck className="w-3 h-3 text-blue-600" />
                            ) : (
                              <Clock className="w-3 h-3 text-amber-600" />
                            )}
                            <span>{order.order_status}</span>
                          </span>
                        </td>

                        {/* 7. Actions */}
                        <td className="py-4 px-4 text-right" onClick={(e) => e.stopPropagation()}>
                          <div className="flex items-center justify-end gap-2">
                            <Link
                              href={`/admin/orders/${order.id}`}
                              className="px-3 py-1.5 bg-slate-900 hover:bg-indigo-600 text-white rounded-xl transition-colors flex items-center gap-1.5 font-bold text-xs shadow-xs"
                              title="Open Dedicated Order Details Page"
                            >
                              <Eye className="w-3.5 h-3.5" />
                              <span>View Page</span>
                            </Link>

                            <select
                              value={order.order_status}
                              disabled={isUpdating === order.id}
                              onChange={(e) =>
                                handleStatusChange(order.id, e.target.value as OrderStatus)
                              }
                              className="bg-slate-50 border border-slate-200 rounded-lg px-2 py-1 text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-600"
                            >
                              <option value="processing">Processing</option>
                              <option value="confirmed">Confirmed</option>
                              <option value="shipped">Shipped</option>
                              <option value="delivered">Delivered</option>
                              <option value="cancelled">Cancelled</option>
                            </select>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}

        </div>
      </AdminGuard>
    </div>
  );
}
