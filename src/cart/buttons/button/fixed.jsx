/** @jsx jsx */
import { jsx, css, keyframes } from "@emotion/react"
import { useCartState } from "CartState"
import { useShopState, useShopDispatch } from "ShopState"
import CartIconWrapper from "../icon"
import CartCounter from "../counter"

function CartIconFixed() {
  const cartState = useCartState()
  const shopState = useShopState()
  const shopDispatch = useShopDispatch()

  function onClick(e) {
    shopDispatch({ type: "TOGGLE_CART", payload: true })
  }

  function shouldShowCartButton() {
    if (!shopwp.general.showFixedCartTab) {
      return false
    }

    if (shopwp.general.cartConditionalFixedTabLoading === "all") {
      return true
    } else if (
      shopwp.general.cartConditionalFixedTabLoading === "withProducts"
    ) {
      if (cartState.productsVisible) {
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

  const cartIconCSS = css`
    background-color: ${shopwp.general.cartIconBackgroundColor};
    cursor: pointer;
    pointer-events: auto;
    padding: 5px;

    &:hover,
    &:focus {
      border: none;
      outline: none;
      background-color: ${shopwp.general.cartIconBackgroundColor};
    }
  `

  const slideInFromRight = keyframes`
      0% {
         transform: translateX(100%);
      }
      100% {
         transform: translateX(calc(100% - 70px));
      }
   `

  const cartIconFixedCSS = css`
    position: fixed;
    top: calc(50% - 80px);
    right: 0;
    z-index: 99999;
    border-radius: 6px 0 0 6px;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 15px 0 17px 0;
    justify-content: center;
    width: 70px;
    height: 85px;
    border: none;
    outline: none;
    overflow-y: visible;
    animation: 0.25s ease-out 0s 1 ${slideInFromRight};

    &:focus,
    &:active {
      position: fixed;
      top: calc(50% - 80px);
    }

    &:hover {
      cursor: pointer;
      position: fixed;
      top: calc(50% - 80px);

      span,
      svg {
        opacity: 0.8;
      }
    }
  `

  return shouldShowCartButton() ? (
    <button
      role="button"
      className={`wps-btn-cart wps-cart-icon-fixed${
        shopState.cartData &&
        shopState.cartData.lines &&
        shopState.cartData.lines.edges.length
          ? " wps-cart-is-not-empty"
          : " wps-cart-is-empty"
      }`}
      onClick={onClick}
      css={[cartIconCSS, cartIconFixedCSS]}
    >
      {cartState.settings.showCounter ? (
        <CartCounter
          settings={cartState.settings}
          totalLineItems={
            shopState.cartData.totalQuantity
              ? shopState.cartData.totalQuantity
              : 0
          }
          fixed={true}
        />
      ) : null}

      <CartIconWrapper settings={cartState.settings} fixed={true} />
    </button>
  ) : null
}

export default CartIconFixed
