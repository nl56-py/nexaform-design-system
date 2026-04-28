import type { LucideIcon } from "lucide-react";
import {
  Bot,
  BrainCircuit,
  Cloud,
  Code2,
  Globe,
  Search,
  Server,
  Wrench,
} from "lucide-react";

import apiImage from "@/assets/api.jpg";
import cloudImage from "@/assets/Cloud-Deployment-Models.jpg";
import customSoftwareImage from "@/assets/csd-compressed.jpg";
import maintenanceImage from "@/assets/maintainence.png";
import aiAutomationImage from "@/assets/ai-automation-unsplash.jpg";
import aiLiteracyImage from "@/assets/vibe-coding-literacy-skill.avif";
import seoServicesImage from "@/assets/seo-services-hero.png";
import webDevelopmentImage from "@/assets/Web-Development.jpeg";

export interface ServiceFaq {
  question: string;
  answer: string;
}

export interface ServiceEducationSection {
  eyebrow: string;
  title: string;
  intro: string;
  points: {
    title: string;
    description: string;
  }[];
  ctaTitle: string;
  ctaDescription: string;
  ctaLabel: string;
  ctaPath: string;
}

export interface ServiceItem {
  slug: string;
  title: string;
  navLabel: string;
  description: string;
  eyebrow: string;
  image: string;
  imageAlt: string;
  icon: LucideIcon;
  heroTitle: string;
  heroSubtitle: string;
  heroParagraph: string;
  metaTitle: string;
  metaDescription: string;
  serviceOverview: string;
  localFocus: string;
  geoSummary: string;
  deliverables: string[];
  outcomes: string[];
  idealFor: string[];
  process: string[];
  faqs: ServiceFaq[];
  relatedSlugs: string[];
  educationSection?: ServiceEducationSection;
}

