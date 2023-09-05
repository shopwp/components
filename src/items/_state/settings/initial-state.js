import defaults from "./defaults"
import { mergeDefaults } from "@shopwp/common"
import isBase64 from "is-base64"

function SettingsInitialState({
  settings = false,
  componentType = "products",
}) {
  settings = mergeDefaults(settings, defaults[componentType])

  if (isBase64(settings.htmlTemplateData)) {
    var htmlTemplateData = atob(settings.htmlTemplateData)
  } else {
    if (settings.htmlTemplateData) {
      var htmlTemplateData = settings.htmlTemplateData
    } else {
      var htmlTemplateData = ""
    }
  }

  return {
    ...settings,
    htmlTemplateData: htmlTemplateData,
  }
}

export default SettingsInitialState
