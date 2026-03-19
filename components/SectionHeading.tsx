'use client';

import { motion } from 'framer-motion';

type SectionHeadingProps = {
  title: string;
  subtitle?: string;
  intro?: string;
  className?: string;
};

export function SectionHeading({ title, subtitle, intro, className }: SectionHeadingProps) {
  return (
    <div className={className}>
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
      >
        {subtitle && (
          <p className="text-sm font-medium uppercase tracking-wide text-accentSecondary">{subtitle}</p>
        )}
        <h2 className="mt-2 text-3xl font-semibold leading-tight tracking-tight text-textPrimary sm:text-4xl">
          {title}
        </h2>
        {intro && <p className="mt-4 max-w-2xl text-base text-textSecondary">{intro}</p>}
      </motion.div>
    </div>
  );
}
