import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import PageHero from "@/components/PageHero";
import SectionWrapper, { FadeUp, StaggerContainer, StaggerItem } from "@/components/SectionWrapper";
import ServiceCard from "@/components/ServiceCard";
import { Sparkles, Shield, Lightbulb, TrendingUp } from "lucide-react";

const values = [
  { icon: <Sparkles size={22} />, title: "Clarity", desc: "We believe good technology starts with clear thinking, clear communication, and clear user experience." },
  { icon: <Shield size={22} />, title: "Reliability", desc: "We build software that performs well, supports daily use, and earns long-term trust." },
  { icon: <Lightbulb size={22} />, title: "Practical Innovation", desc: "We use modern tools and ideas where they create meaningful value, not unnecessary complexity." },
  { icon: <TrendingUp size={22} />, title: "Growth Mindset", desc: "We build with improvement, adaptability, and future scale in mind." },
];

const About = () => (
  <div>
    <PageHero
      headline="About Nexaform"
      subheadline="Nexaform is a software and digital systems company focused on building scalable products, modern business platforms, and future-ready technology solutions."
    />

    <SectionWrapper>
      <FadeUp>
        <div className="max-w-3xl space-y-5">
          <p className="text-muted-foreground leading-relaxed">
            We help businesses move from disconnected tools, manual processes, and unclear systems to purposeful digital products that improve operations, user experience, and long-term growth.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Our work combines strategy, design, and engineering to create software that is useful in practice, not just impressive on paper. We build with clarity, maintainability, and real-world outcomes in mind.
          </p>
        </div>
      </FadeUp>
    </SectionWrapper>

    <SectionWrapper secondary>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl">
        <FadeUp>
          <h3 className="font-display font-bold text-xl text-foreground mb-3">Our mission</h3>
          <p className="text-muted-foreground leading-relaxed">
            To shape digital systems that help businesses operate smarter, build faster, and grow with confidence.
          </p>
        </FadeUp>
        <FadeUp delay={0.1}>
          <h3 className="font-display font-bold text-xl text-foreground mb-3">Our vision</h3>
          <p className="text-muted-foreground leading-relaxed">
            To become a trusted technology partner for businesses building future-ready digital products and systems.
          </p>
        </FadeUp>
      </div>
    </SectionWrapper>

    <SectionWrapper>
      <FadeUp>
        <h2 className="font-display font-bold text-3xl md:text-4xl tracking-tight text-foreground mb-3">
          What guides our work
        </h2>
      </FadeUp>
      <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        {values.map((v) => (
          <StaggerItem key={v.title}>
            <ServiceCard icon={v.icon} title={v.title} description={v.desc} />
          </StaggerItem>
        ))}
      </StaggerContainer>
    </SectionWrapper>

    <SectionWrapper secondary>
      <FadeUp>
        <h2 className="font-display font-bold text-3xl md:text-4xl tracking-tight text-foreground mb-3">
          How we approach every project
        </h2>
        <p className="text-muted-foreground leading-relaxed max-w-[65ch]">
          Every project begins with understanding the business problem behind the request. From there, we shape the right solution, design the right experience, and build with technologies that support performance, flexibility, and growth. We value collaboration, transparency, and systems that remain useful long after launch.
        </p>
      </FadeUp>
    </SectionWrapper>

    <SectionWrapper>
      <FadeUp>
        <div className="card-surface rounded-card p-8 md:p-12 max-w-2xl">
          <h3 className="font-display font-semibold text-xl text-foreground mb-3">Beyond software delivery</h3>
          <p className="text-muted-foreground leading-relaxed">
            As part of its broader vision, Nexaform also supports <span className="text-foreground">Vibenest</span>, a learning initiative focused on modern AI-assisted development and vibe coding education.
          </p>
        </div>
      </FadeUp>
    </SectionWrapper>

    <section className="relative section-padding overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-highlight/10 pointer-events-none" />
      <div className="container relative z-10 text-center max-w-2xl mx-auto">
        <FadeUp>
          <h2 className="font-display font-bold text-3xl md:text-4xl tracking-tight gradient-text mb-5">
            Looking for a technology partner that builds with purpose?
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-8">
            We'd love to hear about your goals, your challenges, and the digital system you want to create.
          </p>
          <Link to="/contact">
            <Button variant="gradient" size="lg">Contact Nexaform</Button>
          </Link>
        </FadeUp>
      </div>
    </section>
  </div>
);

export default About;
