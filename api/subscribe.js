/**
 * ConvertKit Subscribe API Route (v4 API)
 * Securely handles newsletter subscriptions without exposing API keys to the client
 * @param {import('@vercel/node').VercelRequest} req
 * @param {import('@vercel/node').VercelResponse} res
 */
module.exports = async (req, res) => {
  try {
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

    // Call ConvertKit v4 Forms API
    const apiResponse = await fetch(`https://api.kit.com/v4/forms/${CONVERTKIT_FORM_ID}/subscribers`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Kit-Api-Key': CONVERTKIT_API_KEY,
      },
      body: JSON.stringify({
        email_address: email.trim().toLowerCase(),
        first_name: fullName.trim(),
      }),
    });

    const data = await apiResponse.json();

    if (!apiResponse.ok) {
      console.error('ConvertKit API error:', apiResponse.status, data);

      // Check if already subscribed (v4 API might return different error format)
      const errorMessage = data.error || data.message || JSON.stringify(data);
      if (
        errorMessage.toLowerCase().includes('already subscribed') ||
        errorMessage.toLowerCase().includes('already exists')
      ) {
        return res.status(200).json({
          success: true,
          alreadySubscribed: true,
          message: 'You are already subscribed',
        });
      }

      return res.status(apiResponse.status).json({
        error: data.message || data.error || 'Something went wrong, please try again later',
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Successfully subscribed! Check your email for confirmation.',
    });
  } catch (error) {
    console.error('Subscribe handler error:', error);
    return res.status(500).json({
      error: 'Something went wrong, please try again later',
      debug: process.env.NODE_ENV === 'development' ? String(error) : undefined,
    });
  }
};
