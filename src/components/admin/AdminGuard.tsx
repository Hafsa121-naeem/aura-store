'use client';

import React from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { ShieldAlert, Lock, ArrowLeft, Key } from 'lucide-react';

interface AdminGuardProps {
  children: React.ReactNode;
}

export default function AdminGuard({ children }: AdminGuardProps) {
  const { user, profile, isAdmin, isLoading, setMockRole } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-indigo-600" />
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center px-4 py-16">
        <div className="max-w-md w-full bg-white p-8 rounded-3xl border border-red-200 shadow-xl text-center space-y-6">
          <div className="w-16 h-16 bg-red-50 text-red-600 rounded-2xl flex items-center justify-center mx-auto border border-red-100">
            <ShieldAlert className="w-8 h-8" />
          </div>

          <div>
            <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
              Access Restricted
            </h2>
            <p className="text-xs text-slate-500 mt-2 leading-relaxed">
              Administrative role authorization is required to access the AURA management portal.
              Currently signed in as:{' '}
              <span className="font-semibold text-slate-800">
                {profile?.email || user?.email || 'Anonymous Guest'}
              </span>{' '}
              (Role:{' '}
              <span className="font-bold uppercase text-red-600">
                {profile?.role || 'None'}
              </span>
              ).
            </p>
          </div>

          <div className="p-4 bg-indigo-50/70 rounded-2xl border border-indigo-100 text-xs text-indigo-950 text-left space-y-2">
            <div className="flex items-center gap-2 font-bold text-indigo-950">
              <Key className="w-4 h-4 text-indigo-600" />
              <span>Store Owner &amp; Admin Portal Access</span>
            </div>
            <p className="text-slate-600">
              Click below to enter with full Store Owner Admin privileges (Hafsa Naeem) to manage products, pricing in PKR, stock, and customer orders.
            </p>
            <button
              type="button"
              onClick={() => setMockRole('admin')}
              className="w-full mt-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2.5 px-4 rounded-xl text-xs flex items-center justify-center gap-2 shadow-md shadow-indigo-600/20 transition-all hover:scale-[1.02]"
            >
              <Key className="w-3.5 h-3.5" />
              <span>Unlock Admin Mode (Hafsa Naeem)</span>
            </button>
          </div>

          <div className="flex gap-3">
            <Link
              href="/"
              className="flex-1 inline-flex items-center justify-center gap-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold py-2.5 rounded-xl text-xs transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Store</span>
            </Link>
            <Link
              href="/auth/login"
              className="flex-1 inline-flex items-center justify-center gap-1.5 bg-slate-950 hover:bg-slate-800 text-white font-semibold py-2.5 rounded-xl text-xs transition-colors"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>Sign In</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
