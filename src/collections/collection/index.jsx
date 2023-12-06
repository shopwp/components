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
    <div
      className={`swp-l-col swp-0 swp-mw100 swp-collection ${itemWidthClass(
        settings.collectionsItemsPerRow
      )} swp-item wps-item`}
    >
      <CollectionProvider {...props}>
        {settings.collectionsExcludes &&
        settings.collectionsExcludes.includes("image") ? null : (
          <CollectionImage />
        )}
        {settings.collectionsExcludes &&
        settings.collectionsExcludes.includes("title") ? null : (
          <CollectionTitle />
        )}
        {settings.collectionsExcludes &&
        settings.collectionsExcludes.includes("description") ? null : (
          <CollectionDescription />
        )}
        {settings.collectionsExcludes &&
        settings.collectionsExcludes.includes("products") ? null : (
          <CollectionProducts settings={settings} />
        )}
      </CollectionProvider>
    </div>
  )
}

export default Collection
