import { motion } from "framer-motion";
import type { ComponentType, SVGProps } from "react";
import { Code2, Palette, Rocket, Search, type LucideIcon } from "lucide-react";
import SectionWrapper, { FadeUp, StaggerContainer, StaggerItem } from "@/components/SectionWrapper";

type PatternProps = SVGProps<SVGSVGElement>;

type ProcessStep = {
  num: string;
  title: string;
  desc: string;
  label: string;
  outcome: string;
  icon: LucideIcon;
  pattern: ComponentType<PatternProps>;
  cardClassName: string;
  iconWrapClassName: string;
  glowClassName: string;
  glowSecondaryClassName: string;
  dotClassName: string;
  shadowClassName: string;
};

const DiscoverPattern = (props: PatternProps) => (
  <svg viewBox="0 0 88 88" fill="none" {...props}>
    <circle cx="44" cy="44" r="30" stroke="#38BDF8" strokeDasharray="6 6" strokeWidth="2" />
    <circle cx="44" cy="44" r="18" stroke="#0EA5E9" strokeWidth="2.5" />
    <circle cx="44" cy="44" r="5" fill="#0284C7" />
    <path d="M60 28 72 16" stroke="#38BDF8" strokeLinecap="round" strokeWidth="3" />
    <circle cx="75" cy="13" r="5" fill="#67E8F9" />
  </svg>
);

const DesignPattern = (props: PatternProps) => (
  <svg viewBox="0 0 88 88" fill="none" {...props}>
    <rect x="15" y="18" width="58" height="44" rx="14" fill="#FCE7F3" />
    <rect x="22" y="26" width="20" height="12" rx="6" fill="#F472B6" />
    <rect x="46" y="26" width="20" height="12" rx="6" fill="#FB7185" />
    <path d="M22 50c7-8 13-12 20-12 7 0 13 4 20 12" stroke="#EC4899" strokeLinecap="round" strokeWidth="3" />
    <circle cx="27" cy="63" r="5" fill="#FDBA74" />
    <circle cx="61" cy="63" r="5" fill="#F472B6" />
  </svg>
);

const DevelopPattern = (props: PatternProps) => (
  <svg viewBox="0 0 88 88" fill="none" {...props}>
    <rect x="14" y="18" width="60" height="52" rx="16" fill="#EEF2FF" />
    <path d="m33 33-11 11 11 11" stroke="#6366F1" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" />
    <path d="m55 33 11 11-11 11" stroke="#8B5CF6" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" />
    <path d="m48 28-8 32" stroke="#38BDF8" strokeLinecap="round" strokeWidth="4" />
    <circle cx="24" cy="24" r="4" fill="#A78BFA" />
    <circle cx="64" cy="64" r="4" fill="#38BDF8" />
  </svg>
);

const LaunchPattern = (props: PatternProps) => (
  <svg viewBox="0 0 88 88" fill="none" {...props}>
    <path d="M20 68c8-10 15-15 27-20" stroke="#10B981" strokeDasharray="5 5" strokeLinecap="round" strokeWidth="3" />
    <path
      d="M53 22c8 1 14 7 15 15-4 7-10 13-17 17-8-1-14-7-15-15 4-7 10-13 17-17Z"
      fill="#D1FAE5"
      stroke="#10B981"
      strokeWidth="2.5"
    />
    <circle cx="58" cy="31" r="4" fill="#34D399" />
    <path d="m46 54-4 12 12-4" fill="#6EE7B7" />
    <path d="M66 18v10M61 23h10" stroke="#14B8A6" strokeLinecap="round" strokeWidth="3" />
  </svg>
);

const processSteps: ProcessStep[] = [
  {
    num: "01",
    title: "Discover",
    desc: "We learn about your goals, users, workflows, and business challenges.",
    label: "Research",
    outcome: "Goals and workflow signals mapped",
    icon: Search,
    pattern: DiscoverPattern,
    cardClassName: "bg-gradient-to-br from-sky-100/90 via-white to-cyan-100/85",
    iconWrapClassName: "bg-gradient-to-br from-sky-500 to-cyan-400 text-white",
    glowClassName: "bg-sky-400/35",
    glowSecondaryClassName: "bg-cyan-300/30",
    dotClassName: "bg-sky-500",
    shadowClassName: "shadow-[0_28px_60px_-34px_rgba(14,165,233,0.58)]",
  },
  {
    num: "02",
    title: "Design",
    desc: "We shape the structure, user experience, and product direction before development begins.",
    label: "Blueprint",
    outcome: "Product direction made visible",
    icon: Palette,
    pattern: DesignPattern,
    cardClassName: "bg-gradient-to-br from-rose-100/90 via-white to-amber-100/85",
    iconWrapClassName: "bg-gradient-to-br from-fuchsia-500 to-rose-400 text-white",
    glowClassName: "bg-fuchsia-400/30",
    glowSecondaryClassName: "bg-amber-300/30",
    dotClassName: "bg-fuchsia-500",
    shadowClassName: "shadow-[0_28px_60px_-34px_rgba(236,72,153,0.5)]",
  },
  {
    num: "03",
    title: "Develop",
    desc: "We build scalable, maintainable, and performance-focused software using modern tools.",
    label: "Build",
    outcome: "Systems engineered for clarity and scale",
    icon: Code2,
    pattern: DevelopPattern,
    cardClassName: "bg-gradient-to-br from-indigo-100/90 via-white to-violet-100/85",
    iconWrapClassName: "bg-gradient-to-br from-indigo-500 to-violet-500 text-white",
    glowClassName: "bg-violet-400/30",
    glowSecondaryClassName: "bg-sky-300/30",
    dotClassName: "bg-violet-500",
    shadowClassName: "shadow-[0_28px_60px_-34px_rgba(99,102,241,0.56)]",
  },
  {
    num: "04",
    title: "Launch & Improve",
    desc: "We deploy, support, refine, and help your product continue to grow after launch.",
    label: "Scale",
    outcome: "Launch support and iteration built in",
    icon: Rocket,
    pattern: LaunchPattern,
    cardClassName: "bg-gradient-to-br from-emerald-100/90 via-white to-teal-100/85",
    iconWrapClassName: "bg-gradient-to-br from-emerald-500 to-teal-400 text-white",
    glowClassName: "bg-emerald-400/30",
    glowSecondaryClassName: "bg-teal-300/30",
    dotClassName: "bg-emerald-500",
    shadowClassName: "shadow-[0_28px_60px_-34px_rgba(16,185,129,0.5)]",
  },
];

