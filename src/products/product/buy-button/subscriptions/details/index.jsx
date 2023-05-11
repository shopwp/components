import { FilterHook } from "@shopwp/common"
import { useShopState, Tooltip } from "@shopwp/components"

function SubscriptionDetails() {
  const shopState = useShopState()

  return (
    <FilterHook name="product.subscriptionsInfoHTML">
      <Tooltip label={shopState.t.l.subDetailsHeading}>
        <p>{shopState.t.n.subDetailsContent}</p>
      </Tooltip>
    </FilterHook>
  )
}

export default SubscriptionDetails
