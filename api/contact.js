export default function handler(request, response) {
  if (request.method !== 'POST') {
    return response.status(405).json({ error: 'Method not allowed.' })
  }
  const { name, email, message } = request.body ?? {}
  if (![name, email, message].every(value => typeof value === 'string' && value.trim())) {
    return response.status(400).json({ error: 'Please complete every field.' })
  }
  // Replace this with a database or email provider when contact-message persistence is needed.
  return response.status(201).json({ ok: true, message: 'Thanks — your note is on its way.' })
}
