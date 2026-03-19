import { PageHero } from '@/components/PageHero';
import { SectionHeading } from '@/components/SectionHeading';
import { ServiceCard } from '@/components/ServiceCard';
import { CTASection } from '@/components/CTASection';
import { servicesPreview } from '@/lib/data/home';

const softwareServices = servicesPreview.slice(0, 6);
const automationServices = servicesPreview.slice(6);

const packages = [
  'Product discovery and UX planning',
  'Custom web application builds',
  'Backend architecture and integrations',
  'AI readiness audits and workflow mapping',
  'Automation implementation and support',
  'Cloud deployment and maintenance retainers',
];

export const metadata = {
  title: 'Services - Nexaform',
  description:
    'Software development, UX design, cloud delivery, AI automation consulting, and product systems for modern businesses.',
};

export default function ServicesPage() {
  return (
    <div className="space-y-20 pb-24">
      <PageHero
        subtitle="Services"
        title="A broader service stack: software, products, support, and AI automation"
        paragraph="The services page now combines your previous software capabilities with the newer automation and consulting offers, so the business reads as full-service again instead of narrowly AI-only."
        imageSrc="/services-matrix.svg"
        imageAlt="Illustration of software, product, and automation services"
      />

      <section className="py-20">
        <div className="container">
          <SectionHeading
            title="Software and digital product services"
            intro="These are the core services many clients need before or alongside automation work: product design, software development, backend systems, deployment, and support."
          />
          <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {softwareServices.map((service) => (
              <ServiceCard key={service.title} title={service.title} description={service.description} />
            ))}
          </div>
        </div>
      </section>

      <section className="section-grid border-y border-border bg-backgroundSecondary py-20">
        <div className="container">
          <SectionHeading
            subtitle="Automation services"
            title="AI and automation services that extend the broader product offering"
            intro="Automation is still a major part of the value proposition, but it now sits beside software delivery, not instead of it."
          />
          <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {automationServices.map((service) => (
              <ServiceCard key={service.title} title={service.title} description={service.description} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-[2rem] border border-border bg-panel p-8 shadow-panel">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-accentPrimary">How we package work</p>
            <h2 className="mt-4 font-display text-3xl font-semibold text-textPrimary">
              Clients can start with strategy, a build, or long-term support.
            </h2>
            <p className="mt-4 text-sm text-textSecondary">
              Some engagements begin with a consultation, others with a design sprint or direct software build.
              The service model is flexible enough to match startups, growing teams, and established businesses.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {packages.map((item) => (
              <div key={item} className="rounded-2xl border border-border bg-panel p-5 shadow-panel">
                <p className="text-sm font-medium text-textPrimary">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-backgroundSecondary py-20">
        <div className="container">
          <CTASection
            headline="Need a mix of software delivery and automation support?"
            paragraph="We can help with custom software, AI workflow design, product systems, and the support needed to keep them improving over time."
            primaryLabel="Request a Consultation"
            primaryHref="/contact"
            secondaryLabel="See Case Studies"
            secondaryHref="/case-studies"
          />
        </div>
      </section>
    </div>
  );
}
