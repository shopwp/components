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

  return (
    <ProductReviewsProvider shopState={shopState} {...props}>
      <ProductReviewsWrapper>
        <Suspense fallback="Loading reviews ...">
          {shopwp.misc.hasYotpo && props.settings.showReviews
            ? usePortal(
                <>
                  {props.settings.showRating ? <ReviewsRating /> : null}
                  {props.settings.showListing ? <ReviewsList /> : null}
                </>,
                props.element
              )
            : null}
        </Suspense>
      </ProductReviewsWrapper>
    </ProductReviewsProvider>
  )
}

export default Reviews
