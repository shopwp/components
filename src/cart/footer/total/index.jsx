import { updateDiscount } from "../../api.jsx"
import CartFooterSubtotal from "../subtotal"
import {
  useCartState,
  useCartDispatch,
  useShopState,
  useShopDispatch,
} from "@shopwp/components"

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
    <div className="swp-cart-footer-totals">
      {shopwp.general.enableDiscountCodes ? (
        <CartFooterDiscountWrapper
          changeDiscount={changeDiscount}
          onAddDiscount={onAddDiscount}
          onKeyDown={onKeyDown}
          discountCode={discountCode}
          setDiscountCode={setDiscountCode}
        />
      ) : null}
      <CartFooterSubtotal />
    </div>
  )
}

export default CartFooterTotal
