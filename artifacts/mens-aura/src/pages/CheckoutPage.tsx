import React, { useState, FormEvent } from 'react';
import {
  Check,
  MessageCircle,
  ArrowLeft,
  Lock,
  ShoppingBag,
  Sparkles,
  ChevronDown,
  Tag,
  Gift
} from 'lucide-react';
import { Link } from 'wouter';
import { createShopifyCheckoutOrder, CustomerOrderPayload } from '@/lib/shopify';

const PAKISTAN_CITIES = [
  'Lahore',
  'Karachi',
  'Islamabad',
  'Rawalpindi',
  'Faisalabad',
  'Multan',
  'Peshawar',
  'Sialkot',
  'Gujranwala',
  'Quetta',
  'Hyderabad',
  'Abbottabad',
  'Bahawalpur',
  'Sargodha',
  'Sukkur',
  'Sheikhupura',
  'Gujrat',
  'Mardan',
  'Other City',
];

export interface BundleTier {
  qty: number;
  badge: string;
  tag: string;
  name: string;
  packName: string;
  subtitle: string;
  unitPrice: number; // bundle total price
  originalPrice: number;
  savings: number;
  discountPercent: number;
  popular?: boolean;
}

export const BUNDLE_TIERS: Record<number, BundleTier> = {
  1: {
    qty: 1,
    badge: 'Starter Ritual',
    tag: 'Save PKR 501',
    name: '1 Bottle (30ml)',
    packName: '1 Bottle (30ml) — Starter Ritual',
    subtitle: '30-Day Routine Supply',
    unitPrice: 2499,
    originalPrice: 3000,
    savings: 501,
    discountPercent: 17,
  },
  2: {
    qty: 2,
    badge: 'Most Popular',
    tag: 'Save PKR 1,501 (25% OFF)',
    name: '2 Bottles Pack (2x 30ml)',
    packName: '2 Bottles Pack (2x 30ml) — Most Popular',
    subtitle: '60-Day Full Vigor Protocol',
    unitPrice: 4499,
    originalPrice: 6000,
    savings: 1501,
    discountPercent: 25,
    popular: true,
  },
  3: {
    qty: 3,
    badge: 'Best Value',
    tag: 'Save PKR 3,001 (33% OFF)',
    name: '3 Bottles Master Pack (3x 30ml)',
    packName: '3 Bottles Master Pack (3x 30ml) — Best Value',
    subtitle: '90-Day Peak Vigor Pack',
    unitPrice: 5999,
    originalPrice: 9000,
    savings: 3001,
    discountPercent: 33,
  },
};

