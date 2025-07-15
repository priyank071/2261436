const API_URL = 'http://localhost:3001';

export const createShortUrl = async (url, validity, shortcode) => {
  const body = { url };
  if (validity) body.validity = validity;
  if (shortcode) body.shortcode = shortcode;

  const response = await fetch(`${API_URL}/shorturls`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  });
  return response.json();
};

export const getAllUrls = async () => {
  const response = await fetch(`${API_URL}/shorturls`);
  return response.json();
};

export const getStats = async (shortcode) => {
  const response = await fetch(`${API_URL}/shorturls/${shortcode}`);
  return response.json();
};
