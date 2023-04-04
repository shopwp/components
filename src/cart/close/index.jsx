/** @jsx jsx */
import { jsx, css } from "@emotion/react"
import { mq } from "@shopwp/common"
import { useShopDispatch, useShopState } from "@shopwp/components"

function CartClose() {
  const shopDispatch = useShopDispatch()
  const shopState = useShopState()

  function onClose(e) {
    shopDispatch({ type: "TOGGLE_CART", payload: false })
  }

  const CartCloseButtonCSS = css`
    margin: -5px -26px 0 0;
    line-height: 1;
    color: #313131;
    border: none;
    background: transparent;
    transition: transform 100ms ease;
    cursor: pointer;
    padding: 0px 30px 0px 30px;
    font-weight: normal;
    font-size: 36px;
    text-align: center;
    white-space: normal;
    outline: none;
    outline-offset: 0;

    ${mq("small")} {
      margin: -10px -26px 0 0;
    }

    &:hover {
      opacity: 0.5;
      background: transparent;
      color: #313131;
      border: none;
      outline: none;
      box-shadow: none;
      cursor: pointer;
    }

    &:focus {
      border: none;
      outline: none;
    }

    span {
      width: 30px;
      height: 30px;
      line-height: 1;
      font-size: 30px;

      ${mq("small")} {
        font-size: 47px;
      }
    }
  `

  return (
    <button
      css={CartCloseButtonCSS}
      className="wps-btn-close wps-modal-close-trigger"
      title={shopState.t.l.closeCart}
      onClick={onClose}
    >
      <span className="wps-modal-close-trigger">×</span>
    </button>
  )
}

export default CartClose
