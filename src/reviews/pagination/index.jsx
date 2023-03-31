/** @jsx jsx */
import { jsx, css } from "@emotion/react"
import { buttonCSS } from "Common/css"
import {
  useProductReviewsState,
  useProductReviewsDispatch,
} from "../_state/hooks"
import { useShopState } from "ShopState"

function ReviewsPagination() {
  const state = useProductReviewsState()
  const dispatch = useProductReviewsDispatch()
  const shopState = useShopState()

  const loadMoreButtonCSS = css`
    max-width: 250px;
    display: flex;
    flex-direction: column;
    margin: 0 auto;
  `

  function onClick() {
    dispatch({
      type: "SET_REVIEWS_SHOWN",
      payload: state.reviewsShown + state.reviewsShownIncrement,
    })
  }

  return (
    <div
      css={[buttonCSS, loadMoreButtonCSS]}
      className={"wps-btn-next-page"}
      onClick={onClick}
    >
      {shopState.t.l.loadReviews}
    </div>
  )
}

export default ReviewsPagination
