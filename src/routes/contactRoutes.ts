import express from 'express';
import { createContact, getContacts } from '../controllers/contactController';

const router = express.Router();

// POST /api/contacts
router.post('/', createContact);

// GET /api/contacts
router.get('/', getContacts);

export default router;
