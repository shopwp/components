import SearchReducer from "./reducer"
import SearchInitialState from "./initial-state"
import { SearchStateContext, SearchDispatchContext } from "./context"

function SearchProvider(props) {
  const [state, dispatch] = wp.element.useReducer(
    SearchReducer,
    SearchInitialState(props)
  )

  return (
    <SearchStateContext.Provider value={state}>
      <SearchDispatchContext.Provider value={dispatch}>
        {props.children}
      </SearchDispatchContext.Provider>
    </SearchStateContext.Provider>
  )
}

export default SearchProvider
