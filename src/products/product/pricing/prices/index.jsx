/** @jsx jsx */
import { jsx, css } from "@emotion/react"
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

  const ProductPricesCompareAtCSS = css`
    display: flex;
    flex-direction: column;
    align-items: baseline;
    position: relative;
    margin-bottom: ${settings.isSingleComponent || settings.type === "search"
      ? "0px"
      : "20px"};

    + .wps-buy-button-wrapper > .wps-product-quantity-wrapper {
      margin-top: 1.7em;
    }

    + .shopwp-reviews-wrapper,
    + .wps-component-products-reviews {
      margin-top: 0;
      margin-bottom: 15px;
    }
  `

  return (
    <div
      className="wps-component-products-pricing"
      aria-label="Product Pricing"
      css={ProductPricesCompareAtCSS}
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
