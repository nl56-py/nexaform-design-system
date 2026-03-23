import { Link } from "react-router-dom";
import Logo from "@/components/Logo";

const quickLinks = [
  { label: "Home", to: "/" },
  { label: "Services", to: "/services" },
  { label: "Projects", to: "/projects" },
  { label: "Blog", to: "/blog" },
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" },
];

const Footer = () => (
  <footer className="border-t border-border/50 bg-secondary">
    <div className="container section-padding">
      <div className="grid grid-cols-1 gap-10 text-center md:grid-cols-3 md:gap-12 md:text-left">
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
          <h4 className="mb-4 text-sm font-display font-semibold text-foreground">Ecosystem</h4>
          <p className="text-sm leading-relaxed text-muted-foreground">
            Also supporting <span className="text-foreground">Vibenest</span>, a learning
            initiative focused on modern AI-assisted development and vibe coding education.
          </p>
        </div>
      </div>

      <div className="mt-12 border-t border-border/30 pt-8 text-center">
        <p className="text-xs text-muted-foreground">&copy; Nexaform. All rights reserved.</p>
      </div>
    </div>
  </footer>
);

export default Footer;
