/** @jsx jsx */
import { jsx, css } from "@emotion/react"
import { usePortal } from "@shopwp/hooks"
import { hasLink } from "@shopwp/common"
import { useCollectionState } from "../_state/hooks"
import { useSettingsState } from "../../../items/_state/settings/hooks"

const Link = wp.element.lazy(() =>
  import(/* webpackChunkName: 'Link-public' */ "../../../link")
)

function TitleContent({ payload, settings }) {
  const CustomHeading = `h${shopwp.misc.isSingularCollections ? "1" : "2"}`

  const CollectionTitleCSS = css`
    && {
      font-family: ${settings.collectionsTitleTypeFontFamily
        ? settings.collectionsTitleTypeFontFamily
        : "inherit"};
      font-size: ${settings.collectionsTitleTypeFontSize
        ? settings.collectionsTitleTypeFontSize
        : settings.collectionsTitleSize};

      color: ${settings.collectionsTitleColor};
      white-space: normal;
      margin: 0;
    }
  `

  return (
    <CustomHeading
      itemProp="name"
      className="wps-collection-title"
      css={CollectionTitleCSS}
    >
      {payload.title}
    </CustomHeading>
  )
}
function CollectionTitle() {
  const settings = useSettingsState()
  const collectionState = useCollectionState()

  return usePortal(
    <div
      className="wps-component wps-component-collection-title"
      aria-label={collectionState.payload.title + " collection title"}
    >
      {hasLink(settings) && !settings.collectionsIsSingular ? (
        <Link
          type="collections"
          linkTo={settings.collectionsLinkTo}
          linkTitle={collectionState.payload.title}
          target={settings.collectionsLinkTarget}
          payload={collectionState.payload}
        >
          <TitleContent payload={collectionState.payload} settings={settings} />
        </Link>
      ) : (
        <TitleContent payload={collectionState.payload} settings={settings} />
      )}
    </div>,
    settings.collectionsDropzoneCollectionTitle
  )
}

export default CollectionTitle
