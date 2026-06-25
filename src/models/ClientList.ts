import mongoose, { Document, Schema } from 'mongoose';

export interface IClientList extends Document {
  name: string;
  phone: string;
  email: string;
  address: string;
  imageUrl?: string;
}

const ClientListSchema = new Schema<IClientList>(
  {
    name: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    address: { type: String, required: true },
    imageUrl: { type: String, required: false },
  },
  { timestamps: true }
);

export const ClientList = mongoose.model<IClientList>('ClientList', ClientListSchema, 'clientlist');
