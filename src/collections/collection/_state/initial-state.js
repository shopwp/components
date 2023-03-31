import { findLastItem } from "Common"

function CollectionInitialState({ settings, payload }) {
  settings.products.collection = payload.title
  settings.products.query = settings.query
  settings.products.dropzoneSorting = settings.dropzoneCollectionProductsSorting
  settings.dropzoneSorting = settings.dropzoneCollectionProductsSorting

  const productSettings = {
    ...shopwp.products,
    ...settings.products,
  }

  productSettings.collection = payload.title
  productSettings.queryType = "collectionProducts"

  if (payload.products) {
    var lastProduct = findLastItem(payload.products)

    if (lastProduct) {
      var cursor = lastProduct.cursor
    } else {
      var cursor = false
    }
  } else {
    var cursor = false
  }

  return {
    settings: settings,
    payload: payload,
    hasNextPage: false,
    shouldReplace: false,
    productsHasNextPage: payload.products
      ? payload.products.pageInfo.hasNextPage
      : false,
    products: payload.products ? payload.products.edges : [],
    productOptions: {
      id: payload.id + "-products",
      settings: productSettings,
      element: settings.dropzoneCollectionProducts,
      sortingElement: settings.dropzoneCollectionProductsSorting,
      queryType: "collectionProducts",
    },
    productQueryParams: {
      query: settings.products.query,
      sortKey: settings.products.sortBy
        ? settings.products.sortBy
        : "COLLECTION_DEFAULT",
      reverse:
        settings.products.reverse === undefined
          ? false
          : settings.products.reverse,
      first: settings.products.pageSize,
      collection_titles: settings.products.collection,
    },
    cursor: cursor,
    notice: false,
    isFetchingNew: false,
    isLoading: false,
    element: false,
    selectedVariant: false,
  }
}

export default CollectionInitialState
