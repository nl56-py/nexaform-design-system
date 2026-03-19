import { PageHero } from '@/components/PageHero';
import { CTASection } from '@/components/CTASection';

const process = [
  ['01', 'Understand the business model', 'We start by understanding how value is created, where work gets stuck, and what kind of system would actually help.'],
  ['02', 'Define the right delivery path', 'Some projects need design and software first, others need workflow automation or system integration earlier.'],
  ['03', 'Design the architecture', 'We shape the experience, the backend flow, the integrations, and the automation logic as one connected system.'],
  ['04', 'Build in validated steps', 'We work in increments so software, features, and automations are reviewed before they become expensive mistakes.'],
  ['05', 'Launch and improve', 'After launch, we help with optimization, support, and the next layer of growth for the product or system.'],
];

const principles = [
  'Use AI and automation where they clearly improve delivery, not just because they are fashionable.',
  'Build software that feels practical to use, not just impressive to present.',
  'Keep design, engineering, and business thinking connected throughout the project.',
  'Support clients beyond launch so products continue to improve over time.',
];

export const metadata = {
  title: 'About - Nexaform',
  description:
    'Learn how Nexaform approaches software delivery, product thinking, system design, and AI automation for modern businesses.',
};

export default function AboutPage() {
  return (
    <div className="space-y-20 pb-24">
      <PageHero
        subtitle="About us"
        title="A practical digital partner for software, products, and automation"
        paragraph="Nexaform is not positioned as only an AI company. It is now framed as a broader digital partner that designs and builds software systems, customer products, internal tools, and automation where it adds real value."
        imageSrc="/about-flow.svg"
        imageAlt="Illustration of Nexaform's process and delivery flow"
      />

      <section className="py-20">
        <div className="container grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-6">
            <div className="rounded-3xl border border-border bg-panel p-8 shadow-panel">
              <h2 className="font-display text-3xl font-semibold text-textPrimary">Mission</h2>
              <p className="mt-4 text-sm text-textSecondary">
                To help businesses grow with stronger digital systems, better products, and smarter operations
                through design, engineering, and carefully applied automation.
              </p>
            </div>
            <div className="rounded-3xl border border-border bg-panel p-8 shadow-panel">
              <h2 className="font-display text-3xl font-semibold text-textPrimary">Vision</h2>
              <p className="mt-4 text-sm text-textSecondary">
                To become a trusted long-term partner for software delivery, digital product development, and
                modern workflow design across growing businesses.
              </p>
            </div>
          </div>

          <div className="rounded-[2rem] border border-border bg-panel p-8 shadow-panel">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-accentPrimary">What we stand for</p>
            <h2 className="mt-4 font-display text-3xl font-semibold text-textPrimary">
              Better systems begin with better choices, not just better tools.
            </h2>
            <p className="mt-4 text-sm text-textSecondary">
              We care about the full digital picture: customer experience, business workflows, system reliability,
              growth readiness, and support after launch.
            </p>
          </div>
        </div>
      </section>

      <section className="section-grid border-y border-border bg-backgroundSecondary py-20">
        <div className="container">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-accentPrimary">How we work</p>
            <h2 className="mt-4 font-display text-4xl font-semibold text-textPrimary">
              A delivery process built around software, systems, and continuous improvement
            </h2>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {process.map(([step, title, description]) => (
              <div key={step} className="rounded-3xl border border-border bg-panel p-6 shadow-panel">
                <p className="text-sm font-semibold uppercase tracking-[0.28em] text-accentSecondary">{step}</p>
                <h3 className="mt-4 font-display text-2xl font-semibold text-textPrimary">{title}</h3>
                <p className="mt-3 text-sm text-textSecondary">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container grid gap-5 lg:grid-cols-2">
          {principles.map((item) => (
            <div key={item} className="rounded-2xl border border-border bg-panel p-6 shadow-panel">
              <p className="text-sm text-textPrimary">{item}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-20">
        <div className="container">
          <CTASection
            headline="Looking for a partner that can design, build, automate, and support digital systems?"
            paragraph="Bring us the business challenge, product idea, or platform goal and we can help shape the right path forward."
            primaryLabel="Talk to Nexaform"
            primaryHref="/contact"
            secondaryLabel="Explore Services"
            secondaryHref="/services"
          />
        </div>
      </section>
    </div>
  );
}
