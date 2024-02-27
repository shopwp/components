import { rSet, rErr } from "@shopwp/common"

function ProductReviewsReducer(state, action) {
  switch (action.type) {
    case "SET_REVIEWS": {
      return rSet("reviews", action, state)
    }

    case "SET_REVIEWS_TRUNCATED": {
      return rSet("reviewsTruncated", action, state)
    }

    case "SET_REVIEWS_SHOWN": {
      return rSet("reviewsShown", action, state)
    }

    case "SET_REVIEWS_BOTTOM_LINE": {
      return rSet("reviewsBottomLine", action, state)
    }

    case "SET_PRODUCTS": {
      return rSet("products", action, state)
    }

    case "SET_NOTICE": {
      return rSet("notice", action, state)
    }

    case "SET_IS_WRITING_REVIEW": {
      return rSet("isWritingReview", action, state)
    }

    case "SET_REVIEWS_PAYLOAD": {
      return rSet("payload", action, state)
    }

    default: {
      rErr(action, "ProductReviews")
    }
  }
}

export default ProductReviewsReducer
