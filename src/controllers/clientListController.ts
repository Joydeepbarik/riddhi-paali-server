import { Request, Response } from 'express';
import { ClientList } from '../models/ClientList';

export const createClient = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, phone, email, address } = req.body;
    let imageUrl = '';

    if ((req as any).file) {
      imageUrl = `/uploads/clients/${(req as any).file.filename}`;
    }

    const newClient = new ClientList({
      name,
      phone,
      email,
      address,
      imageUrl,
    });

    await newClient.save();

    res.status(201).json({ success: true, data: newClient });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getClients = async (req: Request, res: Response): Promise<void> => {
  try {
    const clients = await ClientList.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, clients: clients });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteClient = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const client = await ClientList.findByIdAndDelete(id);

    if (!client) {
      res.status(404).json({ success: false, message: 'Client not found' });
      return;
    }

    res.status(200).json({ success: true, message: 'Client deleted successfully' });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getClientById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const client = await ClientList.findById(id);

    if (!client) {
      res.status(404).json({ success: false, message: 'Client not found' });
      return;
    }

    res.status(200).json({ success: true, data: client });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateClient = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { name, phone, email, address } = req.body;

    const client = await ClientList.findById(id);

    if (!client) {
      res.status(404).json({ success: false, message: 'Client not found' });
      return;
    }

    client.name = name || client.name;
    client.phone = phone || client.phone;
    client.email = email || client.email;
    client.address = address || client.address;

    if ((req as any).file) {
      client.imageUrl = `/uploads/clients/${(req as any).file.filename}`;
    }

    await client.save();

    res.status(200).json({ success: true, data: client });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};
