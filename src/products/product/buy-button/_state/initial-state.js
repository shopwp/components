function ProductBuyButtonInitialState(props) {
  var allSelectableOptions = []

  if (props.payload) {
    props.payload.variants.edges.forEach((element) => {
      allSelectableOptions.push({
        availableForSale: element.node.availableForSale,
        id: element.node.id,
        selectedOptions: element.node.selectedOptions,
      })
    })
  }

  var variants = props.payload ? props.payload.variants : false
  var finalVariants = wp.hooks.applyFilters(
    "product.variants",
    variants,
    props.payload
  )

  return {
    subscription: false,
    subscriptions: false,
    attributes: false,
    selectedOptions: false,
    variants: finalVariants,
    totalOptions: props.payload.options.length,
    allSelectableOptions: allSelectableOptions,
  }
}

export default ProductBuyButtonInitialState
