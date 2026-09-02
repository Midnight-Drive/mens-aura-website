import { useState, useRef } from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize2, Sparkles, Film, ShieldCheck } from 'lucide-react';
import { SafeVideo } from './SafeVideo';

interface VideoChapter {
  id: string;
  title: string;
  subtitle: string;
  duration: string;
  videoUrl: string;
  posterUrl: string;
}

const CHAPTERS: VideoChapter[] = [
  {
    id: 'ritual',
    title: 'The Night Ritual & Application',
    subtitle: 'Witness the thermal warmth awakening & smooth transdermal massage glide.',
    duration: '1080p',
    videoUrl: '/videos/midnight-drive.mp4',
    posterUrl: '/assets/midnight-drive.png',
  },
  {
    id: 'amber-bottle',
    title: 'Apothecary Amber Glass Studio',
    subtitle: '100% UV-shielding dark amber bottle preserving cold-pressed potency.',
    duration: '4K',
    videoUrl: '/videos/amber-bottle.mp4',
    posterUrl: '/assets/midnight-drive.png',
  },
  {
    id: 'dropper-actives',
    title: 'Precision Dropper & 5 Actives',
    subtitle: 'Calibrated 0.5ml single-drop control with raw botanical infusion.',
    duration: 'Macro',
    videoUrl: '/videos/dropper-texture.mp4',
    posterUrl: '/assets/midnight-drive.png',
  },
  {
    id: 'brand-film',
    title: 'The Men’s Aura Brand Storyline',
    subtitle: 'The philosophy of unhurried intimacy, composure, and private male vitality.',
    duration: 'Anthem',
    videoUrl: '/videos/brand-film.mp4',
    posterUrl: '/assets/midnight-drive.png',
  },
  {
    id: 'stallion',
    title: 'The Stallion Seal & Emblem',
    subtitle: 'Iconic gold foil emblem symbolizing raw vigor and uncompromising quality.',
    duration: 'Visual',
    videoUrl: '/videos/stallion-intro.mp4',
    posterUrl: '/assets/midnight-drive.png',
  },
  {
    id: 'advertisement',
    title: 'Cinematic Launch Commercial',
    subtitle: 'Official animated luxury presentation film for Midnight Drive.',
    duration: 'Trailer',
    videoUrl: '/videos/advertisement.mp4',
    posterUrl: '/assets/midnight-drive.png',
  },
];


