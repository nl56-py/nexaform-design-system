import { Link, useParams } from "react-router-dom";
import { ArrowRight, CheckCircle2, MapPin, MessageSquareText } from "lucide-react";

import NotFound from "@/pages/NotFound";
import PageHero from "@/components/PageHero";
import Seo from "@/components/Seo";
import SectionWrapper, { FadeUp, StaggerContainer, StaggerItem } from "@/components/SectionWrapper";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { siteContact } from "@/lib/site-config";
import {
  absoluteUrl,
  buildBreadcrumbSchema,
  buildWebPageSchema,
  createTitle,
  organizationId,
  toMetaDescription,
} from "@/lib/seo";
import { getServiceBySlug, serviceItems } from "@/lib/service-data";

const ServiceDetail = () => {
  const { slug = "" } = useParams();
  const service = getServiceBySlug(slug);

  if (!service) {
    return <NotFound />;
  }

  const Icon = service.icon;
  const path = `/services/${service.slug}`;
  const pageTitle = createTitle(service.metaTitle);
  const pageDescription = toMetaDescription(service.metaDescription);
  const relatedServices = serviceItems.filter((item) => service.relatedSlugs.includes(item.slug));
  const contactQuery = new URLSearchParams({ service: service.slug }).toString();
  const quoteQuery = new URLSearchParams({ service: service.slug, intent: "quote" }).toString();
  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Services", path: "/services" },
    { name: service.title, path },
  ]);

  const structuredData = [
    breadcrumbSchema,
    buildWebPageSchema({
      title: pageTitle,
      description: pageDescription,
      path,
      image: service.image,
      breadcrumbId: `${absoluteUrl(path)}#breadcrumb`,
    }),
    {
      "@context": "https://schema.org",
      "@type": "Service",
      "@id": `${absoluteUrl(path)}#service`,
      name: service.title,
      serviceType: service.title,
      description: service.metaDescription,
      areaServed: siteContact.areaServed,
      provider: {
        "@id": organizationId,
      },
      image: absoluteUrl(service.image),
      url: absoluteUrl(path),
      offers: {
        "@type": "Offer",
        url: absoluteUrl(`/contact?${quoteQuery}`),
      },
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: `${service.title} deliverables`,
        itemListElement: service.deliverables.map((item) => ({
          "@type": "Offer",
          itemOffered: {
            "@type": "Thing",
            name: item,
          },
        })),
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "@id": `${absoluteUrl(path)}#faq`,
      mainEntity: service.faqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.answer,
        },
      })),
    },
  ];

  return (
    <div>
      <Seo
        title={pageTitle}
        description={pageDescription}
        path={path}
        image={service.image}
        structuredData={structuredData}
      />

      <PageHero
        badge={service.eyebrow}
        headline={service.heroTitle}
        subheadline={service.heroSubtitle}
        paragraph={service.heroParagraph}
      >
        <div className="flex flex-wrap gap-4">
          <Button asChild variant="gradient" size="lg">
            <Link to={`/contact?${contactQuery}`}>
              Contact Us <ArrowRight size={16} />
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link to={`/contact?${quoteQuery}`}>Get a Quote</Link>
          </Button>
        </div>

        <div className="mt-6 flex flex-wrap gap-3 text-sm text-muted-foreground">
          <div className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-card/80 px-4 py-2">
            <MapPin size={16} className="text-primary" />
            Serving businesses in Nepal and worldwide
          </div>
          <div className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-card/80 px-4 py-2">
            <MessageSquareText size={16} className="text-primary" />
            Discovery, delivery, and ongoing support available
          </div>
        </div>
      </PageHero>

      <SectionWrapper>
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(18rem,0.85fr)] lg:items-start">
          <FadeUp>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/15 bg-primary/5 px-4 py-2 font-mono text-[11px] uppercase tracking-[0.24em] text-primary">
              <Icon size={14} />
              {service.title}
            </div>
            <h2 className="mb-4 font-display text-3xl font-bold tracking-tight text-foreground md:text-4xl">
              What this service covers
            </h2>
            <p className="max-w-[68ch] leading-8 text-muted-foreground">{service.serviceOverview}</p>
            <p className="mt-5 max-w-[68ch] leading-8 text-muted-foreground">{service.localFocus}</p>
            <p className="mt-5 max-w-[68ch] leading-8 text-muted-foreground">{service.geoSummary}</p>
          </FadeUp>

          <FadeUp delay={0.1}>
            <article className="card-surface overflow-hidden rounded-[28px]">
              <div className="relative aspect-[16/11] overflow-hidden">
                <img src={service.image} alt={service.imageAlt} className="h-full w-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/40 via-transparent to-transparent" />
                <div className="absolute left-5 top-5 flex h-12 w-12 items-center justify-center rounded-2xl border border-white/40 bg-white/90 text-primary shadow-[0_12px_28px_rgba(22,34,71,0.16)]">
                  <Icon size={20} />
                </div>
              </div>
              <div className="space-y-3 p-6">
                <div className="text-sm font-semibold text-foreground">Typical outcomes</div>
                {service.outcomes.map((outcome) => (
                  <div key={outcome} className="flex items-start gap-3 text-sm leading-7 text-muted-foreground">
                    <CheckCircle2 size={18} className="mt-1 shrink-0 text-primary" />
                    <span>{outcome}</span>
                  </div>
                ))}
              </div>
            </article>
          </FadeUp>
        </div>
      </SectionWrapper>

      <SectionWrapper secondary>
        <div className="grid gap-6 lg:grid-cols-2">
          <FadeUp>
            <div className="card-surface h-full rounded-[28px] p-7">
              <h2 className="mb-5 font-display text-2xl font-semibold text-foreground md:text-3xl">
                What we can deliver
              </h2>
              <div className="space-y-4">
                {service.deliverables.map((deliverable) => (
                  <div key={deliverable} className="flex items-start gap-3 text-sm leading-7 text-muted-foreground">
                    <CheckCircle2 size={18} className="mt-1 shrink-0 text-primary" />
                    <span>{deliverable}</span>
                  </div>
                ))}
              </div>
            </div>
          </FadeUp>

          <FadeUp delay={0.08}>
            <div className="card-surface h-full rounded-[28px] p-7">
              <h2 className="mb-5 font-display text-2xl font-semibold text-foreground md:text-3xl">
                Best fit for
              </h2>
              <div className="space-y-4">
                {service.idealFor.map((item) => (
                  <div key={item} className="flex items-start gap-3 text-sm leading-7 text-muted-foreground">
                    <CheckCircle2 size={18} className="mt-1 shrink-0 text-primary" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </FadeUp>
        </div>
      </SectionWrapper>

      <SectionWrapper>
        <FadeUp className="max-w-3xl">
          <h2 className="mb-4 font-display text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            How we usually deliver this work
          </h2>
          <p className="leading-8 text-muted-foreground">
            Each engagement is tailored, but we keep the process grounded in clarity, sensible milestones,
            and decisions tied to business outcomes.
          </p>
        </FadeUp>

        <StaggerContainer className="mt-10 grid gap-5 md:grid-cols-2">
          {service.process.map((step, index) => (
            <StaggerItem key={step}>
              <article className="card-surface h-full rounded-[26px] p-6">
                <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10 font-display text-lg font-semibold text-primary">
                  {index + 1}
                </div>
                <p className="text-sm leading-7 text-muted-foreground">{step}</p>
              </article>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </SectionWrapper>

      <SectionWrapper secondary>
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(16rem,0.95fr)]">
          <FadeUp>
            <h2 className="mb-4 font-display text-3xl font-bold tracking-tight text-foreground md:text-4xl">
              Common questions about {service.title.toLowerCase()}
            </h2>
            <p className="max-w-[64ch] leading-8 text-muted-foreground">
              These answers are here to make the next step easier, whether you are still comparing
              options or already planning a project.
            </p>

            <div className="card-surface mt-8 rounded-[28px] px-6 py-2">
              <Accordion type="single" collapsible>
                {service.faqs.map((faq, index) => (
                  <AccordionItem key={faq.question} value={`faq-${index}`} className="border-border/60">
                    <AccordionTrigger className="text-left text-base text-foreground hover:no-underline">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-sm leading-7 text-muted-foreground">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </FadeUp>

          <FadeUp delay={0.08}>
            <div className="card-surface rounded-[28px] p-7">
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/15 bg-primary/5 px-4 py-2 font-mono text-[11px] uppercase tracking-[0.24em] text-primary">
                Internal Links
              </div>
              <h3 className="mt-5 font-display text-2xl font-semibold text-foreground">
                Ready to talk through your project?
              </h3>
              <p className="mt-4 text-sm leading-7 text-muted-foreground">
                If this service looks close to what you need, we can discuss the scope, timeline,
                and the best technical direction for your business.
              </p>
              <div className="mt-6 flex flex-col gap-3">
                <Button asChild variant="gradient" size="lg">
                  <Link to={`/contact?${contactQuery}`}>Contact Nexaform</Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link to={`/contact?${quoteQuery}`}>Get a Quote</Link>
                </Button>
                <Button asChild variant="ghost" size="lg" className="justify-start px-0 text-primary">
                  <Link to="/services">
                    Browse All Services <ArrowRight size={16} />
                  </Link>
                </Button>
              </div>
            </div>
          </FadeUp>
        </div>
      </SectionWrapper>

      <SectionWrapper>
        <FadeUp className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="font-display text-3xl font-bold tracking-tight text-foreground md:text-4xl">
              Related services
            </h2>
            <p className="max-w-[62ch] leading-8 text-muted-foreground">
              You may also want to explore the supporting services that usually connect with this work.
            </p>
          </div>
        </FadeUp>

        <StaggerContainer className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {relatedServices.map((relatedService) => {
            const RelatedIcon = relatedService.icon;

            return (
              <StaggerItem key={relatedService.slug}>
                <Link to={`/services/${relatedService.slug}`} className="block h-full">
                  <article className="card-surface card-surface-hover flex h-full flex-col rounded-[28px] p-6">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                      <RelatedIcon size={20} />
                    </div>
                    <h3 className="mt-5 font-display text-xl font-semibold text-foreground">
                      {relatedService.title}
                    </h3>
                    <p className="mt-3 flex-1 text-sm leading-7 text-muted-foreground">
                      {relatedService.description}
                    </p>
                    <div className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-primary">
                      Explore service <ArrowRight size={16} />
                    </div>
                  </article>
                </Link>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </SectionWrapper>
    </div>
  );
};

export default ServiceDetail;
