import { useRef, useState } from "react";
import { motion, useMotionValueEvent, useReducedMotion, useScroll } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Sparkles } from "lucide-react";
import SectionWrapper, { FadeUp } from "@/components/SectionWrapper";
import { Button } from "@/components/ui/button";
import { serviceItems } from "@/lib/service-data";
import { cn } from "@/lib/utils";

const serviceCenterLoop = "/animations/service-center-loop.avif";

const clampIndex = (index: number, count: number) => Math.max(0, Math.min(count - 1, index));

const ServiceTreeSection = () => {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const prefersReducedMotion = useReducedMotion();
  const [scrollProgress, setScrollProgress] = useState(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 0.78", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    setScrollProgress(latest);
  });

  const revealProgress = prefersReducedMotion
    ? 0
    : Math.max(0, Math.min(1, (scrollProgress - 0.24) / 0.76));
  const activeIndex = prefersReducedMotion
    ? 0
    : clampIndex(Math.floor(revealProgress * serviceItems.length), serviceItems.length);
  const activeService = serviceItems[activeIndex] ?? serviceItems[0];
  const mapProgress = `${((activeIndex + 1) / serviceItems.length) * 100}%`;

  return (
    <SectionWrapper className="service-tree-section relative overflow-hidden bg-[radial-gradient(circle_at_12%_20%,rgba(34,211,238,0.18),transparent_26%),radial-gradient(circle_at_84%_16%,rgba(139,92,246,0.2),transparent_28%),linear-gradient(180deg,#020617_0%,#07111f_44%,#020617_100%)] text-white">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(110deg,rgba(2,6,23,0.14),rgba(15,23,42,0.22)_36%,rgba(2,6,23,0.14)_72%,rgba(2,6,23,0.32))]" />
      <div className="pointer-events-none absolute inset-0 opacity-30 [background-image:linear-gradient(rgba(148,163,184,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.12)_1px,transparent_1px)] [background-size:4.75rem_4.75rem]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-[linear-gradient(180deg,rgba(125,211,252,0.08),transparent)]" />

      <div ref={sectionRef} className="relative z-10">
        <FadeUp>
          <span className="inline-flex items-center gap-2 rounded-full border border-cyan-300/20 bg-white/[0.06] px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.26em] text-cyan-100 shadow-[0_16px_30px_rgba(8,47,73,0.28)] backdrop-blur-xl">
            <Sparkles size={14} />
            Service Systems Map
          </span>
        </FadeUp>

        <div className="mt-6 flex flex-col gap-6 xl:flex-row xl:items-end xl:justify-between">
          <FadeUp delay={0.08} className="max-w-[46rem]">
            <h2 className="mb-3 font-display text-3xl font-bold tracking-tight text-white md:text-4xl">
              What we build
            </h2>
            <p className="max-w-[68ch] leading-relaxed text-slate-300">
              Our services are designed for businesses that need more than a basic website. We
              create digital systems that improve operations, support growth, and deliver better
              user experiences.
            </p>
          </FadeUp>

          <FadeUp delay={0.14}>
            <Link to="/services">
              <Button
                variant="outline"
                className="gap-2 border-white/15 bg-white/[0.05] text-white hover:bg-white/[0.12] hover:text-white"
              >
                Explore Services <ArrowRight size={16} />
              </Button>
            </Link>
          </FadeUp>
        </div>

        <div className="mt-14 grid gap-6 xl:grid-cols-[minmax(0,1.08fr)_minmax(18rem,0.92fr)] xl:gap-5 2xl:gap-8">
          <div className="space-y-6 xl:sticky xl:top-24 xl:self-start">
            <motion.div
              className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.05] p-5 shadow-[0_38px_100px_rgba(2,8,23,0.52)] backdrop-blur-2xl sm:p-6"
              animate={prefersReducedMotion ? undefined : { y: [0, -8, 0] }}
              transition={{ duration: 7.5, repeat: Infinity, ease: "easeInOut" }}
            >
              <div className="pointer-events-none absolute -left-8 top-8 h-32 w-32 rounded-full bg-cyan-300/18 blur-3xl" />
              <div className="pointer-events-none absolute -right-10 top-12 h-40 w-40 rounded-full bg-violet-400/16 blur-3xl" />
              <div className="pointer-events-none absolute bottom-0 left-1/2 h-36 w-36 -translate-x-1/2 rounded-full bg-sky-400/14 blur-3xl" />
              <div className="pointer-events-none absolute right-[-5rem] top-1/2 hidden h-px w-24 -translate-y-1/2 bg-[linear-gradient(90deg,rgba(34,211,238,0.9),rgba(96,165,250,0.62),rgba(255,255,255,0.06))] shadow-[0_0_18px_rgba(34,211,238,0.22)] xl:block" />

              <div className="relative mx-auto aspect-square w-full max-w-[35rem]">
                <div className="absolute inset-[4%] rounded-full bg-[conic-gradient(from_220deg,rgba(34,211,238,0.14),rgba(59,130,246,0.04),rgba(139,92,246,0.18),rgba(34,211,238,0.14))] blur-2xl" />
                <motion.div
                  className="absolute inset-[2%] rounded-full border border-white/10"
                  animate={prefersReducedMotion ? undefined : { rotate: 360 }}
                  transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                />
                <motion.div
                  className="absolute inset-[9%] rounded-full border border-cyan-200/14 border-dashed"
                  animate={prefersReducedMotion ? undefined : { rotate: -360 }}
                  transition={{ duration: 42, repeat: Infinity, ease: "linear" }}
                />
                <div className="absolute inset-[14%] rounded-full border border-white/10 bg-[radial-gradient(circle_at_30%_30%,rgba(34,211,238,0.14),rgba(15,23,42,0.08)_42%,rgba(2,6,23,0.54)_72%,rgba(2,6,23,0.94)_100%)] shadow-[inset_0_0_80px_rgba(34,211,238,0.06)]" />

                <div className="absolute inset-[19%] overflow-hidden rounded-full border border-white/10 bg-[radial-gradient(circle_at_50%_18%,rgba(255,255,255,0.14),rgba(15,23,42,0.32)_46%,rgba(2,6,23,0.9)_100%)] p-4 shadow-[0_0_0_1px_rgba(255,255,255,0.03),0_50px_120px_rgba(6,182,212,0.16)] sm:p-5">
                  <div className="relative h-full w-full overflow-hidden rounded-full border border-white/12 bg-[radial-gradient(circle_at_50%_18%,rgba(248,250,252,0.96),rgba(224,242,254,0.86)_34%,rgba(186,230,253,0.52)_54%,rgba(15,23,42,0.18)_100%)]">
                    <img
                      src={serviceCenterLoop}
                      alt=""
                      aria-hidden="true"
                      className="h-full w-full object-contain p-[8%] [transform:translateZ(0)]"
                      loading="eager"
                    />
                    <div className="pointer-events-none absolute inset-0 rounded-full bg-[radial-gradient(circle_at_30%_22%,rgba(255,255,255,0.46),transparent_28%),radial-gradient(circle_at_72%_78%,rgba(96,165,250,0.16),transparent_30%)]" />
                  </div>
                </div>

                <div className="pointer-events-none absolute left-[8%] top-[21%] h-3 w-3 rounded-full bg-cyan-300 shadow-[0_0_18px_rgba(34,211,238,0.9)]" />
                <div className="pointer-events-none absolute right-[13%] top-[15%] h-2.5 w-2.5 rounded-full bg-violet-300 shadow-[0_0_16px_rgba(167,139,250,0.9)]" />
                <div className="pointer-events-none absolute bottom-[19%] left-[10%] h-2.5 w-2.5 rounded-full bg-sky-300 shadow-[0_0_16px_rgba(125,211,252,0.9)]" />

                <div className="absolute bottom-[8%] left-1/2 z-20 w-[80%] -translate-x-1/2 rounded-[1.5rem] border border-white/12 bg-slate-950/55 px-4 py-4 shadow-[0_22px_50px_rgba(2,8,23,0.48)] backdrop-blur-xl sm:px-5">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <div className="font-mono text-[10px] uppercase tracking-[0.26em] text-cyan-100/72">
                        Active Service
                      </div>
                      <h3 className="mt-2 font-display text-xl font-semibold tracking-tight text-white sm:text-2xl">
                        {activeService.title}
                      </h3>
                    </div>
                    <div className="rounded-full border border-cyan-300/20 bg-cyan-400/10 px-4 py-2 font-mono text-[11px] uppercase tracking-[0.22em] text-cyan-100">
                      {activeService.eyebrow}
                    </div>
                  </div>
                  <p className="mt-3 text-sm leading-7 text-slate-300">
                    {activeService.description}
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          <motion.aside
            className="relative xl:self-center"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
          >
            <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.05] p-5 shadow-[0_28px_80px_rgba(2,8,23,0.44)] backdrop-blur-2xl sm:p-6">
              <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-[radial-gradient(circle_at_100%_30%,rgba(139,92,246,0.12),transparent_58%)]" />
              <div className="pointer-events-none absolute left-5 top-24 hidden w-px bg-gradient-to-b from-cyan-300/0 via-cyan-300/34 to-violet-300/0 xl:block" style={{ bottom: "1.5rem" }} />

              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="font-mono text-[10px] uppercase tracking-[0.26em] text-cyan-100/72">
                    Service Bar
                  </div>
                  <h3 className="mt-2 font-display text-2xl font-semibold tracking-tight text-white">
                    Connected delivery layers
                  </h3>
                  <p className="mt-2 text-sm leading-7 text-slate-300">
                    Each node connects back to the product core and reveals as the section moves.
                  </p>
                </div>
                <div className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 font-mono text-[11px] uppercase tracking-[0.22em] text-slate-300">
                  {String(activeIndex + 1).padStart(2, "0")} /{" "}
                  {String(serviceItems.length).padStart(2, "0")}
                </div>
              </div>

              <div className="mt-6 grid gap-3">
                {serviceItems.map((service, index) => {
                  const isActive = index === activeIndex;
                  const Icon = service.icon;

                  return (
                    <motion.article
                      key={service.title}
                      className={cn(
                        "group relative overflow-hidden rounded-[1.4rem] border border-white/10 bg-slate-950/36 px-4 py-4 backdrop-blur-xl transition-all sm:px-5",
                        isActive && "border-cyan-300/26 bg-white/[0.09] shadow-[0_22px_60px_rgba(8,47,73,0.3)]",
                      )}
                      initial={{ opacity: 0, x: 18 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: "-90px" }}
                      transition={{ duration: 0.45, delay: index * 0.05, ease: [0.4, 0, 0.2, 1] }}
                    >
                      <div
                        className={cn(
                          "pointer-events-none absolute left-[-4.8rem] top-1/2 hidden h-px w-[4.8rem] -translate-y-1/2 xl:block",
                          isActive
                            ? "bg-gradient-to-r from-cyan-300/0 via-cyan-300/75 to-cyan-100/92"
                            : "bg-gradient-to-r from-white/0 via-slate-400/28 to-white/28",
                        )}
                      />
                      <div
                        className={cn(
                          "pointer-events-none absolute left-[-5.18rem] top-1/2 hidden h-3.5 w-3.5 -translate-y-1/2 rounded-full border xl:block",
                          isActive
                            ? "border-cyan-200/60 bg-cyan-300 shadow-[0_0_18px_rgba(34,211,238,0.92)]"
                            : "border-white/16 bg-slate-700",
                        )}
                      />
                      <div
                        className={cn(
                          "pointer-events-none absolute left-5 top-1/2 hidden h-px w-6 -translate-y-1/2 xl:block",
                          isActive
                            ? "bg-gradient-to-r from-cyan-300/80 to-cyan-100/15"
                            : "bg-gradient-to-r from-white/32 to-white/0",
                        )}
                      />
                      <div
                        className={cn(
                          "pointer-events-none absolute left-[0.84rem] top-1/2 hidden h-3 w-3 -translate-y-1/2 rounded-full border xl:block",
                          isActive
                            ? "border-cyan-200/70 bg-cyan-300 shadow-[0_0_18px_rgba(34,211,238,0.92)]"
                            : "border-white/14 bg-slate-800",
                        )}
                      />

                      <div className="relative flex items-center gap-4 pl-0 xl:pl-10">
                        <div
                          className={cn(
                            "flex h-12 w-12 shrink-0 items-center justify-center rounded-[1rem] border border-white/12 bg-slate-950/58 text-cyan-100 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]",
                            isActive &&
                              "border-cyan-200/30 bg-[linear-gradient(135deg,rgba(34,211,238,0.24),rgba(59,130,246,0.22),rgba(139,92,246,0.28))] text-white",
                          )}
                        >
                          <Icon size={22} />
                        </div>

                        <div className="min-w-0 flex-1">
                          <div className="font-mono text-[10px] uppercase tracking-[0.26em] text-cyan-100/72">
                            {service.eyebrow}
                          </div>
                          <h4 className="mt-2 text-lg font-semibold tracking-tight text-white sm:text-[1.35rem]">
                            {service.title}
                          </h4>
                          <p className="mt-2 text-sm leading-6 text-slate-300">
                            {service.description}
                          </p>
                        </div>

                        <div className="hidden h-20 w-24 shrink-0 overflow-hidden rounded-[1rem] border border-white/10 bg-slate-950/60 sm:block">
                          <img
                            src={service.image}
                            alt={service.imageAlt}
                            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                            loading="lazy"
                          />
                        </div>

                        <div
                          className={cn(
                            "shrink-0 rounded-full border px-4 py-2 font-mono text-[11px] uppercase tracking-[0.22em]",
                            isActive
                              ? "border-cyan-300/20 bg-cyan-400/10 text-cyan-100"
                              : "border-white/10 bg-white/[0.04] text-slate-400",
                          )}
                        >
                          {isActive ? "Active" : String(index + 1).padStart(2, "0")}
                        </div>
                      </div>
                    </motion.article>
                  );
                })}
              </div>
            </div>
          </motion.aside>

          <div className="xl:col-span-2">
            <div className="relative overflow-hidden rounded-[1.7rem] border border-white/10 bg-white/[0.05] p-4 shadow-[0_24px_70px_rgba(2,8,23,0.4)] backdrop-blur-2xl sm:p-5">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <div className="font-mono text-[10px] uppercase tracking-[0.26em] text-cyan-100/72">
                    Preview Rail
                  </div>
                  <p className="mt-2 text-sm text-slate-300">
                    Scroll the section to reveal each system layer and surface its visual preview.
                  </p>
                </div>
                <div className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 font-mono text-[11px] uppercase tracking-[0.22em] text-slate-300">
                  {String(activeIndex + 1).padStart(2, "0")} /{" "}
                  {String(serviceItems.length).padStart(2, "0")}
                </div>
              </div>

              <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-white/[0.05]">
                <div
                  className="h-full rounded-full bg-[linear-gradient(90deg,rgba(34,211,238,0.9),rgba(59,130,246,0.92),rgba(139,92,246,0.9))]"
                  style={{ width: mapProgress }}
                />
              </div>

              <div className="mt-5 flex gap-3 overflow-x-auto pb-2">
                {serviceItems.map((service, index) => {
                  const isActive = index === activeIndex;

                  return (
                    <div
                      key={service.title}
                      className={cn(
                        "group relative h-28 shrink-0 overflow-hidden rounded-[1.15rem] border border-white/10 transition-all duration-500 sm:h-32",
                        isActive
                          ? "w-[13rem] border-cyan-300/24 shadow-[0_20px_45px_rgba(8,47,73,0.34)] sm:w-[15rem]"
                          : "w-[4.9rem] opacity-75 sm:w-[5.8rem]",
                      )}
                    >
                      <img
                        src={service.image}
                        alt={service.imageAlt}
                        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(2,6,23,0.08),rgba(2,6,23,0.86))]" />
                      <div className="absolute left-3 top-3 rounded-full border border-white/12 bg-slate-950/55 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.22em] text-cyan-100/82 backdrop-blur-md">
                        {service.eyebrow}
                      </div>
                      <div
                        className={cn(
                          "absolute inset-x-0 bottom-0 p-3 transition-all duration-500 sm:p-4",
                          isActive ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0",
                        )}
                      >
                        <div className="text-sm font-semibold text-white sm:text-base">
                          {service.title}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
};

export default ServiceTreeSection;
