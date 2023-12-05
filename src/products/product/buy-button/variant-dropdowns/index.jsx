import ProductOption from "../option"

import ProductOptionDropdown from "../option/dropdown"

function ProductVariantDropdowns({
  options,
  selectedOptions,
  missingSelections,
  variants,
  selectFirstVariant,
  selectedVariant,
}) {
  return (
    <div
      className="swp-products-options wps-component wps-component-products-options"
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
                selectedVariant={selectedVariant}
              />
            </ProductOption>
          ))
        : null}
    </div>
  )
}

export default ProductVariantDropdowns
