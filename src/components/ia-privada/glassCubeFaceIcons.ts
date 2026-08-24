import {
  AdditiveBlending,
  CanvasTexture,
  DoubleSide,
  Group,
  Mesh,
  MeshBasicMaterial,
  PlaneGeometry,
  SRGBColorSpace,
} from 'three';

export type CubeFaceIconKind = 'lock' | 'shield' | 'cloud' | 'files';

type FaceIconConfig = {
  kind: CubeFaceIconKind;
  position: [number, number, number];
  rotation: [number, number, number];
};

type DisposableResource = {
  geometry: PlaneGeometry;
  material: MeshBasicMaterial;
  texture: CanvasTexture;
};

export type CubeFaceIconsHandle = {
  group: Group;
  dispose: () => void;
};

const ICON_CANVAS_SIZE = 256;

function drawLockIcon(ctx: CanvasRenderingContext2D, scale: number): void {
  ctx.beginPath();
  ctx.arc(0, -scale * 0.34, scale * 0.44, Math.PI, 0);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(-scale * 0.58, -scale * 0.18);
  ctx.lineTo(-scale * 0.58, scale * 0.42);
  ctx.quadraticCurveTo(-scale * 0.58, scale * 0.72, -scale * 0.28, scale * 0.72);
  ctx.lineTo(scale * 0.28, scale * 0.72);
  ctx.quadraticCurveTo(scale * 0.58, scale * 0.72, scale * 0.58, scale * 0.42);
  ctx.lineTo(scale * 0.58, -scale * 0.18);
  ctx.stroke();

  ctx.beginPath();
  ctx.arc(0, scale * 0.12, scale * 0.11, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillRect(-scale * 0.05, scale * 0.12, scale * 0.1, scale * 0.18);
}

function drawShieldIcon(ctx: CanvasRenderingContext2D, scale: number): void {
  ctx.beginPath();
  ctx.moveTo(0, -scale * 0.78);
  ctx.lineTo(scale * 0.62, -scale * 0.48);
  ctx.lineTo(scale * 0.62, scale * 0.08);
  ctx.quadraticCurveTo(scale * 0.62, scale * 0.62, 0, scale * 0.82);
  ctx.quadraticCurveTo(-scale * 0.62, scale * 0.62, -scale * 0.62, scale * 0.08);
  ctx.lineTo(-scale * 0.62, -scale * 0.48);
  ctx.closePath();
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(0, -scale * 0.28);
  ctx.lineTo(0, scale * 0.2);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(-scale * 0.22, scale * 0.02);
  ctx.lineTo(0, scale * 0.24);
  ctx.lineTo(scale * 0.28, -scale * 0.12);
  ctx.stroke();
}

function drawCloudIcon(ctx: CanvasRenderingContext2D, scale: number): void {
  ctx.beginPath();
  ctx.arc(-scale * 0.28, scale * 0.08, scale * 0.28, Math.PI * 0.85, Math.PI * 2.15);
  ctx.arc(scale * 0.02, -scale * 0.12, scale * 0.34, Math.PI * 1.05, Math.PI * 2.05);
  ctx.arc(scale * 0.34, scale * 0.1, scale * 0.24, Math.PI * 1.35, Math.PI * 2.35);
  ctx.lineTo(-scale * 0.56, scale * 0.1);
  ctx.closePath();
  ctx.stroke();
}

function drawFilesIcon(ctx: CanvasRenderingContext2D, scale: number): void {
  const drawSheet = (offsetX: number, offsetY: number, width: number, height: number) => {
    ctx.beginPath();
    ctx.moveTo(-width / 2 + offsetX, -height / 2 + offsetY);
    ctx.lineTo(width / 2 - scale * 0.14 + offsetX, -height / 2 + offsetY);
    ctx.lineTo(width / 2 + offsetX, -height / 2 + scale * 0.14 + offsetY);
    ctx.lineTo(width / 2 + offsetX, height / 2 + offsetY);
    ctx.lineTo(-width / 2 + offsetX, height / 2 + offsetY);
    ctx.closePath();
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(width / 2 - scale * 0.14 + offsetX, -height / 2 + offsetY);
    ctx.lineTo(width / 2 - scale * 0.14 + offsetX, -height / 2 + scale * 0.14 + offsetY);
    ctx.lineTo(width / 2 + offsetX, -height / 2 + scale * 0.14 + offsetY);
    ctx.stroke();
  };

  drawSheet(-scale * 0.16, scale * 0.12, scale * 0.72, scale * 0.92);
  drawSheet(scale * 0.16, -scale * 0.12, scale * 0.72, scale * 0.92);

  ctx.beginPath();
  ctx.moveTo(-scale * 0.28, -scale * 0.02);
  ctx.lineTo(scale * 0.04, -scale * 0.02);
  ctx.moveTo(-scale * 0.28, scale * 0.16);
  ctx.lineTo(scale * 0.04, scale * 0.16);
  ctx.stroke();
}

function drawCubeFaceIcon(ctx: CanvasRenderingContext2D, kind: CubeFaceIconKind, size: number): void {
  ctx.clearRect(0, 0, size, size);

  const center = size / 2;
  const scale = size * 0.34;

  ctx.save();
  ctx.translate(center, center);
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';
  ctx.strokeStyle = 'rgba(196, 224, 255, 0.95)';
  ctx.fillStyle = 'rgba(150, 196, 255, 0.82)';
  ctx.lineWidth = size * 0.042;
  ctx.shadowColor = 'rgba(77, 163, 255, 0.85)';
  ctx.shadowBlur = size * 0.07;

  switch (kind) {
    case 'lock':
      drawLockIcon(ctx, scale);
      break;
    case 'shield':
      drawShieldIcon(ctx, scale);
      break;
    case 'cloud':
      drawCloudIcon(ctx, scale);
      break;
    case 'files':
      drawFilesIcon(ctx, scale);
      break;
    default:
      break;
  }

  ctx.restore();
}

function createCubeIconTexture(kind: CubeFaceIconKind): CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = ICON_CANVAS_SIZE;
  canvas.height = ICON_CANVAS_SIZE;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    drawCubeFaceIcon(ctx, kind, ICON_CANVAS_SIZE);
  }

  const texture = new CanvasTexture(canvas);
  texture.colorSpace = SRGBColorSpace;
  texture.needsUpdate = true;
  return texture;
}

