import { FilterHook } from "@shopwp/common"
import { useShopState, useCartState } from "@shopwp/components"

function CartTitle() {
  const cartState = useCartState()
  const shopState = useShopState()

  return (
    <div className="swp-cart-title-wrapper wps-cart-title-wrap">
      <FilterHook name="before.cartTitle" args={[cartState]} />

      <h2 className="swp-cart-title wps-cart-title">
        {shopState.t.l.cartTitle}
      </h2>

      <FilterHook name="after.cartTitle" args={[cartState]} />
    </div>
  )
}

export default CartTitle
