import type { VercelRequest, VercelResponse } from '@vercel/node';

/**
 * Health check endpoint to verify API routes work
 */
export default async function handler(req: VercelRequest, res: VercelResponse) {
  const hasApiKey = !!process.env.CONVERTKIT_API_KEY;
  const hasFormId = !!process.env.CONVERTKIT_FORM_ID;

  return res.status(200).json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    env: {
      hasApiKey,
      hasFormId,
      formIdLength: process.env.CONVERTKIT_FORM_ID?.length || 0,
    },
  });
}
