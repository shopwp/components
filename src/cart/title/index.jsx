/** @jsx jsx */
import { jsx, css } from "@emotion/react"
import { FilterHook } from "@shopwp/common"
import { useCartState } from "@shopwp/components"
import { useShopState } from "@shopwp/components"

function CartTitle() {
  const cartState = useCartState()
  const shopState = useShopState()

  const CartTitleWrap = css``
  const cartTitleCSS = css``

  return (
    <div
      className="swp-cart-title-wrapper wps-cart-title-wrap"
      css={CartTitleWrap}
    >
      <FilterHook name="before.cartTitle" args={[cartState]} />

      <h2 className="swp-cart-title wps-cart-title" css={cartTitleCSS}>
        {shopState.t.l.cartTitle}
      </h2>

      <FilterHook name="after.cartTitle" args={[cartState]} />
    </div>
  )
}

export default CartTitle
