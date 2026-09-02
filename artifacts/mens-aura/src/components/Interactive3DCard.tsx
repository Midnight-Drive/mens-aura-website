import { useState, useRef, useEffect, type PointerEvent } from 'react';
import { Sparkles, Shield, Droplets, Flame, CheckCircle2, Eye } from 'lucide-react';

interface Hotspot {
  id: string;
  x: number; // percentage from left
  y: number; // percentage from top
  title: string;
  subtitle: string;
  icon: typeof Sparkles;
}

const hotspots: Hotspot[] = [
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

export function Interactive3DCard({ onOrderClick }: { onOrderClick?: () => void }) {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [activeHotspot, setActiveHotspot] = useState<string | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [glare, setGlare] = useState({ x: 50, y: 50, opacity: 0 });

  const handlePointerMove = (e: PointerEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    
    // Normalize coordinates (-1 to 1)
    const normX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const normY = ((e.clientY - rect.top) / rect.height) * 2 - 1;

    // Max rotation angles
    const rotX = -normY * 11; // tilt up/down
    const rotY = normX * 13;  // tilt left/right

    setRotate({ x: rotX, y: rotY });
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
    <div className="product-3d-wrapper relative mx-auto w-full max-w-[520px] select-none">
      {/* Ambient Backlight Glow */}
      <div 
        className="pointer-events-none absolute -inset-6 rounded-3xl opacity-40 blur-3xl transition-opacity duration-700"
        style={{
          background: 'radial-gradient(circle, rgba(197,160,89,0.3) 0%, rgba(142,98,38,0.15) 45%, transparent 70%)',
          opacity: isHovered ? 0.75 : 0.4,
        }}
      />

      {/* Decorative Outer Border Geometry */}
      <div className="pointer-events-none absolute -bottom-3 -right-3 h-[92%] w-[92%] rounded-2xl border border-[#c5a059]/25 sm:-bottom-5 sm:-right-5" />
      <div className="pointer-events-none absolute -left-3 -top-3 h-[92%] w-[92%] rounded-2xl border border-[#c5a059]/15 sm:-left-5 sm:-top-5" />

      {/* Main 3D Card */}
      <div
        ref={cardRef}
        onPointerMove={handlePointerMove}
        onPointerEnter={handlePointerEnter}
        onPointerLeave={handlePointerLeave}
        className="product-3d-card relative aspect-[4/5] w-full overflow-hidden rounded-2xl border border-[#c5a059]/35 bg-[#0e1420] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)]"
        style={{
          transform: `perspective(1200px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg) scale3d(${isHovered ? 1.02 : 1}, ${isHovered ? 1.02 : 1}, 1)`,
        }}
        data-testid="interactive-product-card"
      >
        {/* Dynamic Specular Light Glare */}
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

        {/* Ambient Card Background Shading */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#070b12] via-transparent to-[#101726]/80" />
        <div className="luxury-grid pointer-events-none absolute inset-0 opacity-40" />

        {/* Top Header Tag inside 3D Card */}
        <div className="relative z-20 flex items-center justify-between border-b border-[#c5a059]/15 bg-[#0b0f17]/70 px-5 py-3.5 backdrop-blur-md">
          <div className="flex items-center gap-2.5">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#c5a059] opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[#c5a059]" />
            </span>
            <span className="font-mono-ui text-[10px] uppercase tracking-[0.25em] text-[#e5c583]">
              Apothecary Grade · Batch #MD-42
            </span>
          </div>
          <span className="font-mono-ui text-[10px] font-medium tracking-wider text-[#8c97a8]">
            100 ML
          </span>
        </div>

        {/* Product Image Layer with 3D Depth */}
        <div className="relative z-10 flex h-[calc(100%-84px)] w-full items-center justify-center p-4 sm:p-6">
          <div 
            className="relative flex h-full w-full items-center justify-center transition-transform duration-300"
            style={{
              transform: `translateZ(${isHovered ? '28px' : '0px'})`,
            }}
          >
            <img
              src="/assets/midnight-drive.png"
              alt="Men's Aura - Midnight Drive Bottle and Box Presentation"
              className="h-full w-full object-contain drop-shadow-[0_20px_35px_rgba(0,0,0,0.85)] filter"
              loading="eager"
            />

            {/* Interactive Feature Hotspots */}
            {hotspots.map((hs) => {
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
                    className="group relative flex h-7 w-7 items-center justify-center rounded-full bg-[#0b0f17]/90 border border-[#c5a059] text-[#e5c583] shadow-[0_0_15px_rgba(197,160,89,0.5)] transition-all duration-300 hover:scale-125 hover:bg-[#c5a059] hover:text-[#0b0f17]"
                    aria-label={hs.title}
                    data-testid={`hotspot-${hs.id}`}
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
        <div className="relative z-20 flex items-center justify-between border-t border-[#c5a059]/15 bg-[#0b0f17]/85 px-5 py-3 backdrop-blur-md">
          <div className="flex items-center gap-2 text-[11px] text-[#8c97a8]">
            <Eye className="h-3.5 w-3.5 text-[#c5a059]" />
            <span className="hidden sm:inline">Hover / Drag to inspect in 3D</span>
            <span className="sm:hidden">Tap points for details</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="font-cinzel text-xs font-semibold text-[#e5c583]">PKR 1,890</span>
            <span className="rounded bg-[#c5a059]/15 px-1.5 py-0.5 font-mono-ui text-[9px] uppercase tracking-wider text-[#c5a059]">
              COD
            </span>
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
