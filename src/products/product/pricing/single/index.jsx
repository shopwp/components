/** @jsx jsx */
import { jsx, css } from "@emotion/react"
import { Price } from "@shopwp/components"

const ProductPriceSingle = wp.element.forwardRef((props, ref) => {
  const priceCSS = css`
    display: inline-block;
    padding: 0;
    margin: 0;
    font-size: ${props.compareAt
      ? props.settings.pricingCompareAtTypeFontSize
      : props.settings.pricingTypeFontSize};
    color: ${props.compareAt
      ? props.settings.pricingCompareAtTypeFontColor
      : props.settings.pricingColor};
    text-decoration: ${props.compareAt ? "line-through" : "none"};
    font-weight: ${props.compareAt ? "normal" : "bold"};
  `

  return props.price !== false || props.price !== null ? (
    <span
      ref={ref}
      className="swp-price wps-product-individual-price"
      css={priceCSS}
      data-price={props.price}
    >
      <Price price={props.price} />
    </span>
  ) : null
})

export default wp.element.memo(ProductPriceSingle)
