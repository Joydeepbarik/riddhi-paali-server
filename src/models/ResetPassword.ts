import mongoose from "mongoose";

const ResetPasswordSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    resetToken: String,
    expiresAt: Date,
    attempts: { type: Number, default: 3 },
});

export const ResetPassword = mongoose.model("ResetPassword", ResetPasswordSchema);
