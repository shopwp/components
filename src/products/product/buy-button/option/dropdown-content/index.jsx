/** @jsx jsx */
import { jsx, css } from "@emotion/react"
import { ProductOptionContext } from "../_state/context"
import { useOnClickOutside } from "@shopwp/hooks"
import ProductOptionValue from "../value"
import ProductVariantDropdownValue from "../dropdown-value"

function ProductVariantsDropdownContent({
  dropdownElement,
  isDropdownOpen,
  selectedOptions,
  option,
  allSelectableOptions,
}) {
  const { useContext } = wp.element
  const [productOptionState, productOptionDispatch] =
    useContext(ProductOptionContext)

  useOnClickOutside(
    dropdownElement,
    () => {
      productOptionDispatch({ type: "TOGGLE_DROPDOWN", payload: false })
    },
    isDropdownOpen
  )

  const modalCSS = css`
    && {
      list-style: none;
      padding: 0;
      margin: 0;
      background-color: #fff;
      width: 100%;
      max-width: 100%;
      border-bottom-left-radius: 5px;
      border-bottom-right-radius: 5px;
      overflow-x: hidden;
      overflow-y: scroll;
      max-height: 400px;
    }
  `
  return (
    <ul className="wps-modal wps-variants" css={modalCSS}>
      {option.values.map((optionObj) => (
        <ProductOptionValue
          key={optionObj.name + optionObj.value}
          optionObj={optionObj}
          selectedOptions={selectedOptions}
          variants={productOptionState.variants}
          allSelectableOptions={allSelectableOptions}
        >
          <ProductVariantDropdownValue />
        </ProductOptionValue>
      ))}
    </ul>
  )
}

export default ProductVariantsDropdownContent
