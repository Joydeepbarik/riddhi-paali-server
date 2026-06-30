import mongoose, { Document, Schema } from 'mongoose';

export interface IBlogCategory extends Document {
  name: string;
  createdAt: Date;
}

const blogCategorySchema: Schema = new Schema({
  name: { type: String, required: true, unique: true },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model<IBlogCategory>('BlogCategory', blogCategorySchema, 'blogcategory');
