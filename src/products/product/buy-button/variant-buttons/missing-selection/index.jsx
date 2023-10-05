/** @jsx jsx */
import { jsx, css } from "@emotion/react"
import { useShopState } from "@shopwp/components"

function ProductVariantMissingSelection({ option, productBuyButtonState }) {
  const shopState = useShopState()
  const selectStyles = css`
    margin: 0 0 0 5px;
    color: red;
    font-weight: normal;
    line-height: 1;
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
