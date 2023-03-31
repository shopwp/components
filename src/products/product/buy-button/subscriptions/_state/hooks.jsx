import {
  SubscriptionsBuyButtonStateContext,
  SubscriptionsBuyButtonDispatchContext,
} from "./context"

function useSubscriptionsBuyButtonState() {
  const context = wp.element.useContext(SubscriptionsBuyButtonStateContext)

  if (!context) {
    throw new Error(
      "useSubscriptionsBuyButtonState must be used within the SubscriptionsBuyButtonProvider"
    )
  }

  return context
}

function useSubscriptionsBuyButtonDispatch() {
  const context = wp.element.useContext(SubscriptionsBuyButtonDispatchContext)

  if (!context) {
    throw new Error(
      "useSubscriptionsBuyButtonDispatch must be used within the SubscriptionsBuyButtonProvider"
    )
  }

  return context
}

export { useSubscriptionsBuyButtonState, useSubscriptionsBuyButtonDispatch }
