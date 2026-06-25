import mongoose, { Document, Schema } from 'mongoose';

export interface IInquiry extends Document {
  fullName: string;
  phoneNumber: string;
  emailAddress: string;
  address: string;
  message?: string;
  dateOfBirth: Date;
  gender: string;
  gana?: string;
  rashi?: string;
  gemName?: string;
  createdAt: Date;
}

const inquirySchema: Schema = new Schema({
  fullName: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  emailAddress: { type: String, required: true },
  address: { type: String, required: true },
  message: { type: String },
  dateOfBirth: { type: Date, required: true },
  gender: { type: String, required: true },
  gana: { type: String },
  rashi: { type: String },
  gemName: { type: String },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model<IInquiry>('InquiryList', inquirySchema);
