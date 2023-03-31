import { CartStateContext, CartDispatchContext } from "./context"

function useCartState() {
  const context = wp.element.useContext(CartStateContext)

  if (!context) {
    throw new Error("useCartState must be used within the CartProvider")
  }

  return context
}

function useCartDispatch() {
  const context = wp.element.useContext(CartDispatchContext)

  if (!context) {
    throw new Error("useCartDispatch must be used within the CartProvider")
  }

  return context
}

export { useCartState, useCartDispatch }
