export type PropertyType =
  | "Apartment"
  | "Villa"
  | "Plot"
  | "Commercial"
  | "Penthouse";

export type BudgetRange =
  | "Under30L"
  | "ThirtyTo50L"
  | "FiftyTo80L"
  | "Above80L";

export type LifestyleTag =
  | "FamilyFriendly"
  | "NearSchools"
  | "InvestmentReady"
  | "ReadyToMove"
  | "LuxuryAmenities"
  | "GreatView";

export interface Property {
  id: number;
  title: string;
  description: string;
  price: number;
  priceLabel: string;
  propertyType: PropertyType;
  bedrooms: number;
  bathrooms: number;
  areaSqft: number;
  location: string;
  locality: string;
  furnished: string;
  imageUrls: string[];
  tags: LifestyleTag[];
  budgetRange: BudgetRange;
  isNew: boolean;
  isFeatured: boolean;
  postedDaysAgo: number;
}

export interface PropertyFilter {
  budgetRange?: BudgetRange;
  locality?: string;
  tags?: LifestyleTag[];
  propertyType?: PropertyType;
  searchQuery?: string;
}

export interface Inquiry {
  id: number;
  name: string;
  phone: string;
  message: string;
  propertyId?: number;
  timestamp: number;
}

export const BUDGET_LABELS: Record<BudgetRange, string> = {
  Under30L: "Under ₹30L",
  ThirtyTo50L: "₹30L – ₹50L",
  FiftyTo80L: "₹50L – ₹80L",
  Above80L: "Above ₹80L",
};

export const LIFESTYLE_LABELS: Record<LifestyleTag, string> = {
  FamilyFriendly: "Family Friendly",
  NearSchools: "Near Schools",
  InvestmentReady: "Investment Ready",
  ReadyToMove: "Ready to Move",
  LuxuryAmenities: "Luxury Amenities",
  GreatView: "Great View",
};

export const PROPERTY_TYPE_LABELS: Record<PropertyType, string> = {
  Apartment: "Apartment",
  Villa: "Villa",
  Plot: "Plot",
  Commercial: "Commercial",
  Penthouse: "Penthouse",
};
