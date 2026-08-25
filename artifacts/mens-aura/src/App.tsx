import { useEffect, useRef, useState, type FormEvent, type ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import {
  ArrowDown,
  ArrowRight,
  Check,
  CircleCheck,
  Clock3,
  Instagram,
  Menu,
  Minus,
  Plus,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Star,
  Truck,
  X,
  Zap,
} from 'lucide-react';

import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import { Route, Switch, Router as WouterRouter, useLocation } from 'wouter';
import NotFound from '@/pages/not-found';

const queryClient = new QueryClient();
const productImage = '/assets/midnight-drive.png';

type OrderForm = {
  name: string;
  phone: string;
  city: string;
  address: string;
  quantity: number;
};

const ingredients = [
  { name: 'Ostrich Oil', origin: 'The carrier', copy: 'A featherlight base that sinks in quickly, leaving the skin supple — never slick.', note: 'Deep absorption' },
  { name: 'Raig Mahi', origin: 'The vitaliser', copy: 'A time-honoured Pakistani botanical traditionally used to awaken warmth and circulation.', note: 'Natural warmth' },
  { name: 'Clove Oil', origin: 'The spark', copy: 'A bright, aromatic note that brings a measured sense of heat to the ritual.', note: 'Measured intensity' },
  { name: 'Rosemary', origin: 'The clarity', copy: 'Clean and herbaceous. A crisp top note that keeps the formula feeling composed.', note: 'Crisp finish' },
  { name: 'Olive Oil', origin: 'The velvet', copy: 'Rich in skin-loving nutrients, it gives every glide a calm, luxurious finish.', note: 'Velvet glide' },
];

const reviews = [
  { quote: 'It feels like a product made for the end of the day — considered, warm, and never loud.', name: 'Hassan M.', place: 'Lahore', initials: 'HM' },
  { quote: 'The texture is the difference. It absorbs without the usual mess, and the bottle looks beautiful on my shelf.', name: 'Adeel R.', place: 'Islamabad', initials: 'AR' },
  { quote: 'Midnight Drive has become a quiet part of our week. The scent is subtle, the experience is not.', name: 'Bilal K.', place: 'Karachi', initials: 'BK' },
];

function useReveal() {
  const ref = useRef<HTMLElement | null>(null);
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        node.classList.add('is-visible');
        observer.disconnect();
      }
    }, { threshold: 0.12 });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);
  return ref;
}

