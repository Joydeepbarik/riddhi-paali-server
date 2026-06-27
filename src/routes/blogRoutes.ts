import { Router } from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { createBlog, getBlogs, getBlogById, updateBlog, deleteBlog } from '../controllers/blogController';

const router = Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = path.join(__dirname, '../../uploads/blogs');
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

router.post('/', upload.fields([{ name: 'image', maxCount: 1 }, { name: 'ogImage', maxCount: 1 }]), createBlog);
router.get('/', getBlogs);
router.get('/:id', getBlogById);
router.put('/:id', upload.fields([{ name: 'image', maxCount: 1 }, { name: 'ogImage', maxCount: 1 }]), updateBlog);
router.delete('/:id', deleteBlog);

export default router;
