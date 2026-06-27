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
