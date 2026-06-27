import express from 'express';
import { createCategory, getCategories } from '../controllers/stoneCategoryController';

const router = express.Router();

// GET /api/stone-categories
router.get('/', getCategories);

// POST /api/stone-categories
router.post('/', createCategory);

export default router;
