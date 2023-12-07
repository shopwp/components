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
  const ProductPricesCompareAtWrapperCSS = css``

  return (
    <>
      <div className="swp-l-row swp-l-baseline swp-m-l-row">
        {(compareAt && selectedVariant) || !productState.hasManyVariants ? (
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

        {(compareAt && selectedVariant) || !productState.hasManyVariants ? (
          <div
            className="swp-pricing-compare-at wps-product-prices-compare-at"
            css={ProductPricesCompareAtWrapperCSS}
          >
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
