'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

type CaseStudyCardProps = {
  title: string;
  description: string;
  outcome: string;
  href?: string;
  className?: string;
};

export function CaseStudyCard({ title, description, outcome, href, className }: CaseStudyCardProps) {
  const card = (
    <motion.article
      whileHover={{ y: -6 }}
      className={`group relative overflow-hidden rounded-2xl border border-border bg-panel p-6 shadow-panel transition-shadow ${className ?? ''}`}
    >
      <h3 className="text-lg font-semibold text-textPrimary">{title}</h3>
      <p className="mt-3 text-sm leading-relaxed text-textSecondary">{description}</p>
      <p className="mt-4 text-sm font-medium text-textPrimary">
        <span className="text-textSecondary">Outcome:</span> {outcome}
      </p>
      <span className="pointer-events-none absolute inset-0 opacity-0 transition-opacity group-hover:opacity-100">
        <div className="absolute inset-0 bg-gradient-to-br from-accentPrimary/5 via-transparent to-accentSecondary/8" />
      </span>
    </motion.article>
  );

  if (href) {
    return (
      <Link href={href} className="group">
        {card}
      </Link>
    );
  }

  return card;
}
