import express from 'express';
import { getStoneDetails, saveStoneDetails } from '../controllers/stoneDetailsController';

const router = express.Router();

// GET /api/stone-details or /api/stone-details/:id
router.get('/', getStoneDetails);
router.get('/:id', getStoneDetails);

// POST /api/stone-details
router.post('/', saveStoneDetails);

// PUT /api/stone-details/:id
router.put('/:id', saveStoneDetails);

export default router;
