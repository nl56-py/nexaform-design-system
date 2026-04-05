import { useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

import SectionWrapper, { FadeUp } from "@/components/SectionWrapper";
import { Button } from "@/components/ui/button";
import { serviceItems } from "@/lib/service-data";
import { cn } from "@/lib/utils";

const serviceCenterVideo = "/animations/services-7fps-56/Nexaform_services_ecosystem_202604051719.mp4";
const orbitRadius = 45;
const orbitDuration = 40;

const ServiceTreeSection = () => {
  const prefersReducedMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);
  const serviceRefs = useRef<Array<HTMLElement | null>>([]);
  const activeService = serviceItems[activeIndex] ?? serviceItems[0];

  const scrollToService = (index: number) => {
    setActiveIndex(index);
    serviceRefs.current[index]?.scrollIntoView({
      behavior: prefersReducedMotion ? "auto" : "smooth",
      block: "center",
    });
  };

  return (
    <SectionWrapper className="service-tree-section relative bg-[linear-gradient(180deg,#f7fbff_0%,#f4f9ff_44%,#fdfaf4_100%)] text-slate-900">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(56,189,248,0.16),transparent_24%),radial-gradient(circle_at_82%_18%,rgba(251,191,36,0.12),transparent_26%),radial-gradient(circle_at_50%_88%,rgba(16,185,129,0.1),transparent_28%)]" />
      <div className="pointer-events-none absolute inset-0 opacity-40 [background-image:linear-gradient(rgba(148,163,184,0.14)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.14)_1px,transparent_1px)] [background-size:4.5rem_4.5rem]" />

      <div className="relative z-10">
        <FadeUp>
          <span className="inline-flex items-center gap-2 rounded-full border border-sky-200 bg-white/80 px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.26em] text-sky-700 shadow-[0_14px_35px_rgba(148,163,184,0.18)] backdrop-blur-xl">
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

        <div className="mt-14 grid gap-12 xl:grid-cols-[minmax(0,0.94fr)_minmax(0,1.06fr)] xl:items-start">
          <motion.div
            className="order-1 xl:order-2 xl:sticky xl:top-24"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.55, ease: [0.4, 0, 0.2, 1] }}
          >
            <div className="pointer-events-none absolute inset-x-12 top-0 h-36 bg-[radial-gradient(circle_at_50%_0%,rgba(56,189,248,0.18),transparent_72%)]" />

            <div className="relative mx-auto aspect-square w-full max-w-[42rem]">
              <div className="absolute inset-[3%] rounded-full border border-sky-200/75" />
              <motion.div
                className="absolute inset-[10%] rounded-full border border-sky-100/90"
                animate={prefersReducedMotion ? undefined : { rotate: 360 }}
                transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
              />
              <motion.div
                className="absolute inset-[17%] rounded-full border border-slate-200 border-dashed"
                animate={prefersReducedMotion ? undefined : { rotate: -360 }}
                transition={{ duration: 90, repeat: Infinity, ease: "linear" }}
              />
              <div className="absolute inset-[20%] rounded-full bg-[radial-gradient(circle_at_50%_46%,rgba(255,255,255,0.95),rgba(224,242,254,0.94)_56%,rgba(186,230,253,0.76)_74%,rgba(125,211,252,0.42)_100%)] shadow-[0_26px_90px_rgba(125,211,252,0.26)]" />
              <div className="absolute inset-[24%] rounded-full bg-white/80 p-[3.5%] shadow-[0_30px_70px_rgba(148,163,184,0.2)]">
                <div className="relative h-full w-full overflow-hidden rounded-full border-[14px] border-white bg-[radial-gradient(circle_at_50%_30%,rgba(248,250,252,0.96),rgba(224,242,254,0.94)_42%,rgba(203,213,225,0.52)_100%)] shadow-[inset_0_0_0_1px_rgba(148,163,184,0.12)]">
                  <video
                    className="h-full w-full rounded-full object-contain"
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
                          "flex w-[5.9rem] flex-col items-center gap-2 rounded-[1.35rem] border bg-white/92 px-2.5 py-2 text-center shadow-[0_16px_34px_rgba(148,163,184,0.18)] backdrop-blur-xl transition-all sm:w-[7rem]",
                          isActive
                            ? "border-sky-300 shadow-[0_20px_44px_rgba(14,165,233,0.22)]"
                            : "border-white/80 hover:border-sky-200",
                        )}
                        animate={
                          prefersReducedMotion
                            ? undefined
                            : {
                                rotate: -360,
                                scale: isActive ? [1, 1.05, 1] : 1,
                              }
                        }
                        transition={{
                          rotate: { duration: orbitDuration, repeat: Infinity, ease: "linear" },
                          scale: { duration: 2.2, repeat: Infinity, ease: "easeInOut" },
                        }}
                      >
                        <div className="h-10 w-10 overflow-hidden rounded-full border border-white bg-slate-100 shadow-[0_8px_18px_rgba(148,163,184,0.18)] sm:h-12 sm:w-12">
                          <img
                            src={service.image}
                            alt={service.imageAlt}
                            className="h-full w-full object-cover"
                            loading="lazy"
                          />
                        </div>
                        <span className="text-[10px] font-semibold leading-[1.15] text-slate-700 sm:text-[11px]">
                          {service.title}
                        </span>
                      </motion.div>
                    </button>
                  );
                })}
              </motion.div>
            </div>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-3 text-center xl:justify-start xl:text-left">
              <div className="rounded-full border border-sky-200 bg-sky-50 px-4 py-2 font-mono text-[11px] uppercase tracking-[0.24em] text-sky-700">
                Active Service
              </div>
              <motion.div
                key={activeService.title}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                className="rounded-full border border-white/80 bg-white/88 px-5 py-2.5 text-sm font-semibold text-slate-700 shadow-[0_14px_32px_rgba(148,163,184,0.14)] backdrop-blur-xl"
              >
                {activeService.title}
              </motion.div>
            </div>
          </motion.div>

          <div className="order-2 xl:order-1">
            <div className="space-y-8 xl:space-y-0">
              {serviceItems.map((service, index) => {
                const Icon = service.icon;
                const isActive = index === activeIndex;

                return (
                  <motion.article
                    key={service.title}
                    ref={(node) => {
                      serviceRefs.current[index] = node;
                    }}
                    className="xl:flex xl:min-h-[82vh] xl:items-center"
                    initial={{ opacity: 0, y: 28 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    onViewportEnter={() => setActiveIndex(index)}
                    viewport={{ once: false, amount: 0.55, margin: "-18% 0px -18% 0px" }}
                    transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
                  >
                    <div
                      className={cn(
                        "relative w-full overflow-hidden rounded-[2rem] border bg-white/88 p-5 shadow-[0_24px_70px_rgba(148,163,184,0.15)] backdrop-blur-xl transition-all sm:p-7",
                        isActive
                          ? "border-sky-200 shadow-[0_30px_80px_rgba(56,189,248,0.16)]"
                          : "border-white/75",
                      )}
                    >
                      <div className="pointer-events-none absolute inset-y-0 right-0 w-28 bg-[radial-gradient(circle_at_100%_24%,rgba(56,189,248,0.12),transparent_62%)]" />

                      <div className="grid gap-6 lg:grid-cols-[minmax(0,0.95fr)_minmax(17rem,1.05fr)] lg:items-center">
                        <div className="relative">
                          <div className="flex flex-wrap items-center gap-3">
                            <div className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 font-mono text-[11px] uppercase tracking-[0.24em] text-slate-500">
                              {String(index + 1).padStart(2, "0")}
                            </div>
                            <div className="inline-flex items-center gap-2 rounded-full border border-sky-200 bg-sky-50 px-4 py-2 font-mono text-[11px] uppercase tracking-[0.24em] text-sky-700">
                              <Icon size={14} />
                              {service.eyebrow}
                            </div>
                          </div>

                          <h3 className="mt-6 font-display text-3xl font-semibold tracking-tight text-slate-950 md:text-[2.35rem]">
                            {service.title}
                          </h3>
                          <p className="mt-4 max-w-[34rem] text-base leading-8 text-slate-600 sm:text-lg">
                            {service.description}
                          </p>

                          <button
                            type="button"
                            onClick={() => scrollToService(index)}
                            className="mt-6 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 font-mono text-[11px] uppercase tracking-[0.22em] text-slate-500 transition-colors hover:border-sky-200 hover:text-sky-700"
                          >
                            In focus
                            <ArrowRight size={14} />
                          </button>
                        </div>

                        <div className="relative overflow-hidden rounded-[1.75rem] border border-white/80 bg-slate-100 shadow-[0_22px_55px_rgba(148,163,184,0.18)]">
                          <div className="absolute inset-x-0 top-0 h-20 bg-[linear-gradient(180deg,rgba(255,255,255,0.18),transparent)]" />
                          <div className="aspect-[1.12/1]">
                            <img
                              src={service.image}
                              alt={service.imageAlt}
                              className="h-full w-full object-cover"
                              loading="lazy"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.article>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
};

export default ServiceTreeSection;
