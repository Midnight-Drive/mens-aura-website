import { useState } from 'react';
import {
  ArrowDown,
  ArrowRight,
  Check,
  ChevronDown,
  Droplets,
  Flame,
  HelpCircle,
  Lock,
  MessageCircle,
  Plus,
  Minus,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Star,
  Truck,
} from 'lucide-react';

import { BundleOffersSection } from '@/components/BundleOffersSection';
import { PrivacyUnboxingSection } from '@/components/PrivacyUnboxingSection';
import { SafeVideo } from '@/components/SafeVideo';
import { VIDEO_CONFIG } from '@/config/videos';
import { Card3D } from '@/components/Card3D';

interface HomePageProps {
  onOrderClick: (qty?: number) => void;
  isCheckingOut: boolean;
}

// 5 Actives Detailed Data
const FIVE_ACTIVES = [
  {
    id: 'raig-mahi',
    name: 'Raig Mahi (Sandfish Extract)',
    role: 'The Vitaliser & Deep Thermal Stimulant',
    description:
      'A legendary, time-honoured active historically prized in traditional Greco-Arab Unani medicine. Rich in bio-active natural lipids that invigorate micro-capillary circulation, awaken therapeutic warmth, and promote renewed vigour.',
    tag: 'Deep Circulation & Tone',
    composition: 'Naturally rich in stimulatory lipids & bio-active minerals',
  },
  {
    id: 'ostrich-oil',
    name: 'Pure Ostrich Bio-Oil',
    role: 'The Transdermal Bio-Carrier',
    description:
      'Possesses a unique lipid profile molecularly similar to human sebum. Contains high concentrations of Omega 3, 6, and 9 essential fatty acids that allow instantaneous deep tissue penetration without leaving sticky or greasy residue.',
    tag: 'Ultra-Fast Transdermal Absorption',
    composition: 'Non-comedogenic, featherlight transdermal carrier',
  },
  {
    id: 'clove-oil',
    name: 'Steam-Distilled Clove Oil',
    role: 'The Thermal Spark & Sensory Awakener',
    description:
      'Distilled from organic Syzygium aromaticum flower buds. Packed with natural Eugenol, it introduces a comforting, gradual thermal sensation that relaxes tense muscular fibers and stimulates heightened local tactile awareness.',
    tag: 'Invigorating Heat Sensation',
    composition: 'Therapeutic warming botanical essence',
  },
  {
    id: 'rosemary-extract',
    name: 'Wild Rosemary Botanical Extract',
    role: 'The Clarifier & Botanical Preserver',
    description:
      'Steam-extracted Rosmarinus officinalis leaves deliver potent Rosmarinic and Carnosic acids. Provides natural antioxidant stability to the delicate oils while leaving a subtle, composed herbaceous aroma.',
    tag: 'Herbal Composure & Freshness',
    composition: 'Rich in Rosmarinic & Carnosic organic acids',
  },
  {
    id: 'olive-oil',
    name: 'Cold-Pressed Extra Virgin Olive Oil',
    role: 'The Velvet Glide & Emollient Base',
    description:
      'First cold-pressed extra virgin grade. Loaded with Squalene, Vitamin E, and Oleic acid, it cushions every stroke with a silken glide that lasts throughout the massage ritual and deeply nourishes the skin.',
    tag: 'Enduring Velvet Slip',
    composition: 'Rich in Polyphenols, Vitamin E & Natural Squalene',
  },
];

// Verified Customer Testimonials
const REVIEWS = [
  {
    quote:
      'I was tired all the time and my confidence was low. A friend recommended Midnight Drive. After just a few days I felt more energy and warmth. My wife also noticed the change. 4 drops is all it takes. Best purchase I made this year.',
    name: 'Taimoor Shah',
    location: 'DHA Phase 6, Lahore',
    verified: 'Verified COD Order',
    rating: 5,
    date: '2 days ago',
  },
  {
    quote:
      'Got it delivered in Islamabad in 48 hours — completely plain box, no branding at all. The oil itself smells amazing and you feel the warmth within minutes of applying. Tried many other products before. Nothing worked like this. Highly recommended for every married man.',
    name: 'Dr. Kamran A.',
    location: 'F-10, Islamabad',
    verified: 'Verified COD Order',
    rating: 5,
    date: '1 week ago',
  },
  {
    quote:
      'PKR 2,499 is totally worth it. The Clove and Raig Mahi really work — you feel warm and energetic right away. I have been using it for 6 weeks. My energy levels are better, my confidence is up, and my wife is happy. Plain packaging delivered to my door. Will order again.',
    name: 'Saad M.',
    location: 'Clifton, Karachi',
    verified: 'Verified COD Order',
    rating: 5,
    date: '2 weeks ago',
  },
];

