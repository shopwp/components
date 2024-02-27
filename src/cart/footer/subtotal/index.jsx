/** @jsx jsx */
import { jsx, css } from "@emotion/react"
import { Price } from "@shopwp/components"
import SavingsInline from "../../../savings-inline"
import { useCartState } from "@shopwp/components"
import { useShopState } from "@shopwp/components"

function CartFooterSubtotal() {
  const cartState = useCartState()
  const shopState = useShopState()

  const CartFooterSubtotalCSS = css``
  const footerRowCSS = css``
  const SubtotalLabelCSS = css``

  return (
    <div
      css={footerRowCSS}
      className="wps-subtotal-row swp-subtotal-row swp-l-row swp-l-col-end swp-l-row-between swp-0 swp-mt10"
    >
      <p
        className="wps-total-prefix swp-total-prefix swp-0"
        css={SubtotalLabelCSS}
      >
        {shopState.t.l.subtotal}
      </p>
      <p
        className="wps-total-amount swp-total-amount"
        css={CartFooterSubtotalCSS}
      >
        {cartState.amountOff && cartState.discountCode && (
          <SavingsInline amount={cartState.amountOff} type="fixed" />
        )}
        {shopState.cartData && shopState.cartData?.cost ? (
          <Price
            price={
              cartState.discountCode
                ? shopState.cartData.cost.totalAmount.amount
                : shopState.cartData.cost.subtotalAmount.amount
            }
          />
        ) : null}
      </p>
    </div>
  )
}

export default CartFooterSubtotal
