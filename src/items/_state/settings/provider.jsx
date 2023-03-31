import SettingsReducer from "./reducer"
import SettingsInitialState from "./initial-state"
import { SettingsContext, SettingsDispatchContext } from "./context"

function SettingsProvider(props) {
  const [state, dispatch] = wp.element.useReducer(
    SettingsReducer,
    SettingsInitialState(props)
  )

  return (
    <SettingsContext.Provider value={state}>
      <SettingsDispatchContext.Provider value={dispatch}>
        {props.children}
      </SettingsDispatchContext.Provider>
    </SettingsContext.Provider>
  )
}

export default SettingsProvider
