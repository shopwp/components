/** @jsx jsx */
import { jsx, css } from "@emotion/react"
import { usePortal } from "Hooks"
import { hasLink } from "Common/settings"
import { useCollectionState } from "../_state/hooks"
import { useSettingsState } from "../../../items/_state/settings/hooks"

const Link = wp.element.lazy(() =>
  import(/* webpackChunkName: 'Link-public' */ "../../../link")
)

function TitleContent({ payload }) {
  const CustomHeading = `h${shopwp.misc.isSingularCollections ? "1" : "2"}`

  const CollectionTitleCSS = css`
    margin-top: 0;
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
      aria-label="Collection Title"
    >
      {hasLink(settings) && !settings.isSingular ? (
        <Link
          type="collections"
          linkTo={settings.linkTo}
          target={settings.linkTarget}
          payload={collectionState.payload}
        >
          <TitleContent payload={collectionState.payload} />
        </Link>
      ) : (
        <TitleContent payload={collectionState.payload} />
      )}
    </div>,
    settings.dropzoneCollectionTitle
  )
}

export default CollectionTitle
