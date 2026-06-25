import { Router } from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { createGem, getGems, deleteGem, getGemById, updateGem } from '../controllers/gemsController';

const router = Router();

// Configure Multer for local storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Save to the root 'uploads/gems' directory of the server
    const dir = path.join(__dirname, '../../uploads/gems');
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

router.post('/', upload.single('image'), createGem);
router.get('/', getGems);
router.get('/:id', getGemById);
router.put('/:id', upload.single('image'), updateGem);
router.delete('/:id', deleteGem);

export default router;
