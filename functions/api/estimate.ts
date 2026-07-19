/**
 * Cloudflare Pages Function — handles Request an Estimate / Contact form submissions.
 * Deployed automatically by Cloudflare Pages from /functions, separate from the
 * static Astro build. See FORM_SETUP.md for required environment variables.
 */

interface Env {
  RESEND_API_KEY: string;
  ESTIMATE_TO_EMAIL: string;
  ESTIMATE_FROM_EMAIL: string;
}

interface EstimatePayload {
  formType?: string;
  name?: string;
  phone?: string;
  email?: string;
  zip?: string;
  propertyType?: string;
  serviceNeeded?: string;
  urgency?: string;
  contactMethod?: string;
  message?: string;
  consent?: string;
  companyWebsite?: string; // honeypot
  formStartedAt?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmContent?: string;
  gclid?: string;
}

// Base fields required for every submission. The estimate form additionally
// requires serviceNeeded, urgency, and message; email is optional on both
// forms (phone is the primary required contact method).
const REQUIRED_FIELDS = ['name', 'phone', 'zip', 'consent'] as const;
const ESTIMATE_REQUIRED_FIELDS = ['serviceNeeded', 'urgency', 'message'] as const;
const MIN_SUBMIT_SECONDS = 3; // rejects submissions faster than a human could plausibly fill the form

function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function jsonResponse(body: Record<string, unknown>, status: number): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}

export const onRequestPost = async (context: { request: Request; env: Env }): Promise<Response> => {
  const { request, env } = context;

  let payload: EstimatePayload;
  try {
    payload = await request.json();
  } catch {
    return jsonResponse({ error: 'Invalid request body' }, 400);
  }

  // Honeypot: real users never see or fill this field.
  if (payload.companyWebsite) {
    return jsonResponse({ ok: true }, 200); // silently accept to avoid tipping off bots
  }

  // Timing check: reject submissions that happen implausibly fast.
  const startedAt = Number(payload.formStartedAt);
  if (startedAt && Date.now() - startedAt < MIN_SUBMIT_SECONDS * 1000) {
    return jsonResponse({ ok: true }, 200);
  }

  for (const field of REQUIRED_FIELDS) {
    if (!payload[field]) {
      return jsonResponse({ error: `Missing required field: ${field}` }, 400);
    }
  }

  if (payload.formType !== 'contact') {
    for (const field of ESTIMATE_REQUIRED_FIELDS) {
      if (!payload[field]) {
        return jsonResponse({ error: `Missing required field: ${field}` }, 400);
      }
    }
  }

  // Email is optional on both forms, but must be well-formed if provided.
  if (payload.email && !isValidEmail(payload.email)) {
    return jsonResponse({ error: 'Invalid email address' }, 400);
  }

  if (!env.RESEND_API_KEY || !env.ESTIMATE_TO_EMAIL || !env.ESTIMATE_FROM_EMAIL) {
    return jsonResponse({ error: 'Form is not fully configured. See FORM_SETUP.md.' }, 500);
  }

  const subject =
    payload.formType === 'contact'
      ? `New contact form message from ${payload.name}`
      : `New estimate request from ${payload.name} (${payload.serviceNeeded ?? 'unspecified service'})`;

  const lines = [
    `Form type: ${payload.formType ?? 'estimate'}`,
    `Name: ${payload.name}`,
    `Phone: ${payload.phone}`,
    payload.email ? `Email: ${payload.email}` : null,
    `ZIP: ${payload.zip}`,
    payload.propertyType ? `Property type: ${payload.propertyType}` : null,
    payload.serviceNeeded ? `Service needed: ${payload.serviceNeeded}` : null,
    payload.urgency ? `Urgency: ${payload.urgency}` : null,
    payload.contactMethod ? `Preferred contact method: ${payload.contactMethod}` : null,
    payload.message ? `Message: ${payload.message}` : null,
    payload.utmSource || payload.utmMedium || payload.utmCampaign || payload.utmContent || payload.gclid
      ? `Campaign: source=${payload.utmSource || '-'} medium=${payload.utmMedium || '-'} campaign=${payload.utmCampaign || '-'} content=${payload.utmContent || '-'} gclid=${payload.gclid || '-'}`
      : null,
  ].filter(Boolean);

  try {
    const emailResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: env.ESTIMATE_FROM_EMAIL,
        to: env.ESTIMATE_TO_EMAIL,
        reply_to: payload.email,
        subject,
        text: lines.join('\n'),
      }),
    });

    if (!emailResponse.ok) {
      return jsonResponse({ error: 'Failed to send message' }, 502);
    }
  } catch {
    return jsonResponse({ error: 'Failed to send message' }, 502);
  }

  return jsonResponse({ ok: true }, 200);
};

export const onRequestGet = async (): Promise<Response> => {
  return jsonResponse({ error: 'Method not allowed' }, 405);
};
