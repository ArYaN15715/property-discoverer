import {
  Heart,
  Home,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Search,
} from "lucide-react";

const QUICK_LINKS = [
  { label: "Home", href: "#", icon: <Home size={13} /> },
  {
    label: "Explore Properties",
    href: "#properties",
    icon: <Search size={13} />,
  },
  { label: "Sama Properties", href: "#properties", icon: <MapPin size={13} /> },
  { label: "Saved Properties", href: "#", icon: <Heart size={13} /> },
  { label: "Contact Us", href: "tel:+917572905655", icon: <Phone size={13} /> },
];

export default function Footer() {
  const year = new Date().getFullYear();
  const hostname =
    typeof window !== "undefined" ? window.location.hostname : "";
  const caffeineUrl = `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(hostname)}`;

  return (
    <footer style={{ backgroundColor: "#1a2744" }} data-ocid="footer.section">
      <div className="max-w-6xl mx-auto px-4 md:px-6 lg:px-8 py-12">
        {/* Main grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">
          {/* Column 1: Brand */}
          <div>
            {/* Logo + name */}
            <div className="flex items-center gap-2.5 mb-4">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center font-display font-bold text-lg"
                style={{ backgroundColor: "#d4a017", color: "#1a2744" }}
              >
                PD
              </div>
              <span className="font-display text-xl font-bold text-white">
                Property Discoverer
              </span>
            </div>
            <p
              className="font-body text-sm leading-relaxed"
              style={{ color: "rgba(255,255,255,0.6)" }}
            >
              Vadodara's most trusted exploration-first real estate platform. We
              help families and investors discover the perfect property in the
              Sama-Savli corridor — with local expertise and zero pressure.
            </p>
            {/* Social/contact icons */}
            <div className="flex gap-3 mt-5">
              <a
                href="https://wa.me/917572905655"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                data-ocid="footer.whatsapp_link"
                className="w-9 h-9 rounded-full flex items-center justify-center transition-transform hover:scale-110"
                style={{ backgroundColor: "#25D366" }}
              >
                <MessageCircle size={17} color="white" />
              </a>
              <a
                href="tel:+917572905655"
                aria-label="Call us"
                data-ocid="footer.call_link"
                className="w-9 h-9 rounded-full flex items-center justify-center transition-transform hover:scale-110"
                style={{ backgroundColor: "#c0392b" }}
              >
                <Phone size={17} color="white" />
              </a>
              <a
                href="mailto:info@propertydiscoverer.in"
                aria-label="Email us"
                data-ocid="footer.email_link"
                className="w-9 h-9 rounded-full flex items-center justify-center transition-transform hover:scale-110"
                style={{ backgroundColor: "rgba(255,255,255,0.12)" }}
              >
                <Mail size={17} color="white" />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4
              className="font-display text-sm font-semibold uppercase tracking-widest mb-5"
              style={{ color: "#d4a017" }}
            >
              Quick Links
            </h4>
            <ul className="space-y-3">
              {QUICK_LINKS.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="flex items-center gap-2.5 font-body text-sm transition-colors duration-200 group"
                    style={{ color: "rgba(255,255,255,0.65)" }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = "#d4a017";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = "rgba(255,255,255,0.65)";
                    }}
                    data-ocid={`footer.nav.${link.label.toLowerCase().replace(/\s+/g, "_")}`}
                    onClick={(e) => {
                      if (link.href.startsWith("#")) {
                        e.preventDefault();
                        const el = document.getElementById(link.href.slice(1));
                        el?.scrollIntoView({ behavior: "smooth" });
                      }
                    }}
                  >
                    <span style={{ color: "rgba(255,255,255,0.35)" }}>
                      {link.icon}
                    </span>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact */}
          <div>
            <h4
              className="font-display text-sm font-semibold uppercase tracking-widest mb-5"
              style={{ color: "#d4a017" }}
            >
              Contact Us
            </h4>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin
                  size={16}
                  className="flex-shrink-0 mt-0.5"
                  style={{ color: "#d4a017" }}
                />
                <p
                  className="font-body text-sm"
                  style={{ color: "rgba(255,255,255,0.65)" }}
                >
                  Sama-Savli Road,
                  <br />
                  Vadodara, Gujarat 390008
                </p>
              </div>

              <a
                href="tel:+917572905655"
                className="flex items-center gap-3 font-body text-sm transition-colors duration-200"
                style={{ color: "rgba(255,255,255,0.65)" }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = "#d4a017";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = "rgba(255,255,255,0.65)";
                }}
                data-ocid="footer.phone_link"
              >
                <Phone size={16} style={{ color: "#c0392b" }} />
                +91 75729 05655
              </a>

              <a
                href="https://wa.me/917572905655"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 font-body text-sm transition-colors duration-200"
                style={{ color: "rgba(255,255,255,0.65)" }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = "#25D366";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = "rgba(255,255,255,0.65)";
                }}
                data-ocid="footer.whatsapp_text_link"
              >
                <MessageCircle size={16} style={{ color: "#25D366" }} />
                WhatsApp Us Anytime
              </a>

              {/* Hours */}
              <p
                className="font-body text-xs"
                style={{ color: "rgba(255,255,255,0.4)" }}
              >
                Mon – Sun · 9:00 AM – 8:00 PM
              </p>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div
          className="mt-10 pt-6"
          style={{ borderTop: "1px solid rgba(255,255,255,0.1)" }}
        >
          <div
            className="flex flex-col md:flex-row items-center justify-between gap-3 text-xs font-body"
            style={{ color: "rgba(255,255,255,0.4)" }}
          >
            <p>© {year} Property Discoverer. All rights reserved.</p>
            <p>
              Made with ❤️ for property seekers in Vadodara ·{" "}
              <a
                href={caffeineUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-75 transition-opacity"
                style={{ color: "rgba(212,160,23,0.7)" }}
              >
                Built with caffeine.ai
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
