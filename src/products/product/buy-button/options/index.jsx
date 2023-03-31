/** @jsx jsx */
import { jsx, css } from "@emotion/react"

import ProductVariantButtons from "../variant-buttons"
import ProductVariantDropdowns from "../variant-dropdowns"
import ClearSelections from "../clear-selections"

function ProductOptions({
  variantStyle,
  availableOptions,
  missingSelections,
  selectedOptions,
  variants,
  allSelectableOptions,
  hasSelections,
  isDirectCheckoutOut,
}) {
  const ProductOptionsCSS = css`
    position: relative;
  `
  return (
    <div
      className="wps-product-options"
      css={ProductOptionsCSS}
      aria-label={`Product variant ${variantStyle ? variantStyle : "dropdown"}`}
    >
      {hasSelections && !isDirectCheckoutOut && <ClearSelections />}

      {variantStyle === "dropdown" ? (
        <ProductVariantDropdowns
          options={availableOptions}
          missingSelections={missingSelections}
          selectedOptions={selectedOptions}
          variants={variants}
          allSelectableOptions={allSelectableOptions}
        />
      ) : variantStyle === "buttons" ? (
        <ProductVariantButtons
          options={availableOptions}
          missingSelections={missingSelections}
          selectedOptions={selectedOptions}
          variants={variants}
          allSelectableOptions={allSelectableOptions}
        />
      ) : (
        <ProductVariantDropdowns
          options={availableOptions}
          missingSelections={missingSelections}
          selectedOptions={selectedOptions}
          variants={variants}
          allSelectableOptions={allSelectableOptions}
        />
      )}
    </div>
  )
}

export default ProductOptions
