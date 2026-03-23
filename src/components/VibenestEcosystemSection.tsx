import { Link } from "react-router-dom";
import { ArrowRight, Bot, BrainCircuit, Code2, Sparkles } from "lucide-react";
import SectionWrapper, { FadeUp, StaggerContainer, StaggerItem } from "@/components/SectionWrapper";
import { Button } from "@/components/ui/button";
import { serviceItems } from "@/lib/service-data";
import vibeCodingImage from "@/assets/vibe coding.png";
import aiLiteracyImage from "@/assets/ai literacy.png";
import aiToolsImage from "@/assets/ai tools.jpg";
import aiAutomationImage from "@/assets/ai automation.png";

const aiLiteracyDescription =
  serviceItems.find((service) => service.title === "AI Literacy")?.description ??
  "Help teams understand practical AI use, safe adoption, workflow design, and how to turn new tools into useful daily capability.";

const aiAutomationDescription =
  serviceItems.find((service) => service.title === "AI Automation")?.description ??
  "Design AI-powered automations for repetitive workflows, internal operations, knowledge routing, and faster day-to-day execution.";

const ecosystemAreas = [
  {
    title: "Vibe Coding Practice",
    label: "Build",
    description:
      "Learn how to prototype, prompt, iterate, and ship faster with AI as a practical pair-builder instead of a novelty.",
    image: vibeCodingImage,
    alt: "Vibe coding visual for hands-on AI-assisted development",
    icon: Code2,
  },
  {
    title: "AI Literacy",
    label: "Learn",
    description:
      "Build confidence around safe use, better judgment, prompt thinking, and when AI should or should not shape a workflow.",
    image: aiLiteracyImage,
    alt: "AI literacy visual focused on practical understanding",
    icon: BrainCircuit,
  },
  {
    title: "AI Tools",
    label: "Tools",
    description:
      "Compare the right copilots, models, and assistants so people can work with a focused tool stack instead of random experimentation.",
    image: aiToolsImage,
    alt: "AI tools visual showing practical tool fluency",
    icon: Sparkles,
  },
  {
    title: "AI Automation",
    label: "Automate",
    description:
      "Move from one-off prompts to repeatable systems, internal assistants, and AI-supported workflows that save real time.",
    image: aiAutomationImage,
    alt: "AI automation visual for connected workflows",
    icon: Bot,
  },
];

const connectionCards = [
  {
    eyebrow: "Service",
    title: "AI Literacy Service",
    description: aiLiteracyDescription,
    icon: BrainCircuit,
    className: "",
  },
  {
    eyebrow: "Platform",
    title: "Vibenest Learning Platform",
    description:
      "Vibenest extends that service into an ongoing learning space for vibe coding, AI tool fluency, guided experiments, and hands-on practice.",
    icon: Sparkles,
    className: "border-primary/20 bg-gradient-to-br from-primary/10 via-white/90 to-cyan-100/60",
  },
  {
    eyebrow: "Outcome",
    title: "Automation-Ready Teams",
    description:
      "As confidence grows, Nexaform can turn proven patterns into delivery systems and automations. " +
      aiAutomationDescription,
    icon: Bot,
    className: "",
  },
];

const capabilityPoints = [
  {
    title: "Learn with clarity",
    text: "Understand AI use cases, limits, and workflow fit before scaling adoption.",
  },
  {
    title: "Practice with Vibenest",
    text: "Turn theory into daily skill through vibe coding, tools, prompts, and guided experiments.",
  },
  {
    title: "Apply through Nexaform",
    text: "Bring the strongest ideas back into products, internal systems, and real automation work.",
  },
];

