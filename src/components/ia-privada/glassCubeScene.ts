import {
  AdditiveBlending,
  ACESFilmicToneMapping,
  BufferAttribute,
  BufferGeometry,
  CanvasTexture,
  Color,
  DirectionalLight,
  Group,
  Mesh,
  MeshBasicMaterial,
  MeshPhysicalMaterial,
  PerspectiveCamera,
  PlaneGeometry,
  PMREMGenerator,
  PointLight,
  Points,
  PointsMaterial,
  Scene,
  SRGBColorSpace,
  Texture,
  TorusGeometry,
  Vector2,
  WebGLRenderer,
} from 'three';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';
import { createCubeFaceIcons } from './glassCubeFaceIcons';

export type GlassCubeSceneHandle = {
  dispose: () => void;
};

type ParticleState = {
  vx: number;
  vy: number;
  vz: number;
};

const CUBE_SIZE = 1.28;
const PARTICLE_BOUNDS = 0.4;
const ELECTRIC_BLUE = 0x4da3ff;

function createSoftParticleTexture(): CanvasTexture {
  const size = 64;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');
  if (!ctx) {
    return new CanvasTexture(canvas);
  }

  const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
  gradient.addColorStop(0, 'rgba(210, 235, 255, 1)');
  gradient.addColorStop(0.28, 'rgba(90, 170, 255, 0.7)');
  gradient.addColorStop(1, 'rgba(31, 92, 255, 0)');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, size, size);

  const texture = new CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

function createStudioEnvironment(renderer: WebGLRenderer): {
  texture: Texture;
  dispose: () => void;
} {
  const pmrem = new PMREMGenerator(renderer);
  const envScene = new Scene();
  envScene.background = new Color(0x05070a);

  const geometries: BufferGeometry[] = [];
  const materials: MeshBasicMaterial[] = [];

  const addPanel = (
    color: number,
    width: number,
    height: number,
    position: [number, number, number],
    rotation: [number, number, number]
  ) => {
    const geometry = new PlaneGeometry(width, height);
    const material = new MeshBasicMaterial({ color });
    const mesh = new Mesh(geometry, material);
    mesh.position.set(...position);
    mesh.rotation.set(...rotation);
    envScene.add(mesh);
    geometries.push(geometry);
    materials.push(material);
  };

  addPanel(0xd8e6ff, 10, 10, [0, 7, 0], [-Math.PI / 2, 0, 0]);
  addPanel(0x8aaee0, 5, 5, [-5, 3.4, 2.5], [0, Math.PI / 3.4, 0]);
  addPanel(0x4a7fd4, 7, 9, [6, 1.2, -2], [0, -Math.PI / 2.8, 0]);

  const renderTarget = pmrem.fromScene(envScene, 0.05);

  return {
    texture: renderTarget.texture,
    dispose: () => {
      geometries.forEach((geometry) => geometry.dispose());
      materials.forEach((material) => material.dispose());
      renderTarget.dispose();
      pmrem.dispose();
    },
  };
}

