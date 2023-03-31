/** @jsx jsx */
import { jsx, css } from "@emotion/react"
import compact from "lodash/compact"

function findLargestSalePercentage(variants) {
  const stuff = variants.map((variant) => {
    if (!variant.node.compareAtPrice) {
      return false
    }

    var compareAt = parseFloat(variant.node.compareAtPrice.amount)
    var normal = parseFloat(variant.node.price.amount)

    if (compareAt <= normal) {
      return false
    }

    var diffInDollars = compareAt - normal

    var percent = (diffInDollars / compareAt) * 100

    return Math.ceil(percent)
  })

  return compact(stuff).sort().reverse()[0]
}

function SalePercentOffText({ hasOnlyOneVariant, salePercentage }) {
  return hasOnlyOneVariant
    ? " - " + salePercentage + "% off"
    : " - Up to " + salePercentage + "% off"
}

function ProductImageOnSaleLabel({
  text,
  onlyAvailableVariants,
  showSaleNoticePercentage,
}) {
  const salePercentage = findLargestSalePercentage(onlyAvailableVariants)

  if (onlyAvailableVariants.length === 1) {
    var hasOnlyOneVariant = true
  } else {
    var hasOnlyOneVariant = false
  }

  const ProductImageOnSaleLabelCSS = css`
    position: absolute;
    background: #b62907;
    color: white;
    text-transform: uppercase;
    font-size: 13px;
    padding: 4px 10px;
  `

  return (
    <span
      className="wps-product-image-on-sale-label"
      css={ProductImageOnSaleLabelCSS}
    >
      {text}
      {salePercentage && showSaleNoticePercentage ? (
        <SalePercentOffText
          hasOnlyOneVariant={hasOnlyOneVariant}
          salePercentage={salePercentage}
        />
      ) : null}
    </span>
  )
}

export default wp.element.memo(ProductImageOnSaleLabel)
