import CollectionProvider from "./_state/provider"
import { itemWidthClass } from "@shopwp/common"
import { useSettingsState } from "../../items/_state/settings/hooks"

import CollectionImage from "./image"
import CollectionTitle from "./title"
import CollectionDescription from "./description"
import CollectionProducts from "./products"

function Collection(props) {
  const settings = useSettingsState()
  return (
    <li
      className={`swp-l-col swp-0 swp-mw100 ${itemWidthClass(
        settings.collectionsItemsPerRow
      )} swp-item wps-item swp-collection`}
    >
      <CollectionProvider {...props}>
        {settings.collectionsExcludes &&
        settings.collectionsExcludes.includes("image") ? null : (
          <CollectionImage payload={props.payload} />
        )}
        {settings.collectionsExcludes &&
        settings.collectionsExcludes.includes("title") ? null : (
          <CollectionTitle payload={props.payload} />
        )}
        {settings.collectionsExcludes &&
        settings.collectionsExcludes.includes("description") ? null : (
          <CollectionDescription payload={props.payload} />
        )}
        {settings.collectionsExcludes &&
        settings.collectionsExcludes.includes("products") ? null : (
          <CollectionProducts settings={settings} />
        )}
      </CollectionProvider>
    </li>
  )
}

export default Collection
