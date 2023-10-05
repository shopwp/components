/** @jsx jsx */
import { jsx, css } from "@emotion/react"

import {
  filterOnlyAvailableVariants,
  findLargestSalePercentage,
} from "@shopwp/common"

function ProductImageOnSaleLabel({ text, showSaleNoticePercentage, payload }) {
  const onlyAvailableVariants = filterOnlyAvailableVariants(
    payload.variants.edges
  )
  const salePercentage = findLargestSalePercentage(onlyAvailableVariants)

  const ProductImageOnSaleLabelCSS = css``

  return (
    <span
      className="swp-on-sale-label wps-product-image-on-sale-label"
      css={ProductImageOnSaleLabelCSS}
    >
      {text}
      {salePercentage && showSaleNoticePercentage
        ? " - Up to " + salePercentage + "% off"
        : null}
    </span>
  )
}

export default wp.element.memo(ProductImageOnSaleLabel)
