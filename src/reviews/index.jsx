import ProductReviewsProvider from "./_state/provider"
import ProductReviewsWrapper from "./wrapper"
import { usePortal } from "@shopwp/hooks"
import { useShopState } from "@shopwp/components"

const ReviewsRating = wp.element.lazy(() =>
  import(/* webpackChunkName: 'ReviewsRating-public' */ "./rating")
)

const ReviewsList = wp.element.lazy(() =>
  import(/* webpackChunkName: 'ReviewsList-public' */ "./list")
)

function Reviews(props) {
  const shopState = useShopState()
  const { Suspense } = wp.element

  return shopwp.misc.hasYotpo && props.settings.showReviews
    ? usePortal(
        <ProductReviewsProvider shopState={shopState} {...props}>
          <ProductReviewsWrapper>
            <Suspense fallback="Loading reviews ...">
              {props.settings.showRating ? <ReviewsRating /> : null}
              {props.settings.showListing ? <ReviewsList /> : null}
            </Suspense>
          </ProductReviewsWrapper>
        </ProductReviewsProvider>,
        props.element
      )
    : null
}

export default Reviews
