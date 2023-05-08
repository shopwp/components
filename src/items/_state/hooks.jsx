import { ItemsStateContext } from "./context"

function useItemsState() {
  const context = wp.element.useContext(ItemsStateContext)

  if (!context) {
    throw new Error("useItemsState must be used within the ItemsProvider")
  }

  return context
}

export { useItemsState }
