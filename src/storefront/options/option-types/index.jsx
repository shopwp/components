import { getAllTypes } from "Api"
import { shouldOpenOnLoad } from "Common"
import { useShopState } from "ShopState"

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
