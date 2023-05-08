import update from "immutability-helper"
import { rSet, rErr } from "@shopwp/common"

function SettingsReducer(state, action) {
  switch (action.type) {
    case "SET_SETTINGS": {
      return update(state, { $set: action.payload })
    }

    case "UPDATE_HTML_TEMPLATE_DATA": {
      return rSet("htmlTemplateData", action, state)
    }

    default: {
      rErr(action, "Settings")
    }
  }
}

export default SettingsReducer
