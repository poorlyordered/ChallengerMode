import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { apiService } from './services/api.service.js';
import { AuthError, ApiError } from './utils/errors.js';
import testAuthRouter from './routes/test-auth.js';

dotenv.config();

const app = express();
const port = 3000;

app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:5174', 'https://*.webcontainer.io'],
  methods: ['GET', 'POST', 'OPTIONS'],
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

// Security headers
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  next();
});

// Test auth routes
app.use('/api/test', testAuthRouter);

app.get('/api/spaces', async (req, res, next) => {
  try {
    const spaceId = 'RankingofLegends';
    const data = await apiService.fetchSpace(spaceId);
    res.json({ items: [data], total: 1 });
  } catch (error) {
    next(error);
  }
});

app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok',
    timestamp: new Date().toISOString()
  });
});

// Error handler middleware
app.use((err, req, res, next) => {
  console.error('Server Error:', {
    name: err.name,
    message: err.message,
    status: err.status,
    details: err.details,
    path: req.path
  });

  if (err instanceof AuthError || err instanceof ApiError) {
    return res.status(err.status).json({
      error: {
        message: err.message,
        details: err.details
      }
    });
  }

  res.status(500).json({
    error: {
      message: 'An unexpected error occurred',
      details: process.env.NODE_ENV === 'development' ? err.message : undefined
    }
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});