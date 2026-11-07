'use client';

import React, { useState } from 'react';
import AdminGuard from '@/components/admin/AdminGuard';
import AdminHeader from '@/components/admin/AdminHeader';
import { Order, OrderStatus } from '@/lib/types/database';
import { updateOrderStatus } from '@/lib/services/api';
import { formatPrice } from '@/lib/utils';
import {
  CheckCircle2,
  Clock,
  Truck,
  XCircle,
  Search,
} from 'lucide-react';

const INITIAL_MOCK_ORDERS: Order[] = [
  {
    id: 'ord-101',
    order_number: 'AUR-PK-89102',
    user_id: 'usr-1',
    customer_email: 'hamza.tariq@gmail.com',
    customer_name: 'Hamza Tariq',
    customer_phone: '+92 300 8472910',
    shipping_address: {
      full_name: 'Hamza Tariq',
      phone: '+92 300 8472910',
      street_address: 'House 42, Block L, Phase 5 DHA',
      city: 'Lahore',
      state: 'Punjab',
      postal_code: '54000',
      country: 'Pakistan',
    },
    subtotal: 24999.00,
    shipping_fee: 0.00,
    tax: 1250.00,
    total: 26249.00,
    payment_method: 'cash_on_delivery',
    payment_status: 'pending',
    order_status: 'processing',
    notes: 'Call before delivery please',
    created_at: '2026-11-01T00:00:00.000Z',
    updated_at: '2026-11-01T00:00:00.000Z',
    items: [
      {
        id: 'oi-1',
        order_id: 'ord-101',
        product_id: 'p101',
        product_name: 'Horizon Pro ANC Wireless Headphones',
        product_price: 24999.00,
        product_image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80',
        quantity: 1,
        total_price: 24999.00,
        created_at: '2026-11-01T00:00:00.000Z',
      },
    ],
  },
  {
    id: 'ord-102',
    order_number: 'AUR-PK-74921',
    user_id: 'usr-2',
    customer_email: 'zainab.shah@hotmail.com',
    customer_name: 'Zainab Shah',
    customer_phone: '+92 321 9845123',
    shipping_address: {
      full_name: 'Zainab Shah',
      phone: '+92 321 9845123',
      street_address: 'Apartment 4B, Creek Vistas, Phase 8 DHA',
      city: 'Karachi',
      state: 'Sindh',
      postal_code: '75500',
      country: 'Pakistan',
    },
    subtotal: 13999.00,
    shipping_fee: 0.00,
    tax: 700.00,
    total: 14699.00,
    payment_method: 'cash_on_delivery',
    payment_status: 'paid',
    order_status: 'shipped',
    notes: 'Leave at front reception if unavailable',
    created_at: '2026-11-01T00:00:00.000Z',
    updated_at: '2026-11-01T00:00:00.000Z',
    items: [
      {
        id: 'oi-2',
        order_id: 'ord-102',
        product_id: 'p201',
        product_name: 'Chronos Ultra Titanium Smartwatch Gen 4',
        product_price: 13999.00,
        product_image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80',
        quantity: 1,
        total_price: 13999.00,
        created_at: '2026-11-01T00:00:00.000Z',
      },
    ],
  },
  {
    id: 'ord-103',
    order_number: 'AUR-PK-62018',
    user_id: 'usr-3',
    customer_email: 'bilal.ahmed@yahoo.com',
    customer_name: 'Bilal Ahmed',
    customer_phone: '+92 333 5129087',
    shipping_address: {
      full_name: 'Bilal Ahmed',
      phone: '+92 333 5129087',
      street_address: 'House 14, Street 22, Sector F-7/2',
      city: 'Islamabad',
      state: 'Federal Capital',
      postal_code: '44000',
      country: 'Pakistan',
    },
    subtotal: 17999.00,
    shipping_fee: 0.00,
    tax: 900.00,
    total: 18899.00,
    payment_method: 'cash_on_delivery',
    payment_status: 'paid',
    order_status: 'delivered',
    notes: null,
    created_at: '2026-11-01T00:00:00.000Z',
    updated_at: '2026-11-01T00:00:00.000Z',
    items: [
      {
        id: 'oi-3',
        order_id: 'ord-103',
        product_id: 'p701',
        product_name: 'Imperial Oud Royale Extrait de Parfum (100ml)',
        product_price: 17999.00,
        product_image: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=800&q=80',
        quantity: 1,
        total_price: 17999.00,
        created_at: '2026-11-01T00:00:00.000Z',
      },
    ],
  },
];

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>(INITIAL_MOCK_ORDERS);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isUpdating, setIsUpdating] = useState<string | null>(null);

  const handleStatusChange = async (orderId: string, newStatus: OrderStatus) => {
    setIsUpdating(orderId);
    try {
      await updateOrderStatus(orderId, newStatus);
      setOrders((prev) =>
        prev.map((o) => (o.id === orderId ? { ...o, order_status: newStatus } : o))
      );
    } catch (err) {
      console.error(err);
    } finally {
      setIsUpdating(null);
    }
  };

  const filteredOrders = orders.filter((o) => {
    const matchesStatus = statusFilter === 'all' || o.order_status === statusFilter;
    const matchesSearch =
      o.order_number.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.customer_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.customer_email.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <AdminGuard>
        <AdminHeader />

        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h2 className="text-xl font-bold text-slate-900 tracking-tight">
                Order Fulfillment & Delivery
              </h2>
              <p className="text-xs text-slate-700 mt-0.5">
                Manage nationwide deliveries across Karachi, Lahore, Islamabad, and all cities.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
              <div className="relative flex-1 sm:w-60">
                <input
                  type="text"
                  placeholder="Search order # or customer..."
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
                <option value="all">All Statuses</option>
                <option value="processing">Processing</option>
                <option value="confirmed">Confirmed</option>
                <option value="shipped">Shipped</option>
                <option value="delivered">Delivered</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-700 uppercase tracking-wider border-y border-slate-100 font-bold">
                <tr>
                  <th className="py-3 px-4 font-bold">Order #</th>
                  <th className="py-3 px-4 font-bold">Customer & City</th>
                  <th className="py-3 px-4 font-bold">Items</th>
                  <th className="py-3 px-4 font-bold">Total Amount</th>
                  <th className="py-3 px-4 font-bold">Payment</th>
                  <th className="py-3 px-4 font-bold">Order Status</th>
                  <th className="py-3 px-4 font-bold text-right">Update Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredOrders.map((order) => {
                  return (
                    <tr key={order.id} className="hover:bg-slate-50/70 transition-colors">
                      <td className="py-3.5 px-4 font-mono font-bold text-slate-900">
                        {order.order_number}
                      </td>
                      <td className="py-3.5 px-4">
                        <div className="font-bold text-slate-900">{order.customer_name}</div>
                        <div className="text-[11px] text-slate-700">
                          {order.shipping_address?.city}, {order.customer_phone}
                        </div>
                      </td>
                      <td className="py-3.5 px-4 text-slate-700 font-medium">
                        {order.items?.length || 1} items
                      </td>
                      <td className="py-3.5 px-4 font-extrabold text-slate-900">
                        {formatPrice(order.total)}
                      </td>
                      <td className="py-3.5 px-4">
                        <span
                          className={`font-bold uppercase text-[10px] px-2.5 py-0.5 rounded-full ${
                            order.payment_status === 'paid'
                              ? 'bg-emerald-100 text-emerald-800'
                              : 'bg-amber-100 text-amber-800'
                          }`}
                        >
                          COD ({order.payment_status})
                        </span>
                      </td>
                      <td className="py-3.5 px-4">
                        <span
                          className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider ${
                            order.order_status === 'delivered'
                              ? 'bg-emerald-100 text-emerald-800'
                              : order.order_status === 'shipped'
                              ? 'bg-blue-100 text-blue-800'
                              : order.order_status === 'cancelled'
                              ? 'bg-red-100 text-red-800'
                              : 'bg-amber-100 text-amber-800'
                          }`}
                        >
                          {order.order_status === 'delivered' ? (
                            <CheckCircle2 className="w-3 h-3" />
                          ) : order.order_status === 'shipped' ? (
                            <Truck className="w-3 h-3" />
                          ) : order.order_status === 'cancelled' ? (
                            <XCircle className="w-3 h-3" />
                          ) : (
                            <Clock className="w-3 h-3" />
                          )}
                          <span>{order.order_status}</span>
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <select
                          value={order.order_status}
                          disabled={isUpdating === order.id}
                          onChange={(e) =>
                            handleStatusChange(order.id, e.target.value as OrderStatus)
                          }
                          className="bg-slate-100 hover:bg-slate-200 border border-slate-300 rounded-lg px-2.5 py-1 text-xs font-semibold text-slate-800 cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-600 disabled:opacity-50"
                        >
                          <option value="processing">Processing</option>
                          <option value="confirmed">Confirmed</option>
                          <option value="shipped">Shipped</option>
                          <option value="delivered">Delivered</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </AdminGuard>
    </div>
  );
}
