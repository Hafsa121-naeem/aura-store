'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Check, Sparkles, ArrowRight, Copy, CheckCircle2 } from 'lucide-react';

export default function VipNewsletter() {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim() && email.includes('@')) {
      setIsSubmitted(true);
    }
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText('AURA10');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="py-20 sm:py-24 bg-white border-t border-slate-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="rounded-3xl bg-gradient-to-b from-[#FAF7F2] to-white border border-[#b48a4c]/30 p-8 sm:p-14 shadow-lg space-y-6 relative overflow-hidden">
          
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#b48a4c]/40 text-[#8c6b2d] text-[10px] uppercase tracking-[0.24em] font-bold shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-[#b48a4c]" />
            <span>VIP Concierge Club</span>
          </div>

          <div className="space-y-3">
            <h2 className="text-3xl sm:text-4xl font-light font-serif text-slate-950 tracking-tight">
              Unlock 10% Off Your First Order
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 max-w-lg mx-auto font-normal leading-relaxed">
              Join Pakistan&apos;s most exclusive lifestyle community. Receive priority access to private flash sales, limited titanium releases, and personal concierge support.
            </p>
          </div>

          <AnimatePresence mode="wait">
            {!isSubmitted ? (
              <motion.form
                key="form"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                onSubmit={handleSubmit}
                className="max-w-md mx-auto flex flex-col sm:flex-row items-center gap-3 pt-2"
              >
                <div className="relative w-full">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address..."
                    required
                    className="w-full bg-white border border-slate-300 rounded-2xl pl-11 pr-4 py-3.5 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#b48a4c] shadow-2xs"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-slate-950 text-white hover:bg-[#b48a4c] hover:text-slate-950 font-bold text-xs uppercase tracking-[0.18em] transition-all duration-300 shadow-md shrink-0 flex items-center justify-center gap-2 active:scale-98"
                >
                  <span>Join Club</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </motion.form>
            ) : (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="max-w-md mx-auto p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-3"
              >
                <div className="flex items-center justify-center gap-2 text-emerald-800 font-bold text-sm">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  <span>Welcome to the AURA VIP Circle!</span>
                </div>
                <p className="text-xs text-slate-700">
                  Use coupon code below at checkout to enjoy 10% off your order:
                </p>
                <div className="inline-flex items-center gap-3 bg-white px-4 py-2 rounded-xl border border-emerald-300 shadow-xs">
                  <span className="font-mono font-black text-sm tracking-widest text-slate-950">AURA10</span>
                  <button
                    type="button"
                    onClick={handleCopyCode}
                    className="p-1 hover:text-emerald-700 text-slate-500 transition-colors"
                    title="Copy code"
                  >
                    {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
                {copied && <span className="text-[10px] text-emerald-700 block font-bold">Code copied to clipboard!</span>}
              </motion.div>
            )}
          </AnimatePresence>

          <p className="text-[11px] text-slate-400 pt-2 font-normal">
            No spam, ever. Unsubscribe with one click at any time.
          </p>
        </div>
      </div>
    </section>
  );
}
