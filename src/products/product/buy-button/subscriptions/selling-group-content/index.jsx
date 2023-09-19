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
    if (sellingGroup?.include) {
      if (sellingGroup?.include?.product?.discount_amount !== 0) {
        return sellingGroup.include.product.discount_amount
      } else {
        return false
      }
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

  const SellingGroupLabelCSS = css`
    display: flex;
    transition: all ease 0.18s;
    padding: 15px 0px;

    *,
    *:before,
    *:after {
      box-sizing: border-box;
    }

    input[type="radio"] {
      opacity: 0;
      width: 0;
      height: 0;
      margin: 0;

      + .shopwp-radio-control::before {
        content: "";
        width: 0.5em;
        height: 0.5em;
        box-shadow: inset 0.5em 0.5em ${isSelected ? "blue" : "black"};
        border-radius: 50%;
        transition: 180ms transform ease-in-out;
        transform: scale(0);
        display: block;
      }

      &:checked + .shopwp-radio-control::before {
        transform: scale(1);
      }
    }

    .shopwp-radio-control {
      display: block;
      width: 1em;
      height: 1em;
      border-radius: 50%;
      border: 0.1em solid ${isSelected ? "blue" : "black"};
      position: absolute;
      top: 26px;
      left: 15px;
      transform: translate(0, -50%);
      display: grid;
      place-items: center;
      margin: 0;
    }

    .shopwp-radio-text {
      padding-left: 30px;
      margin: 0;
      color: ${isSelected ? "blue" : "black"};
      display: flex;
      width: 100%;
      max-width: 100%;
    }

    &:hover {
      cursor: ${isSelected ? "text" : "pointer"};
    }
  `

  const PriceCSS = css`
    && {
      margin: 0 0 0 10px;
      display: inline-block;
      line-height: initial;
      font-size: 16px;
    }
  `

  const FinalPriceCSS = css`
    && {
      font-weight: bold;
    }
  `

  const RegFullPriceCSS = css`
    text-decoration: line-through;
    font-weight: normal;
  `

  const SaveInlineCSS = css`
    display: inline-block;
    margin-left: 5px;
    margin-top: 0px;
    margin-bottom: 0;
    font-size: 15px;
    font-weight: normal;
  `

  const SubscriptionLabelTextCSS = css`
    && {
      line-height: initial;
      display: inline-block;
      margin: 0;
      font-size: 16px;
    }
  `

  return (
    <div className="shopwp-selling-group-content">
      <label css={SellingGroupLabelCSS}>
        <Radio value={value} />
        <div className="shopwp-radio-control"></div>
        <div className="shopwp-radio-text">
          <p css={SubscriptionLabelTextCSS}>
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
              <p css={[PriceCSS, FinalPriceCSS]}>
                <Price price={discountPrice ? discountPrice : regularPrice} />
              </p>

              {discountPrice && saveAmount ? (
                <p css={[PriceCSS, RegFullPriceCSS]}>
                  <Price price={regularPrice} />
                </p>
              ) : null}

              {saveAmount && (
                <p css={SaveInlineCSS}>
                  ({shopState.t.l.save} {saveAmount}%)
                </p>
              )}
            </>
          ) : null}
        </div>
      </label>
    </div>
  )
}

export default SellingGroupContent
