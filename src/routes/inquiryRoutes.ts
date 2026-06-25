import express from 'express';
import { createInquiry, getInquiries } from '../controllers/inquiryController';

const router = express.Router();

// POST /api/inquiries
router.post('/', createInquiry);

// GET /api/inquiries
router.get('/', getInquiries);

export default router;
