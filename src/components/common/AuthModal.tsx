import React, { useState } from 'react';
import { X, Lock, Mail, User, Phone, CheckCircle2, Shield } from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { BrandLogo } from './BrandLogo';

export const AuthModal: React.FC = () => {
  const { isAuthOpen, setIsAuthOpen, login, register, showToast } = useStore();
  const [mode, setMode] = useState<'login' | 'register' | 'forgot'>('login');

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  if (!isAuthOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === 'login') {
      if (!email) return;
      login(email, email.includes('admin') ? 'admin' : 'customer');
    } else if (mode === 'register') {
      if (!name || !email) return;
      register(name, email, phone || '0300-1234567');
    } else {
      showToast('Reset Link Sent', 'Password reset instructions have been emailed.', 'info');
      setMode('login');
    }
  };

  const handleQuickDemo = (role: 'customer' | 'admin') => {
    if (role === 'admin') {
      login('admin@desidrip.com', 'admin');
    } else {
      login('sarah.farooq@gmail.com', 'customer');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto select-none">
      {/* Backdrop */}
      <div
        onClick={() => setIsAuthOpen(false)}
        className="fixed inset-0 bg-black/75 backdrop-blur-xs transition-opacity animate-in fade-in"
      />

      <div className="relative min-h-screen flex items-center justify-center p-4">
        <div className="relative w-full max-w-md bg-[#FBF6EE] rounded-2xl shadow-2xl border border-[#E8D8C8] overflow-hidden animate-in zoom-in-95 duration-200 p-6 sm:p-8">
          
          {/* Close button */}
          <button
            onClick={() => setIsAuthOpen(false)}
            className="absolute top-4 right-4 p-1.5 rounded-full text-[#21130F]/50 hover:text-[#1B0E0A] hover:bg-[#E8D8C8] transition-colors cursor-pointer"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Brand Monogram */}
          <div className="flex flex-col items-center mb-6">
            <BrandLogo size="md" light={false} />
            <h3 className="font-serif-display text-2xl font-bold text-[#1B0E0A] mt-3">
              {mode === 'login' ? 'Welcome Back' : mode === 'register' ? 'Join DESI DRIP' : 'Reset Password'}
            </h3>
            <p className="text-xs text-[#21130F]/60 text-center mt-1">
              {mode === 'login'
                ? 'Sign in to access your saved wishlist, orders & exclusive drops.'
                : mode === 'register'
                ? 'Create your account for personalized recommendations and speed checkout.'
                : 'Enter your email to receive recovery instructions.'}
            </p>
          </div>

          {/* Quick Demo Fill Buttons for frictionless testing */}
          <div className="mb-5 p-3 bg-[#EFE4D6] rounded-xl border border-[#E0CFBD] space-y-2">
            <div className="flex items-center justify-between text-[11px] font-semibold text-[#651B17] uppercase tracking-wider">
              <span>Quick Demo Access</span>
              <Shield className="w-3.5 h-3.5 text-[#C96852]" />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => handleQuickDemo('customer')}
                className="text-xs bg-white hover:bg-[#FBF6EE] text-[#1B0E0A] py-1.5 px-2.5 rounded-md border border-[#E8D8C8] font-medium transition-colors cursor-pointer shadow-xs"
              >
                👤 Customer Demo
              </button>
              <button
                type="button"
                onClick={() => handleQuickDemo('admin')}
                className="text-xs bg-[#2A120D] hover:bg-[#651B17] text-[#F8EEE5] py-1.5 px-2.5 rounded-md font-medium transition-colors cursor-pointer shadow-xs"
              >
                ⚡ Admin Access
              </button>
            </div>
          </div>

          {/* Mode Switcher Tabs */}
          <div className="flex border-b border-[#E8D8C8] mb-5">
            <button
              onClick={() => setMode('login')}
              className={`flex-1 py-2 text-xs font-semibold uppercase tracking-wider transition-colors border-b-2 cursor-pointer ${
                mode === 'login'
                  ? 'border-[#651B17] text-[#651B17]'
                  : 'border-transparent text-[#21130F]/50 hover:text-[#21130F]'
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => setMode('register')}
              className={`flex-1 py-2 text-xs font-semibold uppercase tracking-wider transition-colors border-b-2 cursor-pointer ${
                mode === 'register'
                  ? 'border-[#651B17] text-[#651B17]'
                  : 'border-transparent text-[#21130F]/50 hover:text-[#21130F]'
              }`}
            >
              Register
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === 'register' && (
              <div>
                <label className="block text-xs font-medium text-[#21130F] mb-1">
                  Full Name
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ayesha Khan"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-white border border-[#E8D8C8] rounded-lg pl-9 pr-3 py-2.5 text-xs text-[#1B0E0A] focus:outline-none focus:border-[#C96852]"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs font-medium text-[#21130F] mb-1">
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                <input
                  type="email"
                  required
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-white border border-[#E8D8C8] rounded-lg pl-9 pr-3 py-2.5 text-xs text-[#1B0E0A] focus:outline-none focus:border-[#C96852]"
                />
              </div>
            </div>

            {mode === 'register' && (
              <div>
                <label className="block text-xs font-medium text-[#21130F] mb-1">
                  Pakistan Mobile Number (for delivery SMS)
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                  <input
                    type="tel"
                    placeholder="0300-1234567"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-white border border-[#E8D8C8] rounded-lg pl-9 pr-3 py-2.5 text-xs text-[#1B0E0A] focus:outline-none focus:border-[#C96852]"
                  />
                </div>
              </div>
            )}

            {mode !== 'forgot' && (
              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="text-xs font-medium text-[#21130F]">
                    Password
                  </label>
                  {mode === 'login' && (
                    <button
                      type="button"
                      onClick={() => setMode('forgot')}
                      className="text-[11px] text-[#651B17] hover:underline cursor-pointer"
                    >
                      Forgot?
                    </button>
                  )}
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                  <input
                    type="password"
                    required
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-white border border-[#E8D8C8] rounded-lg pl-9 pr-3 py-2.5 text-xs text-[#1B0E0A] focus:outline-none focus:border-[#C96852]"
                  />
                </div>
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-[#651B17] hover:bg-[#2A120D] text-[#F8EEE5] py-3 rounded-lg text-xs font-semibold uppercase tracking-wider transition-colors shadow-md cursor-pointer mt-2"
            >
              {mode === 'login'
                ? 'Sign In to Account'
                : mode === 'register'
                ? 'Create Free Account'
                : 'Send Recovery Email'}
            </button>
          </form>

          {mode === 'forgot' && (
            <div className="mt-4 text-center">
              <button
                onClick={() => setMode('login')}
                className="text-xs text-[#651B17] font-medium hover:underline"
              >
                ← Back to Login
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
