import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Cpu, MessageCircle, Network, Radar } from "lucide-react";
import { FadeUp } from "@/components/SectionWrapper";
import { Button } from "@/components/ui/button";
import { siteContact } from "@/lib/site-config";

const consultationSteps = [
  {
    number: "Step 1",
    title: "Technical Discovery",
    description:
      "We review your goals, workflows, blockers, and existing tools to uncover where the right technology can create the most value.",
    icon: Radar,
  },
  {
    number: "Step 2",
    title: "Solution Mapping",
    description:
      "You get a tailored direction for architecture, automation, integrations, and product scope based on how your team actually works.",
    icon: Network,
  },
  {
    number: "Step 3",
    title: "Build Roadmap",
    description:
      "We turn the consultation into clear technical priorities, practical recommendations, and a confident next step before a larger build.",
    icon: Cpu,
  },
];

const ConsultationJourneySection = () => {
  return (
    <section className="relative overflow-hidden section-padding">
      <div className="absolute inset-0 pointer-events-none consultation-journey-bg" />

      <div className="container relative z-10">
        <div className="relative px-0 py-4 md:py-6">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute -left-24 top-10 h-52 w-52 rounded-full bg-primary/10 blur-3xl" />
            <div className="absolute right-8 top-4 h-56 w-56 rounded-full bg-highlight/10 blur-3xl" />
            <div className="absolute bottom-0 left-1/3 h-52 w-52 rounded-full bg-accent/10 blur-3xl" />
          </div>

          <div className="relative grid grid-cols-1 gap-10 xl:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)] xl:items-center">
            <div className="max-w-[36rem]">
              <FadeUp>
                <span className="inline-block font-mono text-[11px] uppercase tracking-[0.28em] text-highlight sm:text-[12px]">
                  \ tech consultation \
                </span>
              </FadeUp>

              <FadeUp delay={0.08}>
                <h2 className="mt-5 max-w-[12ch] font-display text-[2.7rem] font-bold leading-[0.98] tracking-tight text-foreground sm:text-[3.15rem] lg:text-[3.55rem]">
                  Book a Free Tech Consultation
                </h2>
              </FadeUp>

              <FadeUp delay={0.16}>
                <p className="mt-5 max-w-[35rem] text-base leading-8 text-muted-foreground md:text-lg">
                  Book a tech consultation today for expert product direction, technical guidance,
                  and tailored solutions that fit your workflows, systems, and growth plans.
                </p>
              </FadeUp>

              <FadeUp delay={0.24}>
                <div className="mt-8 flex flex-wrap items-center gap-4">
                  <Button variant="gradient" size="lg" className="w-full rounded-2xl px-8 sm:w-auto" asChild>
                    <a
                      href={siteContact.whatsappHref}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`Chat with Nexaform on WhatsApp at ${siteContact.whatsappNumber}`}
                    >
                      <MessageCircle size={18} />
                      Get in Touch
                      <ArrowRight size={18} />
                    </a>
                  </Button>
                  <Link to="/contact">
                    <Button variant="outline" size="lg" className="w-full rounded-2xl px-8 sm:w-auto">
                      Contact Form
                    </Button>
                  </Link>
                </div>
              </FadeUp>

              <FadeUp delay={0.32}>
                <div className="mt-6 inline-flex max-w-full items-center gap-3 rounded-full border border-highlight/15 bg-highlight/5 px-4 py-2 text-sm text-muted-foreground">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#ffd84f] shadow-[0_0_16px_rgba(255,216,79,0.55)]" />
                  <span className="truncate">Technology advice grounded in real business needs</span>
                </div>
              </FadeUp>
            </div>

            <FadeUp delay={0.14}>
              <motion.div
                className="consultation-poster relative mx-auto w-full max-w-[46rem]"
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 7.5, repeat: Infinity, ease: "easeInOut" }}
              >
                <div className="consultation-poster-ribbon" />
                <div className="consultation-poster-blob consultation-poster-blob-left" />
                <div className="consultation-poster-blob consultation-poster-blob-top" />
                <div className="consultation-poster-blob consultation-poster-blob-bottom" />
                <div className="consultation-poster-frame" />

                <motion.div
                  className="consultation-poster-note"
                  animate={{ rotate: [-2, 0, -2], y: [0, -8, 0] }}
                  transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut" }}
                >
                  <div className="consultation-poster-note-shadow" />
                  <div className="consultation-poster-note-body">
                    <span>LET&apos;S</span>
                    <span>TALK</span>
                    <span>TECH</span>
                  </div>
                </motion.div>

                <motion.div
                  className="consultation-poster-tag"
                  animate={{ x: [0, 8, 0] }}
                  transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
                >
                  Strategy • Systems • Delivery
                </motion.div>

                <motion.div
                  className="consultation-poster-mark consultation-poster-mark-top"
                  animate={{ scale: [1, 1.08, 1] }}
                  transition={{ duration: 4.8, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.div
                  className="consultation-poster-mark consultation-poster-mark-bottom"
                  animate={{ scale: [1, 1.12, 1] }}
                  transition={{ duration: 5.2, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
                />

                <div className="consultation-poster-caption">
                  <div className="font-mono text-[10px] uppercase tracking-[0.26em] text-white/75">
                    Nexaform Consultation
                  </div>
                  <div className="mt-2 font-display text-xl font-semibold text-white sm:text-2xl">
                    Smart technical direction before you build
                  </div>
                </div>
              </motion.div>
            </FadeUp>
          </div>

          <div className="relative mt-14 grid gap-8 md:grid-cols-3">
            {consultationSteps.map((step, index) => {
              const Icon = step.icon;

              return (
                <FadeUp key={step.title} delay={0.18 + index * 0.08}>
                  <motion.div
                    className="consultation-step-card h-full"
                    animate={{ y: [0, -6, 0] }}
                    transition={{
                      duration: 6 + index * 0.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: index * 0.2,
                    }}
                  >
                    <div className="consultation-step-icon">
                      <Icon size={20} />
                    </div>
                    <div>
                      <div className="mb-2 font-mono text-[11px] uppercase tracking-[0.24em] text-highlight/80">
                        {step.number}
                      </div>
                      <h3 className="font-display text-lg font-semibold text-foreground">{step.title}</h3>
                      <p className="mt-3 text-sm leading-7 text-muted-foreground">{step.description}</p>
                    </div>
                  </motion.div>
                </FadeUp>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ConsultationJourneySection;
