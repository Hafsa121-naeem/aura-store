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
} from 'lucide-react';

export default function OrderDetailPage() {
  const params = useParams();
  const router = useRouter();
  const orderId = (params?.id as string) || '';

  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);

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
    } catch (err) {
      console.error(err);
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
    } catch (err) {
      console.error(err);
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <AdminGuard>
        <AdminHeader />

        <div className="mb-6">
          <Link
            href="/admin/orders"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Orders</span>
          </Link>
        </div>

        {loading ? (
          <div className="bg-white p-16 rounded-3xl border border-slate-200 text-center">
            <div className="w-8 h-8 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
            <p className="text-xs text-slate-500 font-mono">Loading order details from Supabase...</p>
          </div>
        ) : !order ? (
          <div className="bg-white p-12 rounded-3xl border border-slate-200 text-center space-y-4">
            <h2 className="text-xl font-bold text-slate-900">Order Not Found</h2>
            <p className="text-xs text-slate-500">
              Could not find order matching identifier &ldquo;{orderId}&rdquo;.
            </p>
            <Link
              href="/admin/orders"
              className="inline-block bg-slate-900 text-white text-xs font-bold px-5 py-2.5 rounded-xl"
            >
              Return to Orders List
            </Link>
          </div>
        ) : (
          <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs space-y-6 p-6 sm:p-8">
            
            {/* Top Bar */}
            <div className="flex flex-col sm:flex-row justify-between sm:items-center pb-6 border-b border-slate-100 gap-4">
              <div>
                <span className="font-mono text-xs uppercase tracking-widest text-indigo-600 font-bold block">
                  Order Record
                </span>
                <h1 className="text-2xl font-black text-slate-900 tracking-tight mt-0.5">
                  #{order.order_number}
                </h1>
                <p className="text-xs text-slate-500 mt-1 flex items-center gap-2">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Placed: {formatDate(order.created_at)}</span>
                  &bull;
                  <span className="font-mono">UUID: {order.id}</span>
                </p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="p-2 border border-slate-200 rounded-xl hover:bg-slate-50 text-slate-600 transition-colors flex items-center gap-1.5 text-xs font-semibold"
                >
                  <Printer className="w-4 h-4" />
                  <span>Print Slip</span>
                </button>

                <select
                  value={order.order_status}
                  disabled={isUpdating}
                  onChange={(e) => handleStatusChange(e.target.value as OrderStatus)}
                  className="bg-indigo-50 border border-indigo-200 rounded-xl px-3 py-2 text-xs font-bold text-indigo-950 focus:outline-none"
                >
                  <option value="processing">Processing</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="shipped">Shipped</option>
                  <option value="delivered">Delivered</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
            </div>

            {/* Customer & Destination Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Customer Identity */}
              <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-3">
                <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
                  <User className="w-4 h-4 text-indigo-600" />
                  <span>1. Customer Identity</span>
                </div>
                <div className="space-y-2 text-xs pl-6">
                  <div>
                    <span className="text-slate-400 text-[10px] uppercase font-mono block">Full Name</span>
                    <span className="font-bold text-slate-900 text-sm">{order.customer_name}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 text-[10px] uppercase font-mono block">Email</span>
                    {order.customer_email ? (
                      <a href={`mailto:${order.customer_email}`} className="text-indigo-600 font-mono hover:underline">
                        {order.customer_email}
                      </a>
                    ) : (
                      <span className="text-slate-400">Not provided</span>
                    )}
                  </div>
                  <div>
                    <span className="text-slate-400 text-[10px] uppercase font-mono block">Phone Number</span>
                    {order.customer_phone || order.shipping_address?.phone ? (
                      <a href={`tel:${order.customer_phone || order.shipping_address?.phone}`} className="text-indigo-600 font-mono font-bold hover:underline">
                        {order.customer_phone || order.shipping_address?.phone}
                      </a>
                    ) : (
                      <span className="text-slate-400">Not provided</span>
                    )}
                  </div>
                </div>
              </div>

              {/* Complete Shipping Address */}
              <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-3">
                <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
                  <MapPin className="w-4 h-4 text-indigo-600" />
                  <span>2. Complete Shipping Address</span>
                </div>
                <div className="space-y-1.5 text-xs pl-6">
                  <p className="font-medium text-slate-900">{order.shipping_address?.street_address}</p>
                  <p className="text-slate-700">
                    {order.shipping_address?.city}, {order.shipping_address?.state} {order.shipping_address?.postal_code}
                  </p>
                  <p className="text-slate-500 font-mono">{order.shipping_address?.country || 'Pakistan'}</p>
                  {order.notes && (
                    <div className="pt-2 border-t border-slate-200 mt-2">
                      <span className="text-[10px] font-bold text-amber-800 uppercase block">Customer Notes:</span>
                      <p className="italic text-slate-600">&ldquo;{order.notes}&rdquo;</p>
                    </div>
                  )}
                </div>
              </div>

            </div>

            {/* Ordered Items Table */}
            <div className="space-y-3 pt-2">
              <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                <Package className="w-4 h-4 text-indigo-600" />
                <span>3. Ordered Product Line Items ({order.items?.length || 0})</span>
              </h3>

              <div className="border border-slate-200 rounded-2xl overflow-hidden divide-y divide-slate-100">
                {order.items?.map((it) => (
                  <div key={it.id} className="p-4 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="relative w-14 h-14 rounded-xl overflow-hidden border border-slate-200 bg-slate-100 shrink-0">
                        {it.product_image ? (
                          <Image src={it.product_image} alt={it.product_name} fill sizes="56px" className="object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center font-bold text-slate-400 text-xs">
                            AURA
                          </div>
                        )}
                      </div>
                      <div>
                        <p className="font-bold text-slate-900 text-sm">{it.product_name}</p>
                        <div className="flex items-center gap-2 text-xs text-slate-500 mt-0.5 font-mono">
                          <span>Qty: {it.quantity}</span>
                          &bull;
                          <span>Unit: {formatPrice(it.product_price)}</span>
                          {it.selected_color && <span>&bull; Color: {it.selected_color}</span>}
                        </div>
                      </div>
                    </div>

                    <div className="font-black text-slate-950 text-base">
                      {formatPrice(it.total_price)}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Accounting Breakdown */}
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200/80 max-w-md ml-auto space-y-2 text-xs">
              <div className="flex justify-between text-slate-600">
                <span>Subtotal</span>
                <span className="font-bold text-slate-900">{formatPrice(order.subtotal)}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Nationwide Shipping</span>
                <span className="font-bold text-slate-900">
                  {order.shipping_fee === 0 ? <span className="text-emerald-700">FREE</span> : formatPrice(order.shipping_fee)}
                </span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>GST (5%)</span>
                <span className="font-bold text-slate-900">{formatPrice(order.tax)}</span>
              </div>
              <div className="flex justify-between text-sm font-black text-slate-950 pt-2 border-t border-slate-200">
                <span>Total Amount</span>
                <span className="text-indigo-600">{formatPrice(order.total)}</span>
              </div>
            </div>

          </div>
        )}

      </AdminGuard>
    </div>
  );
}