const BuildProcessSection = () => (
  <SectionWrapper secondary className="relative overflow-hidden">
    <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_12%_18%,rgba(56,189,248,0.16),transparent_24%),radial-gradient(circle_at_86%_20%,rgba(244,114,182,0.14),transparent_25%),radial-gradient(circle_at_52%_85%,rgba(16,185,129,0.12),transparent_28%)]" />

    <div className="relative z-10">
      <FadeUp>
        <span className="inline-flex items-center gap-2 rounded-full border border-primary/15 bg-white/75 px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.26em] text-primary shadow-[0_12px_28px_rgba(59,130,246,0.08)] backdrop-blur-sm">
          Process Flow
        </span>
      </FadeUp>

      <div className="mt-5 flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
        <FadeUp delay={0.08} className="max-w-[48rem]">
          <h2 className="font-display text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            How we build digital systems
          </h2>
          <p className="mt-4 max-w-[65ch] leading-relaxed text-muted-foreground">
            We follow a practical and collaborative process that keeps projects focused, efficient,
            and aligned with real business outcomes.
          </p>
        </FadeUp>

        <FadeUp delay={0.14}>
          <div className="inline-flex items-center gap-3 rounded-full border border-white/70 bg-white/80 px-4 py-2 text-sm text-muted-foreground shadow-[0_18px_45px_rgba(15,23,42,0.06)] backdrop-blur-sm">
            <span className="h-2.5 w-2.5 rounded-full bg-gradient-to-r from-sky-500 to-emerald-500" />
            Strategy, design, engineering, and iteration connected in one flow
          </div>
        </FadeUp>
      </div>

      <div className="relative mt-12">
        <div className="pointer-events-none absolute left-[12%] right-[12%] top-20 hidden h-px bg-gradient-to-r from-sky-300/0 via-primary/25 to-emerald-300/0 xl:block" />

        <StaggerContainer className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
          {processSteps.map((step, index) => {
            const Icon = step.icon;
            const Pattern = step.pattern;

            return (
              <StaggerItem key={step.num} className="h-full">
                <motion.article
                  className={`relative flex h-full flex-col overflow-hidden rounded-[30px] border border-white/70 p-6 ${step.cardClassName} ${step.shadowClassName}`}
                  whileHover={{ y: -8, scale: 1.01 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                >
                  <div className={`pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full blur-3xl ${step.glowClassName}`} />
                  <div className={`pointer-events-none absolute -bottom-8 -left-8 h-28 w-28 rounded-full blur-3xl ${step.glowSecondaryClassName}`} />

                  <div className="relative z-10 flex items-start justify-between gap-4">
                    <div>
                      <div className="font-mono text-[11px] uppercase tracking-[0.28em] text-slate-600/70">
                        {step.num}
                      </div>
                      <div className="mt-4 flex items-center gap-3">
                        <div className={`flex h-14 w-14 items-center justify-center rounded-[18px] ${step.iconWrapClassName}`}>
                          <Icon size={24} />
                        </div>
                        <span className="rounded-full border border-white/75 bg-white/75 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.22em] text-slate-700/75 backdrop-blur-sm">
                          {step.label}
                        </span>
                      </div>
                    </div>

                    <div className="h-20 w-20 shrink-0 opacity-90">
                      <Pattern className="h-full w-full" aria-hidden="true" />
                    </div>
                  </div>

                  <div className="relative z-10 mt-8">
                    <h3 className="font-display text-2xl font-semibold tracking-tight text-slate-950">
                      {step.title}
                    </h3>
                    <p className="mt-3 text-sm leading-7 text-slate-700/85">{step.desc}</p>
                  </div>

                  <div className="relative z-10 mt-8 flex items-center gap-2 text-[11px] uppercase tracking-[0.24em] text-slate-600/72">
                    <span className={`h-2.5 w-2.5 rounded-full ${step.dotClassName}`} />
                    {step.outcome}
                  </div>

                  <div className="pointer-events-none absolute right-4 top-4 hidden xl:block">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full border border-white/70 bg-white/75 text-[10px] font-semibold text-slate-700/70">
                      {index + 1}
                    </div>
                  </div>
                </motion.article>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </div>
    </div>
  </SectionWrapper>
);

export default BuildProcessSection;
