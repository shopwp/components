import { decode } from "@shopwp/common"

function RequestsInitialState({
  queryParams = false,
  settings = false,
  queryType = "products",
  isFetchingNew = true,
  payload = false,
  shopState,
}) {
  if (queryType === "collections") {
    var collection_titles = false

    var query = queryParams?.collectionsQuery
      ? queryParams.collectionsQuery
      : queryParams.query
      ? queryParams.query
      : settings?.collectionsQuery
      ? settings.collectionsQuery
      : false

    var first = queryParams?.collectionsFirst
      ? queryParams.collectionsFirst
      : settings?.collectionsPageSize
      ? settings.collectionsPageSize
      : settings?.collectionsLimit
      ? settings.collectionsLimit
      : shopwp.general.numPosts

    var sortKey = queryParams?.collectionsSortKey
      ? queryParams.collectionsSortKey.toUpperCase()
      : settings?.collectionsSortBy
      ? settings.collectionsSortBy.toUpperCase()
      : "TITLE"

    var reverse = queryParams?.collectionsReverse
      ? queryParams.collectionsReverse
      : settings?.collectionsReverse
      ? settings.collectionsReverse
      : false
  } else {
    queryType = settings?.collection ? "collectionProducts" : queryType
    var collection_titles = settings?.collection ? settings.collection : false

    if (collection_titles.length) {
      if (Array.isArray(collection_titles)) {
        collection_titles = collection_titles.map((title) => {
          if (!title) {
            return false
          }

          var decoded = decode(title)

          if (!decoded || decoded === "false") {
            return false
          }

          return decoded
        })
      }
    }

    var query = queryParams?.query
      ? queryParams.query
      : settings?.query
      ? settings.query
      : false

    if (!query && collection_titles) {
      query = "collection:" + collection_titles
    }

    var first = queryParams?.first
      ? queryParams.first
      : settings?.pageSize
      ? settings.pageSize
      : settings?.limit
      ? settings.limit
      : shopwp.general.numPosts

    var sortKey = queryParams?.sortKey
      ? queryParams.sortKey.toUpperCase()
      : settings?.sortBy
      ? settings.sortBy.toUpperCase()
      : "TITLE"

    var reverse = queryParams?.reverse
      ? queryParams.reverse
      : settings?.reverse
      ? settings.reverse
      : false
  }

  var finalQueryParams = {
    query: query,
    first: first,
    sortKey: sortKey,
    reverse: reverse,
    language: shopState.buyerIdentity.language,
    country: shopState.buyerIdentity.country,
    collection_titles: collection_titles,
  }

  if (shopState.buyerIdentity.customerAccessToken) {
    finalQueryParams.buyer = {
      customerAccessToken: shopState.buyerIdentity.customerAccessToken,
    }

    if (shopState.buyerIdentity.companyLocationId) {
      finalQueryParams.buyer.companyLocationId =
        shopState.buyerIdentity.companyLocationId
    }
  }

  return {
    queryType: queryType, // Can be either products, collections, or collectionProducts
    queryParams: finalQueryParams,
    originalParams: finalQueryParams,
    cursor: false,
    isLoading: false,
    isBootstrapping: payload ? false : true,
    isFetchingNew: isFetchingNew,
    initialFetch: true,
    nextQueryId: false,
    hasMoreItems: false,
    isReplacing: false,
    hasNextPage: false,
    hasPreviousPage: false,
    withProducts:
      settings.single === false && queryType === "collections" ? false : true, // Used with collections queries
    limit: settings.limit,
    totalShown: 0,
  }
}

export default RequestsInitialState
