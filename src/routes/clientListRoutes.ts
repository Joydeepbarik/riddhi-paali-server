import { Router } from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { createClient, getClients, deleteClient, getClientById, updateClient } from '../controllers/clientListController';

const router = Router();

// Configure Multer for local storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Save to the root 'uploads/clients' directory of the server
    const dir = path.join(__dirname, '../../uploads/clients');
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

router.post('/', upload.single('image'), createClient);
router.get('/', getClients);
router.get('/:id', getClientById);
router.put('/:id', upload.single('image'), updateClient);
router.delete('/:id', deleteClient);

export default router;
