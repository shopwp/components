/** @jsx jsx */
import { jsx, css } from "@emotion/react"
import { updateDiscount } from "../../api.jsx"
import { useCartDispatch, useCartState } from "@shopwp/components"
import { useShopState, useShopDispatch } from "@shopwp/components"
import CartFooterDiscount from "../discount"
import useIsMounted from "ismounted"

const Loader = wp.element.lazy(() =>
  import(/* webpackChunkName: 'Loader-public' */ "../../../loader")
)

function CartFooterDiscountWrapper() {
  const { useRef, useState, useEffect } = wp.element

  const isMounted = useIsMounted()
  const cartState = useCartState()
  const shopState = useShopState()
  const shopDispatch = useShopDispatch()
  const cartDispatch = useCartDispatch()

  const discountInputRef = useRef(false)

  const [discountCode, setDiscountCode] = useState("")

  const discountCSS = css`
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    margin: 0;
    flex-direction: column;
  `

  const discountFormCSS = css`
    display: flex;
    width: 100%;
    margin-bottom: 20px;
  `

  const discountFormInputCSS = css`
    && {
      appearance: none;
      background: transparent;
      flex: 1;
      font-size: 15px;
      padding: 10px;
      margin-right: 10px;
      border-radius: ${shopwp.general.globalBorderRadius};
      border: 1px solid #7e7e7e;
      outline: none;
      color: #121212;
      box-shadow: none;
      text-transform: uppercase;

      ::placeholder,
      ::-webkit-input-placeholder {
        text-transform: capitalize;
        color: #969696;
      }

      &:disabled {
        &:hover {
          cursor: not-allowed;
        }
      }
    }
  `

  const discountFormButtonCSS = css`
    width: 100px;
    font-size: 16px;
    border-radius: ${shopwp.general.globalBorderRadius};
    border: 1px solid #7e7e7e;
    appearance: none;
    color: black;
    background: white;
    padding: 0;

    &:hover {
      cursor: ${shopState.isCartUpdating ? "not-allowed" : "pointer"};
      color: rgba(0, 0, 0, 0.5);
      background: white;
    }

    &:focus {
      outline: none;
    }

    &:disabled {
      color: #c4c4c4;

      &:hover {
        cursor: not-allowed;
      }
    }

    .ball-pulse > div {
      background: black !important;
      width: 8px !important;
      height: 8px !important;
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

  function onChange(e) {
    setDiscountCode(e.target.value)
  }

  return (
    <div css={discountCSS} className="wps-discount-row">
      <div css={discountFormCSS}>
        <input
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
