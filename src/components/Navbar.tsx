import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ChevronDown, Menu, X } from "lucide-react";

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
  { label: "Projects", to: "/projects" },
  { label: "Blog", to: "/blog" },
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const location = useLocation();
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
        scrolled ? "glass-navbar" : "bg-transparent"
      }`}
    >
      <div className="container flex h-full items-center justify-between">
        <Link to="/">
          <Logo />
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          <Link
            to="/"
            className={cn(
              "link-underline px-3 py-2 text-sm transition-colors duration-200",
              location.pathname === "/"
                ? "text-foreground"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            Home
          </Link>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                type="button"
                className={cn(
                  "inline-flex items-center gap-1 px-3 py-2 text-sm transition-colors duration-200",
                  servicesActive
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground",
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

          {navLinks.slice(1).map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={cn(
                "link-underline px-3 py-2 text-sm transition-colors duration-200",
                location.pathname === link.to
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground",
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
          className="p-2 text-foreground lg:hidden"
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

            {navLinks.slice(1).map((link) => (
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
