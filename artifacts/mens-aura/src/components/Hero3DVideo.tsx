import { useState, useRef, type PointerEvent } from 'react';
import {
  Sparkles,
  Shield,
  Droplets,
  Flame,
  Award,
  CheckCircle2
} from 'lucide-react';

interface Hero3DVideoProps {
  onOrderClick?: () => void;
}

interface Hotspot {
  id: string;
  x: number;
  y: number;
  title: string;
  subtitle: string;
  icon: typeof Sparkles;
}

const HOTSPOTS: Hotspot[] = [
  {
    id: 'dropper',
    x: 32,
    y: 35,
    title: 'Precision Metallic Dropper',
    subtitle: 'Calibrated 0.5ml single-drop control for clean application.',
    icon: Droplets,
  },
  {
    id: 'glass',
    x: 28,
    y: 68,
    title: 'Medical Amber Glass',
    subtitle: '100% UV-shielding bottle preserves cold-pressed potency.',
    icon: Shield,
  },
  {
    id: 'seal',
    x: 75,
    y: 34,
    title: 'Foil-Embossed Seal',
    subtitle: 'Authenticity mark & hallmark of private male vitality.',
    icon: Sparkles,
  },
  {
    id: 'actives',
    x: 73,
    y: 70,
    title: '5 Pure Botanical Actives',
    subtitle: 'Raig Mahi, Clove, Ostrich, Rosemary & Cold-Pressed Olive.',
    icon: Flame,
  },
];

