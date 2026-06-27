import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
import connectDB from './config/db';
import clientListRoutes from './routes/clientListRoutes';
import inquiryRoutes from './routes/inquiryRoutes';
import contactRoutes from './routes/contactRoutes';
import gemsRoutes from './routes/gemsRoutes';
import blogRoutes from './routes/blogRoutes';
import userRoutes from './routes/userRoutes';
import languageRoutes from './routes/languageRoutes';
import stoneDetailsRoutes from './routes/stoneDetailsRoutes';
import stoneCategoryRoutes from './routes/stoneCategoryRoutes';
import { seedAdminUser } from './seeder/userSeeder';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from the uploads directory
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// API Routes
app.use('/api/clients', clientListRoutes);
app.use('/api/inquiries', inquiryRoutes);
app.use('/api/contacts', contactRoutes);
app.use('/api/gems', gemsRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/api/users', userRoutes);
app.use('/api/languages', languageRoutes);
app.use('/api/stone-details', stoneDetailsRoutes);
app.use('/api/stonedetails', stoneDetailsRoutes);
app.use('/api/stone-categories', stoneCategoryRoutes);
app.use('/api/stoneCategory', stoneCategoryRoutes);

// Basic Route
app.get('/', (req: Request, res: Response) => {
    res.json({ message: 'Welcome to Riddhi Paali Backend API' });
});

// Start Server
const startServer = async () => {
    try {
        await connectDB();
        await seedAdminUser();
        app.listen(PORT, () => {
            console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error('Failed to start server:', error);
    }
};

startServer();
