import mongoose, { Document, Schema } from 'mongoose';

export interface IGem extends Document {
  stoneName: string;
  category: string;
  planetAssociation: string;
  purpose: string;
  image: string;
  description: string;
  createdAt: Date;
}

const gemSchema: Schema = new Schema({
  stoneName: { type: String, required: true },
  category: { type: String, required: true },
  planetAssociation: { type: String, required: true },
  purpose: { type: String, required: true },
  image: { type: String, required: true }, // Store path/url of the image
  description: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model<IGem>('GemsList', gemSchema);
