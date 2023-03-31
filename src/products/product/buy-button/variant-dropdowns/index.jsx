import ProductOption from "../option"

function ProductVariantDropdowns({
  options,
  selectedOptions,
  missingSelections,
  variants,
  allSelectableOptions,
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
              allSelectableOptions={allSelectableOptions}
            />
          ))
        : null}
    </div>
  )
}

export default ProductVariantDropdowns
