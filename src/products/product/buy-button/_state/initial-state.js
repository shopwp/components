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

  return {
    subscription: false,
    subscriptions: false,
    attributes: false,
    selectedOptions: false,
    variants: props.payload ? props.payload.variants : false,
    totalOptions: allSelectableOptions.length,
    allSelectableOptions: allSelectableOptions,
  }
}

export default ProductBuyButtonInitialState
