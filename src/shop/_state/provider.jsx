import ShopReducer from "./reducer"
import ShopInitialState from "./initial-state"
import { ShopStateContext, ShopDispatchContext } from "./context"

function ShopProvider(props) {
  const [state, dispatch] = wp.element.useReducer(
    ShopReducer,
    ShopInitialState(props)
  )

  return (
    <ShopStateContext.Provider value={state}>
      <ShopDispatchContext.Provider value={dispatch}>
        {props.children}
      </ShopDispatchContext.Provider>
    </ShopStateContext.Provider>
  )
}

export default ShopProvider
