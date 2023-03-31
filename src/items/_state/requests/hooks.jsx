import { RequestsStateContext, RequestsDispatchContext } from "./context"

function useRequestsState() {
  const context = wp.element.useContext(RequestsStateContext)

  if (!context) {
    throw new Error("useRequestsState must be used within the RequestProvider")
  }

  return context
}

function useRequestsDispatch() {
  const context = wp.element.useContext(RequestsDispatchContext)

  if (!context) {
    throw new Error(
      "useRequestsDispatch must be used within the RequestProvider"
    )
  }

  return context
}

export { useRequestsState, useRequestsDispatch }
