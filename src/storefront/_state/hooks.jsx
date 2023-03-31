import { StorefrontStateContext, StorefrontDispatchContext } from "./context"

function useStorefrontState() {
  const context = wp.element.useContext(StorefrontStateContext)

  if (!context) {
    throw new Error(
      "useStorefrontState must be used within the StorefrontProvider"
    )
  }

  return context
}

function useStorefrontDispatch() {
  const context = wp.element.useContext(StorefrontDispatchContext)

  if (!context) {
    throw new Error(
      "useStorefrontDispatch must be used within the StorefrontProvider"
    )
  }

  return context
}

export { useStorefrontState, useStorefrontDispatch }
