# Design Brief: Property Discoverer

## Direction
Modern premium discovery platform — dark navy primary, cream/white foreground, red accent for actions, gold highlights for CTAs. Editorial, refined, exploration-driven. Inspired by Airbnb/Pinterest grid discovery.

## Tone
Helpful, soft-sell, curiosity-first. Avoid aggressive; encourage browsing and personal connection.

## Palette
| Token | OKLCH | Purpose |
|-------|-------|---------|
| Navy Primary | `0.25 0 280` | Headers, primary interactions, filter active state |
| Destructive/Red | `0.5 0.22 22` | Price badges, secondary actions |
| Gold Accent | `0.65 0.185 50` | CTA buttons (WhatsApp, Expert Call), highlights |
| Background | `0.99 0 0` light, `0.08 0 0` dark | Main surface |
| Card | `0.96 0 0` light, `0.14 0 0` dark | Property cards, elevated surfaces |
| Muted | `0.88 0 0` light, `0.18 0 0` dark | Filters inactive, secondary text |
| Border | `0.88 0 0` light, `0.2 0 0` dark | Subtle dividers, input borders |

## Typography
**Display:** Bricolage Grotesque (modern, distinctive headings)
**Body:** Inter via Google Fonts (refined, highly readable)
**Mono:** Geist Mono (technical, code)

## Elevation & Depth
- **Cards:** `shadow-card` (2px 8px, subtle depth)
- **Overlays/Elevated:** `shadow-elevated` (8px 24px, modal/elevated states)
- **Hover:** Slight lift + gold glow on CTAs via `.glow-gold`

## Structural Zones
| Zone | Background | Border | Notes |
|------|------------|--------|-------|
| Header | Navy (primary) | None | White text, logo, nav |
| Hero | Background | None | Full-width search bar, gradient subtle backdrop |
| Grid | Background | Border (subtle) | Property cards with shadow-card |
| Filters | Background | Border (active=gold) | Pill buttons, toggle navy on active |
| Trust Section | Muted/30 | None | Icon+text tiles, editorial feel |
| CTA Section | Dark (sidebar) | None | Gold headline, gold+red buttons |
| Footer | Navy | Border-t | White text, social links |
| Mobile Sticky Bar | Navy | Border-t | WhatsApp + Call buttons, fixed bottom |

## Component Patterns
- **Property Card:** Image + overlay on hover → Save ❤️ + "Explore" button (gold) + Price badge (red) + Tags (gold text)
- **Filter Pill:** Inactive=muted, Active=navy bg + gold outline + white text
- **CTA Button:** Gold bg, navy text, white hover state, no shadow (clean)
- **Input/Search:** Navy border on focus, subtle background, placeholder in muted

## Motion & Animation
- **Fade-in:** 0.4s ease-out (section load)
- **Slide-up:** 0.3s cubic-bezier (property card entry)
- **Shimmer:** 2s linear (skeleton loading)
- **Hover:** Smooth 0.3s on all interactive elements (transition-smooth)

## Spacing & Rhythm
- **Radius:** 0.5rem (consistent, slightly rounded cards)
- **Gap:** 1rem between cards (grid), 2rem between sections
- **Padding:** Cards 1rem, Sections 2rem (mobile), 3rem (desktop)

## Signature Detail
Gold glow effect on gold CTAs (`glow-gold`) — subtle ambient light communicates premium, clickable experience. Combines with smooth animations to create discovery momentum.

## Constraints
- No aggressive colors or animations
- High contrast (AA+) for accessibility
- Mobile-first responsive (sm/md/lg breakpoints)
- Dark mode primary (discovery experience)
- Lazy load images, skeleton placeholders with shimmer

## Exports
- `index.css`: OKLCH palette, @font-face (Bricolage Grotesque, Geist Mono), utilities (shadow-card, gradient-gold-accent, glow-gold)
- `tailwind.config.js`: Custom shadows (card, elevated), animations (fade-in, slide-up, shimmer)
- Fonts copied: BricolageGrotesque.woff2, GeistMono.woff2, Inter via CDN
