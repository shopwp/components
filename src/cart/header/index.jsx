/** @jsx jsx */
import { jsx, css } from "@emotion/react"
import CartTitle from "../title"
import CartClose from "../close"
import { useShopState } from "@shopwp/components"
import { containerFluidCSS } from "@shopwp/common"

function CartHeader({ settings }) {
  const shopState = useShopState()

  const CartHeaderCSS = css`
    transition: all 0.2s ease;
    opacity: ${shopState.isCartUpdating ? "0.3" : "1"};
    filter: ${shopState.isCartUpdating ? "blur(2px)" : "none"};
  `

  const CartHeaderRow = css`
    display: flex;
    position: relative;
  `

  return (
    <section
      className="wps-cart-header"
      css={[containerFluidCSS, CartHeaderCSS]}
    >
      <div css={CartHeaderRow}>
        {settings.showCartTitle ? <CartTitle /> : null}
        {settings.showCartCloseIcon ? <CartClose /> : null}
      </div>
    </section>
  )
}

export default CartHeader
