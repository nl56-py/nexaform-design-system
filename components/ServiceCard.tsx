'use client';

import { motion } from 'framer-motion';

type ServiceCardProps = {
  title: string;
  description: string;
  icon?: React.ReactNode;
  className?: string;
};

export function ServiceCard({ title, description, icon, className }: ServiceCardProps) {
  return (
    <motion.article
      whileHover={{ y: -6 }}
      className={`group relative overflow-hidden rounded-2xl border border-border bg-panel p-6 shadow-panel transition-shadow ${className ?? ''}`}
    >
      <div className="flex items-center gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-accentPrimary via-accentSecondary to-accentHighlight text-white shadow-glow">
          {icon ?? <span className="text-xl font-bold">+</span>}
        </div>
        <h3 className="text-lg font-semibold text-textPrimary">{title}</h3>
      </div>
      <p className="mt-4 text-sm leading-relaxed text-textSecondary">{description}</p>
      <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity group-hover:opacity-100">
        <div className="absolute inset-0 bg-gradient-to-br from-accentPrimary/5 via-transparent to-accentSecondary/8" />
      </div>
    </motion.article>
  );
}
