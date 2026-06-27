import mongoose, { Document, Schema } from 'mongoose';

export interface IStoneDetails extends Document {
  gemId: string;
  stoneName?: string;
  bengaliName?: string;
  sanskritHindiName?: string;
  category?: string;
  planetAssociation?: string;
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
  translations?: Record<string, any>;
  createdAt?: Date;
  updatedAt?: Date;
  [key: string]: any;
}

const stoneDetailsSchema: Schema = new Schema({
  gemId: { type: String, required: true, unique: true, index: true },
  stoneName: { type: String },
  bengaliName: { type: String },
  sanskritHindiName: { type: String },
  category: { type: String },
  planetAssociation: { type: String },
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
  translations: { type: Schema.Types.Mixed },
}, { 
  timestamps: true,
  strict: false // Allow any extra dynamic fields
});

export default mongoose.model<IStoneDetails>('StoneDetails', stoneDetailsSchema, 'stonedetails');
