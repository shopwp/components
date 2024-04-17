import { FilterHook } from "@shopwp/common"
import { Tooltip } from "@shopwp/components"

function SubscriptionDetails({ settings }) {
  return (
    <FilterHook name="product.subscriptionsInfoHTML">
      <Tooltip label={settings.subscriptionsDetailsHeading}>
        <p>{settings.subscriptionsDetailsText}</p>
      </Tooltip>
    </FilterHook>
  )
}

export default SubscriptionDetails
