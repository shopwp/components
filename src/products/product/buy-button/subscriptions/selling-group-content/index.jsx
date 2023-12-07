/** @jsx jsx */
import { jsx, css } from "@emotion/react"
import { Radio } from "react-radio-group"
import { useProductState, useProductDispatch } from "../../../_state/hooks"
import { useSubscriptionsBuyButtonState } from "../_state/hooks"
import { useShopState } from "@shopwp/components"
import { findDiscountPrice } from "@shopwp/common"
import { Price } from "@shopwp/components"

function SellingGroupContent({ value, text, isSelected, sellingGroup }) {
  const { useEffect } = wp.element
  const productState = useProductState()
  const productDispatch = useProductDispatch()
  const subscriptionState = useSubscriptionsBuyButtonState()
  const shopState = useShopState()

  let regularPrice = getRegularPrice(productState.selectedVariant)
  let saveAmount = getSaveAmount(sellingGroup)
  let discountPrice = getDiscountPrice(regularPrice, saveAmount)

  function getRegularPrice(selectedVariant) {
    if (selectedVariant) {
      return selectedVariant.node.price.amount
    } else {
      return subscriptionState.prices.regPrices[0]
    }
  }

  function getSaveAmount(sellingGroup) {
    if (
      sellingGroup.discount_amount &&
      sellingGroup.discount_amount !== "0.00" &&
      sellingGroup.discount_amount !== "0" &&
      sellingGroup.discount_amount !== "0.0"
    ) {
      return sellingGroup.discount_amount
    } else {
      return false
    }
  }

  function getDiscountPrice(regularPrice, saveAmount) {
    if (saveAmount) {
      return findDiscountPrice(regularPrice, saveAmount)
    } else {
      return false
    }
  }

  useEffect(() => {
    if (value.includes("subscription") && isSelected) {
      productDispatch({
        type: "SET_SELECTED_SUBSCRIPTION_INFO",
        payload: {
          id: value,
          saveAmount: getSaveAmount(sellingGroup),
          discountPrice: getDiscountPrice(regularPrice, saveAmount),
          regularPrice: getRegularPrice(productState.selectedVariant),
        },
      })
    }
  }, [isSelected, value, sellingGroup, productState.selectedVariant])

  const SellingGroupLabelCSS = css``

  const PriceCSS = css``
  const FinalPriceCSS = css``
  const RegFullPriceCSS = css``

  return (
    <div className="swp-selling-group-content" data-is-selected={isSelected}>
      <label css={SellingGroupLabelCSS}>
        <Radio value={value} />
        <div className="shopwp-radio-control"></div>
        <div className="swp-radio-text shopwp-radio-text">
          <p className="swp-radio-label">
            {wp.hooks.applyFilters(
              "product.subscriptionLabel",
              text,
              sellingGroup,
              isSelected,
              saveAmount,
              regularPrice,
              discountPrice
            )}
          </p>

          {sellingGroup ? (
            <>
              <p
                className="swp-price swp-final-price"
                css={[PriceCSS, FinalPriceCSS]}
              >
                <Price price={discountPrice ? discountPrice : regularPrice} />
              </p>

              {discountPrice && saveAmount ? (
                <p
                  className="swp-price swp-discounted-reg-price"
                  css={[PriceCSS, RegFullPriceCSS]}
                >
                  <Price price={regularPrice} />
                </p>
              ) : null}

              {saveAmount ? (
                <p className="swp-save-inline">
                  ({shopState.t.l.save} {saveAmount}%)
                </p>
              ) : null}
            </>
          ) : null}
        </div>
      </label>
    </div>
  )
}

export default SellingGroupContent
