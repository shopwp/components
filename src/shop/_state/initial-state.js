import { findSavedBuyerIdentity } from "@shopwp/common"

function getInitialCartState() {
  if (shopwp.misc.isAdmin) {
    return true
  }

  if (window.shopwpDivi) {
    if (window.shopwpDivi.isEditingTemplateLayout) {
      return true
    }
  }

  return false
}

function ShopInitialState(props) {
  var isCartLoaded = getInitialCartState()
  var savedIdentity = findSavedBuyerIdentity()

  /*
  
  Priorities:
  1. Use identity from shortcode / Render API
  2. Use cached identity from LS
  3. Use default plugin settings (will populate on server-side)
  
  */
  const buyerIdentity = {
    phone: "",
    email: "",
    token: "",
    country: props.country
      ? props.country.toUpperCase()
      : savedIdentity
      ? savedIdentity.country.toUpperCase()
      : false,
    language: props.language
      ? props.language.toUpperCase()
      : savedIdentity
      ? savedIdentity.language.toUpperCase()
      : false,
    currency: props.currency
      ? props.currency.toUpperCase()
      : savedIdentity
      ? savedIdentity.currency.toUpperCase()
      : false,
  }

  var state = {
    buyerIdentity: buyerIdentity,
    jwt: props.jwt ? props.jwt : false,
    isCartOpen: false,
    isCartReady: isCartLoaded,
    cartData: false,
    isCartUpdating: isCartLoaded,
    theme: shopwp.misc.theme,
    productsVisible: false,
    trackingParams: false,
    directCheckoutError: null,
  }

  state.t = wp.hooks.applyFilters("shop.textContent", shopwp.t, state)

  return state
}

export default ShopInitialState