export function Hero3DVideo({ onOrderClick }: Hero3DVideoProps) {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [activeHotspot, setActiveHotspot] = useState<string | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [glare, setGlare] = useState({ x: 50, y: 50, opacity: 0 });

  // 3D Parallax Tilt Calculation on Mouse Movement
  const handlePointerMove = (e: PointerEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();

    const normX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const normY = ((e.clientY - rect.top) / rect.height) * 2 - 1;

    setRotate({
      x: -normY * 14,
      y: normX * 16,
    });

    setGlare({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
      opacity: 0.7,
    });
  };

  const handlePointerEnter = () => setIsHovered(true);
  const handlePointerLeave = () => {
    setIsHovered(false);
    setRotate({ x: 0, y: 0 });
    setGlare((prev) => ({ ...prev, opacity: 0 }));
  };

  return (
    <div className="relative mx-auto w-full max-w-[340px] xs:max-w-[420px] sm:max-w-[520px] lg:max-w-[600px] select-none" data-testid="hero-3d-transparent-stage">
      {/* Volumetric Amber-Gold Aura behind the bottle */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[380px] w-[380px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[130px] transition-opacity duration-700 sm:h-[480px] sm:w-[480px]"
        style={{
          background: 'radial-gradient(circle, rgba(229,197,131,0.38) 0%, rgba(197,160,89,0.22) 45%, transparent 70%)',
          opacity: isHovered ? 1 : 0.75,
        }}
      />

      {/* 3D Floating Stage Container - 100% Borderless & Transparent */}
      <div
        ref={cardRef}
        onPointerMove={handlePointerMove}
        onPointerEnter={handlePointerEnter}
        onPointerLeave={handlePointerLeave}
        className="relative aspect-[4/5] sm:aspect-square w-full transition-transform duration-300 ease-out flex items-center justify-center p-2 sm:p-4"
        style={{
          transform: `perspective(1200px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg) scale3d(${
            isHovered ? 1.03 : 1
          }, ${isHovered ? 1.03 : 1}, 1)`,
        }}
      >
        {/* Dynamic Specular Sheen Glare overlay moving across the 3D bottle */}
        <div
          className="pointer-events-none absolute inset-0 z-30 transition-opacity duration-300 rounded-3xl"
          style={{
            background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, rgba(255, 235, 190, 0.3) 0%, rgba(197, 160, 89, 0.08) 35%, transparent 70%)`,
            opacity: glare.opacity,
            mixBlendMode: 'screen',
          }}
        />

        {/* 100% Transparent Studio Bottle & Box Render Layer */}
        <div className="relative z-10 flex h-full w-full items-center justify-center">
          <div
            className="relative flex h-full w-full items-center justify-center transition-transform duration-300"
            style={{
              transform: `translateZ(${isHovered ? '35px' : '0px'})`,
            }}
          >
            {/* Ultra High-Res Transparent Render of Bottle & Box - ZERO Background Box */}
            <img
              src="/assets/midnight-drive.png"
              alt="The Men's Aura - Midnight Drive 30ml Bottle & Box"
              className="h-[92%] sm:h-full w-full object-contain filter drop-shadow-[0_30px_60px_rgba(0,0,0,0.95)]"
              loading="eager"
            />

            {/* Interactive Feature Hotspots */}
            {HOTSPOTS.map((hs) => {
              const Icon = hs.icon;
              const isSelected = activeHotspot === hs.id;

              return (
                <div
                  key={hs.id}
                  className="absolute z-40"
                  style={{
                    left: `${hs.x}%`,
                    top: `${hs.y}%`,
                    transform: 'translate(-50%, -50%)',
                  }}
                >
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveHotspot(isSelected ? null : hs.id);
                    }}
                    onMouseEnter={() => setActiveHotspot(hs.id)}
                    className="group relative flex h-6 w-6 sm:h-7 sm:w-7 items-center justify-center rounded-full border border-[#c5a059] bg-[#0b0f17]/90 text-[#e5c583] shadow-[0_0_25px_rgba(197,160,89,0.6)] transition-all duration-300 hover:scale-125 hover:bg-[#c5a059] hover:text-[#0b0f17]"
                    aria-label={hs.title}
                    data-testid={`hotspot-${hs.id}`}
                  >
                    <span className="absolute -inset-1.5 animate-ping rounded-full border border-[#c5a059]/50 opacity-75" />
                    <Icon className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                  </button>

                  {/* Hotspot Popover Tooltip */}
                  {isSelected && (
                    <div
                      className="absolute z-50 w-52 sm:w-56 -translate-x-1/2 translate-y-3 rounded-xl border border-[#c5a059]/40 bg-[#0d131f]/95 p-3 sm:p-3.5 shadow-2xl backdrop-blur-xl animate-in fade-in zoom-in-95 duration-200"
                      style={{
                        left: '50%',
                        maxWidth: 'calc(100vw - 40px)',
                      }}
                    >
                      <div className="flex items-center gap-2">
                        <Icon className="h-3.5 w-3.5 text-[#c5a059]" />
                        <h4 className="font-editorial text-xs sm:text-sm font-semibold tracking-wide text-[#f4ede2]">
                          {hs.title}
                        </h4>
                      </div>
                      <p className="mt-1 text-[10px] sm:text-[11px] leading-relaxed text-[#9aa4b5]">
                        {hs.subtitle}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Minimalist Header Badge Overlay */}
        <div className="pointer-events-none absolute left-2 top-2 sm:left-3 sm:top-3 z-20 flex items-center gap-2 rounded-full border border-[#c5a059]/30 bg-[#090e17]/85 px-3 py-1 sm:px-3.5 sm:py-1.5 backdrop-blur-md shadow-xl">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#c5a059] opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-[#c5a059]" />
          </span>
          <span className="font-mono-ui text-[9px] sm:text-[10px] font-semibold uppercase tracking-[0.2em] text-[#e5c583]">
            3D Interactive Stage
          </span>
        </div>

        {/* Bottom Floating Feature Badges */}
        <div className="pointer-events-none absolute bottom-3 left-3 z-20 hidden sm:flex items-center gap-2 rounded-xl border border-[#c5a059]/25 bg-[#090e17]/85 px-3.5 py-2 backdrop-blur-md shadow-xl">
          <Sparkles className="h-3.5 w-3.5 text-[#c5a059]" />
          <span className="font-mono-ui text-[10px] font-medium uppercase tracking-wider text-[#f4ede2]">
            Raig Mahi & Clove Essence
          </span>
        </div>

        <div className="pointer-events-none absolute bottom-3 right-3 z-20 hidden sm:flex items-center gap-2 rounded-xl border border-[#c5a059]/25 bg-[#090e17]/85 px-3.5 py-2 backdrop-blur-md shadow-xl">
          <Award className="h-3.5 w-3.5 text-[#c5a059]" />
          <span className="font-mono-ui text-[10px] font-medium uppercase tracking-wider text-[#f4ede2]">
            30ml Cold-Pressed Formula
          </span>
        </div>
      </div>

      {/* Floating Trust Pills under 3D Stage */}
      <div className="mt-4 flex flex-wrap items-center justify-center gap-2.5 sm:gap-6 text-center">
        <div className="flex items-center gap-1.5 font-mono-ui text-[9px] sm:text-[10px] uppercase tracking-widest text-[#9aa4b5]">
          <CheckCircle2 className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-[#c5a059]" />
          <span>Cold-Pressed Extraction</span>
        </div>
        <span className="text-[#c5a059]/40">•</span>
        <div className="flex items-center gap-1.5 font-mono-ui text-[9px] sm:text-[10px] uppercase tracking-widest text-[#9aa4b5]">
          <CheckCircle2 className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-[#c5a059]" />
          <span>Non-Greasy Velvet Texture</span>
        </div>
        <span className="text-[#c5a059]/40">•</span>
        <div className="flex items-center gap-1.5 font-mono-ui text-[9px] sm:text-[10px] uppercase tracking-widest text-[#9aa4b5]">
          <CheckCircle2 className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-[#c5a059]" />
          <span>100% Discreet Packaging</span>
        </div>
      </div>
    </div>
  );
}
