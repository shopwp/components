import defaults from "./defaults"
import { mergeDefaults } from "@shopwp/common"
import isBase64 from "is-base64"

/*

Does not run for inline cart icon

*/
function updateVariablesInCSS(componentType, settings, element) {
  if (shopwp.misc.isAdmin) {
    var container = document.querySelector("#editor")
  } else {
    var container = document.querySelector("#shopwp-root")
  }

  if (!container) {
    console.warn(
      "ShopWP Warning: No container found for style variable injections"
    )
  }

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

    container.style.setProperty(
      "--border-radius",
      shopwp.general.globalBorderRadius
    )

    container.style.setProperty(
      "--cart-buttonColor",
      shopwp.general.checkoutColor
    )
    container.style.setProperty(
      "--cart-iconBackgroundColor",
      shopwp.general.cartIconBackgroundColor
    )
  } else {
    if (element) {
      container = element
    }

    container.style.setProperty(
      "--product-titleTypeFontFamily",
      settings.titleTypeFontFamily ? settings.titleTypeFontFamily : "inherit"
    )
    container.style.setProperty(
      "--product-titleTypeFontWeight",
      settings.titleTypeFontWeight ? settings.titleTypeFontWeight : "initial"
    )

    container.style.setProperty(
      "--product-titleTypeFontSize",
      settings.titleTypeFontSize ? settings.titleTypeFontSize : "initial"
    )

    container.style.setProperty(
      "--product-titleTypeLineHeight",
      settings.titleTypeLineHeight ? settings.titleTypeLineHeight : "initial"
    )

    container.style.setProperty(
      "--product-titleTypeTextDecoration",
      settings.titleTypeTextDecoration
        ? settings.titleTypeTextDecoration
        : "initial"
    )

    container.style.setProperty(
      "--product-titleTypeTextTransform",
      settings.titleTypeTextTransform
        ? settings.titleTypeTextTransform
        : "initial"
    )

    container.style.setProperty(
      "--product-titleTypeFontStyle",
      settings.titleTypeFontStyle ? settings.titleTypeFontStyle : "initial"
    )

    container.style.setProperty("--product-titleColor", settings.titleColor)

    container.style.setProperty(
      "--product-descriptionColor",
      settings.descriptionColor
    )
    container.style.setProperty(
      "--product-descriptionTypeFontFamily",
      settings.descriptionTypeFontFamily
        ? settings.descriptionTypeFontFamily
        : "initial"
    )
    container.style.setProperty(
      "--product-descriptionTypeFontWeight",
      settings.descriptionTypeFontWeight
        ? settings.descriptionTypeFontWeight
        : "initial"
    )
    container.style.setProperty(
      "--product-descriptionTypeFontSize",
      settings.descriptionTypeFontSize
        ? settings.descriptionTypeFontSize
        : "initial"
    )
    container.style.setProperty(
      "--product-descriptionTypeFontStyle",
      settings.descriptionTypeFontStyle
        ? settings.descriptionTypeFontStyle
        : "initial"
    )
    container.style.setProperty(
      "--product-descriptionTypeLetterSpacing",
      settings.descriptionTypeLetterSpacing
        ? settings.descriptionTypeLetterSpacing
        : "initial"
    )
    container.style.setProperty(
      "--product-descriptionTypeLineHeight",
      settings.descriptionTypeLineHeight
        ? settings.descriptionTypeLineHeight
        : "initial"
    )
    container.style.setProperty(
      "--product-descriptionTypeTextDecoration",
      settings.descriptionTypeTextDecoration
        ? settings.descriptionTypeTextDecoration
        : "initial"
    )
    container.style.setProperty(
      "--product-descriptionTypeTextTransform",
      settings.descriptionTypeTextTransform
        ? settings.descriptionTypeTextTransform
        : "initial"
    )
    container.style.setProperty(
      "--border-radius",
      shopwp.general.globalBorderRadius
    )
  }
}

function SettingsInitialState({
  settings = false,
  componentType = "products",
  element,
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

  updateVariablesInCSS(componentType, settings, element)

  return {
    ...settings,
    htmlTemplateData: htmlTemplateData,
  }
}

export default SettingsInitialState
