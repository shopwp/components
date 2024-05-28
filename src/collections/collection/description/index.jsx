import { usePortal } from "@shopwp/hooks"
import { useCollectionState } from "../_state/hooks"
import { useSettingsState } from "../../../items/_state/settings/hooks"

function CollectionDescription() {
  const collectionState = useCollectionState()
  const settings = useSettingsState()

  return usePortal(
    <div
      itemProp="description"
      className="swp-collection-description wps-collections-description"
      dangerouslySetInnerHTML={{
        __html: collectionState.payload.descriptionHtml,
      }}
    />,
    settings.collectionsDropzoneCollectionDescription
  )
}

export default CollectionDescription
