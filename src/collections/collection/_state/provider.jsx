import CollectionReducer from "./reducer"
import CollectionInitialState from "./initial-state"
import { CollectionStateContext, CollectionDispatchContext } from "./context"

function CollectionProvider(props) {
  const [state, dispatch] = wp.element.useReducer(
    CollectionReducer,
    CollectionInitialState(props)
  )

  return (
    <CollectionStateContext.Provider value={state}>
      <CollectionDispatchContext.Provider value={dispatch}>
        {props.children}
      </CollectionDispatchContext.Provider>
    </CollectionStateContext.Provider>
  )
}

export default CollectionProvider
