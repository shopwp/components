/** @jsx jsx */
import { jsx, css } from "@emotion/react"
import ProductVariantsButtons from "../variants"
import ProductVariantMissingSelection from "../missing-selection"
import { FilterHook } from "@shopwp/common"
import { useProductBuyButtonState } from "../../_state/hooks"
import { useSettingsState } from "../../../../../items/_state/settings/hooks"

function ProductVariantButtonGroupWrapper({
  option,
  missingSelections,
  selectedOptions,
}) {
  const { useRef } = wp.element

  const settings = useSettingsState()
  const productBuyButtonState = useProductBuyButtonState()
  const variantGroup = useRef()

  const labelStyles = css`
    margin-bottom: 5px;

    color: ${settings && settings.variantLabelTextColor
      ? settings.variantLabelTextColor
      : "black"};
    font-family: ${settings && settings.variantDropdownTypeFontFamily
      ? settings.variantDropdownTypeFontFamily
      : "inherit"};
    font-weight: ${settings && settings.variantDropdownTypeFontWeight
      ? settings.variantDropdownTypeFontWeight
      : "bold"};
    font-style: ${settings && settings.variantDropdownTypeFontStyle
      ? settings.variantDropdownTypeFontStyle
      : "initial"};
    font-size: ${settings && settings.variantDropdownTypeFontSize
      ? settings.variantDropdownTypeFontSize
      : "15px"};
    letter-spacing: ${settings && settings.variantDropdownTypeLetterSpacing
      ? settings.variantDropdownTypeLetterSpacing
      : "initial"};
    line-height: ${settings && settings.variantDropdownTypeLineHeight
      ? settings.variantDropdownTypeLineHeight
      : "initial"};
    text-decoration: ${settings && settings.variantDropdownTypeTextDecoration
      ? settings.variantDropdownTypeTextDecoration
      : "initial"};
    text-transform: ${settings && settings.variantDropdownTypeTextTransform
      ? settings.variantDropdownTypeTextTransform
      : "initial"};
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
