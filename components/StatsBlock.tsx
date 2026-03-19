'use client';

import { motion } from 'framer-motion';

type StatItem = {
  value: string;
  label: string;
};

const stats: StatItem[] = [
  { value: '01', label: 'Software systems shaped around business needs' },
  { value: '02', label: 'AI automation where it creates measurable value' },
  { value: '03', label: 'Product design, engineering, and deployment in one flow' },
  { value: '04', label: 'Support and iteration after launch' },
];

export function StatsBlock({ className }: { className?: string }) {
  return (
    <div className={`grid gap-6 rounded-2xl border border-border bg-panel p-8 shadow-panel sm:grid-cols-2 ${className ?? ''}`}>
      {stats.map((stat, index) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ delay: index * 0.06 }}
          className="flex flex-col rounded-2xl border border-border bg-backgroundSecondary p-6"
        >
          <span className="font-display text-4xl font-semibold text-textPrimary">{stat.value}</span>
          <span className="mt-3 text-sm text-textSecondary">{stat.label}</span>
        </motion.div>
      ))}
    </div>
  );
}
