import { User } from "../models/User";
import { hashPassword } from "../utils/password";

export const seedAdminUser = async () => {
    try {
        const adminConfig = {
            username: process.env.ADMIN_USERNAME?.trim() || "Joydeep",
            email: process.env.ADMIN_EMAIL?.trim().toLowerCase() || "joydeepbarik007@gmail.com",
            password: process.env.ADMIN_PASSWORD || "Joydeep@007",
        };

        const existingUser = await User.findOne({ email: adminConfig.email });

        if (!existingUser) {
            const adminUser = new User({
                username: adminConfig.username,
                email: adminConfig.email,
                password: await hashPassword(adminConfig.password),
            });

            await adminUser.save();
            console.log("Admin user seeded successfully!");
        } else {
            console.log("Admin user already exists. Skipping seeding.");
        }
    } catch (error) {
        console.error("Error seeding admin user:", error);
    }
};
