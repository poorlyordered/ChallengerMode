import express from 'express';
import { authService } from '../services/auth.service.js';

const router = express.Router();

router.post('/token', async (req, res) => {
  try {
    const tokenData = await authService.getAccessToken();
    res.json(tokenData);
  } catch (error) {
    console.error('Token Route Error:', {
      name: error.name,
      message: error.message,
      status: error.status,
      details: error.details
    });

    res.status(error.status || 500).json({
      error: {
        message: error.message || 'Authentication failed',
        details: error.details || error.message,
        status: error.status || 500
      }
    });
  }
});

export default router;