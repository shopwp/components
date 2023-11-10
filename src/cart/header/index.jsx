/** @jsx jsx */
import { jsx, css } from "@emotion/react"
import CartTitle from "../title"
import CartClose from "../close"
import { containerFluidCSS } from "@shopwp/common"

function CartHeader({ settings }) {
  const CartHeaderCSS = css``
  const CartHeaderRow = css``

  return (
    <section
      className="swp-l-rel100 swp-cart-header wps-cart-header"
      css={[containerFluidCSS, CartHeaderCSS]}
    >
      <div className="swp-l-row swp-cart-header-inner" css={CartHeaderRow}>
        {settings.showCartTitle ? <CartTitle /> : null}
        {settings.showCartCloseIcon ? <CartClose /> : null}
      </div>
    </section>
  )
}

export default CartHeader
