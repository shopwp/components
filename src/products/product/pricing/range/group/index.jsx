import ProductPriceSingle from "../../single"
import { ProductPricingSeparator } from "../../separator"

function ProductPricingRangeGroup({
  firstPrice,
  lastPrice,
  compareAt,
  showPriceRange,
  pricingColor,
  pricingFontSize,
}) {
  return (
    <>
      <ProductPriceSingle
        price={firstPrice}
        compareAt={compareAt}
        showPriceRange={showPriceRange}
        pricingColor={pricingColor}
        pricingFontSize={pricingFontSize}
      />
      <ProductPricingSeparator compareAt={compareAt} />
      <ProductPriceSingle
        price={lastPrice}
        compareAt={compareAt}
        showPriceRange={showPriceRange}
        pricingColor={pricingColor}
        pricingFontSize={pricingFontSize}
      />
    </>
  )
}

export default wp.element.memo(ProductPricingRangeGroup)
