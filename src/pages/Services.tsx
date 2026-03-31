import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Seo from "@/components/Seo";
import { Button } from "@/components/ui/button";
import PageHero from "@/components/PageHero";
import SectionWrapper, { FadeUp, StaggerContainer, StaggerItem } from "@/components/SectionWrapper";
import ServiceCard from "@/components/ServiceCard";
import { serviceItems } from "@/lib/service-data";
import {
  absoluteUrl,
  buildBreadcrumbSchema,
  buildWebPageSchema,
  createTitle,
  organizationId,
  toMetaDescription,
} from "@/lib/seo";

const Services = () => {
  const pageTitle = createTitle("Software Development Services");
  const pageDescription = toMetaDescription(
    "Explore Nexaform services for web application development, custom software development, AI automation, API and backend systems, cloud deployment, and maintenance for businesses in Nepal and worldwide.",
  );
  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Services", path: "/services" },
  ]);
  const structuredData = [
    breadcrumbSchema,
    buildWebPageSchema({
      title: pageTitle,
      description: pageDescription,
      path: "/services",
      type: "CollectionPage",
      breadcrumbId: `${absoluteUrl("/services")}#breadcrumb`,
    }),
    {
      "@context": "https://schema.org",
      "@type": "OfferCatalog",
      "@id": `${absoluteUrl("/services")}#service-catalog`,
      name: "Nexaform Software Development Services",
      itemListElement: serviceItems.map((service) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: service.title,
          description: service.description,
          provider: {
            "@id": organizationId,
          },
        },
      })),
    },
  ];

  return (
    <div>
      <Seo title={pageTitle} description={pageDescription} path="/services" structuredData={structuredData} />

      <PageHero
        headline="Software development services"
        subheadline="Nexaform provides software development and product engineering services for businesses that need modern, scalable, and outcome-focused digital systems."
        paragraph="We work with businesses that want more efficient workflows, better digital experiences, and software built to support real growth."
      />

    <SectionWrapper>
      <StaggerContainer className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,19rem),1fr))] gap-6 xl:gap-8">
        {serviceItems.map((service) => {
          const Icon = service.icon;

          return (
            <StaggerItem key={service.title} className="h-full">
              <ServiceCard
                icon={<Icon size={22} />}
                title={service.title}
                description={service.description}
                image={service.image}
                imageAlt={service.imageAlt}
              />
            </StaggerItem>
          );
        })}
      </StaggerContainer>
    </SectionWrapper>

    <SectionWrapper secondary>
      <FadeUp className="max-w-3xl">
        <h2 className="mb-3 font-display text-3xl font-bold tracking-tight text-foreground md:text-4xl">
          Who we work with
        </h2>
        <p className="max-w-[65ch] leading-relaxed text-muted-foreground">
          We work with startups, service businesses, educators, local companies, digital-first teams,
          and growing organizations that need software built around practical goals and long-term value.
        </p>
      </FadeUp>
    </SectionWrapper>

    <SectionWrapper>
      <FadeUp className="max-w-4xl">
        <h2 className="mb-3 font-display text-3xl font-bold tracking-tight text-foreground md:text-4xl">
          Built for outcomes, not just output
        </h2>
        <p className="max-w-[65ch] leading-relaxed text-muted-foreground">
          Good software should not only function. It should improve how a business operates, serves
          users, and grows over time. Our services are designed to help businesses move from fragmented
          tools and manual effort to purposeful digital systems that work better every day.
        </p>
      </FadeUp>
    </SectionWrapper>

    <section className="relative overflow-hidden section-padding">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-highlight/10" />
      <div className="container relative z-10 mx-auto max-w-2xl text-center">
        <FadeUp>
          <h2 className="mb-5 font-display text-3xl font-bold tracking-tight gradient-text md:text-4xl">
            Need the right digital system for your business?
          </h2>
          <p className="mb-8 leading-relaxed text-muted-foreground">
            Let&apos;s talk about the product, platform, or software workflow you want to build.
          </p>
          <Link to="/contact">
            <Button variant="gradient" size="lg" className="gap-2">
              Start a Project <ArrowRight size={16} />
            </Button>
          </Link>
        </FadeUp>
      </div>
    </section>
    </div>
  );
};

export default Services;
