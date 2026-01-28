/**
 * Validates that the request method is POST
 * @param {import('@vercel/node').VercelRequest} req
 * @param {import('@vercel/node').VercelResponse} res
 * @returns {boolean} Returns false if method is invalid (response already sent)
 */
function validateMethod(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return false;
  }
  return true;
}

/**
 * Gets and validates the ConvertKit API key from environment variables
 * @returns {string|null} Returns the API key or null if missing
 */
function getApiKey() {
  const apiKey = process.env.CONVERTKIT_API_KEY;
  if (!apiKey) {
    console.error('Missing CONVERTKIT_API_KEY in environment variables');
  }
  return apiKey;
}

/**
 * Parses a full name into first and last name
 * @param {string} fullName
 * @returns {{firstName: string, lastName: string}}
 */
function parseName(fullName) {
  const trimmedName = fullName.trim();
  const nameParts = trimmedName.split(/\s+/);
  const firstName = nameParts[0] || trimmedName;
  const lastName = nameParts.slice(1).join(' ') || '';
  return { firstName, lastName };
}

/**
 * Normalizes an email address
 * @param {string} email
 * @returns {string}
 */
function normalizeEmail(email) {
  return email.trim().toLowerCase();
}

/**
 * Builds the request body for ConvertKit API
 * @param {string} email
 * @param {string} firstName
 * @param {string} lastName
 * @returns {object}
 */
function buildRequestBody(email, firstName, lastName) {
  const requestBody = {
    email_address: email,
    first_name: firstName,
    state: 'active',
  };

  if (lastName) {
    requestBody.fields = {
      'Last name': lastName,
    };
  }

  return requestBody;
}

/**
 * Subscribes a user to ConvertKit
 * @param {string} apiKey
 * @param {object} requestBody
 * @returns {Promise<Response>}
 */
async function subscribeToConvertKit(apiKey, requestBody) {
  return fetch('https://api.kit.com/v4/subscribers', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Kit-Api-Key': apiKey,
    },
    body: JSON.stringify(requestBody),
  });
}

/**
 * Checks if the error indicates the user is already subscribed
 * @param {object} data
 * @param {number} status
 * @returns {boolean}
 */
function isAlreadySubscribed(data, status) {
  const errorMessage = data.error || data.message || JSON.stringify(data);
  const errorString = errorMessage.toLowerCase();

  return (
    errorString.includes('already subscribed') ||
    errorString.includes('already exists') ||
    errorString.includes('duplicate') ||
    status === 422
  );
}

/**
 * Handles API error responses
 * @param {import('@vercel/node').VercelResponse} res
 * @param {Response} apiResponse
 * @param {object} data
 */
function handleApiError(res, apiResponse, data) {
  console.error('ConvertKit API error:', apiResponse.status, data);

  if (isAlreadySubscribed(data, apiResponse.status)) {
    return res.status(200).json({
      success: true,
      alreadySubscribed: true,
      message: 'You are already subscribed',
    });
  }

  const statusCode = apiResponse.status >= 400 && apiResponse.status < 500 ? apiResponse.status : 500;
  res.status(statusCode).json({
    error: data.message || data.error || 'Something went wrong, please try again later',
  });
}

/**
 * Handles successful API responses
 * @param {import('@vercel/node').VercelResponse} res
 */
function handleApiSuccess(res) {
  res.status(200).json({
    success: true,
    message: 'Successfully subscribed! Check your email for confirmation.',
  });
}

/**
 * ConvertKit Subscribe API Route (v4 API)
 * Securely handles newsletter subscriptions without exposing API keys to the client
 * @param {import('@vercel/node').VercelRequest} req
 * @param {import('@vercel/node').VercelResponse} res
 */
module.exports = async (req, res) => {
  try {
    if (!validateMethod(req, res)) return;

    const { email, fullName } = req.body;
    const apiKey = getApiKey();

    if (!apiKey) {
      return res.status(500).json({ error: 'Something went wrong, please try again later' });
    }

    const { firstName, lastName } = parseName(fullName);
    const normalizedEmail = normalizeEmail(email);
    const requestBody = buildRequestBody(normalizedEmail, firstName, lastName);

    const apiResponse = await subscribeToConvertKit(apiKey, requestBody);
    const data = await apiResponse.json();

    if (!apiResponse.ok) {
      return handleApiError(res, apiResponse, data);
    }

    handleApiSuccess(res);
  } catch (error) {
    console.error('Subscribe handler error:', error);
    res.status(500).json({
      error: 'Something went wrong, please try again later',
      debug: process.env.NODE_ENV === 'development' ? String(error) : undefined,
    });
  }
};
