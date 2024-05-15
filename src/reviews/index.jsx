import ProductReviewsProvider from "./_state/provider"
import ProductReviewsWrapper from "./wrapper"
import { usePortal } from "@shopwp/hooks"
import { useShopState } from "@shopwp/components"

import ReviewsRating from "./rating"
import ReviewsList from "./list"

function Reviews(props) {
  const shopState = useShopState()
  const { Suspense } = wp.element

  return (
    <ProductReviewsProvider shopState={shopState} {...props}>
      <ProductReviewsWrapper>
        <Suspense fallback="Loading reviews ...">
          {usePortal(
            <>
              {props.settings.showRating ? <ReviewsRating /> : null}
              {props.settings.showListing ? (
                <ReviewsList shouldEnablePortal={true} />
              ) : null}
            </>,
            props.element
          )}
        </Suspense>
      </ProductReviewsWrapper>
    </ProductReviewsProvider>
  )
}

export default Reviews