export function ProductVideoShowcase() {
  const [activeChapter, setActiveChapter] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const togglePlay = () => {
    if (!videoRef.current) {
      setIsPlaying(!isPlaying);
      return;
    }
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const handleSelectChapter = (idx: number) => {
    setActiveChapter(idx);
    setIsPlaying(true);
    setTimeout(() => {
      if (videoRef.current) {
        videoRef.current.currentTime = 0;
        videoRef.current.play().catch(() => setIsPlaying(false));
      }
    }, 100);
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
    }
    setIsMuted(!isMuted);
  };



  return (
    <section id="video-showcase" className="relative border-y border-[#c5a059]/15 bg-[#080d15] py-24 sm:py-32">
      {/* Background Ambient Glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[450px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#c5a059]/10 blur-[140px]" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        {/* Header */}
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <div className="flex items-center gap-2">
              <Film className="h-4 w-4 text-[#c5a059]" />
              <span className="font-mono-ui text-[10px] uppercase tracking-[0.3em] text-[#c5a059]">
                Cinematic Product Experience · 4K Film
              </span>
            </div>
            <h2 className="font-editorial mt-3 text-4xl font-normal text-[#f4ede2] sm:text-5xl lg:text-6xl">
              See Midnight Drive <em className="text-gold-gradient italic">In Motion.</em>
            </h2>
          </div>
          <p className="max-w-md text-sm leading-relaxed text-[#8c97a8]">
            Experience the craft behind the formulation—from the unboxing ceremony to the sensorial golden velvet glide.
          </p>
        </div>

        {/* Video Player Display Card */}
        <div className="mt-12 grid gap-8 lg:grid-cols-12 lg:gap-12">
          {/* Main Cinematic Video Player Container */}
          <div className="relative overflow-hidden rounded-3xl border border-[#c5a059]/35 bg-[#0b0f17] shadow-[0_30px_90px_rgba(0,0,0,0.95)] lg:col-span-8">
            {/* Ambient Inner Glow */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#070b12] via-transparent to-[#101726]/40" />

            {/* Video Frame */}
            <div className="relative aspect-video w-full overflow-hidden bg-[#070a10]">
              {/* HTML5 Video Tag with fallback poster */}
              <SafeVideo
                key={CHAPTERS[activeChapter].videoUrl || activeChapter}
                src={CHAPTERS[activeChapter].videoUrl || '/videos/midnight-drive.mp4'}
                poster={CHAPTERS[activeChapter].posterUrl}
                playsInline
                muted={isMuted}
                loop
                className="h-full w-full object-cover object-center transition-all duration-500"
                onClick={togglePlay}
              />


              {/* Cinematic Overlay when paused */}
              {!isPlaying && (
                <div 
                  onClick={togglePlay}
                  className="absolute inset-0 flex cursor-pointer flex-col items-center justify-center bg-[#070b12]/60 backdrop-blur-[2px] transition-all duration-300 hover:bg-[#070b12]/40"
                >
                  <div className="flex h-20 w-20 items-center justify-center rounded-full border border-[#c5a059] bg-[#0b0f17]/90 text-[#e5c583] shadow-[0_0_40px_rgba(197,160,89,0.5)] transition-transform duration-300 hover:scale-110">
                    <Play className="ml-1 h-8 w-8 fill-[#c5a059]" />
                  </div>
                  <span className="mt-4 font-mono-ui text-xs uppercase tracking-[0.25em] text-[#e5c583]">
                    Watch {CHAPTERS[activeChapter].title}
                  </span>
                </div>
              )}

              {/* Player Controls Bar */}
              <div className="absolute bottom-0 left-0 right-0 z-30 flex items-center justify-between border-t border-[#c5a059]/20 bg-[#070b12]/85 px-5 py-3 backdrop-blur-md">
                <div className="flex items-center gap-4">
                  <button
                    type="button"
                    onClick={togglePlay}
                    className="text-[#e5c583] transition-colors hover:text-[#fcebc2]"
                    aria-label={isPlaying ? 'Pause' : 'Play'}
                  >
                    {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5 fill-current" />}
                  </button>

                  <button
                    type="button"
                    onClick={toggleMute}
                    className="text-[#8c97a8] transition-colors hover:text-[#e5c583]"
                    aria-label={isMuted ? 'Unmute' : 'Mute'}
                  >
                    {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
                  </button>

                  <span className="font-mono-ui text-[11px] text-[#8c97a8]">
                    {CHAPTERS[activeChapter].title}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <span className="rounded bg-[#c5a059]/15 px-2 py-0.5 font-mono-ui text-[10px] text-[#e5c583]">
                    4K Ultra HD
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side: Interactive Chapters Selector */}
          <div className="flex flex-col justify-between space-y-4 lg:col-span-4">
            <div>
              <span className="font-mono-ui text-[10px] uppercase tracking-[0.25em] text-[#c5a059]">
                Select Video Chapter
              </span>
              <h4 className="font-editorial mt-1 text-2xl font-semibold text-[#f4ede2]">
                Visual Product Archive
              </h4>
            </div>

            <div className="space-y-3">
              {CHAPTERS.map((ch, idx) => {
                const isSelected = activeChapter === idx;

                return (
                  <button
                    key={ch.id}
                    type="button"
                    onClick={() => handleSelectChapter(idx)}
                    className={`group flex w-full items-start justify-between rounded-2xl border p-4 text-left transition-all duration-300 ${

                      isSelected
                        ? 'border-[#c5a059] bg-[#121b2b] shadow-[0_8px_25px_rgba(0,0,0,0.6)]'
                        : 'border-[#c5a059]/15 bg-[#0a0f18]/60 hover:border-[#c5a059]/40 hover:bg-[#0e1624]'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <span
                        className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border text-[11px] font-mono-ui ${
                          isSelected
                            ? 'border-[#c5a059] bg-[#c5a059] text-[#0b0f17] font-bold'
                            : 'border-[#c5a059]/30 text-[#8c97a8]'
                        }`}
                      >
                        0{idx + 1}
                      </span>
                      <div>
                        <h5
                          className={`font-editorial text-base font-semibold transition-colors ${
                            isSelected ? 'text-[#f4ede2]' : 'text-[#8c97a8] group-hover:text-[#f4ede2]'
                          }`}
                        >
                          {ch.title}
                        </h5>
                        <p className="mt-1 text-[11px] leading-relaxed text-[#5c6675]">
                          {ch.subtitle}
                        </p>
                      </div>
                    </div>

                    <span className="font-mono-ui text-[10px] text-[#c5a059]">
                      {ch.duration}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Video Integration Guide Note */}
            <div className="rounded-2xl border border-[#c5a059]/20 bg-[#070a10]/80 p-4 text-xs text-[#8c97a8]">
              <div className="flex items-center gap-2 text-[#c5a059]">
                <Sparkles className="h-4 w-4" />
                <span className="font-mono-ui font-semibold uppercase tracking-wider">
                  How To Add Your Own Video
                </span>
              </div>
              <p className="mt-2 text-[11px] leading-relaxed text-[#8c97a8]">
                Place your video file inside <code className="rounded bg-[#0e1624] px-1 text-[#e5c583]">/public/videos/midnight-drive.mp4</code> or replace the video URL with your YouTube / CDN embed link.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
