import StorefrontOptionsReducer from "./reducer"
import StorefrontOptionsInitialState from "./initial-state"
import StorefrontOptionsContext from "./context"

function StorefrontOptionsProvider(props) {
  const [state, dispatch] = wp.element.useReducer(
    StorefrontOptionsReducer,
    StorefrontOptionsInitialState(props.options)
  )

  const value = wp.element.useMemo(() => [state, dispatch], [state])

  return <StorefrontOptionsContext.Provider value={value} {...props} />
}

export default StorefrontOptionsProvider
