import { useState, useRef, type ReactNode, type PointerEvent } from 'react';

interface Card3DProps {
  children: ReactNode;
  className?: string;
  depth?: number;
  glowColor?: string;
}

export function Card3D({
  children,
  className = '',
  depth = 12,
  glowColor = 'rgba(197, 160, 89, 0.25)',
}: Card3DProps) {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [glare, setGlare] = useState({ x: 50, y: 50, opacity: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handlePointerMove = (e: PointerEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();

    const normX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const normY = ((e.clientY - rect.top) / rect.height) * 2 - 1;

    setRotate({
      x: -normY * depth,
      y: normX * depth,
    });

    setGlare({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
      opacity: 0.45,
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
    <div
      ref={cardRef}
      onPointerMove={handlePointerMove}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      className={`group relative transition-all duration-300 ${className}`}
      style={{
        perspective: '1000px',
      }}
    >
      <div
        className="relative h-full w-full rounded-3xl transition-transform duration-200 ease-out"
        style={{
          transformStyle: 'preserve-3d',
          transform: `rotateX(${rotate.x}deg) rotateY(${rotate.y}deg) scale3d(${
            isHovered ? 1.02 : 1
          }, ${isHovered ? 1.02 : 1}, 1)`,
        }}
      >
        {/* Dynamic Glare */}
        <div
          className="pointer-events-none absolute inset-0 z-30 rounded-3xl transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, ${glowColor} 0%, transparent 65%)`,
            opacity: glare.opacity,
            mixBlendMode: 'screen',
          }}
        />

        {/* Outer Iridescent Border on Hover */}
        <div
          className="pointer-events-none absolute -inset-[1px] rounded-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            background: 'linear-gradient(135deg, rgba(245,223,168,0.6), rgba(197,160,89,0.2), rgba(158,122,54,0.6))',
            zIndex: -1,
          }}
        />

        {/* Card Content with Z-Depth */}
        <div
          className="relative h-full w-full rounded-3xl"
          style={{
            transform: 'translateZ(18px)',
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
