import { useState } from 'react';
import { Flame, Droplets, Zap, Clock, ShieldAlert } from 'lucide-react';
import { Card3D } from './Card3D';

const STAGES = [
  {
    step: 1,
    time: 'Minute 1 - 2',
    title: 'Gentle Thermal Eugenol Warmth',
    icon: Flame,
    color: '#e5c583',
    description: 'Upon applying 4 to 6 drops of Midnight Drive, cold-pressed Clove Eugenol activates a mild, soothing thermal sensation across the tissue, signaling micro-circulation arousal.',
    details: ['Thermal micro-stimulation', 'Zero burning or irritation', 'Natural aroma of Clove & Rosemary'],
  },
  {
    step: 2,
    time: 'Minute 3 - 5',
    title: 'Deep Transdermal Bio-Carrier Entry',
    icon: Droplets,
    color: '#c5a059',
    description: 'High-glide Ostrich & Olive bio-carriers transport active Raig Mahi lipids deep into local cavernous tissues without greasy residue, nourishing blood vessel walls.',
    details: ['Fast absorption within 3 minutes', 'Non-greasy satin finish', 'Deep tissue nourishment'],
  },
  {
    step: 3,
    time: 'Day 7 - 14',
    title: 'Cumulative Vigor & Firmness',
    icon: Zap,
    color: '#e5c583',
    description: 'With regular nightly 5-minute massage, tissue elasticity, local circulation, and intimate stamina reach peak natural performance and endurance.',
    details: ['Noticeable tissue firmness', 'Sustained intimate endurance', 'Enhanced confidence'],
  },
];

export function SensationSlider() {
  const [activeStage, setActiveStage] = useState(0);
  const current = STAGES[activeStage];
  const Icon = current.icon;

  return (
    <section
      id="sensation-timeline"
      className="relative border-t border-[#c5a059]/15 bg-[#070b12] py-16 sm:py-32 overflow-hidden"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-8">
        {/* Header */}
        <div className="text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#c5a059]/30 bg-[#c5a059]/10 px-4 py-1.5 font-mono-ui text-[10px] uppercase tracking-[0.25em] text-[#e5c583]">
            <Clock className="h-3.5 w-3.5 text-[#c5a059]" /> Application & Sensation Timeline
          </div>
          <h2 className="font-editorial mx-auto mt-4 max-w-3xl text-3xl font-normal text-[#f4ede2] sm:text-5xl lg:text-6xl">
            What You Feel <em className="text-gold-gradient italic">From Minute 1.</em>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-[#9aa4b5]">
            Explore the 3-stage thermal & bio-absorption progression when applying Midnight Drive 30ml vitality oil.
          </p>
        </div>

        {/* Timeline Stage Buttons */}
        <div className="mt-10 flex items-center justify-center gap-2 sm:gap-6 flex-wrap">
          {STAGES.map((s, idx) => {
            const StageIcon = s.icon;
            const isActive = activeStage === idx;

            return (
              <button
                key={s.step}
                type="button"
                onClick={() => setActiveStage(idx)}
                className={`flex items-center gap-2.5 rounded-2xl px-3.5 py-2.5 sm:px-5 sm:py-3.5 transition-all duration-300 ${
                  isActive
                    ? 'border border-[#c5a059] bg-[#c5a059] text-[#070b12] shadow-[0_0_25px_rgba(197,160,89,0.35)] scale-105'
                    : 'border border-[#c5a059]/25 bg-[#090e17] text-[#8c97a8] hover:border-[#c5a059]/50 hover:text-[#f4ede2]'
                }`}
                data-testid={`sensation-stage-${idx}`}
              >
                <div className={`flex h-6 w-6 sm:h-7 sm:w-7 items-center justify-center rounded-lg ${isActive ? 'bg-[#070b12] text-[#e5c583]' : 'bg-[#c5a059]/15 text-[#c5a059]'}`}>
                  <StageIcon className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                </div>
                <div className="text-left">
                  <div className="font-mono-ui text-[9px] sm:text-[10px] uppercase tracking-wider opacity-80">
                    Stage 0{s.step}
                  </div>
                  <div className="font-editorial text-xs font-bold sm:text-sm">
                    {s.time}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Stage Display Card */}
        <div className="mt-8 sm:mt-10 mx-auto max-w-3xl">
          <Card3D depth={8}>
            <div className="glass-obsidian-card relative rounded-3xl border border-[#c5a059]/30 bg-gradient-to-br from-[#0a101c] via-[#070b12] to-[#0a101c] p-5 sm:p-10 shadow-2xl">
              <div className="flex items-center justify-between border-b border-[#c5a059]/15 pb-6">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-[#c5a059]/40 bg-[#c5a059]/15 text-[#e5c583] shadow-[0_0_20px_rgba(197,160,89,0.2)]">
                    <Icon className="h-6 w-6" />
                  </div>
                  <div>
                    <span className="font-mono-ui text-[10px] uppercase tracking-widest text-[#c5a059]">
                      Stage 0{current.step} · {current.time}
                    </span>
                    <h3 className="font-editorial text-2xl font-semibold text-[#f4ede2]">
                      {current.title}
                    </h3>
                  </div>
                </div>

                <span className="hidden sm:inline-flex items-center gap-1.5 rounded-full border border-[#c5a059]/30 bg-[#c5a059]/10 px-3.5 py-1 font-mono-ui text-[10px] uppercase text-[#e5c583]">
                  30ml Bio-Formula
                </span>
              </div>

              <p className="mt-6 text-sm leading-relaxed text-[#c8d2e1]">
                {current.description}
              </p>

              <div className="mt-8 border-t border-[#c5a059]/15 pt-6">
                <h4 className="font-mono-ui text-[11px] font-semibold uppercase tracking-wider text-[#c5a059]">
                  Key Physiological Effects:
                </h4>
                <ul className="mt-3 grid gap-3 sm:grid-cols-3">
                  {current.details.map((item) => (
                    <li key={item} className="flex items-center gap-2 rounded-xl border border-[#c5a059]/15 bg-[#070b12] px-3.5 py-2.5 text-xs text-[#f4ede2]">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#c5a059]" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Card3D>
        </div>
      </div>
    </section>
  );
}
