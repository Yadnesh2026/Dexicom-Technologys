import nodemailer from 'nodemailer';

const emailUser = process.env.EMAIL_USER?.trim();
const emailAppPassword = process.env.EMAIL_APP_PASSWORD?.replace(/\s+/g, '');
const emailFromName = process.env.EMAIL_FROM_NAME || 'Dexmap Technologies';

function isEmailConfigured() {
  return Boolean(emailUser && emailAppPassword);
}

function escapeHtml(value = '') {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

export async function sendThankYouEmail(enquiry) {
  if (!isEmailConfigured()) {
    console.warn('Email credentials are not configured. Skipping thank-you email.');
    return { skipped: true };
  }

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    connectionTimeout: 10000,
    greetingTimeout: 10000,
    socketTimeout: 15000,
    auth: {
      user: emailUser,
      pass: emailAppPassword
    }
  });

  const name = escapeHtml(enquiry.name || 'there');
  const phone = escapeHtml(enquiry.phone || 'Not provided');
  const company = escapeHtml(enquiry.company || 'Not provided');

  await transporter.sendMail({
    from: `"${emailFromName}" <${emailUser}>`,
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
  });

  return { sent: true };
}
