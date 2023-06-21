/** @jsx jsx */
import { jsx, css } from "@emotion/react"

function CartLineItemVariantTitle({ lineItem }) {
  const badgeCSS = css`
    display: inline-block;
    width: auto;
    font-weight: 400;
    font-size: 12px;
    margin-bottom: 16px;
    vertical-align: baseline;
    flex: 0 0 100%;
    letter-spacing: 0.02em;
    line-height: 1.4;
    margin: 4px 0 20px 0;
    max-width: 190px;
    white-space: break-spaces;
    text-align: left;
    border-radius: ${shopwp.general.globalBorderRadius};
    color: black;
    background: #f9f9f9;
    padding: 2px 6px;
    box-shadow: 0 0 0 1px #d1d1d1;
  `

  return (
    <div css={badgeCSS} className="wps-cart-lineitem-variant-title">
      {wp.hooks.applyFilters(
        "cart.lineItemVariantTitleText",
        lineItem.merchandise.title,
        lineItem
      )}
    </div>
  )
}

export default wp.element.memo(CartLineItemVariantTitle)
