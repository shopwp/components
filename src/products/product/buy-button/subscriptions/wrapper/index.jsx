import SubscriptionDetails from "../details"
import { useProductState, useProductDispatch } from "../../../_state/hooks"
import { findSellingPlanById, calcNewPriceInfo } from "@shopwp/common"

const SellingGroups = wp.element.lazy(() =>
  import(/* webpackChunkName: 'SellingGroups-public' */ "../selling-groups")
)

function SubscriptionsBuyButtonWrapper({ settings }) {
  const { useEffect } = wp.element
  const { Suspense } = wp.element
  const productState = useProductState()
  const productDispatch = useProductDispatch()

  useEffect(() => {
    if (productState.selectedSubscription && productState.selectedVariant) {
      productDispatch({
        type: "SET_SUBSCRIPTION_PRICING",
        payload: calcNewPriceInfo(
          findSellingPlanById(
            productState.selectedVariant,
            productState.selectedSubscription.id
          ),
          productState.selectedVariant
        ),
      })
    } else {
      productDispatch({
        type: "SET_SUBSCRIPTION_PRICING",
        payload: false,
      })
    }
  }, [productState.selectedVariant, productState.selectedSubscription])

  return (
    <Suspense fallback={false}>
      <div className="swp-l-col swp-mb10 swp-mt15 swp-sub-wrapper">
        <SellingGroups />
        <SubscriptionDetails settings={settings} />
      </div>
    </Suspense>
  )
}

export default SubscriptionsBuyButtonWrapper
