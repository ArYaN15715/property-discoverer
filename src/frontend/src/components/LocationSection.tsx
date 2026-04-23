import {
  Bus,
  ExternalLink,
  GraduationCap,
  MapPin,
  ShoppingBag,
  Train,
  TrendingUp,
} from "lucide-react";
import { motion, useInView } from "motion/react";
import { useRef } from "react";

const HIGHLIGHTS = [
  { icon: <Train size={16} />, text: "Minutes from Vadodara Railway Station" },
  { icon: <Bus size={16} />, text: "BRTS Connectivity on Sama Road" },
  {
    icon: <GraduationCap size={16} />,
    text: "Top schools: Navrachana, Delhi Public School",
  },
  {
    icon: <ShoppingBag size={16} />,
    text: "Shopping: Inorbit Mall, Centre Square",
  },
  {
    icon: <TrendingUp size={16} />,
    text: "Fast-growing residential zone with premium projects",
  },
];

export default function LocationSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      className="py-14 px-4 md:px-6 lg:px-8 bg-background"
      data-ocid="location.section"
    >
      <div ref={ref} className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <h2
            className="font-display text-2xl md:text-3xl font-bold mb-1"
            style={{ color: "#1a2744" }}
          >
            Explore <span style={{ color: "#c0392b" }}>Sama-Savli Road</span>
          </h2>
          <span
            className="block h-1 w-16 rounded-full mx-auto mt-2"
            style={{ backgroundColor: "#d4a017" }}
          />
          <p className="font-body text-sm text-muted-foreground mt-3 max-w-md mx-auto">
            One of Vadodara's most sought-after residential corridors —
            connected, growing, and full of opportunity.
          </p>
        </motion.div>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          {/* Left: Highlights */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.1 }}
          >
            <h3
              className="font-display text-lg font-semibold mb-5"
              style={{ color: "#1a2744" }}
            >
              Why This Location?
            </h3>
            <ul className="space-y-4">
              {HIGHLIGHTS.map((item, i) => (
                <motion.li
                  key={item.text}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.2 + i * 0.08 }}
                  className="flex items-start gap-3"
                >
                  <span
                    className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{
                      backgroundColor: "rgba(212,160,23,0.12)",
                      color: "#d4a017",
                    }}
                  >
                    {item.icon}
                  </span>
                  <span
                    className="font-body text-sm pt-1.5"
                    style={{ color: "#1a2744" }}
                  >
                    {item.text}
                  </span>
                </motion.li>
              ))}
            </ul>

            {/* CTA to Google Maps */}
            <motion.a
              href="https://maps.google.com/?q=Sama+Road+Vadodara"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-6 text-sm font-semibold font-body transition-all"
              style={{ color: "#c0392b" }}
              whileHover={{ x: 3 }}
              data-ocid="location.maps_link"
            >
              <MapPin size={15} />
              View on Google Maps
              <ExternalLink size={13} />
            </motion.a>
          </motion.div>

          {/* Right: Styled Map Card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.2 }}
            className="rounded-2xl overflow-hidden"
            style={{ boxShadow: "0 4px 24px rgba(26,39,68,0.12)" }}
          >
            {/* Map iframe via OpenStreetMap */}
            <div className="relative">
              <iframe
                title="Sama Road Vadodara Map"
                src="https://www.openstreetmap.org/export/embed.html?bbox=73.14%2C22.30%2C73.22%2C22.36&layer=mapnik&marker=22.33%2C73.18"
                className="w-full"
                style={{ height: "280px", border: "none" }}
                loading="lazy"
                allowFullScreen
              />
              {/* Overlay info card */}
              <div
                className="absolute bottom-3 left-3 right-3 rounded-xl p-3"
                style={{
                  backgroundColor: "rgba(26,39,68,0.92)",
                  backdropFilter: "blur(8px)",
                }}
              >
                <div className="flex items-start gap-2.5">
                  <MapPin
                    size={16}
                    className="flex-shrink-0 mt-0.5"
                    style={{ color: "#d4a017" }}
                  />
                  <div>
                    <p className="font-display text-sm font-semibold text-white">
                      Sama-Savli Road, Vadodara
                    </p>
                    <p
                      className="font-body text-xs mt-0.5"
                      style={{ color: "rgba(255,255,255,0.65)" }}
                    >
                      Gujarat 390008 · Prime Residential Zone
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Stats strip */}
            <div
              className="grid grid-cols-3 divide-x divide-border"
              style={{ backgroundColor: "#1a2744" }}
            >
              {(
                [
                  { value: "12+", label: "Projects" },
                  { value: "5 km", label: "From Station" },
                  { value: "₹30L+", label: "Starting Price" },
                ] as const
              ).map((stat) => (
                <div key={stat.label} className="py-3 text-center">
                  <div
                    className="font-display text-base font-bold"
                    style={{ color: "#d4a017" }}
                  >
                    {stat.value}
                  </div>
                  <div
                    className="font-body text-xs"
                    style={{ color: "rgba(255,255,255,0.6)" }}
                  >
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
