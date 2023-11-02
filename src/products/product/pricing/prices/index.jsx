import { useProductState } from "../../_state/hooks"
import { useShopState } from "../../../../shop/_state/hooks"
import ProductPrice from "../price"
import { FilterHook, getPrices } from "@shopwp/common"
import { useSettingsState } from "../../../../items/_state/settings/hooks"
import min from "lodash-es/min"
import max from "lodash-es/max"

const ProductPricesCompareAt = wp.element.lazy(() =>
  import(
    /* webpackChunkName: 'ProductPricesCompareAt-public' */ "../compare-at"
  )
)

const ProductPricesSubscription = wp.element.lazy(() =>
  import(
    /* webpackChunkName: 'ProductPricesSubscription-public' */ "../subscription"
  )
)

function ProductPrices() {
  const settings = useSettingsState()
  const productState = useProductState()
  const shopState = useShopState()
  const { Suspense } = wp.element

  const prices = getPrices(productState.payload)

  return (
    <div
      className={"swp-product-pricing " + settings.pricingClassName}
      aria-label="Product Pricing"
      itemScope
      itemProp="offers"
      itemType="https://schema.org/Offer"
    >
      {settings.showPriceRange ? (
        <>
          <meta itemProp="minPrice" content={min(prices.regPrices)} />
          <meta itemProp="maxPrice" content={max(prices.regPrices)} />
        </>
      ) : null}

      <meta
        itemProp="availability"
        href="https://schema.org/InStock"
        content={
          productState.payload.availableForSale ? "In stock" : "Out of stock"
        }
      />
      <meta itemProp="price" content={prices.regPrices[0]} />
      <meta
        itemProp="priceCurrency"
        content={shopState.buyerIdentity.currency}
      />

      <FilterHook name="before.productPricing" args={[productState]} />

      {productState.selectedSubscriptionInfo && productState.selectedVariant ? (
        <ProductPricesSubscription
          subscriptionInfo={productState.selectedSubscriptionInfo}
          selectedVariant={productState.selectedVariant}
          settings={settings}
        />
      ) : settings.showCompareAt ? (
        <Suspense fallback={false}>
          <ProductPricesCompareAt
            selectedVariant={productState.selectedVariant}
            showPriceRange={settings.showPriceRange}
            compareAt={settings.showCompareAt}
            prices={prices}
            settings={settings}
          />
        </Suspense>
      ) : (
        <ProductPrice
          selectedVariant={productState.selectedVariant}
          compareAt={false}
          showPriceRange={settings.showPriceRange}
          prices={prices}
        />
      )}

      <FilterHook name="after.productPricing" args={[productState]} />
    </div>
  )
}

export { ProductPrices }
