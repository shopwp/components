import { usePortal } from "@shopwp/hooks"
import { useSettingsState } from "../../../items/_state/settings/hooks"

function CollectionDescription({ payload }) {
  const settings = useSettingsState()

  return usePortal(
    <div
      itemProp="description"
      className="swp-collection-description wps-collections-description"
      dangerouslySetInnerHTML={{
        __html: payload.descriptionHtml,
      }}
    />,
    settings.collectionsDropzoneCollectionDescription
  )
}

export default CollectionDescription
