import type { Property } from "@/types/property";
import { LIFESTYLE_LABELS, PROPERTY_TYPE_LABELS } from "@/types/property";
import {
  Bath,
  BedDouble,
  Calendar,
  Heart,
  Home,
  MapPin,
  Maximize2,
  MessageCircle,
  Phone,
  Sofa,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

interface PropertyModalProps {
  property: Property | null;
  onClose: () => void;
  isFavorite: boolean;
  onToggleFavorite: (id: number) => void;
}

export default function PropertyModal({
  property,
  onClose,
  isFavorite,
  onToggleFavorite,
}: PropertyModalProps) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose();
  };

  const whatsappMsg = property
    ? encodeURIComponent(
        `Hi, I'm interested in ${property.title}. Can you share more details?`,
      )
    : "";
  const whatsappHref = `https://wa.me/917572905655?text=${whatsappMsg}`;

  return (
    <AnimatePresence>
      {property && (
        <motion.div
          key="backdrop"
          className="fixed inset-0 z-50 flex items-end md:items-center justify-center"
          style={{
            backgroundColor: "rgba(0,0,0,0.6)",
            backdropFilter: "blur(4px)",
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={handleBackdropClick}
          data-ocid="property_modal.backdrop"
        >
          <motion.div
            key="panel"
            className="relative w-full md:max-w-2xl md:mx-4 max-h-[90vh] overflow-y-auto bg-white rounded-t-2xl md:rounded-2xl shadow-2xl"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", stiffness: 320, damping: 34 }}
            onClick={(e) => e.stopPropagation()}
            data-ocid="property_modal.dialog"
          >
            {/* Close button */}
            <button
              type="button"
              aria-label="Close modal"
              data-ocid="property_modal.close_button"
              onClick={onClose}
              className="absolute top-3 right-3 z-10 flex items-center justify-center w-9 h-9 rounded-full shadow-md transition-transform hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              style={{ backgroundColor: "#1a2744" }}
            >
              <X size={18} color="white" />
            </button>

            {/* Badge */}
            {(property.isNew || property.isFeatured) && (
              <div className="absolute top-3 left-3 z-10">
                <span
                  className="text-xs font-semibold px-2.5 py-1 rounded-full"
                  style={{ backgroundColor: "#d4a017", color: "#1a2744" }}
                >
                  {property.isNew ? "New" : "Featured"}
                </span>
              </div>
            )}

            {/* Image Gallery */}
            <div className="relative">
              <img
                src={
                  property.imageUrls[activeImageIndex] ??
                  "/assets/images/placeholder.svg"
                }
                alt={property.title}
                className="w-full aspect-video object-cover rounded-t-2xl md:rounded-t-2xl"
                style={{ maxHeight: "280px" }}
              />
              {property.imageUrls.length > 1 && (
                <div className="flex gap-2 overflow-x-auto px-4 py-2 bg-white/80 backdrop-blur-sm">
                  {property.imageUrls.map((url, i) => (
                    <button
                      type="button"
                      key={`thumb-${url}`}
                      data-ocid={`property_modal.thumb.${i + 1}`}
                      onClick={() => setActiveImageIndex(i)}
                      className={`flex-shrink-0 w-14 h-14 rounded-lg overflow-hidden border-2 transition-all ${
                        i === activeImageIndex
                          ? "opacity-100"
                          : "opacity-60 hover:opacity-85"
                      }`}
                      style={{
                        borderColor:
                          i === activeImageIndex ? "#1a2744" : "transparent",
                      }}
                    >
                      <img
                        src={url}
                        alt={`View ${i + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Details */}
            <div className="p-5 md:p-6 space-y-4">
              {/* Title + Price */}
              <div>
                <h2
                  className="font-display text-2xl font-bold leading-tight mb-1"
                  style={{
                    color: "#1a2744",
                    fontFamily: "'Sora', 'Poppins', sans-serif",
                  }}
                >
                  {property.title}
                </h2>
                <p className="text-xl font-bold" style={{ color: "#c0392b" }}>
                  <span style={{ color: "#d4a017" }}>₹</span>
                  {property.priceLabel}
                </p>
              </div>

              {/* Location */}
              <div className="flex items-center gap-1.5 text-sm text-gray-600">
                <MapPin
                  size={15}
                  className="flex-shrink-0"
                  style={{ color: "#c0392b" }}
                />
                <span>{property.location}</span>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <StatCard
                  icon={<BedDouble size={16} />}
                  label="Bedrooms"
                  value={`${property.bedrooms} BHK`}
                />
                <StatCard
                  icon={<Bath size={16} />}
                  label="Bathrooms"
                  value={`${property.bathrooms} Baths`}
                />
                <StatCard
                  icon={<Maximize2 size={16} />}
                  label="Area"
                  value={`${property.areaSqft} sqft`}
                />
                <StatCard
                  icon={<Sofa size={16} />}
                  label="Furnished"
                  value={property.furnished}
                />
              </div>

              {/* Tags */}
              {property.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {property.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs font-medium px-3 py-1 rounded-full"
                      style={{
                        backgroundColor: "#d4a01722",
                        color: "#1a2744",
                        border: "1px solid #d4a01766",
                      }}
                    >
                      {LIFESTYLE_LABELS[tag]}
                    </span>
                  ))}
                </div>
              )}

              {/* Description */}
              <p className="text-sm text-gray-600 leading-relaxed">
                {property.description}
              </p>

              {/* Meta row */}
              <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500">
                <span className="flex items-center gap-1">
                  <Home size={13} />
                  {PROPERTY_TYPE_LABELS[property.propertyType]}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar size={13} />
                  {property.postedDaysAgo === 0
                    ? "Posted today"
                    : property.postedDaysAgo === 1
                      ? "Posted yesterday"
                      : `Posted ${property.postedDaysAgo} days ago`}
                </span>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3 pt-1">
                {/* Favorite toggle */}
                <button
                  type="button"
                  data-ocid="property_modal.save_button"
                  onClick={() => onToggleFavorite(property.id)}
                  className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border-2 font-semibold text-sm transition-all hover:bg-gray-50"
                  style={{
                    borderColor: isFavorite ? "#c0392b" : "#1a2744",
                    color: isFavorite ? "#c0392b" : "#1a2744",
                  }}
                  aria-label={
                    isFavorite ? "Remove from favorites" : "Save to favorites"
                  }
                >
                  <Heart
                    size={18}
                    fill={isFavorite ? "#c0392b" : "none"}
                    stroke={isFavorite ? "#c0392b" : "#1a2744"}
                  />
                  {isFavorite ? "Saved to Favorites" : "Save to Favorites"}
                </button>

                {/* WhatsApp */}
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-ocid="property_modal.whatsapp_button"
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-sm text-white transition-all hover:opacity-90 active:scale-[0.98]"
                  style={{ backgroundColor: "#25D366" }}
                >
                  <MessageCircle size={18} />
                  Chat on WhatsApp
                </a>

                {/* Call Expert */}
                <a
                  href="tel:+917572905655"
                  data-ocid="property_modal.call_button"
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-sm text-white transition-all hover:opacity-90 active:scale-[0.98]"
                  style={{ backgroundColor: "#c0392b" }}
                >
                  <Phone size={18} />
                  Call Expert
                </a>
              </div>

              {/* Footer note */}
              <p className="text-center text-xs text-gray-400 pb-1">
                🔒 Your info is safe. No spam, ever.
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function StatCard({
  icon,
  label,
  value,
}: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div
      className="flex flex-col items-center gap-1 p-3 rounded-xl text-center"
      style={{ backgroundColor: "#1a27440a", border: "1px solid #1a274418" }}
    >
      <span style={{ color: "#1a2744" }}>{icon}</span>
      <span className="text-[10px] uppercase tracking-wide text-gray-500 font-medium">
        {label}
      </span>
      <span className="text-sm font-semibold" style={{ color: "#1a2744" }}>
        {value}
      </span>
    </div>
  );
}
