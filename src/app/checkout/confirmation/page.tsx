'use client';

import React, { Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { CheckCircle2, Package, ArrowRight, Truck, Mail } from 'lucide-react';

function ConfirmationContent() {
  const searchParams = useSearchParams();
  const orderNumber = searchParams.get('orderNumber') || 'AUR-829103';

  return (
    <div className="max-w-3xl mx-auto px-4 py-16 text-center">
      <div className="w-20 h-20 bg-emerald-50 text-emerald-600 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-sm border border-emerald-100 animate-in zoom-in">
        <CheckCircle2 className="w-10 h-10" />
      </div>

      <span className="text-xs uppercase tracking-widest font-extrabold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full">
        Order Confirmed
      </span>

      <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight mt-3">
        Thank You For Your Order!
      </h1>

      <p className="text-base text-slate-600 mt-2 max-w-lg mx-auto">
        Your order reference number is{' '}
        <span className="font-mono font-bold text-slate-950 bg-slate-100 px-2 py-0.5 rounded-md">
          {orderNumber}
        </span>
        . We have sent a confirmation email with full tracking details to your inbox.
      </p>

      {/* Highlights */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-lg mx-auto my-10 text-left">
        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs flex items-start gap-3">
          <Truck className="w-5 h-5 text-indigo-600 flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="text-sm font-bold text-slate-900">Estimated Delivery</h4>
            <p className="text-xs text-slate-700 mt-0.5">2 - 4 business days via TCS / Leopards Courier in Pakistan</p>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs flex items-start gap-3">
          <Mail className="w-5 h-5 text-indigo-600 flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="text-sm font-bold text-slate-900">Cash on Delivery</h4>
            <p className="text-xs text-slate-700 mt-0.5">Please have cash ready in PKR when the courier delivers</p>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row justify-center gap-4">
        <Link
          href="/account/orders"
          className="bg-slate-950 hover:bg-slate-800 text-white font-semibold px-6 py-3.5 rounded-xl text-sm flex items-center justify-center gap-2 transition-all shadow-md"
        >
          <Package className="w-4 h-4" />
          <span>View In Order History</span>
        </Link>
        <Link
          href="/products"
          className="bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 font-semibold px-6 py-3.5 rounded-xl text-sm flex items-center justify-center gap-2 transition-all"
        >
          <span>Continue Shopping</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}

export default function ConfirmationPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-[50vh] flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600" />
        </div>
      }
    >
      <ConfirmationContent />
    </Suspense>
  );
}
