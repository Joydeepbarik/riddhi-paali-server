import mongoose, { Document, Schema } from 'mongoose';

export interface IStoneCategory extends Document {
  name: string;
  createdAt: Date;
}

const stoneCategorySchema: Schema = new Schema({
  name: { type: String, required: true, unique: true },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model<IStoneCategory>('StoneCategory', stoneCategorySchema, 'stoneCategory');
