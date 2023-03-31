/** @jsx jsx */
import { jsx, css } from "@emotion/react"

import ProductVariantButtonGroup from "./variant-button-group"

function ProductVariantButtons({
  options,
  missingSelections,
  selectedOptions,
  variants,
  allSelectableOptions,
}) {
  return options ? (
    <div className="wpshopify-products-variant-buttons">
      {options.map(
        (option) =>
          option && (
            <ProductVariantButtonGroup
              key={option.name}
              option={option}
              missingSelections={missingSelections}
              selectedOptions={selectedOptions}
              variants={variants}
              totalOptions={options.length}
              allSelectableOptions={allSelectableOptions}
            />
          )
      )}
    </div>
  ) : null
}

export default ProductVariantButtons
