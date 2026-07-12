import { ProductReviewsGrid } from "./ProductReviewsGrid";
import {
  getMergedProductReviewDataset,
  reviewPageSize,
} from "@/data/reviews";

export async function ProductReviewsSection({ productHandle = "grounding-sheets" }: { productHandle?: string } = {}) {
  const dataset = await getMergedProductReviewDataset(productHandle);

  if (!dataset) {
    return null;
  }

  const initialReviews = dataset.reviews.slice(0, reviewPageSize);

  return (
    <section className="juujo-section bg-[var(--cream)] py-7 md:py-12" id="reviews">
      <div className="juujo-wrap">
        <ProductReviewsGrid
          averageRating={dataset.summary.averageRating}
          initialReviews={initialReviews}
          pageSize={reviewPageSize}
          productHandle={productHandle}
          ratingDistribution={dataset.summary.ratingDistribution}
          total={dataset.summary.total}
        />
      </div>
    </section>
  );
}
