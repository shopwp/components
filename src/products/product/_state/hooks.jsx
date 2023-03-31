import { ProductStateContext, ProductDispatchContext } from "./context"

function useProductState() {
  const context = wp.element.useContext(ProductStateContext)

  if (!context) {
    throw new Error("useProductState must be used within the ProductProvider")
  }

  return context
}

function useProductDispatch() {
  const context = wp.element.useContext(ProductDispatchContext)

  if (!context) {
    throw new Error(
      "useProductDispatch must be used within the ProductProvider"
    )
  }

  return context
}

export { useProductState, useProductDispatch }
