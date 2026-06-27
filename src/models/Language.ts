import mongoose, { Document, Schema } from 'mongoose';

export interface ILanguage extends Document {
  name: string;
  createdAt: Date;
}

const languageSchema: Schema = new Schema({
  name: { type: String, required: true, unique: true },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model<ILanguage>('Language', languageSchema);
