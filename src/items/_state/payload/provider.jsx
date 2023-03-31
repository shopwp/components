import PayloadReducer from "./reducer"
import PayloadInitialState from "./initial-state"
import { PayloadStateContext, PayloadDispatchContext } from "./context"

function PayloadProvider(props) {
  const [state, dispatch] = wp.element.useReducer(
    PayloadReducer,
    PayloadInitialState(props)
  )

  return (
    <PayloadStateContext.Provider value={state}>
      <PayloadDispatchContext.Provider value={dispatch}>
        {props.children}
      </PayloadDispatchContext.Provider>
    </PayloadStateContext.Provider>
  )
}

export default PayloadProvider
