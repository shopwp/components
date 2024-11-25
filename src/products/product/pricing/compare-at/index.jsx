/** @jsx jsx */
import { jsx, css } from "@emotion/react"
import ProductPrice from "../price"
import ProductPriceSaleNotice from "../sale-notice"

function ProductPricesCompareAt({
  compareAt,
  selectedVariant,
  prices,
  settings,
  productState,
}) {
  function showSalePrice() {
    if (
      (compareAt &&
        selectedVariant &&
        selectedVariant.compareAtPrice.amount !==
          selectedVariant.price.amount) ||
      !productState.hasManyVariants
    ) {
      return true
    }

    return false
  }
  return (
    <>
      <div className="swp-l-row swp-l-baseline swp-m-l-row">
        {showSalePrice() ? (
          <ProductPriceSaleNotice
            fontSize={settings.pricingCompareAtTypeFontSize}
            color={settings.pricingCompareAtTypeSaleTextColor}
          />
        ) : null}

        <ProductPrice
          selectedVariant={selectedVariant}
          compareAt={false}
          showPriceRange={false}
          prices={prices}
        />

        {showSalePrice() ? (
          <div className="swp-pricing-compare-at wps-product-prices-compare-at">
            <ProductPrice
              prices={prices}
              selectedVariant={selectedVariant}
              compareAt={true}
              showPriceRange={false}
            />
          </div>
        ) : null}
      </div>
    </>
  )
}

export default ProductPricesCompareAt