export function mountGlassCubeScene(
  canvas: HTMLCanvasElement
): GlassCubeSceneHandle {
  const parent = canvas.parentElement;
  if (!parent) {
    return { dispose: () => undefined };
  }

  let renderer: WebGLRenderer;
  try {
    renderer = new WebGLRenderer({
      canvas,
      antialias: true,
      alpha: false,
      powerPreference: 'high-performance',
    });
  } catch {
    return { dispose: () => undefined };
  }

  const scene = new Scene();
  scene.background = new Color(0x000000);

  const camera = new PerspectiveCamera(32, 1, 0.1, 40);
  camera.position.set(0, 0.12, 4.6);

  renderer.outputColorSpace = SRGBColorSpace;
  renderer.toneMapping = ACESFilmicToneMapping;
  renderer.toneMappingExposure = 0.86;
  renderer.setClearColor(0x000000, 1);

  const environment = createStudioEnvironment(renderer);
  scene.environment = environment.texture;
  scene.environmentIntensity = 0.78;

  const lightRig = new Group();
  scene.add(lightRig);

  const keyLight = new DirectionalLight(0xd8e8ff, 1.65);
  keyLight.position.set(4.2, 6.2, 3.4);
  const fillLight = new DirectionalLight(0x5a7fd4, 0.34);
  fillLight.position.set(-4, 1.4, 2.2);
  const rimLight = new DirectionalLight(0x3d7ae8, 0.72);
  rimLight.position.set(-1.6, 2.4, -5);
  const frontLight = new DirectionalLight(0x6a9ee8, 0.52);
  frontLight.position.set(0.15, 0.9, 5.4);

  const rigLights = [keyLight, fillLight, rimLight, frontLight];
  rigLights.forEach((light) => {
    light.target.position.set(0, 0, 0);
    lightRig.add(light);
    lightRig.add(light.target);
  });

  const innerLight = new PointLight(0x3d7ae8, 1.05, 3.6, 1.6);
  innerLight.position.set(0, 0, 0);

  const root = new Group();
  scene.add(root);
  root.add(innerLight);

  const cubeGroup = new Group();
  root.add(cubeGroup);

  const cubeGeometry = new RoundedBoxGeometry(CUBE_SIZE, CUBE_SIZE, CUBE_SIZE, 7, 0.07);
  const cubeMaterial = new MeshPhysicalMaterial({
    color: 0x5a7a9e,
    metalness: 0,
    roughness: 0.14,
    transmission: 0.99,
    thickness: 0.38,
    ior: 1.44,
    clearcoat: 0.32,
    clearcoatRoughness: 0.28,
    attenuationColor: new Color(0x1a3f8f),
    attenuationDistance: 4.1,
    transparent: true,
    opacity: 0.72,
    emissive: new Color(0x1a4fd4),
    emissiveIntensity: 0.14,
    envMapIntensity: 0.72,
  });
  const cube = new Mesh(cubeGeometry, cubeMaterial);
  cubeGroup.add(cube);

  const faceIcons = createCubeFaceIcons(CUBE_SIZE);
  cubeGroup.add(faceIcons.group);

  const glowGeometry = new RoundedBoxGeometry(
    CUBE_SIZE * 1.018,
    CUBE_SIZE * 1.018,
    CUBE_SIZE * 1.018,
    7,
    0.07
  );
  const glowMaterial = new MeshBasicMaterial({
    color: 0x3d7ae8,
    transparent: true,
    opacity: 0.075,
    blending: AdditiveBlending,
    depthWrite: false,
  });
  const cubeGlow = new Mesh(glowGeometry, glowMaterial);
  cubeGroup.add(cubeGlow);

  const ringGeometry = new TorusGeometry(1.52, 0.011, 12, 160);
  const ringMaterial = new MeshBasicMaterial({
    color: 0xb7d4ff,
    transparent: true,
    opacity: 0.95,
  });
  const ring = new Mesh(ringGeometry, ringMaterial);
  ring.rotation.x = Math.PI / 2.15;
  ring.rotation.z = 0.18;
  root.add(ring);

  const ringGlowGeometry = new TorusGeometry(1.52, 0.038, 10, 96);
  const ringGlowMaterial = new MeshBasicMaterial({
    color: ELECTRIC_BLUE,
    transparent: true,
    opacity: 0.2,
    blending: AdditiveBlending,
    depthWrite: false,
  });
  const ringGlow = new Mesh(ringGlowGeometry, ringGlowMaterial);
  ringGlow.rotation.copy(ring.rotation);
  root.add(ringGlow);

  const mobileQuery = window.matchMedia('(max-width: 1023px)');
  const particleCount = mobileQuery.matches ? 10 : 16;
  const particleGeometry = new BufferGeometry();
  const positions = new Float32Array(particleCount * 3);
  const particleState: ParticleState[] = [];

  for (let i = 0; i < particleCount; i += 1) {
    const i3 = i * 3;
    positions[i3] = (Math.random() * 2 - 1) * PARTICLE_BOUNDS;
    positions[i3 + 1] = (Math.random() * 2 - 1) * PARTICLE_BOUNDS;
    positions[i3 + 2] = (Math.random() * 2 - 1) * PARTICLE_BOUNDS;
    particleState.push({
      vx: (Math.random() - 0.5) * 0.045,
      vy: (Math.random() - 0.5) * 0.045,
      vz: (Math.random() - 0.5) * 0.045,
    });
  }

  particleGeometry.setAttribute('position', new BufferAttribute(positions, 3));
  const particleTexture = createSoftParticleTexture();
  const particleMaterial = new PointsMaterial({
    map: particleTexture,
    color: ELECTRIC_BLUE,
    size: mobileQuery.matches ? 0.06 : 0.052,
    transparent: true,
    opacity: 0.92,
    blending: AdditiveBlending,
    depthWrite: false,
    sizeAttenuation: true,
  });
  const particles = new Points(particleGeometry, particleMaterial);
  cubeGroup.add(particles);

  const pointer = new Vector2(0, 0);
  const pointerTarget = new Vector2(0, 0);
  const layoutPosition = new Vector2(1.28, 0.04);
  let autoRotY = 0.55;
  let elapsed = 0;
  let frameId = 0;
  let lastTime = performance.now();
  let visible = true;
  let pageVisible = document.visibilityState === 'visible';
  let reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let disposed = false;

  const applyLayout = () => {
    const mobile = mobileQuery.matches;
    if (mobile) {
      layoutPosition.set(0, -0.72);
      root.scale.setScalar(0.82);
      camera.position.set(0, 0.08, 5.1);
      camera.fov = 34;
    } else {
      layoutPosition.set(1.28, 0.04);
      root.scale.setScalar(1);
      camera.position.set(0, 0.14, 4.55);
      camera.fov = 32;
    }
    root.position.x = layoutPosition.x;
    lightRig.position.set(layoutPosition.x, layoutPosition.y, 0);
    camera.updateProjectionMatrix();
  };

  const setSize = () => {
    const rect = parent.getBoundingClientRect();
    const width = Math.max(1, rect.width);
    const height = Math.max(1, rect.height);
    const dpr = Math.min(window.devicePixelRatio || 1, mobileQuery.matches ? 1.5 : 2);
    renderer.setPixelRatio(dpr);
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
  };

  const updateParticles = (delta: number) => {
    const pos = particleGeometry.getAttribute('position') as BufferAttribute;
    for (let i = 0; i < particleCount; i += 1) {
      const state = particleState[i];
      state.vx += (Math.random() - 0.5) * 0.008 * delta;
      state.vy += (Math.random() - 0.5) * 0.008 * delta;
      state.vz += (Math.random() - 0.5) * 0.008 * delta;
      state.vx *= 0.992;
      state.vy *= 0.992;
      state.vz *= 0.992;

      let x = pos.getX(i) + state.vx * delta * 18;
      let y = pos.getY(i) + state.vy * delta * 18;
      let z = pos.getZ(i) + state.vz * delta * 18;

      if (Math.abs(x) > PARTICLE_BOUNDS) {
        x = Math.sign(x) * PARTICLE_BOUNDS;
        state.vx *= -1;
      }
      if (Math.abs(y) > PARTICLE_BOUNDS) {
        y = Math.sign(y) * PARTICLE_BOUNDS;
        state.vy *= -1;
      }
      if (Math.abs(z) > PARTICLE_BOUNDS) {
        z = Math.sign(z) * PARTICLE_BOUNDS;
        state.vz *= -1;
      }

      pos.setXYZ(i, x, y, z);
    }
    pos.needsUpdate = true;
  };

  const renderFrame = (time: number, delta: number) => {
    if (!reducedMotion) {
      elapsed += delta;
      autoRotY += delta * 0.12;
      pointer.lerp(pointerTarget, 0.045);
      root.rotation.y = autoRotY + pointer.x * 0.14;
      root.rotation.x = 0.2 + Math.sin(elapsed * 0.32) * 0.035 + pointer.y * 0.07;
      root.position.set(
        layoutPosition.x,
        layoutPosition.y + Math.sin(elapsed * 0.42) * 0.06,
        0
      );
      ring.rotation.z += delta * 0.08;
      ringGlow.rotation.copy(ring.rotation);
      updateParticles(delta);
    } else {
      root.rotation.y = 0.62;
      root.rotation.x = 0.2;
      root.position.set(layoutPosition.x, layoutPosition.y, 0);
    }

    renderer.render(scene, camera);
    lastTime = time;
  };

  const tick = (time: number) => {
    if (disposed) return;
    const shouldRun = visible && pageVisible && !reducedMotion;
    if (!shouldRun) {
      frameId = 0;
      return;
    }
    const delta = Math.min((time - lastTime) / 1000, 0.05);
    renderFrame(time, delta);
    frameId = window.requestAnimationFrame(tick);
  };

  const resume = () => {
    if (disposed || reducedMotion || frameId !== 0) return;
    if (visible && pageVisible) {
      lastTime = performance.now();
      frameId = window.requestAnimationFrame(tick);
    }
  };

  const onPointerMove = (event: PointerEvent) => {
    pointerTarget.x = (event.clientX / window.innerWidth) * 2 - 1;
    pointerTarget.y = (event.clientY / window.innerHeight) * 2 - 1;
  };

  const onVisibility = () => {
    pageVisible = document.visibilityState === 'visible';
    resume();
  };

  const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  const onMotionChange = () => {
    reducedMotion = motionQuery.matches;
    if (!reducedMotion && frameId === 0) {
      lastTime = performance.now();
      frameId = window.requestAnimationFrame(tick);
    }
  };

  const onLayoutChange = () => {
    applyLayout();
    setSize();
    if (reducedMotion) {
      renderFrame(performance.now(), 0);
    }
  };

  const resizeObserver = new ResizeObserver(() => {
    onLayoutChange();
  });

  const intersectionObserver = new IntersectionObserver(
    ([entry]) => {
      visible = entry?.isIntersecting ?? true;
      resume();
    },
    { threshold: 0.05 }
  );

  resizeObserver.observe(parent);
  intersectionObserver.observe(parent);
  window.addEventListener('pointermove', onPointerMove, { passive: true });
  document.addEventListener('visibilitychange', onVisibility);
  motionQuery.addEventListener('change', onMotionChange);
  mobileQuery.addEventListener('change', onLayoutChange);

  applyLayout();
  setSize();
  renderFrame(performance.now(), 0);
  if (!reducedMotion) {
    frameId = window.requestAnimationFrame(tick);
  }

  return {
    dispose: () => {
      disposed = true;
      window.cancelAnimationFrame(frameId);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      window.removeEventListener('pointermove', onPointerMove);
      document.removeEventListener('visibilitychange', onVisibility);
      motionQuery.removeEventListener('change', onMotionChange);
      mobileQuery.removeEventListener('change', onLayoutChange);
      cubeGeometry.dispose();
      cubeMaterial.dispose();
      glowGeometry.dispose();
      glowMaterial.dispose();
      faceIcons.dispose();
      ringGeometry.dispose();
      ringMaterial.dispose();
      ringGlowGeometry.dispose();
      ringGlowMaterial.dispose();
      particleGeometry.dispose();
      particleMaterial.dispose();
      particleTexture.dispose();
      environment.dispose();
      renderer.dispose();
    },
  };
}
