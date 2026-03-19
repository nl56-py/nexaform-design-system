'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

type SecondaryButtonProps = {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
};

export function SecondaryButton({ children, href, onClick, className, type = 'button' }: SecondaryButtonProps) {
  const sharedClasses =
    'inline-flex items-center justify-center gap-2 rounded-full border border-border bg-white px-6 py-3 text-sm font-semibold text-textPrimary transition-transform hover:-translate-y-0.5 hover:border-accentPrimary/30 hover:text-accentPrimary focus:outline-none focus:ring-2 focus:ring-accentPrimary/20';

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
