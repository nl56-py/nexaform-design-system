import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import PageHero from "@/components/PageHero";
import SectionWrapper, { FadeUp } from "@/components/SectionWrapper";
import { Button } from "@/components/ui/button";
import { fetchPublishedProjectBySlug } from "@/lib/projects";

const ProjectDetail = () => {
  const { slug = "" } = useParams();
  const { data: project, isLoading } = useQuery({
    queryKey: ["project-detail", slug],
    queryFn: () => fetchPublishedProjectBySlug(slug),
    enabled: Boolean(slug),
  });

  if (isLoading) {
    return (
      <SectionWrapper>
        <div className="mx-auto max-w-4xl animate-pulse space-y-4">
          <div className="h-4 w-32 rounded bg-muted-foreground/10" />
          <div className="h-10 w-full rounded bg-muted-foreground/10" />
          <div className="h-5 w-3/4 rounded bg-muted-foreground/10" />
          <div className="h-80 w-full rounded-[2rem] bg-muted-foreground/10" />
        </div>
      </SectionWrapper>
    );
  }

  if (!project) {
    return (
      <SectionWrapper>
        <div className="mx-auto max-w-2xl rounded-[2rem] border border-border/60 bg-card px-6 py-12 text-center shadow-sm">
          <p className="mb-3 font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground">
            Project Not Found
          </p>
          <h1 className="mb-4 font-display text-3xl font-bold tracking-tight text-foreground">
            We couldn&apos;t find that project.
          </h1>
          <p className="mb-8 text-muted-foreground">
            The case study may have moved, been unpublished, or the project slug may be incorrect.
          </p>
          <Button asChild variant="outline" className="gap-2">
            <Link to="/projects">
              <ArrowLeft size={16} />
              Back to Projects
            </Link>
          </Button>
        </div>
      </SectionWrapper>
    );
  }

  return (
    <div>
      <PageHero
        badge={project.industry || "Featured Project"}
        headline={project.title}
        subheadline={project.description}
        paragraph={project.outcome}
      >
        {project.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-border/60 bg-card/80 px-3 py-1 font-mono text-[11px] uppercase tracking-widest text-muted-foreground"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </PageHero>

      <SectionWrapper>
        <FadeUp className="mx-auto max-w-6xl">
          <Button asChild variant="ghost" className="mb-8 gap-2 pl-0 text-muted-foreground hover:text-foreground">
            <Link to="/projects">
              <ArrowLeft size={16} />
              Back to all projects
            </Link>
          </Button>

          {project.cover_image && (
            <div className="mb-8 overflow-hidden rounded-[2rem] border border-border/60 bg-secondary/25 shadow-sm">
              <div className="flex max-h-[34rem] min-h-[18rem] items-center justify-center bg-[radial-gradient(circle_at_top_left,rgba(59,130,246,0.08),transparent_42%),radial-gradient(circle_at_bottom_right,rgba(34,211,238,0.12),transparent_40%)] p-6 md:p-8">
                <img
                  src={project.cover_image}
                  alt={project.title}
                  className="max-h-[30rem] w-full object-contain"
                />
              </div>
            </div>
          )}

          <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_20rem]">
            <article className="rounded-[2rem] border border-border/60 bg-card px-6 py-8 shadow-sm md:px-10 md:py-10">
              {project.content ? (
                <div
                  className="admin-rich-text prose prose-slate max-w-none text-base leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: project.content }}
                />
              ) : (
                <div className="space-y-6">
                  <p className="text-base leading-relaxed text-muted-foreground">{project.description}</p>
                  <div className="rounded-[1.5rem] border border-border/50 bg-secondary/45 p-5">
                    <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-primary">
                      Outcome
                    </div>
                    <p className="mt-3 text-sm leading-7 text-foreground/85">{project.outcome}</p>
                  </div>
                </div>
              )}
            </article>

            <aside className="space-y-4">
              <div className="rounded-[1.5rem] border border-border/60 bg-card p-5 shadow-sm">
                <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-primary">
                  Outcome
                </div>
                <p className="mt-3 text-sm leading-7 text-foreground/85">{project.outcome}</p>
              </div>

              {project.industry && (
                <div className="rounded-[1.5rem] border border-border/60 bg-card p-5 shadow-sm">
                  <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-primary">
                    Industry
                  </div>
                  <p className="mt-3 text-sm leading-7 text-foreground/85">{project.industry}</p>
                </div>
              )}
            </aside>
          </div>
        </FadeUp>
      </SectionWrapper>

      <section className="relative overflow-hidden section-padding">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-highlight/10" />
        <div className="container relative z-10 mx-auto max-w-2xl text-center">
          <FadeUp>
            <h2 className="mb-5 font-display text-3xl font-bold tracking-tight gradient-text md:text-4xl">
              Want a project like this for your business?
            </h2>
            <p className="mb-8 leading-relaxed text-muted-foreground">
              Let&apos;s design a system that fits your workflow, your team, and the way you want to grow.
            </p>
            <Button asChild variant="gradient" size="lg" className="gap-2">
              <Link to="/contact">
                Start a Project
                <ArrowRight size={16} />
              </Link>
            </Button>
          </FadeUp>
        </div>
      </section>
    </div>
  );
};

export default ProjectDetail;
