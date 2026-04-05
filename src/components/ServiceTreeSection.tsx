import { useEffect, useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Sparkles } from "lucide-react";
import SectionWrapper, { FadeUp } from "@/components/SectionWrapper";
import { Button } from "@/components/ui/button";
import { serviceItems } from "@/lib/service-data";
import { cn } from "@/lib/utils";

const serviceCenterVideo = "/animations/services-7fps-56/Nexaform_services_ecosystem_202604051719.mp4";

const ServiceTreeSection = () => {
  const prefersReducedMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    const intervalId = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % serviceItems.length);
    }, 2600);

    return () => window.clearInterval(intervalId);
  }, [prefersReducedMotion]);

  const visibleServices = useMemo(() => {
    return [
      serviceItems[activeIndex],
      serviceItems[(activeIndex + 1) % serviceItems.length],
    ];
  }, [activeIndex]);

  return (
    <SectionWrapper className="service-tree-section relative overflow-hidden bg-[linear-gradient(180deg,#f8fcff_0%,#f2f8ff_48%,#fcf8f2_100%)] text-slate-900">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(56,189,248,0.16),transparent_24%),radial-gradient(circle_at_82%_20%,rgba(251,191,36,0.14),transparent_24%),radial-gradient(circle_at_50%_90%,rgba(16,185,129,0.1),transparent_28%)]" />
      <div className="pointer-events-none absolute inset-0 opacity-40 [background-image:linear-gradient(rgba(148,163,184,0.14)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.14)_1px,transparent_1px)] [background-size:4.5rem_4.5rem]" />

      <div className="relative z-10">
        <FadeUp>
          <span className="inline-flex items-center gap-2 rounded-full border border-sky-200 bg-white/75 px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.26em] text-sky-700 shadow-[0_14px_35px_rgba(148,163,184,0.18)] backdrop-blur-xl">
            <Sparkles size={14} />
            Service Systems Map
          </span>
        </FadeUp>

        <div className="mt-6 flex flex-col gap-6 xl:flex-row xl:items-end xl:justify-between">
          <FadeUp delay={0.08} className="max-w-[46rem]">
            <h2 className="mb-3 font-display text-3xl font-bold tracking-tight text-slate-950 md:text-4xl">
              What we build
            </h2>
            <p className="max-w-[68ch] leading-relaxed text-slate-600">
              Our services are designed for businesses that need more than a basic website. We
              create digital systems that improve operations, support growth, and deliver better
              user experiences.
            </p>
          </FadeUp>

          <FadeUp delay={0.14}>
            <Link to="/services">
              <Button
                variant="outline"
                className="gap-2 border-slate-300 bg-white/80 text-slate-800 hover:bg-slate-50 hover:text-slate-950"
              >
                Explore Services <ArrowRight size={16} />
              </Button>
            </Link>
          </FadeUp>
        </div>

        <div className="mt-14 grid gap-8 xl:grid-cols-[minmax(0,1.08fr)_minmax(20rem,0.92fr)] xl:items-center">
          <motion.div
            className="relative overflow-hidden rounded-[2rem] border border-slate-200/80 bg-white/80 p-5 shadow-[0_30px_80px_rgba(148,163,184,0.22)] backdrop-blur-xl sm:p-6"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.55, ease: [0.4, 0, 0.2, 1] }}
          >
            <div className="pointer-events-none absolute inset-x-12 top-0 h-32 bg-[radial-gradient(circle_at_50%_0%,rgba(56,189,248,0.14),transparent_70%)]" />

            <div className="relative mx-auto aspect-square w-full max-w-[42rem]">
              <motion.div
                className="absolute inset-[5%] rounded-full border border-sky-200/80"
                animate={prefersReducedMotion ? undefined : { rotate: 360 }}
                transition={{ duration: 38, repeat: Infinity, ease: "linear" }}
              />
              <motion.div
                className="absolute inset-[14%] rounded-full border border-slate-200 border-dashed"
                animate={prefersReducedMotion ? undefined : { rotate: -360 }}
                transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
              />
              <div className="absolute inset-[20%] rounded-full bg-[radial-gradient(circle_at_50%_45%,rgba(255,255,255,0.92),rgba(224,242,254,0.94)_54%,rgba(186,230,253,0.75)_72%,rgba(125,211,252,0.4)_100%)] shadow-[inset_0_0_0_1px_rgba(148,163,184,0.22),0_24px_90px_rgba(125,211,252,0.28)]" />
              <div className="absolute inset-[24%] overflow-hidden rounded-full border border-white/80 bg-white p-3 shadow-[0_24px_60px_rgba(148,163,184,0.26)] sm:p-4">
                <div className="relative h-full w-full overflow-hidden rounded-full bg-slate-100">
                  <video
                    className="h-full w-full object-cover"
                    src={serviceCenterVideo}
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="auto"
                    aria-label="Nexaform services ecosystem animation"
                  />
                  <div className="pointer-events-none absolute inset-0 rounded-full bg-[radial-gradient(circle_at_35%_24%,rgba(255,255,255,0.26),transparent_24%),linear-gradient(180deg,rgba(255,255,255,0.04),rgba(15,23,42,0.12))]" />
                </div>
              </div>

              <motion.div
                className="absolute inset-0"
                animate={prefersReducedMotion ? undefined : { rotate: 360 }}
                transition={{ duration: 34, repeat: Infinity, ease: "linear" }}
              >
                {serviceItems.map((service, index) => {
                  const angle = (index / serviceItems.length) * Math.PI * 2 - Math.PI / 2;
                  const radius = 42;
                  const x = 50 + Math.cos(angle) * radius;
                  const y = 50 + Math.sin(angle) * radius;
                  const isActive = index === activeIndex;
                  const Icon = service.icon;

                  return (
                    <button
                      key={service.title}
                      type="button"
                      onClick={() => setActiveIndex(index)}
                      className="absolute -translate-x-1/2 -translate-y-1/2"
                      style={{ left: `${x}%`, top: `${y}%` }}
                      aria-label={`Show ${service.title}`}
                    >
                      <motion.div
                        className={cn(
                          "flex h-16 w-16 items-center justify-center rounded-[1.4rem] border bg-white/95 text-slate-700 shadow-[0_16px_34px_rgba(148,163,184,0.22)] transition-all sm:h-[4.5rem] sm:w-[4.5rem]",
                          isActive
                            ? "border-sky-300 text-sky-700 shadow-[0_18px_40px_rgba(14,165,233,0.28)]"
                            : "border-slate-200 hover:border-sky-200 hover:text-sky-700",
                        )}
                        animate={
                          prefersReducedMotion || !isActive
                            ? undefined
                            : { scale: [1, 1.08, 1], y: [0, -4, 0] }
                        }
                        transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
                      >
                        <Icon size={24} />
                      </motion.div>
                    </button>
                  );
                })}
              </motion.div>

              <div className="absolute bottom-[10%] left-1/2 z-20 w-[78%] -translate-x-1/2 rounded-[1.5rem] border border-slate-200/80 bg-white/88 px-4 py-4 shadow-[0_18px_40px_rgba(148,163,184,0.18)] backdrop-blur-xl sm:px-5">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <div className="font-mono text-[10px] uppercase tracking-[0.26em] text-sky-700/80">
                      Active Service
                    </div>
                    <h3 className="mt-2 font-display text-xl font-semibold tracking-tight text-slate-950 sm:text-2xl">
                      {serviceItems[activeIndex].title}
                    </h3>
                  </div>
                  <div className="rounded-full border border-sky-200 bg-sky-50 px-4 py-2 font-mono text-[11px] uppercase tracking-[0.22em] text-sky-700">
                    {serviceItems[activeIndex].eyebrow}
                  </div>
                </div>
                <p className="mt-3 text-sm leading-7 text-slate-600">
                  {serviceItems[activeIndex].description}
                </p>
              </div>
            </div>
          </motion.div>

          <motion.aside
            className="relative"
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.55, ease: [0.4, 0, 0.2, 1] }}
          >
            <div className="relative overflow-hidden rounded-[2rem] border border-slate-200/80 bg-white/82 p-5 shadow-[0_26px_70px_rgba(148,163,184,0.18)] backdrop-blur-xl sm:p-6">
              <div className="pointer-events-none absolute inset-y-0 right-0 w-28 bg-[radial-gradient(circle_at_100%_20%,rgba(56,189,248,0.14),transparent_60%)]" />

              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="font-mono text-[10px] uppercase tracking-[0.26em] text-sky-700/80">
                    Service Bar
                  </div>
                  <h3 className="mt-2 font-display text-2xl font-semibold tracking-tight text-slate-950">
                    Connected delivery layers
                  </h3>
                  <p className="mt-2 text-sm leading-7 text-slate-600">
                    Two services stay in focus at a time while the ecosystem loops through the full
                    delivery stack.
                  </p>
                </div>
                <div className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 font-mono text-[11px] uppercase tracking-[0.22em] text-slate-500">
                  {String(activeIndex + 1).padStart(2, "0")} /{" "}
                  {String(serviceItems.length).padStart(2, "0")}
                </div>
              </div>

              <div className="mt-6 space-y-4">
                {visibleServices.map((service, visibleIndex) => {
                  const actualIndex = (activeIndex + visibleIndex) % serviceItems.length;
                  const isPrimary = visibleIndex === 0;
                  const Icon = service.icon;

                  return (
                    <motion.article
                      key={`${service.title}-${actualIndex}`}
                      className={cn(
                        "relative overflow-hidden rounded-[1.5rem] border px-4 py-4 shadow-[0_14px_34px_rgba(148,163,184,0.12)] transition-all sm:px-5",
                        isPrimary
                          ? "border-sky-200 bg-[linear-gradient(135deg,rgba(240,249,255,0.98),rgba(255,255,255,0.94))]"
                          : "border-slate-200 bg-[linear-gradient(135deg,rgba(255,255,255,0.98),rgba(248,250,252,0.96))]",
                      )}
                      initial={{ opacity: 0, y: 18 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
                    >
                      <div className="absolute inset-y-0 right-0 w-24 bg-[radial-gradient(circle_at_100%_50%,rgba(125,211,252,0.16),transparent_60%)]" />
                      <div className="relative flex items-center gap-4">
                        <div
                          className={cn(
                            "flex h-12 w-12 shrink-0 items-center justify-center rounded-[1rem] border text-slate-700",
                            isPrimary
                              ? "border-sky-200 bg-sky-50 text-sky-700"
                              : "border-slate-200 bg-slate-50",
                          )}
                        >
                          <Icon size={22} />
                        </div>

                        <div className="min-w-0 flex-1">
                          <div className="font-mono text-[10px] uppercase tracking-[0.26em] text-sky-700/75">
                            {service.eyebrow}
                          </div>
                          <h4 className="mt-2 text-lg font-semibold tracking-tight text-slate-950 sm:text-[1.35rem]">
                            {service.title}
                          </h4>
                          <p className="mt-2 text-sm leading-6 text-slate-600">
                            {service.description}
                          </p>
                        </div>

                        <div className="hidden h-20 w-24 shrink-0 overflow-hidden rounded-[1rem] border border-slate-200 bg-slate-100 sm:block">
                          <img
                            src={service.image}
                            alt={service.imageAlt}
                            className="h-full w-full object-cover"
                            loading="lazy"
                          />
                        </div>

                        <button
                          type="button"
                          onClick={() => setActiveIndex(actualIndex)}
                          className={cn(
                            "shrink-0 rounded-full border px-4 py-2 font-mono text-[11px] uppercase tracking-[0.22em]",
                            isPrimary
                              ? "border-sky-200 bg-sky-100 text-sky-700"
                              : "border-slate-200 bg-slate-50 text-slate-500 hover:border-sky-200 hover:text-sky-700",
                          )}
                        >
                          {isPrimary ? "Active" : "Queue"}
                        </button>
                      </div>
                    </motion.article>
                  );
                })}
              </div>
            </div>
          </motion.aside>
        </div>
      </div>
    </SectionWrapper>
  );
};

export default ServiceTreeSection;
