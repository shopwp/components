import { ProductOptionProvider } from "../../option/_state/provider"

import ProductOptionWrapper from "../../option/wrapper"
import ProductVariantButtonGroupWrapper from "../variant-button-group-wrapper"

function ProductVariantButtonGroup({
  option,
  missingSelections,
  selectedOptions,
  variants,
  totalOptions,
  allSelectableOptions,
}) {
  return option ? (
    <ProductOptionProvider
      options={{
        option: option,
        variants: variants,
        totalOptions: totalOptions,
      }}
    >
      <ProductOptionWrapper>
        <ProductVariantButtonGroupWrapper
          option={option}
          missingSelections={missingSelections}
          selectedOptions={selectedOptions}
          allSelectableOptions={allSelectableOptions}
        />
      </ProductOptionWrapper>
    </ProductOptionProvider>
  ) : null
}

export default ProductVariantButtonGroup
