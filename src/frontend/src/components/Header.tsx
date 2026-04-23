import { Button } from "@/components/ui/button";
import { Link, useRouter } from "@tanstack/react-router";
import { Heart, Home, Menu, MessageCircle, Search, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const NAV_LINKS = [
  { label: "Home", href: "/", Icon: Home },
  { label: "Explore", href: "/explore", Icon: Search },
  { label: "Saved", href: "/saved", Icon: Heart },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const router = useRouter();
  const currentPath = router.state.location.pathname;
  const prevPath = useRef(currentPath);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => {
    if (prevPath.current !== currentPath) {
      prevPath.current = currentPath;
      setMobileOpen(false);
    }
  });

  return (
    <header
      className="sticky top-0 z-50 transition-smooth"
      style={{
        backgroundColor: "#1a2744",
        boxShadow: scrolled
          ? "0 4px 20px rgba(26,39,68,0.35)"
          : "0 2px 8px rgba(26,39,68,0.15)",
      }}
      data-ocid="header"
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-3 min-w-0 group"
            data-ocid="header.logo_link"
          >
            <div className="flex-shrink-0 w-9 h-9 rounded-full overflow-hidden border-2 border-brand-gold/60 group-hover:border-brand-gold transition-smooth">
              <img
                src="/assets/cropped_circle_image-019daf21-3dd3-73b8-9748-73d13681fd82.png"
                alt="Property Discoverer Logo"
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).style.display = "none";
                }}
              />
            </div>
            <div className="flex flex-col leading-none">
              <span
                className="font-display font-bold text-base tracking-tight"
                style={{ color: "#d4a017" }}
              >
                Property Discoverer
              </span>
              <span
                className="text-xs font-body"
                style={{ color: "rgba(255,255,255,0.55)" }}
              >
                Sama-Savli, Vadodara
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav
            className="hidden md:flex items-center gap-1"
            data-ocid="header.nav"
          >
            {NAV_LINKS.map(({ label, href, Icon }) => (
              <Link
                key={href}
                to={href}
                className="px-4 py-2 rounded-lg text-sm font-body font-medium transition-smooth flex items-center gap-1.5"
                style={{
                  color:
                    currentPath === href ? "#d4a017" : "rgba(255,255,255,0.85)",
                  backgroundColor:
                    currentPath === href
                      ? "rgba(212,160,23,0.12)"
                      : "transparent",
                }}
                data-ocid={`header.nav.${label.toLowerCase()}_link`}
              >
                <Icon className="w-3.5 h-3.5" />
                {label}
              </Link>
            ))}

            <a
              href="https://wa.me/917572905655"
              target="_blank"
              rel="noopener noreferrer"
              data-ocid="header.whatsapp_button"
            >
              <Button
                size="sm"
                className="ml-2 font-body font-medium rounded-lg"
                style={{
                  backgroundColor: "#25D366",
                  color: "white",
                  border: "none",
                }}
              >
                <MessageCircle className="w-3.5 h-3.5 mr-1.5" />
                WhatsApp
              </Button>
            </a>
          </nav>

          {/* Mobile menu toggle */}
          <button
            type="button"
            className="md:hidden p-2 rounded-lg transition-smooth"
            style={{ color: "rgba(255,255,255,0.85)" }}
            onClick={() => setMobileOpen((v) => !v)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            data-ocid="header.mobile_menu_toggle"
          >
            {mobileOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {mobileOpen && (
        <div
          className="md:hidden border-t animate-slide-down"
          style={{
            backgroundColor: "#111d35",
            borderColor: "rgba(255,255,255,0.08)",
          }}
          data-ocid="header.mobile_menu"
        >
          <nav className="container mx-auto px-4 py-3 flex flex-col gap-1">
            {NAV_LINKS.map(({ label, href, Icon }) => (
              <Link
                key={href}
                to={href}
                className="px-4 py-3 rounded-lg text-sm font-body font-medium transition-smooth flex items-center gap-2"
                style={{
                  color:
                    currentPath === href ? "#d4a017" : "rgba(255,255,255,0.85)",
                  backgroundColor:
                    currentPath === href
                      ? "rgba(212,160,23,0.12)"
                      : "transparent",
                }}
                data-ocid={`header.mobile_nav.${label.toLowerCase()}_link`}
              >
                <Icon className="w-4 h-4" />
                {label}
              </Link>
            ))}
            <a
              href="https://wa.me/917572905655"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2"
              data-ocid="header.mobile_whatsapp_button"
            >
              <Button
                className="w-full font-body font-medium"
                style={{
                  backgroundColor: "#25D366",
                  color: "white",
                  border: "none",
                }}
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                Chat on WhatsApp
              </Button>
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
