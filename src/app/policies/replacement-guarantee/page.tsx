import React from 'react';
import Link from 'next/link';
import { RotateCcw, Clock, ShieldCheck, CheckCircle2, ArrowRight } from 'lucide-react';

export const metadata = {
  title: '7-Day Replacement Guarantee | AURA STORE',
  description: 'Hassle-free 7-day replacement guarantee with doorstep reverse courier collection across Pakistan.',
};

export default function ReplacementGuaranteePage() {
  return (
    <div className="min-h-screen bg-[#F5F2EB] text-[#1A1918] py-16 sm:py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-12">
        
        {/* Header */}
        <div className="space-y-4 text-center">
          <div className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.24em] text-[#806B43] bg-[#FAF8F5] px-3.5 py-1.5 border border-[#D8D2C6]">
            <span>Peace of Mind &bull; Dedicated Support</span>
          </div>
          <h1 className="font-editorial text-4xl sm:text-5xl font-light text-[#1A1918] tracking-tight">
            7-Day Replacement Guarantee
          </h1>
          <p className="text-xs sm:text-sm text-[#5C5852] font-light max-w-xl mx-auto leading-relaxed">
            Every product purchased from AURA STORE includes our signature 7-Day Hassle-Free Replacement Guarantee with complimentary reverse courier pickup from your doorstep.
          </p>
        </div>

        {/* Pillars */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="bg-[#FAF8F5] p-6 border border-[#D8D2C6] space-y-3">
            <Clock className="w-6 h-6 text-[#806B43] stroke-[1.5]" />
            <h3 className="font-editorial text-xl text-[#1A1918]">Full 7 Days</h3>
            <p className="text-xs text-[#5C5852] font-light leading-relaxed">
              You have 7 complete calendar days starting from the timestamp your parcel was signed for to report any concern.
            </p>
          </div>

          <div className="bg-[#FAF8F5] p-6 border border-[#D8D2C6] space-y-3">
            <RotateCcw className="w-6 h-6 text-[#806B43] stroke-[1.5]" />
            <h3 className="font-editorial text-xl text-[#1A1918]">Doorstep Reverse Pickup</h3>
            <p className="text-xs text-[#5C5852] font-light leading-relaxed">
              No need to visit courier offices. Our rider will collect the return package directly from your address anywhere in Pakistan.
            </p>
          </div>

          <div className="bg-[#FAF8F5] p-6 border border-[#D8D2C6] space-y-3">
            <ShieldCheck className="w-6 h-6 text-[#806B43] stroke-[1.5]" />
            <h3 className="font-editorial text-xl text-[#1A1918]">Immediate Replacement</h3>
            <p className="text-xs text-[#5C5852] font-light leading-relaxed">
              Once handed over to the courier, a brand new replacement unit or full reimbursement is dispatched without delay.
            </p>
          </div>
        </div>

        {/* Replacement Conditions */}
        <div className="bg-[#FAF8F5] border border-[#D8D2C6] p-8 sm:p-12 space-y-8">
          <div className="space-y-2">
            <h2 className="font-editorial text-2xl sm:text-3xl font-light text-[#1A1918]">
              Eligible Replacement Scenarios
            </h2>
            <div className="w-12 h-0.5 bg-[#806B43]" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-[#5C5852] font-light leading-relaxed">
            <div className="p-4 bg-[#EDE8DF]/50 border border-[#D8D2C6]">
              <h4 className="font-mono text-xs uppercase tracking-wider text-[#1A1918] font-medium mb-1">
                Manufacturing &amp; Hardware Faults
              </h4>
              <p>
                Any internal electronic flaw, charging dysfunction, dead pixel, audio distortion, or sensor defect discovered within 7 days qualifies for an instant replacement.
              </p>
            </div>

            <div className="p-4 bg-[#EDE8DF]/50 border border-[#D8D2C6]">
              <h4 className="font-mono text-xs uppercase tracking-wider text-[#1A1918] font-medium mb-1">
                Transit Damage or Discrepancy
              </h4>
              <p>
                If your object suffered transit impact or if a different color variant/size was packaged, we replace it with express courier dispatch at zero cost.
              </p>
            </div>
          </div>

          <div className="space-y-3 pt-4 border-t border-[#D8D2C6]/80 text-xs text-[#5C5852] font-light">
            <h4 className="font-mono text-xs uppercase tracking-wider text-[#1A1918] font-medium">
              How to Initiate a Replacement:
            </h4>
            <ol className="list-decimal pl-5 space-y-1.5">
              <li>Message our Lahore Client Care Concierge via WhatsApp (+92 300 0000000) or email support@aurastore.pk.</li>
              <li>Share your Order Number (e.g. AUR-519899) and a 10-second video clip demonstrating the issue.</li>
              <li>Our team will arrange a doorstep courier pickup ticket within 24 business hours.</li>
            </ol>
          </div>

          <div className="pt-6 border-t border-[#D8D2C6]/80 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-[#8C867D] font-light">
              Need assistance with an existing order?
            </p>
            <Link
              href="/track-order"
              className="inline-flex items-center gap-2 bg-[#1A1918] hover:bg-[#806B43] text-[#FAF8F5] px-6 py-3 text-xs uppercase tracking-[0.2em] font-light transition-all"
            >
              <span>Track Your Order</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
