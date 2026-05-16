import type { ReactNode } from 'react';

interface BadgeProps {
  children: ReactNode;
  variant?: 'default' | 'cyan' | 'yellow' | 'red' | 'green' | 'orange' | 'completed' | 'in-progress' | 'pending';
  className?: string;
}

const variantStyles: Record<string, string> = {
  default: 'bg-[#334155] text-white',
  cyan: 'bg-[var(--color-cyan)] text-[var(--color-bg)]',
  yellow: 'bg-[var(--color-yellow)] text-black',
  red: 'bg-[var(--color-red)] text-white',
  green: 'bg-[var(--color-green)] text-black',
  orange: 'bg-[var(--color-orange)] text-white',
  completed: 'bg-[var(--color-green)] text-black',
  'in-progress': 'bg-[var(--color-orange)] text-black',
  pending: 'bg-[#334155] text-white',
};

export function Badge({
  children,
  variant = 'default',
  className = '',
}: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center justify-center px-2 py-1 rounded-lg text-xs font-bold ${variantStyles[variant]} ${className}`}
    >
      {children}
    </span>
  );
}