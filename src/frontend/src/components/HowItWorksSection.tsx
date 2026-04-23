import { Heart, MessageCircle, Search } from "lucide-react";
import { motion } from "motion/react";

const STEPS = [
  {
    number: "01",
    icon: Search,
    title: "Search & Filter",
    description:
      "Describe your ideal home with budget, location, and lifestyle preferences. Our smart filters instantly narrow down thousands of listings to exactly what you need.",
    color: "#d4a017",
  },
  {
    number: "02",
    icon: Heart,
    title: "Explore & Save",
    description:
      "Browse our curated property gallery, save your favourites with a heart, and compare options side by side. Discover the Vadodara neighbourhood that's right for you.",
    color: "#d4a017",
  },
  {
    number: "03",
    icon: MessageCircle,
    title: "Connect & Move In",
    description:
      "Chat directly with our local Vadodara experts on WhatsApp and receive personal, honest guidance — no pressure, just clarity on your path to a new home.",
    color: "#d4a017",
  },
];

export default function HowItWorksSection() {
  return (
    <section
      className="w-full py-20 px-4"
      style={{ backgroundColor: "#1a2744" }}
      aria-label="How Property Discoverer works"
      data-ocid="how_it_works.section"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section headline */}
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span
            className="inline-block text-xs font-semibold uppercase tracking-widest px-4 py-1.5 rounded-full border mb-4"
            style={{
              color: "#d4a017",
              borderColor: "rgba(212,160,23,0.35)",
              backgroundColor: "rgba(212,160,23,0.1)",
              letterSpacing: "0.18em",
            }}
          >
            Simple 3-Step Process
          </span>
          <h2 className="font-display font-bold text-3xl md:text-4xl lg:text-5xl text-white mb-4">
            How Property Discoverer{" "}
            <span
              className="relative inline-block"
              style={{ color: "#d4a017" }}
            >
              Works
              <motion.span
                className="absolute -bottom-1 left-0 h-0.5 rounded-full"
                style={{ backgroundColor: "#d4a017", width: "100%" }}
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
              />
            </span>
          </h2>
          <p
            className="font-body text-base md:text-lg max-w-xl mx-auto"
            style={{ color: "rgba(255,255,255,0.62)" }}
          >
            From your first search to getting the keys — we make every step feel
            effortless.
          </p>
        </motion.div>

        {/* Steps grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 relative">
          {/* Desktop connector line */}
          <div
            className="hidden md:block absolute top-12 left-[calc(16.67%+1rem)] right-[calc(16.67%+1rem)] h-px"
            style={{ backgroundColor: "rgba(212,160,23,0.2)" }}
            aria-hidden="true"
          />

          {STEPS.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.number}
                className="relative flex flex-col items-center text-center md:items-start md:text-left"
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.55,
                  delay: index * 0.15,
                  ease: [0.22, 1, 0.36, 1],
                }}
                data-ocid={`how_it_works.step.${index + 1}`}
              >
                {/* Card */}
                <div
                  className="relative w-full rounded-2xl p-7 overflow-hidden"
                  style={{
                    backgroundColor: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    backdropFilter: "blur(4px)",
                  }}
                >
                  {/* Big background number */}
                  <span
                    className="absolute -top-3 -right-2 font-display font-black text-7xl select-none pointer-events-none"
                    style={{ color: "rgba(212,160,23,0.08)", lineHeight: 1 }}
                    aria-hidden="true"
                  >
                    {step.number}
                  </span>

                  {/* Step number badge + icon row */}
                  <div className="flex items-center gap-4 mb-5">
                    <div
                      className="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center"
                      style={{
                        backgroundColor: "rgba(212,160,23,0.15)",
                        border: "1px solid rgba(212,160,23,0.3)",
                      }}
                    >
                      <Icon size={22} style={{ color: "#d4a017" }} />
                    </div>
                    <span
                      className="font-display font-bold text-2xl"
                      style={{ color: "rgba(212,160,23,0.55)" }}
                    >
                      {step.number}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="font-display font-bold text-xl text-white mb-3">
                    {step.title}
                  </h3>

                  {/* Description */}
                  <p
                    className="font-body text-sm leading-relaxed"
                    style={{ color: "rgba(255,255,255,0.62)" }}
                  >
                    {step.description}
                  </p>
                </div>

                {/* Mobile timeline connector (between steps) */}
                {index < STEPS.length - 1 && (
                  <div
                    className="md:hidden w-px h-8 mt-4"
                    style={{ backgroundColor: "rgba(212,160,23,0.25)" }}
                    aria-hidden="true"
                  />
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Bottom CTA nudge */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <button
            type="button"
            onClick={() => {
              document
                .getElementById("properties")
                ?.scrollIntoView({ behavior: "smooth" });
            }}
            className="inline-flex items-center gap-2 px-8 py-3 rounded-full font-body font-semibold text-sm transition-all duration-200"
            style={{
              backgroundColor: "#d4a017",
              color: "#1a2744",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#b8880f";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "#d4a017";
            }}
            data-ocid="how_it_works.start_exploring_button"
          >
            <Search size={16} />
            Start Exploring Properties
          </button>
        </motion.div>
      </div>
    </section>
  );
}
