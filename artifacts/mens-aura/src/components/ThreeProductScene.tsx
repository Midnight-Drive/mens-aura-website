import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { 
  RotateCw, 
  Sparkles, 
  Droplets, 
  Shield, 
  Flame, 
  Maximize2, 
  Eye, 
  Compass,
  Layers,
  Zap
} from 'lucide-react';

interface ThreeProductSceneProps {
  onOrderClick?: () => void;
}

export function ThreeProductScene({ onOrderClick }: ThreeProductSceneProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [activeHotspot, setActiveHotspot] = useState<string | null>(null);
  const [isAutoRotate, setIsAutoRotate] = useState(true);
  const [viewAngle, setViewAngle] = useState<'front' | 'dropper' | 'detail'>('front');
  const [isDragging, setIsDragging] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // Store refs to Three objects for cleanup and interactivity
  const sceneRef = useRef<{
    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera;
    renderer: THREE.WebGLRenderer;
    bottleGroup: THREE.Group;
    liquidMesh: THREE.Mesh;
    spotLight: THREE.SpotLight;
    goldFlakes: THREE.Points;
    targetRotation: { x: number; y: number };
    currentRotation: { x: number; y: number };
    isPointerDown: boolean;
    previousPointerPosition: { x: number; y: number };
    rafId: number | null;
  } | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight;

    // 1. SCENE
    const scene = new THREE.Scene();

    // 2. CAMERA
    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 1000);
    camera.position.set(0, 0, 7.8);

    // 3. RENDERER
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.35;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    container.appendChild(renderer.domElement);

    // 4. LIGHTING RIG (Luxury Studio Setup)
    const ambientLight = new THREE.AmbientLight(0x0e1726, 2.5);
    scene.add(ambientLight);

    // Warm Gold Key Light
    const keyLight = new THREE.DirectionalLight(0xf5dfa8, 4.2);
    keyLight.position.set(4, 5, 5);
    keyLight.castShadow = true;
    scene.add(keyLight);

    // Cool Obsidian Rim Light (Left)
    const rimLight = new THREE.DirectionalLight(0x4a7bb0, 3.0);
    rimLight.position.set(-5, 3, -3);
    scene.add(rimLight);

    // Secondary Warm Amber Fill (Bottom Right)
    const fillLight = new THREE.DirectionalLight(0xc5a059, 2.2);
    fillLight.position.set(3, -4, 2);
    scene.add(fillLight);

    // Interactive Cursor SpotLight
    const cursorSpotLight = new THREE.SpotLight(0xffecd1, 6.0, 15, Math.PI / 5, 0.4, 1.2);
    cursorSpotLight.position.set(0, 2, 6);
    scene.add(cursorSpotLight);

    // 5. PROCEDURAL 3D BOTTLE HIERARCHY
    const bottleGroup = new THREE.Group();
    bottleGroup.position.set(0, -0.4, 0);
    scene.add(bottleGroup);

    // --- A. Amber Glass Outer Body ---
    // Smooth cylinder body with rounded shoulder
    const bodyRadius = 1.22;
    const bodyHeight = 2.7;
    const bodySegments = 64;

    const bottleGeo = new THREE.CylinderGeometry(
      bodyRadius,
      bodyRadius * 0.98,
      bodyHeight,
      bodySegments,
      1,
      false
    );

    // Material: Luxury Amber Glass with Physical Transmission
    const amberGlassMaterial = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color('#381806'),
      emissive: new THREE.Color('#1a0801'),
      emissiveIntensity: 0.15,
      metalness: 0.05,
      roughness: 0.08,
      transmission: 0.82,
      thickness: 1.5,
      ior: 1.54,
      specularIntensity: 1.0,
      specularColor: new THREE.Color('#ffe2b3'),
      transparent: true,
      opacity: 0.92,
    });

    const bottleMesh = new THREE.Mesh(bottleGeo, amberGlassMaterial);
    bottleMesh.castShadow = true;
    bottleMesh.receiveShadow = true;
    bottleGroup.add(bottleMesh);

    // Rounded Bottom
    const bottomGeo = new THREE.SphereGeometry(bodyRadius * 0.98, 32, 16, 0, Math.PI * 2, 0, Math.PI * 0.5);
    bottomGeo.scale(1, 0.25, 1);
    const bottomMesh = new THREE.Mesh(bottomGeo, amberGlassMaterial);
    bottomMesh.position.set(0, -bodyHeight / 2, 0);
    bottomMesh.rotation.x = Math.PI;
    bottleGroup.add(bottomMesh);

    // Rounded Shoulder
    const shoulderGeo = new THREE.SphereGeometry(bodyRadius, 32, 16, 0, Math.PI * 2, 0, Math.PI * 0.5);
    shoulderGeo.scale(1, 0.35, 1);
    const shoulderMesh = new THREE.Mesh(shoulderGeo, amberGlassMaterial);
    shoulderMesh.position.set(0, bodyHeight / 2, 0);
    bottleGroup.add(shoulderMesh);

    // --- B. Glass Neck ---
    const neckRadius = 0.52;
    const neckHeight = 0.8;
    const neckGeo = new THREE.CylinderGeometry(neckRadius, neckRadius, neckHeight, 32);
    const neckMesh = new THREE.Mesh(neckGeo, amberGlassMaterial);
    neckMesh.position.set(0, bodyHeight / 2 + 0.35 + neckHeight / 2, 0);
    bottleGroup.add(neckMesh);

    // Neck Thread Ring
    const threadGeo = new THREE.TorusGeometry(neckRadius * 1.04, 0.04, 16, 32);
    threadGeo.rotateX(Math.PI / 2);
    const threadMesh = new THREE.Mesh(threadGeo, amberGlassMaterial);
    threadMesh.position.set(0, neckMesh.position.y - 0.1, 0);
    bottleGroup.add(threadMesh);

    // --- C. Golden Internal Oil Liquid Core ---
    const liquidGeo = new THREE.CylinderGeometry(
      bodyRadius * 0.92,
      bodyRadius * 0.9,
      bodyHeight * 0.82,
      32
    );
    const liquidMaterial = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color('#d98218'),
      emissive: new THREE.Color('#b85d0b'),
      emissiveIntensity: 0.35,
      roughness: 0.12,
      metalness: 0.1,
      transmission: 0.65,
      thickness: 0.8,
      ior: 1.42,
      transparent: true,
      opacity: 0.88,
    });
    const liquidMesh = new THREE.Mesh(liquidGeo, liquidMaterial);
    liquidMesh.position.set(0, -0.15, 0);
    bottleGroup.add(liquidMesh);

    // --- D. Floating Gold Suspended Particles (Bio-Actives / Flakes) ---
    const flakeCount = 120;
    const flakePositions = new Float32Array(flakeCount * 3);
    const flakeScales = new Float32Array(flakeCount);

    for (let i = 0; i < flakeCount; i++) {
      const r = Math.random() * (bodyRadius * 0.78);
      const theta = Math.random() * Math.PI * 2;
      const x = Math.cos(theta) * r;
      const y = (Math.random() - 0.5) * (bodyHeight * 0.75);
      const z = Math.sin(theta) * r;

      flakePositions[i * 3] = x;
      flakePositions[i * 3 + 1] = y;
      flakePositions[i * 3 + 2] = z;
      flakeScales[i] = Math.random() * 0.04 + 0.02;
    }

    const flakeGeo = new THREE.BufferGeometry();
    flakeGeo.setAttribute('position', new THREE.BufferAttribute(flakePositions, 3));
    
    const flakeMat = new THREE.PointsMaterial({
      color: 0xf5dfa8,
      size: 0.06,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
    });
    const goldFlakes = new THREE.Points(flakeGeo, flakeMat);
    bottleGroup.add(goldFlakes);

    // --- E. Rose-Gold Metallic Dropper Collar ---
    const collarRadius = 0.62;
    const collarHeight = 0.85;
    const collarGeo = new THREE.CylinderGeometry(collarRadius, collarRadius * 1.02, collarHeight, 32);
    
    // Luxury Brushed Metallic Gold
    const metallicGoldMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#d8a96c'),
      metalness: 0.92,
      roughness: 0.22,
    });

    const collarMesh = new THREE.Mesh(collarGeo, metallicGoldMat);
    collarMesh.position.set(0, neckMesh.position.y + neckHeight / 2 + collarHeight / 2 - 0.1, 0);
    collarMesh.castShadow = true;
    bottleGroup.add(collarMesh);

    // Collar Detail Fluted Grooves
    const grooveGeo = new THREE.TorusGeometry(collarRadius * 1.01, 0.025, 16, 32);
    grooveGeo.rotateX(Math.PI / 2);
    const groove1 = new THREE.Mesh(grooveGeo, metallicGoldMat);
    groove1.position.set(0, collarMesh.position.y + 0.22, 0);
    bottleGroup.add(groove1);

    const groove2 = new THREE.Mesh(grooveGeo, metallicGoldMat);
    groove2.position.set(0, collarMesh.position.y - 0.22, 0);
    bottleGroup.add(groove2);

    // --- F. Dropper Rubber Bulb (Matte Soft-Touch) ---
    const bulbGeo = new THREE.CylinderGeometry(0.42, 0.48, 0.95, 32);
    const bulbTipGeo = new THREE.SphereGeometry(0.42, 32, 16, 0, Math.PI * 2, 0, Math.PI * 0.5);
    
    const rubberMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#e8decb'),
      roughness: 0.75,
      metalness: 0.05,
    });

    const bulbMesh = new THREE.Mesh(bulbGeo, rubberMat);
    bulbMesh.position.set(0, collarMesh.position.y + collarHeight / 2 + 0.45, 0);
    bottleGroup.add(bulbMesh);

    const bulbTip = new THREE.Mesh(bulbTipGeo, rubberMat);
    bulbTip.position.set(0, bulbMesh.position.y + 0.47, 0);
    bottleGroup.add(bulbTip);

    // --- G. Glass Internal Pipette (Inside Bottle) ---
    const pipetteGeo = new THREE.CylinderGeometry(0.08, 0.08, 3.2, 16);
    const pipetteMat = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      transmission: 0.95,
      roughness: 0.1,
      ior: 1.5,
      transparent: true,
    });
    const pipette = new THREE.Mesh(pipetteGeo, pipetteMat);
    pipette.position.set(0, 0.4, 0);
    bottleGroup.add(pipette);

    // --- H. 3D Label Badge with Gold Foil Stallion & Typography ---
    const labelCanvas = document.createElement('canvas');
    labelCanvas.width = 1024;
    labelCanvas.height = 1024;
    const ctx = labelCanvas.getContext('2d');

    if (ctx) {
      // Obsidian Matte Background
      ctx.fillStyle = '#0a0f17';
      ctx.fillRect(0, 0, 1024, 1024);

      // Gold Double Foil Border
      ctx.strokeStyle = '#c5a059';
      ctx.lineWidth = 14;
      ctx.strokeRect(40, 40, 944, 944);

      ctx.strokeStyle = 'rgba(197, 160, 89, 0.45)';
      ctx.lineWidth = 4;
      ctx.strokeRect(65, 65, 894, 894);

      // Stallion Mark Symbol
      ctx.fillStyle = '#e5c583';
      ctx.beginPath();
      // Draw stylized stallion silhouette
      ctx.arc(512, 280, 80, 0, Math.PI * 2);
      ctx.fill();

      // Brand Typography
      ctx.textAlign = 'center';
      
      // Top Label
      ctx.font = 'bold 36px "DM Mono", monospace';
      ctx.fillStyle = '#c5a059';
      ctx.letterSpacing = '10px';
      ctx.fillText("MEN'S AURA", 512, 420);

      // Product Title
      ctx.font = 'bold 74px "Cinzel", serif';
      ctx.fillStyle = '#fcebc2';
      ctx.fillText('MIDNIGHT', 512, 530);
      ctx.fillText('DRIVE', 512, 620);

      // Subtitle
      ctx.font = '34px "Plus Jakarta Sans", sans-serif';
      ctx.fillStyle = '#d4af37';
      ctx.fillText('LONG LASTING MASSAGE OIL', 512, 700);

      ctx.font = 'italic 28px "Cormorant Garamond", serif';
      ctx.fillStyle = '#a1aab7';
      ctx.fillText('Natural Treatment Formula · 30ml', 512, 760);

      // Active Actives Tag
      ctx.font = 'bold 24px "DM Mono", monospace';
      ctx.fillStyle = '#c5a059';
      ctx.fillText('RAIG MAHI · CLOVE · OSTRICH BIO-OIL', 512, 850);
    }

    const labelTexture = new THREE.CanvasTexture(labelCanvas);
    labelTexture.anisotropy = 8;

    // Curved cylinder segment for the label
    const labelAngle = Math.PI * 0.85;
    const labelGeo = new THREE.CylinderGeometry(
      bodyRadius * 1.008,
      bodyRadius * 1.008,
      1.75,
      48,
      1,
      true,
      -labelAngle / 2,
      labelAngle
    );

    const labelMat = new THREE.MeshStandardMaterial({
      map: labelTexture,
      roughness: 0.45,
      metalness: 0.15,
      bumpScale: 0.02,
      side: THREE.FrontSide,
    });

    const labelMesh = new THREE.Mesh(labelGeo, labelMat);
    labelMesh.position.set(0, -0.05, 0);
    bottleGroup.add(labelMesh);

    // --- I. Floor Contact Shadow & Reflection Disc ---
    const shadowGeo = new THREE.PlaneGeometry(5, 5);
    const shadowCanvas = document.createElement('canvas');
    shadowCanvas.width = 256;
    shadowCanvas.height = 256;
    const shadowCtx = shadowCanvas.getContext('2d');
    if (shadowCtx) {
      const grad = shadowCtx.createRadialGradient(128, 128, 10, 128, 128, 120);
      grad.addColorStop(0, 'rgba(0,0,0,0.85)');
      grad.addColorStop(0.4, 'rgba(197,160,89,0.15)');
      grad.addColorStop(1, 'rgba(0,0,0,0)');
      shadowCtx.fillStyle = grad;
      shadowCtx.fillRect(0, 0, 256, 256);
    }
    const shadowTex = new THREE.CanvasTexture(shadowCanvas);
    const shadowMat = new THREE.MeshBasicMaterial({
      map: shadowTex,
      transparent: true,
      depthWrite: false,
    });
    const shadowPlane = new THREE.Mesh(shadowGeo, shadowMat);
    shadowPlane.rotation.x = -Math.PI / 2;
    shadowPlane.position.y = -bodyHeight / 2 - 0.45;
    scene.add(shadowPlane);

    // Store state refs
    sceneRef.current = {
      scene,
      camera,
      renderer,
      bottleGroup,
      liquidMesh,
      spotLight: cursorSpotLight,
      goldFlakes,
      targetRotation: { x: 0.05, y: 0.0 },
      currentRotation: { x: 0.05, y: 0.0 },
      isPointerDown: false,
      previousPointerPosition: { x: 0, y: 0 },
      rafId: null,
    };

    setIsLoaded(true);

    // 6. RENDER LOOP
    let clock = new THREE.Clock();

    const animate = () => {
      const delta = clock.getDelta();
      const elapsedTime = clock.getElapsedTime();

      if (sceneRef.current) {
        const { bottleGroup, goldFlakes, liquidMesh } = sceneRef.current;

        // Auto-rotation if enabled and not user dragging
        if (isAutoRotate && !sceneRef.current.isPointerDown) {
          sceneRef.current.targetRotation.y += delta * 0.45;
        }

        // Smooth Lerp Rotation
        sceneRef.current.currentRotation.x +=
          (sceneRef.current.targetRotation.x - sceneRef.current.currentRotation.x) * 0.08;
        sceneRef.current.currentRotation.y +=
          (sceneRef.current.targetRotation.y - sceneRef.current.currentRotation.y) * 0.08;

        bottleGroup.rotation.x = sceneRef.current.currentRotation.x;
        bottleGroup.rotation.y = sceneRef.current.currentRotation.y;

        // Floating Levitation Motion
        bottleGroup.position.y = -0.38 + Math.sin(elapsedTime * 1.5) * 0.08;

        // Gentle Floating Gold Specks Animation
        if (goldFlakes) {
          const positions = goldFlakes.geometry.attributes.position.array as Float32Array;
          for (let i = 0; i < flakeCount; i++) {
            positions[i * 3 + 1] += Math.sin(elapsedTime * 2 + i) * 0.001;
          }
          goldFlakes.geometry.attributes.position.needsUpdate = true;
        }

        // Liquid subtle slosh pulse
        if (liquidMesh) {
          const slosh = Math.sin(elapsedTime * 2.2) * 0.015;
          liquidMesh.scale.set(1 + slosh, 1 - slosh * 0.5, 1 + slosh);
        }

        renderer.render(scene, camera);
      }

      sceneRef.current!.rafId = requestAnimationFrame(animate);
    };

    animate();

    // Resize Handler
    const handleResize = () => {
      if (!container || !sceneRef.current) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (sceneRef.current?.rafId) {
        cancelAnimationFrame(sceneRef.current.rafId);
      }
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [isAutoRotate]);

  // Pointer Interaction Handlers for 3D Orbit Drag & Glare
  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!sceneRef.current) return;
    sceneRef.current.isPointerDown = true;
    setIsDragging(true);
    sceneRef.current.previousPointerPosition = { x: e.clientX, y: e.clientY };
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!sceneRef.current || !containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const normX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const normY = -(((e.clientY - rect.top) / rect.height) * 2 - 1);

    // Update spot light position to follow mouse
    sceneRef.current.spotLight.position.x = normX * 4;
    sceneRef.current.spotLight.position.y = normY * 3 + 2;

    if (sceneRef.current.isPointerDown) {
      const deltaX = e.clientX - sceneRef.current.previousPointerPosition.x;
      const deltaY = e.clientY - sceneRef.current.previousPointerPosition.y;

      sceneRef.current.targetRotation.y += deltaX * 0.009;
      sceneRef.current.targetRotation.x = Math.max(
        -0.35,
        Math.min(0.4, sceneRef.current.targetRotation.x + deltaY * 0.007)
      );

      sceneRef.current.previousPointerPosition = { x: e.clientX, y: e.clientY };
    }
  };

  const handlePointerUp = () => {
    if (!sceneRef.current) return;
    sceneRef.current.isPointerDown = false;
    setIsDragging(false);
  };

  // Camera preset views
  const applyViewPreset = (view: 'front' | 'dropper' | 'detail') => {
    if (!sceneRef.current) return;
    setViewAngle(view);

    if (view === 'front') {
      sceneRef.current.targetRotation = { x: 0.05, y: 0 };
    } else if (view === 'dropper') {
      sceneRef.current.targetRotation = { x: -0.28, y: 0.4 };
    } else if (view === 'detail') {
      sceneRef.current.targetRotation = { x: 0.12, y: Math.PI * 0.45 };
    }
  };

  return (
    <div className="relative mx-auto w-full max-w-[560px] select-none" data-testid="three-3d-showcase">
      {/* 3D Glowing Ambient Halo */}
      <div className="pointer-events-none absolute -inset-6 rounded-3xl bg-gradient-to-tr from-[#c5a059]/20 via-[#9e7a36]/15 to-transparent blur-3xl" />

      {/* Decorative High-End Outer Framing */}
      <div className="pointer-events-none absolute -bottom-4 -right-4 h-[92%] w-[92%] rounded-3xl border border-[#c5a059]/20 sm:-bottom-6 sm:-right-6" />
      <div className="pointer-events-none absolute -left-4 -top-4 h-[92%] w-[92%] rounded-3xl border border-[#c5a059]/15 sm:-left-6 sm:-top-6" />

      {/* Main 3D Canvas Box */}
      <div className="relative aspect-[4/5] w-full overflow-hidden rounded-3xl border border-[#c5a059]/35 bg-gradient-to-b from-[#0e1624] via-[#0b0f17] to-[#070a10] shadow-[0_30px_90px_rgba(0,0,0,0.95)]">
        {/* Top Floating Telemetry & Controls */}
        <div className="relative z-30 flex items-center justify-between border-b border-[#c5a059]/15 bg-[#0b0f17]/80 px-5 py-3.5 backdrop-blur-md">
          <div className="flex items-center gap-2.5">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#c5a059] opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[#c5a059]" />
            </span>
            <span className="font-mono-ui text-[10px] uppercase tracking-[0.25em] text-[#e5c583]">
              Real-Time WebGL 3D Studio
            </span>
          </div>

          {/* Quick Auto-Rotate Toggle */}
          <button
            type="button"
            onClick={() => setIsAutoRotate(!isAutoRotate)}
            className={`flex items-center gap-1.5 rounded-full border px-2.5 py-1 font-mono-ui text-[9px] uppercase tracking-wider transition-colors ${
              isAutoRotate
                ? 'border-[#c5a059] bg-[#c5a059]/15 text-[#e5c583]'
                : 'border-[#c5a059]/20 text-[#8c97a8] hover:text-[#f4ede2]'
            }`}
            data-testid="toggle-autorotate"
          >
            <RotateCw className={`h-3 w-3 ${isAutoRotate ? 'animate-spin' : ''}`} />
            <span>{isAutoRotate ? 'Orbit On' : 'Manual'}</span>
          </button>
        </div>

        {/* The WebGL Canvas Container */}
        <div
          ref={containerRef}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerLeave={handlePointerUp}
          className={`h-[calc(100%-115px)] w-full touch-none ${
            isDragging ? 'cursor-grabbing' : 'cursor-grab'
          }`}
          aria-label="Interactive 3D Midnight Drive Bottle - Drag to Rotate"
        />

        {/* 3D Interactive Hotspot Overlays */}
        <div className="pointer-events-none absolute inset-0 z-20">
          {/* Hotspot 1: Rose Gold Dropper */}
          <div className="pointer-events-auto absolute left-[30%] top-[24%]">
            <button
              type="button"
              onClick={() => setActiveHotspot(activeHotspot === 'dropper' ? null : 'dropper')}
              className="group relative flex h-6 w-6 items-center justify-center rounded-full border border-[#c5a059] bg-[#0b0f17]/90 text-[#e5c583] shadow-[0_0_15px_rgba(197,160,89,0.5)] transition-all hover:scale-125 hover:bg-[#c5a059] hover:text-[#0b0f17]"
              aria-label="Inspect Dropper"
            >
              <span className="absolute -inset-1 animate-ping rounded-full border border-[#c5a059]/50 opacity-75" />
              <Droplets className="h-3 w-3" />
            </button>
            {activeHotspot === 'dropper' && (
              <div className="absolute left-8 top-0 z-50 w-52 rounded-xl border border-[#c5a059]/40 bg-[#0c121d]/95 p-3 shadow-2xl backdrop-blur-xl animate-in fade-in zoom-in-95">
                <h5 className="font-editorial text-sm font-semibold text-[#f4ede2]">
                  Rose-Gold Dropper
                </h5>
                <p className="mt-1 text-[11px] leading-relaxed text-[#9aa4b5]">
                  Micro-calibrated single-drop mechanism. Delivers exact 0.5ml per application.
                </p>
              </div>
            )}
          </div>

          {/* Hotspot 2: Amber UV Glass */}
          <div className="pointer-events-auto absolute right-[28%] top-[56%]">
            <button
              type="button"
              onClick={() => setActiveHotspot(activeHotspot === 'glass' ? null : 'glass')}
              className="group relative flex h-6 w-6 items-center justify-center rounded-full border border-[#c5a059] bg-[#0b0f17]/90 text-[#e5c583] shadow-[0_0_15px_rgba(197,160,89,0.5)] transition-all hover:scale-125 hover:bg-[#c5a059] hover:text-[#0b0f17]"
              aria-label="Inspect Amber Glass"
            >
              <span className="absolute -inset-1 animate-ping rounded-full border border-[#c5a059]/50 opacity-75" />
              <Shield className="h-3 w-3" />
            </button>
            {activeHotspot === 'glass' && (
              <div className="absolute right-8 top-0 z-50 w-52 rounded-xl border border-[#c5a059]/40 bg-[#0c121d]/95 p-3 shadow-2xl backdrop-blur-xl animate-in fade-in zoom-in-95">
                <h5 className="font-editorial text-sm font-semibold text-[#f4ede2]">
                  Dark Amber UV-Block
                </h5>
                <p className="mt-1 text-[11px] leading-relaxed text-[#9aa4b5]">
                  Pharmaceutical-grade thick amber glass blocks 99.8% UV rays to protect the cold-pressed actives.
                </p>
              </div>
            )}
          </div>

          {/* Hotspot 3: 5 Actives Infusion */}
          <div className="pointer-events-auto absolute left-[26%] top-[72%]">
            <button
              type="button"
              onClick={() => setActiveHotspot(activeHotspot === 'actives' ? null : 'actives')}
              className="group relative flex h-6 w-6 items-center justify-center rounded-full border border-[#c5a059] bg-[#0b0f17]/90 text-[#e5c583] shadow-[0_0_15px_rgba(197,160,89,0.5)] transition-all hover:scale-125 hover:bg-[#c5a059] hover:text-[#0b0f17]"
              aria-label="Inspect 5 Actives"
            >
              <span className="absolute -inset-1 animate-ping rounded-full border border-[#c5a059]/50 opacity-75" />
              <Flame className="h-3 w-3" />
            </button>
            {activeHotspot === 'actives' && (
              <div className="absolute left-8 -top-8 z-50 w-52 rounded-xl border border-[#c5a059]/40 bg-[#0c121d]/95 p-3 shadow-2xl backdrop-blur-xl animate-in fade-in zoom-in-95">
                <h5 className="font-editorial text-sm font-semibold text-[#f4ede2]">
                  Golden Liquid Core
                </h5>
                <p className="mt-1 text-[11px] leading-relaxed text-[#9aa4b5]">
                  Infused with Raig Mahi, Ostrich Bio-carrier & Clove. Notice the internal amber glow.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Bottom 3D View Presets & Direct Order CTA */}
        <div className="relative z-30 flex items-center justify-between border-t border-[#c5a059]/15 bg-[#0b0f17]/85 px-4 py-3 backdrop-blur-md">
          {/* View presets */}
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => applyViewPreset('front')}
              className={`rounded-lg px-2.5 py-1 font-mono-ui text-[9px] uppercase tracking-wider transition-colors ${
                viewAngle === 'front'
                  ? 'bg-[#c5a059] font-bold text-[#0b0f17]'
                  : 'bg-[#0e1624] text-[#8c97a8] hover:text-[#f4ede2]'
              }`}
            >
              Front
            </button>
            <button
              type="button"
              onClick={() => applyViewPreset('dropper')}
              className={`rounded-lg px-2.5 py-1 font-mono-ui text-[9px] uppercase tracking-wider transition-colors ${
                viewAngle === 'dropper'
                  ? 'bg-[#c5a059] font-bold text-[#0b0f17]'
                  : 'bg-[#0e1624] text-[#8c97a8] hover:text-[#f4ede2]'
              }`}
            >
              Dropper
            </button>
            <button
              type="button"
              onClick={() => applyViewPreset('detail')}
              className={`rounded-lg px-2.5 py-1 font-mono-ui text-[9px] uppercase tracking-wider transition-colors ${
                viewAngle === 'detail'
                  ? 'bg-[#c5a059] font-bold text-[#0b0f17]'
                  : 'bg-[#0e1624] text-[#8c97a8] hover:text-[#f4ede2]'
              }`}
            >
              Side Profile
            </button>
          </div>

          {/* Interactive Hint */}
          <div className="flex items-center gap-1.5 font-mono-ui text-[10px] text-[#c5a059]">
            <Compass className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Drag 360° to Rotate</span>
            <span className="sm:hidden">Drag to Spin</span>
          </div>
        </div>
      </div>

      {/* Floating Trust Metrics under 3D Scene */}
      <div className="mt-4 flex flex-wrap items-center justify-center gap-3 text-center sm:gap-6">
        <div className="flex items-center gap-1.5 font-mono-ui text-[10px] uppercase tracking-widest text-[#9aa4b5]">
          <Zap className="h-3.5 w-3.5 text-[#c5a059]" />
          <span>Real-Time WebGL Shaders</span>
        </div>
        <span className="text-[#c5a059]/40">•</span>
        <div className="flex items-center gap-1.5 font-mono-ui text-[10px] uppercase tracking-widest text-[#9aa4b5]">
          <Layers className="h-3.5 w-3.5 text-[#c5a059]" />
          <span>Physical Light Transmission</span>
        </div>
      </div>
    </div>
  );
}
