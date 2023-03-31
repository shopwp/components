import update from "immutability-helper"
import { rSet } from "Common"

function SettingsReducer(state, action) {
  switch (action.type) {
    case "SET_SETTINGS": {
      return update(state, { $set: action.payload })
    }

    case "UPDATE_HTML_TEMPLATE_DATA": {
      return rSet("htmlTemplateData", action, state)
    }

    default: {
      throw new Error(
        `Unhandled action type: ${action.type} in SettingsReducer`
      )
    }
  }
}

export default SettingsReducer
