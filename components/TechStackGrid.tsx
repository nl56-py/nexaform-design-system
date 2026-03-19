'use client';

import { motion } from 'framer-motion';
import { Bot, Code2, DatabaseZap, LayoutDashboard, Palette, Workflow } from 'lucide-react';

const items = [
  { icon: <Code2 className="h-6 w-6" />, label: 'Web Apps' },
  { icon: <LayoutDashboard className="h-6 w-6" />, label: 'Dashboards' },
  { icon: <Workflow className="h-6 w-6" />, label: 'Automation Flows' },
  { icon: <Bot className="h-6 w-6" />, label: 'AI Assistants' },
  { icon: <DatabaseZap className="h-6 w-6" />, label: 'Backend Systems' },
  { icon: <Palette className="h-6 w-6" />, label: 'UI and UX' },
];

export function TechStackGrid({ className }: { className?: string }) {
  return (
    <div className={`grid gap-4 sm:grid-cols-3 ${className ?? ''}`}>
      {items.map((item, index) => (
        <motion.div
          key={item.label}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ delay: index * 0.06 }}
          className="flex items-center gap-4 rounded-2xl border border-border bg-panel p-5 shadow-panel"
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-accentPrimary/10 text-accentPrimary">
            {item.icon}
          </div>
          <p className="text-sm font-medium text-textPrimary">{item.label}</p>
        </motion.div>
      ))}
    </div>
  );
}
