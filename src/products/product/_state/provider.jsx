import ProductReducer from "./reducer"
import { ProductInitialState } from "./initial-state"
import { ProductStateContext, ProductDispatchContext } from "./context"

function ProductProvider(props) {
  const [state, dispatch] = wp.element.useReducer(
    ProductReducer,
    ProductInitialState(props)
  )

  return (
    <ProductStateContext.Provider value={state}>
      <ProductDispatchContext.Provider value={dispatch}>
        {props.children}
      </ProductDispatchContext.Provider>
    </ProductStateContext.Provider>
  )
}

export default ProductProvider
