import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { CAREER_HUBS } from '../data/portfolioData';
import { CareerHub } from '../types/portfolio';
import { TouchGlobeModal } from './TouchGlobeModal';

// Convert Lat/Lng to 3D Cartesian coordinates on sphere of radius R
function latLngToVector3(lat: number, lng: number, radius: number): THREE.Vector3 {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);
  const x = -(radius * Math.sin(phi) * Math.cos(theta));
  const z = radius * Math.sin(phi) * Math.sin(theta);
  const y = radius * Math.cos(phi);
  return new THREE.Vector3(x, y, z);
}

// Generate procedural earth texture with landmasses and subtle coordinate grid
function createProceduralEarthTexture(): THREE.CanvasTexture {
  const width = 2048;
  const height = 1024;
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');

  if (!ctx) return new THREE.CanvasTexture(canvas);

  // Deep Navy oceanic base
  ctx.fillStyle = '#061426';
  ctx.fillRect(0, 0, width, height);

  // Subtle longitude & latitude grid lines
  ctx.strokeStyle = 'rgba(201, 162, 39, 0.08)';
  ctx.lineWidth = 1;
  const stepX = width / 24;
  for (let x = 0; x <= width; x += stepX) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, height);
    ctx.stroke();
  }
  const stepY = height / 12;
  for (let y = 0; y <= height; y += stepY) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(width, y);
    ctx.stroke();
  }

  // Draw procedural continental landmass silhouettes
  ctx.fillStyle = '#0F2B4D';
  ctx.strokeStyle = '#1D3B63';
  ctx.lineWidth = 1.5;

  function drawContinent(points: [number, number][]) {
    if (!ctx) return;
    ctx.beginPath();
    points.forEach(([xPct, yPct], index) => {
      const px = xPct * width;
      const py = yPct * height;
      if (index === 0) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    });
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
  }

  // Middle East & Arabian Peninsula
  drawContinent([
    [0.55, 0.35], [0.59, 0.36], [0.63, 0.40], [0.62, 0.45],
    [0.60, 0.49], [0.57, 0.48], [0.55, 0.45], [0.53, 0.40],
  ]);

  // South Asia / Pakistan / India
  drawContinent([
    [0.63, 0.35], [0.67, 0.34], [0.70, 0.38], [0.71, 0.45],
    [0.68, 0.52], [0.66, 0.50], [0.64, 0.44], [0.62, 0.39],
  ]);

  // Africa
  drawContinent([
    [0.48, 0.36], [0.55, 0.37], [0.57, 0.45], [0.58, 0.55],
    [0.54, 0.68], [0.50, 0.75], [0.46, 0.65], [0.44, 0.48],
  ]);

  // Europe & Northern Eurasia
  drawContinent([
    [0.47, 0.22], [0.58, 0.20], [0.75, 0.22], [0.85, 0.25],
    [0.82, 0.34], [0.72, 0.35], [0.60, 0.32], [0.48, 0.30],
  ]);

  // North America
  drawContinent([
    [0.15, 0.22], [0.28, 0.20], [0.32, 0.30], [0.26, 0.45],
    [0.20, 0.42], [0.14, 0.35],
  ]);

  // South America
  drawContinent([
    [0.26, 0.48], [0.34, 0.52], [0.36, 0.65], [0.30, 0.80],
    [0.25, 0.70], [0.24, 0.54],
  ]);

  // Highlight Golden Glow on Gulf & South Asia
  const grad = ctx.createRadialGradient(0.62 * width, 0.40 * height, 10, 0.62 * width, 0.40 * height, 220);
  grad.addColorStop(0, 'rgba(201, 162, 39, 0.25)');
  grad.addColorStop(0.5, 'rgba(201, 162, 39, 0.08)');
  grad.addColorStop(1, 'rgba(201, 162, 39, 0)');
  ctx.fillStyle = grad;
  ctx.fillRect(0.50 * width, 0.25 * height, 0.30 * width, 0.35 * height);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

