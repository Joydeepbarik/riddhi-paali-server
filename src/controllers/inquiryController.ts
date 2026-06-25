import { Request, Response } from 'express';
import InquiryList from '../models/inquiryList';

// Create a new inquiry
export const createInquiry = async (req: Request, res: Response) => {
    try {
        const newInquiry = new InquiryList(req.body);
        const savedInquiry = await newInquiry.save();
        res.status(201).json({
            success: true,
            message: 'Inquiry submitted successfully',
            data: savedInquiry
        });
    } catch (error) {
        console.error('Error creating inquiry:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to submit inquiry',
            error: error instanceof Error ? error.message : 'Unknown error'
        });
    }
};

// Get all inquiries
export const getInquiries = async (req: Request, res: Response) => {
    try {
        const inquiries = await InquiryList.find().sort({ createdAt: -1 });
        res.status(200).json({
            success: true,
            data: inquiries
        });
    } catch (error) {
        console.error('Error fetching inquiries:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch inquiries',
            error: error instanceof Error ? error.message : 'Unknown error'
        });
    }
};
