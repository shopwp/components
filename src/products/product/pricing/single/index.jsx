/** @jsx jsx */
import { jsx, css } from "@emotion/react"
import { Price } from "Components"

const ProductPriceSingle = wp.element.forwardRef((props, ref) => {
  const priceCSS = css`
    display: inline-block;
    padding: 0;
    margin: ${props.compareAt ? "1px" : "0"} 0 0
      ${props.compareAt ? "7px" : "0"};
    font-size: ${props.pricingFontSize
      ? props.pricingFontSize
      : props.compareAt
      ? "16px"
      : "18px"};
    color: ${props.pricingColor
      ? props.pricingColor
      : props.compareAt
      ? "#848484"
      : "#121212"};
    text-decoration: ${props.compareAt ? "line-through" : "none"};
    font-weight: ${props.compareAt ? "normal" : "bold"};
  `

  return props.price !== false || props.price !== null ? (
    <span
      ref={ref}
      className="wps-product-individual-price"
      css={priceCSS}
      data-price={props.price}
      itemProp="price"
      content={props.price}
    >
      <Price price={props.price} />
    </span>
  ) : null
})

export default wp.element.memo(ProductPriceSingle)
