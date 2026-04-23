import { BedDouble, Heart, MapPin, Square } from "lucide-react";
import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { SAMPLE_PROPERTIES } from "../data/sampleProperties";
import type { Property } from "../types/property";
import { LIFESTYLE_LABELS } from "../types/property";

interface RecommendedSectionProps {
  onSelectProperty: (property: Property) => void;
  favoriteIds: number[];
  onToggleFavorite: (id: number) => void;
}

const RECOMMENDED = SAMPLE_PROPERTIES.filter(
  (p) => p.isFeatured || p.isNew,
).slice(0, 4);

interface CompactCardProps {
  property: Property;
  index: number;
  isFavorite: boolean;
  onToggleFavorite: (id: number) => void;
  onExplore: (property: Property) => void;
}

function CompactCard({
  property,
  index,
  isFavorite,
  onToggleFavorite,
  onExplore,
}: CompactCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.45,
        delay: index * 0.1,
        ease: [0.4, 0, 0.2, 1],
      }}
      className="relative flex-shrink-0 w-64 md:w-auto rounded-xl overflow-hidden bg-card cursor-pointer group"
      style={{ boxShadow: "0 2px 12px rgba(26,39,68,0.08)" }}
      whileHover={{
        y: -4,
        boxShadow: "0 10px 30px rgba(26,39,68,0.15)",
        transition: { duration: 0.22 },
      }}
      onClick={() => onExplore(property)}
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && onExplore(property)}
      aria-label={`Explore ${property.title}`}
      data-ocid={`recommended.item.${index + 1}`}
    >
      {/* Image */}
      <div className="relative h-40 overflow-hidden bg-muted">
        <img
          src={property.imageUrls[0]}
          alt={property.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
          onError={(e) => {
            (e.target as HTMLImageElement).src =
              "/assets/images/placeholder.svg";
          }}
        />
        {/* Price badge */}
        <div
          className="absolute bottom-2 left-2 px-2.5 py-0.5 rounded-lg text-white text-xs font-semibold font-body"
          style={{ backgroundColor: "#c0392b" }}
        >
          {property.priceLabel}
        </div>
        {/* NEW/FEATURED badge */}
        {(property.isNew || property.isFeatured) && (
          <div className="absolute top-2 left-2">
            <span
              className="px-2 py-0.5 rounded-full text-xs font-semibold font-body"
              style={
                property.isNew
                  ? { backgroundColor: "#d4a017", color: "#1a2744" }
                  : { backgroundColor: "#1a2744", color: "#d4a017" }
              }
            >
              {property.isNew ? "NEW" : "FEATURED"}
            </span>
          </div>
        )}
        {/* Heart button */}
        <motion.button
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite(property.id);
          }}
          className="absolute top-2 right-2 w-7 h-7 rounded-full bg-white/90 flex items-center justify-center shadow-sm"
          whileTap={{ scale: 1.3 }}
          transition={{ type: "spring", stiffness: 400, damping: 12 }}
          aria-label={isFavorite ? "Remove from saved" : "Save property"}
          data-ocid={`recommended.favorite_button.${index + 1}`}
        >
          <Heart
            size={13}
            fill={isFavorite ? "#c0392b" : "none"}
            stroke={isFavorite ? "#c0392b" : "#1a2744"}
          />
        </motion.button>
      </div>

      {/* Content */}
      <div className="p-3 space-y-1.5">
        <h4
          className="font-display text-sm font-semibold leading-snug line-clamp-1"
          style={{ color: "#1a2744" }}
        >
          {property.title}
        </h4>
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <MapPin size={11} className="shrink-0" />
          <span className="truncate">{property.locality}</span>
        </div>
        {property.bedrooms > 0 && (
          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <BedDouble size={11} />
              {property.bedrooms} BHK
            </span>
            <span className="flex items-center gap-1">
              <Square size={11} />
              {property.areaSqft.toLocaleString()} sqft
            </span>
          </div>
        )}
        {property.tags.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {property.tags.slice(0, 2).map((tag) => (
              <span
                key={tag}
                className="px-1.5 py-0.5 rounded-full text-[10px] font-medium"
                style={{
                  backgroundColor: "rgba(212,160,23,0.12)",
                  color: "#d4a017",
                }}
              >
                {LIFESTYLE_LABELS[tag]}
              </span>
            ))}
          </div>
        )}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onExplore(property);
          }}
          type="button"
          className="mt-1 w-full text-xs font-semibold py-1.5 rounded-lg transition-colors duration-200 text-white"
          style={{ backgroundColor: "#1a2744" }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "#c0392b";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "#1a2744";
          }}
          data-ocid={`recommended.explore_button.${index + 1}`}
        >
          Explore →
        </button>
      </div>
    </motion.div>
  );
}

export default function RecommendedSection({
  onSelectProperty,
  favoriteIds,
  onToggleFavorite,
}: RecommendedSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      className="py-14 px-4 md:px-6 lg:px-8"
      style={{ backgroundColor: "rgba(212,160,23,0.04)" }}
      data-ocid="recommended.section"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h2
            className="font-display text-2xl md:text-3xl font-bold mb-1"
            style={{ color: "#1a2744" }}
          >
            Recommended for You
            <span
              className="block h-1 w-16 rounded-full mt-2"
              style={{ backgroundColor: "#d4a017" }}
            />
          </h2>
          <p className="font-body text-sm text-muted-foreground mt-3">
            Based on popular choices in your area
          </p>
        </motion.div>

        {/* Cards — horizontal scroll on mobile, 4-col grid on desktop */}
        <div
          className={`
            flex gap-4 overflow-x-auto pb-2 scrollbar-hide
            md:grid md:grid-cols-4 md:overflow-visible md:pb-0
          `}
          data-ocid="recommended.list"
        >
          {isInView &&
            RECOMMENDED.map((property, i) => (
              <CompactCard
                key={property.id}
                property={property}
                index={i}
                isFavorite={favoriteIds.includes(property.id)}
                onToggleFavorite={onToggleFavorite}
                onExplore={onSelectProperty}
              />
            ))}
        </div>
      </div>
    </section>
  );
}
