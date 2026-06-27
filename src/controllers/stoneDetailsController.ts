import { Request, Response } from 'express';
import StoneDetails from '../models/stoneDetails';

// Upsert (Create or Update) Stone Details
export const saveStoneDetails = async (req: Request, res: Response) => {
    try {
        const gemId = req.body.gemId || req.params.id || req.query.gemId;

        if (!gemId) {
            return res.status(400).json({ success: false, message: 'gemId is required to save stone details' });
        }

        const existingRecord = await StoneDetails.findOne({ gemId });
        const existingTranslations = existingRecord?.translations || {};

        const updateData: any = { ...req.body, gemId };
        if (req.body.language) {
            const lang = req.body.language;
            updateData.translations = {
                ...existingTranslations,
                ...(req.body.translations || {}),
                [lang]: {
                    planetAssociatedWith: req.body.planetAssociatedWith || '',
                    whoCanWear: req.body.whoCanWear || '',
                    suitableZodiacSigns: req.body.suitableZodiacSigns || '',
                    believedBenefits: req.body.believedBenefits || '',
                    recommendedWearingDay: req.body.recommendedWearingDay || '',
                    recommendedMetal: req.body.recommendedMetal || '',
                    recommendedFinger: req.body.recommendedFinger || '',
                    wearingTime: req.body.wearingTime || '',
                    minRattiCarat: req.body.minRattiCarat || '',
                    mantraPujaProcess: req.body.mantraPujaProcess || ''
                }
            };
        }

        const updatedDetails = await StoneDetails.findOneAndUpdate(
            { gemId },
            updateData,
            { new: true, upsert: true, setDefaultsOnInsert: true }
        );

        res.status(200).json({
            success: true,
            message: 'Stone details saved successfully in stonedetails table',
            data: updatedDetails
        });
    } catch (error: any) {
        console.error('Error saving stone details:', error);
        res.status(500).json({ success: false, message: 'Failed to save stone details', error: error.message });
    }
};

// Get Stone Details by gemId
export const getStoneDetails = async (req: Request, res: Response) => {
    try {
        const gemId = req.params.id || req.query.gemId as string;

        if (!gemId) {
            return res.status(400).json({ success: false, message: 'gemId is required to fetch stone details' });
        }

        const details = await StoneDetails.findOne({ gemId });

        res.status(200).json({
            success: true,
            data: details || null
        });
    } catch (error: any) {
        console.error('Error fetching stone details:', error);
        res.status(500).json({ success: false, message: 'Failed to fetch stone details', error: error.message });
    }
};
