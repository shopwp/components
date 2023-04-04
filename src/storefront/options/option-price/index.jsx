import { shouldOpenOnLoad } from "@shopwp/common"
import { useShopState } from "@shopwp/components"

const StorefrontFilterOptionsGroup = wp.element.lazy(() =>
  import(
    /* webpackChunkName: 'StorefrontFilterOptionsGroup-public' */ "../group"
  )
)

const StorefrontFilterOptionsGroupItems = wp.element.lazy(() =>
  import(
    /* webpackChunkName: 'StorefrontFilterOptionsGroupItems-public' */ "../group-items"
  )
)

function OptionPrice({ settings }) {
  const shouldOpen = shouldOpenOnLoad(settings, "price")
  const shopState = useShopState()
  const priceValues = [
    shopState.t.l.priceLvl1,
    shopState.t.l.priceLvl2,
    shopState.t.l.priceLvl3,
    shopState.t.l.priceLvl4,
    shopState.t.l.priceLvl5,
  ]

  return (
    <StorefrontFilterOptionsGroup
      openOnLoad={shouldOpen}
      isLoadingItems={false}
      groupType="price"
      areFilterOptionsEmpty={false}
      noFilterGroupFoundText={shopState.t.n.noItemsLeft}
      heading={shopState.t.l.price}
      items={
        <StorefrontFilterOptionsGroupItems
          filterOptions={wp.hooks.applyFilters(
            "storefront.availablePricing",
            priceValues
          )}
          itemType="price"
        />
      }
    />
  )
}

export default OptionPrice
