# Deployment Guide

Recommended simple deployment:

1. Deploy backend as a Node.js web service.
2. Deploy frontend as a static site.
3. Set the frontend `VITE_API_URL` to the backend URL.
4. Set the backend `CLIENT_URL` to the frontend URL.

## Backend

Build command:

```bash
npm install
```

Start command:

```bash
npm start
```

Environment variables:

```text
NODE_ENV=production
CLIENT_URL=https://your-frontend-url
GOOGLE_SHEET_ID=your-google-sheet-id
GOOGLE_SHEET_NAME=Enquiries
GOOGLE_SERVICE_ACCOUNT_EMAIL=your-service-account@project.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY=your-private-key
EMAIL_USER=your-gmail-address@gmail.com
EMAIL_APP_PASSWORD=your-gmail-app-password
EMAIL_FROM_NAME=Dexmap Technologies
```

Health check:

```text
https://your-backend-url/api/health
```

## Frontend

Build command:

```bash
npm install && npm run build
```

Publish directory:

```text
client/dist
```

Environment variables:

```text
VITE_API_URL=https://your-backend-url
```

## Google Sheet Setup

Create a Google Sheet with a tab named:

```text
Enquiries
```

Add this header row:

```text
Created At | ID | Name | Email | Phone | Company | Message | Status
```

Create a Google Cloud service account, enable Google Sheets API, then share the sheet with the service account email as Editor.

Use the sheet ID from the URL:

```text
https://docs.google.com/spreadsheets/d/SHEET_ID_HERE/edit
```

## Gmail Thank-You Email Setup

Use a Gmail App Password, not your normal Gmail password.

Add these variables to Render:

```text
EMAIL_USER=your-gmail-address@gmail.com
EMAIL_APP_PASSWORD=your-16-character-app-password
EMAIL_FROM_NAME=Dexmap Technologies
```
