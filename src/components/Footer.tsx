import { Link } from "react-router-dom";
import { Mail, MapPin } from "lucide-react";
import Logo from "@/components/Logo";
import SocialFollowButtons from "@/components/SocialFollowButtons";
import { siteContact } from "@/lib/site-config";

const quickLinks = [
  { label: "Home", to: "/" },
  { label: "Services", to: "/services" },
  { label: "Digital Fairness Campaign", to: "/digital-fairness-campaign" },
  { label: "Free Audit", to: "/free-audit" },
  { label: "Projects", to: "/projects" },
  { label: "Blog", to: "/blog" },
  { label: "About", to: "/about" },
  { label: "Careers", to: "/careers" },
  { label: "Contact", to: "/contact" },
];

const Footer = () => (
  <footer className="border-t border-border/50 bg-secondary">
    <div className="container section-padding">
      <div className="grid grid-cols-1 gap-10 text-center md:grid-cols-2 md:gap-12 md:text-left xl:grid-cols-4">
        <div className="space-y-4">
          <Logo className="justify-center md:justify-start" />
          <p className="mx-auto max-w-xs text-sm leading-relaxed text-muted-foreground md:mx-0">
            Custom web applications, modern digital systems, and software solutions built for
            clarity, performance, and scale.
          </p>
          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground md:justify-start">
            <span className="available-dot" />
            Available for projects
          </div>
        </div>

        <div>
          <h4 className="mb-4 text-sm font-display font-semibold text-foreground">Quick Links</h4>
          <nav className="flex flex-col gap-2">
            {quickLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="text-sm text-muted-foreground transition-colors duration-200 hover:text-foreground"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="space-y-4">
          <h4 className="mb-4 text-sm font-display font-semibold text-foreground">Connect</h4>
          <div className="space-y-3">
            <a
              href={siteContact.emailHref}
              className="inline-flex items-center justify-center gap-2 text-sm text-muted-foreground transition-colors duration-200 hover:text-foreground md:justify-start"
            >
              <Mail size={16} />
              <span>{siteContact.email}</span>
            </a>
            <div className="flex items-start justify-center gap-2 text-sm text-muted-foreground md:justify-start">
              <MapPin size={16} className="mt-0.5 shrink-0" />
              <span>{siteContact.location}</span>
            </div>
          </div>

          <div>
            <div className="mb-3 text-sm font-display font-semibold text-foreground">Follow Us On</div>
            <SocialFollowButtons className="justify-center md:justify-start" />
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="mb-4 text-sm font-display font-semibold text-foreground">Ecosystem</h4>
          <p className="text-sm leading-relaxed text-muted-foreground">
            Also supporting <span className="text-foreground">Nexa Academy</span>, a learning
            initiative focused on modern AI-assisted development and vibe coding education.
          </p>
          <a
            href="https://academy.nexa-form.com"
            target="_blank"
            rel="noreferrer"
            className="inline-flex text-sm text-primary transition-colors duration-200 hover:text-foreground"
          >
            academy.nexa-form.com
          </a>
        </div>
      </div>

      <div className="mt-12 border-t border-border/30 pt-8 text-center">
        <p className="text-xs text-muted-foreground">&copy; Nexaform. All rights reserved.</p>
      </div>
    </div>
  </footer>
);

export default Footer;
