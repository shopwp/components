import CartReducer from "./reducer"
import CartInitialState from "./initial-state"
import { CartStateContext, CartDispatchContext } from "./context"

function CartProvider(props) {
  const [state, dispatch] = wp.element.useReducer(
    CartReducer,
    CartInitialState(props)
  )

  return (
    <CartStateContext.Provider value={state}>
      <CartDispatchContext.Provider value={dispatch}>
        {props.children}
      </CartDispatchContext.Provider>
    </CartStateContext.Provider>
  )
}

export default CartProvider
