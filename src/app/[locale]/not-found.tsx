import Link from 'next/link';
import { Container, buttonClass } from '@/components/ui/primitives';

export default function NotFound() {
  return (
    <Container className="py-32 text-center">
      <p className="font-mono text-xs uppercase tracking-[0.14em] text-ink-500">404</p>
      <h1 className="mt-6 text-display-lg font-semibold">
        Page introuvable <em className="font-display font-semibold">· not found</em>
      </h1>
      <Link href="/fr-be" className={`${buttonClass('primary', 'lg')} mt-10`}>
        Delegis
      </Link>
    </Container>
  );
}
