import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import SectionWrapper, { FadeUp, StaggerContainer, StaggerItem } from "@/components/SectionWrapper";
import ServiceCard from "@/components/ServiceCard";
import CaseStudyCard from "@/components/CaseStudyCard";
import {
  Globe, Code2, Palette, Server, Cloud, Wrench,
  Lightbulb, Cpu, LayoutList, TrendingUp,
  ArrowRight, CheckCircle2
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const services = [
  { icon: <Globe size={22} />, title: "Web Application Development", desc: "Build fast, secure, and scalable web applications tailored to your users, workflows, and business goals." },
  { icon: <Code2 size={22} />, title: "Custom Software Development", desc: "Create software systems that match your exact business processes, reduce manual work, and improve efficiency." },
  { icon: <Palette size={22} />, title: "UI/UX Design", desc: "Design intuitive digital experiences that make products easier to use, easier to trust, and easier to grow." },
  { icon: <Server size={22} />, title: "API & Backend Systems", desc: "Develop reliable backend architecture, integrations, and data systems that power modern digital products." },
  { icon: <Cloud size={22} />, title: "Cloud & Deployment", desc: "Launch and manage applications with performance, security, and scalability in mind." },
  { icon: <Wrench size={22} />, title: "Maintenance & Support", desc: "Keep your software stable, updated, and improving as your business evolves." },
];

const whyCards = [
  { icon: <Lightbulb size={22} />, title: "Tailored Solutions", desc: "Every system we build is shaped around your goals, users, and processes." },
  { icon: <Cpu size={22} />, title: "Modern Technology", desc: "We use flexible, scalable tools and frameworks suited for modern product development." },
  { icon: <LayoutList size={22} />, title: "Structured Delivery", desc: "Clear communication, thoughtful planning, and a reliable development process from start to launch." },
  { icon: <TrendingUp size={22} />, title: "Long-Term Thinking", desc: "We build with maintainability, growth, and future improvement in mind." },
];

const processSteps = [
  { num: "01", title: "Discover", desc: "We learn about your goals, users, workflows, and business challenges." },
  { num: "02", title: "Design", desc: "We shape the structure, user experience, and product direction before development begins." },
  { num: "03", title: "Develop", desc: "We build scalable, maintainable, and performance-focused software using modern tools." },
  { num: "04", title: "Launch & Improve", desc: "We deploy, support, refine, and help your product continue to grow after launch." },
];

const techStack = ["React", "Next.js", "Node.js", "PostgreSQL", "Tailwind CSS", "Supabase", "Vercel", "Docker"];

const blogPreviews = [
  { title: "What makes a digital system future-ready?", desc: "A practical look at the qualities that help software stay useful, scalable, and adaptable over time." },
  { title: "Custom software vs off-the-shelf tools", desc: "How to evaluate when a tailored system creates more value than a general-purpose platform." },
  { title: "How AI-assisted workflows are changing development", desc: "A grounded perspective on how modern teams can use AI tools without losing clarity or quality." },
];

const Index = () => {
  return (
    <div>
      {/* Hero */}
      <section className="relative pt-32 pb-16 md:pt-40 md:pb-24 overflow-hidden">
        <div className="absolute inset-0 gradient-glow-bg pointer-events-none" />
        <div className="absolute top-1/2 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl -translate-y-1/2 pointer-events-none" />
        
        <div className="container relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <FadeUp>
                <span className="inline-block font-mono text-[12px] tracking-widest uppercase text-accent bg-accent/10 px-3 py-1.5 rounded-full border border-accent/20 mb-6">
                  Custom Software • Web Apps • Digital Systems
                </span>
              </FadeUp>
              <FadeUp delay={0.1}>
                <h1 className="font-display font-bold text-4xl md:text-5xl lg:text-[60px] tracking-tight gradient-text text-balance leading-[1.1] mb-6">
                  Shaping future-ready digital systems
                </h1>
              </FadeUp>
              <FadeUp delay={0.2}>
                <p className="text-lg text-muted-foreground leading-relaxed mb-4 max-w-[55ch]">
                  Nexaform designs and develops custom web applications, scalable software, and modern digital systems for businesses that want to operate smarter and grow with confidence.
                </p>
              </FadeUp>
              <FadeUp delay={0.25}>
                <p className="text-base text-muted-foreground/70 leading-relaxed mb-8 max-w-[55ch]">
                  From idea validation and product design to engineering, deployment, and long-term improvement, we help businesses turn complex workflows and ambitious ideas into reliable digital products.
                </p>
              </FadeUp>
              <FadeUp delay={0.3}>
                <div className="flex flex-wrap gap-3 mb-8">
                  <Link to="/contact">
                    <Button variant="gradient" size="lg">Start a Project</Button>
                  </Link>
                  <Link to="/case-studies">
                    <Button variant="outline" size="lg">View Case Studies</Button>
                  </Link>
                </div>
              </FadeUp>
              <FadeUp delay={0.35}>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <CheckCircle2 size={16} className="text-accent" />
                  Software solutions built for clarity, performance, and scale.
                </div>
              </FadeUp>
            </div>

            {/* Hero visual */}
            <FadeUp delay={0.3} className="hidden lg:block">
              <div className="relative">
                <div className="glass-card rounded-card p-6 relative z-10">
                  <div className="bg-secondary rounded-xl p-4 space-y-3">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-3 h-3 rounded-full bg-destructive/60" />
                      <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
                      <div className="w-3 h-3 rounded-full bg-emerald-500/60" />
                    </div>
                    <div className="grid grid-cols-3 gap-3">
                      <div className="card-surface rounded-xl p-4 col-span-2">
                        <div className="h-2 w-20 bg-primary/30 rounded mb-3" />
                        <div className="h-16 bg-primary/10 rounded-lg mb-2" />
                        <div className="h-2 w-16 bg-muted-foreground/20 rounded" />
                      </div>
                      <div className="card-surface rounded-xl p-4">
                        <div className="h-2 w-12 bg-accent/30 rounded mb-3" />
                        <div className="text-2xl font-display font-bold text-accent">94%</div>
                        <div className="h-2 w-10 bg-muted-foreground/20 rounded mt-2" />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="card-surface rounded-xl p-4">
                        <div className="h-2 w-14 bg-highlight/30 rounded mb-3" />
                        <div className="flex gap-1">
                          {[40, 65, 45, 80, 55, 70, 90].map((h, i) => (
                            <div key={i} className="flex-1 bg-primary/20 rounded-sm" style={{ height: `${h}%`, minHeight: h * 0.5 }} />
                          ))}
                        </div>
                      </div>
                      <div className="card-surface rounded-xl p-4">
                        <div className="h-2 w-14 bg-primary/30 rounded mb-3" />
                        <div className="space-y-2">
                          {[85, 60, 75].map((w, i) => (
                            <div key={i} className="h-2 bg-muted-foreground/10 rounded-full">
                              <div className="h-full bg-accent/30 rounded-full" style={{ width: `${w}%` }} />
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Floating card */}
                <div className="absolute -top-4 -right-4 glass-card rounded-xl p-3 z-20 animate-fade-up" style={{ animationDelay: "0.6s" }}>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center">
                      <TrendingUp size={14} className="text-emerald-400" />
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground">Efficiency</div>
                      <div className="text-sm font-display font-semibold text-emerald-400">+40%</div>
                    </div>
                  </div>
                </div>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* Intro */}
      <SectionWrapper secondary>
        <FadeUp>
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-display font-bold text-3xl md:text-4xl tracking-tight text-foreground mb-5">
              Software built around real business needs
            </h2>
            <p className="text-muted-foreground leading-relaxed max-w-[65ch] mx-auto">
              Nexaform works with startups, growing businesses, and forward-thinking teams to build digital systems that solve practical problems. Whether you need a customer-facing platform, an internal operations tool, a modern business dashboard, or a custom web application, we focus on building software that is useful, scalable, and ready for the future.
            </p>
          </div>
        </FadeUp>
      </SectionWrapper>

      {/* Services */}
      <SectionWrapper>
        <FadeUp>
          <h2 className="font-display font-bold text-3xl md:text-4xl tracking-tight text-foreground mb-3">
            What we build
          </h2>
          <p className="text-muted-foreground leading-relaxed max-w-[65ch] mb-10">
            Our services are designed for businesses that need more than a basic website. We create digital systems that improve operations, support growth, and deliver better user experiences.
          </p>
        </FadeUp>
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {services.map((s) => (
            <StaggerItem key={s.title}>
              <ServiceCard icon={s.icon} title={s.title} description={s.desc} />
            </StaggerItem>
          ))}
        </StaggerContainer>
        <FadeUp>
          <Link to="/services">
            <Button variant="outline" className="gap-2">
              Explore Services <ArrowRight size={16} />
            </Button>
          </Link>
        </FadeUp>
      </SectionWrapper>

      {/* Why Nexaform */}
      <SectionWrapper secondary>
        <FadeUp>
          <h2 className="font-display font-bold text-3xl md:text-4xl tracking-tight text-foreground mb-3">
            Why businesses choose Nexaform
          </h2>
          <p className="text-muted-foreground leading-relaxed max-w-[65ch] mb-10">
            We combine product thinking, modern development practices, and practical business understanding to build software that creates real value.
          </p>
        </FadeUp>
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {whyCards.map((c) => (
            <StaggerItem key={c.title}>
              <ServiceCard icon={c.icon} title={c.title} description={c.desc} />
            </StaggerItem>
          ))}
        </StaggerContainer>
      </SectionWrapper>

      {/* Case Studies */}
      <SectionWrapper>
        <FadeUp>
          <h2 className="font-display font-bold text-3xl md:text-4xl tracking-tight text-foreground mb-3">
            Selected work and digital solutions
          </h2>
          <p className="text-muted-foreground leading-relaxed max-w-[65ch] mb-10">
            Explore how Nexaform turns business challenges into practical digital products through thoughtful design, modern engineering, and scalable systems.
          </p>
        </FadeUp>
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <StaggerItem>
            <CaseStudyCard
              title="Operations Dashboard for a Growing Team"
              description="We transformed scattered reporting and manual tracking into a centralized digital dashboard for daily operations and performance visibility."
              outcome="Faster reporting, clearer insights, and improved team coordination."
              tags={["Dashboard", "Operations"]}
            />
          </StaggerItem>
          <StaggerItem>
            <CaseStudyCard
              title="Custom Workflow System for Service Delivery"
              description="We built a tailored internal platform that streamlined requests, approvals, and task tracking across teams."
              outcome="Reduced manual bottlenecks and improved process efficiency."
              tags={["Platform", "Workflow"]}
            />
          </StaggerItem>
          <StaggerItem>
            <CaseStudyCard
              title="Modern Web Platform for Business Growth"
              description="We designed and developed a high-performance web platform focused on clarity, trust, and conversion."
              outcome="Stronger digital presence and a better user experience for customers."
              tags={["Web", "Growth"]}
            />
          </StaggerItem>
        </StaggerContainer>
        <FadeUp>
          <Link to="/case-studies">
            <Button variant="outline" className="gap-2">
              View All Case Studies <ArrowRight size={16} />
            </Button>
          </Link>
        </FadeUp>
      </SectionWrapper>

      {/* Process */}
      <SectionWrapper secondary>
        <FadeUp>
          <h2 className="font-display font-bold text-3xl md:text-4xl tracking-tight text-foreground mb-3">
            How we build digital systems
          </h2>
          <p className="text-muted-foreground leading-relaxed max-w-[65ch] mb-10">
            We follow a practical and collaborative process that keeps projects focused, efficient, and aligned with real business outcomes.
          </p>
        </FadeUp>
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {processSteps.map((step) => (
            <StaggerItem key={step.num}>
              <div className="card-surface rounded-card p-6 relative">
                <div className="font-mono text-sm text-primary mb-3">{step.num}</div>
                <div className="w-2 h-2 rounded-full bg-primary mb-4 shadow-[0_0_8px_rgba(59,130,246,0.5)]" />
                <h3 className="font-display font-semibold text-foreground mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{step.desc}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </SectionWrapper>

      {/* Tech Stack */}
      <SectionWrapper>
        <FadeUp>
          <h2 className="font-display font-bold text-3xl md:text-4xl tracking-tight text-foreground mb-8 text-center">
            Technologies we use
          </h2>
        </FadeUp>
        <FadeUp delay={0.1}>
          <div className="flex flex-wrap justify-center gap-3">
            {techStack.map((tech) => (
              <span
                key={tech}
                className="font-mono text-[12px] tracking-widest uppercase text-muted-foreground bg-card border border-border/50 px-4 py-2 rounded-lg hover:border-primary/30 hover:text-foreground transition-colors duration-200"
              >
                {tech}
              </span>
            ))}
          </div>
        </FadeUp>
      </SectionWrapper>

      {/* Blog Preview */}
      <SectionWrapper secondary>
        <FadeUp>
          <h2 className="font-display font-bold text-3xl md:text-4xl tracking-tight text-foreground mb-3">
            Insights on software, systems, and digital growth
          </h2>
          <p className="text-muted-foreground leading-relaxed max-w-[65ch] mb-10">
            Read practical articles on software development, custom digital systems, modern product thinking, AI-assisted workflows, and the future of building on the web.
          </p>
        </FadeUp>
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {blogPreviews.map((post) => (
            <StaggerItem key={post.title}>
              <div className="card-surface card-surface-hover rounded-card p-6">
                <div className="font-mono text-[11px] tracking-widest uppercase text-primary mb-3">Article</div>
                <h3 className="font-display font-semibold text-foreground mb-3">{post.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{post.desc}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
        <FadeUp>
          <Link to="/blog">
            <Button variant="outline" className="gap-2">
              Read the Blog <ArrowRight size={16} />
            </Button>
          </Link>
        </FadeUp>
      </SectionWrapper>

      {/* Vibenest */}
      <SectionWrapper>
        <FadeUp>
          <div className="card-surface rounded-card p-8 md:p-12 text-center max-w-2xl mx-auto">
            <h2 className="font-display font-semibold text-xl text-foreground mb-3">
              Part of the Nexaform ecosystem
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-5">
              Nexaform also supports <span className="text-foreground">Vibenest</span>, a learning initiative focused on vibe coding and practical AI-assisted development.
            </p>
            <Button variant="outline" size="sm">Learn More Soon</Button>
          </div>
        </FadeUp>
      </SectionWrapper>

      {/* Final CTA */}
      <section className="relative section-padding overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-highlight/10 pointer-events-none" />
        <div className="container relative z-10 text-center max-w-2xl mx-auto">
          <FadeUp>
            <h2 className="font-display font-bold text-3xl md:text-4xl tracking-tight gradient-text mb-5">
              Need software built for the future?
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-8">
              Let's build a digital system that supports your business today and scales with you tomorrow.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link to="/contact">
                <Button variant="gradient" size="lg">Start a Project</Button>
              </Link>
              <Link to="/contact">
                <Button variant="outline" size="lg">Contact Nexaform</Button>
              </Link>
            </div>
          </FadeUp>
        </div>
      </section>
    </div>
  );
};

export default Index;
