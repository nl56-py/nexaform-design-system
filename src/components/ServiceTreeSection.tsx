import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Sparkles } from "lucide-react";
import SectionWrapper, { FadeUp } from "@/components/SectionWrapper";
import { Button } from "@/components/ui/button";
import { serviceItems } from "@/lib/service-data";

const automationService = serviceItems.find((service) => service.title === "AI Automation") ?? null;
const treeServices = serviceItems.filter((service) => service.title !== "AI Automation");
const serviceRows = [
  [treeServices[0], treeServices[3]],
  [treeServices[1], treeServices[4]],
  [treeServices[2], treeServices[5]],
];

const ServiceTreeSection = () => {
  return (
    <SectionWrapper className="service-tree-section relative overflow-hidden gradient-section-blue">
      <div className="pointer-events-none absolute inset-0 service-tree-bg" />

      <div className="relative z-10">
        <FadeUp>
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/15 bg-white/70 px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.26em] text-primary shadow-[0_12px_24px_rgba(59,130,246,0.08)]">
            <Sparkles size={14} />
            Service Ecosystem
          </span>
        </FadeUp>

        <div className="mt-5 flex flex-col gap-6 xl:flex-row xl:items-end xl:justify-between">
          <FadeUp delay={0.08} className="max-w-[44rem]">
            <h2 className="mb-3 font-display text-3xl font-bold tracking-tight text-foreground md:text-4xl">
              What we build across your technology stack
            </h2>
            <p className="max-w-[65ch] leading-relaxed text-muted-foreground">
              Our services connect like a delivery tree: strategy at the center, strong systems at
              the roots, and practical execution branching out into products, platforms, AI adoption,
              infrastructure, and long-term support.
            </p>
          </FadeUp>

          <FadeUp delay={0.14}>
            <Link to="/services">
              <Button variant="outline" className="gap-2">
                Explore Services <ArrowRight size={16} />
              </Button>
            </Link>
          </FadeUp>
        </div>

        <div className="service-tree-board relative mt-12 overflow-visible px-0 pb-2 pt-4 sm:pt-6">
          <div className="pointer-events-none absolute inset-0">
            <div className="service-tree-orb service-tree-orb-a" />
            <div className="service-tree-orb service-tree-orb-b" />
            <div className="service-tree-orb service-tree-orb-c" />
          </div>

          <motion.div
            className="service-tree-root relative mx-auto max-w-[32rem] px-2 py-2 text-center text-foreground"
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          >
            <div className="service-tree-root-glow" />
            <div className="relative z-10">
              <div className="font-mono text-[10px] uppercase tracking-[0.28em] text-primary/70">
                Nexaform Core
              </div>
              <h3 className="mt-3 font-display text-2xl font-semibold tracking-tight">
                Connected software delivery
              </h3>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">
                A single engagement can move from discovery to product engineering, AI readiness,
                deployment, and sustained platform support without losing direction.
              </p>
            </div>
          </motion.div>

          <div className="service-tree-grid relative mt-8">
            <div className="service-tree-trunk" />

            {serviceRows.map(([leftService, rightService], rowIndex) => (
              <div key={leftService.title} className="service-tree-row">
                <motion.article
                  className="service-tree-card service-tree-card-left"
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{
                    duration: 0.55,
                    delay: 0.08 + rowIndex * 0.08,
                    ease: [0.4, 0, 0.2, 1],
                  }}
                  whileHover={{ y: -8, scale: 1.01 }}
                >
                  <div className="service-tree-card-media">
                    <img
                      src={leftService.image}
                      alt={leftService.imageAlt}
                      className="service-tree-card-image"
                    />
                    <div className="service-tree-card-overlay" />
                    <div className="service-tree-card-badge">
                      <leftService.icon size={16} />
                      {leftService.eyebrow}
                    </div>
                  </div>

                  <div className="service-tree-card-content">
                    <div className="font-mono text-[10px] uppercase tracking-[0.24em] text-primary/70">
                      {leftService.eyebrow}
                    </div>
                    <h3 className="mt-2 font-display text-xl font-semibold tracking-tight text-foreground">
                      {leftService.title}
                    </h3>
                    <p className="mt-3 text-sm leading-7 text-muted-foreground">
                      {leftService.description}
                    </p>
                  </div>
                </motion.article>

                <div className="service-tree-center" aria-hidden="true">
                  <motion.span
                    className="service-tree-node"
                    animate={{ scale: [1, 1.16, 1], opacity: [0.9, 1, 0.9] }}
                    transition={{
                      duration: 3.4,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: rowIndex * 0.35,
                    }}
                  />
                </div>

                <motion.article
                  className="service-tree-card service-tree-card-right"
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{
                    duration: 0.55,
                    delay: 0.14 + rowIndex * 0.08,
                    ease: [0.4, 0, 0.2, 1],
                  }}
                  whileHover={{ y: -8, scale: 1.01 }}
                >
                  <div className="service-tree-card-media">
                    <img
                      src={rightService.image}
                      alt={rightService.imageAlt}
                      className="service-tree-card-image"
                    />
                    <div className="service-tree-card-overlay" />
                    <div className="service-tree-card-badge">
                      <rightService.icon size={16} />
                      {rightService.eyebrow}
                    </div>
                  </div>

                  <div className="service-tree-card-content">
                    <div className="font-mono text-[10px] uppercase tracking-[0.24em] text-primary/70">
                      {rightService.eyebrow}
                    </div>
                    <h3 className="mt-2 font-display text-xl font-semibold tracking-tight text-foreground">
                      {rightService.title}
                    </h3>
                    <p className="mt-3 text-sm leading-7 text-muted-foreground">
                      {rightService.description}
                    </p>
                  </div>
                </motion.article>
              </div>
            ))}
          </div>

          {automationService && (
            <motion.article
              className="service-tree-feature relative mt-10 overflow-hidden text-white"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.55, ease: [0.4, 0, 0.2, 1] }}
              whileHover={{ y: -6 }}
            >
              <div className="service-tree-feature-glow" />
              <div className="grid grid-cols-1 items-center gap-0 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]">
                <div className="relative z-10 p-6 sm:p-7 lg:p-8">
                  <div className="inline-flex items-center gap-2 rounded-full border border-cyan-200/20 bg-white/8 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.24em] text-cyan-100/85">
                    <automationService.icon size={15} />
                    {automationService.eyebrow}
                  </div>
                  <h3 className="mt-5 font-display text-2xl font-semibold tracking-tight sm:text-[2rem]">
                    {automationService.title}
                  </h3>
                  <p className="mt-4 max-w-[34rem] text-sm leading-7 text-slate-200/80 sm:text-base">
                    {automationService.description}
                  </p>
                  <p className="mt-4 max-w-[36rem] text-sm leading-7 text-slate-300/72">
                    Ideal for repetitive internal tasks, AI-assisted support flows, knowledge access,
                    content operations, and practical automation that saves teams time without adding
                    unnecessary complexity.
                  </p>
                </div>

                <div className="relative min-h-[240px] overflow-hidden lg:min-h-[100%]">
                  <img
                    src={automationService.image}
                    alt={automationService.imageAlt}
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-l from-transparent via-slate-950/10 to-slate-950/65" />
                </div>
              </div>
            </motion.article>
          )}
        </div>
      </div>
    </SectionWrapper>
  );
};

export default ServiceTreeSection;
