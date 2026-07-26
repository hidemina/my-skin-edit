# Design QA — Eye Care 5

## Target

- Reference: `qa/eye-care-5/reference.png`
- Desktop capture: `qa/eye-care-5/prototype-desktop.png`
- Mobile capture: `qa/eye-care-5/prototype-mobile.png`
- Route: `/lp/eye-care-5/`

## Comparison

- Hero: two-column editorial layout, ivory background, dark Mincho heading, wine-red accent, benefit-led copy, badges and primary CTA match the selected visual direction.
- Brand: MY SKIN EDIT logo lockup, tagline and restrained women’s-magazine styling are preserved.
- Content: concern cards, three selection criteria, five product choices, comparison table and decision guide follow the reference sequence.
- Product imagery: all five product cards use live images supplied by Rakuten Affiliate. No fictional packages are used.
- Responsive: 390px viewport has no horizontal overflow. Product cards collapse to a readable mobile layout and the comparison table remains horizontally scrollable within its container.
- Interaction: the primary CTA moves to `#products`; all ten product-image/button affiliate links carry `data-offer` and `data-product` for GA4 click measurement.
- Runtime: build passed; five product images and two editorial images loaded; browser console reported no errors.

## Remaining polish

- P3: The coded page uses more vertical spacing than the single-image reference so that text and buttons remain readable and accessible on real devices.
- P3: Product crops vary because the image framing is controlled by each Rakuten shop.

final result: passed
