/** @jsx jsx */
import { jsx, css } from "@emotion/react"
import ProductPriceSingle from "../single"
import ProductPricingRangeGroup from "./group"

function ProductPricingRange({
  firstPrice,
  lastPrice,
  isFirstAndLastSame,
  compareAt,
  showPriceRange,
  pricingColor,
  settings,
}) {
  const showPriceRangeStyles = css`
    margin-top: 0;
    position: ${showPriceRange && compareAt ? "relative" : "static"};
    display: flex;
    align-items: baseline;
    height: 100%;
    line-height: 1;
    align-items: center;
  `

  return (
    <span className="wps-pricing-range-wrapper" css={showPriceRangeStyles}>
      {isFirstAndLastSame ? (
        <ProductPriceSingle
          showPriceRange={showPriceRange}
          price={firstPrice}
          compareAt={compareAt}
          pricingColor={pricingColor}
          settings={settings}
        />
      ) : (
        <ProductPricingRangeGroup
          firstPrice={firstPrice}
          lastPrice={lastPrice}
          compareAt={compareAt}
          showPriceRange={showPriceRange}
          pricingColor={pricingColor}
          settings={settings}
        />
      )}
    </span>
  )
}

export default ProductPricingRange
