import { getAllTypes } from "@shopwp/api"
import { shouldOpenOnLoad } from "@shopwp/common"
import { useShopState } from "@shopwp/components"

const StorefrontFilterOptionsGroupOption = wp.element.lazy(() =>
  import(
    /* webpackChunkName: 'StorefrontFilterOptionsGroupOption-public' */ "../option"
  )
)

function OptionTypes({ settings }) {
  const shouldOpen = shouldOpenOnLoad(settings, "types")
  const shopState = useShopState()

  return (
    <StorefrontFilterOptionsGroupOption
      openOnLoad={shouldOpen}
      noFilterGroupFoundText={shopState.t.n.noItemsLeft}
      queryFn={getAllTypes}
      groupType="types"
      filterName="storefront.availableTypes"
      heading={settings.typesHeading}
    />
  )
}

export default OptionTypes
