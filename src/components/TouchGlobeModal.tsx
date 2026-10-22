import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import { CAREER_HUBS } from '../data/portfolioData';
import { CareerHub } from '../types/portfolio';

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

interface TouchGlobeModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialHub?: CareerHub;
}

export const TouchGlobeModal: React.FC<TouchGlobeModalProps> = ({
  isOpen,
  onClose,
  initialHub,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedHub, setSelectedHub] = useState<CareerHub>(initialHub || CAREER_HUBS[0]);
  const [isRotating, setIsRotating] = useState<boolean>(true);
  const [isDetailsExpanded, setIsDetailsExpanded] = useState<boolean>(true);
  const [showHint, setShowHint] = useState<boolean>(true);

  // Sync ref with isRotating state so animation loop updates without recreating scene
  const isRotatingRef = useRef(isRotating);
  useEffect(() => {
    isRotatingRef.current = isRotating;
  }, [isRotating]);

  // Three.js animation and camera targets
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const globeGroupRef = useRef<THREE.Group | null>(null);

  const targetRotationYRef = useRef<number>(0);
  const targetRotationXRef = useRef<number>(0.2);
  const targetZoomRef = useRef<number>(7.6);
  const currentZoomRef = useRef<number>(7.6);
  const isInteractingRef = useRef<boolean>(false);

  // Touch tracking for pinch zoom & 360 free rotate
  const touchPrevPosRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const pinchStartDistRef = useRef<number | null>(null);
  const pinchStartZoomRef = useRef<number>(7.6);

  // Update selectedHub when initialHub or modal opens
  useEffect(() => {
    if (initialHub) {
      setSelectedHub(initialHub);
    }
  }, [initialHub, isOpen]);

  // Lock body scroll while modal is active
  useEffect(() => {
    if (isOpen) {
      const original = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      setShowHint(true);
      const timer = setTimeout(() => setShowHint(false), 5000);
      return () => {
        document.body.style.overflow = original;
        clearTimeout(timer);
      };
    }
  }, [isOpen]);

  // ESC key listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Rotate smoothly to specific hub
  const focusHub = useCallback((hub: CareerHub) => {
    setSelectedHub(hub);
    const radLng = (hub.lng + 180) * (Math.PI / 180);
    const radLat = hub.lat * (Math.PI / 180);

    targetRotationYRef.current = -radLng + Math.PI / 2;
    targetRotationXRef.current = radLat * 0.65;
  }, []);

  // Directional step nudges
  const nudge = useCallback((dir: 'up' | 'down' | 'left' | 'right') => {
    setIsRotating(false);
    const step = 0.45;
    if (dir === 'left') targetRotationYRef.current -= step;
    if (dir === 'right') targetRotationYRef.current += step;
    if (dir === 'up') targetRotationXRef.current = Math.min(1.35, targetRotationXRef.current + step);
    if (dir === 'down') targetRotationXRef.current = Math.max(-1.35, targetRotationXRef.current - step);
  }, []);

  const adjustZoom = useCallback((delta: number) => {
    targetZoomRef.current = Math.max(4.6, Math.min(10.5, targetZoomRef.current + delta));
  }, []);

  const resetView = useCallback(() => {
    focusHub(selectedHub);
    targetZoomRef.current = 7.6;
    setIsRotating(true);
  }, [focusHub, selectedHub]);

  // Initialize Three.js scene ONCE when modal is open
  useEffect(() => {
    if (!isOpen) return;

    const container = containerRef.current;
    if (!container) return;

    // Calculate initial dimensions safely so it's NEVER 0
    let width = container.clientWidth || window.innerWidth || 360;
    let height = container.clientHeight || (window.innerHeight - 140) || 500;

    // Scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Camera
    const aspect = width / height;
    const camera = new THREE.PerspectiveCamera(42, aspect, 0.1, 1000);
    camera.position.set(0, 0, targetZoomRef.current);
    cameraRef.current = camera;

    // Renderer: reliable, safe parameters for mobile GPUs
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: 'default',
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

    const domElement = renderer.domElement;
    domElement.style.touchAction = 'none'; // Critical for gesture handling
    domElement.style.display = 'block';
    domElement.style.width = '100%';
    domElement.style.height = '100%';
    container.appendChild(domElement);
    rendererRef.current = renderer;

    // Lighting (Universal balanced lighting that NEVER crashes on mobile)
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.65);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xfff5ea, 2.3);
    keyLight.position.set(5, 4, 6);
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0xc9a227, 2.0);
    rimLight.position.set(-6, -3, -4);
    scene.add(rimLight);

    const hemiLight = new THREE.HemisphereLight(0xe9f2ff, 0x071527, 0.85);
    scene.add(hemiLight);

    // Globe Group
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
      clearcoat: 0.35,
      clearcoatRoughness: 0.2,
      reflectivity: 0.65,
    });
    const earthMesh = new THREE.Mesh(earthGeo, earthMat);
    globeGroup.add(earthMesh);

    // 2. Translucent Atmosphere Halo Shell
    const atmosphereGeo = new THREE.SphereGeometry(R * 1.028, 48, 36);
    const atmosphereMat = new THREE.MeshPhysicalMaterial({
      color: 0xc9a227,
      transparent: true,
      opacity: 0.14,
      roughness: 0.8,
      metalness: 0.1,
      side: THREE.BackSide,
      depthWrite: false,
    });
    const atmosphereMesh = new THREE.Mesh(atmosphereGeo, atmosphereMat);
    globeGroup.add(atmosphereMesh);

    // 3. Latitude Ring Accents
    const ringGroup = new THREE.Group();
    const ringMat = new THREE.LineBasicMaterial({
      color: 0xc9a227,
      transparent: true,
      opacity: 0.28,
    });
    [-30, 0, 30, 60].forEach((lat) => {
      const radiusAtLat = R * Math.cos(lat * (Math.PI / 180));
      const yAtLat = R * Math.sin(lat * (Math.PI / 180));
      const ringGeo = new THREE.BufferGeometry();
      const points: THREE.Vector3[] = [];
      const segs = 64;
      for (let i = 0; i <= segs; i++) {
        const theta = (i / segs) * Math.PI * 2;
        points.push(
          new THREE.Vector3(Math.cos(theta) * radiusAtLat, yAtLat, Math.sin(theta) * radiusAtLat)
        );
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

      // Base ring
      const baseGeo = new THREE.CylinderGeometry(0.08, 0.1, 0.02, 16);
      const baseMat = new THREE.MeshStandardMaterial({
        color: 0xc9a227,
        metalness: 0.85,
        roughness: 0.2,
      });
      const baseMesh = new THREE.Mesh(baseGeo, baseMat);
      baseMesh.position.y = 0.01;
      pinGroup.add(baseMesh);

      // Pin stem
      const stemGeo = new THREE.CylinderGeometry(0.02, 0.02, 0.3, 8);
      const stemMat = new THREE.MeshStandardMaterial({
        color: 0xffffff,
        metalness: 0.9,
        roughness: 0.15,
      });
      const stemMesh = new THREE.Mesh(stemGeo, stemMat);
      stemMesh.position.y = 0.15;
      pinGroup.add(stemMesh);

      // Pin Head
      const headGeo = new THREE.SphereGeometry(0.09, 16, 16);
      const headMat = new THREE.MeshPhysicalMaterial({
        color: 0xc9a227,
        emissive: 0x664d08,
        metalness: 0.9,
        roughness: 0.1,
        clearcoat: 1.0,
      });
      const headMesh = new THREE.Mesh(headGeo, headMat);
      headMesh.position.y = 0.34;
      pinGroup.add(headMesh);

      globeGroup.add(pinGroup);
    });

    // 5. Great-Circle Flight Arcs
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
      const tubeGeo = new THREE.TubeGeometry(curve, 48, 0.02, 8, false);
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

    // Orient initial hub
    const initialLng = (selectedHub.lng + 180) * (Math.PI / 180);
    targetRotationYRef.current = -initialLng + Math.PI / 2;
    targetRotationXRef.current = (selectedHub.lat * (Math.PI / 180)) * 0.65;
    globeGroup.rotation.y = targetRotationYRef.current;
    globeGroup.rotation.x = targetRotationXRef.current;

    // Gesture handling: Touch & Mouse for free 360 multi-axis rotation
    let isDragging = false;

    const handleTouchStart = (e: TouchEvent) => {
      isInteractingRef.current = true;
      setIsRotating(false);

      if (e.touches.length === 1) {
        isDragging = true;
        const t = e.touches[0];
        touchPrevPosRef.current = { x: t.clientX, y: t.clientY };
        pinchStartDistRef.current = null;
      } else if (e.touches.length === 2) {
        isDragging = false;
        const t1 = e.touches[0];
        const t2 = e.touches[1];
        pinchStartDistRef.current = Math.hypot(t1.clientX - t2.clientX, t1.clientY - t2.clientY);
        pinchStartZoomRef.current = targetZoomRef.current;
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length === 1 && isDragging && globeGroupRef.current) {
        const t = e.touches[0];
        const deltaX = t.clientX - touchPrevPosRef.current.x;
        const deltaY = t.clientY - touchPrevPosRef.current.y;

        // Smooth rotation in all directions (horizontal, vertical, diagonal)
        targetRotationYRef.current += deltaX * 0.0075;
        targetRotationXRef.current += deltaY * 0.0075;
        targetRotationXRef.current = Math.max(-1.35, Math.min(1.35, targetRotationXRef.current));

        touchPrevPosRef.current = { x: t.clientX, y: t.clientY };
      } else if (e.touches.length === 2 && pinchStartDistRef.current !== null) {
        const t1 = e.touches[0];
        const t2 = e.touches[1];
        const dist = Math.hypot(t1.clientX - t2.clientX, t1.clientY - t2.clientY);
        const delta = dist - pinchStartDistRef.current;
        const newZoom = pinchStartZoomRef.current - delta * 0.012;
        targetZoomRef.current = Math.max(4.6, Math.min(10.5, newZoom));
      }
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (e.touches.length === 0) {
        isDragging = false;
        isInteractingRef.current = false;
        pinchStartDistRef.current = null;
      } else if (e.touches.length === 1) {
        const t = e.touches[0];
        touchPrevPosRef.current = { x: t.clientX, y: t.clientY };
        pinchStartDistRef.current = null;
        isDragging = true;
      }
    };

    // Pointer events fallback for laptops/tablets
    let isMouseDown = false;
    let prevMousePos = { x: 0, y: 0 };

    const handleMouseDown = (e: MouseEvent) => {
      isMouseDown = true;
      isInteractingRef.current = true;
      setIsRotating(false);
      prevMousePos = { x: e.clientX, y: e.clientY };
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isMouseDown || !globeGroupRef.current) return;
      const deltaX = e.clientX - prevMousePos.x;
      const deltaY = e.clientY - prevMousePos.y;

      targetRotationYRef.current += deltaX * 0.006;
      targetRotationXRef.current += deltaY * 0.006;
      targetRotationXRef.current = Math.max(-1.35, Math.min(1.35, targetRotationXRef.current));
      prevMousePos = { x: e.clientX, y: e.clientY };
    };

    const handleMouseUp = () => {
      isMouseDown = false;
      isInteractingRef.current = false;
    };

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      targetZoomRef.current = Math.max(4.6, Math.min(10.5, targetZoomRef.current + e.deltaY * 0.005));
    };

    domElement.addEventListener('touchstart', handleTouchStart, { passive: false });
    window.addEventListener('touchmove', handleTouchMove, { passive: false });
    window.addEventListener('touchend', handleTouchEnd);
    window.addEventListener('touchcancel', handleTouchEnd);

    domElement.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    domElement.addEventListener('wheel', handleWheel, { passive: false });

    // Resize observer
    const handleResize = () => {
      if (!container || !rendererRef.current || !cameraRef.current) return;
      const w = container.clientWidth || window.innerWidth || 360;
      const h = container.clientHeight || (window.innerHeight - 140) || 500;
      if (w === 0 || h === 0) return;
      cameraRef.current.aspect = w / h;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(w, h);
    };

    const resizeObserver = new ResizeObserver(() => handleResize());
    resizeObserver.observe(container);
    window.addEventListener('resize', handleResize);

    // Initial resize trigger after DOM paint
    requestAnimationFrame(() => handleResize());

    // Animation Loop
    let frameId = 0;
    const clock = new THREE.Clock();

    function tick() {
      const dt = clock.getDelta();

      if (globeGroupRef.current && cameraRef.current) {
        if (!isInteractingRef.current && isRotatingRef.current) {
          targetRotationYRef.current += 0.0022;
        }

        globeGroupRef.current.rotation.y = THREE.MathUtils.damp(
          globeGroupRef.current.rotation.y,
          targetRotationYRef.current,
          4.5,
          dt
        );
        globeGroupRef.current.rotation.x = THREE.MathUtils.damp(
          globeGroupRef.current.rotation.x,
          targetRotationXRef.current,
          4.5,
          dt
        );

        currentZoomRef.current = THREE.MathUtils.damp(
          currentZoomRef.current,
          targetZoomRef.current,
          4.5,
          dt
        );
        cameraRef.current.position.z = currentZoomRef.current;
      }

      renderer.render(scene, camera);
      frameId = requestAnimationFrame(tick);
    }

    frameId = requestAnimationFrame(tick);

    // Cleanup
    return () => {
      cancelAnimationFrame(frameId);
      resizeObserver.disconnect();
      window.removeEventListener('resize', handleResize);

      domElement.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
      window.removeEventListener('touchcancel', handleTouchEnd);

      domElement.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      domElement.removeEventListener('wheel', handleWheel);

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
  }, [isOpen]); // Mounts once when modal opens!

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="touch-globe-heading"
      className="fixed inset-0 z-50 flex flex-col bg-[#050f1d] text-foreground select-none overflow-hidden animate-in fade-in duration-200"
    >
      {/* Top Header Bar */}
      <header className="relative z-20 flex items-center justify-between px-4 py-3 sm:px-6 sm:py-4 border-b border-white/10 bg-background/80 backdrop-blur-md">
        <div className="flex items-center gap-2.5 min-w-0">
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-gold/15 text-gold border border-gold/30 text-xs shrink-0">
            🌐
          </span>
          <div className="min-w-0">
            <h2 id="touch-globe-heading" className="text-sm sm:text-base font-display font-bold text-foreground truncate">
              {selectedHub.city}, {selectedHub.country}
            </h2>
            <p className="text-[10px] sm:text-xs text-gold font-medium truncate">
              Touch 3D Operations Model · 360° Free Motion
            </p>
          </div>
        </div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="flex items-center gap-1.5 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full bg-surface hover:bg-elevated border border-border text-foreground hover:text-gold text-xs sm:text-sm font-semibold transition-colors cursor-pointer shadow-md active:scale-95 shrink-0"
          aria-label="Close 3D model popup"
        >
          <span className="text-base leading-none">✕</span>
          <span>Close</span>
        </button>
      </header>

      {/* Main 3D Canvas Area */}
      <div className="relative flex-1 w-full h-full min-h-0 bg-radial from-[#0d223f] via-[#071526] to-[#040c17]">
        {/* Three.js Container */}
        <div
          ref={containerRef}
          className="w-full h-full cursor-grab active:cursor-grabbing touch-none"
        />

        {/* Floating Hint */}
        {showHint && (
          <div className="pointer-events-none absolute top-3 left-1/2 -translate-x-1/2 z-30 w-[90%] max-w-sm text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-background/90 px-3.5 py-1.5 text-[11px] font-medium text-foreground shadow-xl backdrop-blur-md animate-pulse">
              <span className="text-gold">👆</span>
              <span>Swipe in any direction to rotate 360° · Pinch to zoom</span>
            </div>
          </div>
        )}

        {/* Floating Directional Nudge Pad & Zoom Controls */}
        <div className="absolute right-3 top-3 z-30 flex flex-col items-center gap-1.5 pointer-events-auto">
          {/* Zoom In / Out */}
          <div className="flex flex-col bg-background/90 border border-white/10 rounded-xl p-1 shadow-xl backdrop-blur-md">
            <button
              onClick={() => adjustZoom(-0.8)}
              className="h-8 w-8 flex items-center justify-center rounded-lg hover:bg-gold/20 text-foreground hover:text-gold text-base font-bold transition-colors cursor-pointer active:scale-90"
              title="Zoom In"
              aria-label="Zoom in"
            >
              +
            </button>
            <div className="h-px w-full bg-white/10" />
            <button
              onClick={() => adjustZoom(0.8)}
              className="h-8 w-8 flex items-center justify-center rounded-lg hover:bg-gold/20 text-foreground hover:text-gold text-base font-bold transition-colors cursor-pointer active:scale-90"
              title="Zoom Out"
              aria-label="Zoom out"
            >
              −
            </button>
          </div>

          {/* 4-Way Multi-directional Nudge Pad */}
          <div className="bg-background/90 border border-white/10 rounded-2xl p-1.5 shadow-xl backdrop-blur-md flex flex-col items-center">
            <button
              onClick={() => nudge('up')}
              className="h-7 w-7 flex items-center justify-center rounded-md hover:bg-gold/20 text-foreground hover:text-gold text-xs transition-colors cursor-pointer active:scale-90"
              title="Tilt Up"
              aria-label="Tilt globe up"
            >
              ▲
            </button>
            <div className="flex items-center gap-1">
              <button
                onClick={() => nudge('left')}
                className="h-7 w-7 flex items-center justify-center rounded-md hover:bg-gold/20 text-foreground hover:text-gold text-xs transition-colors cursor-pointer active:scale-90"
                title="Rotate Left"
                aria-label="Rotate globe left"
              >
                ◀
              </button>
              <button
                onClick={resetView}
                className="h-7 w-7 flex items-center justify-center rounded-md bg-gold/15 hover:bg-gold/30 text-gold text-xs font-bold transition-colors cursor-pointer active:scale-90"
                title="Reset View"
                aria-label="Reset view to current hub"
              >
                ⌖
              </button>
              <button
                onClick={() => nudge('right')}
                className="h-7 w-7 flex items-center justify-center rounded-md hover:bg-gold/20 text-foreground hover:text-gold text-xs transition-colors cursor-pointer active:scale-90"
                title="Rotate Right"
                aria-label="Rotate globe right"
              >
                ▶
              </button>
            </div>
            <button
              onClick={() => nudge('down')}
              className="h-7 w-7 flex items-center justify-center rounded-md hover:bg-gold/20 text-foreground hover:text-gold text-xs transition-colors cursor-pointer active:scale-90"
              title="Tilt Down"
              aria-label="Tilt globe down"
            >
              ▼
            </button>
          </div>

          {/* Auto-Orbit Toggle */}
          <button
            onClick={() => setIsRotating(!isRotating)}
            className={`px-2.5 py-1 rounded-full text-[10px] font-semibold tracking-wide border shadow-lg backdrop-blur-md cursor-pointer transition-colors active:scale-95 ${
              isRotating
                ? 'bg-gold/20 border-gold text-gold'
                : 'bg-background/90 border-white/10 text-muted-foreground hover:text-foreground'
            }`}
          >
            {isRotating ? '⏸ Orbiting' : '▶ Play Orbit'}
          </button>
        </div>
      </div>

      {/* Bottom Hub Selector Drawer */}
      <footer className="relative z-20 border-t border-white/10 bg-background/95 backdrop-blur-lg px-4 pt-2.5 pb-4 sm:px-6">
        <div className="mx-auto max-w-xl">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] uppercase tracking-wider text-gold font-semibold">
              Select Operations Hub
            </span>
            <button
              onClick={() => setIsDetailsExpanded(!isDetailsExpanded)}
              className="text-[11px] text-muted-foreground hover:text-foreground underline cursor-pointer"
            >
              {isDetailsExpanded ? 'Hide Details ▾' : 'Show Details ▴'}
            </button>
          </div>

          <div className="grid grid-cols-3 gap-2">
            {CAREER_HUBS.map((hub) => {
              const isActive = selectedHub.id === hub.id;
              return (
                <button
                  key={hub.id}
                  onClick={() => focusHub(hub)}
                  className={`flex flex-col items-center justify-center py-2 px-1.5 rounded-xl text-center transition-all cursor-pointer border active:scale-95 ${
                    isActive
                      ? 'bg-gold text-background border-gold font-bold shadow-lg shadow-gold/20'
                      : 'bg-surface hover:bg-elevated text-muted-foreground hover:text-foreground border-border'
                  }`}
                >
                  <span className="text-xs font-semibold leading-tight">{hub.city}</span>
                  <span className={`text-[9px] mt-0.5 ${isActive ? 'text-background/80' : 'text-muted-foreground'}`}>
                    {hub.country === 'United Arab Emirates' ? 'UAE' : hub.country}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Active Hub Details Card */}
          {isDetailsExpanded && (
            <div className="mt-2.5 rounded-xl border border-white/10 bg-surface/70 p-2.5 sm:p-3 text-xs">
              <div className="flex items-center justify-between text-gold font-semibold text-[11px] mb-1">
                <span className="truncate">{selectedHub.role} · {selectedHub.company}</span>
                <span className="font-mono text-[10px] text-muted-foreground ml-2 whitespace-nowrap">
                  {selectedHub.period}
                </span>
              </div>
              <p className="text-[11px] leading-relaxed text-muted-foreground line-clamp-2 sm:line-clamp-none">
                {selectedHub.highlight}
              </p>
            </div>
          )}
        </div>
      </footer>
    </div>
  );
};