export const serviceItems: ServiceItem[] = [
  {
    slug: "web-application-development",
    title: "Web Application Development",
    navLabel: "Web Apps",
    description:
      "Build fast, secure, and scalable web applications tailored to your users, workflows, and business goals.",
    eyebrow: "Build",
    image: webDevelopmentImage,
    imageAlt: "Web application development workspace illustration",
    icon: Globe,
    heroTitle: "Web application development for real business workflows",
    heroSubtitle:
      "We design and build custom web applications for client portals, internal platforms, dashboards, booking systems, and digital products that need to perform reliably every day.",
    heroParagraph:
      "Nexaform builds modern web applications for companies in Nepal and teams worldwide that want better user experiences, cleaner operations, and software that can scale with growth.",
    metaTitle: "Web Application Development Company in Nepal",
    metaDescription:
      "Nexaform builds custom web applications in Nepal for portals, dashboards, SaaS products, and internal systems with scalable architecture and strong UX.",
    serviceOverview:
      "Our web application development service covers planning, interface design, frontend engineering, backend integration, testing, deployment, and ongoing improvement. The goal is not only to launch an app, but to create a web product people can trust, use easily, and expand over time.",
    localFocus:
      "For organizations in Nepal, we help replace fragmented manual processes with browser-based systems that are easier to manage across teams, branches, and devices.",
    geoSummary:
      "For global teams, we build web applications with clean architecture, secure authentication, and performance-focused delivery so products can support growth across markets.",
    deliverables: [
      "Product scoping, feature planning, and technical architecture",
      "Responsive UI and workflow-focused UX design",
      "Frontend and backend development with role-based access where needed",
      "Integrations for payments, forms, CMS, analytics, or third-party services",
      "Deployment setup, QA, and post-launch iteration support",
    ],
    outcomes: [
      "Fewer manual steps and better process visibility",
      "Stronger customer or staff experience across devices",
      "A scalable product foundation instead of a short-term patch",
    ],
    idealFor: [
      "Businesses moving beyond spreadsheets or disconnected tools",
      "Startups building SaaS, portals, booking systems, or dashboards",
      "Organizations that need custom workflows instead of a generic template",
    ],
    process: [
      "Discovery to understand users, workflows, and business priorities",
      "Scope and system planning so the build matches real operational needs",
      "Design and development in iterative milestones with clear feedback loops",
      "Testing, launch, training, and refinement after release",
    ],
    faqs: [
      {
        question: "What kind of web applications do you build?",
        answer:
          "We build internal tools, customer portals, SaaS products, dashboards, booking systems, and other browser-based applications that need custom workflows and secure access.",
      },
      {
        question: "Can you improve an existing web app instead of starting over?",
        answer:
          "Yes. We can modernize an existing application, improve performance, add features, or rebuild specific parts when the current system is slowing the business down.",
      },
      {
        question: "Do you handle deployment and ongoing support?",
        answer:
          "Yes. We can deploy the application, monitor launch readiness, and continue with maintenance, enhancements, and support after release.",
      },
    ],
    relatedSlugs: [
      "custom-software-development",
      "search-engine-optimization",
      "api-backend-systems",
      "cloud-deployment",
    ],
  },
  {
    slug: "search-engine-optimization",
    title: "SEO Services",
    navLabel: "SEO",
    description:
      "Improve search visibility, technical health, content structure, and organic growth with practical SEO for modern websites.",
    eyebrow: "Visibility",
    image: seoServicesImage,
    imageAlt: "SEO analytics and search visibility dashboard visual",
    icon: Search,
    heroTitle: "SEO services for search visibility that turns into qualified leads",
    heroSubtitle:
      "We improve technical SEO, on-page structure, content signals, local search readiness, AEO, GEO, and analytics so your website can be found by the right people.",
    heroParagraph:
      "Nexaform helps businesses in Nepal and teams worldwide turn websites into stronger organic growth channels with practical SEO strategy, clean implementation, and measurable next steps.",
    metaTitle: "SEO Services in Nepal",
    metaDescription:
      "Nexaform provides SEO, AEO, and GEO services in Nepal for technical SEO, on-page optimization, content structure, local search visibility, analytics, and organic growth.",
    serviceOverview:
      "SEO works best when strategy, content, design, and technical implementation support each other. We review how search engines, answer engines, generative AI tools, and users experience your website, then improve the structure, metadata, performance signals, internal linking, and content priorities that influence organic visibility.",
    localFocus:
      "For businesses in Nepal, that often means improving local search presence, service pages, Google-ready content, and the technical foundation needed to compete when customers search nearby.",
    geoSummary:
      "For teams serving wider markets, we focus on scalable information architecture, search intent, schema markup, analytics, and optimization workflows that can keep growing with the site.",
    deliverables: [
      "Technical SEO audit covering crawlability, indexation, page speed, metadata, and site structure",
      "On-page optimization for service pages, headings, internal links, titles, and descriptions",
      "Keyword and search-intent mapping for priority pages and content opportunities",
      "Structured data, sitemap, robots, canonical, AEO, GEO, and analytics readiness improvements",
      "Local SEO recommendations for location-based visibility and lead generation",
    ],
    outcomes: [
      "Clearer search visibility for the services and locations that matter",
      "A healthier website foundation for Google, AI answer engines, and users",
      "Better content priorities backed by search intent and measurable signals",
    ],
    idealFor: [
      "Businesses with a website that is not bringing enough organic leads",
      "Teams launching a new website that should be SEO-ready from day one",
      "Organizations that need technical fixes, content direction, or local search improvement",
    ],
    process: [
      "Audit the website, analytics, search visibility, technical health, and priority goals",
      "Map keywords, search intent, page gaps, and opportunities for higher-value traffic",
      "Implement technical and on-page improvements across the highest-impact pages",
      "Track results, refine content priorities, and plan the next optimization cycle",
    ],
    educationSection: {
      eyebrow: "SEO, GEO & AEO",
      title: "Why SEO, GEO, and AEO matter",
      intro:
        "People no longer discover businesses only by typing keywords into a search box. They compare Google results, map listings, featured answers, AI summaries, and generative search responses before they decide who to trust.",
      points: [
        {
          title: "SEO keeps your website visible in search",
          description:
            "Search Engine Optimization helps your pages rank for the services, locations, and questions your customers already search for on Google and other search engines.",
        },
        {
          title: "AEO helps answer engines understand you",
          description:
            "Answer Engine Optimization makes your content clearer, better structured, and easier to use in featured snippets, voice-style answers, and AI-powered answer surfaces.",
        },
        {
          title: "GEO prepares your brand for generative discovery",
          description:
            "Generative Engine Optimization improves the signals, structure, and authority cues that help AI search tools understand, summarize, and recommend your business more accurately.",
        },
      ],
      ctaTitle: "Free SEO audit service by Nexaform",
      ctaDescription:
        "Nexaform offers a free SEO, AEO, and GEO audit to show where your website stands today. We check technical search health, content structure, local visibility, and AI-answer readiness, then share practical next steps.",
      ctaLabel: "Get the Free SEO Audit",
      ctaPath: "/free-audit",
    },
    faqs: [
      {
        question: "What is included in your SEO service?",
        answer:
          "Our SEO service can include technical audits, page speed recommendations, metadata and heading improvements, internal linking, schema markup, keyword mapping, content planning, local SEO guidance, AEO readiness, GEO readiness, and analytics setup.",
      },
      {
        question: "Can you do SEO for an existing website?",
        answer:
          "Yes. We can review an existing website, identify technical and content issues, improve priority pages, and create a practical roadmap for ongoing organic growth.",
      },
      {
        question: "Can I start with Nexaform's free SEO audit before buying SEO services?",
        answer:
          "Yes. The free SEO, AEO, and GEO audit is a good first step if you want to understand your current search visibility, technical issues, content gaps, and AI-answer readiness before planning paid SEO work.",
      },
      {
        question: "How is SEO connected to web development?",
        answer:
          "Good SEO depends on clean site structure, performance, accessible markup, metadata, content hierarchy, and reliable deployment. Because we build websites and apps, we can fix both strategy-level and implementation-level issues.",
      },
    ],
    relatedSlugs: [
      "web-application-development",
      "maintenance-support",
      "ai-automation",
    ],
  },
  {
    slug: "custom-software-development",
    title: "Custom Software Development",
    navLabel: "Custom Software",
    description:
      "Create software systems that match your exact business processes, reduce manual work, and improve efficiency.",
    eyebrow: "Systems",
    image: customSoftwareImage,
    imageAlt: "Custom software development visual",
    icon: Code2,
    heroTitle: "Custom software built around how your business actually works",
    heroSubtitle:
      "We develop tailored software systems for operations, workflows, approvals, reporting, service delivery, and business coordination where off-the-shelf tools are not enough.",
    heroParagraph:
      "From Nepal-based companies to globally distributed teams, we help organizations move from workarounds and disconnected tools to software designed for their exact process.",
    metaTitle: "Custom Software Development Services in Nepal",
    metaDescription:
      "Build custom software in Nepal with Nexaform for operations, internal workflows, reporting, service delivery, and process automation tailored to your business.",
    serviceOverview:
      "Custom software development is the right fit when your team has unique workflows, compliance steps, approval chains, or reporting needs that generic software cannot handle well. We design systems around those realities so the software supports the business instead of forcing the business to adapt to a rigid tool.",
    localFocus:
      "For businesses in Nepal, that often means replacing paperwork, duplicated data entry, and disconnected communication with one practical digital workflow.",
    geoSummary:
      "For regional and international teams, it means building software that reflects their operating model, integrates with core tools, and remains flexible as the business evolves.",
    deliverables: [
      "Business process mapping and software requirement definition",
      "Custom platform or internal system development",
      "Workflow design for approvals, records, operations, and reporting",
      "Third-party integrations and secure data handling",
      "Documentation, launch support, and future enhancement planning",
    ],
    outcomes: [
      "Software aligned to your exact process rather than generic software limits",
      "Less duplicated effort and clearer operational control",
      "A stronger long-term foundation for efficiency and scale",
    ],
    idealFor: [
      "Teams with specialized workflows that templates cannot support well",
      "Companies running operations across multiple people or departments",
      "Organizations ready to digitize and standardize repeatable work",
    ],
    process: [
      "Review the current process, bottlenecks, and business rules",
      "Define the system scope, user roles, and required integrations",
      "Build the software in phases so priorities land first",
      "Deploy, onboard the team, and continue improving based on usage",
    ],
    faqs: [
      {
        question: "How is custom software different from a normal website?",
        answer:
          "A website mainly presents information, while custom software is built to manage operations, workflows, records, user actions, and business logic specific to your organization.",
      },
      {
        question: "Can custom software connect with our current tools?",
        answer:
          "Usually yes. We can integrate with CRMs, email platforms, payment systems, databases, or other tools where APIs and access are available.",
      },
      {
        question: "Is custom software only for large companies?",
        answer:
          "No. It is often most valuable for growing companies that have outgrown manual systems and need a more efficient way to operate before complexity gets worse.",
      },
    ],
    relatedSlugs: [
      "web-application-development",
      "api-backend-systems",
      "maintenance-support",
    ],
  },
  {
    slug: "ai-literacy",
    title: "AI Literacy",
    navLabel: "AI Literacy",
    description:
      "Help teams understand practical AI use, safe adoption, workflow design, and how to turn new tools into useful daily capability.",
    eyebrow: "AI",
    image: aiLiteracyImage,
    imageAlt: "AI literacy and modern workflow learning visual",
    icon: BrainCircuit,
    heroTitle: "AI literacy for teams that want practical capability, not hype",
    heroSubtitle:
      "We help teams understand where AI is useful, where it is risky, how to evaluate tools, and how to build good habits around prompts, workflows, and human judgment.",
    heroParagraph:
      "This service is designed for businesses in Nepal and beyond that want confident, responsible AI adoption before they invest deeper in automation, tooling, or AI-assisted delivery.",
    metaTitle: "AI Literacy Training for Businesses in Nepal",
    metaDescription:
      "AI literacy service from Nexaform helps teams in Nepal learn practical AI use, safe adoption, tool selection, prompting, and workflow design for day-to-day work.",
    serviceOverview:
      "AI literacy is about helping people use modern AI tools with better judgment. We focus on practical understanding, adoption readiness, risk awareness, and workflow thinking so teams can move from random experimentation to purposeful capability.",
    localFocus:
      "For businesses in Nepal, this often means giving teams a clear starting point for AI instead of leaving adoption to guesswork, scattered tools, and inconsistent expectations.",
    geoSummary:
      "For global and remote teams, it supports shared language around AI usage, decision quality, and when automation or AI-assisted work should move forward.",
    deliverables: [
      "AI readiness sessions for teams, founders, or departments",
      "Practical guidance on prompting, tool evaluation, and safe usage",
      "Use-case discovery for operations, marketing, support, research, or development",
      "Adoption guidelines and role-based AI workflow recommendations",
      "A foundation for future automation or AI-supported system design",
    ],
    outcomes: [
      "Better AI judgment and less tool confusion across the team",
      "Safer adoption with clearer expectations and workflow fit",
      "A practical roadmap toward automation or deeper AI use",
    ],
    idealFor: [
      "Businesses introducing AI to staff for the first time",
      "Teams overwhelmed by too many tools and unclear best practices",
      "Organizations that want to prepare for automation responsibly",
    ],
    process: [
      "Assess how the team currently understands and uses AI",
      "Identify high-value use cases, risks, and adoption gaps",
      "Run practical sessions around tools, prompts, and workflow design",
      "Document next steps for continued learning or automation planning",
    ],
    faqs: [
      {
        question: "Is AI literacy training only for technical teams?",
        answer:
          "No. It is especially useful for non-technical teams that need to understand practical AI usage, good judgment, and safe workflows before using tools daily.",
      },
      {
        question: "Do you recommend specific AI tools?",
        answer:
          "Yes, when it makes sense. We help teams evaluate tools based on workflow fit, privacy considerations, budget, and actual usefulness rather than trendiness.",
      },
      {
        question: "Can AI literacy lead into automation later?",
        answer:
          "Yes. Strong AI literacy makes later automation projects more effective because the team already understands where AI adds value and where human review still matters.",
      },
    ],
    relatedSlugs: [
      "ai-automation",
      "custom-software-development",
      "maintenance-support",
    ],
  },
  {
    slug: "ai-automation",
    title: "AI Automation",
    navLabel: "AI Automation",
    description:
      "Design AI-powered automations for repetitive workflows, internal operations, knowledge routing, and faster day-to-day execution.",
    eyebrow: "Automation",
    image: aiAutomationImage,
    imageAlt: "Laptop showing AI integration for automation workflows",
    icon: Bot,
    heroTitle: "AI automation for repetitive workflows and operational speed",
    heroSubtitle:
      "We design AI-supported automations that reduce repetitive work, route information better, improve internal responses, and help teams move faster without losing control.",
    heroParagraph:
      "Nexaform supports businesses in Nepal and global teams that want practical automation tied to measurable workflow improvements instead of novelty experiments.",
    metaTitle: "AI Automation Services in Nepal",
    metaDescription:
      "Nexaform designs AI automation systems in Nepal for repetitive workflows, internal operations, knowledge routing, and AI-assisted business processes.",
    serviceOverview:
      "AI automation works best when it is attached to a real process: inquiries, support triage, data extraction, internal knowledge access, repeated communication, or operational routing. We design automations that fit the workflow, define boundaries clearly, and keep human oversight where it matters.",
    localFocus:
      "For local businesses in Nepal, this can reduce time spent on repetitive coordination, content preparation, lead qualification, reporting, and information handling.",
    geoSummary:
      "For distributed teams, it helps standardize repeated tasks across time zones and creates more consistent operational flow without overloading people with busywork.",
    deliverables: [
      "Workflow analysis to identify strong automation opportunities",
      "AI-assisted process design for routing, generation, summarization, or support",
      "Integration planning across forms, databases, APIs, and business tools",
      "Human review checkpoints, fallback logic, and exception handling",
      "Automation rollout guidance and ongoing refinement support",
    ],
    outcomes: [
      "Less manual busywork in repeatable processes",
      "Faster internal execution and response times",
      "More consistent output with defined quality controls",
    ],
    idealFor: [
      "Teams losing time to repeated admin or information-handling work",
      "Service businesses managing frequent inquiries or repeated workflows",
      "Organizations ready to move beyond one-off AI prompts into systems",
    ],
    process: [
      "Identify repetitive processes with high frequency and clear inputs",
      "Design the automation logic, safeguards, and review points",
      "Connect tools, test scenarios, and refine output quality",
      "Launch with monitoring so the automation stays useful and accurate",
    ],
    faqs: [
      {
        question: "What kinds of tasks are good candidates for AI automation?",
        answer:
          "Repeated tasks with structured inputs, known decisions, or routing logic are usually strong candidates, especially when staff time is spent on summarizing, sorting, drafting, or repetitive response work.",
      },
      {
        question: "Will AI automation replace people in our workflow?",
        answer:
          "The goal is usually to remove repetitive load and improve speed, not remove judgment. We design systems so people stay in control where review and decision-making matter.",
      },
      {
        question: "Do we need existing AI tools before starting?",
        answer:
          "No. We can help define the workflow first, then choose the right automation approach and supporting tools based on the business need.",
      },
    ],
    relatedSlugs: [
      "ai-literacy",
      "api-backend-systems",
      "custom-software-development",
    ],
  },
  {
    slug: "api-backend-systems",
    title: "API & Backend Systems",
    navLabel: "APIs & Backend",
    description:
      "Develop reliable backend architecture, integrations, and data systems that power modern digital products.",
    eyebrow: "Data",
    image: apiImage,
    imageAlt: "API and backend systems illustration",
    icon: Server,
    heroTitle: "API and backend systems that keep products stable and connected",
    heroSubtitle:
      "We build backend architecture, databases, APIs, integrations, and secure system logic for products that need reliability, maintainability, and room to grow.",
    heroParagraph:
      "This service supports Nepal-based companies and global teams that need the right technical foundation behind their web applications, products, and operational systems.",
    metaTitle: "API and Backend Development Services in Nepal",
    metaDescription:
      "Nexaform builds backend systems, APIs, integrations, and database architecture in Nepal for modern applications, platforms, and business software.",
    serviceOverview:
      "Frontend experiences depend on stable backend systems. We build the services, data models, APIs, permissions, and integration layers that make digital products reliable and easier to extend. Whether you need a new backend or a cleaner architecture for an existing product, we focus on maintainability as much as delivery.",
    localFocus:
      "For organizations in Nepal, strong backend work often unlocks cleaner reporting, system integration, automation, and smoother product operations.",
    geoSummary:
      "For larger or multi-market products, it provides the structure needed to support growth, external integrations, and more dependable performance.",
    deliverables: [
      "Backend architecture and database planning",
      "REST or service-based API development",
      "Authentication, authorization, and business logic implementation",
      "Third-party integrations and data synchronization",
      "Performance, reliability, and maintainability improvements",
    ],
    outcomes: [
      "A cleaner technical foundation for products and internal systems",
      "Safer and more reliable data flow across tools and users",
      "Easier long-term scaling, integrations, and feature expansion",
    ],
    idealFor: [
      "Products that need secure logic, structured data, and integrations",
      "Teams with frontend-heavy products that now need stronger backend systems",
      "Businesses connecting multiple services, data sources, or operational tools",
    ],
    process: [
      "Review the current product requirements, data flow, and system gaps",
      "Define architecture, API boundaries, and security considerations",
      "Build or refactor backend services with iterative validation",
      "Test integrations, deployment readiness, and future maintainability",
    ],
    faqs: [
      {
        question: "Do you only build APIs for new products?",
        answer:
          "No. We can build new APIs, improve existing ones, or restructure backend systems that are difficult to maintain or integrate with other tools.",
      },
      {
        question: "Can you work on backend systems without redesigning the frontend?",
        answer:
          "Yes. Backend work can be handled independently when the main need is data flow, integrations, performance, or business logic improvements.",
      },
      {
        question: "Do backend systems matter for SEO or product quality?",
        answer:
          "Yes. Stable backend systems help with page speed, uptime, content delivery, analytics, and the overall reliability that supports both search performance and user trust.",
      },
    ],
    relatedSlugs: [
      "web-application-development",
      "cloud-deployment",
      "ai-automation",
    ],
  },
  {
    slug: "cloud-deployment",
    title: "Cloud & Deployment",
    navLabel: "Cloud & Deploy",
    description:
      "Launch and manage applications with performance, security, and scalability in mind.",
    eyebrow: "Scale",
    image: cloudImage,
    imageAlt: "Cloud deployment and infrastructure visual",
    icon: Cloud,
    heroTitle: "Cloud deployment that supports performance, uptime, and scale",
    heroSubtitle:
      "We help teams launch applications with the right hosting setup, deployment workflow, security baseline, and performance considerations from day one.",
    heroParagraph:
      "From business websites and custom apps in Nepal to globally accessible platforms, we set up cloud environments that are practical, maintainable, and ready for growth.",
    metaTitle: "Cloud Deployment Services in Nepal",
    metaDescription:
      "Nexaform provides cloud deployment services in Nepal for websites, web apps, and digital products with performance, security, and scalable infrastructure in mind.",
    serviceOverview:
      "Launching software is not only about pushing code live. Good deployment work includes environment setup, hosting decisions, release flow, monitoring basics, domain readiness, backups, and security-minded configuration. We help teams make those decisions with a long-term view.",
    localFocus:
      "For businesses in Nepal, this means launching digital systems with more confidence and avoiding fragile setups that become a problem later.",
    geoSummary:
      "For teams serving broader audiences, it helps ensure products are available, performant, and easier to manage as traffic, features, and integrations grow.",
    deliverables: [
      "Hosting and cloud setup planning",
      "Deployment workflow and release configuration",
      "Environment, domain, and service configuration",
      "Performance, security, and reliability baseline setup",
      "Launch support and post-deployment stabilization",
    ],
    outcomes: [
      "Smoother launches with fewer avoidable infrastructure issues",
      "A better baseline for uptime, performance, and growth",
      "Clearer operational control over environments and releases",
    ],
    idealFor: [
      "Teams launching a new website, app, or digital product",
      "Businesses that need better deployment discipline and reliability",
      "Products moving from an improvised setup to a more scalable environment",
    ],
    process: [
      "Review hosting needs, environments, and traffic expectations",
      "Design a deployment setup that fits the product stage and budget",
      "Configure releases, domains, services, and operational basics",
      "Launch carefully, monitor results, and stabilize the environment",
    ],
    faqs: [
      {
        question: "Do you help choose the right cloud or hosting platform?",
        answer:
          "Yes. We recommend options based on the product type, budget, expected traffic, maintenance needs, and how much flexibility the system requires.",
      },
      {
        question: "Can you deploy an application you did not build?",
        answer:
          "Often yes. We can review the application, identify deployment requirements, and handle setup when the codebase and environment are ready enough for a safe launch.",
      },
      {
        question: "Is cloud deployment only relevant for large products?",
        answer:
          "No. Even smaller business systems benefit from a cleaner deployment setup because it improves reliability, makes changes safer, and reduces operational friction.",
      },
    ],
    relatedSlugs: [
      "api-backend-systems",
      "web-application-development",
      "maintenance-support",
    ],
  },
  {
    slug: "maintenance-support",
    title: "Maintenance & Support",
    navLabel: "Maintenance",
    description:
      "Keep your software stable, updated, and improving as your business evolves.",
    eyebrow: "Support",
    image: maintenanceImage,
    imageAlt: "Maintenance and support illustration",
    icon: Wrench,
    heroTitle: "Maintenance and support for software that needs to stay healthy",
    heroSubtitle:
      "We help teams keep websites, applications, and digital systems secure, updated, stable, and improving after launch instead of letting small issues turn into bigger problems.",
    heroParagraph:
      "Nexaform supports businesses in Nepal and teams worldwide that need dependable post-launch attention, bug resolution, performance care, and ongoing improvements.",
    metaTitle: "Software Maintenance and Support Services in Nepal",
    metaDescription:
      "Nexaform provides software maintenance and support in Nepal for websites, applications, and digital systems with updates, fixes, monitoring, and ongoing improvements.",
    serviceOverview:
      "Digital products need ongoing attention after launch. Maintenance and support covers updates, bug fixes, content or feature adjustments, performance work, and general platform care so the system continues to support the business well over time.",
    localFocus:
      "For businesses in Nepal, this is often the difference between a digital system that slowly breaks and one that remains useful, trustworthy, and current.",
    geoSummary:
      "For remote and international teams, steady support helps protect product quality, reduce downtime risk, and keep momentum after release.",
    deliverables: [
      "Bug fixing and issue resolution",
      "Feature updates and iterative improvements",
      "Performance and reliability maintenance",
      "Dependency, platform, and environment updates",
      "General support for ongoing digital operations",
    ],
    outcomes: [
      "Greater software stability and fewer lingering issues",
      "A product that improves instead of falling behind",
      "More confidence in day-to-day digital operations",
    ],
    idealFor: [
      "Businesses with live systems that still need attention after launch",
      "Teams without in-house capacity for consistent technical upkeep",
      "Products that need a reliable partner for fixes and steady improvement",
    ],
    process: [
      "Review the current platform, issue history, and support needs",
      "Prioritize fixes, updates, and maintenance responsibilities",
      "Handle issues and improvements through a practical support rhythm",
      "Keep refining the system as business needs continue to change",
    ],
    faqs: [
      {
        question: "Do you only support software you originally built?",
        answer:
          "No. We can also take over support for an existing website or application after reviewing its condition, codebase, hosting setup, and current risks.",
      },
      {
        question: "What is included in maintenance?",
        answer:
          "It can include fixes, updates, small improvements, performance work, content or feature changes, and general technical support depending on the system and agreement.",
      },
      {
        question: "Why is maintenance important for SEO and user trust?",
        answer:
          "A neglected site or app can become slow, outdated, or error-prone. Ongoing maintenance helps protect performance, uptime, usability, and the trust signals that matter for both users and search visibility.",
      },
    ],
    relatedSlugs: [
      "cloud-deployment",
      "web-application-development",
      "search-engine-optimization",
      "custom-software-development",
    ],
  },
];

export const servicePaths = serviceItems.map((service) => `/services/${service.slug}`);

export const getServiceBySlug = (slug: string) =>
  serviceItems.find((service) => service.slug === slug);

