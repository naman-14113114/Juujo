import { market } from "@/lib/market";

const body = `# Juujo UK

Juujo UK sells premium bedding for better sleep: grounding sheets, weighted blankets, cooling bed sheets, and adaptive pillows.

## Primary Pages
- Home: ${market.siteUrl}
- Grounding Sheets: ${market.siteUrl}/products/grounding-sheets
- Weighted Blankets: ${market.siteUrl}/products/weighted-blanket
- Cooling Bed Sheets: ${market.siteUrl}/products/cooling-bed-sheets
- Pillows: ${market.siteUrl}/products/pillows
- FAQs: ${market.siteUrl}/pages/faqs

## Range Summary
- Grounding Sheet: conductive silver-threaded fitted sheet for a calmer wind-down. Organic cotton, machine washable, three colours, sizes Double / Queen / King.
- Weighted Blanket: evenly distributed glass beads with a breathable cotton cover for a cocooned feel. Weights 5kg / 7kg / 9kg.
- Cooling Bed Sheets: breathable, heat-wicking weave that helps warm sleepers stay comfortable. Set includes fitted, flat, and two pillowcases.
- Adaptive Pillow: adjustable loft with a breathable, washable cover for back, side, and front sleepers.

## Buyer Support
- Every product ships free, comes with a 100-night sleep trial and easy returns.
- Each product offers a quantity discount: Buy 1, Buy 2 (save 10%), or Buy 3 (best value, save 20%).
- Colours and sizes are selectable per product, with pricing that updates to the chosen size.

## Note
Juujo makes comfort-focused home bedding. Grounding and weighted products are wellness and comfort products, not medical treatments.
`;

export function GET() {
  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=86400, s-maxage=86400",
    },
  });
}