function createFaceIconMesh(
  kind: CubeFaceIconKind,
  position: [number, number, number],
  rotation: [number, number, number],
  iconSize: number,
  faceOffset: number
): { mesh: Mesh; resources: DisposableResource } {
  const texture = createCubeIconTexture(kind);
  const geometry = new PlaneGeometry(iconSize, iconSize);
  const material = new MeshBasicMaterial({
    map: texture,
    transparent: true,
    opacity: 0.58,
    color: 0x9ec8ff,
    blending: AdditiveBlending,
    depthWrite: false,
    side: DoubleSide,
    toneMapped: false,
  });

  const mesh = new Mesh(geometry, material);
  mesh.position.set(
    position[0] * faceOffset,
    position[1] * faceOffset,
    position[2] * faceOffset
  );
  mesh.rotation.set(rotation[0], rotation[1], rotation[2]);
  mesh.renderOrder = 2;

  return {
    mesh,
    resources: { geometry, material, texture },
  };
}

export function createCubeFaceIcons(cubeSize: number): CubeFaceIconsHandle {
  const group = new Group();
  const resources: DisposableResource[] = [];
  const iconSize = cubeSize * 0.34;
  const faceOffset = cubeSize / 2 + 0.004;

  const faces: FaceIconConfig[] = [
    { kind: 'lock', position: [0, 0, 1], rotation: [0, 0, 0] },
    { kind: 'shield', position: [0, 0, -1], rotation: [0, Math.PI, 0] },
    { kind: 'cloud', position: [1, 0, 0], rotation: [0, Math.PI / 2, 0] },
    { kind: 'files', position: [-1, 0, 0], rotation: [0, -Math.PI / 2, 0] },
  ];

  faces.forEach((face) => {
    const { mesh, resources: faceResources } = createFaceIconMesh(
      face.kind,
      face.position,
      face.rotation,
      iconSize,
      faceOffset
    );
    group.add(mesh);
    resources.push(faceResources);
  });

  return {
    group,
    dispose: () => {
      resources.forEach(({ geometry, material, texture }) => {
        geometry.dispose();
        material.dispose();
        texture.dispose();
      });
    },
  };
}
