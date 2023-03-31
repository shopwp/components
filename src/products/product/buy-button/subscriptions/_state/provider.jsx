import SubscriptionsBuyButtonReducer from "./reducer"
import SubscriptionsBuyButtonInitialState from "./initial-state"
import {
  SubscriptionsBuyButtonStateContext,
  SubscriptionsBuyButtonDispatchContext,
} from "./context"

function SubscriptionsBuyButtonProvider(props) {
  const [state, dispatch] = wp.element.useReducer(
    SubscriptionsBuyButtonReducer,
    SubscriptionsBuyButtonInitialState(props)
  )

  return (
    <SubscriptionsBuyButtonStateContext.Provider value={state}>
      <SubscriptionsBuyButtonDispatchContext.Provider value={dispatch}>
        {props.children}
      </SubscriptionsBuyButtonDispatchContext.Provider>
    </SubscriptionsBuyButtonStateContext.Provider>
  )
}

export default SubscriptionsBuyButtonProvider
