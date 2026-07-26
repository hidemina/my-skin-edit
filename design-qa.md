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
