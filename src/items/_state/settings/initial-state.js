import defaults from "./defaults"
import { mergeDefaults, getElementForCSSVariables } from "@shopwp/common"
import isBase64 from "is-base64"

/*

Does not run for inline cart icon

*/
function updateVariablesInCSS(componentType, settings, element) {
  const container = getElementForCSSVariables(element, componentType, settings)

  if (!container) {
    console.warn(
      "ShopWP Warning: No container found for style variable injections"
    )
    return
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
    if (componentType === "collections") {
      container.style.setProperty(
        "--collection-descriptionColor",
        settings.collectionsDescriptionColor
      )

      container.style.setProperty(
        "--collection-descriptionFontFamily",
        settings.collectionsDescriptionTypeFontFamily
          ? settings.collectionsDescriptionTypeFontFamily
          : settings.collectionsDescriptionFont
          ? settings.collectionsDescriptionFont
          : "inherit"
      )

      container.style.setProperty(
        "--collection-descriptionFontWeight",
        settings.collectionsDescriptionTypeFontWeight
          ? settings.collectionsDescriptionTypeFontWeight
          : settings.collectionsDescriptionFontWeight
          ? settings.collectionsDescriptionFontWeight
          : "initial"
      )

      container.style.setProperty(
        "--collection-descriptionFontSize",
        settings.collectionsDescriptionTypeFontSize
          ? settings.collectionsDescriptionTypeFontSize
          : "initial"
      )

      container.style.setProperty(
        "--collection-descriptionFontStyle",
        settings.collectionsDescriptionTypeFontStyle
          ? settings.collectionsDescriptionTypeFontStyle
          : "initial"
      )

      container.style.setProperty(
        "--collection-descriptionLetterSpacing",
        settings.collectionsDescriptionTypeLetterSpacing
          ? settings.collectionsDescriptionTypeLetterSpacing
          : "initial"
      )

      container.style.setProperty(
        "--collection-descriptionLineHeight",
        settings.collectionsDescriptionTypeLineHeight
          ? settings.collectionsDescriptionTypeLineHeight
          : "initial"
      )

      container.style.setProperty(
        "--collection-descriptionTextDecoration",
        settings.collectionsDescriptionTypeTextDecoration
          ? settings.collectionsDescriptionTypeTextDecoration
          : "initial"
      )

      container.style.setProperty(
        "--collection-descriptionTextTransform",
        settings.collectionsDescriptionTypeTextTransform
          ? settings.collectionsDescriptionTypeTextTransform
          : "initial"
      )

      container.style.setProperty(
        "--collection-titleFontFamily",
        settings.collectionsTitleTypeFontFamily
          ? settings.collectionsTitleTypeFontFamily
          : "inherit"
      )

      container.style.setProperty(
        "--collection-titleFontSize",
        settings.collectionsTitleTypeFontSize
          ? settings.collectionsTitleTypeFontSize
          : settings.collectionsTitleSize
      )

      container.style.setProperty(
        "--collection-titleColor",
        settings.collectionsTitleColor
      )
    }

    container.style.setProperty(
      "--pagination-paginationLoadMoreButtonColor",
      settings.paginationLoadMoreButtonColor
        ? settings.paginationLoadMoreButtonColor
        : "initial"
    )

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
      "--product-variantDropdownButtonTextColor",
      settings.variantDropdownButtonTextColor
        ? settings.variantDropdownButtonTextColor
        : "black"
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
