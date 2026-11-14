'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getAllOrders } from '@/lib/services/api';
import { Order } from '@/lib/types/database';
import { formatPrice, formatDate } from '@/lib/utils';
import {
  Search,
  Truck,
  CheckCircle2,
  Clock,
  Package,
  ShieldCheck,
  MapPin,
  ArrowRight,
  Phone,
  Calendar,
} from 'lucide-react';

export default function TrackOrderPage() {
  const [query, setQuery] = useState('');
  const [searched, setSearched] = useState(false);
  const [loading, setLoading] = useState(false);
  const [foundOrder, setFoundOrder] = useState<Order | null>(null);

  const handleTrack = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setSearched(true);
    try {
      const orders = await getAllOrders();
      const cleanQ = query.trim().toLowerCase();
      
      const match = orders.find(
        (o) =>
          o.order_number.toLowerCase() === cleanQ ||
          o.order_number.toLowerCase().replace(/[^a-z0-9]/g, '') === cleanQ.replace(/[^a-z0-9]/g, '') ||
          (o.customer_phone && o.customer_phone.replace(/[^0-9]/g, '').includes(cleanQ.replace(/[^0-9]/g, ''))) ||
          o.customer_email.toLowerCase() === cleanQ
      );

      setFoundOrder(match || null);
    } catch (err) {
      console.error('Tracking query failed:', err);
      setFoundOrder(null);
    } finally {
      setLoading(false);
    }
  };

  const steps = [
    { title: 'Order Confirmed', desc: 'Verified & entered into production vault' },
    { title: 'Quality Inspection', desc: 'Serial numbers verified & stamped' },
    { title: 'In Transit', desc: 'Dispatched via Express Courier nationwide' },
    { title: 'Doorstep Inspection', desc: 'Out for physical inspection & COD' },
    { title: 'Delivered', desc: 'Received & signed by customer' },
  ];

  const getStepIndex = (status: string) => {
    switch (status) {
      case 'processing':
        return 1;
      case 'confirmed':
        return 2;
      case 'shipped':
        return 3;
      case 'delivered':
        return 5;
      case 'cancelled':
        return -1;
      default:
        return 1;
    }
  };

  const currentStep = foundOrder ? getStepIndex(foundOrder.order_status) : 1;

  return (
    <div className="min-h-screen bg-[#F5F2EB] text-[#1A1918] py-12 sm:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-12">
        
        {/* Header Breadcrumb & Title */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.24em] text-[#806B43] bg-[#FAF8F5] px-3.5 py-1.5 border border-[#D8D2C6]">
            <span>Nationwide Logistics Protocol</span> &bull; <span>Pakistan</span>
          </div>
          <h1 className="font-editorial text-4xl sm:text-5xl font-light text-[#1A1918] tracking-tight">
            Track Nationwide Order
          </h1>
          <p className="text-xs sm:text-sm text-[#5C5852] font-light max-w-lg mx-auto leading-relaxed">
            Real-time fulfillment tracking across Karachi, Lahore, Islamabad, and 200+ cities nationwide. Inspect parcel contents at your doorstep before payment.
          </p>
        </div>

        {/* Search Input Box */}
        <div className="bg-[#FAF8F5] border border-[#D8D2C6] p-6 sm:p-8 shadow-xs">
          <form onSubmit={handleTrack} className="space-y-4">
            <label className="block font-mono text-[10px] uppercase tracking-wider text-[#8C867D]">
              Enter Order Number or Registered Phone Number
            </label>
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="e.g. AUR-519899 or 03002166872"
                  className="w-full bg-[#EDE8DF]/60 border border-[#D8D2C6] px-4 py-3 text-xs text-[#1A1918] placeholder-[#8C867D] focus:outline-none focus:border-[#1A1918] transition-colors font-mono"
                  required
                />
                <Search className="w-4 h-4 text-[#8C867D] absolute right-3.5 top-3.5 pointer-events-none" />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="bg-[#1A1918] hover:bg-[#806B43] text-[#FAF8F5] px-8 py-3 text-xs uppercase tracking-[0.22em] font-light transition-all duration-300 disabled:opacity-50 shrink-0"
              >
                {loading ? 'Locating...' : 'Track Dispatch'}
              </button>
            </div>
            <p className="text-[11px] text-[#8C867D] font-light">
              Tip: Your order number was provided at checkout and sent to your email confirmation (e.g. AUR-519899).
            </p>
          </form>
        </div>

        {/* Search Results Display */}
        {searched && (
          <div className="space-y-8 animate-in fade-in duration-500">
            {foundOrder ? (
              <div className="bg-[#FAF8F5] border border-[#D8D2C6] p-6 sm:p-10 shadow-sm space-y-8">
                
                {/* Order Summary Strip */}
                <div className="flex flex-col sm:flex-row justify-between sm:items-center pb-6 border-b border-[#D8D2C6]/80 gap-4">
                  <div>
                    <span className="font-mono text-[10px] uppercase tracking-widest text-[#806B43] block">
                      Active Dispatch Record
                    </span>
                    <h2 className="font-editorial text-2xl sm:text-3xl font-light text-[#1A1918]">
                      Order #{foundOrder.order_number}
                    </h2>
                    <div className="flex items-center gap-3 text-xs text-[#8C867D] mt-1 font-light">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        {formatDate(foundOrder.created_at)}
                      </span>
                      &bull;
                      <span>Total: <strong className="text-[#1A1918] font-normal">{formatPrice(foundOrder.total)}</strong></span>
                    </div>
                  </div>

                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#EDE8DF] border border-[#D8D2C6] text-xs font-mono uppercase tracking-wider text-[#1A1918]">
                    <span className="w-2 h-2 rounded-full bg-[#806B43] animate-pulse" />
                    <span>Status: {foundOrder.order_status}</span>
                  </div>
                </div>

                {/* Tracking Progress Bar */}
                <div className="space-y-4">
                  <h3 className="font-mono text-xs uppercase tracking-wider text-[#1A1918]">
                    Fulfillment Milestones
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
                    {steps.map((st, i) => {
                      const isComplete = i < currentStep;
                      const isCurrent = i === currentStep - 1;

                      return (
                        <div
                          key={st.title}
                          className={`p-3.5 border transition-all ${
                            isComplete
                              ? 'bg-[#1A1918] text-[#FAF8F5] border-[#1A1918]'
                              : isCurrent
                              ? 'bg-[#EDE8DF] text-[#1A1918] border-[#806B43]'
                              : 'bg-[#FAF8F5] text-[#8C867D] border-[#D8D2C6]/60'
                          }`}
                        >
                          <div className="flex items-center gap-2 mb-1.5">
                            {isComplete ? (
                              <CheckCircle2 className="w-3.5 h-3.5 text-[#806B43]" />
                            ) : (
                              <span className="w-3.5 h-3.5 rounded-full border border-current text-[9px] flex items-center justify-center font-mono">
                                {i + 1}
                              </span>
                            )}
                            <span className="text-[11px] font-mono uppercase tracking-wider font-medium">
                              {st.title}
                            </span>
                          </div>
                          <p className={`text-[10px] font-light leading-relaxed ${isComplete ? 'text-[#D8D2C6]' : 'text-[#8C867D]'}`}>
                            {st.desc}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Recipient & Destination Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-[#D8D2C6]/80 text-xs font-light">
                  <div className="space-y-2 bg-[#EDE8DF]/40 p-4 border border-[#D8D2C6]/60">
                    <h4 className="font-mono text-[10px] uppercase tracking-wider text-[#806B43]">
                      Delivery Destination &amp; Protocol
                    </h4>
                    <p className="text-sm font-medium text-[#1A1918]">
                      {foundOrder.shipping_address?.full_name || foundOrder.customer_name}
                    </p>
                    <p className="text-[#5C5852]">
                      {foundOrder.shipping_address?.street_address}
                    </p>
                    <p className="text-[#5C5852]">
                      {foundOrder.shipping_address?.city}, {foundOrder.shipping_address?.state} {foundOrder.shipping_address?.postal_code}
                    </p>
                    <p className="text-[#806B43] font-mono text-[11px] pt-1">
                      Phone: {foundOrder.shipping_address?.phone || foundOrder.customer_phone}
                    </p>
                  </div>

                  <div className="space-y-2 bg-[#EDE8DF]/40 p-4 border border-[#D8D2C6]/60">
                    <h4 className="font-mono text-[10px] uppercase tracking-wider text-[#806B43]">
                      Payment &amp; Doorstep Guarantee
                    </h4>
                    <p className="text-sm font-medium text-[#1A1918]">
                      {foundOrder.payment_method === 'cash_on_delivery' ? 'Cash on Delivery (COD)' : 'Prepaid Card / IBFT'}
                    </p>
                    <p className="text-[#5C5852]">
                      Payment Status: <span className="uppercase font-mono text-[#806B43]">{foundOrder.payment_status}</span>
                    </p>
                    <p className="text-[#5C5852] text-[11px] pt-1">
                      Nationwide Doorstep Inspection is enabled. Inspect parcel packaging and product condition prior to paying.
                    </p>
                  </div>
                </div>

                {/* Ordered Items Preview */}
                <div className="space-y-3 pt-2">
                  <h4 className="font-mono text-[10px] uppercase tracking-wider text-[#1A1918]">
                    Ordered Architectural Objects ({foundOrder.items?.length || 0})
                  </h4>
                  <div className="divide-y divide-[#D8D2C6]/60 border-y border-[#D8D2C6]/60">
                    {foundOrder.items?.map((it) => (
                      <div key={it.id} className="py-3 flex items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                          <div className="relative w-12 h-12 bg-[#EDE8DF] border border-[#D8D2C6]/60 overflow-hidden shrink-0">
                            {it.product_image ? (
                              <Image
                                src={it.product_image}
                                alt={it.product_name}
                                fill
                                sizes="48px"
                                className="object-cover"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center font-editorial text-xs text-[#806B43]">
                                AURA
                              </div>
                            )}
                          </div>
                          <div>
                            <p className="font-editorial text-sm text-[#1A1918]">
                              {it.product_name}
                            </p>
                            <p className="text-[10px] font-mono text-[#8C867D]">
                              Qty: {it.quantity} &bull; {formatPrice(it.product_price)}
                            </p>
                          </div>
                        </div>
                        <span className="font-light text-xs text-[#1A1918]">
                          {formatPrice(it.total_price)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            ) : (
              <div className="bg-[#FAF8F5] border border-[#D8D2C6] p-10 text-center space-y-4">
                <Package className="w-8 h-8 text-[#806B43] mx-auto stroke-[1.25]" />
                <h3 className="font-editorial text-2xl font-light text-[#1A1918]">
                  No Dispatch Record Located
                </h3>
                <p className="text-xs text-[#5C5852] font-light max-w-sm mx-auto leading-relaxed">
                  We could not find an active order matching &ldquo;{query}&rdquo;. Please verify your order number format (e.g. AUR-519899) or contact client care.
                </p>
                <div className="pt-2">
                  <Link
                    href="/account/orders"
                    className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#806B43] hover:text-[#1A1918] transition-colors"
                  >
                    <span>View All Account Orders</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Nationwide Delivery Guarantees Strip */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8">
          <div className="p-5 bg-[#FAF8F5] border border-[#D8D2C6]/80 space-y-2">
            <Truck className="w-5 h-5 text-[#806B43] stroke-[1.5]" />
            <h4 className="font-mono text-xs uppercase tracking-wider text-[#1A1918]">
              200+ Nationwide Cities
            </h4>
            <p className="text-xs text-[#5C5852] font-light leading-relaxed">
              Express delivery to Karachi, Lahore, Islamabad, Faisalabad, Multan, Quetta, and all regions in Pakistan.
            </p>
          </div>

          <div className="p-5 bg-[#FAF8F5] border border-[#D8D2C6]/80 space-y-2">
            <ShieldCheck className="w-5 h-5 text-[#806B43] stroke-[1.5]" />
            <h4 className="font-mono text-xs uppercase tracking-wider text-[#1A1918]">
              Doorstep Inspection
            </h4>
            <p className="text-xs text-[#5C5852] font-light leading-relaxed">
              Open and verify your parcel contents before handing payment to the delivery rider.
            </p>
          </div>

          <div className="p-5 bg-[#FAF8F5] border border-[#D8D2C6]/80 space-y-2">
            <Phone className="w-5 h-5 text-[#806B43] stroke-[1.5]" />
            <h4 className="font-mono text-xs uppercase tracking-wider text-[#1A1918]">
              Concierge Assistance
            </h4>
            <p className="text-xs text-[#5C5852] font-light leading-relaxed">
              Need assistance with an active dispatch? Our Lahore and Karachi client care teams are available daily.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
