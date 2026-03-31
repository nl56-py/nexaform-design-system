import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { ArrowRight } from "lucide-react";
import Seo from "@/components/Seo";
import { Button } from "@/components/ui/button";
import PageHero from "@/components/PageHero";
import ProjectCard from "@/components/ProjectCard";
import SectionWrapper, { FadeUp, StaggerContainer, StaggerItem } from "@/components/SectionWrapper";
import { fetchPublishedProjects } from "@/lib/projects";
import {
  absoluteUrl,
  buildBreadcrumbSchema,
  buildItemListSchema,
  buildWebPageSchema,
  createTitle,
  toMetaDescription,
} from "@/lib/seo";

const Projects = () => {
  const { data: projects = [], isLoading } = useQuery({
    queryKey: ["projects"],
    queryFn: () => fetchPublishedProjects(),
  });

  const pageTitle = createTitle("Custom Software Projects and Case Studies");
  const pageDescription = toMetaDescription(
    "Browse Nexaform case studies, project work, and digital systems built around custom software, business workflows, and practical product delivery.",
  );
  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Projects", path: "/projects" },
  ]);
  const structuredData = [
    breadcrumbSchema,
    buildWebPageSchema({
      title: pageTitle,
      description: pageDescription,
      path: "/projects",
      type: "CollectionPage",
      breadcrumbId: `${absoluteUrl("/projects")}#breadcrumb`,
    }),
    ...(projects.length > 0
      ? [
          buildItemListSchema({
            path: "/projects",
            idSuffix: "projects",
            name: "Nexaform Case Studies",
            items: projects.map((project) => ({
              name: project.title,
              path: `/projects/${project.slug}`,
            })),
          }),
        ]
      : []),
  ];

  return (
    <div>
      <Seo title={pageTitle} description={pageDescription} path="/projects" structuredData={structuredData} />

      <PageHero
        headline="Projects built around real business needs"
        subheadline="Explore how Nexaform turns software challenges, internal workflows, and growth goals into practical digital products."
        paragraph="These projects show how custom platforms, operations tools, dashboards, and modern web experiences can create clarity, efficiency, and long-term value."
      />

      <SectionWrapper>
        <FadeUp>
          <h2 className="mb-3 font-display text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            Featured projects
          </h2>
          <p className="mb-10 max-w-[65ch] leading-relaxed text-muted-foreground">
            Every build is shaped by the business problem behind it. We focus on useful systems,
            sharp execution, and outcomes that matter beyond launch.
          </p>
        </FadeUp>

        {isLoading ? (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
            {[1, 2, 3].map((index) => (
              <div key={index} className="card-surface overflow-hidden rounded-card animate-pulse">
                <div className="aspect-[16/10] bg-muted/15" />
                <div className="space-y-3 p-6">
                  <div className="h-4 w-24 rounded-full bg-muted/15" />
                  <div className="h-5 w-3/4 rounded-full bg-muted/15" />
                  <div className="h-4 w-full rounded-full bg-muted/10" />
                  <div className="h-4 w-2/3 rounded-full bg-muted/10" />
                </div>
              </div>
            ))}
          </div>
        ) : projects.length > 0 ? (
          <StaggerContainer className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
            {projects.map((project) => (
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
        ) : (
          <div className="rounded-[2rem] border border-dashed border-border/60 bg-secondary/35 px-6 py-16 text-center">
            <div className="font-display text-2xl font-semibold text-foreground">No projects published yet</div>
            <p className="mx-auto mt-3 max-w-[52ch] text-sm leading-7 text-muted-foreground">
              The public projects collection is currently empty. Once you publish projects from the admin panel,
              they will appear here automatically.
            </p>
            <div className="mt-8">
              <Link to="/contact">
                <Button variant="gradient" size="lg">
                  Start a Project
                </Button>
              </Link>
            </div>
          </div>
        )}
      </SectionWrapper>

      <section className="relative overflow-hidden section-padding">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-highlight/10 pointer-events-none" />
        <div className="container relative z-10 mx-auto max-w-2xl text-center">
          <FadeUp>
            <h2 className="mb-5 font-display text-3xl font-bold tracking-tight gradient-text md:text-4xl">
              Need a project like this for your business?
            </h2>
            <p className="mb-8 leading-relaxed text-muted-foreground">
              Let&apos;s talk about the workflow, product, or platform you want to build next.
            </p>
            <Link to="/contact">
              <Button variant="gradient" size="lg" className="gap-2">
                Talk to Nexaform <ArrowRight size={16} />
              </Button>
            </Link>
          </FadeUp>
        </div>
      </section>
    </div>
  );
};

export default Projects;
