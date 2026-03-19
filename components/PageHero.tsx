'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

type PageHeroProps = {
  title: string;
  subtitle?: string;
  paragraph?: string;
  className?: string;
  imageSrc?: string;
  imageAlt?: string;
};

export function PageHero({ title, subtitle, paragraph, className, imageSrc, imageAlt }: PageHeroProps) {
  return (
    <section className={`relative overflow-hidden border-b border-border ${className ?? ''}`}>
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_15%_20%,rgba(92,89,228,0.08),transparent_24%),radial-gradient(circle_at_85%_15%,rgba(56,108,244,0.08),transparent_28%)]" />
      <div className="container py-24">
        <div className={`grid gap-10 ${imageSrc ? 'lg:grid-cols-[1fr_0.9fr] lg:items-center' : ''}`}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            className="max-w-4xl"
          >
            {subtitle && (
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-accentPrimary">{subtitle}</p>
            )}
            <h1 className="mt-4 font-display text-4xl font-semibold leading-tight tracking-tight text-textPrimary sm:text-6xl">
              {title}
            </h1>
            {paragraph && <p className="mt-6 max-w-3xl text-base text-textSecondary sm:text-lg">{paragraph}</p>}
          </motion.div>

          {imageSrc && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              className="rounded-[2rem] border border-border bg-panel p-5 shadow-panel"
            >
              <Image
                src={imageSrc}
                alt={imageAlt ?? title}
                width={760}
                height={560}
                className="w-full rounded-[1.5rem] border border-border bg-backgroundSecondary"
              />
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
