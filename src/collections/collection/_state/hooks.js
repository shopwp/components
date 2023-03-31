import { CollectionStateContext, CollectionDispatchContext } from "./context"

function useCollectionState() {
  const context = wp.element.useContext(CollectionStateContext)

  if (!context) {
    throw new Error(
      "useCollectionState must be used within the CollectionProvider"
    )
  }

  return context
}

function useCollectionDispatch() {
  const context = wp.element.useContext(CollectionDispatchContext)

  if (!context) {
    throw new Error(
      "useCollectionDispatch must be used within the CollectionProvider"
    )
  }

  return context
}

export { useCollectionState, useCollectionDispatch }
