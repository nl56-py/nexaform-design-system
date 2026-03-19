'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

type BlogCardProps = {
  title: string;
  excerpt: string;
  category: string;
  date: string;
  href?: string;
  className?: string;
};

export function BlogCard({ title, excerpt, category, date, href, className }: BlogCardProps) {
  const body = (
    <motion.article
      whileHover={{ y: -6 }}
      className={`group relative overflow-hidden rounded-2xl border border-border bg-panel p-6 shadow-panel transition-shadow ${className ?? ''}`}
    >
      <div className="flex items-center justify-between gap-4">
        <span className="rounded-full bg-accentPrimary/10 px-3 py-1 text-xs font-semibold text-accentPrimary">
          {category}
        </span>
        <span className="text-xs font-medium text-textSecondary">{date}</span>
      </div>
      <h3 className="mt-4 text-lg font-semibold text-textPrimary">{title}</h3>
      <p className="mt-3 text-sm text-textSecondary">{excerpt}</p>
      <span className="pointer-events-none absolute inset-0 opacity-0 transition-opacity group-hover:opacity-100">
        <div className="absolute inset-0 bg-gradient-to-br from-accentPrimary/5 via-transparent to-accentSecondary/8" />
      </span>
    </motion.article>
  );

  if (href) {
    return (
      <Link href={href} className="group">
        {body}
      </Link>
    );
  }

  return body;
}
