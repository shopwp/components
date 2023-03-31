import RequestsReducer from "./reducer"
import RequestsInitialState from "./initial-state"
import { RequestsStateContext, RequestsDispatchContext } from "./context"

function RequestsProvider(props) {
  const [state, dispatch] = wp.element.useReducer(
    RequestsReducer,
    RequestsInitialState(props)
  )

  return (
    <RequestsStateContext.Provider value={state}>
      <RequestsDispatchContext.Provider value={dispatch}>
        {props.children}
      </RequestsDispatchContext.Provider>
    </RequestsStateContext.Provider>
  )
}

export default RequestsProvider
