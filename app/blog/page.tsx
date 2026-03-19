import { PageHero } from '@/components/PageHero';
import { BlogList } from '@/components/BlogList';
import type { BlogPost } from '@/components/BlogList';

const posts: BlogPost[] = [
  {
    title: 'How to choose between custom software and automation',
    excerpt: 'A practical framework for deciding whether a workflow needs a full platform, a smaller tool, or a targeted automation layer.',
    category: 'Product Strategy',
    date: 'Jan 20, 2026',
  },
  {
    title: 'Where AI automation creates the most value first',
    excerpt: 'How to identify the workflows where AI saves the most time without creating operational confusion.',
    category: 'AI & Automation',
    date: 'Feb 12, 2026',
  },
  {
    title: 'Designing dashboards that support decisions, not just reporting',
    excerpt: 'What makes dashboards useful for teams that need action, visibility, and better operating rhythm.',
    category: 'Operations',
    date: 'Mar 6, 2026',
  },
  {
    title: 'When consulting should come before product development',
    excerpt: 'Why strategy and systems mapping can reduce wasted build effort long before a dashboard or portal exists.',
    category: 'Consulting',
    date: 'Mar 16, 2026',
  },
  {
    title: 'UI and UX choices that make business software easier to adopt',
    excerpt: 'How interface clarity, workflow cues, and content structure help teams actually use internal platforms.',
    category: 'Systems Design',
    date: 'Mar 21, 2026',
  },
  {
    title: 'What to include in a digital product support plan',
    excerpt: 'A practical look at maintenance, iteration, monitoring, and feature planning after launch.',
    category: 'Product Strategy',
    date: 'Apr 2, 2026',
  },
];

export const metadata = {
  title: 'Insights - Nexaform',
  description:
    'Writing on software strategy, operations, UX, digital products, and AI automation for modern businesses.',
};

export default function BlogPage() {
  return (
    <div className="space-y-20 pb-24">
      <PageHero
        subtitle="Insights"
        title="Practical thinking across software, products, operations, and automation"
        paragraph="The blog now supports the broader service mix so the site speaks to software delivery, design, platform strategy, and AI automation together."
        imageSrc="/insights-wave.svg"
        imageAlt="Illustration representing insights, content, and digital strategy"
      />

      <section className="py-20">
        <div className="container">
          <BlogList posts={posts} />
        </div>
      </section>
    </div>
  );
}
