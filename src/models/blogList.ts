import mongoose, { Document, Schema } from 'mongoose';

export interface IBlog extends Document {
  // Existing fields
  title: string;
  shortDetails: string;
  date: string;
  author: string;
  category: string;
  image: string;
  createdAt: Date;

  // SEO Information
  metaTitle?: string;
  metaDescription?: string;
  focusKeyword?: string;
  metaKeywords?: string;
  canonicalUrl?: string;
  ogImage?: string;

  // Blog Basic Information (additional)
  subtitle?: string;
  slug?: string;
  gemstoneName?: string;
  status?: string; // 'Draft' | 'Publish'

  // Blog Content
  introduction?: string;
  whatIsGemstone?: string;
  astrologicalImportance?: string;
  associatedPlanet?: string;
  whoShouldWear?: string;
  benefits?: string;
  recommendedMetal?: string;
  recommendedFinger?: string;
  recommendedDayTime?: string;
  mantraPujaProcess?: string;
  naturalVsTreated?: string;
  priceGuide?: string;
  buyingGuide?: string;
  careMaintenance?: string;
  commonMyths?: string;
  conclusion?: string;

  // FAQ Section
  faqs?: { question: string; answer: string }[];
}

const blogSchema: Schema = new Schema({
  // Existing fields
  title: { type: String, required: true },
  shortDetails: { type: String, required: true },
  date: { type: String, required: true },
  author: { type: String, required: true },
  category: { type: String, required: true },
  image: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },

  // SEO Information
  metaTitle: { type: String, default: '' },
  metaDescription: { type: String, default: '' },
  focusKeyword: { type: String, default: '' },
  metaKeywords: { type: String, default: '' },
  canonicalUrl: { type: String, default: '' },
  ogImage: { type: String, default: '' },

  // Blog Basic Information (additional)
  subtitle: { type: String, default: '' },
  slug: { type: String, default: '' },
  gemstoneName: { type: String, default: '' },
  status: { type: String, default: 'Publish' },

  // Blog Content
  introduction: { type: String, default: '' },
  whatIsGemstone: { type: String, default: '' },
  astrologicalImportance: { type: String, default: '' },
  associatedPlanet: { type: String, default: '' },
  whoShouldWear: { type: String, default: '' },
  benefits: { type: String, default: '' },
  recommendedMetal: { type: String, default: '' },
  recommendedFinger: { type: String, default: '' },
  recommendedDayTime: { type: String, default: '' },
  mantraPujaProcess: { type: String, default: '' },
  naturalVsTreated: { type: String, default: '' },
  priceGuide: { type: String, default: '' },
  buyingGuide: { type: String, default: '' },
  careMaintenance: { type: String, default: '' },
  commonMyths: { type: String, default: '' },
  conclusion: { type: String, default: '' },

  // FAQ Section
  faqs: [{
    question: { type: String },
    answer: { type: String }
  }]
});

export default mongoose.model<IBlog>('BlogList', blogSchema);

