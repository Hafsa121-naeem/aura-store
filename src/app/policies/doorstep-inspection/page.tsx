import React from 'react';
import Link from 'next/link';
import { Eye, ShieldCheck, CheckCircle2, RotateCcw, ArrowRight } from 'lucide-react';

export const metadata = {
  title: 'Doorstep Inspection Policy | AURA STORE',
  description: 'Inspect your parcel contents and verify authenticity before paying at your doorstep.',
};

export default function DoorstepInspectionPolicyPage() {
  return (
    <div className="min-h-screen bg-[#F5F2EB] text-[#1A1918] py-16 sm:py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-12">
        
        {/* Header */}
        <div className="space-y-4 text-center">
          <div className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.24em] text-[#806B43] bg-[#FAF8F5] px-3.5 py-1.5 border border-[#D8D2C6]">
            <span>Transparency &bull; Authenticity &bull; Confidence</span>
          </div>
          <h1 className="font-editorial text-4xl sm:text-5xl font-light text-[#1A1918] tracking-tight">
            Doorstep Inspection Policy
          </h1>
          <p className="text-xs sm:text-sm text-[#5C5852] font-light max-w-xl mx-auto leading-relaxed">
            Inspect before you pay. We empower all clients across Pakistan to verify parcel contents, physical condition, and warranty documentation at their doorstep.
          </p>
        </div>

        {/* Pillars */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="bg-[#FAF8F5] p-6 border border-[#D8D2C6] space-y-3">
            <Eye className="w-6 h-6 text-[#806B43] stroke-[1.5]" />
            <h3 className="font-editorial text-xl text-[#1A1918]">Inspect Before Paying</h3>
            <p className="text-xs text-[#5C5852] font-light leading-relaxed">
              Open the courier flyer in the presence of the delivery rider to confirm the ordered item matches your selection.
            </p>
          </div>

          <div className="bg-[#FAF8F5] p-6 border border-[#D8D2C6] space-y-3">
            <ShieldCheck className="w-6 h-6 text-[#806B43] stroke-[1.5]" />
            <h3 className="font-editorial text-xl text-[#1A1918]">Serial &amp; Seal Verification</h3>
            <p className="text-xs text-[#5C5852] font-light leading-relaxed">
              Verify manufacturer holographic seals, official serial number tags, and warranty registration cards intact.
            </p>
          </div>

          <div className="bg-[#FAF8F5] p-6 border border-[#D8D2C6] space-y-3">
            <RotateCcw className="w-6 h-6 text-[#806B43] stroke-[1.5]" />
            <h3 className="font-editorial text-xl text-[#1A1918]">Zero-Penalty Refusal</h3>
            <p className="text-xs text-[#5C5852] font-light leading-relaxed">
              If an item is damaged in transit or incorrect, you may refuse acceptance on the spot with zero charge or deduction.
            </p>
          </div>
        </div>

        {/* Rules and Protocol */}
        <div className="bg-[#FAF8F5] border border-[#D8D2C6] p-8 sm:p-12 space-y-8">
          <div className="space-y-2">
            <h2 className="font-editorial text-2xl sm:text-3xl font-light text-[#1A1918]">
              Inspection Protocol for Delivery Riders
            </h2>
            <div className="w-12 h-0.5 bg-[#806B43]" />
          </div>

          <div className="space-y-4 text-xs text-[#5C5852] font-light leading-relaxed">
            <p>
              Under our nationwide agreement with TCS, Leopards, and Trax couriers, delivery personnel are instructed to allow clients reasonable time (3 to 5 minutes) to examine the outer packaging and inner product box.
            </p>

            <div className="p-4 bg-[#EDE8DF]/60 border border-[#D8D2C6] space-y-2">
              <h4 className="font-mono text-xs uppercase tracking-wider text-[#1A1918] font-medium">
                What Is Permitted During Inspection:
              </h4>
              <ul className="list-disc pl-5 space-y-1.5 text-xs text-[#5C5852]">
                <li>Opening the outer waterproof courier flyer.</li>
                <li>Examining the product gift box, model name, color variant, and serial barcode.</li>
                <li>Checking that all cables, chargers, and manufacturer warranty cards are present.</li>
                <li>Verifying that there is no glass or chassis transit crack.</li>
              </ul>
            </div>

            <div className="p-4 bg-[#EDE8DF]/60 border border-[#D8D2C6] space-y-2">
              <h4 className="font-mono text-xs uppercase tracking-wider text-[#1A1918] font-medium">
                What Requires Acceptance First:
              </h4>
              <p className="text-xs text-[#5C5852]">
                Electrical power-on, pairing, or skin application (such as perfumes or serums) can be tested following handover. Any technical defects discovered after powering on are fully protected by our 7-Day Replacement Guarantee and 12-Month Official Warranty.
              </p>
            </div>
          </div>

          <div className="pt-6 border-t border-[#D8D2C6]/80 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-[#8C867D] font-light">
              Rider refusing inspection? Contact client care immediately.
            </p>
            <Link
              href="/products"
              className="inline-flex items-center gap-2 bg-[#1A1918] hover:bg-[#806B43] text-[#FAF8F5] px-6 py-3 text-xs uppercase tracking-[0.2em] font-light transition-all"
            >
              <span>Explore Certified Catalog</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
