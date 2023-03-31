import { StorefrontReducer } from "./reducer"
import { StorefrontInitialState } from "./initial-state"
import { StorefrontStateContext, StorefrontDispatchContext } from "./context"

function StorefrontProvider(props) {
  const [state, dispatch] = wp.element.useReducer(
    StorefrontReducer,
    StorefrontInitialState(props)
  )

  return (
    <StorefrontStateContext.Provider value={state}>
      <StorefrontDispatchContext.Provider value={dispatch}>
        {props.children}
      </StorefrontDispatchContext.Provider>
    </StorefrontStateContext.Provider>
  )
}

export default StorefrontProvider
