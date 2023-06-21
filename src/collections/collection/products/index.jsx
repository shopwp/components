import Products from "../../../products"
import { useCollectionState } from "../_state/hooks"
import { usePortal } from "@shopwp/hooks"

function CollectionProducts({ settings }) {
  const collectionState = useCollectionState()

  return usePortal(
    <Products
      settings={collectionState.productsSettings}
      queryType="collectionProducts"
      id={collectionState.id}
      skeletonType="products"
    />,
    settings.dropzoneProductProducts
  )
}

export default CollectionProducts
