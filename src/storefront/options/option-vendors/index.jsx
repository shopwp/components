import { getAllVendors } from "@shopwp/api"
import { shouldOpenOnLoad } from "@shopwp/common"
import { useShopState } from "@shopwp/components"

const StorefrontFilterOptionsGroupOption = wp.element.lazy(() =>
  import(
    /* webpackChunkName: 'StorefrontFilterOptionsGroupOption-public' */ "../option"
  )
)

function OptionVendors({ settings }) {
  const shopState = useShopState()

  return (
    <StorefrontFilterOptionsGroupOption
      openOnLoad={shouldOpenOnLoad(settings, "vendors")}
      shopState={shopState}
      noFilterGroupFoundText={shopState.t.n.noItemsLeft}
      queryFn={getAllVendors}
      groupType="vendors"
      filterName="storefront.availableVendors"
      heading={settings.vendorsHeading}
    />
  )
}

export default OptionVendors
