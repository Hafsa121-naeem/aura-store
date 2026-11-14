'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import AdminGuard from '@/components/admin/AdminGuard';
import AdminHeader from '@/components/admin/AdminHeader';
import { Order, OrderStatus, PaymentStatus } from '@/lib/types/database';
import { getOrderById, updateOrderStatus, updatePaymentStatus } from '@/lib/services/api';
import { formatPrice, formatDate } from '@/lib/utils';
import {
  ArrowLeft,
  User,
  MapPin,
  Package,
  Calendar,
  Printer,
  Clock,
  Truck,
  CheckCircle2,
  XCircle,
  Phone,
  Mail,
  RefreshCw,
  Check,
} from 'lucide-react';

export default function OrderDetailPage() {
  const params = useParams();
  const router = useRouter();
  const orderId = (params?.id as string) || '';

  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const loadOrder = async () => {
    if (!orderId) return;
    setLoading(true);
    try {
      const data = await getOrderById(orderId);
      setOrder(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOrder();
  }, [orderId]);

  const handleStatusChange = async (newStatus: OrderStatus) => {
    if (!order) return;
    setIsUpdating(true);
    try {
      await updateOrderStatus(order.id, newStatus);
      setOrder({ ...order, order_status: newStatus });
      showToast(`Order status updated to ${newStatus.toUpperCase()}`);
    } catch (err) {
      console.error(err);
      showToast('Failed to update order status');
    } finally {
      setIsUpdating(false);
    }
  };

  const handlePaymentChange = async (newStatus: PaymentStatus) => {
    if (!order) return;
    setIsUpdating(true);
    try {
      await updatePaymentStatus(order.id, newStatus);
      setOrder({ ...order, payment_status: newStatus });
      showToast(`Payment status updated to ${newStatus.toUpperCase()}`);
    } catch (err) {
      console.error(err);
      showToast('Failed to update payment status');
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <AdminGuard>
        <AdminHeader />

        {/* Toast */}
        {toastMessage && (
          <div className="fixed bottom-6 right-6 z-50 bg-[#1A1918] text-[#FAF8F5] px-5 py-3 rounded-xl border border-[#806B43] shadow-2xl flex items-center gap-2 text-xs font-mono">
            <Check className="w-4 h-4 text-[#806B43]" />
            <span>{toastMessage}</span>
          </div>
        )}

        {/* Breadcrumb / Back button */}
        <div className="flex items-center justify-between">
          <Link
            href="/admin/orders"
            className="inline-flex items-center gap-2 text-xs font-bold text-slate-700 hover:text-indigo-600 transition-colors bg-white px-4 py-2 rounded-xl border border-slate-200 shadow-xs"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>&larr; Back to All Orders</span>
          </Link>

          <button
            type="button"
            onClick={loadOrder}
            disabled={loading}
            className="p-2 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 text-slate-600 transition-colors flex items-center gap-1.5 text-xs font-semibold"
            title="Refresh order"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
            <span>Reload</span>
          </button>
        </div>

        {loading ? (
          <div className="bg-white p-20 rounded-3xl border border-slate-200 text-center space-y-3">
            <div className="w-8 h-8 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="text-xs text-slate-500 font-mono">Loading full customer order details...</p>
          </div>
        ) : !order ? (
          <div className="bg-white p-12 rounded-3xl border border-slate-200 text-center space-y-4">
            <h2 className="text-xl font-bold text-slate-900">Order Not Located</h2>
            <p className="text-xs text-slate-500">
              Could not find order record matching identifier &ldquo;{orderId}&rdquo;.
            </p>
            <Link
              href="/admin/orders"
              className="inline-block bg-slate-900 text-white text-xs font-bold px-6 py-2.5 rounded-xl"
            >
              Return to Orders List
            </Link>
          </div>
        ) : (
          <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden">
            
            {/* Dark Top Banner */}
            <div className="p-6 sm:p-8 bg-slate-900 text-white flex flex-col sm:flex-row justify-between sm:items-center gap-4 border-b border-slate-800">
              <div className="space-y-1.5">
                <div className="flex flex-wrap items-center gap-3">
                  <h1 className="font-mono text-xl sm:text-2xl font-black text-amber-400">
                    #{order.order_number}
                  </h1>
                  <span
                    className={`text-[10px] font-mono uppercase tracking-wider font-bold px-3 py-1 rounded-full ${
                      order.order_status === 'delivered'
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                        : order.order_status === 'shipped'
                        ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                        : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                    }`}
                  >
                    {order.order_status}
                  </span>
                </div>
                <p className="text-xs text-slate-400 flex flex-wrap items-center gap-2">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>Placed on {formatDate(order.created_at)}</span>
                  </span>
                  &bull;
                  <span className="font-mono text-[11px]">ID: {order.id}</span>
                </p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="p-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl transition-colors flex items-center gap-1.5 text-xs font-semibold"
                  title="Print Packing Slip"
                >
                  <Printer className="w-4 h-4" />
                  <span>Print Slip</span>
                </button>

                <select
                  value={order.order_status}
                  disabled={isUpdating}
                  onChange={(e) => handleStatusChange(e.target.value as OrderStatus)}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white border-none rounded-xl px-4 py-2.5 text-xs font-bold focus:outline-none cursor-pointer"
                >
                  <option value="processing">Processing</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="shipped">Shipped</option>
                  <option value="delivered">Delivered</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
            </div>

            {/* Content Body */}
            <div className="p-6 sm:p-8 space-y-6 text-xs text-slate-700">
              
              {/* 1. Customer & Shipping Details Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* 1. Customer Identity Card */}
                <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200/80 space-y-3">
                  <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
                    <User className="w-4 h-4 text-indigo-600" />
                    <span>1. Customer Identity</span>
                  </div>

                  <div className="space-y-2 pl-6">
                    <div>
                      <span className="text-slate-400 text-[10px] uppercase font-mono block">Full Name</span>
                      <span className="font-bold text-slate-900 text-sm">
                        {order.customer_name || 'Not provided'}
                      </span>
                    </div>

                    <div>
                      <span className="text-slate-400 text-[10px] uppercase font-mono block">Email Address</span>
                      {order.customer_email ? (
                        <a
                          href={`mailto:${order.customer_email}`}
                          className="font-mono text-indigo-600 hover:underline break-all text-xs"
                        >
                          {order.customer_email}
                        </a>
                      ) : (
                        <span className="text-slate-400">Not provided</span>
                      )}
                    </div>

                    <div>
                      <span className="text-slate-400 text-[10px] uppercase font-mono block">Contact Phone</span>
                      {order.customer_phone || order.shipping_address?.phone ? (
                        <a
                          href={`tel:${order.customer_phone || order.shipping_address?.phone}`}
                          className="font-mono text-indigo-600 font-bold hover:underline text-xs"
                        >
                          {order.customer_phone || order.shipping_address?.phone}
                        </a>
                      ) : (
                        <span className="text-slate-400">Not provided</span>
                      )}
                    </div>
                  </div>
                </div>

                {/* 2. Complete Shipping Address Card */}
                <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200/80 space-y-3">
                  <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
                    <MapPin className="w-4 h-4 text-indigo-600" />
                    <span>2. Complete Shipping Address</span>
                  </div>

                  <div className="space-y-2 pl-6">
                    <div>
                      <span className="text-slate-400 text-[10px] uppercase font-mono block">Street Address</span>
                      <span className="font-medium text-slate-900">
                        {order.shipping_address?.street_address || 'Not specified'}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <span className="text-slate-400 text-[10px] uppercase font-mono block">City</span>
                        <span className="font-bold text-slate-900">
                          {order.shipping_address?.city || 'Pakistan'}
                        </span>
                      </div>
                      <div>
                        <span className="text-slate-400 text-[10px] uppercase font-mono block">State / Province</span>
                        <span className="font-medium text-slate-900">
                          {order.shipping_address?.state || 'Pakistan'}
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <span className="text-slate-400 text-[10px] uppercase font-mono block">Postal Code</span>
                        <span className="font-mono text-slate-900">
                          {order.shipping_address?.postal_code || 'N/A'}
                        </span>
                      </div>
                      <div>
                        <span className="text-slate-400 text-[10px] uppercase font-mono block">Country</span>
                        <span className="font-medium text-slate-900">
                          {order.shipping_address?.country || 'Pakistan'}
                        </span>
                      </div>
                    </div>

                    {order.notes && (
                      <div className="pt-2 border-t border-slate-200">
                        <span className="text-amber-800 text-[10px] uppercase font-bold block">Delivery Instructions:</span>
                        <p className="italic text-slate-600">&ldquo;{order.notes}&rdquo;</p>
                      </div>
                    )}
                  </div>
                </div>

              </div>

              {/* 3. Ordered Product Line Items Card */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                    <Package className="w-4 h-4 text-indigo-600" />
                    <span>3. Ordered Products &amp; Quantities ({order.items?.length || 0})</span>
                  </h3>
                  <span className="text-[11px] text-slate-500 font-mono">
                    Official 12-Month Manufacturer Warranty
                  </span>
                </div>

                <div className="border border-slate-200 rounded-2xl overflow-hidden divide-y divide-slate-100">
                  {order.items && order.items.length > 0 ? (
                    order.items.map((item) => (
                      <div key={item.id} className="p-4 flex items-center justify-between gap-4 hover:bg-slate-50/50">
                        <div className="flex items-center gap-4">
                          <div className="relative w-16 h-16 rounded-xl overflow-hidden border border-slate-200 bg-slate-100 shrink-0">
                            {item.product_image ? (
                              <Image
                                src={item.product_image}
                                alt={item.product_name}
                                fill
                                sizes="64px"
                                className="object-cover"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center font-bold text-slate-400 text-xs">
                                AURA
                              </div>
                            )}
                          </div>

                          <div>
                            <p className="font-bold text-slate-900 text-sm">
                              {item.product_name}
                            </p>
                            <div className="flex items-center gap-2 mt-1 text-xs text-slate-500 font-mono">
                              <span>Unit Price: {formatPrice(item.product_price)}</span>
                              &bull;
                              <span className="font-bold text-slate-800">Qty: {item.quantity}</span>
                              {item.selected_color && (
                                <>
                                  &bull;
                                  <span className="bg-slate-100 px-2 py-0.5 rounded text-slate-700">
                                    Color: {item.selected_color}
                                  </span>
                                </>
                              )}
                            </div>
                          </div>
                        </div>

                        <div className="text-right">
                          <div className="font-black text-slate-950 text-base">
                            {formatPrice(item.total_price)}
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="p-6 text-center text-slate-400 italic">No line items recorded</div>
                  )}
                </div>
              </div>

              {/* 4. Payment & Financial Accounting Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                
                {/* Payment Protocol Card */}
                <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200/80 space-y-3">
                  <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider">
                    Payment Protocol &amp; Verification
                  </h4>

                  <div className="space-y-2.5 text-xs">
                    <div className="flex justify-between items-center">
                      <span className="text-slate-500">Method</span>
                      <span className="font-bold text-slate-900 uppercase">
                        {order.payment_method === 'cash_on_delivery' ? 'Cash on Delivery (COD)' : 'Prepaid Card / IBFT'}
                      </span>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-slate-500">Payment Status</span>
                      <div className="flex items-center gap-2">
                        <span
                          className={`font-mono text-[10px] font-bold uppercase px-2.5 py-0.5 rounded-full ${
                            order.payment_status === 'paid'
                              ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                              : 'bg-amber-100 text-amber-800 border border-amber-200'
                          }`}
                        >
                          {order.payment_status}
                        </span>
                        <button
                          type="button"
                          onClick={() =>
                            handlePaymentChange(
                              order.payment_status === 'paid' ? 'pending' : 'paid'
                            )
                          }
                          className="text-[10px] text-indigo-600 hover:text-indigo-800 underline font-semibold"
                        >
                          Toggle Status
                        </button>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-slate-200 text-[11px] text-slate-500">
                      Doorstep inspection permitted prior to payment collection.
                    </div>
                  </div>
                </div>

                {/* Financial Accounting Card */}
                <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200/80 space-y-2 text-xs">
                  <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider mb-2">
                    Order Accounting (PKR)
                  </h4>

                  <div className="flex justify-between">
                    <span className="text-slate-500">Subtotal</span>
                    <span className="font-semibold text-slate-900">{formatPrice(order.subtotal)}</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-slate-500">Nationwide Express Delivery</span>
                    <span className="font-semibold text-slate-900">
                      {order.shipping_fee === 0 ? (
                        <span className="text-emerald-700 font-bold">FREE (Complimentary)</span>
                      ) : (
                        formatPrice(order.shipping_fee)
                      )}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-slate-500">Sales Tax (GST 5%)</span>
                    <span className="font-semibold text-slate-900">{formatPrice(order.tax)}</span>
                  </div>

                  <div className="flex justify-between text-sm font-black text-slate-950 pt-2 border-t border-slate-200">
                    <span>Total Amount Payable</span>
                    <span className="text-indigo-600 font-extrabold">{formatPrice(order.total)}</span>
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
