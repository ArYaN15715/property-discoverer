import { BedDouble, Heart, MapPin, Square } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import type { Property } from "../types/property";
import { LIFESTYLE_LABELS } from "../types/property";

interface PropertyCardProps {
  property: Property;
  onExplore: (property: Property) => void;
  isFavorite: boolean;
  onToggleFavorite: (id: number) => void;
  index?: number;
}

export function PropertyCard({
  property,
  onExplore,
  isFavorite,
  onToggleFavorite,
  index = 0,
}: PropertyCardProps) {
  const [imageHovered, setImageHovered] = useState(false);

  const handleCardClick = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target.closest("[data-no-explore]")) return;
    onExplore(property);
  };

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggleFavorite(property.id);
  };

  const displayTags = property.tags.slice(0, 3);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{
        duration: 0.35,
        delay: index * 0.05,
        ease: [0.4, 0, 0.2, 1],
      }}
      layout
      className="rounded-xl overflow-hidden bg-card shadow-card cursor-pointer group"
      style={{ boxShadow: "0 2px 12px rgba(26,39,68,0.08)" }}
      whileHover={{
        y: -4,
        boxShadow: "0 12px 36px rgba(26,39,68,0.16)",
        transition: { duration: 0.25 },
      }}
      onClick={handleCardClick}
      data-ocid={`property.item.${index + 1}`}
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && onExplore(property)}
      aria-label={`Explore ${property.title}`}
    >
      {/* Image Section */}
      <div
        className="relative aspect-video overflow-hidden bg-muted"
        onMouseEnter={() => setImageHovered(true)}
        onMouseLeave={() => setImageHovered(false)}
      >
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

        {/* Hover overlay */}
        <AnimatePresence>
          {imageHovered && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-0 flex items-center justify-center"
              style={{
                background:
                  "linear-gradient(to top, rgba(26,39,68,0.75) 0%, rgba(26,39,68,0.3) 60%, transparent 100%)",
              }}
            >
              <motion.button
                initial={{ scale: 0.85, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.05 }}
                type="button"
                className="px-5 py-2 rounded-full text-white font-semibold text-sm font-body shadow-elevated"
                style={{ backgroundColor: "#c0392b" }}
                data-no-explore
                onClick={(e) => {
                  e.stopPropagation();
                  onExplore(property);
                }}
                data-ocid={`property.explore_button.${index + 1}`}
              >
                Explore →
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Badges — top left */}
        <div className="absolute top-2 left-2 flex gap-1.5">
          {property.isFeatured && (
            <span
              className="px-2 py-0.5 rounded-full text-xs font-semibold font-body tracking-wide"
              style={{ backgroundColor: "#1a2744", color: "#d4a017" }}
            >
              FEATURED
            </span>
          )}
          {property.isNew && (
            <span
              className="px-2 py-0.5 rounded-full text-xs font-semibold font-body tracking-wide"
              style={{ backgroundColor: "#d4a017", color: "#1a2744" }}
            >
              NEW
            </span>
          )}
        </div>

        {/* Heart icon — top right */}
        <motion.button
          data-no-explore
          type="button"
          onClick={handleFavoriteClick}
          className="absolute top-2 right-2 w-8 h-8 rounded-full bg-white/90 flex items-center justify-center shadow-sm backdrop-blur-sm"
          whileTap={{ scale: 1.3 }}
          transition={{ type: "spring", stiffness: 400, damping: 12 }}
          aria-label={isFavorite ? "Remove from saved" : "Save property"}
          data-ocid={`property.favorite_button.${index + 1}`}
        >
          <Heart
            size={15}
            strokeWidth={2}
            fill={isFavorite ? "#c0392b" : "none"}
            stroke={isFavorite ? "#c0392b" : "#1a2744"}
            className="transition-colors duration-200"
          />
        </motion.button>

        {/* Price badge — bottom left */}
        <div
          className="absolute bottom-2 left-2 px-2.5 py-1 rounded-lg text-white text-sm font-semibold font-body shadow"
          style={{ backgroundColor: "#c0392b" }}
        >
          {property.priceLabel}
        </div>
      </div>

      {/* Content Section */}
      <div className="p-4 space-y-2">
        {/* Title */}
        <h3
          className="font-display text-base font-semibold truncate"
          style={{ color: "#1a2744" }}
        >
          {property.title}
        </h3>

        {/* Location */}
        <div className="flex items-center gap-1 text-muted-foreground text-sm">
          <MapPin size={13} className="shrink-0" />
          <span className="truncate">{property.location}</span>
        </div>

        {/* Details row */}
        {(property.bedrooms > 0 || property.areaSqft > 0) && (
          <div className="flex items-center gap-3 text-sm text-muted-foreground">
            {property.bedrooms > 0 && (
              <span className="flex items-center gap-1">
                <BedDouble size={13} className="shrink-0" />
                {property.bedrooms} BHK
              </span>
            )}
            {property.areaSqft > 0 && (
              <span className="flex items-center gap-1">
                <Square size={13} className="shrink-0" />
                {property.areaSqft.toLocaleString()} sqft
              </span>
            )}
          </div>
        )}

        {/* Lifestyle tags */}
        {displayTags.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {displayTags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-0.5 rounded-full text-xs font-medium font-body"
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

        {/* Footer row */}
        <div className="flex items-center justify-between pt-1 border-t border-border">
          <span className="text-xs text-muted-foreground">
            Posted {property.postedDaysAgo}d ago
          </span>
          <span
            className="text-xs font-semibold font-body transition-colors duration-200"
            style={{ color: "#c0392b" }}
          >
            Explore →
          </span>
        </div>
      </div>
    </motion.div>
  );
}
