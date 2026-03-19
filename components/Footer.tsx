import Link from 'next/link';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/services', label: 'Services' },
  { href: '/case-studies', label: 'Case Studies' },
  { href: '/blog', label: 'Insights' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-backgroundSecondary pt-16 pb-12">
      <div className="container grid gap-10 md:grid-cols-3">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-accentPrimary via-accentSecondary to-accentHighlight font-display text-sm font-bold uppercase text-white shadow-glow">
              NX
            </span>
            <div>
              <p className="font-display text-lg font-semibold">Nexaform</p>
              <p className="text-sm text-textSecondary">software, automation, and digital products</p>
            </div>
          </div>
          <p className="max-w-sm text-sm text-textSecondary">
            We help companies design web platforms, internal systems, AI-enabled workflows, and scalable digital
            products with practical delivery in mind.
          </p>
        </div>

        <div className="grid gap-4">
          <p className="text-sm font-semibold">Navigate</p>
          <div className="grid gap-2 text-sm text-textSecondary">
            {navLinks.map((item) => (
              <Link key={item.href} href={item.href} className="transition hover:text-accentPrimary">
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="grid gap-4">
          <p className="text-sm font-semibold">Talk to us</p>
          <p className="text-sm text-textSecondary">Email: hello@nexaform.com</p>
          <p className="text-sm text-textSecondary">Phone: +977 981-000-0000</p>
          <p className="text-sm text-textSecondary">Location: Nepal, serving global teams</p>
        </div>
      </div>

      <div className="container mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 text-sm text-textSecondary md:flex-row">
        <p>(c) {currentYear} Nexaform. All rights reserved.</p>
        <p>Built for companies growing across software, systems, and automation.</p>
      </div>
    </footer>
  );
}
