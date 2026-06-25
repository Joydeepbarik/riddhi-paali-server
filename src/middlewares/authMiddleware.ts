import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export interface AuthRequest extends Request {
    user?: {
        id: string;
        email?: string;
    };
}

export const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Bearer <token>

    if (!token) {
        return res.status(401).json({
            success: false,
            message: 'Access denied. No token provided.'
        });
    }

    try {
        const secret = process.env.JWT_SECRET || 'fallback_secret_key';
        const decoded = jwt.verify(token, secret) as any;
        
        req.user = {
            id: decoded.id,
            email: decoded.email
        };
        
        next();
    } catch (error: any) {
        console.error('[authMiddleware] Token verification failed:', error.message);
        return res.status(401).json({
            success: false,
            message: 'Invalid or expired token.',
            error: error.message
        });
    }
};
