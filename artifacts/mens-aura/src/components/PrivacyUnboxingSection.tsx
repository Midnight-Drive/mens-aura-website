import { useState } from 'react';
import { Lock, PackageCheck, Eye, ShieldCheck, CheckCircle2, Truck } from 'lucide-react';
import { Card3D } from './Card3D';

export function PrivacyUnboxingSection() {
  const [viewMode, setViewMode] = useState<'outer' | 'inner'>('outer');

  return (
    <section
      id="discretion"
      className="relative border-t border-[#c5a059]/15 bg-gradient-to-b from-[#070b12] via-[#090e17] to-[#070b12] py-24 sm:py-32 overflow-hidden"
    >
      {/* Glow Orbs */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[450px] w-[450px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#c5a059]/5 blur-[120px]" />

      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-8">
        {/* Section Header */}
        <div className="text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#c5a059]/30 bg-[#c5a059]/10 px-4 py-1.5 font-mono-ui text-[10px] uppercase tracking-[0.25em] text-[#e5c583]">
            <Lock className="h-3.5 w-3.5 text-[#c5a059]" /> 100% Discreet Packaging Covenant
          </div>
          <h2 className="font-editorial mx-auto mt-4 max-w-3xl text-4xl font-normal text-[#f4ede2] sm:text-5xl lg:text-6xl">
            Zero Product Name <em className="text-gold-gradient italic">On Outer Box.</em>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-[#9aa4b5]">
            We respect your privacy above all else. Every 30ml Midnight Drive order is shipped in a plain, unbranded outer parcel. Family members, roommates, or courier riders will never know what is inside.
          </p>
        </div>

        {/* Interactive Unboxing Toggle Box */}
        <div className="mt-14 mx-auto max-w-4xl">
          {/* Toggle Tab Switcher */}
          <div className="flex items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => setViewMode('outer')}
              className={`flex items-center gap-2 rounded-2xl px-6 py-3 font-mono-ui text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
                viewMode === 'outer'
                  ? 'border border-[#c5a059] bg-[#c5a059] text-[#070b12] shadow-[0_0_20px_rgba(197,160,89,0.35)]'
                  : 'border border-[#c5a059]/30 bg-[#090e17] text-[#8c97a8] hover:border-[#c5a059]/60 hover:text-[#f4ede2]'
              }`}
              data-testid="unboxing-outer-tab"
            >
              <PackageCheck className="h-4 w-4" />
              <span>1. Outer Box (What Courier & Family Sees)</span>
            </button>

            <button
              type="button"
              onClick={() => setViewMode('inner')}
              className={`flex items-center gap-2 rounded-2xl px-6 py-3 font-mono-ui text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
                viewMode === 'inner'
                  ? 'border border-[#c5a059] bg-[#c5a059] text-[#070b12] shadow-[0_0_20px_rgba(197,160,89,0.35)]'
                  : 'border border-[#c5a059]/30 bg-[#090e17] text-[#8c97a8] hover:border-[#c5a059]/60 hover:text-[#f4ede2]'
              }`}
              data-testid="unboxing-inner-tab"
            >
              <Eye className="h-4 w-4" />
              <span>2. Inside Box (Your Private 30ml Bottle)</span>
            </button>
          </div>

          {/* Interactive Visual Stage */}
          <div className="mt-8 grid gap-8 lg:grid-cols-12 items-center">
            {/* Visual Box Container */}
            <div className="lg:col-span-7">
              <Card3D depth={10}>
                <div className="relative overflow-hidden rounded-3xl border border-[#c5a059]/30 bg-[#070a10] p-8 text-center shadow-2xl">
                  {viewMode === 'outer' ? (
                    /* Outer Box Visual */
                    <div className="flex flex-col items-center py-6 animate-in fade-in duration-300">
                      <div className="relative flex h-52 w-64 items-center justify-center rounded-2xl border-2 border-dashed border-[#5c6675]/40 bg-[#121927] p-6 shadow-inner">
                        <div className="flex flex-col items-center">
                          <PackageCheck className="h-16 w-16 text-[#8c97a8]" />
                          <span className="font-mono-ui mt-3 text-[11px] font-bold uppercase tracking-widest text-[#9aa4b5]">
                            Plain Cardboard Parcel
                          </span>
                          <span className="mt-1 rounded-md bg-[#070b12] px-3 py-1 font-mono-ui text-[9px] text-[#c5a059]">
                            Label: "Personal Healthcare Care"
                          </span>
                        </div>

                        {/* Stamp */}
                        <div className="absolute right-3 top-3 rounded-lg border border-[#c5a059]/40 bg-[#070b12]/90 px-2.5 py-1 font-mono-ui text-[8px] uppercase tracking-widest text-[#e5c583]">
                          Confidential COD
                        </div>
                      </div>

                      <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 text-xs text-emerald-400">
                        <CheckCircle2 className="h-4 w-4" />
                        <span>100% Anonymous Delivery — Zero Brand Name Outside</span>
                      </div>
                    </div>
                  ) : (
                    /* Inner Bottle Visual */
                    <div className="flex flex-col items-center py-4 animate-in fade-in duration-300">
                      <img
                        src="/assets/midnight-drive.png"
                        alt="Midnight Drive 30ml Amber Glass Bottle & Box"
                        className="h-60 w-auto object-contain filter drop-shadow-[0_20px_40px_rgba(0,0,0,0.9)]"
                      />
                      <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-[#c5a059]/40 bg-[#c5a059]/15 px-4 py-1.5 font-mono-ui text-xs font-bold text-[#e5c583]">
                        <ShieldCheck className="h-4 w-4 text-[#c5a059]" />
                        <span>Midnight Drive 30ml Amber Glass Dropper Bottle</span>
                      </div>
                    </div>
                  )}
                </div>
              </Card3D>
            </div>

            {/* Explanatory Bullet Points */}
            <div className="lg:col-span-5 flex flex-col justify-center space-y-5">
              <div className="rounded-2xl border border-[#c5a059]/20 bg-[#090e17] p-5">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#c5a059]/15 text-[#e5c583]">
                    <Lock className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-editorial text-base font-semibold text-[#f4ede2]">
                      Plain Outer Shipping Box
                    </h4>
                    <p className="text-xs text-[#8c97a8]">
                      No mention of "vitality", "oil", or "men's aura" on the outside parcel label.
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-[#c5a059]/20 bg-[#090e17] p-5">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#c5a059]/15 text-[#e5c583]">
                    <Truck className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-editorial text-base font-semibold text-[#f4ede2]">
                      Discreet Rider Delivery
                    </h4>
                    <p className="text-xs text-[#8c97a8]">
                      Handed directly to you via TCS / Trax rider in a sealed tamper-proof bag.
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-[#c5a059]/20 bg-[#090e17] p-5">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#c5a059]/15 text-[#e5c583]">
                    <ShieldCheck className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-editorial text-base font-semibold text-[#f4ede2]">
                      Confidential Invoice
                    </h4>
                    <p className="text-xs text-[#8c97a8]">
                      Invoice is placed inside the inner box, invisible from outside parcel.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
