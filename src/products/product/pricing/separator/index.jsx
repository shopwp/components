/** @jsx jsx */
import { jsx, css } from "@emotion/react"

function ProductPricingSeparator({ compareAt, settings }) {
  const ProductPricingSeparatorCSS = css`
    margin: 0 3px;
    display: inline-block;
    position: relative;
    font-size: 0.7em;
    top: 1px;
    line-height: 0;
    height: 2px;
    font-size: 0.7em;
    width: 17px;
    background: ${compareAt
      ? settings.pricingCompareAtTypeFontColor
      : settings.pricingColor};
  `

  return (
    <div
      css={ProductPricingSeparatorCSS}
      className="wps-product-from-price-separator"
    ></div>
  )
}

export default ProductPricingSeparator
