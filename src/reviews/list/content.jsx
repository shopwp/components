/** @jsx jsx */
import { jsx, css } from "@emotion/react"
import { useProductReviewsState } from "../_state/hooks"
import ReviewListItem from "./item"

function ReviewsListContent() {
  const reviewsState = useProductReviewsState()

  const ReviewsListCSS = css`
    padding: 0;
    margin: 20px 0 0 0;
    list-style: none;
  `

  return (
    <ul className="shopwp-reviews-list" css={ReviewsListCSS}>
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
