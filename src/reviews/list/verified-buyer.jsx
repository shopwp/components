/** @jsx jsx */
import { jsx, css } from "@emotion/react"
import { useShopState } from "@shopwp/components"

function ReviewVerifiedBuyer() {
  const shopState = useShopState()

  const ReviewVerifiedBuyerCSS = css`
    margin-top: 10px;
    background: #c0fac0;
    display: inline-block;
    padding: 1px 12px 3px 30px;
    border-radius: 22px;
    border: 1px solid #6cb46c;
    position: relative;

    span {
      display: inline-block;
      color: black;
      font-size: 12px;
      position: relative;
      top: -1px;
    }

    svg {
      position: absolute;
      width: 14px;
      height: 14px;
      left: 11px;
      top: 5px;

      path {
        fill: #287b40;
      }
    }
  `
  return (
    <p css={ReviewVerifiedBuyerCSS}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
        <path d="M438.6 105.4C451.1 117.9 451.1 138.1 438.6 150.6L182.6 406.6C170.1 419.1 149.9 419.1 137.4 406.6L9.372 278.6C-3.124 266.1-3.124 245.9 9.372 233.4C21.87 220.9 42.13 220.9 54.63 233.4L159.1 338.7L393.4 105.4C405.9 92.88 426.1 92.88 438.6 105.4H438.6z" />
      </svg>
      <span>{shopState.t.l.verifiedBuyer}</span>
    </p>
  )
}

export default ReviewVerifiedBuyer
