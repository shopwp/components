import { ProductOptionProvider } from "./_state/provider"
import ProductOptionWrapper from "./wrapper"

const ProductOptionDropdown = wp.element.lazy(() =>
  import(/* webpackChunkName: 'ProductOptionDropdown-public' */ "./dropdown")
)

function ProductOption({
  option,
  selectedOptions,
  missingSelections,
  variants,
  totalOptions,
  allSelectableOptions,
}) {
  const { useRef } = wp.element
  const dropdownElement = useRef()

  return (
    <ProductOptionProvider
      options={{
        option: option,
        variants: variants,
        dropdownElement: dropdownElement,
        totalOptions: totalOptions,
      }}
    >
      <ProductOptionWrapper>
        <ProductOptionDropdown
          selectedOptions={selectedOptions}
          missingSelections={missingSelections}
          allSelectableOptions={allSelectableOptions}
        />
      </ProductOptionWrapper>
    </ProductOptionProvider>
  )
}

export default wp.element.memo(ProductOption)
