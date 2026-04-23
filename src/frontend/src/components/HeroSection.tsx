import { ChevronDown, Search } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";

interface HeroSectionProps {
  onSearch: (query: string) => void;
  onQuickFilter: (tag: string) => void;
}

const PLACEHOLDERS = [
  "Search '2BHK near Sama'...",
  "Search 'Budget under 40L'...",
  "Search 'Rental near office'...",
  "Search 'Ready to move flat'...",
  "Search 'Family home near school'...",
];

const QUICK_FILTERS = [
  "All",
  "2BHK",
  "3BHK",
  "Under 40L",
  "Ready to Move",
  "Near Schools",
];

export default function HeroSection({
  onSearch,
  onQuickFilter,
}: HeroSectionProps) {
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [activeFilter, setActiveFilter] = useState("All");
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const [showPlaceholder, setShowPlaceholder] = useState(true);
  const inputRef = useRef<HTMLInputElement>(null);

  // Cycle placeholders
  useEffect(() => {
    const interval = setInterval(() => {
      setShowPlaceholder(false);
      setTimeout(() => {
        setPlaceholderIndex((i) => (i + 1) % PLACEHOLDERS.length);
        setShowPlaceholder(true);
      }, 300);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = useCallback(() => {
    if (query.trim()) onSearch(query.trim());
  }, [query, onSearch]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSubmit();
  };

  const handleQuickFilter = (tag: string) => {
    setActiveFilter(tag);
    onQuickFilter(tag);
  };

  const scrollToProperties = () => {
    document
      .getElementById("properties")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      className="relative w-full flex flex-col items-center justify-center overflow-hidden"
      style={{ minHeight: "90vh" }}
      aria-label="Property discovery hero"
    >
      {/* Background image with slow-zoom animation */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1600&q=80')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          animation: "heroZoom 20s ease-in-out infinite alternate",
        }}
        aria-hidden="true"
      />

      {/* Dark overlay gradient */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background:
            "linear-gradient(160deg, rgba(26,39,68,0.93) 0%, rgba(26,39,68,0.82) 60%, rgba(26,39,68,0.70) 100%)",
        }}
        aria-hidden="true"
      />

      {/* Subtle grid texture */}
      <div
        className="absolute inset-0 z-0 opacity-10"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent, transparent 60px, rgba(212,160,23,0.08) 60px, rgba(212,160,23,0.08) 61px), repeating-linear-gradient(90deg, transparent, transparent 60px, rgba(212,160,23,0.08) 60px, rgba(212,160,23,0.08) 61px)",
        }}
        aria-hidden="true"
      />

      {/* Hero top-left logo branding */}
      <motion.div
        className="absolute top-6 left-6 z-20 flex items-center gap-2.5"
        initial={{ opacity: 0, x: -16 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <img
          src="/assets/cropped_circle_image-019daf21-3dd3-73b8-9748-73d13681fd82.png"
          alt="Property Discoverer logo"
          className="w-11 h-11 rounded-full object-cover border-2 shadow-md"
          style={{ borderColor: "rgba(212,160,23,0.55)" }}
        />
        <span
          className="font-display font-semibold text-white text-sm leading-tight hidden sm:block"
          style={{ textShadow: "0 1px 6px rgba(0,0,0,0.4)" }}
        >
          Property
          <br />
          Discoverer
        </span>
      </motion.div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-4xl mx-auto px-4 py-16 flex flex-col items-center text-center">
        {/* Eyebrow label */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-4"
        >
          <span
            className="inline-block text-xs font-semibold uppercase tracking-widest px-4 py-1.5 rounded-full border"
            style={{
              color: "#d4a017",
              borderColor: "rgba(212,160,23,0.35)",
              backgroundColor: "rgba(212,160,23,0.1)",
              letterSpacing: "0.18em",
            }}
          >
            Vadodara's Premier Property Discovery
          </span>
        </motion.div>

        {/* Main Headline */}
        <motion.h1
          className="font-display font-bold text-white text-4xl md:text-6xl leading-tight mb-5"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        >
          Discover Properties That{" "}
          <span className="relative inline-block" style={{ color: "#d4a017" }}>
            Actually Fit
            <motion.span
              className="absolute bottom-0 left-0 h-0.5 rounded-full"
              style={{ backgroundColor: "#d4a017", width: "100%" }}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            />
          </span>{" "}
          Your Life
        </motion.h1>

        {/* Subtext */}
        <motion.p
          className="font-body text-lg md:text-xl mb-10"
          style={{ color: "rgba(255,255,255,0.72)" }}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          Smart property discovery in Vadodara — personalized, simple, and
          reliable
        </motion.p>

        {/* Search Bar */}
        <motion.div
          className="w-full max-w-2xl mb-5"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45 }}
        >
          <div
            className="flex items-center rounded-full bg-white overflow-hidden transition-all duration-300"
            style={{
              boxShadow: isFocused
                ? "0 0 0 3px rgba(212,160,23,0.5), 0 8px 32px rgba(26,39,68,0.25)"
                : "0 8px 32px rgba(26,39,68,0.25)",
              border: isFocused ? "2px solid #d4a017" : "2px solid transparent",
            }}
          >
            {/* Search icon */}
            <span className="pl-4 pr-2 flex-shrink-0 text-gray-400">
              <Search size={20} />
            </span>

            {/* Input with animated placeholder */}
            <div className="relative flex-1 py-3.5">
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                onKeyDown={handleKeyDown}
                className="w-full bg-transparent outline-none font-body text-base pr-2"
                style={{ color: "#1a2744" }}
                placeholder=""
                aria-label="Search properties"
                data-ocid="hero.search_input"
              />
              {/* Animated placeholder */}
              {!query && (
                <div
                  className="absolute inset-0 flex items-center pointer-events-none select-none overflow-hidden"
                  aria-hidden="true"
                >
                  <AnimatePresence mode="wait">
                    {showPlaceholder && (
                      <motion.span
                        key={placeholderIndex}
                        className="font-body text-base truncate"
                        style={{ color: "rgba(26,39,68,0.4)" }}
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -6 }}
                        transition={{ duration: 0.25 }}
                      >
                        {PLACEHOLDERS[placeholderIndex]}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </div>
              )}
            </div>

            {/* Search button */}
            <button
              type="button"
              onClick={handleSubmit}
              className="flex-shrink-0 mr-1.5 px-5 py-2.5 rounded-full font-body font-semibold text-white text-sm transition-smooth"
              style={{ backgroundColor: "#c0392b" }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#a93226";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "#c0392b";
              }}
              data-ocid="hero.search.submit_button"
              aria-label="Search properties"
            >
              Search
            </button>
          </div>
        </motion.div>

        {/* Quick Filter Tags */}
        <motion.div
          className="flex flex-wrap justify-center gap-2"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          {QUICK_FILTERS.map((tag) => {
            const isActive = activeFilter === tag;
            return (
              <button
                key={tag}
                type="button"
                onClick={() => handleQuickFilter(tag)}
                className="px-4 py-1.5 rounded-full text-sm font-body font-medium transition-smooth"
                style={
                  isActive
                    ? {
                        backgroundColor: "#d4a017",
                        color: "#1a2744",
                        border: "1.5px solid #d4a017",
                      }
                    : {
                        backgroundColor: "rgba(255,255,255,0.1)",
                        color: "rgba(255,255,255,0.85)",
                        border: "1.5px solid rgba(255,255,255,0.2)",
                      }
                }
                onMouseEnter={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.backgroundColor =
                      "rgba(255,255,255,0.18)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.backgroundColor =
                      "rgba(255,255,255,0.1)";
                  }
                }}
                data-ocid={`hero.filter.${tag.toLowerCase().replace(/\s+/g, "_")}`}
                aria-pressed={isActive}
              >
                {tag}
              </button>
            );
          })}
        </motion.div>
      </div>

      {/* Scroll hint */}
      <motion.button
        type="button"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1 cursor-pointer"
        onClick={scrollToProperties}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1, duration: 0.6 }}
        aria-label="Scroll to properties"
        data-ocid="hero.scroll_hint"
      >
        <span
          className="font-body text-xs uppercase tracking-widest"
          style={{ color: "rgba(255,255,255,0.5)" }}
        >
          Explore Properties
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{
            repeat: Number.POSITIVE_INFINITY,
            duration: 1.4,
            ease: "easeInOut",
          }}
          style={{ color: "rgba(255,255,255,0.5)" }}
        >
          <ChevronDown size={22} />
        </motion.div>
      </motion.button>

      {/* heroZoom keyframe injected as a style tag */}
      <style>{`
        @keyframes heroZoom {
          from { transform: scale(1); }
          to   { transform: scale(1.07); }
        }
      `}</style>
    </section>
  );
}
