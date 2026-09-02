import { useEffect, useState } from 'react';
import { ShoppingBag, ArrowRight } from 'lucide-react';

interface StickyMobileCTAProps {
  onOrderClick: () => void;
}

export function StickyMobileCTA({ onOrderClick }: StickyMobileCTAProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-[#c5a059]/30 bg-[#090e17]/95 p-3.5 backdrop-blur-xl transition-all duration-300 md:hidden animate-in slide-in-from-bottom duration-300">
      <div className="flex items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-1.5 font-mono-ui text-[9px] uppercase tracking-wider text-[#8c97a8]">
            <span>Pre-Launch</span>
            <span className="line-through">PKR 3,000</span>
          </div>
          <span className="font-cinzel text-base font-bold text-[#e5c583]">
            PKR 2,499 <span className="font-mono-ui text-[9px] text-[#8c97a8]">COD</span>
          </span>
        </div>

        <button
          type="button"
          onClick={onOrderClick}
          className="gold-glow-button relative flex flex-1 items-center justify-center gap-2 overflow-hidden rounded-xl py-3 font-mono-ui text-xs font-bold uppercase tracking-wider text-[#0b0f17]"
          data-testid="mobile-sticky-order-btn"
        >
          <span className="btn-shine" />
          <ShoppingBag className="h-3.5 w-3.5" />
          <span>Claim Offer</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
}
