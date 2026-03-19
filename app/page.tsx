import { Hero } from '@/components/Hero';
import { SectionHeading } from '@/components/SectionHeading';
import { ServiceCard } from '@/components/ServiceCard';
import { FeatureCard } from '@/components/FeatureCard';
import { CaseStudyCard } from '@/components/CaseStudyCard';
import { TechStackGrid } from '@/components/TechStackGrid';
import { CTASection } from '@/components/CTASection';
import { StatsBlock } from '@/components/StatsBlock';
import { PrimaryButton } from '@/components/PrimaryButton';
import { SecondaryButton } from '@/components/SecondaryButton';
import { servicesPreview, whyNexaform, caseStudiesPreview, blogPostsPreview } from '@/lib/data/home';

const softwareTracks = servicesPreview.slice(0, 6);
const automationTracks = servicesPreview.slice(6);

const productTracks = [
  {
    title: 'Software delivery',
    description:
      'Web platforms, portals, backend systems, and custom software designed around your business model.',
  },
  {
    title: 'Automation and AI',
    description:
      'Consulting, workflow automation, and AI implementation where it improves operations and customer experience.',
  },
  {
    title: 'Support and scale',
    description:
      'Continuous improvement, maintenance, deployment, and product evolution after launch.',
  },
];

export const metadata = {
  title: 'Nexaform - software, automation, and digital products',
  description:
    'Software development, AI automation, and digital product delivery for teams that need practical systems and stronger execution.',
};

export default function Home() {
  return (
    <div className="space-y-24 pb-24">
      <Hero />

      <section className="section-grid border-y border-border bg-backgroundSecondary py-20">
        <div className="container">
          <SectionHeading
            subtitle="Our features"
            title="A service-led site built for modern software, automation, and growth"
            intro="The structure now reflects a broader service company again: custom software, web applications, product development, support, and AI automation sitting together instead of AI taking over the entire story."
          />
          <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {whyNexaform.map((item) => (
              <FeatureCard key={item.title} title={item.title} description={item.description} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container">
          <SectionHeading
            subtitle="Software services"
            title="Core digital services that support product and platform delivery"
            intro="Nexaform still covers the broader software stack: web platforms, custom systems, design, backend architecture, cloud deployment, and long-term support."
          />
          <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {softwareTracks.map((service) => (
              <ServiceCard key={service.title} title={service.title} description={service.description} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-backgroundSecondary py-20">
        <div className="container grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <SectionHeading
              subtitle="Automation and products"
              title="AI automation is part of the offer, not the whole offer"
              intro="We still help with automation, consulting, and AI-enabled systems, but as part of a broader delivery model that includes software engineering, UX, and product thinking."
            />
            <div className="mt-10 grid gap-5">
              {automationTracks.map((item) => (
                <div key={item.title} className="rounded-3xl border border-border bg-panel p-6 shadow-panel">
                  <h3 className="font-display text-2xl font-semibold text-textPrimary">{item.title}</h3>
                  <p className="mt-3 text-sm text-textSecondary">{item.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[2rem] border border-border bg-panel p-8 shadow-panel">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-accentPrimary">How it connects</p>
            <h3 className="mt-4 font-display text-3xl font-semibold text-textPrimary">
              Software, automation, and support should work as one system.
            </h3>
            <p className="mt-4 text-sm text-textSecondary">
              The strongest digital outcomes usually come from combining product strategy, design, engineering,
              automation, and post-launch support instead of treating them as disconnected tasks.
            </p>
            <div className="mt-8 grid gap-4">
              {productTracks.map((item, index) => (
                <div key={item.title} className="rounded-2xl border border-border bg-backgroundSecondary p-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.26em] text-accentSecondary">
                    0{index + 1}
                  </p>
                  <p className="mt-2 font-medium text-textPrimary">{item.title}</p>
                  <p className="mt-2 text-sm text-textSecondary">{item.description}</p>
                </div>
              ))}
            </div>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <PrimaryButton href="/services">See All Services</PrimaryButton>
              <SecondaryButton href="/contact">Talk Through a Project</SecondaryButton>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container">
          <SectionHeading
            subtitle="Recent work"
            title="A mix of software systems, automation, dashboards, and product delivery"
            intro="The project mix now reflects a broader company profile again instead of reading like an AI-only studio."
          />
          <div className="mt-12 grid gap-8 lg:grid-cols-3">
            {caseStudiesPreview.map((item) => (
              <CaseStudyCard
                key={item.title}
                title={item.title}
                description={item.description}
                outcome={item.outcome}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-backgroundSecondary py-20">
        <div className="container">
          <SectionHeading
            subtitle="Capabilities"
            title="From UX and backend systems to AI workflows and dashboards"
            intro="The stack now communicates a broader service capability across product design, system architecture, software development, and automation."
          />
          <div className="mt-12">
            <TechStackGrid />
          </div>
        </div>
      </section>

      <section className="bg-backgroundSecondary py-20">
        <div className="container">
          <SectionHeading
            subtitle="Insights"
            title="Writing across software, operations, product strategy, and automation"
            intro="The content now supports the broader service mix so the site no longer feels narrowed to one specialization."
          />
          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {blogPostsPreview.map((post) => (
              <article key={post.title} className="rounded-3xl border border-border bg-panel p-6 shadow-panel">
                <div className="flex items-center justify-between gap-3">
                  <span className="rounded-full bg-accentPrimary/10 px-3 py-1 text-xs font-semibold text-accentPrimary">
                    {post.category}
                  </span>
                  <span className="text-xs text-textSecondary">{post.date}</span>
                </div>
                <h3 className="mt-5 font-display text-2xl font-semibold text-textPrimary">{post.title}</h3>
                <p className="mt-3 text-sm text-textSecondary">{post.excerpt}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container">
          <CTASection
            headline="Need software, automation, or a digital product tailored to your business?"
            paragraph="We can help across custom software, web apps, AI automation, product systems, and the support needed to keep them growing."
            primaryLabel="Book a Consultation"
            primaryHref="/contact"
            secondaryLabel="View Services"
            secondaryHref="/services"
          />
        </div>
      </section>

      <section className="py-20">
        <div className="container">
          <StatsBlock />
        </div>
      </section>
    </div>
  );
}
