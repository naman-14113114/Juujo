import { market } from "@/lib/market";

const body = `# Juujo UK

Juujo UK sells premium bedding for better sleep: fitted grounding sheets, flat grounding sheets, and grounding mats.

## Primary Pages
- Home: ${market.siteUrl}
- Fitted Grounding Sheet: ${market.siteUrl}/products/grounding-sheets
- Flat Grounding Sheet: ${market.siteUrl}/products/grounding-flat-sheet
- Grounding Mat: ${market.siteUrl}/products/grounding-mat
- FAQs: ${market.siteUrl}/pages/faqs

## Range Summary
- Fitted Grounding Sheet: conductive silver-threaded fitted sheet for a calmer wind-down. Organic cotton, machine washable, three colours, sizes Double / Queen / King.
- Flat Grounding Sheet: conductive silver-threaded flat sheet for a calmer wind-down. Organic cotton, machine washable, three colours, sizes Double / Queen / King.
- Grounding Mat: versatile conductive mat for grounding at your desk, on the couch, or on the floor.

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
