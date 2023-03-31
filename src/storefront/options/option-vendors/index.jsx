import { getAllVendors } from "Api"
import { shouldOpenOnLoad } from "Common"
import { useShopState } from "ShopState"

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
