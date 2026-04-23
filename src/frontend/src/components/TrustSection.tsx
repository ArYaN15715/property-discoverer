import { CheckCircle2, MapPin, Users } from "lucide-react";
import { motion, useInView } from "motion/react";
import { useRef } from "react";

interface Pillar {
  icon: React.ReactNode;
  title: string;
  desc: string;
}

const PILLARS: Pillar[] = [
  {
    icon: <CheckCircle2 size={32} strokeWidth={1.8} />,
    title: "Carefully Curated Listings",
    desc: "Every property is personally verified and vetted by our Sama-Savli area specialists before it ever appears on your screen.",
  },
  {
    icon: <MapPin size={32} strokeWidth={1.8} />,
    title: "Deep Local Expertise",
    desc: "15+ years in Vadodara real estate. We know every lane, builder, and deal in the Sama area — so you never overpay.",
  },
  {
    icon: <Users size={32} strokeWidth={1.8} />,
    title: "Personal Guidance",
    desc: "We guide you through every step — from shortlisting to registration. No confusing jargon, no hidden surprises.",
  },
];

export default function TrustSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      className="py-16 px-4 md:px-6 lg:px-8"
      style={{ backgroundColor: "#1a2744" }}
      data-ocid="trust.section"
    >
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
          ref={ref}
        >
          <h2 className="font-display text-2xl md:text-3xl font-bold text-white mb-2">
            Why <span style={{ color: "#d4a017" }}>Property Discoverer?</span>
          </h2>
          {/* Gold accent line */}
          <div className="flex justify-center mt-3">
            <span
              className="h-1 w-20 rounded-full"
              style={{ backgroundColor: "#d4a017" }}
            />
          </div>
          <p
            className="font-body text-sm mt-4"
            style={{ color: "rgba(255,255,255,0.65)" }}
          >
            We're not just another listing portal. We're your local property
            partner.
          </p>
        </motion.div>

        {/* Pillars grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {PILLARS.map((pillar, i) => (
            <motion.div
              key={pillar.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.15 + i * 0.12 }}
              className="flex flex-col items-center text-center p-6 rounded-2xl"
              style={{
                backgroundColor: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.08)",
              }}
              data-ocid={`trust.pillar.${i + 1}`}
            >
              {/* Icon circle */}
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center mb-5 flex-shrink-0"
                style={{
                  backgroundColor: "rgba(212,160,23,0.12)",
                  color: "#d4a017",
                }}
              >
                {pillar.icon}
              </div>
              <h3 className="font-display text-lg font-semibold mb-3 text-white">
                {pillar.title}
              </h3>
              <p
                className="font-body text-sm leading-relaxed"
                style={{ color: "rgba(255,255,255,0.65)" }}
              >
                {pillar.desc}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Bottom trust badge */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-10 flex flex-wrap justify-center gap-6 text-sm font-body"
          style={{ color: "rgba(255,255,255,0.5)" }}
        >
          <span className="flex items-center gap-1.5">
            <span style={{ color: "#d4a017" }}>✓</span> 500+ Families Helped
          </span>
          <span className="flex items-center gap-1.5">
            <span style={{ color: "#d4a017" }}>✓</span> RERA Compliant Listings
          </span>
          <span className="flex items-center gap-1.5">
            <span style={{ color: "#d4a017" }}>✓</span> Free Consultation
          </span>
        </motion.div>
      </div>
    </section>
  );
}
