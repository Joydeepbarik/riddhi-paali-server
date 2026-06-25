import jwt from 'jsonwebtoken';
import { User, IUser } from '../models/User';
import { comparePassword } from '../utils/password';

export class UserService {
    private generateTokens(user: IUser) {
        const payload = {
            id: user._id,
            email: user.email,
        };

        const secret = process.env.JWT_SECRET || 'fallback_secret_key';
        const accessToken = jwt.sign(payload, secret, { expiresIn: '1d' });
        const refreshToken = jwt.sign(payload, secret, { expiresIn: '30d' });

        const accessTokenExpiresAt = new Date();
        accessTokenExpiresAt.setDate(accessTokenExpiresAt.getDate() + 1);

        const refreshTokenExpiresAt = new Date();
        refreshTokenExpiresAt.setDate(refreshTokenExpiresAt.getDate() + 30);

        return { accessToken, refreshToken, accessTokenExpiresAt, refreshTokenExpiresAt };
    }

    async login(identifier: string, password: string) {
        const user = await User.findOne({
            $or: [{ email: identifier }, { username: identifier }]
        });

        if (!user) {
            throw new Error('User not found');
        }

        if (!user.password) {
            throw new Error('User password not set');
        }

        const isPasswordMatch = await comparePassword(password, user.password);

        if (!isPasswordMatch) {
            throw new Error('Password incorrect');
        }

        const tokens = this.generateTokens(user);

        user.accessToken = tokens.accessToken;
        user.refreshToken = tokens.refreshToken;
        user.accessTokenExpiresAt = tokens.accessTokenExpiresAt;
        user.refreshTokenExpiresAt = tokens.refreshTokenExpiresAt;
        await user.save();

        const userData = user.toObject();
        delete userData.password;

        return {
            user: userData,
            accessToken: tokens.accessToken,
            refreshToken: tokens.refreshToken,
        };
    }

    async getUserById(id: string) {
        const user = await User.findById(id).select('-password');
        if (!user) {
            throw new Error('User not found');
        }
        return user.toObject();
    }
}
