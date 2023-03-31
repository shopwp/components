function RequestsInitialState({
  queryParams = false,
  settings = false,
  queryType = "products",
  isFetchingNew = true,
}) {
  const first = queryParams?.first
    ? queryParams.first
    : settings?.pageSize
    ? settings.pageSize
    : settings?.limit
    ? settings.limit
    : shopwp.general.numPosts

  const finalQueryParams = {
    query: queryParams?.query
      ? queryParams.query
      : settings?.query
      ? settings.query
      : false,
    sortKey: queryParams?.sortKey
      ? queryParams.sortKey.toUpperCase()
      : settings?.sortBy
      ? settings.sortBy.toUpperCase()
      : "TITLE",
    reverse: queryParams?.reverse
      ? queryParams.reverse
      : settings?.reverse
      ? settings.reverse
      : false,
    language: settings?.language
      ? settings.language.toUpperCase()
      : shopwp.general.languageCode.toUpperCase(),
    country: settings?.country
      ? settings.country.toUpperCase()
      : shopwp.general.countryCode.toUpperCase(),
    first: first,
    collection_titles: settings?.collection ? settings.collection : false,
  }

  return {
    queryType: settings?.collection ? "collectionProducts" : queryType, // Can be either products, collections, or collectionProducts
    queryParams: finalQueryParams,
    originalParams: finalQueryParams,
    productQueryParams: {
      query: settings?.products?.query ? settings.products.query : false,
      sortKey: settings?.products?.sortBy ? settings.products.sortBy : false,
      reverse: settings?.products?.reverse ? settings.products.reverse : false,
      first: settings?.products?.pageSize ? settings.products.pageSize : false,
    },
    cursor: false,
    isLoading: false,
    isBootstrapping: true,
    isFetchingNew: isFetchingNew,
    initialFetch: true,
    nextQueryId: false,
    hasMoreItems: false,
    isReplacing: false,
    hasNextPage: false,
    hasPreviousPage: false,
    lastQuery: settings?.query ? settings.query : false,
    withProducts:
      settings.single === false && queryType === "collections" ? false : true, // Used with collections queries
    limit: settings.limit,
    totalShown: 0,
  }
}

export default RequestsInitialState
