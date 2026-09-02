import { MessageCircle } from 'lucide-react';

export function WhatsAppFloat() {
  return (
    <a
      href="https://wa.me/923110355309?text=Hello%20The%20Men's%20Aura%20Support%2C%20I%20have%20a%20question%20about%20Midnight%20Drive"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-40 flex items-center gap-2.5 rounded-full border border-[#25D366]/40 bg-[#070b12]/95 px-4 py-3 text-[#25D366] shadow-[0_0_30px_rgba(37,211,102,0.4)] backdrop-blur-xl transition-all duration-300 hover:scale-105 hover:bg-[#25D366] hover:text-[#070b12]"
      title="WhatsApp Support (+92 311 0355 309)"
      data-testid="whatsapp-floating-btn"
    >
      <div className="relative flex h-6 w-6 items-center justify-center">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#25D366] opacity-75" />
        <MessageCircle className="relative h-5 w-5 fill-current" />
      </div>
      <span className="font-mono-ui text-xs font-bold uppercase tracking-wider hidden sm:inline">
        WhatsApp Concierge (+92 311 0355 309)
      </span>
    </a>
  );
}
