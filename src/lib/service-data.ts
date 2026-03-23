import type { LucideIcon } from "lucide-react";
import {
  Bot,
  BrainCircuit,
  Cloud,
  Code2,
  Globe,
  Server,
  Wrench,
} from "lucide-react";

import apiImage from "@/assets/api.jpg";
import cloudImage from "@/assets/Cloud-Deployment-Models.jpg";
import customSoftwareImage from "@/assets/csd-compressed.jpg";
import maintenanceImage from "@/assets/maintainence.png";
import aiAutomationImage from "@/assets/ai-automation-unsplash.jpg";
import aiLiteracyImage from "@/assets/vibe-coding-literacy-skill.avif";
import webDevelopmentImage from "@/assets/Web-Development.jpeg";

export interface ServiceItem {
  title: string;
  description: string;
  eyebrow: string;
  image: string;
  imageAlt: string;
  icon: LucideIcon;
}

export const serviceItems: ServiceItem[] = [
  {
    title: "Web Application Development",
    description:
      "Build fast, secure, and scalable web applications tailored to your users, workflows, and business goals.",
    eyebrow: "Build",
    image: webDevelopmentImage,
    imageAlt: "Web application development workspace illustration",
    icon: Globe,
  },
  {
    title: "Custom Software Development",
    description:
      "Create software systems that match your exact business processes, reduce manual work, and improve efficiency.",
    eyebrow: "Systems",
    image: customSoftwareImage,
    imageAlt: "Custom software development visual",
    icon: Code2,
  },
  {
    title: "AI Literacy",
    description:
      "Help teams understand practical AI use, safe adoption, workflow design, and how to turn new tools into useful daily capability.",
    eyebrow: "AI",
    image: aiLiteracyImage,
    imageAlt: "AI literacy and modern workflow learning visual",
    icon: BrainCircuit,
  },
  {
    title: "AI Automation",
    description:
      "Design AI-powered automations for repetitive workflows, internal operations, knowledge routing, and faster day-to-day execution.",
    eyebrow: "Automation",
    image: aiAutomationImage,
    imageAlt: "Laptop showing AI integration for automation workflows",
    icon: Bot,
  },
  {
    title: "API & Backend Systems",
    description:
      "Develop reliable backend architecture, integrations, and data systems that power modern digital products.",
    eyebrow: "Data",
    image: apiImage,
    imageAlt: "API and backend systems illustration",
    icon: Server,
  },
  {
    title: "Cloud & Deployment",
    description:
      "Launch and manage applications with performance, security, and scalability in mind.",
    eyebrow: "Scale",
    image: cloudImage,
    imageAlt: "Cloud deployment and infrastructure visual",
    icon: Cloud,
  },
  {
    title: "Maintenance & Support",
    description:
      "Keep your software stable, updated, and improving as your business evolves.",
    eyebrow: "Support",
    image: maintenanceImage,
    imageAlt: "Maintenance and support illustration",
    icon: Wrench,
  },
];