// Generate Great-Circle flight arc curve
function createArc(v1: THREE.Vector3, v2: THREE.Vector3, radius: number): THREE.CubicBezierCurve3 {
  const distance = v1.distanceTo(v2);
  const mid = v1.clone().add(v2).multiplyScalar(0.5);
  const elevation = radius + Math.min(distance * 0.38, radius * 0.35);
  mid.normalize().multiplyScalar(elevation);

  const control1 = v1.clone().lerp(mid, 0.5).normalize().multiplyScalar(elevation * 0.95);
  const control2 = v2.clone().lerp(mid, 0.5).normalize().multiplyScalar(elevation * 0.95);

  return new THREE.CubicBezierCurve3(v1, control1, control2, v2);
}

export const CareerGlobe3D: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedHub, setSelectedHub] = useState<CareerHub>(CAREER_HUBS[0]);
  const [isRotating, setIsRotating] = useState(true);
  const [isControlsCollapsed, setIsControlsCollapsed] = useState(false);
  const [, setIsHovered] = useState(false);

  // Popup state for touch screen users
  const [isTouchModalOpen, setIsTouchModalOpen] = useState(false);
  const [touchModalInitialHub, setTouchModalInitialHub] = useState<CareerHub>(CAREER_HUBS[0]);

  // Open touch modal focused on a hub
  const handleOpenTouchModal = (hub?: CareerHub) => {
    setTouchModalInitialHub(hub || selectedHub);
    setIsTouchModalOpen(true);
  };

  // Sync ref with isRotating state for desktop animation loop
  const isRotatingRef = useRef(isRotating);
  useEffect(() => {
    isRotatingRef.current = isRotating;
  }, [isRotating]);

  // Desktop Three.js refs
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const globeGroupRef = useRef<THREE.Group | null>(null);
  const targetRotationYRef = useRef<number>(0);
  const targetRotationXRef = useRef<number>(0.2);
  const isInteractingRef = useRef<boolean>(false);
  const pointerStartRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  // Focus on specific career hub (Desktop)
  const focusHub = useCallback((hub: CareerHub) => {
    setSelectedHub(hub);
    if (!globeGroupRef.current) return;
    const radLng = (hub.lng + 180) * (Math.PI / 180);
    const radLat = hub.lat * (Math.PI / 180);

    targetRotationYRef.current = -radLng + Math.PI / 2;
    targetRotationXRef.current = radLat * 0.65;
  }, []);

  // Initialize Desktop Embedded Three.js Viewer
  // CRITICAL: Only mounts when container is actually visible (Desktop screens >= 1024px)
  // to prevent WebGL context exhaustion on mobile devices!
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Check if element has physical width (i.e. is on desktop screen and not display:none)
    if (container.clientWidth === 0 && window.innerWidth < 1024) {
      return;
    }

    const width = container.clientWidth || 800;
    const height = container.clientHeight || 550;

    // Scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Camera
    const aspect = width / height;
    const camera = new THREE.PerspectiveCamera(40, aspect, 0.1, 1000);
    camera.position.set(0, 0, 7.8);
    cameraRef.current = camera;

    // Renderer
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance',
      });
    } catch {
      renderer = new THREE.WebGLRenderer({
        antialias: false,
        alpha: true,
      });
    }

    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setSize(width, height);
    renderer.domElement.style.touchAction = 'none';
    renderer.domElement.style.display = 'block';
    renderer.domElement.style.width = '100%';
    renderer.domElement.style.height = '100%';
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Studio Environment lighting
    try {
      const pmremGenerator = new THREE.PMREMGenerator(renderer);
      scene.environment = pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture;
      pmremGenerator.dispose();
    } catch {
      // Fallback
    }

    // 3-point lighting rig + ambient
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xfff5ea, 2.2);
    keyLight.position.set(5, 4, 6);
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0xc9a227, 1.8);
    rimLight.position.set(-6, -3, -4);
    scene.add(rimLight);

    const hemiLight = new THREE.HemisphereLight(0xe9f2ff, 0x071527, 0.8);
    scene.add(hemiLight);

    // Globe Main Group
    const globeGroup = new THREE.Group();
    scene.add(globeGroup);
    globeGroupRef.current = globeGroup;

    const R = 2.4;

    // 1. Procedural Earth PBR Surface
    const earthTexture = createProceduralEarthTexture();
    earthTexture.anisotropy = Math.min(renderer.capabilities.getMaxAnisotropy(), 8);

    const earthGeo = new THREE.SphereGeometry(R, 64, 48);
    const earthMat = new THREE.MeshPhysicalMaterial({
      map: earthTexture,
      roughness: 0.35,
      metalness: 0.18,
      clearcoat: 0.3,
      clearcoatRoughness: 0.2,
      reflectivity: 0.6,
    });
    const earthMesh = new THREE.Mesh(earthGeo, earthMat);
    globeGroup.add(earthMesh);

    // 2. Translucent Atmosphere Halo Shell
    const atmosphereGeo = new THREE.SphereGeometry(R * 1.025, 48, 36);
    const atmosphereMat = new THREE.MeshPhysicalMaterial({
      color: 0xc9a227,
      transparent: true,
      opacity: 0.12,
      roughness: 0.8,
      metalness: 0.1,
      side: THREE.BackSide,
      depthWrite: false,
    });
    const atmosphereMesh = new THREE.Mesh(atmosphereGeo, atmosphereMat);
    globeGroup.add(atmosphereMesh);

    // 3. Subtle Latitude Ring Accents
    const ringGroup = new THREE.Group();
    const ringMat = new THREE.LineBasicMaterial({
      color: 0xc9a227,
      transparent: true,
      opacity: 0.25,
    });
    [-30, 0, 30, 60].forEach((lat) => {
      const radiusAtLat = R * Math.cos(lat * (Math.PI / 180));
      const yAtLat = R * Math.sin(lat * (Math.PI / 180));
      const ringGeo = new THREE.BufferGeometry();
      const points: THREE.Vector3[] = [];
      const segs = 64;
      for (let i = 0; i <= segs; i++) {
        const theta = (i / segs) * Math.PI * 2;
        points.push(new THREE.Vector3(Math.cos(theta) * radiusAtLat, yAtLat, Math.sin(theta) * radiusAtLat));
      }
      ringGeo.setFromPoints(points);
      const ring = new THREE.Line(ringGeo, ringMat);
      ringGroup.add(ring);
    });
    globeGroup.add(ringGroup);

    // 4. Hub Coordinates & 3D Procedural Pins
    const hubPositions = new Map<string, THREE.Vector3>();
    CAREER_HUBS.forEach((hub) => {
      const pos = latLngToVector3(hub.lat, hub.lng, R);
      hubPositions.set(hub.id, pos);

      const pinGroup = new THREE.Group();
      pinGroup.position.copy(pos);
      pinGroup.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), pos.clone().normalize());

      const baseGeo = new THREE.CylinderGeometry(0.08, 0.1, 0.02, 16);
      const baseMat = new THREE.MeshStandardMaterial({
        color: 0xc9a227,
        metalness: 0.8,
        roughness: 0.2,
      });
      const baseMesh = new THREE.Mesh(baseGeo, baseMat);
      baseMesh.position.y = 0.01;
      pinGroup.add(baseMesh);

      const stemGeo = new THREE.CylinderGeometry(0.02, 0.02, 0.28, 8);
      const stemMat = new THREE.MeshStandardMaterial({
        color: 0xffffff,
        metalness: 0.9,
        roughness: 0.15,
      });
      const stemMesh = new THREE.Mesh(stemGeo, stemMat);
      stemMesh.position.y = 0.14;
      pinGroup.add(stemMesh);

      const headGeo = new THREE.SphereGeometry(0.08, 16, 16);
      const headMat = new THREE.MeshPhysicalMaterial({
        color: 0xc9a227,
        emissive: 0x664d08,
        metalness: 0.9,
        roughness: 0.1,
        clearcoat: 1.0,
      });
      const headMesh = new THREE.Mesh(headGeo, headMat);
      headMesh.position.y = 0.32;
      pinGroup.add(headMesh);

      globeGroup.add(pinGroup);
    });

    // 5. Connect Hubs with Great-Circle Flight Arcs
    const arcConnections = [
      ['hub-pakistan', 'hub-saudi'],
      ['hub-saudi', 'hub-uae'],
      ['hub-uae', 'hub-pakistan'],
    ];

    arcConnections.forEach(([id1, id2]) => {
      const v1 = hubPositions.get(id1);
      const v2 = hubPositions.get(id2);
      if (!v1 || !v2) return;

      const curve = createArc(v1, v2, R);
      const tubeGeo = new THREE.TubeGeometry(curve, 48, 0.018, 8, false);
      const tubeMat = new THREE.MeshStandardMaterial({
        color: 0xc9a227,
        emissive: 0x3d2f06,
        roughness: 0.2,
        metalness: 0.85,
        transparent: true,
        opacity: 0.9,
      });
      const tubeMesh = new THREE.Mesh(tubeGeo, tubeMat);
      globeGroup.add(tubeMesh);
    });

    // Initial orientation: Center on the Gulf / South Asia region
    const initialHub = CAREER_HUBS[0];
    const initialLng = (initialHub.lng + 180) * (Math.PI / 180);
    targetRotationYRef.current = -initialLng + Math.PI / 2;
    targetRotationXRef.current = (initialHub.lat * (Math.PI / 180)) * 0.65;
    globeGroup.rotation.y = targetRotationYRef.current;
    globeGroup.rotation.x = targetRotationXRef.current;

    // Desktop interaction handlers
    let isDragging = false;
    let prevPointerPos = { x: 0, y: 0 };

    const handlePointerDown = (e: PointerEvent) => {
      isDragging = true;
      isInteractingRef.current = true;
      prevPointerPos = { x: e.clientX, y: e.clientY };
      pointerStartRef.current = { x: e.clientX, y: e.clientY };
      try {
        (e.target as HTMLElement)?.setPointerCapture(e.pointerId);
      } catch {
        // fallback
      }
    };

    const handlePointerMove = (e: PointerEvent) => {
      if (!isDragging || !globeGroupRef.current) return;
      const deltaX = e.clientX - prevPointerPos.x;
      const deltaY = e.clientY - prevPointerPos.y;

      targetRotationYRef.current += deltaX * 0.005;
      targetRotationXRef.current += deltaY * 0.005;
      targetRotationXRef.current = Math.max(-0.9, Math.min(0.9, targetRotationXRef.current));
      prevPointerPos = { x: e.clientX, y: e.clientY };
    };

    const handlePointerUp = (e: PointerEvent) => {
      isDragging = false;
      isInteractingRef.current = false;
      try {
        (e.target as HTMLElement)?.releasePointerCapture(e.pointerId);
      } catch {
        // fallback
      }
    };

    const domElement = renderer.domElement;
    domElement.addEventListener('pointerdown', handlePointerDown);
    domElement.addEventListener('pointermove', handlePointerMove);
    domElement.addEventListener('pointerup', handlePointerUp);
    domElement.addEventListener('pointercancel', handlePointerUp);

    // Resize observer
    const handleResize = () => {
      if (!container || !rendererRef.current || !cameraRef.current) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      if (w === 0 || h === 0) return;
      cameraRef.current.aspect = w / h;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(w, h);
    };

    const resizeObserver = new ResizeObserver(() => handleResize());
    resizeObserver.observe(container);
    window.addEventListener('resize', handleResize);

    // Animation loop with exponential damping
    let frameId = 0;
    const clock = new THREE.Clock();

    function tick() {
      const dt = clock.getDelta();

      if (globeGroupRef.current) {
        if (!isInteractingRef.current && isRotatingRef.current) {
          targetRotationYRef.current += 0.0025;
        }

        globeGroupRef.current.rotation.y = THREE.MathUtils.damp(
          globeGroupRef.current.rotation.y,
          targetRotationYRef.current,
          4.0,
          dt
        );
        globeGroupRef.current.rotation.x = THREE.MathUtils.damp(
          globeGroupRef.current.rotation.x,
          targetRotationXRef.current,
          4.0,
          dt
        );
      }

      renderer.render(scene, camera);
      frameId = requestAnimationFrame(tick);
    }

    frameId = requestAnimationFrame(tick);

    requestAnimationFrame(handleResize);

    // Cleanup
    return () => {
      cancelAnimationFrame(frameId);
      resizeObserver.disconnect();
      window.removeEventListener('resize', handleResize);

      domElement.removeEventListener('pointerdown', handlePointerDown);
      domElement.removeEventListener('pointermove', handlePointerMove);
      domElement.removeEventListener('pointerup', handlePointerUp);
      domElement.removeEventListener('pointercancel', handlePointerUp);

      earthGeo.dispose();
      earthMat.dispose();
      earthTexture.dispose();
      atmosphereGeo.dispose();
      atmosphereMat.dispose();
      renderer.dispose();

      if (container.contains(domElement)) {
        container.removeChild(domElement);
      }
    };
  }, []);

  return (
    <section id="career-hubs" className="scroll-mt-24 bg-background py-16 sm:py-24 relative overflow-hidden">
      <div className="relative z-10 mx-auto min-w-0 max-w-6xl px-4 sm:px-6">
        {/* Section Header */}
        <div className="mb-8 flex min-w-0 flex-col gap-4 sm:mb-12 sm:flex-row sm:items-end sm:justify-between sm:gap-5">
          <div className="min-w-0">
            <p className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.3em] text-gold">
              <span className="font-display text-sm tracking-normal">✦</span>
              <span className="h-px w-8 sm:w-10 bg-gold/50" />
              Global Footprint
            </p>
            <h2 className="mt-3 break-words font-display text-3xl font-bold leading-tight text-foreground sm:mt-4 sm:text-4xl md:text-5xl">
              Cross-border operations.
            </h2>
          </div>
          <p className="max-w-md break-words text-xs text-muted-foreground sm:text-sm sm:text-base">
            Interactive 3D model connecting project corridors across Lahore, Sharma (NEOM City), and Dubai.
          </p>
        </div>

        {/* =========================================================================
            TOUCH SCREEN VIEW: Opens in an interactive popup so user can move the 3D globe 
            freely in every direction (360° multi-axis touch gestures, pinch zoom, & controls).
           ========================================================================= */}
        <div className="block lg:hidden">
          <div
            onClick={() => handleOpenTouchModal()}
            className="group relative overflow-hidden rounded-2xl border border-gold/35 bg-gradient-to-b from-[#0e2440] via-[#071627] to-[#040d18] p-5 sm:p-7 shadow-2xl cursor-pointer transition-all hover:border-gold/60 active:scale-[0.99]"
          >
            {/* Glowing background aura */}
            <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full border border-gold/15 bg-radial from-gold/10 via-transparent to-transparent blur-xl" />
            <div className="pointer-events-none absolute -left-12 -bottom-12 h-56 w-56 rounded-full border border-gold/10 bg-radial from-gold/5 via-transparent to-transparent blur-lg" />

            <div className="relative z-10 flex flex-col items-center text-center">
              {/* Globe Visual Preview Badge with Pulse */}
              <div className="relative mb-4 flex h-24 w-24 sm:h-28 sm:w-28 items-center justify-center rounded-full border border-gold/40 bg-gradient-to-br from-[#0c233d] to-[#05111f] shadow-inner shadow-gold/20 group-hover:scale-105 transition-transform duration-300">
                {/* Simulated Lat/Long rings */}
                <div className="absolute inset-1.5 rounded-full border border-gold/25 border-dashed animate-[spin_40s_linear_infinite]" />
                <div className="absolute inset-4 rounded-full border border-gold/20" />
                <span className="text-3xl sm:text-4xl drop-shadow-[0_0_12px_rgba(201,162,39,0.5)]">
                  🌍
                </span>
                {/* Active Hub Pulsing Dots */}
                <span className="absolute top-4 right-5 h-2 w-2 rounded-full bg-gold shadow-[0_0_8px_#c9a227] animate-ping" />
                <span className="absolute bottom-5 left-6 h-2 w-2 rounded-full bg-gold shadow-[0_0_8px_#c9a227]" />
              </div>

              {/* Tag / Badge */}
              <div className="inline-flex items-center gap-1.5 rounded-full border border-gold/40 bg-gold/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-gold mb-2.5">
                <span>📱 Touch Screen 3D Viewer</span>
              </div>

              {/* Title & Description */}
              <h3 className="font-display text-xl sm:text-2xl font-bold text-foreground">
                Explore 3D Global Model
              </h3>
              <p className="mt-2 max-w-sm text-xs sm:text-sm text-muted-foreground leading-relaxed">
                Touch screen par 3D model popup me open karein taake aap isay asani se har direction me 360° ghooma sakein.
              </p>

              {/* Primary Launch Button */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleOpenTouchModal();
                }}
                className="mt-5 inline-flex items-center justify-center gap-2.5 rounded-full bg-gold px-6 py-3 text-xs sm:text-sm font-bold text-background shadow-lg shadow-gold/20 transition-all hover:bg-glow hover:shadow-gold/30 active:scale-95 cursor-pointer"
              >
                <span>✨ Open 3D Globe in Popup</span>
                <span className="text-base leading-none">↗</span>
              </button>

              {/* Quick Hub Jump Buttons */}
              <div className="mt-5 pt-4 border-t border-white/10 w-full flex flex-col items-center">
                <p className="text-[10px] uppercase tracking-wider text-gold/80 font-medium mb-2">
                  Or tap a hub to view directly:
                </p>
                <div className="flex flex-wrap items-center justify-center gap-2">
                  {CAREER_HUBS.map((hub) => (
                    <button
                      key={hub.id}
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleOpenTouchModal(hub);
                      }}
                      className="px-3 py-1.5 rounded-lg border border-white/15 bg-surface/80 hover:bg-elevated hover:border-gold/40 text-[11px] font-medium text-foreground transition-colors cursor-pointer active:scale-95"
                    >
                      {hub.city} ({hub.country === 'United Arab Emirates' ? 'UAE' : hub.country})
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* =========================================================================
            DESKTOP VIEW: Kept 100% SAME as original ("desktop pr same he rkho koi changing nhi krni")
            Hidden on touch mobile screens (< lg), displayed on desktop (lg+).
           ========================================================================= */}
        <div className="hidden lg:block">
          <div
            className="relative h-[430px] w-full min-w-0 overflow-hidden rounded-2xl border border-border bg-surface shadow-2xl sm:h-[520px] sm:rounded-3xl md:h-[600px]"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {/* Three.js Canvas Container */}
            <div ref={containerRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

            {/* Minimal Top-Left Spec Overlay */}
            <div className="pointer-events-none absolute left-3 top-3 z-20 sm:left-4 sm:top-4">
              <div className="min-w-0 max-w-[calc(100vw-2.5rem)] break-words rounded-xl border border-border/80 bg-background/85 p-2.5 shadow-lg backdrop-blur-md sm:max-w-xs sm:rounded-2xl sm:p-3.5">
                <span className="text-[9px] sm:text-[10px] uppercase tracking-wider text-gold font-semibold block mb-0.5 sm:mb-1">
                  Active Operations Hub
                </span>
                <h3 className="break-words text-sm font-display font-bold text-foreground sm:text-base">
                  {selectedHub.city}, {selectedHub.name}
                </h3>
                <p className="break-words text-[11px] text-muted-foreground sm:mt-0.5 sm:text-xs">
                  {selectedHub.role} · {selectedHub.company}
                </p>
              </div>
            </div>

            {/* Interactive Hub Detail Card (Top-Right) */}
            <div className="absolute top-4 right-4 z-20 hidden md:block max-w-sm pointer-events-auto">
              <div className="bg-background/90 border border-gold/30 rounded-2xl p-4 shadow-xl backdrop-blur-md">
                <div className="flex items-center justify-between text-xs text-gold font-semibold mb-2">
                  <span>{selectedHub.period}</span>
                  <span className="font-mono text-[11px] text-muted-foreground">
                    {selectedHub.lat.toFixed(2)}°N, {selectedHub.lng.toFixed(2)}°E
                  </span>
                </div>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-foreground mb-1">
                  Scope &amp; Impact:
                </h4>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {selectedHub.highlight}
                </p>
              </div>
            </div>

            {/* Collapsible Bottom Control Dock */}
            <div
              className={`absolute bottom-3 left-1/2 z-30 w-[calc(100%-1rem)] max-w-2xl -translate-x-1/2 transition-transform duration-300 sm:bottom-4 sm:w-[94%] ${
                isControlsCollapsed ? 'translate-y-[calc(100%-36px)]' : 'translate-y-0'
              }`}
            >
              {/* Collapse / Expand Toggle Button */}
              <div className="flex justify-center mb-1">
                <button
                  onClick={() => setIsControlsCollapsed(!isControlsCollapsed)}
                  className="px-4 py-1 bg-surface hover:bg-elevated border border-border rounded-t-xl text-[11px] font-medium text-muted-foreground hover:text-foreground transition-colors cursor-pointer flex items-center gap-1.5 shadow"
                  aria-label={isControlsCollapsed ? 'Show 3D controls' : 'Collapse 3D controls'}
                >
                  <span>{isControlsCollapsed ? '▴ Expand Controls' : '▾ Collapse Controls'}</span>
                </button>
              </div>

              {/* Dock Surface */}
              <div className="flex flex-col items-stretch gap-2 rounded-2xl border border-border/80 bg-background/95 p-2.5 shadow-2xl sm:flex-row sm:flex-wrap sm:items-center sm:justify-between sm:gap-3 sm:p-3">
                {/* Hub Selection Buttons */}
                <div className="grid grid-cols-3 gap-1.5 sm:flex sm:flex-wrap sm:items-center sm:justify-start">
                  {CAREER_HUBS.map((hub) => {
                    const isActive = selectedHub.id === hub.id;
                    return (
                      <button
                        key={hub.id}
                        onClick={() => focusHub(hub)}
                        className={`min-w-0 rounded-full px-2 py-1.5 text-center text-[11px] font-medium transition-all cursor-pointer sm:px-3.5 sm:text-xs ${
                          isActive
                            ? 'bg-gold text-background font-semibold shadow-md'
                            : 'bg-surface hover:bg-elevated text-muted-foreground hover:text-foreground border border-border'
                        }`}
                      >
                        {hub.city}
                      </button>
                    );
                  })}
                </div>

                {/* Orbit / Reset Controls */}
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setIsRotating(!isRotating)}
                    className={`min-w-0 rounded-full border px-2 py-1.5 text-[11px] font-medium transition-colors cursor-pointer sm:px-3 sm:text-xs ${
                      isRotating
                        ? 'border-gold/40 text-gold bg-gold/10'
                        : 'border-border text-muted-foreground bg-surface'
                    }`}
                  >
                    {isRotating ? 'Pause Orbit' : 'Resume Orbit'}
                  </button>
                  <button
                    onClick={() => focusHub(selectedHub)}
                    className="min-w-0 rounded-full border border-border bg-surface px-2 py-1.5 text-[11px] font-medium text-muted-foreground transition-colors cursor-pointer hover:bg-elevated hover:text-foreground sm:px-3 sm:text-xs"
                  >
                    Recenter
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* =========================================================================
          TOUCH SCREEN 3D GLOBE POPUP / MODAL
          Opens on mobile touch screens for free 360° multi-axis motion in all directions.
         ========================================================================= */}
      <TouchGlobeModal
        isOpen={isTouchModalOpen}
        onClose={() => setIsTouchModalOpen(false)}
        initialHub={touchModalInitialHub}
      />
    </section>
  );
};
