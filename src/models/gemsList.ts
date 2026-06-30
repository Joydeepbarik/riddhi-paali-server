import mongoose, { Document, Schema } from 'mongoose';

export interface IGem extends Document {
  stoneName: string;
  category: string;
  planetAssociation: string;
  purpose: string;
  image: string;
  description: string;
  bengaliName?: string;
  sanskritHindiName?: string;
  zodiacRashi?: string;
  color?: string;
  origin?: string;
  availableForms?: string;
  language?: string;
  planetAssociatedWith?: string;
  whoCanWear?: string;
  suitableZodiacSigns?: string;
  believedBenefits?: string;
  recommendedWearingDay?: string;
  recommendedMetal?: string;
  recommendedFinger?: string;
  wearingTime?: string;
  minRattiCarat?: string;
  mantraPujaProcess?: string;
  stoneQuality?: string;
  naturalLabCertified?: string;
  treatment?: string;
  certificationAvailable?: string;
  priceRange?: string;
  sizeWeight?: string;
  shape?: string;
  clarity?: string;
  cut?: string;
  polish?: string;
  stockStatus?: string;
  customizationAvailable?: string;
  returnExchangePolicy?: string;
  stoneFullDetails?: string;
  translations?: Record<string, any>;
  createdAt: Date;
  [key: string]: any;
}

const gemSchema: Schema = new Schema({
  stoneName: { type: String, required: true },
  category: { type: String, required: true },
  planetAssociation: { type: String, required: true },
  purpose: { type: String, required: true },
  image: { type: String, required: true },
  description: { type: String, required: true },
  bengaliName: { type: String },
  sanskritHindiName: { type: String },
  zodiacRashi: { type: String },
  color: { type: String },
  origin: { type: String },
  availableForms: { type: String },
  language: { type: String },
  planetAssociatedWith: { type: String },
  whoCanWear: { type: String },
  suitableZodiacSigns: { type: String },
  believedBenefits: { type: String },
  recommendedWearingDay: { type: String },
  recommendedMetal: { type: String },
  recommendedFinger: { type: String },
  wearingTime: { type: String },
  minRattiCarat: { type: String },
  mantraPujaProcess: { type: String },
  stoneQuality: { type: String },
  naturalLabCertified: { type: String },
  treatment: { type: String },
  certificationAvailable: { type: String },
  priceRange: { type: String },
  sizeWeight: { type: String },
  shape: { type: String },
  clarity: { type: String },
  cut: { type: String },
  polish: { type: String },
  stockStatus: { type: String },
  customizationAvailable: { type: String },
  returnExchangePolicy: { type: String },
  stoneFullDetails: { type: String },
  translations: { type: Schema.Types.Mixed },
  createdAt: { type: Date, default: Date.now }
}, { strict: false });

export default mongoose.model<IGem>('GemsList', gemSchema);
