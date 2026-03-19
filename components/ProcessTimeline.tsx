'use client';

import { motion } from 'framer-motion';

const steps = [
  {
    title: 'Discover',
    description: 'We learn about your goals, users, workflows, and business challenges.',
  },
  {
    title: 'Design',
    description: 'We shape the structure, user experience, and product direction before development begins.',
  },
  {
    title: 'Develop',
    description: 'We build scalable, maintainable, and performance-focused software using modern tools.',
  },
  {
    title: 'Launch and Improve',
    description: 'We deploy, support, refine, and help your product continue to grow after launch.',
  },
];

export function ProcessTimeline({ className }: { className?: string }) {
  return (
    <div className={`relative overflow-hidden ${className ?? ''}`}>
      <div className="absolute left-1/2 top-10 h-[calc(100%-2.5rem)] w-px -translate-x-1/2 bg-border" />
      <div className="grid gap-10">
        {steps.map((step, index) => {
          const isLeft = index % 2 === 0;
          return (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: index * 0.08 }}
              className={`relative grid gap-4 md:grid-cols-2 md:items-start ${
                isLeft ? 'md:grid-flow-col-dense' : ''
              }`}
            >
              <div className={`md:col-span-1 ${isLeft ? 'md:col-start-1' : 'md:col-start-2'} md:pr-6`}>
                <div className="flex items-center gap-4">
                  <div className="relative flex h-10 w-10 items-center justify-center rounded-full border border-border bg-panel text-sm font-semibold text-textPrimary">
                    {index + 1}
                    <span className="absolute inset-0 rounded-full bg-gradient-to-br from-accentPrimary to-accentSecondary opacity-10" />
                  </div>
                  <h3 className="text-xl font-semibold text-textPrimary">{step.title}</h3>
                </div>
                <p className="mt-3 text-sm text-textSecondary">{step.description}</p>
              </div>
              <div className="md:col-span-1 md:flex md:justify-center">
                <div className="relative h-full w-full max-w-md rounded-2xl border border-border bg-panel p-6 shadow-panel">
                  <div className="h-2 w-2 rounded-full bg-accentPrimary" />
                  <p className="mt-4 text-sm text-textSecondary">
                    {index === 0
                      ? 'Every project starts with listening.'
                      : index === steps.length - 1
                      ? 'We stay involved as your product grows.'
                      : 'We share progress early and often.'}
                  </p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