function StallionMark({ className = '' }: { className?: string }) {
  return (
    <svg aria-hidden="true" className={className} viewBox="0 0 44 48" fill="none">
      <path d="M9 42c3.8-5.8 5.2-11.8 5-17.7C13.8 15.6 17.8 7.6 29.2 3c-.4 3.6.8 6.5 3.4 8.8 2.8 2.5 4.7 5.4 4.7 9.4 0 5.3-3.2 8.9-7.6 11.4-3.3 1.9-6.1 4.3-8.1 8.1" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
      <path d="M18 15.2c2.8-2.3 6.3-3.4 10.5-3.4M19.8 19.2c4.4 0 8.3 1.4 11.7 4.2M15 28.3c4.6.2 8.5 1.4 11.8 3.7M12.8 35.3c3.1.4 5.8 1.2 8.1 2.7M29.4 3c3.2 1.4 6.1 3.8 8.3 7.4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      <path d="m34.6 12.6 4.5 1.1-3.5 2.1M30.2 31.7l4.8 1.4-4.4 1.3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function OrderModal({ onClose }: { onClose: () => void }) {
  const [form, setForm] = useState<OrderForm>({ name: '', phone: '', city: '', address: '', quantity: 1 });
  const [submitted, setSubmitted] = useState(false);
  const total = form.quantity * 1890;

  const update = (field: keyof OrderForm, value: string | number) =>
    setForm((current) => ({ ...current, [field]: value }));

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-end justify-center bg-[#05080d]/80 p-0 backdrop-blur-sm sm:items-center sm:p-6" role="dialog" aria-modal="true" aria-label="Cash on delivery order">
      <div className="modal-in relative max-h-[94dvh] w-full overflow-y-auto border border-[#c89e68]/30 bg-[#111923] shadow-2xl sm:max-w-[560px]">
        <button onClick={onClose} type="button" className="absolute right-5 top-5 z-10 text-[#a5acb6] transition-colors hover:text-[#e8c796]" aria-label="Close order form" data-testid="button-close-order">
          <X size={20} strokeWidth={1.5} />
        </button>
        {submitted ? (
          <div className="flex min-h-[480px] flex-col items-center justify-center px-8 py-16 text-center">
            <div className="mb-7 flex h-16 w-16 items-center justify-center rounded-full border border-[#d8ad73]/50 text-[#d8ad73]">
              <Check size={28} strokeWidth={1.5} />
            </div>
            <p className="font-mono-ui text-[10px] uppercase tracking-[.3em] text-[#d8ad73]">Request received</p>
            <h2 className="mt-4 font-display text-4xl text-[#eee4d5]">Your ritual is set.</h2>
            <p className="mt-4 max-w-sm text-sm leading-7 text-[#a5acb6]">Thank you, {form.name || 'there'}. We will call {form.phone || 'shortly'} to confirm your Midnight Drive delivery. Pay only when it arrives.</p>
            <button onClick={onClose} type="button" className="mt-9 border border-[#d8ad73] px-7 py-3 font-mono-ui text-[10px] uppercase tracking-[.2em] text-[#e8c796] transition-colors hover:bg-[#d8ad73] hover:text-[#111923]" data-testid="button-finish-order">Back to Men's Aura</button>
          </div>
        ) : (
          <>
            <div className="border-b border-[#cfb58d]/15 px-7 pb-6 pt-9 sm:px-10">
              <p className="font-mono-ui text-[10px] uppercase tracking-[.28em] text-[#d8ad73]">Cash on delivery</p>
              <h2 className="mt-3 font-display text-4xl text-[#eee4d5]">Make it a ritual.</h2>
              <p className="mt-2 text-sm text-[#8f99a6]">Midnight Drive · 100 ml · PKR 1,890</p>
            </div>
            <form onSubmit={submit} className="space-y-5 px-7 py-7 sm:px-10">
              <div className="grid gap-5 sm:grid-cols-2">
                <label className="block"><span className="mb-2 block font-mono-ui text-[10px] uppercase tracking-[.16em] text-[#8f99a6]">Full name</span><input required value={form.name} onChange={(event) => update('name', event.target.value)} className="w-full border border-[#cfb58d]/20 bg-[#0c121b] px-4 py-3 text-sm text-[#eee4d5] outline-none transition-colors placeholder:text-[#59616d] focus:border-[#d8ad73]" placeholder="Your name" data-testid="input-order-name" /></label>
                <label className="block"><span className="mb-2 block font-mono-ui text-[10px] uppercase tracking-[.16em] text-[#8f99a6]">Phone number</span><input required type="tel" value={form.phone} onChange={(event) => update('phone', event.target.value)} className="w-full border border-[#cfb58d]/20 bg-[#0c121b] px-4 py-3 text-sm text-[#eee4d5] outline-none transition-colors placeholder:text-[#59616d] focus:border-[#d8ad73]" placeholder="03xx xxx xxxx" data-testid="input-order-phone" /></label>
              </div>
              <div className="grid gap-5 sm:grid-cols-2">
                <label className="block"><span className="mb-2 block font-mono-ui text-[10px] uppercase tracking-[.16em] text-[#8f99a6]">City</span><input required value={form.city} onChange={(event) => update('city', event.target.value)} className="w-full border border-[#cfb58d]/20 bg-[#0c121b] px-4 py-3 text-sm text-[#eee4d5] outline-none transition-colors placeholder:text-[#59616d] focus:border-[#d8ad73]" placeholder="Lahore" data-testid="input-order-city" /></label>
                <div><span className="mb-2 block font-mono-ui text-[10px] uppercase tracking-[.16em] text-[#8f99a6]">Quantity</span><div className="flex h-[46px] items-center justify-between border border-[#cfb58d]/20 bg-[#0c121b] px-3"><button type="button" className="p-1 text-[#a5acb6] transition-colors hover:text-[#d8ad73]" onClick={() => update('quantity', Math.max(1, form.quantity - 1))} aria-label="Decrease quantity" data-testid="button-decrease-quantity"><Minus size={15} /></button><span className="font-mono-ui text-sm text-[#eee4d5]" data-testid="text-order-quantity">{form.quantity}</span><button type="button" className="p-1 text-[#a5acb6] transition-colors hover:text-[#d8ad73]" onClick={() => update('quantity', Math.min(5, form.quantity + 1))} aria-label="Increase quantity" data-testid="button-increase-quantity"><Plus size={15} /></button></div></div>
              </div>
              <label className="block"><span className="mb-2 block font-mono-ui text-[10px] uppercase tracking-[.16em] text-[#8f99a6]">Delivery address</span><textarea required value={form.address} onChange={(event) => update('address', event.target.value)} rows={3} className="w-full resize-none border border-[#cfb58d]/20 bg-[#0c121b] px-4 py-3 text-sm text-[#eee4d5] outline-none transition-colors placeholder:text-[#59616d] focus:border-[#d8ad73]" placeholder="House, street, area" data-testid="input-order-address" /></label>
              <div className="flex items-center justify-between border-t border-[#cfb58d]/15 pt-5"><span className="font-mono-ui text-[10px] uppercase tracking-[.18em] text-[#8f99a6]">Total on arrival</span><span className="font-display text-2xl text-[#e8c796]" data-testid="text-order-total">PKR {total.toLocaleString()}</span></div>
              <button type="submit" className="order-glow flex w-full items-center justify-center gap-3 bg-[#d8ad73] px-6 py-4 font-mono-ui text-[10px] uppercase tracking-[.24em] text-[#111923] hover:bg-[#edc993]" data-testid="button-submit-order">Place COD request <ArrowRight size={15} /></button>
              <p className="flex items-center justify-center gap-2 text-center text-[11px] text-[#69727e]"><ShieldCheck size={14} className="text-[#d8ad73]" /> No payment details required</p>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

function WebGLProductScene() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const frameRef = useRef<number | null>(null);
  const pointerRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const gl = canvas.getContext('webgl', { alpha: false, antialias: true });
    if (!gl) return;

    const vertexSource = `
      attribute vec2 position;
      varying vec2 uv;
      void main() {
        uv = position * 0.5 + 0.5;
        gl_Position = vec4(position, 0.0, 1.0);
      }
    `;
    const fragmentSource = `
      precision highp float;
      varying vec2 uv;
      uniform vec2 resolution;
      uniform vec2 pointer;
      uniform float time;

      float box(vec2 p, vec2 b, float r) {
        vec2 q = abs(p) - b + r;
        return length(max(q, 0.0)) + min(max(q.x, q.y), 0.0) - r;
      }

      void main() {
        vec2 p = (uv - 0.5) * vec2(resolution.x / resolution.y, 1.0);
        float floatY = sin(time * 0.0012) * 0.018;
        float tilt = pointer.x * 0.06;
        p.y -= floatY;
        p.x -= tilt * p.y * 0.15;

        vec3 bg = vec3(0.035, 0.055, 0.08);
        float halo = exp(-length((p - vec2(pointer.x * 0.08, pointer.y * 0.04)) * vec2(1.0, 1.3)) * 2.5);
        bg += vec3(0.23, 0.14, 0.07) * halo * 0.18;

        float body = box(p - vec2(0.0, -0.06), vec2(0.19, 0.30), 0.07);
        float shoulders = box(p - vec2(0.0, 0.22), vec2(0.14, 0.085), 0.035);
        float neck = box(p - vec2(0.0, 0.33), vec2(0.082, 0.105), 0.025);
        float cap = box(p - vec2(0.0, 0.445), vec2(0.105, 0.065), 0.024);
        float shape = min(min(body, shoulders), neck);
        float glass = 1.0 - smoothstep(-0.008, 0.008, shape);
        float glassEdge = 1.0 - smoothstep(0.0, 0.018, abs(shape));
        float metal = 1.0 - smoothstep(-0.008, 0.008, cap);

        float edge = smoothstep(0.16, 0.0, abs(p.x + pointer.x * 0.03));
        float reflection = pow(max(0.0, 1.0 - abs(p.x + pointer.x * 0.04) / 0.22), 5.0);
        float warm = 0.5 + 0.5 * sin(p.y * 13.0 + time * 0.0003);
        vec3 amber = mix(vec3(0.16, 0.035, 0.008), vec3(0.72, 0.24, 0.035), warm * 0.45 + 0.25);
        amber += vec3(0.48, 0.20, 0.05) * reflection;
        amber += vec3(0.16, 0.07, 0.02) * edge;
        vec3 gold = mix(vec3(0.35, 0.18, 0.07), vec3(0.92, 0.63, 0.28), reflection * 0.8 + 0.2);

        vec3 color = bg;
        color = mix(color, amber, glass);
        color += vec3(0.45, 0.22, 0.07) * glassEdge * 0.7;
        color = mix(color, gold, metal);

        float ground = exp(-pow((p.y + 0.40) * 18.0, 2.0)) * exp(-pow(p.x * 3.0, 2.0));
        color += vec3(0.22, 0.10, 0.035) * ground;
        gl_FragColor = vec4(color, 1.0);
      }
    `;

    const compile = (type: number, source: string) => {
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      return gl.getShaderParameter(shader, gl.COMPILE_STATUS) ? shader : null;
    };
    const vertex = compile(gl.VERTEX_SHADER, vertexSource);
    const fragment = compile(gl.FRAGMENT_SHADER, fragmentSource);
    if (!vertex || !fragment) return;
    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vertex);
    gl.attachShader(program, fragment);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return;
    gl.useProgram(program);

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
    const position = gl.getAttribLocation(program, 'position');
    gl.enableVertexAttribArray(position);
    gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);
    const resolution = gl.getUniformLocation(program, 'resolution');
    const pointer = gl.getUniformLocation(program, 'pointer');
    const time = gl.getUniformLocation(program, 'time');

    const resize = () => {
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = canvas.clientWidth * ratio;
      canvas.height = canvas.clientHeight * ratio;
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.uniform2f(resolution, canvas.width, canvas.height);
    };
    const move = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointerRef.current.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      pointerRef.current.y = -(((event.clientY - rect.top) / rect.height) * 2 - 1);
      const host = canvas.parentElement;
      host?.style.setProperty('--tilt-x', `${pointerRef.current.y * -5}deg`);
      host?.style.setProperty('--tilt-y', `${pointerRef.current.x * 7}deg`);
      const card = canvas.closest('.product-card') as HTMLElement | null;
      card?.style.setProperty('--card-rotate-x', `${pointerRef.current.y * -3.5}deg`);
      card?.style.setProperty('--card-rotate-y', `${pointerRef.current.x * 5}deg`);
      host?.style.setProperty('--glare-x', `${((pointerRef.current.x + 1) / 2) * 100}%`);
      host?.style.setProperty('--glare-y', `${((pointerRef.current.y + 1) / 2) * 100}%`);
    };
    const leave = () => {
      pointerRef.current.x *= 0.35;
      pointerRef.current.y *= 0.35;
      const host = canvas.parentElement;
      host?.style.setProperty('--tilt-x', '0deg');
      host?.style.setProperty('--tilt-y', '0deg');
      host?.style.setProperty('--glare-x', '50%');
      host?.style.setProperty('--glare-y', '38%');
      const card = canvas.closest('.product-card') as HTMLElement | null;
      card?.style.setProperty('--card-rotate-x', '0deg');
      card?.style.setProperty('--card-rotate-y', '0deg');
    };
    const render = (now: number) => {
      gl.uniform1f(time, now);
      gl.uniform2f(pointer, pointerRef.current.x, pointerRef.current.y);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      frameRef.current = requestAnimationFrame(render);
    };

    resize();
    window.addEventListener('resize', resize);
    canvas.addEventListener('pointermove', move);
    canvas.addEventListener('pointerleave', leave);
    frameRef.current = requestAnimationFrame(render);
    return () => {
      window.removeEventListener('resize', resize);
      canvas.removeEventListener('pointermove', move);
      canvas.removeEventListener('pointerleave', leave);
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
      gl.deleteProgram(program);
    };
  }, []);

  return (
    <div className="relative h-full w-full overflow-hidden bg-[#0c111a]" data-testid="webgl-product-scene">
      <canvas ref={canvasRef} className="h-full w-full" aria-label="Interactive floating Midnight Drive bottle" />
      <div className="scene-grid pointer-events-none absolute inset-0" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_38%,transparent_0%,transparent_46%,rgba(5,8,13,.36)_100%)]" />
      <div className="scene-glare pointer-events-none absolute inset-0" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[370px] w-[220px] -translate-x-1/2 -translate-y-1/2 [perspective:900px] sm:h-[490px] sm:w-[270px]">
        <div className="bottle-3d relative h-full w-full" style={{ transform: 'rotateX(var(--tilt-x, 0deg)) rotateY(var(--tilt-y, 0deg))' }}>
          <div className="bottle-shadow absolute bottom-[3%] left-1/2 h-8 w-44 -translate-x-1/2 rounded-[50%] bg-black/70 blur-xl" />
          <div className="bottle-neck absolute left-1/2 top-[13%] h-[16%] w-[28%] -translate-x-1/2 rounded-t-[28%] border border-[#a9652f]/55 bg-gradient-to-r from-[#160802] via-[#783014] to-[#210b03] shadow-[inset_10px_0_15px_rgba(255,179,104,.13),inset_-8px_0_15px_rgba(0,0,0,.7)]" />
          <div className="bottle-cap absolute left-1/2 top-[5%] h-[12%] w-[35%] -translate-x-1/2 rounded-[28%] border border-[#e2aa60]/60 bg-gradient-to-r from-[#43210e] via-[#d19752] to-[#6e3817] shadow-[inset_6px_0_10px_rgba(255,228,168,.3),inset_-8px_0_12px_rgba(28,8,2,.7),0_4px_12px_rgba(0,0,0,.5)]" />
          <div className="bottle-body absolute bottom-[8%] left-1/2 h-[70%] w-[68%] -translate-x-1/2 rounded-[21%_21%_13%_13%] border border-[#a85c28]/70 bg-gradient-to-r from-[#180a04] via-[#6e270d] via-45% to-[#200b04] shadow-[inset_15px_0_25px_rgba(245,166,77,.14),inset_-18px_0_25px_rgba(0,0,0,.7),0_18px_30px_rgba(0,0,0,.55)]">
            <div className="absolute left-[13%] top-[5%] h-[82%] w-[9%] rounded-full bg-[#ffc27d]/25 blur-[3px]" />
            <div className="absolute inset-x-[10%] top-[35%] border-y border-[#d8ad73]/45 bg-[#0e1117]/85 px-2 py-3 text-center shadow-[0_0_18px_rgba(0,0,0,.35)] sm:py-4">
              <p className="font-mono-ui text-[7px] uppercase tracking-[.18em] text-[#e8c796]">Men&apos;s Aura</p>
              <p className="mt-2 font-display text-xl leading-[.9] text-[#e9c38d] sm:text-2xl">Midnight</p>
              <p className="font-display text-xl leading-[.9] text-[#e9c38d] sm:text-2xl">Drive</p>
              <p className="mt-2 font-mono-ui text-[5px] uppercase tracking-[.12em] text-[#b9824e]">Massage oil · 100 ml</p>
            </div>
          </div>
        </div>
      </div>
      <div className="pointer-events-none absolute left-1/2 top-[44%] w-[136px] -translate-x-1/2 -translate-y-1/2 text-center text-[#e8c796] drop-shadow-[0_0_12px_rgba(216,173,115,.24)]" style={{ transform: 'translate(-50%, -50%) rotate(-1deg)' }}>
        <div className="border-y border-[#d8ad73]/45 py-2">
          <p className="font-mono-ui text-[8px] uppercase tracking-[.2em]">Men&apos;s Aura</p>
          <p className="mt-2 font-display text-[21px] leading-none">Midnight</p>
          <p className="font-display text-[21px] leading-none">Drive</p>
          <p className="mt-2 font-mono-ui text-[7px] uppercase tracking-[.14em] text-[#b9824e]">Long lasting massage oil</p>
        </div>
      </div>
      <div className="pointer-events-none absolute left-5 top-5 flex items-center gap-2 font-mono-ui text-[9px] uppercase tracking-[.2em] text-[#d8ad73]"><span className="h-1.5 w-1.5 rounded-full bg-[#d8ad73] shadow-[0_0_10px_#d8ad73]" /> Live formula</div>
      <div className="pointer-events-none absolute bottom-5 left-5 right-5 flex items-center justify-between font-mono-ui text-[9px] uppercase tracking-[.2em] text-[#7f8792]"><span>Move to explore</span><span>100 ML / 01</span></div>
    </div>
  );
}

