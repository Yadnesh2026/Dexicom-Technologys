import nodemailer from 'nodemailer';

const emailUser = process.env.EMAIL_USER;
const emailAppPassword = process.env.EMAIL_APP_PASSWORD;
const emailFromName = process.env.EMAIL_FROM_NAME || 'Dexmap Technologies';

function isEmailConfigured() {
  return Boolean(emailUser && emailAppPassword);
}

export async function sendThankYouEmail(enquiry) {
  if (!isEmailConfigured()) {
    console.warn('Email credentials are not configured. Skipping thank-you email.');
    return { skipped: true };
  }

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: emailUser,
      pass: emailAppPassword
    }
  });

  await transporter.sendMail({
    from: `"${emailFromName}" <${emailUser}>`,
    to: enquiry.email,
    subject: 'Thank you for contacting Dexmap Technologies',
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #172033;">
        <h2>Thank you, ${enquiry.name}.</h2>
        <p>We received your message and our team will reach you soon.</p>
        <p><strong>Your submitted details:</strong></p>
        <ul>
          <li><strong>Phone:</strong> ${enquiry.phone}</li>
          <li><strong>Company:</strong> ${enquiry.company || 'Not provided'}</li>
        </ul>
        <p>Regards,<br />Dexmap Technologies</p>
      </div>
    `
  });

  return { sent: true };
}
