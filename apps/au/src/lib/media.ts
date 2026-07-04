export function productAsset(fileName: string, productSlug = "grounding-sheets") {
  return `/images/products/${productSlug}/${fileName}`;
}

export function productMediaAsset(
  fileName: string,
  productSlug = "grounding-sheets",
  kind: "images" | "videos" = "images",
) {
  return `/media/products/${productSlug}/${kind}/${fileName}`;
}

export function homeAsset(fileName: string) {
  return `/images/home/${fileName}`;
}

export type ProductImage = {
  src: string;
  fallbackSrc?: string;
  alt: string;
  animated?: boolean;
  width?: number;
  height?: number;
};
