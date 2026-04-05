import { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
} from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

import SectionWrapper, { FadeUp } from "@/components/SectionWrapper";
import { Button } from "@/components/ui/button";
import { serviceItems } from "@/lib/service-data";
import { cn } from "@/lib/utils";

const serviceCenterVideo =
  "/animations/services-7fps-56/Nexaform_services_ecosystem_202604051719.mp4";
const orbitRadius = 43;
const orbitDuration = 38;

const clampIndex = (index: number, count: number) => Math.max(0, Math.min(count - 1, index));

const ServiceTreeSection = () => {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const prefersReducedMotion = useReducedMotion();
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isDesktop, setIsDesktop] = useState(false);
  const [mobileIndex, setMobileIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    setScrollProgress(latest);
  });

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 1024px)");
    const handleChange = () => setIsDesktop(mediaQuery.matches);

    handleChange();
    mediaQuery.addEventListener("change", handleChange);

    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  useEffect(() => {
    if (prefersReducedMotion || isDesktop) {
      return;
    }

    const intervalId = window.setInterval(() => {
      setMobileIndex((current) => (current + 1) % serviceItems.length);
    }, 2800);

    return () => window.clearInterval(intervalId);
  }, [isDesktop, prefersReducedMotion]);

  const activeIndex =
    isDesktop && !prefersReducedMotion
      ? clampIndex(Math.floor(scrollProgress * serviceItems.length), serviceItems.length)
      : mobileIndex;

  const activeService = serviceItems[activeIndex] ?? serviceItems[0];
  const progressWidth = `${((activeIndex + 1) / serviceItems.length) * 100}%`;

  const scrollToService = (index: number) => {
    if (!sectionRef.current || !isDesktop) {
      setMobileIndex(index);
      return;
    }

    const sectionTop = window.scrollY + sectionRef.current.getBoundingClientRect().top;
    const scrollableHeight = Math.max(sectionRef.current.offsetHeight - window.innerHeight, 0);
    const fraction = serviceItems.length === 1 ? 0 : index / (serviceItems.length - 1);

    window.scrollTo({
      top: sectionTop + scrollableHeight * fraction,
      behavior: prefersReducedMotion ? "auto" : "smooth",
    });
  };

  return (
    <SectionWrapper className="service-tree-section relative overflow-hidden bg-[linear-gradient(180deg,#f8fcff_0%,#f1f8ff_46%,#fdfaf3_100%)] text-slate-900">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_16%,rgba(56,189,248,0.14),transparent_24%),radial-gradient(circle_at_84%_16%,rgba(251,191,36,0.12),transparent_24%),radial-gradient(circle_at_50%_86%,rgba(16,185,129,0.1),transparent_28%)]" />
      <div className="pointer-events-none absolute inset-0 opacity-40 [background-image:linear-gradient(rgba(148,163,184,0.14)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.14)_1px,transparent_1px)] [background-size:4.5rem_4.5rem]" />

      <div className="relative z-10">
        <FadeUp>
          <span className="inline-flex items-center gap-2 rounded-full border border-sky-200 bg-white/80 px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.26em] text-sky-700 shadow-[0_14px_35px_rgba(148,163,184,0.16)] backdrop-blur-xl">
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

        <div
          ref={sectionRef}
          className="relative mt-14"
          style={isDesktop && !prefersReducedMotion ? { height: `${serviceItems.length * 65}vh` } : undefined}
        >
          <div
            className={cn(
              "grid gap-8 lg:grid-cols-[minmax(0,1.02fr)_minmax(20rem,0.98fr)] lg:items-center",
              isDesktop && !prefersReducedMotion
                ? "lg:sticky lg:top-24 lg:h-[calc(100vh-8rem)]"
                : "min-h-[42rem]",
            )}
          >
            <motion.div
              className="relative overflow-hidden rounded-[2.2rem] border border-slate-200/80 bg-white/82 p-5 shadow-[0_30px_80px_rgba(148,163,184,0.18)] backdrop-blur-xl sm:p-6"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.55, ease: [0.4, 0, 0.2, 1] }}
            >
              <div className="pointer-events-none absolute inset-x-12 top-0 h-28 bg-[radial-gradient(circle_at_50%_0%,rgba(56,189,248,0.16),transparent_72%)]" />

              <div className="relative mx-auto aspect-square w-full max-w-[41rem]">
                <div className="absolute inset-[5%] rounded-full border border-sky-200/80" />
                <motion.div
                  className="absolute inset-[12%] rounded-full border border-slate-200/90"
                  animate={prefersReducedMotion ? undefined : { rotate: 360 }}
                  transition={{ duration: 46, repeat: Infinity, ease: "linear" }}
                />
                <motion.div
                  className="absolute inset-[18%] rounded-full border border-slate-200 border-dashed"
                  animate={prefersReducedMotion ? undefined : { rotate: -360 }}
                  transition={{ duration: 66, repeat: Infinity, ease: "linear" }}
                />
                <div className="absolute inset-[22%] rounded-full bg-[radial-gradient(circle_at_50%_46%,rgba(255,255,255,0.95),rgba(224,242,254,0.94)_56%,rgba(186,230,253,0.74)_76%,rgba(125,211,252,0.38)_100%)] shadow-[0_24px_90px_rgba(125,211,252,0.26)]" />
                <div className="absolute inset-[26%] overflow-hidden rounded-full border border-white/85 bg-white p-[3.5%] shadow-[0_24px_70px_rgba(148,163,184,0.18)]">
                  <div className="relative h-full w-full overflow-hidden rounded-full border-[12px] border-white bg-slate-100 shadow-[inset_0_0_0_1px_rgba(148,163,184,0.14)]">
                    <video
                      className="h-full w-full rounded-full object-cover"
                      src={serviceCenterVideo}
                      autoPlay
                      muted
                      loop
                      playsInline
                      preload="auto"
                      aria-label="Nexaform services ecosystem animation"
                    />
                    <div className="pointer-events-none absolute inset-0 rounded-full bg-[radial-gradient(circle_at_34%_24%,rgba(255,255,255,0.26),transparent_24%),linear-gradient(180deg,rgba(255,255,255,0.04),rgba(15,23,42,0.1))]" />
                  </div>
                </div>

                <motion.div
                  className="absolute inset-0"
                  animate={prefersReducedMotion ? undefined : { rotate: 360 }}
                  transition={{ duration: orbitDuration, repeat: Infinity, ease: "linear" }}
                >
                  {serviceItems.map((service, index) => {
                    const angle = (index / serviceItems.length) * Math.PI * 2 - Math.PI / 2;
                    const x = 50 + Math.cos(angle) * orbitRadius;
                    const y = 50 + Math.sin(angle) * orbitRadius;
                    const isActive = index === activeIndex;
                    const Icon = service.icon;

                    return (
                      <button
                        key={service.title}
                        type="button"
                        onClick={() => scrollToService(index)}
                        className="absolute -translate-x-1/2 -translate-y-1/2"
                        style={{ left: `${x}%`, top: `${y}%` }}
                        aria-label={`Show ${service.title}`}
                        aria-current={isActive ? "true" : undefined}
                      >
                        <motion.div
                          className={cn(
                            "flex h-[4.7rem] w-[4.7rem] items-center justify-center rounded-[1.4rem] border bg-white/94 text-slate-700 shadow-[0_16px_34px_rgba(148,163,184,0.16)] backdrop-blur-xl transition-all sm:h-[5.25rem] sm:w-[5.25rem]",
                            isActive
                              ? "border-sky-300 text-sky-700 shadow-[0_20px_40px_rgba(14,165,233,0.22)]"
                              : "border-white/85 hover:border-sky-200 hover:text-sky-700",
                          )}
                          animate={
                            prefersReducedMotion
                              ? undefined
                              : {
                                  rotate: -360,
                                  scale: isActive ? [1, 1.08, 1] : 1,
                                }
                          }
                          transition={{
                            rotate: { duration: orbitDuration, repeat: Infinity, ease: "linear" },
                            scale: { duration: 2.1, repeat: Infinity, ease: "easeInOut" },
                          }}
                        >
                          <Icon size={24} />
                        </motion.div>
                      </button>
                    );
                  })}
                </motion.div>
              </div>

              <div className="mt-8 flex flex-wrap items-center justify-center gap-3 text-center lg:justify-start lg:text-left">
                <div className="rounded-full border border-sky-200 bg-sky-50 px-4 py-2 font-mono text-[11px] uppercase tracking-[0.24em] text-sky-700">
                  Active Service
                </div>
                <div className="rounded-full border border-white/90 bg-white/90 px-5 py-2.5 text-sm font-semibold text-slate-700 shadow-[0_14px_32px_rgba(148,163,184,0.14)] backdrop-blur-xl">
                  {activeService.title}
                </div>
              </div>
            </motion.div>

            <div className="mx-auto flex w-full max-w-[40rem] items-center">
              <div className="w-full">
                <div className="mb-5 flex items-center justify-between gap-4">
                  <div>
                    <div className="font-mono text-[10px] uppercase tracking-[0.26em] text-sky-700/80">
                      Active Service Bar
                    </div>
                    <h3 className="mt-2 font-display text-2xl font-semibold tracking-tight text-slate-950">
                      Scroll through the service stack
                    </h3>
                  </div>
                  <div className="rounded-full border border-slate-200 bg-white/90 px-4 py-2 font-mono text-[11px] uppercase tracking-[0.22em] text-slate-500">
                    {String(activeIndex + 1).padStart(2, "0")} /{" "}
                    {String(serviceItems.length).padStart(2, "0")}
                  </div>
                </div>

                <div className="mb-5 h-1.5 overflow-hidden rounded-full bg-slate-200/80">
                  <div
                    className="h-full rounded-full bg-[linear-gradient(90deg,#0ea5e9,#38bdf8,#60a5fa)]"
                    style={{ width: progressWidth }}
                  />
                </div>

                <AnimatePresence mode="wait">
                  <motion.article
                    key={activeService.title}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -24 }}
                    transition={{ duration: 0.32, ease: [0.4, 0, 0.2, 1] }}
                    className="relative overflow-hidden rounded-[2rem] border border-slate-200/85 bg-white/88 p-5 shadow-[0_26px_70px_rgba(148,163,184,0.16)] backdrop-blur-xl sm:p-6"
                  >
                    <div className="pointer-events-none absolute inset-y-0 right-0 w-32 bg-[radial-gradient(circle_at_100%_22%,rgba(56,189,248,0.16),transparent_60%)]" />

                    <div className="grid gap-6 sm:grid-cols-[minmax(0,1fr)_8.5rem] sm:items-center">
                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-3">
                          <div className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 font-mono text-[11px] uppercase tracking-[0.22em] text-slate-500">
                            {activeService.eyebrow}
                          </div>
                          <button
                            type="button"
                            onClick={() => scrollToService((activeIndex + 1) % serviceItems.length)}
                            className="inline-flex items-center gap-2 rounded-full border border-sky-200 bg-sky-50 px-4 py-2 font-mono text-[11px] uppercase tracking-[0.22em] text-sky-700 transition-colors hover:bg-sky-100"
                          >
                            Next Service
                            <ArrowRight size={14} />
                          </button>
                        </div>

                        <h4 className="mt-5 font-display text-3xl font-semibold tracking-tight text-slate-950">
                          {activeService.title}
                        </h4>
                        <p className="mt-4 text-base leading-8 text-slate-600 sm:text-lg">
                          {activeService.description}
                        </p>

                        <p className="mt-6 text-sm leading-7 text-slate-500">
                          Scroll through this section to swap the service in the same bar, then the
                          page continues naturally into the next section below.
                        </p>
                      </div>

                      <div className="overflow-hidden rounded-[1.4rem] border border-white/90 bg-slate-100 shadow-[0_18px_40px_rgba(148,163,184,0.14)]">
                        <div className="aspect-[0.95/1]">
                          <img
                            src={activeService.image}
                            alt={activeService.imageAlt}
                            className="h-full w-full object-cover"
                            loading="lazy"
                          />
                        </div>
                      </div>
                    </div>
                  </motion.article>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
};

export default ServiceTreeSection;
