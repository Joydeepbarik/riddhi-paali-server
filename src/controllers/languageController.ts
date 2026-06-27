import { Request, Response } from 'express';
import Language from '../models/Language';

// Get all languages
export const getLanguages = async (req: Request, res: Response) => {
    try {
        const languages = await Language.find().sort({ name: 1 });
        res.status(200).json({
            success: true,
            data: languages
        });
    } catch (error) {
        console.error('Error fetching languages:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch languages',
            error: error instanceof Error ? error.message : 'Unknown error'
        });
    }
};

// Create a new language
export const createLanguage = async (req: Request, res: Response): Promise<void> => {
    try {
        const { name } = req.body;
        if (!name || typeof name !== 'string' || !name.trim()) {
            res.status(400).json({
                success: false,
                message: 'Language name is required'
            });
            return;
        }

        const trimmedName = name.trim();

        // Check if language already exists case-insensitively
        const existingLang = await Language.findOne({
            name: { $regex: new RegExp(`^${trimmedName}$`, 'i') }
        });

        if (existingLang) {
            res.status(200).json({
                success: true,
                message: 'Language already exists',
                data: existingLang
            });
            return;
        }

        const newLanguage = new Language({ name: trimmedName });
        const savedLanguage = await newLanguage.save();

        res.status(201).json({
            success: true,
            message: 'Language added successfully',
            data: savedLanguage
        });
    } catch (error) {
        console.error('Error creating language:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to add language',
            error: error instanceof Error ? error.message : 'Unknown error'
        });
    }
};
