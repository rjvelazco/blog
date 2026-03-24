import type { Metadata } from 'next';
import { NavBar } from '@components/layout/nav-bar';
import Link from 'next/link';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Rafael Velazco',
  description: 'Senior Software Engineer',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const currentYear = new Date().getFullYear();

  return (
    <div className="relative flex flex-col min-h-screen max-w-[68rem] mx-auto px-4 bg-background text-foreground">
      <header className="px-4 py-5 sm:py-6 bg-background-white">
        <div className="flex items-center justify-between w-full mx-auto max-w-[68rem]">
          <div className="flex items-center gap-4">
            <div>
              <h2 className="text-3xl font-bold">Rafael Velazco</h2>
              <p className="text-lg text-muted-foreground">Senior Software Engineer</p>
            </div>
          </div>
          <NavBar />
        </div>
      </header>

      <main className="flex-grow w-full mx-auto px-4">{children}</main>

      <footer className="mt-16 border-t border-[#eeeeee] dark:border-[#2a2a2a]">
        {/* 3-column section */}
        <div className="grid grid-cols-1 gap-8 py-12 sm:grid-cols-3">
          {/* Col 1: Bio */}
          <div className="space-y-3">
            <p className="text-[10px] font-bold tracking-[0.08em] uppercase text-[#aaaaaa]">Rafael Velazco</p>
            <p className="text-sm text-[#666666] dark:text-[#aaaaaa] leading-relaxed">
              Senior Software Engineer escribiendo sobre código, personas e ideas.
            </p>
          </div>

          {/* Col 2: Navigation */}
          <div className="space-y-3">
            <p className="text-[10px] font-bold tracking-[0.08em] uppercase text-[#aaaaaa]">Navegación</p>
            <ul className="space-y-2">
              {[
                { href: '/blog', label: 'Blog' },
                { href: '/portfolio', label: 'Portfolio' },
                { href: 'mailto:rjvelazco21@gmail.com', label: 'Contacto' },
              ].map(({ href, label }) => (
                <li key={label}>
                  <Link
                    href={href}
                    className="text-sm text-[#666666] dark:text-[#aaaaaa] hover:text-primary-700 dark:hover:text-primary-500 transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Topics */}
          <div className="space-y-3">
            <p className="text-[10px] font-bold tracking-[0.08em] uppercase text-[#aaaaaa]">Temas</p>
            <ul className="space-y-2">
              {[
                { href: '/blog?category=Angular', label: 'Angular' },
                { href: '/blog?category=NgRx', label: 'NgRx' },
                { href: '/blog?category=Book', label: 'Libros' },
                { href: '/blog?category=Leadership', label: 'Liderazgo' },
              ].map(({ href, label }) => (
                <li key={label}>
                  <Link
                    href={href}
                    className="text-sm text-[#666666] dark:text-[#aaaaaa] hover:text-primary-700 dark:hover:text-primary-500 transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col-reverse gap-4 border-t border-[#eeeeee] dark:border-[#2a2a2a] py-6 sm:flex-row sm:items-center sm:justify-between">
          <span className="text-sm text-[#aaaaaa]">© {currentYear} Rafael Velazco. All Rights Reserved.</span>
          <ul className="flex items-center gap-4">
            <li>
              <Link href="https://github.com/rjvelazco" aria-label="GitHub">
                <Image
                  className="cursor-pointer opacity-50 hover:opacity-100 transition-opacity"
                  src="/assets/github.svg"
                  alt="GitHub"
                  width={18}
                  height={18}
                />
              </Link>
            </li>
            <li>
              <Link href="https://www.linkedin.com/in/rafael-velazco/" aria-label="LinkedIn">
                <Image
                  className="cursor-pointer opacity-50 hover:opacity-100 transition-opacity"
                  src="/assets/linkedin.svg"
                  alt="LinkedIn"
                  width={18}
                  height={18}
                />
              </Link>
            </li>
            <li>
              <a
                href="mailto:rjvelazco21@gmail.com"
                className="text-sm text-[#aaaaaa] hover:text-primary-700 dark:hover:text-primary-500 transition-colors"
              >
                Contact
              </a>
            </li>
          </ul>
        </div>
      </footer>
    </div>
  );
}
