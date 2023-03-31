function ItemsInitialState({
  id = false,
  componentType = "products",
  element = false,
  loader = false,
  skeletonType = false,
}) {
  return {
    id: id,
    componentType: componentType,
    element: element,
    loader: loader,
    skeletonType: skeletonType,
    hasStorefrontSelections: false,
    notice: false,
    searchQuery: false,
  }
}

export default ItemsInitialState
