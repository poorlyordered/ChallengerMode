import express from 'express';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();

router.get('/test-token', async (req, res) => {
  try {
    const response = await axios.post(
      'https://publicapi.challengermode.com/v1/auth/access_keys',
      {
        refreshKey: process.env.REFRESH_KEY
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      }
    );

    // Return the raw response data without wrapping it
    res.json(response.data);
  } catch (error) {
    console.error('Token Test Error:', {
      status: error.response?.status,
      data: error.response?.data,
      message: error.message
    });

    res.status(error.response?.status || 500).json({
      error: error.response?.data?.error || error.message
    });
  }
});

export default router;