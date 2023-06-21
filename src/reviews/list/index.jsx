/** @jsx jsx */
import { jsx, css } from "@emotion/react"

import {
  useProductReviewsState,
  useProductReviewsDispatch,
} from "../_state/hooks"
import { usePortal } from "@shopwp/hooks"
import { useShopState } from "@shopwp/components"
import { mq } from "@shopwp/common"

const ReviewsListContent = wp.element.lazy(() =>
  import(/* webpackChunkName: 'ReviewsListContent-public' */ "./content")
)

const ReviewsPagination = wp.element.lazy(() =>
  import(/* webpackChunkName: 'ReviewsPagination-public' */ "../pagination")
)

const ReviewForm = wp.element.lazy(() =>
  import(/* webpackChunkName: 'ReviewForm-public' */ "../write")
)

const EmptyReviews = wp.element.lazy(() =>
  import(/* webpackChunkName: 'EmptyReviews-public' */ "./empty")
)

const WriteReviewLink = wp.element.lazy(() =>
  import(/* webpackChunkName: 'WriteReviewLink-public' */ "./write")
)

function ReviewsList() {
  const reviewsState = useProductReviewsState()
  const reviewsDispatch = useProductReviewsDispatch()
  const shopState = useShopState()

  const ReviewsListWrapCSS = css`
    display: flex;
    flex-direction: column;
    max-width: 1200px;
  `

  const ReviewsListHeaderCSS = css`
    margin-bottom: 0;
    display: flex;
    align-items: baseline;
    border-bottom: 1px solid #ddd;
    margin-bottom: 10px;

    h3 {
      font-size: 24px;
      margin-bottom: 15px;
    }

    p {
      margin-left: 10px;
      font-size: 14px;
      color: #818181;
      position: relative;
      top: -2px;
    }

    ${mq("small")} {
      flex-direction: column;
      align-items: center;
      justify-content: center;

      p {
        margin-left: 0;
        margin-bottom: 20px;
        margin-top: 2px;
      }

      h3 {
        margin-bottom: 0;
      }
    }
  `

  function onToggle() {
    reviewsDispatch({
      type: "SET_IS_WRITING_REVIEW",
      payload: !reviewsState.isWritingReview,
    })
  }

  return usePortal(
    <div css={ReviewsListWrapCSS}>
      <header css={ReviewsListHeaderCSS}>
        <h3>{shopState.t.l.customerReviews}</h3>
        <p>
          (Showing {reviewsState.reviewsTruncated.length}
          {reviewsState.reviewsTruncated.length === 1
            ? " " + shopState.t.l.review
            : " " + shopState.t.l.reviews}
          )
        </p>
        {reviewsState.settings.showCreateNew &&
        reviewsState.settings.productId ? (
          <WriteReviewLink onToggle={onToggle} />
        ) : null}
      </header>
      {reviewsState.isWritingReview && reviewsState.settings.productId ? (
        <ReviewForm
          sku={reviewsState.settings.productId}
          product_title={
            reviewsState.products.length
              ? reviewsState.products[0].name
              : shopwp.misc.postTitle
          }
          product_url={
            reviewsState.products.length
              ? reviewsState.products[0].product_link
              : window.location.href
          }
        />
      ) : null}
      {reviewsState.reviewsTruncated?.length ? <ReviewsListContent /> : null}
      {reviewsState.reviewsShown < reviewsState.reviews.length ? (
        <ReviewsPagination />
      ) : null}

      {reviewsState.reviews.length <= 0 && !reviewsState.isWritingReview ? (
        <EmptyReviews onToggle={onToggle} />
      ) : null}
    </div>,
    reviewsState.settings.dropzoneListing
  )
}

export default ReviewsList
