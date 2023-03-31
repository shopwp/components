import { PayloadStateContext, PayloadDispatchContext } from "./context"

function usePayloadState() {
  const context = wp.element.useContext(PayloadStateContext)

  if (!context) {
    throw new Error("usePayloadState must be used within the PayloadProvider")
  }

  return context
}

function usePayloadDispatch() {
  const context = wp.element.useContext(PayloadDispatchContext)

  if (!context) {
    throw new Error(
      "usePayloadDispatch must be used within the PayloadProvider"
    )
  }

  return context
}

export { usePayloadState, usePayloadDispatch }