export function CheckoutPage() {
  const getInitialQty = () => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const q = parseInt(params.get('qty') || '1', 10);
      return q >= 1 ? q : 1;
    }
    return 1;
  };

  const [quantity, setQuantity] = useState(getInitialQty);
  const [formData, setFormData] = useState<CustomerOrderPayload>({
    email: '',
    phone: '',
    firstName: '',
    lastName: '',
    address1: '',
    address2: '',
    city: 'Lahore',
    zip: '',
    country: 'Pakistan',
    quantity,
    paymentMethod: 'cod',
    notes: '',
  });

  const [customCity, setCustomCity] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [orderId, setOrderId] = useState('');
  const [formError, setFormError] = useState('');
  const [emailNews, setEmailNews] = useState(false);
  const [billingSame, setBillingSame] = useState(true);

  // Dynamic Bundle Calculations
  const getBundleInfo = (qty: number): BundleTier => {
    if (BUNDLE_TIERS[qty]) return BUNDLE_TIERS[qty];
    const extra = qty - 3;
    const unitPrice = 5999 + extra * 1999;
    const originalPrice = qty * 3000;
    const savings = originalPrice - unitPrice;
    return {
      qty,
      badge: `Custom Pack (${qty} Bottles)`,
      tag: `Save PKR ${savings.toLocaleString()}`,
      name: `${qty} Bottles Pack`,
      packName: `${qty}x Midnight Drive 30ml Dropper Bottles`,
      subtitle: `${qty * 30}-Day Routine Supply`,
      unitPrice,
      originalPrice,
      savings,
      discountPercent: Math.round((savings / originalPrice) * 100),
    };
  };

  const activeBundle = getBundleInfo(quantity);
  const shippingFee = 200;
  const subtotal = activeBundle.unitPrice;
  const originalTotal = activeBundle.originalPrice;
  const bundleSavings = activeBundle.savings;
  const grandTotal = subtotal + shippingFee;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setFormError('');
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setFormError('');

    // Validation
    if (!formData.firstName.trim() || !formData.lastName.trim()) {
      setFormError('Please enter your first and last name.');
      return;
    }

    if (!formData.phone.trim() || formData.phone.trim().length < 10) {
      setFormError('Please enter a valid phone number for COD delivery confirmation.');
      return;
    }

    if (!formData.address1.trim()) {
      setFormError('Please enter your delivery street address.');
      return;
    }

    const finalCity = formData.city === 'Other City' ? customCity.trim() || 'Other' : formData.city;

    setIsSubmitting(true);

    const payload: CustomerOrderPayload = {
      ...formData,
      city: finalCity,
      quantity,
      notes: `Selected Plan: ${activeBundle.packName} (Save PKR ${bundleSavings.toLocaleString()})`,
    };

    const result = await createShopifyCheckoutOrder(payload);

    setIsSubmitting(false);

    if (result.success) {
      setOrderId(result.orderNumber);
      setIsSuccess(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setFormError(result.error || 'Failed to place order. Please try again.');
    }
  };

  const whatsappConfirmUrl = `https://wa.me/923110355309?text=${encodeURIComponent(
    `Hello Men's Aura Team, I have placed Order #${orderId} for ${activeBundle.packName} (Total: Rs. ${grandTotal.toLocaleString()}). Please confirm my Cash on Delivery shipment!`
  )}`;

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-[#070b12] text-[#f4ede2] py-12 px-4 sm:px-8 flex items-center justify-center">
        <div className="max-w-xl w-full bg-[#0e1522] border border-[#c5a059]/30 rounded-2xl p-6 sm:p-10 shadow-2xl text-center animate-in fade-in duration-200">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border-2 border-[#c5a059] bg-[#c5a059]/15 text-[#e5c583]">
            <Check className="h-8 w-8 stroke-[3]" />
          </div>

          <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-[#c5a059]/30 bg-[#c5a059]/10 px-3.5 py-1 font-mono-ui text-[11px] uppercase tracking-widest text-[#e5c583]">
            <Sparkles className="h-3.5 w-3.5 text-[#c5a059]" /> Order Confirmed — Cash On Delivery
          </div>

          <h1 className="font-editorial mt-4 text-3xl font-normal text-[#f4ede2]">
            Thank You, {formData.firstName}!
          </h1>
          <p className="mt-2 text-xs sm:text-sm text-[#8c97a8]">
            Your order <span className="font-mono-ui font-bold text-[#e5c583]">#{orderId}</span> for <strong className="text-[#f4ede2]">{activeBundle.name}</strong> is being processed.
          </p>

          <div className="mt-6 rounded-xl border border-[#c5a059]/20 bg-[#070a10] p-4 text-left space-y-2.5 text-xs sm:text-sm">
            <div className="flex justify-between border-b border-[#c5a059]/10 pb-2">
              <span className="text-[#8c97a8]">Order Number:</span>
              <span className="font-mono-ui font-bold text-[#e5c583]">#{orderId}</span>
            </div>
            <div className="flex justify-between border-b border-[#c5a059]/10 pb-2">
              <span className="text-[#8c97a8]">Selected Plan:</span>
              <span className="font-medium text-[#e5c583] text-right truncate max-w-[200px]">{activeBundle.name}</span>
            </div>
            <div className="flex justify-between border-b border-[#c5a059]/10 pb-2">
              <span className="text-[#8c97a8]">Discount Applied:</span>
              <span className="text-emerald-400 font-bold">Save PKR {bundleSavings.toLocaleString()}</span>
            </div>
            <div className="flex justify-between border-b border-[#c5a059]/10 pb-2">
              <span className="text-[#8c97a8]">Address:</span>
              <span className="text-right text-[#f4ede2] truncate max-w-[220px]">
                {formData.address1}, {formData.city}
              </span>
            </div>
            <div className="flex justify-between border-b border-[#c5a059]/10 pb-2">
              <span className="text-[#8c97a8]">Payment Method:</span>
              <span className="text-[#c5a059] font-medium">Cash on Delivery (COD)</span>
            </div>
            <div className="flex justify-between pt-1 font-bold text-sm">
              <span className="text-[#f4ede2]">Total Payable:</span>
              <span className="font-cinzel text-[#e5c583]">Rs. {grandTotal.toLocaleString()}</span>
            </div>
          </div>

          <div className="mt-6 space-y-3">
            <a
              href={whatsappConfirmUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="gold-glow-button flex w-full items-center justify-center gap-2 rounded-xl py-3.5 font-mono-ui text-xs font-bold uppercase tracking-wider text-[#070b12]"
            >
              <MessageCircle className="h-4 w-4 fill-current" />
              <span>1-Click Confirm on WhatsApp</span>
            </a>

            <Link
              href="/"
              className="flex w-full items-center justify-center gap-2 rounded-xl border border-[#c5a059]/30 bg-[#070b12] py-3 font-mono-ui text-xs font-semibold uppercase tracking-wider text-[#8c97a8] hover:text-[#e5c583] transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Store</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#05080e] text-[#f4ede2] selection:bg-[#c5a059] selection:text-[#070b12]">
      {/* Top Header */}
      <header className="border-b border-[#c5a059]/25 bg-[#090e17]/95 px-4 sm:px-12 py-5 sticky top-0 z-40 backdrop-blur-md">
        <div className="mx-auto max-w-6xl flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 text-[#f4ede2] hover:text-[#e5c583] transition-colors">
            <ArrowLeft className="h-4 w-4 text-[#c5a059]" />
            <span className="font-editorial text-xl sm:text-2xl tracking-wide">
              The Men's Aura
            </span>
          </Link>
          <div className="flex items-center gap-2 rounded-full border border-[#c5a059]/30 bg-[#c5a059]/10 px-3 py-1 text-xs font-medium text-[#e5c583]">
            <Lock className="h-3.5 w-3.5 text-[#c5a059]" />
            <span>256-Bit SSL Secure Checkout</span>
          </div>
        </div>
      </header>

      {/* Main 2-Column Responsive Layout */}
      <main className="mx-auto max-w-6xl px-4 sm:px-8 py-8 sm:py-12">
        {formError && (
          <div className="mb-8 rounded-xl border-2 border-red-500/60 bg-red-950/70 p-4 text-xs sm:text-sm text-red-200 shadow-lg flex items-center justify-between">
            <span>{formError}</span>
            <button type="button" onClick={() => setFormError('')} className="text-red-400 hover:text-white font-bold ml-2">✕</button>
          </div>
        )}

        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* Left Column: Form Controls & Bundle Selector */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Interactive Bundle Plan Selector Card */}
            <div className="rounded-2xl border-2 border-[#c5a059]/50 bg-gradient-to-r from-[#0d1527] via-[#121c33] to-[#0d1527] p-5 sm:p-6 shadow-2xl space-y-4">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-[#c5a059]/25 pb-3">
                <div>
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-[#c5a059]/40 bg-[#c5a059]/15 px-3 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[#e5c583]">
                    <Sparkles className="h-3 w-3 text-[#c5a059]" /> Selected Bundle Plan
                  </span>
                  <h3 className="font-editorial text-xl font-normal text-white mt-1">
                    {activeBundle.name}
                  </h3>
                </div>
                <div className="text-left sm:text-right">
                  <span className="text-xs text-slate-400 line-through block">
                    PKR {originalTotal.toLocaleString()}
                  </span>
                  <span className="font-cinzel text-xl font-bold text-[#e5c583]">
                    PKR {subtotal.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* 3 Clickable Plan Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[1, 2, 3].map((q) => {
                  const b = BUNDLE_TIERS[q];
                  const isSelected = quantity === q;
                  return (
                    <button
                      key={q}
                      type="button"
                      onClick={() => setQuantity(q)}
                      className={`relative rounded-xl border p-3.5 text-left transition-all cursor-pointer ${
                        isSelected
                          ? 'border-2 border-[#c5a059] bg-[#162542] shadow-[0_0_20px_rgba(197,160,89,0.3)] ring-1 ring-[#c5a059]'
                          : 'border-[#c5a059]/30 bg-[#0f172a] hover:border-[#c5a059]/60'
                      }`}
                    >
                      {b.popular && (
                        <span className="absolute -top-2.5 right-2 rounded-full bg-[#c5a059] px-2 py-0.5 font-mono-ui text-[9px] font-extrabold uppercase text-[#070b12]">
                          ★ Top Seller
                        </span>
                      )}
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-white">{b.name}</span>
                        <div className={`h-4 w-4 rounded-full border flex items-center justify-center shrink-0 ${isSelected ? 'border-[#c5a059] bg-[#c5a059] text-[#070b12]' : 'border-slate-500'}`}>
                          {isSelected && <Check className="h-3 w-3 stroke-[3]" />}
                        </div>
                      </div>
                      <div className="mt-2 flex items-baseline justify-between">
                        <span className="text-sm font-bold text-[#e5c583] font-mono-ui">PKR {b.unitPrice.toLocaleString()}</span>
                        <span className="text-[10px] text-slate-400 line-through">PKR {b.originalPrice.toLocaleString()}</span>
                      </div>
                      <div className="mt-1 text-[10px] font-semibold text-emerald-400 flex items-center gap-1">
                        <Tag className="h-2.5 w-2.5" /> Save PKR {b.savings.toLocaleString()}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Active Discount Announcement Banner */}
              <div className="rounded-xl border border-emerald-500/40 bg-emerald-950/50 p-3 flex items-center justify-between text-xs text-emerald-200">
                <div className="flex items-center gap-2">
                  <Gift className="h-4 w-4 text-emerald-400 shrink-0" />
                  <span>
                    <strong>Bundle Discount Applied:</strong> You are saving <strong>PKR {bundleSavings.toLocaleString()}</strong> ({activeBundle.discountPercent}% OFF) on this bundle!
                  </span>
                </div>
                <span className="font-mono-ui font-extrabold text-emerald-400 shrink-0 hidden sm:block">
                  -{activeBundle.discountPercent}% OFF
                </span>
              </div>
            </div>

            {/* Contact Section Card */}
            <div className="rounded-2xl border border-[#c5a059]/30 bg-[#0c1220] p-5 sm:p-7 shadow-xl space-y-5">
              <div className="flex items-center justify-between border-b border-[#c5a059]/20 pb-3">
                <h2 className="font-editorial text-xl font-normal text-[#f4ede2] flex items-center gap-2">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#c5a059] text-[11px] font-bold text-[#070b12]">1</span>
                  Contact Information
                </h2>
                <span className="text-[11px] text-[#a0aec0]">Step 1 of 3</span>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#d4b06a] mb-1.5">
                  Email Address <span className="text-[#a0aec0] font-normal lowercase">(optional for order tracking)</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="e.g. name@example.com"
                  className="w-full rounded-xl border border-[#c5a059]/40 bg-[#121a2d] px-4 py-3.5 text-sm font-medium text-white placeholder-slate-400 focus:border-[#e5c583] focus:bg-[#16223b] focus:outline-none focus:ring-2 focus:ring-[#c5a059]/30 transition-all shadow-inner"
                />
              </div>

              <label className="flex items-center gap-2.5 cursor-pointer text-xs text-[#cbd5e1] hover:text-white transition-colors">
                <input
                  type="checkbox"
                  checked={emailNews}
                  onChange={(e) => setEmailNews(e.target.checked)}
                  className="h-4 w-4 rounded border-[#c5a059]/50 bg-[#121a2d] accent-[#c5a059] cursor-pointer"
                />
                <span>Email me with exclusive Men's Aura VIP offers & news</span>
              </label>
            </div>

            {/* Delivery Section Card */}
            <div className="rounded-2xl border border-[#c5a059]/30 bg-[#0c1220] p-5 sm:p-7 shadow-xl space-y-5">
              <div className="flex items-center justify-between border-b border-[#c5a059]/20 pb-3">
                <h2 className="font-editorial text-xl font-normal text-[#f4ede2] flex items-center gap-2">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#c5a059] text-[11px] font-bold text-[#070b12]">2</span>
                  Delivery Address
                </h2>
                <span className="text-[11px] text-[#a0aec0]">Pakistan 🇵🇰</span>
              </div>

              {/* Country (Fixed) */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#d4b06a] mb-1.5">
                  Country / Region
                </label>
                <div className="relative">
                  <select
                    disabled
                    className="w-full appearance-none rounded-xl border border-[#c5a059]/40 bg-[#121a2d] px-4 py-3.5 text-sm text-[#e5c583] font-semibold cursor-not-allowed opacity-90 shadow-inner"
                  >
                    <option>Pakistan 🇵🇰</option>
                  </select>
                  <ChevronDown className="absolute right-4 top-4 h-4 w-4 text-[#c5a059] pointer-events-none" />
                </div>
              </div>

              {/* First Name & Last Name */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#d4b06a] mb-1.5">
                    First Name <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    required
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="Enter First Name"
                    className="w-full rounded-xl border border-[#c5a059]/40 bg-[#121a2d] px-4 py-3.5 text-sm font-medium text-white placeholder-slate-400 focus:border-[#e5c583] focus:bg-[#16223b] focus:outline-none focus:ring-2 focus:ring-[#c5a059]/30 transition-all shadow-inner"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#d4b06a] mb-1.5">
                    Last Name <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    required
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder="Enter Last Name"
                    className="w-full rounded-xl border border-[#c5a059]/40 bg-[#121a2d] px-4 py-3.5 text-sm font-medium text-white placeholder-slate-400 focus:border-[#e5c583] focus:bg-[#16223b] focus:outline-none focus:ring-2 focus:ring-[#c5a059]/30 transition-all shadow-inner"
                  />
                </div>
              </div>

              {/* Address */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#d4b06a] mb-1.5">
                  Street Address <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  name="address1"
                  required
                  value={formData.address1}
                  onChange={handleChange}
                  placeholder="House #, Street name, Sector / Area"
                  className="w-full rounded-xl border border-[#c5a059]/40 bg-[#121a2d] px-4 py-3.5 text-sm font-medium text-white placeholder-slate-400 focus:border-[#e5c583] focus:bg-[#16223b] focus:outline-none focus:ring-2 focus:ring-[#c5a059]/30 transition-all shadow-inner"
                />
              </div>

              {/* Apartment (Optional) */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#d4b06a] mb-1.5">
                  Apartment, Suite, Unit <span className="text-[#a0aec0] font-normal lowercase">(optional)</span>
                </label>
                <input
                  type="text"
                  name="address2"
                  value={formData.address2}
                  onChange={handleChange}
                  placeholder="e.g. Apt 3B, Floor 2"
                  className="w-full rounded-xl border border-[#c5a059]/40 bg-[#121a2d] px-4 py-3.5 text-sm font-medium text-white placeholder-slate-400 focus:border-[#e5c583] focus:bg-[#16223b] focus:outline-none focus:ring-2 focus:ring-[#c5a059]/30 transition-all shadow-inner"
                />
              </div>

              {/* City & Postal Code */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#d4b06a] mb-1.5">
                    City <span className="text-red-400">*</span>
                  </label>
                  <div className="relative">
                    <select
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      className="w-full appearance-none rounded-xl border border-[#c5a059]/40 bg-[#121a2d] px-4 py-3.5 text-sm font-medium text-white focus:border-[#e5c583] focus:bg-[#16223b] focus:outline-none focus:ring-2 focus:ring-[#c5a059]/30 transition-all shadow-inner cursor-pointer"
                    >
                      {PAKISTAN_CITIES.map((c) => (
                        <option key={c} value={c} className="bg-[#0c1220] text-white py-2">
                          {c}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-4 top-4 h-4 w-4 text-[#c5a059] pointer-events-none" />
                  </div>
                </div>

                {formData.city === 'Other City' ? (
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#d4b06a] mb-1.5">
                      Specify City Name <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={customCity}
                      onChange={(e) => setCustomCity(e.target.value)}
                      placeholder="Type your city name"
                      className="w-full rounded-xl border border-[#c5a059]/40 bg-[#121a2d] px-4 py-3.5 text-sm font-medium text-white placeholder-slate-400 focus:border-[#e5c583] focus:bg-[#16223b] focus:outline-none focus:ring-2 focus:ring-[#c5a059]/30 transition-all shadow-inner"
                    />
                  </div>
                ) : (
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#d4b06a] mb-1.5">
                      Postal Code <span className="text-[#a0aec0] font-normal lowercase">(optional)</span>
                    </label>
                    <input
                      type="text"
                      name="zip"
                      value={formData.zip}
                      onChange={handleChange}
                      placeholder="e.g. 54000"
                      className="w-full rounded-xl border border-[#c5a059]/40 bg-[#121a2d] px-4 py-3.5 text-sm font-medium text-white placeholder-slate-400 focus:border-[#e5c583] focus:bg-[#16223b] focus:outline-none focus:ring-2 focus:ring-[#c5a059]/30 transition-all shadow-inner"
                    />
                  </div>
                )}
              </div>

              {/* Phone Field */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#d4b06a]">
                    WhatsApp / Mobile Phone <span className="text-red-400">*</span>
                  </label>
                  <span className="text-[11px] text-[#e5c583] font-medium">For COD Confirmation</span>
                </div>
                <div className="relative flex items-center">
                  <span className="absolute left-3.5 text-xs font-bold text-[#e5c583] bg-[#1a253f] px-2 py-1 rounded-md border border-[#c5a059]/30 select-none">
                    🇵🇰 +92
                  </span>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="300 1234567"
                    className="w-full rounded-xl border border-[#c5a059]/40 bg-[#121a2d] pl-24 pr-4 py-3.5 text-sm font-semibold text-white placeholder-slate-400 focus:border-[#e5c583] focus:bg-[#16223b] focus:outline-none focus:ring-2 focus:ring-[#c5a059]/30 transition-all shadow-inner tracking-wider"
                  />
                </div>
              </div>
            </div>

            {/* Shipping & Payment Card */}
            <div className="rounded-2xl border border-[#c5a059]/30 bg-[#0c1220] p-5 sm:p-7 shadow-xl space-y-5">
              <div className="flex items-center justify-between border-b border-[#c5a059]/20 pb-3">
                <h2 className="font-editorial text-xl font-normal text-[#f4ede2] flex items-center gap-2">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#c5a059] text-[11px] font-bold text-[#070b12]">3</span>
                  Shipping & Payment
                </h2>
                <span className="text-[11px] text-[#e5c583] font-semibold">Cash On Delivery</span>
              </div>

              {/* Shipping method */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#d4b06a] mb-1.5">
                  Shipping Method
                </label>
                <div className="rounded-xl border-2 border-[#c5a059]/60 bg-[#141f36] p-4 flex items-center justify-between shadow-inner">
                  <div className="flex items-center gap-2.5">
                    <div className="h-3 w-3 rounded-full bg-[#c5a059] ring-2 ring-[#c5a059]/40" />
                    <div>
                      <p className="text-xs sm:text-sm text-white font-bold">Standard Nationwide Express Delivery</p>
                      <p className="text-[11px] text-[#a0aec0]">2 – 3 Working Days (Discreet Packaging)</p>
                    </div>
                  </div>
                  <span className="text-sm text-[#e5c583] font-bold font-mono-ui">Rs 200.00</span>
                </div>
              </div>

              {/* Payment method */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#d4b06a] mb-1.5">
                  Payment Method
                </label>
                <div className="rounded-xl border-2 border-[#c5a059] bg-[#14223d] overflow-hidden shadow-lg">
                  <div className="p-4 bg-[#1a2b4c] border-b border-[#c5a059]/30 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex h-5 w-5 items-center justify-center rounded-full bg-[#c5a059] text-[#070b12]">
                        <Check className="h-3.5 w-3.5 stroke-[3]" />
                      </div>
                      <span className="text-sm font-bold text-[#e5c583]">
                        Cash on Delivery (COD)
                      </span>
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider bg-[#c5a059]/20 text-[#e5c583] px-2.5 py-0.5 rounded-full border border-[#c5a059]/40">
                      Zero Advance Payment
                    </span>
                  </div>
                  <div className="p-4 text-xs text-[#cbd5e1] leading-relaxed">
                    Pay with cash when your parcel is delivered to your doorstep. 100% confidential and discreet outer box with no product names printed outside.
                  </div>
                </div>
              </div>

              {/* Billing address */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#d4b06a] mb-1.5">
                  Billing Address
                </label>
                <div className="rounded-xl border border-[#c5a059]/40 bg-[#121a2d] overflow-hidden">
                  <label className={`flex items-center gap-3 p-3.5 cursor-pointer text-xs sm:text-sm font-medium transition-colors ${billingSame ? 'bg-[#18243e] text-white' : 'text-[#a0aec0] hover:text-white'}`}>
                    <input
                      type="radio"
                      name="billingSame"
                      checked={billingSame}
                      onChange={() => setBillingSame(true)}
                      className="accent-[#c5a059] h-4 w-4"
                    />
                    <span>Same as shipping address</span>
                  </label>
                  <div className="border-t border-[#c5a059]/15" />
                  <label className={`flex items-center gap-3 p-3.5 cursor-pointer text-xs sm:text-sm font-medium transition-colors ${!billingSame ? 'bg-[#18243e] text-white' : 'text-[#a0aec0] hover:text-white'}`}>
                    <input
                      type="radio"
                      name="billingSame"
                      checked={!billingSame}
                      onChange={() => setBillingSame(false)}
                      className="accent-[#c5a059] h-4 w-4"
                    />
                    <span>Use a different billing address</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Complete Order Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="gold-glow-button relative flex w-full items-center justify-center gap-2 rounded-xl py-4.5 font-mono-ui text-sm font-extrabold uppercase tracking-[0.15em] text-[#070b12] shadow-2xl transition-all hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 cursor-pointer"
                data-testid="complete-checkout-btn"
              >
                <span className="btn-shine" />
                {isSubmitting ? (
                  <>
                    <span className="h-5 w-5 animate-spin rounded-full border-2 border-[#070b12] border-t-transparent" />
                    <span>Processing Your Order...</span>
                  </>
                ) : (
                  <span>Complete Order — Cash On Delivery</span>
                )}
              </button>
              <p className="mt-2.5 text-center text-[11px] text-[#a0aec0] flex items-center justify-center gap-1.5">
                <Lock className="h-3 w-3 text-[#c5a059]" />
                Your details are protected with 256-bit SSL encryption
              </p>
            </div>

            {/* Footer Links */}
            <div className="flex justify-center gap-6 text-[11px] text-[#a0aec0] pt-4 border-t border-[#c5a059]/20">
              <Link href="/contact" className="hover:text-[#e5c583] transition-colors">Privacy Policy</Link>
              <Link href="/contact" className="hover:text-[#e5c583] transition-colors">Refund Policy</Link>
              <Link href="/contact" className="hover:text-[#e5c583] transition-colors">Terms of Service</Link>
            </div>
          </div>

          {/* Right Column: Order Summary Card */}
          <div className="lg:col-span-5 lg:sticky lg:top-24">
            <div className="rounded-2xl border-2 border-[#c5a059]/40 bg-[#0c1220] p-6 sm:p-7 shadow-2xl space-y-6">
              <div className="flex items-center justify-between border-b border-[#c5a059]/20 pb-4">
                <h3 className="font-editorial text-lg font-normal text-[#f4ede2] flex items-center gap-2">
                  <ShoppingBag className="h-5 w-5 text-[#c5a059]" /> Order Summary
                </h3>
                <span className="rounded-full bg-[#c5a059]/20 px-2.5 py-0.5 text-[11px] font-bold text-[#e5c583] border border-[#c5a059]/30">
                  {quantity} {quantity === 1 ? 'Bottle' : 'Bottles Pack'}
                </span>
              </div>

              {/* Product Item Row */}
              <div className="flex items-center justify-between gap-4 border-b border-[#c5a059]/20 pb-5">
                <div className="flex items-center gap-3.5 min-w-0">
                  <div className="relative h-16 w-16 shrink-0 rounded-xl border-2 border-[#c5a059]/40 bg-[#070b12] flex items-center justify-center p-1 shadow-md">
                    <img 
                      src="/product_bottle_luxury.png" 
                      alt="Midnight Drive"
                      className="h-full w-full object-contain"
                      onError={(e) => {
                        (e.target as HTMLElement).style.display = 'none';
                      }}
                    />
                    <ShoppingBag className="h-7 w-7 text-[#c5a059]" />
                    <span className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-[#c5a059] font-mono-ui text-xs font-extrabold text-[#070b12] shadow-md ring-2 ring-[#0c1220]">
                      {quantity}
                    </span>
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-bold text-white truncate">
                      Midnight Drive
                    </p>
                    <p className="text-xs text-[#d4b06a] font-medium truncate">{activeBundle.name}</p>
                    <p className="text-[10px] text-[#a0aec0]">{activeBundle.subtitle}</p>
                  </div>
                </div>
                <div className="text-right whitespace-nowrap">
                  <span className="block text-[11px] text-slate-400 line-through font-mono-ui">
                    Rs {originalTotal.toLocaleString()}.00
                  </span>
                  <span className="font-mono-ui text-sm font-bold text-[#e5c583]">
                    Rs {subtotal.toLocaleString()}.00
                  </span>
                </div>
              </div>

              {/* Quantity Selector inside Order Summary */}
              <div className="flex items-center justify-between rounded-xl border border-[#c5a059]/30 bg-[#121a2d] p-3">
                <div>
                  <span className="text-xs font-semibold text-[#d4b06a] block">Selected Pack:</span>
                  <span className="text-[11px] text-slate-300 font-medium">{activeBundle.name}</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <button
                    type="button"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="flex h-7 w-7 items-center justify-center rounded-lg border border-[#c5a059]/40 bg-[#1a2640] text-sm font-bold text-[#e5c583] hover:bg-[#c5a059] hover:text-[#070b12] transition-colors"
                  >
                    -
                  </button>
                  <span className="font-mono-ui text-sm font-bold text-white px-1">{quantity}</span>
                  <button
                    type="button"
                    onClick={() => setQuantity(quantity + 1)}
                    className="flex h-7 w-7 items-center justify-center rounded-lg border border-[#c5a059]/40 bg-[#1a2640] text-sm font-bold text-[#e5c583] hover:bg-[#c5a059] hover:text-[#070b12] transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Price Breakdown */}
              <div className="space-y-3 text-sm border-b border-[#c5a059]/20 pb-5">
                <div className="flex justify-between text-[#cbd5e1]">
                  <span>Retail Price</span>
                  <span className="font-semibold text-slate-400 line-through">Rs {originalTotal.toLocaleString()}.00</span>
                </div>

                <div className="flex justify-between text-emerald-400 font-medium">
                  <span className="flex items-center gap-1.5">
                    <Tag className="h-3.5 w-3.5" /> Bundle Discount
                  </span>
                  <span className="font-bold">- Rs {bundleSavings.toLocaleString()}.00</span>
                </div>

                <div className="flex justify-between text-[#cbd5e1]">
                  <span>Discounted Subtotal</span>
                  <span className="font-semibold text-white">Rs {subtotal.toLocaleString()}.00</span>
                </div>

                <div className="flex justify-between text-[#cbd5e1]">
                  <span>Nationwide Shipping</span>
                  <span className="font-semibold text-[#e5c583]">Rs {shippingFee}.00</span>
                </div>
              </div>

              {/* Total Savings Highlight Pill */}
              <div className="rounded-xl border border-emerald-500/30 bg-emerald-950/30 px-3.5 py-2 text-center text-xs font-bold text-emerald-300">
                🎉 Total You Save On This Order: PKR {bundleSavings.toLocaleString()}!
              </div>

              {/* Total Payable */}
              <div className="rounded-xl border border-[#c5a059]/40 bg-[#142036] p-4 flex items-center justify-between shadow-lg">
                <div>
                  <span className="font-editorial text-lg text-white font-normal block">Total Payable</span>
                  <span className="text-[10px] text-[#a0aec0] uppercase tracking-wider">Including Taxes & Delivery</span>
                </div>
                <div className="text-right">
                  <span className="text-[11px] text-[#c5a059] font-bold uppercase tracking-wider mr-1">PKR</span>
                  <span className="font-cinzel text-2xl font-black text-[#e5c583] tracking-tight">
                    Rs {grandTotal.toLocaleString()}.00
                  </span>
                </div>
              </div>
            </div>
          </div>
        </form>
      </main>
    </div>
  );
}

