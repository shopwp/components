/** @jsx jsx */
import { jsx, css } from "@emotion/react"
import { useShopState } from "@shopwp/components"

function ProductVariantMissingSelection({ option, productBuyButtonState }) {
  const shopState = useShopState()
  const selectStyles = css`
    margin-top: 6px;
    color: red;
  `

  return (
    <p css={selectStyles}>
      {wp.hooks.applyFilters(
        "product.missingSelectionText",
        shopState.t.l.selectA + String(option.name).toLowerCase(),
        productBuyButtonState
      )}
    </p>
  )
}

export default ProductVariantMissingSelection
