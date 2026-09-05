import { ShoppingBag, MessageCircle, ShieldCheck } from 'lucide-react';

interface StickyMobileCTAProps {
  onOrderClick: () => void;
}

export function StickyMobileCTA({ onOrderClick }: StickyMobileCTAProps) {
  const handleWhatsAppClick = () => {
    const text = encodeURIComponent(
      "Hello The Men's Aura Support! I want to order Midnight Drive 30ml (PKR 2,499) Cash on Delivery. Please confirm my order."
    );
    window.open(`https://wa.me/923110355309?text=${text}`, '_blank');
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 w-full max-w-[100vw] box-border border-t border-[#c5a059]/40 bg-[#070b12]/98 px-2.5 py-2 backdrop-blur-2xl transition-all duration-300 md:hidden animate-in slide-in-from-bottom duration-300 shadow-[0_-10px_30px_rgba(0,0,0,0.9)]">
      {/* Simple Trust Micro Banner */}
      <div className="mb-1 flex items-center justify-between px-1 text-[8.5px] sm:text-[9px] font-medium text-[#e5c583]">
        <span className="flex items-center gap-1 min-w-0 truncate">
          <ShieldCheck className="h-3 w-3 shrink-0 text-[#c5a059]" />
          <span className="truncate">Saada Secret Box (No Name)</span>
        </span>
        <span className="text-[#8c97a8] shrink-0 ml-1">Pehle Parcel, Phir Cash</span>
      </div>

      <div className="grid grid-cols-2 gap-1.5 min-w-0 w-full">
        {/* COD Form Order Button */}
        <button
          type="button"
          onClick={onOrderClick}
          className="gold-glow-button relative flex min-w-0 w-full items-center justify-center gap-1 overflow-hidden rounded-xl py-2.5 px-1 font-mono-ui text-[10px] sm:text-[10.5px] font-bold uppercase tracking-wider text-[#0b0f17]"
          data-testid="mobile-sticky-order-btn"
        >
          <span className="btn-shine" />
          <ShoppingBag className="h-3.5 w-3.5 shrink-0" />
          <span className="truncate">ORDER NOW (2,499)</span>
        </button>

        {/* 1-Click WhatsApp Direct Order Button */}
        <button
          type="button"
          onClick={handleWhatsAppClick}
          className="flex min-w-0 w-full items-center justify-center gap-1 rounded-xl border border-[#c5a059]/50 bg-[#0d1422] py-2.5 px-1 font-mono-ui text-[10px] sm:text-[10.5px] font-bold uppercase tracking-wider text-[#e5c583] hover:bg-[#c5a059]/20 transition-colors"
          data-testid="mobile-sticky-whatsapp-btn"
        >
          <MessageCircle className="h-3.5 w-3.5 shrink-0 text-[#c5a059]" />
          <span className="truncate">WhatsApp Order</span>
        </button>
      </div>
    </div>
  );
}
