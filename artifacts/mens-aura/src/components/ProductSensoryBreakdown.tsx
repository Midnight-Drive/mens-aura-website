import { useState } from 'react';
import { Sparkles, Droplets, Flame, Wind, Clock, ShieldCheck, CheckCircle2, Award, ThermometerSun } from 'lucide-react';
import { Card3D } from './Card3D';

export function ProductSensoryBreakdown() {
  const [activeWeek, setActiveWeek] = useState(1);

  const TIMELINE = [
    {
      week: 1,
      title: 'Immediate Awakening (Days 1–7)',
      focus: 'Thermal Warmth & Sensory Relaxation',
      description:
        'Upon application, the bioactive Clove and Raig Mahi lipids initiate pleasant localized warmth within 120 seconds. The featherlight Ostrich carrier sinks deep without surface stickiness, leaving skin relaxed and receptive.',
      metrics: ['120s Thermal Sensation', 'Instant Velvet Glide', 'Zero Sheet Staining'],
    },
    {
      week: 2,
      title: 'Micro-Circulation & Tone (Days 8–14)',
      focus: 'Tissue Conditioning & Tactile Vigor',
      description:
        'Regular massage promotes increased local capillary blood flow. The nutrient-dense Oleic and Omega-3-6-9 fatty acids restore cellular elasticity, resulting in firmer tissue tone and heightened sensation.',
      metrics: ['Enhanced Capillary Flow', 'Deep Tissue Elasticity', 'Composed Mindset'],
    },
    {
      week: 4,
      title: 'Peak Ritual Mastery (Days 21–30+)',
      focus: 'Enduring Composure & Intimate Vitality',
      description:
        'A full cycle of botanical conditioning establishes lasting confidence. The massage ritual becomes a natural second nature that elevates presence and mutual nighttime intimacy.',
      metrics: ['Peak Sensorial Response', 'Sustained Endurance', 'Uncompromising Aura'],
    },
  ];

  return (
    <section className="relative mx-auto max-w-7xl px-5 py-24 sm:px-8 lg:py-32">
      {/* 1. Sensory Architecture (Texture & Scent Pyramid) */}
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        {/* Left Column: Texture & Absorption Metrics */}
        <div className="lg:col-span-6">
          <div className="flex items-center gap-2">
            <Droplets className="h-4 w-4 text-[#c5a059]" />
            <span className="font-mono-ui text-[10px] uppercase tracking-[0.3em] text-[#c5a059]">
              Sensory Profile & Texture Science
            </span>
          </div>
          <h2 className="font-editorial mt-3 text-3xl font-normal text-[#f4ede2] sm:text-4xl lg:text-5xl">
            Engineered For The Skin, <br />
            <em className="text-gold-gradient italic">Crafted For The Senses.</em>
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-[#9aa4b5]">
            Unlike traditional thick greasy concoctions, Midnight Drive utilizes a bio-mimetic transdermal base that vanishes into dermal layers while preserving continuous glide on the surface.
          </p>

          {/* Sensory Metrics Slider Bars */}
          <div className="mt-8 space-y-4">
            <div className="rounded-2xl border border-[#c5a059]/15 bg-[#0e1624] p-4">
              <div className="flex justify-between text-xs">
                <span className="font-mono-ui uppercase tracking-wider text-[#f4ede2]">
                  Transdermal Absorption Speed
                </span>
                <span className="font-mono-ui font-semibold text-[#e5c583]">96% (Rapid Bio-Sink)</span>
              </div>
              <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-[#070b12]">
                <div className="h-full w-[96%] rounded-full bg-gradient-to-r from-[#9e7a36] to-[#c5a059]" />
              </div>
            </div>

            <div className="rounded-2xl border border-[#c5a059]/15 bg-[#0e1624] p-4">
              <div className="flex justify-between text-xs">
                <span className="font-mono-ui uppercase tracking-wider text-[#f4ede2]">
                  Non-Greasy Velvet Finish
                </span>
                <span className="font-mono-ui font-semibold text-[#e5c583]">99% (Zero Residue)</span>
              </div>
              <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-[#070b12]">
                <div className="h-full w-[99%] rounded-full bg-gradient-to-r from-[#9e7a36] to-[#c5a059]" />
              </div>
            </div>

            <div className="rounded-2xl border border-[#c5a059]/15 bg-[#0e1624] p-4">
              <div className="flex justify-between text-xs">
                <span className="font-mono-ui uppercase tracking-wider text-[#f4ede2]">
                  Localized Thermal Sensation
                </span>
                <span className="font-mono-ui font-semibold text-[#e5c583]">94% (Gentle Invigoration)</span>
              </div>
              <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-[#070b12]">
                <div className="h-full w-[94%] rounded-full bg-gradient-to-r from-[#9e7a36] to-[#c5a059]" />
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Natural Fragrance Architecture Pyramid */}
        <div className="lg:col-span-6">
          <Card3D depth={8}>
            <div className="rounded-3xl border border-[#c5a059]/30 bg-gradient-to-b from-[#111929] to-[#0b0f17] p-8 shadow-2xl backdrop-blur-md">
              <div className="flex items-center justify-between border-b border-[#c5a059]/15 pb-4">
                <div className="flex items-center gap-2">
                  <Wind className="h-4 w-4 text-[#c5a059]" />
                  <span className="font-mono-ui text-[10px] uppercase tracking-wider text-[#e5c583]">
                    Botanical Olfactory Architecture
                  </span>
                </div>
                <span className="font-mono-ui text-[9px] text-[#8c97a8]">0% Synthetic Perfume</span>
              </div>

              {/* Scent Pyramid Breakdown */}
              <div className="mt-6 space-y-4">
                {/* Top Note */}
                <div className="flex items-start gap-4 rounded-2xl border border-[#c5a059]/20 bg-[#090e17] p-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#c5a059]/10 text-[#c5a059]">
                    <span className="font-cinzel text-xs font-bold">TOP</span>
                  </div>
                  <div>
                    <h4 className="font-editorial text-lg font-semibold text-[#f4ede2]">
                      Wild Mediterranean Rosemary
                    </h4>
                    <p className="mt-0.5 text-xs text-[#8c97a8]">
                      Crisp, clean herbal top note that clears the mind and establishes mental presence.
                    </p>
                  </div>
                </div>

                {/* Heart Note */}
                <div className="flex items-start gap-4 rounded-2xl border border-[#c5a059]/30 bg-[#0e1624] p-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#c5a059]/20 text-[#e5c583]">
                    <span className="font-cinzel text-xs font-bold">HEART</span>
                  </div>
                  <div>
                    <h4 className="font-editorial text-lg font-semibold text-[#f4ede2]">
                      Steam-Distilled Clove Flower
                    </h4>
                    <p className="mt-0.5 text-xs text-[#8c97a8]">
                      Warm, spicy aromatic note delivering therapeutic heat and sensory invigoration.
                    </p>
                  </div>
                </div>

                {/* Base Note */}
                <div className="flex items-start gap-4 rounded-2xl border border-[#c5a059]/20 bg-[#090e17] p-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#c5a059]/10 text-[#c5a059]">
                    <span className="font-cinzel text-xs font-bold">BASE</span>
                  </div>
                  <div>
                    <h4 className="font-editorial text-lg font-semibold text-[#f4ede2]">
                      Raig Mahi Bio-Lipids & Cold-Pressed Olive
                    </h4>
                    <p className="mt-0.5 text-xs text-[#8c97a8]">
                      Rich, grounded botanical foundation providing long-lasting velvet slip and skin barrier nourishment.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Card3D>
        </div>
      </div>

      {/* 2. Transformation Journey Timeline (Week 1, 2, 4) */}
      <div className="mt-24 rounded-3xl border border-[#c5a059]/25 bg-[#090e17] p-8 sm:p-14">
        <div className="flex flex-col justify-between gap-6 border-b border-[#c5a059]/20 pb-8 sm:flex-row sm:items-end">
          <div>
            <span className="font-mono-ui text-[10px] uppercase tracking-[0.3em] text-[#c5a059]">
              Progressive Efficacy Timeline
            </span>
            <h3 className="font-editorial mt-2 text-3xl font-normal text-[#f4ede2] sm:text-4xl">
              Your 30-Day <em className="text-gold-gradient italic">Ritual Progression.</em>
            </h3>
          </div>

          {/* Week Selector Buttons */}
          <div className="flex items-center gap-2 rounded-full border border-[#c5a059]/25 bg-[#070a10] p-1">
            {[1, 2, 4].map((w) => (
              <button
                key={w}
                type="button"
                onClick={() => setActiveWeek(w)}
                className={`rounded-full px-4 py-1.5 font-mono-ui text-xs uppercase tracking-wider transition-all ${
                  activeWeek === w
                    ? 'bg-[#c5a059] font-bold text-[#0b0f17] shadow-[0_0_15px_rgba(197,160,89,0.4)]'
                    : 'text-[#8c97a8] hover:text-[#f4ede2]'
                }`}
              >
                Week {w === 4 ? '4+' : w}
              </button>
            ))}
          </div>
        </div>

        {/* Selected Week Showcase */}
        {(() => {
          const current = TIMELINE.find((t) => t.week === activeWeek) || TIMELINE[0];

          return (
            <div className="mt-8 grid items-center gap-8 lg:grid-cols-12">
              <div className="lg:col-span-8">
                <span className="rounded-full border border-[#c5a059]/30 bg-[#c5a059]/10 px-3 py-1 font-mono-ui text-[10px] uppercase tracking-wider text-[#e5c583]">
                  {current.focus}
                </span>
                <h4 className="font-editorial mt-4 text-2xl font-semibold text-[#f4ede2] sm:text-3xl">
                  {current.title}
                </h4>
                <p className="mt-3 text-base leading-relaxed text-[#9aa4b5]">
                  {current.description}
                </p>

                {/* Key Benefits */}
                <div className="mt-6 flex flex-wrap gap-3">
                  {current.metrics.map((m, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-2 rounded-xl border border-[#c5a059]/20 bg-[#0e1624] px-3.5 py-2 text-xs text-[#c7d0de]"
                    >
                      <CheckCircle2 className="h-3.5 w-3.5 text-[#c5a059]" />
                      <span>{m}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-col items-center justify-center rounded-2xl border border-[#c5a059]/20 bg-[#070b12] p-6 text-center lg:col-span-4">
                <Award className="h-10 w-10 text-[#c5a059]" />
                <h5 className="font-cinzel mt-3 text-base font-bold text-[#f4ede2]">
                  100% BOTANICAL CERTIFICATE
                </h5>
                <p className="mt-1 text-[11px] text-[#8c97a8]">
                  Zero artificial hormones, parabens, or mineral oils. Tested for dermatological biocompatibility.
                </p>
              </div>
            </div>
          );
        })()}
      </div>
    </section>
  );
}
