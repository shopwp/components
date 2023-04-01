/** @jsx jsx */
import { jsx, css, keyframes } from "@emotion/react"

import isEmpty from "lodash/isEmpty"
import last from "lodash/last"
import min from "lodash/min"
import max from "lodash/max"

import ProductPricingRange from "../range"
import ProductPriceSingle from "../single"
import { SlideInFromRight } from "Common"
import { firstPriceCompareAt } from "Common"
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

  function isRegAndCompareSame() {
    if (!showPriceRange && compareAt) {
      var firstCompare = firstPriceCompareAt(prices)
      var firstReg = firstRegPrice(prices)

      if (firstCompare === firstReg) {
        return true
      }
    }

    return false
  }

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
      if (selectedVariant.node.compareAtPrice) {
        setComparePrice(selectedVariant.node.compareAtPrice.amount)
      } else {
        setComparePrice(false)
      }

      setRegPrice(selectedVariant.node.price.amount)
    } else {
      setComparePrice(firstPriceCompareAt(prices))
      setRegPrice(getFirstPrice())
    }
  }, [selectedVariant])

  const priceWrapperCSS = css`
    line-height: 1;
    margin: 0 15px 0 0;
    display: block;

    font-family: ${settings.pricingTypeFontFamily
      ? settings.pricingTypeFontFamily
      : settings.pricingFont
      ? settings.pricingFont
      : "inherit"};
    font-weight: ${settings.pricingTypeFontWeight
      ? settings.pricingTypeFontWeight
      : settings.pricingFontWeight
      ? settings.pricingFontWeight
      : "initial"};
    font-size: ${settings.pricingTypeFontSize
      ? settings.pricingTypeFontSize
      : "initial"};
    letter-spacing: ${settings.pricingTypeLetterSpacing
      ? settings.pricingTypeLetterSpacing
      : "initial"};
    line-height: ${settings.pricingTypeLineHeight
      ? settings.pricingTypeLineHeight
      : "initial"};
    text-decoration: ${settings.pricingTypeTextDecoration
      ? settings.pricingTypeTextDecoration
      : "initial"};
    text-transform: ${settings.pricingTypeTextTransform
      ? settings.pricingTypeTextTransform
      : "initial"};
  `

  return !isRegAndCompareSame() ? (
    <span
      itemScope
      itemProp="offers"
      itemType="https://schema.org/Offer"
      className="wps-products-price wps-product-pricing wps-products-price-one"
      data-show-price-range={showPriceRange}
      css={priceWrapperCSS}
    >
      {showPriceRange && !selectedVariant ? (
        <ProductPricingRange
          firstPrice={getFirstPrice()}
          lastPrice={getLastPrice()}
          isFirstAndLastSame={isFirstAndLastSame()}
          compareAt={compareAt}
          showPriceRange={showPriceRange}
          pricingColor={settings.pricingColor}
          pricingFontSize={settings.pricingTypeFontSize}
        />
      ) : selectedVariant ? (
        <SlideInFromRight>
          <ProductPriceSingle
            ref={singlePriceElement}
            price={compareAt ? comparePrice : regPrice}
            compareAt={compareAt}
            showPriceRange={showPriceRange}
            pricingColor={settings.pricingColor}
            pricingFontSize={settings.pricingTypeFontSize}
          />
        </SlideInFromRight>
      ) : (
        <ProductPriceSingle
          ref={singlePriceElement}
          price={compareAt ? comparePrice : regPrice}
          compareAt={compareAt}
          showPriceRange={showPriceRange}
          pricingColor={settings.pricingColor}
          pricingFontSize={settings.pricingTypeFontSize}
        />
      )}
    </span>
  ) : null
}

export default ProductPrice
