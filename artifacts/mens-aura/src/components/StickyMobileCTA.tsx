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
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-[#c5a059]/40 bg-[#070b12]/98 px-3 py-2.5 backdrop-blur-2xl transition-all duration-300 md:hidden animate-in slide-in-from-bottom duration-300 shadow-[0_-10px_30px_rgba(0,0,0,0.9)]">
      {/* Simple Trust Micro Banner */}
      <div className="mb-1.5 flex items-center justify-between px-1 text-[9px] sm:text-[9.5px] font-medium text-[#e5c583]">
        <span className="flex items-center gap-1">
          <ShieldCheck className="h-3 w-3 text-[#c5a059]" />
          <span>Saada Secret Box (No Name)</span>
        </span>
        <span className="text-[#8c97a8]">Pehle Parcel, Phir Cash</span>
      </div>

      <div className="grid grid-cols-2 gap-2">
        {/* COD Form Order Button */}
        <button
          type="button"
          onClick={onOrderClick}
          className="gold-glow-button relative flex items-center justify-center gap-1.5 overflow-hidden rounded-xl py-2.5 font-mono-ui text-[10.5px] font-bold uppercase tracking-wider text-[#0b0f17]"
          data-testid="mobile-sticky-order-btn"
        >
          <span className="btn-shine" />
          <ShoppingBag className="h-3.5 w-3.5" />
          <span>Order COD (2,499)</span>
        </button>

        {/* 1-Click WhatsApp Direct Order Button */}
        <button
          type="button"
          onClick={handleWhatsAppClick}
          className="flex items-center justify-center gap-1.5 rounded-xl border border-[#c5a059]/50 bg-[#0d1422] py-2.5 font-mono-ui text-[10.5px] font-bold uppercase tracking-wider text-[#e5c583] hover:bg-[#c5a059]/20 transition-colors"
          data-testid="mobile-sticky-whatsapp-btn"
        >
          <MessageCircle className="h-3.5 w-3.5 text-[#c5a059]" />
          <span>WhatsApp Order</span>
        </button>
      </div>
    </div>
  );
}
