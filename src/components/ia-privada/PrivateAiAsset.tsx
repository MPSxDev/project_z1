import Image from 'next/image';
import { PRIVATE_AI_ASSET_SIZE } from '@/lib/ia-privada';
import { cn } from '@/lib/utils';

type PrivateAiAssetProps = {
  src: string;
  alt: string;
  priority?: boolean;
  className?: string;
  /** Default: compact strip (~28rem). `md` for slightly larger accents. */
  size?: 'sm' | 'md';
  /** Fade the bottom edge into the page background. */
  fadeBottom?: boolean;
};

const sizeClasses = {
  sm: 'max-w-md',
  md: 'max-w-xl',
} as const;

export default function PrivateAiAsset({
  src,
  alt,
  priority = false,
  className,
  size = 'sm',
  fadeBottom = false,
}: PrivateAiAssetProps) {
  return (
    <div className={cn('relative mx-auto w-full overflow-hidden', sizeClasses[size], className)}>
      <Image
        src={src}
        alt={alt}
        width={PRIVATE_AI_ASSET_SIZE.width}
        height={PRIVATE_AI_ASSET_SIZE.height}
        sizes="(min-width: 768px) 36rem, 100vw"
        className="h-auto w-full object-contain mix-blend-lighten"
        priority={priority}
      />
      {fadeBottom ? (
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-[38%] bg-gradient-to-b from-transparent to-[#05070A]"
          aria-hidden
        />
      ) : null}
    </div>
  );
}
