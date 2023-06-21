/** @jsx jsx */
import { jsx, css } from "@emotion/react"
import CollectionProvider from "./_state/provider"
import { itemWidthClass } from "@shopwp/common"
import { useSettingsState } from "../../items/_state/settings/hooks"

import CollectionImage from "./image"
import CollectionTitle from "./title"
import CollectionDescription from "./description"
import CollectionProducts from "./products"

function Collection(props) {
  const settings = useSettingsState()

  const CollectionCSS = css`
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    min-width: 0;
    max-width: 100%;
  `

  return (
    <div
      className={`${itemWidthClass(settings.collectionsItemsPerRow)} wps-item`}
      css={CollectionCSS}
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
