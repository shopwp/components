/** @jsx jsx */
import { jsx, css } from "@emotion/react"
import { usePortal } from "@shopwp/hooks"
import { useCollectionState } from "../_state/hooks"
import { useSettingsState } from "../../../items/_state/settings/hooks"

function CollectionDescription() {
  const collectionState = useCollectionState()
  const settings = useSettingsState()

  const descCSS = css`
    color: ${settings.collectionsDescriptionColor};

    font-family: ${settings.collectionsDescriptionTypeFontFamily
      ? settings.collectionsDescriptionTypeFontFamily
      : settings.collectionsDescriptionFont
      ? settings.collectionsDescriptionFont
      : "inherit"};

    font-weight: ${settings.collectionsDescriptionTypeFontWeight
      ? settings.collectionsDescriptionTypeFontWeight
      : settings.collectionsDescriptionFontWeight
      ? settings.collectionsDescriptionFontWeight
      : "initial"};

    font-size: ${settings.collectionsDescriptionTypeFontSize
      ? settings.collectionsDescriptionTypeFontSize
      : "initial"};

    font-style: ${settings.collectionsDescriptionTypeFontStyle
      ? settings.collectionsDescriptionTypeFontStyle
      : "initial"};

    letter-spacing: ${settings.collectionsDescriptionTypeLetterSpacing
      ? settings.collectionsDescriptionTypeLetterSpacing
      : "initial"};
    line-height: ${settings.collectionsDescriptionTypeLineHeight
      ? settings.collectionsDescriptionTypeLineHeight
      : "initial"};
    text-decoration: ${settings.collectionsDescriptionTypeTextDecoration
      ? settings.collectionsDescriptionTypeTextDecoration
      : "initial"};
    text-transform: ${settings.collectionsDescriptionTypeTextTransform
      ? settings.collectionsDescriptionTypeTextTransform
      : "initial"};
  `

  return usePortal(
    <div
      css={descCSS}
      itemProp="description"
      className="wps-collections-description"
      dangerouslySetInnerHTML={{
        __html: collectionState.payload.descriptionHtml,
      }}
    />,
    settings.collectionsDropzoneCollectionDescription
  )
}

export default CollectionDescription
