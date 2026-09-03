import { useState } from 'react';
import { ShoppingBag, MessageCircle, Check, Sparkles, ShieldCheck, Award } from 'lucide-react';
import { Card3D } from './Card3D';

interface BundleOffersProps {
  onSelectBundle: (qty: number) => void;
}

export function BundleOffersSection({ onSelectBundle }: BundleOffersProps) {
  const [selectedQty, setSelectedQty] = useState(2);

  const BUNDLES = [
    {
      qty: 1,
      badge: 'Starter Ritual',
      badgeColor: 'border-[#c5a059]/30 bg-[#c5a059]/10 text-[#e5c583]',
      title: '1 Bottle (30ml)',
      subtitle: '30-Day Routine Supply',
      price: 2499,
      original: 3000,
      savings: 501,
      popular: false,
      benefits: ['1x 30ml Amber Glass Dropper', '30-Day Daily Night Ritual', 'Free COD Shipping Pakistan'],
    },
    {
      qty: 2,
      badge: 'Most Popular — Save PKR 1,501',
      badgeColor: 'border-[#c5a059] bg-[#c5a059] text-[#070b12]',
      title: '2 Bottles Pack (2x 30ml)',
      subtitle: '60-Day Full Vigor Ritual',
      price: 4499,
      original: 6000,
      savings: 1501,
      popular: true,
      benefits: ['2x 30ml Amber Glass Droppers', '60-Day Full Vigor Protocol', 'Save PKR 1,501 + Priority COD'],
    },
    {
      qty: 3,
      badge: 'Best Value — Save PKR 3,001',
      badgeColor: 'border-[#c5a059]/50 bg-[#c5a059]/20 text-[#e5c583]',
      title: '3 Bottles Master Pack (3x 30ml)',
      subtitle: '90-Day Peak Vigor Pack',
      price: 5999,
      original: 9000,
      savings: 3001,
      popular: false,
      benefits: ['3x 30ml Amber Glass Droppers', '90-Day Maximum Stamina Pack', 'Save PKR 3,001 + VIP Support'],
    },
  ];

  const handleWhatsAppOrder = (qty: number, price: number) => {
    const text = encodeURIComponent(
      `Hello The Men's Aura Support! I want to order ${qty} Bottle(s) of Midnight Drive 30ml (Total PKR ${price.toLocaleString()}) Cash on Delivery. Please confirm my order.`
    );
    window.open(`https://wa.me/923110355309?text=${text}`, '_blank');
  };

  return (
    <section
      id="bundles"
      className="relative border-t border-[#c5a059]/15 bg-gradient-to-b from-[#070b12] via-[#0b101a] to-[#070b12] py-24 sm:py-32"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        {/* Header */}
        <div className="text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#c5a059]/30 bg-[#c5a059]/10 px-4 py-1.5 font-mono-ui text-[10px] uppercase tracking-[0.25em] text-[#e5c583]">
            <Sparkles className="h-3.5 w-3.5 text-[#c5a059]" /> Pre-Launch Bundle Offers
          </div>
          <h2 className="font-editorial mx-auto mt-4 max-w-3xl text-4xl font-normal text-[#f4ede2] sm:text-5xl lg:text-6xl">
            Choose Your <em className="text-gold-gradient italic">30ml Routine Pack.</em>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-[#9aa4b5]">
            Select your preferred Midnight Drive 30ml quantity. Enjoy instant bundle discounts & 100% discreet Cash on Delivery.
          </p>
        </div>

        {/* 3 Bundle Cards Grid */}
        <div className="mt-16 grid gap-8 lg:grid-cols-3">
          {BUNDLES.map((b) => {
            const isSelected = selectedQty === b.qty;

            return (
              <Card3D key={b.qty} depth={b.popular ? 12 : 8}>
                <div
                  onClick={() => setSelectedQty(b.qty)}
                  className={`glass-obsidian-card group relative flex flex-col justify-between rounded-3xl p-8 transition-all duration-300 cursor-pointer ${
                    b.popular
                      ? 'border-2 border-[#c5a059] bg-gradient-to-b from-[#111929] via-[#090e17] to-[#111929] shadow-[0_0_40px_rgba(197,160,89,0.25)] scale-[1.03]'
                      : 'border border-[#c5a059]/25 bg-[#090e17] hover:border-[#c5a059]/50'
                  }`}
                  data-testid={`bundle-card-${b.qty}`}
                >
                  {/* Top Badge */}
                  <div>
                    <div className="flex items-center justify-between">
                      <span className={`inline-flex items-center rounded-full px-3 py-1 font-mono-ui text-[10px] font-bold uppercase tracking-wider ${b.badgeColor}`}>
                        {b.badge}
                      </span>
                      {b.popular && (
                        <span className="font-mono-ui text-[9px] uppercase tracking-widest text-[#c5a059]">★ Top Seller</span>
                      )}
                    </div>

                    <h3 className="font-editorial mt-6 text-2xl font-semibold text-[#f4ede2]">
                      {b.title}
                    </h3>
                    <p className="font-mono-ui mt-1 text-xs text-[#8c97a8]">
                      {b.subtitle}
                    </p>

                    {/* Price Tag */}
                    <div className="mt-6 flex items-baseline gap-3 border-y border-[#c5a059]/15 py-4">
                      <span className="font-cinzel text-3xl font-extrabold text-[#e5c583]">
                        PKR {b.price.toLocaleString()}
                      </span>
                      <span className="text-sm text-[#5c6675] line-through">
                        PKR {b.original.toLocaleString()}
                      </span>
                    </div>

                    {/* Benefits List */}
                    <ul className="mt-6 space-y-3 text-xs text-[#c8d2e1]">
                      {b.benefits.map((benefit) => (
                        <li key={benefit} className="flex items-center gap-2.5">
                          <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#c5a059]/15 text-[#e5c583]">
                            <Check className="h-3 w-3" />
                          </div>
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Actions */}
                  <div className="mt-8 space-y-3">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectBundle(b.qty);
                      }}
                      className="gold-glow-button flex w-full items-center justify-center gap-2 rounded-xl py-3.5 font-mono-ui text-xs font-bold uppercase tracking-wider text-[#070b12]"
                      data-testid={`buy-bundle-${b.qty}`}
                    >
                      <ShoppingBag className="h-4 w-4" />
                      <span>Order COD — PKR {b.price.toLocaleString()}</span>
                    </button>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleWhatsAppOrder(b.qty, b.price);
                      }}
                      className="flex w-full items-center justify-center gap-2 rounded-xl border border-[#c5a059]/40 bg-[#070b12] py-3 font-mono-ui text-xs font-semibold uppercase tracking-wider text-[#e5c583] hover:bg-[#c5a059]/15 transition-colors"
                      data-testid={`whatsapp-bundle-${b.qty}`}
                    >
                      <MessageCircle className="h-3.5 w-3.5 text-[#c5a059]" />
                      <span>1-Click Order on WhatsApp</span>
                    </button>
                  </div>
                </div>
              </Card3D>
            );
          })}
        </div>
      </div>
    </section>
  );
}
