/** @jsx jsx */
import { jsx, css } from "@emotion/react"
import { flexRowCSS } from "@shopwp/common"
import { useCartState, useCartDispatch } from "@shopwp/components"
import { useShopState } from "@shopwp/components"

function CartTerms() {
  const cartDispatch = useCartDispatch()
  const cartState = useCartState()
  const shopState = useShopState()

  function termsLabel() {
    return {
      __html: shopwp.general.cartTermsContent
        ? shopwp.general.cartTermsContent
        : shopState.t.l.terms,
    }
  }

  function onChange(e) {
    if (shopState.isCartUpdating) {
      return
    }

    cartDispatch({
      type: "SET_TERMS_ACCEPTED",
      payload: !cartState.termsAccepted,
    })
  }

  var containerCSS = css`
    margin: 0.5em 0 1em 0;
    padding: 0;
  `

  var labelCSS = css`
    padding-left: 10px;
    width: 100%;
    text-transform: initial;
    display: inline-block;
    vertical-align: middle;
    cursor: pointer;
    margin: 0;
    font-weight: normal;
    font-size: 15px;
    color: #121212;
    cursor: ${shopState.isCartUpdating ? "not-allowed" : "pointer"};

    &:empty {
      display: none;
    }
  `

  const termsWrapperCSS = css`
    align-items: center;

    .wps-input {
      margin: 0;

      &:hover {
        cursor: pointer;
      }
    }
  `

  const termsInputCSS = css`
    color: transparent;
    user-select: none;
    filter: hue-rotate(59deg);
    width: 14px;
    height: 14px;
    margin: 5px;
    appearance: none;
    outline: 1px solid gray;
    box-shadow: none;
    font-size: 0.8em;
    text-align: center;
    line-height: 1em;
    background: white;
    cursor: ${shopState.isCartUpdating ? "not-allowed" : "pointer"};
    position: relative;
    top: 1px;
    border-radius: 2px;

    &:checked:after {
      content: "✔";
      color: black;
      font-size: 15px;
      position: absolute;
      left: 2px;
      top: -3px;
    }

    &:disabled {
      &:hover {
        cursor: not-allowed;
      }
    }
  `

  return (
    <section className="wps-cart-terms" css={containerCSS}>
      <div className="wps-input-row" css={[flexRowCSS, termsWrapperCSS]}>
        <input
          onChange={onChange}
          id="wps-input-terms"
          checked={cartState.termsAccepted}
          type="checkbox"
          className="wps-input wps-input-checkbox"
          css={termsInputCSS}
        />
        <label
          dangerouslySetInnerHTML={termsLabel()}
          htmlFor="wps-input-terms"
          className="wps-input-label wps-input-terms"
          css={labelCSS}
        />
      </div>
    </section>
  )
}

export default CartTerms
