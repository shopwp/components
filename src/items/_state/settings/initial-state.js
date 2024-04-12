import defaults from "./defaults"
import { mergeDefaults, updateVariablesInCSS } from "@shopwp/common"
import isBase64 from "is-base64"

function SettingsInitialState({
  settings = false,
  componentType = "products",
  element,
}) {
  settings = mergeDefaults(settings, defaults[componentType])

  if (isBase64(settings.htmlTemplateData)) {
    var htmlTemplateData = decodeURI(atob(settings.htmlTemplateData))
  } else {
    if (settings.htmlTemplateData) {
      var htmlTemplateData = settings.htmlTemplateData
    } else {
      var htmlTemplateData = ""
    }
  }

  updateVariablesInCSS(componentType, settings, element)

  return {
    ...settings,
    htmlTemplateData: htmlTemplateData,
  }
}

export default SettingsInitialState
