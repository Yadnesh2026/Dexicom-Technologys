import nodemailer from 'nodemailer';

const emailUser = process.env.EMAIL_USER?.trim();
const emailAppPassword = process.env.EMAIL_APP_PASSWORD?.replace(/\s+/g, '');
const emailFromName = process.env.EMAIL_FROM_NAME || 'Dexmap Technologies';
const resendApiKey = process.env.RESEND_API_KEY?.trim();
const resendFromEmail = process.env.RESEND_FROM_EMAIL?.trim();

function isSmtpConfigured() {
  return Boolean(emailUser && emailAppPassword);
}

function isResendConfigured() {
  return Boolean(resendApiKey && resendFromEmail);
}

function escapeHtml(value = '') {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

function buildThankYouEmail(enquiry) {
  const name = escapeHtml(enquiry.name || 'there');
  const phone = escapeHtml(enquiry.phone || 'Not provided');
  const company = escapeHtml(enquiry.company || 'Not provided');

  return {
    to: enquiry.email?.trim(),
    subject: 'Thank you for contacting Dexmap Technologies',
    text: `Hi ${enquiry.name || 'there'},

Thank you for contacting Dexmap Technologies.

We have received your message and our team will contact you soon.

Your submitted details:
Phone: ${enquiry.phone || 'Not provided'}
Company: ${enquiry.company || 'Not provided'}

Regards,
Dexmap Technologies`,
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #172033; max-width: 620px;">
        <h2 style="color: #0f172a; margin-bottom: 12px;">Thank you, ${name}.</h2>
        <p>We have received your message and our team will contact you soon.</p>
        <p style="margin-top: 22px;"><strong>Your submitted details:</strong></p>
        <table style="border-collapse: collapse; width: 100%; margin-top: 8px;">
          <tr>
            <td style="padding: 8px 0; color: #64748b;">Phone</td>
            <td style="padding: 8px 0; font-weight: 600;">${phone}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #64748b;">Company</td>
            <td style="padding: 8px 0; font-weight: 600;">${company}</td>
          </tr>
        </table>
        <p style="margin-top: 24px;">Regards,<br />Dexmap Technologies</p>
      </div>
    `
  };
}

async function sendWithResend(message) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 20000);

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      signal: controller.signal,
      headers: {
        Authorization: `Bearer ${resendApiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: `${emailFromName} <${resendFromEmail}>`,
        to: [message.to],
        subject: message.subject,
        text: message.text,
        html: message.html
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Resend API error ${response.status}: ${errorText}`);
    }

    return response.json();
  } finally {
    clearTimeout(timeout);
  }
}

async function sendWithSmtp(message) {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    requireTLS: true,
    connectionTimeout: 20000,
    greetingTimeout: 20000,
    socketTimeout: 30000,
    auth: {
      user: emailUser,
      pass: emailAppPassword
    }
  });

  return transporter.sendMail({
    from: `"${emailFromName}" <${emailUser}>`,
    to: message.to,
    subject: message.subject,
    text: message.text,
    html: message.html
  });
}

export async function sendThankYouEmail(enquiry) {
  if (!isResendConfigured() && !isSmtpConfigured()) {
    console.warn('Email credentials are not configured. Skipping thank-you email.');
    return { skipped: true };
  }

  const message = buildThankYouEmail(enquiry);

  if (isResendConfigured()) {
    await sendWithResend(message);
    return { sent: true, provider: 'resend' };
  }

  await sendWithSmtp(message);

  return { sent: true, provider: 'smtp' };
}
