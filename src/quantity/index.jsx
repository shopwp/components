/** @jsx jsx */
import { jsx, css } from "@emotion/react"
import {
  containerFluidCSS,
  flexRowNoBreakCSS,
  findNewPotentialTotal,
  getElementForCSSVariables,
} from "@shopwp/common"
import IconDecrement from "../icon-decrement"
import IconIncrement from "../icon-increment"
import { useFirstRender, useDebounce } from "@shopwp/hooks"
import { useShopState } from "@shopwp/components"
import QuantityButton from "./button"

function Quantity({
  initialQuantity,
  maxQuantity,
  minQuantity,
  quantityStep,
  dispatch,
  onChange,
  element,
  small = true,
  isUpdating = false,
  lineItem = false,
  setNotice = false,
  globalMaxQuantity = false,
  fontSize = false,
  selectedVariant = false,
  inventoryErrors = false,
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
    setQuantity(initialQuantity)
    setNotice(false)
  }, [initialQuantity, inventoryErrors])

  useEffect(() => {
    if (!selectedVariant) {
      return
    }

    // currentlyNotInStock evaluates to true when the inventory option "Continue selling when out of stock" is checked AND the quantity available is <= 0.
    if (selectedVariant.currentlyNotInStock) {
      return
    }

    if (setNotice && maxQuantity && quantity > maxQuantity) {
      setNotice(maxQuantityNoticeMessage)
      setQuantity(maxQuantity)
    }
  }, [maxQuantity, selectedVariant, quantity])

  const quantityInputCSS = css``
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

  useEffect(() => {
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

    const container = getElementForCSSVariables(element)

    container.style.setProperty(
      "--custom-quantityInputWidth",
      customQuantitySize
    )
    container.style.setProperty("--custom-quantityButtonSize", customButtonSize)
    container.style.setProperty("--custom-quantityFontSize", quantFontSize)
  }, [fontSize])

  return (
    <div
      className="swp-l-rel100 swp-quantity-container wps-quantity-container"
      css={[quantityContainer]}
    >
      <div css={[flexRowNoBreakCSS]}>
        <QuantityButton
          type="decrement"
          onClick={handleDecrement}
          small={small}
        >
          <IconDecrement />
        </QuantityButton>

        <input
          className="swp-quantity-input wps-quantity-input"
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
          small={small}
        >
          <IconIncrement />
        </QuantityButton>
      </div>
    </div>
  )
}

export default Quantity
