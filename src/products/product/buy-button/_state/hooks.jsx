import {
  ProductBuyButtonStateContext,
  ProductBuyButtonDispatchContext,
} from "./context"

function useProductBuyButtonState() {
  const context = wp.element.useContext(ProductBuyButtonStateContext)

  if (!context) {
    throw new Error(
      "useProductBuyButtonState must be used within the ProductBuyButtonProvider"
    )
  }

  return context
}

function useProductBuyButtonDispatch() {
  const context = wp.element.useContext(ProductBuyButtonDispatchContext)

  if (!context) {
    throw new Error(
      "useProductBuyButtonDispatch must be used within the ProductBuyButtonProvider"
    )
  }

  return context
}

export { useProductBuyButtonState, useProductBuyButtonDispatch }
