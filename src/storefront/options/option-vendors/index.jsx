import { getAllVendors } from "@shopwp/api"
import { shouldOpenOnLoad } from "@shopwp/common"
import { useShopState } from "@shopwp/components"

const StorefrontFilterOptionsGroupOption = wp.element.lazy(() =>
  import(
    /* webpackChunkName: 'StorefrontFilterOptionsGroupOption-public' */ "../option"
  )
)

function OptionVendors({ settings }) {
  const shouldOpen = shouldOpenOnLoad(settings, "vendors")
  const shopState = useShopState()

  return (
    <StorefrontFilterOptionsGroupOption
      openOnLoad={shouldOpen}
      noFilterGroupFoundText={shopState.t.n.noItemsLeft}
      queryFn={getAllVendors}
      groupType="vendors"
      filterName="storefront.availableVendors"
      heading={shopState.t.l.vendors}
    />
  )
}

export default OptionVendors
