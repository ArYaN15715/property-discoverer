import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Property {
    id: bigint;
    title: string;
    propertyType: PropertyType;
    imageUrls: Array<string>;
    bedrooms: bigint;
    tags: Array<LifestyleTag>;
    description: string;
    postedDaysAgo: bigint;
    furnished: string;
    isFeatured: boolean;
    areaSqft: bigint;
    isNew: boolean;
    bathrooms: bigint;
    price: bigint;
    locality: string;
    budgetRange: BudgetRange;
    location: string;
    priceLabel: string;
}
export interface Inquiry {
    id: bigint;
    name: string;
    propertyId?: bigint;
    message: string;
    timestamp: bigint;
    phone: string;
}
export interface PropertyFilter {
    propertyType?: PropertyType;
    tags: Array<LifestyleTag>;
    searchQuery?: string;
    locality?: string;
    budgetRange?: BudgetRange;
}
export enum BudgetRange {
    Above80L = "Above80L",
    ThirtyTo50L = "ThirtyTo50L",
    Under30L = "Under30L",
    FiftyTo80L = "FiftyTo80L"
}
export enum LifestyleTag {
    GreatView = "GreatView",
    LuxuryAmenities = "LuxuryAmenities",
    InvestmentReady = "InvestmentReady",
    NearSchools = "NearSchools",
    ReadyToMove = "ReadyToMove",
    FamilyFriendly = "FamilyFriendly"
}
export enum PropertyType {
    Commercial = "Commercial",
    Plot = "Plot",
    Villa = "Villa",
    Penthouse = "Penthouse",
    Apartment = "Apartment"
}
export interface backendInterface {
    getFeatured(): Promise<Array<Property>>;
    getInquiries(): Promise<Array<Inquiry>>;
    getProperties(filter: PropertyFilter): Promise<Array<Property>>;
    getProperty(id: bigint): Promise<Property | null>;
    getRecommended(limit: bigint): Promise<Array<Property>>;
    submitInquiry(name: string, phone: string, message: string, propertyId: bigint | null): Promise<bigint>;
}
