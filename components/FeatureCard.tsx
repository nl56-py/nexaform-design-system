'use client';

import { motion } from 'framer-motion';

type FeatureCardProps = {
  title: string;
  description: string;
  icon?: React.ReactNode;
  className?: string;
};

export function FeatureCard({ title, description, icon, className }: FeatureCardProps) {
  return (
    <motion.article
      whileHover={{ y: -6 }}
      className={`group relative overflow-hidden rounded-2xl border border-border bg-panel p-6 shadow-panel transition-shadow ${className ?? ''}`}
    >
      <div className="flex items-center gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-accentPrimary/10 text-accentPrimary">
          {icon ?? <span className="text-xl font-bold">*</span>}
        </div>
        <h3 className="text-lg font-semibold text-textPrimary">{title}</h3>
      </div>
      <p className="mt-4 text-sm leading-relaxed text-textSecondary">{description}</p>
    </motion.article>
  );
}
