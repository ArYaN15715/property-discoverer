import { MessageCircle, Phone } from "lucide-react";
import { motion, useInView } from "motion/react";
import { useRef } from "react";

export default function CtaSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      className="py-16 px-4"
      style={{
        background:
          "linear-gradient(135deg, rgba(212,160,23,0.06) 0%, rgba(26,39,68,0.04) 100%)",
      }}
      data-ocid="cta.section"
    >
      <motion.div
        ref={ref}
        className="max-w-2xl mx-auto text-center"
        initial={{ opacity: 0, scale: 0.96 }}
        animate={isInView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.55, ease: [0.4, 0, 0.2, 1] }}
      >
        {/* Eyebrow */}
        <motion.span
          initial={{ opacity: 0, y: -8 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="inline-block text-xs font-semibold uppercase tracking-widest px-4 py-1.5 rounded-full mb-5 border font-body"
          style={{
            color: "#d4a017",
            borderColor: "rgba(212,160,23,0.35)",
            backgroundColor: "rgba(212,160,23,0.08)",
          }}
        >
          Free Consultation Available
        </motion.span>

        {/* Headline */}
        <h2
          className="font-display font-bold text-3xl md:text-4xl leading-tight mb-4"
          style={{ color: "#1a2744" }}
        >
          Need Help Finding the{" "}
          <span style={{ color: "#c0392b" }}>Right Property?</span>
        </h2>

        {/* Sub-text */}
        <p className="font-body text-base text-muted-foreground mb-8 max-w-lg mx-auto leading-relaxed">
          Our local experts know Sama-Savli Road inside out. Get personalized
          guidance — no pressure, just good advice.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <motion.a
            href="https://wa.me/917572905655"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full font-body font-semibold text-white text-sm shadow-elevated transition-all"
            style={{ backgroundColor: "#25D366" }}
            whileHover={{
              scale: 1.04,
              boxShadow: "0 8px 24px rgba(37,211,102,0.35)",
            }}
            whileTap={{ scale: 0.97 }}
            data-ocid="cta.whatsapp_button"
          >
            <MessageCircle size={18} />💬 Chat on WhatsApp
          </motion.a>

          <motion.a
            href="tel:+917572905655"
            className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full font-body font-semibold text-white text-sm shadow-elevated transition-all"
            style={{ backgroundColor: "#c0392b" }}
            whileHover={{
              scale: 1.04,
              boxShadow: "0 8px 24px rgba(192,57,43,0.35)",
            }}
            whileTap={{ scale: 0.97 }}
            data-ocid="cta.call_button"
          >
            <Phone size={18} />📞 Talk to Expert
          </motion.a>
        </div>

        {/* Trust note */}
        <p className="mt-5 font-body text-xs text-muted-foreground">
          Free consultation · No obligation · Response within 1 hour
        </p>
      </motion.div>
    </section>
  );
}
