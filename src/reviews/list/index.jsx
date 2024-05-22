import {
  useProductReviewsState,
  useProductReviewsDispatch,
} from "../_state/hooks"
import { usePortal } from "@shopwp/hooks"
import { useShopState } from "@shopwp/components"

import ReviewsListContent from "./content"
import ReviewsPagination from "../pagination"
import ReviewForm from "../write"
import EmptyReviews from "./empty"
import WriteReviewLink from "./write"

function ReviewsList({ shouldEnablePortal = true }) {
  const reviewsState = useProductReviewsState()
  const reviewsDispatch = useProductReviewsDispatch()
  const shopState = useShopState()

  function onToggle() {
    reviewsDispatch({
      type: "SET_IS_WRITING_REVIEW",
      payload: !reviewsState.isWritingReview,
    })
  }

  function ListContent() {
    return (
      <div className="swp-review-list-wrap">
        <header className="swp-review-list-header">
          <h3>{shopState.t.l.customerReviews}</h3>
          <p>
            (Showing {reviewsState.reviewsTruncated.length}
            {reviewsState.reviewsTruncated.length === 1
              ? " " + shopState.t.l.review
              : " " + shopState.t.l.reviews}
            )
          </p>
          {reviewsState.settings.showCreateNew ? (
            <WriteReviewLink onToggle={onToggle} />
          ) : null}
        </header>
        {reviewsState.isWritingReview && reviewsState.reviewsProductId ? (
          <ReviewForm
            sku={reviewsState.reviewsProductId}
            product_title={
              reviewsState.products.length
                ? reviewsState.products[0].name
                : shopwp.misc.postTitle
            }
            payload={reviewsState.payload}
          />
        ) : null}
        {reviewsState.reviewsTruncated.length ? <ReviewsListContent /> : null}
        {reviewsState.reviewsShown < reviewsState.reviews.length ? (
          <ReviewsPagination />
        ) : null}

        {reviewsState.reviews.length <= 0 && !reviewsState.isWritingReview ? (
          <EmptyReviews onToggle={onToggle} />
        ) : null}
      </div>
    )
  }

  return shouldEnablePortal ? (
    usePortal(<ListContent />, reviewsState.settings.dropzoneListing)
  ) : (
    <ListContent />
  )
}

export default ReviewsList
