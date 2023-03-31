import ProductBuyButtonReducer from "./reducer"
import ProductBuyButtonInitialState from "./initial-state"
import {
  ProductBuyButtonStateContext,
  ProductBuyButtonDispatchContext,
} from "./context"

function ProductBuyButtonProvider(props) {
  const [state, dispatch] = wp.element.useReducer(
    ProductBuyButtonReducer,
    ProductBuyButtonInitialState(props)
  )

  return (
    <ProductBuyButtonStateContext.Provider value={state}>
      <ProductBuyButtonDispatchContext.Provider value={dispatch}>
        {props.children}
      </ProductBuyButtonDispatchContext.Provider>
    </ProductBuyButtonStateContext.Provider>
  )
}

export default ProductBuyButtonProvider
