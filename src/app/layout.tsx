import React from 'react';
import { Inter } from 'next/font/google';
import type { Metadata } from 'next';

import { ThemeProvider } from '@components/providers/theme-provider';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://www.rjvelazco.com'),
  title: 'Rafael Velazco',
  description: 'Senior Software Engineer',
};

const inter = Inter({ subsets: ['latin'], display: 'swap' });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.className} suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* eslint-disable-next-line @next/next/google-font-display, @next/next/no-page-custom-font */}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..20&icon_names=arrow_left_alt,arrow_right_alt,check,content_copy,dark_mode,ios_share,light_mode,link,menu,palette,settings,share&display=block"
        />
      </head>
      <body suppressHydrationWarning>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