const VibenestEcosystemSection = () => {
  return (
    <SectionWrapper secondary className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(59,130,246,0.16),transparent_30%),radial-gradient(circle_at_top_right,rgba(34,211,238,0.14),transparent_28%),radial-gradient(circle_at_bottom_center,rgba(250,204,21,0.10),transparent_30%)]" />

      <div className="relative z-10">
        <div className="grid grid-cols-1 gap-10 xl:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] xl:items-start">
          <div className="max-w-[38rem]">
            <FadeUp>
              <span className="inline-flex items-center gap-2 rounded-full border border-primary/15 bg-white/75 px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.26em] text-primary shadow-[0_12px_28px_rgba(59,130,246,0.08)] backdrop-blur-sm">
                <Sparkles size={14} />
                Part of the Nexaform ecosystem
              </span>
            </FadeUp>

            <FadeUp delay={0.08}>
              <h2 className="mt-5 font-display text-3xl font-bold tracking-tight text-foreground md:text-4xl">
                Vibenest connects AI literacy with practical building, tools, and automation
              </h2>
            </FadeUp>

            <FadeUp delay={0.16}>
              <p className="mt-5 max-w-[62ch] leading-8 text-muted-foreground">
                Vibenest is Nexaform&apos;s learning initiative for people who want to move from
                curiosity to real AI capability. It connects our AI Literacy service with a more
                hands-on platform experience around vibe coding, modern AI tools, and practical
                workflow design.
              </p>
            </FadeUp>

            <FadeUp delay={0.24}>
              <p className="mt-4 max-w-[62ch] leading-8 text-muted-foreground">
                That means teams can learn the foundations, test ideas in practice, and then bring
                the strongest patterns back into software delivery, internal systems, and AI
                automation work across the wider Nexaform ecosystem.
              </p>
            </FadeUp>

            <FadeUp delay={0.32}>
              <div className="mt-8 grid gap-3 sm:grid-cols-3">
                {capabilityPoints.map((point) => (
                  <div
                    key={point.title}
                    className="rounded-[24px] border border-border/60 bg-white/75 p-4 shadow-[0_16px_40px_rgba(15,23,42,0.06)] backdrop-blur-sm"
                  >
                    <div className="font-display text-base font-semibold text-foreground">
                      {point.title}
                    </div>
                    <p className="mt-2 text-sm leading-7 text-muted-foreground">{point.text}</p>
                  </div>
                ))}
              </div>
            </FadeUp>

            <FadeUp delay={0.4}>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Link to="/services">
                  <Button variant="gradient" size="lg" className="rounded-2xl px-8">
                    Explore Services <ArrowRight size={18} />
                  </Button>
                </Link>
                <Link to="/contact">
                  <Button variant="outline" size="lg" className="rounded-2xl px-8">
                    Discuss AI Literacy
                  </Button>
                </Link>
              </div>
            </FadeUp>
          </div>

          <StaggerContainer className="grid gap-4 sm:grid-cols-2">
            {ecosystemAreas.map((area) => {
              const Icon = area.icon;

              return (
                <StaggerItem key={area.title} className="h-full">
                  <article className="card-surface card-surface-hover group flex h-full flex-col overflow-hidden rounded-[28px] border border-white/60 bg-white/80 shadow-[0_20px_60px_rgba(15,23,42,0.08)] backdrop-blur-sm">
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <img
                        src={area.image}
                        alt={area.alt}
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.05]"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-slate-950/10 to-transparent" />
                      <div className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full border border-white/40 bg-white/80 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.24em] text-slate-900 backdrop-blur-sm">
                        <Icon size={14} className="text-primary" />
                        {area.label}
                      </div>
                    </div>

                    <div className="flex flex-1 flex-col p-6">
                      <h3 className="font-display text-xl font-semibold tracking-tight text-foreground">
                        {area.title}
                      </h3>
                      <p className="mt-3 text-sm leading-7 text-muted-foreground">
                        {area.description}
                      </p>
                    </div>
                  </article>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>

        <div className="mt-12 grid gap-4 lg:grid-cols-3">
          {connectionCards.map((card, index) => {
            const Icon = card.icon;

            return (
              <FadeUp key={card.title} delay={0.1 + index * 0.08}>
                <article
                  className={`rounded-[28px] border border-border/60 bg-white/75 p-6 shadow-[0_18px_44px_rgba(15,23,42,0.06)] backdrop-blur-sm sm:p-7 ${card.className}`}
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                      <Icon size={20} />
                    </div>
                    <div className="font-mono text-[11px] uppercase tracking-[0.24em] text-primary/80">
                      {card.eyebrow}
                    </div>
                  </div>

                  <h3 className="mt-5 font-display text-xl font-semibold text-foreground">
                    {card.title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-muted-foreground">{card.description}</p>
                </article>
              </FadeUp>
            );
          })}
        </div>
      </div>
    </SectionWrapper>
  );
};

export default VibenestEcosystemSection;
