/** @jsx jsx */
import { jsx, css } from "@emotion/react"

function ProductImageSoldOutLabel({ text }) {
  const ProductImageSoldOutLabelCSS = css`
    position: absolute;
    background: #da641c;
    color: white;
    text-transform: uppercase;
    font-size: 12px;
    padding: 4px 10px;
  `

  return (
    <span
      className="wps-product-image-sold-out-label"
      css={ProductImageSoldOutLabelCSS}
    >
      {text}
    </span>
  )
}

export default wp.element.memo(ProductImageSoldOutLabel)
