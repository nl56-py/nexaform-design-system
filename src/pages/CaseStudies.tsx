import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import PageHero from "@/components/PageHero";
import SectionWrapper, { FadeUp, StaggerContainer, StaggerItem } from "@/components/SectionWrapper";
import CaseStudyCard from "@/components/CaseStudyCard";

const caseStudies = [
  {
    title: "Operations Dashboard for Internal Reporting",
    description: "A custom dashboard designed to centralize reporting, simplify daily visibility, and reduce manual tracking across teams.",
    outcome: "Faster decision-making and improved operational clarity.",
    tags: ["Dashboard", "Operations", "Reporting"],
  },
  {
    title: "Workflow Platform for Service Management",
    description: "A tailored software solution created to organize requests, approvals, task movement, and team coordination in one place.",
    outcome: "Stronger process efficiency and smoother internal delivery.",
    tags: ["Platform", "Workflow", "Automation"],
  },
  {
    title: "Business Website Designed for Trust and Growth",
    description: "A modern, high-performance website built to improve digital presence, communicate value clearly, and support lead generation.",
    outcome: "Better user experience and stronger business credibility online.",
    tags: ["Web", "Design", "Growth"],
  },
];

const CaseStudies = () => (
  <div>
    <PageHero
      headline="Case studies and digital solutions"
      subheadline="Explore how Nexaform approaches software challenges, product design, and business workflows through structured, future-ready digital systems."
      paragraph="Our case studies show how custom web applications, internal tools, dashboards, and modern platforms can improve efficiency, usability, and business growth."
    />

    <SectionWrapper>
      <FadeUp>
        <h2 className="font-display font-bold text-3xl md:text-4xl tracking-tight text-foreground mb-3">
          Work shaped by real needs
        </h2>
        <p className="text-muted-foreground leading-relaxed max-w-[65ch] mb-10">
          Every project is different, but the goal is the same: to solve meaningful problems with thoughtful design and reliable engineering.
        </p>
      </FadeUp>
      <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {caseStudies.map((cs) => (
          <StaggerItem key={cs.title}>
            <CaseStudyCard {...cs} />
          </StaggerItem>
        ))}
      </StaggerContainer>
    </SectionWrapper>

    <section className="relative section-padding overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-highlight/10 pointer-events-none" />
      <div className="container relative z-10 text-center max-w-2xl mx-auto">
        <FadeUp>
          <h2 className="font-display font-bold text-3xl md:text-4xl tracking-tight gradient-text mb-5">
            Need a similar solution?
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-8">
            We build software systems designed around the way businesses actually work — with the flexibility to grow over time.
          </p>
          <Link to="/contact">
            <Button variant="gradient" size="lg">Talk to Nexaform</Button>
          </Link>
        </FadeUp>
      </div>
    </section>
  </div>
);

export default CaseStudies;
