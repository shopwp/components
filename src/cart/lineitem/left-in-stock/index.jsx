import { useShopState } from "@shopwp/components"

function CartLineItemLeftInStock() {
  const shopState = useShopState()

  return (
    <small className="swp-cart-lineitem-left-in-stock wps-cart-lineitem-left-in-stock">
      ({shopState.t.n.leftInStock})
    </small>
  )
}

export default CartLineItemLeftInStock
