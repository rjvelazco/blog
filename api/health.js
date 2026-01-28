/**
 * Health check endpoint to verify API routes work
 * @param {import('@vercel/node').VercelRequest} req
 * @param {import('@vercel/node').VercelResponse} res
 */
module.exports = async (req, res) => {
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
};
