import React, { useState, FormEvent } from 'react';
import {
  ShieldCheck,
  Truck,
  ShoppingBag,
  ArrowRight,
  Lock,
  Mail,
  Phone,
  User,
  MapPin,
  Check,
  MessageCircle,
  ArrowLeft,
  Sparkles,
  CreditCard,
  Building,
  HelpCircle
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

export function CheckoutPage() {
  const [quantity, setQuantity] = useState(1);
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
    quantity: 1,
    paymentMethod: 'cod',
    notes: '',
  });

  const [customCity, setCustomCity] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [orderId, setOrderId] = useState('');
  const [formError, setFormError] = useState('');

  // Calculations
  const unitPrice = 2499;
  const shippingFee = 200;
  const subtotal = unitPrice * quantity;
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
      setFormError('Please enter your full first and last name.');
      return;
    }

    if (!formData.phone.trim() || formData.phone.trim().length < 10) {
      setFormError('Please provide a valid Pakistani phone number for delivery confirmation.');
      return;
    }

    if (!formData.address1.trim()) {
      setFormError('Please enter your complete street address.');
      return;
    }

    const finalCity = formData.city === 'Other City' ? customCity.trim() || 'Other' : formData.city;

    setIsSubmitting(true);

    const payload: CustomerOrderPayload = {
      ...formData,
      city: finalCity,
      quantity,
    };

    const result = await createShopifyCheckoutOrder(payload);

    setIsSubmitting(false);

    if (result.success) {
      setOrderId(result.orderNumber);
      setIsSuccess(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setFormError(result.error || 'Failed to place order. Please try again or order via WhatsApp.');
    }
  };

  // WhatsApp Order Confirmation Link
  const whatsappConfirmUrl = `https://wa.me/923110355309?text=${encodeURIComponent(
    `Hello Men's Aura Team, I have placed Order #${orderId} for Midnight Drive (Total: PKR ${grandTotal.toLocaleString()}). Please confirm my Cash on Delivery shipment!`
  )}`;

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-[#070b12] text-[#f4ede2] py-12 px-4 sm:px-8 flex items-center justify-center">
        <div className="max-w-2xl w-full bg-[#0e1522] border border-[#c5a059]/40 rounded-3xl p-6 sm:p-10 shadow-[0_25px_70px_rgba(0,0,0,0.9)] text-center animate-in fade-in zoom-in-95 duration-300">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border-2 border-[#c5a059] bg-[#c5a059]/15 text-[#e5c583] shadow-[0_0_30px_rgba(197,160,89,0.3)]">
            <Check className="h-10 w-10 stroke-[2.5]" />
          </div>

          <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-[#c5a059]/40 bg-[#c5a059]/10 px-4 py-1.5 font-mono-ui text-xs font-bold uppercase tracking-widest text-[#e5c583]">
            <Sparkles className="h-3.5 w-3.5 text-[#c5a059]" /> Order Confirmed — Cash On Delivery
          </div>

          <h1 className="font-editorial mt-4 text-3xl sm:text-4xl font-normal text-[#f4ede2]">
            Thank You, {formData.firstName}!
          </h1>
          <p className="mt-2 text-sm text-[#9aa4b5]">
            Your order <span className="font-mono-ui font-bold text-[#e5c583]">#{orderId}</span> for <strong className="text-[#f4ede2]">Midnight Drive</strong> has been successfully placed.
          </p>

          {/* Order Details Summary Box */}
          <div className="mt-8 rounded-2xl border border-[#c5a059]/25 bg-[#070a10] p-5 text-left space-y-3">
            <div className="flex justify-between border-b border-[#c5a059]/15 pb-3 text-xs sm:text-sm">
              <span className="text-[#8c97a8]">Order Number:</span>
              <span className="font-mono-ui font-bold text-[#e5c583]">#{orderId}</span>
            </div>
            <div className="flex justify-between border-b border-[#c5a059]/15 pb-3 text-xs sm:text-sm">
              <span className="text-[#8c97a8]">Delivery Address:</span>
              <span className="text-right text-[#f4ede2]">
                {formData.address1}, {formData.city}, Pakistan
              </span>
            </div>
            <div className="flex justify-between border-b border-[#c5a059]/15 pb-3 text-xs sm:text-sm">
              <span className="text-[#8c97a8]">Payment Method:</span>
              <span className="font-medium text-[#c5a059]">Cash on Delivery (COD)</span>
            </div>
            <div className="flex justify-between pt-1 text-sm font-bold">
              <span className="text-[#f4ede2]">Total Payable at Doorstep:</span>
              <span className="font-cinzel text-base text-[#e5c583]">PKR {grandTotal.toLocaleString()}</span>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="mt-8 space-y-3">
            <a
              href={whatsappConfirmUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="gold-glow-button flex w-full items-center justify-center gap-2.5 rounded-xl py-4 font-mono-ui text-xs font-bold uppercase tracking-wider text-[#070b12]"
            >
              <MessageCircle className="h-4 w-4 fill-current" />
              <span>1-Click Confirm Order on WhatsApp</span>
            </a>

            <Link
              href="/"
              className="flex w-full items-center justify-center gap-2 rounded-xl border border-[#c5a059]/30 bg-[#070b12] py-3.5 font-mono-ui text-xs font-semibold uppercase tracking-wider text-[#c7d0de] hover:border-[#c5a059] hover:text-[#e5c583] transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Return to Midnight Drive Store</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#070b12] text-[#f4ede2] selection:bg-[#c5a059] selection:text-[#0b0f17]">
      {/* Checkout Header */}
      <header className="border-b border-[#c5a059]/20 bg-[#090e17]/95 px-4 sm:px-8 py-4 backdrop-blur-xl sticky top-0 z-50">
        <div className="mx-auto max-w-7xl flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <ArrowLeft className="h-4 w-4 text-[#c5a059]" />
            <span className="font-editorial text-lg tracking-wider text-[#f4ede2]">
              THE MEN'S AURA <span className="text-xs text-[#c5a059] font-mono-ui uppercase tracking-widest ml-2">Checkout</span>
            </span>
          </Link>
          <div className="flex items-center gap-2 text-xs text-[#8c97a8]">
            <Lock className="h-3.5 w-3.5 text-[#c5a059]" />
            <span className="hidden sm:inline">256-Bit SSL Encrypted & 100% Private</span>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 sm:px-8 py-8 sm:py-12">
        {/* Title */}
        <div className="mb-8">
          <h1 className="font-editorial text-3xl sm:text-4xl text-[#f4ede2]">
            Complete Your <em className="text-gold-gradient italic">Order</em>
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-[#9aa4b5]">
            Fast express delivery across Pakistan. Pay cash on delivery at your doorstep.
          </p>
        </div>

        {formError && (
          <div className="mb-6 rounded-2xl border border-red-500/40 bg-red-950/40 p-4 text-xs sm:text-sm text-red-200">
            {formError}
          </div>
        )}

        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Form Fields */}
          <div className="lg:col-span-7 space-y-8">
            {/* 1. Contact Information */}
            <div className="rounded-3xl border border-[#c5a059]/25 bg-[#0e1522] p-6 sm:p-8 shadow-xl space-y-4">
              <div className="flex items-center gap-2.5 border-b border-[#c5a059]/20 pb-4">
                <Mail className="h-5 w-5 text-[#c5a059]" />
                <h2 className="font-editorial text-xl font-medium text-[#f4ede2]">
                  1. Contact Information
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div>
                  <label className="block text-xs font-mono-ui uppercase tracking-wider text-[#9aa4b5] mb-1.5">
                    Email Address (Optional)
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="name@example.com"
                    className="w-full rounded-xl border border-[#c5a059]/30 bg-[#070b12] px-4 py-3 text-xs sm:text-sm text-[#f4ede2] placeholder-[#4b5568] focus:border-[#c5a059] focus:outline-none focus:ring-1 focus:ring-[#c5a059]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono-ui uppercase tracking-wider text-[#e5c583] mb-1.5">
                    Phone Number <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="0300 1234567"
                    className="w-full rounded-xl border border-[#c5a059]/40 bg-[#070b12] px-4 py-3 text-xs sm:text-sm text-[#f4ede2] placeholder-[#4b5568] focus:border-[#c5a059] focus:outline-none focus:ring-1 focus:ring-[#c5a059]"
                  />
                </div>
              </div>
            </div>

            {/* 2. Delivery Details */}
            <div className="rounded-3xl border border-[#c5a059]/25 bg-[#0e1522] p-6 sm:p-8 shadow-xl space-y-4">
              <div className="flex items-center gap-2.5 border-b border-[#c5a059]/20 pb-4">
                <MapPin className="h-5 w-5 text-[#c5a059]" />
                <h2 className="font-editorial text-xl font-medium text-[#f4ede2]">
                  2. Delivery Details
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div>
                  <label className="block text-xs font-mono-ui uppercase tracking-wider text-[#e5c583] mb-1.5">
                    First Name <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    required
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="First name"
                    className="w-full rounded-xl border border-[#c5a059]/40 bg-[#070b12] px-4 py-3 text-xs sm:text-sm text-[#f4ede2] placeholder-[#4b5568] focus:border-[#c5a059] focus:outline-none focus:ring-1 focus:ring-[#c5a059]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono-ui uppercase tracking-wider text-[#e5c583] mb-1.5">
                    Last Name <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    required
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder="Last name"
                    className="w-full rounded-xl border border-[#c5a059]/40 bg-[#070b12] px-4 py-3 text-xs sm:text-sm text-[#f4ede2] placeholder-[#4b5568] focus:border-[#c5a059] focus:outline-none focus:ring-1 focus:ring-[#c5a059]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono-ui uppercase tracking-wider text-[#e5c583] mb-1.5">
                  Street Address <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  name="address1"
                  required
                  value={formData.address1}
                  onChange={handleChange}
                  placeholder="House #, Street name, Sector / Block"
                  className="w-full rounded-xl border border-[#c5a059]/40 bg-[#070b12] px-4 py-3 text-xs sm:text-sm text-[#f4ede2] placeholder-[#4b5568] focus:border-[#c5a059] focus:outline-none focus:ring-1 focus:ring-[#c5a059]"
                />
              </div>

              <div>
                <label className="block text-xs font-mono-ui uppercase tracking-wider text-[#9aa4b5] mb-1.5">
                  Apartment, Suite, Unit (Optional)
                </label>
                <input
                  type="text"
                  name="address2"
                  value={formData.address2}
                  onChange={handleChange}
                  placeholder="Apt 4B, Floor 2 (Optional)"
                  className="w-full rounded-xl border border-[#c5a059]/30 bg-[#070b12] px-4 py-3 text-xs sm:text-sm text-[#f4ede2] placeholder-[#4b5568] focus:border-[#c5a059] focus:outline-none focus:ring-1 focus:ring-[#c5a059]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-mono-ui uppercase tracking-wider text-[#e5c583] mb-1.5">
                    City <span className="text-red-400">*</span>
                  </label>
                  <select
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-[#c5a059]/40 bg-[#070b12] px-3 py-3 text-xs sm:text-sm text-[#f4ede2] focus:border-[#c5a059] focus:outline-none"
                  >
                    {PAKISTAN_CITIES.map((c) => (
                      <option key={c} value={c} className="bg-[#0b0f17] text-[#f4ede2]">
                        {c}
                      </option>
                    ))}
                  </select>
                </div>

                {formData.city === 'Other City' ? (
                  <div>
                    <label className="block text-xs font-mono-ui uppercase tracking-wider text-[#e5c583] mb-1.5">
                      Specify City <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={customCity}
                      onChange={(e) => setCustomCity(e.target.value)}
                      placeholder="Enter City Name"
                      className="w-full rounded-xl border border-[#c5a059]/40 bg-[#070b12] px-4 py-3 text-xs sm:text-sm text-[#f4ede2] placeholder-[#4b5568] focus:border-[#c5a059] focus:outline-none"
                    />
                  </div>
                ) : (
                  <div>
                    <label className="block text-xs font-mono-ui uppercase tracking-wider text-[#9aa4b5] mb-1.5">
                      Postal Code (Optional)
                    </label>
                    <input
                      type="text"
                      name="zip"
                      value={formData.zip}
                      onChange={handleChange}
                      placeholder="e.g. 54000"
                      className="w-full rounded-xl border border-[#c5a059]/30 bg-[#070b12] px-4 py-3 text-xs sm:text-sm text-[#f4ede2] placeholder-[#4b5568] focus:border-[#c5a059] focus:outline-none"
                    />
                  </div>
                )}

                <div>
                  <label className="block text-xs font-mono-ui uppercase tracking-wider text-[#9aa4b5] mb-1.5">
                    Country
                  </label>
                  <div className="w-full rounded-xl border border-[#c5a059]/30 bg-[#070b12] px-4 py-3 text-xs sm:text-sm text-[#e5c583] font-medium flex items-center gap-2">
                    <span>Pakistan 🇵🇰</span>
                  </div>
                </div>
              </div>
            </div>

            {/* 3. Shipping Method */}
            <div className="rounded-3xl border border-[#c5a059]/25 bg-[#0e1522] p-6 sm:p-8 shadow-xl space-y-4">
              <div className="flex items-center gap-2.5 border-b border-[#c5a059]/20 pb-4">
                <Truck className="h-5 w-5 text-[#c5a059]" />
                <h2 className="font-editorial text-xl font-medium text-[#f4ede2]">
                  3. Shipping Method
                </h2>
              </div>

              <div className="rounded-2xl border border-[#c5a059]/40 bg-[#070b12] p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-5 w-5 items-center justify-center rounded-full bg-[#c5a059] text-[#070b12]">
                    <Check className="h-3.5 w-3.5 stroke-[3]" />
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm font-semibold text-[#f4ede2]">Standard Express Shipping</p>
                    <p className="text-[11px] text-[#8c97a8]">2–3 Working Days across Pakistan</p>
                  </div>
                </div>
                <span className="font-cinzel text-xs sm:text-sm font-bold text-[#e5c583]">PKR 200</span>
              </div>
            </div>

            {/* 4. Payment Method */}
            <div className="rounded-3xl border border-[#c5a059]/25 bg-[#0e1522] p-6 sm:p-8 shadow-xl space-y-4">
              <div className="flex items-center gap-2.5 border-b border-[#c5a059]/20 pb-4">
                <CreditCard className="h-5 w-5 text-[#c5a059]" />
                <h2 className="font-editorial text-xl font-medium text-[#f4ede2]">
                  4. Payment Method
                </h2>
              </div>

              {/* COD Box */}
              <div className="rounded-2xl border-2 border-[#c5a059] bg-[#070b12] p-5 relative overflow-hidden">
                <div className="absolute top-0 right-0 bg-[#c5a059] text-[#070b12] px-3 py-1 rounded-bl-xl font-mono-ui text-[9.5px] font-bold uppercase tracking-wider">
                  RECOMMENDED
                </div>

                <div className="flex items-start gap-3">
                  <div className="mt-0.5 flex h-6 w-6 items-center justify-center rounded-full bg-[#c5a059] text-[#070b12]">
                    <Check className="h-4 w-4 stroke-[3]" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-[#e5c583] uppercase tracking-wider">
                      Cash on Delivery (COD)
                    </h3>
                    <p className="mt-1 text-xs text-[#dbe2ee] leading-relaxed">
                      Pay cash at your doorstep when the rider delivers your package. Zero advance payment required.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Order Summary */}
          <div className="lg:col-span-5 lg:sticky lg:top-24 space-y-6">
            <div className="rounded-3xl border border-[#c5a059]/30 bg-[#0e1522] p-6 sm:p-8 shadow-[0_20px_60px_rgba(0,0,0,0.8)] space-y-6">
              <div className="flex items-center justify-between border-b border-[#c5a059]/20 pb-4">
                <h2 className="font-editorial text-xl font-medium text-[#f4ede2]">
                  Order Summary
                </h2>
                <span className="font-mono-ui text-xs font-bold text-[#e5c583]">1 Item</span>
              </div>

              {/* Product Card Details */}
              <div className="flex items-center gap-4 border-b border-[#c5a059]/15 pb-6">
                <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-2xl border border-[#c5a059]/30 bg-[#070a10]">
                  <img
                    src="/videos/thumb.jpg"
                    alt="Midnight Drive Bottle"
                    className="h-full w-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLElement).style.display = 'none';
                    }}
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-[#070b12] text-[#c5a059]">
                    <ShoppingBag className="h-8 w-8" />
                  </div>
                </div>

                <div className="flex-1 min-w-0">
                  <h3 className="font-editorial text-base font-medium text-[#f4ede2] truncate">
                    Midnight Drive (30ml)
                  </h3>
                  <p className="mt-0.5 text-xs text-[#9aa4b5]">
                    Natural Vitality Oil Protocol
                  </p>
                  <div className="mt-2 flex items-center justify-between">
                    <span className="font-mono-ui text-xs text-[#8c97a8]">Qty: {quantity}</span>
                    <span className="font-cinzel text-sm font-bold text-[#e5c583]">PKR {subtotal.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {/* Cost Calculations */}
              <div className="space-y-3 text-xs sm:text-sm border-b border-[#c5a059]/15 pb-6">
                <div className="flex justify-between text-[#8c97a8]">
                  <span>Subtotal (1x Bottle)</span>
                  <span className="text-[#f4ede2]">PKR {subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-[#8c97a8]">
                  <span>Standard Delivery Fee</span>
                  <span className="text-[#f4ede2]">PKR {shippingFee}</span>
                </div>
                <div className="flex justify-between text-[#8c97a8]">
                  <span>Discreet Unbranded Packaging</span>
                  <span className="text-[#c5a059] font-medium">FREE</span>
                </div>
              </div>

              {/* Total Price */}
              <div className="flex items-center justify-between pt-1">
                <div>
                  <span className="block font-mono-ui text-xs uppercase tracking-wider text-[#9aa4b5]">
                    Total Amount Due
                  </span>
                  <span className="text-[10px] text-[#8c97a8]">Includes Taxes & Delivery</span>
                </div>
                <span className="font-cinzel text-2xl font-bold text-[#e5c583]">
                  PKR {grandTotal.toLocaleString()}
                </span>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="gold-glow-button relative flex w-full items-center justify-center gap-2.5 overflow-hidden rounded-xl py-4 font-mono-ui text-xs font-bold uppercase tracking-[0.18em] text-[#0b0f17] shadow-2xl transition-all disabled:opacity-50"
                data-testid="complete-checkout-btn"
              >
                <span className="btn-shine" />
                {isSubmitting ? (
                  <>
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-[#0b0f17] border-t-transparent" />
                    <span>Securing Your Order...</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="h-4 w-4" />
                    <span>COMPLETE ORDER — PKR {grandTotal.toLocaleString()}</span>
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </button>

              {/* Micro Trust Bullets */}
              <div className="space-y-2 pt-2 text-[11px] text-[#8c97a8]">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="h-3.5 w-3.5 text-[#c5a059] shrink-0" />
                  <span>100% Confidential & Plain Outer Packaging</span>
                </div>
                <div className="flex items-center gap-2">
                  <Truck className="h-3.5 w-3.5 text-[#c5a059] shrink-0" />
                  <span>Express Courier Dispatch (2-3 Days)</span>
                </div>
              </div>
            </div>
          </div>
        </form>
      </main>
    </div>
  );
}

