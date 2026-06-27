import { randomUUID } from 'crypto';
import { enquiries } from '../models/enquiryModel.js';
import { sendThankYouEmail } from '../services/emailService.js';
import { appendEnquiryToSheet } from '../services/googleSheetsService.js';

export async function createContact(req, res) {
  const enquiry = {
    id: randomUUID(),
    ...req.body,
    createdAt: new Date().toISOString()
  };

  try {
    enquiries.push(enquiry);
    await appendEnquiryToSheet(enquiry);
    await sendThankYouEmail(enquiry);

    res.status(201).json({
      message: 'Thank you. Dexmap Technologies will contact you soon.',
      enquiry
    });
  } catch (error) {
    console.error('Contact form submission failed:', error);
    res.status(500).json({
      message: 'Your message could not be submitted right now. Please try again later.'
    });
  }
}
