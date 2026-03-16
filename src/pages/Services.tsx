import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import PageHero from "@/components/PageHero";
import SectionWrapper, { FadeUp, StaggerContainer, StaggerItem } from "@/components/SectionWrapper";
import ServiceCard from "@/components/ServiceCard";
import { Globe, Code2, Palette, Server, Cloud, Wrench, ArrowRight } from "lucide-react";

const servicesData = [
  { icon: <Globe size={22} />, title: "Web Application Development", desc: "We build custom web applications for dashboards, customer portals, admin systems, booking tools, internal platforms, and digital products. Every application is designed for usability, speed, and long-term scalability." },
  { icon: <Code2 size={22} />, title: "Custom Software Development", desc: "We create tailored software systems built around the way your business actually works. From internal operations tools to service workflows and business platforms, we develop systems that reduce friction and improve efficiency." },
  { icon: <Palette size={22} />, title: "UI/UX Design", desc: "We design digital experiences that are clear, intuitive, and built around user needs. Our design process focuses on usability, product structure, and interfaces that support trust and action." },
  { icon: <Server size={22} />, title: "API & Backend Development", desc: "We build the systems behind the product — including databases, APIs, business logic, integrations, and backend services — to make sure your software is connected, reliable, and ready to scale." },
  { icon: <Cloud size={22} />, title: "Cloud & Deployment", desc: "We help deploy and manage applications using modern infrastructure and practical DevOps workflows. Our focus is on uptime, performance, security, and smooth product delivery." },
  { icon: <Wrench size={22} />, title: "Maintenance & Product Support", desc: "Launch is only the beginning. We provide ongoing support, updates, fixes, and improvements to help your product stay useful, secure, and aligned with your growth." },
];

const Services = () => (
  <div>
    <PageHero
      headline="Software development services"
      subheadline="Nexaform provides software development and product engineering services for businesses that need modern, scalable, and outcome-focused digital systems."
      paragraph="We work with businesses that want more efficient workflows, better digital experiences, and software built to support real growth."
    />

    <SectionWrapper>
      <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {servicesData.map((s) => (
          <StaggerItem key={s.title}>
            <ServiceCard icon={s.icon} title={s.title} description={s.desc} />
          </StaggerItem>
        ))}
      </StaggerContainer>
    </SectionWrapper>

    <SectionWrapper secondary>
      <FadeUp>
        <h2 className="font-display font-bold text-3xl md:text-4xl tracking-tight text-foreground mb-3">
          Who we work with
        </h2>
        <p className="text-muted-foreground leading-relaxed max-w-[65ch]">
          We work with startups, service businesses, educators, local companies, digital-first teams, and growing organizations that need software built around practical goals and long-term value.
        </p>
      </FadeUp>
    </SectionWrapper>

    <SectionWrapper>
      <FadeUp>
        <h2 className="font-display font-bold text-3xl md:text-4xl tracking-tight text-foreground mb-3">
          Built for outcomes, not just output
        </h2>
        <p className="text-muted-foreground leading-relaxed max-w-[65ch]">
          Good software should not only function — it should improve how a business operates, serves users, and grows over time. Our services are designed to help businesses move from fragmented tools and manual effort to purposeful digital systems that work better every day.
        </p>
      </FadeUp>
    </SectionWrapper>

    <section className="relative section-padding overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-highlight/10 pointer-events-none" />
      <div className="container relative z-10 text-center max-w-2xl mx-auto">
        <FadeUp>
          <h2 className="font-display font-bold text-3xl md:text-4xl tracking-tight gradient-text mb-5">
            Need the right digital system for your business?
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-8">
            Let's talk about the product, platform, or software workflow you want to build.
          </p>
          <Link to="/contact">
            <Button variant="gradient" size="lg">Start a Project</Button>
          </Link>
        </FadeUp>
      </div>
    </section>
  </div>
);

export default Services;
