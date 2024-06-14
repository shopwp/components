import { getAllTags } from "@shopwp/api"
import { shouldOpenOnLoad } from "@shopwp/common"
import { useShopState } from "@shopwp/components"

const StorefrontFilterOptionsGroupOption = wp.element.lazy(() =>
  import(
    /* webpackChunkName: 'StorefrontFilterOptionsGroupOption-public' */ "../option"
  )
)

function OptionTags({ settings }) {
  const shopState = useShopState()

  return (
    <StorefrontFilterOptionsGroupOption
      openOnLoad={shouldOpenOnLoad(settings, "tags")}
      noFilterGroupFoundText={shopState.t.n.noItemsLeft}
      queryFn={getAllTags}
      groupType="tags"
      filterName="storefront.availableTags"
      heading={settings.tagsHeading}
    />
  )
}

export default OptionTags
