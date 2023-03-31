/** @jsx jsx */
import { jsx, css } from "@emotion/react"

import CartFooterSubtotal from "../subtotal"

const CartFooterEstimatedTax = wp.element.lazy(() =>
  import(
    /* webpackChunkName: 'CartFooterEstimatedTax-public' */ "../estimated-tax"
  )
)

const CartFooterDiscountWrapper = wp.element.lazy(() =>
  import(
    /* webpackChunkName: 'CartFooterDiscountWrapper-public' */ "../discount-wrapper"
  )
)

function CartFooterTotal({ cartState }) {
  const CartFooterTotalCSS = css`
    display: flex;
    flex-direction: column;
    margin-top: 15px;

    .wps-tax-row {
      order: ${cartState.discountCode ? "1" : "2"};
    }

    .wps-discount-row {
      order: ${cartState.discountCode ? "2" : "1"};
    }

    .wps-subtotal-row {
      order: 3;
    }
  `

  return (
    <div css={CartFooterTotalCSS}>
      {shopwp.general.showEstimatedTax ? (
        <CartFooterEstimatedTax discountApplied={cartState.discountCode} />
      ) : null}

      {shopwp.general.enableDiscountCodes ? (
        <CartFooterDiscountWrapper />
      ) : null}
      <CartFooterSubtotal />
    </div>
  )
}

export default CartFooterTotal
