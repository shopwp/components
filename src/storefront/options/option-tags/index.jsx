import { getAllTags } from "@shopwp/api"
import { shouldOpenOnLoad } from "@shopwp/common"
import { useShopState } from "@shopwp/components"

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
      heading={settings.tagsHeading}
    />
  )
}

export default OptionTags
