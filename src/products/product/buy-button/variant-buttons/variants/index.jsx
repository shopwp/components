import ProductOptionValue from "../../option/value"
import ProductVariantButtonValue from "../variant"

function ProductVariantsButtons({ option, selectedOptions }) {
  return option.values.length
    ? option.values.map((optionObj) => (
        <ProductOptionValue
          selectedOptions={selectedOptions}
          optionObj={optionObj}
          key={optionObj.name + optionObj.value}
        >
          <ProductVariantButtonValue />
        </ProductOptionValue>
      ))
    : null
}

export default ProductVariantsButtons
