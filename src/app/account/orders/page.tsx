import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getAllOrders } from '@/lib/services/api';
import { formatPrice, formatDate } from '@/lib/utils';
import { Package, Clock, CheckCircle2, Truck, ShoppingBag, ArrowRight } from 'lucide-react';


export default async function OrdersPage() {
  const orders = await getAllOrders();

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 pb-8 mb-8 border-b border-slate-200">
        <div>
          <nav className="flex items-center gap-2 text-xs text-slate-500 mb-2">
            <Link href="/" className="hover:text-slate-900 transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link href="/account" className="hover:text-slate-900 transition-colors">
              Account
            </Link>
            <span>/</span>
            <span className="text-slate-900 font-semibold">Orders</span>
          </nav>
          <h1 className="text-3xl font-extrabold text-slate-950 tracking-tight">
            Order History
          </h1>
          <p className="text-sm text-slate-500 mt-0.5">
            View all previous purchases, track deliveries, and inspect order details.
          </p>
        </div>

        <Link
          href="/products"
          className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-semibold px-5 py-2.5 rounded-xl text-xs transition-colors"
        >
          <span>Browse Products</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {orders.length === 0 ? (
        <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center max-w-lg mx-auto">
          <div className="w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-400 mx-auto mb-4">
            <Package className="w-8 h-8" />
          </div>
          <h3 className="text-base font-bold text-slate-900">No Orders Placed Yet</h3>
          <p className="text-xs text-slate-500 mt-1 mb-6">
            When you complete a checkout, your full order history and shipping details will appear here.
          </p>
          <Link
            href="/products"
            className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold px-6 py-3 rounded-xl text-xs transition-colors shadow-sm"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Shop Now</span>
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => {
            const isDelivered = order.order_status === 'delivered';
            const isShipped = order.order_status === 'shipped';

            return (
              <div
                key={order.id}
                className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs hover:border-slate-300 transition-all"
              >
                {/* Order Top Bar */}
                <div className="p-5 bg-slate-50 border-b border-slate-100 flex flex-wrap items-center justify-between gap-4 text-xs">
                  <div className="flex flex-wrap items-center gap-6">
                    <div>
                      <span className="text-slate-400 block font-medium">Order Number</span>
                      <span className="font-mono font-bold text-slate-900 text-sm">
                        {order.order_number}
                      </span>
                    </div>
                    <div>
                      <span className="text-slate-400 block font-medium">Date Placed</span>
                      <span className="font-semibold text-slate-800">
                        {formatDate(order.created_at)}
                      </span>
                    </div>
                    <div>
                      <span className="text-slate-400 block font-medium">Total Amount</span>
                      <span className="font-extrabold text-slate-900 text-sm">
                        {formatPrice(order.total)}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    {/* Status Pill */}
                    <span
                      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                        isDelivered
                          ? 'bg-emerald-100 text-emerald-800'
                          : isShipped
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {isDelivered ? (
                        <CheckCircle2 className="w-3.5 h-3.5" />
                      ) : isShipped ? (
                        <Truck className="w-3.5 h-3.5" />
                      ) : (
                        <Clock className="w-3.5 h-3.5" />
                      )}
                      <span>{order.order_status}</span>
                    </span>

                    <span className="text-[11px] font-semibold text-slate-500 uppercase bg-slate-200/70 px-2.5 py-1 rounded-md">
                      {order.payment_method === 'cash_on_delivery' ? 'COD' : 'Card'}
                    </span>
                  </div>
                </div>

                {/* Items in this order */}
                <div className="p-6 divide-y divide-slate-100">
                  {order.items?.map((item) => (
                    <div key={item.id} className="py-4 first:pt-0 last:pb-0 flex items-center gap-4">
                      <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-slate-100 flex-shrink-0">
                        {item.product_image ? (
                          <Image
                            src={item.product_image}
                            alt={item.product_name}
                            fill
                            className="object-cover"
                            unoptimized
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-slate-400 text-xs font-bold">
                            AURA
                          </div>
                        )}
                      </div>

                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-bold text-slate-900 truncate">
                          {item.product_name}
                        </h4>
                        <p className="text-xs text-slate-500 mt-0.5">
                          Qty: {item.quantity} × {formatPrice(item.product_price)}
                        </p>
                      </div>

                      <span className="font-extrabold text-slate-900 text-sm">
                        {formatPrice(item.total_price)}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Shipping summary footer */}
                <div className="p-4 bg-slate-50/50 border-t border-slate-100 flex flex-col sm:flex-row justify-between items-start sm:items-center text-xs text-slate-500 gap-2">
                  <div>
                    <span className="font-semibold text-slate-700">Ship to: </span>
                    <span>
                      {order.shipping_address?.full_name}, {order.shipping_address?.street_address},{' '}
                      {order.shipping_address?.city}, {order.shipping_address?.state}{' '}
                      {order.shipping_address?.postal_code}
                    </span>
                  </div>
                  <div className="text-emerald-700 font-semibold">
                    Payment Status: <span className="uppercase font-bold">{order.payment_status}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
