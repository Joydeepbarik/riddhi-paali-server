import { Request, Response } from 'express';
import ContactList from '../models/contactList';

// Create a new contact entry
export const createContact = async (req: Request, res: Response) => {
    try {
        const newContact = new ContactList(req.body);
        const savedContact = await newContact.save();
        res.status(201).json({
            success: true,
            message: 'Message submitted successfully',
            data: savedContact
        });
    } catch (error) {
        console.error('Error creating contact:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to submit message',
            error: error instanceof Error ? error.message : 'Unknown error'
        });
    }
};

// Get all contacts
export const getContacts = async (req: Request, res: Response) => {
    try {
        const contacts = await ContactList.find().sort({ createdAt: -1 });
        res.status(200).json({
            success: true,
            data: contacts
        });
    } catch (error) {
        console.error('Error fetching contacts:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch contacts',
            error: error instanceof Error ? error.message : 'Unknown error'
        });
    }
};
