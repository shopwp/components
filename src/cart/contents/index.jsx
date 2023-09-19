/** @jsx jsx */
import { jsx, css } from "@emotion/react"
import CartLineItems from "../lineitems"
import { useShopState, useShopDispatch } from "@shopwp/components"
import { IconLogo } from "@shopwp/components"
import { useCartToggle } from "@shopwp/hooks"

function CartContents() {
  const shopState = useShopState()
  const shopDispatch = useShopDispatch()

  useCartToggle(shopDispatch)

  const CartTitleCSS = css`
    top: 48%;
    text-align: center;
    color: #ddd;
    position: absolute;
    margin: 0;
    width: 100%;
    font-size: 20px;
    font-weight: normal;
    margin: 0;
    text-align: center;
    position: relative;
    top: -5px;
  `

  const CartContentsCSS = css`
    overflow: auto;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: ${shopState.cartData &&
    shopState.cartData.lines.edges.length
      ? "flex-start"
      : "center"};
    flex: 1;
    transition: all 0.2s ease;
    opacity: ${shopState.isCartUpdating ? "0.3" : "1"};
    filter: ${shopState.isCartUpdating ? "blur(2px)" : "none"};
    padding-top: 20px;

    > .wps-notice {
      position: relative;
      top: 30%;
    }

    > div:last-child {
      border-bottom: none;
      padding-bottom: 0;
    }

    &[data-is-cart-empty="true"] .wps-notice-info {
      background: none;
      border: none;
      font-size: 24px;
    }

    svg {
      width: auto;
      height: 69px;
      position: absolute;
      top: -64px;
      left: 149px;
    }
  `

  return (
    <section
      className="wps-cart-contents"
      data-is-cart-empty={
        shopState.cartData && shopState.cartData.lines.edges.length
      }
      css={CartContentsCSS}
    >
      {!shopState.cartData ||
      (!shopState.cartData.lines.edges.length && !shopState.isCartUpdating) ? (
        <h2 css={CartTitleCSS}>
          <IconLogo color="#dedede" />

          {shopState.t.l.yourCartEmpty}
        </h2>
      ) : (
        <CartLineItems />
      )}
    </section>
  )
}

export default CartContents
