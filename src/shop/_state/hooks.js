import { ShopStateContext, ShopDispatchContext } from "./context"

function useShopState() {
  const context = wp.element.useContext(ShopStateContext)

  if (!context) {
    throw new Error("useShopState must be used within the ShopProvider")
  }

  return context
}

function useShopDispatch() {
  const context = wp.element.useContext(ShopDispatchContext)

  if (!context) {
    throw new Error("useShopDispatch must be used within the ShopProvider")
  }

  return context
}

export { useShopState, useShopDispatch }
