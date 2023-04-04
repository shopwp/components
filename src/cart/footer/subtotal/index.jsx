/** @jsx jsx */
import { jsx, css } from "@emotion/react"
import { Price } from "@shopwp/components"
import { mq } from "@shopwp/common"
import SavingsInline from "../../../savings-inline"
import { useCartState } from "@shopwp/components"
import { useShopState } from "@shopwp/components"

function CartFooterSubtotal() {
  const cartState = useCartState()
  const shopState = useShopState()

  const CartFooterSubtotalCSS = css`
    font-weight: bold;
    text-align: right;
    font-size: 24px;
    color: #121212;

    ${mq("small")} {
      font-size: 28px;
    }
  `
  const footerRowCSS = css`
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    margin: 0;
  `

  const SubtotalLabelCSS = css`
    font-size: 20px;
    top: -4px;
  `

  return (
    <div css={footerRowCSS} className="wps-subtotal-row">
      <p className="wps-total-prefix" css={SubtotalLabelCSS}>
        {shopState.t.l.subtotal}
      </p>
      <p className="wps-total-amount" css={CartFooterSubtotalCSS}>
        {cartState.percentageOff && cartState.discountCode && (
          <SavingsInline amount={cartState.percentageOff} type="percentage" />
        )}
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
