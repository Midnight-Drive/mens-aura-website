import { useState, type FormEvent } from 'react';
import { Mail, MessageCircle, Phone, Clock, MapPin, Send, CheckCircle2, ShieldCheck, Lock } from 'lucide-react';
import { Card3D } from './Card3D';

export function ContactSection() {
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!name || !phone) return;
    setSubmitted(true);
  };

  return (
    <section
      id="contact"
      className="border-t border-[#c5a059]/15 bg-gradient-to-b from-[#070b12] via-[#0b101a] to-[#070b12] py-24 sm:py-32"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        {/* Header */}
        <div className="text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#c5a059]/30 bg-[#c5a059]/10 px-4 py-1.5 font-mono-ui text-[10px] uppercase tracking-[0.25em] text-[#e5c583]">
            <Lock className="h-3.5 w-3.5 text-[#c5a059]" /> 100% Confidential Support Concierge
          </div>
          <h2 className="font-editorial mx-auto mt-4 max-w-3xl text-4xl font-normal text-[#f4ede2] sm:text-5xl lg:text-6xl">
            Contact <em className="text-gold-gradient italic">The Men's Aura.</em>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-[#9aa4b5]">
            Have a question about Midnight Drive, discreet packaging, or order tracking? Reach our private support concierge anytime via WhatsApp or Email.
          </p>
        </div>

        {/* Contact Cards Grid */}
        <div className="mt-16 grid gap-8 lg:grid-cols-12 lg:gap-12">
          {/* Left Column: Official Direct Support Channels */}
          <div className="flex flex-col gap-6 lg:col-span-5">
            {/* Official WhatsApp Card */}
            <Card3D depth={8}>
              <div className="glass-obsidian-card group relative flex flex-col justify-between rounded-3xl p-8 border border-[#25D366]/30 bg-gradient-to-br from-[#091410] to-[#070b12]">
                <div>
                  <div className="flex items-center justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-[#25D366]/40 bg-[#25D366]/15 text-[#25D366] shadow-[0_0_20px_rgba(37,211,102,0.2)]">
                      <MessageCircle className="h-6 w-6" />
                    </div>
                    <span className="inline-flex items-center gap-1 rounded-full border border-[#25D366]/40 bg-[#25D366]/10 px-3 py-1 font-mono-ui text-[10px] text-[#25D366]">
                      <span className="h-2 w-2 rounded-full bg-[#25D366] animate-pulse" /> Fastest Response
                    </span>
                  </div>

                  <h3 className="font-editorial mt-6 text-2xl font-semibold text-[#f4ede2]">
                    Official WhatsApp Support
                  </h3>
                  <p className="font-mono-ui mt-1 text-sm font-bold text-[#25D366]">
                    +92 311 0355 309
                  </p>
                  <p className="mt-3 text-xs leading-relaxed text-[#9aa4b5]">
                    Text-only WhatsApp concierge. Message us for fast order confirmation, shipment tracking, or usage advice. Responds within 15 minutes.
                  </p>
                </div>

                <div className="mt-8 border-t border-[#25D366]/20 pt-5">
                  <a
                    href="https://wa.me/923110355309?text=Hello%20The%20Men's%20Aura%20Support%2C%20I%20have%20a%20question%20about%20Midnight%20Drive"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex w-full items-center justify-center gap-2.5 rounded-xl bg-[#25D366] py-3.5 font-mono-ui text-xs font-bold uppercase tracking-wider text-[#070b12] transition-transform duration-300 hover:scale-[1.02] shadow-[0_0_25px_rgba(37,211,102,0.3)]"
                    data-testid="whatsapp-contact-btn"
                  >
                    <MessageCircle className="h-4 w-4" />
                    <span>Chat on WhatsApp (+92 311 0355 309)</span>
                  </a>
                </div>
              </div>
            </Card3D>

            {/* Official Email Card */}
            <Card3D depth={8}>
              <div className="glass-obsidian-card group relative flex flex-col justify-between rounded-3xl p-8 border border-[#c5a059]/30 bg-[#090e17]">
                <div>
                  <div className="flex items-center justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-[#c5a059]/40 bg-[#c5a059]/15 text-[#e5c583]">
                      <Mail className="h-6 w-6" />
                    </div>
                    <span className="font-mono-ui text-[10px] text-[#8c97a8]">Email Concierge</span>
                  </div>

                  <h3 className="font-editorial mt-6 text-2xl font-semibold text-[#f4ede2]">
                    Official Email Support
                  </h3>
                  <p className="font-mono-ui mt-1 text-xs font-bold text-[#c5a059]">
                    support@themensauraofficial.com
                  </p>
                  <p className="mt-3 text-xs leading-relaxed text-[#9aa4b5]">
                    Dedicated email concierge for detailed inquiries, bulk orders, and private client support. Replies within 2 to 4 hours.
                  </p>
                </div>

                <div className="mt-8 border-t border-[#c5a059]/15 pt-5">
                  <a
                    href="mailto:support@themensauraofficial.com"
                    className="flex w-full items-center justify-center gap-2.5 rounded-xl border border-[#c5a059]/40 bg-[#0d1422] py-3.5 font-mono-ui text-xs font-bold uppercase tracking-wider text-[#e5c583] transition-colors hover:bg-[#c5a059] hover:text-[#0b0f17]"
                    data-testid="email-contact-btn"
                  >
                    <Mail className="h-4 w-4" />
                    <span>Send Official Email</span>
                  </a>
                </div>
              </div>
            </Card3D>
          </div>

          {/* Right Column: Confidential Direct Message Form */}
          <div className="lg:col-span-7">
            <div className="glass-obsidian-card rounded-3xl p-8 sm:p-10 border border-[#c5a059]/30 bg-[#090e17]">
              <div className="flex items-center gap-2 font-mono-ui text-xs text-[#c5a059] uppercase tracking-wider">
                <ShieldCheck className="h-4 w-4" /> 100% Private Message Box
              </div>
              <h3 className="font-editorial mt-2 text-2xl sm:text-3xl font-semibold text-[#f4ede2]">
                Send a Direct Message
              </h3>
              <p className="mt-2 text-xs text-[#8c97a8]">
                Fill out the form below. Your contact details are kept strictly confidential under our Privacy Policy.
              </p>

              {submitted ? (
                <div className="mt-8 rounded-2xl border border-[#c5a059]/40 bg-[#0d1524] p-8 text-center animate-in fade-in duration-300">
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-[#c5a059]/40 bg-[#c5a059]/15 text-[#e5c583]">
                    <CheckCircle2 className="h-8 w-8 text-[#c5a059]" />
                  </div>
                  <h4 className="font-editorial mt-4 text-2xl font-semibold text-[#f4ede2]">
                    Message Sent Successfully!
                  </h4>
                  <p className="mt-2 text-xs leading-relaxed text-[#9aa4b5]">
                    Thank you <strong className="text-[#f4ede2]">{name}</strong>. Our private customer concierge will get back to you at <strong className="text-[#f4ede2]">{phone}</strong> within 15 minutes.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setSubmitted(false);
                      setName('');
                      setPhone('');
                      setEmail('');
                      setMessage('');
                    }}
                    className="mt-6 font-mono-ui text-xs font-bold uppercase tracking-wider text-[#c5a059] underline hover:text-[#ffffff]"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label className="block font-mono-ui text-[11px] uppercase tracking-wider text-[#c5a059]">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Ali Ahmed"
                        className="mt-2 w-full rounded-xl border border-[#c5a059]/25 bg-[#070b12] px-4 py-3.5 text-sm text-[#f4ede2] placeholder-[#5c6675] focus:border-[#c5a059] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block font-mono-ui text-[11px] uppercase tracking-wider text-[#c5a059]">
                        WhatsApp / Phone *
                      </label>
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="03xx xxxxxxx"
                        className="mt-2 w-full rounded-xl border border-[#c5a059]/25 bg-[#070b12] px-4 py-3.5 text-sm text-[#f4ede2] placeholder-[#5c6675] focus:border-[#c5a059] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-mono-ui text-[11px] uppercase tracking-wider text-[#c5a059]">
                      Email Address (Optional)
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="your.email@domain.com"
                      className="mt-2 w-full rounded-xl border border-[#c5a059]/25 bg-[#070b12] px-4 py-3.5 text-sm text-[#f4ede2] placeholder-[#5c6675] focus:border-[#c5a059] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block font-mono-ui text-[11px] uppercase tracking-wider text-[#c5a059]">
                      Your Message / Inquiry
                    </label>
                    <textarea
                      rows={4}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Write your question about product usage, discreet delivery, or order status..."
                      className="mt-2 w-full rounded-xl border border-[#c5a059]/25 bg-[#070b12] px-4 py-3.5 text-sm text-[#f4ede2] placeholder-[#5c6675] focus:border-[#c5a059] focus:outline-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="gold-glow-button flex w-full items-center justify-center gap-2 rounded-xl py-4 font-mono-ui text-xs font-bold uppercase tracking-[0.2em] text-[#0b0f17] transition-all hover:scale-[1.01]"
                    data-testid="contact-submit-btn"
                  >
                    <Send className="h-4 w-4" />
                    <span>Send Message to Support</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
