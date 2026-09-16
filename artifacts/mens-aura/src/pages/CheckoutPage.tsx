import React, { useState, FormEvent } from 'react';
import {
  Check,
  MessageCircle,
  ArrowLeft,
  Lock,
  ShoppingBag,
  Sparkles,
  ChevronDown
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
  const [emailNews, setEmailNews] = useState(false);
  const [billingSame, setBillingSame] = useState(true);

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
    `Hello Men's Aura Team, I have placed Order #${orderId} for Midnight Drive (Total: Rs. ${grandTotal.toLocaleString()}). Please confirm my Cash on Delivery shipment!`
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
            Your order <span className="font-mono-ui font-bold text-[#e5c583]">#{orderId}</span> for <strong className="text-[#f4ede2]">Midnight Drive</strong> is being processed.
          </p>

          <div className="mt-6 rounded-xl border border-[#c5a059]/20 bg-[#070a10] p-4 text-left space-y-2.5 text-xs sm:text-sm">
            <div className="flex justify-between border-b border-[#c5a059]/10 pb-2">
              <span className="text-[#8c97a8]">Order Number:</span>
              <span className="font-mono-ui font-bold text-[#e5c583]">#{orderId}</span>
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
    <div className="min-h-screen bg-[#070b12] text-[#f4ede2]">
      {/* Top Header */}
      <header className="border-b border-[#c5a059]/15 bg-[#090e17]/95 px-4 sm:px-12 py-5">
        <div className="mx-auto max-w-6xl flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4 text-[#c5a059]" />
            <span className="font-editorial text-xl sm:text-2xl tracking-wide text-[#f4ede2]">
              The Men's Aura
            </span>
          </Link>
          <div className="flex items-center gap-1.5 text-xs text-[#8c97a8]">
            <Lock className="h-3.5 w-3.5 text-[#c5a059]" />
            <span>Secure Checkout</span>
          </div>
        </div>
      </header>

      {/* Main 2-Column Minimalist Layout */}
      <main className="mx-auto max-w-6xl px-4 sm:px-12 py-8 sm:py-12">
        {formError && (
          <div className="mb-6 rounded-xl border border-red-500/40 bg-red-950/40 p-3.5 text-xs sm:text-sm text-red-200">
            {formError}
          </div>
        )}

        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Minimal Form Fields */}
          <div className="lg:col-span-7 space-y-7">
            {/* Contact Section */}
            <div className="space-y-3">
              <h2 className="font-editorial text-xl font-normal text-[#f4ede2]">
                Contact
              </h2>
              <div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email (Optional)"
                  className="w-full rounded-xl border border-[#c5a059]/30 bg-[#090e17] px-4 py-3 text-xs sm:text-sm text-[#f4ede2] placeholder-[#5c687c] focus:border-[#c5a059] focus:outline-none"
                />
              </div>
              <label className="flex items-center gap-2 cursor-pointer text-xs text-[#8c97a8]">
                <input
                  type="checkbox"
                  checked={emailNews}
                  onChange={(e) => setEmailNews(e.target.checked)}
                  className="rounded border-[#c5a059]/40 bg-[#090e17] accent-[#c5a059]"
                />
                <span>Email me with news and offers</span>
              </label>
            </div>

            {/* Delivery Section */}
            <div className="space-y-3 pt-2">
              <h2 className="font-editorial text-xl font-normal text-[#f4ede2]">
                Delivery
              </h2>

              {/* Country */}
              <div className="relative">
                <select
                  disabled
                  className="w-full appearance-none rounded-xl border border-[#c5a059]/30 bg-[#090e17] px-4 py-3 text-xs sm:text-sm text-[#e5c583] font-medium"
                >
                  <option>Pakistan</option>
                </select>
                <ChevronDown className="absolute right-4 top-3.5 h-4 w-4 text-[#8c97a8] pointer-events-none" />
              </div>

              {/* First Name & Last Name */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  type="text"
                  name="firstName"
                  required
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="First name"
                  className="w-full rounded-xl border border-[#c5a059]/30 bg-[#090e17] px-4 py-3 text-xs sm:text-sm text-[#f4ede2] placeholder-[#5c687c] focus:border-[#c5a059] focus:outline-none"
                />
                <input
                  type="text"
                  name="lastName"
                  required
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Last name"
                  className="w-full rounded-xl border border-[#c5a059]/30 bg-[#090e17] px-4 py-3 text-xs sm:text-sm text-[#f4ede2] placeholder-[#5c687c] focus:border-[#c5a059] focus:outline-none"
                />
              </div>

              {/* Address */}
              <input
                type="text"
                name="address1"
                required
                value={formData.address1}
                onChange={handleChange}
                placeholder="Address (House #, Street name)"
                className="w-full rounded-xl border border-[#c5a059]/30 bg-[#090e17] px-4 py-3 text-xs sm:text-sm text-[#f4ede2] placeholder-[#5c687c] focus:border-[#c5a059] focus:outline-none"
              />

              {/* Apartment (Optional) */}
              <input
                type="text"
                name="address2"
                value={formData.address2}
                onChange={handleChange}
                placeholder="Apartment, suite, etc. (optional)"
                className="w-full rounded-xl border border-[#c5a059]/30 bg-[#090e17] px-4 py-3 text-xs sm:text-sm text-[#f4ede2] placeholder-[#5c687c] focus:border-[#c5a059] focus:outline-none"
              />

              {/* City & Postal Code */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="relative">
                  <select
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    className="w-full appearance-none rounded-xl border border-[#c5a059]/30 bg-[#090e17] px-4 py-3 text-xs sm:text-sm text-[#f4ede2] focus:border-[#c5a059] focus:outline-none"
                  >
                    {PAKISTAN_CITIES.map((c) => (
                      <option key={c} value={c} className="bg-[#090e17] text-[#f4ede2]">
                        {c}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-4 top-3.5 h-4 w-4 text-[#8c97a8] pointer-events-none" />
                </div>

                {formData.city === 'Other City' ? (
                  <input
                    type="text"
                    required
                    value={customCity}
                    onChange={(e) => setCustomCity(e.target.value)}
                    placeholder="Enter City Name"
                    className="w-full rounded-xl border border-[#c5a059]/30 bg-[#090e17] px-4 py-3 text-xs sm:text-sm text-[#f4ede2] placeholder-[#5c687c] focus:border-[#c5a059] focus:outline-none"
                  />
                ) : (
                  <input
                    type="text"
                    name="zip"
                    value={formData.zip}
                    onChange={handleChange}
                    placeholder="Postal code (optional)"
                    className="w-full rounded-xl border border-[#c5a059]/30 bg-[#090e17] px-4 py-3 text-xs sm:text-sm text-[#f4ede2] placeholder-[#5c687c] focus:border-[#c5a059] focus:outline-none"
                  />
                )}
              </div>

              {/* Phone */}
              <input
                type="tel"
                name="phone"
                required
                value={formData.phone}
                onChange={handleChange}
                placeholder="Phone (0300 1234567)"
                className="w-full rounded-xl border border-[#c5a059]/30 bg-[#090e17] px-4 py-3 text-xs sm:text-sm text-[#f4ede2] placeholder-[#5c687c] focus:border-[#c5a059] focus:outline-none"
              />
            </div>

            {/* Shipping method */}
            <div className="space-y-3 pt-2">
              <h2 className="font-editorial text-xl font-normal text-[#f4ede2]">
                Shipping method
              </h2>
              <div className="rounded-xl border border-[#c5a059]/40 bg-[#090e17] p-4 flex items-center justify-between">
                <span className="text-xs sm:text-sm text-[#f4ede2] font-medium">Standard Delivery</span>
                <span className="text-xs sm:text-sm text-[#e5c583] font-semibold">Rs 200.00</span>
              </div>
            </div>

            {/* Payment method */}
            <div className="space-y-3 pt-2">
              <div>
                <h2 className="font-editorial text-xl font-normal text-[#f4ede2]">
                  Payment
                </h2>
                <p className="text-xs text-[#8c97a8] mt-0.5">
                  All transactions are secure and encrypted.
                </p>
              </div>

              <div className="rounded-xl border border-[#c5a059]/40 bg-[#090e17] overflow-hidden">
                <div className="p-4 bg-[#0d1422] border-b border-[#c5a059]/20 flex items-center gap-3">
                  <div className="flex h-4 w-4 items-center justify-center rounded-full bg-[#c5a059] text-[#070b12]">
                    <Check className="h-3 w-3 stroke-[3]" />
                  </div>
                  <span className="text-xs sm:text-sm font-semibold text-[#e5c583]">
                    Cash on Delivery (COD)
                  </span>
                </div>
                <div className="p-4 bg-[#090e17] text-xs text-[#8c97a8] leading-relaxed">
                  Pay with cash upon delivery at your doorstep. 100% secure and discreet packaging.
                </div>
              </div>
            </div>

            {/* Billing address */}
            <div className="space-y-3 pt-2">
              <h2 className="font-editorial text-xl font-normal text-[#f4ede2]">
                Billing address
              </h2>

              <div className="rounded-xl border border-[#c5a059]/30 bg-[#090e17] overflow-hidden space-y-0">
                <label className="flex items-center gap-3 p-4 border-b border-[#c5a059]/15 cursor-pointer text-xs sm:text-sm text-[#f4ede2]">
                  <input
                    type="radio"
                    name="billingSame"
                    checked={billingSame}
                    onChange={() => setBillingSame(true)}
                    className="accent-[#c5a059]"
                  />
                  <span>Same as shipping address</span>
                </label>

                <label className="flex items-center gap-3 p-4 cursor-pointer text-xs sm:text-sm text-[#8c97a8]">
                  <input
                    type="radio"
                    name="billingSame"
                    checked={!billingSame}
                    onChange={() => setBillingSame(false)}
                    className="accent-[#c5a059]"
                  />
                  <span>Use a different billing address</span>
                </label>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="gold-glow-button relative flex w-full items-center justify-center gap-2 rounded-xl py-4 font-mono-ui text-xs font-bold uppercase tracking-[0.15em] text-[#070b12] transition-all disabled:opacity-50"
                data-testid="complete-checkout-btn"
              >
                <span className="btn-shine" />
                {isSubmitting ? (
                  <>
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-[#070b12] border-t-transparent" />
                    <span>Processing Order...</span>
                  </>
                ) : (
                  <span>Complete order</span>
                )}
              </button>
            </div>

            {/* Footer Links */}
            <div className="flex gap-4 text-[11px] text-[#8c97a8] pt-4 border-t border-[#c5a059]/15">
              <Link href="/contact" className="hover:underline">Privacy policy</Link>
              <Link href="/contact" className="hover:underline">Refund policy</Link>
              <Link href="/contact" className="hover:underline">Terms of service</Link>
            </div>
          </div>

          {/* Right Column: Order Summary Sidebar (Minimalist) */}
          <div className="lg:col-span-5 lg:sticky lg:top-24">
            <div className="rounded-2xl border border-[#c5a059]/20 bg-[#090e17] p-6 sm:p-7 shadow-xl space-y-5">
              {/* Product Item Row */}
              <div className="flex items-center justify-between gap-4 border-b border-[#c5a059]/15 pb-5">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="relative h-14 w-14 shrink-0 rounded-xl border border-[#c5a059]/30 bg-[#070b12] flex items-center justify-center">
                    <ShoppingBag className="h-7 w-7 text-[#c5a059]" />
                    <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-[#c5a059] font-mono-ui text-[10px] font-bold text-[#070b12]">
                      {quantity}
                    </span>
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs sm:text-sm font-medium text-[#f4ede2] truncate">
                      Midnight Drive (by Men's Aura)
                    </p>
                    <p className="text-[11px] text-[#8c97a8]">30ml Dropper Bottle</p>
                  </div>
                </div>
                <span className="font-mono-ui text-xs sm:text-sm font-semibold text-[#e5c583] whitespace-nowrap">
                  Rs {subtotal.toLocaleString()}.00
                </span>
              </div>

              {/* Totals Breakdown */}
              <div className="space-y-2.5 text-xs sm:text-sm border-b border-[#c5a059]/15 pb-5">
                <div className="flex justify-between text-[#8c97a8]">
                  <span>Subtotal</span>
                  <span className="text-[#f4ede2]">Rs {subtotal.toLocaleString()}.00</span>
                </div>
                <div className="flex justify-between text-[#8c97a8]">
                  <span>Shipping</span>
                  <span className="text-[#f4ede2]">Rs {shippingFee}.00</span>
                </div>
              </div>

              {/* Grand Total */}
              <div className="flex items-center justify-between pt-1">
                <span className="font-editorial text-base text-[#f4ede2]">Total</span>
                <div className="text-right">
                  <span className="text-[10px] text-[#8c97a8] uppercase tracking-wider mr-1.5">PKR</span>
                  <span className="font-cinzel text-xl font-bold text-[#e5c583]">
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

