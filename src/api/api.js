import { API_BASE_URL } from './config';
export { API_BASE_URL };

export async function getEvents() {
  const res = await fetch(`${API_BASE_URL}/api/events/`);
  if (!res.ok) throw new Error(`Failed to fetch events: ${res.status}`);
  return res.json();
}

export async function getSermons() {
  const res = await fetch(`${API_BASE_URL}/api/sermons/`);
  if (!res.ok) throw new Error(`Failed to fetch sermons: ${res.status}`);
  return res.json();
}

export async function getGallery() {
  const res = await fetch(`${API_BASE_URL}/api/gallery/`);
  if (!res.ok) throw new Error(`Failed to fetch gallery: ${res.status}`);
  return res.json();
}

export async function createPrayerRequest(data) {
  const res = await fetch(`${API_BASE_URL}/api/prayer-requests`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  const result = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(result.message || `Failed to submit prayer request: ${res.status}`);
  }
  return result;
}

export async function createContactMessage(data) {
  // Build message body - include subject line if provided
  let messageBody = data.details || data.message || '';
  if (data.subject) {
    messageBody = `[${data.subject}]\n\n${messageBody}`;
  }
  if (data.phone) {
    messageBody = `${messageBody}\n\nPhone: ${data.phone}`;
  }

  const payload = {
    name: data.name,
    email: data.email,
    subject: data.subject || '',
    message: messageBody,
  };
  const res = await fetch(`${API_BASE_URL}/api/contact`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  const result = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(result.message || `Failed to submit message: ${res.status}`);
  }
  return result;
}

export async function createGiving(data) {
  const res = await fetch(`${API_BASE_URL}/api/giving`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  const result = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(result.message || `Failed to submit giving record: ${res.status}`);
  }
  return result;
}
