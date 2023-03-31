import { ProductOptionReducer } from "./reducer"
import { ProductOptionInitialState } from "./initial-state"
import { ProductOptionContext } from "./context"

function ProductOptionProvider(props) {
  const [state, dispatch] = wp.element.useReducer(
    ProductOptionReducer,
    ProductOptionInitialState(props.options)
  )

  const value = wp.element.useMemo(() => [state, dispatch], [state])

  return <ProductOptionContext.Provider value={value} {...props} />
}

export { ProductOptionProvider }
