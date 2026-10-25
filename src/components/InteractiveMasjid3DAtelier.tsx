import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import {
  Box,
  Eye,
  Flame,
  Layers,
  Pause,
  Play,
  Rotate3d,
  Sparkles,
  Sun,
} from 'lucide-react';

export type VisualMode = 'studio' | 'hologram' | 'ramadan';
export type MasjidVariant = 'aqsa' | 'nabawi';

interface Props {
  activeVariant: MasjidVariant;
  onVariantChange: (v: MasjidVariant) => void;
  onSelectForPurchase: (variant: MasjidVariant) => void;
}

/**
 * Generates high-resolution procedural facade textures matching Jacub's exact real products:
 * - Al-Aqsa XL: Limestone grid, royal cobalt & turquoise arabesque frieze, "AL AQSA" plaque, stained-glass windows
 * - Nabawi XL: Kraft sand board, Madinah emerald frieze, "BAB AS SALAM" plaque, green mashrabiya windows & lanterns
 */
function createFacadeTexture(variant: MasjidVariant, isFront: boolean): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 1024;
  const ctx = canvas.getContext('2d')!;

  if (variant === 'aqsa') {
    // Base warm Jerusalem limestone
    ctx.fillStyle = '#EAE0C8';
    ctx.fillRect(0, 0, 1024, 1024);

    // Lower stone ashlar grid
    ctx.strokeStyle = '#6A6558';
    ctx.lineWidth = 3;
    const blockW = 64;
    const blockH = 56;
    for (let y = 440; y < 1024; y += blockH) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(1024, y);
      ctx.stroke();
      const offset = ((y / blockH) % 2) * (blockW / 2);
      for (let x = offset; x < 1024; x += blockW) {
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x, y + blockH);
        ctx.stroke();
      }
    }

    // Upper Royal Cobalt Blue Jerusalem Tilework Band
    ctx.fillStyle = '#1B3A73';
    ctx.fillRect(0, 0, 1024, 460);

    // Turquoise decorative geometric frieze
    ctx.fillStyle = '#1E7FB8';
    ctx.fillRect(0, 110, 1024, 72);

    // Gold & ivory geometric star pattern along frieze
    ctx.strokeStyle = '#E8D5A5';
    ctx.lineWidth = 2.5;
    for (let x = 32; x < 1024; x += 64) {
      ctx.save();
      ctx.translate(x, 146);
      ctx.rotate(Math.PI / 4);
      ctx.strokeRect(-14, -14, 28, 28);
      ctx.restore();
      ctx.beginPath();
      ctx.arc(x, 146, 6, 0, Math.PI * 2);
      ctx.fillStyle = '#F3DF9D';
      ctx.fill();
    }

    // Top calligraphic ornamental border
    ctx.fillStyle = '#132954';
    ctx.fillRect(0, 22, 1024, 58);
    ctx.strokeStyle = '#DFC68C';
    ctx.lineWidth = 3;
    ctx.strokeRect(8, 26, 1008, 50);
    for (let x = 28; x < 996; x += 44) {
      ctx.beginPath();
      ctx.arc(x, 51, 11, 0, Math.PI, true);
      ctx.stroke();
    }

    // Draw arched stained-glass windows (left & right columns)
    const drawAqsaWindow = (cx: number, cy: number, w: number, h: number) => {
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(cx - w / 2, cy + h / 2);
      ctx.lineTo(cx - w / 2, cy - h / 6);
      ctx.quadraticCurveTo(cx - w / 2, cy - h / 2, cx, cy - h / 2 - 18);
      ctx.quadraticCurveTo(cx + w / 2, cy - h / 2, cx + w / 2, cy - h / 6);
      ctx.lineTo(cx + w / 2, cy + h / 2);
      ctx.closePath();
      ctx.fillStyle = '#F7EFE0';
      ctx.fill();
      ctx.lineWidth = 7;
      ctx.strokeStyle = '#1B3A73';
      ctx.stroke();

      // Inner stained glass mosaic
      ctx.clip();
      const colors = ['#D99B38', '#C84B31', '#2666CF', '#EBD697'];
      for (let gx = cx - w / 2; gx < cx + w / 2; gx += 22) {
        for (let gy = cy - h / 2 - 20; gy < cy + h / 2; gy += 22) {
          ctx.fillStyle = colors[Math.abs(Math.floor((gx + gy) / 22)) % colors.length];
          ctx.fillRect(gx + 3, gy + 3, 16, 16);
        }
      }
      ctx.restore();
    };

    drawAqsaWindow(205, 355, 136, 195);
    drawAqsaWindow(819, 355, 136, 195);
    drawAqsaWindow(205, 720, 136, 195);
    drawAqsaWindow(819, 720, 136, 195);

    if (isFront) {
      // Central cobalt arch spandrel around doorway
      ctx.fillStyle = '#163063';
      ctx.fillRect(330, 190, 364, 300);
      ctx.strokeStyle = '#E8D5A5';
      ctx.lineWidth = 4;
      ctx.strokeRect(338, 198, 348, 285);

      // Official "AL AQSA" gold-on-navy plaque
      ctx.fillStyle = '#0E2044';
      ctx.strokeStyle = '#D8B365';
      ctx.lineWidth = 5;
      ctx.beginPath();
      ctx.roundRect(352, 112, 320, 68, 14);
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = '#F1D592';
      ctx.font = '600 42px Georgia, serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('AL AQSA', 512, 148);
    } else {
      // Center medallion window on side/back walls
      drawAqsaWindow(512, 355, 150, 210);
      drawAqsaWindow(512, 720, 150, 210);
    }
  } else {
    // MASJID AN-NABAWI EDITION ("BAB AS SALAM")
    ctx.fillStyle = '#D7B98E';
    ctx.fillRect(0, 0, 1024, 1024);

    // Subtle natural kraft fiber grain
    ctx.fillStyle = 'rgba(130, 95, 52, 0.05)';
    for (let i = 0; i < 600; i++) {
      const rx = (i * 173) % 1024;
      const ry = (i * 293) % 1024;
      ctx.fillRect(rx, ry, 28, 2);
    }

    // Deep Madinah Emerald Green top band
    ctx.fillStyle = '#254F35';
    ctx.fillRect(0, 36, 1024, 52);
    ctx.strokeStyle = '#D8B669';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(0, 36);
    ctx.lineTo(1024, 36);
    ctx.moveTo(0, 88);
    ctx.lineTo(1024, 88);
    ctx.stroke();

    // Green & Gold Mashrabiya Arched Windows
    const drawNabawiWindow = (cx: number, cy: number, w: number, h: number) => {
      ctx.save();
      ctx.fillStyle = '#254F35';
      ctx.strokeStyle = '#DFC075';
      ctx.lineWidth = 6;
      ctx.beginPath();
      ctx.moveTo(cx - w / 2, cy + h / 2);
      ctx.lineTo(cx - w / 2, cy - h / 5);
      ctx.quadraticCurveTo(cx, cy - h / 2 - 26, cx + w / 2, cy - h / 5);
      ctx.lineTo(cx + w / 2, cy + h / 2);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      // Gold latticework inside
      ctx.clip();
      ctx.strokeStyle = '#DFC075';
      ctx.lineWidth = 3;
      for (let d = -260; d < 260; d += 26) {
        ctx.beginPath();
        ctx.moveTo(cx - 140, cy + d - 140);
        ctx.lineTo(cx + 140, cy + d + 140);
        ctx.moveTo(cx + 140, cy + d - 140);
        ctx.lineTo(cx - 140, cy + d + 140);
        ctx.stroke();
      }
      ctx.restore();
    };

    drawNabawiWindow(205, 380, 135, 220);
    drawNabawiWindow(819, 380, 135, 220);
    drawNabawiWindow(205, 760, 96, 155);
    drawNabawiWindow(819, 760, 96, 155);

    // Hanging Lantern motifs on outer pilasters
    const drawLantern = (lx: number, ly: number) => {
      ctx.strokeStyle = '#1E3F2B';
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.moveTo(lx, ly - 55);
      ctx.lineTo(lx, ly - 25);
      ctx.stroke();
      ctx.fillStyle = '#E6C44E';
      ctx.fillRect(lx - 16, ly - 25, 32, 42);
      ctx.strokeRect(lx - 16, ly - 25, 32, 42);
    };
    drawLantern(74, 560);
    drawLantern(950, 560);

    if (isFront) {
      // "BAB AS SALAM" Plaque
      ctx.fillStyle = '#254F35';
      ctx.strokeStyle = '#DFC075';
      ctx.lineWidth = 6;
      ctx.beginPath();
      ctx.roundRect(322, 135, 380, 74, 12);
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = '#F3DA9B';
      ctx.font = '700 38px Georgia, serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('BAB AS SALAM', 512, 174);
    } else {
      drawNabawiWindow(512, 420, 145, 230);
    }
  }

  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 8;
  return tex;
}

