function ProductBuyButtonInitialState(props) {
  return {
    subscription: false, // is eventually added to lineItemOptions
    subscriptions: false,
    attributes: false, // is eventually added to lineItemOptions
    selectedOptions: false,
  }
}

export default ProductBuyButtonInitialState