function Home() {
  const [orderOpen, setOrderOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeIngredient, setActiveIngredient] = useState(0);
  const storyRef = useReveal();
  const benefitsRef = useReveal();
  const ingredientsRef = useReveal();
  const reviewsRef = useReveal();
  const ritualRef = useReveal();

  const openOrder = () => {
    setOrderOpen(true);
    setMenuOpen(false);
  };
  const closeMenu = () => setMenuOpen(false);

  return (
    <main className="aura-page min-h-[100dvh] text-[#eee4d5]">
      <div className="noise" />
      <header className="absolute left-0 right-0 top-0 z-40">
        <nav className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-5 lg:px-10 lg:py-7" aria-label="Main navigation">
          <a href="#top" className="flex items-center gap-3 text-[#e7c18b]" onClick={closeMenu} data-testid="link-wordmark">
            <StallionMark className="h-9 w-8" />
            <span className="font-display text-[17px] tracking-[.12em]">MEN'S AURA</span>
          </a>
          <div className="hidden items-center gap-8 lg:flex">
            {['Benefits', 'Ingredients', 'How to use', 'Reviews'].map((item) => (
              <a key={item} href={`#${item.toLowerCase().replaceAll(' ', '-')}`} className="font-mono-ui text-[10px] uppercase tracking-[.2em] text-[#9ba2ab] transition-colors hover:text-[#e8c796]" data-testid={`link-nav-${item.toLowerCase().replaceAll(' ', '-')}`}>{item}</a>
            ))}
            <button onClick={openOrder} className="order-glow flex items-center gap-2 border border-[#d8ad73]/65 px-5 py-3 font-mono-ui text-[10px] uppercase tracking-[.2em] text-[#e8c796]" data-testid="button-nav-order">Order now <ArrowRight size={14} /></button>
          </div>
          <button type="button" className="text-[#e8c796] lg:hidden" onClick={() => setMenuOpen((open) => !open)} aria-label="Toggle menu" data-testid="button-toggle-menu">{menuOpen ? <X size={23} /> : <Menu size={23} />}</button>
        </nav>
        {menuOpen && <div className="border-y border-[#cfb58d]/20 bg-[#0c111a]/95 px-6 py-6 backdrop-blur-md lg:hidden"><div className="flex flex-col gap-5">{['Benefits', 'Ingredients', 'How to use', 'Reviews'].map((item) => <a key={item} href={`#${item.toLowerCase().replaceAll(' ', '-')}`} onClick={closeMenu} className="font-mono-ui text-[11px] uppercase tracking-[.2em] text-[#c2c5c8]" data-testid={`link-mobile-${item.toLowerCase().replaceAll(' ', '-')}`}>{item}</a>)}<button onClick={openOrder} className="mt-1 flex w-full items-center justify-center gap-2 bg-[#d8ad73] py-3 font-mono-ui text-[10px] uppercase tracking-[.2em] text-[#101720]" data-testid="button-mobile-order">Order now <ArrowRight size={14} /></button></div></div>}
      </header>

      <section id="top" className="relative min-h-[760px] overflow-hidden border-b border-[#cfb58d]/10 sm:min-h-[860px]">
        <div className="hero-grid absolute inset-0 opacity-70" />
        <div className="absolute -right-40 top-16 h-[600px] w-[600px] rounded-full bg-[#785432]/10 blur-3xl breathe" />
        <div className="relative mx-auto grid min-h-[760px] max-w-[1400px] items-center px-6 pb-10 pt-32 sm:min-h-[860px] lg:grid-cols-[1fr_.9fr] lg:px-10 lg:pb-0 lg:pt-24">
          <div className="hero-copy max-w-[650px]">
            <div className="reveal flex items-center gap-3 font-mono-ui text-[10px] uppercase tracking-[.3em] text-[#d8ad73]"><span className="h-px w-9 bg-[#d8ad73]" /> Private care, distilled</div>
            <h1 className="reveal delay-1 mt-7 max-w-[680px] font-display text-[3.7rem] leading-[.96] tracking-[-.04em] text-[#f1e8da] sm:text-[5.7rem] lg:text-[7rem]">Unleash Pure<br /><em className="text-[#d8ad73]">Vitality.</em><br /><span className="text-[#f1e8da]">Midnight Drive.</span></h1>
            <p className="reveal delay-2 mt-8 max-w-[470px] text-[15px] leading-7 text-[#9ba2ab] sm:text-base">A premium massage oil for the moments that belong to you. Plant-powered warmth, a refined glide, and a ritual that stays after the lights go down.</p>
            <div className="reveal delay-3 mt-9 flex flex-col gap-4 sm:flex-row sm:items-center">
              <button onClick={openOrder} className="order-glow flex items-center justify-center gap-3 bg-[#d8ad73] px-7 py-4 font-mono-ui text-[10px] uppercase tracking-[.22em] text-[#111923]" data-testid="button-hero-order">Order with cash on delivery <ArrowRight size={16} /></button>
              <a href="#ingredients" className="gold-hover flex items-center justify-center gap-2 border border-[#cfb58d]/30 px-7 py-4 font-mono-ui text-[10px] uppercase tracking-[.22em] text-[#c8c1b7]" data-testid="link-explore-ingredients">Explore the formula <ArrowDown size={15} /></a>
            </div>
            <div className="reveal delay-3 mt-11 flex flex-wrap items-center gap-x-7 gap-y-3 text-[11px] text-[#777f8b]"><span className="flex items-center gap-2"><Truck size={14} className="text-[#d8ad73]" /> Delivery across Pakistan</span><span className="flex items-center gap-2"><ShieldCheck size={14} className="text-[#d8ad73]" /> Pay when it arrives</span></div>
          </div>
          <div className="relative mt-10 flex justify-center lg:mt-0 lg:justify-end">
            <div className="absolute bottom-8 right-8 h-[78%] w-[80%] border border-[#d8ad73]/20 sm:right-10 lg:right-4" />
             <div className="product-card relative h-[430px] w-[min(100%,460px)] overflow-hidden border border-[#cfb58d]/25 bg-[#131a23] product-shadow sm:h-[570px] lg:h-[655px]">
               <WebGLProductScene />
             </div>
          </div>
        </div>
        <div className="absolute bottom-5 left-6 font-mono-ui text-[9px] uppercase tracking-[.28em] text-[#656d78] lg:left-10">01 / 05</div>
      </section>

      <div className="overflow-hidden border-b border-[#cfb58d]/10 bg-[#101720] py-4">
        <div className="marquee-track flex w-max items-center gap-8 whitespace-nowrap font-mono-ui text-[10px] uppercase tracking-[.25em] text-[#8b7b66]">{Array.from({ length: 2 }).flatMap((_, index) => ['Private ritual', 'Natural actives', 'Long-lasting glide', 'Made for presence'].map((item) => <span key={`${item}-${index}`} className="flex items-center gap-8"><span>{item}</span><Sparkles size={12} className="text-[#d8ad73]" /></span>))}</div>
      </div>

      <section ref={storyRef} className="reveal relative mx-auto max-w-[1400px] px-6 py-24 lg:px-10 lg:py-36">
        <div className="grid gap-12 lg:grid-cols-[.75fr_1.25fr] lg:gap-24">
          <div><p className="font-mono-ui text-[10px] uppercase tracking-[.28em] text-[#d8ad73]">A different kind of confidence</p><div className="mt-6 h-px w-20 bg-[#d8ad73]" /></div>
          <div><h2 className="max-w-[850px] font-display text-4xl leading-[1.12] text-[#ede3d5] sm:text-5xl lg:text-[4.25rem]">Slow down enough to feel <em className="text-[#d8ad73]">everything.</em></h2><p className="mt-8 max-w-[620px] text-base leading-8 text-[#969ea9]">Midnight Drive was made for the part of the day when performance gives way to presence. Five considered ingredients, blended to bring warmth, ease, and a smoother sense of connection to your personal ritual.</p><a href="#how-to-use" className="mt-8 inline-flex items-center gap-3 font-mono-ui text-[10px] uppercase tracking-[.22em] text-[#e8c796] transition-colors hover:text-[#f3dbb2]" data-testid="link-story-ritual">Discover the ritual <ArrowRight size={15} /></a></div>
        </div>
      </section>

      <section id="benefits" ref={benefitsRef} className="reveal border-y border-[#cfb58d]/10 bg-[#111923]">
        <div className="mx-auto grid max-w-[1400px] lg:grid-cols-[.95fr_1.05fr]">
          <div className="relative min-h-[470px] overflow-hidden border-b border-[#cfb58d]/10 bg-[#151e29] p-8 sm:p-12 lg:border-b-0 lg:border-r lg:p-16"><div className="absolute -bottom-28 -left-16 h-96 w-96 rounded-full border border-[#d8ad73]/20" /><div className="absolute -bottom-16 -left-4 h-72 w-72 rounded-full border border-[#d8ad73]/15" /><div className="relative z-10 flex h-full flex-col justify-between"><div><p className="font-mono-ui text-[10px] uppercase tracking-[.28em] text-[#d8ad73]">The experience</p><h2 className="mt-5 max-w-[370px] font-display text-5xl leading-[1.02] text-[#eee4d5] sm:text-6xl">Built for the<br /><em className="text-[#d8ad73]">after hours.</em></h2></div><div className="flex items-end justify-between"><p className="max-w-[245px] text-sm leading-6 text-[#8e98a5]">Not a quick fix. A richer way to return to your body.</p><span className="font-display text-7xl text-[#293543]">02</span></div></div></div>
          <div className="grid sm:grid-cols-2">{[{ icon: Zap, title: 'Awaken warmth', copy: 'A quiet spark that turns your attention inward.' }, { icon: Sparkles, title: 'Velvet glide', copy: 'An elegant texture that moves with you, not against you.' }, { icon: Clock3, title: 'Lasting ease', copy: 'A formula designed to stay present through the whole ritual.' }, { icon: CircleCheck, title: 'Cleanly considered', copy: 'Five recognisable ingredients. Nothing unnecessary.' }].map(({ icon: Icon, title, copy }, index) => <div key={title} className={`border-b border-[#cfb58d]/10 p-8 sm:p-10 ${index % 2 === 0 ? 'sm:border-r' : ''} ${index > 1 ? 'sm:border-b-0' : ''}`}><Icon size={21} strokeWidth={1.2} className="text-[#d8ad73]" /><h3 className="mt-16 font-display text-2xl text-[#e9dfd1]">{title}</h3><p className="mt-3 text-sm leading-6 text-[#89929e]">{copy}</p></div>)}</div>
        </div>
      </section>

      <section id="ingredients" ref={ingredientsRef} className="reveal mx-auto max-w-[1400px] px-6 py-24 lg:px-10 lg:py-36">
        <div className="flex flex-col justify-between gap-7 sm:flex-row sm:items-end"><div><p className="font-mono-ui text-[10px] uppercase tracking-[.28em] text-[#d8ad73]">The formula / 05</p><h2 className="mt-5 font-display text-5xl text-[#eee4d5] sm:text-6xl">Nature, <em className="text-[#d8ad73]">refined.</em></h2></div><p className="max-w-[280px] text-sm leading-6 text-[#89929e]">Every active earns its place. Tap through the ingredients behind the feeling.</p></div>
        <div className="mt-16 grid gap-10 lg:grid-cols-[.72fr_1.28fr] lg:gap-24">
          <div className="relative hidden min-h-[495px] overflow-hidden border border-[#cfb58d]/15 bg-[#141c26] lg:block"><img src={productImage} alt="Midnight Drive packaging detail" className="absolute h-full w-full object-cover object-left opacity-45 mix-blend-screen" /><div className="absolute inset-0 bg-gradient-to-t from-[#0c111a] via-transparent to-[#0c111a]/20" /><div className="absolute bottom-8 left-8"><p className="font-mono-ui text-[10px] uppercase tracking-[.25em] text-[#d8ad73]">Hand-finished ritual</p><p className="mt-2 font-display text-2xl text-[#e5d7c5]">Nothing added<br />without purpose.</p></div></div>
          <div>{ingredients.map((ingredient, index) => <button type="button" key={ingredient.name} onClick={() => setActiveIngredient(index)} className={`group flex w-full items-start justify-between border-t py-5 text-left transition-colors ${activeIngredient === index ? 'border-[#d8ad73]' : 'border-[#cfb58d]/18'}`} data-testid={`button-ingredient-${ingredient.name.toLowerCase().replaceAll(' ', '-')}`}><div className="flex items-start gap-6"><span className={`font-mono-ui text-[10px] pt-1 ${activeIngredient === index ? 'text-[#d8ad73]' : 'text-[#69727d]'}`}>0{index + 1}</span><div><span className={`block font-display text-2xl transition-colors ${activeIngredient === index ? 'text-[#ead3ae]' : 'text-[#b9b8b4] group-hover:text-[#ead3ae]'}`}>{ingredient.name}</span><span className={`mt-2 block overflow-hidden text-sm leading-6 text-[#89929e] transition-all ${activeIngredient === index ? 'max-h-20 opacity-100' : 'max-h-0 opacity-0'}`}>{ingredient.copy}</span></div></div><span className={`mt-1 text-[#d8ad73] transition-transform ${activeIngredient === index ? 'rotate-90' : ''}`}><ArrowRight size={17} /></span></button>)}<div className="flex items-center gap-3 border-t border-[#cfb58d]/18 pt-5"><span className="h-2 w-2 rounded-full bg-[#d8ad73]" /><span className="font-mono-ui text-[10px] uppercase tracking-[.2em] text-[#d8ad73]">{ingredients[activeIngredient].note}</span><span className="ml-auto text-[11px] text-[#69727d]">{ingredients[activeIngredient].origin}</span></div></div>
        </div>
      </section>

      <section id="how-to-use" ref={ritualRef} className="reveal border-y border-[#cfb58d]/10 bg-[#d8ad73] text-[#111923]">
        <div className="mx-auto grid max-w-[1400px] lg:grid-cols-[.78fr_1.22fr]">
          <div className="border-b border-[#101720]/15 p-8 sm:p-12 lg:border-b-0 lg:border-r lg:p-16"><p className="font-mono-ui text-[10px] uppercase tracking-[.28em] text-[#57442d]">How to use</p><h2 className="mt-5 font-display text-5xl leading-[1.02] sm:text-6xl">Make room<br /><em>for the moment.</em></h2><p className="mt-7 max-w-sm text-sm leading-7 text-[#68553d]">Warm a few drops between your palms. Move slowly. Let the formula, and the day, settle.</p></div>
          <div className="grid sm:grid-cols-3">{[{ n: '01', title: 'Warm', copy: 'Place a few drops in your palm and let body heat activate the oils.' }, { n: '02', title: 'Apply', copy: 'Use slow, even movements on clean, dry skin. Start with less.' }, { n: '03', title: 'Stay', copy: 'Take your time. This is the part of the day with nothing to prove.' }].map((step) => <div key={step.n} className="border-b border-[#101720]/15 p-8 sm:border-b-0 sm:border-r sm:p-10 last:border-0"><span className="font-mono-ui text-[10px] tracking-[.2em] text-[#735b3a]">{step.n}</span><h3 className="mt-20 font-display text-3xl">{step.title}</h3><p className="mt-3 text-sm leading-6 text-[#68553d]">{step.copy}</p></div>)}</div>
        </div>
      </section>

      <section id="reviews" ref={reviewsRef} className="reveal mx-auto max-w-[1400px] px-6 py-24 lg:px-10 lg:py-36">
        <div className="flex items-end justify-between border-b border-[#cfb58d]/18 pb-7"><div><p className="font-mono-ui text-[10px] uppercase tracking-[.28em] text-[#d8ad73]">Notes from the night</p><h2 className="mt-4 font-display text-5xl text-[#eee4d5]">The word is <em className="text-[#d8ad73]">getting out.</em></h2></div><div className="hidden items-center gap-2 text-right sm:flex"><div className="flex gap-1">{Array.from({ length: 5 }).map((_, index) => <Star key={index} size={13} fill="#d8ad73" strokeWidth={0} />)}</div><span className="font-mono-ui text-[10px] tracking-[.12em] text-[#9ba2ab]">4.9 / 5</span></div></div>
        <div className="grid gap-0 md:grid-cols-3">{reviews.map((review, index) => <article key={review.name} className={`border-b border-[#cfb58d]/15 py-9 md:py-12 ${index < 2 ? 'md:border-r md:pr-10' : ''} ${index > 0 ? 'md:pl-10' : ''}`} data-testid={`card-review-${index}`}><div className="flex gap-1">{Array.from({ length: 5 }).map((_, starIndex) => <Star key={starIndex} size={13} fill="#d8ad73" strokeWidth={0} />)}</div><blockquote className="mt-7 font-display text-[23px] leading-[1.3] text-[#ddd5ca]">“{review.quote}”</blockquote><div className="mt-9 flex items-center gap-3"><div className="flex h-9 w-9 items-center justify-center rounded-full border border-[#d8ad73]/40 font-mono-ui text-[10px] text-[#d8ad73]">{review.initials}</div><div><p className="text-xs text-[#b9b4ac]">{review.name}</p><p className="mt-1 font-mono-ui text-[9px] uppercase tracking-[.18em] text-[#68717d]">{review.place} · Verified order</p></div></div></article>)}</div>
      </section>

      <section className="relative border-y border-[#cfb58d]/10 bg-[#111923]">
        <div className="mx-auto max-w-[1100px] px-6 py-24 text-center sm:py-32"><p className="font-mono-ui text-[10px] uppercase tracking-[.3em] text-[#d8ad73]">Your night, on your terms</p><h2 className="mx-auto mt-6 max-w-3xl font-display text-5xl leading-[1.02] text-[#eee4d5] sm:text-7xl">Keep something good<br /><em className="text-[#d8ad73]">for yourself.</em></h2><button onClick={openOrder} className="order-glow mt-10 inline-flex items-center gap-3 bg-[#d8ad73] px-8 py-4 font-mono-ui text-[10px] uppercase tracking-[.22em] text-[#111923]" data-testid="button-final-order">Order Midnight Drive <ShoppingBag size={15} /></button><p className="mt-5 font-mono-ui text-[9px] uppercase tracking-[.18em] text-[#626c78]">PKR 1,890 · Cash on delivery · 100 ml</p></div>
      </section>

      <footer className="mx-auto max-w-[1400px] px-6 pb-9 pt-12 lg:px-10">
        <div className="grid gap-12 border-b border-[#cfb58d]/15 pb-12 sm:grid-cols-2 lg:grid-cols-[1.2fr_.8fr_.8fr]"><div><a href="#top" className="flex items-center gap-3 text-[#e7c18b]" data-testid="link-footer-wordmark"><StallionMark className="h-10 w-8" /><span className="font-display text-lg tracking-[.12em]">MEN'S AURA</span></a><p className="mt-6 max-w-xs text-sm leading-6 text-[#78818d]">Natural care for the part of life that deserves more attention.</p></div><div><p className="font-mono-ui text-[10px] uppercase tracking-[.24em] text-[#d8ad73]">Explore</p><div className="mt-5 flex flex-col gap-3 text-sm text-[#9ba2ab]"><a href="#benefits" className="transition-colors hover:text-[#e8c796]" data-testid="link-footer-benefits">Benefits</a><a href="#ingredients" className="transition-colors hover:text-[#e8c796]" data-testid="link-footer-ingredients">Ingredients</a><a href="#how-to-use" className="transition-colors hover:text-[#e8c796]" data-testid="link-footer-how-to-use">How to use</a><a href="#reviews" className="transition-colors hover:text-[#e8c796]" data-testid="link-footer-reviews">Reviews</a></div></div><div><p className="font-mono-ui text-[10px] uppercase tracking-[.24em] text-[#d8ad73]">Follow the aura</p><a href="https://instagram.com" target="_blank" rel="noreferrer" className="mt-5 inline-flex items-center gap-2 text-sm text-[#9ba2ab] transition-colors hover:text-[#e8c796]" data-testid="link-instagram"><Instagram size={16} /> @mens.aura</a><p className="mt-9 max-w-[220px] text-[11px] leading-5 text-[#68717d]">For external use only. Store in a cool, dry place. Keep away from eyes and broken skin.</p></div></div>
        <div className="flex flex-col justify-between gap-3 pt-7 text-[10px] text-[#5f6873] sm:flex-row"><span>© 2025 Men's Aura. All rights reserved.</span><span className="font-mono-ui uppercase tracking-[.16em]">Made for the midnight ritual</span></div>
      </footer>
      {orderOpen && <OrderModal onClose={() => setOrderOpen(false)} />}
    </main>
  );
}

function Router() {
  return (
    <RoutedErrorBoundary>
      <Switch>
        <Route path="/" component={Home} />
        <Route component={NotFound} />
      </Switch>
    </RoutedErrorBoundary>
  );
}

function RoutedErrorBoundary({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  return <ErrorBoundary resetKey={location}>{children}</ErrorBoundary>;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;