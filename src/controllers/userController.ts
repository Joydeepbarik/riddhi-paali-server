import { Request, Response } from 'express';
import { UserService } from '../services/UserService';
import crypto from 'crypto';
import { User } from '../models/User';
import { ResetPassword } from '../models/ResetPassword';
import { sendEmail } from '../utils/email';
import { hashPassword } from '../utils/password';

const userService = new UserService();

export const loginUser = async (req: Request, res: Response) => {
    try {
        const { userName, password } = req.body;
        const result = await userService.login(userName, password);

        return res.status(200).json({
            success: true,
            message: 'Successfully Logged in',
            data: result,
        });
    } catch (error: any) {
        let statusCode = 400;
        let errorMessage = error.message;

        if (error.message === 'User not found') {
            errorMessage = 'Your email or username is incorrect, please try again';
        } else if (error.message === 'Password incorrect') {
            errorMessage = 'Your password is wrong please try again';
        }

        return res.status(statusCode).json({
            success: false,
            message: errorMessage,
        });
    }
};

export const getProfile = async (req: any, res: Response) => {
    try {
        if (!req.user || !req.user.id) {
            return res.status(401).json({ success: false, message: 'Unauthorized' });
        }
        const userProfile = await userService.getUserById(req.user.id);
        return res.status(200).json({
            success: true,
            data: userProfile,
        });
    } catch (error: any) {
        return res.status(400).json({
            success: false,
            message: error.message || 'Failed to fetch profile',
        });
    }
};

export const restLinkSend = async (
    req: Request,
    res: Response
) => {
    try {
        const { email } = req.body;
        if (!email) {
            return res.status(400).json({
                success: false,
                message: 'Email is required',
            });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User with this email not found',
            });
        }

        // Generate token
        const resetToken = crypto.randomBytes(32).toString('hex');
        const expiresAt = new Date(Date.now() + 3600000); // 1 hour

        // Store in DB, update if exists or create new
        await ResetPassword.updateOne(
            { userId: user._id },
            { resetToken, expiresAt, attempts: 3 },
            { upsert: true }
        );

        // Define reset link
        const resetLink = `${process.env.FRONTEND_URL || 'http://localhost:3000'}/auth/confirm-password?token=${resetToken}&id=${user._id}`;

        // Build email using reusable header/footer components
        const emailHtml = `
            <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #ddd; padding: 20px; border-radius: 8px;">
                <h2 style="color: #d4af37; text-align: center;">Riddhipaali Gems</h2>
                <h3 style="color: #333;">Password Reset Request</h3>
                <p>Hello,</p>
                <p>We received a request to reset the password for your <strong>Riddhipaali</strong> account. If you didn't make this request, you can safely ignore this email.</p>
                <p>To reset your password, please click the button below:</p>
                
                <div style="text-align: center; margin: 30px 0;">
                    <a href="${resetLink}" style="background-color: #d4af37; color: #fff; padding: 12px 24px; text-decoration: none; border-radius: 4px; font-weight: bold;">Reset Your Password</a>
                </div>
                
                <p>Please note that this link will expire in <strong>1 hour</strong> for security reasons.</p>
                
                <div style="background-color: #f8fafc; padding: 15px; border-radius: 4px; border-left: 4px solid #d4af37; margin-top: 30px;">
                    <p style="margin: 0 0 10px 0; font-size: 14px; color: #666;">If you're having trouble clicking the button, copy and paste the URL below into your web browser:</p>
                    <p style="margin: 0; font-size: 12px; color: #0b6c8f; word-break: break-all;">${resetLink}</p>
                </div>
            </div>
        `;

        // Send email using common sendEmail function
        const emailResult = await sendEmail({
            to: email,
            subject: 'Password Reset Request - Riddhipaali',
            html: emailHtml,
        });

        if (!emailResult.success) {
            console.log('[restLinkSend] Email not sent via SMTP. Falling back to console log.');
            console.log(`Password reset link for ${email}: ${resetLink}`);
        }

        return res.status(200).json({
            success: true,
            message: 'Password reset link has been sent to your email',
        });
    } catch (error: any) {
        console.error('Error sending reset link:', error);
        return res.status(500).json({
            success: false,
            message: 'Error processing password reset request',
        });
    }
};

export const confirmPassword = async (
    req: Request,
    res: Response
) => {
    try {
        const { token, id, newPassword } = req.body;

        if (!token || !id || !newPassword) {
            return res.status(400).json({
                success: false,
                message: 'Token, User ID, and new password are required'
            });
        }

        const resetData = await ResetPassword.findOne({ resetToken: token });

        if (!resetData) {
            return res.status(400).json({
                success: false,
                message: 'Token is invalid'
            });
        }

        if (resetData.userId?.toString() !== id.toString()) {
            return res.status(400).json({
                success: false,
                message: 'User is not match'
            });
        }

        if (resetData.expiresAt && new Date() > new Date(resetData.expiresAt)) {
            return res.status(400).json({
                success: false,
                message: 'Reset token has expired'
            });
        }

        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User no longer exists'
            });
        }

        user.password = await hashPassword(newPassword);
        await user.save();

        // Optionally, clear the reset token after successful reset
        await ResetPassword.deleteOne({ _id: resetData._id });

        return res.status(200).json({
            success: true,
            message: 'Password updated successfully'
        });
    } catch (error: any) {
        console.error('Error confirming password:', error);
        return res.status(500).json({
            success: false,
            message: 'Error updating password',
        });
    }
};
