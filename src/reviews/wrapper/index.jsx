import { to } from "@shopwp/common"
import {
  getYotpoReviewsByProductId,
  getYotpoReviews,
  maybeHandleApiError,
} from "@shopwp/api"
import ReviewsSkeleton from "../skeleton"
import {
  useProductReviewsState,
  useProductReviewsDispatch,
} from "../_state/hooks"

import { useAction } from "@shopwp/hooks"

import Notice from "../../notice"

function ProductReviewsWrapper({ children }) {
  const { useEffect, useState } = wp.element
  const [isFetchingReviews, setIsFetchingReviews] = useState(true)
  const dispatch = useProductReviewsDispatch()
  const state = useProductReviewsState()

  const payloadReady = useAction("on.itemsLoad")

  useEffect(() => {
    if (payloadReady) {
      var found = payloadReady.filter(
        (i) => i.node && i.node.id.includes(state.reviewsProductId.toString())
      )

      if (found.length) {
        dispatch({
          type: "SET_REVIEWS_PAYLOAD",
          payload: found[0].node,
        })
      }
    }
  }, [payloadReady])

  function updateTruncatedReviews(reviews) {
    dispatch({
      type: "SET_REVIEWS_TRUNCATED",
      payload: reviews.slice(0, state.reviewsShown),
    })
  }

  async function getAllReviews() {
    const [error, resp] = await to(getYotpoReviews())

    var maybeApiError = maybeHandleApiError(error, resp)

    if (maybeApiError) {
      setIsFetchingReviews(false)
      console.error(maybeApiError)
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

  async function getReviewsForProduct(productId) {
    const [error, resp] = await to(
      getYotpoReviewsByProductId({
        productId: productId,
      })
    )

    var maybeApiError = maybeHandleApiError(error, resp)

    if (maybeApiError) {
      console.error(maybeApiError)
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
      return
    }

    if (state.reviewsProductId) {
      getReviewsForProduct(state.reviewsProductId)
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
