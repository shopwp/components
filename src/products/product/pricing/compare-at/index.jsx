/** @jsx jsx */
import { jsx, css } from "@emotion/react"
import ProductPrice from "../price"
import ProductPriceSaleNotice from "../sale-notice"
import { firstPriceCompareAt } from "@shopwp/common"

function ProductPricesCompareAt({
  compareAt,
  selectedVariant,
  showPriceRange,
  prices,
}) {
  const ProductPricesCompareAtWrapperCSS = css`
    display: flex;
    align-items: center;
    margin: ${selectedVariant ? "6px 0 0 0" : "10px 0 0 0"};

    .wps-product-individual-price {
      font-size: 15px;
    }

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
      <ProductPrice
        selectedVariant={selectedVariant}
        compareAt={false}
        showPriceRange={showPriceRange}
        prices={prices}
      />

      {compareAt && hasCompareAtPrice ? (
        <div
          className="wps-product-prices-compare-at"
          css={ProductPricesCompareAtWrapperCSS}
        >
          <ProductPriceSaleNotice>
            <ProductPrice
              prices={prices}
              selectedVariant={selectedVariant}
              compareAt={true}
              showPriceRange={showPriceRange}
            />
          </ProductPriceSaleNotice>
        </div>
      ) : null}
    </>
  )
}

export default wp.element.memo(ProductPricesCompareAt)
