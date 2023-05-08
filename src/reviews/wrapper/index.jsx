/** @jsx jsx */
import { jsx, css } from "@emotion/react"
import { to } from "@shopwp/common"
import {
  getYotpoReviewsByProductId,
  getYotpoReviews,
  maybeHandleApiError,
} from "@shopwp/api"
import ReviewsSkeleton from "../skeleton"
import { removeSkelly } from "@shopwp/common"
import {
  useProductReviewsState,
  useProductReviewsDispatch,
} from "../_state/hooks"

import Notice from "../../notice"

function ProductReviewsWrapper({ children }) {
  const { useEffect, useState, Suspense } = wp.element
  const [isFetchingReviews, setIsFetchingReviews] = useState(true)
  const dispatch = useProductReviewsDispatch()
  const state = useProductReviewsState()

  function updateTruncatedReviews(reviews) {
    dispatch({
      type: "SET_REVIEWS_TRUNCATED",
      payload: reviews.slice(0, state.reviewsShown),
    })
  }

  async function getAllReviews() {
    const [error, resp] = await to(getYotpoReviews())

    removeSkelly(state.element)

    if (maybeHandleApiError(error, resp, dispatch)) {
      setIsFetchingReviews(false)
      return
    }

    if (resp.data.status && resp.data.status.error_type) {
      setIsFetchingReviews(false)

      dispatch({
        type: "SET_NOTICE",
        payload: {
          type: "error",
          message:
            resp.data.status.error_type + ": " + resp.data.status.message,
        },
      })

      return
    }

    if (resp.data.reviews) {
      dispatch({
        type: "SET_REVIEWS",
        payload: resp.data.reviews,
      })

      updateTruncatedReviews(resp.data.reviews)
    }

    setIsFetchingReviews(false)
  }

  async function getReviewsForProduct() {
    const [error, resp] = await to(
      getYotpoReviewsByProductId({
        productId: state.settings.productId,
      })
    )

    removeSkelly(state.element)

    if (maybeHandleApiError(error, resp, dispatch)) {
      setIsFetchingReviews(false)
      return
    }

    if (resp.data.status && resp.data.status.error_type) {
      setIsFetchingReviews(false)

      dispatch({
        type: "SET_NOTICE",
        payload: {
          type: "error",
          message:
            resp.data.status.error_type + ": " + resp.data.status.message,
        },
      })

      return
    }

    if (resp.data.response) {
      dispatch({
        type: "SET_REVIEWS",
        payload: resp.data.response.reviews,
      })

      dispatch({
        type: "SET_REVIEWS_BOTTOM_LINE",
        payload: resp.data.response.bottomline,
      })

      dispatch({
        type: "SET_PRODUCTS",
        payload: resp.data.response.products,
      })

      updateTruncatedReviews(resp.data.response.reviews)
    }

    setIsFetchingReviews(false)
  }

  useEffect(() => {
    if (!state.reviews) {
      return
    }

    updateTruncatedReviews(state.reviews)
  }, [state.reviewsShown])

  useEffect(() => {
    if (!state.hasApiConnection || !shopwp.misc.hasYotpo) {
      setIsFetchingReviews(false)
      removeSkelly(state.element)
      return
    }

    if (state.settings.productId) {
      getReviewsForProduct()
    } else {
      getAllReviews()
    }
  }, [])

  return (
    <>
      {isFetchingReviews ? (
        <ReviewsSkeleton />
      ) : state.notice ? (
        <Notice status={state.notice.type}>{state.notice.message}</Notice>
      ) : (
        <div className="shopwp-reviews-wrapper">{children}</div>
      )}
    </>
  )
}

export default ProductReviewsWrapper
