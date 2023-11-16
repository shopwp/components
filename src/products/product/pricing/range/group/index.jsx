import ProductPriceSingle from "../../single"

function ProductPricingRangeGroup({
  firstPrice,
  compareAt,
  showPriceRange,
  pricingColor,
  settings,
}) {
  return (
    <p className="swp-l-row swp-m-l-row swp-0">
      <span className="swp-price-label">From</span>
      <ProductPriceSingle
        price={firstPrice}
        compareAt={compareAt}
        showPriceRange={showPriceRange}
        pricingColor={pricingColor}
        settings={settings}
      />
    </p>
  )
}

export default wp.element.memo(ProductPricingRangeGroup)
