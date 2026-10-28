import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { Flame, Play, Rotate3d, Sun } from 'lucide-react';

export type VisualMode = 'studio' | 'ramadan';
export type MasjidVariant = 'aqsa' | 'nabawi';

interface Props {
  activeVariant: MasjidVariant;
  onVariantChange: (v: MasjidVariant) => void;
  onSelectForPurchase: (variant: MasjidVariant) => void;
}

function createFacadeTexture(variant: MasjidVariant, isFront: boolean): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 1024;
  const ctx = canvas.getContext('2d')!;

  if (variant === 'aqsa') {
    ctx.fillStyle = '#EAE0C8';
    ctx.fillRect(0, 0, 1024, 1024);

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

    ctx.fillStyle = '#1B3A73';
    ctx.fillRect(0, 0, 1024, 460);

    ctx.fillStyle = '#1E7FB8';
    ctx.fillRect(0, 110, 1024, 72);

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

    ctx.fillStyle = '#132954';
    ctx.fillRect(0, 22, 1024, 58);
    ctx.strokeStyle = '#DFC68C';
    ctx.lineWidth = 3;
    ctx.strokeRect(8, 26, 1008, 50);

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
      ctx.fillStyle = '#163063';
      ctx.fillRect(330, 190, 364, 300);
      ctx.strokeStyle = '#E8D5A5';
      ctx.lineWidth = 4;
      ctx.strokeRect(338, 198, 348, 285);

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
      drawAqsaWindow(512, 355, 150, 210);
      drawAqsaWindow(512, 720, 150, 210);
    }
  } else {
    ctx.fillStyle = '#D7B98E';
    ctx.fillRect(0, 0, 1024, 1024);

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

    if (isFront) {
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
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [visualMode, setVisualMode] = useState<VisualMode>('studio');
  const [assemblyPct, setAssemblyPct] = useState<number>(100);
  const [isAutoBuilding, setIsAutoBuilding] = useState<boolean>(false);

  const assemblyRef = useRef<number>(100);
  const modeRef = useRef<VisualMode>('studio');

  useEffect(() => {
    assemblyRef.current = assemblyPct;
  }, [assemblyPct]);

  useEffect(() => {
    modeRef.current = visualMode;
  }, [visualMode]);

  useEffect(() => {
    if (!isAutoBuilding) return;
    let rafId: number;
    let lastTime = performance.now();

    const step = (now: number) => {
      const dt = (now - lastTime) / 1000;
      lastTime = now;
      setAssemblyPct((prev) => {
        const next = prev + dt * 26;
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

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      38,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.set(2.95, 1.95, 3.45);

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
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.9;
    controls.target.set(0, 0.92, 0);
    controls.minPolarAngle = 0.1;
    controls.maxPolarAngle = Math.PI / 2 + 0.15;
    controls.minDistance = 1.9;
    controls.maxDistance = 5.8;

    const ambientLight = new THREE.AmbientLight(0xfff8eb, 1.5);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xfff4dc, 1.95);
    keyLight.position.set(4, 6, 4.5);
    scene.add(keyLight);

    const interiorLanternLight = new THREE.PointLight(0xff9b26, 0, 5.5, 1.5);
    interiorLanternLight.position.set(0, 0.65, 0);
    scene.add(interiorLanternLight);

    const lanternOrb = new THREE.Mesh(
      new THREE.SphereGeometry(0.08, 16, 16),
      new THREE.MeshBasicMaterial({ color: 0xffcf70 })
    );
    lanternOrb.position.set(0, 0.25, -0.15);
    scene.add(lanternOrb);

    const outerRing = new THREE.Mesh(
      new THREE.RingGeometry(1.48, 1.5, 64),
      new THREE.MeshBasicMaterial({
        color: 0xc59632,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.35,
      })
    );
    outerRing.rotation.x = -Math.PI / 2;
    outerRing.position.y = 0.004;
    scene.add(outerRing);

    const masjidRoot = new THREE.Group();
    scene.add(masjidRoot);

    const W = 1.6;
    const H = 1.24;
    const T = 0.028;

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
      side: THREE.DoubleSide,
    });

    const drumMat = new THREE.MeshStandardMaterial({
      color: activeVariant === 'aqsa' ? 0x1b3a73 : 0x254f35,
      roughness: 0.55,
      metalness: 0.1,
      side: THREE.DoubleSide,
    });

    const spireMat = new THREE.MeshStandardMaterial({
      color: activeVariant === 'aqsa' ? 0x1d3f80 : 0x2f6342,
      roughness: 0.48,
      metalness: 0.14,
    });

    const goldMat = new THREE.MeshStandardMaterial({
      color: 0xdfb860,
      roughness: 0.3,
      metalness: 0.65,
    });

    const makePanel = (width: number, height: number, depth: number, outerMat: THREE.Material) => {
      const geo = new THREE.BoxGeometry(width, height, depth);
      return new THREE.Mesh(geo, [kraftMat, kraftMat, kraftMat, kraftMat, outerMat, kraftMat]);
    };

    const frontHinge = new THREE.Group();
    frontHinge.position.set(0, 0, W / 2);
    masjidRoot.add(frontHinge);

    const frontShape = new THREE.Shape();
    frontShape.moveTo(-W / 2, 0);
    frontShape.lineTo(W / 2, 0);
    frontShape.lineTo(W / 2, H);
    frontShape.lineTo(-W / 2, H);
    frontShape.closePath();

    const doorHole = new THREE.Path();
    const dw = 0.25;
    doorHole.moveTo(-dw, 0.035);
    doorHole.lineTo(dw, 0.035);
    doorHole.lineTo(dw, 0.56);
    doorHole.quadraticCurveTo(dw, 0.78, 0, 0.88);
    doorHole.quadraticCurveTo(-dw, 0.78, -dw, 0.56);
    doorHole.closePath();
    frontShape.holes.push(doorHole);

    const frontGeo = new THREE.ExtrudeGeometry(frontShape, { depth: T, bevelEnabled: false });
    const posAttr = frontGeo.attributes.position;
    const uvAttr = frontGeo.attributes.uv;
    for (let i = 0; i < posAttr.count; i++) {
      uvAttr.setXY(i, (posAttr.getX(i) + W / 2) / W, posAttr.getY(i) / H);
    }
    frontGeo.translate(0, 0, -T);
    frontHinge.add(new THREE.Mesh(frontGeo, [frontMat, kraftMat]));

    const backHinge = new THREE.Group();
    backHinge.position.set(0, 0, -W / 2);
    backHinge.rotation.y = Math.PI;
    masjidRoot.add(backHinge);
    const backPanel = makePanel(W, H, T, sideMat);
    backPanel.position.set(0, H / 2, -T / 2);
    backHinge.add(backPanel);

    const leftHinge = new THREE.Group();
    leftHinge.position.set(-W / 2, 0, 0);
    leftHinge.rotation.y = -Math.PI / 2;
    masjidRoot.add(leftHinge);
    const leftPanel = makePanel(W, H, T, sideMat);
    leftPanel.position.set(0, H / 2, -T / 2);
    leftHinge.add(leftPanel);

    const rightHinge = new THREE.Group();
    rightHinge.position.set(W / 2, 0, 0);
    rightHinge.rotation.y = Math.PI / 2;
    masjidRoot.add(rightHinge);
    const rightPanel = makePanel(W, H, T, sideMat);
    rightPanel.position.set(0, H / 2, -T / 2);
    rightHinge.add(rightPanel);

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

    const roofGeo = new THREE.ExtrudeGeometry(roofShape, { depth: T, bevelEnabled: false });
    roofGeo.rotateX(-Math.PI / 2);
    roofGroup.add(new THREE.Mesh(roofGeo, kraftMat));

    const minaretsGroup = new THREE.Group();
    masjidRoot.add(minaretsGroup);
    [
      [-W / 2 + 0.09, W / 2 - 0.09],
      [W / 2 - 0.09, W / 2 - 0.09],
      [-W / 2 + 0.09, -W / 2 + 0.09],
      [W / 2 - 0.09, -W / 2 + 0.09],
    ].forEach(([cx, cz]) => {
      const mTower = new THREE.Group();
      mTower.position.set(cx, 0, cz);
      minaretsGroup.add(mTower);

      const shaft = new THREE.Mesh(new THREE.BoxGeometry(0.24, 1.36, 0.24), sideMat);
      shaft.position.y = 0.68;
      mTower.add(shaft);

      const balcony = new THREE.Mesh(new THREE.BoxGeometry(0.32, 0.08, 0.32), kraftMat);
      balcony.position.y = 1.38;
      mTower.add(balcony);

      const lanternBox = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.16, 0.2), drumMat);
      lanternBox.position.y = 1.5;
      mTower.add(lanternBox);

      const spire = new THREE.Mesh(new THREE.ConeGeometry(0.17, 0.28, 4), spireMat);
      spire.rotation.y = Math.PI / 4;
      spire.position.y = 1.72;
      mTower.add(spire);
    });

    const domeGroup = new THREE.Group();
    domeGroup.position.set(0, H + T, 0);
    masjidRoot.add(domeGroup);

    const drumMesh = new THREE.Mesh(
      new THREE.CylinderGeometry(0.42, 0.42, 0.2, 8, 1, true),
      drumMat
    );
    drumMesh.position.y = 0.1;
    domeGroup.add(drumMesh);

    const crownMesh = new THREE.Mesh(
      new THREE.SphereGeometry(0.42, 8, 5, 0, Math.PI * 2, 0, Math.PI / 2),
      domeMat
    );
    crownMesh.position.y = 0.2;
    crownMesh.scale.set(1, 0.78, 1);
    domeGroup.add(crownMesh);

    const finialStem = new THREE.Mesh(new THREE.CylinderGeometry(0.016, 0.022, 0.15, 12), goldMat);
    finialStem.position.y = 0.58;
    domeGroup.add(finialStem);

    const crescentOuter = new THREE.Mesh(
      new THREE.TorusGeometry(0.065, 0.015, 12, 28, Math.PI * 1.45),
      goldMat
    );
    crescentOuter.position.y = 0.7;
    crescentOuter.rotation.z = Math.PI * 0.78;
    domeGroup.add(crescentOuter);

    const clock = new THREE.Clock();
    let frameId: number;

    const animate = () => {
      frameId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();
      const p = THREE.MathUtils.clamp(assemblyRef.current / 100, 0, 1);

      const wallProgress = THREE.MathUtils.smoothstep(p, 0.0, 0.45);
      const foldAngle = (1 - wallProgress) * (Math.PI / 2.08);
      frontHinge.rotation.x = foldAngle;
      backHinge.rotation.x = foldAngle;
      leftHinge.rotation.x = foldAngle;
      rightHinge.rotation.x = foldAngle;

      const roofProgress = THREE.MathUtils.smoothstep(p, 0.38, 0.68);
      roofGroup.position.y = H + (1 - roofProgress) * 0.95;
      roofGroup.scale.setScalar(0.3 + 0.7 * roofProgress);
      roofGroup.visible = p > 0.25;

      const minProgress = THREE.MathUtils.smoothstep(p, 0.6, 0.86);
      minaretsGroup.position.y = (1 - minProgress) * 1.15;
      minaretsGroup.scale.set(1, Math.max(0.01, minProgress), 1);
      minaretsGroup.visible = p > 0.52;

      const domeProgress = THREE.MathUtils.smoothstep(p, 0.8, 1.0);
      domeGroup.position.y = H + T + (1 - domeProgress) * 0.95;
      domeGroup.scale.setScalar(Math.max(0.01, domeProgress));
      domeGroup.visible = p > 0.74;

      if (modeRef.current === 'ramadan') {
        scene.background = new THREE.Color(0x161d29);
        ambientLight.intensity = 0.5;
        keyLight.intensity = 0.65;
        interiorLanternLight.color.setHex(0xff9924);
        interiorLanternLight.intensity = 4.6 + Math.sin(elapsed * 7) * 0.35;
        lanternOrb.visible = p > 0.35;
      } else {
        scene.background = new THREE.Color(0xf7f3e9);
        ambientLight.intensity = 1.5;
        keyLight.intensity = 1.95;
        interiorLanternLight.intensity = 0.95;
        interiorLanternLight.color.setHex(0xffe0a3);
        lanternOrb.visible = false;
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
      controls.dispose();
      renderer.dispose();
      frontTex.dispose();
      sideTex.dispose();
      domeTex.dispose();
    };
  }, [activeVariant]);

  return (
    <section id="atelier-3d" className="bg-sand-100 py-12 sm:py-20">
      <div className="mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <h2 className="font-display text-3xl font-medium text-olive-800 sm:text-4xl">
              Explore in 3D
            </h2>
            <p className="mt-1 text-[15px] text-olive-800/80">
              Drag to spin 360° or watch it unfold from flat sheets.
            </p>
          </div>

          <div className="inline-flex self-start rounded-full border border-sand-300 bg-white p-1">
            <button
              type="button"
              onClick={() => onVariantChange('aqsa')}
              className={`rounded-full px-4 py-2 text-[13px] font-bold transition-all ${
                activeVariant === 'aqsa'
                  ? 'bg-aqsa-500 text-white'
                  : 'text-olive-800 hover:bg-sand-100'
              }`}
            >
              Al-Aqsa XL
            </button>
            <button
              type="button"
              onClick={() => onVariantChange('nabawi')}
              className={`rounded-full px-4 py-2 text-[13px] font-bold transition-all ${
                activeVariant === 'nabawi'
                  ? 'bg-olive-500 text-white'
                  : 'text-olive-800 hover:bg-sand-100'
              }`}
            >
              Nabawi XL
            </button>
          </div>
        </div>

        {/* Clean Full-Width 3D Canvas Card */}
        <div className="mt-6 overflow-hidden rounded-[2rem] border border-sand-300 bg-white p-3 shadow-plush">
          <div className="relative overflow-hidden rounded-[1.5rem]">
            <div
              ref={mountRef}
              className="h-[380px] w-full cursor-grab active:cursor-grabbing sm:h-[470px]"
            />

            <div className="pointer-events-none absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-white/90 px-3.5 py-1.5 text-[12px] font-bold text-olive-800 shadow-sm backdrop-blur-md">
              <Rotate3d className="h-3.5 w-3.5 text-olive-600" />
              <span>Drag to rotate</span>
            </div>
          </div>

          {/* Minimal Bottom Control Strip */}
          <div className="mt-3 flex flex-wrap items-center justify-between gap-2 px-1">
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setVisualMode('studio')}
                className={`inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-[13px] font-bold transition-all ${
                  visualMode === 'studio'
                    ? 'bg-olive-500 text-white'
                    : 'bg-sand-100 text-olive-800 hover:bg-sand-200'
                }`}
              >
                <Sun className="h-3.5 w-3.5" />
                <span>Daylight</span>
              </button>

              <button
                type="button"
                onClick={() => setVisualMode('ramadan')}
                className={`inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-[13px] font-bold transition-all ${
                  visualMode === 'ramadan'
                    ? 'bg-dome-500 text-white'
                    : 'bg-sand-100 text-olive-800 hover:bg-sand-200'
                }`}
              >
                <Flame className="h-3.5 w-3.5" />
                <span>Lantern Glow</span>
              </button>
            </div>

            <button
              type="button"
              onClick={() => {
                setAssemblyPct(0);
                setIsAutoBuilding(true);
              }}
              className="inline-flex items-center gap-1.5 rounded-full border border-sand-300 bg-sand-50 px-4 py-2 text-[13px] font-bold text-olive-800 hover:bg-sand-100"
            >
              <Play className="h-3.5 w-3.5 text-olive-600" />
              <span>Watch 3D Unfold</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
