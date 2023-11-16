/** @jsx jsx */
import { jsx, css } from "@emotion/react"
import { containerFluidCSS, flexRowNoBreakCSS, mq } from "@shopwp/common"
import IconDecrement from "../icon-decrement"
import IconIncrement from "../icon-increment"
import { useFirstRender, useDebounce } from "@shopwp/hooks"
import { findNewPotentialTotal } from "@shopwp/common"
import { useShopState } from "@shopwp/components"
import QuantityButton from "./button"

function Quantity({
  initialQuantity,
  maxQuantity,
  minQuantity,
  quantityStep,
  dispatch,
  onChange,
  small = true,
  isUpdating = false,
  lineItem = false,
  setNotice = false,
  globalMaxQuantity = false,
  fontSize = false,
  selectedOptions = null,
  selectedVariant = false,
}) {
  const { useState, useEffect } = wp.element
  const shopState = useShopState()
  const [quantity, setQuantity] = useState(initialQuantity)
  const debouncedQuantity = useDebounce(parseInt(quantity), 20)
  const isFirstRender = useFirstRender()

  const maxQuantityNoticeMessage =
    maxQuantity === 1
      ? "You may only buy one of this item."
      : "You may only buy " + maxQuantity + " or less of this item."

  useEffect(() => {
    if (selectedOptions === null) {
      return
    }

    if (selectedOptions !== false) {
      return
    }

    setQuantity(initialQuantity)
    setNotice(false)
  }, [initialQuantity, selectedOptions])

  useEffect(() => {
    if (!selectedVariant) {
      return
    }

    if (setNotice && maxQuantity && quantity > maxQuantity) {
      setNotice(maxQuantityNoticeMessage)
      setQuantity(maxQuantity)
    }
  }, [maxQuantity, selectedVariant, quantity])

  if (fontSize) {
    var relativeFontSize = parseInt(fontSize.split("px")[0])
    var finalStuff = relativeFontSize * 2.4
    var quantStuff = relativeFontSize * 2
    var customQuantitySize = quantStuff.toString() + "px"
    var customButtonSize = finalStuff.toString() + "px"
    var quantFontSize = fontSize
  } else {
    var customQuantitySize = small ? "40px" : "45px"
    var customButtonSize = small ? "40px" : "45px"
    var quantFontSize = "18px"
  }

  const quantityInputCSS = css`
    && {
      margin: 0;
      width: ${customQuantitySize};
      height: ${customButtonSize};
      min-height: 45px;
      max-height: ${customButtonSize};
      max-width: 45px;
      min-width: 40px;
      border: none;
      text-align: center;
      font-size: ${quantFontSize};
      margin-right: 0px;
      box-shadow: inset 0px 1px 0px 0px #606060, inset 0px -1px 0px 0px #606060;
      border-radius: 0;
      appearance: none;
      padding: 0;
      line-height: 0;
      color: #121212;
      background: white;

      ::-webkit-outer-spin-button,
      ::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
      }

      &[type="number"] {
        -moz-appearance: textfield;
      }

      &:hover {
        cursor: ${isUpdating ? "not-allowed" : "text"};
      }

      ${mq("small")} {
        width: 50px;
        height: 50px;
        max-width: 50px;
        max-height: 50px;
        font-size: 24px;
      }
    }
  `

  const QuantityIncCSS = css`
    border-radius: 0 ${shopwp.general.globalBorderRadius}
      ${shopwp.general.globalBorderRadius} 0;

    &:hover {
      cursor: pointer;
      background-color: #f1f1f1;
    }
  `

  const QuantityDecCSS = css`
    border-radius: ${shopwp.general.globalBorderRadius} 0 0
      ${shopwp.general.globalBorderRadius};

    &:hover {
      cursor: ${isUpdating ? "not-allowed" : "pointer"};
      background-color: ${isUpdating ? "white" : "#f1f1f1"};
    }
  `

  const quantityContainer = css``

  function handleQuantityChange(e) {
    if (isUpdating) {
      return
    }

    if (e.target.value || e.target.value === 0) {
      if (minQuantity && e.target.value <= minQuantity) {
        var newQuantity = minQuantity
      } else if (
        maxQuantity &&
        maxQuantity > 0 &&
        e.target.value >= maxQuantity
      ) {
        setNotice(maxQuantityNoticeMessage)
        var newQuantity = maxQuantity
      } else {
        setNotice(false)
        var newQuantity = e.target.value
      }

      newQuantity = parseInt(newQuantity)

      if (lineItem && shopState && globalMaxQuantity) {
        var newPotentialTotal = findNewPotentialTotal(
          shopState,
          lineItem,
          newQuantity
        )

        if (hasReachedMaxQuantity(globalMaxQuantity, newPotentialTotal)) {
          setNotice({
            type: "error",
            message: shopState.t.w.maxCartTotal,
          })
          return
        }
      }

      setQuantity(newQuantity)
    }
  }

  function hasReachedMaxQuantity(maxQuantity, newPotentialTotal) {
    if (globalMaxQuantity && newPotentialTotal > globalMaxQuantity) {
      return true
    }

    return false
  }

  function handleDecrement() {
    if (isUpdating) {
      return
    }

    dispatch({
      type: "SET_NOTICE",
      payload: false,
    })

    if (lineItem && quantity - 1 <= 0) {
      setQuantity(0)
      return
    }

    if (minQuantity && quantity <= minQuantity) {
      var newQuantity = minQuantity
    } else {
      if (!quantityStep) {
        var newQuantity = quantity - 1
      } else {
        var newQuantity = quantity - quantityStep
      }

      if (!lineItem && newQuantity < 1) {
        newQuantity = 1
      }
    }

    if (setNotice && maxQuantity && newQuantity < maxQuantity) {
      setNotice(false)
    }

    setQuantity(newQuantity)
  }

  function handleIncrement() {
    if (isUpdating) {
      return
    }

    dispatch({
      type: "SET_NOTICE",
      payload: false,
    })

    if (!quantityStep) {
      var newQ = quantity + 1

      if (maxQuantity && maxQuantity > 0 && newQ >= maxQuantity) {
        var newQuantity = maxQuantity
      } else {
        var newQuantity = newQ
      }
    } else {
      var newQ = quantity + quantityStep

      if (maxQuantity && maxQuantity > 0 && newQ >= maxQuantity) {
        var newQuantity = maxQuantity
      } else {
        var newQuantity = newQ
      }
    }

    if (lineItem && shopState && globalMaxQuantity) {
      var newPotentialTotal = findNewPotentialTotal(
        shopState,
        lineItem,
        newQuantity
      )

      if (hasReachedMaxQuantity(globalMaxQuantity, newPotentialTotal)) {
        setNotice(shopState.t.w.maxCartTotal)
        return
      } else {
        setNotice(false)
      }
    }

    if (setNotice && maxQuantity && newQ > maxQuantity) {
      setNotice(maxQuantityNoticeMessage)
    } else {
      setNotice(false)
    }

    setQuantity(newQuantity)
  }

  useEffect(() => {
    if (isFirstRender) {
      return
    }

    onChange(debouncedQuantity, initialQuantity)
  }, [debouncedQuantity])

  return (
    <div
      className="swp-l-rel100 swp-quantity-container wps-quantity-container"
      css={[containerFluidCSS, quantityContainer]}
    >
      <div css={[flexRowNoBreakCSS]}>
        <QuantityButton
          type="decrement"
          onClick={handleDecrement}
          customCSS={QuantityDecCSS}
          small={small}
          customButtonSize={customButtonSize}
        >
          <IconDecrement />
        </QuantityButton>

        <input
          className="wps-quantity-input"
          type="number"
          min={minQuantity > 1 ? minQuantity : 1}
          onFocus={(e) => e.currentTarget.select()}
          aria-label="Product Quantity Input"
          css={quantityInputCSS}
          value={quantity}
          onChange={handleQuantityChange}
          onBlur={handleQuantityChange}
          disabled={quantityStep}
          pattern="\\d*"
        />

        <QuantityButton
          type="increment"
          onClick={handleIncrement}
          customCSS={QuantityIncCSS}
          small={small}
          customButtonSize={customButtonSize}
        >
          <IconIncrement />
        </QuantityButton>
      </div>
    </div>
  )
}

export default Quantity
