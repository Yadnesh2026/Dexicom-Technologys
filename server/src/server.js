import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import contactRoutes from './routes/contactRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({ origin: process.env.CLIENT_URL || 'http://localhost:5173' }));
app.use(express.json());

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Dexicom Technologys API is running' });
});

app.use('/api/contact', contactRoutes);

app.listen(PORT, () => {
  console.log(`Dexicom Technologys server running on http://localhost:${PORT}`);
});
