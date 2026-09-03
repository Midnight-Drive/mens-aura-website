import { useEffect, useRef, useState, type ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import {
  ArrowDown,
  ArrowRight,
  Award,
  BookOpen,
  Check,
  CheckCircle2,
  ChevronDown,
  Clock3,
  Compass,
  Droplets,
  Eye,
  Film,
  Flame,
  Globe,
  HeartHandshake,
  HelpCircle,
  Instagram,
  Layers,
  Lock,
  Mail,
  Menu,
  MessageCircle,
  Minus,
  Package,
  PackageCheck,
  Phone,
  Play,
  Plus,
  RotateCcw,
  RotateCw,
  Shield,
  ShieldAlert,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Star,
  Truck,
  UserCheck,
  Wind,
  X,
  Zap,
} from 'lucide-react';

import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import { Route, Switch, Router as WouterRouter, useLocation } from 'wouter';
import NotFound from '@/pages/not-found';

import { AmbientParticles } from '@/components/AmbientParticles';
import { ProductSensoryBreakdown } from '@/components/ProductSensoryBreakdown';
import { ProductVideoShowcase } from '@/components/ProductVideoShowcase';
import { Card3D } from '@/components/Card3D';
import { LuxuryCursor } from '@/components/LuxuryCursor';
import { OrderModal } from '@/components/OrderModal';
import { StickyMobileCTA } from '@/components/StickyMobileCTA';
import { Hero3DVideo } from '@/components/Hero3DVideo';
import { SafeVideo } from '@/components/SafeVideo';
import { BlogSection } from '@/components/BlogSection';
import { ContactSection } from '@/components/ContactSection';
import { WhatsAppFloat } from '@/components/WhatsAppFloat';
import { VIDEO_CONFIG } from '@/config/videos';
import { redirectToShopifyCheckout } from '@/lib/shopify';

const queryClient = new QueryClient();


// Custom Stallion Brand Mark SVG (Gold Luxury Vector)
function StallionMark({ className = '' }: { className?: string }) {
  return (
    <svg aria-hidden="true" className={className} viewBox="0 0 44 48" fill="none">
      <defs>
        <linearGradient id="stallionGold" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#f5dfa8" />
          <stop offset="50%" stopColor="#c5a059" />
          <stop offset="100%" stopColor="#9e7a36" />
        </linearGradient>
      </defs>
      <path
        d="M9 42c3.8-5.8 5.2-11.8 5-17.7C13.8 15.6 17.8 7.6 29.2 3c-.4 3.6.8 6.5 3.4 8.8 2.8 2.5 4.7 5.4 4.7 9.4 0 5.3-3.2 8.9-7.6 11.4-3.3 1.9-6.1 4.3-8.1 8.1"
        stroke="url(#stallionGold)"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
      <path
        d="M18 15.2c2.8-2.3 6.3-3.4 10.5-3.4M19.8 19.2c4.4 0 8.3 1.4 11.7 4.2M15 28.3c4.6.2 8.5 1.4 11.8 3.7M12.8 35.3c3.1.4 5.8 1.2 8.1 2.7M29.4 3c3.2 1.4 6.1 3.8 8.3 7.4"
        stroke="url(#stallionGold)"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
      <path
        d="m34.6 12.6 4.5 1.1-3.5 2.1M30.2 31.7l4.8 1.4-4.4 1.3"
        stroke="url(#stallionGold)"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// Hook for smooth scroll reveal
function useScrollReveal() {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          node.classList.add('is-revealed');
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return ref;
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
    note: 'Rare Sand-Dwelling Active',
    composition: 'Naturally rich in stimulatory lipids & bio-active minerals',
  },
  {
    id: 'ostrich-oil',
    name: 'Pure Ostrich Bio-Oil',
    role: 'The Transdermal Bio-Carrier',
    description:
      'Possesses a unique lipid profile molecularly similar to human sebum. Contains high concentrations of Omega 3, 6, and 9 essential fatty acids that allow instantaneous deep tissue penetration without leaving sticky or greasy residue.',
    tag: 'Ultra-Fast Transdermal Absorption',
    note: 'High Omega 3, 6 & 9',
    composition: 'Non-comedogenic, featherlight transdermal carrier',
  },
  {
    id: 'clove-oil',
    name: 'Steam-Distilled Clove Oil',
    role: 'The Thermal Spark & Sensory Awakener',
    description:
      'Distilled from organic Syzygium aromaticum flower buds. Packed with natural Eugenol, it introduces a comforting, gradual thermal sensation that relaxes tense muscular fibers and stimulates heightened local tactile awareness.',
    tag: 'Invigorating Heat Sensation',
    note: '90%+ Pure Eugenol Content',
    composition: 'Therapeutic warming botanical essence',
  },
  {
    id: 'rosemary-extract',
    name: 'Wild Rosemary Botanical Extract',
    role: 'The Clarifier & Botanical Preserver',
    description:
      'Steam-extracted Rosmarinus officinalis leaves deliver potent Rosmarinic and Carnosic acids. Provides natural antioxidant stability to the delicate oils while leaving a subtle, composed herbaceous aroma.',
    tag: 'Herbal Composure & Freshness',
    note: 'Pure Botanical Antioxidant',
    composition: 'Rich in Rosmarinic & Carnosic organic acids',
  },
  {
    id: 'olive-oil',
    name: 'Cold-Pressed Extra Virgin Olive Oil',
    role: 'The Velvet Glide & Emollient Base',
    description:
      'First cold-pressed extra virgin grade. Loaded with Squalene, Vitamin E, and Oleic acid, it cushions every stroke with a silken glide that lasts throughout the massage ritual and deeply nourishes the skin.',
    tag: 'Enduring Velvet Slip',
    note: 'First Cold Press',
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

// Why Midnight Drive Video Showcase Collection
const WHY_VIDEOS = VIDEO_CONFIG.whyMidnightDrive;

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
    a: 'Zero side effects. Midnight Drive is handcrafted from 100% pure cold-pressed botanical oils (Raig Mahi, Clove, Ostrich, Rosemary, and Extra Virgin Olive Oil). It contains zero parabens, zero paraffin, zero synthetic mineral oils, and zero harmful steroids. It is non-irritating and 100% safe for daily long-term use. (If you have hypersensitive skin, we recommend a simple 24-hour wrist patch test first).',
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
    q: 'How long does one 100ml bottle last?',
    a: 'Because Midnight Drive uses a concentrated cold-pressed formula with high-glide ostrich and olive bio-carriers, only 4 to 6 drops are required per ritual. One 100ml bottle comfortably lasts 6 to 8 weeks with regular daily use.',
  },
];

function Home() {
  const [orderOpen, setOrderOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [activeIngredientIndex, setActiveIngredientIndex] = useState(0);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [isInstructionalVideoUnlocked, setIsInstructionalVideoUnlocked] = useState(false);
  const [activeWhyVideoIndex, setActiveWhyVideoIndex] = useState(0);

  const whyRef = useScrollReveal();
  const scienceRef = useScrollReveal();
  const activesRef = useScrollReveal();
  const ritualRef = useScrollReveal();
  const trustRef = useScrollReveal();
  const reviewsRef = useScrollReveal();
  const faqRef = useScrollReveal();
  const ctaRef = useScrollReveal();

  const handleOpenOrder = () => {
    setOrderOpen(true);
    setMobileMenuOpen(false);
  };

  const handleShopifyOrder = async (quantity = 1) => {
    setIsCheckingOut(true);
    try {
      await redirectToShopifyCheckout(quantity);
    } catch (err) {
      console.error('Shopify checkout error:', err);
      setIsCheckingOut(false);
    }
  };


  const scrollToVideo = () => {
    const videoElem = document.getElementById('video-showcase');
    if (videoElem) {
      videoElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen bg-[#0b0f17] text-[#f4ede2] selection:bg-[#c5a059] selection:text-[#0b0f17]">
      {/* Luxury Interactive Cursor Glow (Desktop) */}
      <LuxuryCursor />

      {/* Background Film Grain Overlay */}
      <div className="noise-overlay" />

      {/* Floating Golden Ember Particles */}
      <AmbientParticles />

      {/* Ambient Gradient Mesh Background */}
      <div className="ambient-mesh pointer-events-none fixed inset-0 z-0" />

      {/* Top Announcement Ribbon */}
      <div className="relative z-50 border-b border-[#c5a059]/20 bg-[#070a10]/90 px-4 py-2 text-center text-xs backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-center gap-2 sm:gap-6">
          <span className="flex items-center gap-1.5 font-mono-ui text-[10px] uppercase tracking-[0.2em] text-[#e5c583]">
            <Sparkles className="h-3 w-3 text-[#c5a059]" /> Pre-Launch Batch: PKR 2,499 <span className="line-through text-[#8c97a8]">PKR 3,000</span>
          </span>
          <span className="hidden text-[#c5a059]/40 sm:inline">•</span>
          <span className="hidden items-center gap-1.5 font-mono-ui text-[10px] uppercase tracking-[0.2em] text-[#8c97a8] sm:flex">
            <Lock className="h-3 w-3 text-[#c5a059]" /> 100% Discreet Unbranded Packaging
          </span>
          <span className="hidden text-[#c5a059]/40 sm:inline">•</span>
          <span className="flex items-center gap-1.5 font-mono-ui text-[10px] uppercase tracking-[0.2em] text-[#c5a059]">
            <Truck className="h-3 w-3" /> Free Express COD All Across Pakistan
          </span>
        </div>
      </div>

      {/* Main Glass Navigation */}
      <header className="sticky top-0 z-40 border-b border-[#c5a059]/15 bg-[#0b0f17]/85 backdrop-blur-xl transition-all duration-300">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8">
          {/* Logo Wordmark - Pure Text */}
          <a
            href="#hero"
            className="group flex flex-col justify-center transition-transform duration-300 hover:scale-[1.02]"
            data-testid="brand-logo"
          >
            <span className="font-cinzel text-lg font-extrabold tracking-[0.25em] text-[#f4ede2] transition-colors group-hover:text-[#e5c583]">
              THE MEN'S AURA
            </span>
            <span className="font-mono-ui text-[8px] uppercase tracking-[0.4em] text-[#c5a059]">
              Midnight Drive
            </span>
          </a>

          {/* Desktop Nav Links with Dropdown Menu Categories */}
          <nav className="hidden items-center gap-8 md:flex" aria-label="Main Navigation">
            {/* Category 1: DISCOVER (Why Midnight Drive, How to Use, Film) */}
            <div className="relative group">
              <button
                type="button"
                className="flex items-center gap-1.5 font-mono-ui text-xs uppercase tracking-[0.2em] text-[#e5c583] transition-colors group-hover:text-[#ffffff] py-2 font-semibold"
              >
                <span>Discover</span>
                <ChevronDown className="h-3.5 w-3.5 text-[#c5a059] transition-transform duration-300 group-hover:rotate-180" />
              </button>

              <div className="pointer-events-none absolute left-0 top-full pt-2 opacity-0 transition-all duration-300 group-hover:pointer-events-auto group-hover:opacity-100 z-50">
                <div className="w-72 overflow-hidden rounded-2xl border border-[#c5a059]/30 bg-[#090e17]/95 p-3 shadow-[0_20px_50px_rgba(0,0,0,0.9)] backdrop-blur-2xl">
                  <a
                    href="#why-midnight-drive"
                    className="flex items-start gap-3 rounded-xl p-3 transition-colors hover:bg-[#c5a059]/15"
                  >
                    <Sparkles className="h-4 w-4 mt-0.5 shrink-0 text-[#c5a059]" />
                    <div>
                      <div className="font-editorial text-sm font-semibold text-[#f4ede2]">Why Midnight Drive</div>
                      <div className="text-[11px] text-[#8c97a8]">Core sales story & 4 value pillars</div>
                    </div>
                  </a>
                  <a
                    href="#ritual"
                    className="flex items-start gap-3 rounded-xl p-3 transition-colors hover:bg-[#c5a059]/15"
                  >
                    <Flame className="h-4 w-4 mt-0.5 shrink-0 text-[#c5a059]" />
                    <div>
                      <div className="font-editorial text-sm font-semibold text-[#f4ede2]">How To Use</div>
                      <div className="text-[11px] text-[#8c97a8]">3-Step application & private video</div>
                    </div>
                  </a>
                  <a
                    href="#video-showcase"
                    className="flex items-start gap-3 rounded-xl p-3 transition-colors hover:bg-[#c5a059]/15"
                  >
                    <Film className="h-4 w-4 mt-0.5 shrink-0 text-[#c5a059]" />
                    <div>
                      <div className="font-editorial text-sm font-semibold text-[#f4ede2]">4K Product Film</div>
                      <div className="text-[11px] text-[#8c97a8]">Cinematic product chapters</div>
                    </div>
                  </a>
                </div>
              </div>
            </div>

            {/* Category 2: FORMULA & SCIENCE (The Science, 5 Actives, Doctor Insights) */}
            <div className="relative group">
              <button
                type="button"
                className="flex items-center gap-1.5 font-mono-ui text-xs uppercase tracking-[0.2em] text-[#8c97a8] transition-colors group-hover:text-[#e5c583] py-2 font-medium"
              >
                <span>Formula & Science</span>
                <ChevronDown className="h-3.5 w-3.5 text-[#c5a059] transition-transform duration-300 group-hover:rotate-180" />
              </button>

              <div className="pointer-events-none absolute left-0 top-full pt-2 opacity-0 transition-all duration-300 group-hover:pointer-events-auto group-hover:opacity-100 z-50">
                <div className="w-72 overflow-hidden rounded-2xl border border-[#c5a059]/30 bg-[#090e17]/95 p-3 shadow-[0_20px_50px_rgba(0,0,0,0.9)] backdrop-blur-2xl">
                  <a
                    href="#science"
                    className="flex items-start gap-3 rounded-xl p-3 transition-colors hover:bg-[#c5a059]/15"
                  >
                    <Compass className="h-4 w-4 mt-0.5 shrink-0 text-[#c5a059]" />
                    <div>
                      <div className="font-editorial text-sm font-semibold text-[#f4ede2]">The Science of Heat</div>
                      <div className="text-[11px] text-[#8c97a8]">Transdermal thermal absorption</div>
                    </div>
                  </a>
                  <a
                    href="#actives"
                    className="flex items-start gap-3 rounded-xl p-3 transition-colors hover:bg-[#c5a059]/15"
                  >
                    <Droplets className="h-4 w-4 mt-0.5 shrink-0 text-[#c5a059]" />
                    <div>
                      <div className="font-editorial text-sm font-semibold text-[#f4ede2]">5 Botanical Actives</div>
                      <div className="text-[11px] text-[#8c97a8]">Raig Mahi, Clove, Ostrich Oil</div>
                    </div>
                  </a>
                  <a
                    href="#doctor-insights"
                    className="flex items-start gap-3 rounded-xl p-3 transition-colors hover:bg-[#c5a059]/15"
                  >
                    <ShieldCheck className="h-4 w-4 mt-0.5 shrink-0 text-[#c5a059]" />
                    <div>
                      <div className="font-editorial text-sm font-semibold text-[#f4ede2]">Doctor Insights</div>
                      <div className="text-[11px] text-[#8c97a8]">Medical specialist AI reels</div>
                    </div>
                  </a>
                </div>
              </div>
            </div>

            {/* Category 3: TRUST & REVIEWS (Reviews, Discretion, FAQ) */}
            <div className="relative group">
              <button
                type="button"
                className="flex items-center gap-1.5 font-mono-ui text-xs uppercase tracking-[0.2em] text-[#8c97a8] transition-colors group-hover:text-[#e5c583] py-2 font-medium"
              >
                <span>Trust & Reviews</span>
                <ChevronDown className="h-3.5 w-3.5 text-[#c5a059] transition-transform duration-300 group-hover:rotate-180" />
              </button>

              <div className="pointer-events-none absolute right-0 top-full pt-2 opacity-0 transition-all duration-300 group-hover:pointer-events-auto group-hover:opacity-100 z-50">
                <div className="w-72 overflow-hidden rounded-2xl border border-[#c5a059]/30 bg-[#090e17]/95 p-3 shadow-[0_20px_50px_rgba(0,0,0,0.9)] backdrop-blur-2xl">
                  <a
                    href="#reviews"
                    className="flex items-start gap-3 rounded-xl p-3 transition-colors hover:bg-[#c5a059]/15"
                  >
                    <Star className="h-4 w-4 mt-0.5 shrink-0 text-[#c5a059] fill-[#c5a059]" />
                    <div>
                      <div className="font-editorial text-sm font-semibold text-[#f4ede2]">Client Reviews</div>
                      <div className="text-[11px] text-[#8c97a8]">500+ Verified COD Orders</div>
                    </div>
                  </a>
                  <a
                    href="#discretion"
                    className="flex items-start gap-3 rounded-xl p-3 transition-colors hover:bg-[#c5a059]/15"
                  >
                    <Lock className="h-4 w-4 mt-0.5 shrink-0 text-[#c5a059]" />
                    <div>
                      <div className="font-editorial text-sm font-semibold text-[#f4ede2]">Privacy Covenant</div>
                      <div className="text-[11px] text-[#8c97a8]">100% Anonymous plain box</div>
                    </div>
                  </a>
                  <a
                    href="#blogs"
                    className="flex items-start gap-3 rounded-xl p-3 transition-colors hover:bg-[#c5a059]/15"
                  >
                    <BookOpen className="h-4 w-4 mt-0.5 shrink-0 text-[#c5a059]" />
                    <div>
                      <div className="font-editorial text-sm font-semibold text-[#f4ede2]">SEO Journal & Blogs</div>
                      <div className="text-[11px] text-[#8c97a8]">Articles, stamina & science</div>
                    </div>
                  </a>
                  <a
                    href="#contact"
                    className="flex items-start gap-3 rounded-xl p-3 transition-colors hover:bg-[#c5a059]/15"
                  >
                    <MessageCircle className="h-4 w-4 mt-0.5 shrink-0 text-[#c5a059]" />
                    <div>
                      <div className="font-editorial text-sm font-semibold text-[#f4ede2]">Contact & WhatsApp</div>
                      <div className="text-[11px] text-[#8c97a8]">Official Concierge & Support</div>
                    </div>
                  </a>
                  <a
                    href="#faq"
                    className="flex items-start gap-3 rounded-xl p-3 transition-colors hover:bg-[#c5a059]/15"
                  >
                    <HelpCircle className="h-4 w-4 mt-0.5 shrink-0 text-[#c5a059]" />
                    <div>
                      <div className="font-editorial text-sm font-semibold text-[#f4ede2]">Product FAQ</div>
                      <div className="text-[11px] text-[#8c97a8]">Clear answers & guidance</div>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </nav>

          {/* Header Action CTA */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => handleShopifyOrder(1)}
              disabled={isCheckingOut}
              className="gold-glow-button relative hidden items-center gap-2 overflow-hidden rounded-xl px-5 py-2.5 font-mono-ui text-[11px] font-bold uppercase tracking-[0.2em] text-[#0b0f17] transition-all disabled:opacity-80 sm:flex"
              data-testid="nav-order-button"
            >
              <span className="btn-shine" />
              {isCheckingOut ? (
                <>
                  <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-[#0b0f17] border-t-transparent" />
                  <span>Connecting...</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="h-3.5 w-3.5" />
                  <span>Order COD (PKR 2,499)</span>
                </>
              )}
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#c5a059]/25 text-[#e5c583] md:hidden"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="border-b border-[#c5a059]/20 bg-[#090e17]/95 px-6 py-6 backdrop-blur-2xl md:hidden animate-in slide-in-from-top-4 duration-200">
            <nav className="flex flex-col gap-4">
              <a
                href="#why-midnight-drive"
                onClick={() => setMobileMenuOpen(false)}
                className="font-mono-ui text-xs font-semibold uppercase tracking-widest text-[#e5c583]"
              >
                Why Midnight Drive
              </a>
              <a
                href="#ritual"
                onClick={() => setMobileMenuOpen(false)}
                className="font-mono-ui text-xs uppercase tracking-widest text-[#8c97a8]"
              >
                How To Use
              </a>
              <a
                href="#science"
                onClick={() => setMobileMenuOpen(false)}
                className="font-mono-ui text-xs uppercase tracking-widest text-[#8c97a8]"
              >
                The Science
              </a>
              <a
                href="#actives"
                onClick={() => setMobileMenuOpen(false)}
                className="font-mono-ui text-xs uppercase tracking-widest text-[#8c97a8]"
              >
                5 Actives
              </a>
              <a
                href="#video-showcase"
                onClick={() => setMobileMenuOpen(false)}
                className="font-mono-ui text-xs uppercase tracking-widest text-[#8c97a8]"
              >
                4K Product Film
              </a>
              <a
                href="#reviews"
                onClick={() => setMobileMenuOpen(false)}
                className="font-mono-ui text-xs uppercase tracking-widest text-[#8c97a8]"
              >
                Client Reviews
              </a>
              <a
                href="#faq"
                onClick={() => setMobileMenuOpen(false)}
                className="font-mono-ui text-xs uppercase tracking-widest text-[#8c97a8]"
              >
                FAQ
              </a>
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  handleShopifyOrder(1);
                }}
                disabled={isCheckingOut}
                className="gold-glow-button relative mt-2 flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl py-3 font-mono-ui text-xs font-bold uppercase tracking-wider text-[#0b0f17] transition-all disabled:opacity-80"
              >
                <span className="btn-shine" />
                {isCheckingOut ? (
                  <>
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-[#0b0f17] border-t-transparent" />
                    <span>Opening Shopify Checkout...</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="h-4 w-4" />
                    <span>Order Pre-Launch COD (PKR 2,499)</span>
                  </>
                )}
              </button>
            </nav>
          </div>
        )}
      </header>

      <main>
        {/* ========================================================================= */}
        {/* 1. HERO SECTION WITH DIRECT 16:9 VIDEO BACKGROUND */}
        {/* ========================================================================= */}
        <section
          id="hero"
          className="relative min-h-[calc(100vh-80px)] overflow-hidden border-b border-[#c5a059]/15 pb-0 pt-0 flex items-center"
        >
          {/* Full-Screen Pure Video Background Layer - Native 1st Frame Seamless Playback */}
          <div className="absolute inset-0 z-0 overflow-hidden bg-[#070b12]">
            <video
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
              className="h-full w-full object-cover object-center opacity-100 transition-all duration-500"
              onLoadedData={(e) => {
                e.currentTarget.play().catch(() => {});
              }}
            >
              <source src={VIDEO_CONFIG.hero.backgroundVideo} type="video/mp4" />
              <source src="/videos/main1.mp4" type="video/mp4" />
            </video>
          </div>

          {/* Subtle Hero Grid */}
          <div className="luxury-grid pointer-events-none absolute inset-0 z-[2] opacity-10" />

          <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-8 py-16 sm:py-20 lg:py-24 w-full">
            <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-8 hero-grid">
              {/* Left Column: Brand Copy & CTAs Floating Directly Over Video */}
              <div className="flex flex-col items-start lg:col-span-7 xl:col-span-6">
                {/* Pre-title Badge */}
                <div className="inline-flex items-center gap-2.5 rounded-full border border-[#c5a059]/35 bg-[#0e1624]/90 px-4 py-1.5 backdrop-blur-md shadow-2xl">
                  <span className="h-2 w-2 rounded-full bg-[#c5a059] shadow-[0_0_10px_#c5a059]" />
                  <span className="font-mono-ui text-[10px] uppercase tracking-[0.25em] text-[#e5c583]">
                    Pre-Launch Offer · Limited Batch #MD-042
                  </span>
                </div>

                {/* Main Headline */}
                <h1 className="font-editorial mt-6 text-4xl font-normal leading-[1.05] tracking-tight text-[#f4ede2] sm:text-6xl lg:text-[4.85rem] drop-shadow-xl">
                  Feel the<br />
                  <em className="text-gold-gradient font-serif italic font-light">Difference</em> <br />
                  <span className="font-cinzel text-3xl font-semibold tracking-wider sm:text-5xl lg:text-[3.7rem]">
                    Tonight.
                  </span>
                </h1>

                {/* Subtitle / Brand Copy */}
                <p className="mt-6 max-w-xl text-base leading-relaxed text-[#dbe2ee] sm:text-lg drop-shadow-lg">
                  Pakistan's most powerful natural vitality oil. Made from <strong className="text-[#f4ede2]">Raig Mahi, Clove & Ostrich Oil</strong> — trusted for centuries. Boost your <strong className="text-[#f4ede2]">energy, confidence & intimate life</strong>. Feel the warmth from the very first use.
                </p>

                {/* Core Value Micro-Bullets with 3D depth */}
                <div className="mt-8 grid w-full grid-cols-1 gap-3.5 sm:grid-cols-2 sm:gap-4 max-w-xl">
                  <div className="flex items-center gap-2.5 rounded-xl border border-[#c5a059]/30 bg-[#0e1522]/90 p-3.5 backdrop-blur-md shadow-xl transition-all hover:border-[#c5a059]">
                    <ShieldCheck className="h-4 w-4 shrink-0 text-[#c5a059]" />
                    <span className="text-xs font-medium text-[#f4ede2]">Boosts Energy & Stamina</span>
                  </div>
                  <div className="flex items-center gap-2.5 rounded-xl border border-[#c5a059]/30 bg-[#0e1522]/90 p-3.5 backdrop-blur-md shadow-xl transition-all hover:border-[#c5a059]">
                    <Flame className="h-4 w-4 shrink-0 text-[#c5a059]" />
                    <span className="text-xs font-medium text-[#f4ede2]">Builds Real Confidence</span>
                  </div>
                  <div className="flex items-center gap-2.5 rounded-xl border border-[#c5a059]/30 bg-[#0e1522]/90 p-3.5 backdrop-blur-md shadow-xl transition-all hover:border-[#c5a059]">
                    <Droplets className="h-4 w-4 shrink-0 text-[#c5a059]" />
                    <span className="text-xs font-medium text-[#f4ede2]">Strengthens Intimate Life</span>
                  </div>
                  <div className="flex items-center gap-2.5 rounded-xl border border-[#c5a059]/30 bg-[#0e1522]/90 p-3.5 backdrop-blur-md shadow-xl transition-all hover:border-[#c5a059]">
                    <Truck className="h-4 w-4 shrink-0 text-[#c5a059]" />
                    <span className="text-xs font-medium text-[#f4ede2]">Plain Packaging · COD</span>
                  </div>
                </div>

                {/* Pricing & CTA Actions */}
                <div className="mt-9 flex w-full flex-col gap-4 sm:flex-row sm:items-center">
                  <button
                    type="button"
                    onClick={() => handleShopifyOrder(1)}
                    disabled={isCheckingOut}
                    className="gold-glow-button group relative flex items-center justify-center gap-3 overflow-hidden rounded-xl px-8 py-4 font-mono-ui text-xs font-bold uppercase tracking-[0.2em] text-[#0b0f17] transition-all disabled:opacity-80 shadow-2xl"
                    data-testid="hero-primary-order-btn"
                  >
                    <span className="btn-shine" />
                    {isCheckingOut ? (
                      <>
                        <span className="h-4 w-4 animate-spin rounded-full border-2 border-[#0b0f17] border-t-transparent" />
                        <span>Redirecting to Shopify...</span>
                      </>
                    ) : (
                      <>
                        <ShoppingBag className="h-4 w-4 transition-transform duration-300 group-hover:scale-110" />
                        <span>Order Midnight Drive — Cash on Delivery</span>
                        <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                      </>
                    )}
                  </button>

                  <a
                    href="#actives"
                    className="flex items-center justify-center gap-2 rounded-xl border border-[#c5a059]/40 bg-[#0c121d]/90 px-6 py-4 font-mono-ui text-xs font-medium uppercase tracking-[0.2em] text-[#c7d0de] backdrop-blur-md transition-colors hover:border-[#c5a059] hover:text-[#e5c583]"
                  >
                    <span>See Ingredients</span>
                    <ArrowDown className="h-3.5 w-3.5" />
                  </a>
                </div>

                {/* Launch Batch Guarantee Badge with New Price */}
                <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-[#c5a059]/25 pt-5 text-xs text-[#8c97a8]">
                  <div className="flex items-center gap-2">
                    <span className="font-mono-ui text-xs text-[#8c97a8] line-through">PKR 3,000</span>
                    <span className="font-cinzel text-lg font-bold text-[#e5c583]">PKR 2,499</span>
                    <span className="rounded bg-[#c5a059]/25 px-2 py-0.5 font-mono-ui text-[9px] font-bold text-[#e5c583]">
                      Save PKR 501
                    </span>
                  </div>
                  <span className="hidden text-[#c5a059]/40 sm:inline">|</span>
                  <div className="flex items-center gap-1.5 text-[11px] text-[#dbe2ee]">
                    <Sparkles className="h-3.5 w-3.5 text-[#c5a059]" />
                    <span>Pay Cash When Delivered (100ml Dropper)</span>
                  </div>
                </div>
              </div>

              {/* Right Column: Clean Open Viewport so the Video's Bottle/Box Shines */}
              <div className="hidden lg:block lg:col-span-5 xl:col-span-6 pointer-events-none" />

            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 2. INFINITE LUXURY MARQUEE TICKER */}
        {/* ========================================================================= */}
        <div className="marquee-container overflow-hidden border-b border-[#c5a059]/20 bg-[#070b12] py-4">
          <div className="marquee-track flex items-center gap-10 whitespace-nowrap font-mono-ui text-[11px] uppercase tracking-[0.3em] text-[#c5a059]/80">
            {Array.from({ length: 4 }).flatMap((_, loopIdx) =>
              [
                'RAIG MAHI · CLOVE · OSTRICH OIL · ROSEMARY · OLIVE',
                'PAY CASH ON DELIVERY · ALL PAKISTAN',
                'NATURAL · NO CHEMICALS · NO STEROIDS',
                'PLAIN BOX · 100% PRIVATE DELIVERY',
                'MIDNIGHT DRIVE · FEEL THE DIFFERENCE',
                'FREE EXPRESS DELIVERY ALL PAKISTAN',
              ].map((item, itemIdx) => (
                <div key={`${loopIdx}-${itemIdx}`} className="flex items-center gap-10">
                  <span>{item}</span>
                  <Sparkles className="h-3.5 w-3.5 text-[#c5a059]" />
                </div>
              ))
            )}
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 2.5 WHY MIDNIGHT DRIVE? (THE CORE SALES POINT & VALUE PROPOSITION) */}
        {/* ========================================================================= */}
        <section
          id="why-midnight-drive"
          ref={whyRef}
          className="reveal-init border-b border-[#c5a059]/15 bg-gradient-to-b from-[#070b12] via-[#0b101a] to-[#070b12] py-24 sm:py-32"
        >
          <div className="mx-auto max-w-7xl px-5 sm:px-8">
            <div className="text-center">
              <div className="inline-flex items-center gap-2 rounded-full border border-[#c5a059]/35 bg-[#c5a059]/10 px-4 py-1.5 font-mono-ui text-[10px] uppercase tracking-[0.25em] text-[#e5c583]">
                <Sparkles className="h-3.5 w-3.5" /> The Essential Male Vitality Choice
              </div>
              <h2 className="font-editorial mx-auto mt-4 max-w-3xl text-4xl font-normal text-[#f4ede2] sm:text-5xl lg:text-6xl">
                Why <em className="text-gold-gradient italic">Midnight Drive?</em>
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-[#9aa4b5]">
                Unlike synthetic pills that cause headaches and stomach strain, Midnight Drive is a 100% natural transdermal oil. It works directly where applied—delivering therapeutic thermal warmth, stamina, and firm tissue elasticity.
              </p>
            </div>

            {/* Why Video Player & Interactive Multi-Reel Selector */}
            <div className="mt-16 grid gap-8 lg:grid-cols-12 lg:gap-12 items-center">
              {/* Left Column: Video Player Container */}
              <div className="relative overflow-hidden rounded-3xl border border-[#c5a059]/35 bg-[#070a10] shadow-[0_25px_80px_rgba(0,0,0,0.9)] lg:col-span-7 aspect-video">
                <SafeVideo
                  key={WHY_VIDEOS[activeWhyVideoIndex].id}
                  src={WHY_VIDEOS[activeWhyVideoIndex].src}
                  controls
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="h-full w-full object-cover"
                />
                <div className="absolute top-4 left-4 z-20">
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-[#c5a059]/40 bg-[#090e17]/90 px-3 py-1 font-mono-ui text-[10px] uppercase tracking-wider text-[#e5c583] backdrop-blur-md">
                    <ShieldCheck className="h-3.5 w-3.5 text-[#c5a059]" />
                    {WHY_VIDEOS[activeWhyVideoIndex].badge}
                  </span>
                </div>
              </div>

              {/* Right Column: Interactive Video Selector Cards */}
              <div className="flex flex-col gap-4 lg:col-span-5">
                <h3 className="font-mono-ui text-xs uppercase tracking-[0.25em] text-[#c5a059]">
                  Select Video Demonstration
                </h3>
                {WHY_VIDEOS.map((vid, idx) => {
                  const isActive = activeWhyVideoIndex === idx;
                  return (
                    <button
                      key={vid.id}
                      type="button"
                      onClick={() => setActiveWhyVideoIndex(idx)}
                      className={`group flex items-start gap-4 rounded-2xl border p-5 text-left transition-all duration-300 ${
                        isActive
                          ? 'border-[#c5a059] bg-[#0e1624] shadow-[0_0_30px_rgba(197,160,89,0.2)]'
                          : 'border-[#c5a059]/15 bg-[#070b12]/70 hover:border-[#c5a059]/40 hover:bg-[#0a0f17]'
                      }`}
                      data-testid={`why-video-select-${idx}`}
                    >
                      <div
                        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border transition-colors ${
                          isActive
                            ? 'border-[#c5a059] bg-[#c5a059] text-[#0b0f17]'
                            : 'border-[#c5a059]/30 bg-[#0e1522] text-[#c5a059] group-hover:border-[#c5a059]'
                        }`}
                      >
                        <Play className="h-4 w-4 fill-current" />
                      </div>
                      <div>
                        <h4 className="font-editorial text-lg font-semibold text-[#f4ede2]">
                          {vid.title}
                        </h4>
                        <p className="mt-1 text-xs leading-relaxed text-[#8c97a8]">
                          {vid.subtitle}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 4 Pillars of Value (Core Selling Points) */}
            <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              <Card3D depth={8}>
                <div className="glass-obsidian-card flex h-full flex-col justify-between rounded-3xl p-6 sm:p-8">
                  <div>
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-[#c5a059]/30 bg-[#c5a059]/10 text-[#c5a059]">
                      <Droplets className="h-6 w-6" />
                    </div>
                    <h3 className="font-editorial mt-5 text-xl font-semibold text-[#f4ede2]">
                      Direct Transdermal Entry
                    </h3>
                    <p className="mt-2 text-xs leading-relaxed text-[#8c97a8]">
                      Absorbs directly through localized skin tissue. Zero organ burden, zero liver strain, and no systemic side effects.
                    </p>
                  </div>
                  <div className="mt-6 border-t border-[#c5a059]/15 pt-3 font-mono-ui text-[10px] text-[#c5a059]">
                    100% External Bio-Absorption
                  </div>
                </div>
              </Card3D>

              <Card3D depth={8}>
                <div className="glass-obsidian-card flex h-full flex-col justify-between rounded-3xl p-6 sm:p-8">
                  <div>
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-[#c5a059]/30 bg-[#c5a059]/10 text-[#c5a059]">
                      <Flame className="h-6 w-6" />
                    </div>
                    <h3 className="font-editorial mt-5 text-xl font-semibold text-[#f4ede2]">
                      60-Second Thermal Heat
                    </h3>
                    <p className="mt-2 text-xs leading-relaxed text-[#8c97a8]">
                      Therapeutic Clove Eugenol + Raig Mahi bio-lipids awaken localized blood circulation from the very first minute.
                    </p>
                  </div>
                  <div className="mt-6 border-t border-[#c5a059]/15 pt-3 font-mono-ui text-[10px] text-[#c5a059]">
                    Instant Soothing Sensation
                  </div>
                </div>
              </Card3D>

              <Card3D depth={8}>
                <div className="glass-obsidian-card flex h-full flex-col justify-between rounded-3xl p-6 sm:p-8">
                  <div>
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-[#c5a059]/30 bg-[#c5a059]/10 text-[#c5a059]">
                      <ShieldCheck className="h-6 w-6" />
                    </div>
                    <h3 className="font-editorial mt-5 text-xl font-semibold text-[#f4ede2]">
                      Tissue Firmness & Stamina
                    </h3>
                    <p className="mt-2 text-xs leading-relaxed text-[#8c97a8]">
                      Rich fatty acids in Ostrich oil act as an organic bio-carrier to nourish male tissue deeply over 14 to 21 days.
                    </p>
                  </div>
                  <div className="mt-6 border-t border-[#c5a059]/15 pt-3 font-mono-ui text-[10px] text-[#c5a059]">
                    Cumulative Natural Energy
                  </div>
                </div>
              </Card3D>

              <Card3D depth={8}>
                <div className="glass-obsidian-card flex h-full flex-col justify-between rounded-3xl p-6 sm:p-8">
                  <div>
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-[#c5a059]/30 bg-[#c5a059]/10 text-[#c5a059]">
                      <Lock className="h-6 w-6" />
                    </div>
                    <h3 className="font-editorial mt-5 text-xl font-semibold text-[#f4ede2]">
                      100% Anonymous Delivery
                    </h3>
                    <p className="mt-2 text-xs leading-relaxed text-[#8c97a8]">
                      Shipped in neutral plain packaging across Pakistan. Pay cash on delivery at your doorstep with complete privacy.
                    </p>
                  </div>
                  <div className="mt-6 border-t border-[#c5a059]/15 pt-3 font-mono-ui text-[10px] text-[#c5a059]">
                    Zero Online Card Risk
                  </div>
                </div>
              </Card3D>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 3. THE SCIENCE & PHILOSOPHY OF SENSATION */}
        {/* ========================================================================= */}
        <section
          id="science"
          ref={scienceRef}
          className="reveal-init relative mx-auto max-w-7xl px-5 py-24 sm:px-8 lg:py-32"
        >
          <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
            {/* Left Header Column */}
            <div className="lg:col-span-5">
              <div className="flex items-center gap-2">
                <span className="h-px w-8 bg-[#c5a059]" />
                <span className="font-mono-ui text-[10px] uppercase tracking-[0.3em] text-[#c5a059]">
                  Philosophy & Formulation
                </span>
              </div>
              <h2 className="font-editorial mt-5 text-4xl font-normal leading-tight text-[#f4ede2] sm:text-5xl lg:text-6xl">
                Slow down enough to feel <em className="text-gold-gradient italic">everything.</em>
              </h2>
              <div className="mt-8 h-px w-24 bg-gradient-to-r from-[#c5a059] to-transparent" />
            </div>

            {/* Right Editorial Column */}
            <div className="lg:col-span-7">
              <p className="text-lg leading-relaxed text-[#9aa4b5] sm:text-xl">
                Midnight Drive is made from 5 powerful natural ingredients — tested for centuries across South Asia. Together they warm the body, boost blood flow, increase energy, and help you feel your best every night. No chemicals. No side effects. Just nature doing what it does best.
              </p>

              {/* 4 Core Pillars Grid with 3D Hover Tilt */}
              <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-6">
                <Card3D depth={8}>
                  <div className="rounded-2xl border border-[#c5a059]/20 bg-[#0e1624] p-5 text-center backdrop-blur-sm">
                    <div className="font-cinzel text-3xl font-bold text-[#e5c583]">98%</div>
                    <div className="mt-2 font-mono-ui text-[10px] uppercase tracking-wider text-[#8c97a8]">
                      Reported Warmth & Sensation
                    </div>
                  </div>
                </Card3D>

                <Card3D depth={8}>
                  <div className="rounded-2xl border border-[#c5a059]/20 bg-[#0e1624] p-5 text-center backdrop-blur-sm">
                    <div className="font-cinzel text-3xl font-bold text-[#e5c583]">5</div>
                    <div className="mt-2 font-mono-ui text-[10px] uppercase tracking-wider text-[#8c97a8]">
                      Pure Botanical Actives
                    </div>
                  </div>
                </Card3D>

                <Card3D depth={8}>
                  <div className="rounded-2xl border border-[#c5a059]/20 bg-[#0e1624] p-5 text-center backdrop-blur-sm">
                    <div className="font-cinzel text-3xl font-bold text-[#e5c583]">0%</div>
                    <div className="mt-2 font-mono-ui text-[10px] uppercase tracking-wider text-[#8c97a8]">
                      Synthetic Preservatives
                    </div>
                  </div>
                </Card3D>

                <Card3D depth={8}>
                  <div className="rounded-2xl border border-[#c5a059]/20 bg-[#0e1624] p-5 text-center backdrop-blur-sm">
                    <div className="font-cinzel text-3xl font-bold text-[#e5c583]">100%</div>
                    <div className="mt-2 font-mono-ui text-[10px] uppercase tracking-wider text-[#8c97a8]">
                      Discreet Anonymous Box
                    </div>
                  </div>
                </Card3D>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 4. THE 5 BOTANICAL ACTIVES (INGREDIENTS DEEP DIVE) */}
        {/* ========================================================================= */}
        <section
          id="actives"
          ref={activesRef}
          className="reveal-init border-y border-[#c5a059]/15 bg-[#090e17] py-24 sm:py-32"
        >
          <div className="mx-auto max-w-7xl px-5 sm:px-8">
            <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
              <div>
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-[#c5a059]" />
                  <span className="font-mono-ui text-[10px] uppercase tracking-[0.3em] text-[#c5a059]">
                    Pure Alchemy · The 5 Actives
                  </span>
                </div>
                <h2 className="font-editorial mt-4 text-4xl font-normal text-[#f4ede2] sm:text-5xl lg:text-6xl">
                  Nature, <em className="text-gold-gradient italic">Distilled.</em>
                </h2>
              </div>
              <p className="max-w-md text-sm leading-relaxed text-[#8c97a8]">
                Every single drop earns its existence. Click each active below to discover the botanical rationale behind the sensation.
              </p>
            </div>

            {/* Actives Interactive Layout */}
            <div className="mt-16 grid gap-8 lg:grid-cols-12 lg:gap-12">
              {/* Left Column: Interactive Selector List */}
              <div className="space-y-3 lg:col-span-6">
                {FIVE_ACTIVES.map((active, idx) => {
                  const isSelected = activeIngredientIndex === idx;

                  return (
                    <button
                      key={active.id}
                      type="button"
                      onClick={() => setActiveIngredientIndex(idx)}
                      className={`group flex w-full items-start justify-between rounded-2xl border p-5 text-left transition-all duration-300 ${
                        isSelected
                          ? 'border-[#c5a059] bg-[#121a2a] shadow-[0_10px_30px_rgba(0,0,0,0.5)]'
                          : 'border-[#c5a059]/15 bg-[#0b1019]/60 hover:border-[#c5a059]/40 hover:bg-[#0e1524]'
                      }`}
                      data-testid={`active-btn-${active.id}`}
                    >
                      <div className="flex items-start gap-4">
                        <span
                          className={`font-mono-ui text-xs font-semibold ${
                            isSelected ? 'text-[#c5a059]' : 'text-[#5c6675]'
                          }`}
                        >
                          0{idx + 1}
                        </span>
                        <div>
                          <h4
                            className={`font-editorial text-xl font-semibold transition-colors sm:text-2xl ${
                              isSelected ? 'text-[#f4ede2]' : 'text-[#8c97a8] group-hover:text-[#f4ede2]'
                            }`}
                          >
                            {active.name}
                          </h4>
                          <span className="mt-1 block font-mono-ui text-[11px] text-[#c5a059]">
                            {active.role}
                          </span>
                        </div>
                      </div>
                      <div
                        className={`flex h-7 w-7 items-center justify-center rounded-full border transition-all ${
                          isSelected
                            ? 'border-[#c5a059] bg-[#c5a059] text-[#0b0f17]'
                            : 'border-[#c5a059]/30 text-[#8c97a8] group-hover:border-[#c5a059]'
                        }`}
                      >
                        <ArrowRight className="h-3.5 w-3.5" />
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Right Column: 3D Holographic Showcase Card */}
              <div className="lg:col-span-6">
                {(() => {
                  const current = FIVE_ACTIVES[activeIngredientIndex];
                  return (
                    <Card3D depth={10}>
                      <div className="relative flex h-full flex-col justify-between rounded-3xl border border-[#c5a059]/30 bg-gradient-to-b from-[#111929] to-[#0b0f17] p-8 shadow-2xl backdrop-blur-md sm:p-10">
                        {/* Top Badges */}
                        <div>
                          <div className="flex items-center justify-between border-b border-[#c5a059]/15 pb-5">
                            <span className="rounded-full border border-[#c5a059]/30 bg-[#c5a059]/10 px-3 py-1 font-mono-ui text-[10px] uppercase tracking-wider text-[#e5c583]">
                              {current.tag}
                            </span>
                            <span className="font-mono-ui text-xs text-[#8c97a8]">
                              Active 0{activeIngredientIndex + 1} / 05
                            </span>
                          </div>

                          {/* Title & Role */}
                          <h3 className="font-editorial mt-6 text-3xl font-semibold text-[#f4ede2] sm:text-4xl">
                            {current.name}
                          </h3>
                          <p className="mt-1 font-mono-ui text-xs text-[#c5a059]">
                            {current.role}
                          </p>

                          {/* Description */}
                          <p className="mt-6 text-base leading-relaxed text-[#9aa4b5]">
                            {current.description}
                          </p>
                        </div>

                        {/* Bottom Scientific Breakdown */}
                        <div className="mt-8 rounded-2xl border border-[#c5a059]/20 bg-[#070b12]/80 p-5">
                          <div className="flex items-center gap-2 text-xs text-[#c5a059]">
                            <Sparkles className="h-4 w-4" />
                            <span className="font-mono-ui uppercase tracking-wider">Potency Profile</span>
                          </div>
                          <p className="mt-2 text-xs text-[#8c97a8]">{current.composition}</p>
                        </div>
                      </div>
                    </Card3D>
                  );
                })()}
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 5. CINEMATIC 4K PRODUCT VIDEO SHOWCASE */}
        {/* ========================================================================= */}
        <ProductVideoShowcase />

        {/* ========================================================================= */}
        {/* 6. SINGLE-PRODUCT MULTI-DIMENSIONAL SENSORY & TIMELINE BREAKDOWN */}
        {/* ========================================================================= */}
        <ProductSensoryBreakdown />

        {/* ========================================================================= */}
        {/* 7. THE NIGHT RITUAL & PRIVATE INSTRUCTIONAL VIDEO GUIDE (HOW TO APPLY) */}
        {/* ========================================================================= */}
        <section
          id="ritual"
          ref={ritualRef}
          className="reveal-init relative mx-auto max-w-7xl px-5 py-24 sm:px-8 lg:py-32"
        >
          <div className="text-center">
            <span className="font-mono-ui text-[10px] uppercase tracking-[0.3em] text-[#c5a059]">
              The 3-Step Night Ritual & Application Guide
            </span>
            <h2 className="font-editorial mx-auto mt-3 max-w-2xl text-4xl font-normal text-[#f4ede2] sm:text-5xl lg:text-6xl">
              How to use <em className="text-gold-gradient italic">Midnight Drive.</em>
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-[#9aa4b5]">
              A step-by-step guidance ritual designed to maximize botanical transdermal absorption, awaken deep warmth, and restore intimate vigor.
            </p>
          </div>

          {/* 3-Step Process Cards */}
          <div className="mt-16 grid gap-6 sm:grid-cols-3 sm:gap-8">
            {/* Step 1 */}
            <Card3D depth={10}>
              <div className="glass-obsidian-card group relative flex h-full flex-col justify-between rounded-3xl p-8 transition-all duration-300">
                <div>
                  <span className="font-cinzel text-4xl font-bold text-[#c5a059]/40 transition-colors group-hover:text-[#c5a059]">
                    01
                  </span>
                  <h3 className="font-editorial mt-6 text-2xl font-semibold text-[#f4ede2]">
                    Cleanse & Prepare
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-[#8c97a8]">
                    Cleanse the focus area with warm water to open skin pores. Dispense 4 to 6 drops of Midnight Drive golden oil onto clean palms.
                  </p>
                </div>
                <div className="mt-8 flex items-center gap-2 border-t border-[#c5a059]/15 pt-4 text-xs text-[#c5a059]">
                  <Flame className="h-4 w-4" />
                  <span className="font-mono-ui">Thermal Pore Awakening</span>
                </div>
              </div>
            </Card3D>

            {/* Step 2 */}
            <Card3D depth={10}>
              <div className="glass-obsidian-card group relative flex h-full flex-col justify-between rounded-3xl p-8 transition-all duration-300">
                <div>
                  <span className="font-cinzel text-4xl font-bold text-[#c5a059]/40 transition-colors group-hover:text-[#c5a059]">
                    02
                  </span>
                  <h3 className="font-editorial mt-6 text-2xl font-semibold text-[#f4ede2]">
                    3-Minute Upward Glide
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-[#8c97a8]">
                    Gently massage using smooth, firm upward circular strokes. The high-glide ostrich bio-carrier ensures zero friction and fast transdermal entry.
                  </p>
                </div>
                <div className="mt-8 flex items-center gap-2 border-t border-[#c5a059]/15 pt-4 text-xs text-[#c5a059]">
                  <Droplets className="h-4 w-4" />
                  <span className="font-mono-ui">Non-Greasy Velvet Slip</span>
                </div>
              </div>
            </Card3D>

            {/* Step 3 */}
            <Card3D depth={10}>
              <div className="glass-obsidian-card group relative flex h-full flex-col justify-between rounded-3xl p-8 transition-all duration-300">
                <div>
                  <span className="font-cinzel text-4xl font-bold text-[#c5a059]/40 transition-colors group-hover:text-[#c5a059]">
                    03
                  </span>
                  <h3 className="font-editorial mt-6 text-2xl font-semibold text-[#f4ede2]">
                    Overnight Nourishment
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-[#8c97a8]">
                    Feel the soothing thermal warmth activate within 60 seconds. Do not wash off immediately — let the natural bio-actives nourish tissue overnight.
                  </p>
                </div>
                <div className="mt-8 flex items-center gap-2 border-t border-[#c5a059]/15 pt-4 text-xs text-[#c5a059]">
                  <Sparkles className="h-4 w-4" />
                  <span className="font-mono-ui">Cumulative Vitality Vigor</span>
                </div>
              </div>
            </Card3D>
          </div>

          {/* Sensitive Video Protection Gate (Private Application Video Guide) */}
          <div className="mt-16 overflow-hidden rounded-3xl border border-[#c5a059]/30 bg-[#070b12] shadow-2xl">
            <div className="border-b border-[#c5a059]/20 bg-[#0d1422] px-6 py-4 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <Lock className="h-5 w-5 text-[#c5a059]" />
                <div>
                  <h4 className="font-editorial text-base font-semibold text-[#f4ede2]">
                    Private Instructional Video Guide
                  </h4>
                  <p className="font-mono-ui text-[10px] uppercase tracking-wider text-[#8c97a8]">
                    Sensitive Content · 18+ Age Verification Required
                  </p>
                </div>
              </div>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-[#c5a059]/30 bg-[#c5a059]/10 px-3 py-1 font-mono-ui text-[10px] text-[#e5c583]">
                <ShieldCheck className="h-3.5 w-3.5" /> Private Access
              </span>
            </div>

            <div className="relative aspect-video w-full bg-black flex items-center justify-center">
              {!isInstructionalVideoUnlocked ? (
                /* Privacy Protection Gate Overlay */
                <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center bg-[#090e17]/95 backdrop-blur-2xl z-20">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full border border-[#c5a059]/40 bg-[#c5a059]/15 text-[#e5c583] shadow-[0_0_30px_rgba(197,160,89,0.3)]">
                    <Lock className="h-8 w-8" />
                  </div>

                  <h3 className="font-editorial mt-5 text-2xl sm:text-3xl font-semibold text-[#f4ede2]">
                    Restricted Instructional Video
                  </h3>

                  <p className="mt-2 max-w-md text-xs sm:text-sm text-[#9aa4b5] leading-relaxed">
                    This video demonstrates the private massage application process for male intimate vitality. Please confirm you are 18 years or older to unlock and view.
                  </p>

                  <button
                    type="button"
                    onClick={() => setIsInstructionalVideoUnlocked(true)}
                    className="gold-glow-button mt-6 flex items-center gap-2.5 rounded-xl px-8 py-3.5 font-mono-ui text-xs font-bold uppercase tracking-[0.2em] text-[#0b0f17] transition-all hover:scale-105 shadow-xl"
                    data-testid="unlock-instructional-video-btn"
                  >
                    <ShieldCheck className="h-4 w-4" />
                    <span>Confirm Age 18+ & Unlock Video Guide</span>
                  </button>
                </div>
              ) : (
                /* Unlocked Video Player */
                <div className="relative h-full w-full">
                  <SafeVideo
                    src={VIDEO_CONFIG.ritualGuide.instructionalVideo}
                    controls
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="h-full w-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => setIsInstructionalVideoUnlocked(false)}
                    className="absolute top-4 right-4 z-30 flex items-center gap-1.5 rounded-full border border-[#c5a059]/40 bg-[#090e17]/90 px-3.5 py-1.5 font-mono-ui text-[10px] uppercase tracking-wider text-[#e5c583] backdrop-blur-md transition-colors hover:bg-[#c5a059] hover:text-[#0b0f17]"
                  >
                    <Lock className="h-3 w-3" />
                    <span>Lock Video</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 7.5 DOCTOR & MEDICAL EXPERT AI HIGHLIGHTS SHOWCASE */}
        {/* ========================================================================= */}
        <section
          id="doctor-insights"
          className="border-t border-[#c5a059]/15 bg-gradient-to-b from-[#070b12] via-[#090e17] to-[#070b12] py-24 sm:py-32"
        >
          <div className="mx-auto max-w-7xl px-5 sm:px-8">
            <div className="text-center">
              <span className="font-mono-ui text-[10px] uppercase tracking-[0.3em] text-[#c5a059]">
                Doctor-Approved & Medical Specialist Insights
              </span>
              <h2 className="font-editorial mx-auto mt-3 max-w-3xl text-4xl font-normal text-[#f4ede2] sm:text-5xl lg:text-6xl">
                Scientific Validation of <br />
                <em className="text-gold-gradient italic">Transdermal Male Vitality.</em>
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-[#9aa4b5]">
                Watch key medical commentaries on how Raig Mahi, Clove Eugenol, and Ostrich oil bio-carriers work safely without synthetic chemicals or steroids.
              </p>
            </div>

            {/* Doctor AI Video Reels Grid */}
            <div className="mt-16 grid gap-8 md:grid-cols-2">
              {/* Doctor Reel 1 */}
              <Card3D depth={8}>
                <div className="glass-obsidian-card flex h-full flex-col justify-between rounded-3xl p-6 sm:p-8">
                  <div>
                    <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-[#c5a059]/30 bg-black">
                      <SafeVideo
                        src={VIDEO_CONFIG.doctorInsights[0].src}
                        controls
                        muted
                        loop
                        playsInline
                        className="h-full w-full object-cover"
                      />
                    </div>

                    <div className="mt-6 flex items-center justify-between">
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-[#c5a059]/30 bg-[#c5a059]/10 px-3 py-1 font-mono-ui text-[10px] text-[#e5c583]">
                        <ShieldCheck className="h-3.5 w-3.5" /> 100% Steroid-Free
                      </span>
                      <span className="font-mono-ui text-[10px] text-[#8c97a8]">Pharmacology Commentary</span>
                    </div>

                    <h3 className="font-editorial mt-4 text-xl font-semibold text-[#f4ede2]">
                      Herbal Science & Formulator Insight
                    </h3>
                    <p className="font-mono-ui text-xs text-[#c5a059]">
                      Botanical Pharmacology Commentary
                    </p>

                    <blockquote className="mt-3 text-xs leading-relaxed text-[#9aa4b5] italic border-l-2 border-[#c5a059]/40 pl-3">
                      "Transdermal absorption of Eugenol from Clove oil combined with Raig Mahi bio-lipids naturally accelerates micro-vascular circulation without synthetic steroids or harmful chemicals."
                    </blockquote>
                  </div>
                </div>
              </Card3D>

              {/* Doctor Reel 2 */}
              <Card3D depth={8}>
                <div className="glass-obsidian-card flex h-full flex-col justify-between rounded-3xl p-6 sm:p-8">
                  <div>
                    <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-[#c5a059]/30 bg-black">
                      <SafeVideo
                        src={VIDEO_CONFIG.doctorInsights[1].src}
                        controls
                        muted
                        loop
                        playsInline
                        className="h-full w-full object-cover"
                      />
                    </div>

                    <div className="mt-6 flex items-center justify-between">
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-[#c5a059]/30 bg-[#c5a059]/10 px-3 py-1 font-mono-ui text-[10px] text-[#e5c583]">
                        <Sparkles className="h-3.5 w-3.5" /> Natural Bio-Carriers
                      </span>
                      <span className="font-mono-ui text-[10px] text-[#8c97a8]">Unani Wellness Review</span>
                    </div>

                    <h3 className="font-editorial mt-4 text-xl font-semibold text-[#f4ede2]">
                      Unani Male Wellness Insight
                    </h3>
                    <p className="font-mono-ui text-xs text-[#c5a059]">
                      Traditional Herbalist Commentary
                    </p>

                    <blockquote className="mt-3 text-xs leading-relaxed text-[#9aa4b5] italic border-l-2 border-[#c5a059]/40 pl-3">
                      "Ostrich oil's rich essential fatty acid profile acts as an organic bio-carrier, carrying botanical warmth deep into male tissue safely and restoring natural vigor."
                    </blockquote>
                  </div>
                </div>
              </Card3D>
            </div>

            {/* Medical Guarantee Badges Bar */}
            <div className="mt-12 flex flex-wrap items-center justify-center gap-6 rounded-2xl border border-[#c5a059]/20 bg-[#0d1422]/80 p-6 text-center font-mono-ui text-xs text-[#c7d0de]">
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-[#c5a059]" />
                <span>100% Steroid-Free</span>
              </div>
              <span className="text-[#c5a059]/30">•</span>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-[#c5a059]" />
                <span>Dermatologically Tested</span>
              </div>
              <span className="text-[#c5a059]/30">•</span>
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-[#c5a059]" />
                <span>Zero Mineral Oil / Paraffin</span>
              </div>
              <span className="text-[#c5a059]/30">•</span>
              <div className="flex items-center gap-2">
                <Award className="h-4 w-4 text-[#c5a059]" />
                <span>Hypoallergenic Herbal Formula</span>
              </div>
            </div>

            <p className="mt-4 text-center text-[10px] text-[#5c6675] font-mono-ui uppercase tracking-wider">
              *Notice: Educational AI Video Presentations Illustrating Traditional Botanical Literature on Raig Mahi, Clove & Ostrich Oil.
            </p>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 8. CLIENT DISCRETION & TRUST VAULT (UNBOXING EXPERIENCE) */}
        {/* ========================================================================= */}
        <section
          id="discretion"
          ref={trustRef}
          className="reveal-init border-y border-[#c5a059]/15 bg-[#090e17] py-20"
        >
          <div className="mx-auto max-w-7xl px-5 sm:px-8">
            <div className="rounded-3xl border border-[#c5a059]/30 bg-gradient-to-r from-[#0d1422] via-[#101827] to-[#0d1422] p-8 sm:p-14">
              <div className="grid items-center gap-10 lg:grid-cols-12">
                <div className="lg:col-span-7">
                  <div className="inline-flex items-center gap-2 rounded-full border border-[#c5a059]/30 bg-[#c5a059]/10 px-3 py-1 font-mono-ui text-[10px] uppercase tracking-widest text-[#e5c583]">
                    <Lock className="h-3 w-3" /> The Men's Aura Privacy Covenant
                  </div>
                  <h3 className="font-editorial mt-4 text-3xl font-normal text-[#f4ede2] sm:text-4xl lg:text-5xl">
                    100% Discreet & Confidential <br />
                    <em className="text-gold-gradient italic">Doorstep Delivery.</em>
                  </h3>
                  <p className="mt-4 text-sm leading-relaxed text-[#9aa4b5] sm:text-base">
                    We understand that men's wellness is personal. Every order is packed in a neutral, unbranded brown carton box with zero product names or logos on the exterior courier air waybill. Delivered directly to your hands anywhere in Pakistan.
                  </p>

                  <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
                    <div className="rounded-xl border border-[#c5a059]/15 bg-[#070a10]/70 p-4 transition-all hover:border-[#c5a059]/40 hover:bg-[#0a0f17]">
                      <Package className="h-5 w-5 text-[#c5a059]" />
                      <h4 className="mt-2 text-xs font-semibold text-[#f4ede2]">Plain Outer Box</h4>
                      <p className="mt-1 text-[11px] text-[#8c97a8]">No branding or descriptions</p>
                    </div>

                    <div className="rounded-xl border border-[#c5a059]/15 bg-[#070a10]/70 p-4 transition-all hover:border-[#c5a059]/40 hover:bg-[#0a0f17]">
                      <Truck className="h-5 w-5 text-[#c5a059]" />
                      <h4 className="mt-2 text-xs font-semibold text-[#f4ede2]">Express Couriers</h4>
                      <p className="mt-1 text-[11px] text-[#8c97a8]">TCS, Trax & Leopards COD</p>
                    </div>

                    <div className="rounded-xl border border-[#c5a059]/15 bg-[#070a10]/70 p-4 transition-all hover:border-[#c5a059]/40 hover:bg-[#0a0f17]">
                      <ShieldCheck className="h-5 w-5 text-[#c5a059]" />
                      <h4 className="mt-2 text-xs font-semibold text-[#f4ede2]">Pay Cash on Arrival</h4>
                      <p className="mt-1 text-[11px] text-[#8c97a8]">Zero advance risk</p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col items-center justify-center rounded-2xl border border-[#c5a059]/25 bg-[#070a10]/90 p-8 text-center backdrop-blur-md lg:col-span-5">
                  <StallionMark className="h-16 w-16 text-[#c5a059]" />
                  <h4 className="font-cinzel mt-4 text-lg font-bold text-[#f4ede2]">
                    MEN'S AURA SEAL
                  </h4>
                  <p className="mt-2 text-xs leading-relaxed text-[#8c97a8]">
                    Guaranteed authentic batch formulation. Sealed in dark apothecary glass with tamper-evident band.
                  </p>
                  <button
                    type="button"
                    onClick={() => handleShopifyOrder(1)}
                    disabled={isCheckingOut}
                    className="gold-glow-button relative mt-6 w-full overflow-hidden rounded-xl py-3.5 font-mono-ui text-xs font-bold uppercase tracking-wider text-[#0b0f17] transition-all disabled:opacity-80"
                  >
                    <span className="btn-shine" />
                    {isCheckingOut ? (
                      <span className="flex items-center justify-center gap-2">
                        <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-[#0b0f17] border-t-transparent" />
                        <span>Opening Shopify Checkout...</span>
                      </span>
                    ) : (
                      <span>Place Pre-Launch COD Order (PKR 2,499)</span>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 9. VERIFIED CUSTOMER REVIEWS (SOCIAL PROOF) */}
        {/* ========================================================================= */}
        <section
          id="reviews"
          ref={reviewsRef}
          className="reveal-init relative mx-auto max-w-7xl px-5 py-24 sm:px-8 lg:py-32"
        >
          <div className="flex flex-col justify-between gap-6 border-b border-[#c5a059]/20 pb-8 sm:flex-row sm:items-end">
            <div>
              <span className="font-mono-ui text-[10px] uppercase tracking-[0.3em] text-[#c5a059]">
                Client Testimonials · Pakistan
              </span>
              <h2 className="font-editorial mt-3 text-4xl font-normal text-[#f4ede2] sm:text-5xl lg:text-6xl">
                Notes From <em className="text-gold-gradient italic">The Night.</em>
              </h2>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex text-[#c5a059]">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-[#c5a059] stroke-none" />
                ))}
              </div>
              <span className="font-cinzel text-sm font-bold text-[#e5c583]">4.9 / 5.0</span>
              <span className="text-xs text-[#8c97a8]">(500+ Verified Orders)</span>
            </div>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {REVIEWS.map((review, idx) => (
              <Card3D key={idx} depth={8}>
                <div
                  className="glass-obsidian-card flex h-full flex-col justify-between rounded-3xl p-8"
                  data-testid={`review-card-${idx}`}
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <div className="flex text-[#c5a059]">
                        {Array.from({ length: review.rating }).map((_, i) => (
                          <Star key={i} className="h-3.5 w-3.5 fill-[#c5a059] stroke-none" />
                        ))}
                      </div>
                      <span className="font-mono-ui text-[10px] text-[#5c6675]">{review.date}</span>
                    </div>
                    <p className="mt-6 text-sm leading-relaxed text-[#c7d0de]">
                      "{review.quote}"
                    </p>
                  </div>

                  <div className="mt-8 flex items-center justify-between border-t border-[#c5a059]/15 pt-4">
                    <div>
                      <h4 className="font-medium text-sm text-[#f4ede2]">{review.name}</h4>
                      <span className="text-[11px] text-[#8c97a8]">{review.location}</span>
                    </div>
                    <span className="inline-flex items-center gap-1 rounded-full bg-[#c5a059]/10 px-2 py-0.5 font-mono-ui text-[9px] text-[#c5a059]">
                      <CheckCircle2 className="h-3 w-3" /> Verified
                    </span>
                  </div>
                </div>
              </Card3D>
            ))}
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 9.5 SEO WELLNESS JOURNAL & BLOGS */}
        {/* ========================================================================= */}
        <BlogSection />

        {/* ========================================================================= */}
        {/* 10. INTERACTIVE FAQ ACCORDION */}
        {/* ========================================================================= */}
        <section
          id="faq"
          ref={faqRef}
          className="reveal-init border-t border-[#c5a059]/15 bg-[#090e17] py-24 sm:py-32"
        >
          <div className="mx-auto max-w-4xl px-5 sm:px-8">
            <div className="text-center">
              <span className="font-mono-ui text-[10px] uppercase tracking-[0.3em] text-[#c5a059]">
                Frequently Asked Questions
              </span>
              <h2 className="font-editorial mt-3 text-4xl font-normal text-[#f4ede2] sm:text-5xl">
                Clear Answers for <em className="text-gold-gradient italic">Your Peace of Mind.</em>
              </h2>
            </div>

            <div className="mt-12 space-y-4">
              {FAQS.map((faq, idx) => {
                const isOpen = openFaqIndex === idx;

                return (
                  <div
                    key={idx}
                    className="overflow-hidden rounded-2xl border border-[#c5a059]/20 bg-[#0e1522] transition-colors hover:border-[#c5a059]/40"
                  >
                    <button
                      type="button"
                      onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                      className="flex w-full items-center justify-between p-6 text-left"
                      data-testid={`faq-toggle-${idx}`}
                    >
                      <span className="font-editorial text-lg font-semibold text-[#f4ede2] sm:text-xl">
                        {faq.q}
                      </span>
                      <ChevronDown
                        className={`h-5 w-5 text-[#c5a059] transition-transform duration-300 ${
                          isOpen ? 'rotate-180' : ''
                        }`}
                      />
                    </button>

                    {isOpen && (
                      <div className="border-t border-[#c5a059]/15 px-6 pb-6 pt-4 text-sm leading-relaxed text-[#9aa4b5] animate-in fade-in duration-200">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 10.5 CONTACT US & OFFICIAL WHATSAPP CONCIERGE */}
        {/* ========================================================================= */}
        <ContactSection />

        {/* ========================================================================= */}
        {/* 11. FINAL OBSIDIAN GRAND FINALE CTA */}
        {/* ========================================================================= */}
        <section
          ref={ctaRef}
          className="reveal-init relative overflow-hidden border-t border-[#c5a059]/20 bg-gradient-to-b from-[#0b0f17] to-[#06090e] py-28 text-center"
        >
          {/* Ambient Glow Center */}
          <div className="pointer-events-none absolute left-1/2 top-1/2 h-[450px] w-[650px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#c5a059]/10 blur-[120px]" />

          <div className="relative mx-auto max-w-4xl px-5 sm:px-8">
            <StallionMark className="mx-auto h-12 w-12 text-[#c5a059]" />

            <span className="mt-6 inline-block font-mono-ui text-[10px] uppercase tracking-[0.3em] text-[#c5a059]">
              Your Night, On Your Terms
            </span>

            <h2 className="font-editorial mt-4 text-4xl font-normal leading-tight text-[#f4ede2] sm:text-6xl lg:text-7xl">
              Keep something extraordinary <br />
              <em className="text-gold-gradient italic">for yourself.</em>
            </h2>

            <p className="mx-auto mt-6 max-w-lg text-base leading-relaxed text-[#9aa4b5]">
              Order Midnight Drive today. Delivered across Pakistan in a plain, unmarked box — no one will know what is inside. Pay cash when it arrives at your door. Feel the difference from night one.
            </p>

            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <button
                type="button"
                onClick={() => handleShopifyOrder(1)}
                disabled={isCheckingOut}
                className="gold-glow-button group relative flex items-center justify-center gap-3 overflow-hidden rounded-xl px-10 py-4 font-mono-ui text-xs font-bold uppercase tracking-[0.2em] text-[#0b0f17] transition-all disabled:opacity-80"
                data-testid="final-cta-order-btn"
              >
                <span className="btn-shine" />
                {isCheckingOut ? (
                  <>
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-[#0b0f17] border-t-transparent" />
                    <span>Redirecting to Shopify Checkout...</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="h-4 w-4 transition-transform group-hover:scale-110" />
                    <span>Claim Pre-Launch Offer · PKR 2,499 (COD)</span>
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </>
                )}
              </button>
            </div>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-6 font-mono-ui text-[11px] uppercase tracking-wider text-[#8c97a8]">
              <span className="flex items-center gap-1.5">
                <Truck className="h-3.5 w-3.5 text-[#c5a059]" /> Free Pakistan Delivery
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <Lock className="h-3.5 w-3.5 text-[#c5a059]" /> 100% Anonymous Parcel
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="h-3.5 w-3.5 text-[#c5a059]" /> Pay on Arrival
              </span>
            </div>
          </div>
        </section>
      </main>

      {/* ========================================================================= */}
      {/* 12. LUXURY FOOTER */}
      {/* ========================================================================= */}
      <footer className="border-t border-[#c5a059]/15 bg-[#05080e] py-16 text-[#8c97a8]">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-12">
            {/* Brand Column */}
            <div className="lg:col-span-5">
              <div className="flex flex-col gap-0.5">
                <span className="font-cinzel text-lg font-extrabold tracking-[0.25em] text-[#f4ede2]">
                  THE MEN'S AURA
                </span>
                <span className="font-mono-ui text-[8px] uppercase tracking-[0.4em] text-[#c5a059]">
                  Midnight Drive
                </span>
              </div>
              <p className="mt-4 max-w-sm text-xs leading-relaxed text-[#6f7a8b]">
                The Men's Aura is a premium online male wellness brand dedicated to delivering authentic cold-pressed botanical formulations directly to your doorstep.
              </p>
              <div className="mt-6 flex flex-col gap-2 text-xs">
                <a
                  href="https://wa.me/923110355309?text=Hello%20The%20Men's%20Aura%20Support"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-[#25D366] hover:underline"
                >
                  <MessageCircle className="h-3.5 w-3.5" />
                  <span className="font-bold">WhatsApp: +92 311 0355 309 (Text Support)</span>
                </a>
                <div className="flex items-center gap-2 text-[#e5c583]">
                  <Mail className="h-3.5 w-3.5 text-[#c5a059]" />
                  <span>support@themensauraofficial.com</span>
                </div>
                <div className="flex items-center gap-4 text-xs text-[#5c6675]">
                  <span className="flex items-center gap-1.5 text-[#c5a059]">
                    <Globe className="h-3.5 w-3.5" /> Pakistan COD
                  </span>
                  <span>•</span>
                  <span className="font-mono-ui text-[10px]">Pre-Launch Batch #MD-042</span>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div className="lg:col-span-3">
              <h4 className="font-mono-ui text-[11px] uppercase tracking-[0.25em] text-[#c5a059]">
                Navigation
              </h4>
              <ul className="mt-4 space-y-2 text-xs">
                <li>
                  <a href="#why-midnight-drive" className="transition-colors hover:text-[#e5c583]">
                    Why Midnight Drive
                  </a>
                </li>
                <li>
                  <a href="#ritual" className="transition-colors hover:text-[#e5c583]">
                    How To Use Ritual
                  </a>
                </li>
                <li>
                  <a href="#science" className="transition-colors hover:text-[#e5c583]">
                    The Science of Heat
                  </a>
                </li>
                <li>
                  <a href="#actives" className="transition-colors hover:text-[#e5c583]">
                    5 Pure Actives
                  </a>
                </li>
                <li>
                  <a href="#blogs" className="transition-colors hover:text-[#e5c583]">
                    SEO Journal & Blogs
                  </a>
                </li>
                <li>
                  <a href="#contact" className="transition-colors hover:text-[#e5c583]">
                    Contact & WhatsApp Support
                  </a>
                </li>
                <li>
                  <a href="#faq" className="transition-colors hover:text-[#e5c583]">
                    Product FAQ
                  </a>
                </li>
              </ul>
            </div>

            {/* Safety & Compliance Notice */}
            <div className="lg:col-span-4">
              <h4 className="font-mono-ui text-[11px] uppercase tracking-[0.25em] text-[#c5a059]">
                Safety & Usage
              </h4>
              <p className="mt-4 text-[11px] leading-relaxed text-[#5c6675]">
                For external massage use only. Store in a cool, dry place away from direct sunlight. Not formulated for damaged or broken skin. Handcrafted with authentic cold-pressed botanical extracts.
              </p>
              <div className="mt-5 flex items-center gap-2 text-[11px] text-[#8c97a8]">
                <ShieldCheck className="h-4 w-4 text-[#c5a059]" />
                <span>100% Natural Guarantee</span>
              </div>
            </div>
          </div>

          {/* Bottom Copyright */}
          <div className="mt-14 flex flex-col justify-between gap-4 border-t border-[#c5a059]/10 pt-8 text-[11px] text-[#5c6675] sm:flex-row">
            <div>© 2026 The Men's Aura. All rights reserved.</div>
            <div className="font-mono-ui uppercase tracking-wider text-[#c5a059]/70">
              support@themensauraofficial.com
            </div>
          </div>
        </div>
      </footer>

      {/* Cash on Delivery Modal */}
      {orderOpen && <OrderModal onClose={() => setOrderOpen(false)} />}

      {/* Floating Sticky CTA on Mobile */}
      <StickyMobileCTA onOrderClick={() => handleShopifyOrder(1)} />

      {/* Persistent WhatsApp Floating Concierge Button (+92 311 0355 309) */}
      <WhatsAppFloat />
    </div>
  );
}

function Router() {
  return (
    <RoutedErrorBoundary>
      <Switch>
        <Route path="/" component={Home} />
        <Route component={NotFound} />
      </Switch>
    </RoutedErrorBoundary>
  );
}

function RoutedErrorBoundary({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  return <ErrorBoundary resetKey={location}>{children}</ErrorBoundary>;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
