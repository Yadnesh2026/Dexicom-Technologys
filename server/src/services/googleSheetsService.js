import { google } from 'googleapis';

const sheetId = process.env.GOOGLE_SHEET_ID;
const sheetName = process.env.GOOGLE_SHEET_NAME || 'Enquiries';
const serviceAccountEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
const privateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n');

function isGoogleSheetsConfigured() {
  return Boolean(sheetId && serviceAccountEmail && privateKey);
}

function getSheetsClient() {
  const auth = new google.auth.JWT({
    email: serviceAccountEmail,
    key: privateKey,
    scopes: ['https://www.googleapis.com/auth/spreadsheets']
  });

  return google.sheets({ version: 'v4', auth });
}

export async function appendEnquiryToSheet(enquiry) {
  if (!isGoogleSheetsConfigured()) {
    console.warn('Google Sheets credentials are not configured. Skipping sheet save.');
    return { skipped: true };
  }

  const sheets = getSheetsClient();

  await sheets.spreadsheets.values.append({
    spreadsheetId: sheetId,
    range: `${sheetName}!A:H`,
    valueInputOption: 'USER_ENTERED',
    insertDataOption: 'INSERT_ROWS',
    requestBody: {
      values: [[
        enquiry.createdAt,
        enquiry.id,
        enquiry.name,
        enquiry.email,
        enquiry.phone,
        enquiry.company || '',
        enquiry.message,
        'New'
      ]]
    }
  });

  return { saved: true };
}
