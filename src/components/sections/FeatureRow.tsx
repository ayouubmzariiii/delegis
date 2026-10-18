import type { ReactNode } from 'react';
import type { Lang } from '@/lib/i18n';
import type { PhotoKey } from '@/content/images';
import { Photo } from '@/components/ui/Photo';
import { Eyebrow, cx } from '@/components/ui/primitives';
import { Icon } from '@/components/ui/Icon';

/** Alternating photo + copy row, Pennylane-style. `overlay` floats a small UI card on the photo. */
export function FeatureRow({
  photo,
  lang,
  label,
  title,
  text,
  points,
  action,
  overlay,
  reverse,
}: {
  photo: PhotoKey;
  lang: Lang;
  label: string;
  title: string;
  text: string;
  points?: string[];
  action?: ReactNode;
  overlay?: ReactNode;
  reverse?: boolean;
}) {
  return (
    <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
      <div className={cx('relative', reverse && 'lg:order-2')}>
        {/* offset frame + dot accent */}
        <div aria-hidden="true" className={cx('absolute -bottom-4 h-full w-full rounded-[2rem] bg-go-100', reverse ? '-start-4' : '-end-4')} />
        <div aria-hidden="true" className={cx('dots absolute -top-6 h-28 w-28 rounded-xl', reverse ? '-end-6' : '-start-6')} />
        <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem] bg-paper-200 ring-1 ring-ink/5">
        <Photo k={photo} lang={lang} sizes="(min-width: 1024px) 600px, 100vw" />
        {overlay && (
          <div aria-hidden="true" className="absolute bottom-5 start-5 end-5 sm:end-auto">
            {overlay}
          </div>
        )}
        </div>
      </div>
      <div>
        <Eyebrow>{label}</Eyebrow>
        <h2 className="mt-5 text-display-md font-semibold">{title}</h2>
        <p className="mt-5 text-lg leading-relaxed text-ink-600">{text}</p>
        {points && (
          <ul className="mt-7 space-y-3">
            {points.map((p) => (
              <li key={p} className="flex gap-3 text-[15px]">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-mark">
                  <Icon name="check" className="h-3 w-3" />
                </span>
                {p}
              </li>
            ))}
          </ul>
        )}
        {action && <div className="mt-8">{action}</div>}
      </div>
    </div>
  );
}

/** Small white card used as a photo overlay. */
export function OverlayCard({ children }: { children: ReactNode }) {
  return <div className="w-fit max-w-full rounded-2xl bg-white/95 p-4 shadow-lift ring-1 ring-ink/5 backdrop-blur">{children}</div>;
}
