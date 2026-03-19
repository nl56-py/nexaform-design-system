import { PageHero } from '@/components/PageHero';
import { CTASection } from '@/components/CTASection';

const studies = [
  {
    title: 'Operations dashboard for leadership reporting',
    problem: 'Leadership relied on fragmented spreadsheets and manual reporting to understand delivery and team performance.',
    solution: 'We built a central dashboard pulling data from multiple operational systems into one usable reporting layer.',
    impact: 'Faster decisions, clearer visibility, and less manual reporting overhead.',
  },
  {
    title: 'AI service intake for a delivery business',
    problem: 'Requests arrived through multiple channels and required manual triage before any useful work could begin.',
    solution: 'We designed an intake workflow that captured context, generated summaries, and routed work with human approvals in place.',
    impact: 'Faster response times and less time lost to repetitive back-and-forth.',
  },
  {
    title: 'Client portal for a productized service',
    problem: 'Customers lacked a structured place to submit requests, review deliverables, and track service progress.',
    solution: 'We built a branded portal with workflow checkpoints, account context, and structured output delivery.',
    impact: 'A better customer experience and a more scalable service model.',
  },
  {
    title: 'Modern web platform for business growth',
    problem: 'An outdated web presence was limiting trust, usability, and conversion for a growing business.',
    solution: 'We redesigned the platform around clearer UX, stronger messaging, and a more maintainable technical foundation.',
    impact: 'Improved credibility, stronger user journeys, and a healthier base for future growth.',
  },
];

export const metadata = {
  title: 'Case Studies - Nexaform',
  description:
    'Examples of software platforms, dashboards, automation flows, and product experiences designed for real business growth.',
};

export default function CaseStudiesPage() {
  return (
    <div className="space-y-20 pb-24">
      <PageHero
        subtitle="Case studies"
        title="A broader portfolio of software, dashboards, products, and automation"
        paragraph="The portfolio now reflects the broader company profile again, showing a mix of software projects, internal systems, digital products, and AI-enabled workflow improvements."
        imageSrc="/case-board.svg"
        imageAlt="Illustration representing portfolio and case study highlights"
      />

      <section className="py-20">
        <div className="container grid gap-6 lg:grid-cols-2">
          {studies.map((study, index) => (
            <article key={study.title} className="rounded-[2rem] border border-border bg-panel p-8 shadow-panel">
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-accentPrimary">Case 0{index + 1}</p>
              <h2 className="mt-4 font-display text-3xl font-semibold text-textPrimary">{study.title}</h2>
              <div className="mt-6 grid gap-4 text-sm text-textSecondary">
                <div>
                  <p className="font-semibold text-textPrimary">Problem</p>
                  <p className="mt-1">{study.problem}</p>
                </div>
                <div>
                  <p className="font-semibold text-textPrimary">Solution</p>
                  <p className="mt-1">{study.solution}</p>
                </div>
                <div>
                  <p className="font-semibold text-textPrimary">Impact</p>
                  <p className="mt-1">{study.impact}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section-grid border-y border-border bg-backgroundSecondary py-20">
        <div className="container grid gap-6 md:grid-cols-3">
          {[
            ['Software engagements', 'Web apps, custom systems, dashboards, and backend architecture for real business workflows.'],
            ['Automation engagements', 'AI consulting, workflow routing, integrations, and operational efficiency improvements.'],
            ['Product engagements', 'Client-facing platforms and digital products designed for usability, trust, and growth.'],
          ].map(([title, description]) => (
            <div key={title} className="rounded-3xl border border-border bg-panel p-6 shadow-panel">
              <h3 className="font-display text-2xl font-semibold text-textPrimary">{title}</h3>
              <p className="mt-3 text-sm text-textSecondary">{description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-20">
        <div className="container">
          <CTASection
            headline="Need a software platform, automation system, or product experience designed around your business?"
            paragraph="We can start with strategy, move into design and implementation, and support the system after launch."
            primaryLabel="Start a Conversation"
            primaryHref="/contact"
            secondaryLabel="See Services"
            secondaryHref="/services"
          />
        </div>
      </section>
    </div>
  );
}
