'use client';

import { useState, useEffect } from 'react';
import { NewsletterForm } from '@components/ui/newsletter-form';

interface BlogPostLayoutProps {
  children: React.ReactNode;
}

const STORAGE_KEY = 'newsletter_subscribed';

export function BlogPostLayout({ children }: BlogPostLayoutProps) {
  const [isSubscribed, setIsSubscribed] = useState(false);

  useEffect(() => {
    const subscribed = localStorage.getItem(STORAGE_KEY) === 'true';
    // eslint-disable-next-line react-hooks/exhaustive-deps
    setIsSubscribed(subscribed);
  }, []);

  // After hydration, conditionally show grid based on subscription status
  if (isSubscribed) {
    // Full width layout when subscribed
    return <div className="mx-auto max-w-4xl">{children}</div>;
  }

  // Two-column layout when not subscribed
  return (
    <div className="lg:grid lg:grid-cols-[1fr_320px] lg:gap-8 xl:gap-12">
      <div className="min-w-0">{children}</div>
      <NewsletterForm />
    </div>
  );
}
