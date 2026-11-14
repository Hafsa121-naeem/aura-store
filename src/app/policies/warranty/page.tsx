import React from 'react';
import Link from 'next/link';
import { Award, ShieldCheck, CheckCircle2, Wrench, ArrowRight } from 'lucide-react';

export const metadata = {
  title: 'Official 12-Month Warranty | AURA STORE',
  description: 'Official 12-month manufacturer & brand warranty across Pakistan with verified serial registration.',
};

export default function WarrantyPolicyPage() {
  return (
    <div className="min-h-screen bg-[#F5F2EB] text-[#1A1918] py-16 sm:py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-12">
        
        {/* Header */}
        <div className="space-y-4 text-center">
          <div className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.24em] text-[#806B43] bg-[#FAF8F5] px-3.5 py-1.5 border border-[#D8D2C6]">
            <span>Authenticity &bull; Official Distributor Backing</span>
          </div>
          <h1 className="font-editorial text-4xl sm:text-5xl font-light text-[#1A1918] tracking-tight">
            Official 12-Month Warranty
          </h1>
          <p className="text-xs sm:text-sm text-[#5C5852] font-light max-w-xl mx-auto leading-relaxed">
            All high-fidelity audio, smart timepieces, and electronic architecture at AURA STORE carry genuine 12-month manufacturer warranty cards honored nationwide.
          </p>
        </div>

        {/* Pillars */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="bg-[#FAF8F5] p-6 border border-[#D8D2C6] space-y-3">
            <Award className="w-6 h-6 text-[#806B43] stroke-[1.5]" />
            <h3 className="font-editorial text-xl text-[#1A1918]">100% Genuine Stock</h3>
            <p className="text-xs text-[#5C5852] font-light leading-relaxed">
              Every unit is sourced directly from authorized regional brand distributors with valid holographic serial seals.
            </p>
          </div>

          <div className="bg-[#FAF8F5] p-6 border border-[#D8D2C6] space-y-3">
            <ShieldCheck className="w-6 h-6 text-[#806B43] stroke-[1.5]" />
            <h3 className="font-editorial text-xl text-[#1A1918]">Full 365 Days</h3>
            <p className="text-xs text-[#5C5852] font-light leading-relaxed">
              Comprehensive hardware coverage for 365 days from the date of initial delivery against internal component faults.
            </p>
          </div>

          <div className="bg-[#FAF8F5] p-6 border border-[#D8D2C6] space-y-3">
            <Wrench className="w-6 h-6 text-[#806B43] stroke-[1.5]" />
            <h3 className="font-editorial text-xl text-[#1A1918]">Authorized Service</h3>
            <p className="text-xs text-[#5C5852] font-light leading-relaxed">
              Repairs and replacements are performed strictly with original manufacturer replacement components.
            </p>
          </div>
        </div>

        {/* What Is Covered & Terms */}
        <div className="bg-[#FAF8F5] border border-[#D8D2C6] p-8 sm:p-12 space-y-8">
          <div className="space-y-2">
            <h2 className="font-editorial text-2xl sm:text-3xl font-light text-[#1A1918]">
              Scope of Coverage
            </h2>
            <div className="w-12 h-0.5 bg-[#806B43]" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-[#5C5852] font-light leading-relaxed">
            <div className="p-4 bg-[#EDE8DF]/60 border border-[#D8D2C6]">
              <h4 className="font-mono text-xs uppercase tracking-wider text-[#1A1918] font-medium mb-1 text-emerald-800">
                Included Under Warranty
              </h4>
              <ul className="list-disc pl-4 space-y-1">
                <li>Internal acoustic driver failure or channel imbalance</li>
                <li>Bluetooth / wireless module connectivity faults</li>
                <li>Battery degradation exceeding normal thresholds</li>
                <li>Display malfunction, dead pixels, or touch failure</li>
                <li>Motherboard component or charging port failure</li>
              </ul>
            </div>

            <div className="p-4 bg-[#EDE8DF]/60 border border-[#D8D2C6]">
              <h4 className="font-mono text-xs uppercase tracking-wider text-[#1A1918] font-medium mb-1 text-[#8C867D]">
                Exclusions
              </h4>
              <ul className="list-disc pl-4 space-y-1">
                <li>Physical impact cracks, dents, or deep cosmetic scratches</li>
                <li>Liquid damage beyond rated IPX specifications</li>
                <li>Unauthorized third-party disassembly or modification</li>
                <li>Normal aesthetic wear and tear on leather or silicon straps</li>
              </ul>
            </div>
          </div>

          <div className="space-y-2 pt-4 border-t border-[#D8D2C6]/80 text-xs text-[#5C5852] font-light">
            <h4 className="font-mono text-xs uppercase tracking-wider text-[#1A1918] font-medium">
              Claim Procedure:
            </h4>
            <p>
              To file a warranty claim, simply provide your invoice or order number. We can dispatch a courier to pick up your unit or you can visit an authorized service center in Karachi, Lahore, or Islamabad. Turnaround time is typically 5 to 7 business days.
            </p>
          </div>

          <div className="pt-6 border-t border-[#D8D2C6]/80 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-[#8C867D] font-light">
              Want to check warranty status on your device?
            </p>
            <Link
              href="/track-order"
              className="inline-flex items-center gap-2 bg-[#1A1918] hover:bg-[#806B43] text-[#FAF8F5] px-6 py-3 text-xs uppercase tracking-[0.2em] font-light transition-all"
            >
              <span>Check Order &amp; Warranty</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
