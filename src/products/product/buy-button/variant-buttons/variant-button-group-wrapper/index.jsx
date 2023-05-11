/** @jsx jsx */
import { jsx, css } from "@emotion/react"
import ProductVariantsButtons from "../variants"
import ProductVariantMissingSelection from "../missing-selection"
import { FilterHook } from "@shopwp/common"
import { useProductBuyButtonState } from "../../_state/hooks"

function ProductVariantButtonGroupWrapper({
  option,
  missingSelections,
  selectedOptions,
}) {
  const { useRef } = wp.element

  const productBuyButtonState = useProductBuyButtonState()
  const variantGroup = useRef()

  const labelStyles = css`
    margin-bottom: 5px;
    font-weight: bold;
    font-size: 15px;
  `

  const groupStyles = css`
    display: flex;
    flex-direction: column;
    margin-bottom: 10px;
  `

  return (
    <div className="wpshopify-variant-buttons-group" css={groupStyles}>
      <FilterHook
        name="product.labelHtml"
        args={[
          option,
          productBuyButtonState,
          productBuyButtonState.allSelectableOptions,
        ]}
      >
        <label css={labelStyles}>
          {wp.hooks.applyFilters(
            "product.optionName",
            option.name,
            productBuyButtonState
          )}
        </label>
      </FilterHook>

      <div className="wpshopify-variant-buttons" ref={variantGroup}>
        <ProductVariantsButtons
          option={option}
          selectedOptions={selectedOptions}
        />
      </div>
      {missingSelections &&
      !productBuyButtonState.selectedOptions.hasOwnProperty(option.name) ? (
        <ProductVariantMissingSelection
          option={option}
          productBuyButtonState={productBuyButtonState}
        />
      ) : null}
    </div>
  )
}

export default ProductVariantButtonGroupWrapper
