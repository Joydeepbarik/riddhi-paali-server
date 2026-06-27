import express from 'express';
import { createLanguage, getLanguages } from '../controllers/languageController';

const router = express.Router();

// GET /api/languages
router.get('/', getLanguages);

// POST /api/languages
router.post('/', createLanguage);

export default router;
