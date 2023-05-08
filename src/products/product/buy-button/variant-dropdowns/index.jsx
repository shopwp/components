import ProductOption from "../option"

const ProductOptionDropdown = wp.element.lazy(() =>
  import(
    /* webpackChunkName: 'ProductOptionDropdown-public' */ "../option/dropdown"
  )
)

function ProductVariantDropdowns({
  options,
  selectedOptions,
  missingSelections,
  variants,
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
              />
            </ProductOption>
          ))
        : null}
    </div>
  )
}

export default ProductVariantDropdowns
