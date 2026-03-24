'use client';

import { useState, useEffect } from 'react';

const STORAGE_KEY = 'newsletter_subscribed';

export function NewsletterForm() {
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const [isSubscribed, setIsSubscribed] = useState(false);

  const [emailTouched, setEmailTouched] = useState(false);
  const [nameTouched, setNameTouched] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const subscribed = localStorage.getItem(STORAGE_KEY) === 'true';
      setIsSubscribed(subscribed);
    }
  }, []);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const emailError = emailTouched && !emailRegex.test(email) ? 'Please enter a valid email address' : '';
  const nameError = nameTouched && fullName.trim().length === 0 ? 'Please enter your full name' : '';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Mark fields as touched
    setEmailTouched(true);
    setNameTouched(true);

    if (!emailRegex.test(email) || fullName.trim().length === 0) {
      return;
    }

    setStatus('loading');
    setMessage('');

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: email.trim(), fullName: fullName.trim() }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        if (data.alreadySubscribed) {
          setStatus('error');
          setMessage('You are already subscribed');
        } else {
          setStatus('success');
          setMessage(data.message || 'Successfully subscribed!');
          localStorage.setItem(STORAGE_KEY, 'true');
          setIsSubscribed(true);
          setEmail('');
          setFullName('');
          setEmailTouched(false);
          setNameTouched(false);
        }
      } else {
        setStatus('error');
        setMessage(data.error || 'Something went wrong, please try again later');
      }
    } catch {
      setStatus('error');
      setMessage('Something went wrong, please try again later');
    }
  };

  // Don't render if already subscribed
  if (isSubscribed) {
    return null;
  }

  return (
    <aside className="sticky top-24 hidden lg:block self-start">
      <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-foreground mb-2">Subscribe to Newsletter</h3>
          <p className="text-sm text-muted-foreground">
            Get the latest posts delivered right to your inbox. No spam, unsubscribe anytime.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Full Name Input */}
          <div>
            <label htmlFor="fullName" className="sr-only">
              Full Name
            </label>
            <input
              id="fullName"
              type="text"
              placeholder="Full Name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              onBlur={() => setNameTouched(true)}
              disabled={status === 'loading'}
              className={`w-full px-4 py-2.5 text-sm rounded-lg border ${
                nameError && nameTouched ? 'border-red-500 focus:ring-red-500' : 'border-input focus:ring-primary-500'
              } bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-offset-0 disabled:opacity-50 disabled:cursor-not-allowed transition-colors`}
              required
            />
            {nameError && nameTouched && <p className="mt-1.5 text-xs text-red-600 dark:text-red-400">{nameError}</p>}
          </div>

          {/* Email Input */}
          <div>
            <label htmlFor="email" className="sr-only">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onBlur={() => setEmailTouched(true)}
              disabled={status === 'loading'}
              className={`w-full px-4 py-2.5 text-sm rounded-lg border ${
                emailError && emailTouched ? 'border-red-500 focus:ring-red-500' : 'border-input focus:ring-primary-500'
              } bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-offset-0 disabled:opacity-50 disabled:cursor-not-allowed transition-colors`}
              required
            />
            {emailError && emailTouched && (
              <p className="mt-1.5 text-xs text-red-600 dark:text-red-400">{emailError}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={status === 'loading' || !!emailError || !!nameError}
            className="w-full px-4 py-2.5 text-sm font-semibold text-white bg-primary-600 rounded-lg hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-sm"
          >
            {status === 'loading' ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                Subscribing...
              </span>
            ) : (
              'Subscribe'
            )}
          </button>
        </form>

        {/* Success/Error Message */}
        {message && (
          <div
            className={`mt-4 p-3 rounded-lg text-xs ${
              status === 'success'
                ? 'bg-green-50 text-green-800 border border-green-200 dark:bg-green-900/20 dark:text-green-200 dark:border-green-800'
                : 'bg-red-50 text-red-800 border border-red-200 dark:bg-red-900/20 dark:text-red-200 dark:border-red-800'
            }`}
          >
            {message}
          </div>
        )}

        <p className="mt-4 text-xs text-muted-foreground">
          By subscribing, you agree to receive emails from our blog. You can unsubscribe at any time.
        </p>
      </div>
    </aside>
  );
}
