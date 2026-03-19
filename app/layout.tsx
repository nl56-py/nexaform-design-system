import type { Metadata } from 'next';
import './globals.css';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';

export const metadata: Metadata = {
  title: {
    default: 'Nexaform - software, automation, and digital products',
    template: '%s | Nexaform',
  },
  description:
    'Nexaform helps companies build software, automate workflows, and launch digital products with practical strategy and delivery.',
  openGraph: {
    title: 'Nexaform - software, automation, and digital products',
    description:
      'Custom software, web applications, AI automation, and digital product delivery for growth-focused businesses.',
    type: 'website',
  },
  icons: {
    icon: '/favicon.svg',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-background text-textPrimary">
        <div className="min-h-screen overflow-x-hidden">
          <Navbar />
          <main>{children}</main>
        </div>
        <Footer />
      </body>
    </html>
  );
}
