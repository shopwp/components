/** @jsx jsx */
import { jsx, css } from "@emotion/react"
import { usePortal } from "@shopwp/hooks"
import { Rating } from "react-simple-star-rating"
import { fadeIn } from "@shopwp/common"
import { useProductReviewsState } from "../_state/hooks"
import { useShopState } from "@shopwp/components"

function ReviewsRating({
  reviewScore = false,
  type = "static",
  showLabel = true,
  size = 20,
  onScore = false,
  showTooltip = false,
  tooltipArray = false,
  isBusy = false,
  dropzone = null,
}) {
  const { useState } = wp.element
  const reviewsState = useProductReviewsState()
  const shopState = useShopState()

  const [score, setScore] = useState(
    reviewScore !== false && reviewScore > 0
      ? reviewScore
      : reviewsState.reviewsBottomLine
      ? reviewsState.reviewsBottomLine.average_score
      : 0
  )

  const ReviewsRatingCSS = css`
    margin: 0 0 4px 0;
    display: flex;
    align-items: center;
    position: relative;
    left: -5px;
    animation: ${fadeIn} 0.2s ease;

    .react-simple-star-rating-tooltip {
      margin-left: 10px !important;
      margin-top: -3px !important;
      font-size: 14px !important;
      line-height: 1.5 !important;
      background-color: ${isBusy
        ? "rgb(181 181 181)"
        : "rgb(51, 51, 51)"} !important;
    }

    .filled-icons {
      color: ${isBusy ? "#848280" : "rgb(241, 179, 69)"} !important;
    }
  `

  const ReviewsRatingLabelCSS = css`
    font-weight: normal;
    margin-top: 0;
    margin-left: 10px;
    font-size: 14px;
    margin-bottom: 5px;
  `

  const totalReviewsCSS = css`
    display: inline;
  `

  function onRating(value) {
    if (type === "static") {
      return
    }

    setScore(value)

    if (onScore) {
      onScore(calcFractionScore(value))
    }
  }

  function calcFractionScore(score) {
    return (score / 100) * 5
  }

  function calcPercentageScore(score) {
    return (score / 5) * 100
  }

  return reviewsState.reviews
    ? usePortal(
        <div
          className="wps-component-products-reviews"
          css={ReviewsRatingCSS}
          itemProp="reviewRating"
          itemScope
          itemType="https://schema.org/Rating"
        >
          <Rating
            onClick={onRating}
            initialValue={score}
            size={size}
            allowFraction={true}
            iconsCount={5}
            transition
            readonly={type === "static" ? true : false}
            fillColorArray={[
              "#f17a45",
              "#f19745",
              "#f1a545",
              "#f1b345",
              "#f1d045",
            ]}
            showTooltip={showTooltip}
            tooltipArray={tooltipArray}
          />

          {showLabel ? (
            <p
              css={ReviewsRatingLabelCSS}
              itemProp="aggregateRating"
              itemScope
              itemType="https://schema.org/AggregateRating"
            >
              <span css={totalReviewsCSS} itemProp="reviewCount">
                {reviewsState.reviewsBottomLine
                  ? reviewsState.reviewsBottomLine.total_review
                  : 0}
              </span>

              {!reviewsState.reviewsBottomLine ||
              reviewsState.reviewsBottomLine.total_review === 1
                ? " " + shopState.t.l.review
                : " " + shopState.t.l.reviews}
            </p>
          ) : null}
        </div>,
        dropzone === false ? dropzone : reviewsState.settings.dropzoneRating
      )
    : null
}

export default ReviewsRating
