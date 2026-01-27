import type { VercelRequest, VercelResponse } from '@vercel/node';

/**
 * ConvertKit Subscribe API Route
 * Securely handles newsletter subscriptions without exposing API keys to the client
 */
export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email, fullName } = req.body;

  // Validate email
  if (!email || typeof email !== 'string' || !email.includes('@')) {
    return res.status(400).json({ error: 'Please enter a valid email address' });
  }

  // Validate full name
  if (!fullName || typeof fullName !== 'string' || fullName.trim().length === 0) {
    return res.status(400).json({ error: 'Please enter your full name' });
  }

  // Get ConvertKit credentials from environment variables
  const CONVERTKIT_API_KEY = process.env.CONVERTKIT_API_KEY;
  const CONVERTKIT_FORM_ID = process.env.CONVERTKIT_FORM_ID;

  if (!CONVERTKIT_API_KEY || !CONVERTKIT_FORM_ID) {
    console.error('Missing ConvertKit configuration in environment variables');
    return res.status(500).json({ error: 'Something went wrong, please try again later' });
  }

  try {
    // Call ConvertKit Forms API
    const response = await fetch(`https://api.convertkit.com/v3/forms/${CONVERTKIT_FORM_ID}/subscribe`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        api_key: CONVERTKIT_API_KEY,
        email: email.trim().toLowerCase(),
        first_name: fullName.trim(),
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('ConvertKit API error:', data);

      // Check if already subscribed
      if (data.error && data.error.includes('already subscribed')) {
        return res.status(200).json({
          success: true,
          alreadySubscribed: true,
          message: 'You are already subscribed',
        });
      }

      return res.status(response.status).json({
        error: data.message || 'Something went wrong, please try again later',
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Successfully subscribed! Check your email for confirmation.',
    });
  } catch (error) {
    console.error('Subscribe error:', error);
    return res.status(500).json({
      error: 'Something went wrong, please try again later',
    });
  }
}
