import { SettingsContext, SettingsDispatchContext } from "./context"

function useSettingsState() {
  const context = wp.element.useContext(SettingsContext)

  if (!context) {
    throw new Error("useSettingsState must be used within the SettingsProvider")
  }

  return context
}

function useSettingsDispatch() {
  const context = wp.element.useContext(SettingsDispatchContext)

  if (!context) {
    throw new Error(
      "useSettingsDispatch must be used within the SettingsProvider"
    )
  }

  return context
}

export { useSettingsState, useSettingsDispatch }
