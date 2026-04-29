import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ChevronDown, Menu, Sparkles, X } from "lucide-react";

import Logo from "@/components/Logo";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { serviceItems } from "@/lib/service-data";
import { cn } from "@/lib/utils";

const navLinks = [
  { label: "Home", to: "/" },
  { label: "Rs. 6,999 Offers", to: "/digital-fairness-campaign" },
  { label: "Free Audit", to: "/free-audit" },
  { label: "Projects", to: "/projects" },
  { label: "Blog", to: "/blog" },
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" },
];

const offerLinks = navLinks.slice(1, 3);
const standardLinks = navLinks.slice(3);

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  const servicesActive =
    location.pathname === "/services" || location.pathname.startsWith("/services/");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setMobileServicesOpen(false);
  }, [location.pathname]);

  return (
    <header
      className={`fixed left-0 right-0 top-0 z-50 h-16 transition-all duration-300 ${
        isHomePage
          ? scrolled ? "glass-navbar-dark" : "glass-navbar-dark-initial"
          : scrolled ? "glass-navbar" : "bg-transparent"
      }`}
    >
      <div className="container flex h-full items-center justify-between">
        <Link to="/">
          <Logo />
        </Link>

        <nav className="hidden items-center gap-0.5 lg:flex">
          <Link
            to="/"
            className={cn(
              "link-underline px-2.5 py-2 text-sm transition-colors duration-200",
              isHomePage
                ? location.pathname === "/" ? "text-white" : "text-white/70 hover:text-white"
                : location.pathname === "/" ? "text-foreground" : "text-muted-foreground hover:text-foreground",
            )}
          >
            Home
          </Link>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                type="button"
                className={cn(
                  "inline-flex items-center gap-1 px-2.5 py-2 text-sm transition-colors duration-200",
                  isHomePage
                    ? servicesActive ? "text-white" : "text-white/70 hover:text-white"
                    : servicesActive ? "text-foreground" : "text-muted-foreground hover:text-foreground",
                )}
                aria-label="Toggle services menu"
              >
                <span className="link-underline">Services</span>
                <ChevronDown size={16} />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="center" className="w-72 rounded-xl border-border/70 p-2">
              <DropdownMenuLabel>Services</DropdownMenuLabel>
              <DropdownMenuItem asChild>
                <Link to="/services" className="cursor-pointer rounded-lg px-3 py-2.5">
                  All Services
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              {serviceItems.map((service) => (
                <DropdownMenuItem key={service.slug} asChild>
                  <Link
                    to={`/services/${service.slug}`}
                    className="cursor-pointer rounded-lg px-3 py-2.5"
                  >
                    <div className="flex flex-col">
                      <span className="text-sm font-medium text-foreground">{service.title}</span>
                      <span className="text-xs text-muted-foreground">{service.description}</span>
                    </div>
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <div className={cn(
            "relative mx-1 inline-flex items-center gap-0.5 rounded-full px-1 py-1 backdrop-blur",
            isHomePage
              ? "border border-white/20 bg-white/10 shadow-[0_8px_24px_rgba(0,0,0,0.2)]"
              : "border border-sky-200/80 bg-white/80 shadow-[0_8px_24px_rgba(14,165,233,0.12)]"
          )}>
            <Sparkles
              size={14}
              className="pointer-events-none absolute -left-2 -top-2 text-amber-400 drop-shadow-sm"
              aria-hidden="true"
            />
            <Sparkles
              size={12}
              className="pointer-events-none absolute -bottom-1.5 -right-1.5 text-cyan-500 drop-shadow-sm"
              aria-hidden="true"
            />
            {offerLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={cn(
                  "relative rounded-full px-2.5 py-1.5 text-sm font-semibold transition-colors duration-200",
                  location.pathname === link.to
                    ? "bg-sky-600 text-white shadow-sm"
                    : isHomePage ? "text-white/90 hover:bg-white/10 hover:text-white" : "text-slate-700 hover:bg-sky-50 hover:text-sky-800",
                )}
              >
                <span className="whitespace-nowrap">{link.label}</span>
              </Link>
            ))}
          </div>

          {standardLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={cn(
                "link-underline px-2.5 py-2 text-sm transition-colors duration-200",
                isHomePage
                  ? location.pathname === link.to ? "text-white" : "text-white/70 hover:text-white"
                  : location.pathname === link.to ? "text-foreground" : "text-muted-foreground hover:text-foreground",
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:block">
          <Link to="/contact">
            <Button variant="gradient" size="default">
              Start a Project
            </Button>
          </Link>
        </div>

        <button
          className={cn("p-2 lg:hidden", isHomePage ? "text-white" : "text-foreground")}
          onClick={() => setMobileOpen((current) => !current)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {mobileOpen && (
        <div className="glass-navbar border-t border-border/30 lg:hidden">
          <nav className="container flex flex-col gap-1 py-4">
            <Link
              to="/"
              className={cn(
                "rounded-lg px-3 py-2.5 text-sm transition-colors",
                location.pathname === "/"
                  ? "bg-card text-foreground"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              Home
            </Link>

            <button
              type="button"
              onClick={() => setMobileServicesOpen((current) => !current)}
              className={cn(
                "flex items-center justify-between rounded-lg px-3 py-2.5 text-left text-sm transition-colors",
                servicesActive
                  ? "bg-card text-foreground"
                  : "text-muted-foreground hover:text-foreground",
              )}
              aria-expanded={mobileServicesOpen}
              aria-controls="mobile-services-menu"
            >
              <span>Services</span>
              <ChevronDown
                size={18}
                className={cn("transition-transform duration-200", mobileServicesOpen && "rotate-180")}
              />
            </button>

            {mobileServicesOpen ? (
              <div id="mobile-services-menu" className="ml-3 flex flex-col gap-1 border-l border-border/60 pl-3">
                <Link
                  to="/services"
                  className={cn(
                    "rounded-lg px-3 py-2 text-sm transition-colors",
                    location.pathname === "/services"
                      ? "bg-card text-foreground"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  All Services
                </Link>
                {serviceItems.map((service) => (
                  <Link
                    key={service.slug}
                    to={`/services/${service.slug}`}
                    className={cn(
                      "rounded-lg px-3 py-2 text-sm transition-colors",
                      location.pathname === `/services/${service.slug}`
                        ? "bg-card text-foreground"
                        : "text-muted-foreground hover:text-foreground",
                    )}
                  >
                    {service.title}
                  </Link>
                ))}
              </div>
            ) : null}

            <div className="relative rounded-xl border border-sky-200 bg-white/85 p-1.5 shadow-sm">
              <Sparkles
                size={14}
                className="pointer-events-none absolute -right-1.5 -top-1.5 text-amber-400 drop-shadow-sm"
                aria-hidden="true"
              />
              <div className="grid gap-1 sm:grid-cols-2">
                {offerLinks.map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    className={cn(
                      "rounded-lg px-3 py-2.5 text-sm font-semibold transition-colors",
                      location.pathname === link.to
                        ? "bg-sky-600 text-white"
                        : "text-slate-700 hover:bg-sky-50 hover:text-sky-800",
                    )}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>

            {standardLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={cn(
                  "rounded-lg px-3 py-2.5 text-sm transition-colors",
                  location.pathname === link.to
                    ? "bg-card text-foreground"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                {link.label}
              </Link>
            ))}

            <Link to="/contact" className="mt-2">
              <Button variant="gradient" size="default" className="w-full">
                Start a Project
              </Button>
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
