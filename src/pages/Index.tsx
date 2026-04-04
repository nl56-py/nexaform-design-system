import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import AnimatedHeroSection from "@/components/AnimatedHeroSection";
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

      <AnimatedHeroSection />

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
              Read practical articles on software development, custom digital systems, modern
              product thinking, AI-assisted workflows, and the future of building on the web.
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
              Let&apos;s build a digital system that supports your business today and scales with
              you tomorrow.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link to="/contact">
                <Button variant="gradient" size="lg">
                  Start a Project
                </Button>
              </Link>
              <Link to="/contact">
                <Button variant="outline" size="lg">
                  Contact Nexaform
                </Button>
              </Link>
            </div>
          </FadeUp>
        </div>
      </section>
    </div>
  );
};

export default Index;
