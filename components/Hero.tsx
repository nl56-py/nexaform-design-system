'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Badge } from './Badge';
import { PrimaryButton } from './PrimaryButton';
import { SecondaryButton } from './SecondaryButton';

const metrics = [
  { value: 'Software', label: 'Custom platforms and internal tools' },
  { value: 'Automation', label: 'AI workflows and business systems' },
  { value: 'Support', label: 'Optimization and long-term iteration' },
];

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-32 pb-24">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_10%_10%,rgba(92,89,228,0.08),transparent_28%),radial-gradient(circle_at_90%_15%,rgba(56,108,244,0.1),transparent_30%),linear-gradient(180deg,rgba(255,255,255,0.4),transparent)]" />
      <div className="container grid gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <Badge>custom software | AI automation | digital products</Badge>
            <h1 className="mt-6 font-display text-5xl font-bold leading-[1.02] tracking-tight text-textPrimary sm:text-6xl">
              Software, automation, and product systems built for growth.
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-textSecondary">
              Nexaform helps companies launch web platforms, build internal systems, automate workflows, and
              create digital products that support real business momentum.
            </p>
            <p className="mt-4 max-w-2xl text-sm text-textSecondary">
              We combine consulting, engineering, design, and iteration so modern businesses can move from
              scattered work to dependable delivery systems.
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <PrimaryButton href="/contact">Book a Consultation</PrimaryButton>
              <SecondaryButton href="/services">Explore Services</SecondaryButton>
            </div>
          </motion.div>

          <div className="mt-12 grid gap-4 sm:grid-cols-3">
            {metrics.map((metric, index) => (
              <motion.div
                key={metric.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ delay: index * 0.08 }}
                className="rounded-2xl border border-border bg-panel p-5 shadow-panel"
              >
                <p className="font-display text-2xl font-bold text-textPrimary">{metric.value}</p>
                <p className="mt-2 text-sm text-textSecondary">{metric.label}</p>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.7 }}
          className="relative"
        >
          <div className="absolute -left-8 top-16 h-32 w-32 rounded-full bg-accentPrimary/10 blur-3xl" />
          <div className="absolute -right-8 bottom-10 h-40 w-40 rounded-full bg-accentSecondary/10 blur-3xl" />

          <div className="relative overflow-hidden rounded-[2rem] border border-border bg-panel p-6 shadow-panel">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-textSecondary">
                  delivery overview
                </p>
                <p className="mt-2 font-display text-2xl font-bold text-textPrimary">
                  Software and automation with clear operating paths
                </p>
              </div>
              <div className="rounded-full border border-accentPrimary/15 bg-accentPrimary/8 px-3 py-1 text-xs font-semibold text-accentPrimary">
                Live systems
              </div>
            </div>

            <Image
              src="/home-systems.svg"
              alt="Illustration of software delivery, automation systems, and product services"
              width={760}
              height={620}
              className="w-full rounded-[1.5rem] border border-border bg-backgroundSecondary"
              priority
            />

            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-border bg-backgroundSecondary p-4">
                <p className="text-sm font-semibold text-textPrimary">Build layer</p>
                <p className="mt-2 text-sm text-textSecondary">
                  Web applications, internal software, portals, and scalable business systems.
                </p>
              </div>
              <div className="rounded-2xl border border-border bg-backgroundSecondary p-4">
                <p className="text-sm font-semibold text-textPrimary">Automation layer</p>
                <p className="mt-2 text-sm text-textSecondary">
                  AI consulting, integrations, workflow routing, and process optimization where it makes sense.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
