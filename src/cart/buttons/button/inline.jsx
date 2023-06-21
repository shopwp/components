/** @jsx jsx */
import { jsx, css } from "@emotion/react"
import { useShopState, useShopDispatch } from "@shopwp/components"
import { usePortal } from "@shopwp/hooks"
import { mergeDefaults } from "@shopwp/common"
import CartIconWrapper from "../icon"
import CartCounter from "../counter"

function CartIcon({ settings, element }) {
  const shopDispatch = useShopDispatch()
  const shopState = useShopState()

  settings = mergeDefaults(settings, shopwp.cart)

  function onClick(e) {
    shopDispatch({ type: "TOGGLE_CART", payload: true })
  }

  const cartIconCSS = css`
    background-color: transparent;
    cursor: pointer;
    pointer-events: auto;
    padding: 5px;

    &:hover,
    &:focus {
      border: none;
      outline: none;
      background-color: transparent;
    }
  `

  const cartIconInlineCSS = css`
    border: none;
    outline: none;
    position: relative;
    top: -5px;
    right: 0px;

    &:hover {
      cursor: pointer;
    }

    .ball-pulse > div {
      width: 9px;
      height: 9px;
    }

    .wps-loader {
      position: relative;
      top: 2px;
      left: 0.01em;
    }
  `

  return usePortal(
    <button
      role="button"
      className={`wps-btn-cart${
        shopState.cartData &&
        shopState.cartData.lines &&
        shopState.cartData.lines.edges.length
          ? " wps-cart-is-not-empty"
          : " wps-cart-is-empty"
      }`}
      onClick={onClick}
      css={[cartIconCSS, cartIconInlineCSS]}
    >
      {settings.showCounter || settings.showCounter === "undefined" ? (
        <CartCounter
          settings={settings}
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
