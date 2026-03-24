'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { TableOfContents } from '@components/mdx/table-of-contents';
import { SharePost } from '@components/ui/share-post';
import { BlogPostLayout } from '@components/layout/blog-post-layout';

interface MdxLayoutProps {
  children: React.ReactNode;
  metadata: {
    title: string;
    date: string;
    description: string;
    category: string;
    publishDate: string;
    alternates?: {
      canonical?: string;
    };
    openGraph?: {
      url?: string;
    };
  };
  image?: string;
  toc?: Parameters<typeof TableOfContents>[0]['toc'];
}

export default function MdxLayout({ children, metadata, image, toc }: MdxLayoutProps) {
  return (
    <div className="mx-auto w-full max-w-7xl ">
      {/* Back to blog navigation */}
      <nav className="mb-8 pt-6">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-primary-500 hover:bg-accent hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          aria-label="Back to Blog"
        >
          <span className="material-symbol">arrow_left_alt</span>
          Volver al explorador
        </Link>
      </nav>

      {/* Two-column layout: content on left, newsletter on right (desktop only) */}
      <BlogPostLayout>
        <ArticleHeader metadata={metadata} image={image} />

        {/* Article content */}
        <article className="prose prose-lg prose-zinc max-w-none prose-headings:scroll-mt-20 prose-pre:bg-zinc-900 prose-pre:text-zinc-100 prose-a:text-primary-600 prose-a:decoration-primary-300 prose-a:underline-offset-4 hover:prose-a:text-primary-700 dark:prose-invert dark:prose-a:text-primary-300 dark:hover:prose-a:text-primary-200 dark:prose-pre:bg-zinc-950">
          {toc && toc.length > 0 ? <TableOfContents toc={toc} /> : null}
          {children}
        </article>

        {/* Article footer with navigation back to blog */}
        <ArticleFooter />
      </BlogPostLayout>
    </div>
  );
}

/**
 * Article header component
 * @param metadata - Article metadata
 * @param image - Article cover image
 * @returns Article header component
 */
const ArticleHeader = ({ metadata, image }: { metadata: MdxLayoutProps['metadata']; image?: string }) => {
  const postUrl = metadata.alternates?.canonical ?? metadata.openGraph?.url ?? '/';
  return (
    <header className="mb-12 border-b border-border pb-8">
      {image && (
        <div className="relative mb-8 aspect-[16/9] w-full overflow-hidden rounded-2xl ring-1 ring-black/5 shadow-sm">
          <Image
            src={image}
            alt={metadata.title || 'Article cover image'}
            fill
            priority
            className="object-cover"
            sizes="(min-width: 1024px) 896px, (min-width: 640px) 640px, 100vw"
          />
        </div>
      )}
      <h1 className="mb-5 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl lg:text-5xl leading-tight">
        {metadata.title}
      </h1>

      <div className="mb-5 flex items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
          <time
            dateTime={metadata.publishDate}
            className="inline-flex items-center rounded-full bg-muted px-3 py-1 font-medium text-muted-foreground"
          >
            {new Date(metadata.publishDate).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </time>
          <span className="inline-flex items-center rounded-full bg-primary-50 text-primary-700 dark:bg-primary-900/40 dark:text-primary-200 px-3 py-1 font-medium ring-1 ring-border">
            {metadata.category}
          </span>

          <span className="inline-flex items-center rounded-full bg-muted px-3 py-1 font-medium text-muted-foreground">
            Rafael Velazco
          </span>
        </div>

        <SharePost url={postUrl} className="shrink-0" />
      </div>

      <p className="max-w-prose text-base leading-relaxed text-muted-foreground sm:text-lg">{metadata.description}</p>
    </header>
  );
};

/**
 * Article footer component
 * @returns Article footer component
 */
const ArticleFooter = () => {
  return (
    <footer className="mt-14 border-t border-border pt-8 pb-10">
      <div className="rounded-2xl bg-muted/40 p-4 ring-1 ring-border sm:p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <Link
            href="/blog"
            className="inline-flex w-full items-center justify-center rounded-xl bg-primary-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-primary-700 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 sm:w-auto"
            aria-label="More Articles"
          >
            <svg className="mr-2 h-4 w-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path
                fillRule="evenodd"
                d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                clipRule="evenodd"
              />
            </svg>
            Más artículos
          </Link>

          <SubscriberMessage />
        </div>
      </div>
    </footer>
  );
};

/**
 * Subscriber message component (client-side)
 * Shows different message if user is subscribed to newsletter
 */
const SubscriberMessage = () => {
  const [isSubscribed, setIsSubscribed] = useState(false);

  useEffect(() => {
    const subscribed = localStorage.getItem('newsletter_subscribed') === 'true';
    setIsSubscribed(subscribed);
  }, []);

  if (isSubscribed) {
    return (
      <div className="text-center text-sm text-muted-foreground sm:text-right">
        <div className="font-medium text-foreground">¡Gracias por leer!</div>
        <div className="mt-0.5 text-muted-foreground">Eres un suscriptor actual del blog</div>
      </div>
    );
  }

  return (
    <div className="text-center text-sm text-muted-foreground sm:text-right">
      <div className="font-medium text-foreground">¡Gracias por leer!</div>
      <div className="mt-0.5 text-muted-foreground">¿Quieres más artículos como este? Explora la sección de blog.</div>
    </div>
  );
};
