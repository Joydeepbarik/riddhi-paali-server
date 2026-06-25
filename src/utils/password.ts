import bcrypt from 'bcryptjs';

export const hashPassword = async (password: string): Promise<string> => {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
};

export const comparePassword = async (password: string, hash: string): Promise<boolean> => {
    return bcrypt.compare(password, hash);
};

export const isPasswordHashed = (password: string): boolean => {
    // bcrypt hashes are 60 characters long and start with $2a$, $2b$, or $2y$
    return /^\$2[aby]\$\d{2}\$[./A-Za-z0-9]{53}$/.test(password);
};
