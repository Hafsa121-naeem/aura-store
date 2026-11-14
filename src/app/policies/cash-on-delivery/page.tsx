import React from 'react';
import Link from 'next/link';
import { Banknote, ShieldCheck, Truck, CheckCircle2, ArrowRight } from 'lucide-react';

export const metadata = {
  title: 'Cash on Delivery Protocol | AURA STORE',
  description: 'Nationwide Cash on Delivery with 0% prepayment and doorstep verification across Pakistan.',
};

export default function CashOnDeliveryPolicyPage() {
  return (
    <div className="min-h-screen bg-[#F5F2EB] text-[#1A1918] py-16 sm:py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-12">
        
        {/* Header */}
        <div className="space-y-4 text-center">
          <div className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.24em] text-[#806B43] bg-[#FAF8F5] px-3.5 py-1.5 border border-[#D8D2C6]">
            <span>Security &bull; Integrity &bull; Trust</span>
          </div>
          <h1 className="font-editorial text-4xl sm:text-5xl font-light text-[#1A1918] tracking-tight">
            Cash on Delivery Protocol
          </h1>
          <p className="text-xs sm:text-sm text-[#5C5852] font-light max-w-xl mx-auto leading-relaxed">
            Zero prepayment required. Enjoy effortless nationwide shopping across 200+ cities in Pakistan with full payment collected only when your parcel arrives.
          </p>
        </div>

        {/* Core Pillars */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="bg-[#FAF8F5] p-6 border border-[#D8D2C6] space-y-3">
            <Banknote className="w-6 h-6 text-[#806B43] stroke-[1.5]" />
            <h3 className="font-editorial text-xl text-[#1A1918]">0% Advance Payment</h3>
            <p className="text-xs text-[#5C5852] font-light leading-relaxed">
              Place your order with zero deposit or card details. Pay the exact order sum in PKR to the courier rider upon delivery.
            </p>
          </div>

          <div className="bg-[#FAF8F5] p-6 border border-[#D8D2C6] space-y-3">
            <ShieldCheck className="w-6 h-6 text-[#806B43] stroke-[1.5]" />
            <h3 className="font-editorial text-xl text-[#1A1918]">Doorstep Verification</h3>
            <p className="text-xs text-[#5C5852] font-light leading-relaxed">
              You are entitled to verify the parcel seal and physical package integrity before handing over payment to the delivery rider.
            </p>
          </div>

          <div className="bg-[#FAF8F5] p-6 border border-[#D8D2C6] space-y-3">
            <Truck className="w-6 h-6 text-[#806B43] stroke-[1.5]" />
            <h3 className="font-editorial text-xl text-[#1A1918]">Express Dispatch</h3>
            <p className="text-xs text-[#5C5852] font-light leading-relaxed">
              Orders confirmed before 3:00 PM PKT are dispatched the same evening from our Karachi and Lahore vaults via premium air couriers.
            </p>
          </div>
        </div>

        {/* Detailed Guidelines */}
        <div className="bg-[#FAF8F5] border border-[#D8D2C6] p-8 sm:p-12 space-y-8">
          <div className="space-y-2">
            <h2 className="font-editorial text-2xl sm:text-3xl font-light text-[#1A1918]">
              Step-by-Step Payment Process
            </h2>
            <div className="w-12 h-0.5 bg-[#806B43]" />
          </div>

          <div className="space-y-6 text-xs text-[#5C5852] font-light leading-relaxed">
            <div className="flex gap-4 items-start">
              <span className="font-mono text-sm font-bold text-[#806B43] bg-[#EDE8DF] w-8 h-8 flex items-center justify-center shrink-0">
                01
              </span>
              <div>
                <h4 className="font-mono text-xs uppercase tracking-wider text-[#1A1918] font-medium mb-1">
                  Order Placement &amp; Dispatch Confirmation
                </h4>
                <p>
                  Add your curated architectural objects to the bag, enter your nationwide delivery address, and select Cash on Delivery. You will receive an immediate SMS and email order confirmation with your unique order identifier (e.g. AUR-519899).
                </p>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <span className="font-mono text-sm font-bold text-[#806B43] bg-[#EDE8DF] w-8 h-8 flex items-center justify-center shrink-0">
                02
              </span>
              <div>
                <h4 className="font-mono text-xs uppercase tracking-wider text-[#1A1918] font-medium mb-1">
                  Nationwide Express Transit
                </h4>
                <p>
                  Your parcel is handled exclusively by our certified logistics partners (TCS, Leopards, and Trax). You can track real-time delivery milestones 24/7 on our nationwide tracking portal.
                </p>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <span className="font-mono text-sm font-bold text-[#806B43] bg-[#EDE8DF] w-8 h-8 flex items-center justify-center shrink-0">
                03
              </span>
              <div>
                <h4 className="font-mono text-xs uppercase tracking-wider text-[#1A1918] font-medium mb-1">
                  Doorstep Inspection &amp; Exact Handover
                </h4>
                <p>
                  Upon arrival, our courier partner will request the exact payable amount printed on your dispatch invoice. Please keep exact change ready. Riders also accommodate digital IBFT / Raast transfers where supported.
                </p>
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-[#D8D2C6]/80 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-[#8C867D] font-light">
              Questions regarding COD limits or corporate bulk dispatches?
            </p>
            <Link
              href="/track-order"
              className="inline-flex items-center gap-2 bg-[#1A1918] hover:bg-[#806B43] text-[#FAF8F5] px-6 py-3 text-xs uppercase tracking-[0.2em] font-light transition-all"
            >
              <span>Track Active Dispatch</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
