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
  hasSelections,
  isDirectCheckoutOut,
  selectFirstVariant,
  selectedVariant,
}) {
  const ProductOptionsCSS = css`
    position: relative;
  `
  return (
    <div
      className={"wps-product-options " + "swp-variant-style-" + variantStyle}
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
          selectFirstVariant={selectFirstVariant}
          selectedVariant={selectedVariant}
        />
      ) : variantStyle === "buttons" ? (
        <ProductVariantButtons
          options={availableOptions}
          missingSelections={missingSelections}
          selectedOptions={selectedOptions}
          variants={variants}
        />
      ) : (
        <ProductVariantDropdowns
          options={availableOptions}
          missingSelections={missingSelections}
          selectedOptions={selectedOptions}
          variants={variants}
          selectFirstVariant={selectFirstVariant}
          selectedVariant={selectedVariant}
        />
      )}
    </div>
  )
}

export default ProductOptions
