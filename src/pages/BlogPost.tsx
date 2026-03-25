import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, ArrowRight, CalendarDays } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import PageHero from "@/components/PageHero";
import SectionWrapper, { FadeUp } from "@/components/SectionWrapper";
import { Button } from "@/components/ui/button";
import { fetchPublishedBlogPostBySlug } from "@/lib/blogs";

const formatPublishedDate = (value: string | null) => {
  if (!value) {
    return "Recently published";
  }

  return new Intl.DateTimeFormat("en", { dateStyle: "long" }).format(new Date(value));
};

const BlogPost = () => {
  const { slug = "" } = useParams();
  const { data: post, isLoading } = useQuery({
    queryKey: ["blog-post", slug],
    queryFn: () => fetchPublishedBlogPostBySlug(slug),
    enabled: Boolean(slug),
  });

  if (isLoading) {
    return (
      <SectionWrapper>
        <div className="mx-auto max-w-3xl animate-pulse space-y-4">
          <div className="h-4 w-32 rounded bg-muted-foreground/10" />
          <div className="h-10 w-full rounded bg-muted-foreground/10" />
          <div className="h-5 w-3/4 rounded bg-muted-foreground/10" />
          <div className="h-72 w-full rounded-[2rem] bg-muted-foreground/10" />
        </div>
      </SectionWrapper>
    );
  }

  if (!post) {
    return (
      <SectionWrapper>
        <div className="mx-auto max-w-2xl rounded-[2rem] border border-border/60 bg-card px-6 py-12 text-center shadow-sm">
          <p className="mb-3 font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground">
            Blog Post Not Found
          </p>
          <h1 className="mb-4 font-display text-3xl font-bold tracking-tight text-foreground">
            We couldn&apos;t find that article.
          </h1>
          <p className="mb-8 text-muted-foreground">
            The post may have been moved, unpublished, or the slug may be incorrect.
          </p>
          <Button asChild variant="outline" className="gap-2">
            <Link to="/blog">
              <ArrowLeft size={16} />
              Back to Blog
            </Link>
          </Button>
        </div>
      </SectionWrapper>
    );
  }

  return (
    <div>
      <PageHero
        badge={post.category}
        headline={post.title}
        subheadline={post.excerpt}
      >
        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
          <span className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-card/80 px-4 py-2">
            <CalendarDays size={16} className="text-primary" />
            {formatPublishedDate(post.published_at)}
          </span>
          {post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-border/60 bg-card/80 px-3 py-1 font-mono text-[11px] uppercase tracking-widest text-muted-foreground"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </PageHero>

      <SectionWrapper>
        <FadeUp className="mx-auto max-w-4xl">
          <Button asChild variant="ghost" className="mb-8 gap-2 pl-0 text-muted-foreground hover:text-foreground">
            <Link to="/blog">
              <ArrowLeft size={16} />
              Back to all articles
            </Link>
          </Button>

          {post.cover_image && (
            <div className="mb-10 overflow-hidden rounded-[2rem] border border-border/60 bg-card shadow-sm">
              <img
                src={post.cover_image}
                alt={post.title}
                className="h-auto w-full object-cover"
              />
            </div>
          )}

          <article className="rounded-[2rem] border border-border/60 bg-card px-6 py-8 shadow-sm md:px-10 md:py-10">
            {post.content ? (
              <div
                className="admin-rich-text prose prose-slate max-w-none text-base leading-relaxed"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />
            ) : (
              <p className="text-lg leading-relaxed text-muted-foreground">{post.excerpt}</p>
            )}
          </article>
        </FadeUp>
      </SectionWrapper>

      <section className="relative overflow-hidden section-padding">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-highlight/10" />
        <div className="container relative z-10 mx-auto max-w-2xl text-center">
          <FadeUp>
            <h2 className="mb-5 font-display text-3xl font-bold tracking-tight gradient-text md:text-4xl">
              Want more practical software insight?
            </h2>
            <p className="mb-8 leading-relaxed text-muted-foreground">
              Explore more posts on product strategy, digital systems, web applications, and AI-assisted delivery.
            </p>
            <Button asChild variant="outline" size="lg" className="gap-2">
              <Link to="/blog">
                Browse More Articles
                <ArrowRight size={16} />
              </Link>
            </Button>
          </FadeUp>
        </div>
      </section>
    </div>
  );
};

export default BlogPost;
