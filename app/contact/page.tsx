import { PageHero } from '@/components/PageHero';
import { ContactForm } from '@/components/ContactForm';

const contactBlocks = [
  {
    title: 'Best for software projects',
    description: 'Use this if you need a web app, portal, dashboard, backend system, or broader custom software build.',
  },
  {
    title: 'Best for automation work',
    description: 'Use this if you want to explore AI automation, workflow redesign, or connected operational systems.',
  },
  {
    title: 'Best for ongoing support',
    description: 'Use this if you already have a system and want to improve quality, adoption, delivery speed, or scalability.',
  },
];

export const metadata = {
  title: 'Contact - Nexaform',
  description:
    'Talk to Nexaform about software development, digital products, AI automation, or long-term support for your business.',
};

export default function ContactPage() {
  return (
    <div className="space-y-20 pb-24">
      <PageHero
        subtitle="Contact us"
        title="Book a consultation for software, products, support, or automation"
        paragraph="The inquiry flow now reflects the broader service company again, so people can reach out for software, design, digital products, automation, or support work."
        imageSrc="/contact-network.svg"
        imageAlt="Illustration of connected conversations and service delivery"
      />

      <section className="py-20">
        <div className="container grid gap-10 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="space-y-6">
            <div className="rounded-[2rem] border border-border bg-panel p-8 shadow-panel">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-accentPrimary">What to send us</p>
              <h2 className="mt-4 font-display text-3xl font-semibold text-textPrimary">
                The product, workflow, system, or support need you want to improve
              </h2>
              <p className="mt-4 text-sm text-textSecondary">
                We can work from rough notes. Tell us what needs to be built, what currently feels inefficient,
                or what kind of support you are looking for and we will help guide the next step.
              </p>
            </div>

            {contactBlocks.map((block) => (
              <div key={block.title} className="rounded-2xl border border-border bg-panel p-6 shadow-panel">
                <h3 className="font-display text-2xl font-semibold text-textPrimary">{block.title}</h3>
                <p className="mt-3 text-sm text-textSecondary">{block.description}</p>
              </div>
            ))}
          </div>

          <ContactForm />
        </div>
      </section>
    </div>
  );
}
