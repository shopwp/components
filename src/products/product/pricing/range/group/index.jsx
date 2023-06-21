import ProductPriceSingle from "../../single"
import ProductPricingSeparator from "../../separator"

function ProductPricingRangeGroup({
  firstPrice,
  lastPrice,
  compareAt,
  showPriceRange,
  pricingColor,
  settings,
}) {
  return (
    <>
      <ProductPriceSingle
        price={firstPrice}
        compareAt={compareAt}
        showPriceRange={showPriceRange}
        pricingColor={pricingColor}
        settings={settings}
      />
      <ProductPricingSeparator settings={settings} compareAt={compareAt} />
      <ProductPriceSingle
        price={lastPrice}
        compareAt={compareAt}
        showPriceRange={showPriceRange}
        pricingColor={pricingColor}
        settings={settings}
      />
    </>
  )
}

export default wp.element.memo(ProductPricingRangeGroup)
