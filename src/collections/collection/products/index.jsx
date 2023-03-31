import Products from "../../../products"
import { useCollectionState } from "../_state/hooks"

function CollectionProducts() {
  const collectionState = useCollectionState()

  return (
    <Products
      settings={collectionState.productOptions.settings}
      element={collectionState.productOptions.element}
      queryType={collectionState.productOptions.queryType}
      id={collectionState.productOptions.id}
      isLoading={collectionState.isFetchingNew}
      queryParams={collectionState.productQueryParams}
      skeletonType="products"
    />
  )
}

export default CollectionProducts