// FAQs
const FAQS = [
  {
    q: 'How to use Midnight Drive for maximum effectiveness?',
    a: 'Dispense 4 to 6 drops of Midnight Drive onto clean palms every night. Gently massage onto the focus areas using smooth, upward circular strokes for 3 to 5 minutes until the soothing thermal warmth is activated and fully absorbed. Leave overnight to allow the cold-pressed bio-actives to nourish deep tissue. For best results, use consistently for 14 to 21 days.',
  },
  {
    q: 'What can Midnight Drive do and what are its main benefits?',
    a: 'Midnight Drive is a 100% natural transdermal male vitality oil. It accelerates localized blood micro-circulation, awakens therapeutic thermal warmth, enhances tissue responsiveness & elasticity, builds natural stamina & composure, and restores intimate male health without synthetic chemicals.',
  },
  {
    q: 'Are there any side effects or skin irritations?',
    a: 'Zero side effects. Midnight Drive is handcrafted from 100% pure cold-pressed botanical oils (Raig Mahi, Clove, Ostrich, Rosemary, and Extra Virgin Olive Oil). It contains zero parabens, zero paraffin, zero synthetic mineral oils, and zero harmful steroids. It is non-irritating and 100% safe for daily long-term use.',
  },
  {
    q: 'How quickly will I feel the results?',
    a: 'You will feel a deep, soothing thermal warmth and awakening sensation within 60 seconds of your first application massage. Cumulative benefits—such as enhanced stamina, tissue firmness, and lasting vigor—build significantly after 14 to 21 days of daily night application.',
  },
  {
    q: 'How discreet is the packaging and delivery in Pakistan?',
    a: '100% completely anonymous. Your order arrives in a plain brown, sealed corrugated box with zero product names, brand logos, or descriptions on the exterior shipping label. Only your name and delivery address are visible.',
  },
  {
    q: 'How does Cash on Delivery (COD) work?',
    a: 'You do not need to pay anything online or provide bank card details. We dispatch your parcel via TCS or Trax. When the rider arrives at your doorstep, you simply inspect the outer parcel and hand the exact cash amount (PKR 2,499) to the courier.',
  },
  {
    q: 'How long does one 30ml bottle last?',
    a: 'Because Midnight Drive uses a concentrated cold-pressed formula with high-glide ostrich and olive bio-carriers, only 4 to 6 drops are required per ritual. One 30ml bottle comfortably lasts 3 to 4 weeks with regular daily use.',
  },
];

