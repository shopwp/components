/** @jsx jsx */
import { jsx, css } from "@emotion/react"
import { usePortal } from "Hooks"
import { useProductState } from "../_state/hooks"
import { useSettingsState } from "../../../items/_state/settings/hooks"

function ProductDescription() {
  const settings = useSettingsState()
  const productState = useProductState()

  const ProductDescriptionCSS = css`
    color: ${settings.descriptionColor};

    font-family: ${settings.descriptionTypeFontFamily
      ? settings.descriptionTypeFontFamily
      : settings.descriptionFont
      ? settings.descriptionFont
      : "inherit"};

    font-weight: ${settings.descriptionTypeFontWeight
      ? settings.descriptionTypeFontWeight
      : settings.descriptionFontWeight
      ? settings.descriptionFontWeight
      : "initial"};

    font-size: ${settings.descriptionTypeFontSize
      ? settings.descriptionTypeFontSize
      : "initial"};

    font-style: ${settings.descriptionTypeFontStyle
      ? settings.descriptionTypeFontStyle
      : "initial"};

    letter-spacing: ${settings.descriptionTypeLetterSpacing
      ? settings.descriptionTypeLetterSpacing
      : "initial"};
    line-height: ${settings.descriptionTypeLineHeight
      ? settings.descriptionTypeLineHeight
      : "initial"};
    text-decoration: ${settings.descriptionTypeTextDecoration
      ? settings.descriptionTypeTextDecoration
      : "initial"};
    text-transform: ${settings.descriptionTypeTextTransform
      ? settings.descriptionTypeTextTransform
      : "initial"};

    margin-bottom: ${settings.isSingleComponent ? "0px" : "20px"};

    p:first-of-type {
      margin-top: 0;
    }
  `

  function maybeTruncateDescription() {
    if (!settings.descriptionLength) {
      return productState.payload.descriptionHtml
    } else {
      return (
        productState.payload.descriptionHtml.substring(
          0,
          settings.descriptionLength
        ) + " ..."
      )
    }
  }

  return usePortal(
    <div
      css={ProductDescriptionCSS}
      className="wps-component-products-description"
      aria-label="Product Description"
      itemProp="description"
      dangerouslySetInnerHTML={{ __html: maybeTruncateDescription() }}
    />,
    settings.dropzoneProductDescription
  )
}

export default wp.element.memo(ProductDescription)
