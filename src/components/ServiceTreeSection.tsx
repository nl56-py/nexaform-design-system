import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

import SectionWrapper, { FadeUp } from "@/components/SectionWrapper";
import { Button } from "@/components/ui/button";
import { serviceItems } from "@/lib/service-data";
import { cn } from "@/lib/utils";

const serviceCenterVideo =
  "/animations/services-7fps-56/Nexaform_services_ecosystem_202604051719.mp4";
const orbitRadius = 39;
const orbitDuration = 38;

const ServiceTreeSection = () => {
  const detailScrollerRef = useRef<HTMLDivElement | null>(null);
  const detailCardRefs = useRef<Array<HTMLDivElement | null>>([]);
  const prefersReducedMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 1024px)");
    const handleChange = () => setIsDesktop(mediaQuery.matches);

    handleChange();
    mediaQuery.addEventListener("change", handleChange);

    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  useEffect(() => {
    detailCardRefs.current = detailCardRefs.current.slice(0, serviceItems.length);
  }, []);

  useEffect(() => {
    const scroller = detailScrollerRef.current;

    if (!scroller) {
      return;
    }

    let frame = 0;

    const syncActiveCard = () => {
      frame = 0;

      const focusLine = scroller.scrollTop + scroller.clientHeight * 0.32;
      let closestIndex = 0;
      let closestDistance = Number.POSITIVE_INFINITY;

      detailCardRefs.current.forEach((card, index) => {
        if (!card) {
          return;
        }

        const cardCenter = card.offsetTop + card.offsetHeight / 2;
        const distance = Math.abs(cardCenter - focusLine);

        if (distance < closestDistance) {
          closestDistance = distance;
          closestIndex = index;
        }
      });

      setActiveIndex((current) => (current === closestIndex ? current : closestIndex));
    };

    const requestSync = () => {
      if (frame) {
        return;
      }

      frame = window.requestAnimationFrame(syncActiveCard);
    };

    requestSync();
    scroller.addEventListener("scroll", requestSync, { passive: true });
    window.addEventListener("resize", requestSync);

    return () => {
      if (frame) {
        window.cancelAnimationFrame(frame);
      }

      scroller.removeEventListener("scroll", requestSync);
      window.removeEventListener("resize", requestSync);
    };
  }, []);

  const scrollToService = (index: number) => {
    const scroller = detailScrollerRef.current;
    const target = detailCardRefs.current[index];

    setActiveIndex(index);

    if (!target) {
      return;
    }

    if (isDesktop && scroller) {
      const top = target.offsetTop - Math.max((scroller.clientHeight - target.offsetHeight) / 2, 0);

      scroller.scrollTo({
        top,
        behavior: prefersReducedMotion ? "auto" : "smooth",
      });

      return;
    }

    target.scrollIntoView({
      behavior: prefersReducedMotion ? "auto" : "smooth",
      block: "nearest",
    });
  };

  const activeService = serviceItems[activeIndex] ?? serviceItems[0];

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

        <div className="mt-14 grid gap-8 lg:grid-cols-[minmax(0,1.08fr)_minmax(22rem,0.92fr)] lg:items-start">
          <motion.div
            className="relative overflow-hidden rounded-[2.3rem] border border-slate-200/80 bg-white/82 p-5 shadow-[0_30px_80px_rgba(148,163,184,0.18)] backdrop-blur-xl sm:p-6 lg:sticky lg:top-24"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.55, ease: [0.4, 0, 0.2, 1] }}
          >
            <div className="pointer-events-none absolute inset-x-12 top-0 h-32 bg-[radial-gradient(circle_at_50%_0%,rgba(56,189,248,0.16),transparent_72%)]" />
            <div className="pointer-events-none absolute -left-10 top-16 h-28 w-28 rounded-full bg-sky-200/40 blur-3xl" />
            <div className="pointer-events-none absolute -right-6 bottom-10 h-28 w-28 rounded-full bg-amber-200/40 blur-3xl" />

            <div className="relative mx-auto aspect-square w-full max-w-[48rem]">
              <div className="absolute inset-[2%] rounded-full border border-sky-200/80" />
              <motion.div
                className="absolute inset-[8%] rounded-full border border-slate-200/90"
                animate={prefersReducedMotion ? undefined : { rotate: 360 }}
                transition={{ duration: 52, repeat: Infinity, ease: "linear" }}
              />
              <motion.div
                className="absolute inset-[13.5%] rounded-full border border-slate-200 border-dashed"
                animate={prefersReducedMotion ? undefined : { rotate: -360 }}
                transition={{ duration: 70, repeat: Infinity, ease: "linear" }}
              />
              <div className="absolute inset-[18%] rounded-full bg-[radial-gradient(circle_at_50%_46%,rgba(255,255,255,0.98),rgba(224,242,254,0.94)_56%,rgba(186,230,253,0.74)_76%,rgba(125,211,252,0.38)_100%)] shadow-[0_28px_90px_rgba(125,211,252,0.24)]" />
              <div className="absolute inset-[18.5%] overflow-hidden rounded-full border border-white/85 bg-white p-[3%] shadow-[0_24px_70px_rgba(148,163,184,0.18)]">
                <div className="relative h-full w-full overflow-hidden rounded-full border-[10px] border-white bg-slate-100 shadow-[inset_0_0_0_1px_rgba(148,163,184,0.14)] sm:border-[12px]">
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
                          "flex w-[7.5rem] items-center gap-2 rounded-[1.35rem] border bg-white/94 p-2 text-left shadow-[0_16px_34px_rgba(148,163,184,0.16)] backdrop-blur-xl transition-all sm:w-[8.4rem] sm:p-2.5 lg:w-[9.4rem]",
                          isActive
                            ? "border-sky-300 text-sky-700 shadow-[0_20px_40px_rgba(14,165,233,0.22)]"
                            : "border-white/85 text-slate-700 hover:border-sky-200 hover:text-sky-700",
                        )}
                        animate={
                          prefersReducedMotion
                            ? undefined
                            : {
                                rotate: -360,
                                scale: isActive ? [1, 1.04, 1] : 1,
                              }
                        }
                        transition={{
                          rotate: { duration: orbitDuration, repeat: Infinity, ease: "linear" },
                          scale: { duration: 2.1, repeat: Infinity, ease: "easeInOut" },
                        }}
                      >
                        <div className="h-10 w-10 shrink-0 overflow-hidden rounded-xl border border-white/90 bg-slate-100 shadow-[0_10px_24px_rgba(148,163,184,0.12)]">
                          <img
                            src={service.image}
                            alt={service.imageAlt}
                            className="h-full w-full object-cover"
                            loading="lazy"
                          />
                        </div>
                        <div className="min-w-0">
                          <div className="text-[11px] font-semibold leading-4 text-inherit sm:text-xs">
                            {service.title}
                          </div>
                          <div
                            className={cn(
                              "mt-1 font-mono text-[9px] uppercase tracking-[0.16em]",
                              isActive ? "text-sky-600" : "text-slate-500",
                            )}
                          >
                            {service.eyebrow}
                          </div>
                        </div>
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

          <motion.div
            className="relative overflow-hidden rounded-[2.1rem] border border-slate-200/85 bg-white/86 p-4 shadow-[0_26px_70px_rgba(148,163,184,0.16)] backdrop-blur-xl sm:p-5"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.55, delay: 0.08, ease: [0.4, 0, 0.2, 1] }}
          >
            <div className="pointer-events-none absolute inset-y-0 right-0 w-32 bg-[radial-gradient(circle_at_100%_22%,rgba(56,189,248,0.16),transparent_60%)]" />

            <div className="mb-5 flex items-start justify-between gap-4">
              <div>
                <div className="font-mono text-[10px] uppercase tracking-[0.26em] text-sky-700/80">
                  Service Details
                </div>
                <h3 className="mt-2 font-display text-2xl font-semibold tracking-tight text-slate-950">
                  Open the service stack on the right
                </h3>
                <p className="mt-2 max-w-[38ch] text-sm leading-6 text-slate-500">
                  Each service card opens its full detail page, and the orbit on the left follows
                  the card you are browsing.
                </p>
              </div>
              <div className="rounded-full border border-slate-200 bg-white/90 px-4 py-2 font-mono text-[11px] uppercase tracking-[0.22em] text-slate-500">
                {String(activeIndex + 1).padStart(2, "0")} /{" "}
                {String(serviceItems.length).padStart(2, "0")}
              </div>
            </div>

            <div
              ref={detailScrollerRef}
              data-service-detail-scroller
              className="grid gap-4 lg:max-h-[43rem] lg:overflow-y-auto lg:pr-2 lg:[scrollbar-gutter:stable]"
            >
              {serviceItems.map((service, index) => {
                const Icon = service.icon;
                const isActive = index === activeIndex;

                return (
                  <motion.div
                    key={service.title}
                    ref={(node) => {
                      detailCardRefs.current[index] = node;
                    }}
                    data-service-card
                    className={cn(
                      "cursor-pointer rounded-[1.75rem] border bg-white/88 p-5 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_24px_54px_rgba(148,163,184,0.18)] sm:p-6 lg:min-h-[13rem]",
                      isActive
                        ? "border-sky-300 shadow-[0_22px_50px_rgba(14,165,233,0.16)]"
                        : "border-slate-200/85 shadow-[0_16px_38px_rgba(148,163,184,0.1)]",
                    )}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.42, delay: index * 0.04, ease: [0.4, 0, 0.2, 1] }}
                    onMouseEnter={() => setActiveIndex(index)}
                  >
                    <Link
                      to={`/services/${service.slug}`}
                      className="group block h-full"
                      onFocus={() => setActiveIndex(index)}
                      aria-label={`View ${service.title} service details`}
                    >
                      <article className="grid gap-5 sm:grid-cols-[minmax(0,1fr)_8rem] sm:items-center">
                        <div className="min-w-0">
                          <div className="flex flex-wrap items-center gap-3">
                            <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-4 py-2 font-mono text-[11px] uppercase tracking-[0.22em] text-slate-500">
                              <Icon size={14} />
                              {service.eyebrow}
                            </div>
                            <div className="rounded-full border border-white/90 bg-white px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.18em] text-slate-400">
                              {String(index + 1).padStart(2, "0")}
                            </div>
                          </div>

                          <h4 className="mt-4 font-display text-2xl font-semibold tracking-tight text-slate-950">
                            {service.title}
                          </h4>
                          <p className="mt-3 text-sm leading-7 text-slate-600 sm:text-base">
                            {service.description}
                          </p>
                          <div className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-sky-700 transition-transform duration-200 group-hover:translate-x-1">
                            View service page <ArrowRight size={16} />
                          </div>
                        </div>

                        <div className="overflow-hidden rounded-[1.35rem] border border-white/90 bg-slate-100 shadow-[0_18px_40px_rgba(148,163,184,0.14)]">
                          <div className="aspect-[0.92/1]">
                            <img
                              src={service.image}
                              alt={service.imageAlt}
                              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                              loading="lazy"
                            />
                          </div>
                        </div>
                      </article>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </SectionWrapper>
  );
};

export default ServiceTreeSection;
