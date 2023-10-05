/** @jsx jsx */
import { jsx, css } from "@emotion/react"

function ProductImageSoldOutLabel({ text }) {
  const ProductImageSoldOutLabelCSS = css``

  return (
    <span
      className="swp-sold-out-label wps-product-image-sold-out-label"
      css={ProductImageSoldOutLabelCSS}
    >
      {text}
    </span>
  )
}

export default wp.element.memo(ProductImageSoldOutLabel)
