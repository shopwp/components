/** @jsx jsx */
import { jsx, css } from "@emotion/react"
import CartLineItems from "../lineitems"
import { useShopState, useShopDispatch } from "@shopwp/components"
import { IconLogo } from "@shopwp/components"
import { useCartToggle } from "@shopwp/hooks"

function CartContents() {
  const shopState = useShopState()
  const shopDispatch = useShopDispatch()

  useCartToggle(shopDispatch)

  const CartTitleCSS = css``
  const CartContentsCSS = css``

  return (
    <section
      className="swp-cart-contents wps-cart-contents"
      data-is-cart-empty={
        shopState.cartData && shopState.cartData.lines.edges.length
      }
      css={CartContentsCSS}
    >
      {!shopState.cartData ||
      (!shopState.cartData.lines.edges.length && !shopState.isCartUpdating) ? (
        <h2 className="swp-cart-title-text" css={CartTitleCSS}>
          <IconLogo color="#dedede" />

          {shopState.t.l.yourCartEmpty}
        </h2>
      ) : (
        <CartLineItems />
      )}
    </section>
  )
}

export default CartContents
