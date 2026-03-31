import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import BlogPreviewCard from "@/components/BlogPreviewCard";
import PageHero from "@/components/PageHero";
import Seo from "@/components/Seo";
import SectionWrapper, { FadeUp, StaggerContainer, StaggerItem } from "@/components/SectionWrapper";
import { useQuery } from "@tanstack/react-query";
import { fetchPublishedBlogPosts } from "@/lib/blogs";
import {
  absoluteUrl,
  buildBreadcrumbSchema,
  buildItemListSchema,
  buildWebPageSchema,
  createTitle,
  toMetaDescription,
} from "@/lib/seo";

const categories = ["Software Development", "Web Applications", "Product Strategy", "AI & Automation", "Deployment & DevOps", "UX & Interface Design"];

const Blog = () => {
  const { data: articles = [], isLoading } = useQuery({
    queryKey: ["blog-posts"],
    queryFn: () => fetchPublishedBlogPosts(),
  });

  const pageTitle = createTitle("Blog and Software Insights");
  const pageDescription = toMetaDescription(
    "Read Nexaform articles on software development, custom web applications, AI automation, product strategy, UX, and digital systems.",
  );
  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Blog", path: "/blog" },
  ]);
  const structuredData = [
    breadcrumbSchema,
    buildWebPageSchema({
      title: pageTitle,
      description: pageDescription,
      path: "/blog",
      type: "Blog",
      breadcrumbId: `${absoluteUrl("/blog")}#breadcrumb`,
    }),
    ...(articles.length > 0
      ? [
          buildItemListSchema({
            path: "/blog",
            idSuffix: "articles",
            name: "Nexaform Blog Articles",
            items: articles.map((article) => ({
              name: article.title,
              path: `/blog/${article.slug}`,
            })),
          }),
        ]
      : []),
  ];

  return (
    <div>
      <Seo title={pageTitle} description={pageDescription} path="/blog" structuredData={structuredData} />

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

        {isLoading ? (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="card-surface rounded-card p-6 animate-pulse">
                <div className="h-3 w-24 bg-muted-foreground/10 rounded mb-4" />
                <div className="h-5 w-full bg-muted-foreground/10 rounded mb-3" />
                <div className="h-4 w-3/4 bg-muted-foreground/10 rounded" />
              </div>
            ))}
          </div>
        ) : (
          <StaggerContainer className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
            {articles.map((post) => (
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
        )}
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
};

export default Blog;
