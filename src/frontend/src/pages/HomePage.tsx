import { useCallback, useState } from "react";
import CtaSection from "../components/CtaSection";
import { FilterBar } from "../components/FilterBar";
import Footer from "../components/Footer";
import HeroSection from "../components/HeroSection";
import HowItWorksSection from "../components/HowItWorksSection";
import LocationSection from "../components/LocationSection";
import PropertyGrid from "../components/PropertyGrid";
import PropertyModal from "../components/PropertyModal";
import RecommendedSection from "../components/RecommendedSection";
import TrustSection from "../components/TrustSection";
import { useFavorites } from "../hooks/useProperties";
import type { Property, PropertyFilter } from "../types/property";

export default function HomePage() {
  const [filter, setFilter] = useState<PropertyFilter>({});
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(
    null,
  );
  const { favoriteIds, toggle } = useFavorites();

  const handleSearch = useCallback((query: string) => {
    setFilter((prev) => ({ ...prev, searchQuery: query }));
  }, []);

  const handleQuickFilter = useCallback((tag: string) => {
    if (tag === "All") {
      setFilter({});
      return;
    }
    if (tag === "2BHK") {
      setFilter((prev) => ({ ...prev, searchQuery: "2BHK" }));
      return;
    }
    if (tag === "3BHK") {
      setFilter((prev) => ({ ...prev, searchQuery: "3BHK" }));
      return;
    }
    if (tag === "Under 40L") {
      setFilter((prev) => ({ ...prev, budgetRange: "ThirtyTo50L" }));
      return;
    }
    if (tag === "Ready to Move") {
      setFilter((prev) => ({ ...prev, tags: ["ReadyToMove"] }));
      return;
    }
    if (tag === "Near Schools") {
      setFilter((prev) => ({ ...prev, tags: ["NearSchools"] }));
      return;
    }
  }, []);

  const handleFilterChange = useCallback((newFilter: PropertyFilter) => {
    setFilter(newFilter);
  }, []);

  const handleSelectProperty = useCallback((property: Property) => {
    setSelectedProperty(property);
  }, []);

  const handleCloseModal = useCallback(() => {
    setSelectedProperty(null);
  }, []);

  return (
    <>
      {/* Hero */}
      <HeroSection onSearch={handleSearch} onQuickFilter={handleQuickFilter} />

      {/* Filter bar */}
      <FilterBar filter={filter} onChange={handleFilterChange} />

      {/* Property grid */}
      <section id="properties">
        <PropertyGrid filter={filter} onSelectProperty={handleSelectProperty} />
      </section>

      {/* Recommended for You */}
      <RecommendedSection
        onSelectProperty={handleSelectProperty}
        favoriteIds={favoriteIds}
        onToggleFavorite={toggle}
      />

      {/* Trust Section */}
      <TrustSection />

      {/* How It Works */}
      <HowItWorksSection />

      {/* CTA Section */}
      <CtaSection />

      {/* Location Section */}
      <LocationSection />

      {/* Footer */}
      <Footer />

      {/* Property Modal */}
      <PropertyModal
        property={selectedProperty}
        onClose={handleCloseModal}
        isFavorite={
          selectedProperty ? favoriteIds.includes(selectedProperty.id) : false
        }
        onToggleFavorite={toggle}
      />
    </>
  );
}
