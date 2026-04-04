import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import BlogPreviewCard from "@/components/BlogPreviewCard";
import Seo from "@/components/Seo";
import SectionWrapper, { FadeUp, StaggerContainer, StaggerItem } from "@/components/SectionWrapper";
import ServiceTreeSection from "@/components/ServiceTreeSection";
import WaveDivider from "@/components/WaveDivider";
import ConsultationJourneySection from "@/components/ConsultationJourneySection";
import BuildProcessSection from "@/components/BuildProcessSection";
import ProjectCard from "@/components/ProjectCard";
import TechStackShowcase from "@/components/TechStackShowcase";
import VibenestEcosystemSection from "@/components/VibenestEcosystemSection";
import heroDeveloper from "@/assets/hero-developer.png";
import heroWave from "@/assets/hero-wave.png";
import { fetchPublishedBlogPosts } from "@/lib/blogs";
import { fetchPublishedProjects } from "@/lib/projects";
import {
  buildItemListSchema,
  buildWebPageSchema,
  createTitle,
  toMetaDescription,
} from "@/lib/seo";

const Index = () => {
  const { data: featuredProjects = [] } = useQuery({
    queryKey: ["featured-projects"],
    queryFn: () => fetchPublishedProjects(3),
  });

  const { data: latestBlogPosts = [] } = useQuery({
    queryKey: ["home-blog-posts"],
    queryFn: () => fetchPublishedBlogPosts(3),
  });

  const pageTitle = createTitle("Custom Software Development Company in Nepal");
  const pageDescription = toMetaDescription(
    "Nexaform is a software development company in Nepal building custom web applications, scalable software, AI automation, and digital systems for businesses that want to operate smarter and grow with confidence.",
  );
  const structuredData = [
    buildWebPageSchema({
      title: pageTitle,
      description: pageDescription,
      path: "/",
      image: heroDeveloper,
    }),
    ...(featuredProjects.length > 0
      ? [
          buildItemListSchema({
            path: "/",
            idSuffix: "featured-projects",
            name: "Featured Nexaform Projects",
            items: featuredProjects.map((project) => ({
              name: project.title,
              path: `/projects/${project.slug}`,
            })),
          }),
        ]
      : []),
    ...(latestBlogPosts.length > 0
      ? [
          buildItemListSchema({
            path: "/",
            idSuffix: "latest-articles",
            name: "Latest Nexaform Articles",
            items: latestBlogPosts.map((post) => ({
              name: post.title,
              path: `/blog/${post.slug}`,
            })),
          }),
        ]
      : []),
  ];

  return (
    <div>
      <Seo
        title={pageTitle}
        description={pageDescription}
        path="/"
        image={heroDeveloper}
        structuredData={structuredData}
      />

      <section className="relative overflow-hidden pb-16 pt-28 md:pb-20 md:pt-36 lg:pb-24 lg:pt-40">
        <div className="pointer-events-none absolute inset-0 gradient-glow-bg" />
        <div className="pointer-events-none absolute right-0 top-1/2 h-[320px] w-[320px] -translate-y-1/2 rounded-full bg-primary/5 blur-3xl sm:h-[420px] sm:w-[420px] lg:h-[600px] lg:w-[600px]" />

        <div className="container relative z-10">
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(19rem,0.95fr)] lg:gap-12 xl:gap-16">
            <div className="max-w-2xl">
              <FadeUp>
                <span className="mb-6 inline-block rounded-full border border-accent/20 bg-accent/10 px-3 py-1.5 font-mono text-[12px] uppercase tracking-widest text-accent">
                  Custom Software • Web Apps • Digital Systems
                </span>
              </FadeUp>
              <FadeUp delay={0.1}>
                <h1 className="mb-6 text-balance font-display text-4xl font-bold tracking-tight gradient-text leading-[1.05] sm:text-5xl lg:text-[60px]">
                  Shaping future-ready digital systems
                </h1>
              </FadeUp>
              <FadeUp delay={0.2}>
                <p className="mb-4 max-w-[55ch] text-lg leading-relaxed text-muted-foreground">
                  Nexaform is a software development company in Nepal that designs and develops
                  custom web applications, scalable software, and modern digital systems for
                  businesses that want to operate smarter and grow with confidence.
                </p>
              </FadeUp>
              <FadeUp delay={0.25}>
                <p className="mb-8 max-w-[55ch] text-base leading-relaxed text-muted-foreground/70">
                  From idea validation and product design to engineering, deployment, and long-term
                  improvement, we help businesses turn complex workflows and ambitious ideas into
                  reliable digital products.
                </p>
              </FadeUp>
              <FadeUp delay={0.3}>
                <div className="mb-8 flex flex-wrap gap-3">
                  <Link to="/contact">
                    <Button variant="gradient" size="lg">Start a Project</Button>
                  </Link>
                  <Link to="/projects">
                    <Button variant="outline" size="lg">View Projects</Button>
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

            <FadeUp delay={0.3} className="mx-auto w-full max-w-[22rem] sm:max-w-[26rem] lg:max-w-[30rem] lg:justify-self-end xl:max-w-[32rem]">
              <div className="relative">
                <img
                  src={heroDeveloper}
                  alt="Developer working at desk illustration"
                  className="relative z-10 mx-auto h-auto w-full max-w-[420px] xl:max-w-[480px]"
                />
                <img
                  src={heroWave}
                  alt=""
                  className="pointer-events-none absolute -bottom-8 -left-6 w-[108%] opacity-40 xl:-left-8 xl:w-[120%]"
                />
                <div className="pointer-events-none absolute left-1/2 top-1/2 h-[240px] w-[240px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/5 blur-3xl xl:h-[300px] xl:w-[300px]" />
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      <WaveDivider variant="blue" />

      <ConsultationJourneySection />

      <ServiceTreeSection />

      <VibenestEcosystemSection />

      {featuredProjects.length > 0 && (
        <>
          <WaveDivider variant="purple" />

          <SectionWrapper>
            <FadeUp>
              <h2 className="mb-3 font-display text-3xl font-bold tracking-tight text-foreground md:text-4xl">
                Selected projects and digital systems
              </h2>
              <p className="mb-12 max-w-[65ch] leading-relaxed text-muted-foreground">
                Recent builds, internal tools, and digital platforms shaped around real workflows,
                practical delivery, and long-term business value.
              </p>
            </FadeUp>

            <StaggerContainer className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
              {featuredProjects.map((project) => (
                <StaggerItem key={project.id}>
                  <ProjectCard
                    title={project.title}
                    description={project.description}
                    outcome={project.outcome}
                    slug={project.slug}
                    tags={project.tags}
                    industry={project.industry}
                    coverImage={project.cover_image}
                  />
                </StaggerItem>
              ))}
            </StaggerContainer>

            <FadeUp className="mt-10">
              <Link to="/projects">
                <Button variant="outline" className="gap-2">
                  View All Projects <ArrowRight size={16} />
                </Button>
              </Link>
            </FadeUp>
          </SectionWrapper>
        </>
      )}

      <WaveDivider variant="cyan" />

      <BuildProcessSection />

      <SectionWrapper className="gradient-section-cyan">
        <FadeUp>
          <h2 className="mb-8 text-center font-display text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            Technologies we use
          </h2>
        </FadeUp>
        <FadeUp delay={0.1}>
          <TechStackShowcase />
        </FadeUp>
      </SectionWrapper>

      {latestBlogPosts.length > 0 && (
        <SectionWrapper className="gradient-section-purple">
          <FadeUp>
            <h2 className="mb-3 font-display text-3xl font-bold tracking-tight text-foreground md:text-4xl">
              Insights on software, systems, and digital growth
            </h2>
            <p className="mb-10 max-w-[65ch] leading-relaxed text-muted-foreground">
              Read practical articles on software development, custom digital systems, modern product
              thinking, AI-assisted workflows, and the future of building on the web.
            </p>
          </FadeUp>

          <StaggerContainer className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
            {latestBlogPosts.map((post) => (
              <StaggerItem key={post.id}>
                <BlogPreviewCard
                  category={post.category}
                  coverImage={post.cover_image}
                  excerpt={post.excerpt}
                  slug={post.slug}
                  title={post.title}
                />
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
      )}

      <WaveDivider variant="blue" flip />

      <section className="relative overflow-hidden section-padding">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-highlight/10" />
        <div className="container relative z-10 mx-auto max-w-2xl text-center">
          <FadeUp>
            <h2 className="mb-5 font-display text-3xl font-bold tracking-tight gradient-text md:text-4xl">
              Need software built for the future?
            </h2>
            <p className="mb-8 leading-relaxed text-muted-foreground">
              Let&apos;s build a digital system that supports your business today and scales with you tomorrow.
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
