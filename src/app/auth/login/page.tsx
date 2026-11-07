'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { Shield, ArrowRight, Lock, Mail, AlertCircle } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const { signIn, setMockRole } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const res = await signIn(email, password);
    setIsLoading(false);

    if (res.error) {
      setError(res.error);
    } else {
      const emailLower = email.toLowerCase().trim();
      if (
        res.role === 'admin' ||
        emailLower.includes('admin') ||
        emailLower.includes('hafsa') ||
        emailLower === 'hfsanaeem3@gmail.com'
      ) {
        router.push('/admin/products');
      } else {
        router.push('/account');
      }
    }
  };

  const handleQuickDemoAdmin = () => {
    setMockRole('admin');
    router.push('/admin/products');
  };

  const handleQuickDemoCustomer = () => {
    setMockRole('customer');
    router.push('/account');
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md space-y-8 bg-white p-8 sm:p-10 rounded-3xl border border-slate-200 shadow-xl">
        <div className="text-center">
          <Link href="/" className="inline-flex items-center gap-2 mb-4">
            <span className="w-9 h-9 rounded-xl bg-slate-950 text-white font-black text-xl flex items-center justify-center">
              A
            </span>
            <span className="text-2xl font-black tracking-tight text-slate-950">
              AURA<span className="text-indigo-600">.</span>
            </span>
          </Link>
          <h2 className="text-2xl font-extrabold text-slate-950 tracking-tight">
            Sign In to Your Account
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Access your orders, saved addresses, and tailored recommendations.
          </p>
        </div>

        {error && (
          <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
              Email Address
            </label>
            <div className="relative">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@domain.com"
                className="w-full pl-10 pr-4 py-2.5 text-sm rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-600"
              />
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3 pointer-events-none" />
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider">
                Password
              </label>
              <span className="text-[11px] text-indigo-600 hover:text-indigo-500 cursor-pointer">
                Forgot password?
              </span>
            </div>
            <div className="relative">
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-2.5 text-sm rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-600"
              />
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3 pointer-events-none" />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-slate-950 hover:bg-slate-800 text-white font-semibold py-3 px-4 rounded-xl text-sm flex items-center justify-center gap-2 transition-all shadow-md disabled:opacity-50"
          >
            <span>{isLoading ? 'Signing In...' : 'Sign In'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Quick Demo Access Bar */}
        <div className="p-4 rounded-2xl bg-indigo-50/70 border border-indigo-100 text-center space-y-2">
          <p className="text-xs font-bold text-indigo-950 flex items-center justify-center gap-1.5">
            <Shield className="w-3.5 h-3.5 text-indigo-600" />
            Developer / Evaluator Quick Access
          </p>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={handleQuickDemoAdmin}
              className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold py-2 rounded-lg transition-colors"
            >
              Sign In as Admin
            </button>
            <button
              type="button"
              onClick={handleQuickDemoCustomer}
              className="flex-1 bg-white hover:bg-slate-100 text-slate-800 border border-slate-200 text-xs font-semibold py-2 rounded-lg transition-colors"
            >
              Customer Demo
            </button>
          </div>
        </div>

        <p className="text-xs text-center text-slate-500">
          Don&apos;t have an account yet?{' '}
          <Link href="/auth/register" className="text-indigo-600 font-semibold hover:underline">
            Register now
          </Link>
        </p>
      </div>
    </div>
  );
}
