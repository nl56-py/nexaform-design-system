import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import PageHero from "@/components/PageHero";
import SectionWrapper, { FadeUp, StaggerContainer, StaggerItem } from "@/components/SectionWrapper";
import { ArrowRight } from "lucide-react";

const categories = ["Software Development", "Web Applications", "Product Strategy", "AI & Automation", "Deployment & DevOps", "UX & Interface Design"];

const articles = [
  {
    title: "What makes a digital system future-ready?",
    desc: "A practical look at the qualities that help software stay useful, scalable, and adaptable over time.",
    category: "Software Development",
  },
  {
    title: "Custom software vs off-the-shelf tools for growing businesses",
    desc: "How to evaluate when a tailored system creates more value than a general-purpose platform.",
    category: "Product Strategy",
  },
  {
    title: "How AI-assisted workflows are changing software development",
    desc: "A grounded perspective on how modern teams can use AI tools without losing clarity, quality, or direction.",
    category: "AI & Automation",
  },
];

const Blog = () => (
  <div>
    <PageHero
      headline="Blog and insights"
      subheadline="Practical writing on software development, digital systems, product strategy, AI-assisted workflows, and building for the future."
      paragraph="Our blog shares ideas, lessons, and practical perspectives on creating better digital products — from product thinking and interface design to backend systems and modern development workflows."
    />

    <SectionWrapper>
      <FadeUp>
        <h2 className="font-display font-bold text-3xl md:text-4xl tracking-tight text-foreground mb-3">
          What we write about
        </h2>
        <p className="text-muted-foreground leading-relaxed max-w-[65ch] mb-6">
          We publish content for businesses, builders, and teams interested in software development, product design, web platforms, modern workflows, and the future of digital systems.
        </p>
      </FadeUp>
      <FadeUp delay={0.1}>
        <div className="flex flex-wrap gap-2 mb-12">
          {categories.map((cat) => (
            <span
              key={cat}
              className="font-mono text-[11px] tracking-widest uppercase text-muted-foreground bg-card border border-border/50 px-3 py-1.5 rounded-lg hover:border-primary/30 hover:text-foreground transition-colors duration-200 cursor-pointer"
            >
              {cat}
            </span>
          ))}
        </div>
      </FadeUp>

      <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {articles.map((post) => (
          <StaggerItem key={post.title}>
            <div className="card-surface card-surface-hover rounded-card p-6 flex flex-col h-full">
              <span className="font-mono text-[11px] tracking-widest uppercase text-primary mb-3">
                {post.category}
              </span>
              <h3 className="font-display font-semibold text-lg text-foreground mb-3">{post.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed flex-1">{post.desc}</p>
              <div className="mt-4 pt-4 border-t border-border/30">
                <span className="text-sm text-primary flex items-center gap-1 hover:gap-2 transition-all duration-200 cursor-pointer">
                  Read more <ArrowRight size={14} />
                </span>
              </div>
            </div>
          </StaggerItem>
        ))}
      </StaggerContainer>
    </SectionWrapper>

    <section className="relative section-padding overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-highlight/10 pointer-events-none" />
      <div className="container relative z-10 text-center max-w-2xl mx-auto">
        <FadeUp>
          <h2 className="font-display font-bold text-3xl md:text-4xl tracking-tight gradient-text mb-5">
            Looking for practical insight, not just trends?
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-8">
            Explore articles designed to help businesses and builders think more clearly about software, systems, and digital growth.
          </p>
          <Button variant="gradient" size="lg">Read the Blog</Button>
        </FadeUp>
      </div>
    </section>
  </div>
);

export default Blog;
