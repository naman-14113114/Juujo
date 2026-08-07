const fs = require('fs');
const path = require('path');

const apps = ['us', 'uk', 'ca', 'au'];
const productsToAdd = 

export const premiumEyeMask: Product = {
  ...groundingSheets,
  id: 'premium-eye-mask',
  sku: 'JUUJO-EYE-MASK',
  slug: 'premium-eye-mask',
  name: 'Premium Eye Mask',
  heroEmphasis: 'Eye Mask',
  shortDescription: 'Premium Eye Mask',
  description: 'Premium Eye Mask',
  priceCents: 6900,
  compareAtCents: 6900,
  cartImage: productMediaAsset('juujo-premium-eye-mask.png', 'grounding-sheets', 'images'),
  colors: [
    { id: 'green', name: 'Green', hex: '#5c6b52' },
    { id: 'black', name: 'Black', hex: '#000000' },
    { id: 'pink', name: 'Pink', hex: '#ffc0cb' }
  ],
  sizes: [{ id: 'os', name: 'One Size' }],
  variants: [
    { colorId: 'green', sizeId: 'os', productId: 'PLACEHOLDER-MASK-1', variantId: 'PLACEHOLDER-MASK-V1', sku: 'MASK-G', priceCents: 6900, compareAtCents: 6900, inStock: true },
    { colorId: 'black', sizeId: 'os', productId: 'PLACEHOLDER-MASK-1', variantId: 'PLACEHOLDER-MASK-V2', sku: 'MASK-B', priceCents: 6900, compareAtCents: 6900, inStock: true },
    { colorId: 'pink', sizeId: 'os', productId: 'PLACEHOLDER-MASK-1', variantId: 'PLACEHOLDER-MASK-V3', sku: 'MASK-P', priceCents: 6900, compareAtCents: 6900, inStock: true }
  ]
};

export const groundingPillowcaseGift: Product = {
  ...groundingSheets,
  id: 'grounding-pillowcase-gift',
  sku: 'JUUJO-PILLOWCASE-GIFT',
  slug: 'grounding-pillowcase-gift',
  name: 'Grounding Pillowcase',
  heroEmphasis: 'Pillowcase',
  shortDescription: 'Grounding Pillowcase',
  description: 'Grounding Pillowcase',
  priceCents: 4900,
  compareAtCents: 4900,
  cartImage: productMediaAsset('juujo-grounding-pillowcase-gift.webp', 'grounding-sheets', 'images'),
  colors: [
    { id: 'white', name: 'White', hex: '#f2efe8' },
    { id: 'grey', name: 'Grey', hex: '#9b9a95' }
  ],
  sizes: [{ id: 'os', name: 'One Size' }],
  variants: [
    { colorId: 'white', sizeId: 'os', productId: 'PLACEHOLDER-PILLOW-1', variantId: 'PLACEHOLDER-PILLOW-V1', sku: 'PILLOW-W', priceCents: 4900, compareAtCents: 4900, inStock: true },
    { colorId: 'grey', sizeId: 'os', productId: 'PLACEHOLDER-PILLOW-1', variantId: 'PLACEHOLDER-PILLOW-V2', sku: 'PILLOW-G', priceCents: 4900, compareAtCents: 4900, inStock: true }
  ]
};
;

for (const app of apps) {
  const file = path.join('E:\\\\1st YEAR DTU\\\\New folder\\\\Juujo-Vercel', 'apps', app, 'src\\\\data\\\\products.ts');
  const content = fs.readFileSync(file, 'utf8');
  if (!content.includes('premiumEyeMask')) {
    fs.writeFileSync(file, content + productsToAdd, 'utf8');
    console.log('Added to', app);
  }
}
