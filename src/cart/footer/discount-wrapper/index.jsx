import { useShopState, useCartState } from "@shopwp/components"

const Loader = wp.element.lazy(() =>
  import(/* webpackChunkName: 'Loader-public' */ "../../../loader")
)

const CartFooterDiscount = wp.element.lazy(() =>
  import(/* webpackChunkName: 'CartFooterDiscount-public' */ "../discount")
)

function CartFooterDiscountWrapper({
  onAddDiscount,
  changeDiscount,
  onKeyDown,
  discountCode,
  setDiscountCode,
}) {
  const { useRef } = wp.element
  const cartState = useCartState()
  const shopState = useShopState()

  const discountInputRef = useRef(false)

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
    <div className="swp-l-col swp-l-row-end swp-l-row-between swp-0 swp-mt20 swp-cart-footer-discount-row wps-discount-row">
      <div className="swp-l-row swp-m-l-row swp-discount-row">
        <input
          className="swp-discount-input"
          type="text"
          placeholder="Enter discount code"
          id="swp-discount-input"
          ref={discountInputRef}
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
          onClick={onAddDiscount}
          disabled={
            shopState.isCartUpdating ||
            !shopState.cartData ||
            !shopState.cartData.lines.edges.length ||
            !discountCode
          }
        >
          {!cartState.isAddingDiscountCode ? (
            <span>{shopState.t.l.apply}</span>
          ) : null}
          {cartState.isAddingDiscountCode ? <Loader /> : null}
        </button>
      </div>

      <div className="swp-discount-code-wrap swp-mt10">
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
    </div>
  )
}

export default CartFooterDiscountWrapper
