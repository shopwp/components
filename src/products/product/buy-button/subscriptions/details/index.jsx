import { FilterHook } from "Common"
import { useShopState } from "ShopState"

const SubscriptionTooltip = wp.element.lazy(() =>
  import(
    /* webpackChunkName: 'SubscriptionTooltip-public' */ "../../../../../tooltip"
  )
)

function SubscriptionDetails() {
  const shopState = useShopState()

  return (
    <SubscriptionTooltip
      label={shopState.t.l.subDetails}
      options={{ placement: "right" }}
    >
      <FilterHook name="product.subscriptionsInfoHTML">
        <>
          <strong>{shopState.t.l.subDetailsHeading}</strong>
          <p>{shopState.t.n.subDetailsContent}</p>
        </>
      </FilterHook>
    </SubscriptionTooltip>
  )
}

export default SubscriptionDetails
