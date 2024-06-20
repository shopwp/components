import {
  filterOnlyAvailableVariants,
  findLargestSalePercentage,
} from "@shopwp/common"

function ProductImageOnSaleLabel({ text, showSaleNoticePercentage, payload }) {
  const onlyAvailableVariants = filterOnlyAvailableVariants(
    payload.variants.edges
  )
  const salePercentage = findLargestSalePercentage(onlyAvailableVariants)

  return (
    <span className="swp-on-sale-label wps-product-image-on-sale-label">
      {text}
      {salePercentage && showSaleNoticePercentage
        ? " - Up to " + salePercentage + "% off"
        : null}
    </span>
  )
}

export default wp.element.memo(ProductImageOnSaleLabel)
