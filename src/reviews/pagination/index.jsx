/** @jsx jsx */
import { jsx, css } from "@emotion/react"
import { buttonCSS } from "@shopwp/common"
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

  function onClick() {
    dispatch({
      type: "SET_REVIEWS_SHOWN",
      payload: state.reviewsShown + state.reviewsShownIncrement,
    })
  }

  return (
    <div
      css={[buttonCSS, loadMoreButtonCSS]}
      className={"swp-button-pagination wps-btn-next-page"}
      onClick={onClick}
    >
      {shopState.t.l.loadReviews}
    </div>
  )
}

export default ReviewsPagination
