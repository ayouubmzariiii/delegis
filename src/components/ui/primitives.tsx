import Link from 'next/link';
import type { ComponentProps, ReactNode } from 'react';
import { Icon } from './Icon';

/** Join class names, skipping falsy values. */
export const cx = (...c: (string | false | null | undefined)[]) => c.filter(Boolean).join(' ');

export function Container({ className, children }: { className?: string; children: ReactNode }) {
  return <div className={cx('mx-auto w-full max-w-page px-5 sm:px-8', className)}>{children}</div>;
}

type Variant = 'primary' | 'secondary' | 'ghost' | 'inverse';
const variants: Record<Variant, string> = {
  primary: 'bg-go-600 text-white shadow-[0_1px_0_rgba(255,255,255,0.25)_inset,0_8px_20px_-8px_rgba(47,91,255,0.7)] hover:bg-go-700',
  secondary: 'border border-line-strong bg-white text-ink hover:border-ink/40 hover:bg-paper',
  ghost: 'text-ink hover:bg-ink/5',
  /** For dark backgrounds. */
  inverse: 'bg-white text-ink hover:bg-go-50',
};

export function buttonClass(variant: Variant = 'primary', size: 'md' | 'lg' = 'md') {
  return cx(
    'inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition-colors',
    size === 'lg' ? 'h-12 px-6 text-[15px]' : 'h-10 px-4 text-sm',
    variants[variant],
  );
}

export function ButtonLink({
  variant = 'primary',
  size = 'md',
  arrow,
  className,
  children,
  ...props
}: ComponentProps<typeof Link> & { variant?: Variant; size?: 'md' | 'lg'; arrow?: boolean }) {
  return (
    <Link className={cx(buttonClass(variant, size), 'group', className)} {...props}>
      {children}
      {arrow && <Icon name="arrow" className="h-4 w-4 transition-transform group-hover:translate-x-0.5 rtl:rotate-180 rtl:group-hover:-translate-x-0.5" />}
    </Link>
  );
}

/** Section label, e.g. "01 · Services". */
export function Eyebrow({ index, children, tone = 'dark' }: { index?: string; children: ReactNode; tone?: 'dark' | 'light' }) {
  return (
    <p className={cx('inline-flex items-center gap-2 text-sm font-semibold', tone === 'dark' ? 'text-go-700' : 'text-mark')}>
      {index && (
        <span className={cx('rounded-md px-1.5 py-0.5 font-mono text-[11px]', tone === 'dark' ? 'bg-go-50 text-go-700' : 'bg-white/10 text-white')}>{index}</span>
      )}
      <span>{children}</span>
    </p>
  );
}

/** Section heading block: eyebrow, display title (optional accent in brand blue), lead. */
export function Heading({
  index,
  label,
  title,
  accent,
  lead,
  id,
  tone = 'dark',
  as: Tag = 'h2',
  size = 'lg',
  className,
}: {
  index?: string;
  label?: string;
  title: string;
  accent?: string;
  lead?: string;
  id?: string;
  tone?: 'dark' | 'light';
  as?: 'h1' | 'h2';
  /** 'md' for headings placed in a narrow side column. */
  size?: 'lg' | 'md';
  className?: string;
}) {
  return (
    <div className={cx('max-w-3xl', className)}>
      {label && <Eyebrow index={index} tone={tone}>{label}</Eyebrow>}
      <Tag
        id={id}
        className={cx(
          'mt-4 font-display font-semibold',
          Tag === 'h1' ? 'text-display-xl' : size === 'md' ? 'text-display-md' : 'text-display-lg',
          tone === 'light' ? 'text-white' : 'text-ink',
        )}
      >
        {title}
        {accent && <span className={tone === 'light' ? 'text-mark' : 'text-go-600'}> {accent}</span>}
      </Tag>
      {lead && <p className={cx('mt-5 max-w-2xl text-lg leading-relaxed', tone === 'dark' ? 'text-ink-600' : 'text-white/75')}>{lead}</p>}
    </div>
  );
}

export function Section({ id, className, children, labelledBy }: { id?: string; className?: string; children: ReactNode; labelledBy?: string }) {
  return (
    <section id={id} aria-labelledby={labelledBy} className={cx('py-20 sm:py-28', className)}>
      <Container>{children}</Container>
    </section>
  );
}

export function Pill({ children, tone = 'go' }: { children: ReactNode; tone?: 'go' | 'mark' | 'ink' }) {
  const t = { go: 'bg-go-50 text-go-800 ring-go-100', mark: 'bg-white text-ink ring-line', ink: 'bg-ink text-white ring-ink' }[tone];
  return <span className={cx('inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ring-1 ring-inset', t)}>{children}</span>;
}