function createDomeTexture(variant: MasjidVariant): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d')!;

  if (variant === 'aqsa') {
    ctx.fillStyle = '#D9B159';
    ctx.fillRect(0, 0, 512, 512);
    ctx.strokeStyle = '#5C4416';
    ctx.lineWidth = 4;
    for (let y = 0; y <= 512; y += 64) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(512, y);
      ctx.stroke();
    }
    for (let x = 0; x <= 512; x += 64) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, 512);
      ctx.stroke();
    }
  } else {
    ctx.fillStyle = '#356847';
    ctx.fillRect(0, 0, 512, 512);
    ctx.strokeStyle = '#1E3F2A';
    ctx.lineWidth = 4;
    for (let x = 0; x <= 512; x += 64) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, 512);
      ctx.stroke();
    }
  }

  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

export const InteractiveMasjid3DAtelier: React.FC<Props> = ({
  activeVariant,
  onVariantChange,
  onSelectForPurchase,
}) => {
  const mountRef = useRef<HTMLDivElement>(null);

  const [visualMode, setVisualMode] = useState<VisualMode>('hologram');
  const [assemblyPct, setAssemblyPct] = useState<number>(100);
  const [isAutoBuilding, setIsAutoBuilding] = useState<boolean>(false);
  const [cameraPreset, setCameraPreset] = useState<'orbit' | 'underneath' | 'doorway' | 'top'>('orbit');

  // Refs synced into animation loop without rebuilding WebGL context
  const assemblyRef = useRef<number>(100);
  const modeRef = useRef<VisualMode>('hologram');
  const cameraTargetPresetRef = useRef<{
    pos: THREE.Vector3;
    target: THREE.Vector3;
    active: boolean;
  }>({
    pos: new THREE.Vector3(3.1, 2.15, 3.6),
    target: new THREE.Vector3(0, 0.95, 0),
    active: false,
  });

  useEffect(() => {
    assemblyRef.current = assemblyPct;
  }, [assemblyPct]);

  useEffect(() => {
    modeRef.current = visualMode;
  }, [visualMode]);

  // Auto-build animation timer (0% flat -> 100% assembled masjid)
  useEffect(() => {
    if (!isAutoBuilding) return;
    let rafId: number;
    let lastTime = performance.now();

    const step = (now: number) => {
      const dt = (now - lastTime) / 1000;
      lastTime = now;
      setAssemblyPct((prev) => {
        const next = prev + dt * 24;
        if (next >= 100) {
          setIsAutoBuilding(false);
          return 100;
        }
        return next;
      });
      rafId = requestAnimationFrame(step);
    };

    rafId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafId);
  }, [isAutoBuilding]);

  const triggerAutoBuild = () => {
    setAssemblyPct(0);
    setIsAutoBuilding(true);
  };

  const applyCameraPreset = (preset: 'orbit' | 'underneath' | 'doorway' | 'top') => {
    setCameraPreset(preset);
    if (preset === 'orbit') {
      cameraTargetPresetRef.current = {
        pos: new THREE.Vector3(3.05, 2.05, 3.55),
        target: new THREE.Vector3(0, 0.95, 0),
        active: true,
      };
    } else if (preset === 'underneath') {
      // Flip underneath so user looks right up through the open walk-in base into the hollow dome!
      cameraTargetPresetRef.current = {
        pos: new THREE.Vector3(1.15, -1.55, 1.55),
        target: new THREE.Vector3(0, 1.05, 0),
        active: true,
      };
    } else if (preset === 'doorway') {
      cameraTargetPresetRef.current = {
        pos: new THREE.Vector3(0, 0.62, 2.65),
        target: new THREE.Vector3(0, 0.72, -0.2),
        active: true,
      };
    } else if (preset === 'top') {
      cameraTargetPresetRef.current = {
        pos: new THREE.Vector3(0.01, 4.5, 0.8),
        target: new THREE.Vector3(0, 0.8, 0),
        active: true,
      };
    }
  };

  // Core Three.js Scene Setup & Model Builder
  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      40,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.set(3.05, 2.05, 3.55);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.12;
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.06;
    controls.target.set(0, 0.95, 0);
    // Allow full 360 horizontal AND nearly full sphere vertical rotation so user can inspect underneath!
    controls.minPolarAngle = 0.04;
    controls.maxPolarAngle = Math.PI - 0.04;
    controls.minDistance = 1.65;
    controls.maxDistance = 6.8;

    const stopPresetOnInteract = () => {
      cameraTargetPresetRef.current.active = false;
    };
    controls.addEventListener('start', stopPresetOnInteract);

    // Lighting rig
    const ambientLight = new THREE.AmbientLight(0xfff8eb, 1.35);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xfff4dc, 1.9);
    keyLight.position.set(4, 6, 4.5);
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0x9bd7ff, 0.85);
    rimLight.position.set(-4, 3, -4);
    scene.add(rimLight);

    const bottomFillLight = new THREE.DirectionalLight(0xffe7ba, 0.75);
    bottomFillLight.position.set(0, -4, 1);
    scene.add(bottomFillLight);

    // Warm Ramadan interior lantern light inside the hollow masjid!
    const interiorLanternLight = new THREE.PointLight(0xff9b26, 0, 5.5, 1.5);
    interiorLanternLight.position.set(0, 0.65, 0);
    scene.add(interiorLanternLight);

    // Small glowing lantern orb inside
    const lanternOrb = new THREE.Mesh(
      new THREE.SphereGeometry(0.08, 16, 16),
      new THREE.MeshBasicMaterial({ color: 0xffcf70 })
    );
    lanternOrb.position.set(0, 0.25, -0.15);
    scene.add(lanternOrb);

    // Architectural Hologram Floor Rings & Grid (120 x 120 cm footprint)
    const floorGroup = new THREE.Group();
    const gridHelper = new THREE.GridHelper(4.4, 22, 0x38d9a9, 0x1b4b43);
    (gridHelper.material as THREE.Material).transparent = true;
    (gridHelper.material as THREE.Material).opacity = 0.35;
    floorGroup.add(gridHelper);

    const outerRing = new THREE.Mesh(
      new THREE.RingGeometry(1.52, 1.55, 64),
      new THREE.MeshBasicMaterial({
        color: 0xd8b365,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.55,
      })
    );
    outerRing.rotation.x = -Math.PI / 2;
    outerRing.position.y = 0.004;
    floorGroup.add(outerRing);

    scene.add(floorGroup);

    // Holographic Laser Scan Plane sweeping vertically
    const scanPlane = new THREE.Mesh(
      new THREE.RingGeometry(0.15, 1.48, 48),
      new THREE.MeshBasicMaterial({
        color: 0x48f0c2,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.0,
      })
    );
    scanPlane.rotation.x = -Math.PI / 2;
    scene.add(scanPlane);

    // =========================================================================
    // BUILD EXACT SCALE 3D MINIMASJID (1.60u = 120cm W/D, 1.94u = 145cm Total H)
    // =========================================================================
    const masjidRoot = new THREE.Group();
    scene.add(masjidRoot);

    const W = 1.60; // 120 cm width
    const H = 1.24; // Wall height before dome & minarets
    const T = 0.028; // Engineered heavy-duty board thickness

    const frontTex = createFacadeTexture(activeVariant, true);
    const sideTex = createFacadeTexture(activeVariant, false);
    const domeTex = createDomeTexture(activeVariant);

    const kraftMat = new THREE.MeshStandardMaterial({
      color: 0xc8a679,
      roughness: 0.85,
      metalness: 0.04,
    });

    const frontMat = new THREE.MeshStandardMaterial({
      map: frontTex,
      roughness: 0.62,
      metalness: 0.08,
    });

    const sideMat = new THREE.MeshStandardMaterial({
      map: sideTex,
      roughness: 0.62,
      metalness: 0.08,
    });

    const domeMat = new THREE.MeshStandardMaterial({
      map: domeTex,
      roughness: 0.42,
      metalness: activeVariant === 'aqsa' ? 0.38 : 0.12,
    });

    const drumColor = activeVariant === 'aqsa' ? 0x1b3a73 : 0x254f35;
    const drumMat = new THREE.MeshStandardMaterial({
      color: drumColor,
      roughness: 0.55,
      metalness: 0.1,
    });

    const spireColor = activeVariant === 'aqsa' ? 0x1d3f80 : 0x2f6342;
    const spireMat = new THREE.MeshStandardMaterial({
      color: spireColor,
      roughness: 0.48,
      metalness: 0.14,
    });

    const goldMat = new THREE.MeshStandardMaterial({
      color: 0xdfb860,
      roughness: 0.3,
      metalness: 0.65,
    });

    const allSolidMeshes: THREE.Mesh[] = [];
    const allWireLines: THREE.LineSegments[] = [];

    const addTrackedMesh = (mesh: THREE.Mesh, parent: THREE.Object3D) => {
      parent.add(mesh);
      allSolidMeshes.push(mesh);

      // Attach crisp holographic edge wireframe to every single cardboard component!
      const edges = new THREE.EdgesGeometry(mesh.geometry, 22);
      const line = new THREE.LineSegments(
        edges,
        new THREE.LineBasicMaterial({
          color: 0x56f2c6,
          transparent: true,
          opacity: 0,
        })
      );
      mesh.add(line);
      allWireLines.push(line);
    };

    // Helper for multi-material wall panel (outer printed, inner natural kraft board)
    const makePanel = (
      width: number,
      height: number,
      depth: number,
      outerMaterial: THREE.Material
    ) => {
      const geo = new THREE.BoxGeometry(width, height, depth);
      const mats = [
        kraftMat,
        kraftMat,
        kraftMat,
        kraftMat,
        outerMaterial, // +Z outer face
        kraftMat, // -Z inner kraft face
      ];
      return new THREE.Mesh(geo, mats);
    };

    // 1. FRONT WALK-IN ARCHED WALL (Hinged at z = +W/2, y = 0)
    const frontHinge = new THREE.Group();
    frontHinge.position.set(0, 0, W / 2);
    masjidRoot.add(frontHinge);

    // Front wall built using THREE.Shape with a pointed Islamic archway cutout so kids/camera see right inside!
    const frontShape = new THREE.Shape();
    frontShape.moveTo(-W / 2, 0);
    frontShape.lineTo(W / 2, 0);
    frontShape.lineTo(W / 2, H);
    frontShape.lineTo(-W / 2, H);
    frontShape.closePath();

    // Pointed walk-in arch hole (leaving a thin 0.035 threshold strip at y=0 just like the real cardboard base!)
    const doorHole = new THREE.Path();
    const dw = 0.25;
    doorHole.moveTo(-dw, 0.035);
    doorHole.lineTo(dw, 0.035);
    doorHole.lineTo(dw, 0.56);
    doorHole.quadraticCurveTo(dw, 0.78, 0, 0.88);
    doorHole.quadraticCurveTo(-dw, 0.78, -dw, 0.56);
    doorHole.closePath();
    frontShape.holes.push(doorHole);

    const frontGeo = new THREE.ExtrudeGeometry(frontShape, {
      depth: T,
      bevelEnabled: false,
    });
    // Normalize UVs across [-W/2..W/2, 0..H] so our painted "AL AQSA" / "BAB AS SALAM" canvas aligns cleanly!
    const posAttr = frontGeo.attributes.position;
    const uvAttr = frontGeo.attributes.uv;
    for (let i = 0; i < posAttr.count; i++) {
      const vx = posAttr.getX(i);
      const vy = posAttr.getY(i);
      uvAttr.setXY(i, (vx + W / 2) / W, vy / H);
    }
    frontGeo.translate(0, 0, -T);
    const frontMesh = new THREE.Mesh(frontGeo, [frontMat, kraftMat]);
    addTrackedMesh(frontMesh, frontHinge);

    // 2. BACK WALL (Hinged at z = -W/2, y = 0)
    const backHinge = new THREE.Group();
    backHinge.position.set(0, 0, -W / 2);
    backHinge.rotation.y = Math.PI;
    masjidRoot.add(backHinge);

    const backPanel = makePanel(W, H, T, sideMat);
    backPanel.position.set(0, H / 2, -T / 2);
    addTrackedMesh(backPanel, backHinge);

    // 3. LEFT WALL (Hinged at x = -W/2, y = 0)
    const leftHinge = new THREE.Group();
    leftHinge.position.set(-W / 2, 0, 0);
    leftHinge.rotation.y = -Math.PI / 2;
    masjidRoot.add(leftHinge);

    const leftPanel = makePanel(W, H, T, sideMat);
    leftPanel.position.set(0, H / 2, -T / 2);
    addTrackedMesh(leftPanel, leftHinge);

    // 4. RIGHT WALL (Hinged at x = +W/2, y = 0)
    const rightHinge = new THREE.Group();
    rightHinge.position.set(W / 2, 0, 0);
    rightHinge.rotation.y = Math.PI / 2;
    masjidRoot.add(rightHinge);

    const rightPanel = makePanel(W, H, T, sideMat);
    rightPanel.position.set(0, H / 2, -T / 2);
    addTrackedMesh(rightPanel, rightHinge);

    // 5. ROOF DECK WITH CIRCULAR HOLLOW DOME OPENING (So looking underneath sees straight up into the Dome!)
    const roofGroup = new THREE.Group();
    roofGroup.position.set(0, H, 0);
    masjidRoot.add(roofGroup);

    const roofShape = new THREE.Shape();
    roofShape.moveTo(-W / 2, -W / 2);
    roofShape.lineTo(W / 2, -W / 2);
    roofShape.lineTo(W / 2, W / 2);
    roofShape.lineTo(-W / 2, W / 2);
    roofShape.closePath();

    const domeOpening = new THREE.Path();
    domeOpening.absarc(0, 0, 0.39, 0, Math.PI * 2, false);
    roofShape.holes.push(domeOpening);

    const roofGeo = new THREE.ExtrudeGeometry(roofShape, {
      depth: T,
      bevelEnabled: false,
    });
    roofGeo.rotateX(-Math.PI / 2);
    const roofMesh = new THREE.Mesh(roofGeo, kraftMat);
    addTrackedMesh(roofMesh, roofGroup);

    // Interlocking Cardboard Slot Tabs visible inside when flipping underneath!
    for (const [tx, tz] of [
      [-0.55, W / 2 - 0.04],
      [0.55, W / 2 - 0.04],
      [-0.55, -W / 2 + 0.04],
      [0.55, -W / 2 + 0.04],
    ]) {
      const tab = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.06, 0.03), kraftMat);
      tab.position.set(tx, -0.03, tz);
      addTrackedMesh(tab, roofGroup);
    }

    // 6. FOUR CORNER MINARET TOWERS (With balconies & pyramidal spires)
    const minaretsGroup = new THREE.Group();
    masjidRoot.add(minaretsGroup);

    const cornerCoords = [
      [-W / 2 + 0.09, W / 2 - 0.09],
      [W / 2 - 0.09, W / 2 - 0.09],
      [-W / 2 + 0.09, -W / 2 + 0.09],
      [W / 2 - 0.09, -W / 2 + 0.09],
    ];

    cornerCoords.forEach(([cx, cz]) => {
      const mTower = new THREE.Group();
      mTower.position.set(cx, 0, cz);
      minaretsGroup.add(mTower);

      // Hollow-bottom square corner column extending from floor y=0 to y=1.42
      const shaft = new THREE.Mesh(new THREE.BoxGeometry(0.24, 1.36, 0.24), sideMat);
      shaft.position.y = 0.68;
      addTrackedMesh(shaft, mTower);

      // Cantilevered Balcony Collar
      const balcony = new THREE.Mesh(new THREE.BoxGeometry(0.32, 0.08, 0.32), kraftMat);
      balcony.position.y = 1.38;
      addTrackedMesh(balcony, mTower);

      // Upper Lantern Stage
      const lanternBox = new THREE.Mesh(new THREE.BoxGeometry(0.20, 0.16, 0.20), drumMat);
      lanternBox.position.y = 1.50;
      addTrackedMesh(lanternBox, mTower);

      // 4-sided Pyramidal Spire
      const spire = new THREE.Mesh(new THREE.ConeGeometry(0.17, 0.28, 4), spireMat);
      spire.rotation.y = Math.PI / 4;
      spire.position.y = 1.72;
      addTrackedMesh(spire, mTower);
    });

    // 7. CENTRAL OCTAGONAL HOLLOW DOME + GOLDEN CRESCENT FINIAL (Total Height = 145 cm)
    const domeGroup = new THREE.Group();
    domeGroup.position.set(0, H + T, 0);
    masjidRoot.add(domeGroup);

    // Open-ended 8-sided drum cylinder (hollow inside when viewed from underneath!)
    const drumGeo = new THREE.CylinderGeometry(0.42, 0.42, 0.20, 8, 1, true);
    const drumSideMat = drumMat.clone();
    drumSideMat.side = THREE.DoubleSide;
    const drumMesh = new THREE.Mesh(drumGeo, drumSideMat);
    drumMesh.position.y = 0.10;
    addTrackedMesh(drumMesh, domeGroup);

    // 8-faceted Dome Crown (DoubleSide so looking up from underneath shows the vaulted dome ribs!)
    const crownGeo = new THREE.SphereGeometry(0.42, 8, 5, 0, Math.PI * 2, 0, Math.PI / 2);
    const crownSideMat = domeMat.clone();
    crownSideMat.side = THREE.DoubleSide;
    const crownMesh = new THREE.Mesh(crownGeo, crownSideMat);
    crownMesh.position.y = 0.20;
    crownMesh.scale.set(1, 0.78, 1);
    addTrackedMesh(crownMesh, domeGroup);

    // Crescent Finial (Hilal)
    const finialStem = new THREE.Mesh(new THREE.CylinderGeometry(0.016, 0.022, 0.15, 12), goldMat);
    finialStem.position.y = 0.58;
    addTrackedMesh(finialStem, domeGroup);

    const crescentOuter = new THREE.Mesh(
      new THREE.TorusGeometry(0.065, 0.015, 12, 28, Math.PI * 1.45),
      goldMat
    );
    crescentOuter.position.y = 0.70;
    crescentOuter.rotation.z = Math.PI * 0.78;
    addTrackedMesh(crescentOuter, domeGroup);

    // Hologram override material cache
    const holoFaceMat = new THREE.MeshPhysicalMaterial({
      color: activeVariant === 'aqsa' ? 0x1098ad : 0x20c997,
      emissive: activeVariant === 'aqsa' ? 0x0b4f6c : 0x0f5132,
      emissiveIntensity: 0.65,
      roughness: 0.2,
      metalness: 0.1,
      transparent: true,
      opacity: 0.24,
      side: THREE.DoubleSide,
      depthWrite: false,
    });

    const originalMaterials = new Map<THREE.Mesh, THREE.Material | THREE.Material[]>();
    allSolidMeshes.forEach((m) => originalMaterials.set(m, m.material));

    // Animation & Interactive Physics Loop
    const clock = new THREE.Clock();
    let frameId: number;

    const animate = () => {
      frameId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      // 1. Smoothly apply Assembly Percentage (0% flat cardboard -> 100% standing masjid!)
      const p = THREE.MathUtils.clamp(assemblyRef.current / 100, 0, 1);

      // Phase A (0.0 -> 0.45): 4 Walls fold up from flat 90° outward to vertical 0°
      const wallProgress = THREE.MathUtils.smoothstep(p, 0.0, 0.45);
      const foldAngle = (1 - wallProgress) * (Math.PI / 2.08);
      frontHinge.rotation.x = foldAngle;
      backHinge.rotation.x = foldAngle;
      leftHinge.rotation.x = foldAngle;
      rightHinge.rotation.x = foldAngle;

      // Phase B (0.38 -> 0.68): Slotted Roof Deck lowers into place
      const roofProgress = THREE.MathUtils.smoothstep(p, 0.38, 0.68);
      roofGroup.position.y = H + (1 - roofProgress) * 0.95;
      roofGroup.scale.setScalar(0.3 + 0.7 * roofProgress);
      roofGroup.visible = p > 0.25;

      // Phase C (0.60 -> 0.86): 4 Corner Minarets telescope into corners
      const minProgress = THREE.MathUtils.smoothstep(p, 0.60, 0.86);
      minaretsGroup.position.y = (1 - minProgress) * 1.15;
      minaretsGroup.scale.set(1, Math.max(0.01, minProgress), 1);
      minaretsGroup.visible = p > 0.52;

      // Phase D (0.80 -> 1.00): Octagonal Dome + Golden Crescent crowns the masjid
      const domeProgress = THREE.MathUtils.smoothstep(p, 0.80, 1.0);
      domeGroup.position.y = H + T + (1 - domeProgress) * 0.95;
      domeGroup.scale.setScalar(Math.max(0.01, domeProgress));
      domeGroup.visible = p > 0.74;

      // 2. Apply Visual Mode (Studio vs Hologram vs Ramadan Night)
      const currentMode = modeRef.current;

      if (currentMode === 'hologram') {
        scene.background = new THREE.Color(0x071318);
        ambientLight.intensity = 0.9;
        keyLight.intensity = 1.1;
        interiorLanternLight.intensity = 1.2 + Math.sin(elapsed * 3) * 0.25;
        interiorLanternLight.color.setHex(0x38f2c2);
        lanternOrb.visible = false;

        allSolidMeshes.forEach((m) => {
          m.material = holoFaceMat;
        });
        allWireLines.forEach((l) => {
          const mat = l.material as THREE.LineBasicMaterial;
          mat.opacity = 0.88;
          mat.color.setHex(activeVariant === 'aqsa' ? 0x56f2c6 : 0x74f7a8);
        });

        // Sweep horizontal hologram scan ring up & down
        const scanY = ((elapsed * 0.65) % 1) * 2.05;
        scanPlane.position.y = scanY;
        (scanPlane.material as THREE.MeshBasicMaterial).opacity = 0.35;
        outerRing.rotation.z = elapsed * 0.25;
      } else if (currentMode === 'ramadan') {
        scene.background = new THREE.Color(0x0d131f);
        ambientLight.intensity = 0.42;
        keyLight.intensity = 0.55;
        // Cozy flickering golden candle/lantern glow inside doorway!
        interiorLanternLight.color.setHex(0xff9924);
        interiorLanternLight.intensity = 4.6 + Math.sin(elapsed * 7.5) * 0.35;
        lanternOrb.visible = p > 0.35;

        allSolidMeshes.forEach((m) => {
          const orig = originalMaterials.get(m);
          if (orig) m.material = orig;
        });
        allWireLines.forEach((l) => {
          (l.material as THREE.LineBasicMaterial).opacity = 0;
        });
        (scanPlane.material as THREE.MeshBasicMaterial).opacity = 0;
      } else {
        // Tactile Sunlit Scandinavian Studio
        scene.background = new THREE.Color(0xf6f1e5);
        ambientLight.intensity = 1.45;
        keyLight.intensity = 1.95;
        interiorLanternLight.intensity = 0.9;
        interiorLanternLight.color.setHex(0xffe0a3);
        lanternOrb.visible = false;

        allSolidMeshes.forEach((m) => {
          const orig = originalMaterials.get(m);
          if (orig) m.material = orig;
        });
        allWireLines.forEach((l) => {
          (l.material as THREE.LineBasicMaterial).opacity = 0;
        });
        (scanPlane.material as THREE.MeshBasicMaterial).opacity = 0;
      }

      // Fade floor grid automatically whenever camera goes below y = 0.15 so "Check Underneath" is crystal clear!
      floorGroup.visible = camera.position.y >= 0.08;

      // Smooth camera preset glide
      if (cameraTargetPresetRef.current.active) {
        camera.position.lerp(cameraTargetPresetRef.current.pos, 0.08);
        controls.target.lerp(cameraTargetPresetRef.current.target, 0.08);
        if (camera.position.distanceTo(cameraTargetPresetRef.current.pos) < 0.03) {
          cameraTargetPresetRef.current.active = false;
        }
      }

      controls.update();
      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('resize', handleResize);
      controls.removeEventListener('start', stopPresetOnInteract);
      controls.dispose();
      renderer.dispose();
      frontTex.dispose();
      sideTex.dispose();
      domeTex.dispose();
    };
  }, [activeVariant]);

  const isDarkStage = visualMode === 'hologram' || visualMode === 'ramadan';

  return (
    <section
      id="atelier-3d"
      className="relative overflow-hidden bg-night-950 py-20 text-sand-50 sm:py-28"
    >
      {/* Subtle Ambient Aura */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 left-1/2 h-[520px] w-[880px] -translate-x-1/2 rounded-full bg-emerald-500/10 blur-[130px]"
      />

      <div className="relative mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        {/* Top Section Header */}
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3.5 py-1.5 font-mono text-[11.5px] uppercase tracking-[0.16em] text-emerald-300">
              <Rotate3d className="h-3.5 w-3.5" />
              <span>Interactive 3D Hologram & Hold-In-Hand Studio</span>
            </div>

            <h2 className="mt-4 font-display text-3xl font-medium tracking-tight text-sand-50 sm:text-5xl">
              Hold MiniMasjid® in your hands.{' '}
              <span className="italic text-dome-300">Spin 360°, peek underneath & watch it unfold.</span>
            </h2>

            <p className="mt-3.5 text-[16px] leading-relaxed text-sand-200/80 sm:text-[17px]">
              Drag in any direction to inspect our patented <strong>120 × 120 × 145 cm</strong> walk-in
              engineering — flip underneath to look right up inside the vaulted dome, switch to{' '}
              <strong>Blueprint Hologram</strong>, or scrub the slider to fold it from flat sheets to
              full height.
            </p>
          </div>

          {/* Live Edition Switcher Pills */}
          <div className="inline-flex self-start rounded-2xl border border-white/15 bg-white/[0.06] p-1.5 backdrop-blur-md">
            <button
              type="button"
              onClick={() => onVariantChange('aqsa')}
              className={`rounded-xl px-4 py-2.5 text-[13.5px] font-semibold transition-all ${
                activeVariant === 'aqsa'
                  ? 'bg-dome-400 text-night-950 shadow-lg'
                  : 'text-sand-200 hover:text-white'
              }`}
            >
              Al-Aqsa XL (Golden Dome)
            </button>
            <button
              type="button"
              onClick={() => onVariantChange('nabawi')}
              className={`rounded-xl px-4 py-2.5 text-[13.5px] font-semibold transition-all ${
                activeVariant === 'nabawi'
                  ? 'bg-emerald-400 text-night-950 shadow-lg'
                  : 'text-sand-200 hover:text-white'
              }`}
            >
              Masjid an-Nabawi XL (Green Dome)
            </button>
          </div>
        </div>

        {/* Main 3D Stage Container */}
        <div className="mt-10 grid gap-6 lg:grid-cols-12">
          {/* Left 8 Columns: Interactive WebGL Viewport */}
          <div className="relative overflow-hidden rounded-[2rem] border border-white/15 bg-[#071318] shadow-hologram lg:col-span-8">
            {/* Top Floating Telemetry HUD */}
            <div className="pointer-events-none absolute inset-x-4 top-4 z-10 flex flex-wrap items-center justify-between gap-2">
              <div
                className={`inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 font-mono text-[11.5px] backdrop-blur-md ${
                  isDarkStage
                    ? 'border-emerald-400/30 bg-black/55 text-emerald-300'
                    : 'border-olive-800/15 bg-white/85 text-olive-900'
                }`}
              >
                <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
                <span>
                  {activeVariant === 'aqsa' ? 'MODEL: AL-AQSA XL' : 'MODEL: NABAWI XL'} · 120×120×145 CM
                </span>
              </div>

              <div
                className={`rounded-full border px-3.5 py-1.5 font-mono text-[11.5px] backdrop-blur-md ${
                  isDarkStage
                    ? 'border-white/15 bg-black/55 text-sand-200'
                    : 'border-olive-800/15 bg-white/85 text-olive-800'
                }`}
              >
                Drag to rotate 360° · Pinch/Scroll to zoom
              </div>
            </div>

            {/* WebGL Mount Canvas */}
            <div
              ref={mountRef}
              className="h-[440px] w-full cursor-grab active:cursor-grabbing sm:h-[540px]"
            />

            {/* Bottom Floating Camera Angle Bar */}
            <div className="absolute inset-x-3 bottom-3 z-10 flex flex-wrap items-center justify-center gap-2 rounded-2xl border border-white/15 bg-black/65 px-3 py-2.5 backdrop-blur-md sm:inset-x-5 sm:justify-between">
              <span className="hidden font-mono text-[11px] uppercase tracking-wider text-sand-300 sm:inline">
                Quick Angles:
              </span>
              <div className="flex flex-wrap justify-center gap-1.5">
                {[
                  { id: 'orbit', label: '360° Hold View' },
                  { id: 'underneath', label: 'Flip Underneath (Inside Dome)' },
                  { id: 'doorway', label: 'Child Walk-In Arch' },
                  { id: 'top', label: 'Top Blueprint' },
                ].map((cam) => (
                  <button
                    key={cam.id}
                    type="button"
                    onClick={() =>
                      applyCameraPreset(cam.id as 'orbit' | 'underneath' | 'doorway' | 'top')
                    }
                    className={`rounded-full px-3 py-1.5 text-[12px] font-semibold transition-all ${
                      cameraPreset === cam.id
                        ? 'bg-emerald-400 text-night-950'
                        : 'bg-white/10 text-sand-100 hover:bg-white/20'
                    }`}
                  >
                    {cam.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right 4 Columns: Tactile Mode Controls + Self-Assembly Unfold Scrubber */}
          <div className="flex flex-col justify-between gap-5 rounded-[2rem] border border-white/12 bg-white/[0.04] p-6 backdrop-blur-md sm:p-7 lg:col-span-4">
            <div className="space-y-6">
              {/* 1. Render Mode Switcher */}
              <div>
                <p className="font-mono text-[11.5px] uppercase tracking-[0.14em] text-sand-300">
                  1 · Choose Experience Mode
                </p>
                <div className="mt-3 grid grid-cols-1 gap-2.5">
                  <button
                    type="button"
                    onClick={() => setVisualMode('hologram')}
                    className={`flex items-center gap-3 rounded-2xl border p-3.5 text-left transition-all ${
                      visualMode === 'hologram'
                        ? 'border-emerald-400 bg-emerald-400/15 text-white'
                        : 'border-white/10 bg-white/[0.03] text-sand-200 hover:border-white/25'
                    }`}
                  >
                    <Sparkles className="h-5 w-5 shrink-0 text-emerald-300" />
                    <div>
                      <p className="text-[14px] font-semibold">3D Architectural Hologram</p>
                      <p className="text-[12px] text-sand-300">
                        Laser wireframe scan & x-ray structure
                      </p>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setVisualMode('studio')}
                    className={`flex items-center gap-3 rounded-2xl border p-3.5 text-left transition-all ${
                      visualMode === 'studio'
                        ? 'border-dome-400 bg-dome-400/15 text-white'
                        : 'border-white/10 bg-white/[0.03] text-sand-200 hover:border-white/25'
                    }`}
                  >
                    <Sun className="h-5 w-5 shrink-0 text-dome-300" />
                    <div>
                      <p className="text-[14px] font-semibold">Daylight Living-Room Print</p>
                      <p className="text-[12px] text-sand-300">
                        True printed tilework & natural kraft board
                      </p>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setVisualMode('ramadan')}
                    className={`flex items-center gap-3 rounded-2xl border p-3.5 text-left transition-all ${
                      visualMode === 'ramadan'
                        ? 'border-amber-400 bg-amber-400/15 text-white'
                        : 'border-white/10 bg-white/[0.03] text-sand-200 hover:border-white/25'
                    }`}
                  >
                    <Flame className="h-5 w-5 shrink-0 text-amber-300" />
                    <div>
                      <p className="text-[14px] font-semibold">Ramadan Night Lantern Glow</p>
                      <p className="text-[12px] text-sand-300">
                        Cozy golden lantern light shining inside
                      </p>
                    </div>
                  </button>
                </div>
              </div>

              {/* 2. Interactive Fold-From-Flat Assembly Scrubber */}
              <div className="rounded-2xl border border-white/12 bg-black/35 p-4">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[11.5px] uppercase tracking-[0.12em] text-emerald-300">
                    2 · 3D Unfold & Build
                  </span>
                  <span className="font-mono text-[13px] font-semibold text-dome-300">
                    {Math.round(assemblyPct)}% Built
                  </span>
                </div>

                <input
                  type="range"
                  min={0}
                  max={100}
                  value={assemblyPct}
                  onChange={(e) => {
                    setIsAutoBuilding(false);
                    setAssemblyPct(Number(e.target.value));
                  }}
                  aria-label="3D Assembly Unfold Progress"
                  className="mt-3 h-2 w-full cursor-pointer appearance-none rounded-lg bg-white/15 accent-emerald-400"
                />

                <div className="mt-2 flex justify-between font-mono text-[10.5px] text-sand-300">
                  <span>0% Flat Behind Sofa</span>
                  <span>50% Walls Slot</span>
                  <span>100% Dome On</span>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    isAutoBuilding ? setIsAutoBuilding(false) : triggerAutoBuild()
                  }
                  className="mt-3.5 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-emerald-400/40 bg-emerald-400/15 px-4 py-2.5 text-[13px] font-semibold text-emerald-200 transition-colors hover:bg-emerald-400/25"
                >
                  {isAutoBuilding ? (
                    <>
                      <Pause className="h-4 w-4" />
                      <span>Pause Self-Assembly</span>
                    </>
                  ) : (
                    <>
                      <Play className="h-4 w-4" />
                      <span>Watch It Build From Flat Sheets</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Bottom Spec Callout + Jump to Order */}
            <div className="border-t border-white/10 pt-5">
              <div className="grid grid-cols-2 gap-2.5 text-[12.5px] text-sand-200">
                <div className="flex items-center gap-2 rounded-xl bg-white/[0.04] px-3 py-2">
                  <Box className="h-4 w-4 text-dome-300" />
                  <span>Open Walk-In Floor</span>
                </div>
                <div className="flex items-center gap-2 rounded-xl bg-white/[0.04] px-3 py-2">
                  <Layers className="h-4 w-4 text-emerald-300" />
                  <span>Zero Tools Needed</span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => onSelectForPurchase(activeVariant)}
                className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full bg-dome-400 px-6 py-3.5 text-[14.5px] font-bold text-night-950 transition-transform hover:scale-[1.01] hover:bg-dome-300"
              >
                <Eye className="h-4 w-4" />
                <span>
                  Configure This {activeVariant === 'aqsa' ? 'Al-Aqsa XL' : 'Nabawi XL'} Edition
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
