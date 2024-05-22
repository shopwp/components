import { updateAttrs } from "../../api.jsx"
import { intersectAttributes } from "@shopwp/common"
import {
  useCartDispatch,
  useShopState,
  useShopDispatch,
} from "@shopwp/components"

function CartAttribute({ attribute, onRemove }) {
  return (
    <div
      className="swp-l-row swp-cart-attr"
      onClick={() => onRemove(attribute)}
    >
      <p className="swp-cart-attr-line swp-cart-attr-key">{attribute.key}:</p>
      <p className="swp-cart-attr-line swp-cart-attr-value">
        {attribute.value}
      </p>
      {/* <span className="swp-cart-attr-remove">Remove</span> */}
    </div>
  )
}

function CartAttributes({ attributes, cartData }) {
  const shopState = useShopState()
  const shopDispatch = useShopDispatch()
  const cartDispatch = useCartDispatch()

  function onRemove(attribute) {
    return
    // var newAttrs = intersectAttributes(attribute, cartData.attributes)

    // updateAttrs(newAttrs, shopState, cartDispatch, shopDispatch)
  }

  return (
    <div className="swp-cart-attrs">
      {attributes.map((attribute) => (
        <CartAttribute
          key={attribute.key + attribute.value}
          attribute={attribute}
          cartData={cartData}
          onRemove={onRemove}
        />
      ))}
    </div>
  )
}

export default CartAttributes
