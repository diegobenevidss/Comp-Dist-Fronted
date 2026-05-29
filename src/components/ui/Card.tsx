import type { PropsWithChildren } from 'react';

type CardProps = PropsWithChildren<{
  className?: string;
}>;

export function Card({ children, className = '' }: CardProps) {
  return <section className={['group rounded-3xl border border-stone bg-panel p-5 shadow-soft transition-all hover:-translate-y-1 hover:shadow-xl', className].join(' ')}>{children}</section>;
}
