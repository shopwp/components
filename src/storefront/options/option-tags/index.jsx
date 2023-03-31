import { getAllTags } from "Api"
import { shouldOpenOnLoad } from "Common"
import { useShopState } from "ShopState"

const StorefrontFilterOptionsGroupOption = wp.element.lazy(() =>
  import(
    /* webpackChunkName: 'StorefrontFilterOptionsGroupOption-public' */ "../option"
  )
)

function OptionTags({ settings }) {
  const shouldOpen = shouldOpenOnLoad(settings, "tags")
  const shopState = useShopState()

  return (
    <StorefrontFilterOptionsGroupOption
      openOnLoad={shouldOpen}
      noFilterGroupFoundText={shopState.t.n.noItemsLeft}
      queryFn={getAllTags}
      groupType="tags"
      filterName="storefront.availableTags"
      heading={shopState.t.l.tags}
    />
  )
}

export default OptionTags
