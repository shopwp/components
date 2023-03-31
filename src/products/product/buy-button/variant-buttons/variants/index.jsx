import ProductOptionValue from "../../option/value"
import ProductVariantButtonValue from "../variant"

function ProductVariantsButtons({
  option,
  selectedOptions,
  variants,
  totalOptions,
  allSelectableOptions,
}) {
  return option.values.map((optionObj) => (
    <ProductOptionValue
      selectedOptions={selectedOptions}
      optionObj={optionObj}
      key={optionObj.name + optionObj.value}
      variants={variants}
      totalOptions={totalOptions}
      allSelectableOptions={allSelectableOptions}
    >
      <ProductVariantButtonValue />
    </ProductOptionValue>
  ))
}

export default ProductVariantsButtons
