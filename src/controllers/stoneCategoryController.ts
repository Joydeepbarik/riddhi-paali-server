import { Request, Response } from 'express';
import StoneCategory from '../models/stoneCategory';

// Get all stone categories
export const getCategories = async (req: Request, res: Response) => {
    try {
        const categories = await StoneCategory.find().sort({ name: 1 });
        res.status(200).json({
            success: true,
            data: categories
        });
    } catch (error) {
        console.error('Error fetching stone categories:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch stone categories',
            error: error instanceof Error ? error.message : 'Unknown error'
        });
    }
};

// Create a new stone category
export const createCategory = async (req: Request, res: Response): Promise<void> => {
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
        const existingCategory = await StoneCategory.findOne({
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

        const newCategory = new StoneCategory({ name: trimmedName });
        const savedCategory = await newCategory.save();

        res.status(201).json({
            success: true,
            message: 'Category added successfully',
            data: savedCategory
        });
    } catch (error) {
        console.error('Error creating stone category:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to add category',
            error: error instanceof Error ? error.message : 'Unknown error'
        });
    }
};
