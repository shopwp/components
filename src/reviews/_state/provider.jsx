import ProductReviewsReducer from "./reducer"
import ProductReviewsInitialState from "./initial-state"
import {
  ProductReviewsStateContext,
  ProductReviewsDispatchContext,
} from "./context"

function ProductReviewsProvider(props) {
  const [state, dispatch] = wp.element.useReducer(
    ProductReviewsReducer,
    ProductReviewsInitialState(props)
  )

  return (
    <ProductReviewsStateContext.Provider value={state}>
      <ProductReviewsDispatchContext.Provider value={dispatch}>
        {props.children}
      </ProductReviewsDispatchContext.Provider>
    </ProductReviewsStateContext.Provider>
  )
}

export default ProductReviewsProvider
