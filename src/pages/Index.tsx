import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import SectionWrapper, { FadeUp, StaggerContainer, StaggerItem } from "@/components/SectionWrapper";
import ServiceCard from "@/components/ServiceCard";
import CaseStudyCard from "@/components/CaseStudyCard";
import WaveDivider from "@/components/WaveDivider";
import DeviceMockup from "@/components/DeviceMockup";
import TestimonialSlider from "@/components/TestimonialSlider";
import heroDeveloper from "@/assets/hero-developer.png";
import heroWave from "@/assets/hero-wave.png";
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

const showcaseProjects = [
  {
    title: "Operations Dashboard for a Growing Team",
    description: "We transformed scattered reporting and manual tracking into a centralized digital dashboard for daily operations and performance visibility.",
    outcome: "Faster reporting, clearer insights, and improved team coordination.",
    tags: ["Dashboard", "Operations"],
    accent: "primary" as const,
  },
  {
    title: "Custom Workflow System for Service Delivery",
    description: "We built a tailored internal platform that streamlined requests, approvals, and task tracking across teams.",
    outcome: "Reduced manual bottlenecks and improved process efficiency.",
    tags: ["Platform", "Workflow"],
    accent: "accent" as const,
  },
  {
    title: "Modern Web Platform for Business Growth",
    description: "We designed and developed a high-performance web platform focused on clarity, trust, and conversion.",
    outcome: "Stronger digital presence and a better user experience for customers.",
    tags: ["Web", "Growth"],
    accent: "highlight" as const,
  },
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

            {/* Hero visual — SVG workspace illustration */}
            <FadeUp delay={0.3} className="hidden lg:block">
              <div className="relative">
                <svg viewBox="0 0 500 400" className="w-full h-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
                  {/* Background glow */}
                  <defs>
                    <radialGradient id="hero-glow" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="hsl(217,91%,60%)" stopOpacity="0.15" />
                      <stop offset="100%" stopColor="transparent" stopOpacity="0" />
                    </radialGradient>
                    <linearGradient id="hero-accent" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="hsl(217,91%,60%)" />
                      <stop offset="100%" stopColor="hsl(188,86%,53%)" />
                    </linearGradient>
                  </defs>
                  <circle cx="250" cy="200" r="180" fill="url(#hero-glow)" />

                  {/* Grid lines */}
                  {[100, 150, 200, 250, 300].map((y) => (
                    <line key={`h-${y}`} x1="80" y1={y} x2="420" y2={y} stroke="hsl(218,33%,21%)" strokeWidth="0.5" opacity="0.4" />
                  ))}
                  {[120, 180, 240, 300, 360].map((x) => (
                    <line key={`v-${x}`} x1={x} y1="80" x2={x} y2="320" stroke="hsl(218,33%,21%)" strokeWidth="0.5" opacity="0.4" />
                  ))}

                  {/* Main monitor */}
                  <rect x="110" y="90" width="280" height="180" rx="12" fill="hsl(222,40%,13%)" stroke="hsl(218,33%,21%)" strokeWidth="1" />
                  <rect x="120" y="100" width="260" height="155" rx="6" fill="hsl(222,33%,11%)" />

                  {/* Screen content - sidebar */}
                  <rect x="125" y="108" width="50" height="140" rx="4" fill="hsl(222,40%,13%)" opacity="0.8" />
                  <rect x="132" y="116" width="36" height="3" rx="1.5" fill="url(#hero-accent)" opacity="0.4" />
                  <rect x="132" y="125" width="28" height="2" rx="1" fill="hsl(215,20%,65%)" opacity="0.2" />
                  <rect x="132" y="132" width="32" height="2" rx="1" fill="hsl(215,20%,65%)" opacity="0.15" />
                  <rect x="132" y="139" width="24" height="2" rx="1" fill="hsl(215,20%,65%)" opacity="0.15" />

                  {/* Screen content - main area */}
                  <rect x="182" y="108" width="192" height="28" rx="4" fill="hsl(217,91%,60%)" opacity="0.08" />
                  <rect x="190" y="115" width="60" height="3" rx="1.5" fill="url(#hero-accent)" opacity="0.3" />
                  <rect x="190" y="122" width="40" height="2" rx="1" fill="hsl(215,20%,65%)" opacity="0.2" />

                  {/* Chart bars */}
                  {[0, 1, 2, 3, 4, 5, 6].map((i) => {
                    const h = [24, 38, 18, 44, 30, 50, 35][i];
                    return (
                      <rect
                        key={`bar-${i}`}
                        x={192 + i * 24}
                        y={200 - h}
                        width="14"
                        height={h}
                        rx="2"
                        fill="url(#hero-accent)"
                        opacity={0.15 + i * 0.05}
                      />
                    );
                  })}

                  {/* Cards row */}
                  <rect x="182" y="210" width="58" height="35" rx="4" fill="hsl(222,40%,13%)" stroke="hsl(218,33%,21%)" strokeWidth="0.5" />
                  <rect x="248" y="210" width="58" height="35" rx="4" fill="hsl(222,40%,13%)" stroke="hsl(218,33%,21%)" strokeWidth="0.5" />
                  <rect x="314" y="210" width="58" height="35" rx="4" fill="hsl(222,40%,13%)" stroke="hsl(218,33%,21%)" strokeWidth="0.5" />

                  {/* Monitor stand */}
                  <rect x="220" y="272" width="60" height="6" rx="3" fill="hsl(218,33%,21%)" />
                  <rect x="235" y="278" width="30" height="12" rx="2" fill="hsl(218,33%,21%)" opacity="0.6" />

                  {/* Floating elements */}
                  <g opacity="0.9">
                    <rect x="30" y="130" width="65" height="45" rx="8" fill="hsl(222,40%,13%)" stroke="hsl(188,86%,53%)" strokeWidth="0.5" opacity="0.8" />
                    <text x="48" y="152" fontSize="8" fill="hsl(188,86%,53%)" opacity="0.6" fontFamily="monospace">{"{ }"}</text>
                    <text x="40" y="166" fontSize="6" fill="hsl(215,20%,65%)" opacity="0.4" fontFamily="monospace">config</text>
                  </g>

                  <g opacity="0.9">
                    <rect x="405" y="110" width="70" height="50" rx="8" fill="hsl(222,40%,13%)" stroke="hsl(263,86%,65%)" strokeWidth="0.5" opacity="0.8" />
                    <text x="425" y="135" fontSize="7" fill="hsl(263,86%,65%)" opacity="0.6" fontFamily="monospace">{"</ >"}</text>
                    <text x="418" y="150" fontSize="6" fill="hsl(215,20%,65%)" opacity="0.4" fontFamily="monospace">deploy</text>
                  </g>

                  {/* Glowing dots */}
                  <circle cx="95" cy="200" r="3" fill="hsl(188,86%,53%)" opacity="0.6">
                    <animate attributeName="opacity" values="0.3;0.8;0.3" dur="3s" repeatCount="indefinite" />
                  </circle>
                  <circle cx="410" cy="250" r="3" fill="hsl(263,86%,65%)" opacity="0.6">
                    <animate attributeName="opacity" values="0.5;1;0.5" dur="2.5s" repeatCount="indefinite" />
                  </circle>
                  <circle cx="250" cy="340" r="2" fill="hsl(217,91%,60%)" opacity="0.5">
                    <animate attributeName="opacity" values="0.3;0.7;0.3" dur="4s" repeatCount="indefinite" />
                  </circle>

                  {/* Connection lines */}
                  <line x1="95" y1="155" x2="110" y2="150" stroke="hsl(188,86%,53%)" strokeWidth="0.5" opacity="0.3" strokeDasharray="3 3" />
                  <line x1="390" y1="135" x2="405" y2="130" stroke="hsl(263,86%,65%)" strokeWidth="0.5" opacity="0.3" strokeDasharray="3 3" />
                </svg>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      <WaveDivider variant="blue" />

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
      <SectionWrapper className="gradient-section-blue">
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

      <WaveDivider variant="purple" />

      {/* Why Nexaform */}
      <SectionWrapper secondary className="gradient-section-purple">
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

      {/* Project Showcase — alternating layout */}
      <SectionWrapper>
        <FadeUp>
          <h2 className="font-display font-bold text-3xl md:text-4xl tracking-tight text-foreground mb-3">
            Selected work and digital solutions
          </h2>
          <p className="text-muted-foreground leading-relaxed max-w-[65ch] mb-12">
            Explore how Nexaform turns business challenges into practical digital products through thoughtful design, modern engineering, and scalable systems.
          </p>
        </FadeUp>

        <div className="space-y-16">
          {showcaseProjects.map((project, i) => (
            <FadeUp key={project.title} delay={i * 0.1}>
              <div className={`grid grid-cols-1 lg:grid-cols-2 gap-10 items-center ${i % 2 === 1 ? "lg:direction-rtl" : ""}`}>
                <div className={`${i % 2 === 1 ? "lg:order-2" : ""}`}>
                  <DeviceMockup type="laptop" accentColor={project.accent} />
                </div>
                <div className={`${i % 2 === 1 ? "lg:order-1" : ""}`}>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {project.tags.map((tag) => (
                      <span key={tag} className="font-mono text-[11px] tracking-widest uppercase text-accent bg-accent/10 px-2 py-0.5 rounded">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h3 className="font-display font-semibold text-2xl text-foreground mb-3">{project.title}</h3>
                  <p className="text-muted-foreground leading-relaxed mb-4">{project.description}</p>
                  <p className="text-sm">
                    <span className="text-accent font-medium">Outcome:</span>{" "}
                    <span className="text-muted-foreground">{project.outcome}</span>
                  </p>
                </div>
              </div>
            </FadeUp>
          ))}
        </div>

        <FadeUp className="mt-10">
          <Link to="/case-studies">
            <Button variant="outline" className="gap-2">
              View All Case Studies <ArrowRight size={16} />
            </Button>
          </Link>
        </FadeUp>
      </SectionWrapper>

      <WaveDivider variant="cyan" />

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

      {/* Tech Stack — scrolling logo strip */}
      <SectionWrapper className="gradient-section-cyan">
        <FadeUp>
          <h2 className="font-display font-bold text-3xl md:text-4xl tracking-tight text-foreground mb-8 text-center">
            Technologies we use
          </h2>
        </FadeUp>
        <FadeUp delay={0.1}>
          <div className="relative overflow-hidden py-4">
            {/* Fade edges */}
            <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
            <div className="logo-scroll flex gap-8 w-max">
              {[...techStack, ...techStack].map((tech, i) => (
                <span
                  key={`${tech}-${i}`}
                  className="font-mono text-[13px] tracking-widest uppercase text-muted-foreground bg-card/80 border border-border/40 px-6 py-3 rounded-lg backdrop-blur-sm whitespace-nowrap hover:border-primary/30 hover:text-foreground transition-colors duration-200"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </FadeUp>
      </SectionWrapper>

      <WaveDivider variant="blue" flip />

      {/* Testimonials */}
      <SectionWrapper secondary>
        <FadeUp>
          <h2 className="font-display font-bold text-3xl md:text-4xl tracking-tight text-foreground mb-3 text-center">
            What our clients say
          </h2>
          <p className="text-muted-foreground leading-relaxed max-w-[65ch] mx-auto mb-10 text-center">
            Trusted by teams building modern digital products and systems.
          </p>
        </FadeUp>
        <TestimonialSlider />
      </SectionWrapper>

      {/* Blog Preview */}
      <SectionWrapper className="gradient-section-purple">
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
