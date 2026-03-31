import { Link } from "react-router-dom";
import { ArrowRight, BarChart3, Mail, MapPin, MonitorSmartphone, Sparkles, Target, Workflow } from "lucide-react";
import Seo from "@/components/Seo";
import { Button } from "@/components/ui/button";
import SocialFollowButtons from "@/components/SocialFollowButtons";
import { FadeUp } from "@/components/SectionWrapper";
import aboutHeroImage from "@/assets/programming.jpg";
import launchImage from "@/assets/launch.jpg";
import meetingImage from "@/assets/meeting.jpg";
import uiUxImage from "@/assets/ui ux.jpg";
import { siteContact } from "@/lib/site-config";
import {
  absoluteUrl,
  buildBreadcrumbSchema,
  buildWebPageSchema,
  createTitle,
  toMetaDescription,
} from "@/lib/seo";

const capabilityHighlights = [
  { value: "Custom", label: "Product builds" },
  { value: "Scalable", label: "Systems that grow" },
  { value: "Hands-On", label: "Collaborative delivery" },
];

const focusAreas = [
  { icon: MonitorSmartphone, label: "Web products" },
  { icon: Workflow, label: "Business platforms" },
  { icon: Sparkles, label: "AI-assisted workflows" },
];

const quickLinks = [
  { label: "Home", to: "/" },
  { label: "Services", to: "/services" },
  { label: "Projects", to: "/projects" },
  { label: "Blog", to: "/blog" },
  { label: "Contact", to: "/contact" },
];

