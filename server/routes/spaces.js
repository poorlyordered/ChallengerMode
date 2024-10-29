import express from 'express';
import { fetchSpace } from '../services/api.js';

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const space = await fetchSpace('RankingofLegends');
    res.json({
      items: [space],
      total: 1
    });
  } catch (error) {
    const status = error.response?.status || 500;
    res.status(status).json({
      error: {
        message: 'Failed to fetch space data',
        details: error.response?.data?.message || error.message,
        status
      }
    });
  }
});

export default router;