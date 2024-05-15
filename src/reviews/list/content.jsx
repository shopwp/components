import { useProductReviewsState } from "../_state/hooks"
import ReviewListItem from "./item"

function ReviewsListContent() {
  const reviewsState = useProductReviewsState()

  return (
    <ul className="swp-reviews-list">
      {reviewsState.reviewsTruncated.map((review, index) => (
        <ReviewListItem
          key={review.id}
          review={review}
          index={index}
          size={reviewsState.reviewsTruncated.length}
          reviewsState={reviewsState}
        />
      ))}
    </ul>
  )
}

export default ReviewsListContent
