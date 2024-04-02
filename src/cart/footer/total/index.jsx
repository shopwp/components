/** @jsx jsx */
import { jsx, css } from "@emotion/react"
import { updateDiscount } from "../../api.jsx"
import CartFooterSubtotal from "../subtotal"
import {
  useCartState,
  useCartDispatch,
  useShopState,
  useShopDispatch,
} from "@shopwp/components"

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

function CartFooterTotal() {
  const [discountCode, setDiscountCode] = wp.element.useState("")
  const cartState = useCartState()
  const shopState = useShopState()
  const shopDispatch = useShopDispatch()
  const cartDispatch = useCartDispatch()

  const CartFooterTotalCSS = css`
    display: flex;
    flex-direction: column;
    margin-top: 0;

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

  function changeDiscount(discount, shouldRemove = false) {
    if (!cartState.isAddingDiscountCode) {
      updateDiscount(
        cartDispatch,
        shopState,
        discount,
        shopDispatch,
        () => {
          setDiscountCode("")
        },
        shouldRemove
      )
    }
  }

  function onAddDiscount(e) {
    changeDiscount(discountInputRef.current.value.toUpperCase())
  }

  function onKeyDown(event) {
    if (event.key === "Enter") {
      changeDiscount(discountInputRef.current.value.toUpperCase())
    }
  }

  return (
    <div css={CartFooterTotalCSS}>
      {shopwp.general.showEstimatedTax ? (
        <CartFooterEstimatedTax discountApplied={cartState.discountCode} />
      ) : null}

      {shopwp.general.enableDiscountCodes ? (
        <CartFooterDiscountWrapper
          changeDiscount={changeDiscount}
          onAddDiscount={onAddDiscount}
          onKeyDown={onKeyDown}
          discountCode={discountCode}
          setDiscountCode={setDiscountCode}
        />
      ) : null}
      <CartFooterSubtotal changeDiscount={changeDiscount} />
    </div>
  )
}

export default CartFooterTotal
