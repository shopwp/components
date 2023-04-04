import { getAllTypes } from "@shopwp/api"
import { shouldOpenOnLoad } from "@shopwp/common"
import { useShopState } from "@shopwp/components"

const StorefrontFilterOptionsGroupOption = wp.element.lazy(() =>
  import(
    /* webpackChunkName: 'StorefrontFilterOptionsGroupOption-public' */ "../option"
  )
)

function OptionTypes({ settings }) {
  const shouldOpen = shouldOpenOnLoad(settings, "productTypes")
  const shopState = useShopState()

  return (
    <StorefrontFilterOptionsGroupOption
      openOnLoad={shouldOpen}
      noFilterGroupFoundText={shopState.t.n.noItemsLeft}
      queryFn={getAllTypes}
      groupType="types"
      filterName="storefront.availableTypes"
      heading={shopState.t.l.types}
    />
  )
}

export default OptionTypes
