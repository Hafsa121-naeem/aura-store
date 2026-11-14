'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
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
} from 'lucide-react';

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isUpdating, setIsUpdating] = useState<string | null>(null);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
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
      if (selectedOrder) {
        const refreshed = data.find((o) => o.id === selectedOrder.id);
        if (refreshed) setSelectedOrder(refreshed);
      }
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
      if (selectedOrder && selectedOrder.id === orderId) {
        setSelectedOrder((prev) => (prev ? { ...prev, order_status: newStatus } : null));
      }
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
      if (selectedOrder && selectedOrder.id === orderId) {
        setSelectedOrder((prev) => (prev ? { ...prev, payment_status: newStatus } : null));
      }
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
                        onClick={() => setSelectedOrder(order)}
                      >
                        {/* 1. Order Number & Date */}
                        <td className="py-4 px-4">
                          <div className="font-mono font-bold text-slate-950 text-sm flex items-center gap-1.5">
                            <span>{order.order_number}</span>
                          </div>
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
                            <button
                              type="button"
                              onClick={() => setSelectedOrder(order)}
                              className="p-1.5 text-slate-500 hover:text-indigo-600 hover:bg-slate-100 rounded-lg transition-colors flex items-center gap-1 font-semibold text-xs"
                              title="Inspect Full Customer & Order Details"
                            >
                              <Eye className="w-3.5 h-3.5" />
                              <span>View</span>
                            </button>

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

        {/* ------------------------------------------------------------- */}
        {/* COMPREHENSIVE ORDER DETAILS MODAL (ALL 10 REQUIRED ITEMS) */}
        {/* ------------------------------------------------------------- */}
        {selectedOrder && (
          <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
            <div
              className="bg-white w-full max-w-3xl rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]"
              onClick={(e) => e.stopPropagation()}
            >
              
              {/* Modal Header */}
              <div className="p-6 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
                <div className="space-y-1">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-base font-bold text-amber-400">
                      #{selectedOrder.order_number}
                    </span>
                    <span
                      className={`text-[10px] font-mono uppercase tracking-wider font-bold px-2.5 py-0.5 rounded-full ${
                        selectedOrder.order_status === 'delivered'
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                          : selectedOrder.order_status === 'shipped'
                          ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                          : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                      }`}
                    >
                      {selectedOrder.order_status}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>Placed on {formatDate(selectedOrder.created_at)}</span>
                    &bull;
                    <span className="font-mono">ID: {selectedOrder.id}</span>
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => window.print()}
                    className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl transition-colors"
                    title="Print Dispatch Receipt"
                  >
                    <Printer className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedOrder(null)}
                    className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl transition-colors"
                    aria-label="Close details"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Modal Body */}
              <div className="p-6 overflow-y-auto space-y-6 text-xs text-slate-700">
                
                {/* 1. Customer & Shipping Details Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  
                  {/* Customer Information Card */}
                  <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80 space-y-3">
                    <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
                      <User className="w-4 h-4 text-indigo-600" />
                      <span>1. Customer Identity</span>
                    </div>

                    <div className="space-y-1.5 pl-6">
                      <div>
                        <span className="text-slate-400 text-[10px] block uppercase font-mono">Full Name</span>
                        <span className="font-bold text-slate-900 text-sm">
                          {selectedOrder.customer_name || 'Not provided'}
                        </span>
                      </div>

                      <div>
                        <span className="text-slate-400 text-[10px] block uppercase font-mono">Email Address</span>
                        {selectedOrder.customer_email ? (
                          <a
                            href={`mailto:${selectedOrder.customer_email}`}
                            className="font-mono text-indigo-600 hover:underline break-all"
                          >
                            {selectedOrder.customer_email}
                          </a>
                        ) : (
                          <span className="text-slate-400">None</span>
                        )}
                      </div>

                      <div>
                        <span className="text-slate-400 text-[10px] block uppercase font-mono">Contact Phone</span>
                        {selectedOrder.customer_phone || selectedOrder.shipping_address?.phone ? (
                          <a
                            href={`tel:${selectedOrder.customer_phone || selectedOrder.shipping_address?.phone}`}
                            className="font-mono text-indigo-600 font-bold hover:underline"
                          >
                            {selectedOrder.customer_phone || selectedOrder.shipping_address?.phone}
                          </a>
                        ) : (
                          <span className="text-slate-400">None</span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Complete Shipping Address Card */}
                  <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80 space-y-3">
                    <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
                      <MapPin className="w-4 h-4 text-indigo-600" />
                      <span>2. Complete Shipping Address</span>
                    </div>

                    <div className="space-y-1.5 pl-6">
                      <div>
                        <span className="text-slate-400 text-[10px] block uppercase font-mono">Street Address</span>
                        <span className="font-medium text-slate-900">
                          {selectedOrder.shipping_address?.street_address || 'Not specified'}
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <span className="text-slate-400 text-[10px] block uppercase font-mono">City</span>
                          <span className="font-bold text-slate-900">
                            {selectedOrder.shipping_address?.city || 'Pakistan'}
                          </span>
                        </div>
                        <div>
                          <span className="text-slate-400 text-[10px] block uppercase font-mono">State / Province</span>
                          <span className="font-medium text-slate-900">
                            {selectedOrder.shipping_address?.state || 'Pakistan'}
                          </span>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <span className="text-slate-400 text-[10px] block uppercase font-mono">Postal Code</span>
                          <span className="font-mono text-slate-900">
                            {selectedOrder.shipping_address?.postal_code || 'N/A'}
                          </span>
                        </div>
                        <div>
                          <span className="text-slate-400 text-[10px] block uppercase font-mono">Country</span>
                          <span className="font-medium text-slate-900">
                            {selectedOrder.shipping_address?.country || 'Pakistan'}
                          </span>
                        </div>
                      </div>

                      {selectedOrder.notes && (
                        <div className="pt-2 border-t border-slate-200/60">
                          <span className="text-amber-800 text-[10px] block uppercase font-bold">Delivery Instructions:</span>
                          <p className="italic text-slate-600 text-[11px]">&ldquo;{selectedOrder.notes}&rdquo;</p>
                        </div>
                      )}
                    </div>
                  </div>

                </div>

                {/* 2. Ordered Product Items List */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                      <Package className="w-4 h-4 text-indigo-600" />
                      <span>3. Ordered Products &amp; Quantities ({selectedOrder.items?.length || 0})</span>
                    </h4>
                    <span className="text-[11px] text-slate-500 font-mono">
                      All items covered by 12-Month Official Warranty
                    </span>
                  </div>

                  <div className="border border-slate-200 rounded-2xl overflow-hidden divide-y divide-slate-100">
                    {selectedOrder.items && selectedOrder.items.length > 0 ? (
                      selectedOrder.items.map((item) => (
                        <div key={item.id} className="p-3.5 flex items-center justify-between gap-4 hover:bg-slate-50/50">
                          <div className="flex items-center gap-3">
                            <div className="relative w-14 h-14 rounded-xl overflow-hidden border border-slate-200 bg-slate-100 shrink-0">
                              {item.product_image ? (
                                <Image
                                  src={item.product_image}
                                  alt={item.product_name}
                                  fill
                                  sizes="56px"
                                  className="object-cover"
                                />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center font-bold text-slate-400 text-xs">
                                  AURA
                                </div>
                              )}
                            </div>

                            <div>
                              <p className="font-bold text-slate-900 text-xs sm:text-sm">
                                {item.product_name}
                              </p>
                              <div className="flex items-center gap-2 mt-1 text-[11px] text-slate-500 font-mono">
                                <span>Unit: {formatPrice(item.product_price)}</span>
                                &bull;
                                <span className="font-bold text-slate-800">Qty: {item.quantity}</span>
                                {item.selected_color && (
                                  <>
                                    &bull;
                                    <span className="bg-slate-100 px-1.5 py-0.5 rounded text-slate-700">
                                      Color: {item.selected_color}
                                    </span>
                                  </>
                                )}
                              </div>
                            </div>
                          </div>

                          <div className="text-right">
                            <div className="font-black text-slate-950 text-sm">
                              {formatPrice(item.total_price)}
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="p-4 text-center text-slate-400 italic">No line items recorded</div>
                    )}
                  </div>
                </div>

                {/* 3. Financials & Payment Breakdown */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                  
                  {/* Payment Protocol Card */}
                  <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80 space-y-3">
                    <h5 className="font-bold text-slate-900 text-xs uppercase tracking-wider">
                      Payment Protocol &amp; Verification
                    </h5>
                    
                    <div className="space-y-2 text-xs">
                      <div className="flex justify-between items-center">
                        <span className="text-slate-500">Method</span>
                        <span className="font-bold text-slate-900 uppercase">
                          {selectedOrder.payment_method === 'cash_on_delivery' ? 'Cash on Delivery (COD)' : 'Prepaid Card / IBFT'}
                        </span>
                      </div>

                      <div className="flex justify-between items-center">
                        <span className="text-slate-500">Payment Status</span>
                        <div className="flex items-center gap-2">
                          <span
                            className={`font-mono text-[10px] font-bold uppercase px-2.5 py-0.5 rounded-full ${
                              selectedOrder.payment_status === 'paid'
                                ? 'bg-emerald-100 text-emerald-800'
                                : 'bg-amber-100 text-amber-800'
                            }`}
                          >
                            {selectedOrder.payment_status}
                          </span>
                          <button
                            type="button"
                            onClick={() =>
                              handlePaymentStatusChange(
                                selectedOrder.id,
                                selectedOrder.payment_status === 'paid' ? 'pending' : 'paid'
                              )
                            }
                            className="text-[10px] text-indigo-600 hover:text-indigo-800 underline"
                          >
                            Toggle
                          </button>
                        </div>
                      </div>

                      <div className="pt-2 border-t border-slate-200 text-[11px] text-slate-500">
                        Doorstep inspection permitted prior to payment collection.
                      </div>
                    </div>
                  </div>

                  {/* Financial Accounting Card */}
                  <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80 space-y-2">
                    <h5 className="font-bold text-slate-900 text-xs uppercase tracking-wider mb-2">
                      Order Accounting (PKR)
                    </h5>

                    <div className="flex justify-between text-xs">
                      <span className="text-slate-500">Subtotal</span>
                      <span className="font-semibold text-slate-900">{formatPrice(selectedOrder.subtotal)}</span>
                    </div>

                    <div className="flex justify-between text-xs">
                      <span className="text-slate-500">Nationwide Express Delivery</span>
                      <span className="font-semibold text-slate-900">
                        {selectedOrder.shipping_fee === 0 ? (
                          <span className="text-emerald-700 font-bold">FREE (Complimentary)</span>
                        ) : (
                          formatPrice(selectedOrder.shipping_fee)
                        )}
                      </span>
                    </div>

                    <div className="flex justify-between text-xs">
                      <span className="text-slate-500">Sales Tax (GST 5%)</span>
                      <span className="font-semibold text-slate-900">{formatPrice(selectedOrder.tax)}</span>
                    </div>

                    <div className="flex justify-between text-sm font-black text-slate-950 pt-2 border-t border-slate-200">
                      <span>Total Amount Payable</span>
                      <span className="text-indigo-600">{formatPrice(selectedOrder.total)}</span>
                    </div>
                  </div>

                </div>

                {/* 4. Live Fulfillment Control Bar */}
                <div className="p-4 bg-indigo-50/70 rounded-2xl border border-indigo-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                  <div>
                    <span className="text-xs font-bold text-indigo-950 block">
                      Update Dispatch &amp; Delivery Milestone
                    </span>
                    <span className="text-[11px] text-indigo-800">
                      Changes synchronize immediately to Supabase and client tracking portal.
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <select
                      value={selectedOrder.order_status}
                      disabled={isUpdating === selectedOrder.id}
                      onChange={(e) =>
                        handleStatusChange(selectedOrder.id, e.target.value as OrderStatus)
                      }
                      className="bg-white border border-indigo-200 rounded-xl px-3 py-2 text-xs font-bold text-indigo-950 shadow-xs focus:ring-2 focus:ring-indigo-600 focus:outline-none"
                    >
                      <option value="processing">Processing</option>
                      <option value="confirmed">Confirmed</option>
                      <option value="shipped">Shipped</option>
                      <option value="delivered">Delivered</option>
                      <option value="cancelled">Cancelled</option>
                    </select>

                    <button
                      type="button"
                      onClick={() => setSelectedOrder(null)}
                      className="bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs px-4 py-2 rounded-xl transition-colors shadow-xs"
                    >
                      Done
                    </button>
                  </div>
                </div>

              </div>

            </div>
          </div>
        )}

      </AdminGuard>
    </div>
  );
}
