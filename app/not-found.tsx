import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center gap-6 px-6 text-center">
      <p className="text-6xl font-semibold text-textPrimary">404</p>
      <h1 className="text-3xl font-semibold text-textPrimary">Page not found</h1>
      <p className="max-w-xl text-sm text-textSecondary">
        The page you&apos;re looking for doesn&apos;t exist or has been moved. You can return to the homepage and continue
        exploring.
      </p>
      <Link
        href="/"
        className="inline-flex items-center rounded-full bg-gradient-to-r from-accentPrimary via-accentSecondary to-accentHighlight px-6 py-3 text-sm font-semibold text-white shadow-glow"
      >
        Back to Home
      </Link>
    </div>
  );
}
