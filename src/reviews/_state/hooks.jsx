import {
  ProductReviewsStateContext,
  ProductReviewsDispatchContext,
} from "./context"

function useProductReviewsState() {
  const context = wp.element.useContext(ProductReviewsStateContext)

  if (!context) {
    throw new Error(
      "useProductReviewsState must be used within the ProductReviewsProvider"
    )
  }

  return context
}

function useProductReviewsDispatch() {
  const context = wp.element.useContext(ProductReviewsDispatchContext)

  if (!context) {
    throw new Error(
      "useProductReviewsDispatch must be used within the ProductReviewsProvider"
    )
  }

  return context
}

export { useProductReviewsState, useProductReviewsDispatch }
