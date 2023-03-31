/** @jsx jsx */
import { jsx, css } from "@emotion/react"
import { ProductOptionContext } from "../../option/_state/context"
import ProductVariantsButtons from "../variants"
import ProductVariantMissingSelection from "../missing-selection"
import { FilterHook } from "Common"

function ProductVariantButtonGroupWrapper({
  option,
  missingSelections,
  selectedOptions,
  allSelectableOptions,
}) {
  const { useRef, useContext } = wp.element
  const [productOptionState] = useContext(ProductOptionContext)
  const variantGroup = useRef()

  const labelStyles = css`
    margin-bottom: 5px;
    font-weight: bold;
    font-size: 15px;
  `

  const groupStyles = css`
    display: flex;
    flex-direction: column;
  `

  return (
    <div className="wpshopify-variant-buttons-group" css={groupStyles}>
      <FilterHook
        name="product.labelHtml"
        args={[option, productOptionState, allSelectableOptions]}
      >
        <label css={labelStyles}>
          {wp.hooks.applyFilters(
            "product.optionName",
            option.name,
            productOptionState
          )}
        </label>
      </FilterHook>

      <div className="wpshopify-variant-buttons" ref={variantGroup}>
        <ProductVariantsButtons
          option={option}
          selectedOptions={selectedOptions}
          variants={productOptionState.variants}
          totalOptions={productOptionState.totalOptions}
          allSelectableOptions={allSelectableOptions}
        />
      </div>
      {missingSelections && !productOptionState.isOptionSelected ? (
        <ProductVariantMissingSelection
          productOptionState={productOptionState}
        />
      ) : null}
    </div>
  )
}

export default ProductVariantButtonGroupWrapper
