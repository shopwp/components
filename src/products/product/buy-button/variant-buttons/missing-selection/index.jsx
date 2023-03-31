/** @jsx jsx */
import { jsx, css } from "@emotion/react"
import { useShopState } from "ShopState"

function ProductVariantMissingSelection({ productOptionState }) {
  const shopState = useShopState()
  const selectStyles = css`
    margin-top: 6px;
    color: red;
  `

  return (
    <p css={selectStyles}>
      {wp.hooks.applyFilters(
        "product.missingSelectionText",
        shopState.t.l.selectA +
          String(productOptionState.option.name).toLowerCase(),
        productOptionState
      )}
    </p>
  )
}

export default ProductVariantMissingSelection
