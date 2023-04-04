import CollectionProvider from "./_state/provider"
import { isShowingComponent } from "@shopwp/common"
import { itemWidthClass } from "@shopwp/common"
import { useSettingsState } from "../../items/_state/settings/hooks"

import CollectionImage from "./image"
import CollectionTitle from "./title"
import CollectionDescription from "./description"
import CollectionProducts from "./products"

function Collection(props) {
  const settings = useSettingsState()

  return (
    <div className={`${itemWidthClass(settings.itemsPerRow)} wps-item`}>
      <CollectionProvider {...props}>
        {isShowingComponent(settings, "image") ? <CollectionImage /> : null}
        {isShowingComponent(settings, "title") ? <CollectionTitle /> : null}
        {isShowingComponent(settings, "description") ? (
          <CollectionDescription />
        ) : null}
        {isShowingComponent(settings, "products") ? (
          <CollectionProducts />
        ) : null}
      </CollectionProvider>
    </div>
  )
}

export default Collection
