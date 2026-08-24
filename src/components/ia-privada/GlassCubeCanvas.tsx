'use client';

import { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import { mountGlassCubeScene } from './glassCubeScene';

type GlassCubeCanvasProps = {
  className?: string;
};

export default function GlassCubeCanvas({ className }: GlassCubeCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;

    const scene = mountGlassCubeScene(canvas);
    return () => scene.dispose();
  }, []);

  return (
    <div className={cn('pointer-events-none absolute inset-0', className)}>
      <canvas
        ref={canvasRef}
        className="h-full w-full"
        aria-hidden="true"
      />
    </div>
  );
}
