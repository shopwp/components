import { useShopState, useShopDispatch } from "@shopwp/components"
import { usePortal } from "@shopwp/hooks"
import { mergeDefaults } from "@shopwp/common"
import CartIconWrapper from "../icon"
import CartCounter from "../counter"

function CartIcon({ settings, element }) {
  const { useEffect } = wp.element
  const shopDispatch = useShopDispatch()
  const shopState = useShopState()

  settings = mergeDefaults(settings, shopwp.cart)

  function onMouseUp(e) {
    shopDispatch({ type: "TOGGLE_CART", payload: true })
  }

  useEffect(() => {
    const HTMLEl = document.querySelector("html")

    HTMLEl.style.setProperty(
      "--cart-counterTextColor",
      settings.counterTextColor
    )

    HTMLEl.style.setProperty(
      "--cart-iconInlineCounterBackgroundColor",
      settings.counterBackgroundColor
        ? settings.counterBackgroundColor
        : shopwp.general.cartCounterBackgroundColor
    )

    HTMLEl.style.setProperty("--cart-iconInlineColor", settings.inlineIconColor)
  }, [])

  return usePortal(
    <button
      role="button"
      aria-label="Cart icon"
      aria-expanded={shopState.isCartOpen}
      className={`swp-cart-icon swp-cart-icon-inline wps-btn-cart${
        shopState.cartData &&
        shopState.cartData.lines &&
        shopState.cartData.lines.edges.length
          ? " wps-cart-is-not-empty"
          : " wps-cart-is-empty"
      }`}
      onMouseUp={onMouseUp}
    >
      {shopState.cartData &&
      (settings.showCounter || settings.showCounter === "undefined") ? (
        <CartCounter
          totalLineItems={
            shopState.cartData.totalQuantity
              ? shopState.cartData.totalQuantity
              : 0
          }
        />
      ) : null}

      <CartIconWrapper settings={settings} />
    </button>,
    element
  )
}

export default CartIcon
