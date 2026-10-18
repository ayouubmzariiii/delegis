import Image from 'next/image';
import type { Lang } from '@/lib/i18n';
import { photos, type PhotoKey } from '@/content/images';
import { cx } from './primitives';

/** Encoder quality for photography (Next default is 75, too soft for large hero images). */
export const PHOTO_QUALITY = 90;

/**
 * Responsive cover photo. Parent must be `relative` with a set aspect ratio or height.
 * The upstream request is a high-resolution, lightly compressed JPEG so Next only compresses once.
 */
export function Photo({
  k,
  lang,
  sizes,
  priority,
  className,
  position,
}: {
  k: PhotoKey;
  lang: Lang;
  sizes: string;
  priority?: boolean;
  className?: string;
  position?: string;
}) {
  const p = photos[k];
  return (
    <Image
      src={`${p.src}?fm=jpg&q=92&w=3200`}
      alt={p.alt[lang]}
      fill
      sizes={sizes}
      quality={PHOTO_QUALITY}
      priority={priority}
      style={{ objectPosition: position ?? p.focus }}
      className={cx('object-cover', className)}
    />
  );
}
