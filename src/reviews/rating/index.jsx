import { usePortal } from "@shopwp/hooks"
import { Rating } from "react-simple-star-rating"
import { useProductReviewsState } from "../_state/hooks"
import { useShopState } from "@shopwp/components"

import ReviewsList from "../list"
import Modal from "../../modal"

// const Modal = wp.element.lazy(() =>
//   import(/* webpackChunkName: 'Modal-public' */ "../../modal")
// )

function ReviewsRating({
  reviewScore = false,
  type = "static",
  showLabel = true,
  size = 20,
  onScore = false,
  showTooltip = false,
  tooltipArray = false,
  dropzone = false,
  linkToModal = true,
}) {
  const { useState, useEffect } = wp.element
  const reviewsState = useProductReviewsState()
  const shopState = useShopState()
  const [isShowingModal, setIsShowingModal] = useState(false)

  const [score, setScore] = useState(
    reviewScore !== false && reviewScore > 0
      ? reviewScore
      : reviewsState.reviewsBottomLine
      ? reviewsState.reviewsBottomLine.average_score
      : 0
  )

  useEffect(() => {
    if (reviewsState.reviewsBottomLine) {
      setScore(reviewsState.reviewsBottomLine.average_score)
    }
  }, [reviewsState.reviewsBottomLine])

  function onRating(value) {
    if (type === "static") {
      return
    }

    setScore(value)

    if (onScore) {
      onScore(value)
    }
  }

  function onOpenModal(e) {
    if (!linkToModal) {
      return
    }

    setIsShowingModal(true)
  }

  function onCloseModal(e) {
    setIsShowingModal(false)
  }

  return reviewsState.reviews
    ? usePortal(
        <>
          <div
            className="wps-component-products-reviews swp-component-products-reviews"
            itemProp="reviewRating"
            itemScope
            itemType="https://schema.org/Rating"
            data-link-to-modal={linkToModal}
          >
            <Rating
              onClick={onRating}
              initialValue={score}
              size={size}
              allowFraction={false}
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
                onClick={onOpenModal}
                className="swp-rating-label"
                itemProp="aggregateRating"
                itemScope
                itemType="https://schema.org/AggregateRating"
              >
                <span className="swp-rating-count" itemProp="reviewCount">
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
          </div>
          <Modal isModalOpen={isShowingModal} onModalClose={onCloseModal}>
            <ReviewsList shouldEnablePortal={false} />
          </Modal>
        </>,
        dropzone
      )
    : null
}

export default ReviewsRating
