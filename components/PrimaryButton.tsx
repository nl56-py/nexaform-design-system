'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

type PrimaryButtonProps = {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
};

export function PrimaryButton({ children, href, onClick, className, type = 'button' }: PrimaryButtonProps) {
  const sharedClasses =
    'inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-accentPrimary via-accentSecondary to-accentHighlight px-6 py-3 text-sm font-semibold text-white shadow-glow transition-transform focus:outline-none focus:ring-2 focus:ring-accentPrimary/40 hover:-translate-y-0.5 hover:shadow-lg';

  const content = (
    <motion.span
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={sharedClasses + (className ? ` ${className}` : '')}
    >
      {children}
    </motion.span>
  );

  if (href) {
    return (
      <Link href={href} className="inline-block">
        {content}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} className={sharedClasses + (className ? ` ${className}` : '')}>
      {children}
    </button>
  );
}
