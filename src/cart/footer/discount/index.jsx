/** @jsx jsx */
import { jsx, css } from "@emotion/react"
import { useShopState } from "@shopwp/components"

function CartFooterDiscount({ discount, changeDiscount }) {
  const shopState = useShopState()

  const discountCodeWrapperCSS = css``
  const discountLabelCSS = css``
  const discountCodeCSS = css``
  const discountCodeIconCSS = css``

  async function onRemoval() {
    changeDiscount(discount.code, true) // True means remove discount
  }

  return (
    <div className="swp-cart-discount-wrapper" css={discountCodeWrapperCSS}>
      <p
        css={discountLabelCSS}
        className="swp-cart-discount-label wps-cart-discount-label"
      >
        {shopState.t.n.discountApplied}
      </p>

      <p
        className="swp-cart-discount-code wps-cart-discount-code"
        css={discountCodeCSS}
        onClick={onRemoval}
      >
        {discount.code}

        <svg
          css={discountCodeIconCSS}
          aria-hidden="true"
          focusable="false"
          data-prefix="far"
          data-icon="times"
          className="swp-cart-discount-icon svg-inline--fa fa-times fa-w-10"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 320 512"
        >
          <path
            fill="currentColor"
            d="M207.6 256l107.72-107.72c6.23-6.23 6.23-16.34 0-22.58l-25.03-25.03c-6.23-6.23-16.34-6.23-22.58 0L160 208.4 52.28 100.68c-6.23-6.23-16.34-6.23-22.58 0L4.68 125.7c-6.23 6.23-6.23 16.34 0 22.58L112.4 256 4.68 363.72c-6.23 6.23-6.23 16.34 0 22.58l25.03 25.03c6.23 6.23 16.34 6.23 22.58 0L160 303.6l107.72 107.72c6.23 6.23 16.34 6.23 22.58 0l25.03-25.03c6.23-6.23 6.23-16.34 0-22.58L207.6 256z"
          ></path>
        </svg>
      </p>
    </div>
  )
}

export default CartFooterDiscount
