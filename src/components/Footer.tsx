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
  <footer className="bg-secondary border-t border-border/50">
    <div className="container section-padding">
      <div className="grid grid-cols-1 gap-10 text-center md:grid-cols-3 md:gap-12 md:text-left">
        <div className="space-y-4">
          <Logo />
          <p className="mx-auto max-w-xs text-sm leading-relaxed text-muted-foreground md:mx-0">
            Custom web applications, modern digital systems, and software solutions built for clarity, performance, and scale.
          </p>
          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground md:justify-start">
            <span className="available-dot" />
            Available for projects
          </div>
        </div>

        <div>
          <h4 className="font-display font-semibold text-foreground text-sm mb-4">Quick Links</h4>
          <nav className="flex flex-col gap-2">
            {quickLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="space-y-4">
          <h4 className="font-display font-semibold text-foreground text-sm mb-4">Ecosystem</h4>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Also supporting <span className="text-foreground">Vibenest</span>, a learning initiative focused on modern AI-assisted development and vibe coding education.
          </p>
        </div>
      </div>

      <div className="mt-12 pt-8 border-t border-border/30 text-center">
        <p className="text-xs text-muted-foreground">© Nexaform. All rights reserved.</p>
      </div>
    </div>
  </footer>
);

export default Footer;
