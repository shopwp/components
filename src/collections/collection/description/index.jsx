import { usePortal } from "Hooks"
import { useCollectionState } from "../_state/hooks"
import { useSettingsState } from "../../../items/_state/settings/hooks"

function CollectionDescription() {
  const collectionState = useCollectionState()
  const settings = useSettingsState()

  return usePortal(
    <div
      itemProp="description"
      className="wps-collections-description"
      dangerouslySetInnerHTML={{
        __html: collectionState.payload.descriptionHtml,
      }}
    />,
    settings.dropzoneCollectionDescription
  )
}

export default CollectionDescription
