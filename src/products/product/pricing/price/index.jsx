import isEmpty from "lodash-es/isEmpty"
import last from "lodash-es/last"
import min from "lodash-es/min"
import max from "lodash-es/max"

import ProductPricingRange from "../range"
import ProductPriceSingle from "../single"
import { firstPriceCompareAt } from "@shopwp/common"
import { useSettingsState } from "../../../../items/_state/settings/hooks"

const { useEffect, useRef, useState } = wp.element

function lastPrice(prices, type) {
  if (isEmpty(prices)) {
    return 0
  }
  return last(prices[type])
}

function firstRegPrice(prices) {
  if (isEmpty(prices)) {
    return 0
  }

  return prices.regPrices[0]
}

function lastRegPrice(prices) {
  return lastPrice(prices, "regPrices")
}

function lastPriceCompareAt(prices) {
  return lastPrice(prices, "compareAtPrices")
}

function ProductPrice({ prices, compareAt, showPriceRange, selectedVariant }) {
  const settings = useSettingsState()
  const singlePriceElement = useRef()
  const [regPrice, setRegPrice] = useState(() => getFirstPrice())
  const [comparePrice, setComparePrice] = useState(() =>
    firstPriceCompareAt(prices)
  )

  function isFirstAndLastSame() {
    if (getFirstPrice() === getLastPrice()) {
      return true
    }

    return false
  }

  function getFirstPrice() {
    if (compareAt) {
      if (showPriceRange) {
        return min(prices.compareAtPrices)
      } else {
        return firstPriceCompareAt(prices)
      }
    } else {
      if (showPriceRange) {
        return min(prices.regPrices)
      } else {
        return firstRegPrice(prices)
      }
    }
  }

  function getLastPrice() {
    if (compareAt) {
      if (showPriceRange) {
        return max(prices.compareAtPrices)
      } else {
        return lastPriceCompareAt(prices)
      }
    } else {
      if (showPriceRange) {
        return max(prices.regPrices)
      } else {
        return lastRegPrice(prices)
      }
    }
  }

  useEffect(() => {
    if (selectedVariant) {
      if (selectedVariant.compareAtPrice) {
        setComparePrice(selectedVariant.compareAtPrice.amount)
      } else {
        setComparePrice(false)
      }

      setRegPrice(selectedVariant.price.amount)
    } else {
      setComparePrice(firstPriceCompareAt(prices))
      setRegPrice(getFirstPrice())
    }
  }, [selectedVariant])

  return (
    <span className="swp-product-price wps-products-price wps-product-pricing wps-products-price-one">
      {showPriceRange && !selectedVariant ? (
        <ProductPricingRange
          firstPrice={getFirstPrice()}
          lastPrice={getLastPrice()}
          isFirstAndLastSame={isFirstAndLastSame()}
          compareAt={compareAt}
          showPriceRange={showPriceRange}
          pricingColor={settings.pricingColor}
          settings={settings}
        />
      ) : (
        <ProductPriceSingle
          ref={singlePriceElement}
          price={compareAt ? comparePrice : regPrice}
          compareAt={compareAt}
          showPriceRange={showPriceRange}
          pricingColor={settings.pricingColor}
          settings={settings}
        />
      )}
    </span>
  )
}

export default ProductPrice
