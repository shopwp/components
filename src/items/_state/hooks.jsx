import { ItemsStateContext, ItemsDispatchContext } from "./context"

function useItemsState() {
  const context = wp.element.useContext(ItemsStateContext)

  if (!context) {
    throw new Error("useItemsState must be used within the ItemsProvider")
  }

  return context
}

function useItemsDispatch() {
  const context = wp.element.useContext(ItemsDispatchContext)

  if (!context) {
    throw new Error("useItemsDispatch must be used within the ItemsProvider")
  }

  return context
}

export { useItemsState, useItemsDispatch }
