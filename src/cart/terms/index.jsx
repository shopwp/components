/** @jsx jsx */
import { jsx, css } from "@emotion/react"
import { useCartState, useCartDispatch } from "@shopwp/components"
import { useShopState } from "@shopwp/components"

function CartTerms() {
  const cartDispatch = useCartDispatch()
  const cartState = useCartState()
  const shopState = useShopState()

  const containerCSS = css``
  const labelCSS = css``
  const termsWrapperCSS = css``
  const termsInputCSS = css``

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

  return (
    <section className="swp-cart-terms wps-cart-terms" css={containerCSS}>
      <div
        className="swp-input-row wps-input-row swp-l-row"
        css={termsWrapperCSS}
      >
        <input
          onChange={onChange}
          id="wps-input-terms"
          checked={cartState.termsAccepted}
          type="checkbox"
          className="swp-input wps-input wps-input-checkbox"
          css={termsInputCSS}
        />
        <label
          dangerouslySetInnerHTML={termsLabel()}
          htmlFor="wps-input-terms"
          className="swp-l-flex swp-input-label wps-input-label wps-input-terms"
          css={labelCSS}
        />
      </div>
    </section>
  )
}

export default CartTerms
