import defaults from "./defaults"
import { mergeDefaults } from "@shopwp/common"
import isBase64 from "is-base64"

/*

Does not run for inline cart icon

*/
function updateVariablesInCSS(componentType, settings) {
  const container = document.querySelector("#shopwp-root")

  if (componentType === "cart") {
    container.style.setProperty(
      "--cart-counterTextColor",
      settings.counterTextColor
    )

    container.style.setProperty("--cart-iconFixedColor", settings.iconColor)

    container.style.setProperty(
      "--cart-iconFixedCounterBackgroundColor",
      settings.backgroundColor
    )
  }
}

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

  updateVariablesInCSS(componentType, settings)

  return {
    ...settings,
    htmlTemplateData: htmlTemplateData,
  }
}

export default SettingsInitialState
