import ProductReviewsProvider from "./_state/provider"
import ProductReviewsWrapper from "./wrapper"
import ReviewsRating from "./rating"
import ReviewsList from "./list"
import { usePortal } from "@shopwp/hooks"
import { useShopState } from "@shopwp/components"

function Reviews(props) {
  const shopState = useShopState()
  return shopwp.misc.hasYotpo && props.settings.showReviews
    ? usePortal(
        <ProductReviewsProvider shopState={shopState} {...props}>
          <ProductReviewsWrapper>
            {props.settings.showRating ? <ReviewsRating /> : null}
            {props.settings.showListing ? <ReviewsList /> : null}
          </ProductReviewsWrapper>
        </ProductReviewsProvider>,
        props.element
      )
    : null
}

export default Reviews
