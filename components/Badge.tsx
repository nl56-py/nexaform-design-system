'use client';

import { motion } from 'framer-motion';

type BadgeProps = {
  children: React.ReactNode;
  className?: string;
};

export function Badge({ children, className }: BadgeProps) {
  return (
    <motion.span
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      className={`inline-flex items-center rounded-full border border-accentSecondary/15 bg-white px-3 py-1 text-xs font-medium text-textSecondary shadow-soft backdrop-blur ${className ?? ''}`}
    >
      {children}
    </motion.span>
  );
}
