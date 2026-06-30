import { Request, Response } from 'express';
import GemsList from '../models/gemsList';
import fs from 'fs';
import path from 'path';

export const createGem = async (req: Request, res: Response): Promise<void> => {
  try {
    let image = '';

    if ((req as any).file) {
      image = `/uploads/gems/${(req as any).file.filename}`;
    } else {
      res.status(400).json({ success: false, message: 'Image is required' });
      return;
    }

    const bodyData = { ...req.body };
    if (bodyData.translations) {
      if (Array.isArray(bodyData.translations)) {
        const validItem = bodyData.translations.reverse().find((item: any) => typeof item === 'string' && item.startsWith('{'));
        if (validItem) {
          try { bodyData.translations = JSON.parse(validItem); } catch (e) {}
        }
      } else if (typeof bodyData.translations === 'string') {
        try { bodyData.translations = JSON.parse(bodyData.translations); } catch (e) {}
      }
    }

    const newGem = new GemsList({
      ...bodyData,
      image
    });

    await newGem.save();

    res.status(201).json({ success: true, message: 'Gem added successfully', data: newGem });
  } catch (error) {
    console.error('Error adding gem:', error);
    res.status(500).json({ success: false, message: 'Failed to add gem', error });
  }
};

export const getGems = async (req: Request, res: Response): Promise<void> => {
  try {
    const gems = await GemsList.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: gems });
  } catch (error) {
    console.error('Error fetching gems:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch gems', error });
  }
};

export const deleteGem = async (req: Request, res: Response): Promise<void> => {
  try {
    const gem = await GemsList.findById(req.params.id);
    if (!gem) {
      res.status(404).json({ success: false, message: 'Gem not found' });
      return;
    }

    // Attempt to delete image file
    if (gem.image) {
      const filePath = path.join(__dirname, '../../', gem.image);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }

    await GemsList.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, message: 'Gem deleted successfully' });
  } catch (error) {
    console.error('Error deleting gem:', error);
    res.status(500).json({ success: false, message: 'Failed to delete gem', error });
  }
};
export const getGemById = async (req: Request, res: Response): Promise<void> => {
  try {
    const gem = await GemsList.findById(req.params.id);
    if (!gem) {
      res.status(404).json({ success: false, message: 'Gem not found' });
      return;
    }
    res.status(200).json({ success: true, data: gem });
  } catch (error) {
    console.error('Error fetching gem:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch gem', error });
  }
};

export const updateGem = async (req: Request, res: Response): Promise<void> => {
  try {
    const gem = await GemsList.findById(req.params.id);
    if (!gem) {
      res.status(404).json({ success: false, message: 'Gem not found' });
      return;
    }

    const bodyData = { ...req.body };
    if (bodyData.translations) {
      if (Array.isArray(bodyData.translations)) {
        const validItem = bodyData.translations.reverse().find((item: any) => typeof item === 'string' && item.startsWith('{'));
        if (validItem) {
          try { bodyData.translations = JSON.parse(validItem); } catch (e) {}
        }
      } else if (typeof bodyData.translations === 'string') {
        try { bodyData.translations = JSON.parse(bodyData.translations); } catch (e) {}
      }
    }

    Object.assign(gem, bodyData);

    if ((req as any).file) {
      if (gem.image) {
        const filePath = path.join(__dirname, '../../', gem.image);
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
        }
      }
      gem.image = `/uploads/gems/${(req as any).file.filename}`;
    }

    await gem.save();
    res.status(200).json({ success: true, message: 'Gem updated successfully', data: gem });
  } catch (error) {
    console.error('Error updating gem:', error);
    res.status(500).json({ success: false, message: 'Failed to update gem', error });
  }
};
