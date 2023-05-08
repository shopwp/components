/** @jsx jsx */
import { jsx, css } from "@emotion/react"
import ProductOption from "../option"
import ProductVariantButtonGroupWrapper from "./variant-button-group-wrapper"

function ProductVariantButtons({
  options,
  missingSelections,
  selectedOptions,
  variants,
}) {
  return options ? (
    <div className="wpshopify-products-variant-buttons">
      {options.map(
        (option) =>
          option && (
            <ProductOption
              key={option.name}
              option={option}
              selectedOptions={selectedOptions}
              missingSelections={missingSelections}
              variants={variants}
              totalOptions={options.length}
            >
              <ProductVariantButtonGroupWrapper
                key={option.name}
                option={option}
                missingSelections={missingSelections}
                selectedOptions={selectedOptions}
                variants={variants}
                totalOptions={options.length}
              />
            </ProductOption>
          )
      )}
    </div>
  ) : null
}

export default ProductVariantButtons
