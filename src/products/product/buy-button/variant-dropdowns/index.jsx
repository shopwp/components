import ProductOption from "../option"

import ProductOptionDropdown from "../option/dropdown"

function ProductVariantDropdowns({
  options,
  selectedOptions,
  missingSelections,
  variants,
  selectFirstVariant,
}) {
  return (
    <div
      className="wps-component wps-component-products-options"
      aria-label="Product Options"
    >
      {options
        ? options.map((option) => (
            <ProductOption
              key={option.name}
              option={option}
              selectedOptions={selectedOptions}
              missingSelections={missingSelections}
              variants={variants}
              totalOptions={options.length}
            >
              <ProductOptionDropdown
                selectedOptions={selectedOptions}
                missingSelections={missingSelections}
                option={option}
                selectFirstVariant={selectFirstVariant}
              />
            </ProductOption>
          ))
        : null}
    </div>
  )
}

export default ProductVariantDropdowns
