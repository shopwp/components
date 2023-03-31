/** @jsx jsx */
import { jsx, css } from "@emotion/react"
import { containerFluidCSS, flexRowCSS, mq } from "Common/css"
import IconDecrement from "../icon-decrement"
import IconIncrement from "../icon-increment"
import { useDebounce } from "use-debounce"
import { useFirstRender } from "Hooks"
import { findNewPotentialTotal } from "Common/cart"
import { useShopState } from "ShopState"

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
}) {
  const { useState, useEffect } = wp.element
  const shopState = useShopState()
  const [quantity, setQuantity] = useState(initialQuantity)
  const [debouncedQuantity] = useDebounce(parseInt(quantity), 20)
  const isFirstRender = useFirstRender()

  useEffect(() => {
    maybeShowInventoryNotice(initialQuantity)
    setQuantity(initialQuantity)
  }, [initialQuantity])

  const quantityInputCSS = css`
    && {
      margin: 0;
      width: ${small ? "40px" : "45px"};
      height: ${small ? "40px" : "45px"};
      border: none;
      text-align: center;
      font-size: 18px;
      margin-right: 0px;
      border-top: 1px solid #606060;
      border-bottom: 1px solid #606060;
      max-height: ${small ? "40px" : "45px"};
      border-radius: 0;
      appearance: none;
      padding: 0;
      color: #121212;
      background: white;

      ::-webkit-outer-spin-button,
      ::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
      }

      /* Firefox */
      &[type="number"] {
        -moz-appearance: textfield;
      }

      &:hover {
        cursor: ${isUpdating ? "not-allowed" : "text"};
      }

      ${mq("small")} {
        width: 60px;
        height: 58px !important;
        max-height: 60px;
        font-size: 24px;
      }
    }
  `

  const QuantityIncDecCSS = css`
    color: #333;
    display: block;
    margin-top: 0;
    position: relative;
    padding: 0 10px;
    font-size: 17px;
    font-family: monospace;
    background: white;
    box-shadow: none;
    cursor: pointer;
    text-align: center;
    border: 1px solid #606060;
    width: ${small ? "45px" : "50px"};
    height: ${small ? "40px" : "45px"};
    outline: none;
    outline-offset: 0;
    transition: all 0.2s ease;

    &:hover {
      background: #f1f1f1;
    }

    ${mq("small")} {
      font-size: 26px;
      width: 60px;
      height: 60px;
    }
  `

  const QuantityIncCSS = css`
    border-radius: 0 5px 5px 0;

    &:hover {
      cursor: pointer;
      background-color: #f1f1f1;
    }
  `

  const QuantityDecCSS = css`
    border-radius: 5px 0 0 5px;

    &:hover {
      cursor: ${isUpdating ? "not-allowed" : "pointer"};
      background-color: ${isUpdating ? "white" : "#f1f1f1"};
    }
  `

  const quantityContainer = css`
    width: 122px;
    margin: 0;

    ${mq("small")} {
      width: 100%;
      min-width: 160px;
    }
  `

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
        var newQuantity = maxQuantity
      } else {
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

      maybeShowInventoryNotice(e.target.value)
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

    maybeShowInventoryNotice(quantity)

    if (!quantityStep) {
      var newQuantity = quantity - 1
    } else {
      var newQuantity = quantity - quantityStep
    }

    if (!lineItem && newQuantity < 1) {
      newQuantity = 1
    }

    maybeShowInventoryNotice(newQuantity)
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
      let newQ = quantity + 1

      if (maxQuantity && maxQuantity > 0 && newQ >= maxQuantity) {
        var newQuantity = maxQuantity
      } else {
        var newQuantity = newQ
      }
    } else {
      let newQ = quantity + quantityStep

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
        setNotice({
          type: "error",
          message: shopState.t.w.maxCartTotal,
        })
        return
      }
    }

    maybeShowInventoryNotice(newQuantity)
    setQuantity(newQuantity)
  }

  function maybeShowInventoryNotice(newQuantity) {
    if (maxQuantity && newQuantity > maxQuantity) {
      // Only show notice for cart line item quantity
      if (setNotice && lineItem) {
        if (lineItem.merchandise.quantityAvailable > 0) {
          setNotice({
            type: "warning",
            message: shopState.t.n.limitedTotal,
          })
        }
      }
    } else {
      if (setNotice && lineItem) {
        setNotice(false)
      }
    }
  }

  useEffect(() => {
    if (isFirstRender) {
      return
    }

    onChange(debouncedQuantity, initialQuantity)
  }, [debouncedQuantity])

  return (
    <div
      className="wps-quantity-container"
      css={[containerFluidCSS, quantityContainer]}
    >
      <div css={[flexRowCSS]}>
        <button
          className="wps-quantity-decrement"
          css={[QuantityIncDecCSS, QuantityDecCSS]}
          type="button"
          role="button"
          onClick={handleDecrement}
        >
          <IconDecrement />
        </button>

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

        <button
          className="wps-quantity-increment"
          css={[QuantityIncDecCSS, QuantityIncCSS]}
          type="button"
          role="button"
          onClick={handleIncrement}
        >
          <IconIncrement />
        </button>
      </div>
    </div>
  )
}

export default Quantity
