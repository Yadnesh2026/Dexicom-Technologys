# Dexicom Technologys

A modern startup business website for Dexicom Technologys, built with React.js, plain CSS, Framer Motion, React Icons, Node.js, and Express.js.

## Project Structure

```text
client/
  index.html
  src/
    App.jsx
    main.jsx
    components/
    assets/
server/
  src/
    server.js
    controllers/
    middleware/
    models/
    routes/
```

## Run Locally

Install dependencies:

```bash
npm install
```

Start frontend:

```bash
npm run dev:client
```

Start backend in another terminal:


```bash
npm run dev:server
```

## Backend API

Contact form endpoint:

```text
POST http://localhost:5000/api/contact
```

Contact submissions can be saved to Google Sheets and can send an automatic thank-you email when the Render environment variables are configured.

## Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md).
