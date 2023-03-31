import { BuilderReducer } from "./reducer"
import { BuilderInitialState } from "./initial-state"
import { BuilderContext } from "./context"

function BuilderProvider(props) {
  const [state, dispatch] = wp.element.useReducer(
    BuilderReducer,
    BuilderInitialState(props.options)
  )

  const value = wp.element.useMemo(() => [state, dispatch], [state])

  return <BuilderContext.Provider value={value} {...props} />
}

export { BuilderProvider }
