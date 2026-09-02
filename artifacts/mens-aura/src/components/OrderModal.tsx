import { useState, type FormEvent } from 'react';
import { 
  X, 
  Check, 
  ShieldCheck, 
  Truck, 
  Sparkles, 
  Phone, 
  MapPin, 
  User, 
  ShoppingBag, 
  ArrowRight,
  PackageCheck,
  Lock,
  Mail
} from 'lucide-react';
import { redirectToShopifyCheckout } from '@/lib/shopify';


interface OrderModalProps {

  onClose: () => void;
}

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
  'Other City / Area',
];

export function OrderModal({ onClose }: OrderModalProps) {
  const [quantity, setQuantity] = useState(1);
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    city: 'Lahore',
    customCity: '',
    address: '',
    notes: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');

  // Updated Official Pre-Launch Pricing
  const getPricing = (qty: number) => {
    if (qty === 1) return { total: 2499, original: 3000, savings: 501, title: 'Single Bottle (100ml) — Pre-Launch Offer' };
    if (qty === 2) return { total: 4499, original: 6000, savings: 1501, title: 'Duopack (2x 100ml) — Save PKR 1,501' };
    if (qty === 3) return { total: 6299, original: 9000, savings: 2701, title: 'Triopack Complete Ritual — Save PKR 2,701' };
    return { total: qty * 2200, original: qty * 3000, savings: qty * 800, title: `${qty}x Master Pack` };
  };

  const currentPricing = getPricing(quantity);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate luxury order submission
    setTimeout(() => {
      const randomOrder = 'MA-' + Math.floor(100000 + Math.random() * 900000);
      setOrderNumber(randomOrder);
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 700);
  };

  return (
    <div 
      className="fixed inset-0 z-[100] flex items-end justify-center bg-[#070b12]/85 p-0 backdrop-blur-md transition-all duration-300 sm:items-center sm:p-4"
      role="dialog"
      aria-modal="true"
      data-testid="order-modal"
    >
      <div className="relative max-h-[95dvh] w-full max-w-xl overflow-y-auto rounded-t-3xl border border-[#c5a059]/30 bg-[#0e1522] shadow-[0_25px_70px_rgba(0,0,0,0.9)] sm:rounded-3xl animate-in fade-in zoom-in-95 duration-200">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 z-20 flex h-9 w-9 items-center justify-center rounded-full border border-[#c5a059]/20 bg-[#0b0f17]/80 text-[#8c97a8] transition-colors hover:border-[#c5a059] hover:text-[#e5c583]"
          aria-label="Close Order Form"
          data-testid="close-order-modal"
        >
          <X className="h-4 w-4" />
        </button>

        {isSuccess ? (
          /* Success Receipt Screen */
          <div className="p-7 text-center sm:p-10">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-[#c5a059]/40 bg-[#c5a059]/10 text-[#e5c583] shadow-[0_0_30px_rgba(197,160,89,0.3)]">
              <PackageCheck className="h-8 w-8" />
            </div>

            <div className="mt-5">
              <span className="font-mono-ui text-[10px] uppercase tracking-[0.3em] text-[#c5a059]">
                Pre-Launch Order Confirmed · Cash on Delivery
              </span>
              <h3 className="font-editorial mt-2 text-3xl font-semibold text-[#f4ede2] sm:text-4xl">
                Your Ritual Is Being Prepared.
              </h3>
              <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-[#9aa4b5]">
                Thank you, <strong className="text-[#f4ede2]">{formData.fullName || 'Valued Client'}</strong>. Your order has been placed in our private dispatch queue.
              </p>
            </div>

            {/* Receipt Summary Card */}
            <div className="mt-6 rounded-2xl border border-[#c5a059]/20 bg-[#070a10]/70 p-5 text-left backdrop-blur-sm">
              <div className="flex items-center justify-between border-b border-[#c5a059]/15 pb-3">
                <span className="font-mono-ui text-xs text-[#8c97a8]">Order Reference:</span>
                <span className="font-mono-ui text-xs font-semibold text-[#e5c583]">{orderNumber}</span>
              </div>
              <div className="mt-3 flex items-center justify-between text-xs text-[#8c97a8]">
                <span>Product Selected:</span>
                <span className="text-[#f4ede2]">Midnight Drive (100ml) × {quantity}</span>
              </div>
              <div className="mt-2 flex items-center justify-between text-xs text-[#8c97a8]">
                <span>Destination:</span>
                <span className="text-[#f4ede2]">
                  {formData.city === 'Other City / Area' ? formData.customCity : formData.city}, Pakistan
                </span>
              </div>
              <div className="mt-2 flex items-center justify-between text-xs text-[#8c97a8]">
                <span>Payment Method:</span>
                <span className="font-medium text-[#c5a059]">Cash on Delivery (COD)</span>
              </div>
              <div className="mt-2 flex items-center justify-between text-xs text-[#8c97a8]">
                <span>Official Support:</span>
                <span className="text-[#e5c583]">support@themensauraofficial.com</span>
              </div>
              <div className="mt-4 flex items-center justify-between border-t border-[#c5a059]/15 pt-3">
                <span className="font-mono-ui text-sm font-semibold uppercase tracking-wider text-[#f4ede2]">
                  Total on Arrival:
                </span>
                <div className="text-right">
                  <span className="mr-2 text-xs text-[#8c97a8] line-through">
                    PKR {currentPricing.original.toLocaleString()}
                  </span>
                  <span className="font-cinzel text-lg font-bold text-[#e5c583]">
                    PKR {currentPricing.total.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

            {/* Trust Assurance in Success */}
            <div className="mt-5 space-y-2 text-xs text-[#8c97a8]">
              <p className="flex items-center justify-center gap-2">
                <Lock className="h-3.5 w-3.5 text-[#c5a059]" />
                <span>100% Plain Unbranded Outer Box & Discreet Invoice</span>
              </p>
              <p className="flex items-center justify-center gap-2">
                <Truck className="h-3.5 w-3.5 text-[#c5a059]" />
                <span>Delivery within 2 to 4 business days via TCS / Trax</span>
              </p>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="gold-glow-button mt-7 w-full rounded-xl py-3.5 font-mono-ui text-xs font-semibold uppercase tracking-[0.2em] text-[#0b0f17]"
              data-testid="done-order-button"
            >
              Return to Presentation
            </button>
          </div>
        ) : (
          /* Order Checkout Form */
          <div>
            {/* Header */}
            <div className="border-b border-[#c5a059]/20 bg-[#090e17] px-6 pb-5 pt-7 sm:px-8">
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-[#c5a059]" />
                <span className="font-mono-ui text-[10px] uppercase tracking-[0.25em] text-[#c5a059]">
                  Special Pre-Launch Offer · Cash On Delivery
                </span>
              </div>
              <h3 className="font-editorial mt-2 text-2xl font-semibold text-[#f4ede2] sm:text-3xl">
                Claim Your Bottle of Midnight Drive
              </h3>
              <p className="mt-1 text-xs text-[#8c97a8]">
                Pay with cash only when your discreet parcel arrives at your doorstep.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="p-6 sm:p-8">
              {/* Step 1: Select Quantity / Package */}
              <div className="mb-6">
                <div className="mb-2.5 flex items-center justify-between">
                  <label className="font-mono-ui text-[11px] uppercase tracking-wider text-[#c5a059]">
                    1. Select Pre-Launch Package
                  </label>
                  <span className="font-mono-ui text-[10px] text-[#e5c583]">
                    Save up to PKR 2,701
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-2.5">
                  {[
                    { qty: 1, label: '1 Bottle', original: 'PKR 3,000', badge: '17% OFF', price: 'PKR 2,499' },
                    { qty: 2, label: '2 Bottles', original: 'PKR 6,000', badge: 'Save PKR 1.5K', price: 'PKR 4,499' },
                    { qty: 3, label: '3 Bottles', original: 'PKR 9,000', badge: 'Save PKR 2.7K', price: 'PKR 6,299' },
                  ].map((pkg) => (
                    <button
                      key={pkg.qty}
                      type="button"
                      onClick={() => setQuantity(pkg.qty)}
                      className={`relative flex flex-col items-center justify-between rounded-xl border p-3 text-center transition-all ${
                        quantity === pkg.qty
                          ? 'border-[#c5a059] bg-[#c5a059]/15 text-[#f4ede2] shadow-[0_0_20px_rgba(197,160,89,0.2)]'
                          : 'border-[#c5a059]/20 bg-[#080c14] text-[#8c97a8] hover:border-[#c5a059]/50'
                      }`}
                      data-testid={`qty-btn-${pkg.qty}`}
                    >
                      <span className="absolute -top-2.5 rounded-full bg-[#c5a059] px-2 py-0.5 font-mono-ui text-[8px] font-bold uppercase tracking-wider text-[#0b0f17]">
                        {pkg.badge}
                      </span>
                      <span className="font-cinzel text-xs font-semibold text-[#f4ede2]">
                        {pkg.label}
                      </span>
                      <span className="mt-0.5 text-[9px] text-[#8c97a8] line-through">
                        {pkg.original}
                      </span>
                      <span className="font-mono-ui text-[11px] font-bold text-[#e5c583]">
                        {pkg.price}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 2: Recipient Details */}
              <div className="space-y-4">
                <label className="block font-mono-ui text-[11px] uppercase tracking-wider text-[#c5a059]">
                  2. Shipping & Contact Information
                </label>

                {/* Name */}
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-[#8c97a8]">
                    <User className="h-4 w-4" />
                  </div>
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="Full Name / Receiver Name"
                    className="w-full rounded-xl border border-[#c5a059]/25 bg-[#080c14] py-3 pl-10 pr-4 text-sm text-[#f4ede2] placeholder-[#5c6675] outline-none transition-colors focus:border-[#c5a059] focus:ring-1 focus:ring-[#c5a059]"
                    data-testid="input-fullname"
                  />
                </div>

                {/* Phone / WhatsApp */}
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-[#8c97a8]">
                    <Phone className="h-4 w-4" />
                  </div>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="Mobile / WhatsApp Number (e.g. 0300 1234567)"
                    className="w-full rounded-xl border border-[#c5a059]/25 bg-[#080c14] py-3 pl-10 pr-4 text-sm text-[#f4ede2] placeholder-[#5c6675] outline-none transition-colors focus:border-[#c5a059] focus:ring-1 focus:ring-[#c5a059]"
                    data-testid="input-phone"
                  />
                </div>

                {/* City Selector */}
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-[#8c97a8]">
                    <MapPin className="h-4 w-4" />
                  </div>
                  <select
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full appearance-none rounded-xl border border-[#c5a059]/25 bg-[#080c14] py-3 pl-10 pr-8 text-sm text-[#f4ede2] outline-none transition-colors focus:border-[#c5a059] focus:ring-1 focus:ring-[#c5a059]"
                    data-testid="select-city"
                  >
                    {PAKISTAN_CITIES.map((city) => (
                      <option key={city} value={city} className="bg-[#0e1522] text-[#f4ede2]">
                        {city}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Custom City input if 'Other' selected */}
                {formData.city === 'Other City / Area' && (
                  <input
                    type="text"
                    required
                    value={formData.customCity}
                    onChange={(e) => setFormData({ ...formData, customCity: e.target.value })}
                    placeholder="Enter your City or District name"
                    className="w-full rounded-xl border border-[#c5a059]/25 bg-[#080c14] py-3 px-4 text-sm text-[#f4ede2] placeholder-[#5c6675] outline-none transition-colors focus:border-[#c5a059]"
                    data-testid="input-custom-city"
                  />
                )}

                {/* Complete Street Address */}
                <div>
                  <textarea
                    required
                    rows={2}
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    placeholder="Complete Street Address, House/Office #, Area, Landmark"
                    className="w-full resize-none rounded-xl border border-[#c5a059]/25 bg-[#080c14] p-3 text-sm text-[#f4ede2] placeholder-[#5c6675] outline-none transition-colors focus:border-[#c5a059] focus:ring-1 focus:ring-[#c5a059]"
                    data-testid="input-address"
                  />
                </div>
              </div>

              {/* Order Total Bar */}
              <div className="mt-6 flex items-center justify-between rounded-xl border border-[#c5a059]/20 bg-[#080c14] p-4">
                <div>
                  <span className="font-mono-ui text-[10px] uppercase tracking-wider text-[#8c97a8]">
                    Pre-Launch Price (Pay on Arrival)
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-[#8c97a8] line-through">
                      PKR {currentPricing.original.toLocaleString()}
                    </span>
                    <span className="font-cinzel text-xl font-bold text-[#e5c583]">
                      PKR {currentPricing.total.toLocaleString()}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="inline-flex items-center gap-1 rounded-full bg-[#c5a059]/15 px-2.5 py-1 font-mono-ui text-[9px] uppercase tracking-wider text-[#c5a059]">
                    <Truck className="h-3 w-3" /> Free Express COD
                  </span>
                </div>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="gold-glow-button relative mt-5 flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl py-4 font-mono-ui text-xs font-bold uppercase tracking-[0.2em] text-[#0b0f17] transition-all disabled:opacity-50"
                data-testid="submit-order-form"
              >
                <span className="btn-shine" />
                {isSubmitting ? (
                  <span>Securing Order...</span>
                ) : (
                  <>
                    <ShoppingBag className="h-4 w-4" />
                    <span>Confirm Pre-Launch COD Order</span>
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={() => redirectToShopifyCheckout(quantity)}
                className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl border border-[#c5a059]/30 bg-[#070b12] py-3 font-mono-ui text-[11px] font-semibold uppercase tracking-wider text-[#e5c583] transition-colors hover:border-[#c5a059] hover:bg-[#0c121d]"
              >
                <Sparkles className="h-3.5 w-3.5 text-[#c5a059]" />
                <span>Or Express Checkout via Shopify ({quantity}x Bottle{quantity > 1 ? 's' : ''})</span>
              </button>


              {/* Security & Discretion Assurances */}
              <div className="mt-4 flex flex-wrap items-center justify-between gap-2 text-[11px] text-[#8c97a8]">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="h-3.5 w-3.5 text-[#c5a059]" />
                  <span>100% Anonymous Delivery</span>
                </span>
                <span className="flex items-center gap-1.5 text-[#e5c583]">
                  <Mail className="h-3.5 w-3.5" />
                  <span>support@themensauraofficial.com</span>
                </span>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
