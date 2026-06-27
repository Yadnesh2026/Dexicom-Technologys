import { randomUUID } from 'crypto';
import { enquiries } from '../models/enquiryModel.js';

export function createContact(req, res) {
  const enquiry = {
    id: randomUUID(),
    ...req.body,
    createdAt: new Date().toISOString()
  };

  enquiries.push(enquiry);

  res.status(201).json({
    message: 'Thank you. Dexmap Technologies will contact you soon.',
    enquiry
  });
}
