import { createStorefrontApiClient } from "@shopify/storefront-api-client"
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
    countryCode: props.country
      ? props.country.toUpperCase()
      : savedIdentity
      ? savedIdentity.country.toUpperCase()
      : false,
  }

  if (props.companyLocationId && props.companyLocationId !== "") {
    buyerIdentity.companyLocationId = props.companyLocationId
  }

  if (props.customerAccessToken && props.customerAccessToken !== "") {
    buyerIdentity.customerAccessToken = props.customerAccessToken
  }

  if (props.phone && props.phone !== "") {
    buyerIdentity.phone = props.phone
  }

  if (props.email && props.email !== "") {
    buyerIdentity.email = props.email
  }

  const client = shopwp.connection.storefront.storefrontAccessToken
    ? createStorefrontApiClient({
        storeDomain: "https://" + shopwp.connection.storefront.domain,
        apiVersion: shopwp.connection.storefront.apiVersion,
        publicAccessToken: shopwp.connection.storefront.storefrontAccessToken,
      })
    : false

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
    client: client,
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

  state.t = wp.hooks.applyFilters("shop.textContent", shopwp.t, state)

  return state
}

export default ShopInitialState
