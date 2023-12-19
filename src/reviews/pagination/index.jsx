/** @jsx jsx */
import { jsx, css } from "@emotion/react"
import {
  useProductReviewsState,
  useProductReviewsDispatch,
} from "../_state/hooks"
import { useShopState } from "@shopwp/components"

function ReviewsPagination() {
  const state = useProductReviewsState()
  const dispatch = useProductReviewsDispatch()
  const shopState = useShopState()

  const loadMoreButtonCSS = css``
  const buttonCSS = css``

  function onClick() {
    dispatch({
      type: "SET_REVIEWS_SHOWN",
      payload: state.reviewsShown + state.reviewsShownIncrement,
    })
  }

  return (
    <div
      css={[buttonCSS, loadMoreButtonCSS]}
      className="swp-btn swp-button-pagination wps-btn-next-page"
      onClick={onClick}
    >
      {shopState.t.l.loadReviews}
    </div>
  )
}

export default ReviewsPagination
