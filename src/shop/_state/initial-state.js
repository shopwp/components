import { findSavedBuyerIdentity } from "@shopwp/common"

function ShopInitialState(props) {
  var savedIdentity = findSavedBuyerIdentity()

  /*
  
  Priorities:
  1. Use identity from shortcode / Render API
  2. Use cached identity from LS
  3. Use default plugin settings
  
  */
  const buyerIdentity = {
    phone: "",
    email: "",
    token: "",
    country: props.country
      ? props.country.toUpperCase()
      : savedIdentity.country.toUpperCase(),
    language: props.language
      ? props.language.toUpperCase()
      : savedIdentity.language.toUpperCase(),
    currency: props.currency
      ? props.currency.toUpperCase()
      : savedIdentity.currency.toUpperCase(),
  }

  var state = {
    buyerIdentity: buyerIdentity,
    jwt: props.jwt ? props.jwt : false,
    isCartOpen: false,
    cartData: false,
    isCartUpdating: shopwp.misc.isAdmin ? false : true,
    theme: shopwp.misc.theme,
    productsVisible: false,
    trackingParams: false,
  }

  state.t = wp.hooks.applyFilters("shop.textContent", shopwp.t, state)

  return state
}

export default ShopInitialState
