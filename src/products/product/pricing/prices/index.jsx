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

  function showPriceRange(prices) {
    if (!settings.showPriceRange) {
      return false
    }

    if (prices.regPrices.length > 1) {
      return true
    }

    return false
  }

  function shouldShowCompareAt() {
    if (!settings.showCompareAt) {
      return false
    }

    if (productState.selectedVariant) {
      if (
        productState.selectedVariant.compareAtPrice &&
        productState.selectedVariant.compareAtPrice.amount
      ) {
        if (
          productState.selectedVariant.compareAtPrice.amount === "0" ||
          productState.selectedVariant.compareAtPrice.amount === "0.0" ||
          productState.selectedVariant.compareAtPrice.amount === "0.00"
        ) {
          return false
        }
        return true
      }
    } else {
      if (!productState.hasManyVariants) {
        // Now make sure it actually has a compare at price on the single variant
        if (productState.payload.variants.edges.length) {
          if (productState.payload.variants.edges[0].node.compareAtPrice) {
            return true
          }
        }
      }
    }

    return false
  }

  const prices = getPrices(productState.payload)

  return (
    <div
      className={
        "swp-mb20 swp-l-col swp-l-baseline swp-l-rel100 swp-product-pricing " +
        settings.pricingClassName
      }
      data-show-price-range={showPriceRange(prices)}
      data-is-selected={!!productState.selectedVariant}
      data-show-sale-pricing={shouldShowCompareAt()}
      aria-label="Product Pricing"
      itemScope
      itemProp="offers"
      itemType="https://schema.org/Offer"
    >
      {showPriceRange(prices) ? (
        <>
          <meta itemProp="minPrice" content={min(prices.regPrices)} />
          <meta itemProp="maxPrice" content={max(prices.regPrices)} />
        </>
      ) : null}

      <meta
        itemProp="availability"
        href={`https://schema.org/${
          productState.payload.availableForSale ? "InStock" : "OutOfStock"
        }`}
        content={
          productState.payload.availableForSale ? "In stock" : "Out of stock"
        }
      />
      <meta itemProp="price" content={prices.regPrices[0]} />
      <meta itemProp="priceCurrency" content={shopState.currency} />

      <FilterHook name="before.productPricing" args={[productState]} />

      {productState.subscriptionPricing ? (
        <div className="swp-l-row swp-l-baseline swp-m-l-row">
          <ProductPricesSubscription
            productState={productState}
            subType={productState.activeSellingGroup}
            insideSubscriptionsWidget={false}
          />
        </div>
      ) : shouldShowCompareAt() ? (
        <Suspense fallback={false}>
          <ProductPricesCompareAt
            selectedVariant={productState.selectedVariant}
            compareAt={settings.showCompareAt}
            productState={productState}
            prices={prices}
            settings={settings}
          />
        </Suspense>
      ) : (
        <ProductPrice
          selectedVariant={productState.selectedVariant}
          compareAt={false}
          showPriceRange={showPriceRange(prices)}
          prices={prices}
        />
      )}

      <FilterHook name="after.productPricing" args={[productState]} />
    </div>
  )
}

export { ProductPrices }
