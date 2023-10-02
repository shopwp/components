/** @jsx jsx */
import { jsx, css } from "@emotion/react"
import { updateDiscount } from "../../api.jsx"
import { useCartDispatch, useCartState } from "@shopwp/components"
import { useShopState, useShopDispatch } from "@shopwp/components"
import CartFooterDiscount from "../discount"

const Loader = wp.element.lazy(() =>
  import(/* webpackChunkName: 'Loader-public' */ "../../../loader")
)

function CartFooterDiscountWrapper() {
  const { useRef, useState } = wp.element

  const cartState = useCartState()
  const shopState = useShopState()
  const shopDispatch = useShopDispatch()
  const cartDispatch = useCartDispatch()

  const discountInputRef = useRef(false)

  const [discountCode, setDiscountCode] = useState("")

  const discountCSS = css``
  const discountFormCSS = css``
  const discountFormInputCSS = css``
  const discountFormButtonCSS = css``

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

  function onChange(e) {
    setDiscountCode(e.target.value)
  }

  return (
    <div
      css={discountCSS}
      className="swp-l-col swp-l-row-end swp-l-row-between swp-0 wps-discount-row"
    >
      <div className="swp-discount-row" css={discountFormCSS}>
        <input
          className="swp-discount-input"
          type="text"
          placeholder="Enter discount code"
          ref={discountInputRef}
          css={discountFormInputCSS}
          disabled={
            shopState.isCartUpdating ||
            !shopState.cartData ||
            !shopState.cartData.lines.edges.length
          }
          onKeyDown={onKeyDown}
          onChange={onChange}
          value={discountCode}
        />
        <button
          className="swp-cart-discount-button"
          css={discountFormButtonCSS}
          onClick={onAddDiscount}
          disabled={
            shopState.isCartUpdating ||
            !shopState.cartData ||
            !shopState.cartData.lines.edges.length ||
            !discountCode
          }
        >
          {!cartState.isAddingDiscountCode && (
            <span>{shopState.t.l.apply}</span>
          )}
          {cartState.isAddingDiscountCode && <Loader />}
        </button>
      </div>

      {shopState.cartData.discountCodes.length
        ? shopState.cartData.discountCodes.map((discount) =>
            discount.applicable ? (
              <CartFooterDiscount
                discount={discount}
                changeDiscount={changeDiscount}
                key={discount.code}
              />
            ) : null
          )
        : null}
    </div>
  )
}

export default CartFooterDiscountWrapper
