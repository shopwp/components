/** @jsx jsx */
import { jsx, css } from "@emotion/react"

function CartFooterDiscount({ discount, changeDiscount }) {
  async function onRemoval() {
    changeDiscount(discount.code, true) // True means remove discount
  }

  return (
    <div className="swp-cart-discount-wrapper">
      <p
        className="swp-l-row swp-m-l-row swp-l-col-center swp-cart-discount-code wps-cart-discount-code"
        onClick={onRemoval}
      >
        <svg
          aria-hidden="true"
          focusable="false"
          className="swp-icon-discount"
          viewBox="0 0 12 12"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M7 0h3a2 2 0 012 2v3a1 1 0 01-.3.7l-6 6a1 1 0 01-1.4 0l-4-4a1 1 0 010-1.4l6-6A1 1 0 017 0zm2 2a1 1 0 102 0 1 1 0 00-2 0z"
            fill="currentColor"
          ></path>
        </svg>

        {discount.code}

        <svg
          aria-hidden="true"
          focusable="false"
          data-prefix="far"
          data-icon="times"
          className="swp-cart-discount-icon-remove svg-inline--fa fa-times fa-w-10"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 320 512"
        >
          <path
            fill="#505050"
            d="M207.6 256l107.72-107.72c6.23-6.23 6.23-16.34 0-22.58l-25.03-25.03c-6.23-6.23-16.34-6.23-22.58 0L160 208.4 52.28 100.68c-6.23-6.23-16.34-6.23-22.58 0L4.68 125.7c-6.23 6.23-6.23 16.34 0 22.58L112.4 256 4.68 363.72c-6.23 6.23-6.23 16.34 0 22.58l25.03 25.03c6.23 6.23 16.34 6.23 22.58 0L160 303.6l107.72 107.72c6.23 6.23 16.34 6.23 22.58 0l25.03-25.03c6.23-6.23 6.23-16.34 0-22.58L207.6 256z"
          ></path>
        </svg>
      </p>
    </div>
  )
}

export default CartFooterDiscount
