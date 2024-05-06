import { useCartState } from "@shopwp/components"
import { useShopState, useShopDispatch } from "@shopwp/components"
import CartIconWrapper from "../icon"
import CartCounter from "../counter"

function CartIconFixed() {
  const cartState = useCartState()
  const shopState = useShopState()
  const shopDispatch = useShopDispatch()

  function onMouseUp(e) {
    shopDispatch({ type: "TOGGLE_CART", payload: true })
  }

  function shouldShowCartButton() {
    if (!shopwp.general.showFixedCartTab || !shopState.cartData) {
      return false
    }

    if (shopwp.general.cartConditionalFixedTabLoading === "all") {
      return true
    } else if (
      shopwp.general.cartConditionalFixedTabLoading === "withProducts"
    ) {
      if (shopState.productsVisible) {
        return true
      }

      return false
    } else if (shopwp.general.cartConditionalFixedTabLoading === "manual") {
      if (
        shopwp.general.cartConditionalManuallySelectedPages &&
        shopwp.general.cartConditionalManuallySelectedPages.includes(
          shopwp.misc.postTitle
        )
      ) {
        return true
      }
      return false
    }
  }

  return shouldShowCartButton() ? (
    <button
      role="button"
      aria-label="Cart icon"
      aria-expanded={shopState.isCartOpen}
      className={`swp-cart-icon swp-cart-icon-fixed wps-btn-cart wps-cart-icon-fixed${
        shopState.cartData &&
        shopState.cartData.lines &&
        shopState.cartData.lines.edges.length
          ? " wps-cart-is-not-empty"
          : " wps-cart-is-empty"
      }`}
      onMouseUp={onMouseUp}
    >
      {cartState.settings.showCounter ? (
        <CartCounter
          settings={cartState.settings}
          totalLineItems={
            shopState.cartData ? shopState.cartData.totalQuantity : 0
          }
          fixed={true}
        />
      ) : null}

      <CartIconWrapper settings={cartState.settings} />
    </button>
  ) : null
}

export default CartIconFixed
