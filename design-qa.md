# Design QA — comparison LP editorial upgrade

## Source truth

- Reference: `qa/eye-care-5/reference.png`
- Scope: all comparison LPs except `eye-care-5`
- Visual language: off-white paper, Mincho-led editorial hierarchy, burgundy CTA, real woman/product imagery, concern-to-choice narrative

## Implementation evidence

- Korean serum desktop: `qa/editorial-10/korean-desktop.png`
- Cleansing desktop: `qa/editorial-10/cleansing-desktop.png`
- Sensitive moisturizer mobile: `qa/editorial-10/sensitive-moisturizer-mobile.png`

## Comparison

- Hero density and warmth: matched with approved model/product visuals in every target LP.
- Brand hierarchy: retained MY SKIN EDIT header, editorial eyebrow, large Mincho headline, muted supporting copy.
- Conversion path: retained existing affiliate destinations and added a clearer comparison CTA on sparse pages.
- Content flow: sparse pages now include concern framing and three choice axes before the comparison table.
- Asset integrity: CSS/div product art was removed from heroes; all ten editorial hero images resolve successfully.
- Responsive behavior: all ten pages tested at 390 px width with no horizontal overflow or broken images.
- Accessibility: hero images have theme-specific Japanese alt text; existing focusable links remain intact.

## Verification

- `npm.cmd run build`: passed
- 10/10 target LPs: editorial visual present
- 10/10 target LPs: zero broken images
- 10/10 target LPs: zero mobile horizontal overflow
- Affiliate links preserved: 49 total (the existing `serum-pore-5` page has four active affiliate links)

final result: passed

---

## Conversion-link QA — 2026-07-27

### Source visual truth

- UV hero: `qa/conversion-links/source-uv-hero.png` (1158 × 649)
- UV product card: `qa/conversion-links/source-uv-product-card.png` (1114 × 156)
- UV pin gallery: `qa/conversion-links/source-uv-pin-gallery.png` (1169 × 716)
- Serum product cards: `qa/conversion-links/source-serum-product-cards.png` (1176 × 492)

### Implementation evidence

- UV hero: `qa/conversion-links/implementation-uv-hero.png` (1265 × 712)
- UV product card: `qa/conversion-links/implementation-uv-product-card.png` (1265 × 712)
- UV pin gallery: `qa/conversion-links/implementation-uv-pin-gallery.png` (1265 × 712)
- Serum product cards: `qa/conversion-links/implementation-serum-product-cards.png` (1265 × 712)
- Combined comparison: `qa/conversion-links/comparison-rendered.png`
- Browser viewport: 1265 × 712 CSS px; device density 1
- State: desktop, default theme, product cards and Pinterest gallery visible

### Full-view comparison

- The UV hero no longer contains a maintenance date or update badge.
- The established MY SKIN EDIT typography, spacing, colors and approved imagery remain unchanged.

### Focused comparison

- Secondary official-information buttons were removed without disturbing card alignment.
- The remaining purchase CTA keeps its established size, color and hierarchy.
- All three UV Pinterest images now retain the original layout while functioning as links.
- Product-card typography, padding, radii, shadows and imagery match the pre-change design.

### Interaction verification

- Blank space in the first UV product card navigated to the correct Rakuten product page.
- All 11 comparison LPs were checked: 59 active affiliate anchors are contained in 54 clickable product cards.
- `serum-pore-5` has four clickable cards; the RAIZ card remains non-clickable while A8 approval is pending.
- Official-information buttons inside product cards: 0
- Broken images: 0
- Horizontal overflow: 0
- UV Pinterest image links: 3
- Browser console errors affecting the flow: none observed

### Comparison history

- P1: purchase navigation was limited to the small CTA. Fixed by extending activation to the full product card and verified with a live Rakuten navigation.
- P1: official-information CTAs created competing exits. Fixed by removing them from all comparison LP product cards.
- P1: the UV Pinterest gallery had no links. Fixed by linking all three images to their published Pinterest pins.
- P2: dated freshness copy required manual maintenance. Fixed by removing update-date wording.

### Remaining findings

- No actionable P0/P1/P2 findings.

final result: passed