const About = () => {
  const pageTitle = createTitle("About Nexaform");
  const pageDescription = toMetaDescription(
    "Learn about Nexaform, a Nepal-based software development partner building custom web applications, business platforms, and AI-assisted digital systems for growing teams.",
  );
  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
  ]);
  const structuredData = [
    breadcrumbSchema,
    buildWebPageSchema({
      title: pageTitle,
      description: pageDescription,
      path: "/about",
      type: "AboutPage",
      image: aboutHeroImage,
      breadcrumbId: `${absoluteUrl("/about")}#breadcrumb`,
    }),
  ];

  return (
    <div className="bg-[#fffaf7] text-foreground">
      <Seo title={pageTitle} description={pageDescription} path="/about" image={aboutHeroImage} structuredData={structuredData} />

    <section className="relative overflow-hidden pt-20 md:pt-24">
      <div className="relative min-h-[60svh] md:min-h-[68svh]">
        <img
          src={aboutHeroImage}
          alt="Programming workspace and software development setup"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(44,18,13,0.84)_0%,rgba(44,18,13,0.58)_36%,rgba(44,18,13,0.2)_70%,rgba(44,18,13,0.12)_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(255,255,255,0.18),_transparent_28%)]" />

        <div className="container relative z-10 flex min-h-[60svh] items-end pb-12 md:min-h-[68svh] md:pb-16 lg:pb-20">
          <FadeUp className="max-w-3xl text-white">
            <p className="text-xs font-medium uppercase tracking-[0.3em] text-white/75">
              Home / About Us
            </p>
            <h1 className="mt-4 font-display text-4xl font-bold tracking-tight md:text-6xl">
              About Us
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-8 text-white/82 md:text-lg">
              We build software systems that feel clear, dependable, and shaped around the way real
              teams work.
            </p>
          </FadeUp>
        </div>
      </div>
    </section>

    <section className="pb-14 pt-14 md:pb-20 md:pt-16">
      <div className="container">
        <FadeUp className="max-w-3xl">
          <p className="text-xs font-medium uppercase tracking-[0.3em] text-[#b27c73]">
            Who We Are
          </p>
          <h2 className="mt-4 font-display text-4xl font-bold tracking-tight text-foreground md:text-[3.25rem]">
            A software partner focused on useful systems, not noise.
          </h2>
          <p className="mt-5 text-base leading-8 text-muted-foreground md:text-lg">
            Nexaform helps businesses move from fragmented tools and manual workflows to digital systems that are clear,
            maintainable, and practical in day-to-day use. We combine product thinking, interface design, and engineering
            to build platforms that support growth without creating unnecessary complexity.
          </p>
          <p className="mt-4 text-base leading-8 text-muted-foreground md:text-lg">
            The way we work is collaborative by design. We listen closely, define the actual operational problem, and
            shape solutions that teams can adopt confidently, whether that means a custom web app, a modern business
            platform, or an AI-assisted workflow.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            {focusAreas.map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="inline-flex items-center gap-2 rounded-full border border-[#ecd5cf] bg-white px-4 py-2 text-sm text-foreground shadow-[0_10px_25px_rgba(133,45,38,0.06)]"
              >
                <Icon size={16} className="text-[#982b26]" />
                <span>{label}</span>
              </div>
            ))}
          </div>
        </FadeUp>

        <FadeUp delay={0.1} className="mx-auto mt-8 block w-full max-w-sm lg:hidden">
          <img
            src={launchImage}
            alt="Team preparing a product launch"
            className="w-full object-contain drop-shadow-[0_25px_45px_rgba(68,27,22,0.18)]"
            loading="lazy"
          />
        </FadeUp>

        <FadeUp delay={0.15} className="mt-10">
          <div className="relative">
            <div className="overflow-hidden rounded-[30px] bg-[#982b26] px-6 py-8 text-white shadow-[0_24px_60px_rgba(110,31,31,0.18)] sm:px-8 md:py-9 lg:pr-[320px]">
              <div className="grid gap-6 sm:grid-cols-3">
                {capabilityHighlights.map((item) => (
                  <div key={item.value} className="text-center sm:text-left">
                    <div className="font-display text-3xl font-bold tracking-tight md:text-[2.3rem]">
                      {item.value}
                    </div>
                    <div className="mt-2 text-sm text-white/75">{item.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="pointer-events-none absolute bottom-0 right-6 hidden w-[290px] translate-y-[8%] lg:block">
              <img
                src={launchImage}
                alt="Team preparing a product launch"
                className="w-full object-contain drop-shadow-[0_28px_45px_rgba(68,27,22,0.22)]"
                loading="lazy"
              />
            </div>
          </div>
        </FadeUp>
      </div>
    </section>

    <section className="pb-16 md:pb-24">
      <div className="container">
        <div className="grid gap-10 lg:grid-cols-[0.88fr_1.12fr] lg:items-center">
          <FadeUp className="lg:justify-self-end">
            <div className="relative mx-auto w-full max-w-[470px] pb-10 sm:pb-12 lg:max-w-[420px] lg:pb-8">
              <div className="relative overflow-hidden rounded-[32px] border border-[#f1ddd6] bg-white p-4 shadow-[0_22px_65px_rgba(114,41,35,0.1)] sm:p-5">
                <div className="aspect-[4/5] overflow-hidden rounded-[26px] lg:aspect-[5/6]">
                  <img
                    src={meetingImage}
                    alt="Team collaborating in a meeting"
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="absolute inset-x-6 bottom-6 rounded-[22px] bg-white/92 px-5 py-4 backdrop-blur sm:inset-x-8 sm:bottom-8">
                  <div className="text-xs font-medium uppercase tracking-[0.28em] text-[#b27c73]">
                    Collaborative Planning
                  </div>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">
                    We work closely with teams to turn ideas, feedback, and operational needs into practical digital systems.
                  </p>
                </div>
              </div>

              <div className="relative z-10 ml-auto -mt-10 w-[68%] overflow-hidden rounded-[28px] border border-[#f1ddd6] bg-white p-3 shadow-[0_20px_55px_rgba(114,41,35,0.14)] sm:w-[56%] lg:-mt-8 lg:w-[58%]">
                <div className="aspect-[4/3] overflow-hidden rounded-[22px]">
                  <img
                    src={uiUxImage}
                    alt="UI and UX wireframes and design layouts"
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="px-2 pb-2 pt-3">
                  <div className="text-xs font-medium uppercase tracking-[0.24em] text-[#b27c73]">
                    UI / UX
                  </div>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">
                    The experience is shaped through clear flows, interface thinking, and details that make everyday work easier.
                  </p>
                </div>
              </div>
            </div>
          </FadeUp>

          <div className="space-y-5">
            <FadeUp delay={0.08}>
              <div className="rounded-[30px] border border-[#f1ddd6] bg-white px-6 py-7 shadow-[0_18px_50px_rgba(114,41,35,0.08)] sm:px-8">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#f7e7e0] text-[#982b26]">
                    <Target size={22} />
                  </div>
                  <div>
                    <h3 className="font-display text-3xl font-bold leading-none tracking-tight text-foreground md:text-[2.5rem]">
                      Our Mission
                    </h3>
                    <p className="mt-4 text-base leading-7 text-muted-foreground">
                      To design digital systems that help businesses operate with more clarity, stronger workflows, and a
                      better experience for the people doing the work.
                    </p>
                  </div>
                </div>
              </div>
            </FadeUp>

            <FadeUp delay={0.16}>
              <div className="rounded-[30px] border border-[#f1ddd6] bg-white px-6 py-7 shadow-[0_18px_50px_rgba(114,41,35,0.08)] sm:px-8">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#f7e7e0] text-[#982b26]">
                    <BarChart3 size={22} />
                  </div>
                  <div>
                    <h3 className="font-display text-3xl font-bold leading-none tracking-tight text-foreground md:text-[2.5rem]">
                      Our Vision
                    </h3>
                    <p className="mt-4 text-base leading-7 text-muted-foreground">
                      To be the technology partner businesses trust when they need modern products, scalable operations,
                      and systems that continue to deliver value after launch.
                    </p>
                  </div>
                </div>
              </div>
            </FadeUp>
          </div>
        </div>
      </div>
    </section>

    <section className="pb-20 md:pb-24">
      <div className="container">
        <FadeUp>
          <div className="relative overflow-hidden rounded-[34px] bg-[#982b26] px-6 py-8 text-white shadow-[0_28px_70px_rgba(110,31,31,0.18)] sm:px-8 md:px-10 md:py-10">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(255,255,255,0.16),_transparent_32%)]" />

            <div className="relative grid gap-10 lg:grid-cols-[1.15fr_0.7fr_0.95fr]">
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.3em] text-white/70">
                  Contact Details
                </p>
                <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-white md:text-4xl">
                  Let&apos;s shape the next system with purpose.
                </h2>
                <p className="mt-4 max-w-lg text-sm leading-7 text-white/75 md:text-base">
                  If you&apos;re planning a product, improving an internal workflow, or exploring AI-assisted operations,
                  we&apos;d love to help you map the next step.
                </p>

                <div className="mt-6 space-y-4 text-sm">
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-white/12">
                      <Mail size={18} />
                    </div>
                    <div>
                      <div className="text-white/65">Email</div>
                      <a
                        href={siteContact.emailHref}
                        className="mt-1 inline-block text-base font-medium text-white transition-opacity duration-200 hover:opacity-85"
                      >
                        {siteContact.email}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-white/12">
                      <MapPin size={18} />
                    </div>
                    <div>
                      <div className="text-white/65">Location</div>
                      <div className="mt-1 text-base font-medium text-white">{siteContact.location}</div>
                    </div>
                  </div>
                </div>

                <div className="mt-6">
                  <div className="text-white/65">Follow us on</div>
                  <SocialFollowButtons
                    className="mt-3"
                    buttonClassName="border-white/20 bg-white/10 text-white hover:border-white/30 hover:bg-white/15 hover:text-white"
                  />
                </div>

                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="mt-8 border-white/20 bg-white text-[#982b26] hover:bg-white/90 hover:text-[#982b26]"
                >
                  <Link to="/contact">
                    Start a Project
                    <ArrowRight />
                  </Link>
                </Button>
              </div>

              <div>
                <div className="text-xs font-medium uppercase tracking-[0.3em] text-white/70">
                  Quick Links
                </div>
                <div className="mt-5 flex flex-col gap-3">
                  {quickLinks.map((link) => (
                    <Link
                      key={link.to}
                      to={link.to}
                      className="text-sm text-white/75 transition-colors duration-200 hover:text-white"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>

              <div>
                <div className="relative aspect-[4/3] overflow-hidden rounded-[24px] bg-[#f4ded6] text-[#5d2923]">
                  <div className="absolute inset-0 bg-[linear-gradient(rgba(182,122,109,0.14)_1px,transparent_1px),linear-gradient(90deg,rgba(182,122,109,0.14)_1px,transparent_1px)] [background-size:24px_24px]" />
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_22%_26%,_rgba(255,255,255,0.95),_transparent_24%),radial-gradient(circle_at_72%_56%,_rgba(255,255,255,0.78),_transparent_30%)]" />
                  <div className="absolute left-[20%] top-[34%] h-3 w-3 rounded-full bg-[#982b26] shadow-[0_0_0_10px_rgba(152,43,38,0.15)]" />
                  <div className="absolute right-[22%] top-[56%] h-3 w-3 rounded-full bg-[#982b26] shadow-[0_0_0_10px_rgba(152,43,38,0.12)]" />
                  <div className="absolute left-[23%] top-[37%] h-[2px] w-[48%] rounded-full bg-[#982b26]/40" />
                  <div className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.26em] text-[#982b26]">
                    Nepal
                  </div>
                  <div className="absolute bottom-4 left-4 rounded-2xl bg-white/90 px-4 py-3 text-sm shadow-sm">
                    Remote-first delivery
                  </div>
                </div>

                <div className="mt-5 font-display text-2xl font-semibold tracking-tight text-white">
                  Nexaform
                  <br />
                  Digital Systems Studio
                </div>
              </div>
            </div>
          </div>
        </FadeUp>
      </div>
    </section>
    </div>
  );
};

export default About;