export function HomePage({ onOrderClick, isCheckingOut }: HomePageProps) {
  const [activeActiveTab, setActiveActiveTab] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <div className="space-y-0">
      {/* ========================================================================= */}
      {/* 1. HERO SECTION WITH DIRECT 16:9 VIDEO BACKGROUND */}
      {/* ========================================================================= */}
      <section
        id="hero"
        className="relative min-h-[calc(100vh-80px)] overflow-hidden border-b border-[#c5a059]/15 pb-8 pt-6 sm:py-16 flex items-center"
      >
        {/* Full-Screen Pure Video Background Layer */}
        <div className="absolute inset-0 z-0 overflow-hidden bg-[#070b12]">
          <video
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            poster="/assets/hero-poster-custom.jpg"
            className="h-full w-full object-cover object-[75%_center] lg:object-center opacity-25 lg:opacity-100 transition-all duration-500"
            onLoadedData={(e) => {
              e.currentTarget.play().catch(() => {});
            }}
          >
            <source src={VIDEO_CONFIG.hero.backgroundVideo} type="video/mp4" />
            <source src="/videos/main1.mp4" type="video/mp4" />
          </video>
          {/* Mobile Ambient Dark Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#070b12]/95 via-[#070b12]/90 to-[#070b12] lg:hidden pointer-events-none" />
        </div>

        {/* Subtle Hero Grid */}
        <div className="luxury-grid pointer-events-none absolute inset-0 z-[2] opacity-10" />

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-8 py-6 sm:py-20 lg:py-24 w-full">
          <div className="grid items-center gap-8 lg:grid-cols-12 lg:gap-8 hero-grid">
            {/* Left Column: Brand Copy & CTAs */}
            <div className="flex flex-col items-start lg:col-span-7 xl:col-span-6">
              {/* Pre-title Badge */}
              <div className="inline-flex items-center gap-2 rounded-full border border-[#c5a059]/35 bg-[#0e1624]/90 px-3 py-1 sm:px-4 sm:py-1.5 backdrop-blur-md shadow-2xl">
                <span className="h-2 w-2 rounded-full bg-[#c5a059] shadow-[0_0_10px_#c5a059]" />
                <span className="font-mono-ui text-[9px] sm:text-[10px] uppercase tracking-wider sm:tracking-[0.25em] text-[#e5c583]">
                  Pre-Launch Offer · Limited Batch #MD-042
                </span>
              </div>

              {/* Main Headline */}
              <h1 className="font-editorial mt-4 sm:mt-6 text-3xl font-normal leading-tight tracking-tight text-[#f4ede2] sm:text-6xl lg:text-[4.85rem] drop-shadow-xl">
                Stop Holding<br />
                <em className="text-gold-gradient font-serif italic font-light">Back.</em> <br />
                <span className="font-cinzel text-2.5xl font-semibold tracking-wider sm:text-5xl lg:text-[3.5rem]">
                  Restore Maximum Hardness.
                </span>
              </h1>

              {/* Subtitle / Brand Copy */}
              <p className="mt-4 sm:mt-6 max-w-xl text-sm leading-relaxed text-[#dbe2ee] sm:text-lg drop-shadow-lg">
                Target the root cause of premature fatigue and weakness. Pure <strong className="text-[#f4ede2]">Raig Mahi, Clove & Ostrich Oil</strong> formula engineered to maximize blood flow, double your endurance, and give you 100% control.
              </p>

              {/* Core Value Micro-Bullets - 2-column grid on mobile */}
              <div className="mt-6 sm:mt-8 grid w-full grid-cols-2 gap-2 sm:gap-4 max-w-xl">
                <div className="flex items-center gap-2 rounded-xl border border-[#c5a059]/30 bg-[#0e1522]/90 p-2.5 sm:p-3.5 backdrop-blur-md shadow-xl transition-all hover:border-[#c5a059]">
                  <ShieldCheck className="h-3.5 w-3.5 sm:h-4 sm:w-4 shrink-0 text-[#c5a059]" />
                  <span className="text-[10.5px] sm:text-xs font-medium text-[#f4ede2] leading-tight">Boosts Energy & Stamina</span>
                </div>
                <div className="flex items-center gap-2 rounded-xl border border-[#c5a059]/30 bg-[#0e1522]/90 p-2.5 sm:p-3.5 backdrop-blur-md shadow-xl transition-all hover:border-[#c5a059]">
                  <Flame className="h-3.5 w-3.5 sm:h-4 sm:w-4 shrink-0 text-[#c5a059]" />
                  <span className="text-[10.5px] sm:text-xs font-medium text-[#f4ede2] leading-tight">Builds Real Confidence</span>
                </div>
                <div className="flex items-center gap-2 rounded-xl border border-[#c5a059]/30 bg-[#0e1522]/90 p-2.5 sm:p-3.5 backdrop-blur-md shadow-xl transition-all hover:border-[#c5a059]">
                  <Droplets className="h-3.5 w-3.5 sm:h-4 sm:w-4 shrink-0 text-[#c5a059]" />
                  <span className="text-[10.5px] sm:text-xs font-medium text-[#f4ede2] leading-tight">Strengthens Intimate Life</span>
                </div>
                <div className="flex items-center gap-2 rounded-xl border border-[#c5a059]/30 bg-[#0e1522]/90 p-2.5 sm:p-3.5 backdrop-blur-md shadow-xl transition-all hover:border-[#c5a059]">
                  <Truck className="h-3.5 w-3.5 sm:h-4 sm:w-4 shrink-0 text-[#c5a059]" />
                  <span className="text-[10.5px] sm:text-xs font-medium text-[#f4ede2] leading-tight">Plain Packaging · COD</span>
                </div>
              </div>

              {/* Pricing & CTA Actions */}
              <div className="mt-6 sm:mt-9 flex w-full flex-col gap-3 sm:flex-row sm:items-center">
                <button
                  type="button"
                  onClick={() => onOrderClick(1)}
                  disabled={isCheckingOut}
                  className="gold-glow-button group relative flex items-center justify-center gap-2.5 overflow-hidden rounded-xl px-6 py-3.5 sm:px-8 sm:py-4 font-mono-ui text-xs font-bold uppercase tracking-wider sm:tracking-[0.2em] text-[#0b0f17] transition-all disabled:opacity-80 shadow-2xl"
                  data-testid="hero-primary-order-btn"
                >
                  <span className="btn-shine" />
                  {isCheckingOut ? (
                    <>
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-[#0b0f17] border-t-transparent" />
                      <span>Redirecting...</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="h-4 w-4 shrink-0 transition-transform duration-300 group-hover:scale-110" />
                      <span>ORDER NOW — PKR 2,499</span>
                      <ArrowRight className="h-4 w-4 shrink-0 transition-transform duration-300 group-hover:translate-x-1" />
                    </>
                  )}
                </button>

                <a
                  href="#bundles"
                  className="flex items-center justify-center gap-2 rounded-xl border border-[#c5a059]/40 bg-[#0c121d]/90 px-4 py-3.5 sm:px-6 sm:py-4 font-mono-ui text-xs font-medium uppercase tracking-wider sm:tracking-[0.2em] text-[#c7d0de] backdrop-blur-md transition-colors hover:border-[#c5a059] hover:text-[#e5c583]"
                >
                  <span>SEE PLANS & BUNDLES</span>
                  <ArrowDown className="h-3.5 w-3.5" />
                </a>
              </div>

              {/* Price Tag */}
              <div className="mt-6 sm:mt-8 flex w-full flex-wrap items-center justify-between sm:justify-start gap-x-6 gap-y-2 border-t border-[#c5a059]/25 pt-4 text-xs text-[#8c97a8]">
                <div className="flex items-center gap-2">
                  <span className="font-mono-ui text-xs text-[#8c97a8] line-through">PKR 3,000</span>
                  <span className="font-cinzel text-base sm:text-lg font-bold text-[#e5c583]">PKR 2,499</span>
                  <span className="rounded bg-[#c5a059]/25 px-2 py-0.5 font-mono-ui text-[9px] font-bold text-[#e5c583]">
                    Save PKR 501
                  </span>
                </div>
                <span className="hidden text-[#c5a059]/40 sm:inline">|</span>
                <div className="flex items-center gap-1.5 text-[10px] sm:text-[11px] text-[#dbe2ee]">
                  <Sparkles className="h-3.5 w-3.5 shrink-0 text-[#c5a059]" />
                  <span>Pay Cash When Delivered (30ml Dropper)</span>
                </div>
              </div>

              {/* Mobile Dedicated 16:9 Video Showcase Card */}
              <div className="mt-7 w-full lg:hidden">
                <div className="relative overflow-hidden rounded-2xl border border-[#c5a059]/40 bg-[#070a10] shadow-[0_20px_50px_rgba(0,0,0,0.9)] aspect-video">
                  <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="auto"
                    poster="/assets/hero-poster-custom.jpg"
                    className="h-full w-full object-cover"
                    onLoadedData={(e) => {
                      e.currentTarget.play().catch(() => {});
                    }}
                  >
                    <source src={VIDEO_CONFIG.hero.backgroundVideo} type="video/mp4" />
                    <source src="/videos/main1.mp4" type="video/mp4" />
                  </video>
                  <div className="absolute top-3 left-3 z-20">
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-[#c5a059]/40 bg-[#090e17]/90 px-3 py-1 font-mono-ui text-[9px] uppercase tracking-wider text-[#e5c583] backdrop-blur-md">
                      <Sparkles className="h-3 w-3 text-[#c5a059]" />
                      3D 4K Product Showcase
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Clean Viewport on Desktop */}
            <div className="hidden lg:block lg:col-span-5 xl:col-span-6 pointer-events-none" />
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. KEY INGREDIENTS SECTION (5 BOTANICAL ACTIVES) */}
      {/* ========================================================================= */}
      <section
        id="actives"
        className="relative border-b border-[#c5a059]/15 bg-gradient-to-b from-[#070b12] via-[#0d1422] to-[#070b12] py-16 sm:py-24"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-8">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#c5a059]/30 bg-[#c5a059]/10 px-4 py-1.5 font-mono-ui text-[10px] uppercase tracking-[0.25em] text-[#e5c583]">
              <Sparkles className="h-3.5 w-3.5 text-[#c5a059]" /> 100% Pure Botanical Formulation
            </div>
            <h2 className="font-editorial mx-auto mt-4 max-w-3xl text-3xl font-normal text-[#f4ede2] sm:text-5xl lg:text-6xl">
              5 Legendary <em className="text-gold-gradient italic">Cold-Pressed Actives.</em>
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-[#9aa4b5]">
              Formulated with Raig Mahi, Clove Eugenol, Ostrich Bio-Oil, Wild Rosemary, and Extra Virgin Olive Oil for maximum transdermal absorption.
            </p>
          </div>

          {/* Actives Interactive Selector */}
          <div className="mt-12 grid gap-8 lg:grid-cols-12 items-center">
            {/* Left Buttons List */}
            <div className="flex flex-col gap-3 lg:col-span-5">
              {FIVE_ACTIVES.map((item, idx) => {
                const isActive = activeActiveTab === idx;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setActiveActiveTab(idx)}
                    className={`flex items-center justify-between rounded-2xl border p-4 text-left transition-all duration-300 ${
                      isActive
                        ? 'border-[#c5a059] bg-[#0e1624] shadow-[0_0_25px_rgba(197,160,89,0.2)]'
                        : 'border-[#c5a059]/15 bg-[#070b12]/60 hover:border-[#c5a059]/40'
                    }`}
                  >
                    <div>
                      <span className="font-mono-ui text-[10px] uppercase tracking-wider text-[#c5a059]">
                        Active 0{idx + 1}
                      </span>
                      <h4 className="font-editorial text-base sm:text-lg font-semibold text-[#f4ede2]">
                        {item.name}
                      </h4>
                    </div>
                    <span className={`h-2.5 w-2.5 rounded-full transition-colors ${isActive ? 'bg-[#c5a059]' : 'bg-[#1a2538]'}`} />
                  </button>
                );
              })}
            </div>

            {/* Right Active Card Display */}
            <div className="lg:col-span-7">
              <Card3D depth={10}>
                <div className="glass-obsidian-card relative rounded-3xl border border-[#c5a059]/30 bg-gradient-to-br from-[#0c1322] via-[#070b12] to-[#0c1322] p-6 sm:p-10 shadow-2xl">
                  <span className="inline-block rounded-full border border-[#c5a059]/30 bg-[#c5a059]/10 px-3.5 py-1 font-mono-ui text-[10px] uppercase tracking-wider text-[#e5c583]">
                    {FIVE_ACTIVES[activeActiveTab].tag}
                  </span>
                  <h3 className="font-editorial mt-4 text-2xl sm:text-3xl font-semibold text-[#f4ede2]">
                    {FIVE_ACTIVES[activeActiveTab].name}
                  </h3>
                  <p className="font-mono-ui mt-1 text-xs text-[#c5a059]">
                    {FIVE_ACTIVES[activeActiveTab].role}
                  </p>
                  <p className="mt-4 text-sm leading-relaxed text-[#c8d2e1]">
                    {FIVE_ACTIVES[activeActiveTab].description}
                  </p>
                  <div className="mt-6 border-t border-[#c5a059]/15 pt-4 font-mono-ui text-xs text-[#8c97a8]">
                    <span className="text-[#e5c583]">Key Profile: </span>
                    {FIVE_ACTIVES[activeActiveTab].composition}
                  </div>
                </div>
              </Card3D>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. HOW TO USE (MASSAGE RITUAL GUIDE) */}
      {/* ========================================================================= */}
      <section
        id="ritual"
        className="relative border-b border-[#c5a059]/15 bg-[#070b12] py-16 sm:py-24"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-8">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#c5a059]/30 bg-[#c5a059]/10 px-4 py-1.5 font-mono-ui text-[10px] uppercase tracking-[0.25em] text-[#e5c583]">
              <Flame className="h-3.5 w-3.5 text-[#c5a059]" /> 3-Step Daily Night Ritual
            </div>
            <h2 className="font-editorial mx-auto mt-4 max-w-3xl text-3xl font-normal text-[#f4ede2] sm:text-5xl lg:text-6xl">
              How To Apply <em className="text-gold-gradient italic">For Peak Warmth.</em>
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-[#9aa4b5]">
              Follow this simple 3-step application routine every night before sleeping.
            </p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-3">
            {/* Step 1 */}
            <div className="rounded-3xl border border-[#c5a059]/25 bg-[#090e17] p-6 text-center shadow-xl">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl border border-[#c5a059]/40 bg-[#c5a059]/15 font-mono-ui text-lg font-bold text-[#e5c583]">
                01
              </div>
              <h3 className="font-editorial mt-4 text-xl font-semibold text-[#f4ede2]">
                Dispense 4-6 Drops
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-[#8c97a8]">
                Warm 4 to 6 drops of Midnight Drive between clean, dry palms for 5 seconds.
              </p>
            </div>

            {/* Step 2 */}
            <div className="rounded-3xl border border-[#c5a059]/25 bg-[#090e17] p-6 text-center shadow-xl">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl border border-[#c5a059]/40 bg-[#c5a059]/15 font-mono-ui text-lg font-bold text-[#e5c583]">
                02
              </div>
              <h3 className="font-editorial mt-4 text-xl font-semibold text-[#f4ede2]">
                5-Min Gentle Massage
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-[#8c97a8]">
                Massage gently in smooth, upward circular strokes until fully absorbed into tissue.
              </p>
            </div>

            {/* Step 3 */}
            <div className="rounded-3xl border border-[#c5a059]/25 bg-[#090e17] p-6 text-center shadow-xl">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl border border-[#c5a059]/40 bg-[#c5a059]/15 font-mono-ui text-lg font-bold text-[#e5c583]">
                03
              </div>
              <h3 className="font-editorial mt-4 text-xl font-semibold text-[#f4ede2]">
                Leave Overnight
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-[#8c97a8]">
                Allow the cold-pressed bio-actives to nourish local micro-circulation while you rest.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. QUANTITY BUNDLE OFFERS */}
      {/* ========================================================================= */}
      <BundleOffersSection onSelectBundle={(qty) => onOrderClick(qty)} />

      {/* ========================================================================= */}
      {/* 5. 100% DISCREET PACKAGING COVENANT */}
      {/* ========================================================================= */}
      <PrivacyUnboxingSection />

      {/* ========================================================================= */}
      {/* 6. 2 AI DOCTOR REELS (MEDICAL EXPERT INSIGHTS) */}
      {/* ========================================================================= */}
      <section
        id="doctor-insights"
        className="relative border-t border-[#c5a059]/15 bg-gradient-to-b from-[#070b12] via-[#0a101b] to-[#070b12] py-16 sm:py-24"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-8">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#c5a059]/30 bg-[#c5a059]/10 px-4 py-1.5 font-mono-ui text-[10px] uppercase tracking-[0.25em] text-[#e5c583]">
              <ShieldCheck className="h-3.5 w-3.5 text-[#c5a059]" /> Specialist AI Doctor Commentary
            </div>
            <h2 className="font-editorial mx-auto mt-4 max-w-3xl text-3xl font-normal text-[#f4ede2] sm:text-5xl lg:text-6xl">
              Medical Expert <em className="text-gold-gradient italic">Formulation Insights.</em>
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-[#9aa4b5]">
              Hear pharmacological and traditional Unani herbal commentary on Raig Mahi and Clove bio-carriers.
            </p>
          </div>

          <div className="mt-12 grid gap-8 md:grid-cols-2">
            {/* Doctor 1 */}
            <div className="rounded-3xl border border-[#c5a059]/30 bg-[#090e17] p-6 shadow-2xl flex flex-col justify-between">
              <div>
                <div className="overflow-hidden rounded-2xl border border-[#c5a059]/25 bg-[#070a10] aspect-video">
                  <SafeVideo
                    src={VIDEO_CONFIG.doctorInsights[0].src}
                    poster="/assets/hero-poster-custom.jpg"
                    controls
                    playsInline
                    className="h-full w-full object-cover"
                  />
                </div>
                <h3 className="font-editorial mt-5 text-xl font-semibold text-[#f4ede2]">
                  {VIDEO_CONFIG.doctorInsights[0].title}
                </h3>
                <p className="font-mono-ui text-xs text-[#c5a059]">
                  {VIDEO_CONFIG.doctorInsights[0].subtitle}
                </p>
                <p className="mt-3 text-xs italic leading-relaxed text-[#9aa4b5]">
                  {VIDEO_CONFIG.doctorInsights[0].quote}
                </p>
              </div>
            </div>

            {/* Doctor 2 */}
            <div className="rounded-3xl border border-[#c5a059]/30 bg-[#090e17] p-6 shadow-2xl flex flex-col justify-between">
              <div>
                <div className="overflow-hidden rounded-2xl border border-[#c5a059]/25 bg-[#070a10] aspect-video">
                  <SafeVideo
                    src={VIDEO_CONFIG.doctorInsights[1].src}
                    poster="/assets/hero-poster-custom.jpg"
                    controls
                    playsInline
                    className="h-full w-full object-cover"
                  />
                </div>
                <h3 className="font-editorial mt-5 text-xl font-semibold text-[#f4ede2]">
                  {VIDEO_CONFIG.doctorInsights[1].title}
                </h3>
                <p className="font-mono-ui text-xs text-[#c5a059]">
                  {VIDEO_CONFIG.doctorInsights[1].subtitle}
                </p>
                <p className="mt-3 text-xs italic leading-relaxed text-[#9aa4b5]">
                  {VIDEO_CONFIG.doctorInsights[1].quote}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 7. VERIFIED CLIENT REVIEWS */}
      {/* ========================================================================= */}
      <section
        id="reviews"
        className="relative border-t border-[#c5a059]/15 bg-[#070b12] py-16 sm:py-24"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-8">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#c5a059]/30 bg-[#c5a059]/10 px-4 py-1.5 font-mono-ui text-[10px] uppercase tracking-[0.25em] text-[#e5c583]">
              <Star className="h-3.5 w-3.5 text-[#c5a059] fill-[#c5a059]" /> 500+ Verified Pakistan COD Orders
            </div>
            <h2 className="font-editorial mx-auto mt-4 max-w-3xl text-3xl font-normal text-[#f4ede2] sm:text-5xl lg:text-6xl">
              Trusted by Gentlemen <em className="text-gold-gradient italic">Across Pakistan.</em>
            </h2>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {REVIEWS.map((r, idx) => (
              <div
                key={idx}
                className="rounded-3xl border border-[#c5a059]/25 bg-[#090e17] p-6 shadow-xl flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-1 text-[#c5a059]">
                    {Array.from({ length: r.rating }).map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-current" />
                    ))}
                  </div>
                  <p className="mt-4 text-xs leading-relaxed text-[#c8d2e1]">
                    "{r.quote}"
                  </p>
                </div>
                <div className="mt-6 border-t border-[#c5a059]/15 pt-4">
                  <div className="font-editorial text-base font-semibold text-[#f4ede2]">
                    {r.name}
                  </div>
                  <div className="font-mono-ui text-[10px] text-[#8c97a8]">
                    {r.location} · <span className="text-[#e5c583]">{r.verified}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 8. PRODUCT FAQ */}
      {/* ========================================================================= */}
      <section
        id="faq"
        className="relative border-t border-[#c5a059]/15 bg-gradient-to-b from-[#070b12] via-[#090e17] to-[#070b12] py-16 sm:py-24"
      >
        <div className="mx-auto max-w-4xl px-4 sm:px-8">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#c5a059]/30 bg-[#c5a059]/10 px-4 py-1.5 font-mono-ui text-[10px] uppercase tracking-[0.25em] text-[#e5c583]">
              <HelpCircle className="h-3.5 w-3.5 text-[#c5a059]" /> Questions & Guidance
            </div>
            <h2 className="font-editorial mx-auto mt-4 text-3xl font-normal text-[#f4ede2] sm:text-5xl">
              Frequently Asked <em className="text-gold-gradient italic">Questions.</em>
            </h2>
          </div>

          <div className="mt-12 space-y-4">
            {FAQS.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="rounded-2xl border border-[#c5a059]/25 bg-[#090e17] overflow-hidden transition-all"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="flex w-full items-center justify-between p-5 text-left font-editorial text-base sm:text-lg font-semibold text-[#f4ede2]"
                  >
                    <span>{faq.q}</span>
                    {isOpen ? <Minus className="h-4 w-4 shrink-0 text-[#c5a059]" /> : <Plus className="h-4 w-4 shrink-0 text-[#c5a059]" />}
                  </button>
                  {isOpen && (
                    <div className="border-t border-[#c5a059]/15 px-5 pb-5 pt-3 text-xs leading-relaxed text-[#9aa4b5]">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
