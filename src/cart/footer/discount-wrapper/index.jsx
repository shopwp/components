/** @jsx jsx */
import { jsx, css } from "@emotion/react"
import { addDiscount } from "../../api.jsx"
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

  const [discountCode, setDiscountCode] = useState(cartState.discountCode)

  useEffect(() => {
    if (isMounted.current) {
      setDiscountCode(cartState.discountCode ? cartState.discountCode : "")
    }
  }, [cartState.discountCode])

  const discountCSS = css`
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    margin: 0;
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
      border-radius: 5px;
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
    border-radius: 5px;
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

  function changeDiscount(discount) {
    if (!cartState.isAddingDiscountCode) {
      addDiscount(cartDispatch, shopState, discount, shopDispatch)
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
      {!cartState.discountCode ? (
        <div css={discountFormCSS}>
          <input
            type="text"
            placeholder={shopState.t.l.discountCode}
            ref={discountInputRef}
            css={discountFormInputCSS}
            disabled={shopState.isCartUpdating || cartState.isCartEmpty}
            onKeyDown={onKeyDown}
            onChange={onChange}
            value={discountCode}
          />
          <button
            css={discountFormButtonCSS}
            onClick={onAddDiscount}
            disabled={
              shopState.isCartUpdating || cartState.isCartEmpty || !discountCode
            }
          >
            {!cartState.isAddingDiscountCode && (
              <span>{shopState.t.l.apply}</span>
            )}
            {cartState.isAddingDiscountCode && <Loader />}
          </button>
        </div>
      ) : shopState.cartData.discountCodes.length ? (
        <CartFooterDiscount
          discountCode={shopState.cartData.discountCodes[0].code}
          changeDiscount={changeDiscount}
        />
      ) : null}
    </div>
  )
}

export default CartFooterDiscountWrapper
