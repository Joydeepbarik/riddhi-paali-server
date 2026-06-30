import express from 'express';
import { createBlogCategory, getBlogCategories } from '../controllers/blogCategoryController';

const router = express.Router();

// GET /api/blog-categories
router.get('/', getBlogCategories);

// POST /api/blog-categories
router.post('/', createBlogCategory);

export default router;
