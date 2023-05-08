import ItemsReducer from "./reducer"
import ItemsInitialState from "./initial-state"
import { ItemsStateContext } from "./context"

function ItemsProvider(props) {
  const [state] = wp.element.useReducer(ItemsReducer, ItemsInitialState(props))

  return (
    <ItemsStateContext.Provider value={state}>
      {props.children}
    </ItemsStateContext.Provider>
  )
}

export default ItemsProvider
