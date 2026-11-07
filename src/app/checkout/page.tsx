'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { createOrder } from '@/lib/services/api';
import { formatPrice } from '@/lib/utils';
import {
  CreditCard,
  Banknote,
  ArrowRight,
  AlertCircle,
  ShoppingBag,
  ShieldCheck,
  Truck,
} from 'lucide-react';

export default function CheckoutPage() {
  const router = useRouter();
  const { items, subtotal, shippingFee, tax, total, clearCart } = useCart();
  const { user, profile } = useAuth();

  const [formData, setFormData] = useState({
    fullName: profile?.full_name || '',
    email: profile?.email || user?.email || '',
    phone: profile?.phone || '',
    streetAddress: '',
    city: 'Lahore',
    state: 'Punjab',
    postalCode: '54000',
    country: 'Pakistan',
    paymentMethod: 'cash_on_delivery' as 'cash_on_delivery' | 'card',
    notes: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  if (items.length === 0) {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center">
        <div className="w-16 h-16 bg-white border border-slate-200 rounded-2xl flex items-center justify-center text-slate-400 mx-auto mb-4 shadow-xs">
          <ShoppingBag className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-black text-slate-900">Your cart is empty</h2>
        <p className="text-xs sm:text-sm text-slate-700 mt-1 mb-6">
          Add items to your cart before proceeding to checkout.
        </p>
        <Link
          href="/products"
          className="inline-block bg-slate-900 hover:bg-indigo-600 text-white font-bold px-6 py-3 rounded-xl text-xs transition-colors shadow-xs"
        >
          Explore Catalog
        </Link>
      </div>
    );
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    // Validate fields
    if (
      !formData.fullName ||
      !formData.email ||
      !formData.streetAddress ||
      !formData.city ||
      !formData.state ||
      !formData.postalCode
    ) {
      setErrorMessage('Please fill in all required shipping address fields.');
      return;
    }

    setIsSubmitting(true);

    try {
      const order = await createOrder({
        userId: user?.id || null,
        customerEmail: formData.email,
        customerName: formData.fullName,
        customerPhone: formData.phone || null,
        shippingAddress: {
          full_name: formData.fullName,
          phone: formData.phone,
          street_address: formData.streetAddress,
          city: formData.city,
          state: formData.state,
          postal_code: formData.postalCode,
          country: formData.country,
        },
        subtotal,
        shippingFee,
        tax,
        total,
        paymentMethod: formData.paymentMethod,
        notes: formData.notes,
        items: items.map((i) => {
          const itemUnitPrice = (i.variantSalePrice ?? i.variantPrice) ?? (i.product.sale_price ?? i.product.price);
          return {
            productId: i.product.id,
            productName: i.product.name + (i.selectedColor ? ` (${i.selectedColor})` : ''),
            productPrice: itemUnitPrice,
            productImage: i.selectedImage || i.product.images?.[0]?.image_url || '',
            quantity: i.quantity,
            totalPrice: itemUnitPrice * i.quantity,
            selectedColor: i.selectedColor || null,
          };
        }),
      });

      clearCart();
      router.push(`/checkout/confirmation?orderNumber=${order.order_number}`);
    } catch (err) {
      console.error(err);
      setErrorMessage(
        err instanceof Error ? err.message : 'Failed to create order. Please check inputs and try again.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <div className="mb-8 pb-4 border-b border-slate-200">
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">Express Checkout</h1>
        <p className="text-xs sm:text-sm text-slate-700 mt-1">
          Complete your contact information, shipping address, and payment method below.
        </p>
      </div>

      {errorMessage && (
        <div className="mb-6 p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-semibold flex items-center gap-2.5">
          <AlertCircle className="w-4 h-4 text-rose-600 flex-shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      <form onSubmit={handleFormSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Form Column */}
          <div className="lg:col-span-7 space-y-6">
            {/* Step 1: Customer Details */}
            <div className="bg-white p-6 sm:p-7 rounded-3xl border border-slate-200 shadow-xs space-y-4">
              <h2 className="text-xs sm:text-sm font-extrabold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-slate-900 text-white text-[11px] flex items-center justify-center font-bold">
                  1
                </span>
                Customer Contact
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-bold text-slate-800 uppercase tracking-wider mb-1.5">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    required
                    value={formData.fullName}
                    onChange={handleInputChange}
                    placeholder="e.g. Zainab Malik"
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-xs text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-600 font-medium"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-800 uppercase tracking-wider mb-1.5">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="zainab@example.com"
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-xs text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-600 font-medium"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-[11px] font-bold text-slate-800 uppercase tracking-wider mb-1.5">
                    Mobile Number (for TCS/Courier SMS &amp; call updates) *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="+92 300 1234567"
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-xs text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-600 font-medium"
                  />
                </div>
              </div>
            </div>

            {/* Step 2: Shipping Destination */}
            <div className="bg-white p-6 sm:p-7 rounded-3xl border border-slate-200 shadow-xs space-y-4">
              <h2 className="text-xs sm:text-sm font-extrabold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-slate-900 text-white text-[11px] flex items-center justify-center font-bold">
                  2
                </span>
                Shipping Destination (Pakistan)
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-[11px] font-bold text-slate-800 uppercase tracking-wider mb-1.5">
                    Street / House / Apartment Address *
                  </label>
                  <input
                    type="text"
                    name="streetAddress"
                    required
                    value={formData.streetAddress}
                    onChange={handleInputChange}
                    placeholder="House 42, Street 8, Phase 5, DHA"
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-xs text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-600 font-medium"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-800 uppercase tracking-wider mb-1.5">
                      City *
                    </label>
                    <select
                      name="city"
                      required
                      value={formData.city}
                      onChange={handleInputChange}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-xs text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-600 font-medium"
                    >
                      <option value="Lahore">Lahore</option>
                      <option value="Karachi">Karachi</option>
                      <option value="Islamabad">Islamabad</option>
                      <option value="Rawalpindi">Rawalpindi</option>
                      <option value="Faisalabad">Faisalabad</option>
                      <option value="Multan">Multan</option>
                      <option value="Peshawar">Peshawar</option>
                      <option value="Quetta">Quetta</option>
                      <option value="Sialkot">Sialkot</option>
                      <option value="Gujranwala">Gujranwala</option>
                      <option value="Hyderabad">Hyderabad</option>
                      <option value="Abbottabad">Abbottabad</option>
                      <option value="Bahawalpur">Bahawalpur</option>
                      <option value="Sargodha">Sargodha</option>
                      <option value="Other">Other City</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-800 uppercase tracking-wider mb-1.5">
                      Province / Territory *
                    </label>
                    <select
                      name="state"
                      required
                      value={formData.state}
                      onChange={handleInputChange}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-xs text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-600 font-medium"
                    >
                      <option value="Punjab">Punjab</option>
                      <option value="Sindh">Sindh</option>
                      <option value="Khyber Pakhtunkhwa">Khyber Pakhtunkhwa</option>
                      <option value="Islamabad Capital Territory">Islamabad (ICT)</option>
                      <option value="Balochistan">Balochistan</option>
                      <option value="Azad Kashmir">Azad Kashmir</option>
                      <option value="Gilgit-Baltistan">Gilgit-Baltistan</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-800 uppercase tracking-wider mb-1.5">
                      Postal Code *
                    </label>
                    <input
                      type="text"
                      name="postalCode"
                      required
                      value={formData.postalCode}
                      onChange={handleInputChange}
                      placeholder="54000"
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-xs text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-600 font-medium"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-800 uppercase tracking-wider mb-1.5">
                    Delivery Instructions / Landmark (Optional)
                  </label>
                  <textarea
                    rows={2}
                    name="notes"
                    value={formData.notes}
                    onChange={handleInputChange}
                    placeholder="Near main commercial market, call before arriving..."
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2 text-xs text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-600 font-medium"
                  />
                </div>
              </div>
            </div>

            {/* Step 3: Payment Method */}
            <div className="bg-white p-6 sm:p-7 rounded-3xl border border-slate-200 shadow-xs space-y-4">
              <h2 className="text-xs sm:text-sm font-extrabold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-slate-900 text-white text-[11px] flex items-center justify-center font-bold">
                  3
                </span>
                Payment Method Selection
              </h2>

              <div className="space-y-3">
                {/* Cash on Delivery option */}
                <label className="flex items-start gap-4 p-4 rounded-2xl border-2 cursor-pointer transition-all border-indigo-600 bg-indigo-50/50">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="cash_on_delivery"
                    checked={formData.paymentMethod === 'cash_on_delivery'}
                    onChange={handleInputChange}
                    className="mt-1 text-indigo-600 focus:ring-indigo-500"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <Banknote className="w-5 h-5 text-indigo-600" />
                      <span className="font-extrabold text-slate-900 text-xs sm:text-sm">
                        Cash on Delivery (Pay to courier upon arrival)
                      </span>
                      <span className="bg-emerald-100 text-emerald-800 text-[10px] font-extrabold px-2 py-0.5 rounded-full uppercase">
                        Active
                      </span>
                    </div>
                    <p className="text-xs text-slate-700 mt-1">
                      No upfront card charge. Pay in cash or debit card when your package is handed over at your doorstep.
                    </p>
                  </div>
                </label>

                {/* Credit Card / Stripe Option */}
                <label className="flex items-start gap-4 p-4 rounded-2xl border border-slate-200 bg-slate-50 opacity-70 cursor-not-allowed">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="card"
                    disabled
                    className="mt-1 text-slate-400"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <CreditCard className="w-5 h-5 text-slate-400" />
                      <span className="font-bold text-slate-600 text-xs sm:text-sm">
                        Direct Credit / Debit Card (Stripe Gateway)
                      </span>
                    </div>
                    <p className="text-xs text-slate-700 mt-1">
                      Requires live Stripe API key credentials in environment variables. Cash on delivery is active.
                    </p>
                  </div>
                </label>
              </div>
            </div>
          </div>

          {/* Right Summary Column */}
          <div className="lg:col-span-5 bg-white p-6 sm:p-7 rounded-3xl border border-slate-200 shadow-xs space-y-6">
            <h2 className="text-base font-bold text-slate-900 tracking-tight">
              Order Review ({items.length} {items.length === 1 ? 'item' : 'items'})
            </h2>

            {/* Compact items list */}
            <div className="space-y-3 max-h-72 overflow-y-auto pr-1 divide-y divide-slate-100">
              {items.map((item) => {
                const product = item.product;
                const unitPrice = (item.variantSalePrice ?? item.variantPrice) ?? (product.sale_price ?? product.price);
                const imageSrc =
                  item.selectedImage ||
                  product.images?.[0]?.image_url ||
                  'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80';

                return (
                  <div key={item.id} className="flex items-center gap-3 pt-3 first:pt-0">
                    <div className="relative w-14 h-14 rounded-xl overflow-hidden bg-slate-50 flex-shrink-0 border border-slate-200">
                      <Image
                        src={imageSrc}
                        alt={product.name}
                        fill
                        className="object-cover"
                        unoptimized
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs font-bold text-slate-900 truncate">{product.name}</h4>
                      <div className="flex items-center gap-2 mt-0.5">
                        {item.selectedColor && (
                          <span className="text-[10px] font-bold text-indigo-700 bg-indigo-50 px-1.5 py-0.5 rounded border border-indigo-100">
                            {item.selectedColor}
                          </span>
                        )}
                        <span className="text-[11px] text-slate-700 font-semibold">
                          Qty: {item.quantity} × {formatPrice(unitPrice)}
                        </span>
                      </div>
                    </div>
                    <span className="text-xs font-black text-slate-900">
                      {formatPrice(unitPrice * item.quantity)}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Price breakdown */}
            <div className="space-y-2.5 text-xs text-slate-700 pt-3 border-t border-slate-100">
              <div className="flex justify-between">
                <span>Items Subtotal</span>
                <span className="font-extrabold text-slate-900">{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping Fee</span>
                <span className="font-extrabold text-slate-900">
                  {shippingFee === 0 ? (
                    <span className="text-emerald-700 font-bold uppercase text-[11px]">Free</span>
                  ) : (
                    formatPrice(shippingFee)
                  )}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Standard GST (5%)</span>
                <span className="font-extrabold text-slate-900">{formatPrice(tax)}</span>
              </div>
              <div className="flex justify-between text-base font-black text-slate-900 pt-3 border-t border-slate-200">
                <span>Total Due</span>
                <span className="text-indigo-600 text-xl font-black">{formatPrice(total)}</span>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-slate-900 hover:bg-indigo-600 text-white font-bold py-4 px-6 rounded-2xl flex items-center justify-center gap-2 transition-all shadow-sm group disabled:opacity-50"
            >
              <span>{isSubmitting ? 'Placing Order...' : 'Place Order Now'}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </button>

            <div className="pt-2 text-center text-xs text-slate-700 space-y-1.5 border-t border-slate-100">
              <div className="flex items-center justify-center gap-1.5 text-emerald-800 font-semibold">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Zero charge until delivery with Cash on Delivery</span>
              </div>
              <div className="flex items-center justify-center gap-1.5 text-slate-700">
                <Truck className="w-4 h-4 text-indigo-600" />
                <span>Tracked priority delivery with courier SMS confirmation</span>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
