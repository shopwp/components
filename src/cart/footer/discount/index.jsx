/** @jsx jsx */
import { jsx, css } from "@emotion/react"
import { useShopState } from "@shopwp/components"

function CartFooterDiscount({ discountCode, changeDiscount }) {
  const shopState = useShopState()

  const discountCodeWrapperCSS = css`
    display: flex;
    align-items: baseline;
    width: 100%;
    justify-content: flex-start;
    margin-bottom: 10px;
    border-bottom: 1px solid #ddd;
    padding-bottom: 12px;
  `

  const discountLabelCSS = css`
    && {
      flex: 1;
      font-size: 15px;
      position: relative;
      top: 2px;
      margin-right: 15px;
    }
  `

  const discountCodeCSS = css`
    font-size: 15px;
    font-family: monospace;
    text-transform: uppercase;
    background: #ffd864;
    padding: 3px 30px 3px 10px;
    position: relative;
    transition: background ease 0.2s;
    outline: 2px dashed #d9833a;
    line-height: 1.1;

    &:hover {
      cursor: pointer;
      background: #f1c952;
    }
  `

  const discountCodeIconCSS = css`
    position: absolute;
    right: 11px;
    top: 4px;
    max-width: 9px;
  `

  async function onRemoval() {
    changeDiscount("")
  }

  return (
    <div css={discountCodeWrapperCSS}>
      <p css={discountLabelCSS} className="wps-cart-discount-label">
        {shopState.t.n.discountApplied}
      </p>

      <p
        className="wps-cart-discount-code"
        css={discountCodeCSS}
        onClick={onRemoval}
      >
        {discountCode}

        <svg
          css={discountCodeIconCSS}
          aria-hidden="true"
          focusable="false"
          data-prefix="far"
          data-icon="times"
          className="svg-inline--fa fa-times fa-w-10"
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
