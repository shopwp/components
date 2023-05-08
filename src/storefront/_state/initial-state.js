function hasDefaultSelections(settings) {
  if (
    settings.collection ||
    settings.tag ||
    settings.productType ||
    settings.vendor
  ) {
    return true
  }

  return false
}

function StorefrontInitialState(props) {
  return {
    element: props.element ? props.element : false,
    settings: props.settings ? props.settings : false,
    selections: {},
    selectedTags: [],
    selectedTypes: [],
    selectedVendors: [],
    selectedCollections: [],
    selectedPrice: [],
    lastSelected: {},
    selectedAvailableForSale: null,
    hasResults: false,
    isLoading: false,
    hasSelections: hasDefaultSelections(props.settings),
    hasStorefrontSelections: false,
    searchQuery: false,
  }
}

export { StorefrontInitialState }
