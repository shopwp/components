import { SearchStateContext, SearchDispatchContext } from "./context"

function useSearchState() {
  const context = wp.element.useContext(SearchStateContext)

  if (!context) {
    throw new Error("useSearchState must be used within the SearchProvider")
  }

  return context
}

function useSearchDispatch() {
  const context = wp.element.useContext(SearchDispatchContext)

  if (!context) {
    throw new Error("useSearchDispatch must be used within the SearchProvider")
  }

  return context
}

export { useSearchState, useSearchDispatch }
