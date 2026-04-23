import { MessageCircle, Phone } from "lucide-react";

export default function MobileCtaBar() {
  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-40 md:hidden flex border-t"
      style={{
        backgroundColor: "#1a2744",
        borderColor: "rgba(255,255,255,0.12)",
        paddingBottom: "env(safe-area-inset-bottom)",
      }}
      data-ocid="mobile_cta_bar"
    >
      <a
        href="https://wa.me/917572905655"
        target="_blank"
        rel="noopener noreferrer"
        className="flex-1 flex items-center justify-center gap-2 py-3.5 font-body font-semibold text-sm transition-smooth active:opacity-80"
        style={{ backgroundColor: "#25D366", color: "white" }}
        data-ocid="mobile_cta_bar.whatsapp_button"
      >
        <MessageCircle className="w-4.5 h-4.5" />
        Chat on WhatsApp
      </a>

      <div
        className="w-px self-stretch"
        style={{ backgroundColor: "rgba(255,255,255,0.15)" }}
      />

      <a
        href="tel:+917572905655"
        className="flex-1 flex items-center justify-center gap-2 py-3.5 font-body font-semibold text-sm transition-smooth active:opacity-80"
        style={{ backgroundColor: "#c0392b", color: "white" }}
        data-ocid="mobile_cta_bar.call_button"
      >
        <Phone className="w-4.5 h-4.5" />
        Call Expert
      </a>
    </div>
  );
}
