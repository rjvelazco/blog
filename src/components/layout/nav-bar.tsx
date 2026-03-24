'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

import { usePathname } from 'next/navigation';
import { ThemeToggle } from '@components/ui/theme-toggle';
import { cn } from '@components/utils';

export const NavBar = () => {
  return (
    <nav className="px-6 py-4 pr-0" aria-label="Main Navigation">
      <ul className="hidden md:flex justify-center gap-1 items-center">
        <NavItem href="/" label="Home" />
        <NavItem href="/blog" label="Blog" />
        {/* <NavItem href="/logs" label="Logs" /> */}
        <NavItem href="/portfolio" label="Portfolio" />
        <NavItem href="mailto:rjvelazco21@gmail.com" label="Contacto" />
        <li className="ml-2">
          <ThemeToggle />
        </li>
      </ul>

      <MobileMenu />
    </nav>
  );
};

const MobileMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const handleOpenMenu = () => setIsOpen(true);
  const handleCloseMenu = () => setIsOpen(false);

  return (
    <div className="md:hidden">
      <button className="cursor-pointer" onClick={() => handleOpenMenu()}>
        <span className="material-symbol text-foreground" style={{ fontSize: '2.5rem' }}>
          menu
        </span>
      </button>

      {isOpen && <div className="fixed inset-0 bg-black/30" onClick={() => handleCloseMenu()} aria-hidden="true" />}
      <ul
        className={`fixed top-0 right-0 w-0 h-full shadow-xl bg-background border-l border-border flex flex-col gap-6 overflow-x-hidden duration-500 font-bold z-100 pt-14 pb-10 ${
          isOpen ? 'w-[264px] px-6' : ''
        }`}
      >
        <button className="absolute top-4 left-8 cursor-pointer" onClick={() => handleCloseMenu()}>
          <span className="material-symbol text-foreground">arrow_left_alt</span>
        </button>
        <NavItem href="/" label="Home" />
        <NavItem href="/portfolio" label="Portfolio" />
        <NavItem href="mailto:rjvelazco21@gmail.com" label="Contact" />

        <div className="pt-2">
          <ThemeToggle />
        </div>

        <div className="flex-1 flex gap-2 justify-end items-end">
          <Link href="https://github.com/rjvelazco">
            <Image src="/assets/github.svg" alt="GitHub" width={24} height={24} />
          </Link>
          <Link href="https://www.linkedin.com/in/rafael-velazco/">
            <Image src="/assets/linkedin.svg" alt="LinkedIn" width={24} height={24} />
          </Link>
        </div>
      </ul>
    </div>
  );
};

const NavItem = ({ href, label }: { href: string; label: string }) => {
  const pathname = usePathname();
  const mainPath = pathname.split('/')[1];
  const isActive = `/${mainPath}` === href;

  return (
    <li>
      <Link href={href}>
        <span
          className={cn(
            'px-3 py-2 rounded-md transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background',
            'text-muted-foreground hover:text-foreground hover:bg-accent/60',
            isActive &&
              'text-primary-700 dark:text-primary-500 underline decoration-primary-700 dark:decoration-primary-500 underline-offset-8'
          )}
          aria-label={`Navigate to ${label}`}
        >
          {label}
        </span>
      </Link>
    </li>
  );
};
