import mongoose, { Document, Schema } from 'mongoose';

export interface IBlog extends Document {
  title: string;
  shortDetails: string;
  date: string;
  author: string;
  category: string;
  image: string;
  createdAt: Date;
}

const blogSchema: Schema = new Schema({
  title: { type: String, required: true },
  shortDetails: { type: String, required: true },
  date: { type: String, required: true },
  author: { type: String, required: true },
  category: { type: String, required: true },
  image: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model<IBlog>('BlogList', blogSchema);
