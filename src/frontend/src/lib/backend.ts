/**
 * Backend integration layer.
 * Currently the backend canister has no property methods yet — data is served
 * from the local sample dataset until the backend is wired up.
 * All functions return the same Promise<T> shape so swapping in real actor
 * calls later is a one-line change per function.
 */

import type { Property, PropertyFilter, Inquiry } from "../types/property";
import { SAMPLE_PROPERTIES } from "../data/sampleProperties";

function matchesFilter(p: Property, filter: PropertyFilter): boolean {
  if (filter.budgetRange && p.budgetRange !== filter.budgetRange) return false;
  if (filter.locality && p.locality !== filter.locality) return false;
  if (filter.propertyType && p.propertyType !== filter.propertyType)
    return false;
  if (filter.tags && filter.tags.length > 0) {
    const hasAll = filter.tags.every((t) => p.tags.includes(t));
    if (!hasAll) return false;
  }
  if (filter.searchQuery) {
    const q = filter.searchQuery.toLowerCase();
    const haystack =
      `${p.title} ${p.location} ${p.locality} ${p.description}`.toLowerCase();
    if (!haystack.includes(q)) return false;
  }
  return true;
}

export async function getProperties(filter: PropertyFilter = {}): Promise<Property[]> {
  await new Promise((r) => setTimeout(r, 300)); // simulate network
  return SAMPLE_PROPERTIES.filter((p) => matchesFilter(p, filter));
}

export async function getProperty(id: number): Promise<Property | undefined> {
  await new Promise((r) => setTimeout(r, 200));
  return SAMPLE_PROPERTIES.find((p) => p.id === id);
}

export async function getRecommended(limit = 4): Promise<Property[]> {
  await new Promise((r) => setTimeout(r, 250));
  return SAMPLE_PROPERTIES.filter((p) => p.isFeatured).slice(0, limit);
}

export async function getFeatured(): Promise<Property[]> {
  await new Promise((r) => setTimeout(r, 250));
  return SAMPLE_PROPERTIES.filter((p) => p.isFeatured);
}

export async function submitInquiry(
  name: string,
  phone: string,
  message: string,
  propertyId?: number
): Promise<{ success: boolean; id: number }> {
  await new Promise((r) => setTimeout(r, 400));
  const inquiry: Inquiry = {
    id: Date.now(),
    name,
    phone,
    message,
    propertyId,
    timestamp: Date.now(),
  };
  // Store locally until backend is wired
  const existing = JSON.parse(localStorage.getItem("pd_inquiries") ?? "[]") as Inquiry[];
  existing.push(inquiry);
  localStorage.setItem("pd_inquiries", JSON.stringify(existing));
  return { success: true, id: inquiry.id };
}
