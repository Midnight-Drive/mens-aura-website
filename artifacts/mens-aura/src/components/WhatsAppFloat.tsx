import { MessageCircle } from 'lucide-react';

export function WhatsAppFloat() {
  return (
    <a
      href="https://wa.me/923110355309?text=Hello%20The%20Men's%20Aura%20Support%2C%20I%20have%20a%20question%20about%20Midnight%20Drive"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-40 flex items-center gap-2.5 rounded-full border border-[#c5a059]/40 bg-[#0b1019]/95 px-4 py-3 text-[#e5c583] shadow-[0_0_25px_rgba(197,160,89,0.25)] backdrop-blur-xl transition-all duration-300 hover:scale-105 hover:border-[#c5a059] hover:bg-[#c5a059] hover:text-[#0b0f17]"
      title="WhatsApp Concierge Support"
      data-testid="whatsapp-floating-btn"
    >
      <div className="relative flex h-6 w-6 items-center justify-center">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#c5a059] opacity-75" />
        <MessageCircle className="relative h-5 w-5 fill-current" />
      </div>
      <span className="font-mono-ui text-xs font-bold uppercase tracking-wider hidden sm:inline">
        WhatsApp Concierge
      </span>
    </a>
  );
}
