/** @jsx jsx */
import { jsx, css } from "@emotion/react"

function CartLineItemVariantTitle({ lineItem }) {
  const badgeCSS = css``

  return (
    <div
      css={badgeCSS}
      className="swp-cart-lineitem-variant-title wps-cart-lineitem-variant-title"
    >
      {wp.hooks.applyFilters(
        "cart.lineItemVariantTitleText",
        lineItem.merchandise.title,
        lineItem
      )}
    </div>
  )
}

export default wp.element.memo(CartLineItemVariantTitle)
