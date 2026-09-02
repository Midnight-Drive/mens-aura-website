import { useState, useRef, type PointerEvent } from 'react';
import { 
  Sparkles, 
  Shield, 
  Droplets, 
  Flame, 
  Eye, 
  Maximize2, 
  Play, 
  CheckCircle2, 
  Layers,
  Search
} from 'lucide-react';

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
    x: 29,
    y: 33,
    title: 'Precision Metallic Dropper',
    subtitle: 'Calibrated 0.5ml single-drop control for clean application.',
    icon: Droplets,
  },
  {
    id: 'glass',
    x: 27,
    y: 65,
    title: 'Medical Amber Glass',
    subtitle: '100% UV-shielding bottle preserves cold-pressed potency.',
    icon: Shield,
  },
  {
    id: 'seal',
    x: 73,
    y: 32,
    title: 'Foil-Embossed Stallion Seal',
    subtitle: 'Authenticity mark & hallmark of private male vitality.',
    icon: Sparkles,
  },
  {
    id: 'actives',
    x: 71,
    y: 67,
    title: '5 Pure Botanical Actives',
    subtitle: 'Raig Mahi, Clove, Ostrich, Rosemary & Cold-Pressed Olive.',
    icon: Flame,
  },
];

export function Hero3DStudio({ onWatchVideo }: { onWatchVideo?: () => void }) {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [activeHotspot, setActiveHotspot] = useState<string | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [glare, setGlare] = useState({ x: 50, y: 50, opacity: 0 });
  const [isZoomed, setIsZoomed] = useState(false);

  const handlePointerMove = (e: PointerEvent<HTMLDivElement>) => {
    if (!cardRef.current || isZoomed) return;
    const rect = cardRef.current.getBoundingClientRect();

    const normX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const normY = ((e.clientY - rect.top) / rect.height) * 2 - 1;

    setRotate({
      x: -normY * 12,
      y: normX * 14,
    });

    setGlare({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
      opacity: 0.65,
    });
  };

  const handlePointerEnter = () => {
    setIsHovered(true);
  };

  const handlePointerLeave = () => {
    setIsHovered(false);
    setRotate({ x: 0, y: 0 });
    setGlare((prev) => ({ ...prev, opacity: 0 }));
  };

  return (
    <div className="product-3d-wrapper relative mx-auto w-full max-w-[540px] select-none" data-testid="hero-3d-studio">
      {/* Ambient Volumetric Backlight Glow */}
      <div
        className="pointer-events-none absolute -inset-8 rounded-3xl opacity-50 blur-3xl transition-opacity duration-700"
        style={{
          background: 'radial-gradient(circle, rgba(197,160,89,0.35) 0%, rgba(142,98,38,0.18) 45%, transparent 70%)',
          opacity: isHovered ? 0.85 : 0.5,
        }}
      />

      {/* Outer Luxury Hairline Borders */}
      <div className="pointer-events-none absolute -bottom-4 -right-4 h-[92%] w-[92%] rounded-3xl border border-[#c5a059]/25 sm:-bottom-6 sm:-right-6" />
      <div className="pointer-events-none absolute -left-4 -top-4 h-[92%] w-[92%] rounded-3xl border border-[#c5a059]/15 sm:-left-6 sm:-top-6" />

      {/* Main Interactive 3D Product Presentation Card */}
      <div
        ref={cardRef}
        onPointerMove={handlePointerMove}
        onPointerEnter={handlePointerEnter}
        onPointerLeave={handlePointerLeave}
        className="product-3d-card relative aspect-[4/5] w-full overflow-hidden rounded-3xl border border-[#c5a059]/40 bg-[#0c121d] shadow-[0_30px_90px_rgba(0,0,0,0.95)]"
        style={{
          transform: isZoomed
            ? 'scale(1.05)'
            : `perspective(1200px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg) scale3d(${
                isHovered ? 1.02 : 1
              }, ${isHovered ? 1.02 : 1}, 1)`,
        }}
      >
        {/* Dynamic Specular Light Flare */}
        <div
          className="card-glare pointer-events-none absolute inset-0 z-30 transition-opacity duration-300"
          style={
            {
              '--glare-x': `${glare.x}%`,
              '--glare-y': `${glare.y}%`,
              opacity: glare.opacity,
            } as React.CSSProperties
          }
        />

        {/* Ambient Card Texture Grid */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#070b12] via-transparent to-[#101726]/80" />
        <div className="luxury-grid pointer-events-none absolute inset-0 opacity-40" />

        {/* Top Header Bar inside 3D Card */}
        <div className="relative z-20 flex items-center justify-between border-b border-[#c5a059]/20 bg-[#090e17]/80 px-5 py-3.5 backdrop-blur-md">
          <div className="flex items-center gap-2.5">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#c5a059] opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[#c5a059]" />
            </span>
            <span className="font-mono-ui text-[10px] uppercase tracking-[0.25em] text-[#e5c583]">
              Apothecary Batch #MD-042
            </span>
          </div>

          <button
            type="button"
            onClick={() => setIsZoomed(!isZoomed)}
            className="flex items-center gap-1 rounded-lg border border-[#c5a059]/25 bg-[#0e1624] px-2 py-1 font-mono-ui text-[9px] uppercase tracking-wider text-[#8c97a8] transition-colors hover:text-[#e5c583]"
            aria-label="Toggle Zoom Detail"
          >
            <Search className="h-3 w-3 text-[#c5a059]" />
            <span>{isZoomed ? 'Reset View' : '4K Zoom'}</span>
          </button>
        </div>

        {/* Product Image Layer with 3D Depth */}
        <div className="relative z-10 flex h-[calc(100%-105px)] w-full items-center justify-center p-4 sm:p-6">
          <div
            className={`relative flex h-full w-full items-center justify-center transition-transform duration-300 ${
              isZoomed ? 'scale-125' : ''
            }`}
            style={{
              transform: isZoomed ? 'scale(1.25)' : `translateZ(${isHovered ? '32px' : '0px'})`,
            }}
          >
            <img
              src="/assets/midnight-drive.png"
              alt="Men's Aura - Midnight Drive Bottle and Box Presentation"
              className="h-full w-full object-contain drop-shadow-[0_25px_45px_rgba(0,0,0,0.9)] filter"
              loading="eager"
            />

            {/* Interactive Feature Hotspots */}
            {!isZoomed &&
              HOTSPOTS.map((hs) => {
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
                      className="group relative flex h-7 w-7 items-center justify-center rounded-full border border-[#c5a059] bg-[#0b0f17]/90 text-[#e5c583] shadow-[0_0_20px_rgba(197,160,89,0.5)] transition-all duration-300 hover:scale-125 hover:bg-[#c5a059] hover:text-[#0b0f17]"
                      aria-label={hs.title}
                      data-testid={`hero-hotspot-${hs.id}`}
                    >
                      <span className="absolute -inset-1.5 animate-ping rounded-full border border-[#c5a059]/40 opacity-70" />
                      <Icon className="h-3.5 w-3.5" />
                    </button>

                    {/* Hotspot Popover Tooltip */}
                    {isSelected && (
                      <div
                        className="absolute z-50 w-56 -translate-x-1/2 translate-y-3 rounded-xl border border-[#c5a059]/40 bg-[#0d131f]/95 p-3.5 shadow-2xl backdrop-blur-xl animate-in fade-in zoom-in-95 duration-200"
                        style={{
                          left: '50%',
                          maxWidth: 'calc(100vw - 40px)',
                        }}
                      >
                        <div className="flex items-center gap-2">
                          <Icon className="h-3.5 w-3.5 text-[#c5a059]" />
                          <h4 className="font-editorial text-sm font-semibold tracking-wide text-[#f4ede2]">
                            {hs.title}
                          </h4>
                        </div>
                        <p className="mt-1 text-[11px] leading-relaxed text-[#9aa4b5]">
                          {hs.subtitle}
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}
          </div>
        </div>

        {/* Bottom Interactive Bar */}
        <div className="relative z-20 flex items-center justify-between border-t border-[#c5a059]/20 bg-[#090e17]/90 px-5 py-3.5 backdrop-blur-md">
          {/* Watch Film Action Button */}
          <button
            type="button"
            onClick={onWatchVideo}
            className="flex items-center gap-2 font-mono-ui text-xs text-[#e5c583] transition-colors hover:text-[#fcebc2]"
          >
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#c5a059]/20">
              <Play className="ml-0.5 h-2.5 w-2.5 fill-[#c5a059]" />
            </span>
            <span className="font-semibold">Watch 4K Film</span>
          </button>

          {/* Pricing Tag */}
          <div className="flex items-center gap-2">
            <span className="text-[11px] text-[#8c97a8] line-through">PKR 3,000</span>
            <span className="font-cinzel text-sm font-bold text-[#e5c583]">PKR 2,499</span>
          </div>
        </div>
      </div>

      {/* Floating Trust Pill under 3D Card */}
      <div className="mt-4 flex flex-wrap items-center justify-center gap-3 text-center sm:gap-6">
        <div className="flex items-center gap-1.5 font-mono-ui text-[10px] uppercase tracking-widest text-[#9aa4b5]">
          <CheckCircle2 className="h-3.5 w-3.5 text-[#c5a059]" />
          <span>Cold-Pressed Extraction</span>
        </div>
        <span className="text-[#c5a059]/40">•</span>
        <div className="flex items-center gap-1.5 font-mono-ui text-[10px] uppercase tracking-widest text-[#9aa4b5]">
          <CheckCircle2 className="h-3.5 w-3.5 text-[#c5a059]" />
          <span>Non-Greasy Velvet Texture</span>
        </div>
      </div>
    </div>
  );
}
