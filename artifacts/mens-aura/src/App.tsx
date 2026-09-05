import { useState, type ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import {
  ArrowRight,
  BookOpen,
  ChevronDown,
  Compass,
  Film,
  Flame,
  Globe,
  HelpCircle,
  Lock,
  Mail,
  Menu,
  MessageCircle,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Star,
  Truck,
  X,
} from 'lucide-react';
import { Link, Route, Switch, Router as WouterRouter, useLocation } from 'wouter';

import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';

import { AmbientParticles } from '@/components/AmbientParticles';
import { LuxuryCursor } from '@/components/LuxuryCursor';
import { OrderModal } from '@/components/OrderModal';
import { StickyMobileCTA } from '@/components/StickyMobileCTA';
import { WhatsAppFloat } from '@/components/WhatsAppFloat';
import { redirectToShopifyCheckout } from '@/lib/shopify';

import { HomePage } from '@/pages/HomePage';
import { SciencePage } from '@/pages/SciencePage';
import { StoryPage } from '@/pages/StoryPage';
import { JournalPage } from '@/pages/JournalPage';
import { ContactPage } from '@/pages/ContactPage';
import NotFound from '@/pages/not-found';

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

function MainLayout() {
  const [orderOpen, setOrderOpen] = useState(false);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [location] = useLocation();

  const handleOrder = (qty: number = 1) => {
    setIsCheckingOut(true);
    try {
      redirectToShopifyCheckout(qty);
    } catch {
      setIsCheckingOut(false);
      setOrderOpen(true);
    }
  };

  return (
    <div className="relative min-h-screen w-full max-w-[100vw] overflow-x-hidden bg-[#0b0f17] text-[#f4ede2] selection:bg-[#c5a059] selection:text-[#0b0f17]">
      {/* Luxury Interactive Cursor Glow (Desktop) */}
      <LuxuryCursor />

      {/* Background Film Grain Overlay */}
      <div className="noise-overlay" />

      {/* Floating Golden Ember Particles */}
      <AmbientParticles />

      {/* Ambient Gradient Mesh Background */}
      <div className="ambient-mesh pointer-events-none fixed inset-0 z-0" />

      {/* Desktop Top Announcement Ribbon */}
      <div className="relative z-50 hidden sm:block border-b border-[#c5a059]/20 bg-[#070a10]/95 px-4 py-2 text-center text-xs backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-center gap-6">
          <span className="flex items-center gap-1.5 font-mono-ui text-[10px] uppercase tracking-[0.2em] text-[#e5c583]">
            <Sparkles className="h-3 w-3 text-[#c5a059]" /> Pre-Launch Batch: PKR 2,499 <span className="line-through text-[#8c97a8]">PKR 3,000</span>
          </span>
          <span className="text-[#c5a059]/40">•</span>
          <span className="flex items-center gap-1.5 font-mono-ui text-[10px] uppercase tracking-[0.2em] text-[#8c97a8]">
            <Lock className="h-3 w-3 text-[#c5a059]" /> 100% Discreet Unbranded Packaging
          </span>
          <span className="text-[#c5a059]/40">•</span>
          <span className="flex items-center gap-1.5 font-mono-ui text-[10px] uppercase tracking-[0.2em] text-[#c5a059]">
            <Truck className="h-3 w-3" /> Free Express COD All Across Pakistan
          </span>
        </div>
      </div>

      {/* Mobile Top Announcement Streaming Ticker */}
      <div className="relative z-50 block sm:hidden overflow-hidden border-b border-[#c5a059]/20 bg-[#070a10]/95 py-2 backdrop-blur-md marquee-container">
        <div className="marquee-track flex items-center gap-6 whitespace-nowrap font-mono-ui text-[10px] uppercase tracking-wider text-[#e5c583]">
          {Array.from({ length: 4 }).flatMap((_, loopIdx) => (
            <div key={loopIdx} className="flex items-center gap-6">
              <span className="flex items-center gap-1 text-[#e5c583]">
                <Sparkles className="h-3 w-3 text-[#c5a059]" /> Pre-Launch Batch: PKR 2,499 <span className="line-through text-[#8c97a8] ml-1">PKR 3,000</span>
              </span>
              <span className="text-[#c5a059]/40">•</span>
              <span className="flex items-center gap-1 text-[#8c97a8]">
                <Lock className="h-3 w-3 text-[#c5a059]" /> 100% Discreet Packaging
              </span>
              <span className="text-[#c5a059]/40">•</span>
              <span className="flex items-center gap-1 text-[#c5a059]">
                <Truck className="h-3 w-3" /> Free Express COD Pakistan
              </span>
              <span className="text-[#c5a059]/40">•</span>
            </div>
          ))}
        </div>
      </div>

      {/* Main Glass Navigation */}
      <header className="sticky top-0 z-40 border-b border-[#c5a059]/15 bg-[#0b0f17]/85 backdrop-blur-xl transition-all duration-300">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8">
          {/* Logo Wordmark */}
          <Link
            href="/"
            className="group flex flex-col justify-center transition-transform duration-300 hover:scale-[1.02]"
            data-testid="brand-logo"
          >
            <span className="font-cinzel text-lg font-extrabold tracking-[0.25em] text-[#f4ede2] transition-colors group-hover:text-[#e5c583]">
              THE MEN'S AURA
            </span>
            <span className="font-mono-ui text-[8px] uppercase tracking-[0.4em] text-[#c5a059]">
              Midnight Drive
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden items-center gap-8 md:flex" aria-label="Main Navigation">
            <Link
              href="/"
              className={`font-mono-ui text-xs uppercase tracking-[0.2em] transition-colors py-2 font-medium ${
                location === '/' ? 'text-[#e5c583] font-semibold' : 'text-[#8c97a8] hover:text-[#e5c583]'
              }`}
            >
              Home
            </Link>

            <Link
              href="/science"
              className={`font-mono-ui text-xs uppercase tracking-[0.2em] transition-colors py-2 font-medium ${
                location === '/science' ? 'text-[#e5c583] font-semibold' : 'text-[#8c97a8] hover:text-[#e5c583]'
              }`}
            >
              Science & Timeline
            </Link>

            <Link
              href="/story"
              className={`font-mono-ui text-xs uppercase tracking-[0.2em] transition-colors py-2 font-medium ${
                location === '/story' ? 'text-[#e5c583] font-semibold' : 'text-[#8c97a8] hover:text-[#e5c583]'
              }`}
            >
              Product Film
            </Link>

            <Link
              href="/journal"
              className={`font-mono-ui text-xs uppercase tracking-[0.2em] transition-colors py-2 font-medium ${
                location === '/journal' ? 'text-[#e5c583] font-semibold' : 'text-[#8c97a8] hover:text-[#e5c583]'
              }`}
            >
              Journal
            </Link>

            <Link
              href="/contact"
              className={`font-mono-ui text-xs uppercase tracking-[0.2em] transition-colors py-2 font-medium ${
                location === '/contact' ? 'text-[#e5c583] font-semibold' : 'text-[#8c97a8] hover:text-[#e5c583]'
              }`}
            >
              Contact & Concierge
            </Link>
          </nav>

          {/* Header Action CTA */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => handleOrder(1)}
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
              <Link
                href="/"
                onClick={() => setMobileMenuOpen(false)}
                className="font-mono-ui text-xs font-semibold uppercase tracking-widest text-[#e5c583]"
              >
                Home
              </Link>
              <Link
                href="/science"
                onClick={() => setMobileMenuOpen(false)}
                className="font-mono-ui text-xs uppercase tracking-widest text-[#8c97a8]"
              >
                Science & Timeline
              </Link>
              <Link
                href="/story"
                onClick={() => setMobileMenuOpen(false)}
                className="font-mono-ui text-xs uppercase tracking-widest text-[#8c97a8]"
              >
                Product Film
              </Link>
              <Link
                href="/journal"
                onClick={() => setMobileMenuOpen(false)}
                className="font-mono-ui text-xs uppercase tracking-widest text-[#8c97a8]"
              >
                Journal & Articles
              </Link>
              <Link
                href="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className="font-mono-ui text-xs uppercase tracking-widest text-[#8c97a8]"
              >
                Contact Support
              </Link>
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  handleOrder(1);
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

      {/* Main Page Content Area */}
      <main className="pb-28 md:pb-0">
        <Switch>
          <Route path="/">
            <HomePage onOrderClick={handleOrder} isCheckingOut={isCheckingOut} />
          </Route>
          <Route path="/science">
            <SciencePage />
          </Route>
          <Route path="/story">
            <StoryPage />
          </Route>
          <Route path="/journal">
            <JournalPage />
          </Route>
          <Route path="/contact">
            <ContactPage />
          </Route>
          <Route component={NotFound} />
        </Switch>

        {/* FINAL OBSIDIAN GRAND FINALE CTA */}
        <section className="relative overflow-hidden border-t border-[#c5a059]/20 bg-gradient-to-b from-[#0b0f17] to-[#06090e] py-24 text-center">
          <div className="pointer-events-none absolute left-1/2 top-1/2 h-[450px] w-[650px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#c5a059]/10 blur-[120px]" />

          <div className="relative mx-auto max-w-4xl px-5 sm:px-8">
            <StallionMark className="mx-auto h-12 w-12 text-[#c5a059]" />

            <span className="mt-6 inline-block font-mono-ui text-[10px] uppercase tracking-[0.3em] text-[#c5a059]">
              Your Night, On Your Terms
            </span>

            <h2 className="font-editorial mt-4 text-3xl font-normal leading-tight text-[#f4ede2] sm:text-6xl">
              Keep something extraordinary <br />
              <em className="text-gold-gradient italic">for yourself.</em>
            </h2>

            <p className="mx-auto mt-6 max-w-lg text-sm leading-relaxed text-[#9aa4b5]">
              Order Midnight Drive today. Delivered across Pakistan in a plain, unmarked box — no one will know what is inside. Pay cash when it arrives at your door. Feel the difference from night one.
            </p>

            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <button
                type="button"
                onClick={() => handleOrder(1)}
                disabled={isCheckingOut}
                className="gold-glow-button group relative flex items-center justify-center gap-3 overflow-hidden rounded-xl px-10 py-4 font-mono-ui text-xs font-bold uppercase tracking-[0.2em] text-[#0b0f17] transition-all disabled:opacity-80"
                data-testid="final-cta-order-btn"
              >
                <span className="btn-shine" />
                {isCheckingOut ? (
                  <>
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-[#0b0f17] border-t-transparent" />
                    <span>Redirecting to Checkout...</span>
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
          </div>
        </section>
      </main>

      {/* LUXURY FOOTER */}
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
                  className="flex items-center gap-2 text-[#e5c583] hover:text-[#c5a059] transition-colors"
                >
                  <MessageCircle className="h-3.5 w-3.5 text-[#c5a059]" />
                  <span className="font-semibold">Official WhatsApp Support Concierge</span>
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
                  <Link href="/" className="transition-colors hover:text-[#e5c583]">
                    Home (Clean Page)
                  </Link>
                </li>
                <li>
                  <Link href="/science" className="transition-colors hover:text-[#e5c583]">
                    Science & Heat Timeline
                  </Link>
                </li>
                <li>
                  <Link href="/story" className="transition-colors hover:text-[#e5c583]">
                    Product Film Showcase
                  </Link>
                </li>
                <li>
                  <Link href="/journal" className="transition-colors hover:text-[#e5c583]">
                    SEO Journal & Articles
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="transition-colors hover:text-[#e5c583]">
                    Contact & WhatsApp Support
                  </Link>
                </li>
              </ul>
            </div>

            {/* Safety Notice */}
            <div className="lg:col-span-4">
              <h4 className="font-mono-ui text-[11px] uppercase tracking-[0.25em] text-[#c5a059]">
                Safety & Usage
              </h4>
              <p className="mt-4 text-[11px] leading-relaxed text-[#5c6675]">
                For external massage use only. Store in a cool, dry place away from direct sunlight. Not formulated for damaged skin. Handcrafted with authentic cold-pressed botanical extracts.
              </p>
              <div className="mt-5 flex items-center gap-2 text-[11px] text-[#8c97a8]">
                <ShieldCheck className="h-4 w-4 text-[#c5a059]" />
                <span>100% Natural Guarantee</span>
              </div>
            </div>
          </div>

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
      <StickyMobileCTA onOrderClick={() => handleOrder(1)} />

      {/* Persistent WhatsApp Floating Concierge Button */}
      <WhatsAppFloat />
    </div>
  );
}

function Router() {
  return (
    <RoutedErrorBoundary>
      <Switch>
        <Route path="/" component={MainLayout} />
        <Route path="/science" component={MainLayout} />
        <Route path="/story" component={MainLayout} />
        <Route path="/journal" component={MainLayout} />
        <Route path="/contact" component={MainLayout} />
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
