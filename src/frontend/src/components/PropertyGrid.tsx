import { AnimatePresence } from "motion/react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { SAMPLE_PROPERTIES } from "../data/sampleProperties";
import { useFavorites } from "../hooks/useProperties";
import type { Property, PropertyFilter } from "../types/property";
import { PropertyCard } from "./PropertyCard";
import { SkeletonCard } from "./SkeletonCard";

interface PropertyGridProps {
  filter: PropertyFilter;
  onSelectProperty: (property: Property) => void;
}

type SortOption = "newest" | "price-asc" | "price-desc";

const PAGE_SIZE = 6;
const SKELETON_KEYS = ["s0", "s1", "s2", "s3", "s4", "s5"];

function applyFilter(properties: Property[], f: PropertyFilter): Property[] {
  return properties.filter((p) => {
    if (f.budgetRange && p.budgetRange !== f.budgetRange) return false;
    if (f.locality && f.locality !== "") {
      const loc = f.locality.toLowerCase();
      if (
        !p.locality.toLowerCase().includes(loc) &&
        !p.location.toLowerCase().includes(loc)
      ) {
        return false;
      }
    }
    if (f.tags && f.tags.length > 0) {
      if (!f.tags.some((t) => p.tags.includes(t))) return false;
    }
    if (f.propertyType && p.propertyType !== f.propertyType) return false;
    if (f.searchQuery && f.searchQuery.trim() !== "") {
      const q = f.searchQuery.toLowerCase();
      const hay =
        `${p.title} ${p.location} ${p.description} ${p.locality}`.toLowerCase();
      if (!hay.includes(q)) return false;
    }
    return true;
  });
}

function sortProperties(properties: Property[], sort: SortOption): Property[] {
  const arr = [...properties];
  if (sort === "newest")
    return arr.sort((a, b) => a.postedDaysAgo - b.postedDaysAgo);
  if (sort === "price-asc") return arr.sort((a, b) => a.price - b.price);
  if (sort === "price-desc") return arr.sort((a, b) => b.price - a.price);
  return arr;
}

export default function PropertyGrid({
  filter,
  onSelectProperty,
}: PropertyGridProps) {
  const [sort, setSort] = useState<SortOption>("newest");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [isLoading, setIsLoading] = useState(false);
  const sentinelRef = useRef<HTMLDivElement>(null);
  const { favoriteIds, toggle } = useFavorites();

  // Stable serialized key — changes only when filter content changes
  const filterSerial = useMemo(
    () =>
      `${filter.budgetRange ?? ""}|${filter.locality ?? ""}|${filter.propertyType ?? ""}|${filter.searchQuery ?? ""}|${(filter.tags ?? []).join(",")}`,
    [
      filter.budgetRange,
      filter.locality,
      filter.propertyType,
      filter.searchQuery,
      filter.tags,
    ],
  );

  // Reset pagination when filter changes
  useEffect(() => {
    if (filterSerial !== undefined) setVisibleCount(PAGE_SIZE);
  }, [filterSerial]);

  // Simulate skeleton loading on filter change
  useEffect(() => {
    if (filterSerial === undefined) return;
    setIsLoading(true);
    const t = setTimeout(() => setIsLoading(false), 400);
    return () => clearTimeout(t);
  }, [filterSerial]);

  const filtered = applyFilter(SAMPLE_PROPERTIES, filter);
  const sorted = sortProperties(filtered, sort);
  const visible = sorted.slice(0, visibleCount);
  const hasMore = visibleCount < sorted.length;

  const loadMore = useCallback(() => {
    if (isLoading || !hasMore) return;
    setVisibleCount((c) => c + PAGE_SIZE);
  }, [isLoading, hasMore]);

  // Infinite scroll via IntersectionObserver
  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) loadMore();
      },
      { threshold: 0.1 },
    );
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [loadMore]);

  return (
    <section className="py-6 px-4 md:px-6 lg:px-8" data-ocid="property.grid">
      {/* Header row */}
      <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
        <p
          className="font-body text-sm text-muted-foreground"
          data-ocid="property.count"
        >
          Showing{" "}
          <span className="font-semibold" style={{ color: "#1a2744" }}>
            {filtered.length}
          </span>{" "}
          {filtered.length === 1 ? "property" : "properties"}
          {filtered.length === 0 && " — try adjusting your filters"}
        </p>

        <select
          value={sort}
          onChange={(e) => setSort(e.target.value as SortOption)}
          className="text-sm border border-input rounded-lg px-3 py-1.5 bg-card font-body focus:outline-none focus:ring-1"
          style={{ color: "#1a2744" }}
          data-ocid="property.sort_select"
        >
          <option value="newest">Newest First</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
        </select>
      </div>

      {/* Skeleton grid */}
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {SKELETON_KEYS.map((k) => (
            <SkeletonCard key={k} />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        /* Empty state */
        <div
          className="flex flex-col items-center justify-center py-20 text-center"
          data-ocid="property.empty_state"
        >
          <div className="text-5xl mb-4">🏡</div>
          <h3
            className="font-display text-xl font-semibold mb-2"
            style={{ color: "#1a2744" }}
          >
            No properties found
          </h3>
          <p className="font-body text-muted-foreground text-sm max-w-xs">
            Try adjusting your filters or search query to discover more
            properties in the Sama-Savli area.
          </p>
        </div>
      ) : (
        <>
          {/* Cards grid with AnimatePresence */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            <AnimatePresence mode="popLayout">
              {visible.map((property, i) => (
                <PropertyCard
                  key={property.id}
                  property={property}
                  onExplore={onSelectProperty}
                  isFavorite={favoriteIds.includes(property.id)}
                  onToggleFavorite={toggle}
                  index={i}
                />
              ))}
            </AnimatePresence>
          </div>

          {/* Infinite scroll sentinel */}
          {hasMore && (
            <div
              ref={sentinelRef}
              className="h-16 flex items-center justify-center mt-4"
            >
              <div className="w-8 h-1 rounded-full shimmer" />
            </div>
          )}

          {!hasMore && filtered.length > PAGE_SIZE && (
            <p className="text-center text-xs text-muted-foreground mt-6 font-body">
              You've seen all {filtered.length} properties ✓
            </p>
          )}
        </>
      )}
    </section>
  );
}
