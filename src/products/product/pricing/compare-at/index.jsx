/** @jsx jsx */
import { jsx, css } from "@emotion/react"
import ProductPrice from "../price"
import { firstPriceCompareAt } from "@shopwp/common"
import ProductPriceSaleNotice from "../sale-notice"

function ProductPricesCompareAt({
  compareAt,
  selectedVariant,
  showPriceRange,
  prices,
  settings,
}) {
  const ProductPricesCompareAtWrapperCSS = css`
    display: flex;
    align-items: center;
    margin: ${selectedVariant ? "0 0 0 10px" : "0 0 0 10px"};

    &:empty {
      display: none;
    }
  `

  if (selectedVariant) {
    if (selectedVariant.node.compareAtPrice) {
      var hasCompareAtPrice = selectedVariant.node.compareAtPrice.amount
    } else {
      var hasCompareAtPrice = false
    }
  } else {
    var hasCompareAtPrice = firstPriceCompareAt(prices)
  }

  return (
    <>
      <div className="swp-l-row">
        <ProductPrice
          selectedVariant={selectedVariant}
          compareAt={false}
          showPriceRange={showPriceRange}
          prices={prices}
        />

        {compareAt && hasCompareAtPrice && selectedVariant ? (
          <>
            <ProductPriceSaleNotice
              fontSize={settings.pricingCompareAtTypeFontSize}
              color={settings.pricingCompareAtTypeSaleTextColor}
            />
            <div
              className="wps-product-prices-compare-at"
              css={ProductPricesCompareAtWrapperCSS}
            >
              <ProductPrice
                prices={prices}
                selectedVariant={selectedVariant}
                compareAt={true}
                showPriceRange={showPriceRange}
              />
            </div>
          </>
        ) : null}
      </div>
    </>
  )
}

export default ProductPricesCompareAt
