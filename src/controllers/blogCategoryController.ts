import { Request, Response } from 'express';
import BlogCategory from '../models/blogCategory';

// Get all blog categories
export const getBlogCategories = async (req: Request, res: Response) => {
    try {
        const categories = await BlogCategory.find().sort({ name: 1 });
        res.status(200).json({
            success: true,
            data: categories
        });
    } catch (error) {
        console.error('Error fetching blog categories:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch blog categories',
            error: error instanceof Error ? error.message : 'Unknown error'
        });
    }
};

// Create a new blog category
export const createBlogCategory = async (req: Request, res: Response): Promise<void> => {
    try {
        const { name } = req.body;
        if (!name || typeof name !== 'string' || !name.trim()) {
            res.status(400).json({
                success: false,
                message: 'Category name is required'
            });
            return;
        }

        const trimmedName = name.trim();

        // Check if category already exists case-insensitively
        const existingCategory = await BlogCategory.findOne({
            name: { $regex: new RegExp(`^${trimmedName}$`, 'i') }
        });

        if (existingCategory) {
            res.status(200).json({
                success: true,
                message: 'Category already exists',
                data: existingCategory
            });
            return;
        }

        const newCategory = new BlogCategory({ name: trimmedName });
        const savedCategory = await newCategory.save();

        res.status(201).json({
            success: true,
            message: 'Blog category added successfully',
            data: savedCategory
        });
    } catch (error) {
        console.error('Error creating blog category:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to add blog category',
            error: error instanceof Error ? error.message : 'Unknown error'
        });
    }
};
