'use client';

import { useState, useEffect } from 'react';

export const SubscriberMessage = () => {
  const [isSubscribed, setIsSubscribed] = useState(false);

  useEffect(() => {
    const subscribed = localStorage.getItem('newsletter_subscribed') === 'true';
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
