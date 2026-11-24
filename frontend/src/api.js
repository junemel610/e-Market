import Constants from 'expo-constants';

const backendUrl = (
  Constants.expoConfig?.extra?.backendUrl ||
  Constants.manifest?.extra?.backendUrl ||
  'http://localhost:8000'
).replace(/\/$/, '');

export async function apiRequest(path, { method = 'GET', body, token } = {}) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 8000);
  let response;
  try {
    response = await fetch(`${backendUrl}${path}`, {
      method,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      ...(body ? { body: JSON.stringify(body) } : {}),
      signal: controller.signal,
    });
  } catch (error) {
    if (error.name === 'AbortError') throw new Error('The local API did not respond in time. Check that it is running and the URL is correct.');
    throw new Error('Could not reach the local API. Check that it is running and the URL is correct.');
  } finally {
    clearTimeout(timeout);
  }

  const data = await response.json().catch(() => ({}));
  if (!response.ok || data.success === false) {
    const error = new Error(data.message || `Request failed (${response.status}).`);
    error.status = response.status;
    throw error;
  }

  return data;
}
