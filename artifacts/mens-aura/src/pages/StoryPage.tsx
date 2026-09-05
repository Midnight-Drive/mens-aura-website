import { useState } from 'react';
import { ProductVideoShowcase } from '@/components/ProductVideoShowcase';
import { SafeVideo } from '@/components/SafeVideo';
import { VIDEO_CONFIG } from '@/config/videos';
import { Film, Play, Sparkles, ShieldCheck } from 'lucide-react';

const WHY_VIDEOS = VIDEO_CONFIG.whyMidnightDrive;

export function StoryPage() {
  const [activeWhyVideoIndex, setActiveWhyVideoIndex] = useState(0);

  return (
    <div className="pt-8 pb-20 space-y-16">
      {/* Story Header */}
      <section className="relative text-center px-4 sm:px-8 py-12">
        <div className="inline-flex items-center gap-2 rounded-full border border-[#c5a059]/30 bg-[#c5a059]/10 px-4 py-1.5 font-mono-ui text-[10px] uppercase tracking-[0.25em] text-[#e5c583]">
          <Film className="h-3.5 w-3.5 text-[#c5a059]" /> 4K Product Film & Heritage
        </div>
        <h1 className="font-editorial mx-auto mt-4 max-w-3xl text-4xl font-normal text-[#f4ede2] sm:text-6xl">
          The Story & <em className="text-gold-gradient italic">Visual Demonstration.</em>
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-[#9aa4b5] sm:text-base">
          Discover why Midnight Drive is crafted in amber apothecary glass to preserve pure cold-pressed botanical potency.
        </p>
      </section>

      {/* Why Video Player & Interactive Multi-Reel Selector */}
      <section className="mx-auto max-w-7xl px-4 sm:px-8">
        <div className="grid gap-8 lg:grid-cols-12 lg:gap-12 items-center">
          {/* Video Player */}
          <div className="relative overflow-hidden rounded-3xl border border-[#c5a059]/35 bg-[#070a10] shadow-[0_25px_80px_rgba(0,0,0,0.9)] lg:col-span-7 aspect-video">
            <SafeVideo
              key={WHY_VIDEOS[activeWhyVideoIndex].id}
              src={WHY_VIDEOS[activeWhyVideoIndex].src}
              poster="/assets/hero-poster-custom.jpg"
              controls
              autoPlay
              loop
              muted
              playsInline
              className="h-full w-full object-cover"
            />
            <div className="absolute top-4 left-4 z-20">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-[#c5a059]/40 bg-[#090e17]/90 px-3 py-1 font-mono-ui text-[10px] uppercase tracking-wider text-[#e5c583] backdrop-blur-md">
                <ShieldCheck className="h-3.5 w-3.5 text-[#c5a059]" />
                {WHY_VIDEOS[activeWhyVideoIndex].badge}
              </span>
            </div>
          </div>

          {/* Cards List */}
          <div className="flex flex-col gap-3 sm:gap-4 lg:col-span-5">
            <h3 className="font-mono-ui text-xs uppercase tracking-[0.25em] text-[#c5a059]">
              Select Video Chapter
            </h3>
            {WHY_VIDEOS.map((vid, idx) => {
              const isActive = activeWhyVideoIndex === idx;
              return (
                <button
                  key={vid.id}
                  type="button"
                  onClick={() => setActiveWhyVideoIndex(idx)}
                  className={`group flex items-start gap-3 sm:gap-4 rounded-2xl border p-3.5 sm:p-5 text-left transition-all duration-300 ${
                    isActive
                      ? 'border-[#c5a059] bg-[#0e1624] shadow-[0_0_30px_rgba(197,160,89,0.2)]'
                      : 'border-[#c5a059]/15 bg-[#070b12]/70 hover:border-[#c5a059]/40 hover:bg-[#0a0f17]'
                  }`}
                >
                  <div
                    className={`flex h-9 w-9 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-xl border transition-colors ${
                      isActive
                        ? 'border-[#c5a059] bg-[#c5a059] text-[#0b0f17]'
                        : 'border-[#c5a059]/30 bg-[#0e1522] text-[#c5a059] group-hover:border-[#c5a059]'
                    }`}
                  >
                    <Play className="h-4 w-4 fill-current" />
                  </div>
                  <div>
                    <h4 className="font-editorial text-base sm:text-lg font-semibold text-[#f4ede2]">
                      {vid.title}
                    </h4>
                    <p className="mt-1 text-[11px] sm:text-xs leading-relaxed text-[#8c97a8]">
                      {vid.subtitle}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4K Product Film Showcase */}
      <ProductVideoShowcase />
    </div>
  );
}
